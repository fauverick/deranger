import React from "react"
import Star from "./Star"
import RatingRow from "./RatingRow"
import axios from "axios"
import SingleReview from "./SingleReview"

export default function CustomerReviews(props){

    const {productId} = props;

    const [reviews, setReviews] = React.useState([])
    const[reviewCount, setReviewCount] = React.useState(0) 
    const [allReviews, setAllReviews] = React.useState([])


    React.useState(() => {
        async function fetchReviews(){
            try {
                const {data} = await axios.get(`/api/v1/review/reviewsOfProduct/${productId}`)
                const reviewData = data.reviews;

                let reviewArray = [0, 0, 0, 0, 0, 0];

                for(let i = 0; i<reviewData.length; i++){
                    reviewArray[5 - reviewData[i].rating]++  
                } 

                setReviews(reviewArray)
                setAllReviews(reviewData)
                setReviewCount(reviewData.length)

            }
            catch(error){
                console.log(error)
            }
        }
        fetchReviews()
    }, [])

    console.log("the reviews are ", reviews)

    return (

        <div className="customerReview_container">
            <div className="customerReview">
                <div className="title">Customer Reviews</div>
                <div className="review_content">
                    {
                        reviews.map((review, index) => {
                            if((5 - index) > 0)
                            {
                                return(
                                    <RatingRow
                                        rating = {5 - index}
                                        amount = {review}
                                        percentage = {Math.floor(review/reviewCount * 100)}
                                    />
                                )
                            }
                           
                        })
                    }
                    <div className="single_review_container">
                    {
                        allReviews.map((review) => {
                            return (
                                <SingleReview
                                    rating = {review.rating}
                                    title = {review.title}
                                    comment = {review.comment}
                                    username = {review.username}
                                />
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}