import OrderTrackingItem from "./OrderTrackingItem"
import React from "react"

export default function OrderTracking(props){

    const [showDetails, setShowDetails] = React.useState(false)

    const toggleShow = () => {
        setShowDetails((prevShow) => (!prevShow))
    }

    const orderItemsList = props.orderItems.map((orderItem) => {
        return (
            <OrderTrackingItem
                name = {orderItem.name}
                image = {orderItem.image}
                quantity = {orderItem.quantity}
                color = {orderItem.color}
                price = {orderItem.price}
                size = {orderItem.size}
            />
        )
    })

    return (
        <div className="order_tracking">
            <div className="order_info">
                <div className="order_summary">
                    <div className="order_summary_field">
                        <div className="title">
                            Order Id:
                        </div>
                        <div className="content">
                            #{props.orderId}
                        </div>
                    </div>
                    <div className="order_summary_field">
                        <div className="title">
                            Placed:
                        </div>
                        <div className="content">
                            {props.time}
                        </div>
                    </div>
                    <div className="order_summary_field">
                        <div className="title">
                            Total:
                        </div>
                        <div className="content">
                            {props.total} CAD
                        </div>
                    </div>
                    <div className="details_btn" onClick={toggleShow}>
                        <i class="ri-arrow-drop-down-line"></i>
                    </div>
                </div>
                <div className="order_details_container">
                    {showDetails && <div className="order_details">
                            {orderItemsList}
                        </div>
                    }
                </div>
               
            </div>
            <div className="order_status">
                <div className="order_status_map">
                    <div className="circle">

                    </div>
                    <div className="line">
                        
                    </div>
                    <div className="circle">

                    </div>
                    <div className="line">
                        
                    </div>

                    <div className="circle">

                    </div>
                    <div className="line undone">
                        
                    </div>
                    <div className="circle undone">

                    </div>
                </div>

                <div className="order_status_title">
                    <div className="title">
                        Confirmed
                    </div>
                    <div className="title">
                        Processed
                    </div>
                    <div className="title">
                        Shipped
                    </div>
                    <div className="title">
                        Completed
                    </div>
                </div>
            </div>
        </div>
    )
}