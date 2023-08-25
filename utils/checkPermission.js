const CustomError = require('../errors')

const checkPermission = (requestUser, resourceUserId) => {
    if(requestUser.role == 'admin'){
        console.log('admin');
        return;
    }
    if(requestUser.UserId == resourceUserId.toString()){
        console.log('authorized user');
        return;
    }
    throw new CustomError.UnauthorizedError('not ur place bitch')
}

module.exports = checkPermission;