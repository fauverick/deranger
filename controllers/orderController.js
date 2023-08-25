const Order = require('../models/Order')
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {checkPermission} = require('../utils')

const cartToOrder = async (req, res) => {
    const {cartItems} = req.body;
    let orderItems = [];

    console.log("cart items is ", cartItems)

    for (let i = 0; i < cartItems.length; i++){
        let item = cartItems[i];
        const dbProduct = await Product.findOne({_id: item.product});
        if(!dbProduct){
            throw new CustomError.NotFoundError(`no item with id ${item.product} found`)
        }

        const {name, url, price, _id} = dbProduct;

        let singleOrderItem = {
           name,
           image: url[0], 
           price,
           color : item.color, 
           size : item.size,
           quantity: item.quantity,
           product: _id
        }

        orderItems = [...orderItems, singleOrderItem]
    }

    res.status(StatusCodes.OK).json({orderItems})
}


const createOrder = async (req, res) => {
    const {shippingFee, cartItems, customerInfo} = req.body;
    if(cartItems.length < 1){
        throw new CustomError.BadRequestError('no items found in cart')
    }

    console.log("cart is ", cartItems);

    let subTotal = 0;
    let orderItems = [];

    for (let i = 0; i < cartItems.length; i++){
        let item = cartItems[i];
        const dbProduct = await Product.findOne({_id: item.product});
        if(!dbProduct){
            throw new CustomError.NotFoundError(`no item with id ${item.product} found`)
        }
        subTotal += (item.price * item.quantity)

        const {name, url, price, _id} = dbProduct;

        let singleOrderItem = {
           name,
           image: url[0], 
           price,
           quantity: item.quantity,
           product: _id,
           color: item.color,
           size: item.size
        }

        orderItems = [...orderItems, singleOrderItem]

        console.log('single ', singleOrderItem)

    }

    const tax = subTotal * 0.15;

    let total = tax + shippingFee + subTotal

    let user = req.user.UserId;
    
    const order = await Order.create({
        tax, shippingFee, subTotal, total, orderItems, user, customerInfo
    })

    res.status(StatusCodes.CREATED).json({order})
}

const getAllOrders = async (req, res) => {
    const allOrders = await Order.find({});
    res.status(StatusCodes.OK).json({orders: allOrders, count: allOrders.length})
}

const getSingleOrder = async (req, res) => {
    const OrderId = req.params.id;
    const order = await Order.findOne({_id: OrderId});
    if(!order){
        throw new CustomError.NotFoundError(`no orders with id ${OrderId} found`)
    }
    checkPermission(req.user, order.user);
    res.status(StatusCodes.OK).json({order})
}

const getMyOrders = async (req, res) => {
    const UserId = req.user.UserId;
    const myOrders = await Order.find({user: UserId});
    res.status(StatusCodes.OK).json({myOrders});
}

const updateOrder = async (req, res) => { //update the status of order
    const OrderId = req.params.id;
    const order = await Order.findOne({_id: OrderId});
    if(!order){
        throw new CustomError.NotFoundError(`no order with id ${order} found`)
    }
    checkPermission(req.user, order.user);
    order.status = "paid";
    await order.save()
    res.status(StatusCodes.OK).json({order});
}

module.exports = {createOrder, getAllOrders, getSingleOrder, getMyOrders, updateOrder, cartToOrder}
