import { Link, Navigate } from "react-router-dom";

function SearchResult({ result }) {
  return (
    <>  
{result.length > 0 ? (<ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-app-white border-neutral-200 custom-scrollbar">
{ result.map((data) => 
        <Link to={`/crypto/${data.uuid}`} key={data.uuid} >
        <li className={`cursor-pointer p-4 m-2 flex items-center rounded-md hover:bg-app-green transition duration-300`} >
            <img src={data.iconUrl} alt={data.name} className="h-8 w-8" />
            <span className="text-lg mx-2">{data.name}</span>
            <span className="text-sm ml-auto">{data.symbol}</span>
          </li>
          </Link>
)}
</ul>) : null} 
</>   
  );
}

export default SearchResult;
