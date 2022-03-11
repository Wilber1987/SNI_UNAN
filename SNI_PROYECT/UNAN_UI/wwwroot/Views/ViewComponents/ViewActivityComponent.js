import { WRender, ComponentsManager, WAjaxTools } from "../../WDevCore/WModules/WComponentsTools.js";
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import { WForm } from '../../WDevCore/WComponents/WForm.js';
import { WModalForm } from '../../WDevCore/WComponents/WModalForm.js';
import { ReservarComponent } from "../../WDevCore/WComponents/WCalendar.js"
class ViewActivityComponent extends HTMLElement {
    constructor(Dataset) {
        super();
        this.Dataset = Dataset;
        this.Container = WRender.Create({ className: "Container" });
        this.TareasContainer = WRender.Create({ className: "TareasContainer" });
        this.append(this.Style, this.Container, this.TareasContainer);
        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Container.append(WRender.Create({
            className: "DivOptions",
            children: [{
                tagName: 'button', className: 'className', innerText: 'Agregar Evidencias',
                onclick: async () => {
                    const response = await WAjaxTools.PostRequest("./api/Calendar/TakeData");
                    const modal = new WModalForm({
                        ObjectModal: new ReservarComponent({
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
                                }, SaveFunction: async (Object) => {
                                    console.log(Object);
                                    const FunctionName = this.TypeReserva == "New" ? "" : "SaveActividad";
                                    const response = await WAjaxTools.PostRequest(
                                        "./api/Calendar/SaveTarea", Object
                                    );
                                    modal.close();
                                }
                            })
                        }),
                        title: "Nueva Tarea",
                        StyleForm: "FullScreen"
                    });
                    this.append(modal);
                }
            }]
        }))
        this.Dataset.tareas.forEach(tarea => {
            this.TareasContainer.append(WRender.Create({
                className: "DivTarea",
                children: [
                    tarea.titulo + ": ", {
                        tagName: 'button', className: 'className', innerText: 'Agregar Evidencias',
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
                        tagName: 'button', className: 'className', innerText: 'Marcar Finalizada',
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
            new WCssClass(`.Container`, {

            })
        ]
    });
}
customElements.define('w-component', ViewActivityComponent);
export { ViewActivityComponent }