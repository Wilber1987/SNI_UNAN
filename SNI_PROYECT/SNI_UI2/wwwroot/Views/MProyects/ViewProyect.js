import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel, WCard } from '../../WDevCore/WComponents/WCardCarousel.js';
import { StylesControlsV1 } from "../../WDevCore/StyleModules/WStyleComponents.js";

const OnLoad = async () => {
    const id_Proyecto = new URLSearchParams(window.location.search).get('param');
    const response = await WAjaxTools.PostRequest("../../api/Proyect/TakeProyect",
        { id_Proyecto: id_Proyecto }
    );
    const { WRender } = await import("../../WDevCore/WModules/WComponentsTools.js");
    const modules = await import("../../MasterDomDetaills.js");
    const ActionFunction = (Object) => {
        window.location = "./ViewProfile.html?param=" + Object.id_Investigador;
    }
    const Card = new WCard({
        
    }, 2, ActionFunction);
    const BodyComponents = new modules.MasterDomDetaills(new WViewProyect(response), );
    App.appendChild(WRender.createElement(BodyComponents));
}
class WViewProyect extends HTMLElement {
    constructor(response) {
        super();
        this.response = response;
        this.ProyectContainer = WRender.createElement({ type: 'div', props: { class: 'ProyectContainer' }, children: [] });
        this.appendChild(WRender.createElement(StylesControlsV1));
        this.append(WRender.createElement(this.styleComponent), this.ProyectContainer);
    }
    connectedCallback() {
        if (this.ProyectContainer.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async () => {  
        const Detaills = WRender.createElement({
            type: 'div',
            props: { class: 'PropiedadDetails' }, children: [
                {
                    type: 'div', props: { id: '', class: 'DetailsDiv' }, children: [
                        WRender.CreateStringNode("<h4>Descripción del Proyecto</h4>"),
                        this.response.descripcionProyecto,
                        WRender.CreateStringNode(`<label class="labelDetail">Tipo de Proyecto: ${this.response.descripcion_Tipo_Proyecto}</label>`),
                        WRender.CreateStringNode(`<label class="labelDetail">Estado: ${this.response.estado_Proyecto}</label>`),
                        WRender.CreateStringNode("<h4>Instituciones</h4>"),
                        WRender.CreateStringNode(`<div class="InstitucionesContainer">${
                            this.response.instituciones.map(x=>{
                                return `<div class="InstitucionDiv">
                                    <img src="${x.logo}"/>
                                    <label>${x.nombre}</label>
                                    <label>${x.descripcion}</label>
                                </div>`;
                            }).join('')
                        }</div>`)
                    ]
                }
            ]
        });
        this.ProyectContainer.append(WRender.createElement(Detaills));
        this.ProyectContainer.append(WRender.CreateStringNode("<h4>Participantes</h4>"));
        this.response.participantes.forEach(element => {
            element.titulo = `${element.perfil.nombres} ${element.perfil.apellidos}`;
            element.picture = element.perfil.foto;
            element.subtitulo = element.cargo;
            element.descripcion = "";
        });
        const Colaboradores = new WCardCarousel(this.response.participantes);
        Colaboradores.ActionFunction = (Object) => {
            window.location = location.origin + "/ViewProfile.html?param=" + Object.id_Investigador;
        }
        this.ProyectContainer.append(WRender.createElement(Colaboradores));
    }
    styleComponent = {
        type: 'w-style', props: {
            ClassList: [
                new WCssClass(`.photoBaner`, {
                    width: "95%",
                    "box-shadow": "0 0px 5px 0 rgba(0,0,0,0.6)",
                    "border-radius": "0.3cm",
                    "object-fit": "cover",
                }), new WCssClass(`.ProyectContainer`, {
                    display: 'flex',
                    "align-items": "center",
                    "justify-content": "center",
                    "flex-wrap": "wrap",
                    "flex-direction": "column"
                }), new WCssClass(`.InvestigacionCard`, {
                    display: 'flex',
                    width: "100%",
                    "margin-top": "10px !important",
                    overflow: "hidden",
                    position: "relative",
                    "border-radius": "0.3cm"
                }), new WCssClass(`.InvestigacionCard .Details`, {
                    width: '100%',
                    "text-align": "left",
                    display: "grid",
                    "grid-template-columns": "33% 33% 33%",
                    "grid-template-rows": "50px 80px",
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
                }), new WCssClass(`.InvestigacionCard .Details div`, {
                    padding: 10,
                    background: "rgb(187 187 187 / 50%)",
                    "font-size": 14,
                    "border-radius": "0.2cm",
                    height: "calc(100% - 20px)",
                    display: "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                    "justify-content": "center",
                }), new WCssClass(`.InvestigacionCard .Details div .imgIcon`, {
                    height: "40px !important",
                    width: "40px !important"
                }),
                new WCssClass(`.Animate`, {
                    animation: "cambio 5s infinite",
                }),
                new WCssClass(`.InvestigacionCard img`, {
                    float: "left",
                    width: "400px !important",
                    height: "300px !important",
                }), new WCssClass(`.PropiedadDetails`, {
                    display: 'grid',
                    "grid-template-columns": "100%",
                }), new WCssClass(`.DetailsDiv`, {
                    padding: 10,
                }), new WCssClass(`.DetailsDiv p`, {
                    "text-align": "justify",
                    "font-size": 14
                }), new WCssClass(`.TagContainer`, {
                    display: "grid",
                    "grid-template-columns": "auto auto",
                }), new WCssClass(`.TagContainer label`, {
                    padding: 10,
                    "border-radius": "0.2cm",
                    background: "#0084d2",
                    color: "#fff",
                    margin: 5,
                }),
            ],  MediaQuery: [{
                condicion: "(max-width: 800px)",
                ClassList: [
                    new WCssClass(`.ProyectContainer`, {
                        overflow: "hidden", 
                        "flex-wrap": "inherit",                        
                    }), new WCssClass( `w-card-carousel`, {
                        width: "100%"
                    }),
                ]
            }]
        }
    };
}
customElements.define('w-view', WViewProyect);
window.onload = OnLoad;