import React from "react"
import axios from "axios"

export default function CreateReview(props){
    const rating = [1, 2, 3, 4, 5]
    const {productId} = props;

    const line = "ri-star-line"
    const fill = "ri-star-fill"

    const defaultStar = [false, false, false, false, false]
    const [star, setStar] = React.useState([false, false, false, false, false])
    const  [clicked, setClicked] = React.useState(false);
    const [finalRating, setFinalRating] = React.useState(0)
    const [formData, setFormData] = React.useState({
        title: "",
        comment: ""
    })
    const [writeReviewClicked, setWriteReviewClicked] = React.useState(false);

    const handleHover = (id) => {
        if(!clicked){
            const newStar = defaultStar;
            for(let i = 0; i<id; i++){
                newStar[i] = true;
            }
            setStar(newStar)
        }
       
    }

    const resetHover = () => {

        if(!clicked){
            const newStar = defaultStar;
            setStar(newStar)
        }
    }

    const handleClick = (id) => {
        const newStar = defaultStar;
        for(let i = 0; i<id; i++){
            newStar[i] = true;
        }
        setStar(newStar)
        setClicked(true);
        setFinalRating(id)
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevForm) => {
            return (
                {...prevForm, [name]: value}
            )
        })
    }

    const cancelReview = () => {
        setWriteReviewClicked(false);
        setFormData({title: "", comment: ""})
        setStar(defaultStar)
    }

    const submitReview = async () => {
        try {
            const reviewInfo = {
                product: productId,
                title: formData.title,
                comment: formData.comment,
                rating: finalRating
            }
            console.log("review info is ", reviewInfo)
            const {data} = await axios.post("/api/v1/review", reviewInfo)
            console.log(data.review)
            alert("Thank you for leaving us a review!")
            cancelReview();
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <div className="createReview_container">
            <div className="createReview">
                <div className="title">
                    <div className={writeReviewClicked ? "write_btn_clicked" : "write_btn"} onClick = {() => {setWriteReviewClicked(true)}}>
                    Write a review
                    </div>
                </div>
               { writeReviewClicked && <div className="review_form">
                    <div className="review_field">
                        <div className="review_title">
                            Rating
                        </div>

                        <div className="review_content">
                            <div className="rating">
                                {
                                    rating.map((id) => {
                                        return (
                                            <span 
                                                className="star" 
                                                onMouseOver={() => {handleHover(id)}} 
                                                onMouseOut={resetHover} 
                                                onMouseDown = {() => {handleClick(id)}}
                                            >
                                                 <i class={star[id-1] ? fill : line} ></i>
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="review_field">
                        <div className="review_title">
                            Review title
                        </div>
                        <div className="review_content">
                            <input
                                type = "text"
                                name = "title"
                                placeholder = "Give your review a title"
                                value = {formData.title}
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className="review_field">
                        <div className="review_title">
                            Review 
                        </div>
                        <div className="review_content">
                            <textarea
                                type = "text"
                                name = "comment"
                                placeholder = "Write your comments here"
                                value = {formData.comment}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                </div>}
                {writeReviewClicked && <div className="review_btn">
                    <div className="submit_btn" onClick={submitReview}>
                        Submit Review
                    </div>
                    <div className="cancel_btn" onClick = {cancelReview}>
                        Cancel Review
                    </div>
                </div>}
            </div>
        </div>
    )
}