import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { TransactionLotes } from "../FrontModel/DBODataBaseModel.js"
class TransactionLotesView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new TransactionLotes(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveTransactionLotes",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateTransactionLotes",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getTransactionLotes"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-transactionlotes', TransactionLotesView );
window.addEventListener('load', async () => {  MainBody.append(new TransactionLotesView())  })
