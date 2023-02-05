import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { CatalogoTipoDetalleLote } from "../FrontModel/DBODataBaseModel.js"
class CatalogoTipoDetalleLoteView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new CatalogoTipoDetalleLote(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogoTipoDetalleLote",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogoTipoDetalleLote",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogoTipoDetalleLote"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogotipodetallelote', CatalogoTipoDetalleLoteView );
window.addEventListener('load', async () => {  MainBody.append(new CatalogoTipoDetalleLoteView())  })
