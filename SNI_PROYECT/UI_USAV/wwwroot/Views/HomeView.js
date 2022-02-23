import { WAppNavigator } from '../WDevCore/WComponents/WAppNavigator.js';
import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../WDevCore/WModules/WStyledRender.js';
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../WDevCore/StyleModules/WStyleComponents.js";
import { WModalForm } from "../WDevCore/WComponents/WModalForm.js";
import { WCardCarousel } from "../WDevCore/WComponents/WCardCarousel.js";
//HOMEpARTS
import { CarroselDivHomeLastAd } from "./ViewComponents/HomeLastAd.js";
import { DivTipologia } from "./ViewComponents/HomeTipologias.js";
import { CarroselDivHomeCategory } from "./ViewComponents/HomeCategory.js";
import { DivHomeServicios } from "./ViewComponents/HomeServicios.JS";
import { DivFooter } from "./ViewComponents/HomeFooter.js";
class HomeView extends HTMLElement {
    constructor() {
        super();
        this.className = "HomeView DivContainer";
        this.append(this.WStyle, WRender.createElement(StylesControlsV2));
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.Divs = WRender.CreateStringNode(`<div>
            <div class="FormContainer">
           
            </div>
        </div>`);
        const EquipoTrabajo = [
            { Name: "Wilber", Cargo: "Responsable" },
            { Name: "Marlon", Cargo: "Responsable" },
            { Name: "Marlon", Cargo: "Responsable" }
        ];
        this.CarruselEquipo = new WCardCarousel(EquipoTrabajo);
        this.DrawComponent();
    }
    connectedCallback() { }
    DrawComponent = async () => {
        this.append(           
            WRender.CreateStringNode("<h2>Articulos</h2>"),
            CarroselDivHomeLastAd,            
            WRender.CreateStringNode("<h2>Articulos</h2>"),
            DivHomeServicios,
            WRender.CreateStringNode("<h2>Articulos</h2>"),
            CarroselDivHomeCategory,
            WRender.CreateStringNode("<h2>Equipo</h2>"),
            this.CarruselEquipo,
            DivFooter
        );
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
            }), new WCssClass( `w-card-carousel`, {
                width: "85%",
                margin: "auto"
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

