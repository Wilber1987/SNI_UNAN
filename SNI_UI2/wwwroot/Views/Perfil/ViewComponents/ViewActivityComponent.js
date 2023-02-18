import { WRender, ComponentsManager, WAjaxTools } from "../../../WDevCore/WModules/WComponentsTools.js";
import { WCssClass, WStyledRender } from '../../../WDevCore/WModules/WStyledRender.js';
import { WForm } from '../../../WDevCore/WComponents/WForm.js';
import { WModalForm } from '../../../WDevCore/WComponents/WModalForm.js';
import { ReservarComponent } from "../../../WDevCore/WComponents/WCalendar.js";
import { StyleScrolls, StylesControlsV2 } from "../../../WDevCore/StyleModules/WStyleComponents.JS";
import { TareaModel } from "../../../Model/TareaModel.js";
class ViewActivityComponent extends HTMLElement {
    constructor(Activity) {
        super();
        this.Activity = Activity;
        this.Container = WRender.Create({ className: "Container" });
        this.Container.append(WRender.Create({
            className: "DivOptions",
            children: [{
                tagName: 'button', className: 'Btn', innerText: 'Nueva Tarea',
                onclick: async () => {
                    await this.NewTarea();
                }
            }]
        }))
        this.TareasContainer = WRender.Create({ className: "TareasContainer" });
        this.append(WRender.createElement(StyleScrolls));
        this.append(WRender.createElement(StylesControlsV2));
        this.append(this.Style, this.Container, this.TareasContainer);
        this.Draw();
    }
    async NewTarea() {
        const response = await WAjaxTools.PostRequest("../../api/Calendar/TakeData");
        const tareaModel = new TareaModel({ Participantes: response[1], Tareas: this.Dataset.Tareas });
        // const ReservaComp = new ReservarComponent({
        //     Form: new WForm({
        //         StyleForm: "columnX1",
        //         className: "Form",
        //         ModelObject: tareaModel,
        //         SaveFunction: async (Object, Reservaciones = []) => {
        //             Object.Calendarios = ReservaComp.Reservaciones;
        //             Object.IdActividad = this.Dataset.IdActividad;
        //             const FunctionName = this.TypeReserva == "New" ? "" : "SaveActividad";
        //             Object.Evidencias = Object.Evidencias.map(e => ({IdTipo: 1, Data: e}));
        //             const response = await WAjaxTools.PostRequest( "../../api/Calendar/SaveTarea", Object);
        //             if (response) {
        //                 modal.close();
        //                 this.Dataset.tareas.push(Object);
        //                 this.Draw();
        //                 return;
        //             } else {
        //                 alert("error...");
        //             }
        //         }
        //     }), CalendarFunction: async () => {
        //         const response = await WAjaxTools.PostRequest("../../api/Calendar/TakeCalendar", this.Dataset);
        //         return response;
        //     }
        // });
        const modal = new WModalForm({
            ObjectModal: ReservaComp,
            title: "Nueva Tarea",
            StyleForm: "FullScreen"
        });
        this.append(modal);
    }
    connectedCallback() { }
    Draw = async () => {
        this.Dataset = await WAjaxTools.PostRequest("../../api/Calendar/TakeActividad", this.Activity);
        this.TareasContainer.innerHTML = "";
        this.Dataset.Tareas.forEach(tarea => {
            this.CreateTareaContainer(tarea);
        });
    }
    Style = new WStyledRender({
        ClassList: [
            new WCssClass(`.TareasContainer`, {
                display: "flex",
                "flex-direction": "column"
            }), new WCssClass(`.DivTarea`, {
                display: "grid",
                "grid-template-columns": "35% 15% 20% 20%",
                padding: "5px 15px",
                margin: 5,
                "grid-gap": 10,
                "box-shadow": "0 0 3px #888",
                "align-items": "center"
            }), new WCssClass(`.Activa, .Pendiente`, {
                "justify-content": "space-between",
                display: "flex"
            }), new WCssClass(`.Activa::after`, {
                content: "''",
                "border-radius": "50%",
                height: 20,
                width: 20,
                "background-color": "#1ba31f",
                display: "block"
            }), new WCssClass(`.Pendiente::after`, {
                content: "''",
                "border-radius": "50%",
                height: 20,
                width: 20,
                "background-color": "#d3210f",
                display: "block"
            }),
        ]
    });
    CreateTareaContainer(tarea) {
        this.TareasContainer.append(WRender.Create({
            className: "DivTarea",
            children: [
                tarea.Titulo,
                WRender.Create({ tagName: "label", innerText: tarea.Estado, className: tarea.Estado }),
                {
                    tagName: 'button', className: 'Btn-Mini', innerText: 'Agregar Evidencias',
                    onclick: async () => {
                        const modal = new WModalForm({
                            title: "Agregar Evidencias",
                            StyleForm: "columnX1",
                            ModelObject: {
                                IdTarea_hidden: tarea.IdTarea,
                                Evidencias: { type: "IMAGES" },
                            }, SaveFunction: async (Object) => {
                                const DataPost = {
                                    IdTarea: Object.OdTarea,
                                    Evidencias: Object.Evidencias.map(x => {
                                        if (typeof x === "string") {
                                            return { IdTarea: Object.IdTarea, Data: x };
                                        }
                                        return x;
                                    })
                                };
                                const response = await WAjaxTools.PostRequest(
                                    "./api/Calendar/SaveEvidencias", DataPost
                                );
                                modal.close();
                            }
                        });
                        this.append(modal);
                    }
                }, {
                    tagName: 'button', className: 'Btn-Mini', innerText: 'Marcar Finalizada',
                    onclick: async () => {
                    }
                },
            ]
        }));
    }
}
customElements.define('w-component', ViewActivityComponent);
export { ViewActivityComponent }