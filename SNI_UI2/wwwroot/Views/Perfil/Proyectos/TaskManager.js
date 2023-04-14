////@ts-check
import { ProyectoCatDependencias, ProyectoTableActividades, ProyectoTableAgenda, ProyectoTableCalendario, ProyectoTableEvidencias, ProyectoTableTareas } from '../../../Model/DBODataBaseModel.js';
import { ViewCalendarioByDependencia } from '../../../Model/DBOViewModel.js';
import { StylesControlsV2, StylesControlsV3, StyleScrolls } from "../../../WDevCore/StyleModules/WStyleComponents.js";
import { WAppNavigator } from '../../../WDevCore/WComponents/WAppNavigator.js';
import { ColumChart, RadialChart } from '../../../WDevCore/WComponents/WChartJSComponents.js';
import { DocumentViewer } from '../../../WDevCore/WComponents/WDocumentViewer.js';
import { WForm } from "../../../WDevCore/WComponents/WForm.js";
import { WModalForm } from '../../../WDevCore/WComponents/WModalForm.js';
import { WPaginatorViewer } from '../../../WDevCore/WComponents/WPaginatorViewer.js';
import { WTableComponent } from "../../../WDevCore/WComponents/WTableComponent.js";
import { ComponentsManager, WArrayF, WRender } from '../../../WDevCore/WModules/WComponentsTools.js';
import { ControlBuilder } from '../../../WDevCore/WModules/WControlBuilder.js';
import { WCssClass, WStyledRender, css } from '../../../WDevCore/WModules/WStyledRender.js';

class TaskManagers extends HTMLElement {

    /**
     * 
     * @param {Array<ProyectoTableTareas>} Task 
     * @param {ProyectoTableTareas} Model 
     */
    constructor(Tasks, Model) {
        super();
        this.Tasks = Tasks;
        this.TaskModel = Model ?? new ProyectoTableTareas();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.append(this.WStyle,
            StyleScrolls.cloneNode(true),
            StylesControlsV2.cloneNode(true),
            StylesControlsV3.cloneNode(true));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.TabManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.OptionContainer = WRender.Create({ className: "OptionContainer" });
        this.DrawTaskManagers();
    }
    connectedCallback() { }
    DrawTaskManagers = async () => {
        // this.OptionContainer.append(WRender.Create({
        //     tagName: 'input', type: 'button', className: 'Block-Basic',
        //     value: 'Tareas', onclick: this.tareasManager
        // }))
        this.shadowRoot.append(this.TabContainer);
        this.tareasManager();
    }
    tareasManager = () => {
        const StatePanelContainer = WRender.Create({
            className: "panelContainer",
            style: " grid-template-columns: repeat(" + this.TaskModel.Estado.Dataset.length + ", 380px);"
        })
        this.TaskModel.Estado.Dataset.forEach(state => {
            const Panel = WRender.Create({
                className: "panel", id: "Panel-" + state,
                ondrop: (ev) => {
                    var data = ev.dataTransfer.getData("text");
                    const taskCard = this.shadowRoot.getElementById(data);
                    ev.target.appendChild(taskCard);
                    this.cardDrop(taskCard.task, state);
                }, ondragover: (ev) => {
                    ev.preventDefault();
                }, children: [
                    { tagName: "label", class: "title-panel", innerText: state }
                ]
            })
            const Tasks = this.Tasks.filter(t => t.Estado == state);
            Tasks.forEach(task => {
                Panel.append(this.taskCard(task));
            });
            StatePanelContainer.appendChild(Panel);
        });
        this.shadowRoot.append(StatePanelContainer);
    }
    taskCard = (task) => {
        return WRender.Create({
            className: "task-card",
            draggable: true,
            task: task,
            id: "task" + task.IdTarea,
            ondragstart: (ev) => {
                ev.dataTransfer.setData("text", ev.target.id);
            }, children: [
                { tagName: "label", class: "task-title", innerText: task.Titulo },
                { tagName: "label", class: "task-detail", innerText: task.ProyectoTableActividades?.Titulo },
                //{ tagName: "p", class: "p-title", innerText: task.Descripcion },
                {
                    class: "p-participantes", children: task.ProyectoTableParticipantes?.map(I => ({
                        tagName: 'img', className: "img-participantes",
                        src: I.Tbl_InvestigatorProfile?.Foto
                    }))
                }, {
                    class: "card-options", children: [{
                        tagName: "buttom", class: "Btn-Mini", innerText: "Editar",
                        onclick: () => this.taskEdit(task)
                    }, {
                        tagName: "buttom", class: "Btn-Mini-Success", innerText: "Detalles",
                        onclick: () => this.taskDetail(task)
                    }]
                }                
            ]
        })
    }
    /**
    * 
    * @param {ProyectoTableTareas} task 
    * @param {String} state 
    */
    taskEdit = async (task) => {
        const CalendarModel = {
            type: 'CALENDAR',
            ModelObject: () => new ProyectoTableCalendario(),
            require: false,
            CalendarFunction: async () => {
                return {
                    Agenda: await new ProyectoTableAgenda({
                        Id_Dependencia: task?.ProyectoTableActividades?.Id_Dependencia
                    }).Get(),
                    Calendario: await new ProyectoTableCalendario({
                        Id_Dependencia: task?.ProyectoTableActividades?.Id_Dependencia
                    }).Get()
                }
            }
        }
        this.TaskModel.ProyectoTableCalendario = CalendarModel;
        this.shadowRoot.append(new WModalForm({
            EditObject: task,
            AutoSave: true,
            ModelObject: this.TaskModel
        }))
    }
    /**
    * 
    * @param {ProyectoTableTareas} task 
    * @param {String} state 
    */
    taskDetail = async (task) => { }
    /**
     * 
     * @param {ProyectoTableTareas} task 
     * @param {String} state 
     */
    cardDrop = (task, state) => {
        task.Estado = state;
        task.Update();
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
        .panelContainer {
            display: grid;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 20px;
            gap: 20px;
            height: 540px;
        } 
        .panel {
            padding: 15px;
            border-radius: 10px;
            background-color: #eee;
            overflow-y: auto;            
            border: 1px solid #e2e2e2;
        }
        .task-card {
            background-color: #fff;
            height: 130px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-bottom: 15px;
            min-width: calc(100% );
            box-shadow: 0 0 5px 0 #adacac;
        }
        .task-title{
            padding: 10px 10px;
            font-size: 14px;
            font-weight: bold;
            background-color: #eee;
            cursor: pointer;
        }
        .card-options {
            padding: 0px;
            width:  calc(100% - 20px);
            height: 25px;
            justify-content: flex-end;
            display: flex;
        }
        .title-panel {
            font-size: 16px; 
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 10px;
            display: block;
            color: #0a1338;
        }
        .p-title {
            height: 100%;
            padding: 5px 10px;
            margin: 0px;
        }
        .task-detail{
            padding: 5px 10px; 
            font-size: 11px
        }
        .p-participantes{
            display: flex;
            padding: 5px 10px;
        }
        .img-participantes {
            padding: 0;
            height: 25px;
            width: 25px;
            border-radius: 50%;
            margin-right: 5px;
            overflow: hidden;
            box-shadow: 0 0 3px 0 rgba(0,0,0,0.5);
        }
    `
}
customElements.define('w-main-task', TaskManagers);
export { TaskManagers };
