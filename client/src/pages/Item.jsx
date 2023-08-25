import React from "react";
import { useParams } from "react-router-dom";
import clothes from "../clothes";
import { ContextConsumer } from "../context/Context";
import { nanoid } from 'nanoid'
import Breadcrumb from "../components/BreadCrumb";
import axios from "axios";
import Review from "../components/Review";
import Star from "../components/Star";

export default function Item(){
    const {id} = useParams();

    const [item, setItem]  = React.useState({
        url : [],
        sizes: [],
        colors: [],
        averageRating: 0,
        numOfReviews: 0
    }); 


    React.useEffect(() => {
        async function fetchData(){
            const result = await axios.get(
                `/api/v1/product/${id}`,
            );
            setItem(result.data.product);
        }
        fetchData();
    }, [])

    const [formData, setFormData] = React.useState({
        size: "",
        color: ""
    })

    function handleChange(event){
        const {name, value} = event.target;
        console.log(name, value);
        setFormData(prevForm => {
            return ({...prevForm, [name] : value})
        })
        console.log("formdata: ", formData.size);
    }

    const imageElements = item.url.map(image => (
        <img src = {image} key = {image}></img>
    ))

    const sizeElements = item.sizes.map(size => {
        return(
            <span key = {size}>
                <input 
                        type="radio" 
                        id= {size} 
                        name="size"
                        value={size}
                        checked = {size === formData.size}
                        onChange={handleChange}
                />
                <label htmlFor={size}>{size} </label>
            </span>
        )
    })

    let submitted = false;

    const colorElements = item.colors.map(color => {
        return (
            <span key = {color}>
            <input 
                    type="radio" 
                    id= {color} 
                    name="color"
                    value={color}
                    checked = {color === formData.color}
                    onChange={handleChange}
            />
            <label htmlFor={color}>{color} </label>
        </span>
        )
    })


    console.log("the final last item is", item)
    return(
        <div className="product">

            <Breadcrumb/>

            <div className="product_container">
                <div className="product_img">
                    {imageElements}
                </div>
                <div className="product_details">
                        <p className="name">{item.name}</p>
                        <p className="price">{item.price} USD</p>
                        <div className="rating">
                            <div className="rating_star">
                                <span>
                                    {item.averageRating}
                                </span>
                                <div className="star">
                                <Star
                                    rating = {item.averageRating}
                                />
                                </div>
                                
                            </div>
                            <span>
                                {`(${item.numOfReviews})`}
                            </span>
                        </div>
                       

                   
                    <fieldset>
                        <legend>
                            Choose Size
                        </legend>
                        {sizeElements}
                    </fieldset>

                    <fieldset>
                        <legend>
                            Choose Color
                        </legend>
                        {colorElements}
                     </fieldset>

                     <ContextConsumer>
                        {(context) => {

                            const addItem = context.addItem;
                            const user = context.user;
                            console.log("context is ", context)
                            // const fetchUser = context.fetchUser;
                            // fetchUser();


                            function addToCart(){
                                if(!user){
                                    alert("Please sign in to add items to your cart")
                                }
                                else{
                                    const newItem = {
                                        product: item.id,
                                        color : formData.color,
                                        size : formData.size,
                                        quantity: 1,
                                        // order_id : nanoid()
                                    }
                                   
                                    console.log("adding item ", newItem);
                                    if(newItem.color && newItem.size && !submitted) {
                                        submitted = true;
                                        addItem(newItem);
                                    }
                                    else{
                                        alert("Please choose size and colors")
                                    }
    
                                    console.log("adding to cart of ", user)
                                }
                            }

                            console.log("id in item is ", id)
                            return(
                                <div>
                                    <button onClick={() =>addToCart()}>
                                        Add to cart
                                    </button>
                                    <Review
                                        productId = {id}
                                    />

                                </div>
                               
                            )
                        }}
                     </ContextConsumer>

                   
                </div>
            </div>
        </div>
    )
}