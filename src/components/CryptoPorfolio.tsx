import React from 'react';
import axios from 'axios';

import { useEffect , useState } from 'react';
import { Crypto } from '../Types';
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
  ArcElement,
} from 'chart.js';

import { Pie } from 'react-chartjs-2';
import CryptoPage from './CryptoPage';
ChartJS.register(
  ArcElement,
  
  Tooltip,
  
  Legend
);


function CryptoPortfolio() {
const [ cryptos , setCryptos] = useState <Crypto[] | null>(null);
const [ selected , setSelected] = useState <Crypto [] >([]);
const[range , setRange] = useState<number>(30);

const [data , setData ] = useState<ChartData<'pie'>>();

 useEffect(()=>{
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${API}'
  axios.get(url)
  .then((response)=>{
    setCryptos(response.data)
  })
 }, []);

useEffect(()=>{
    if(selected.length === 0) return;
    setData({
        labels: selected.map((s)=>s.name),
        datasets: [
          {
            label: '# of Votes',
            data: selected.map((s)=>s.owned * s.current_price),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    }
    )
}, [selected]);

// it update the no of particular owned.
function updateOwned(crypto : Crypto , amount : number): void{
    let temp = [...selected];
    let tempObj = temp.find((c)=>c.id == crypto.id);
    if(tempObj){
        tempObj.owned = amount;
        setSelected(temp);
    }

}
  return (
  <>
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center ">
      <div className="max-w-3xl mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Choose Your Crypto Currency:</h1>
        <div className="mb-8">
    <select onChange ={(e)=>{
     const c = cryptos?.find((x)=>x.id === e.target.value) as Crypto;
      setSelected([...selected , c]);
      //make a request and update the data variable. since range and selected both changes will add then in a single useEffect.
    }}
    defaultValue='default'
    className=" m-2 p-3 block w-[800px] px-4  mt-5 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
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
</div>

     {selected.map((s)=> {return <CryptoPage crypto ={s} updateOwned = {updateOwned}/>})}
     <span className="mt-4 ml-6 text-lg font-bold">Total Portfolio Worth : </span>
     {selected
     ? '$ ' + selected.map((c)=>{
        if(isNaN(c.owned)){
            return 0;
        }
            return c.current_price * c.owned;
     }).reduce((prev , cur)=>{
         return prev + cur;
     },0).toLocaleString(undefined , {minimumFractionDigits:2 , maximumFractionDigits:2})
      : null}

{data ? 
     <div  className="mt-8 ml-10 mb-[100px] " style = {{ width : 300 }}>
     <Pie data={data} /> 
     </div>
     : null}

</div>
<footer className="bg-gray-200 py-4 text-center fixed bottom-0 left-0 w-full ">
      <p className="text-sm text-gray-600">© 2024 CryptoPortfolio. All rights reserved.</p>
    </footer>
</div>
   
   </>
  );
  
}

export default CryptoPortfolio;
