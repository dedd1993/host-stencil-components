import { h } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';
export class MyStockFinder {
    constructor() {
        this.searchResults = [];
        this.loading = false;
    }
    onFindStocks(event) {
        event.preventDefault();
        const stockName = this.stockNameInput.value;
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(parsedRed => {
            this.searchResults = parsedRed['bestMatches'].map(match => ({ name: match['2. name'], symbol: match['1. symbol'] }));
            this.loading = false;
        })
            .catch(err => {
            console.log(err);
            this.loading = false;
        });
    }
    onSelectSymbol(symbol) {
        this.mySymbolSelected.emit(symbol);
    }
    render() {
        let content = (h("ul", null, this.searchResults.map(item => (h("li", { onClick: this.onSelectSymbol.bind(this, item.symbol) },
            h("strong", null, item.symbol),
            " - ",
            item.name)))));
        if (this.loading) {
            content = h("my-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) },
                h("input", { id: "stock-symbol", ref: el => this.stockNameInput = el }),
                h("button", { type: "submit", disabled: this.loading }, "Fetch")),
            h("div", null, content)
        ];
    }
    static get is() { return "my-stock-finder"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["stock-finder.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stock-finder.css"]
    }; }
    static get states() { return {
        "searchResults": {},
        "loading": {}
    }; }
    static get events() { return [{
            "method": "mySymbolSelected",
            "name": "mySymbolSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }]; }
}
