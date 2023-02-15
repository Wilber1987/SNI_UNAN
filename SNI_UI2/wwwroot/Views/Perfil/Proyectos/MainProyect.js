import { WAppNavigator } from '../../../WDevCore/WComponents/WAppNavigator.js';
import { WRender, ComponentsManager, WAjaxTools, WArrayF } from '../../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../../../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2, StylesControlsV3 } from "../../../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../../../WDevCore/WComponents/WModalForm.js";
import { ModalVericateAction, WForm } from "../../../WDevCore/WComponents/WForm.js";
import { InvestigadorProfile } from "../../../Model/InvestigadorProfile.js";
import { ProyectoTableActividades, Tbl_Evento, Tbl_Investigaciones, Tbl_InvestigatorProfile } from '../../../Model/DBODataBaseModel.js';
import { WDetailObject } from '../../../WDevCore/WComponents/WDetailObject.js';
import { ColumChart, RadialChart } from '../../../WDevCore/WComponents/WChartJSComponents.js';
import { WTableDynamicComp } from '../../../WDevCore/WComponents/WTableDynamic.js';

const OnLoad = async () => {
    Aside.append(WRender.Create({ tagName: "h3", innerText: "Administración de perfiles" }));
    const AdminPerfil = new MainProyect();
    Aside.append(AdminPerfil.MainNav);
    Main.appendChild(AdminPerfil);

}
window.onload = OnLoad;
class MainProyect extends HTMLElement {
    constructor() {
        super();
        this.id = "MainProyect";
        this.className = "MainProyect DivContainer";
        this.append(this.WStyle, StylesControlsV3.cloneNode(true));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.TabManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.OptionContainer = WRender.Create({ className: "OptionContainer" });
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
                    this.TabManager.NavigateFunction("Tab-Generales",
                        new MainProyects());
                }
            }, {
                name: "Investigaciones", action: async (ev) => { this.NavInvestigaciones("Tab-Investigaciones"); }
            }
        ]
    });

    connectedCallback() { }
    DrawComponent = async () => {
        this.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Btn-Basic', value: 'Nueva', onclick: this.action }))
        this.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Btn-Alert', value: 'Ok', onclick: this.action }))
        this.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Btn-Success', value: 'Ok', onclick: this.action }))
        this.append(WRender.Create({ tagName: 'input', type: 'button', className: 'Btn-Secundary', value: 'Ok', onclick: this.action }))
        const dataset = await new ProyectoTableActividades().Get();
        const columChart = new ColumChart({
            Dataset: dataset.map(x => {
                x.Dependencia = x.ProyectoCatDependencias.Descripcion;
                if (x.ProyectoTableTareas != undefined && x.ProyectoTableTareas != null) {
                    x.progreso = x.ProyectoTableTareas.filter(t => t.Estado == "Finalizada" ).length / x.ProyectoTableTareas.length * 100;
                } else x.progreso = 0;
                return x;
            }), ColumnLabelDisplay : 1, EvalValue: "progreso", AttNameEval: "Descripcion", groupParams: ["Dependencia"]
        });
        const radialChart = new RadialChart({ Dataset: WArrayF.ArrayUnique(dataset), EvalValue: "count", AttNameEval: "Estado", groupParams: ["Dependencia"] });
        //new WTableDynamicComp({Dataset: dataset})
        this.TabContainer.append(columChart, radialChart)
        this.append(this.OptionContainer, this.TabContainer);
    }
    action = async () => {

    }
    WStyle = new WStyledRender({
        ClassList: [
            new WCssClass(`.MainProyect`, {
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

customElements.define('w-proyect-class', MainProyect);
class MainProyects extends HTMLElement {
    constructor() {
        super(); this.attachShadow({ mode: 'open' }); this.DrawMainProyects();
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.TabManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.OptionContainer = WRender.Create({ className: "OptionContainer" });
    }
    connectedCallback() { }
    DrawMainProyects = async () => {
        this.append(this.OptionContainer, this.TabContainer);
    }
}
customElements.define('w-main-proyects', MainProyects);
export { MainProyects }