import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel, WCard } from '../WDevCore/WComponents/WCardCarousel.js';
import { StylesControlsV1 } from "../WDevCore/StyleModules/WStyleComponents.js";
import "../WDevCore/WComponents/WTableComponent.js";
import { RadialChart, ColumChart } from "../WDevCore/WComponents/WChartJSComponents.js";
const DOMManager = new ComponentsManager();
const OnLoad = async () => {
    const Id_Investigador = new URLSearchParams(window.location.search).get('param');
    const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigaciones",
        { Id_Investigador: Id_Investigador }
    );
    const { WRender } = await import("../WDevCore/WModules/WComponentsTools.js");
    const modules = await import("../MasterDomDetaills.js");
    const cadenaB64 = "data:image/png;base64,";
    const BodyComponents = new modules.MasterDomDetaills(new KnowledgeMap(response));
    App.appendChild(WRender.createElement(BodyComponents));
}
class KnowledgeMap extends HTMLElement {
    constructor(response) {
        super();
        this.response = response;
        this.KnowledgeMapContainer = WRender.createElement({ type: 'div', props: { class: 'KnowledgeMapContainer' } });
        //this.KnowledgeMapContainer.append(Card);
        const divIdiomas = WRender.createElement({ type: 'div', props: { id: '', class: 'divIdiomas' } });

        this.KnowledgeMapContainer.append(WRender.createElement({
            type: 'div', props: { id: '', class: 'DataContainer' }, children: [
            ]
        }));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.appendChild(WRender.createElement(StylesControlsV1));
        this.append(
            WRender.createElement(this.styleComponent),
            this.KnowledgeMapContainer,
            this.ComponentTab,
            this.TabContainer
        );
    }
    connectedCallback() {
        if (this.KnowledgeMapContainer.innerHTML != "") {
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
                /* {
                    name: "Investigaciones Nacionales", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Investigaciones", new KnowledgeMapTab(
                            this.response[0],
                            "Nacionales"
                        ), "TabContainer");
                    }
                }, */ {
                    name: "Nivel Departamental", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Colaboraciones", new KnowledgeMapTab(
                            this.response[0],
                            "Departamentales"
                        ), "TabContainer");
                    }
                }, {
                    name: "Nivel Municipal", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Proyectos", new KnowledgeMapTab(
                            this.response[0],
                            "Municipales"
                        ), "TabContainer");
                    }
                }
            ]
        }
    });
    styleComponent = {
        type: 'w-style', props: {
            ClassList: [
                new WCssClass(`.KnowledgeMapContainer`, {
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
                }), new WCssClass(`.divIdiomas`, {
                    display: 'flex',
                    "flex-wrap": "wrap"
                }), new WCssClass(`.divIdiomas label`, {
                    padding: 8,
                    margin: "5px 2px",
                    "background-color": "#5964a7",
                    color: "#fff",
                    "font-weight": "bold",
                    "border-radius": "0.4cm",
                    "font-size": 12
                }), new WCssClass(`.divRedes img`, {
                    height: 35,
                    width: 35,
                    "margin-right": 10
                }), new WCssClass(`.divRedes div`, {
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "left",
                    margin: 5
                }), new WCssClass(`.divRedes a`, {
                    "text-decoration": "none",
                    "font-weight": "bold",
                    color: "#09f"
                })
            ], MediaQuery: [{
                condicion: "(max-width: 800px)",
                ClassList: [
                    new WCssClass(`.KnowledgeMapContainer`, {
                        display: 'grid',
                        "grid-template-columns": "100%"
                    })
                ]
            }]
        }
    };
}
class KnowledgeMapTab {
    constructor(Dataset = [], name) {
        this.type = "div"
        this.props = {
            className: "Tab",
        }
        let PropFilter;
        let EvalValue;
        let ValueFilter;
        switch (name) {
            case "Nacionales":
                PropFilter = "país";
                EvalValue = "país";
                break;
            case "Departamentales":
                PropFilter = "nombre_TipoLocalidad";
                EvalValue = "nombre_Localidad";
                ValueFilter = "Departamento";
                break;
            case "Municipales":
                PropFilter = "nombre_TipoLocalidad";
                EvalValue = "nombre_Localidad";
                ValueFilter = "Municipio";
                break;
        }
        this.children = [this.Style];
        const fo = {};
        fo[EvalValue] = null;
        fo[PropFilter] = null;
        const ArrayLocalidad = WArrayF.ArrayUniqueByObject(Dataset, fo);
        //console.log(ArrayLocalidad);
        let ArrayChart = ArrayLocalidad;
        const DivLocation = { type: 'div', props: { class: 'DivLocation' }, children: [] }
        ArrayLocalidad.forEach(element => {
            if (PropFilter == "país") {
                DivLocation.children.push(element[EvalValue]);
                //DatasetChart = Dataset.filter
            } else if (element[PropFilter] == ValueFilter) {
                DivLocation.children.push(
                    {
                        type: 'label', props:
                            { class: "labelLocalidad", innerText: element[EvalValue] },
                        children: [element.count]
                    }
                );
                ArrayChart = Dataset.filter(x => x[PropFilter] == ValueFilter);
            }
        });
        if (PropFilter != "país") {
            ArrayChart = ArrayLocalidad.filter(x => x[PropFilter] == ValueFilter);
            console.log(ArrayChart);
        }
        
        this.Chart = new ColumChart({
            Dataset: Dataset.filter(x => x[PropFilter] == ValueFilter && x[EvalValue] == ArrayChart[0][EvalValue]), 
            AttNameEval: "descripcion",
            EvalValue: "count",
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            groupParams: [EvalValue, ]
        });
        this.children.push(DivLocation);
        this.children.push(new RadialChart({
            Dataset: ArrayChart,
            AttNameEval: EvalValue,
            EvalValue: "count",
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            ChartFunction: (Data) => {
                console.log(Data);
            }
        }))
        this.children.push(this.Chart);
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
                }), new WCssClass(`.DivLocation`, {
                    display: 'flex',
                    "flex-direction": "column"
                }), new WCssClass(`.labelLocalidad`, {
                    "background-color": "rgb(12 109 148)",
                    padding: 10,
                    margin: 5,
                    color: "#fff",
                    "border-radius": "0.2cm"
                }), new WCssClass(`.labelLocalidad label`, {
                    "background-color": "rgb(12 109 148)",
                    padding: 10,
                    margin: 5,
                    color: "#fff"
                }), new WCssClass(`.Tab w-colum-chart`, {
                    "grid-column": '1/3',
                }),
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
customElements.define('w-view', KnowledgeMap);
window.onload = OnLoad;