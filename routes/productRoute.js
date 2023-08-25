const express = require('express')
const router = express.Router();

const {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage, getSingleProductReviews} = require('../controllers/productController')
const bodyParser = require('body-parser') //a MUST to read req.body in a post request 
const {authorizePermission, authenticateUser} = require('../middleware/authentication')

router.route('/').post(bodyParser.json(),authenticateUser, authorizePermission('admin'), createProduct).get(getAllProducts);
router.route('/uploadImage').post(uploadImage)
router.route('/:id')
    .get(getSingleProduct)
    .patch(bodyParser.json(),authenticateUser, authorizePermission('admin'), updateProduct)
    .delete(authenticateUser, authorizePermission('admin'), deleteProduct)

router.route('/:id/reviews').get(getSingleProductReviews)


module.exports = router;
