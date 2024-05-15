import React from 'react';
import axios from 'axios';
import { useEffect , useState } from 'react';
import { Crypto } from '../Types';
import CryptoSummary from './CryptoSummary';
import type {ChartData , ChartOptions } from 'chart.js';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


function CryptoSearch() {
const [ cryptos , setCryptos] = useState <Crypto[] | null>(null);
const [ selected , setSelected] = useState <Crypto | null>();
const[range , setRange] = useState<number>(30);
const [data , setData ] = useState<ChartData<'line'>>();
const[options , setOptions] = useState<ChartOptions<'line'>>({
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
});
 useEffect(()=>{
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=CG-PMjkfedn2YGEVVwZqXZN9Lrz'
  axios.get(url)
  .then((response)=>{
    setCryptos(response.data)
  })
 }, []);

 useEffect(()=>{
  if(!selected) return;
  axios.get(`https://api.coingecko.com/api/v3/coins/${selected?.id}/market_chart?vs_currency=usd&days=${range}&x_cg_demo_api_key=CG-PMjkfedn2YGEVVwZqXZN9Lrz`)
      .then((response)=>{
        setData({
          labels : response.data.prices.map((price:number[])=>{
            return moment.unix(price[0]/1000).format('MM-DD')
          }),
           datasets: [
            {
              
              label: 'Dataset',
              data: response.data.prices.map((price : number[])=>{return price[1].toFixed(2)}),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        });
        setOptions({
          responsive: true,
           plugins: {
           legend: {
            display:false,
           position: 'top' as const,
          },
         title: {
         display: true,
         text: `${selected?.name} Price Over Last ` + range + (range == 1 ? ' Day.' : ' Days.'),
        },

        },
      });
      });

 },[selected,range]);

  return (
  <>
    
    <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-3xl font-bold mb-8 ml-2">Crypto Price Tracker</h1>
    <div className="flex justify-start mt-4 mb-4">
    <select onChange ={(e)=>{
     const c = cryptos?.find((x)=>x.id === e.target.value);
      setSelected(c);
      //make a request and update the data variable. since range and selected both changes will add then in a single useEffect.
    }}
    defaultValue='default'
    className='m-2 p-2'>
      <option value ='default'>Choose an option</option>
     {cryptos ?
      cryptos.map((crypto)=>{
        return( 
        <option key ={crypto.id} value={crypto.id}>
          {crypto.name}
          </option>
        )
      }) : null
     }
     </select>
     <select 
     onChange={(e)=>{
      setRange(parseInt(e.target.value));
     }}
     defaultValue = 'default'
     className='m-2 p-3'>
      <option value = 'default'>Choose Range</option>
      <option value = {1}>1 Day</option>
      <option value ={7}>7 Days</option>
      <option value = {30}> 30 Days</option>
     </select>
     </div>
     {selected ? <CryptoSummary crypto = {selected}/>:null}
     {data ? 
     <div  style = {{  width: '100%'  }} className ='mt-10 mb-[100px]'>
     <Line options ={options} data={data} /> 
     </div>
     : null}
    </div>
    <footer className="bg-gray-200 py-4 text-center fixed bottom-0 left-0 w-full ">
      <p className="text-sm text-gray-600">© 2024 CryptoPortfolio. All rights reserved.</p>
    </footer>
   </>
  );
  
}

export default CryptoSearch;
