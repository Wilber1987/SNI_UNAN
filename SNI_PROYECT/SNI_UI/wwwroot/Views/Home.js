import { ComponentsManager, WAjaxTools, WRender, WArrayF } from "../WDevCore/WModules/WComponentsTools.js";
import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WComponents/WTableComponents.js";
import { WArticlesComponent } from "../WDevCore/WComponents/WArticlesComponent.js";

class HomeClass extends HTMLElement {
    constructor() {
        super();
        this.id = "HomeClass";
        this.className = "HomeClass DivContainer";
        this.contain = WRender.createElement({ type: 'div', props: { id: '', class: 'CardContainer' }, children: [] });
        this.append(WRender.createElement(this.Style));
        this.append(this.contain);
    }
    connectedCallback() {
        if (this.contain.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async () => {
        const response = await WAjaxTools.PostRequest("api/Investigaciones/TakeInvestigaciones");
        this.append(WRender.createElement({
            type: 'w-articles',
            props: {
                id: "Artcles",
                Dataset: response, Options: {
                    Search: true,
                    ApiUrlSearch: "api/Investigaciones/TakeInvestigaciones",
                }
            }
        }))
        // response.forEach(element => {
        //     const Card = WRender.createElement({
        //         type: 'div',
        //         props: { class: 'CardInves' },
        //         children: [
        //         ]
        //     });
        //     this.contain.append(Card);
        // });
    }
    Style = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".CardContainer", {
                    display: "flex",
                    "flex-direction": "column"
                }), new WCssClass(".CardInves", {
                    overflow: "auto",
                    padding: "20px",
                    "margin-bottom": 10,
                    "margin-left": 5,
                    "margin-right": 5,
                    "min-height": 100,
                    "border-radius": "0.2cm",
                    "background-color": "#fff",
                    "box-shadow": "0 0px 3px 0 rgba(0,0,0,0.4)"
                }),
            ], MediaQuery: [{
                condicion: "(max-width: 1200px)",
                ClassList: [
                    new WCssClass(".ImagesContainer", {
                        display: "grid",
                        "grid-template-columns": "auto auto auto"
                    })
                ]
            }, {
                condicion: "(max-width: 600px)",
                ClassList: [
                    new WCssClass(".ImagesContainer", {
                        display: "grid",
                        "grid-template-columns": "auto auto"
                    })
                ]
            }]
        }
    };
}
customElements.define("app-home", HomeClass);
export { HomeClass }
