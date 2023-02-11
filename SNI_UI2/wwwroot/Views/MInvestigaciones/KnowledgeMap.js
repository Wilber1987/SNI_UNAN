import { WRender, WArrayF, ComponentsManager, WAjaxTools, GenerateColor } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel, WCard } from '../../WDevCore/WComponents/WCardCarousel.js';
import { StylesControlsV1 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import "../../WDevCore/WComponents/WTableComponent.js";
import { RadialChart, ColumChart } from "../../WDevCore/WComponents/WChartJSComponents.js";
import { WTableComponent } from '../../WDevCore/WComponents/WTableComponent.js';
let town = "Nicaragua";
let SrcMap = `https://maps.google.com/maps?q=${encodeURIComponent(town)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
SrcMap = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1674440.5174158672!2d-85.50662771759073!3d12.896594765807182!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f10c200ceff22cd%3A0xc8faa7e53fac15b5!2sNicaragua!5e0!3m2!1ses!2sus!4v1634680432067!5m2!1ses!2sus"
const MapIframe = WRender.createElement({
    type: 'iframe',
    props: { id: 'MapIframe', class: 'MapIframe', src: SrcMap }
});
const DivAside = WRender.createElement({
    type: 'div', props: { id: '', class: 'DivAside' }, children: [
        MapIframe,
        { type: 'div', props: { class: 'DivAsideInvestigations' }, children: [] }
    ]
});
const ColorsDis = [];
const DOMManager = new ComponentsManager();
const OnLoad = async () => {
    const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigaciones");
    const DataDisciplinas = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigacionesPorDisciplina");
    const { WRender } = await import("../../WDevCore/WModules/WComponentsTools.js");
    const modules = await import("../../MasterDomDetaills.js");
    const cadenaB64 = "data:image/png;base64,";
    response[1].forEach(dis => {
        ColorsDis.push(dis.color)
    });

    const BodyComponents = new modules.MasterDomDetaills(new KnowledgeMap(response, DataDisciplinas), DivAside);
    App.appendChild(WRender.createElement(BodyComponents));
}
class KnowledgeMap extends HTMLElement {
    constructor(response, DataDisciplinas) {
        super();
        this.response = response;
        this.DatasetDis = DataDisciplinas[0];
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
                            "Departamentales", this.DatasetDis
                        ), "TabContainer");
                    }
                }, {
                    name: "Nivel Municipal", url: "#",
                    action: async (ev) => {
                        DOMManager.NavigateFunction("Tab-Proyectos", new KnowledgeMapTab(
                            this.response[0],
                            "Municipales", this.DatasetDis
                        ), "TabContainer");
                    }
                }
            ]
        }
    });
    styleComponent = {
        type: 'w-style', props: {
            ClassList: [
                new WCssClass(`w-view-map`, {
                    display: 'block',
                    "background-color": "#fff",
                    padding: 20,
                    "border-radius": "0.3cm",
                    "box-shadow": "0 2px 5px 2px rgba(0,0,0,0.2)"
                }), new WCssClass(`.KnowledgeMapContainer`, {
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
    constructor(Dataset = [], name, DatasetDis = []) {
        this.type = "div"
        this.props = {
            className: "Tab",
        }
        this.DatasetDis = DatasetDis;
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
            this.DatasetDis = this.DatasetDis.filter(x => x[PropFilter] == ValueFilter);
            console.log(ArrayChart);
        }
        this.DatasetDis.forEach(element => {
            element.value = 1;
        });
        this.Chart = new ColumChart({
            Dataset: this.DatasetDis,
            AttNameEval: "disciplina",
            EvalValue: "value",
            Colors: ColorsDis,
            groupParams: [EvalValue]
        });
        this.children.push(DivLocation);
        this.children.push(new RadialChart({
            Dataset: ArrayChart,
            AttNameEval: EvalValue,
            EvalValue: "count",
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            ChartFunction: async (Data) => {
                console.log(Data);
                const filt = this.DatasetDis.filter(x => WArrayF.compareObj({
                    nombre_Localidad: Data.nombre_Localidad
                }, x));
                console.log(filt);
                this.Chart.ChartInstance = {
                    Dataset: filt,
                    AttNameEval: "disciplina",
                    EvalValue: "value",
                    Colors: ColorsDis,
                    groupParams: [EvalValue]
                };
                SrcMap = `https://maps.google.com/maps?q=${encodeURIComponent(Data.nombre_Localidad)}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
                MapIframe.src = SrcMap;
                const investigaciones = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigaciones", {
                    id_Localidad: Data.id_Localidad
                });
                DivAside.querySelector(".DivAsideInvestigations").innerHTML = "";
                investigaciones[0].forEach(inv => {
                    const DisplineDiv = { type: 'div', props: { class: 'DisplineDiv' }, children: [] };
                    inv.Tbl_Investigaciones_Disciplinas?.forEach(dis => {
                        DisplineDiv.children.push({
                            type: 'div', props: { style: 'background:' + dis.color },
                            children: [
                                dis.descripcionDisciplina
                            ]
                        });
                    });
                    DivAside.querySelector(".DivAsideInvestigations").append(WRender.createElement({
                        type: 'div',
                        props: {
                            style: { cursor: "pointer"} ,
                            onclick: ()=>{
                                window.location = location.origin + "/Views/InvestigacionViewer.html?param=" + inv.id_Investigacion
                            }
                        }, children: [inv.titulo, DisplineDiv]
                    }));
                });
                this.Chart.connectedCallback();
            }
        }))
        this.children.push(this.Chart);


        // const container = WRender.createElement({ type:'div', children: { n: 5, type: "div"} })
        // array.forEach(element => {
        //     container.append(element);
        // });

        // const container = WRender.CreateStringNode(`<div>
        //     ${ array.map(x=> `<a>${x}</a>`).join("")  }
        // </div>`);
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
                }), new WCssClass(`.DivAsideInvestigations`, {
                    "overflow-y": 'auto',
                    height: 320,
                    "padding-top": 10,
                    "padding-left": 10,
                    "padding-right": 10
                }), new WCssClass(`.DivAsideInvestigations div:nth-child(odd)`, {
                    "background-color": "#f5f4f4",
                    "border-radius": "0.2cm",
                }), new WCssClass(`.DivAsideInvestigations div, .DisplineDiv`, {
                    display: "flex", padding: 5, "align-items": "center", "font-size": 12,
                }), new WCssClass(`.DisplineDiv div`, {
                    "border-radius": "0.2cm",
                    "margin-right": 5,
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
customElements.define('w-view-map', KnowledgeMap);
window.onload = OnLoad;