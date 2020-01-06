'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-00724602.js');

const defineCustomElements = (win, options) => {
  return core.patchEsm().then(() => {
    core.bootstrapLazy([["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["my-spinner_3.cjs",[[1,"my-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"my-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[32,"mySymbolSelected","onStockSymbolSelected"]]],[1,"my-spinner"]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
