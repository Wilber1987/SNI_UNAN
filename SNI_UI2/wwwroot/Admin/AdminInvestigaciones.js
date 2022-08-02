import { WAppNavigator } from "../WDevCore/WComponents/WAppNavigator.js";
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { InvestigadorProfile } from "../Model/InvestigadorProfile.js";
import { Cat_Disciplinas, CatRedesSociales, CatTipoDistincion, Cat_Cargos, Cat_Cargo_Proyecto, Cat_Idiomas, Cat_instituciones, Cat_Localidad, Cat_Paises, Cat_TipoEstudio, Cat_TipoGrupo, Cat_TipoLocalidad, Cat_TipoMiembro, Cat_Tipo_Asociacion, Cat_Tipo_Colaborador, Cat_Tipo_Evento, Cat_Tipo_Investigacion, Cat_Tipo_Proyecto, Tbl_Investigaciones, Tbl_InvestigatorProfile } from "../Model/ModelDatabase.js";
import { WProfileInvestigador } from "../Views/ViewProfile.js";
import { StylesControlsV2 } from "../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../WDevCore/WComponents/WModalForm.js";
import { WReadInvestigacion } from "../Views/ViewRead.js";
import { WCard } from "../WDevCore/WComponents/WCardCarousel.js";
import { ActionFunction, ModalComp } from "../Views/Home.js";
window.addEventListener("load", async () => {
    const DOMManager = new ComponentsManager({ MainContainer: Main });
    Aside.append(WRender.Create({tagName: "h3", innerText: "Administración de Investigaciones"}));
    Aside.append(new WAppNavigator({
        DarkMode: true,
        Direction: "column",
        Elements: [
            Investigacion("Investigaciones", DOMManager)
        ]
    }));
});
function Investigacion(TabName = "Investigaciones", DOMManager) {
    return {
        name: TabName, url: "#",
        action: async (ev) => {
            const response = await WAjaxTools.PostRequest("../api/Admin/TakeInvestigaciones", {});
            DOMManager.NavigateFunction(TabName, new WTableComponent({
                Dataset: response,
                ModelObject: new Tbl_Investigaciones(),
                DisplayData: ["Titulo", "Estado", "Visibilidad", "Fecha_ejecucion"],
                Options: {
                    //Add: true, UrlAdd: "../api/Admin/Save",
                    //Edit: true, UrlUpdate: "../api/Admin/Update",
                    Search: true, UrlSearch: "../api/Admin/TakeInvestigaciones",
                    UserActions: [
                        {
                            name: "Ver detalles", Function: async (Inv) => {
                                const Id_Investigacion = Inv.Id_Investigacion;
                                const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigacion",
                                    { Id_Investigacion: Id_Investigacion });
                                const Card = WRender.Create({
                                    style: {
                                        display: "grid",
                                        gridGap: "10px",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        alignItems: "center",
                                        paddingLeft: "20px",
                                        paddingRight: "20px"
                                    }, children: [
                                        `Nombres del autor: ${response.Nombres}`,
                                        "Institución: " + response.NombreInstitucion,
                                        {
                                            tagName: 'input', type: 'button', className: 'Btn', value: 'Ver perfil',
                                            onclick: async () => {
                                                ActionFunction(response.Id_Investigador, Main);
                                            }
                                        }]
                                });
                                const Reader = new WReadInvestigacion(response);
                                DOMManager.NavigateFunction("Reader" + response.Id_Investigador, [Card, Reader])
                            }
                        }
                    ]
                }
            }));
        }
    };
}

