import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel, WCard } from '../WDevCore/WComponents/WCardCarousel.js';
import { StylesControlsV1 } from "../WDevCore/StyleModules/WStyleComponents.js";
import "../WDevCore/WComponents/WTableComponent.js";
const DOMManager = new ComponentsManager();
const OnLoad = async () => {
    const Id_Investigador = new URLSearchParams(window.location.search).get('param');
    const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigadorProfile",
        { Id_Investigador: Id_Investigador }
    );
    const { WRender } = await import("../WDevCore/WModules/WComponentsTools.js");
    const modules = await import("../MasterDomDetaills.js");
   
    const Card = new WCard({
        titulo: `${response.nombres} ${response.apellidos}`,        
        picture: response.foto,
        subtitulo: "Autor",
        descripcion: response.nombreInstitucion,
        id_Investigador: response.id_Investigador
    }, 2);
    const divRedes = WRender.createElement({ type: 'div', props: { id: '', class: 'divRedes' } });
    const cadenaB64 = "data:image/png;base64,";
    response.redesSociales.forEach(element => {
        divRedes.append(WRender.createElement([{ type:'img', props: { src: cadenaB64 + element.icon, class: 'RedsIcon'}}, 
        { type:'a', props: { innerText: element.descripcion, href:element.url_red_inv, target:"_blank" }} ]));
    });
    const dataResume = WRender.createElement({
        type: 'div', props: { id: '', class: 'ResumenContainer' }, children: [
            WRender.CreateStringNode("<h3>Logros</h3>"),
            "Investigaciones: " + response.investigaciones.length,
            "Proyectos: " + response.proyectos.length,
            "Colaboraciones: " + response.colaboraciones.length,
            WRender.CreateStringNode("<h3>Redes Sociales</h3>"),
            divRedes
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
        const divIdiomas = WRender.createElement({ type: 'div', props: { id: '', class: 'divIdiomas' } });
        response.idiomas.forEach(element => {
            divIdiomas.append(WRender.createElement(element.descripcion));
        });
        this.ProfileContainer.append(WRender.createElement({
            type: 'div', props: { id: '', class: 'DataContainer' }, children: [
                WRender.CreateStringNode("<h3>Datos Generales</h3>"),
                "Estado: " + response.estado,
                "Sexo: " + response.sexo,
                "Indice H: " + response.indice_H,
                "Correo: " + response.correo_institucional,
                WRender.CreateStringNode("<h3>Idiomas</h3>"),
                divIdiomas
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
                    "grid-template-columns": "270px auto",
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
                }), new WCssClass( `.divIdiomas`, {
                    display: 'flex',
                    "flex-wrap": "wrap"
                }), new WCssClass( `.divIdiomas label`, {
                    padding: 8,
                    margin: "5px 2px",
                    "background-color": "#5964a7",
                    color: "#fff",
                    "font-weight": "bold",
                    "border-radius": "0.4cm",
                    "font-size": 12
                }),new WCssClass( `.divRedes img`, {
                    height: 35,
                    width: 35,
                    "margin-right": 10
                }),new WCssClass( `.divRedes div`, {
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "left",
                    margin: 5
                }),new WCssClass( `.divRedes a`, {
                    "text-decoration": "none",
                    "font-weight": "bold",
                    color: "#09f"
                })
            ], MediaQuery: [{
                condicion: "(max-width: 800px)",
                ClassList: [
                    new WCssClass(`.ProfileContainer`, {
                        display: 'grid',
                        "grid-template-columns": "100%"
                    })
                ]
            }]
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
                urlAction = "./MProyects/ViewProyect.html?param=";
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
                Dataset: Dataset,
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