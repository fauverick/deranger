import React from "react"
import { Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Cart from "./pages/Cart"
import Collection from "./pages/Collection"
import Item from "./pages/Item"
import Authentication from "./pages/Authentication"
import Register from "./pages/Register"
import Footer from "./components/Footer"
import Order from "./pages/Order"
import Payment from "./pages/Payment"
import Dashboard from "./pages/Dashboard"
import OrderPlaced from "./pages/OrderPlaced"
import MyOrders from "./pages/MyOrders"
import Breadcrumb from "./components/BreadCrumb"
import CollectionPage from "./pages/CollectionPage"


function App() {

  return (
    <div>
      <Header/>

      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/authentication" element = {<Authentication/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/men"> 
          {/* "url/men" will leads to Collection, "url/men/id" will lead to single item */}
          <Route index element = {<CollectionPage/>}/>  
          <Route path = ":id" element = {<Item/>}/>
        </Route>
        <Route path = "/cart" element = {<Cart/>}/>
        <Route path = "/order" element = {<Order/>}/>
        <Route path = "/payment" element = {<Payment/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path = "/orderplaced" element = {<OrderPlaced/>}/>
        <Route path = "/myOrders" element = {<MyOrders/>}/>




      </Routes>

      <Footer/>
    </div>
  )
}

export default App
