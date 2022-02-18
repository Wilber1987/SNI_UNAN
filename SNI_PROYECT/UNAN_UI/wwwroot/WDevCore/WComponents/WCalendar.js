import { WRender, WAjaxTools, ComponentsManager } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "../WComponents/WModalForm.js";
let photoB64;
class CalendarConfig {}
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
            'LUN','MAR','MI','JUE','VIE','SAB','DOM'
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
                    new WCssClass("#"+this.id, {
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
    getWeekOfMonth = function(date) {
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
                CalDay.props.onclick = async(ev) => {
                    const day = (index + 1) < 10 ? "0"+(index + 1):index + 1;
                    const monthIndex  = (indexM + 1) < 10 ? "0"+(indexM + 1):indexM + 1;
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
                        const Result = this.Function({
                            date: this.SelectedDay,
                            day: date.getDay()
                        });
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
                    }),new WCssClass(`.ListDays`, {
                        display: "flex",
                        "justify-content": "center",
                        "align-items": "center"
                    }), new WCssClass(`.ListDays label`, {
                        width: "100%",     
                        color: "#367cc3",
                        padding: "10px",
                        "font-size": "12px",
                        "text-align": "center"
                    }),new WCssClass(`.GridDayColum`, {
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
                }, ]
            }
        }
        return Style;
    }
}
customElements.define("w-calendar", WCalendar);
export {WCalendar}