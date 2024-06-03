import Product from '../models/Product';
import Brand from '../models/Brand';
var appRoot = require('app-root-path');
import path from 'path';
import fs from 'fs';
const productController = {

    // GET ALL PRODUCTS
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            const brand = await Brand.find();
            return res.status(200).json({ products, brand });
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // GET PRODUCT BY ID
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // ADD NEW PRODUCT
    addNewProduct: async (req, res) => {
        try {
            if (req.fileValidationError) {
                return res.status(400).json({ message: req.fileValidationError });
            }
            const { name, description, brandId, quantity, price } = req.body;
            console.log(req.file.filename);
            const image = req.file ? req.file.filename : null;

            const newUser = new Product({
                name,
                description,
                image: "/image/" + image,
                brandId,
                quantity,
                price
            });

            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // UPDATE PRODUCT
    updateProduct: async (req, res) => {
        try {
            const { name, description, brandId, quantity, price } = req.body;
            let updateData = { name, description, brandId, quantity, price };

            // nếu có file ảnh mới được cung cấp
            if (req.file) {
                if (req.fileValidationError) {
                    return res.status(400).json({ message: req.fileValidationError });
                }

                const product = await Product.findById(req.params.id);
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }

                // xóa ảnh cũ
                const oldImagePath = path.join(appRoot.path, '/src/public', product.image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Failed to delete old image file:", err);
                    }
                });

                //cập nhập ảnh mới
                updateData.image = `/image/${req.file.filename}`;
            }

            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
            return res.status(200).json(updatedProduct);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // GET ADD PRODUCT PAGE
    getAddProductPage: async (req, res) => {
        return res.status(200).render("addNewProduct.ejs");
    },

    // DELETE PRODUCT
    deleteProduct: async (req, res) => {
        try {
            // Tìm product trong dữ liệu
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            // Lấy đường link ảnh cua product
            const imagePath = path.join(appRoot.path, '/src/public', product.image);
            console.log(imagePath);

            // Xóa product trong dữ liệu
            await Product.findByIdAndDelete(req.params.id);

            // Xóa ảnh cua product
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Failed to delete image file:", err);
                    return res.status(500).json({ message: "Failed to delete image file", error: err });
                }
            });

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json(error);
        }
    },




}

module.exports = productController