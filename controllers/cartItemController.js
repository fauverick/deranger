const CartItem = require('../models/CartItem');
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const CustomError = require("../errors");
const { checkPermission } = require('../utils');

const addCartItem = async(req, res) => {
    const {quantity, product, size, color} = req.body;
    const productDb = await Product.findOne({_id: product});
    if(!productDb){
        throw new CustomError.NotFoundError(`no product with id ${product} found`)
    }
    console.log(productDb)
    const item =  await CartItem.create({
        name: productDb.name,
        quantity: quantity,
        size: size,
        color: color,
        image: productDb.url[0],
        price: productDb.price,
        product: productDb._id,
        user: req.user.UserId
    })
    res.status(StatusCodes.CREATED).json({item})
}

const showMyCart = async(req, res) => {
    const cartItems = await CartItem.find({user : req.user.UserId})
    res.status(StatusCodes.OK).json({cartItems})
}

const getSingleCartItem = async(req, res) => {
    const cartItemId = req.params.id;
    const cartItem = await CartItem.findOne({_id: cartItemId});
    if(!cartItem){
        throw new CustomError.NotFoundError(`no cart item with id ${cartItem} found`)
    } 
    checkPermission(req.user, cartItem.user)
    res.status(StatusCodes.OK).json({cartItem})
}

const updateQuantitySingleCartItem = async(req, res) => {
    const cartItemId = req.params.id;
    const cartItem = await CartItem.findOne({_id: cartItemId});
    if(!cartItem){
        throw new CustomError.NotFoundError(`no cart item with id ${cartItem} found`)
    } 
    checkPermission(req.user, cartItem.user)
    cartItem.quantity = req.body.quantity;
    await cartItem.save()
    res.status(StatusCodes.OK).json({cartItem})
}

const deleteCartItem = async(req, res) => {
    const cartItemId = req.params.id;
    const cartItem = await CartItem.findOne({_id: cartItemId});
    if(!cartItem){
        throw new CustomError.NotFoundError(`no cart item with id ${cartItem} found`)
    } 
    checkPermission(req.user, cartItem.user)
    await cartItem.deleteOne();
    res.status(StatusCodes.OK).json({msg: 'cart item deleted'})
}

const emptyCart = async(req, res) => {
    const id = req.user.UserId;
    await CartItem.deleteMany({user: id});
    res.status(StatusCodes.OK).json({msg: 'empty cart'})
}

module.exports = {addCartItem, showMyCart, getSingleCartItem, deleteCartItem, updateQuantitySingleCartItem, emptyCart}