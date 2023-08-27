import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ContextConsumer } from "../context/Context";
import AccountIcon from "./AccountIcon";

export default function Header(){

    const [search, setSearch] = React.useState("")
    const navigate = useNavigate()


 
    return(

       <ContextConsumer>
        {(context) => {

            const cart = context.cart;
            const user = context.user;
            const updateSearch = context.updateSearch

            const handleChange = (event) => {
                const {value} = event.target;
                setSearch(value)
                console.log("search is ", search)
            }

            const searchClicked = () => {
                updateSearch(search)
                navigate("/men")
            }

            const handleKeyPress = (event) => {
                console.log("key down")
                if(event.keyCode === 13){
                    updateSearch(search)
                    navigate("/men")
                }
            }
        

            return(
                <div>
                <div className = "header">
                    <span className = "bar" id = "bar">
                        <img src = "../uploads/menu.svg"/>
                    </span>
                    <span className="search_container">
                        <div className="search_bar">
                            <input  
                                type = "text"
                                value = {search}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                            >
                            </input>

                            <span className = "search_icon" onClick={searchClicked} >
                                <img src = "../uploads/search.svg"/>
                            </span>
                        </div>
                       
                    </span>
                    
                    <span className = "logo" >
                        <NavLink to = "/"> 
                        <img src = "../uploads/logo.svg"/>               
                        </NavLink>
                    </span>
                    <span className="icon">  
                        {/* <span className = "icon account_icon " >
                            <NavLink to = "/authentication">
                            <i class="ri-account-circle-line"></i>                       
                            </NavLink>
                        </span> */}
                        <AccountIcon/>
                        <span className = "icon cart_icon" >
                            <NavLink to = "/cart">
                            {(cart.length > 0 && user) &&  
                                    <span>
                                        {cart.length}
                                    </span>
                                }
                                <i class="ri-shopping-cart-line"></i>
                            </NavLink>
                        </span>
                   
                    </span>
                  
                </div>
    
                <div className = "menu">
                    <span className = "link">
                        <NavLink to = "/men">OUR STORE</NavLink>
                    </span>
                    {/* <span className = "link">
                        <NavLink to = "/women">SHOP WOMEN</NavLink>
                    </span> */}
                    <span className = "link">
                        <NavLink to = "/lookbook">LOOKBOOK</NavLink>
                    </span>
                    <span className = "link">
                        <NavLink to = "/about">ABOUT DERANGER</NavLink>
                    </span>
                </div>
            </div>
            )
        }}
       </ContextConsumer>
    )
}