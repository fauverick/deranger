import React from "react";
import { ContextConsumer } from "../context/Context";
import { Link } from "react-router-dom";

export default function Cart_Item(props){

    const [price, setPrice] = React.useState(props.price * props.quantity);

    const [inputData, setInputData] = React.useState(props.quantity);
    const [checked, setChecked] = React.useState(false)


  
    return(

        <ContextConsumer>
            {(context) => {

                const removeItem = context.removeItem;
                const changeQty = context.changeQty;
            

                function handleChange(event, id){
                    const newQty = event.target.value
                    setInputData(newQty);
                    changeQty(id, newQty);
                    setPrice(props.price * newQty);
                }


            
            
                return(
                    <div className="cart_item">

                        <Link to = {`/men/${props.productId}`}  className="item_info">
                            <div className="info_container">
                                <div className="item_img">
                                    <img src = {props.url}/>
                                </div>
                
                                <div className="item_details">
                                    <p className="name">
                                        {props.name}
                                    </p>
                                    <p className="order">
                                        <span>{props.size}</span> / <span>{props.color}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                       
                        <div className="item_nav">
                            <div className="input_container">
                                <input
                                    type = "number"
                                    value = {inputData}
                                    onChange = {() => handleChange(event, props.cartItemId)}
                                    min="1" max="5"
                                />
                            </div>
                        
            
                            <p className="price">
                                {price} USD
                            </p>

                            <div className="remove" onClick = {() => removeItem(props.cartItemId)} >
                                <img src = "https://fauverick.github.io/deranger_web/img/delete.svg"/>
                            </div>
                        </div>
            
                      
                    
                    </div>
                )
            }}
        </ContextConsumer>
       
    )
}