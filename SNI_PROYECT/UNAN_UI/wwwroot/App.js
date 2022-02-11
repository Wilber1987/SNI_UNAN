import { HomeView } from "./Views/HomeView.js";
import { WRender, WAjaxTools } from "./WDevCore/WModules/WComponentsTools.js";
import { Layout  } from "./Layout.js";

const OnLoad = async () => {
    const response =  await WAjaxTools.PostRequest("api/Investigaciones/TakeInvestigaciones");    
    const BodyComponents = new Layout(new HomeView());
    App.appendChild(WRender.createElement(BodyComponents));

}
window.onload = OnLoad;