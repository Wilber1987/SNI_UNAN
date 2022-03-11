import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import { WCalendar } from '../../WDevCore/WComponents/WCalendar.js';
import { WForm } from '../../WDevCore/WComponents/WForm.js';
import { WModalForm } from '../../WDevCore/WComponents/WModalForm.js';
const Reservaciones = [];
const CompM = new ComponentsManager();
class ReservarComponent extends HTMLElement {
    constructor(TypeReserva = "New", CalendarData = { IdUsuario: undefined, IdDependencia: undefined }) {
        super();
        this.className = "Reservar";
        this.ObjectActividad = {
            Participantes: "",
            Titulo: "",
            IdDependencia: CalendarData.IdDependencia,
            //IdUsuario: CalendarData.IdUsuario,
            Descripcion: "",
            Evidencias: "",
        };
        this.TypeReserva = TypeReserva;
        this.CalendarData = CalendarData;
        this.DrawComponent();
    }
    DrawComponent = async () => {
        const calendar = new WCalendar({
            id: "Calendar",
            Function: async (DateParam) => {
                if (this.ObjectActividad.IdDependencia == undefined) {
                    this.append(new WModalForm({
                        title: "Alert",
                        ObjectModal: "Seleccione una dependencia"
                    }));
                    return;
                }
                const response = await WAjaxTools.PostRequest("./api/Calendar/TakeCalendar", this.ObjectActividad);
                const idDetailDay = `DetailDay${DateParam.date}`;
                CompM.NavigateFunction(
                    idDetailDay,
                    new DetailDayClass({
                        id: idDetailDay
                    }, DateParam, response.agenda, response.calendario));
            }
        });
        const response = await WAjaxTools.PostRequest("./api/Calendar/TakeData");
        let Dependencias = [];
        if (this.TypeReserva == "ApplyFor") {
            Dependencias = response[0].map(x => {
                return { id: x.idDependencia, desc: x.descripcion };
            });
        } else {
            Dependencias = response[2].map(x => {
                const dep = response[0].find(dep => dep.idDependencia == x.idDependencia);
                return { id: x.idDependencia, desc: dep.descripcion };
            });
        }
        const RForm = new WForm({
            StyleForm: "columnX1",
            className: "Form",
            ObjectModel: {
                Titulo: "",
                Descripcion: "",
                Participantes: {
                    type: "MULTISELECT", Dataset: response[1].map(x => {
                        x.id_ = x.idUsuario;
                        x.IdUsuario = x.idUsuario;
                        x.Descripcion = `${x.nombres} ${x.apellidos} - ${x.mail}`;
                        return x; //{ id_: x.idUsuario, Descripcion: `${x.nombres} ${x.apellidos} - ${x.mail}` };
                    })
                },
                IdDependencia: Dependencias,
                Evidencias: { type: "IMAGES" },
            }, EditObject: this.ObjectActividad,
            ValidateFunction: (TObject) => {
                return true;
            }, SaveFunction: async (Object) => {
                console.log(Object);
                const PostData = {
                    Titulo: Object.Titulo,
                    Descripcion: Object.Descripcion,
                    Estado: "Activa",
                    IdDependencia: Object.IdDependencia,
                    Tareas: [{
                        Titulo: "Ejecución",
                        Descripcion: "Tarea principal",
                        Estado: "Pendiente",
                        Calendarios: Reservaciones,
                        Evidencias: Object.Evidencias.map(x => {
                            if (typeof x === "string") {
                                return { Data: x };
                            }
                            return x;
                        }),
                        Participantes: Object.Participantes

                    }]
                }
                const FunctionName = this.TypeReserva == "New"? "": "SaveActividad";
                const response = await WAjaxTools.PostRequest(
                    "./api/Calendar/" + FunctionName , PostData
                );

            }
        });
        const DetailDay = WRender.Create({
            class: "DetailCalendar",
            id: "DetailCalendar",
            children: [new DetailDayClass()]
        });
        CompM.MainContainer = DetailDay;
        this.append(this.Style, RForm, calendar, DetailDay);
    }
    Style = new WStyledRender({
        ClassList: [
            new WCssClass(`.Reservar`, {
                display: "grid",
                "grid-template-rows": "330px 400px",
                "grid-template-columns": "50% 50%",
                "text-align": "left"
            }), new WCssClass(`.Form`, {
                margin: "auto",
                "border-radius": "0.3cm",
                border: "solid 1px #cbcbcb",
                width: "calc(100% - 30px)",
                padding: "10px",
                "grid-row": "1/3",
            }), new WCssClass(`.DetailCalendar`, {
                //"grid-row": "1/3",
                //"grid-column": "2/3",
                width: "100%",
            }), new WCssClass(`#Calendar`, {
                //"grid-row": "2/3",
            }),
        ]
    });
}

customElements.define('w-reserva', ReservarComponent);


class DetailDayClass extends HTMLElement {
    constructor(Props = {}, DateParam, agenda = [], reservaciones = []) {
        super();
        this.id = "baseDayDetail";
        for (const p in Props) {
            this[p] = Props[p];
        }
        this.className = "DayDetail DivContainer";
        const ListDays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        this.append(WRender.createElement(this.Style));
        if (DateParam == null) {
            this.append(WRender.Create({
                class: "DayContent", children: [
                    { tagName: "h5", innerText: "Detalle" },
                    { tagName: "label", innerText: "Seleccionar el día" }
                ]
            }));
            return;
        }
        this.append(WRender.Create({
            class: "DayContent",
            children: [
                { tagName: "h5", innerText: ListDays[DateParam.day] },
                { tagName: "h3", innerText: (new Date(DateParam.date)).getDate() + 1 }
            ]
        }));
        const hours = [
            "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
            "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
        ];
        hours.forEach((element, index) => {
            const hour = WRender.Create({ className: "hourDetail" });
            const horarioAtencion = agenda.filter(obj => obj.dia == ListDays[DateParam.day]);
            let fecha1 = new Date(`${DateParam.date} ${element}`);
            let fecha2 = new Date(`${DateParam.date} ${element.replace(":00", ":59")}`);
            if (fecha2.toString() == "Invalid Date") {
                fecha2 = new Date(`${DateParam.date} 17:00`);
            }
            let DayState = false;
            horarioAtencion.forEach(horario => {
                const fecha1A = new Date(`${DateParam.date} ${horario.hora_Inicial}`);
                const fecha2A = new Date(`${DateParam.date} ${horario.hora_Final}`);
                if (fecha1 >= fecha1A && fecha2 <= fecha2A) {
                    DayState = true;
                }
            });
            if (DayState == true) {
                hour.className = "hourDetail hourH";
                let Reservable = true;
                reservaciones.forEach(reserva => {
                    const fecha1R = new Date(reserva.fecha_Inicial);
                    const fecha2R = new Date(reserva.fecha_Final);
                    if (fecha1.toString() == fecha1R.toString()
                        && fecha2.toString() == fecha2R.toString()) {
                        hour.className = "hourDetail hourR";
                        Reservable = false;
                    }
                });
                if (Reservable) {
                    const checkB = WRender.Create({
                        tagName: "input", id: "Checkbox" + element, type: "Checkbox", innerText: `${element}`
                    })
                    //Wed Mar 09 2022 15:10:44 GMT-0600
                    hour.append(checkB);
                    checkB.onchange = async (ev) => {
                        if (checkB.checked == false) {
                            let filtObject = Reservaciones.indexOf(
                                Reservaciones.find(a => a.id == element)
                            );
                            Reservaciones.splice(filtObject, 1);
                            return;
                        }
                        //console.log(`${DateParam.date} ${element}`, `${DateParam.date} ${element.replace(":00", ":59")}`)
                        //console.log(new Date())
                        //console.log(new Date(new Date(`${DateParam.date} ${element}`)), new Date(`${DateParam.date} ${element.replace(":00", ":59")}`))
                        const dataPost = {
                            id: `${DateParam.date} ${element}`,
                            Fecha_Inicial: `${DateParam.date}T${element}:00.000Z`,
                            Fecha_Final: `${DateParam.date}T${element.replace(":00", ":59")}:00.000Z`
                        }
                        Reservaciones.push(dataPost);
                    }
                }
            }
            hour.append(WRender.createElement({
                type: "label",
                props: {
                    htmlFor: "Checkbox" + element,
                    innerText: `${element}`
                }
            }));
            this.append(hour);
        });
    }
    Style = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(`.DayDetail`, {
                    //border: "1px solid #888",
                    display: "flex",
                    "flex-direction": "column",
                    overflow: "auto",
                    "margin": "15px",
                    "border-radius": "0.5cm",
                    "box-shadow": "0 2px 5px 0px rgb(0 0 0 / 50%)",
                }), new WCssClass(`.hourDetail label`, {
                    //border: "1px solid #888",
                    display: "block",
                    padding: "5px 25px",
                    "font-size": "18px",
                    "margin-bottom": "0px !important",
                    cursor: "pointer",
                }), new WCssClass(`.hourDetail`, {
                    background: "rgb(242 242 242)",
                    //display: "flex",
                    "border-bottom": "1px solid #b2b2b2",
                }), new WCssClass(`.hourH input`, {
                    display: "none",
                }), new WCssClass(`.hourH label::after`, {
                    'content': '""',
                    'background': 'transparent',
                    'border': '2px solid #757575 !important',
                    'height': '15px',
                    'line-height': '15px',
                    'margin-right': '5px',
                    'text-align': 'center',
                    'vertical-align': 'middle',
                    'width': '15px',
                    'position': 'relative',
                    'margin': '5px',
                    'float': 'right',
                    'top': '0px'
                }), new WCssClass(
                    `.hourH input[type="checkbox"]:checked + label::after`, {
                    "content": "''",
                    "font-size": "15px",
                    "color": "#757575",
                    "background-color": "#757575;   ",
                    "box-shadow": "inset 0 0 0 3px #e2e2e2",
                    "transition": "all ease 0.5s",
                }), new WCssClass(`.hourR`, {
                    background: "#cdccdb",
                }), new WCssClass(`.hourH`, {
                    background: "#fff",
                    cursor: "pointer",
                }), new WCssClass(`.DayContent`, {
                    "text-align": "center",
                    padding: "10px",
                    "border-bottom": "1px solid #b2b2b2",
                })
            ]
        }
    };
}
export { ReservarComponent,  DetailDayClass}
customElements.define('w-day', DetailDayClass);
const Estados = [
    { id_: "Fresa", Descripcion: "Severa" },
    { id_: "Naranja", Descripcion: "Moderada" },
    { id_: "Verde", Descripcion: "Sin sintomas" }
];
const TiposEstados = [
    //Deportes------------->
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Autoconfianza", Descripcion: "Autoconfianza",
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Control de la energía negativa", Descripcion: "Control de la energía negativa",
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Control de la atención", Descripcion: "Control de la atención",
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Control de la visualización y de las imágenes", Descripcion: "Control de la visualización y de las imágenes",
    }
];