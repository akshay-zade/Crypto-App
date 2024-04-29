import React , {useEffect , useState} from 'react'
import axios from 'axios'
import { baseUrl } from './baseUrl'
import { useParams } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loader from './Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({currency}) => {

    const{id} = useParams()
    const[chartData , setChartData] =useState([])
    const[days , setDays] = useState(1)

const coinChartData = async() => {
    try {
        const{data} = await axios.get(`${baseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        setChartData(data.prices)
          // console.log(data.prices)
    } catch (error) {
        
    }
}
useEffect(()=>{
    coinChartData()
},[currency,id,days])

const myData={
  labels: chartData.map((value)=>{
    const date = new Date(value[0])
    const time = date.getHours() > 12
    ? `${date.getHours()-12} : ${date.getMinutes()}PM`
    : `${date.getHours()} : ${date.getMinutes()}AM`
    return days===1 ? time: date.toLocaleDateString() 
  }),
  datasets:[
    {
      label: `Price in past Days ${days} in ${currency} `,
      data : chartData.map((value)=> value[1]),
      borderColor : 'orange',
      borderWidth : '3'
    }
  ]
}

  return (
    <div>
      <div>
      <Line data={myData}  style={{marginTop:"5rem", width:"60rem"}} />
      </div>
      <div className='btn' style={{marginTop:"30px"}}>
               <button onClick={()=>setDays(1)} >24 hours</button>
               <button onClick={()=>setDays(30)}>1 Month</button>
               <button onClick={()=>setDays(365)}>1 Year</button>
             </div>
     
    </div>
  )
}

export default CoinChart