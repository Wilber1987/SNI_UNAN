import { HomeClass } from "./Views/Home.js";
import { WCssClass } from "./WDevCore/WModules/WStyledRender.js";
import { WRender, WAjaxTools } from "./WDevCore/WModules/WComponentsTools.js";
import { AsideV1 } from "./AppComponents/AsideV1.js";
import { WSecurity } from "./WDevCore/WModules/WSecurity.js";

const OnLoad = async () => {
    //const { WRender, WAjaxTools } = await import("./WDevCore/WModules/WComponentsTools.js");
    const response =  await WAjaxTools.PostRequest("api/Investigaciones/TakeInvestigaciones");    
    const modules = await import("./MasterDomDetaills.js");
    const BodyComponents = new modules.MasterDomDetaills(new HomeClass(response[0]), new AsideV1(response[1]));
    App.appendChild(WRender.createElement(BodyComponents));

}
window.onload = OnLoad;