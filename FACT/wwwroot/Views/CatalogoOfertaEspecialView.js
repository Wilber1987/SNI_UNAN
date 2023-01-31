import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { CatalogoOfertaEspecial } from "../FrontModel/DBODataBaseModel.js"
class CatalogoOfertaEspecialView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new CatalogoOfertaEspecial(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogoOfertaEspecial",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogoOfertaEspecial",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogoOfertaEspecial"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogoofertaespecial', CatalogoOfertaEspecialView );
window.addEventListener('load', async () => {  MainBody.append(new CatalogoOfertaEspecialView())  })
