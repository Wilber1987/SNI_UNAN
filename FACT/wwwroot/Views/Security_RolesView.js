import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
class Security_RolesView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new Security_Roles(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntitySECURITY/saveSecurity_Roles",
           Edit: true, UrlUpdate: "../api/ApiEntitySECURITY/updateSecurity_Roles",
           Search: true, UrlSearch: "../api/ApiEntitySECURITY/getSecurity_Roles"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
export { Security_RolesView }
window.addEventListener('load', async () => {  MainBody.append(new Security_RolesView())  })
