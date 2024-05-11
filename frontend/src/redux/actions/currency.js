// ? fetch exchange rates from float rates API
export const fetchExchangeRates =
  (currency = localStorage.getItem("currency") || "usd") =>
  async (dispatch) => {
    try {
      const response = await fetch(`https://www.floatrates.com/daily/usd.json`); // ? APIs to fetch conversion rates
      const parsedResponse = await response.json();

      dispatch({
        type: "getExchangeRates",
        // ? this condition will set the currency to usd if none is selected
        payload:
          currency === "usd"
            ? {
                code: "USD",
                alphaCode: "$",
                rate: 1,
                inverseRate: 1,
              }
            : parsedResponse[currency],
      });
    } catch (error) {
      console.error("Error changing country:", error);
    }
  };
