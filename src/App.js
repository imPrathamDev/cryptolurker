import React from 'react';
import Helmet from 'react-helmet';
import { Route, Routes } from 'react-router-dom';
import { NavBar, Homepage, CryptoDetails, Cryptocurrencies, News, Footer } from './components';

const App = () => {
    return (
        <>
            <Helmet>
                <title>Meta Tags — Preview, Edit and Generate</title>
                <meta name="title" content="Crypto Lurker" />
                <meta name="description" content="Analysis the market of crypto" />
            </Helmet>
            <div className='bg-app-white'>
                <NavBar />
                <div className='bg-app-white sm:px-6 lg:px-8 px-4 mx-auto mt-24 md:mt-16'>
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                        <Route path='/crypto/:coinUUID' element={<CryptoDetails />} />
                        <Route path='/news' element={<News />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;
