const Review = require('../models/Review');
const User = require('../models/User')
const Product = require('../models/Product')

const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors');
const { checkPermission } = require('../utils');

const createReview = async(req, res) => {
    const {product, rating, comment, title} = req.body;

    if(!product || !rating || !comment || !title){
        throw new CustomError.BadRequestError('please provide product, title, rating and comment')
    }

    const user = req.user.UserId;
    const username = req.user.name;
    const dbProduct = await Product.findOne({_id: product});

    if(!dbProduct){
        throw new CustomError.NotFoundError(`no product with id ${product} found`)
    }

    const review = await Review.create({
        product: dbProduct._id,
        user,
        rating,
        comment,
        title,
        username
    })

    res.status(StatusCodes.CREATED).json({review})
}

const getAllReviews = async(req, res) => {
    const reviews = await Review.find({})
    res.status(StatusCodes.OK).json({reviews})
}

const getSingleReview = async(req, res) => {
    const reviewId = req.params.id;
    const review = await Review.findOne({_id: reviewId})
    if(!review){
        throw new CustomError.NotFoundError(`no review with id ${reviewId} found`);
    }
    checkPermission(req.user, review.user)
    res.status(StatusCodes.OK).json({review});
}

const updateReview = async(req, res) => {
    const reviewId = req.params.id;
    const review = await Review.findOne({_id: reviewId})
    if(!review){
        throw new CustomError.NotFoundError(`no review with id ${reviewId} found`);
    }
    checkPermission(req.user, review.user);
    const {rating, title, comment} = req.body;

    if(!rating || !title || !comment){
        throw new CustomError.BadRequestError(`please provide rating, title, and comment`)
    }

    review.rating = rating;
    review.title = title;
    review.comment = comment;

    await review.save()
    res.status(StatusCodes.OK).json({review});
}

const deleteReview = async(req, res) => {
    const reviewId = req.params.id;
    const review = await Review.findOne({_id: reviewId})
    if(!review){
        throw new CustomError.NotFoundError(`no review with id ${reviewId} found`);
    }
    checkPermission(req.user, review.user);
    await review.deleteOne();
    res.status(StatusCodes.OK).json({msg: "review deleted"})
}

const getReviewsOfProduct = async(req, res) => {
    const productId = req.params.id;
    const reviews = await Review.find({product: productId})
    res.status(StatusCodes.OK).json({reviews})
}
module.exports = {createReview, getAllReviews, getSingleReview, updateReview, deleteReview, getReviewsOfProduct}