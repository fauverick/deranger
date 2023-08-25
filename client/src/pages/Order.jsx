import React from "react";
import { ContextConsumer } from "../context/Context";
import Order_Item from "../components/Order_Item"
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Order(){
    const [formData, setFormData] = React.useState({
        contact_info: "",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        shipping_telephone: ""
    })

    const handleChange = (event) => {
        console.log("handling change")
        const {name, value} = event.target 
        setFormData(prevForm => {
            return  ({...prevForm, [name]: value})
        })
        console.log(formData)
    }

    const navigate = useNavigate()

   
    return (
        <ContextConsumer>
        {
            
            (context) => {

                const cart = context.cart;
                const updateOrder = context.updateOrder;

                let newOrder = {};
            
                const itemList = cart.map((item) => {
                    return (
                        <Order_Item
                            image = {item.image}
                            name = {item.name}
                            price = {item.price}
                            quantity = {item.quantity}
                            size = {item.size}
                            color = {item.color.toUpperCase()}
                        />
                    )
                })

                const createOrder =  () => {

                    if(!formData.address || !formData.city || !formData.contact_info || !formData.first_name || !formData.last_name || !formData.shipping_telephone ){
                        alert("Please fill out all fields in the form")
                    }
                    else{
                        const orderDetails = {
                            shippingFee: shipping_fee,
                            subTotal: subTotal,
                            totalcost: totalcost,
                            cartItems: cart,
                            customerInfo: formData
                        }

                        updateOrder(orderDetails);

                        // const {data} = await axios.post("/api/v1/order", orderDetails)
                        // console.log(data.order)
                        navigate("/payment")
                    }   
                       
                   
                }
            

                let subTotal = 0;
                for(let i = 0; i<cart.length; i++){
                    subTotal += (cart[i].price * cart[i].quantity);
                }

                let shipping_fee = 10;
                let tax = subTotal * 0.15;
                let totalcost = subTotal + shipping_fee + tax;

                return (
                    <div className="order_container">
                        <div className="info_col">
                            <div className="order_header">
                                <p></p>
                            </div>
                            <div className="order_form">
                                <div className="contact_info">
                                    <div className="title">
                                        Contact Information
                                    </div>
                                    <div className="fill">
                                        <div className="title">
                                            Email or Tel.
                                        </div>
                                        <div className="input_block">
                                            <input 
                                                type = "text"
                                                id = "contact_info"
                                                name = "contact_info"
                                                value = {formData.contact_info}
                                                onChange={handleChange}
                                            >
                                                
                                            </input>
                                        </div>
                                    </div>
            
                                </div>
            
                                <div className="shipping_info">
                                    <div className="title">
                                        Shipping information
                                    </div>
                                    <div className="input_container">
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
                                        <div className="fill half_width" >
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
                                        <div className="fill full_width" >
                                            <div className="title">
                                                Address
                                            </div>
                                            <div className="input_block">
                                                <input 
                                                        type="text"
                                                        id = "address"
                                                        name = "address"
                                                        value = {formData.address}
                                                        onChange={handleChange}
                                                    >                                   
                                                </input>
            
                                            </div>
                                        </div>
                                        <div className="fill full_width" >
                                            <div className="title">
                                                City
                                            </div>
                                            <div className="input_block">
                                                <input 
                                                    type="text"
                                                    id = "city"
                                                    name = "city"
                                                    value = {formData.city}
                                                    onChange={handleChange}
                                                >
                                                </input>
            
                                            </div>
                                        </div>
                                        <div className="fill full_width">
                                            <div className="title">
                                                Telephone
                                            </div>
                                            <div className="input_block">
                                                <input
                                                    type="text"
                                                    id = "shipping_telephone"
                                                    name = "shipping_telephone"
                                                    value = {formData.shipping_telephone}
                                                    onChange={handleChange}
                                                >
                                                </input>
            
                                            </div>
                                        </div>
            
                                        <div className="payment_btn" 
                                            onClick = {createOrder}
                                        >
                                            Continue to payment
                                        </div>
            
                                    </div>
                                </div>
            
                            
                            </div>
                        </div>
                        <div className="details_col">
            
                           
                                <div className="details_container">
                                    <div className = "item_list">
                                        {/* <Order_Item
                                            image = {"https://fauverick.github.io/deranger_web/img/clothes/scenic_pattern/tiny.png"}
                                            quantity = {1}
                                            size = {"XS"}
                                            price = {30}
                                        /> */}
                                        {itemList}
                                    </div>

                                    <div className = "promo_code">
                                        <div className = "fill">
                                            <div className = "title">Promotion Code</div>
                                            <input type="text"> 
                                            </input>
                                        </div>
                                        <div className = "button">
                                            <div>Apply</div>
                                        </div> 
                                    </div>

                                    <div className = "summary">
                                        <div className = "summary_content">
                                            <span style = {{color: 'black'}}>Sub Total: </span>
                                            <span>{subTotal} USD</span>
                                        </div>
                                        <div className = "summary_content">
                                            <span style = {{color:'black'}}>Shipping Fee:	</span>
                                            <span>{shipping_fee} USD</span>
                                        </div>
                                        <div className = "summary_content" style = {{padding: 0}}>
                                            <span style = {{color:'black'}}>Tax:	</span>
                                            <span>{tax} USD</span>
                                        </div>
                                    </div>

                                    <div className = "final">
                                        <div className = "final_content">
                                            <div className = "title">
                                                <span>Total</span>
                                                <img src = "../uploads/down-arrow.svg" id = "show_details"/>
                                            </div>
                                            <span className="final_price">{totalcost} USD</span>
                                        </div>
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