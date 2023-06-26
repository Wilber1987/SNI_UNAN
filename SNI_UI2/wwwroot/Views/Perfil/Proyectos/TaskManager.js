//@ts-check
import { ProyectoTableAgenda, ProyectoTableCalendario, ProyectoTableTareas } from '../../../Model/DBODataBaseModel.js';
import { StyleScrolls, StylesControlsV2, StylesControlsV3 } from "../../../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from '../../../WDevCore/WComponents/WModalForm.js';
import { ComponentsManager, WRender } from '../../../WDevCore/WModules/WComponentsTools.js';
import { css } from '../../../WDevCore/WModules/WStyledRender.js';

class TaskManagers extends HTMLElement {
    /**
     * 
     * @param {Array<ProyectoTableTareas>} Tasks 
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
        this.TabContainer = WRender.Create({ class: 'TabContainer', id: "TabContainer" });
        this.TabManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.OptionContainer = WRender.Create({ className: "OptionContainer" });
        this.shadowRoot?.append(this.TabContainer);
        this.DrawTaskManagers();
    }
    connectedCallback() { }
    DrawTaskManagers = async (TasksData) => {
        this.TabContainer.innerHTML = "";
        this.TaskManager(TasksData);
    }
    /**
     * 
     * @param {Array<Object>} TasksData 
     */
    TaskManager = (TasksData = this.Tasks) => {
        const StatePanelContainer = WRender.Create({
            className: "panelContainer",
            style: " grid-template-columns: repeat(" + this.TaskModel.Estado.Dataset.length + ", auto);"
        })
        this.TaskModel.Estado.Dataset.forEach(state => {
            const Tasks = TasksData.filter(t => t.Estado == state);
            const Panel = WRender.Create({
                className: Tasks.length > 0 ? "panel" : "panel-inact", id: "Panel-" + state,
                ondrop: (ev) => {
                    var data = ev.dataTransfer.getData("text");
                    const taskCard = this.shadowRoot?.getElementById(data);
                    if (ev.target.className.includes("panel")) {
                        ev.target.appendChild(taskCard);
                        // @ts-ignore
                        this.cardDrop(taskCard?.task, state);
                    }
                }, ondragover: (ev) => {
                    ev.preventDefault();
                }, children: [
                    { tagName: "label", class: "title-panel", innerText: state }
                ]
            });
            Tasks.forEach(task => {
                Panel.append(this.taskCard(task));
            });
            const panelOptions = WRender.Create({
                className: "panel-options", children: [
                    {//display
                        tagName: 'input', style: 'transform: rotate(90deg)', class: 'BtnDinamictT', value: '>', onclick: async (ev) => {
                            if (Panel.className == "panel") {
                                ev.target.style["transform"] = "inherit";
                                Panel.className = "panel-inact";
                            } else {
                                ev.target.style["transform"] = "rotate(90deg)";
                                Panel.className = "panel";
                            }
                        }

                    }]
            });
            StatePanelContainer.appendChild(WRender.Create({
                className: "panel-container",
                children: [panelOptions, Panel]
            }));
        });
        this.TabContainer.append(StatePanelContainer);
    }
    taskCard = (task) => {

        return WRender.Create({
            className: "task-card",
            draggable: true,
            // @ts-ignore
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
                        src: "/Media/Image/" + I.Tbl_InvestigatorProfile?.Foto
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
    */
    taskEdit = async (task) => {
        const CalendarModel = {
            type: 'CALENDAR',
            ModelObject: () => new ProyectoTableCalendario(),
            require: false,
            CalendarFunction: async () => {
                return {
                    Agenda: await new ProyectoTableAgenda({
                        // @ts-ignore
                        Id_Dependencia: task?.ProyectoTableActividades?.Id_Dependencia
                    }).Get(),
                    Calendario: await new ProyectoTableCalendario({
                        // @ts-ignore
                        Id_Dependencia: task?.ProyectoTableActividades?.Id_Dependencia
                    }).Get()
                }
            }
        }
        // @ts-ignore
        this.TaskModel.ProyectoTableCalendario = CalendarModel;
        this.shadowRoot?.append(new WModalForm({
            EditObject: task,
            AutoSave: true,
            ModelObject: this.TaskModel
        }))
    }
    /**
    * 
    * @param {ProyectoTableTareas} task 
    */
    taskDetail = async (task) => { }
    /**
     * 
     * @param {ProyectoTableTareas} task 
     * @param {String} state 
     */
    cardDrop = (task, state) => {
        // @ts-ignore
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
            width: fit-content;
            max-width: calc(100% - 50px);
        } 
        .panel-options {
            background-color: #e4e4e4;              
            border: 1px solid #d6d3d3;
            border-radius: 0px 10px 10px 0px;
        }
        .panel-container {
            padding: 0px;            
            border-radius: 0px 10px 10px 0px;
            background-color: #eee;        
            border: 1px solid #d6d3d3;
            height: 540px;
            display: grid;
            grid-template-columns: 40px fit-content(340px);
            
        }
        .BtnDinamictT {
            font-weight: bold;
            border: none;
            padding: 5px;
            margin: 5px;
            outline: none;
            text-align: center;
            display: inline-block;
            font-size: 12px;
            cursor: pointer;
            background-color: #4894aa;
            color: #fff;
            border-radius: 0.2cm;
            width: 15px;
            height: 15px;
            background-color:#4894aa;
            font-family: monospace;
        }
        .panel {          
            padding: 15px;  
            overflow-y: auto;    
            height: calc(100% - 40px);
            transition: all 0.4s;   
            width: 310px;           
        }
        .panel-inact {          
            padding: 15px;  
            overflow: hidden;    
            width: calc(100px); 
            font-size: 14px;
            transition: all 0.4s; 
        }
        .task-card {
            background-color: #fff;
            height: 130px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-bottom: 15px;        
            box-shadow: 0 0 5px 0 #adacac;
            container-type: inline-size;
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
            font-size: 14px; 
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
        @container (max-width: 200px){
            .p-participantes {
                display: none;
            }
            .card-options {
                flex-direction: column;
                height: auto;
                justify-content: flex-start;
            }
        }
    `
}
customElements.define('w-main-task', TaskManagers);
export { TaskManagers };

