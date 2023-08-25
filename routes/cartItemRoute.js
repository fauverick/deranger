const express = require("express")
const router = express.Router();
const bodyParser = require('body-parser') //a MUST to read req.body in a post request 
const {authorizePermission, authenticateUser} = require('../middleware/authentication')

const {addCartItem, showMyCart, getSingleCartItem, deleteCartItem, updateQuantitySingleCartItem, emptyCart} = require('../controllers/cartItemController')

router.route('/').post(bodyParser.json(), authenticateUser, addCartItem).get(authenticateUser, showMyCart).delete(authenticateUser, emptyCart)
router.route('/:id')
    .get(authenticateUser, getSingleCartItem)
    .delete(authenticateUser, deleteCartItem)
    .patch(authenticateUser, updateQuantitySingleCartItem)

module.exports = router;