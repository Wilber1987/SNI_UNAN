import { WRender, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV2, StyleScrolls } from "../WDevCore/StyleModules/WStyleComponents.js"
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js"
class CatalogoAlmacenView extends HTMLElement {
   constructor(props) {
       super();
       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })
       this.MainComponent = new WTableComponent({ ModelObject: new CatalogoAlmacen(), Dataset: [], Options: {
           Add: true, UrlAdd: "../api/Admin/saveCatalogoAlmacen",
           Edit: true, UrlUpdate: "../api/Admin/updateCatalogoAlmacen",
           Search: true, UrlSearch: "../api/Admin/getCatalogoAlmacen"
       }})
       this.TabContainer.append(this.MainComponent)
       this.append(
           StylesControlsV2.cloneNode(true),
           StyleScrolls.cloneNode(true),
           this.TabContainer
       );
   }
}
export { CatalogoAlmacenView }
window.addEventListener('load', async () => {  MainBody.append(new CatalogoAlmacenView())  }
