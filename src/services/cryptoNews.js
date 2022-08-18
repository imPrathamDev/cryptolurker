import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const createApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_API_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createNewsReq = (url) => ({ url, headers: createApiHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) =>({
        getCryptoNews: builder.query({
            query: ({newsCategory,count,offSet})=> createNewsReq(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}&offset=${offSet}`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;