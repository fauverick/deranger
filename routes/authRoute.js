const express = require('express')
const router = express.Router()
const  {login, logout, register} = require('../controllers/authController')
const bodyParser = require('body-parser')
 
router.route('/register').post(bodyParser.json(), register)
router.route('/login').post(bodyParser.json(), login)
router.route('/logout').get(logout)

module.exports = router;