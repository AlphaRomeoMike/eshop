import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  currency: null,
};

export const currencyReducer = createReducer(initialState, {
  getExchangeRates: (state, action) => {
    const data = action.payload;
    return {
      ...state,
      currency: data,
    };
  },
});
