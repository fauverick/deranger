const User = require('../models/User');
const {checkPermission, createTokenUser} = require('../utils')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const getAllUsers = async(req, res) => {
    const users = await User.find({});
    const usersToken = users.map(user => createTokenUser(user))
    res.status(StatusCodes.OK).json({users: usersToken, count: users.length})
}

const getSingleUser = async(req, res) => {
    const UserId = req.params.id;
    checkPermission(req.user, UserId);
    const user = await User.findOne({_id: UserId});
    if(!user){
        throw new CustomError.BadRequestError(`no user with id ${UserId}`)
    }
    res.status(StatusCodes.OK).json({user})
}

const updateUser = async(req, res) => {
    const {name, email, first_name, last_name} = req.body;
    if(!name || !email){
        throw new CustomError.BadRequestError(`please provide name and email`);
    }
    const UserId = req.params.id;
    checkPermission(req.user, UserId);
    const user = await User.findOne({_id: UserId});
    if(!user){
        throw new CustomError.BadRequestError(`no user with id ${UserId}`)
    }
    user.name = name;
    user.email = email;
    user.first_name = first_name,
    user.last_name = last_name

    await user.save();

    const tokenUser = createTokenUser(user)

    res.status(StatusCodes.OK).json({tokenUser})

}

const deleteUser = async(req, res) => {
    res.send('delete user')
}

const showCurrentUser = async(req, res) => {
    const UserId = req.user.UserId;
    console.log(req.user);
    const user = await User.findOne({_id: UserId});
    res.status(StatusCodes.OK).json({user});
}

module.exports = {getAllUsers, getSingleUser, updateUser, deleteUser, showCurrentUser}
