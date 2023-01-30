import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { CatalogoProducto } from "../FrontModel/DBODataBaseModel.js"
class CatalogoProductoView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new CatalogoProducto(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogoProducto",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogoProducto",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogoProducto"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogoproducto', CatalogoProductoView );
window.addEventListener('load', async () => {  MainBody.append(new CatalogoProductoView())  })
