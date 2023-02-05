import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { RelationalTbl_EquivalenciasPresentacion } from "../FrontModel/DBODataBaseModel.js"
class RelationalTbl_EquivalenciasPresentacionView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new RelationalTbl_EquivalenciasPresentacion(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveRelationalTbl_EquivalenciasPresentacion",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateRelationalTbl_EquivalenciasPresentacion",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getRelationalTbl_EquivalenciasPresentacion"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-relationaltbl_equivalenciaspresentacion', RelationalTbl_EquivalenciasPresentacionView );
window.addEventListener('load', async () => {  MainBody.append(new RelationalTbl_EquivalenciasPresentacionView())  })
