import { h } from "@stencil/core";
export class MySpinner {
    render() {
        return h("div", { class: "lds-ring" },
            h("div", null),
            h("div", null),
            h("div", null),
            h("div", null));
    }
    static get is() { return "my-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["spinner.css"]
    }; }
    static get styleUrls() { return {
        "$": ["spinner.css"]
    }; }
}
