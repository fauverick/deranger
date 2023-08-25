import OrderTracking from "../components/OrderTracking"
import React from "react"
import axios from "axios"
import { ContextConsumer } from "../context/Context"
import { NavLink } from "react-router-dom";

export default function MyOrders(){

    const [orders, setOrders] = React.useState([])
    React.useEffect(()=> {
        async function fetchOrders(){
            try{
                const {data} = await axios.get("/api/v1/order/getMyOrders")
                setOrders(data.myOrders)
                console.log("data is ", data)
                console.log("my orders are ", orders)
            }
            catch (error){
                console.log(error)
            }
        }
        fetchOrders()

    }, [])

    return(
        <ContextConsumer>
        {
            (context) => {
                const user = context.user;

                return (
                <div className="order_dashboard_container">
                    {(!user) && 
                        <div className="no_cart">
                            <h1>Please sign in to view your orders</h1>
                            <NavLink to = "/authentication">
                                <div className="login_btn">
                                    Sign In
                                </div>
                            </NavLink>
                        </div>
                    }
                   {user && <div className="order_dashboard">
                        <h1 className="dashboard_title">My Orders</h1>
                        <div className="order_tracking_container">
                               {
                                    orders.map((order) => {
                                        return (
                                            <OrderTracking
                                                time = {order.createdAt.toString().slice(0, 10).toUpperCase()}
                                                total = {order.total}
                                                orderItems = {order.orderItems}
                                                orderId = {order._id.toString().slice(19, 26)}
                                            />
                                        )
                                    })
                               }
                        </div>
                    </div>}
                </div>
                )
            }
        }
        </ContextConsumer>
       
    )
}