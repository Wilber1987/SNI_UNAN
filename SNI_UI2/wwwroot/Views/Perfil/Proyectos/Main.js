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
import { Tbl_Evento, Tbl_Investigaciones, Tbl_InvestigatorProfile } from '../../Model/DBODataBaseModel.js';
import { WDetailObject } from '../../WDevCore/WComponents/WDetailObject.js';

const OnLoad = async () => {
    Aside.append(WRender.Create({ tagName: "h3", innerText: "Administración de perfiles" }));
    const AdminPerfil = new ProyectClass();
    Aside.append(AdminPerfil.MainNav);
    Main.appendChild(AdminPerfil);

}
window.onload = OnLoad;
class ProyectClass extends HTMLElement {
    constructor() {
        super();
        this.Id_Investigador = 1;
        this.id = "ProyectClass";
        this.className = "ProyectClass DivContainer";
        this.append(this.WStyle, WRender.createElement(StylesControlsV2));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.TabManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.OptionContainer = WRender.Create({ className: "OptionContainer" });
        this.TabActividades = this.MainNav;
        this.DrawComponent();
    }
    EditarPerfilNav = () => {
     
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
                    this.TabManager.NavigateFunction("Tab-Generales",
                        new WDetailObject({ ObjectDetail: this.response, ModelObject: new Tbl_InvestigatorProfile() }));
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
  
  

    connectedCallback() { }
    DrawComponent = async () => {
        this.append(this.TabContainer);
    }
    WStyle = new WStyledRender({
        ClassList: [
            new WCssClass(`.ProyectClass`, {
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

customElements.define('w-proyect-class', ProyectClass);