import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { TransactionEgresosLotes } from "../FrontModel/DBODataBaseModel.js"
class TransactionEgresosLotesView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new TransactionEgresosLotes(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveTransactionEgresosLotes",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateTransactionEgresosLotes",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getTransactionEgresosLotes"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-transactionegresoslotes', TransactionEgresosLotesView );
window.addEventListener('load', async () => {  MainBody.append(new TransactionEgresosLotesView())  })
