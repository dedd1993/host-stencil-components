import { p as patchBrowser, b as bootstrapLazy } from './core-3cab3ed4.js';
patchBrowser().then(function (options) {
    return bootstrapLazy([["my-component", [[1, "my-component", { "first": [1], "middle": [1], "last": [1] }]]], ["my-spinner_3", [[1, "my-stock-finder", { "searchResults": [32], "loading": [32] }], [1, "my-stock-price", { "stockSymbol": [1537, "stock-symbol"], "fetchedPrice": [32], "stockUserInput": [32], "stockInputValid": [32], "error": [32], "loading": [32] }, [[32, "mySymbolSelected", "onStockSymbolSelected"]]], [1, "my-spinner"]]]], options);
});
