import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { Transaction_Lotes } from "../FrontModel/DBODataBaseModel.js"
class Transaction_LotesView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new Transaction_Lotes(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveTransaction_Lotes",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateTransaction_Lotes",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getTransaction_Lotes"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-transaction_lotes', Transaction_LotesView );
window.addEventListener('load', async () => {  MainBody.append(new Transaction_LotesView())  })
