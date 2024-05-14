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
/*const[options , setOptions] = useState<ChartOptions<'line'>>({
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
*/
 useEffect(()=>{
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=CG-PMjkfedn2YGEVVwZqXZN9Lrz'
  axios.get(url)
  .then((response)=>{
    setCryptos(response.data)
  })
 }, []);

 /*useEffect(()=>{
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
         text: `${selected?.name} Price Over Last ` + range + (range == 1 ? ' Day.' : 'Days'),
        },

        },
      });
      });

 },[selected,range]);
*/

useEffect(()=>{
    if(selected.length === 0) return;
    setData({
        labels: selected.map((s)=>s.name),
        datasets: [
          {
            label: '# of Votes',
            data: selected.map((s)=>s.owned * s.owned),
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
    <div className="App">
    <select onChange ={(e)=>{
     const c = cryptos?.find((x)=>x.id === e.target.value) as Crypto;
      setSelected([...selected , c]);
      //make a request and update the data variable. since range and selected both changes will add then in a single useEffect.
    }}
    defaultValue='default'>
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
     <p>Total Portfolio Worth : </p>
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
     <div  style = {{ width : 300 }}>
     <Pie data={data} /> 
     </div>
     : null}


   
   </>
  );
  
}

export default CryptoPortfolio;
