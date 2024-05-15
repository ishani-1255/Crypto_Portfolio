import {Crypto} from '../Types';
export type AppProps={
    crypto: Crypto;
};
export default function CryptoSummary({crypto}:AppProps):JSX.Element{
return(
    <div className="bg-white rounded-lg p-4 m-4 shadow-md">
    <span className="text-lg ml-4 font-bold">{crypto.name} </span>
    <span className="ml-1 text-gray-600">{ ": "+ '  $ ' + crypto.current_price} </span>
    </div>
)
}