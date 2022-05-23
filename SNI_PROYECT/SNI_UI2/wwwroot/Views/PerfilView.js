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
import { Tbl_Datos_Laborales, Tbl_Distinciones, Tbl_Evento, Tbl_Formacion_Academica, Tbl_Invest_RedS, Tbl_Patentes } from "../Model/ModelDatabase.js";

const OnLoad = async () => {
    const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigaciones");
    const BodyComponents = new MasterDomDetaills(new PerfilClass(response[0]));
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
            //NavStyle: "tab",
            Direction: "column",
            Inicialize: true,
            Elements: [
                {
                    name: "Datos Generales", url: "#",
                    action: async (ev) => {
                        this.response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigadorProfile",
                            { Id_Investigador: this.Id_Investigador }
                        );
                        this.TabManager.NavigateFunction("Tab-Generales", new WProfileInvestigador(this.response));
                    }
                }, {
                    name: "Editar", url: "#",
                    action: async (ev) => {
                        const EditForm = WRender.Create({
                            className: "FormContainer", style: {
                                padding: "10px",
                                borderRadius: ".3cm",
                                boxShadow: "0 0 4px 0 rgb(0 0 0 / 40%)",
                                margin: "10px"
                            },
                            children: [
                                new WForm({
                                    ObjectModel: new InvestigadorProfile(),
                                    EditObject: this.response,
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

                        console.log(this.TabManager.DomComponents);
                    }
                }, {
                    name: "Datos Académicos", url: "#",
                    action: async (ev) => {
                        const Id_TipoEstudio = await WAjaxTools.PostRequest("../api/Profile/GetTipoEstudio");
                        const Id_Institucion = await WAjaxTools.PostRequest("../api/Profile/GetInstitucion");
                        const Model = new Tbl_Formacion_Academica({
                            Id_TipoEstudio: {
                                type: "Select",
                                Dataset: Id_TipoEstudio.map(x => ({ id: x.id_TipoEstudio, desc: x.descripcion }))
                            },
                            Id_Institucion: {
                                type: "Select",
                                Dataset: Id_Institucion.map(x => ({ id: x.id_Institucion, desc: x.nombre }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Académicos", { add: "SaveFormacionAcademica" }, this.response.formacionAcademica, Model);
                    }
                }, {
                    name: "Patentes", url: "#",
                    action: async (ev) => {
                        const Id_Institucion = await WAjaxTools.PostRequest("../api/Profile/GetInstitucion");
                        const Model = new Tbl_Patentes({
                            Id_Institucion: {
                                type: "Select",
                                Dataset: Id_Institucion.map(x => ({ id: x.id_Institucion, desc: x.nombre }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Patentes", { add: "SavePatente" }, this.response.patentes, Model);
                    }
                }, {
                    name: "Datos Laborales", url: "#",
                    action: async (ev) => {
                        const Id_Cargo = await WAjaxTools.PostRequest("../api/Profile/GetCargos");
                        const Model = new Tbl_Datos_Laborales({
                            Id_Cargo: {
                                type: "Select",
                                Dataset: Id_Cargo.map(x => ({ id: x.id_Cargo, desc: x.descripcion }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Laborales", { add: "SaveDatoLaboral" }, this.response.datosLaborales, Model);
                    }
                }, {
                    name: "Redes Sociales", url: "#",
                    action: async (ev) => {
                        const Model = new Tbl_Invest_RedS();
                        this.NavSaveCatalogo("Tab-RedesS", { add: "SaveRedSocialP" }, this.response.redesSociales, Model);
                    }
                }, {
                    name: "Proyectos", url: "#",
                    action: async (ev) => {
                        this.NavActividad("Tab-TareasProyectos");
                    }
                }, {
                    name: "Eventos", url: "#",
                    action: async (ev) => {
                        const Id_Tipo_Evento = await WAjaxTools.PostRequest("../api/Profile/GetTipoEventos");
                        const Id_Pais = await WAjaxTools.PostRequest("../api/Profile/GetPaises");
                        const Model = new Tbl_Evento({
                            Id_Tipo_Evento: {
                                type: "Select",
                                Dataset: Id_Tipo_Evento.map(x => ({ id: x.id_Tipo_Evento, desc: x.descripcion }))
                            }, Id_Pais: {
                                type: "Select",
                                Dataset: Id_Pais.map(x => ({ id: x.id_Pais, desc: x.descripcion }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Eventos", { add: "SaveEvento" }, this.response.eventos, Model);
                    }
                }, {
                    name: "Procesos editoriales científicos", url: "#",
                    action: async (ev) => {
                        //this.NavSaveCatalogo("Tab-editoriales", { add:"SaveFormacionAcademica" }, this.response.formacionAcademica, {});
                    }
                }, {
                    name: "Premios, Distinciones, Reconocimientos, Becas", url: "#",
                    action: async (ev) => {
                        const Id_Institucion = await WAjaxTools.PostRequest("../api/Profile/GetInstitucion");
                        const Id_Tipo_Distincion = await WAjaxTools.PostRequest("../api/Profile/GetTipoDistincion");
                        const Model = new Tbl_Distinciones({
                            Id_Tipo_Distincion: {
                                type: "Select",
                                Dataset: Id_Tipo_Distincion.map(x => ({ id: x.id_Tipo_Distincion, desc: x.descripcion }))
                            },
                            Id_Institucion: {
                                type: "Select",
                                Dataset: Id_Institucion.map(x => ({ id: x.id_Institucion, desc: x.nombre }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Distinciones", { add: "SaveDistincion" }, this.response.distinciones, Model);
                    }
                }
            ]
        });
        WRender.SetStyle(this.TabActividades, {
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "0.3cm",
            boxShadow: "0 0 4px 0 rgb(0 0 0 / 40%)",
            margin: "10px"
        })
        this.DrawComponent();
    }
    NavActividad = async (TabId) => {
        const Tab = WRender.Create({ className: "Tab-TareasProyectos" });
        const DataPost = { id_Investigador: this.Id_Investigador };
        const Dataset = await WAjaxTools.PostRequest("../api/Calendar/TakeActividades", DataPost);
        this.response.proyectos.forEach(proy => {
            Tab.append(WRender.Create({
                className: "DivProy", children: [
                    { tagName: "h3", innerText: proy.nombre_Proyecto },
                    new WTableComponent({
                        Dataset: Dataset.filter(x => x.id_Proyecto == proy.id_Proyecto),
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
                    })
                ]
            }))
        });
        this.TabManager.NavigateFunction(TabId, Tab);
    }
    NavSaveCatalogo = async (TabId, ApiName = { add: "" }, Dataset = [], Model = {}) => {
        const Tab = WRender.Create({ className: "Tab-TareasProyectos" });
        Tab.append(WRender.Create({
            className: "DivProy", children: [
                //{ tagName: "h3", innerText:  },
                new WTableComponent({
                    Dataset: Dataset,
                    ModelObject: Model,
                    //DisplayData: ['titulo', 'estado'],
                    Options: {
                        Search: true, UrlSearch: undefined,
                        Add: true, UrlAdd: "../api/Profile/" + ApiName.add,
                        Edit: true, UrlUpdate: "../api/Profile/" + ApiName.add,
                        UserActions: []
                    }
                })
            ]
        }))
        this.TabManager.NavigateFunction(TabId, Tab);
    }
    connectedCallback() { }
    DrawComponent = async () => {
        this.append(this.TabActividades, this.TabContainer);
    }
    WStyle = new WStyledRender({
        ClassList: [
            new WCssClass(`.PerfilClass`, {
                display: 'grid',
                "flex-direction": "column",
                "grid-template-columns": "240px calc(100% - 240px)"
            }), new WCssClass(`.OptionContainer`, {
                display: 'flex',
                "justify-content": "center",
            }), new WCssClass(`.OptionContainer img`, {
                "box-shadow": "0 0 4px rgb(0,0,0/50%)",
                height: 100,
                width: 100,
                margin: 10
            }), new WCssClass(`.TabContainer`, {
                //"min-height": 500,
                overflow: "hidden",
                "overflow-y": "auto"
            }), new WCssClass(`.FormContainer`, {
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

