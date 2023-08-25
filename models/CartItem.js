const mongoose = require("mongoose")

const CartItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    }
})

module.exports = mongoose.model("cartItem", CartItemSchema)