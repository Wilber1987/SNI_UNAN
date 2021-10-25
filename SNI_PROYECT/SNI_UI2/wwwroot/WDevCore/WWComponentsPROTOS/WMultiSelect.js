import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class MultiSelect extends HTMLElement{
    constructor(){
        super();
    }
    attributeChangedCallBack() {
        this.Draw();
    }
    connectedCallback() {
        if (this.innerHTML != "") {            
            return;
        }
        this.Draw();
    }   
    Draw(){
        
    }
}
customElements.define("w-multi-select", MultiSelect);