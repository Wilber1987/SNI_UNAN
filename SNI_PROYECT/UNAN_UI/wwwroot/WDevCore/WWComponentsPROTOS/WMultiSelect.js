import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass, WStyledRender } from "../WModules/WStyledRender.js";
import { StyleScrolls, StylesControlsV1 } from "../StyleModules/WStyleComponents.JS";
class ConfigMS {
    Dataset = ["Option1", "Option2", "Option3"];
}

class MultiSelect extends HTMLElement {
    constructor(Config = (new ConfigMS()), Style = null) {
        super();
        this.Config = Config;
        this.attachShadow({ mode: 'open' });
        this.selectedItems = [];
        this.NameSelected = "";
        this.FieldName = "";
        this.SubOptionsFieldName = "";
        WRender.SetStyle(this, {
            display: "block",
            position: "relative",
            boxShadow: "0 0 4px 0 rgb(0,0,0,50%)",
            fontSize: "12px"
        });
        this.LabelMultiselect = WRender.Create({ className: "LabelMultiselect", innerText: "MultiSelect", onclick: ()=>{
            if(this.OptionsContainer.className.includes("MenuActive")){
                this.OptionsContainer.className = "OptionsContainer MenuInactive";
            }else {
                this.OptionsContainer.className = "OptionsContainer MenuActive";
            }
        }});
        this.OptionsContainer = WRender.Create({ className: "OptionsContainer MenuInactive" });
        this.shadowRoot.append(
            this.LabelMultiselect, this.OptionsContainer,
            new WStyledRender(MainMenu),
            WRender.createElement(StyleScrolls)
        );
        if (Style != null && Style.__proto__ == WStyledRender.prototype) {
            this.shadowRoot.append(Style);
        }

    }
    connectedCallback() {
        this.LabelMultiselect.innerHTML = "";
        this.OptionsContainer.innerHTML = "";
        this.Draw();
        this.DrawLabel();
    }
    Draw = () => {
        //console.log(this.Config.Dataset);
        this.Dataset = this.Config.Dataset ?? [];
        this.MultiSelect = this.Config.MultiSelect ?? true;
        this.Dataset.forEach(element => {
            //console.log(element);
            const OType = this.MultiSelect == true ? "checkbox" : "radio";
            const OptionLabel = WRender.Create({
                tagName: "label", htmlFor: "OType" + element.id_,
                innerText: element.Descripcion, className: "OptionLabel"
            });
            const Option = WRender.Create({
                tagName: "input",
                id: "OType" + element.id_,
                type: OType,
                name: element.name,
                checked: WArrayF.FindInArray(element, this.selectedItems),
                className: "Option", onchange: (ev) => {
                    //console.log(ev);
                    this.selectedItems = OType == "checkbox" ? this.selectedItems : [];
                    const control = ev.target;
                    const index = this.selectedItems.indexOf(element);
                    if (index == -1 && control.checked == true) {
                        this.NameSelected = element.name;
                        this.FieldName = element.FieldName;
                        this.SubOptionsFieldName = element.SubOptionsFieldName;
                        if (WArrayF.FindInArray(element, this.selectedItems) == false) {
                            this.selectedItems.push(element);
                        } else {
                            console.log("Item Existente")
                        }
                    } else {
                        this.selectedItems.splice(index, 1);
                        if (this.selectedItems.length == 0) {
                            this.NameSelected = "";
                            this.FieldName = "";
                            this.SubOptionsFieldName = "";
                        }
                    }
                    this.DrawLabel();
                }
            });
            //OptionLabel.append(Option);
            const SubContainer = WRender.Create({ className: "SubMenu" });
            if (element.SubOptions != undefined && element.SubOptions.__proto__ == Array.prototype) {
                element.SubMultiSelect = new MultiSelect({
                    Dataset: element.SubOptions,
                    SubFunction: () => {
                        //pendiente
                    }
                }, new WStyledRender(SubMenu));
                element.selectedItems = element.SubMultiSelect.selectedItems;
                SubContainer.append(element.SubMultiSelect);                
            }
            this.OptionsContainer.append(WRender.Create({
                className: "OContainer",
                children: [OptionLabel, Option, SubContainer]
            }));
        });
    }
    DrawLabel = () => {
        this.LabelMultiselect.innerHTML = "Selecteds: "
        this.selectedItems.forEach(element => {
            const LabelM = WRender.Create({
                tagName: "label",
                innerText: element.Descripcion,
            });
            this.LabelMultiselect.append(LabelM);
            if (this.MultiSelect == true) {
                LabelM.append(WRender.Create({
                    tagName: "button", innerText: "x", onclick: () => {
                        const index = this.selectedItems.indexOf(element);
                        this.selectedItems.splice(index, 1);
                        if (this.selectedItems.length == 0) {
                            this.NameSelected = "";
                            this.FieldName = "";
                            this.SubOptionsFieldName = "";
                        }
                        this.DrawLabel();
                        this.shadowRoot.querySelector("#OType" + element.id_).checked = false;
                    }
                }));                
            }

        });
    }
}
customElements.define("w-multi-select", MultiSelect);
export { MultiSelect }
const MainMenu = {
    ClassList: [
        new WCssClass(`.LabelMultiselect`, {
            padding: "0px 10px",
            background: "#f1f1f1",
            display: "flex",
            "align-items": "center",
            "min-height": 40,
            "border-bottom": "#c3c3c3 solid 1px",
            cursor: "pointer",
            height: "100%"            
        }),new WCssClass(`.LabelMultiselect label`, {
            padding: "5px 10px",
            "border-radius": "0.3cm",
            "background-color": "#009f97",
            color: "#fff",
            "font-size": 11,
            overflow: "hidden"
        }), new WCssClass(`.LabelMultiselect label button`, {
            padding: "0px 5px",
            border: "none",
            "margin-left": 10,
            cursor: "pointer",
            "border-left": "solid 2px #062e2c",
            "background": "none",
        }),  new WCssClass(`.OptionsContainer`, {
            "max-height": 0,
            "overflow-y": "auto",
            transition: "all 1s",
            "z-index": "100",
            width: "100%",
            position: "absolute",
            "box-shadow": "0 0 4px 0 rgb(0,0,0,50%)",
        }),  new WCssClass(`.MenuActive`, {
            "max-height": 500,
        }), new WCssClass(`.OContainer`, {
            transition: "all 0.6s",
            cursor: "pointer",
            display: "grid",
            background: "#fff",
            "border-bottom": "solid 1px #eee",
            "grid-template-columns": "calc(100% - 20px) 20px",
            "grid-row": "auto auto",
            "align-items": "center"
        }), new WCssClass(`.OContainer:hover`, {
            background: "#eee"
        }), new WCssClass(`.OptionLabel`, {
            width: "100%",
            cursor: "pointer",
            padding: "10px 10px",
        }), new WCssClass(".SubMenu", {
            "max-height": 0,            
            width: "100%",
            "grid-column": "1/3",
            "background-color": "rgb(0,0,0,35%)",
            transition: "all 0.6s",
            overflow: "hidden",
        }), new WCssClass(".SubMenu w-multi-select:first-child", {           
            margin: 10,
        }), new WCssClass(".Option:checked ~ .SubMenu", {
            //display: "block",            
            "max-height": 500,
        })
    ]
}
const SubMenu = {
    ClassList: [
        new WCssClass(`.OptionsContainer`, {
            "max-height": 500,
            position: "relative",
            "box-shadow": "none",           
        })
    ]
}