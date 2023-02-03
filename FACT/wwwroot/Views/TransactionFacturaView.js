import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { TransactionFactura } from "../FrontModel/DBODataBaseModel.js"
class TransactionFacturaView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new TransactionFactura(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveTransactionFactura",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateTransactionFactura",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getTransactionFactura"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-transactionfactura', TransactionFacturaView );
window.addEventListener('load', async () => {  MainBody.append(new TransactionFacturaView())  })
