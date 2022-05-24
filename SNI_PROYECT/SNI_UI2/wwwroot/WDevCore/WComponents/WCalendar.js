import { WRender, WAjaxTools, ComponentsManager } from "../WModules/WComponentsTools.js";
import { WCssClass, WStyledRender } from "../WModules/WStyledRender.js";
import "../WComponents/WModalForm.js";
let photoB64;
class CalendarConfig {
    DetailDay = false;
}
class WCalendar extends HTMLElement {
    constructor(Config = (new CalendarConfig())) {
        super();
        for (const p in Config) {
            this[p] = Config[p];
        }
        this.listOfAllDays = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
        this.listOfAllDaysSpanish = [
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
            'Domingo'
        ];
        this.listOfAllDaysSpanish_mini = [
            'LUN', 'MAR', 'MI', 'JUE', 'VIE', 'SAB', 'DOM'
        ];
        this.listOfAllMonths = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        this.now = new Date();
        this.year = this.now.getFullYear();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }
        this.shadowRoot.append(WRender.createElement(this.StyleCalendar()));
        this.append(WRender.createElement({
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass("#" + this.id, {
                        overflow: "hidden",
                        "border-radius": "0.2cm",
                        display: "block",
                        border: "solid 1px #e9e9e9",
                    })
                ]
            }
        }))
        this.DrawComponent();
    }
    async DrawComponent() {
        const ContainerCalendar = { type: "div", props: {}, children: [] };
        this.listOfAllMonths.forEach((Month, index) => {
            const Days = this.TakeDays(index, this.year);
            ContainerCalendar.children.push(this.DrawMonth(Month, Days, index));
        });
        ContainerCalendar.children.forEach(Month => {
            if (Month.props.id.includes(this.listOfAllMonths[this.now.getMonth()])) {
                Month.props.style = "display: block";
            } else {
                Month.props.style = "display: none";
            }
        });
        this.shadowRoot.append(WRender.createElement(ContainerCalendar));
        this.shadowRoot.append(WRender.createElement({
            type: "div",
            props: { class: "div" },
            children: this.DrawTFooter()
        }));
    }
    getWeekOfMonth = function (date) {
        var dayOfMonth = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();
        var checkDate = new Date(year, month, date.getDate());
        var checkDateTime = checkDate.getTime();
        var currentWeek = 0;
        for (var i = 1; i < 32; i++) {
            var loopDate = new Date(year, month, i);
            if (loopDate.getDay() == dayOfMonth) {
                currentWeek++;
            }
            if (loopDate.getTime() == checkDateTime) { return currentWeek; }
        }
    };
    DrawMonth(Month, Days, indexM) {
        const ContainerMonth = { type: "div", props: { id: Month + this.id, class: "GridCalendarMonthContainer" }, children: [] };
        const Title = { type: "div", props: { class: "calendarTitle" }, children: [Month + " " + this.year] };
        const DaysLabel = { type: "div", props: { class: "ListDays" }, children: this.listOfAllDaysSpanish_mini };
        //DAYS
        const Monday = { type: "div", props: { class: "GridDayColum" }, children: [] };
        const Tuesday = { type: "div", props: { class: "GridDayColum" }, children: [] };
        const Wednesday = { type: "div", props: { class: "GridDayColum" }, children: [] };
        const Thursday = { type: "div", props: { class: "GridDayColum" }, children: [] };
        const Friday = { type: "div", props: { class: "GridDayColum" }, children: [] };
        const Saturday = { type: "div", props: { class: "GridDayColum" }, children: [] };
        const Sunday = { type: "div", props: { class: "GridDayColum" }, children: [] };
        let weak = 1;
        for (let index = 0; index < Days; index++) {
            const date = new Date(`${this.year}-${Month}-${index + 1}`);
            const CalDay = {
                type: "article",
                props: { style: "", class: "CalendarDayDisable", innerText: index + 1 },
            };
            if (date > this.now) {
                CalDay.props.class = "CalendarDay";
                CalDay.props.onclick = async (ev) => {
                    const day = (index + 1) < 10 ? "0" + (index + 1) : index + 1;
                    const monthIndex = (indexM + 1) < 10 ? "0" + (indexM + 1) : indexM + 1;
                    this.SelectedDay = `${this.year}-${monthIndex}-${day}`;
                    //console.log("reservando...", this.SelectedDay);
                    const Days = ev.target.parentNode.parentNode.querySelectorAll("article");
                    Days.forEach(day => {
                        if (day.className != "CalendarDayDisable") {
                            day.className = "CalendarDay";
                        }
                    });
                    ev.target.className = "CalendarDayActive";
                    if (this.Function) {
                        if (this.DetailDay) {

                        } else {
                            const Result = this.Function({
                                date: this.SelectedDay,
                                day: date.getDay()
                            });
                        }

                    }
                }
            }
            switch (date.getDay()) {
                case 1:
                    if (!index == 0) {
                        weak = weak + 1;
                    }
                    CalDay.props.style = `grid-row: ${weak}`;
                    Monday.children.push(CalDay);
                    break;
                case 2:
                    CalDay.props.style = `grid-row: ${weak}`;
                    Tuesday.children.push(CalDay);
                    break;
                case 3:
                    CalDay.props.style = `grid-row: ${weak}`;
                    Wednesday.children.push(CalDay);
                    break;
                case 4:
                    CalDay.props.style = `grid-row: ${weak}`;
                    Thursday.children.push(CalDay);
                    break;
                case 5:
                    CalDay.props.style = `grid-row: ${weak}`;
                    Friday.children.push(CalDay);
                    break;
                case 6:
                    CalDay.props.style = `grid-row: ${weak}`;
                    Saturday.children.push(CalDay);
                    break;
                case 0:
                    CalDay.props.style = `grid-row: ${weak}`;
                    Sunday.children.push(CalDay);
                    break;
                default:
                    break;
            }
        }
        const ContainerDays = {
            type: "div",
            props: { class: "GridCalendarMonth" },
            children: [
                Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday,
            ]
        };
        ContainerMonth.children.push(Title, DaysLabel, ContainerDays);
        return ContainerMonth;
    }
    TakeDays(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }
    DrawTFooter(selectMonth = this.now.getMonth()) {
        let tfooter = [];
        this.ActualPage = selectMonth;
        const SelectPage = (index) => {
            let Months = this.shadowRoot.querySelectorAll(".GridCalendarMonthContainer");
            Months.forEach((Month, indexMonth) => {
                if (indexMonth == index) {
                    Month.style.display = "grid";
                } else {
                    Month.style.display = "none";
                }
            });
        }
        tfooter.push({
            type: "label",
            props: {
                innerText: "<",
                class: "pagBTN",
                onclick: () => {
                    this.ActualPage = this.ActualPage - 1;
                    if (this.ActualPage < 0) {
                        this.ActualPage = 11;
                    }
                    SelectPage(this.ActualPage);
                }
            }
        });
        tfooter.push({
            type: "label",
            props: {
                innerText: ">",
                class: "pagBTN",
                onclick: () => {
                    this.ActualPage = this.ActualPage + 1;
                    if (this.ActualPage > 11) {
                        this.ActualPage = 0;
                    }
                    SelectPage(this.ActualPage);
                }
            }
        });
        return tfooter;
    }
    StyleCalendar() {
        const Style = {
            type: "w-style",
            props: {
                id: "StyleCalendarTemplate",
                ClassList: [
                    new WCssClass(`.calendarTitle`, {
                        padding: "10px",
                        background: "#367cc3",
                        color: "#fff",
                        "text-align": "center",
                        "font-size": "16px"
                    }), new WCssClass(`.GridCalendarMonth`, {
                        display: "grid",
                        "grid-template-columns": "auto auto auto auto auto auto auto",
                    }), new WCssClass(`.ListDays`, {
                        display: "flex",
                        "justify-content": "center",
                        "align-items": "center"
                    }), new WCssClass(`.ListDays label`, {
                        width: "100%",
                        color: "#367cc3",
                        padding: "10px",
                        "font-size": "12px",
                        "text-align": "center"
                    }), new WCssClass(`.GridDayColum`, {
                        display: "grid",
                        "grid-template-rows": "35px 35px 35px 35px 35px 35px",
                    }), new WCssClass(`.CalendarDayDisable`, {
                        padding: 10,
                        "font-size": 12,
                        border: "solid 1px #999",
                        "background-color": "#bebebe",
                    }), new WCssClass(`.CalendarDay`, {
                        padding: 10,
                        "font-size": 12,
                        border: "solid 1px #c6c5c5",
                        cursor: "pointer",
                        transition: "all 0.5s"
                    }), new WCssClass(`.CalendarDay:hover`, {
                        "background-color": "#79a6d2"
                    }), new WCssClass(`.CalendarDayActive`, {
                        padding: 10,
                        border: "solid 1px #2d5986",
                        cursor: "pointer",
                        "font-size": 12,
                        transition: "all 0.5s",
                        "background-color": "#538cc6",
                        color: "#fff",
                    }), //PAGINACION
                    new WCssClass(`.pagBTN`, {
                        display: "inline-block",
                        padding: "10px",
                        color: "#888888",
                        "margin": "5px",
                        cursor: "pointer",
                        "border-radius": "0.2cm",
                        "font-weight": "bold",
                        transition: "all 0.6s",
                        "text-align": "center",
                    }), new WCssClass(`.div`, {
                        display: "flex",
                        "justify-content": "flex-end",
                        "padding-left": "20px",
                        "padding-right": "20px",
                        background: "#d8d8d8",
                    }),
                ],
                MediaQuery: [{
                    condicion: "(max-width: 800px)",
                    ClassList: []
                },]
            }
        }
        return Style;
    }
}
const Reservaciones = []
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

const CalendarManager = new ComponentsManager();
class ReservaConfig {
    Reservaciones = [];
    CalendarFunction = async () => {
        return {
            agenda: [],
            calendario: []
        };
    };
    SaveFunction = async () => { };
    Form = undefined;
}
class ReservarComponent extends HTMLElement {
    constructor(Config = (new ReservaConfig())) {
        super();
        for (const p in Config) {
            this[p] = Config[p];
        }
        this.Reservaciones = Reservaciones;
        this.className = "Reservar";
        this.DrawComponent();
    }
    DrawComponent = async () => {
        const calendar = new WCalendar({
            id: "Calendar",
            Function: async (DateParam) => {
                const IdDetailDay = `DetailDay${DateParam.date}`;
                const response = await this.CalendarFunction();
                CalendarManager.NavigateFunction(
                    IdDetailDay,
                    new DetailDayClass({
                        id: IdDetailDay
                    }, DateParam, response.agenda, response.calendario));
            }
        });
        const DetailDay = WRender.Create({
            class: "DetailCalendar",
            id: "DetailCalendar",
            children: [new DetailDayClass()]
        });
        CalendarManager.MainContainer = DetailDay;
        this.append(this.Style, this.Form, calendar, DetailDay);
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

customElements.define('w-reserva-calendar', ReservarComponent);
customElements.define('w-day-calendar', DetailDayClass);
customElements.define("w-calendar", WCalendar);
export { WCalendar, DetailDayClass, ReservarComponent }