import { Link } from "react-router-dom";


export default function Selected_Items(props){
    return (
        <div className = "container">
        <Link to ={props.link}>
            <img src = {props.img1}/> 
            <img src = {props.img2} className="img-top" alt="Card Front"/>
        </Link>
        <Link to ={props.link}>
            <p><span className = "product_name">{props.name}</span> <span className = "price"> $ {props.price}</span></p>
        </Link>
        </div>
    )
}