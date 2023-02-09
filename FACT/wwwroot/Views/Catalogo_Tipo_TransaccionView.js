import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { Catalogo_Tipo_Transaccion } from "../FrontModel/DBODataBaseModel.js"
class Catalogo_Tipo_TransaccionView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new Catalogo_Tipo_Transaccion(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogo_Tipo_Transaccion",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogo_Tipo_Transaccion",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogo_Tipo_Transaccion"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogo_tipo_transaccion', Catalogo_Tipo_TransaccionView );
window.addEventListener('load', async () => {  MainBody.append(new Catalogo_Tipo_TransaccionView())  })
