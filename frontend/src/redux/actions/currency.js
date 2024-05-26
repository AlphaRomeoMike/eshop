import axios from "axios";
import { server } from "../../server";

// ? fetch exchange rate from mongodb
export const fetchExchangeRate =
  (currency = localStorage.getItem("currency") || "usd") =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${server}/currency/get-exchange-rate?code=${currency?.toUpperCase()}`
      );

      dispatch({
        type: "getExchangeRate",
        payload: data,
      });
    } catch (error) {
      console.error("Error changing country:", error);
    }
  };

// ? fetch exchange rates from float rates API
export const fetchUpdatedExchangeRates = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${server}/currency/get-updated-exchange-rates`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getUpdatedExchangeRates",
      payload: data.data,
    });
  } catch (error) {
    console.error("Error changing country:", error);
  }
};

// ? fetch exchange rates from mongodb
export const fetchExchangeRates = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/currency/get-exchange-rates`);

    dispatch({
      type: "getUpdatedExchangeRates",
      payload: data.data,
    });
  } catch (error) {
    console.error("Error changing country:", error);
  }
};
