import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { DetailCaracteristicasProductos } from "../FrontModel/DBODataBaseModel.js"
class DetailCaracteristicasProductosView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new DetailCaracteristicasProductos(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveDetailCaracteristicasProductos",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateDetailCaracteristicasProductos",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getDetailCaracteristicasProductos"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-detailcaracteristicasproductos', DetailCaracteristicasProductosView );
window.addEventListener('load', async () => {  MainBody.append(new DetailCaracteristicasProductosView())  })
