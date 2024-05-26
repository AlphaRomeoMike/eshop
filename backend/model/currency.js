const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema(
  {
    code: {
      type: String,
    },
    alphaCode: {
      type: String,
    },
    numericCode: {
      type: String,
    },
    name: {
      type: String,
    },
    rate: {
      type: Number,
    },
    date: {
      type: String,
    },
    inverseRate: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Currency", currencySchema);
