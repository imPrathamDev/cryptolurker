import {useGetCryptoMarketQuery} from '../services/cryptoAPI';
import millify from 'millify';
import {useSelector} from 'react-redux';

function MarketList({coinUUID, limit}) {
  const currency = useSelector((state) =>  state.currency.currency.uuid);
  const symbol = useSelector((state) =>  state.currency.currency.sign ? state.currency.currency.sign : state.currency.currency.symbol);
  const {data, isLoading} = useGetCryptoMarketQuery({coinUUID, limit, currency});
  const priceFun = (price) => {
    return Math.trunc(price).toString().length <= 1 ? Math.trunc(price) === 0 ? parseFloat(price).toFixed(6) : parseFloat(price).toFixed(3)  : parseFloat(price).toFixed(2)
  }
  return (
    <>
      {data?.data?.markets.map((dataList) => 
      <div className="flex items-center justify-between py-5 text-lg" key={dataList.title}>
      <div className="flex items-center space-x-2 text-new-black">
        <span>#{dataList.rank}</span>
        <div className='ml-1 flex flex-col'>
        <span className='font-bold'>{dataList?.base.symbol}/{dataList?.quote.symbol}</span>
        <div className='flex items-center'>
        <img src={dataList?.exchange.iconUrl} alt={dataList?.exchange.name} className="h-5 w-5 mr-1" />    
        <span className='text-base font-semibold text-gray-600'>{dataList?.exchange.name}</span>
        </div>
        </div>
      </div>
      <div className='flex flex-col'>
      <span className="text-base xl:text-lg ml-auto text-app-purple">{symbol}{priceFun(dataList.price)}</span>
      <span className='text-sm xl:text-base ml-auto font-semibold'>24h Volume {dataList?.['24hVolume'] && millify(dataList?.['24hVolume'])} With {dataList.marketShare}% MS</span>
      </div>
    </div>
     )}
    </>
  );
}

export default MarketList;
