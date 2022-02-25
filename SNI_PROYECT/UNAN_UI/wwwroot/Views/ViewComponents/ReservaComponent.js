import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import { WCalendar } from '../../WDevCore/WComponents/WCalendar.js';
import { WForm } from '../../WDevCore/WComponents/WForm.js';
import { WModalForm } from '../../WDevCore/WComponents/WModalForm.js';
const Reservaciones = [];
const CompM = new ComponentsManager();
class ReservarComponent extends HTMLElement {
    constructor(Cita) {
        super();
        this.className = "Reservar";
        this.ObjectActividad = {
            Titulo: null,
            Dependencia: null,
            Descripcion: null,
            imagenes: null,
        };
        this.DrawComponent();
    }
    DrawComponent = async ()=>{
        const calendar = new WCalendar({
            id: "Calendar",
            Function: async (DateParam) => {
                if (this.ObjectActividad.Dependencia == null) {
                    this.append(new WModalForm({
                        title: "Alert",
                        ObjectModal: "Seleccione una dependencia"
                    }));
                    return;
                }
                const response = await WAjaxTools.PostRequest("./api/Calendar/TakeCalendar", {
                    IdDependencia: this.Dependencia,
                    IdUsuario: 1
                });
                const idDetailDay = `DetailDay${DateParam.date}`;
                CompM.NavigateFunction(
                    idDetailDay,
                    new DetailDayClass({
                        id: idDetailDay
                    }, DateParam, response.agenda, response.reservaciones));
            }
        });
        const response = await WAjaxTools.PostRequest("./api/Calendar/TakeData");
        const RForm = new WForm({
            StyleForm: "columnX1",
            className: "Form",
            ObjectModel: {
                Nombre: null,
                Dependencia: response.Dependencias,
                Descripcion: null,
                imagenes: null,
            }, EditObject: this.ObjectActividad,
            ValidateFunction: (TObject) => {
                return true;
            }, SaveFunction: (Object) => {
                alert("save");
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
export { ReservarComponent }

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
            "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
            "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
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
                const fecha1A = new Date(`${DateParam.date} ${horario.hora_inicial}`);
                const fecha2A = new Date(`${DateParam.date} ${horario.hora_final}`);
                if (fecha1 >= fecha1A && fecha2 <= fecha2A) {
                    DayState = true;
                }
            });
            if (DayState == true) {
                hour.className = "hourDetail hourH";
                let Reservable = true;
                reservaciones.forEach(reserva => {
                    const fecha1R = new Date(reserva.fecha_prevista);
                    const fecha2R = new Date(reserva.fecha_final_p);
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
                    hour.append(checkB);
                    checkB.onchange = async (ev) => {
                        if (checkB.checked == false) {
                            let filtObject = Reservaciones.indexOf(
                                Reservaciones.find(a => a.id == element)
                            );
                            Reservaciones.splice(filtObject, 1);
                            return;
                        }
                        const dataPost = {
                            id: `${DateParam.date} ${element}`,
                            data: {
                                fecha_inicial: `${DateParam.date} ${element}`, //DateParam.date +" "+element,
                                fecha_final: `${DateParam.date} ${element.replace(":00", ":59")}` //DateParam.date +" "+element.replace(":00", ":59"),
                            }
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
customElements.define('w-day', DetailDayClass);