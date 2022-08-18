import React, { useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoBlockchainQuery, useGetCryptoExchangesQuery } from '../services/cryptoAPI';
import LineChart from './LineChart';
import News from './News';
import Loader from './Loader';
import MarketList from './MarketList';
import ExchangesList from './ExchangesList';
import { useGetCryptoOHLCQuery } from '../services/cryptoAPI';
import { useSelector } from 'react-redux';
import CurrencyConverter from './CurrencyConverter';
import Helmet from 'react-helmet';



const CryptoDetails = () => {
  const currency = useSelector((state) =>  state.currency.currency.uuid);
  const symbol = useSelector((state) =>  state.currency.currency.sign ? state.currency.currency.sign : state.currency.currency.symbol);
  const currencySymbol = useSelector((state) => state.currency.currency.symbol);
  const currencyData = useSelector((state) => state.currency.currency);
  const { coinUUID } = useParams();
  const [ timePeriod, setTimeperiod ] = useState('7d');
  const { data: cryptoInfo, isLoading } = useGetCryptoDetailsQuery({ coinUUID, currency });
  const { data: coinHistory, isFetching, refetch } = useGetCryptoHistoryQuery({coinUUID, timePeriod, currency});
  const { data: smartContractData, isGetting } = useGetCryptoBlockchainQuery(coinUUID);
  const cryptoDetails = cryptoInfo?.data?.coin;
  const { data: ohlcData, isThatLoading } = useGetCryptoOHLCQuery({ coinUUID, currency });
console.log(cryptoDetails);
  if(isLoading) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];


  const cdata = [];

for(let i = 0; i < ohlcData?.data?.ohlc?.length; i += 1){
    cdata.push({
      time: new Date(ohlcData?.data?.ohlc?.[i].startingAt*1000).toISOString().slice(0, 10),
      open:  parseFloat(ohlcData?.data?.ohlc?.[i].open),
      high: parseFloat(ohlcData?.data?.ohlc?.[i].high),
      low: parseFloat(ohlcData?.data?.ohlc?.[i].low),
      close: parseFloat(ohlcData?.data?.ohlc?.[i].close),
    });
}

  const stats = [
    { title: 'Price to USD', value: `${symbol} ${cryptoDetails?.price && millify(parseFloat(cryptoDetails?.price))}`, icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />' },
    { title: 'Rank', value: cryptoDetails?.rank, icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />'},
    { title: '24h Volume', value: `${cryptoDetails?.['24hVolume'] == 'NaN' ? '' : symbol} ${cryptoDetails?.['24hVolume'] == 'NaN' ? 'Not Available' : millify(parseFloat(cryptoDetails?.['24hVolume'])) }`, icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />', },
    { title: 'Market Cap', value: `${symbol} ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />'},
    { title: 'All-time-high(daily avg.)', value: `${symbol} ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />'},
  ];

  const genericStats = [
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>), icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />' },
    { title: 'Total Supply', value: `${symbol} ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />'},
    { title: 'Circulating Supply', value: `${symbol} ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />'},
    { title: smartContractData?.data?.issuanceBlockchains?.[0]?.referenceName ? smartContractData?.data?.issuanceBlockchains?.[0]?.referenceName : 'Not Available' , value: smartContractData?.data?.issuanceBlockchains?.[0]?.reference ? (<a href={smartContractData?.data?.issuanceBlockchains?.[0].blockExplorerUrl} className='flex items-center text-blue-500 hover:text-gray-500 transition-colors'>{`${smartContractData?.data?.issuanceBlockchains?.[0].reference.substring(0,10)}...`}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /> </svg></a>) : 'NULL', icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />'},
    { title: 'Issuance blockchain', value: smartContractData?.data?.issuanceBlockchains?.[0]?.name ? smartContractData?.data?.issuanceBlockchains?.[0]?.name : 'No Data' , icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />'},
  ];

const image = 'https://cdn.coinranking.com/Sy33Krudb/btc.svg';

function lightOrDark(color) {

  // Variables for red, green, blue values
  var r, g, b, hsp;
  
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {

      // If RGB --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      
      r = color[1];
      g = color[2];
      b = color[3];
  } 
  else {
      
      // If hex --> Convert it to RGB: http://gist.github.com/983661
      color = +("0x" + color.slice(1).replace( 
      color.length < 5 && /./g, '$&$&'));

      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
  }
  
  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
  0.299 * (r * r) +
  0.587 * (g * g) +
  0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp>127.5) {

      return 'light';
  } 
  else {

      return 'dark';
  }
}


  return (
    <>
    <Helmet>
      <title>{ cryptoDetails.name }</title>
    </Helmet>
    {console.log(cryptoDetails.color ? lightOrDark(cryptoDetails.color) : lightOrDark('#5CE1E6'))}
    <div className='flex items-center mt-24 mb-3'>
      <img className='h-12 w-12 rounded-md mr-1' src={cryptoDetails.iconUrl} alt={cryptoDetails.name} />
    <h2 className='text-5xl font-semibold' style={{color: cryptoDetails.color}}>
      {cryptoDetails.name}
    </h2>
    </div>
    <p className='text-sm xl:text-lg'>
      {cryptoDetails.name} live price in {currencySymbol}.
      View value statistics, market cap and supply. Check {cryptoDetails.name} prices according to time periods.
    </p>
    <div>

  {cdata.length > 0 && (<LineChart coinHistory={coinHistory} coinName={cryptoDetails.name} coinCurrentPrice={cryptoDetails.price} coinColor={cryptoDetails.color} allTimeHigh={cryptoDetails?.allTimeHigh} coinSymbol={cryptoDetails.symbol} coinUUID={coinUUID} coinIcon={cryptoDetails.iconUrl} cdata={cdata} isCdata={isThatLoading} time={time} timePeriod={timePeriod} setTimeperiod={setTimeperiod} />)}

    </div>

    <div className='grid grid-cols-1 gap-12 xl:grid-cols-2 lg:grid-cols-2 my-8'>
    <div className="card bg-white rounded-md mt-1 p-4">
      <div className="px-4 py-3 border-0 card-header">
        <h4 className="font-medium text-new-black text-3xl">{cryptoDetails.name} statistics</h4>
        <span className="text-gray-400 badge bg- mt-2">An overview showing the statistics of {cryptoDetails.name} , such as the base and quote currency, the rank, and trading volume.</span>
      </div>
      <div className="px-4 mb-1 -mt-2 divide-y divide-gray-200 card-body">
        
     {stats.map((dataList, key) => 
      <div className="flex items-center justify-between py-5 text-lg" key={key}>
      <div className="flex items-center space-x-2 text-new-black">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {HTMLReactParser(dataList.icon)}
        </svg>
        <span className='text-base font-bold'>{dataList.title}</span>
      </div>
      <span className="font-semibold text-new-black">{dataList.value}</span>
    </div>
     )}
      </div> 
      </div>

      <div className="card bg-white rounded-md p-4">
      <div className="px-4 py-3 border-0 card-header">
        <h4 className="font-medium text-new-black text-3xl">{cryptoDetails.name} Supply information</h4>
        <span className="text-gray-400 badge bg-primary mt-2">View the total and circulating supply of {cryptoDetails.name} , including details on how the supplies are calculated.</span>
      </div>
      <div className="px-4 mb-1 -mt-2 divide-y divide-gray-200 card-body">
        
     {genericStats.map((dataList) => 
      <div className="flex items-center justify-between py-5 text-lg" key={dataList.title}>
      <div className="flex items-center space-x-2 text-new-black">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {HTMLReactParser(dataList.icon)}
        </svg>
        <span className=' font-bold'>{dataList.title}</span>
      </div>
      <span className="font-semibold text-new-black">{dataList.value}</span>
    </div>
     )}
    </div>

    </div> 
    </div>
    
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-6 mt-6 my-2'>
        <div className='col-span-2 mb-2'>
          <h2 className='text-[2rem] font-bold text-new-black'>What is {cryptoDetails.name}?</h2>
          <div className='prose'>{HTMLReactParser(cryptoDetails.description)}</div>
        </div>
        <div>
        <div className='bg-white rounded-md px-4 py-4 my-2'>
          <div className='flex items-center mb-4'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <h3 className='font-medium text-new-black text-2xl'>{cryptoDetails.name} Links</h3>
          </div>
          {cryptoDetails.links.map((link) => 
          <div className='flex justify-between text-base my-2' key={link.name}>
          <h5 className='text-new-black font-semibold'>{link.type.charAt(0).toUpperCase() + link.type.slice(1)}</h5>
          <a className='font-mono text-blue-500 underline' href={link.url} target="_blank">{link.name}</a>
          </div>
          )}
        </div>
        <CurrencyConverter cryptoDetails={cryptoDetails} currencyData={currencyData} currencySymbol={currencySymbol} />
        </div>
      </div>
    
        <div className=''>
    <div className='grid grid-cols-1 gap-12 xl:grid-cols-2 lg:grid-cols-2 my-8'>
    <div className="card bg-app-white mt-1">
      <div className="px-4 py-3 border-0 card-header">
        <h4 className="font-semibold text-new-black text-4xl mb-5">Best exchanges to buy {cryptoDetails.name}</h4>
        <span className="text-gray-400">The top crypto exchanges that have {cryptoDetails.name} available for trading, ranked by 24h trading volume and the current price.</span>
      </div>
      <div className="px-4 mb-1 -mt-2 divide-y divide-gray-200 card-body">
        <ExchangesList coinUUID={coinUUID} limit='6' />
      </div> 
      </div>

      <div className="card bg-app-white">
      <div className="px-4 py-3 border-0 card-header">
        <h4 className="font-semibold text-new-black text-4xl mb-5">{cryptoDetails.name} Markets</h4>
        <span className="text-gray-400">A list of the top {cryptoDetails.name} markets across all crypto exchanges based on the highest 24h trading volume, with their current price.</span>
      </div>
      <div className="px-4 mb-1 -mt-2 divide-y divide-gray-200 card-body">    
     <MarketList coinUUID={coinUUID} limit='6' />
    </div>

    </div> 
    </div>
        </div>

      <div className='mt-4 mb-6'>
        <h2 className='text-[2rem] font-bold text-new-black'>News Related to {cryptoDetails.name}</h2>
        <News simplified newsCategory={cryptoDetails.name} />
      </div>
    </>
  );
}

export default CryptoDetails;
