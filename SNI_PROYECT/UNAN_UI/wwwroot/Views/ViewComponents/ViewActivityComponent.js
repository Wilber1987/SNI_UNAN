import { WRender, ComponentsManager, WAjaxTools } from "../../WDevCore/WModules/WComponentsTools.js";
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import { WForm } from '../../WDevCore/WComponents/WForm.js';
import { WModalForm } from '../../WDevCore/WComponents/WModalForm.js';
import { ReservarComponent } from "../../WDevCore/WComponents/WCalendar.js";
import { StyleScrolls, StylesControlsV2 } from "../../WDevCore/StyleModules/WStyleComponents.JS";
class ViewActivityComponent extends HTMLElement {
    constructor(Dataset) {
        super();
        this.Dataset = Dataset;
        this.Container = WRender.Create({ className: "Container" });
        this.Container.append(WRender.Create({
            className: "DivOptions",
            children: [{
                tagName: 'button', className: 'Btn', innerText: 'Nueva Tarea',
                onclick: async () => {
                    const response = await WAjaxTools.PostRequest("./api/Calendar/TakeData");
                    const ReservaComp = new ReservarComponent({
                        Form: new WForm({
                            StyleForm: "columnX1",
                            className: "Form",
                            ObjectModel: {
                                Titulo: "",
                                Descripcion: "",
                                Estado: ["Activa", "Finalizada"],
                                IdTareaPadre: this.Dataset.tareas.map(x => {
                                    return { id: x.idTarea, desc: x.titulo };
                                }),
                                Participantes: {
                                    type: "MULTISELECT", Dataset: response[1].map(x => {
                                        x.id_ = x.idUsuario;
                                        x.IdUsuario = x.idUsuario;
                                        x.Descripcion = `${x.nombres} ${x.apellidos} - ${x.mail}`;
                                        return x;
                                    })
                                },
                                Evidencias: { type: "IMAGES" },
                            }, SaveFunction: async (Object, Reservaciones = []) => {
                                console.log(Object);
                                Object.Calendarios = ReservaComp.Reservaciones;
                                Object.IdActividad = this.Dataset.idActividad
                                const FunctionName = this.TypeReserva == "New" ? "" : "SaveActividad";
                                const response = await WAjaxTools.PostRequest(
                                    "./api/Calendar/SaveTarea", Object
                                );
                                if (response) {
                                    modal.close();
                                    return;
                                }else {
                                    alert("error...")
                                }                                
                            }
                        }), CalendarFunction: async () => {
                            const response = await WAjaxTools.PostRequest("./api/Calendar/TakeCalendar", this.Dataset);
                            return response;
                        }
                    });
                    const modal = new WModalForm({
                        ObjectModal: ReservaComp,
                        title: "Nueva Tarea",
                        StyleForm: "FullScreen"
                    });
                    this.append(modal);
                }
            }]
        }))
        this.TareasContainer = WRender.Create({ className: "TareasContainer" });
        this.append(WRender.createElement(StyleScrolls));
        this.append(WRender.createElement(StylesControlsV2));        
        this.append(this.Style, this.Container, this.TareasContainer);
        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.TareasContainer.innerHTML = "";        
        this.Dataset.tareas.forEach(tarea => {
            this.TareasContainer.append(WRender.Create({
                className: "DivTarea",
                children: [
                    tarea.titulo , 
                    WRender.Create({tagName: "label", innerText: tarea.estado, className:  tarea.estado }), {
                        tagName: 'button', className: 'Btn-Mini', innerText: 'Agregar Evidencias',
                        onclick: async () => {
                            const modal = new WModalForm({
                                title: "Agregar Evidencias",
                                StyleForm: "columnX1",
                                ObjectModel: {
                                    IdTarea_hidden: tarea.idTarea,
                                    Evidencias: { type: "IMAGES" },
                                }, SaveFunction: async (Object) => {
                                    const DataPost = {
                                        IdTarea: Object.idTarea,
                                        Evidencias: Object.Evidencias.map(x => {
                                            if (typeof x === "string") {
                                                return { IdTarea: Object.idTarea, Data: x };
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
                            //code.....
                        }
                    },
                ]
            }))
        });
    }
    Style = new WStyledRender({
        ClassList: [
            new WCssClass(`.TareasContainer`, {
                display: "flex",
                "flex-direction": "column"
            }),new WCssClass(`.DivTarea`, {
                display: "grid",
                "grid-template-columns": "40% 15% 20% 20%",
                padding: 5,
                margin: 5,
                "grid-gap": 20,
                "box-shadow": "0 0 3px #888",
                "align-items": "center"
            }),new WCssClass(`.Activa, .Pendiente`, {
                "justify-content": "space-between",
                display: "flex"
            }), new WCssClass(`.Activa::after`, {
                content: "''",
                "border-radius": "50%",
                height: 20,
                width: 20,
                "background-color": "#1ba31f",
                display: "block"
            }),new WCssClass(`.Pendiente::after`, {
                content: "''",
                "border-radius": "50%",
                height: 20,
                width: 20,
                "background-color": "#d3210f",
                display: "block"
            }),
        ]
    });
}
customElements.define('w-component', ViewActivityComponent);
export { ViewActivityComponent }