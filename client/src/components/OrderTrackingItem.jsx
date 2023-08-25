export default function OrderTrackingItem(props){
    return (
        <div className="order_tracking_item_container">
            <div className="order_tracking_item">
                <div className="order_item_name">
                    <div className="image">
                        <img src = {props.image}/>
                    </div>
                    <div className="name">
                        {props.name}
                    </div>
                </div>
                <div className="order_item_details">
                    <p>Qty: {props.quantity}</p>
                    <p>Size: {props.size}</p>
                    <p>Color: {props.color}</p>
                    <p>Price: {props.price} CAD</p>

                </div>
            </div>
        </div>
    )
}