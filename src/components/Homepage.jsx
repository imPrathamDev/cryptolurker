import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptoStatsQuery } from '../services/cryptoAPI';
import { Cryptocurrencies, News } from './';
import Loader from './Loader';
import { useSelector } from 'react-redux';


const Homepage = () => {
  const currency = useSelector((state) =>  state.currency.currency.uuid);
  const paraData = {
    count: 10,
    offset: 0,
    currency,
  }
  const { data: cryptoGlobalStats , isLoading } = useGetCryptoStatsQuery({ currency  });
   const globalStats = cryptoGlobalStats?.data;
   console.log(cryptoGlobalStats)
  if(isLoading) return <Loader />;

  /* Checking is morning or evening or afternoon */
  let today = new Date();
  let curHr = today.getHours();
  let currentTimePeriod = '';


    if(curHr < 12){
    currentTimePeriod = 'Moring';
      } else if (curHr < 18){
    currentTimePeriod = 'Afternoon';
      } else {
    currentTimePeriod = 'Evening';
      }

  return (
    <>
 <section className="text-new-black">
  <div className="relative flex items-center justify-center py-16 w-full">
  <div className="absolute top-0 -left-4 w-72 h-72 bg-app-green rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-0 right-2 w-72 h-72 bg-app-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-app-pink rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    <div className="relative">
      <span className='text-lg font-semibold'>Good {currentTimePeriod},</span>
      <h2 className="text-4xl font-bold sm:text-4xl">
        Global Cryptocurrencies Statistics
      </h2>

      <p className="mt-4 sm:text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic tempore beatae facilis dignissimos rem praesentium
        officia obcaecati quisquam iure recusandae!
      </p>
      <ul className="grid grid-cols-2 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
      <li className="p-8 bg-white shadow-xl rounded-xl">
        <p className="text-3xl font-extrabold">{globalStats.totalCoins && parseFloat(globalStats.totalCoins)}</p>
        <p className="mt-1 text-xl font-medium">Total Cryptos</p>
      </li>

      <li className="p-8 bg-white shadow-xl rounded-xl">
        <p className="text-3xl font-extrabold">{millify(globalStats.totalMarkets)}</p>
        <p className="mt-1 text-xl font-medium">Total Markets</p>
      </li>

      <li className="p-8 bg-white shadow-xl rounded-xl">
        <p className="text-3xl font-extrabold">{millify(globalStats.totalExchanges)}</p>
        <p className="mt-1 text-xl font-medium">Total Exchanges</p>
      </li>

      <li className="p-8 bg-white shadow-xl rounded-xl">
        <p className="text-3xl font-extrabold">{millify(globalStats.totalMarketCap)}</p>
        <p className="mt-1 text-xl font-medium">Total Market Cap</p>
      </li>

      <li className="p-8 bg-white shadow-xl rounded-xl">
        <p className="text-3xl font-extrabold">{millify(globalStats.total24hVolume)}</p>
        <p className="mt-1 text-xl font-medium">Total Market Cap in 24hr</p>
      </li>

      <li className="p-8 bg-white shadow-xl rounded-xl">
        <p className="text-3xl font-extrabold">{globalStats.btcDominance.toFixed(2)}%</p>
        <p className="mt-1 text-xl font-medium">BTC Dominance</p>
      </li>
    </ul>
    </div>
    
  </div>
<div className='mb-8'>
<div className="flex mt-2 items-center">
      <h2 className="flex-1 text-3xl font-bold sm:text-2xl">
                      Top 10 Cryptos
                      <div className="mt-2 h-1 w-20 bg-gradient-to-r from-app-green via-app-purple to-app-pink rounded"></div>
      </h2>

      <p className="text-base text-app-purple font-semibold px-2 py-1 bg-transparent hover:bg-gradient-to-r hover:from-app-green hover:via-app-purple hover:to-app-pink rounded-md hover:text-app-white transition-colors duration-300">
        <Link to={'/cryptocurrencies'} className="">
        Show More
        </Link>
      </p>
    </div>
    <Cryptocurrencies simplified />
    </div>


    <div className='my-8'>
    <div className="flex items-center">
      <h2 className="flex-1 text-3xl font-bold sm:text-2xl">
                      Latest Crypto News
                      <div className="mt-2 h-1 w-20 bg-gradient-to-r from-app-green via-app-purple to-app-pink rounded"></div>
      </h2>

      <p className="text-base text-app-purple font-semibold px-2 py-1 bg-transparent hover:bg-gradient-to-r hover:from-app-green hover:via-app-purple hover:to-app-pink rounded-md hover:text-app-white transition-colors duration-300">
        <Link to={'/news'}>
        Show More
        </Link>
      </p>
    </div>
    
    <News simplified newsCategory='Cryptocurrency' />
    </div>


</section>
    </> 
  );
}

export default Homepage;
