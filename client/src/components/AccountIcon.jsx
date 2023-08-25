import React from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"
import { ContextConsumer } from "../context/Context";

export default function AccountIcon(){

    const [hover, setHover] = React.useState(false);
    const [loggedOut, setLoggedOut] = React.useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        if(loggedOut){
            console.log("redirecting")
            alert ("Logged out succesfully!")
            setTimeout(() => {
                navigate("/", {state : "loggedout"}) // go to homepage
            }, 1000)
        }
    }, [loggedOut])

    const dropDownAppear = () => {
        setHover(true)
    }

    const dropDownAway = () => {
        setHover(false)
    }

  

    return (
        <ContextConsumer>
            {
                (context) => {

                    const removeUser = context.removeUser;

                    const logOut = async () => {
                        try {
                            const {data} = await axios.get("/api/v1/auth/logout");
                            setLoggedOut(true)
                            removeUser()
                            console.log("data logging out is ", data)
                        }
                        catch (error){
                            console.log(error)
                        }
                    }
                    
                    return (
                        <span className = "icon account_icon " onMouseOver = {dropDownAppear} onMouseLeave={dropDownAway}>
                        {
                            hover && 
                            <div className="drop_down">
                                <div className="drop_down_field">
                                    <NavLink to = "/dashboard">
                                        My Account
                                    </NavLink>
                                </div>
                                <div className="drop_down_field">
                                <NavLink to = "/myOrders">
                                        My Orders
                                    </NavLink>
                                </div>
                                <div className="drop_down_field">
                                    <NavLink to = "/authentication">
                                        Log in
                                    </NavLink>               
                                </div>
                                <div className="drop_down_field last">
                                    <div className="logout_btn"  onClick={logOut}>
                                        Log out
                                    </div>               
                                </div>
                            </div>
                        }
                        <NavLink to = "/authentication">
                            <i class="ri-account-circle-line"></i>                       
                        </NavLink>
                    </span>
                    )
                }
            }
        </ContextConsumer>
       
    )
}