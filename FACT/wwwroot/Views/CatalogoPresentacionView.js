import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { CatalogoPresentacion } from "../FrontModel/DBODataBaseModel.js"
class CatalogoPresentacionView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new CatalogoPresentacion(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogoPresentacion",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogoPresentacion",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogoPresentacion"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogopresentacion', CatalogoPresentacionView );
window.addEventListener('load', async () => {  MainBody.append(new CatalogoPresentacionView())  })