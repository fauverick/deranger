const {isTokenValid} = require('../utils')
const CustomError = require('../errors')

const authenticateUser = (req, res, next) => { //attach user info to req.user
    const token = req.signedCookies.token;
    if(!token){
        throw new CustomError.UnauthenticatedError('invalid authentication, no token found')
    }
    try {
        const {name, UserId, role} =  isTokenValid({token});
        console.log(name, UserId, role);
        req.user = {name, UserId, role};
        next()
    }
    catch (error){
        console.log('this is error: ', error)
        throw new CustomError.UnauthenticatedError('invalid authentication -heheheh')
    }
}

const authorizePermission = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('not ur place bitch')
        }
        next();
    }
}

module.exports = {authenticateUser, authorizePermission}