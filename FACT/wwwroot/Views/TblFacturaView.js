import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { TblFactura } from "../FrontModel/DBODataBaseModel.js"
class TblFacturaView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new TblFactura(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveTblFactura",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateTblFactura",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getTblFactura"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-tblfactura', TblFacturaView );
window.addEventListener('load', async () => {  MainBody.append(new TblFacturaView())  })
