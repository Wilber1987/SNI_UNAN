import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { sysdiagrams } from "../FrontModel/DBODataBaseModel.js"
class sysdiagramsView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new sysdiagrams(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/savesysdiagrams",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updatesysdiagrams",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getsysdiagrams"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-sysdiagrams', sysdiagramsView );
window.addEventListener('load', async () => {  MainBody.append(new sysdiagramsView())  })
