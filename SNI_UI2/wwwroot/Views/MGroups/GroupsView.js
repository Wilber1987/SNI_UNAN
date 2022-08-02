import { WRender, WArrayF, ComponentsManager, WAjaxTools, GenerateColor } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import { WArticlesComponent } from "../../WDevCore/WComponents/WArticlesComponent.js";
import { AsideV1 } from "../../AppComponents/AsideV1.js";
import { WCard } from '../../WDevCore/WComponents/WCardCarousel.js';
import { ActionFunction, ModalComp } from '../Home.js';
import { Tbl_Grupos } from '../../Model/ModelDatabase.js';
class GroupView extends HTMLElement {
    constructor() {
        super();
        this.ViewMisGruposContainer = WRender.Create({ class: 'ViewProyectsContainer' });
        this.ViewGruposContainer = WRender.Create({ class: 'ViewProyectsContainer' });
        this.append(
            this.Style,
            WRender.CreateStringNode("<div><h3 class='HeaderDis'>Mis Grupos</h3><hr></div>"),
            this.ViewMisGruposContainer,
            WRender.CreateStringNode("<div><h3 class='HeaderDis'>Grupos</h3><hr></div>"),
            this.ViewGruposContainer
        );
        this.DrawGroupView();
    }
    connectedCallback() { }
    DrawGroupView = async () => {
        const MisGrupos = await WAjaxTools.PostRequest("../api/Group/GetGruposInvestigador");
        const Grupos = await WAjaxTools.PostRequest("../api/Group/GetGroups");
        MisGrupos.forEach(group => {
            this.ViewMisGruposContainer.append(this.GroupDiv(group))
        });
    }
    GroupDiv = (group = (new Tbl_Grupos())) => {
        const GrupoDiv = WRender.Create({
            className: "GroupDiv",
            children: [
                WRender.Create({ tagName: "h4", innerText: group.Description })
            ]
        })
        return GrupoDiv;
    }
    Style = new WStyledRender({
        ClassList: [
            new WCssClass(`.ViewProyectsContainer, .ViewProyectsContainer`, {
                display: 'flex',
            }), new WCssClass(`.GroupDiv`, {
                width: 250,
                padding: 10,
                margin: 10,
                background: GenerateColor(),
                "border-radius": 5
            }),
        ], MediaQuery: [{
            condicion: '(max-width: 600px)',
            ClassList: []
        },
        ]
    });
}
customElements.define('w-group_view', GroupView);
export { GroupView }