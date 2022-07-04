import { WAppNavigator } from "../WDevCore/WComponents/WAppNavigator.js";
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../WDevCore/StyleModules/WStyleComponents.js";
import { Security_Permissions, Security_Roles, Security_Users } from "../Model/SecurityModel.js";
window.addEventListener("load", async () => {
    const DOMManager = new ComponentsManager({ MainContainer: Main });
    const Roles = await WAjaxTools.PostRequest("../api/Admin/TakeSecurity_Roles", {});
    const Permisos = await WAjaxTools.PostRequest("../api/Admin/TakeSecurity_Permissions", {});
    Main.append(WRender.createElement(StylesControlsV2));
    Aside.append(WRender.Create({tagName: "h3", innerText: "Mantenimiento de Usuarios"}));
    Aside.append(new WAppNavigator({
        DarkMode: true,
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
            const response = await WAjaxTools.PostRequest("../api/Admin/Take" + Model.constructor.name, {});
            DOMManager.NavigateFunction(Model.constructor.name, new WTableComponent({
                Dataset: response,
                ModelObject: Model,
                Options: {
                    Add: true, UrlAdd: "../api/Admin/Save" + Model.constructor.name,
                    Edit: true, UrlUpdate: "../api/Admin/Save" + Model.constructor.name,
                    Search: true, UrlSearch: "../api/Admin/Take" + Model.constructor.name,
                }
            }));
        }
    };
}
