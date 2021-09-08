import { HomeClass } from "./Views/Home.js";
const OnLoad = async() => {
    const { WRender } = await import ("./WDevCore/WModules/WComponentsTools.js");
    const modules = await import ("./MasterDomClass.js");
    const BodyComponents = new modules.MasterDomClass(new HomeClass);
    App.appendChild(WRender.createElement(BodyComponents));
}

window.onload = OnLoad;