import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { DetailLotes } from "../FrontModel/DBODataBaseModel.js"
class DetailLotesView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new DetailLotes(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveDetailLotes",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateDetailLotes",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getDetailLotes"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-detaillotes', DetailLotesView );
window.addEventListener('load', async () => {  MainBody.append(new DetailLotesView())  })
