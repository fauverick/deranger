const createTokenUser = (user) => {
    const tokenUser = {
        name: user.name,
        role: user.role,
        UserId: user._id
    }
    return tokenUser
}

module.exports = createTokenUser