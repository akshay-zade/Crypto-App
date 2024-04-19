import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { baseUrl } from './baseUrl'
import Loader from './Loader'

const Exchanges = () => {
  

    const[loading , setLoading] = useState(true)

    useEffect( ()=> {
     const getExchangesData = async () => {
        const {data} = await axios.get(`${baseUrl}/exchanges`)
        console.log(data);
        setLoading(false);
     }
       getExchangesData()
    })

  return (
    <>
   {
    loading ? <Loader/> : <>
    <Header />
    </>
   }
     
    </>
  )
}

export default Exchanges