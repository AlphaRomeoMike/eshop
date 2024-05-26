const express = require("express");
const Currency = require("../model/currency");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// ? fetch exchange rates from floatrates
router.get(
  "/get-updated-exchange-rates",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const response = await fetch("https://www.floatrates.com/daily/usd.json");
      const data = await response.json();

      if (!data) {
        return next(
          new ErrorHandler(
            "Something went wrong while fetching exchange rate!",
            500
          )
        );
      }

      // ? extract PKR rate
      const pkrData = data["pkr"];

      const pkr = await Currency.findOneAndUpdate(
        { code: pkrData.code },
        {
          alphaCode: pkrData.alphaCode,
          numericCode: pkrData.numericCode,
          name: pkrData.name,
          rate: pkrData.rate,
          date: pkrData.date,
          inverseRate: pkrData.inverseRate,
        },
        { upsert: true, new: true }
      );

      // ? save or update the USD data in MongoDB
      const usd = await Currency.findOneAndUpdate(
        { code: "USD" },
        {
          code: "USD",
          alphaCode: "$",
          numericCode: "840",
          name: "United States Dollar",
          rate: 1,
          date: new Date().toISOString(),
          inverseRate: 1,
        },
        {
          upsert: true,
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        message: "Updated exchange rates retreived successfully!",
        data: [usd, pkr],
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ? fetch exchange rates from mongodb
router.get(
  "/get-exchange-rates",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const currencies = await Currency.find();

      if (currencies.length === 0) {
        return next(new ErrorHandler("Currencies data not available!", 404));
      }

      res.status(200).json({
        success: true,
        message: "Exchange rates retreived successfully!",
        data: currencies,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ? fetch exchange rates from floatrates
router.get(
  "/get-exchange-rate",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { code } = req.query;
      const currency = await Currency.findOne({ code });

      if (!currency) {
        return next(new ErrorHandler("Currency data not available!", 404));
      }

      res.status(200).json({
        success: true,
        message: "Exchange rate retreived successfully!",
        data: currency,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
