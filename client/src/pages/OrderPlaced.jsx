import { NavLink } from "react-router-dom";

export default function OrderPlaced(){
    return(
        <div className="order_placed_container">
            <div className="order_placed">
                <h1>Order Placed Successfully! Track your order <span className="link"> <NavLink to = "/myOrders">here</NavLink></span>
                </h1>
            </div>
        </div>
    )
}