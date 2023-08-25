const mongoose = require('mongoose')

const SingleOrderItemSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true
    }
})

const OrderSchema = new mongoose.Schema({
    shippingFee: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
    },
    total: {
        type: Number,
    },
    orderItems: [SingleOrderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'failed', 'paid', 'delivered'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: ""
    }
}, {timestamps: true})

module.exports = mongoose.model('order', OrderSchema)