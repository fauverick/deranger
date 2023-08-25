import Star from "./Star"

export default function (props){
    return (
            <div className="single_review">
                <Star rating = {props.rating}/>
                <div className="review_username">
                    {props.username}
                </div>
                <div className="review_title">
                    {props.title}
                </div>
                <div className="review_comment">
                    {props.comment}
                </div>
            </div>
    )
}