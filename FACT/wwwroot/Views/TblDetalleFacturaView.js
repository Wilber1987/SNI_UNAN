import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
class TblDetalleFacturaView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new TblDetalleFactura(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/Admin/saveTblDetalleFactura",
           Edit: true, UrlUpdate: "../api/Admin/updateTblDetalleFactura",
           Search: true, UrlSearch: "../api/Admin/getTblDetalleFactura"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
export { TblDetalleFacturaView }
window.addEventListener('load', async () => {  MainBody.append(new TblDetalleFacturaView())  }
