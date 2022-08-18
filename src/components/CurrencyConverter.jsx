import React, { useState } from 'react';
import AllCurrencies from '../svg/currencies.svg';
import IndiaRupee from '../svg/india-rupee.svg';

function CurrencyConverter({cryptoDetails, currencySymbol, currencyData}) {
    const [ amount, setAmount ] = useState(1);
    const [ isAmountCrypto, setIsAmountCrypto ] = useState(true);
    const [ isSwitch, setIsSwitch ] = useState(true);

    let cryptoAmount, currencyAmount;

    if(isAmountCrypto){
        cryptoAmount = amount;
        currencyAmount = amount * cryptoDetails.price; 
    } else {
        currencyAmount = amount;
        cryptoAmount = amount / cryptoDetails.price;
    }

    const handleCryptoAmount = (e) => {
        setAmount(e.target.value);
        setIsAmountCrypto(true);
    }

    const handleCurrencyAmount = (e) => {
        setAmount(e.target.value);
        setIsAmountCrypto(false);
    }
  return (
    <>
     <div className='mt-2'>
          <div className='flex flex-col bg-white p-4 rounded-md mt-4'>
          <h3 className='font-medium text-new-black text-2xl mb-2'>{cryptoDetails.name} to {currencySymbol} Converter</h3>
            <div className='flex items-center mx-2 py-2'>
              <img src={isSwitch ? cryptoDetails.iconUrl : currencyData.iconUrl} alt={isSwitch ? cryptoDetails.name : currencyData.name} className='w-8 h-8' />
              <div className='flex flex-col ml-2'>
                <span className='text-sm text-app-light-gray font-normal -mb-1'>{isSwitch ? cryptoDetails.symbol : currencyData.symbol}</span>
                <span className='text-base text-new-black font-medium'>{isSwitch ? cryptoDetails.name : currencyData.name}</span>
              </div>
              <input type="number" value={isSwitch ? cryptoAmount : currencyAmount} className='focus:outline-none text-lg font-semibold text-new-black ml-auto' style={{textAlign: 'right'}} onChange={handleCryptoAmount} />
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-1 mx-auto text-app-light-gray hover:bg-app-light-gray hover:text-white transform hover:rotate-180 rounded-full cursor-pointer transition-all ring-1 ring-app-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => setIsSwitch(!isSwitch)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            </div>
            <div>
            <div className='flex items-center mx-2 py-2'>
              <img src={ isSwitch ? currencyData.iconUrl ? currencyData.iconUrl : currencyData.symbol === 'INR' ? IndiaRupee : AllCurrencies : cryptoDetails.iconUrl } alt={isSwitch ? currencyData.name : cryptoDetails.name} className='w-8 h-8' />
              <div className='flex flex-col ml-2'>
                <span className='text-sm text-app-light-gray font-normal -mb-1'>{isSwitch ? currencyData.symbol : cryptoDetails.symbol}</span>
                <span className='text-base text-new-black font-medium'>{isSwitch ? currencyData.name : cryptoDetails.name}</span>
              </div>
              <input type="number" value={isSwitch ? currencyAmount : cryptoAmount} className='focus:outline-none  text-lg font-semibold text-new-black ml-auto' style={{textAlign: 'right'}} onChange={handleCurrencyAmount} />
            </div>
            </div>
          </div>
        </div> 
    </>
  );
}

export default CurrencyConverter;
