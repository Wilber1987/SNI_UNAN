import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
class TblCaracteristicasProductosView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new TblCaracteristicasProductos(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/Admin/saveTblCaracteristicasProductos",
           Edit: true, UrlUpdate: "../api/Admin/updateTblCaracteristicasProductos",
           Search: true, UrlSearch: "../api/Admin/getTblCaracteristicasProductos"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
export { TblCaracteristicasProductosView }
window.addEventListener('load', async () => {  MainBody.append(new TblCaracteristicasProductosView())  }
