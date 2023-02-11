import { WAppNavigator } from '../../WDevCore/WComponents/WAppNavigator.js';
import { WRender, ComponentsManager, WAjaxTools } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../../WDevCore/WComponents/WModalForm.js";
import { ViewActivityComponent } from "./ViewComponents/ViewActivityComponent.js";
import { WProfileInvestigador } from "./ProfileViewer.js";
import { ModalVericateAction, WForm } from "../../WDevCore/WComponents/WForm.js";
import { InvestigadorProfile } from "../../Model/InvestigadorProfile.js";
import { Cat_Cargo_Proyecto, ProyectoTableActividades, TblProcesosEditoriales, Tbl_Datos_Laborales, Tbl_Distinciones, Tbl_Evento, Tbl_Formacion_Academica, Tbl_Grupos, Tbl_Investigaciones, Tbl_Invest_RedS, Tbl_Participantes_Eventos, Tbl_Patentes } from "../../Model/ModelDatabase.js";
import { Tbl_InvestigatorProfile } from '../../Model/DBODataBaseModel.js';

const OnLoad = async () => {
    Aside.append(WRender.Create({ tagName: "h3", innerText: "Administración de perfiles" }));
    const AdminPerfil = new PerfilClass();
    Aside.append(AdminPerfil.MainNav);
    Main.appendChild(AdminPerfil);

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
        this.OptionContainer = WRender.Create({ className: "OptionContainer" });
        this.TabActividades = this.MainNav;
        this.DrawComponent();
    }
    EditarPerfilNav = () => {
        return [{
            name: "Perfil", action: async (ev) => { this.EditProfile(); }
        }, {
            name: "Datos Académicos",
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
            name: "Patentes",
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
            name: "Datos Laborales",
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
            name: "Redes Sociales",
            action: async (ev) => {
                const Id_RedSocial = await WAjaxTools.PostRequest("../../api/PublicCat/GetRedesSociales");
                const Model = new Tbl_Invest_RedS({
                    Id_RedSocial: {
                        type: "Select",
                        Dataset: Id_RedSocial.map(x => ({ id: x.Id_RedSocial, desc: x.Descripcion }))
                    }
                });
                this.NavSaveCatalogo("Tab-RedesS", { add: "SaveRedSocialP" }, this.response.RedesSociales, Model);
            }
        }, {
            name: "Procesos editoriales científicos",
            action: async (ev) => {
                const Id_Tipo_Proceso_Editoriales = await WAjaxTools.PostRequest("../../api/PublicCat/GetProcesosEditoriales");
                const Model = new TblProcesosEditoriales({
                    Id_Tipo_Proceso_Editorial: {
                        type: "Select",
                        Dataset: Id_Tipo_Proceso_Editoriales.map(x => ({ id: x.Id_Tipo_Proceso_Editorial, desc: x.Descripcion }))
                    }
                });
                this.NavSaveCatalogo("Tab-editoriales", { add: "SaveProcesoEditorial" }, this.response.ProcesosEditoriales, Model);
            }
        }, {
            name: "Premios, Distinciones, Reconocimientos, Becas",
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
        }];
    }
    MainNav = new WAppNavigator({
        //NavStyle: "tab",
        Direction: "column",
        Inicialize: true,
        DarkMode: true,
        Elements: [
            {
                name: "Datos Generales",
                action: async (ev) => {
                    this.response = await WAjaxTools.PostRequest("../../api/Investigaciones/TakeInvestigadorProfile",
                        { Id_Investigador: this.Id_Investigador }
                    );
                    this.response.Id_Idiomas = this.response.Tbl_IdiomasInv?.map(i => i.Idioma)
                    this.TabManager.NavigateFunction("Tab-Generales", new WProfileInvestigador(this.response));
                }
            }, {
                name: "Investigaciones", action: async (ev) => { this.NavInvestigaciones("Tab-Investigaciones"); }
            }, {
                name: "Proyectos", action: async (ev) => { this.NavProyectos("Tab-TareasProyectos"); }
            }, {
                name: "Grupos", action: async (ev) => { this.NavGrupos("Tab-Grupos"); }
            }, {
                name: "Eventos",
                action: async (ev) => {
                    await this.SetEventos();
                }
            }, {
                name: "Editar", SubNav: {
                    Elements: this.EditarPerfilNav()
                }
            }
        ]
    });
    NavInvestigaciones = async (TabId) => {
        const Tab = WRender.Create({ className: "Tab-TareasProyectos" });
        const DataPost = { Id_Investigador: this.Id_Investigador };
        const Dataset = await WAjaxTools.PostRequest("../../api/Investigaciones/GetInvestigaciones", DataPost);
        const tipoInvestigacion = await WAjaxTools.PostRequest("../../api/PublicCat/GetTipoInvestigaciones", {});
        const tipoLocalidad = await WAjaxTools.PostRequest("../../api/PublicCat/GetLocalidades", {});
        const disciplinas = await WAjaxTools.PostRequest("../../api/PublicCat/GetDisciplinas", {});
        const ModelInvestigacion = new Tbl_Investigaciones({
            Id_Tipo_Investigacion: { type: "SELECT", Dataset: tipoInvestigacion.map(x => ({ id: x.Id_Tipo_Investigacion, desc: x.Descripcion })) },
            Id_Localidad: { type: "SELECT", Dataset: tipoLocalidad.map(x => ({ id: x.Id_Localidad, desc: x.Nombre_Localidad })) },
            Disciplinas: {
                type: "MultiSelect", Dataset: disciplinas.map(x => {
                    x.Descripcion = x.DescripcionDisciplina
                    return x;
                })
            }
        });
        console.log(ModelInvestigacion);
        ModelInvestigacion.Abstract.hidden = true;
        ModelInvestigacion.Resumen.hidden = true;
        ModelInvestigacion.Repositorio.hidden = true;
        ModelInvestigacion.Referencias.hidden = true;
        ModelInvestigacion.Photo.hidden = true;
        ModelInvestigacion.Estado.hidden = true;
        Tab.append(WRender.Create({
            className: "DivProy", children: [
                { tagName: "h3", innerText: "Investigaciones" },
                new WTableComponent({
                    Dataset: Dataset,
                    ModelObject: ModelInvestigacion,
                    //DisplayData: ['Titulo', 'Estado'],
                    Options: {
                        Search: true, UrlSearch: undefined,
                        Add: true, UrlAdd: "../../api/Investigaciones/SaveInvestigacion",
                        Edit: true, UrlUpdate: "../../api/Investigaciones/UpdateInvestigacion",
                        UserActions: []
                    }
                })
            ]
        }));
        this.TabManager.NavigateFunction(TabId, Tab);
    }
    NavProyectos = async (TabId) => {
        const Tab = WRender.Create({ className: "Tab-TareasProyectos" });
        const DataPost = { Id_Investigador: this.Id_Investigador };
        const Dataset = await WAjaxTools.PostRequest("../../api/Calendar/TakeActividades", DataPost);
        this.response.Tbl_Proyectos?.forEach(proy => {
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
    NavGrupos = async (TabId) => {
        const Tab = WRender.Create({ className: "Tab-TareasProyectos" });
        const Dataset = await WAjaxTools.PostRequest("../../api/Group/GetGruposInvestigador");
        const Id_TipoGrupo = await WAjaxTools.PostRequest("../../api/PublicCat/GetTipoGrupo");
        const Tbl_Instituciones_Asociadas = await WAjaxTools.PostRequest("../../api/PublicCat/GetInstitucion");
        Tab.append(WRender.Create({
            className: "DivProy", children: [
                { tagName: "h3", innerText: "Grupos" },
                new WTableComponent({
                    Dataset: Dataset,
                    ModelObject: new Tbl_Grupos({
                        Id_TipoGrupo: { type: "Select", Dataset: Id_TipoGrupo.map(x => ({ id: x.Id_TipoGrupo, desc: x.Descripcion })) },
                        Instituciones_Asociadas: {
                            type: "MULTISELECT", Dataset: Tbl_Instituciones_Asociadas.map(x => ({
                                Id_Institucion: x.Id_Institucion, Descripcion: x.Nombre,
                            }))
                        }
                    }),
                    Options: {
                        Search: true, UrlSearch: 'api_route',
                        Add: true, UrlAdd: '../../api/Group/SaveGroup',
                        UserActions: [{
                            name: 'Ver Detalle', Function: async (TableElement) => {

                            }
                        }]
                    }
                })
            ]
        }))
        this.TabManager.NavigateFunction(TabId, Tab);
    }
    NavSaveCatalogo = async (TabId, ApiName = { add: "" }, Dataset = [], Model = {}, DisplayData, UserActions = []) => {
        const Tab = WRender.Create({ className: "Tab-TareasProyectos" });
        Tab.append(WRender.Create({
            className: "DivProy", children: [
                //{ tagName: "h3", innerText:  },
                new WTableComponent({
                    Dataset: Dataset,
                    ModelObject: Model,
                    DisplayData: DisplayData,
                    Options: {
                        Search: true, UrlSearch: undefined,
                        Add: true, UrlAdd: "../../api/Profile/" + ApiName.add,
                        Edit: true, UrlUpdate: "../../api/Profile/" + ApiName.add,
                        UserActions: UserActions
                    }
                })
            ]
        }))
        this.TabManager.NavigateFunction(TabId, Tab);
    }
    EditProfile = async () => {
        const Id_Institucion = await WAjaxTools.PostRequest("../../api/PublicCat/GetInstitucion");
        const Id_Paises = await WAjaxTools.PostRequest("../../api/PublicCat/GetPaises");
        const Idiomas = await WAjaxTools.PostRequest("../../api/PublicCat/GetIdiomas");
        const InvestigadorModel = new Tbl_InvestigatorProfile({
            //Id_Institucion: Id_Institucion.map(x => ({ id: x.Id_Institucion, desc: x.Nombre })),
            //Id_Pais_Origen: Id_Paises.map(x => ({ id: x.Id_Pais, desc: x.Descripcion })),
            //Id_Idiomas: { type: "MULTISELECT", Dataset: Idiomas }
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
    async SetEventos() {
        const Eventos = await WAjaxTools.PostRequest("../../api/Events/GetEventosPropiosGestion");
        const Id_Tipo_Evento = await WAjaxTools.PostRequest("../../api/PublicCat/GetTipoEventos");
        const Id_Pais = await WAjaxTools.PostRequest("../../api/PublicCat/GetPaises");
        const Id_Tipo_Participacion = await WAjaxTools.PostRequest("../../api/PublicCat/GetTipoParticipacionEventos");
        const Id_Investigador = await WAjaxTools.PostRequest("../../api/PublicCat/GetInvestigadores");
        const Model = new Tbl_Evento({
            Id_Tipo_Evento: {
                type: "WSelect",
                Dataset: Id_Tipo_Evento.map(x => ({ id: x.Id_Tipo_Evento, Descripcion: x.Descripcion }))
            }, Id_Pais: {
                type: "WSelect",
                Dataset: Id_Pais.map(x => ({ id: x.Id_Pais, Descripcion: x.Descripcion }))
            }, Participantes: {
                type: "Masterdetail",
                MinimunRequired: 1,
                MaxRequired: undefined,
                ModelObject: new Tbl_Participantes_Eventos({
                    Id_Tipo_Participacion: {
                        type: "select",
                        Dataset: Id_Tipo_Participacion.map(x => ({ id: x.Id_Tipo_Participacion, Descripcion: x.Descripcion }))
                    }, Id_Investigador: {
                        type: "WSelect",
                        Dataset: Id_Investigador.map(x => ({ id: x.Id_Investigador, Descripcion: `${x.Nombres} ${x.Apellidos}` }))
                    }
                })
            }
        });
        this.NavSaveCatalogo("Tab-Eventos",
            { add: "SaveEvento" },
            Eventos, Model,
            ["Id_Tipo_Evento", "nombre", "Modalidad", "Link"], [{
                name: "Invitar",
                Function: (Evento) => {
                    const table = new WTableComponent({
                        Dataset: Id_Investigador,
                        maxElementByPage: 5,
                        ModelObject: new Tbl_InvestigatorProfile({
                            FechaNac: undefined,
                            Sexo: undefined,
                            DNI: undefined,
                            Correo_institucional: undefined,
                            Id_Pais_Origen: undefined,
                            Id_Institucion: undefined,
                            IdUser: undefined,
                            Estado: undefined
                        }), Options: {
                            Add: false, Show: false, Edit: false, Select: true, Search: true,
                        }
                    })
                    const modal = new WModalForm({
                        title: "Invitar Investigadores",
                        ObjectModal: WRender.Create({
                            className: "SearchInvestigador",
                            style: { padding: "20px" },
                            children: [
                                table,
                                [
                                    {
                                        tagName: 'input', type: 'button', className: 'Btn', value: 'Enviar Invitaciones', onclick: async () => {
                                            this.append(ModalVericateAction(async () => {
                                                Evento.Invitaciones = table.selectedItems;
                                                const response = await WAjaxTools.PostRequest("../../api/Events/InvitarInvestigadores", Evento);
                                                modal.close();
                                            }))
                                        }
                                    }, {
                                        tagName: 'input', type: 'button', className: 'BtnSecundary', value: 'Cancelar', onclick: async () => {
                                            modal.close();
                                        }
                                    }
                                ]
                            ]
                        })
                    });
                    this.append(modal);
                }
            }]);
    }

    connectedCallback() { }
    DrawComponent = async () => {
        this.append(this.TabContainer);
    }
    WStyle = new WStyledRender({
        ClassList: [
            new WCssClass(`.PerfilClass`, {
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
        }]
    });
    Icons = {
        New: "",
        View: "",
    }
}

customElements.define('w-perfil', PerfilClass);