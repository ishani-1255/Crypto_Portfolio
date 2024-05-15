import { useState } from 'react';
import {Crypto} from '../Types';
export type AppProps={
    crypto: Crypto;
    updateOwned ? : (crypto : Crypto , amount : number )=>void;
};
export default function CryptoPage({crypto, updateOwned}:AppProps):JSX.Element{
    const [amount , setAmount] = useState<number>(NaN);
    //to pass all values to the parent component we need to props a functio  to this from the parent page.
return(
    <div className="bg-white rounded-lg p-4 m-4 shadow-md">
    <span className="text-lg ml-4 font-bold">{crypto.name} </span>
    <span className="ml-1 text-gray-600">{ ": "+ '  $ ' + crypto.current_price} </span>
    <input type = 'number'
    style ={{margin :10}}
    className="mt-2 p-4 w-full mb-4 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500"
    value={amount}
    placeholder='Enter '
    onChange={(e)=>{
         
        setAmount(parseFloat(e.target.value));
        if (updateOwned ){
        updateOwned(crypto , parseFloat(e.target.value));
        }
    }}>
    </input>
    <span className="ml-4"> Total Worth of <span className='text-md font-bold'>{crypto.name} </span> :</span>
    <p className="mt-2 ml-4 text-gray-800"> { isNaN(amount) ? '$0.00' :
    "$" + (crypto.current_price * (amount)).toLocaleString(undefined ,{minimumFractionDigits:2 , maximumFractionDigits :2} ) }
    </p>
    </div>
    
)
}