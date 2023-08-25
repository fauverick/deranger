import React from "react";
import { Link, useLocation } from "react-router-dom";
import clothes from "../clothes";

export default function Breadcrumb(){

    const {pathname} = useLocation();

    let currentLink = "";

    function isCode(path){
        let res = "";
        for(let i = 0; i<clothes.length; i++){
            if(path == clothes[i].id)
            res = clothes[i].name;
        }
        console.log("new Link is ", path, " ", res)
        return res;
    }

    const breadcrumb = pathname.split("/")
        .filter(path => path!= "")
        .map(path => {
            currentLink += ("/"+ path);
            const newPath = isCode(path);
            return(                
                <Link to = {currentLink} key = {currentLink} className = "breadcrumb">
                    <span className="breadcrumb_element"> / {newPath === "" ? path : newPath} </span>
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