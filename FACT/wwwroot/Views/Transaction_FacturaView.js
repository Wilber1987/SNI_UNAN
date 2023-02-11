import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { Transaction_Factura } from "../FrontModel/DBODataBaseModel.js"
class Transaction_FacturaView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new Transaction_Factura(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveTransaction_Factura",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateTransaction_Factura",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getTransaction_Factura"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-transaction_factura', Transaction_FacturaView );
window.addEventListener('load', async () => {  MainBody.append(new Transaction_FacturaView())  })
