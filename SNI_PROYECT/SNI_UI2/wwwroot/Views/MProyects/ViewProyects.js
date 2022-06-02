import { WRender, WArrayF, ComponentsManager, WAjaxTools, GenerateColor } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import { WArticlesComponent } from "../../WDevCore/WComponents/WArticlesComponent.js";
import { AsideV1 } from "../../AppComponents/AsideV1.js";

const DOMManager = new ComponentsManager();
class ViewProyects extends HTMLElement {
    constructor(TipoProyecto) {
        super();
        this.TipoProyecto = TipoProyecto;
        this.ViewProyectsContainer = WRender.createElement({ type: 'div', props: { class: 'ViewProyectsContainer' } });
        //this.ViewProyectsContainer.append(Card);
        this.TabContainer = WRender.createElement({ type: 'div', props: { id: 'TabContainer', class: 'TabContainer' } });
        this.TipoProyecto.forEach(element => {
            this.ComponentTab.Elements.push({
                name: element.Descripcion_Tipo_Proyecto, url: "#", icon: element.icon,
                action: async (ev) => {
                    const response = await WAjaxTools.PostRequest("../../api/Proyect/TakeProyects", {
                        id_Tipo_Proyecto: element.id_Tipo_Proyecto
                    });
                    DOMManager.NavigateFunction(
                        "Tab-" + element.descripcion_Tipo_Proyecto,
                        new ViewProyectsTab(element, response), "TabContainer"
                    );
                }
            });
        });
        this.append(
            WRender.CreateStringNode("<div><h3 class='HeaderDis'>Proyectos Nacionales</h3><hr></div>"),
            WRender.createElement(this.styleComponent),
            this.ComponentTab,
            this.TabContainer
        );
    }
    connectedCallback() {
        if (this.ViewProyectsContainer.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async () => {
        console.log("connected");
    }
    ComponentTab = WRender.createElement({
        type: "w-app-navigator",
        props: {
            NavStyle: "tab",
            id: "GuidesNav",
            title: "Menu",
            Inicialize: true,
            Elements: []
        }
    });

    styleComponent = {
        type: 'w-style', props: {
            ClassList: [
                new WCssClass(`w-view`, {
                    display: 'block',
                    "background-color": "#fff",
                    padding: 20,
                    "border-radius": "0.3cm",
                    "box-shadow": "0 2px 5px 2px rgba(0,0,0,0.2)"
                }), new WCssClass(`.ViewProyectsContainer`, {
                    display: 'grid',
                    "grid-template-columns": "250px auto",
                    "border-bottom": "solid 2px #bbbec1",
                    "padding-bottom": 10,
                    "margin-bottom": 20,
                }), new WCssClass(`.DataContainer`, {
                    display: 'flex',
                    "flex-direction": "column",
                    padding: "20px 0px"
                }), new WCssClass(` h3`, {
                    margin: "5px 10px",
                    color: "#09315f"
                }), new WCssClass(`.DataContainer label`, {
                    margin: "5px 10px",
                }), new WCssClass(`.MapIframe`, {
                    width: '100%',
                    height: 400,
                    border: "none",
                    "border-bottom": "solid 6px rgb(12 109 148)"
                }),
            ], MediaQuery: [{
                condicion: "(max-width: 800px)",
                ClassList: [
                    new WCssClass(`.ViewProyectsContainer`, {
                        display: 'grid',
                        "grid-template-columns": "100%"
                    })
                ]
            }]
        }
    };
}
class ViewProyectsTab {
    constructor(TipeProyect = {}, Dataset = []) {
        this.type = "div"
        this.props = {
            className: "Tab",
        }
        this.children = [
            {
                type: 'w-articles',
                props: {
                    //ArticleHeader : ["nombre_Proyecto"],
                    ArticleBody  : ["Nombre_Proyecto", "DescripcionProyecto"],
                    Dataset: Dataset, Options: {
                        Search: true,
                        ApiUrlSearch: "api/Investigaciones/TakeInvestigaciones",
                        UserActions: [{
                            name: "Detalles", Function: async (Article)=>{
                                window.location = location.origin + "/Views/MProyects/ViewProyect.html?param=" + Article.id_Proyecto
                            }
                        }]
                    }
                }
            }           
        ]
    }
    Style = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".Tab", {
                    padding: 10,
                    display: "grid",
                    "grid-template-columns": "29% 69%",
                    "grid-gap": 10
                })
            ], MediaQuery: [{
                condicion: '(max-width: 1200px)',
                ClassList: [
                    new WCssClass(".GuidesContainer", {
                        "grid-template-columns": "50% 50%"
                    }),
                ]
            }]
        }
    };
}
customElements.define('w-view', ViewProyects);
export {ViewProyects}