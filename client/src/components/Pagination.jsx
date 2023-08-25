import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import axios from 'axios'

export default function Pagination(props){
    const prevPage = () => {

    }

    const pages = Array.from({ length: props.numOfPages }, (_, index) => {
        return index + 1;
    });

    const goToPage = (page) => {

    }

    console.log("pages is ", pages)

    return (
        <div className='pagination_container'>
            <div className='pagination'>
                <button type='button' className='prev-btn' onClick={prevPage}>
                    <HiChevronDoubleLeft />
                     prev
                </button>
                {
                    pages.map(page => {
                      return (
                        <button 
                            type = 'button' 
                            className='page-btn'
                            key = {page}
                            onClick = {() => {goToPage(page)}}
                        >
                            {page}
                        </button>
                      )
                    })
                }

                <button type='button' className='next-btn' onClick={prevPage}>
                    <HiChevronDoubleRight />
                     next
                </button>

            </div>
        </div>
    )
}