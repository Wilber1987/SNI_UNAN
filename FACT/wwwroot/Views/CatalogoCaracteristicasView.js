import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
import { CatalogoCaracteristicas } from "../FrontModel/DBODataBaseModel.js"
class CatalogoCaracteristicasView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new CatalogoCaracteristicas(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/ApiEntityDBO/saveCatalogoCaracteristicas",
           Edit: true, UrlUpdate: "../api/ApiEntityDBO/updateCatalogoCaracteristicas",
           Search: true, UrlSearch: "../api/ApiEntityDBO/getCatalogoCaracteristicas"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
customElements.define('w-catalogocaracteristicas', CatalogoCaracteristicasView );
window.addEventListener('load', async () => {  MainBody.append(new CatalogoCaracteristicasView())  })
