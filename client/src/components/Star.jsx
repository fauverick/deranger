import React from "react"

export default function Star(props){
    const rating = [1, 2, 3, 4, 5]
    let star = [false, false, false, false, false]

    for(let i = 0; i<props.rating; i++){
        star[i] = true;
    }

    const line = "ri-star-line"
    const fill = "ri-star-fill"

    return (
        <div className="star_row">
            {
                rating.map((id) => {
                    return (
                        <span className="star">
                            <i class={star[id-1] ? fill : line} ></i>
                        </span>
                    )
                })
            }
        </div>
    )
}