import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
class TblDetalleLotesView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new TblDetalleLotes(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/Admin/saveTblDetalleLotes",
           Edit: true, UrlUpdate: "../api/Admin/updateTblDetalleLotes",
           Search: true, UrlSearch: "../api/Admin/getTblDetalleLotes"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
export { TblDetalleLotesView }
window.addEventListener('load', async () => {  MainBody.append(new TblDetalleLotesView())  }
