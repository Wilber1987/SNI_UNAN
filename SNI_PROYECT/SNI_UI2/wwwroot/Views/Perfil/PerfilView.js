import { AsideV1 } from "../../AppComponents/AsideV1.js";
import { MasterDomDetaills } from "../../MasterDomDetaills.js";
import { WAppNavigator } from '../../WDevCore/WComponents/WAppNavigator.js';
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../../WDevCore/WComponents/WModalForm.js";
import { ReservarComponent } from "./ViewComponents/ReservaComponent.js";
import { ViewActivityComponent } from "./ViewComponents/ViewActivityComponent.js";
import { ProfileCard, ProfileTab, WProfileInvestigador } from "../ViewProfile.js";
import { WSecurity } from "../../WDevCore/WModules/WSecurity.js";
import { WForm } from "../../WDevCore/WComponents/WForm.js";
import { InvestigadorProfile } from "../../Model/InvestigadorProfile.js";
import { ProyectoTableActividades, Tbl_Datos_Laborales, Tbl_Distinciones, Tbl_Evento, Tbl_Formacion_Academica, Tbl_Invest_RedS, Tbl_Patentes } from "../../Model/ModelDatabase.js";

const OnLoad = async () => {
    const response = await WAjaxTools.PostRequest("../../api/Investigaciones/TakeInvestigaciones");
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
                        this.response = await WAjaxTools.PostRequest("../../api/Investigaciones/TakeInvestigadorProfile",
                            { Id_Investigador: this.Id_Investigador }
                        );
                        this.TabManager.NavigateFunction("Tab-Generales", new WProfileInvestigador(this.response));
                    }
                }, {
                    name: "Editar", url: "#", action: async (ev) => { this.EditProfile(); }
                }, {
                    name: "Datos Académicos", url: "#",
                    action: async (ev) => {
                        const Id_TipoEstudio = await WAjaxTools.PostRequest("../../api/PublicCat/GetTipoEstudio");
                        const Id_Institucion = await WAjaxTools.PostRequest("../../api/PublicCat/GetInstitucion");
                        const Model = new Tbl_Formacion_Academica({
                            Id_TipoEstudio: {
                                type: "Select",
                                Dataset: Id_TipoEstudio.map(x => ({ id: x.Id_TipoEstudio, desc: x.Descripcion }))
                            },
                            Id_Institucion: {
                                type: "Select",
                                Dataset: Id_Institucion.map(x => ({ id: x.Id_Institucion, desc: x.Nombre }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Académicos", { add: "SaveFormacionAcademica" }, this.response.FormacionAcademica, Model);
                    }
                }, {
                    name: "Patentes", url: "#",
                    action: async (ev) => {
                        const Id_Institucion = await WAjaxTools.PostRequest("../../api/PublicCat/GetInstitucion");
                        const Model = new Tbl_Patentes({
                            Id_Institucion: {
                                type: "Select",
                                Dataset: Id_Institucion.map(x => ({ id: x.Id_Institucion, desc: x.Nombre }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Patentes", { add: "SavePatente" }, this.response.Patentes, Model);
                    }
                }, {
                    name: "Datos Laborales", url: "#",
                    action: async (ev) => {
                        const Id_Cargo = await WAjaxTools.PostRequest("../../api/PublicCat/GetCargos");
                        const Model = new Tbl_Datos_Laborales({
                            Id_Cargo: {
                                type: "Select",
                                Dataset: Id_Cargo.map(x => ({ id: x.Id_Cargo, desc: x.Descripcion }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Laborales", { add: "SaveDatoLaboral" }, this.response.DatosLaborales, Model);
                    }
                }, {
                    name: "Redes Sociales", url: "#",
                    action: async (ev) => {
                        const Model = new Tbl_Invest_RedS();
                        this.NavSaveCatalogo("Tab-RedesS", { add: "SaveRedSocialP" }, this.response.RedesSociales, Model);
                    }
                }, {
                    name: "Proyectos", url: "#", action: async (ev) => { this.NavActividad("Tab-TareasProyectos"); }
                }, {
                    name: "Eventos", url: "#",
                    action: async (ev) => {
                        const Id_Tipo_Evento = await WAjaxTools.PostRequest("../../api/PublicCat/GetTipoEventos");
                        const Id_Pais = await WAjaxTools.PostRequest("../../api/PublicCat/GetPaises");
                        const Model = new Tbl_Evento({
                            Id_Tipo_Evento: {
                                type: "Select",
                                Dataset: Id_Tipo_Evento.map(x => ({ id: x.Id_Tipo_Evento, desc: x.Descripcion }))
                            }, Id_Pais: {
                                type: "Select",
                                Dataset: Id_Pais.map(x => ({ id: x.Id_Pais, desc: x.Descripcion }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Eventos", { add: "SaveEvento" }, this.response.Eventos, Model);
                    }
                }, {
                    name: "Procesos editoriales científicos", url: "#",
                    action: async (ev) => {
                        //this.NavSaveCatalogo("Tab-editoriales", { add:"SaveFormacionAcademica" }, this.response.formacionAcademica, {});
                    }
                }, {
                    name: "Premios, Distinciones, Reconocimientos, Becas", url: "#",
                    action: async (ev) => {
                        const Id_Institucion = await WAjaxTools.PostRequest("../../api/PublicCat/GetInstitucion");
                        const Id_Tipo_Distincion = await WAjaxTools.PostRequest("../../api/PublicCat/GetTipoDistincion");
                        const Model = new Tbl_Distinciones({
                            Id_Tipo_Distincion: {
                                type: "Select",
                                Dataset: Id_Tipo_Distincion.map(x => ({ id: x.Id_Tipo_Distincion, desc: x.Descripcion }))
                            },
                            Id_Institucion: {
                                type: "Select",
                                Dataset: Id_Institucion.map(x => ({ id: x.Id_Institucion, desc: x.Nombre }))
                            }
                        });
                        this.NavSaveCatalogo("Tab-Distinciones", { add: "SaveDistincion" }, this.response.Distinciones, Model);
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
        const DataPost = { Id_Investigador: this.Id_Investigador };
        const Dataset = await WAjaxTools.PostRequest("../../api/Calendar/TakeActividades", DataPost);
        this.response.Proyectos.forEach(proy => {
            Tab.append(WRender.Create({
                className: "DivProy", children: [
                    { tagName: "h3", innerText: proy.Nombre_Proyecto },
                    new WTableComponent({
                        Dataset: Dataset.filter(x => x.Id_Proyecto == proy.Id_Proyecto),
                        ModelObject: new ProyectoTableActividades(),
                        //DisplayData: ['Titulo', 'Estado'],
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
                        Add: true, UrlAdd: "../../api/Profile/" + ApiName.add,
                        Edit: true, UrlUpdate: "../../api/Profile/" + ApiName.add,
                        UserActions: []
                    }
                })
            ]
        }))
        this.TabManager.NavigateFunction(TabId, Tab);
    }
    EditProfile = async () => {
        this.response.Id_Idiomas = this.response.Idiomas;
        const Id_Institucion = await WAjaxTools.PostRequest("../../api/PublicCat/GetInstitucion");
        const Id_Paises = await WAjaxTools.PostRequest("../../api/PublicCat/GetPaises");
        const Idiomas = await WAjaxTools.PostRequest("../../api/PublicCat/GetIdiomas");
        const InvestigadorModel = new InvestigadorProfile({
            Id_Institucion: Id_Institucion.map(x => ({ id: x.Id_Institucion, desc: x.Nombre })),
            Id_Pais_Origen: Id_Paises.map(x => ({ id: x.Id_Pais, desc: x.Descripcion })),
            Id_Idiomas: { type: "MULTISELECT", Dataset: Idiomas }
        });
        const EditForm = WRender.Create({
            className: "FormContainer", style: {
                padding: "10px",
                borderRadius: ".3cm",
                boxShadow: "0 0 4px 0 rgb(0 0 0 / 40%)",
                margin: "10px"
            }, children: [
                new WForm({
                    ModelObject: InvestigadorModel,
                    EditObject: this.response,
                    ObjectOptions: { Url: "../../api/Profile/SaveProfile" },
                    DisplayData: [
                        "Apellidos",
                        "Correo_institucional",
                        "Dependencias",
                        "DNI",
                        "Eventos",
                        "FechaNac",
                        "Foto",
                        "Grupos",
                        "Id_Institucion",
                        "Id_Pais_Origen",
                        "Id_Idiomas",
                        "NombreInstitucion",
                        "Nombres",
                        "RedesSociales",
                        "Sexo"
                    ]
                })
            ]
        });
        this.TabManager.NavigateFunction("Tab-Editar", EditForm);
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

