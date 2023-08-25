import Star from "./Star"

export default function RatingRow(props){
    return (
        <div className="review_row">
            <div className="star_container">
                <Star
                    rating = {props.rating}
                />
            </div>
            <div className="line_container">
                <div className="line" style = {{width: `${props.percentage}%`}}>

                </div>
            </div>
            <div className="amount">
                {props.amount}
            </div>
        </div>
    )
}