import { useGetCryptoSelectCurrencyQuery } from '../services/cryptoAPI';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrency } from '../features/currency/currencySlice';
import { useState } from 'react';
import IndianRupee from '../svg/india-rupee.svg';
import AllCurrencies from '../svg/currencies.svg';
import Loader from '../components/Loader'

function CurrencyPopup({ setCurrencyPopup }) {
  const currency = useSelector((state) => state.currency);
  console.log(currency);
  const dispatch = useDispatch();
  const [ search, setSearch ] = useState('');
  const { data, isLoading } = useGetCryptoSelectCurrencyQuery({ search });


  return (
    <>
      <div className='w-full h-full top-0 right-0 bottom-0 left-0 fixed flex items-center justify-center bg-[#2121216a] z-50' >
        <div className='absolute'>
          <div className='w-96 px-1 xl:px-6 py-5 xl:py-9 bg-white rounded-lg shadow-lg' style={{ zIndex: 60 }} >
            <div className="flex items-center">
              <h3 className="text-xl text-new-black font-semibold">Select Currency</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto h-6 w-6 cursor-pointer text-new-black hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => setCurrencyPopup(false)} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-center my-4 border-2 rounded-md relative z-40 bg-app-white border-neutral-200">
              <input type='text' placeholder="Search currencies..." className="w-full pl-4 py-2 focus:outline-none rounded-md bg-app-white" onChange={(e) => setSearch(e.target.value)} value={search} />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 pr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {!isLoading && <ul className="w-full h-36 overflow-y-scroll custom-scrollbar">
              <div className="grid grid-cols-2 gap-2">
            {data?.data?.currencies.map((listData, key) =>
            <li key={key} className={`cursor-pointer p-2  flex items-center rounded-md ${currency.currency.uuid === listData.uuid ? 'bg-app-green' : 'hover:bg-app-green transition duration-300'} `} onClick={() => dispatch(changeCurrency(listData))} >
            <img src={listData.iconUrl? listData.iconUrl : listData.symbol === 'INR'? IndianRupee : AllCurrencies} alt={listData.name} className="h-6 w-6" />
            <div className="flex flex-col">
            <span className="text-sm mx-2">{listData.name}</span>
            <span className="text-xs mx-2">{listData.symbol}</span>
            </div>
            </li>
            )}
          
              </div>
            </ul>}


          </div>
        </div>
      </div>
    </>
  )
}

export default CurrencyPopup;