import { HomeClass } from "./Views/Home.js";
import { WRender, WAjaxTools } from "./WDevCore/WModules/WComponentsTools.js";
import { AsideV1 } from "./AppComponents/AsideV1.js";
import {MasterDomDetaills  } from "./MasterDomDetaills.js";

const OnLoad = async () => {
    const response =  await WAjaxTools.PostRequest("api/Investigaciones/TakeInvestigaciones");    
    const BodyComponents = new MasterDomDetaills(new HomeClass(response[0]), new AsideV1(response[1]));
    App.appendChild(WRender.createElement(BodyComponents));

}
window.onload = OnLoad;