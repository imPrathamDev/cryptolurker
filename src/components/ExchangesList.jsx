import {useGetCryptoExchangesQuery} from '../services/cryptoAPI';
import millify from 'millify';
import { useSelector } from 'react-redux';

function ExchangesList({coinUUID, limit}) {

const currency = useSelector((state) =>  state.currency.currency.uuid);
const symbol = useSelector((state) =>  state.currency.currency.sign ? state.currency.currency.sign : state.currency.currency.symbol);

const priceFun = (price) => {
  return Math.trunc(price).toString().length <= 1 ? Math.trunc(price) === 0 ? parseFloat(price).toFixed(6) : parseFloat(price).toFixed(3)  : parseFloat(price).toFixed(2)
}


const {data, isLoading} = useGetCryptoExchangesQuery({coinUUID, limit, currency});
  return (
    <>
    {data?.data?.exchanges.map((exchangesList, keyExchange) => 
      <div className="flex items-center justify-between py-5 text-lg" key={keyExchange}>
      <div className="flex items-center space-x-2 text-new-black">
        <span>#{exchangesList.rank}</span>
        <img src={exchangesList.iconUrl} alt={exchangesList.name} className='h-8 w-8' />
        <span className='text-base font-bold'>{exchangesList.name}</span>
      </div>
      <div className='flex flex-col'>
      <span className='text-base xl:text-lg text-app-green ml-auto'>{symbol}{priceFun(exchangesList.price)}</span>
      <span className="text-sm xl:text-base font-semibold text-new-black ml-auto">24h volume {millify(exchangesList?.['24hVolume'])}</span>
      </div>
    </div>
     )}
    </>
  );
}

export default ExchangesList;
