import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  currency: null,
};

export const currencyReducer = createReducer(initialState, {
  getExchangeRates: (state, action) => {
    const data = action.payload;
    const currency = data.code.toLowerCase();
    localStorage.setItem("currency", currency);

    return {
      ...state,
      currency: data,
    };
  },
});
