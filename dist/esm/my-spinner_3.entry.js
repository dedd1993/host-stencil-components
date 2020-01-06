import { r as registerInstance, h, c as createEvent, g as getElement, H as Host } from './core-3cab3ed4.js';

const MySpinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("div", { class: "lds-ring" }, h("div", null), h("div", null), h("div", null), h("div", null));
    }
    static get style() { return ".lds-ring{display:inline-block;position:relative;width:80px;height:80px}.lds-ring div{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border:8px solid #750175;border-radius:50%;-webkit-animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:#750175 transparent transparent transparent}.lds-ring div:first-child{-webkit-animation-delay:-.45s;animation-delay:-.45s}.lds-ring div:nth-child(2){-webkit-animation-delay:-.3s;animation-delay:-.3s}.lds-ring div:nth-child(3){-webkit-animation-delay:-.15s;animation-delay:-.15s}\@-webkit-keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}"; }
};

const AV_API_KEY = 'V9YDWKCU24CNITFI';

const MyStockFinder = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.searchResults = [];
        this.loading = false;
        this.mySymbolSelected = createEvent(this, "mySymbolSelected", 7);
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
        let content = (h("ul", null, this.searchResults.map(item => (h("li", { onClick: this.onSelectSymbol.bind(this, item.symbol) }, h("strong", null, item.symbol), " - ", item.name)))));
        if (this.loading) {
            content = h("my-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockNameInput = el }), h("button", { type: "submit", disabled: this.loading }, "Fetch")),
            h("div", null, content)
        ];
    }
    static get style() { return ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font-family:inherit;color:#3b013b;padding:.1rem .25rem;display:block;margin-bottom:.5rem}form input:focus{outline:none}form button{font-family:inherit;padding:.25rem .5rem;border:1px solid #3b013b;background-color:#3b013b;color:#fff;cursor:pointer}form button:active,form button:hover{background-color:#750175;border-color:#750175}form button:disabled{background-color:#d3d3d3;border-color:#d3d3d3;color:#fff}ul{margin:0;padding:0;list-style-type:none}li{margin:.25rem 0;padding:.25rem;border:1px solid #ccc;cursor:pointer}li:active,li:hover{background-color:#3b013b;color:#fff}"; }
};

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.stockInputValid = false;
        this.loading = false;
    }
    stockSymbolChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.stockInputValid = true;
            this.fetchStockPrice(newValue);
        }
    }
    componentWillLoad() {
        console.log('componentWillLoad');
    }
    componentDidLoad() {
        console.log('componentDidLoad');
        if (this.stockSymbol) {
            // this.initialStockSymbol = this.stockSymbol;
            this.stockUserInput = this.stockSymbol;
            this.stockInputValid = true;
            this.fetchStockPrice(this.stockSymbol);
        }
    }
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
        // if (this.stockSymbol !== this.initialStockSymbol) {
        //   this.initialStockSymbol = this.stockSymbol;
        //   this.fetchStockPrice(this.stockSymbol);
        // }
    }
    componentDidUnload() {
        console.log('componentDidUnload');
    }
    onStockSymbolSelected(event) {
        console.log('stock symbol selected');
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail;
        }
    }
    onUserInput(e) {
        this.stockUserInput = e.target.value;
        if (this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        }
        else {
            this.stockInputValid = false;
        }
    }
    onFetchStockPrice(e) {
        e.preventDefault();
        this.stockSymbol = this.stockInput.value;
    }
    fetchStockPrice(ss) {
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ss}&apikey=${AV_API_KEY}`)
            .then(res => {
            if (res.status !== 200) {
                throw new Error('Invalid!');
            }
            return res.json();
        })
            .then(parsedRes => {
            if (parsedRes['Error Message']) {
                throw new Error('Invalid symbol!');
            }
            this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
            this.error = null;
            this.loading = false;
        })
            .catch(err => {
            this.loading = false;
            this.error = err.message;
            this.fetchedPrice = null;
        });
    }
    hostData() {
        return { class: this.error ? 'hydrated error' : 'hydrated' };
    }
    __stencil_render() {
        console.log('render');
        let dataContent = h("p", null, "Plese enter a symbol!");
        if (this.error) {
            dataContent = h("p", null, this.error);
        }
        if (this.fetchedPrice) {
            dataContent = h("p", null, "Price: ", this.fetchedPrice);
        }
        if (this.loading) {
            dataContent = h("my-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockInput = el, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
            h("div", null, dataContent)
        ];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "stockSymbol": ["stockSymbolChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:#e79804}form input{font-family:inherit;color:#3b013b;padding:.1rem .25rem;display:block;margin-bottom:.5rem}form input:focus{outline:none}form button{font-family:inherit;padding:.25rem .5rem;border:1px solid #3b013b;background-color:#3b013b;color:#fff;cursor:pointer}form button:active,form button:hover{background-color:#750175;border-color:#750175}form button:disabled{background-color:#d3d3d3;border-color:#d3d3d3;color:#fff}"; }
};

export { MySpinner as my_spinner, MyStockFinder as my_stock_finder, MyComponent as my_stock_price };
