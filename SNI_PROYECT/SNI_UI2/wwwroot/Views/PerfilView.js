import { AsideV1 } from "../AppComponents/AsideV1.js";
import { MasterDomDetaills } from "../MasterDomDetaills.js";
import { WAppNavigator } from '../WDevCore/WComponents/WAppNavigator.js';
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../WDevCore/WComponents/WModalForm.js";
import { ReservarComponent } from "./ViewComponents/ReservaComponent.js";
import { ViewActivityComponent } from "./ViewComponents/ViewActivityComponent.js";
import { ProfileCard, ProfileTab, WProfileInvestigador } from "./ViewProfile.js";
import { WSecurity } from "../WDevCore/WModules/WSecurity.js";
import { WForm } from "../WDevCore/WComponents/WForm.js";
import { InvestigadorProfile } from "../Model/InvestigadorProfile.js";

const OnLoad = async () => {
    const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigaciones");
    const BodyComponents = new MasterDomDetaills(new PerfilClass(response[0]), new AsideV1(response[1]));
    App.appendChild(WRender.createElement(BodyComponents));

}
window.onload = OnLoad;

class PerfilClass extends HTMLElement {
    constructor() {
        super();
        this.Id_Investigador = 1;
        this.id = "PerfilClass";
        this.className = "PerfilClass DivContainer";
        this.append(this.WStyle, WRender.createElement(StylesControlsV2));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.TabManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.OptionContainer = WRender.Create({
            className: "OptionContainer",
            children: [
                // {
                //     tagName: 'input', type: 'button', className: 'Btn', value: 'Nueva Actividad',
                //     onclick: async () => {
                //         this.append(new WModalForm({
                //             ObjectModal: new ReservarComponent(),
                //             ShadowRoot: false,
                //             StyleForm: "columnX3"
                //         }))
                //     }
                // }, {
                //     tagName: 'input', type: 'button', className: 'BtnSuccess', value: 'Reservar',
                //     onclick: async () => {
                //         this.append(new WModalForm({
                //             ObjectModal: new ReservarComponent("ApplyFor"),
                //             ShadowRoot: false,
                //             StyleForm: "columnX3"
                //         }))
                //     }
                // }
            ]
        });
        this.TabActividades = new WAppNavigator({
            NavStyle: "tab",
            Inicialize: true,
            Elements: [
                {
                    name: "Datos Generales", url: "#",
                    action: async (ev) => {
                        const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigadorProfile",
                            { Id_Investigador: this.Id_Investigador }
                        );
                        this.TabManager.NavigateFunction("Tab-Generales", new WProfileInvestigador(response));
                    }
                }, {
                    name: "Editar", url: "#",
                    action: async (ev) => {
                        const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigadorProfile",
                            { Id_Investigador: this.Id_Investigador }
                        );
                        console.log(response);
                        const EditForm = WRender.Create({
                            className: "FormContainer", children: [
                                new WForm({
                                    ObjectModel: new InvestigadorProfile(),
                                    EditObject: response,
                                    DisplayData: [
                                        "apellidos",
                                        "correo_institucional",
                                        "dependencias",
                                        "dni",
                                        "eventos",
                                        "fechaNac",
                                        "foto",
                                        "grupos",
                                        "id_Institucion",
                                        "id_Pais_Origen",
                                        "idiomas",
                                        "indice_H",
                                        "nombreInstitucion",
                                        "nombres",
                                        "redesSociales",
                                        "sexo"
                                    ]
                                })
                            ]
                        });

                        this.TabManager.NavigateFunction("Tab-Editar", EditForm);
                    }
                }, {
                    name: "Proyectos", url: "#",
                    action: async (ev) => {
                        const DataPost = {};
                        this.NavActividad("Tab-Ejecutadas", DataPost);
                    }
                }
            ]
        });
        this.DrawComponent();
    }
    NavActividad = async (TabId, DataPost) => {
        const Dataset = await WAjaxTools.PostRequest("../api/Calendar/TakeActividades", DataPost);
        this.TabManager.NavigateFunction(TabId, new WTableComponent({
            Dataset: Dataset,
            DisplayData: ['titulo', 'estado'],
            Options: {
                Search: true, UrlSearch: 'api_route',
                Add: true, UrlAdd: 'api_route',
                UserActions: [{
                    name: 'Ver Detalle', Function: async (TableElement) => {
                        this.append(new WModalForm({
                            ObjectModal: new ViewActivityComponent(TableElement),
                            ShadowRoot: false,
                            title: TableElement.titulo,
                            StyleForm: "FullScreen"
                        }))

                    }
                }]
            }
        }));
    }
    connectedCallback() { }
    DrawComponent = async () => {
        this.append(this.OptionContainer, this.TabActividades, this.TabContainer);
    }
    WStyle = new WStyledRender({
        ClassList: [
            new WCssClass(`.PerfilClass`, {
                display: 'flex',
                "flex-direction": "column"
            }), new WCssClass(`.OptionContainer`, {
                display: 'flex',
                "justify-content": "center",
            }), new WCssClass(`.OptionContainer img`, {
                "box-shadow": "0 0 4px rgb(0,0,0/50%)",
                height: 100,
                width: 100,
                margin: 10
            }), new WCssClass(`.TabContainer`, {
                "min-height": 500,
                overflow: "hidden",
                "overflow-y": "auto"
            }), new WCssClass( `.FormContainer`, {
                "background-color": '#fff',
            })
        ], MediaQuery: [{
            condicion: '(max-width: 600px)',
            ClassList: []
        },
        ]
    });
    Icons = {
        New: "",
        View: "",
    }
}

customElements.define('w-home', PerfilClass);

