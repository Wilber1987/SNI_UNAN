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
    const dataResume = WRender.createElement({
        type: 'div', props: { id: '', class: 'ResumenContainer' }, children: [
            WRender.CreateStringNode("<h3>Logros</h3>"),
            "Investigaciones: " + response.investigaciones.length,
            "Proyectos: " + response.proyectos.length,
            "Colaboraciones: " + response.colaboraciones.length,
        ]
    });
    const BodyComponents = new modules.MasterDomDetaills(new WProfileInvestigador(response, Card), dataResume);
    App.appendChild(WRender.createElement(BodyComponents));
}
class WProfileInvestigador extends HTMLElement {
    constructor(response, Card) {
        super();
        this.response = response;
        this.ProfileContainer = WRender.createElement({ type: 'div', props: { class: 'ProfileContainer' } });
        this.ProfileContainer.append(Card);
        this.ProfileContainer.append(WRender.createElement({
            type: 'div', props: { id: '', class: 'DataContainer' }, children: [
                WRender.CreateStringNode("<h3>Datos Generales</h3>"),
                "Estado: " + response.estado,
                "Sexo: " + response.sexo,
                "Indice H: " + response.indice_H,
                "Correo: " + response.correo_institucional,
            ]
        }));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
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
        console.log("connected");
    }
    ComponentTab = WRender.createElement({
        type: "w-app-navigator",
        props: {
            NavStyle: "tab",
            id: "GuidesNav",
            title: "Menu",
            Inicialize: true,
            Elements: [
                {
                    name: "Investigaciones", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Investigaciones", new ProfileTab(
                            this.response.investigaciones,
                            ["titulo", "fecha_ejecucion", "estado"], "Investigaciones"
                        ), "TabContainer");
                    }
                }, {
                    name: "Colaboraciones", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Colaboraciones", new ProfileTab(
                            this.response.colaboraciones,
                            ["titulo", "tipoColaboracion", "fecha_ejecucion"], "Colaboraciones"
                        ), "TabContainer");
                    }
                }, {
                    name: "Proyectos", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Proyectos", new ProfileTab(
                            this.response.proyectos,
                            ["nombre_Proyecto", "cargo", "estado_Proyecto"], "Proyectos"
                        ), "TabContainer");
                    }
                }
            ]
        }
    });
    styleComponent = {
        type: 'w-style', props: {
            ClassList: [
                new WCssClass(`.ProfileContainer`, {
                    display: 'grid',
                    "grid-template-columns": "250px auto",
                    "border-bottom": "solid 2px #bbbec1",
                    "padding-bottom": 10,
                    "margin-bottom": 20,
                }), new WCssClass(`.DataContainer`, {
                    display: 'flex',
                    "flex-direction": "column",
                    padding: "0px 20px"
                }), new WCssClass(`.DataContainer label, .ResumenContainer h3`, {
                    margin: 5
                }), new WCssClass(`.ResumenContainer`, {
                    "background-color": '#fff',
                    "border-radius": "0.2cm",
                    padding: 20,
                    "box-shadow": "0 0 4px 0 rgb(0,0,0,40%)",
                    display: "flex",
                    "flex-direction": "column",
                    "min-height": 600
                }), new WCssClass(`.ResumenContainer label`, {
                    "background-color": '#eee',
                    padding: 10,
                    margin: 5,
                    "border-radius": "0.3cm"
                }),
            ]
        }
    };
}
class ProfileTab {
    constructor(Dataset = [], DisplayData = [], name) {
        this.type = "div"
        this.props = {
            className: "",
        }
        let urlAction;
        let idAction;
        switch (name) {
            case "Investigaciones":
                urlAction = "./ViewRead.html?param=";
                idAction = "id_Investigacion";
                break;
            case "Proyectos":
                urlAction = "./ViewProyect.html?param=";
                idAction = "id_Proyecto";
                break;
            case "Colaboraciones":
                urlAction = "./ViewRead.html?param=";
                idAction = "id_Investigacion";
                break;
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
                    UserActions: [{
                        name: "Leer..", Function: (element) => {
                            window.location = urlAction + element[idAction]
                        }
                    }]
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