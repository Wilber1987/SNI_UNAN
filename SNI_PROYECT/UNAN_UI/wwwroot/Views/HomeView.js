import { WAppNavigator } from '../WDevCore/WComponents/WAppNavigator.js';
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../WDevCore/WComponents/WModalForm.js";
import { ReservarComponent } from "./ViewComponents/ReservaComponent.js";

class HomeView extends HTMLElement {
    constructor() {
        super();
        this.className = "HomeView DivContainer";
        this.append(this.WStyle, WRender.createElement(StylesControlsV2));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.TabManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.OptionContainer = WRender.Create({
            className: "OptionContainer",
            children: [
                {
                    tagName: 'input', type: 'button', className: 'Btn', value: 'Nueva',
                    onclick: async () => {
                        this.append(new WModalForm({
                            ObjectModal: new ReservarComponent(),
                            ShadowRoot: false,
                            StyleForm: "columnX3"
                        }))
                    }
                }, {
                    tagName: 'input', type: 'button', className: 'BtnSuccess', value: 'Otras',
                    onclick: async () => {
                        //code.....
                    }
                }
            ]
        });
        this.TabActividades = new WAppNavigator({
            NavStyle: "tab",
            Inicialize: true,
            Elements: [
                {
                    name: "En Proceso", url: "#",
                    action: async (ev) => {
                        const Dataset = [];
                        this.TabManager.NavigateFunction("Tab-Investigaciones", new WTableComponent({
                            Dataset: Dataset,
                            DisplayData: ['prop', 'prop', 'prop', 'prop', 'prop'],
                            Options: {
                                Search: true, UrlSearch: 'api_route',
                                Add: true, UrlAdd: 'api_route',
                                UserActions: [{ name: 'Log...', Function: (TableElement) => { console.log(TableElement); } }]
                            }
                        }));
                    }
                }, {
                    name: "Pendientes", url: "#",
                    action: async (ev) => {
                        const Dataset = [];
                        this.TabManager.NavigateFunction("Tab-Investigaciones", new WTableComponent({
                            Dataset: Dataset,
                            DisplayData: ['prop', 'prop', 'prop', 'prop', 'prop'],
                            Options: {
                                Search: true, UrlSearch: 'api_route',
                                Add: true, UrlAdd: 'api_route',
                                UserActions: [{ name: 'Log...', Function: (TableElement) => { console.log(TableElement); } }]
                            }
                        }));
                    }
                }, {
                    name: "Ejecutadas", url: "#",
                    action: async (ev) => {
                        const Dataset = [];
                        this.TabManager.NavigateFunction("Tab-Colaboraciones", new WTableComponent({
                            Dataset: Dataset,
                            DisplayData: ['prop', 'prop', 'prop', 'prop', 'prop'],
                            Options: {
                                Search: true, UrlSearch: 'api_route',
                                Add: true, UrlAdd: 'api_route',
                                UserActions: [{ name: 'Log...', Function: (TableElement) => { console.log(TableElement); } }]
                            }
                        }));
                    }
                }
            ]
        });
        
        this.DrawComponent();
    }
    connectedCallback() { }
    DrawComponent = async () => {
        this.append(this.OptionContainer, this.TabActividades, this.TabContainer);
    }
    WStyle = new WStyledRender({
        ClassList: [
            new WCssClass(`.HomeView`, {
                display: 'flex',
                "flex-direction": "column"
            }), new WCssClass(`.OptionContainer`, {
                display: 'flex',
                "justify-content": "center",
            }), new WCssClass(`.OptionContainer img`, {
                "box-shadow": "0 0 4px rgb(0,0,0/50%)",
                height: 100,
                width: 100,
                margin: 10
            }), new WCssClass(`.TabContainer`, {
                height: 500,
                overflow: "hidden",
                "overflow-y": "auto"
            }),
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

customElements.define('w-home', HomeView);
export { HomeView }

