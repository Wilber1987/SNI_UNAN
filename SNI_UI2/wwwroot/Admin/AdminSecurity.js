import { WAppNavigator } from "../WDevCore/WComponents/WAppNavigator.js";
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../WDevCore/StyleModules/WStyleComponents.js";
import { Security_Permissions, Security_Roles, Security_Users } from "../Model/SecurityModel.js";
window.addEventListener("load", async () => {
    const DOMManager = new ComponentsManager({ MainContainer: Main });
    const Roles = await WAjaxTools.PostRequest("../api/ApiEntitySECURITY/getSecurity_Roles", {});
    const Permisos = await WAjaxTools.PostRequest("../api/ApiEntitySECURITY/getSecurity_Permissions", {});
    Main.append(WRender.createElement(StylesControlsV2));
    Aside.append(WRender.Create({tagName: "h3", innerText: "Mantenimiento de Usuarios"}));
    Aside.append(new WAppNavigator({
       
        Direction: "column",
        Elements: [
            ElementTab("Roles", DOMManager, new Security_Roles({
                Security_Permissions_Roles: { type: "multiselect", Dataset: Permisos }
            })),
            ElementTab("Permisos", DOMManager, new Security_Permissions()),
            ElementTab("Usuarios", DOMManager, new Security_Users({
                Security_Users_Roles: { type: "multiselect", Dataset: Roles }
            })),
        ]
    }));
});
function ElementTab(TabName = "Tab", DOMManager, Model) {
    return {
        name: TabName, url: "#",
        action: async (ev) => {
            let response = await WAjaxTools.PostRequest("../api/ApiEntitySECURITY/get" + Model.constructor.name, {});
            if (TabName == "Usuarios") {
                response = response.map(u => {
                    u.Security_Users_Roles = u.Security_Users_Roles?.map(r => r.Security_Role);
                    return u;
                })
            } else if (TabName == "Roles") {
                response = response.map(r => {
                    r.Security_Permissions_Roles = r.Security_Permissions_Roles?.map(p => p.Security_Permissions);
                    return r;
                })
            }
            DOMManager.NavigateFunction(Model.constructor.name, new WTableComponent({
                Dataset: response,
                ModelObject: Model,
                Options: {
                    Add: TabName != "Permisos", UrlAdd: "../api/ApiEntitySECURITY/save" + Model.constructor.name,
                    Edit: TabName != "Permisos", UrlUpdate: "../api/ApiEntitySECURITY/save" + Model.constructor.name,
                    Search: true, UrlSearch: "../api/ApiEntitySECURITY/get" + Model.constructor.name,
                }
            }));
        }
    };
}
