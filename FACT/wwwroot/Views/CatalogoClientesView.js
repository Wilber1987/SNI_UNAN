import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { CatalogoClientes } from "../FrontModel/DBODataBaseModel.js"
class CatalogoClientesView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new CatalogoClientes(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogoClientes",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogoClientes",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogoClientes"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogoclientes', CatalogoClientesView );
window.addEventListener('load', async () => {  MainBody.append(new CatalogoClientesView())  })
