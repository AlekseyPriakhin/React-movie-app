import React from "react"
import styles from '../styles/pagination.css'


const Pagination = (props) =>
{

    const maxVisibleButtons = 5;
    const half = Math.ceil(maxVisibleButtons/2);
    const currentPage = props.currentPage;
    const totalPages = props.totalPages;

    const getfirstPage = () =>{
        let num = 0;
        if(currentPage <= half) return 1;
        else if(currentPage === totalPages) return Math.max( totalPages-maxVisibleButtons+1,1);

        if(totalPages-currentPage < half) num = totalPages - currentPage;
        return currentPage - num - (half-1);
    }

    const getLastPage = () => Math.min(totalPages, getfirstPage() + maxVisibleButtons-1)
    const getPages = () =>{
        const range = [];

        for(let i = getfirstPage(); i <= getLastPage();i++)
        {
            range.push(i);
        }
        return range;
    }


    return (
        <ul className={styles['pagination']}>
            { getPages().map((value)=>
                {
                    return (
                        <li key={value}>
                            <button 
                            onClick={()=>props.onPage(value)}
                            className={value == currentPage ? styles['pagination-item'] : styles['pagination-item']}
                            disabled={value == currentPage}
                            > 
                            {value}
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export {Pagination}