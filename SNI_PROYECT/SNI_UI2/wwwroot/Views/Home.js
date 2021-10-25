import { ComponentsManager, WAjaxTools, WRender, WArrayF } from "../WDevCore/WModules/WComponentsTools.js";
import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import { WArticlesComponent } from "../WDevCore/WComponents/WArticlesComponent.js";

class HomeClass extends HTMLElement {
    constructor(response) {
        super();
        this.id = "HomeClass";
        this.className = "HomeClass DivContainer";
        this.response = response;
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
        
        this.append(WRender.createElement({
            type: 'w-articles',
            props: {
                id: "Artcles",
                ArticleHeader : ["foto", "nombres", "apellidos",  "fecha_ejecucion"],
                ArticleBody  : ["titulo","photo", "resumen"],
                Dataset: this.response, Options: {
                    Search: true,
                    //Show: true,
                    ApiUrlSearch: "api/Investigaciones/TakeInvestigaciones",
                    UserActions: [{
                        name: "Leer...", Function: async (Article)=>{
                            console.log(Article);
                            window.location = location.origin + "/Views/ViewRead.html?param=" + Article.id_Investigacion
                        }
                    }]
                }
            }
        }))       
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
