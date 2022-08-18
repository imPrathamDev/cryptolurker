import React, { useState } from 'react';
import { Link, NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import logo from '../img/logo.png';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const Menu = [
    {title: 'Home', icon: (<path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />), url: '/'},
    {title: 'Cryptocurrencies', icon: (<path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />), url: '/cryptocurrencies'},
    {title: 'News', icon: (<path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />), url: '/news'},      
];

  return (
    <>
     <header>
    <div className="fixed top-0 min-w-full border-b bg-white bg-opacity-90 blur-filter" style={{zIndex:40}}>
        <div className="px-6 md:px-12 lg:container lg:mx-auto lg:px-6 lg:py-4">
          <div className="flex items-center justify-between">
          <Link to='/' >
            <div className="relative z-20 flex items-center">
                <img src={logo} alt="logo-tailus" className="w-10 h-10" />
                <h1 className='font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-app-green via-app-purple to-app-pink'>CryptoLurker</h1>
            </div>
            </Link>
            <div className="flex items-center justify-end border-l lg:border-l-0">
              <input type="checkbox" name="hamburger" id="hamburger" className="peer" hidden />
              <label htmlFor="hamburger" className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden">
                <div aria-hidden="true" className="m-auto h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
                <div aria-hidden="true" className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
              </label>

              <div className="peer-checked:translate-x-0 fixed inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] bg-white lg:bg-opacity-0 border-r shadow-xl transition duration-300 lg:border-r-0 lg:w-auto lg:static lg:shadow-none lg:translate-x-0">
                <div className="flex flex-col h-full justify-between lg:items-center lg:flex-row">
                  <ul className="px-6 pt-32 text-gray-700 space-y-8 md:px-12 lg:space-y-0 lg:flex lg:space-x-12 lg:pt-0">
                    {Menu.map((menus, key) => 
                    <CustomeNavLink to={menus.url} title={menus.title} key={key} />
                    )}
                  </ul>

                  <div className="border-t py-8 px-6 md:px-12 md:py-16 lg:border-t-0 lg:border-l lg:py-0 lg:pr-0 lg:pl-6">
                    <a href="#" className="block px-6 py-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-400 text-center text-white">
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </header>
    </>
  );
}

const CustomeNavLink = ({ to, title, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({path: resolvedPath.pathname, end: true});
  return (
    <Link to={to}>
                    <li className='my-6 lg:my-0'>
                      <div className={`group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-app-green before:transition before:duration-200 ${isActive ? 'before:origin-left before:scale-x-100' : 'hover:before:origin-left hover:before:scale-x-100'} w-fit`}>
                        {isActive ? (<span className="relative text-app-purple">{title}</span>) : (<span className="relative group-hover:text-app-purple">{title}</span>) }
                      </div>
                    </li>
      </Link>
  )
}

export default NavBar;
