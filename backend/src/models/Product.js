import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    brandId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true

    },
    price: {
        type: Number,
        required: true
    }

}, { timestamps: true }

)

module.exports = mongoose.model("Product", productSchema)