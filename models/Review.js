const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "please provide rating"],
    },
    title: {
        type: String,
        trim: true,
        required: [true, "please provide review title"],
        maxlength: 100,
    },
    comment: {
        type: String,
        trim: true,
        required: [true, "please provide review title"],
        maxlength: 100,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true
    }
})

ReviewSchema.index({product: 1, user: 1}, {unique: true})

ReviewSchema.statics.calculateAverageRating = async function(productId){
    const result = await this.aggregate([
        {
            $match: {product: productId}
        },
        {
            $group: {
                _id: null,
                averageRating: {$avg: "$rating"},
                numOfReviews: {$sum: 1}
            }
        }
    ]
    )

    try{
       await this.model("product").findOneAndUpdate(
        {_id: productId},
        {
            averageRating:(Math.round(result[0]?.averageRating * 10) / 10|| 0),
            numOfReviews: result[0]?.numOfReviews || 0
        }
       )
    } 
    catch(error){
        console.log(error)
    }
    console.log(result)
}

ReviewSchema.post("save", async function(){
    console.log("running save or delete")
    await this.constructor.calculateAverageRating(this.product)
})

ReviewSchema.post("deleteOne", async function(){
    await this.constructor.calculateAverageRating(this.product)
    console.log("running delete")
})

module.exports = mongoose.model('review', ReviewSchema)