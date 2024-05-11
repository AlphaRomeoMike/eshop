import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  currency: null,
};

export const currencyReducer = createReducer(initialState, {
  getExchangeRates: (state, action) => {
    const data = action.payload;
    // ? storing the selected currency in local storage to keep it presistant
    const currency = data.code.toLowerCase();
    localStorage.setItem("currency", currency);

    return {
      ...state,
      currency: data,
    };
  },
});
