const Product = require('../models/Product')
const Review = require('../models/Review')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')
const { checkPermission } = require('../utils')

const createProduct = async(req, res) => {
    console.log("req", req.body);
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product})
}

const getAllProducts = async (req, res) => {

    const {color, size, category, sort} = req.query;
    const queryObject = {
    }

    if(color && color !== 'all'){
        queryObject.colors = color
    }
  
    if(size && size !== 'all'){
        queryObject.sizes = size
    }
   

    if(category && category !== 'all'){
        queryObject.category = category
    }
   
    console.log("query object is ", queryObject)

    let result = Product.find(queryObject)

    if(sort === 'a to z'){
        result = result.sort('name')
    }

    if(sort === 'z to a'){
        result = result.sort('-name')
    }

    if(sort === 'price low to high'){
        result = result.sort('price')
    }

    if(sort === 'price high to low'){
        result = result.sort('-price')
    }

    //pagination
    const {page, limit} = req.query;
    const skip = (page-1) * limit;

    console.log()
    console.log ("page limit skip is ", page, limit, skip)

    result = result.skip(skip).limit(limit)

    const products = await result;
    const numOfProducts = await Product.countDocuments(queryObject)
   
    res.status(StatusCodes.OK).json(
        {
            products: products,
            numOfProducts: numOfProducts
        })
}

const getSingleProduct = async (req, res) => {
    const productId = req.params.id;
    const product =  await Product.findOne({_id: productId});
    if(!product){
        throw new CustomError.NotFoundError(`no product with id ${productId}`)
    }
    res.status(StatusCodes.OK).json({product})
}

const getSingleProductReviews = async(req,res) => {
    const productId = req.params.id;
    console.log(productId)
    const product = await Product.findOne({_id: productId});
    if(!product){
        throw new CustomError.NotFoundError(`no product with id ${productId} found`)
    }
    const reviews = await Review.find({product: productId});

    res.status(StatusCodes.OK).json({reviews})
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOneAndUpdate({_id: productId}, req.body, { //use findOneAndUpdate so that fields that are not entered in req.body stays the same instead of becoming null
        new: true,
        runValidators: true
    })
    if(!product){
        throw new CustomError.NotFoundError(`no product with id ${productId}`)
    }
    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    const {id: productId} = req.params;
    const product = await Product.findOne({_id: productId})

    if(!product){
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }

    await product.deleteOne(); //use this instead of product.remove() -product.remove() doesnt work in newer versions of mongoose
    res.status(StatusCodes.OK).json({msg: `Success! Product removed`})
}

const uploadImage = async(req, res) => {
    if(!req.files){
        throw new CustomError.BadRequestError('please upload a file')
    }

    const productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('file must be an image')
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({image: `/uploads/${productImage.name}`})
}


module.exports = {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage, getSingleProductReviews}