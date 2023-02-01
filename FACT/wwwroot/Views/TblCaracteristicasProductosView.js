import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { TblCaracteristicasProductos } from "../FrontModel/DBODataBaseModel.js"
class TblCaracteristicasProductosView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new TblCaracteristicasProductos(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveTblCaracteristicasProductos",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateTblCaracteristicasProductos",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getTblCaracteristicasProductos"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-tblcaracteristicasproductos', TblCaracteristicasProductosView );
window.addEventListener('load', async () => {  MainBody.append(new TblCaracteristicasProductosView())  })