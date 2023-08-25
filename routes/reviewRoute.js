const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const {createReview, getAllReviews, getSingleReview, updateReview, deleteReview, getReviewsOfProduct} = require('../controllers/reviewController')
const {authenticateUser, authorizePermission} = require('../middleware/authentication')

router.route('/')
    .get(authenticateUser, authorizePermission('admin'), getAllReviews)
    .post(authenticateUser, bodyParser.json(), createReview)

router.route('/reviewsOfProduct/:id')
    .get(getReviewsOfProduct)

router.route('/:id')
    .get(authenticateUser, getSingleReview)
    .patch(authenticateUser, updateReview)
    .delete(authenticateUser, deleteReview)

module.exports = router;