import User from '../models/User';
import bcrypt from 'bcrypt';
const jwt = require("jsonwebtoken")

// dùng để lưu trữ refresh token trên máy mình
let refreshTokens = [];
const authController = {

    /** LIST OF FUNCTION: 
     *  1.1 Register:                 dùng để đăng ký người dùng                 
     *  1.2 Generate access token
     *  1.3 Generate refresh token
     *  1.3 Login
     *  1.4 Refresh Token :           dùng để làm refresh lại token
     *  1.5Logout
     */

    // REGISTER
    registerUser: async (req, res) => {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass
            })
            const user = await newUser.save();
            res.status(200).json({
                user
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },

    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: "20s"
            }
        )
    },

    // GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: "1d"
            }
        )
    },

    // LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Username is not found")
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json("Password is invalid")
            }

            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)
                // thêm refresh token vào máy mình
                refreshTokens.push(refreshToken)
                // lưu refresh token vào cookies
                res.cookie("refreshToken", refreshToken,
                    {
                        httpOnly: true,
                        secure: false,
                        path: "/", //path bỏ đi cũng không sao
                        sameSite: "strict",
                    })
                // dùng để bỏ password ra khi trả user về để tránh bị lộ password
                const { password, ...others } = user._doc
                return res.status(200).json({ user: others, accessToken })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    // REFRESH TOKEN 
    requestRefreshToken: async (req, res) => {
        // Lấy refresh token từ user
        const refreshToken = req.cookies.refreshToken;

        console.log(`Refresh Token before change: `, refreshToken);
        console.log('>>>What we store in server: ', refreshTokens);
        // kiểm tra refresh token có tồn tại hay không 
        if (!refreshToken) {
            return res.status(401).json("You don't have refresh token because you are not logged in yet");
        }

        // kiểm tra refresh token xem đó có phải của mình hay không
        // if (!refreshTokens.includes(refreshToken)) {
        //     return res.status(403).json("Refresh token is not mine ");
        // }
        // kiểm tra refresh token hợp lệ hay không
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {

            if (err) {
                return res.status(403).json("Refresh token is not valid");
            }

            // trước khi có refresh token mới thì loại bỏ refresh token cũ
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);

            // Tạo mới refresh token và access token
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);

            // Store new refresh token
            refreshTokens.push(newRefreshToken);

            // gán refresh token mới vào cookie
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            return res.status(200).json({
                accessToken: newAccessToken
            });
        });
    },

    // LOGOUT
    userLogout: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);
            res.clearCookie("refreshToken", { path: "/" });
            res.status(200).json("Logged out successfully")
        }
    }

}

module.exports = authController