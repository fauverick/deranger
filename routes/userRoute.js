const express = require('express')
const router = express.Router()

const  {getAllUsers, getSingleUser, updateUser, deleteUser, showCurrentUser} = require('../controllers/userController')
const {authenticateUser, authorizePermission} = require('../middleware/authentication')
const bodyParser = require('body-parser')

router.route('/').get(authenticateUser, authorizePermission('admin'), getAllUsers)
router.route('/showCurrentUser').get(authenticateUser, showCurrentUser)
router.route('/:id').get(authenticateUser, getSingleUser).patch(authenticateUser, updateUser).delete(authenticateUser, deleteUser)

module.exports = router;