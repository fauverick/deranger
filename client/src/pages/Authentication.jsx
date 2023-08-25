import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate, NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { ContextConsumer } from "../context/Context";
  

export default function Authentication(){
    

    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    })

    const [loggedin, setLoggedin] = React.useState(false)

   

    const navigate = useNavigate()

     useEffect(() => {
        if(loggedin){
            console.log("redirecting")
            alert ("Logged in succesfully!")
            setTimeout(() => {
                navigate("/", {state : "loggedin"}) // go to homepage
            }, 1000)
        }
    }, [loggedin])


    function handleChange(event){
       const {name, value} = event.target;
       setFormData(prevForm => {
           return  ({...prevForm, [name]: value})
       })
    }

  

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth-form">
                    <form>
                        <label htmlFor = "email">
                            Email:
                        </label>

                        <input 
                            type = "text" 
                            id = "email"
                            name = "email"
                            value = {formData.email}
                            onChange={handleChange}
                        />

                        <label htmlFor = "password">
                            Password:
                        </label>

                        <input 
                            type = "password" 
                            id = "password"
                            name = "password"
                            value = {formData.password}
                            onChange={handleChange}
                        />

                    </form>
                </div>

                <ContextConsumer>
                {
                    (context) => {

                        const saveUser = context.saveUser;

                        const login = async (event) => {

                            event.preventDefault();
                            const email = formData.email;
                            const password = formData.password;      
                    
                            try{
                                const {data} = await axios.post("/api/v1/auth/login", {
                                        email: email,
                                        password: password
                                    })
                    
                                
                                console.log(data.user)
                                saveUser(data.user);
                               
                                setFormData({email: '', password: ''});
                                setLoggedin(true)
                            }
                            catch(error) {
                                console.log(error)
                                console.log(error.response.data)
                                alert(error.response.data)
                            } 
                        }

                        return (
                        <button className="login-btn" onClick = {login}>
                            Login
                        </button>
        
                        )
                    }
                }

                </ContextConsumer>
               
                <button className="register-btn" >
                    <NavLink to = "/register" className="nav">Register Account</NavLink>  
                </button>

            </div>
        </div>
    )
}