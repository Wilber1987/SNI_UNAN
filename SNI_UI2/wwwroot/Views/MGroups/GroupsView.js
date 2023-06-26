import { WRender, WAjaxTools, GenerateColor, ComponentsManager } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { Tbl_Grupos } from '../../Model/ModelDatabase.js';
import { WAppNavigator } from '../../WDevCore/WComponents/WAppNavigator.js';
class GroupView extends HTMLElement {
    constructor() {
        super(); 
        this.attachShadow({ mode: 'open' });
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.DOMManager = new ComponentsManager({ MainContainer: this.TabContainer });  
        this.shadowRoot.append(
            this.Style,
            StylesControlsV2.cloneNode(true),
            this.GruposNav,
            this.TabContainer
        );
        this.DrawGroupView();
    }
    connectedCallback() { }
    DrawGroupView = async () => {
        
    }
    GroupDiv = (group = (new Tbl_Grupos()), type = "RECOMENDACION") => {
        const GrupoDiv = WRender.Create({
            className: "GroupDiv",
            style: {
                backgroundColor: group.color
            }, children: [
                WRender.Create({ tagName: "h4", innerText: group.Nombre, style: { background: type == "RECOMENDACION" ? "#044f8f": undefined} }),
                WRender.Create({ tagName: "P", innerText: group.Descripcion }),
                WRender.Create({ tagName: "label", innerText: "Tipo: " + group.Cat_TipoGrupo?.Descripcion }),
                WRender.Create({ tagName: "h5", innerText: "Instituciones" }),
                WRender.Create({ tagName: "InstitucionesACont", children: group.Tbl_InstitucionesAsociadasGrupos?.map(I => ({ tagName: 'img',
                 src: "/Media/Instituciones/"+I.Cat_instituciones?.Logo })) }),
                WRender.Create({ tagName: "h5", innerText: "Miembros" }),
                WRender.Create({
                    tagName: "InvestigadoresACont", children: group.Tbl_InvestigadoresAsociados?.map(I => ({
                        tagName: 'img',
                        src: "/Media/Image/" + I.Tbl_InvestigatorProfile?.Foto
                    }))
                }),
            ]
        })
        //OPTIONS
        switch (type) {
            case "MIEMBRO":
                // GrupoDiv.appendChild(WRender.Create({
                //     className: "GroupOptions", children: [
                //         {
                //             tagName: 'input', type: 'button', className: 'Btn', value: 'Ver...', onclick: async () => {
                //                 //code.....
                //             }
                //         }
                //     ]
                // }))
                break;
            case "RECOMENDACION":
                GrupoDiv.appendChild(WRender.Create({
                    className: "GroupOptions", children: [
                       /*  {
                            tagName: 'input', type: 'button', className: 'Btn', value: 'Detalles', onclick: async () => {
                                //code.....
                            }
                        }, */ {
                            tagName: 'input', type: 'button', className: 'BtnSuccess', value: 'Unirse', onclick: async () => {
                                //code.....
                            }
                        }
                    ]
                }))
                break;
        }
        return GrupoDiv;
    }
    GruposNav = new WAppNavigator({
        NavStyle: "tab",
        title: "Menu",
        Inicialize: true,
        Elements: [
            {
                name: "MIS GRUPOS", url: "#",
                action: async (ev) => {
                    const MisGrupos = await WAjaxTools.PostRequest("../api/Group/GetGruposInvestigador");
                    const GruposContainer = WRender.Create({ class: 'ViewProyectsContainer' });
                    MisGrupos.forEach(group => {
                        GruposContainer.append(this.GroupDiv(group, "MIEMBRO"))
                    });
                    this.DOMManager.NavigateFunction("Tab-mis-grupos", GruposContainer, "TabContainer");
                }
            }, {
                name: "RECOMENDADOS", url: "#",
                action: async (ev) => {
                    const Grupos = await WAjaxTools.PostRequest("../api/Group/GetRecomendedGroups");
                    const GruposContainer = WRender.Create({ class: 'ViewProyectsContainer' });
                    Grupos.forEach(group => {
                        GruposContainer.append(this.GroupDiv(group, "RECOMENDACION"))
                    });
                    this.DOMManager.NavigateFunction("Tab-grupos", GruposContainer, "TabContainer");
                }
            }
        ]
    })
    Style = new WStyledRender({
        ClassList: [
            new WCssClass(`.ViewProyectsContainer, .ViewProyectsContainer`, {
                display: 'flex',
                "flex-wrap": "wrap"
            }), new WCssClass(`.GroupDiv`, {
                width: "100%",
                padding: 0,
                margin: 10,
                background: "#eee",
                "box-shadow": "0 0 3px 0 rgba(0,0,0,0.5)",
                "border-radius": 5,
                display: "flex",
                "justify-content": "flex-start",
                "flex-direction": "column",
                "align-items": "flex-start",
                color: "#2e2e2e",
                background: "#fff",
                "text-align": "justify",
                overflow: "hidden"
            }), new WCssClass(`.GroupDiv *`, {
                margin: 0, padding: "10px 30px", 
            }), new WCssClass(`.GroupDiv h4`, {
                margin: 0, "margin-bottom": 20, padding: 20, 
                display: "flex",
                width: "calc(100% - 40px)",
                "justify-content": "center",
                "flex-direction": "row",
                "align-items": "center",
                color: "#fff",
                background: "#468f04"
            }), new WCssClass(`.GroupDiv img`, { 
                padding: 0,
                height: 50, width: 50,   "border-radius": "50%",
                margin: 10, overflow: "hidden",  "box-shadow": "0 0 3px 0 rgba(0,0,0,0.5)"
            }),new WCssClass(`.GroupOptions`, {
                display: "flex",
                width: "calc(100% - 60px)",
                "justify-content": "flex-end",
                "flex-direction": "row",
                "align-items": "center",
                "border-top": "solid 1px #999"
            }),
        ], MediaQuery: [{
            condicion: '(max-width: 600px)',
            ClassList: []
        }]
    });
}
customElements.define('w-group_view', GroupView);
export { GroupView }