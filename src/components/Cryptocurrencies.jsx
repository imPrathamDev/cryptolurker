import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loader from './Loader';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import Search from './Search';
import { useSelector } from 'react-redux';
import SmallChart from './SmallChart';
import Helmet from 'react-helmet';
import FilterOpt from './FilterOpt';

const Cryptocurrencies = (props) => {
  const [tag, setTag] = useState({ title: 'All Coins', value: null, isOpen: false });
  const [timePeriod, setTimePeriod] = useState({ title: '24 hours', value: '24h', isOpen: false });
  const [orderBy, setOrderBy] = useState({ title: 'MarketCap', value: 'marketCap', isOpen: false });
  const currency = useSelector((state) => state.currency.currency.uuid);
  const symbol = useSelector((state) => state.currency.currency.sign ? state.currency.currency.sign : state.currency.currency.symbol);
  const [offset, setOffSet] = useState(0);
  const parData = {
    count: props.simplified ? 10 : 100,
    offset: props.simplified ? 0 : offset,
    simplified: props.simplified,
    currency,
    orderBy: props.simplified ? 'marketCap' : orderBy.value,
    timePeriod: props.simplified ? '24h' : timePeriod.value,
    tag: props.simplified ? null : tag.value,
    orderDirection: 'desc'
  }
  const { data: cryptoList, isLoading, refetch } = useGetCryptosQuery(parData);
  const [cryptos, setCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState('');

  useEffect(() => {
    const filterData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchCrypto.toLocaleLowerCase()));

    setCryptos(filterData);
  }, [cryptoList, searchCrypto]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000)
    return () => clearInterval(interval);
  }, [])

  if (isLoading) return <Loader />;

  const handlePaginationClick = (data) => {
    setOffSet(data.selected * 100);
    window.scrollTo(0, 0);
  }

  const priceFun = (price) => {
    return Math.trunc(price).toString().length <= 1 ? Math.trunc(price) === 0 ? parseFloat(price).toFixed(6) : parseFloat(price).toFixed(3) : parseFloat(price).toFixed(2)
  }

  return (
    <>
      {!props.simplified && (
        <Helmet>
          <title>CryptoLurker - All Cryptos</title>
        </Helmet>
      )}

      <div className={props.simplified ? 'mt-4' : 'mt-24'}>
        {!props.simplified && (
          <div className='flex items-center flex-col xl:flex-row'>
            <Search />
            <FilterOpt tag={tag} setTag={setTag} orderBy={orderBy} setOrderBy={setOrderBy} timePeriod={timePeriod} setTimePeriod={setTimePeriod} />
          </div>
        )}

        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-3 my-4">
          {cryptos?.map((currency, key) => (
            <Link key={key} to={`/crypto/${currency.uuid}`} >
              <li className="p-6 xl:p-8 shadow-xl rounded-xl transition-all transform hover:scale-[1.06]">
                <div className="flex justify-between items-center mb-4">
                  <img className='w-10 h-10 xl:w-14 xl:h-14 mr-4' src={currency.iconUrl} alt={currency.name} />
                  <div>
                    <div className='flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-1 ${currency.change < 0 ? 'text-red-500' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {currency.change < 0 ? (<path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />) : (<path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />)}
                      </svg>
                      <span className={`font-bold ${currency.change < 0 ? 'text-red-500' : 'text-green-500'}`}>{currency.change}%</span>
                    </div>
                    <span className="font-medium text-xs text-gray-500 flex justify-end">{currency.symbol}</span>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className=''>
                    <h3 className="font-semibold text-sm text-gray-400 truncate" style={{ color: currency.color }}>{currency.name}</h3>
                    <h1 className="font-semibold text-xl text-gray-700" ><span className='text-sm'>{symbol}</span>{priceFun(currency.price)}</h1>
                  </div>
                  <div className='xl:block hidden h-full w-full'>
                    <SmallChart coinSparkline={currency.sparkline} change={currency.change} coinUUID={currency.uuid} />
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>

        {!props.simplified && (
          <div className='mt-10 mb-8 '>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={''}
              pageCount={Math.ceil(cryptoList?.data?.stats.totalCoins / 100)}
              onPageChange={handlePaginationClick}
              marginPagesDisplayed={0}
              pageRangeDisplayed={0}

              containerClassName={'flex justify-center place-content-center my-4'}
              previousLinkClassName={'mx-1 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-app-purple '}
              pageLinkClassName={'mx-1 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-app-purple '}
              breakLinkClassName={'mx-1 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-app-purple '}
              activeLinkClassName={'mx-1 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-app-purple '}
              nextLinkClassName={'mx-1 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-app-purple '}

            />
          </div>
        )}
      </div>
    </>
  );
}

export default Cryptocurrencies;
