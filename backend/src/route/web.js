import express from 'express';
import authController from "../controllers/authController";
import productController from "../controllers/productController";
import middlewareController from "../controllers/middlewareController";
import multer from 'multer';
let router = express.Router();
var appRoot = require('app-root-path');

// cho biết nơi để lưu ảnh
const storage = multer.diskStorage({
    // tạo nơi dùng để lưu trữ ảnh
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/image/');
    },
    // xác định cách multer đặt tên cho file
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// kiểm tra định dạng của file truyền lên
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter })

let initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello World");
    });

    //PUBLIC FEATURES
    router.post("/register", authController.registerUser);
    router.post("/login", authController.loginUser);
    router.post("/refresh", authController.requestRefreshToken)
    router.post("/logout", middlewareController.verifyToken, authController.userLogout)

    //ADMIN FEATURES
    router.post("/addNewProduct", upload.single('image'), productController.addNewProduct);
    router.get("/getAllProduct", productController.getAllProducts);
    router.get("/getProductById/:id", productController.getProductById);
    router.get("/getAddProductPage", productController.getAddProductPage);
    router.put("/updateProduct/:id", upload.single('image'), productController.updateProduct);
    router.delete("/deleteProduct/:id", productController.deleteProduct);


    return app.use("/api/v1", router);
};

module.exports = initWebRoutes;