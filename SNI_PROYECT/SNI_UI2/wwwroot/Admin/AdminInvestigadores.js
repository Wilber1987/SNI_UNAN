import { WAppNavigator } from "../WDevCore/WComponents/WAppNavigator.js";
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { Tbl_InvestigatorProfile } from "../Model/ModelDatabase.js";
import { WProfileInvestigador } from "../Views/ViewProfile.js";
import { StylesControlsV2 } from "../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../WDevCore/WComponents/WModalForm.js";
window.onload = () => {
    const DOMManager = new ComponentsManager({ MainContainer: Main });
    Main.append(WRender.createElement(StylesControlsV2));
    Aside.append(WRender.Create({tagName: "h3", innerText: "Administración de Investigadores"}))
    Aside.append(new WAppNavigator({
        DarkMode: true,
        Direction: "column",
        Elements: [
            ElementTab("Postulantes", DOMManager),
            ElementTab("Investigadores", DOMManager, false),
            ElementTab("Rechazados", DOMManager, false),
        ]
    }));
}
class RevizarComponent extends HTMLElement {
    constructor(Postulante, Options = true) {
        super();
        this.Postulante = Postulante;
        this.Options = Options;
        this.DraRevizarComponent();
    }
    connectedCallback() { }
    DraRevizarComponent = async () => {
        if (this.Options) {
            this.AddPostulantesOptions();
        }
        this.append(new WProfileInvestigador(this.Postulante, { DatosLaborales: true, FormacionAcademica: true }));
    }
    AddPostulantesOptions() {
        this.append(WRender.Create({
            className: "DivOptions", children: [
                {
                    tagName: 'input', type: 'button',
                    className: 'Btn', value: 'Admitir postulación', onclick: async () => {
                        this.append(this.ModalCheck("../api/Admin/AdmitirPostulante", this.Postulante));
                    }
                }, {
                    tagName: 'input', type: 'button',
                    className: 'BtnSuccess', value: 'Rechazar postulación', onclick: async () => {
                        this.append(this.ModalCheck("../api/Admin/RechazarPostulante", this.Postulante));
                    }
                }
            ]
        }));
    }
    ModalCheck(Url, ObjectF) {
        const Message = WRender.Create({
            children: [WRender.Create({ tagName: "h3", innerText: "¿Esta seguro que desea guardar este registro?" })]
        });
        const ModalCheck = new WModalForm({
            ObjectModal: [
                Message, WRender.Create({
                    style: { textAlign: "center" },
                    children: [
                        WRender.Create({
                            tagName: 'input', type: 'button', className: 'Btn', value: 'SI', onclick: async () => {
                                const response = await WAjaxTools.PostRequest(Url, ObjectF);
                                if (response) {
                                    ModalCheck.close();
                                } else {
                                    Message.append(WRender.Create({ style: { color: "red", fontWeight: "bold" }, innerHTML: "ERROR!!!" }))
                                }
                            }
                        }), WRender.Create({
                            tagName: 'input', type: 'button', className: 'Btn', value: 'NO', onclick: async () => {
                                ModalCheck.close();
                            }
                        })
                    ]
                })
            ]
        });
        return ModalCheck;
    }
}
customElements.define('w-revizar', RevizarComponent);
export { RevizarComponent }
function ElementTab(TabName = "Tab", DOMManager, Options) {
    return {
        name: TabName, url: "#",
        action: async (ev) => {
            const response = await WAjaxTools.PostRequest("../api/Admin/Take" + TabName, {});
            const Id_Institucion = await WAjaxTools.PostRequest("../../api/PublicCat/GetInstitucion");
            const Model = new Tbl_InvestigatorProfile({
                Id_Institucion: {
                    type: "Select",
                    Dataset: Id_Institucion.map(x => ({ id: x.Id_Institucion, desc: x.Nombre }))
                }
            });
            DOMManager.NavigateFunction(TabName, new WTableComponent({
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
                                    new RevizarComponent(response, Options));
                            }
                        }
                    ]
                }
            }));
        }
    };
}