import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import moment from 'moment';
import Sentiment from 'sentiment';
import placeholder from '../img/placeholder.png';
import fearIcon from '../svg/fear.svg';
import happyIcon from '../svg/happy.svg';
import neutralIcon from '../svg/neutral.svg';
import Loader from './Loader';
import ReactPaginate from 'react-paginate';
import logo from '../img/logo.png';
import { useGetCryptoSearchQuery } from '../services/cryptoAPI';

const News = ({ simplified, newsCategory }) => {
  const [ input, setInput ] = useState('');
  const [ offSet, setOffSet ] = useState(0);
  const parData = {
    newsCategory: newsCategory ? newsCategory : input.length > 0 ? input : 'Cryptocurrency',
    count: simplified ? 6 : 12,
    offSet: simplified ? 0 : offSet,
  }

  const { data, Loading } = useGetCryptoSearchQuery(input);
  const { data: cryptoNewsList, isLoading } = useGetCryptoNewsQuery(parData);
  if (isLoading) return <Loader />;

  const sentiment = new Sentiment();

  const handlePaginationClick = (data) => {
    setOffSet(data.selected*12);
    console.log(data.selected)
    window.scrollTo(0,0);
  }

  const clear = () => {
    setInput('');
  }

  return (
    <>
      {!simplified && (
      <div className='mt-24 flex flex-col xl:flex-row items-center'>
        <div>
        <h2 className='text-4xl font-bold'>Latest Crypto News</h2>
        <p>Get latest and Accurate Cryptocurreency News With Sentiment Analysis Emojis.</p>
        </div>
        
        <div className='xl:ml-auto flex xl:items-center my-4 border-2 rounded-md relative z-40 w-96 bg-app-white border-neutral-200'>
        <input type='text' placeholder="Search crypto..." className="w-full px-4 py-2 focus:outline-none rounded-md bg-app-white" onChange={(e) => { setInput(e.target.value) }} value={input} />
        {input && (
          <button onClick={clear} className="m-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 rounded-full hover:bg-app-green hover:text-app-white p-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          className="h-8 w-8 bg-gradient-to-r from-app-green to-app-purple rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-app-purple"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        {input && (
        data?.data?.coins.length > 0 ? (<ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-app-white border-neutral-200 custom-scrollbar">
          { data?.data?.coins.map((data) => 
                  <li key={data.uuid} className={`cursor-pointer p-4 m-2 flex items-center rounded-md hover:bg-app-green transition duration-300`} onClick={() => setInput(data.name)} >
                      <img src={data.iconUrl} alt={data.name} className="h-8 w-8" />
                      <span className="text-lg mx-2">{data.name}</span>
                      <span className="text-sm ml-auto">{data.symbol}</span>
                    </li>
          )}
          </ul>) : null
        )
      }
        </div>
      </div>)}

    {cryptoNewsList.value.length > 0 ? (<div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-3 lg:grid-cols-3 mb-4">
        {cryptoNewsList.value.map((news, key) => (
          <a href={news.url} target='_blank' rel='noreferrer' className='relative block p-8 overflow-hidden border border-gray-100 rounded-lg hover:shadow-lg transition-all duration-300'>
            <span
              className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-app-green via-app-purple to-app-pink"
            ></span>

            <div className="justify-between sm:flex">
              <div>
                <h5 className="text-xl font-bold text-gray-900">
                {news.name.length > 60? `${news.name.substring(0,60)}...`: news.name}
                </h5>
                <div className='mt-1 flex items-center'>
                <img src={news?.provider[0]?.image?.thumbnail?.contentUrl.length > 0 ? news?.provider[0]?.image?.thumbnail?.contentUrl : logo } alt={news?.provider[0]?.name} className="h-5 w-5 rounded-full mr-1" />  
                <p className="text-xs font-medium text-gray-600">By {news?.provider[0]?.name}</p>
                </div>
              </div>

              <div className="flex-shrink-0 hidden ml-3 sm:block">
                <img
                  className="object-cover w-[5rem] h-[5rem] rounded-lg shadow-sm"
                  src={news?.image?.thumbnail?.contentUrl.length > 0 ? news?.image?.thumbnail?.contentUrl : placeholder}
                  alt={news.name}
                />
              </div>
            </div>

            <div className="mt-4 sm:pr-8">
              <p className="text-sm text-gray-500">
              {news.description.length > 100 ? `${news.description.substring(0,100)}...` : news.description}
              </p>
            </div>

            <dl className="flex mt-6 items-center w-full">
              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">Published</dt>
                <dd className="text-xs text-gray-500">{moment(news.datePublished).startOf('ss').fromNow()}</dd>
              </div>

              <div className="ml-auto sm:ml-6" style={{marginLeft: 'auto'}}>
              {sentiment.analyze(news.description).score > 0?(<img src={happyIcon} alt='Happy' className='h-9 w-9' />):sentiment.analyze(news.description).score === 0?(<img src={neutralIcon} alt='Neutral' className='h-9 w-9' />):(<img src={fearIcon} alt="Fear" className='h-9 w-9' />)}
              </div>
            </dl>
          </a>
        ))}
      </div>) : (<div class="flex items-center justify-center flex-col text-center">
  <img
    src="https://c.tenor.com/KOZLvzU0o4kAAAAM/no-results.gif"
    alt="Error 404"
    className="object-cover w-fit h-60 rounded-lg self-center"
  />

  <p class="mt-6 text-gray-500">We can't find anything, may be there is no news about this crypto.</p>
</div>)}
      
      {!simplified && (
        <div className='mt-10 mb-8 '>
        <ReactPaginate 
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={''}
        pageCount={Math.ceil(cryptoNewsList.totalEstimatedMatches/100)}
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
    </>
  );
}

export default News;