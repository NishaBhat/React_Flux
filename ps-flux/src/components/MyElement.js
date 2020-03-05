import React from 'react';
import ReactWebComponent from 'react-web-component';

class MyElement extends React.Component {
    render() {
        debugger;
        return <div>Hello World!</div>;
    }
}

ReactWebComponent.create(<MyElement />, 'my-component');

/*class MyElement extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
        this.message = document.createElement("div");
        this.message.textContent = "Custom Elemnt";
        this.addEventListener();
    }
    connectedCallback() {
        this.root.appendChild(this.message);
    }
    addEventListener() {
        this.root.addEventListener("click", () => {
            const evt = new CustomEvent("wobble", {
                detail: {
                    m: "%c wobble!",
                    s: "color:red"
                },
                bubbles: true
            });
            this.dispatchEvent(evt);
        });
    }
}
customElements.define("my-element", MyElement);*/