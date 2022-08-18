import React, { useState } from 'react';

function FilterOpt({ tag, setTag, orderBy, setOrderBy, timePeriod, setTimePeriod }) {

    const tagsList = [
        {title: 'All Coins', value: null},
        {title: 'NFT Tokens', value: 'nft'},
        {title: 'Defi Tokens', value: 'defi'},
        {title: 'Privacy Coins', value: 'privacy'},
        {title: 'Stable Coins', value: 'stablecoin'},
        {title: 'Staking Coins', value: 'staking'},
        {title: 'Meme Coins', value: 'meme'},
        {title: 'DOA Tokens', value: 'dao'},
        {title: 'Exchange Tokens', value: 'exchange'},
        {title: 'DEX Tokens', value: 'dex'}
    ];

    const time = [
        {title: '1 hour', value: '1h'},
        {title: '3 hours', value: '3h'},
        {title: '12 hours', value: '12h'},
        {title: '24 hours', value: '24h'},
        {title: '7 days', value: '7d'},
        {title: '30 days', value: '30d'},
        {title: '3 months', value: '3m'},
        {title: '1 year', value: '1y'},
        {title: '3 years', value: '3y'},
        {title: '5 years', value: '5y'}
    ];

const order = [
    {title: 'MarketCap', value: 'marketCap'},
    {title: '24 hours Volume', value: '24hVolume'},
    {title: 'Price', value: 'price'}
];
const tagFun = () => {
    setTag({title: tag.title, value: tag.value, isOpen: !tag.isOpen})
    setOrderBy({...orderBy, isOpen: false});
    setTimePeriod({...timePeriod, isOpen: false});
}

const timeFun = () => {
    setTag({title: tag.title, value: tag.value, isOpen: false})
    setOrderBy({...orderBy, isOpen: false});
    setTimePeriod({...timePeriod, isOpen: !timePeriod.isOpen});
}

const orderFun = () => {
    setTag({title: tag.title, value: tag.value, isOpen: false})
    setOrderBy({...orderBy, isOpen: !orderBy.isOpen});
    setTimePeriod({...timePeriod, isOpen: false});
}
  return (
    <div className='flex items-center xl:ml-auto relative gap-2'>
        {/*
        tags list start
        */}
    <div className='flex items-center px-2 py-1 bg-app-purple rounded-lg cursor-pointer text-app-white transition-all transform hover:scale-[1.05]' onClick={tagFun}>
          <span className='text-base font-medium'>{tag.title}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
      </div>
      {tag.isOpen && 
      (<ul className="shadow-xl z-10 absolute top-10 border-2 w-44 rounded-md h-64 overflow-y-scroll bg-app-white border-neutral-200">
    {tagsList.map((list) => <li key={list.value} className="cursor-pointer mx-1 px-2 py-1 rounded-md hover:bg-app-light-gray transition-all" onClick={() => setTag({title: list.title, value: list.value, isOpen: false})}>{list.title}</li>)}
      </ul>)}
    {/*
        tags list end
        */}
    <div className='flex items-center px-2 py-1 bg-app-purple rounded-lg cursor-pointer text-app-white transition-all transform hover:scale-[1.05]' onClick={timeFun}>
          <span className='text-base font-medium'>{timePeriod.title}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
      </div>
    {timePeriod.isOpen && (
        <ul className="shadow-xl z-10 absolute top-10 right-16 border-2 w-44 rounded-md h-64 overflow-y-scroll bg-app-white border-neutral-200">
        {time.map((list) => <li key={list.value} className="cursor-pointer mx-1 px-2 py-1 rounded-md hover:bg-app-light-gray transition-all" onClick={() => setTimePeriod({title: list.title, value: list.value, isOpen: false})}>{list.title}</li>)}
        </ul>
    )}
    <div className='flex items-center px-2 py-1 bg-app-purple rounded-lg cursor-pointer text-app-white transition-all transform hover:scale-[1.05]' onClick={orderFun}>
          <span className='text-base font-medium'>{orderBy.title}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
      </div>
      {orderBy.isOpen && (
        <ul className="shadow-xl z-10 absolute top-10 right-0 border-2 w-44 rounded-md bg-app-white border-neutral-200">
        {order.map((list) => <li key={list.value} className="cursor-pointer m-1 px-2 py-1 rounded-md hover:bg-app-light-gray transition-all" onClick={() => setOrderBy({title: list.title, value: list.value, isOpen: false})}>{list.title}</li>)}
        </ul>
    )}
    </div>
  );
}

export default FilterOpt;
