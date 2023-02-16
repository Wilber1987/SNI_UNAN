import { WAppNavigator } from '../../../WDevCore/WComponents/WAppNavigator.js';
import { WRender, ComponentsManager, WAjaxTools, WArrayF } from '../../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender, css } from '../../../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2, StylesControlsV3 } from "../../../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../../../WDevCore/WComponents/WModalForm.js";
import { ModalVericateAction, WForm } from "../../../WDevCore/WComponents/WForm.js";
import { InvestigadorProfile } from "../../../Model/InvestigadorProfile.js";
import { ProyectoTableActividades, ProyectoTableTareas, Tbl_Evento, Tbl_Investigaciones, Tbl_InvestigatorProfile } from '../../../Model/DBODataBaseModel.js';
import { WDetailObject } from '../../../WDevCore/WComponents/WDetailObject.js';
import { ColumChart, RadialChart } from '../../../WDevCore/WComponents/WChartJSComponents.js';
import { WTableDynamicComp } from '../../../WDevCore/WComponents/WTableDynamic.js';
import { WPaginatorViewer } from '../../../WDevCore/WComponents/WPaginatorViewer.js';
import { ControlBuilder } from '../../../WDevCore/WModules/WControlBuilder.js';

const OnLoad = async () => {
    Aside.append(WRender.Create({ tagName: "h3", innerText: "Administración de perfiles" }));
    const AdminPerfil = new MainProyect();
    Aside.append(AdminPerfil.MainNav);
    Main.appendChild(AdminPerfil);

}
window.onload = OnLoad;
class MainProyect extends HTMLElement {
    constructor() {
        super();
        this.id = "MainProyect";
        this.className = "MainProyect DivContainer";
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.TabManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.OptionContainer = WRender.Create({ className: "OptionContainer" });
        this.DrawComponent();
    }
    EditarPerfilNav = () => { }
    MainNav = new WAppNavigator({
        //NavStyle: "tab",
        Direction: "column",
        Inicialize: true,
        DarkMode: true,
        Elements: [
            {
                name: "Datos Generales",
                action: async (ev) => {
                    this.TabManager.NavigateFunction("Tab-Generales",
                        new MainProyects());
                }
            }, {
                name: "Investigaciones", action: async (ev) => { this.NavInvestigaciones("Tab-Investigaciones"); }
            }
        ]
    });
    connectedCallback() { }
    DrawComponent = async () => {
        this.append(this.OptionContainer, this.TabContainer);
    }

    WStyle = new WStyledRender({
        ClassList: [
            new WCssClass(`.MainProyect`, {
            }), new WCssClass(`.OptionContainer`, {
                display: 'flex',
                "justify-content": "center",
                margin: "0 0 20px 0"
            }), new WCssClass(`.OptionContainer img`, {
                "box-shadow": "0 0 4px rgb(0,0,0/50%)",
                height: 100,
                width: 100,
                margin: 10
            }), new WCssClass(`.TabContainer`, {
                overflow: "hidden",
                "overflow-y": "auto"
            }), new WCssClass(`.FormContainer`, {
                "background-color": '#fff',
            })
        ], MediaQuery: [{
            condicion: '(max-width: 600px)',
            ClassList: []
        }]
    });
    Icons = {
        New: "",
        View: "",
    }
}

customElements.define('w-proyect-class', MainProyect);
class MainProyects extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(this.WStyle, StylesControlsV2.cloneNode(true), StylesControlsV3.cloneNode(true));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.TabManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.OptionContainer = WRender.Create({ className: "OptionContainer" });
        this.DrawMainProyects();
    }
    connectedCallback() { }
    DrawMainProyects = async () => {
        this.OptionContainer.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Block-Basic', value: 'Estadística', onclick: this.dashBoardView }))
        this.OptionContainer.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Block-Alert', value: 'Actividades', onclick: this.actividadesManager }))
        this.OptionContainer.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Block-Success', value: 'Nueva Actividad', onclick: this.action }))
        this.OptionContainer.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Block-Secundary', value: 'Ok', onclick: this.action }))
        this.shadowRoot.append(this.OptionContainer, this.TabContainer);
        //this.dashBoardView();
        this.actividadesManager();
    }
    dashBoardView = async () => {
        const dataset = await new ProyectoTableActividades().Get();
        const datasetMap = dataset.map(x => {
            x.Dependencia = x.ProyectoCatDependencias.Descripcion;
            x.val = 1;
            return x;
        });
        const columChart = new ColumChart({
            Title: "Estado de las actividades por dependencia",
            Dataset: datasetMap, percentCalc: true,
            EvalValue: "val",
            AttNameEval: "Estado",
            groupParams: ["Dependencia"]
        });
        const radialChartDependencias = new RadialChart({
            Title: "Actividades por dependencia",
            Dataset: WArrayF.ArrayUnique(datasetMap, "Dependencia"), EvalValue: "count", AttNameEval: "Dependencia"
        });
        const radialChart = new RadialChart({
            Title: "Estado de las actividades",
            Dataset: WArrayF.ArrayUnique(dataset, "Estado"), EvalValue: "count", AttNameEval: "Estado"
        });
        //new WTableDynamicComp({Dataset: dataset})
        this.TabManager.NavigateFunction("Tab-Generales",
            WRender.Create({ className: "dashBoardView", children: [radialChartDependencias, radialChart, columChart] }));
    }
    actividadesManager = async () => {
        const dataset = await new ProyectoTableActividades().Get();      
        const datasetMap = dataset.map(actividad => {
            actividad.Dependencia = actividad.ProyectoCatDependencias.Descripcion;           
            actividad.Progreso = actividad.ProyectoTableTareas?.filter(tarea => tarea.Estado?.includes("Finalizada")).length;
            return this.actividadElement(actividad);
        });        
        const columChart = new ColumChart({
            Title: "Estado de las actividades por dependencia",
            Dataset: datasetMap, percentCalc: true,
            EvalValue: "val",
            AttNameEval: "Estado",
            groupParams: ["Dependencia"]
        });
        this.TabManager.NavigateFunction("Tab-Actividades-Manager",
            WRender.Create({ className: "actividadesView", children: [new WPaginatorViewer({ Dataset: datasetMap, userStyles: [StylesControlsV2] })] }));
    }
    actividadElement = (actividad, nameAction = "Detalles") => {
        return WRender.Create({
            className: "actividad", object: actividad, children: [
                { tagName: 'h4', innerText: actividad.Descripcion },
                {
                    className: "propiedades", children: [
                        { tagName: 'label', innerText: "Estado: " + actividad.Estado },
                        { tagName: 'label', innerText: "Dependencia: " + actividad.Dependencia },
                        { tagName: 'label', innerText: "Fecha inicio: " + actividad.Fecha_Inicial?.toString().toDateFormatEs() },
                        { tagName: 'label', innerText: "Fecha de finalización: " + actividad.Fecha_Final?.toString().toDateFormatEs() },
                    ]
                },
                { tagName: 'h4', innerText: "Progreso" },
                ControlBuilder.BuildProgressBar(actividad.Progreso, actividad.ProyectoTableTareas?.length),
                {
                    className: "options", children: [
                        { tagName: 'button', className: 'Btn-Mini', innerText: nameAction, onclick: async () => await this.actividadDetail(actividad, nameAction) },
                        { tagName: 'button', className: 'Btn-Mini', innerText: 'Ok', onclick: this.action }
                    ]
                },
            ]
        })
    }
    actividadDetail = async (actividad, nameAction = "Detalle") => {
        if (nameAction == "Regresar") { this.actividadesManager(); return }
        const actividadDetailView = WRender.Create({ className: "", children: [this.actividadElement(actividad, "Regresar")] });
        actividadDetailView.append(new WTableComponent({
            Dataset: await new ProyectoTableTareas({ IdActividad: actividad.IdActividad }).Get(),
            ModelObject: new ProyectoTableTareas(), Options: {
                Add: true, UrlAdd: "../api/ApiEntityDBO/saveProyectoTableTareas",
                Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateProyectoTableTareas",
                Search: true, UrlSearch: "../api/ApiEntityDBO/getProyectoTableTareas",
                UserActions: []
            }
        }))
        this.TabManager.NavigateFunction("Tab-Actividades-Viewer" + actividad.IdActividad, actividadDetailView);
    }

    WStyle = css`
        .dashBoardView{
            display: grid;
            grid-template-columns: auto auto ;  
            grid-gap: 20px          
        }
        .OptionContainer {
            margin: 0 0 20px 0;
        }
        .dashBoardView w-colum-chart { 
            grid-column: span 2;
        }
        .actividad {
            border: 1px solid #d9d6d6;
            padding: 20px;
            margin-bottom: 10px;           
            color: #0a2542;
        }
        .actividad h4 {
            margin: 5px 0px;
         }
        .actividad .propiedades {
            font-size: 14px;
            display: flex;
            gap: 20px;
        }
        .actividad .options {
            display: flex;
            justify-content: flex-end;
        }
    `
}
customElements.define('w-main-proyects', MainProyects);
export { MainProyects }