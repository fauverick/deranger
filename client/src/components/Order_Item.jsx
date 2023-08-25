import React from "react";
import { ContextConsumer } from "../context/Context";
import { Link } from "react-router-dom";

export default function Order_Item(props){
    return(
        <div className = "item_container">
            <div className = "item_img">
                <img src = {props.image}/>
                <span className = "item_quantity">{props.quantity}</span>
            </div>
            <div className = "item_info">
                <div className = "item_id ">
                    <div className = "item_name">
                        <span>{props.name}</span>
                    </div>
                    <div className = "item_size">
                        <span>{props.size} / {props.color}</span>
                    </div>
                </div>
                <div className = "item_price">
                    <span>{props.price} USD</span>
                </div>
            </div>
     </div>
    )
}