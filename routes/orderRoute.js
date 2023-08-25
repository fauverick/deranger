const express = require('express')
const router = express.Router()
const {createOrder, getAllOrders, getSingleOrder, getMyOrders, updateOrder, cartToOrder} = require('../controllers/orderController')
const bodyParser = require('body-parser')

const {authenticateUser, authorizePermission} = require('../middleware/authentication')

router.route('/')
    .get(authenticateUser, authorizePermission('admin'), getAllOrders)
    .post(authenticateUser, bodyParser.json(), createOrder); //need to use authenticate User before authorizing permission
router.route('/getMyOrders')
    .get(authenticateUser, getMyOrders);
router.route('/showOrder')
    .post(authenticateUser, cartToOrder)
router.route('/:id')
    .get(authenticateUser, getSingleOrder)
    .patch(authenticateUser, updateOrder)

module.exports = router;
