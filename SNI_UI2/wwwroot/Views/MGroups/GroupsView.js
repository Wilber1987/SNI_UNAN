import { WRender, WAjaxTools, GenerateColor } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import {StylesControlsV2} from "../../WDevCore/StyleModules/WStyleComponents.js";
import { Tbl_Grupos } from '../../Model/ModelDatabase.js';
class GroupView extends HTMLElement {
    constructor() {
        super();
        this.ViewMisGruposContainer = WRender.Create({ class: 'ViewProyectsContainer' });
        this.ViewGruposContainer = WRender.Create({ class: 'ViewProyectsContainer' });
        this.append(
            this.Style,
            WRender.createElement(StylesControlsV2),
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
            this.ViewMisGruposContainer.append(this.GroupDiv(group, "MIEMBRO"))
        });
        Grupos.filter(x=> MisGrupos.filter(mx => mx.Id_Grupo == x.Id_Grupo).length == 0).forEach(group => {
            this.ViewGruposContainer.append(this.GroupDiv(group))
        });
        /*this.ViewGruposContainer.append(new WArticlesComponent({
            Dataset: Grupos.filter(x=> MisGrupos.filter(mx => mx.Id_Grupo == x.Id_Grupo).length == 0)
        }))*/
    }
    GroupDiv = (group = (new Tbl_Grupos()), type = "RECOMENDACION") => {
        const GrupoDiv = WRender.Create({
            className: "GroupDiv",
            style: {
                backgroundColor: group.color
            },children: [
                WRender.Create({ tagName: "h4", innerText: group.Descripcion })
            ]
        })
        switch (type) {
            case "MIEMBRO":
                GrupoDiv.appendChild(WRender.Create({className: "GroupOptions", children: [
                    { tagName:'input',  type:'button', className: 'Btn', value: 'Ver...', onclick: async ()=>{
                        //code.....
                    }}
                ]}))                
                break;        
            case "RECOMENDACION":
                GrupoDiv.appendChild(WRender.Create({className: "GroupOptions", children: [
                    { tagName:'input',  type:'button', className: 'Btn', value: 'Detalles', onclick: async ()=>{
                        //code.....
                    }},{ tagName:'input',  type:'button', className: 'BtnSuccess', value: 'Unirse', onclick: async ()=>{
                        //code.....
                    }}
                ]}))
                break;
        }
        return GrupoDiv;
    }
    Style = new WStyledRender({
        ClassList: [
            new WCssClass(`.ViewProyectsContainer, .ViewProyectsContainer`, {
                display: 'flex',
                "flex-wrap": "wrap"
            }), new WCssClass(`.GroupDiv`, {
                width: 250,
                padding: 10,
                margin: 10,
                background: "#eee",
                "box-shadow": "0 0 3px 0 rgba(0,0,0,0.5)",
                "border-radius": 5,
                display: "flex",
                "justify-content": "center",
                "flex-direction": "column",
                "align-items": "center"
            }),new WCssClass(`.GroupOptions`, {                
                display: "flex",
                "justify-content": "center",
                "flex-direction": "column",
                "align-items": "center"
            }),
        ], MediaQuery: [{
            condicion: '(max-width: 600px)',
            ClassList: []
        }]
    });
}
customElements.define('w-group_view', GroupView);
export { GroupView }