import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Home() {
    
    const [banks , setBanks] =useState([]);

    useEffect(()=>{
        axios.get('https://reservation-system.sabeelan.com/reservation-system/api/en/banks', {
        // headers: {
        //     Authorization : `Bearer ${localStorage.getItem("token")}`
        // }
        headers: {
            Authorization : `Bearer ${sessionStorage.getItem("token")}`
        }
        })
        .then((res) => {
            console.log(res.data)
            setBanks(res.data.data)
        })
        .catch((error) => {
        console.error(error)
    })
    },[])

    
  return (
    <>
        <div className='home-Container'>
        <h4>The list of banks Is : </h4>
            {banks.map((x)=>{
                return(
                <div>
                   
                    <ul>
                        <li>{x.name}</li>
                    </ul>
                    
                </div>
                )
            })}   
        </div>
    </>
  )
}

export default Home