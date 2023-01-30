import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
class Security_Permissions_RolesView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new Security_Permissions_Roles(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntitySECURITY/saveSecurity_Permissions_Roles",
           Edit: true, UrlUpdate: "../api/ApiEntitySECURITY/updateSecurity_Permissions_Roles",
           Search: true, UrlSearch: "../api/ApiEntitySECURITY/getSecurity_Permissions_Roles"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
export { Security_Permissions_RolesView }
window.addEventListener('load', async () => {  MainBody.append(new Security_Permissions_RolesView())  })
