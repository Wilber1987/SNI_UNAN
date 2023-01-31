import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { CatalogoTipoDetalle } from "../FrontModel/DBODataBaseModel.js"
class CatalogoTipoDetalleView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new CatalogoTipoDetalle(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogoTipoDetalle",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogoTipoDetalle",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogoTipoDetalle"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogotipodetalle', CatalogoTipoDetalleView );
window.addEventListener('load', async () => {  MainBody.append(new CatalogoTipoDetalleView())  })
