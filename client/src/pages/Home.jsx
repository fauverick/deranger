import React from "react";
import { Link } from "react-router-dom";
import Selected_Items from "../components/Selected_Items";
import axios from "axios"

export default function Home(){

    const [products, setProducts] = React.useState([])

    React.useEffect(() => {
        async function fetchData(){
            const result = await axios.get(
                `/api/v1/product?page=${1}&limit=${4}&color=${"all"}&size=${"all"}&category=${"all"}&sort=${"price high to low"}&search=${""}`
            );
        
           setProducts(result.data.products)
           console.log(result.data.products)
        }
        fetchData();
    }, [])
    

    return(
        <div className="home">
            <div className = "banner">
                <div className = "container">
                    <div className = "logo">
                        <Link to = "/men">
                            <img src = "https://fauverick.github.io/deranger_web/img/deranger%20typeface%202.svg"/>
                        </Link>
                    </div>
                    <div className = "content_container">
                        <div className = "content">
                        <Link to = "/men">
                        Men Summer 2021
                        </Link>
                        </div>
                    </div>

                </div>
            </div>
            <div className="selected_items">
                SELECTED ITEMS
            </div>
            <div className="selected">
                {
                    products.map((product) => {
                        return (
                            <Selected_Items
                                name = {product.name}
                                img1 = {product.url[0]}
                                img2 = {product.url[1]}
                                price = {product.price}
                                link = {`/men/${product._id}`}
                            />
                        )
                    })
                }
            </div>
            <div className="selected_btn">
                <div className="explore_btn">
                    <Link to = "/men">
                        VIEW MORE
                    </Link>
                </div>
            </div>
        </div>
       
    )
}