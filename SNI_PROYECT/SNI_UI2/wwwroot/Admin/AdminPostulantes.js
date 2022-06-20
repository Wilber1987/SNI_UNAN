import { WAppNavigator } from "../WDevCore/WComponents/WAppNavigator.js";
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { InvestigadorProfile } from "../Model/InvestigadorProfile.js";
import { Tbl_InvestigatorProfile } from "../Model/ModelDatabase.js";
import { WProfileInvestigador } from "../Views/ViewProfile.js";
window.onload = () => {
    const DOMManager = new ComponentsManager({ MainContainer: Main });
    Aside.append(new WAppNavigator({
        DarkMode: true,
        Elements: [
            {
                name: "POSTULANTES", url: "#",
                action: async (ev) => {
                    const response = await WAjaxTools.PostRequest("../api/Admin/TakePostulantes", {});
                    const Id_Institucion = await WAjaxTools.PostRequest("../../api/PublicCat/GetInstitucion");
                    const Model = new Tbl_InvestigatorProfile({
                        Id_Institucion: {
                            type: "Select",
                            Dataset: Id_Institucion.map(x => ({ id: x.Id_Institucion, desc: x.Nombre }))
                        }
                    });
                    DOMManager.NavigateFunction("Postulantes", new WTableComponent({
                        Dataset: response,
                        ModelObject: Model,
                        DisplayData: ["Nombres", "Apellidos", "Id_Institucion", "Foto", "DNI"],
                        Options: {
                            Search: true, UserActions: [
                                {
                                    name: "Revizar", Function: async (Postulante) => {
                                        const response = await WAjaxTools.PostRequest("../../api/Investigaciones/TakeInvestigadorProfile",
                                            Postulante
                                        );
                                        DOMManager.NavigateFunction("Revizar_" + Postulante.Id_Investigador,
                                            new RevizarComponent(response));
                                    }
                                }
                            ]
                        }
                    }));
                }
            }]
    }));
}
class RevizarComponent extends HTMLElement {
    constructor(Postulante) {
        super();
        this.Postulante = Postulante;
        this.DraRevizarComponent();
    }
    connectedCallback() { }
    DraRevizarComponent = async () => {
        this.append(new WProfileInvestigador(this.Postulante))
    }
}
customElements.define('w-revizar', RevizarComponent);
export { RevizarComponent }
