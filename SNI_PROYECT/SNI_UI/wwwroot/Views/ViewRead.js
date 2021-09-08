import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
const OnLoad = async () => {
    const { WRender } = await import("../WDevCore/WModules/WComponentsTools.js");
    const modules = await import("../MasterDomDetaills.js");
    const BodyComponents = new modules.MasterDomDetaills(new WReadInvestigacion());
    App.appendChild(WRender.createElement(BodyComponents));
}
class WReadInvestigacion extends HTMLElement {
    constructor() { super(); }
    connectedCallback() { DrawComponent(); }
    DrawComponent = async () => {

    }
}
customElements.define('w-view', WReadInvestigacion);
window.onload = OnLoad;