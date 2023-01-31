import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { CatalogoCategorias } from "../FrontModel/DBODataBaseModel.js"
class CatalogoCategoriasView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new CatalogoCategorias(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogoCategorias",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogoCategorias",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogoCategorias"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogocategorias', CatalogoCategoriasView );
window.addEventListener('load', async () => {  MainBody.append(new CatalogoCategoriasView())  })
