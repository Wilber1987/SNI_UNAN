
import { ProyectoCatDependencias, ProyectoTableActividades, ProyectoTableAgenda, ProyectoTableCalendario, ProyectoTableEvidencias, ProyectoTableParticipantes, ProyectoTableTareas } from '../../../Model/DBODataBaseModel.js';
import { ViewCalendarioByDependencia } from '../../../Model/DBOViewModel.js';
import { StylesControlsV2, StylesControlsV3 } from "../../../WDevCore/StyleModules/WStyleComponents.js";
import { WAppNavigator } from '../../../WDevCore/WComponents/WAppNavigator.js';
import { ColumChart, RadialChart } from '../../../WDevCore/WComponents/WChartJSComponents.js';
import { DocumentViewer } from '../../../WDevCore/WComponents/WDocumentViewer.js';
import { WFilterOptions } from '../../../WDevCore/WComponents/WFilterControls.js';
import { WForm } from "../../../WDevCore/WComponents/WForm.js";
import { WModalForm } from '../../../WDevCore/WComponents/WModalForm.js';
import { WPaginatorViewer } from '../../../WDevCore/WComponents/WPaginatorViewer.js';
import { WTableComponent } from "../../../WDevCore/WComponents/WTableComponent.js";
import { ComponentsManager, WArrayF, WRender } from '../../../WDevCore/WModules/WComponentsTools.js';
import { ControlBuilder } from '../../../WDevCore/WModules/WControlBuilder.js';
import { WCssClass, WStyledRender, css } from '../../../WDevCore/WModules/WStyledRender.js';
import { TaskManagers } from './TaskManager.js';

const OnLoad = async () => {
    Aside.append(WRender.Create({ tagName: "h3", innerText: "Administración de Actividades" }));
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
                    const dataset = await new ProyectoTableActividades().Get();
                    const dependencias = await new ProyectoCatDependencias().Get();
                    this.TabManager.NavigateFunction("Tab-Generales",
                        new MainProyects(dataset, dependencias));
                }
            }, {
                name: "Mis Actividades", action: async (ev) => { this.NavChargeActividades(); }
            }, {
                name: "Tareas", action: async (ev) => { this.NavChargeTasks(); }
            }, {
                name: "Mis Tareas", action: async (ev) => { this.NavChargeOWTasks(); }
            }, {
                name: "Investigaciones", action: async (ev) => { this.NavInvestigaciones("Tab-Investigaciones"); }
            }]
    });
    connectedCallback() { }
    DrawComponent = async () => {
        this.append(this.OptionContainer, this.TabContainer);
    }
    NavChargeActividades = async () => {
        const dataset = await new ProyectoTableActividades().GetOwActivities();
        const dependencias = await new ProyectoCatDependencias().GetOwDependencies();
        this.TabManager.NavigateFunction("Tab-OwActividades",
            new MainProyects(dataset, dependencias));
    }
    NavChargeTasks = async () => {
        const tasks = await new ProyectoTableTareas().Get();
        this.TabManager.NavigateFunction("Tab-Tasks-Manager", this.ChargeTasks(tasks));
    }
    NavChargeOWTasks = async () => {
        const tasks = await new ProyectoTableTareas().GetOwParticipations();
        this.TabManager.NavigateFunction("Tab-OWTasks-Manager", this.ChargeTasks(tasks));
    }
    ChargeTasks(tasks) {
        const tasksManager = new TaskManagers(tasks);
        const filterOptions = new WFilterOptions({
            Dataset: tasks,
            ModelObject: new ProyectoTableTareas(),
            //DisplayFilts: [],
            FilterFunction: (DFilt) => {
                tasksManager.DrawTaskManagers(DFilt);
            }
        })
        return WRender.Create({ className: "task-container", children: [filterOptions, tasksManager] })
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
    /**
     * 
     * @param {Array<ProyectoTableActividades>} Dataset 
     * @param {Array<ProyectoCatDependencias>} Dependencias 
     */
    constructor(Dataset, Dependencias) {
        super();
        this.Dataset = Dataset;
        this.Dependencias = Dependencias;
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
        //this.OptionContainer.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Block-Secundary', value: 'Dependencias', onclick: this.dependenciasViewer }))
        if (this.Dependencias.length != 0) {
            this.OptionContainer.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Block-Success', value: 'Nueva Actividad', onclick: this.nuevaActividad }))
        }
        this.shadowRoot.append(this.OptionContainer, this.TabContainer);
        //this.dashBoardView();
        this.actividadesManager();
    }
    dashBoardView = async () => {

        const datasetMap = this.Dataset.map(x => {
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
            Dataset: WArrayF.GroupBy(datasetMap, "Dependencia"), EvalValue: "count", AttNameEval: "Dependencia"
        });
        const radialChart = new RadialChart({
            Title: "Estado de las actividades",
            Dataset: WArrayF.GroupBy(this.Dataset, "Estado"), EvalValue: "count", AttNameEval: "Estado"
        });
        //new WTableDynamicComp({Dataset: dataset})
        this.TabManager.NavigateFunction("Tab-Generales",
            WRender.Create({ className: "dashBoardView", children: [radialChartDependencias, radialChart, columChart] }));
    }
    actividadesManager = async () => {
        const datasetMap = this.Dataset.map(actividad => {
            actividad.Dependencia = actividad.ProyectoCatDependencias.Descripcion;
            actividad.Progreso = actividad.ProyectoTableTareas?.filter(tarea => tarea.Estado?.includes("Finalizada")).length;
            return this.actividadElement(actividad);
        });
        this.TabManager.NavigateFunction("Tab-Actividades-Manager",
            WRender.Create({ className: "actividadesView", children: [new WPaginatorViewer({ Dataset: datasetMap, userStyles: [StylesControlsV2] })] }));
    }

    actividadElement = (actividad) => {
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
                        { tagName: 'button', className: 'Btn-Mini', innerText: "Detalle", onclick: async () => await this.actividadDetail(actividad) },
                        { tagName: 'button', className: 'Btn-Mini', innerText: 'Informe', onclick: this.action }
                    ]
                },
            ]
        })
    }
    actividadElementDetail = (actividad) => {
        return WRender.Create({
            className: "actividadDetail", object: actividad, children: [
                this.actividadElement(actividad)
            ]
        })
    }
    actividadDetail = async (actividad = (new ProyectoTableActividades())) => {
        const actividadDetailView = WRender.Create({ className: "", children: [this.actividadElementDetail(actividad)] });
        const tareasActividad = await new ProyectoTableTareas({ IdActividad: actividad.IdActividad }).Get();
        const taskModel = new ProyectoTableTareas({
            IdActividad: { type: 'number', hidden: true, value: actividad.IdActividad },
            ProyectoTableTarea: { type: 'WSelect', Dataset: tareasActividad, ModelObject: () => new ProyectoTableTareas() },
            ProyectoTableCalendario: {
                type: 'CALENDAR', CalendarFunction: async () => {
                    return {
                        Agenda: await new ProyectoTableAgenda({ Id_Dependencia: actividad.ProyectoCatDependencias.Id_Dependencia }).Get(),
                        Calendario: await new ViewCalendarioByDependencia({ Id_Dependencia: actividad.ProyectoCatDependencias.Id_Dependencia }).Get()
                    }
                }, require: false, hiddenInTable: true
            }
        });
        const tasktable = new WTableComponent({
            Dataset: tareasActividad,
            ModelObject: taskModel, Options: {
                Add: true, UrlAdd: "../api/ApiEntityDBO/saveProyectoTableTareas",
                Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateProyectoTableTareas",
                Search: true, UrlSearch: "../api/ApiEntityDBO/getProyectoTableTareas",
                UserActions: [{
                    name: "Nueva Evidencia", action: (Tarea) => {
                        actividadDetailView.append(new WModalForm({
                            ModelObject: new ProyectoTableEvidencias({ IdTarea: Tarea.IdTarea }),
                            StyleForm: "columnX1"
                        }))
                    }
                }, {
                    name: "Ver Evidencias", action: async (Tarea) => {
                        const response = await new ProyectoTableEvidencias({ IdTarea: Tarea.IdTarea }).Get();
                        actividadDetailView.append(new WModalForm({
                            ObjectModal: new DocumentViewer({
                                Dataset: response.map((e, index) => ({
                                    TypeDocuement: e.CatalogoTipoEvidencia?.Descripcion,
                                    Description: e.Descripcion ?? "document " + (index + 1),
                                    Document: e.Data
                                }))
                            })
                        }))
                    }
                }]
            }
        })
        const taskContainer = WRender.Create({ className: "" });
        const tabManager = new ComponentsManager({ MainContainer: taskContainer });
        const taskNav = new WAppNavigator({
            //NavStyle: "tab",
            Inicialize: true,
            Elements: [
                { name: "Vista de panel", action: async (ev) => { tabManager.NavigateFunction("taskPanel", new TaskManagers(tareasActividad, taskModel)) } },
                { name: "Vista de detalles", action: async (ev) => { tabManager.NavigateFunction("taskTable", tasktable) } },
                { name: "Nueva Tarea", action: async (ev) => { this.shadowRoot.append(new WModalForm({ ModelObject: taskModel, title: "Nueva Tarea" })) } }
            ]
        });
        actividadDetailView.append(taskNav, taskContainer)
        this.TabManager.NavigateFunction("Tab-Actividades-Viewer" + actividad.IdActividad, actividadDetailView);
    }
    dependenciasViewer = async () => {
        const dependenciasDetailView = WRender.Create({ className: "", children: [] });
        //const tareasActividad = await new ProyectoCatDependencias().Get();
        dependenciasDetailView.append(new WTableComponent({
            ModelObject: new ProyectoCatDependencias({}), Options: {
                Add: true, UrlAdd: "../api/ApiEntityDBO/saveProyectoCatDependencias",
                Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateProyectoCatDependencias",
                Search: true, UrlSearch: "../api/ApiEntityDBO/getProyectoCatDependencias",
                UserActions: []
            }
        }))
        this.TabManager.NavigateFunction("Tab-Dependencias-Viewer", dependenciasDetailView);
    }
    nuevaActividad = async () => {
        const ModelCalendar = {
            type: 'CALENDAR',
            ModelObject: () => new ProyectoTableCalendario(),
            require: false,
            CalendarFunction: async () => {
                return {
                    Agenda: await new ProyectoTableAgenda({ Id_Dependencia: form.FormObject.ProyectoCatDependencias?.Id_Dependencia }).Get(),
                    Calendario: await new ProyectoTableCalendario({ Id_Dependencia: form.FormObject.ProyectoCatDependencias?.Id_Dependencia }).Get()
                }
            }
        }

        const form = new WForm({
            ModelObject: new ProyectoTableActividades({
                ProyectoTableTareas: {
                    type: 'MasterDetail',
                    ModelObject: () => new ProyectoTableTareas({ ProyectoTableCalendario: ModelCalendar })
                },
                ProyectoCatDependencias: {
                    type: "WSELECT", ModelObject: new ProyectoCatDependencias(),
                    Dataset: this.Dependencias
                }
            })
        })
        this.TabManager.NavigateFunction("Tab-nuevaActividadView",
            WRender.Create({ className: "nuevaActividadView", children: [form] }));
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
            padding: 15px;
            margin-bottom: 10px;           
            color: #0a2542;
            border-radius: 15px;
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
export { MainProyects };
