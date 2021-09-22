import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel, WCard } from '../WDevCore/WComponents/WCardCarousel.js';
import { StylesControlsV1 } from "../WDevCore/StyleModules/WStyleComponents.js";
import "../WDevCore/WComponents/WTableComponents.js";
const DOMManager = new ComponentsManager();
const OnLoad = async () => {
    const Id_Investigador = new URLSearchParams(window.location.search).get('param');
    const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigadorProfile",
        { Id_Investigador: Id_Investigador }
    );
    const { WRender } = await import("../WDevCore/WModules/WComponentsTools.js");
    const modules = await import("../MasterDomDetaills.js");
    const Card = new WCard({
        nombres: response.nombres,
        apellidos: response.apellidos,
        foto: response.foto,
        tipoColaboracion: "Autor",
        nombreInstitucion: response.nombreInstitucion
    }, 2);
    const BodyComponents = new modules.MasterDomDetaills(new WProfileInvestigador(response, Card), []);
    App.appendChild(WRender.createElement(BodyComponents));
}
class WProfileInvestigador extends HTMLElement {
    constructor(response, Card) {
        super();
        this.response = response;
        this.ProfileContainer = WRender.createElement({ type: 'div', props: { class: 'ProfileContainer' }});
        this.ProfileContainer.append(Card);
        this.ProfileContainer.append(WRender.createElement({ type:'div', props: { id: '', class: 'DataContainer'}, children:[
            WRender.CreateStringNode("<h3>Datos Generales</h3>"),
            "Estado: " + response.estado,
            "Sexo: " + response.sexo,
            "Indice H: " + response.indice_H,
            "Correo: " + response.correo_institucional,
        ]}));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" }});
        this.appendChild(WRender.createElement(StylesControlsV1));
        this.append(WRender.createElement(this.styleComponent), this.ProfileContainer, this.ComponentTab, this.TabContainer);
    }
    connectedCallback() {
        if (this.ProfileContainer.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async () => {
    }
    ComponentTab = WRender.createElement({
        type: "w-app-navigator",
        props: {
            NavStyle: "tab",
            id: "GuidesNav",
            title: "Menu",
            Elements: [
                {
                    name: "Investigaciones", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Investigaciones", new ProfileTab(
                            this.response.investigaciones,
                            ["titulo", "fecha_ejecucion", "estado"]
                        ), "TabContainer");
                    }
                }, {
                    name: "Colaboraciones", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Colaboraciones", new ProfileTab(
                            this.response.colaboraciones,
                            ["titulo", "tipoColaboracion", "fecha_ejecucion"]
                        ), "TabContainer");
                    }
                }, {
                    name: "Proyectos", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Proyectos", new ProfileTab(
                            this.response.proyectos,
                            ["nombre_Proyecto", "cargo", "estado_Proyecto"]
                        ), "TabContainer");
                    }
                }
            ]
        }
    });
    styleComponent = {
        type: 'w-style', props: {
            ClassList: [ 
                new WCssClass( `.ProfileContainer`, {
                    display: 'grid',
                    "grid-template-columns": "250px auto"
                }),new WCssClass( `.DataContainer`, {
                    display: 'flex',
                    "flex-direction": "column",
                    padding: "0px 20px"
                }), new WCssClass(`.photoBaner`, {
                    width: "95%",
                    "box-shadow": "0 0px 5px 0 rgba(0,0,0,0.6)",
                    "border-radius": "0.3cm",
                    "object-fit": "cover",
                    display: 'flex',
                    "align-items": "center",
                    "justify-content": "center",
                    "flex-wrap": "wrap",
                    "flex-direction": "column"
                }), new WCssClass(`.InvestigacionCard`, {
                    display: 'flex',
                    width: "100%",
                    "margin-top": "10px !important",
                    overflow: "hidden",
                    position: "relative",
                    "border-radius": "0.3cm"
                }), new WCssClass(`.InvestigacionCard .Details`, {
                    width: '100%',
                    "text-align": "left",
                    display: "grid",
                    "grid-template-columns": "33% 33% 33%",
                    "grid-template-rows": "50px 80px",
                    "grid-gap": 5,
                    "text-align": "center",
                    bottom: 0,
                    left: 10,
                    right: 0,
                    color: "#444"
                }), new WCssClass(`.InvestigacionCard .Details a`, {
                    "grid-column": "1/4",
                    color: "#444 !important",
                    padding: 10,
                    margin: 0,
                    background: "rgb(187 187 187 / 50%)",
                    "font-size": 16,
                    "border-radius": "0.2cm"
                }), new WCssClass(`.InvestigacionCard .Details div`, {
                    padding: 10,
                    background: "rgb(187 187 187 / 50%)",
                    "font-size": 14,
                    "border-radius": "0.2cm",
                    height: "calc(100% - 20px)",
                    display: "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                    "justify-content": "center",
                }), new WCssClass(`.InvestigacionCard .Details div .imgIcon`, {
                    height: "40px !important",
                    width: "40px !important"
                }),
                new WCssClass(`.Animate`, {
                    animation: "cambio 5s infinite",
                }),
                new WCssClass(`.InvestigacionCard img`, {
                    float: "left",
                    width: "400px !important",
                    height: "300px !important",
                }), new WCssClass(`.PropiedadDetails`, {
                    display: 'grid',
                    "grid-template-columns": "100%",
                }), new WCssClass(`.DetailsDiv`, {
                    padding: 10,
                }), new WCssClass(`.DetailsDiv p`, {
                    "text-align": "justify"
                }), new WCssClass(`.TagContainer`, {
                    display: "grid",
                    "grid-template-columns": "auto auto",
                }), new WCssClass(`.TagContainer label`, {
                    padding: 10,
                    "border-radius": "0.2cm",
                    background: "#0084d2",
                    color: "#fff",
                    margin: 5,
                }),
            ]
        }
    };
}
class ProfileTab {
    constructor(Dataset = [], DisplayData = []) {
        this.type = "div"
        this.props = {
            className: "",
        }
        this.children = [this.Style];
        if (Dataset.length != 0) {
            const Label1 = { type: 'h3', props: { innerText: 'Initial Guides', class: 'className' } };
            var TableConfigG = {
                Datasets: Dataset,
                Colors: ["#ff6699", "#ffbb99", "#adebad"],
                DisplayData: DisplayData,
                Options: {
                    Search: true,
                    //Show: true,
                    //UserActions: UserActions
                }
            };
            const WTableReport = WRender.createElement({
                type: "w-table",
                props: {
                    id: "TableId",
                    TableConfig: TableConfigG
                }
            });
            this.children.push(WTableReport);
        } else {
            this.children.push("No guides registered!");
        }
        this.ModalContainer = WRender.createElement({ type: 'div', props: { id: '', class: 'className' } })
        this.children.push(this.ModalContainer)

    }
    Style = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".TabContainer", {
                   padding: 10,
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
customElements.define('w-view', WProfileInvestigador);
window.onload = OnLoad;