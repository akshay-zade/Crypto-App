import React from 'react'
import { useState , useEffect } from 'react'
import {baseUrl} from './baseUrl'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'

const Coins = () => {

  const[loading , setLoading] = useState(true);
  const[coins , setCoins] = useState([]);
  const[currency , setCurrency] = useState('inr')

  const currencySymbol = currency === 'inr' ? '₹' : '$'

  useEffect( ()=> {
   const getCoinData = async () => {
      const {data} = await axios.get(`${baseUrl}/coins/markets?vs_currency=${currency}`)
      console.log(data);
      setCoins(data)
      setLoading(false);
   }
   getCoinData()
  },[])

  return (
    <>
    {
      loading? <Loader /> : <>
      <Header />
      <div className='btns'>
        <button onClick={()=> setCurrency('inr') } >INR</button>
        <button onClick={()=> setCurrency('usd') } >USD</button>
      </div>
       {
        coins.map((coindata , i)=> {
           return(
            <div key={i} className='ex-card' >
            <div className='image' >
              <img height={"80px"} src={coindata.image} alt="" />
            </div>
            <div className='name'>
              {coindata.name}
            </div>
            <div className='price'>
              {currencySymbol}{coindata.current_price.toFixed(0)}
            </div>
            <div className='rank'>
               {coindata.price_change_percentage_24h}
            </div>
          </div>
           )
        })
       }
      </>
    }
    </>
  )
}



export default Coins