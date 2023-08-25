import React from "react";
import { useContext, useEffect, useState } from "react";
const {Provider, Consumer} = React.createContext();
import clothes from "../clothes";
import axios from "axios";

function ContextProvider({children}){

    const [user, setUser] = React.useState();
    const [cart, setCart] = React.useState([])
    const [order, setOrder] = React.useState({})
    const [subTotal, setSubTotal] = React.useState()

    const saveUser = (user) => {
        console.log("saving user ", user)
        setUser(user);
    }

    const removeUser = () => {
        setUser(null)
    }

    const fetchUser = async () => {
        console.log("fetching user")
        try {
            const {data} = await axios.get("/api/v1/user/showCurrentUser")
            saveUser(data.user)
            console.log("the user is ", data.user)
        }
        catch(error){
            removeUser()
            console.log(error)
        }
    }

    const logoutUser = async() => {
        try {
            await axios.get("/api/v1/auth/logout")
            removeUser()
        }
        catch(error){
            console.log(error)
        }
    }

    React.useEffect(() => {
        fetchUser()
    }, [])

    // const [cart, setCart] = React.useState(() => JSON.parse(localStorage.getItem("cart")) || []);

    // function addItem(item){
    //     let isNew = true;
    //     let order_id = "";
    //     let newQty = 0;
    //     for(let i = 0; i<cart.length; i++){
    //         if((cart[i].id == item.id) && (cart[i].color == item.color) && (cart[i].size == item.size)){
    //             isNew = false;
    //             order_id = cart[i].order_id;
    //             newQty = cart[i].quantity;
    //             newQty++;
    //             console.log(cart[i].quantity, " ", newQty);
    //         }
    //     }
    //     if(isNew){
    //         setCart(prevCart => [...prevCart, item]);   
    //     } else{
    //         changeQty(order_id, newQty);
    //     }
    //     console.log(cart);
    // }

    const fetchCart = async() => {
        try{
            const {data} = await axios.get("/api/v1/cart")
            setCart(data.cartItems)
            getSubTotal()

        }
        catch(error){
            console.log(error)
        }
    }

    const emptyCart = async() => {
        try {
            await axios.delete("/api/v1/cart")
            fetchCart()
        }
        catch(error){
            console.log(error)
        }
    }
  

    const getSubTotal = () => {
        let cost = 0;
        for(let i = 0; i<cart.length; i++){
            cost += (cart[i].price * cart[i].quantity);
        }
        setSubTotal(cost)
    }

    const addItem = async(item) => {
        try{
            console.log("adding item ", item);
            const {data} = await axios.post("/api/v1/cart", item);
            fetchCart();
            console.log(data.item);
        }
        catch(error){
            console.log(error)
        }
    }

    const removeItem = async(id) => {
        try {
            const {data} = await axios.delete(`/api/v1/cart/${id}`);
            console.log(data.msg)
            fetchCart();

        }
        catch(error){
            console.log(error)
        }
    }


    const changeQty = async (cartItemId, newQty) => {
        console.log("changing quantity")
        try{
            const quantity = {quantity: newQty}
            const {data} = await axios.patch(`/api/v1/cart/${cartItemId}`, quantity)
            console.log(data.cartItem)
            fetchCart();
        }
        catch(error) {
            console.log(error)
        }
    }


    const updateOrder = (newOrder) => {
        setOrder(newOrder);
        console.log("updating order ", order);
    }

    // React.useEffect(() => {
    //     localStorage.setItem("cart", JSON.stringify(cart))
    // }, [cart])


    React.useEffect(() => {
        fetchCart()
    }, [user])

    // React.useEffect(() => {
    //     showOrder()
    // }, [user])

    return(
        <Provider value = {{
            user: user,
            saveUser: saveUser,
            removeUser: removeUser,
            fetchUser: fetchUser,
            logoutUser: logoutUser,

            cart : cart,
            subTotal: subTotal,
            order: order,
            addItem : addItem,
            removeItem : removeItem,
            changeQty : changeQty,
            emptyCart: emptyCart,
            updateOrder: updateOrder

        }}
           
        >
            {children}
        </Provider>
    )
}

export const useGlobalContext = () => {
    return useContext({Provider, Consumer});
  };  

export {ContextProvider, Consumer as ContextConsumer}