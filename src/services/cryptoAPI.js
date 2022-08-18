import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const createApiHeaders = {
    'X-RapidAPI-Host': process.env.REACT_APP_COINRANKING_API_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_COINRANKING_API_KEY,
}

const baseURL = 'https://coinranking1.p.rapidapi.com';

let createRequest = (url) => ({ url, headers: createApiHeaders });

export const cryptoApi = createApi({
   reducerPath: 'cryptoApi',
   baseQuery: fetchBaseQuery({ 
       baseUrl: baseURL, 
    }),
   endpoints: (builder) =>({
    getCryptos: builder.query({
           query: ({count, offset, currency, orderBy, timePeriod, tag})=> createRequest(`/coins?referenceCurrencyUuid=${currency}&limit=${count}&offset=${offset}&timePeriod=${timePeriod}&orderBy=${orderBy}${tag === null ? '' : `&tags[0]=${tag}`}`),
    }),
    getCryptoDetails: builder.query({
        query: ({coinUUID, currency})=> createRequest(`/coin/${coinUUID}?referenceCurrencyUuid=${currency}`),
    }),
    getCryptoHistory: builder.query({
        query: ({coinUUID, timePeriod, currency})=> createRequest(`/coin/${coinUUID}/history?referenceCurrencyUuid=${currency}&timePeriod=${timePeriod}`),
    }),
    getCryptoExchanges: builder.query({
        query: ({coinUUID, limit, currency})=> createRequest(`/coin/${coinUUID}/exchanges?referenceCurrencyUuid=${currency}&limit=${limit}`),
    }),
    getCryptoSearch: builder.query({
        query: (searchCoin)=> createRequest(`/search-suggestions?query=${searchCoin}`),
    }),
    getCryptoBlockchain: builder.query({
        query: (coinUUID) => createRequest(`/coin/${coinUUID}/issuance-blockchains`),
    }),
    getCryptoMarket: builder.query({
        query: ({ coinUUID, limit, currency }) => createRequest(`/coin/${coinUUID}/markets?limit=${limit}&?offset=0&referenceCurrencyUuid=${currency}`),
    }),
    getCryptoOHLC: builder.query({
        query: ({ coinUUID, currency }) => createRequest(`/coin/${coinUUID}/ohlc?referenceCurrencyUuid=${currency}&?limit=100`),
    }),
    getCryptoSelectCurrency: builder.query({
        query: ({ search }) => createRequest(`/reference-currencies?search=${search}`)
    }),
    getCryptoStats: builder.query({
        query: ({ currency }) => createRequest(`/stats?referenceCurrencyUuid=${currency}`)
    })
   }) 
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoExchangesQuery, useGetCryptoSearchQuery, useGetCryptoBlockchainQuery, useGetCryptoMarketQuery, useGetCryptoOHLCQuery, useGetCryptoSelectCurrencyQuery, useGetCryptoStatsQuery } = cryptoApi;