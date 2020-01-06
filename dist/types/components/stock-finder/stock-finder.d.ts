import { EventEmitter } from '../../stencil.core';
export declare class MyStockFinder {
    stockNameInput: HTMLInputElement;
    searchResults: {
        name: string;
        symbol: string;
    }[];
    loading: boolean;
    mySymbolSelected: EventEmitter<string>;
    onFindStocks(event: Event): void;
    onSelectSymbol(symbol: string): void;
    render(): any[];
}
