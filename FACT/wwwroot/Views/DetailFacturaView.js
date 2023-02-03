import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { DetailFactura } from "../FrontModel/DBODataBaseModel.js"
class DetailFacturaView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new DetailFactura(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveDetailFactura",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateDetailFactura",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getDetailFactura"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-detailfactura', DetailFacturaView );
window.addEventListener('load', async () => {  MainBody.append(new DetailFacturaView())  })
