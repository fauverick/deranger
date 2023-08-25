import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckOutForm";
import axios from "axios"
import { ContextConsumer } from "../context/Context";
import { NavLink, useNavigate } from "react-router-dom";




export default function Payment(props){
   
    const [formData, setFormData] = React.useState({
        first_name: "",
        last_name: "",
        credit_card: "",
        cvc: "",
        expiration_date: ""
    })
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevForm) => {
            return (
                {...prevForm, [name]: value}
            )
        })
        console.log(formData);
    }

    const navigate = useNavigate()

    return (
       <ContextConsumer>
        {
            (context) => {
                const order = context.order;
                console.log("current order is ", order);
                const emptyCart = context.emptyCart;

                const placeOrder = async() => {
                    try{
                         const {data} = await axios.post("/api/v1/order", order)
                         console.log(data.order)
                         navigate("/orderplaced")
                         emptyCart();
                    }
                    catch(error){
                     console.log(error)
                    }
                 }


                return (
                    <div className="payment_container">
                        <div className="payment">
                            <div className="order_summary">
                                <span className="title">
                                    Checkout
                                </span>
                                <span className="order_price">
                                    Show Order Summary: ${order.totalcost}
                                </span>
                            </div>
                            <div className="payment_form">
                                <div className="payment_title">
                                Enter your card information:
                                </div>
                                <div className="payment_info">
                                    <div className="payment_input">
                                        <div className="fill half_width">
                                            <div className="title">
                                                First Name
                                            </div>
                                            <div className="input_block">
                                                <input
                                                    type="text"
                                                    id = "first_name"
                                                    name = "first_name"
                                                    value = {formData.first_name}
                                                    onChange={handleChange}
                                                >
                                                </input>
                                            </div>
                                        </div>
                                        <div className="fill half_width"   >
                                            <div className="title">
                                                Last Name
                                            </div>
                                            <div className="input_block">
                                                <input 
                                                    type="text"
                                                    id = "last_name"
                                                    name = "last_name"
                                                    value = {formData.last_name}
                                                    onChange={handleChange}
                                                >
                                                </input>
            
                                            </div>
                                        </div>
                                        <div className="fill half_width" >
                                            <div className="title">
                                            Credit Card Number
                                            </div>
                                            <div className="input_block">
                                                <input 
                                                        type="text"
                                                        id = "credit_card"
                                                        name = "credit_card"
                                                        value = {formData.credit_card}
                                                        onChange={handleChange}
                                                        placeholder="1234 1234 1234 1234"
                                                    >                                   
                                                </input>
            
                                            </div>
                                        </div>
                                        <div className="fill half_width" >
                                            <div className="title">
                                                CVC
                                            </div>
                                            <div className="input_block">
                                                <input 
                                                    type="number"
                                                    id = "cvc"
                                                    name = "cvc"
                                                    value = {formData.cvc}
                                                    onChange={handleChange}
                                                >
                                                </input>
            
                                            </div>
                                        </div>
                                        <div className="fill half_width">
                                            <div className="title">
                                                Card Expiration
                                            </div>
                                            <div className="input_block">
                                                <input
                                                    type="number"
                                                    id = "expiration_date"
                                                    name = "expiration_date"
                                                    value = {formData.expiration_date}
                                                    onChange={handleChange}
                                                >
                                                </input>
            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment_btn" onClick={placeOrder}>
                                    Place your order
                                </div>               
                            </div>
                        
                        </div>
                    
                    </div>
                )
            }
        }
       </ContextConsumer>
    )
}