import { WRender, WArrayF, ComponentsManager, WAjaxTools, GenerateColor } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import { WArticlesComponent } from "../../WDevCore/WComponents/WArticlesComponent.js";
import { AsideV1 } from "../../AppComponents/AsideV1.js";
import { WCard } from '../../WDevCore/WComponents/WCardCarousel.js';
import { ActionFunction, ModalComp } from '../Home.js';
class GroupView extends HTMLElement {
    constructor() {
        super();
        this.ViewMisGruposContainer = WRender.Create({ class: 'ViewProyectsContainer' });
        this.ViewGruposContainer = WRender.Create({ class: 'ViewProyectsContainer' });
        this.append(
            WRender.CreateStringNode("<div><h3 class='HeaderDis'>Mis Grupos</h3><hr></div>"),
            this.ViewMisGruposContainer,
            WRender.CreateStringNode("<div><h3 class='HeaderDis'>Grupos</h3><hr></div>"),
            this.ViewGruposContainer
        );
        this.DrawGroupView();
    }
    connectedCallback() {  }
    DrawGroupView = async () => {
        const MisGrupos = await WAjaxTools.PostRequest("../api/Group/GetGruposInvestigador");
        const Grupos = await WAjaxTools.PostRequest("../api/Group/GetGroups");
                            
    }
}
customElements.define('w-group_view', GroupView);
export { GroupView }