import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){
    return(
    <div className = "footer">
        <div className = "col">
            <Link to = "/collection">
                <div className = "link">Shop men</div>
            </Link>
            <Link to = "/collection2">
                <div className = "link">Shop women</div>
            </Link>
            <Link to = "/lookbook">
                <div className = "link">Lookbook</div>
            </Link>
            <Link to = "/about">
                <div className = "link">About Deranger</div>
            </Link>

        </div>
        <div className = "col">
             <Link to = "/contact">
                <div className = "link">Contact</div>
            </Link>
            <Link to = "/collection2">
                <div className = "link">RETURN & EXCHANGES</div>
            </Link>
            <Link to = "/lookbook">
                <div className = "link">TERMS OF SERVICES</div>
            </Link>
          
            <div className = "social">
                <Link to = "">
                    <div className = "icon">
                        <i className="ri-instagram-line"></i>
                    </div>
                </Link>
                <Link to = "">
                    <div className = "icon">
                        <i className="ri-facebook-box-line"></i>                   
                    </div>
                </Link>
             
            </div>
        </div>
        <div className = "col2">
            <div className = "logo"><i className="ri-paypal-line"></i></div>
            <div className = "logo"><i className="ri-visa-fill"></i></div>
        </div>
    </div>
    )
}