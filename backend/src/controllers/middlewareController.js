import jwt from "jsonwebtoken";

const middlewareController = {

    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        // kiểm tra token có hợp lệ hay không (kiểm tra xem có trung ACCESS KEY trong env)
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                // nếu lỗi nghĩa là bạn không phải người dùng đó, hoặc token đã hết hạn
                if (err) {
                    return res.status(403).json("Token is not valid!");
                }
                req.user = user;
                next();
            });
            // nếu bạn không có token
        } else {
            return res.status(401).json("Token does not exist! Please login first.");
        }

    },

    // verifyTokenAndAdminAuth: (req, res, next) => {
    //     middlewareController.verifyToken(req, res, () => {
    //         if (req.user.id === req.params.id || req.user.admin) {
    //             next();
    //         } else {
    //             res.status(403).json("You can only delete yourself!");
    //         }
    //     });
    // }

}

module.exports = middlewareController