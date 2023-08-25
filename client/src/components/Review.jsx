import React from "react"

import CustomerReviews from "./CustomerReviews"
import CreateReview from "./CreateReview"

export default function Review(props){
    return (
        <div className="review_container">
            <CustomerReviews
                productId = {props.productId}
            />
            <CreateReview
                productId = {props.productId}
            />
        </div>
    )
}