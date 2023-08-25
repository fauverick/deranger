import React from "react";
// import clothes from "../clothes";
import Clothes_Display from "../components/Clothes_Display";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Filter_Select from "../components/Filter_Select"


export default function Collection(){

    const [clothes, setClothes] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const limit = 4;
    const [numOfPages, setNumOfPages] = React.useState(1);
    const [queryData, setQueryData] = React.useState({
        size: "", color: "", category: "", sort: ""
    });

    React.useEffect(() => {
        async function fetchData(){
            const {size, color, category, sort} = queryData;
            const result = await axios.get(
                `/api/v1/product?page=${page}&limit=${limit}&color=${color}&size=${size}&category=${category}&sort=${sort}`
            );
        
           setClothes(result.data.products)
           setNumOfPages(Math.ceil(result.data.numOfProducts/limit))
        }
        fetchData();
    }, [page, queryData])
    

    const clothesElements = clothes.map(item => {return(
       <NavLink to = {`/men/${item.id}`} className = "clothes_display"  key = {item.id}>
         <Clothes_Display
            name = {item.name}
            url = {item.url[0]}
            key = {item.id}
            id = {item.id}
            price = {item.price}
            season = {item.season}
        />
       </NavLink>
    )})

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    });

    const goToPage = (page) => {
        console.log("going to page ", page)
        setPage(page)
    }

    const prevPage = () => {
        let newPage = page - 1;
        if(page == 1) newPage = numOfPages
        setPage(newPage)
    }

    const nextPage = () => {
        let newPage = page + 1;
        if(page == numOfPages) newPage = 1
        setPage(newPage)
    }

    const handleSearch = (event) => {
        const {name, value} = event.target 
        console.log(name, value);
        setQueryData(prevData => {
            return  ({...prevData, [name]: value})
        })
        console.log(queryData)
    }

    const resetFilter = () => {
        setQueryData(
            {
                color: "all", size: "all", category: "all", sort:"a to z"
            }
        )
    }


    return(
        <div className="collection">
             <h1>Men's clothing</h1>

             <div className = "filter_container">
                <Filter_Select
                    label = {"size"}
                    options ={ ["all", "XS", "S", "M", "L", "XL"]}
                    value = {queryData.size}
                    handleChange = {() => {handleSearch(event)}}
                />

                <Filter_Select
                    label = {"color"}
                    options ={ ["all", "brown", "grey", "white", "blue", "beige"]}
                    value = {queryData.color}
                    handleChange = {() => {handleSearch(event)}}
                />

                <Filter_Select
                    label = {"category"}
                    options ={["all", 'top', 'bottom', 'tshirt', 'shirt', 'trousers', 'shorts', 'tank', 'accessories', 'jeans']}
                    value = {queryData.category}
                    handleChange = {() => {handleSearch(event)}}
                />

                <Filter_Select
                    label = {"sort"}
                    options ={["a to z", 'z to a', 'price low to high', 'price high to low']}
                    value = {queryData.sort}
                    handleChange = {() => {handleSearch(event)}}
                />

                <div className = "filter_reset" onClick = {resetFilter}>
                    <i class="ri-refresh-line"></i>                    
                    <p>RESET</p>
                </div>
             </div>

            <div className="collection_container">
                {clothesElements}
            </div>

            <div className='pagination_container'>
                <div className='pagination'>
                    <button type='button' className='prev-btn' onClick={prevPage}>
                        <HiChevronDoubleLeft />
                        prev
                    </button>
                    {
                        pages.map(pageNumber => {
                        return (
                            <button 
                                type = 'button' 
                                className={pageNumber === page? 'page-btn-active' : 'page-btn'}
                                key = {pageNumber}
                                onClick = {() => {goToPage(pageNumber)}}
                            >
                                {pageNumber}
                            </button>
                        )
                        })
                    }

                    <button type='button' className='next-btn' onClick={nextPage}>
                        <HiChevronDoubleRight />
                        next
                    </button>

                </div>
        </div>
        </div>
    )
}