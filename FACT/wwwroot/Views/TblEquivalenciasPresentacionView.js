import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { TblEquivalenciasPresentacion } from "../FrontModel/DBODataBaseModel.js"
class TblEquivalenciasPresentacionView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new TblEquivalenciasPresentacion(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveTblEquivalenciasPresentacion",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateTblEquivalenciasPresentacion",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getTblEquivalenciasPresentacion"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-tblequivalenciaspresentacion', TblEquivalenciasPresentacionView );
window.addEventListener('load', async () => {  MainBody.append(new TblEquivalenciasPresentacionView())  })
