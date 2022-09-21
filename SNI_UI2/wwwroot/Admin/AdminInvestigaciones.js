import { WAppNavigator } from "../WDevCore/WComponents/WAppNavigator.js";
import { WRender, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { Tbl_Investigaciones } from "../Model/ModelDatabase.js";
import { InvestigacionViewer } from "../Views/InvestigacionViewer.js";
import { ActionFunction } from "../Views/Home.js";
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
                                const Reader = new InvestigacionViewer(response);
                                DOMManager.NavigateFunction("Reader" + response.Id_Investigador, [Card, Reader])
                            }
                        }
                    ]
                }
            }));
        }
    };
}

