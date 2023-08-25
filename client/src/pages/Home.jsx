import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div className = "banner">
            <div className = "container">
                <div className = "logo">
                    <Link to = "/men">
                        <img src = "https://fauverick.github.io/deranger_web/img/deranger%20typeface%202.svg"/>
                    </Link>
                </div>
                <div className = "content_container">
                    <div className = "content">
                    <Link to = "/men">
                       Men Summer 2021
                    </Link>
                    </div>
                </div>
            </div>
    </div>
    )
}