import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
const OnLoad = async () => {
    const Id_Investigacion = new URLSearchParams(window.location.search).get('param');
    const { WRender } = await import("../WDevCore/WModules/WComponentsTools.js");
    const modules = await import("../MasterDomDetaills.js");
    const BodyComponents = new modules.MasterDomDetaills(new WReadInvestigacion(Id_Investigacion));
    App.appendChild(WRender.createElement(BodyComponents));
}
class WReadInvestigacion extends HTMLElement {
    constructor(Id) {
        super();
        this.Id_Investigacion = Id;
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        } 
        this.DrawComponent();
    }
    DrawComponent = async () => {
        const response = WAjaxTools.PostRequest("api/Investigaciones/TakeInvestigacion",
            { Id_Investigacion: this.Id_Investigacion }
        );
        console.log(response);
    }
}
customElements.define('w-view', WReadInvestigacion);
window.onload = OnLoad;