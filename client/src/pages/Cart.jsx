import React from "react";
import Cart_Item from "../components/Cart_Item";
import { ContextConsumer } from "../context/Context";
import { NavLink } from "react-router-dom";
import { set } from "mongoose";


export default function Cart(){

    return(
        <div className="cart_container">
            <ContextConsumer>
            {(context) => {

                const cart = context.cart;
                const user = context.user;
                const createOrder = context.createOrder;
                console.log("user is ", user);

                // console.log("cart is ", cart);
                // console.log("order is ", order)

                let totalcost = 0;
                for(let i = 0; i<cart.length; i++){
                    totalcost += (cart[i].price * cart[i].quantity);
                    console.log( " hello ", cart[i]);
                }

                
             
              
                const cartItem = cart.map((item) => {
                    return(
                        <div>

                            <Cart_Item
                                url = {item.image}
                                name = {item.name}
                                price = {item.price}
                                size = {item.size}
                                color = {item.color}
                                productId = {item.product}
                                quantity = {item.quantity}
                                key = {item._id}
                                cartItemId = {item._id}
                            />
                        </div>
                      
                    )
                })

              

                return(
                   <div>
                    {(cart.length === 0 && user )&& 
                        <div className="no_cart">
                            <h1>You have no item in your cart</h1>
                        </div>
                    }
                    {(cart.length === 0 && !user) && 
                        <div className="no_cart">
                            <h1>Please sign in to view your cart</h1>
                            <NavLink to = "/authentication">
                                <div className="login_btn">
                                    Sign In
                                </div>
                            </NavLink>
                        </div>
                    }
                     {cartItem}
                    {cart.length > 0 && 
                    <div className="check_out_container"> 
                        <div className="check_out"> 
                            <p>
                                Sub Total : {totalcost} USD
                            </p>

                            <NavLink to = "/order">
                            <button >
                                Check Out
                            </button>
                            </NavLink>
                           
                        </div>
                    </div>
                   
                     }
                   </div>
                )
            }}
            </ContextConsumer>
        </div>
    )
}