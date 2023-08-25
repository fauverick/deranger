const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'please provide username'],
        maxlength: [30, 'name cannot be longer than 30 characters']
    },
    first_name: {
        type: String,
        default: ""
    },
    last_name: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 6
    },
    email: {
        type: String,
        required: [true, 'pls provide a email'],
        validate: {
            validator: validator.isEmail,
            msg: 'please provide a valid email'
        }
    },
    role: {
        type: String,
        default: 'user'
    } 
})

UserSchema.pre('save', async function (){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
})

UserSchema.methods.comparePassword = async function (candidatePassword){
    console.log("comparing ", candidatePassword, this.password)
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
  
}

module.exports = mongoose.model('user', UserSchema)

