import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { Catalogo_Oferta_Especial } from "../FrontModel/DBODataBaseModel.js"
class Catalogo_Oferta_EspecialView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new Catalogo_Oferta_Especial(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogo_Oferta_Especial",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogo_Oferta_Especial",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogo_Oferta_Especial"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogo_oferta_especial', Catalogo_Oferta_EspecialView );
window.addEventListener('load', async () => {  MainBody.append(new Catalogo_Oferta_EspecialView())  })
