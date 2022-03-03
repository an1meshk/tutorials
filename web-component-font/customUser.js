class CustomUser extends HTMLElement {
    constructor(){
        super();
        this.greet = "Hello";
        this.name = "";

        const font1 = document.createElement("link");
        font1.rel = "preconnect";
        font1.href = "https://fonts.googleapis.com";
        document.head.appendChild(font1);

        const font2 = document.createElement("link");
        font2.rel = "preconnect";
        font2.href = "https://fonts.gstatic.com";
        font2.crossorigin = true;
        document.head.appendChild(font2);

        const font3 = document.createElement("link");
        font3.href = "https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap";
        font3.rel = "stylesheet"
        document.head.appendChild(font3);
    }

    static get observedAttributes() {
        return ['name','greet'];
    }
    
    attributeChangedCallback(property, oldValue, newValue) {

        if (oldValue === newValue) return;
        this[ property ] = newValue;
        
    }

    connectedCallback(){
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                h3 {
                    color: green;
                    font-family: 'Dancing Script', cursive;
                }
            </style>

            <h3>${this.greet} ${this.name}</h3>
        `;
    }
}

customElements.define('custom-user', CustomUser);