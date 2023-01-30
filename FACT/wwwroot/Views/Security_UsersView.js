import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
class Security_UsersView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new Security_Users(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntitySECURITY/saveSecurity_Users",
           Edit: true, UrlUpdate: "../api/ApiEntitySECURITY/updateSecurity_Users",
           Search: true, UrlSearch: "../api/ApiEntitySECURITY/getSecurity_Users"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
export { Security_UsersView }
window.addEventListener('load', async () => {  MainBody.append(new Security_UsersView())  })
