import { WAppNavigator } from "../WDevCore/WComponents/WAppNavigator.js";
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { InvestigadorProfile } from "../Model/InvestigadorProfile.js";
import { CatDisciplinas, CatRedesSociales, CatTipoDistincion, Cat_Cargos, Cat_Cargo_Proyecto, Cat_Idiomas, Cat_instituciones, Cat_Localidad, Cat_Paises, Cat_TipoEstudio, Cat_TipoGrupo, Cat_TipoLocalidad, Cat_TipoMiembro, Cat_Tipo_Asociacion, Cat_Tipo_Colaborador, Cat_Tipo_Evento, Cat_Tipo_Investigacion, Cat_Tipo_Proyecto, Tbl_InvestigatorProfile } from "../Model/ModelDatabase.js";
import { WProfileInvestigador } from "../Views/ViewProfile.js";
import { StylesControlsV2 } from "../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../WDevCore/WComponents/WModalForm.js";
window.addEventListener("load", async () => {
    setTimeout(async () => {
        const DOMManager = new ComponentsManager({ MainContainer: Main });
        Main.append(WRender.createElement(StylesControlsV2));
        const Paises = await WAjaxTools.PostRequest("../api/Admin/TakeCat_Paises", {});
        const tipoLocalidad = await WAjaxTools.PostRequest("../api/Admin/TakeCat_TipoLocalidad", {});
        const localidadPadre = await WAjaxTools.PostRequest("../api/Admin/TakeCat_Localidad", {});
        const ModelLocalidad = new Cat_Localidad({
            Id_Pais: { type: "SELECT", Dataset: Paises.map(x => ({ id: x.Id_Pais, desc: x.Descripcion })) },
            Id_Tipo_Localidad: { type: "SELECT", Dataset: tipoLocalidad.map(x => ({ id: x.Id_Tipo_Localidad, desc: x.Nombre_TipoLocalidad })) },
            Id_LocalidadPadre: { type: "SELECT", Dataset: localidadPadre.map(x => ({ id: x.Id_Localidad, desc: x.Nombre_Localidad })) }
        });
        Aside.append(WRender.Create({ tagName: "h3", innerText: "Mantenimiento de Catalogos" }));
        Aside.append(new WAppNavigator({
            DarkMode: true,
            Direction: "column",
            Elements: [{
                name: "Mantenimiento General", SubNav: {
                    Elements: [
                        ElementTab("Instituciones", DOMManager, new Cat_instituciones()),
                        ElementTab("Paises", DOMManager, new Cat_Paises()),
                        ElementTab("Localidad", DOMManager, ModelLocalidad),
                        ElementTab("Tipo Localidad", DOMManager, new Cat_TipoLocalidad()),
                        ElementTab("Redes Sociales", DOMManager, new CatRedesSociales())
                    ]
                }
            }, {
                name: "Mantenimiento de perfil", SubNav: {
                    Elements: [
                        ElementTab("Idiomas", DOMManager, new Cat_Idiomas()),
                        ElementTab("Cargos", DOMManager, new Cat_Cargos()),
                        ElementTab("Tipo de Distinciones", DOMManager, new CatTipoDistincion())
                    ]
                }
            }, {
                name: "Mantenimiento de Investigaciones", SubNav: {
                    Elements: [
                        ElementTab("Tipo de Investigación", DOMManager, new Cat_Tipo_Investigacion()),
                        ElementTab("Tipo de Estudio", DOMManager, new Cat_TipoEstudio()),
                        ElementTab("Disciplinas", DOMManager, new CatDisciplinas()),
                        ElementTab("Tipo de Colaborador", DOMManager, new Cat_Tipo_Colaborador())
                    ]
                }
            }, {
                name: "Mantenimiento de Proyecto", SubNav: {
                    Elements: [
                        ElementTab("Cargo de Proyectos", DOMManager, new Cat_Cargo_Proyecto()),
                        ElementTab("Tipo de Asociación", DOMManager, new Cat_Tipo_Asociacion()),
                        ElementTab("Tipo de Proyecto", DOMManager, new Cat_Tipo_Proyecto())
                    ]
                }
            }, {
                name: "Mantenimiento de Eventos", SubNav: {
                    Elements: [
                        ElementTab("Tipo de Evento", DOMManager, new Cat_Tipo_Evento()),
                    ]
                }
            }, {
                name: "Mantenimiento de Grupos", SubNav: {
                    Elements: [
                        ElementTab("Tipo de Grupo", DOMManager, new Cat_TipoGrupo()),
                        ElementTab("Tipo de Miembro", DOMManager, new Cat_TipoMiembro()),
                    ]
                }
            }]
        }));
    }, 100);
});
function ElementTab(TabName = "Tab", DOMManager, Model) {
    return {
        name: TabName, url: "#",
        action: async (ev) => {
            const response = await WAjaxTools.PostRequest("../api/Admin/Take" + Model.constructor.name, {});
            DOMManager.NavigateFunction(Model.constructor.name, new WTableComponent({
                Dataset: response,
                ModelObject: Model,
                Options: {
                    Add: true, UrlAdd: "../api/Admin/Save" + Model.constructor.name,
                    Edit: true, UrlUpdate: "../api/Admin/Update" + Model.constructor.name,
                    Search: true, UrlSearch: "../api/Admin/Take" + Model.constructor.name,
                }
            }));
        }
    };
}

/**  
ElementTab("Idiomas", DOMManager, new Cat_Idiomas()),
                    ElementTab("Instituciones", DOMManager, new Cat_instituciones()),
                    ElementTab("Cargos", DOMManager, new Cat_Cargos()),
                    ElementTab("Cargo de Proyectos", DOMManager, new Cat_Cargo_Proyecto()),
                    ElementTab("Paises", DOMManager, new Cat_Paises()),
                    ElementTab("Localidad", DOMManager, new Cat_Localidad()),
                    ElementTab("Tipo de Asociación", DOMManager, new Cat_Tipo_Asociacion()),
                    ElementTab("Tipo de Colaborador", DOMManager, new Cat_Tipo_Colaborador()),
                    ElementTab("Tipo de Evento", DOMManager, new Cat_Tipo_Evento()),
                    ElementTab("Tipo de Investigación", DOMManager, new Cat_Tipo_Investigacion()),
                    ElementTab("Tipo de Proyecto", DOMManager, new Cat_Tipo_Proyecto()),
                    ElementTab("Tipo de Estudio", DOMManager, new Cat_TipoEstudio()),
                    ElementTab("Tipo de Grupo", DOMManager, new Cat_TipoGrupo()),
                    ElementTab("Tipo Localidad", DOMManager, new Cat_TipoLocalidad()),
                    ElementTab("Tipo de Miembro", DOMManager, new Cat_TipoMiembro()),
                    ElementTab("Disciplinas", DOMManager, new CatDisciplinas()),
                    ElementTab("Redes Sociales", DOMManager, new CatRedesSociales()),
                    ElementTab("Tipo de Distinciones", DOMManager, new CatTipoDistincion()), */