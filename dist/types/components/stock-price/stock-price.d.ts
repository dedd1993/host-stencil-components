export declare class MyComponent {
    stockInput: HTMLInputElement;
    el: HTMLElement;
    fetchedPrice: number;
    stockUserInput: string;
    stockInputValid: boolean;
    error: string;
    loading: boolean;
    stockSymbol: string;
    stockSymbolChanged(newValue: string, oldValue: string): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    onStockSymbolSelected(event: CustomEvent): void;
    onUserInput(e: Event): void;
    onFetchStockPrice(e: Event): void;
    fetchStockPrice(ss: any): void;
    hostData(): {
        class: string;
    };
    render(): any[];
}
