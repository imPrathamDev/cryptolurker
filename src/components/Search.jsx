import { useState } from "react";
import { useGetCryptoSearchQuery } from '../services/cryptoAPI';
import SearchResult from "./SearchResult";

function Search() {
  const [input, setInput] = useState('');
  const { data, Loading } = useGetCryptoSearchQuery(input);
  if(Loading) return "Please Wait..";
  const clear = () => {
    setInput('');
  }
  return (
      <div className="flex items-center my-4 border-2 rounded-md relative z-40 w-96 bg-app-white border-neutral-200">
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
          <SearchResult result={data?.data?.coins} />
        )}
      </div>
  );
}

export default Search;
