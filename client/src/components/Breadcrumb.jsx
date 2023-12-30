import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ContextConsumer } from "../context/Context";
import axios from "axios";

export default function Breadcrumb(props){

    const {pathname} = useLocation();
    let clothes_code = ""

    const paths = pathname.split("/")
    clothes_code = paths[paths.length - 1]

    // console.log(clothes_code)

    const [clothesName, setClothesName] = React.useState("")

    React.useEffect(() => {
        async function getCode(){
            try{
                const {data} = await axios.get(
                    `/api/v1/product/${clothes_code}`,
                );     
                setClothesName(data.product.name)
                console.log("CLOTHES NAME ", data.product.name)

            }
            catch(error){
                console.log(error)
            }
        }
        getCode()
    }, [])

   


    let currentLink = "";

    const breadcrumb = paths
        .filter(path => path!= "")
        .map(path => {
            currentLink += ("/"+ path);
            if (path.length >= 15){
                path = props.itemName
            }
            return(                
                <Link to = {currentLink} key = {currentLink} className = "breadcrumb">
                    <span className="breadcrumb_element"> / {path} </span>
                </Link>
            )
         
        })


    return(
             <div className="breadcrumb_container">
                <Link to = "/" className="breadcrumb">
                    <span className="breadcrumb_element"> Home </span>
                </Link>
                {breadcrumb}
            </div>
       
    )
}