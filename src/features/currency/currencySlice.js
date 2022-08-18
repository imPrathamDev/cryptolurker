import { createSlice } from "@reduxjs/toolkit";


export const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        uuid: "6mUvpzCc2lFo",
        type: "fiat",
        iconUrl: "https://cdn.coinranking.com/kz6a7w6vF/usd.svg",
        name: "US Dollar",
        symbol: "USD",
        sign: "$"
    },
    reducers: {
        changeCurrency: (state, actions) => {
            state.uuid = actions.payload.uuid
            state.name = actions.payload.name
            state.type = actions.payload.type
            state.iconUrl = actions.payload.iconUrl
            state.symbol = actions.payload.symbol
            state.sign = actions.payload.sign
        },
    },
});

export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;