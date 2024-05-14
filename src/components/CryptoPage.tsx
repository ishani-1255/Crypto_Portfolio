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
    <div>
    <span>{crypto.name + " : "+ '  $ ' + crypto.current_price} </span>
    <input type = 'number'
    style ={{margin :10}}
    value={amount}
    onChange={(e)=>{
         
        setAmount(parseFloat(e.target.value));
        if (updateOwned ){
        updateOwned(crypto , parseFloat(e.target.value));
        }
    }}>
    </input>

    <p> { isNaN(amount) ? '$0.00' :
    "$" + (crypto.current_price * (amount)).toLocaleString(undefined ,{minimumFractionDigits:2 , maximumFractionDigits :2} ) }
    </p>
    </div>
    
)
}