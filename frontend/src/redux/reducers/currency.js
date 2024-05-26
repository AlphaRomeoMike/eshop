import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  currency: null,
  currencies: [],
};

export const currencyReducer = createReducer(initialState, {
  getExchangeRate: (state, action) => {
    const data = action.payload;
    // ? storing the selected currency in local storage to keep it presistant
    const currency = data.code.toLowerCase();
    localStorage.setItem("currency", currency);

    return {
      ...state,
      currency: data,
    };
  },

  getUpdatedExchangeRates: (state, action) => {
    return {
      ...state,
      currencies: action.payload,
    };
  },
});
