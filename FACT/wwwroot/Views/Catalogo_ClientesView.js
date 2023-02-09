import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { Catalogo_Clientes } from "../FrontModel/DBODataBaseModel.js"
class Catalogo_ClientesView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new Catalogo_Clientes(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogo_Clientes",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogo_Clientes",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogo_Clientes"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogo_clientes', Catalogo_ClientesView );
window.addEventListener('load', async () => {  MainBody.append(new Catalogo_ClientesView())  })
