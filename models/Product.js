const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt  = require('bcryptjs')

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: [true, 'please provide name'],
        maxLength: [100, 'name cant be longer than 100 characters']
    }, 
    price : {
        type: Number,
        required: [true, 'please provide price'],
    }, 
    description: {
        type: String,
        required: [true, 'please provide description'],
        maxlength: [1000, 'description cannot be longer than 1000']
    },
    url: {
        type: [String],
        default: ['default.jpg']
    },
    sizes : {
        type: [String],
        required: [true, 'please provide sizes'],
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL'],
            message: '{VALUE} is not provided'
        }
    },
    colors: {
        type: [String],
        required: [true, 'please provide color']
    },
    season: {
        type: String,
        default: 'SS2023'
    },
    category : {
        type: [String],
        required: [true, 'please provide category'],
        enum: {
            values: ['top', 'bottom', 'tshirt', 'shirt', 'trousers', 'shorts', 'tank', 'accessories', 'jeans'],
            message: '{VALUE} is not provided'
        }
    },
    averageRating: {
        type: Number,
        default: 0
    },
    numOfReviews : {
        type: Number,
        default: 0
    }
}, {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}})

productSchema.virtual('reviews', { //to get all reviews of a product
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
    // match: {rating: 5} //query only products with a rating of 5
  });


productSchema.pre('deleteOne', async function (next){ //currently not working dont know why
    console.log("removing");
    await this.model('review').deleteMany({product: this._id})
})

module.exports = mongoose.model('product', productSchema);