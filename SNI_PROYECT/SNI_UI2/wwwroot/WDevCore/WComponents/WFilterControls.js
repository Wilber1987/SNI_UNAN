import { WRender, WArrayF } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";;
class WFilterOptions extends HTMLElement {
    constructor(Config) {
        super();
        if (Config != undefined) {
            this.id = undefined ?? Config.id;
            this.Config = Config;
        }
        this.attachShadow({ mode: "open" });        
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }
        this.className = this.className + " WFilterOptions";
        this.append(WRender.createElement({ type:'w-style', props: {id: '', ClassList: [
            new WCssClass(`.WFilterOptions`, {
                display: "block"
            }),
        ]}}))
        this.DrawFilter();
    }
    DrawFilter() {
        this.shadowRoot.innerHTML = "";
        if (this.Config.Dataset.length == 0) {
            this.shadowRoot.innerHTML = "No hay datos que mostrar";
        }
        const ControlOptions = {
            type: 'div',
            props: { id: 'optionsContainter', class: "OptionContainer" }, children: []
        }
        for (const prop in this.Config.Dataset[0]) {
            const flag = this.checkDisplay(prop);
            if (flag) {
               if ((typeof this.Config.Dataset[0][prop] != "number"
                    && !prop.toUpperCase().includes("FECHA")
                    && !prop.toUpperCase().includes("DATE"))
                    || prop.toUpperCase().includes("AÑO")
                    || prop.toUpperCase().includes("YEAR")) {
                    const select = {
                        type: 'select', props: { id: prop }, children: [
                            { type: 'option', props: { innerText: 'Seleccione', value: '' } }
                        ]
                    }
                    const SelectData = WArrayF.ArrayUnique(this.Config.Dataset, prop);
                    SelectData.forEach(data => {
                        if (data[prop] != "" && data[prop] != null) {
                            select.children.push({
                                type: 'option', props: { innerText: data[prop], value: data[prop] }
                            });
                        }
                    });
                    select.props.onchange = async (ev) => {
                        let SelectFlag = false;
                        this.shadowRoot.querySelectorAll("#optionsContainter select").forEach(select => {
                            if (select.id != ev.target.id) {
                                if (select.value != "") {
                                    SelectFlag = true;
                                }
                            }
                        });
                        const DFilt = this.Config.Dataset.filter(obj => {
                            let flagObj = true;
                            this.shadowRoot.querySelectorAll("#optionsContainter select").forEach(select => {
                                if (select.value == "") {
                                    return
                                }
                                if (obj[select.id] == select.value) {
                                    if (flagObj) {
                                        flagObj = true;
                                    }
                                } else {
                                    flagObj = false;
                                }
                            });
                            return flagObj;
                        });            
                        if (this.Config.FilterFunction != undefined) {
                            this.Config.FilterFunction(DFilt);
                        } else {
                            console.log(DFilt);
                        }
                    }
                    ControlOptions.children.push([WArrayF.Capitalize(prop.replace("_", " ")), select]);
                }
            }
        }        
        this.shadowRoot.append(WRender.createElement(ControlOptions));
        this.shadowRoot.append(WRender.createElement(this.style));
    }
    checkDisplay(prop) {
        let flag = true
        if (this.Config.DisplayOption != undefined &&
            this.Config.DisplayOption.__proto__ == Array.prototype) {
            const findProp = this.Config.DisplayOption.find(x => x == prop);
            if (!findProp) {
                flag = false;
            }
        }
        return flag;
    }
    style = {
        type: 'w-style', props: {
            id: '', ClassList: [
                new WCssClass(`.reportV`, {
                    margin: '10px',
                }), new WCssClass(`.OptionContainer`, {                    
                    display: "grid",
                    "grid-template-columns": "50% 50%",
                    "grid-gap": 10
                }), new WCssClass(`.OptionContainer label`, {
                    padding: 10,
                    display: "block"
                }), new WCssClass(`.OptionContainer div`, {
                    display: "grid",
                    "grid-template-rows": "30px 30px",
                    //margin: "5px",
                    "font-size": "12px",
                }), new WCssClass(`.OptionContainer input, .OptionContainer select`, {
                    "grid-row": "2/3",
                    margin: "0px",
                    padding: "5px 10px",
                    "border": "2px solid #e1d4d4"
                }), new WCssClass(`.BtnSuccess`, {
                    "font-weight": "bold",
                    "border": "none",
                    "padding": "10px",
                    "text-align": "center",
                    "display": "inline-block",
                    "min-width": "100px",
                    "cursor": "pointer",
                    "background-color": "#09f",
                    "color": "#fff",
                    "border-right": "rgb(3, 106, 175) 5px solid",
                }),
            ], MediaQuery: [{
                condicion: '(max-width: 600px)',
                ClassList: [ new WCssClass(`.OptionContainer`, {
                    display: "flex",
                    "flex-direction": "column",                    
                }),new WCssClass(`.OptionContainer div`, {
                    display: "grid",
                    "grid-template-rows": "30px 30px",
                    "grid-template-columns": "auto",
                    //margin: "5px",
                    "font-size": "12px",
                }),]
            },
            ]
        }
    };
}
customElements.define("w-filter-option", WFilterOptions);
export { WFilterOptions }