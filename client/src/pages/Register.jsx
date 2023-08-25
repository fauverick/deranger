import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

  

export default function Register(){
    

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: ""
    })

   const [registered, setRegistered] = React.useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if(registered){
            alert('Registered Successfully!')
            setTimeout(() => {
                navigate("/authentication")
            }, 1000)
            setFormData(
                {name: "", email: "", password: ""}
            )
        }
    }, [registered])

    function handleChange(event){
       const {name, value} = event.target;
       setFormData(prevForm => {
           return  ({...prevForm, [name]: value})
       })
    }

   const register = async (event) => {
        try{
            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }

            console.log("new user is ", newUser)
            const {data} = await axios.post("/api/v1/auth/register", newUser);

            setRegistered(true);

            console.log(data.user)
        }
        catch(error){
            console.log(error.response.data)
        }
       
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth-form">
                    <form>

                         <label htmlFor = "name">
                            Name:
                        </label>

                        <input 
                            type = "text" 
                            id = "name"
                            name = "name"
                            value = {formData.name}
                            onChange={handleChange}
                        />

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

                <button className="register-btn" onClick = {register}>
                    Register Account
                </button>

            </div>
        </div>
    )
}