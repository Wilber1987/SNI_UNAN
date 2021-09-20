import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel } from '../WDevCore/WComponents/WCardCarousel.js';
const OnLoad = async () => {
    const Id_Investigacion = new URLSearchParams(window.location.search).get('param');
    const { WRender } = await import("../WDevCore/WModules/WComponentsTools.js");
    const modules = await import("../MasterDomDetaills.js");
    const BodyComponents = new modules.MasterDomDetaills(new WReadInvestigacion(Id_Investigacion));
    App.appendChild(WRender.createElement(BodyComponents));
}
class WReadInvestigacion extends HTMLElement {
    constructor(Id) {
        super();
        this.Id_Investigacion = Id;
        this.styleComponent = {
            type: 'w-style', props: {
                ClassList: [
                    new WCssClass(`#MyMain`, {
                        //"margin-top": "80px !important",
                        display: 'flex',
                        "align-items": "center",
                        "justify-content": "center",
                        "text-align": "justify",
                        "flex-direction": "column",
                        //height: 500,
                        "padding-top": "10px !important",
                        overflow: "hidden",
                        width: "100VW",
                        //transform: "translateX(-450px)",
                    }), new WCssClass(`.InvestigacionContainer`, {
                        display: 'flex',
                        "align-items": "center",
                        "justify-content": "center",
                        "flex-wrap": "wrap"
                    }), new WCssClass(`.InvestigacionCard`, {
                        display: 'flex',
                        width: "100%",
                        //height: 300,                   
                        //background: "#eee",
                        "margin-top": "10px !important",
                        overflow: "hidden",
                        position: "relative",
                        //"box-shadow": "0 2px 2px 0 rgba(0,0,0,0.4)",
                        "border-radius": "0.3cm"
                    }), new WCssClass(`.InvestigacionCard .Details`, {
                        width: '100%',
                        //position: "absolute",
                        "text-align": "left",
                        display: "grid",
                        "grid-template-columns": "auto auto auto",
                        "grid-template-rows": "50px auto",
                        "grid-gap": 5,
                        "text-align": "center",
                        bottom: 0,
                        left: 10,
                        right: 0,
                        color: "#444"
                    }), new WCssClass(`.InvestigacionCard .Details a`, {
                        "grid-column": "1/4",
                        color: "#444 !important",
                        padding: 10,
                        margin: 0,
                        background: "rgb(187 187 187 / 50%)",
                        "font-size": 16,
                        "border-radius": "0.2cm"
                        // display: "flex"
                    }), new WCssClass(`.InvestigacionCard .Details div`, {
                        padding: 10,
                        background: "rgb(187 187 187 / 50%)",
                        "font-size": 14,
                        "border-radius": "0.2cm",
                        height: "100%",
                        display: "flex",
                        "flex-direction": "column",
                        "align-items": "center",
                        "justify-content": "center",
                        //margin: 5
                        // display: "flex"
                    }), new WCssClass(`.InvestigacionCard .Details div .imgIcon`, {
                        height: "40px !important",
                        width: "40px !important"
                    }),
                    new WCssClass(`.Animate`, {
                        animation: "cambio 5s infinite",
                    }),
                    new WCssClass(`.InvestigacionCard img`, {
                        //"width": '20%',
                        float: "left",
                        width: "400px !important",
                        height: "300px !important",
                        //animation: "cambio 20s infinite alternate linear",
                    }), new WCssClass(`.PropiedadDetails`, {
                        display: 'grid',
                        "grid-template-columns": "50% 50%",
                    }), new WCssClass(`.DetailsDiv`, {
                        padding: 10,
                    }), new WCssClass(`.TagContainer`, {
                        display: "grid",
                        //"flex-direction": "column",  
                        "grid-template-columns": "auto auto",
                    }), new WCssClass(`.TagContainer label`, {
                        padding: 10,
                        "border-radius": "0.2cm",
                        background: "#0084d2",
                        color: "#fff",
                        margin: 5,
                    }),
                ]
            }
        };
        this.InvestigacionContainer = WRender.createElement({ type: 'div', props: { class: 'InvestigacionContainer' }, children: [] });        
        this.append(WRender.createElement(this.styleComponent), this.InvestigacionContainer);
    }
    connectedCallback() {
        if (this.InvestigacionContainer.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async () => {
        const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigacion",
            { Id_Investigacion: this.Id_Investigacion }
        );
        console.log(response);
        const Card = WRender.createElement({
            type: 'div',
            props: { class: 'InvestigacionCard' }, children: [
                {
                    type: 'div', props: { id: '', class: 'Details' }, children: [
                        {
                            type: 'a', props: {
                                onclick: () => { }, innerText: (`${response.titulo}`).toUpperCase()
                            }
                        },
                        [{ type: 'img', props: { class: "imgIcon", src: 'https://static.witei.com/static/flat-icons/blueprint.2e0cd5ff617e.svg' } }, "Tipo: " + response.descripcion ],
                        [{ type: 'img', props: { class: "imgIcon", src: 'https://static.witei.com/static/flat-icons/blueprint.2e0cd5ff617e.svg' } }, "Fecha: " + response.fecha_ejecucion ],
                        [{
                            type: 'input', props: {
                                type: 'button', class: 'BtnPrimary', value: 'Leer...', onclick: async () => {
                                    window.location = response.url_publicacion;
                                }
                            }
                        }]
                    ]
                }
            ]
        });
        const divCar = { type: 'div', props: { id: '', class: 'TagContainer' }, children: [] };
        const Detaills = WRender.createElement({
            type: 'div',
            props: { class: 'PropiedadDetails' }, children: [
                {
                    type: 'div', props: { id: '', class: 'DetailsDiv' }, children: [
                        WRender.CreateStringNode("<h4>Resumen de la Investigación</h4>"),
                        response.resumen]
                },
                {
                    type: 'div', props: { id: '', class: 'DetailsDiv' }, children: [
                        WRender.CreateStringNode("<h4>Características de la Investigación</h4>"),
                        divCar]
                }
            ]
        });
        
        const Colaboradores = new WCardCarousel(response.colaboradores); 
        this.InvestigacionContainer.append(WRender.createElement(Card));
        this.InvestigacionContainer.append(WRender.createElement(Detaills));
        this.InvestigacionContainer.append(WRender.createElement(Colaboradores));

    }
}
customElements.define('w-view', WReadInvestigacion);
window.onload = OnLoad;