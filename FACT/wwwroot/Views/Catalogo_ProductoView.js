import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { Catalogo_Producto } from "../FrontModel/DBODataBaseModel.js"
class Catalogo_ProductoView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new Catalogo_Producto(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogo_Producto",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogo_Producto",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogo_Producto"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogo_producto', Catalogo_ProductoView );
window.addEventListener('load', async () => {  MainBody.append(new Catalogo_ProductoView())  })
