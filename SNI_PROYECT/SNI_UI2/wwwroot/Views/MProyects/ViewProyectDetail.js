import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel, WCard } from '../../WDevCore/WComponents/WCardCarousel.js';
import { StylesControlsV1 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { AsideV1 } from "../../AppComponents/AsideV1.js";
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
    const Disciplinas =  await WAjaxTools.PostRequest("../../api/Investigaciones/TakeDisciplinas");      
    const BodyComponents = new modules.MasterDomDetaills(new ViewProyectDetail(response), [ new AsideV1(Disciplinas)] );
    App.appendChild(WRender.createElement(BodyComponents));
}
class ViewProyectDetail extends HTMLElement {
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
                        WRender.CreateStringNode(`<h3 class="headerTitle">Proyecto ${this.response.nombre_Proyecto}</h3>`),
                        WRender.CreateStringNode("<h4>Descripción del Proyecto <hr></h4>"),
                        this.response.descripcionProyecto,
                        WRender.CreateStringNode(`<label class="labelDetail">Tipo de Proyecto: ${this.response.descripcion_Tipo_Proyecto}</label>`),
                        WRender.CreateStringNode(`<label class="labelDetail">Estado: ${this.response.estado_Proyecto}</label>`),
                        WRender.CreateStringNode(`<label class="labelDetail">Fecha de Inicio: ${this.response.fecha_Inicio}</label>`),
                        WRender.CreateStringNode("<h4>Instituciones<hr></h4>"),
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
        this.ProyectContainer.append(WRender.CreateStringNode("<h4>Participantes<hr></h4>"));
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
                new WCssClass(`.ProyectContainer`, {
                    display: 'flex',
                    "align-items": "center",
                    "justify-content": "center",
                    "flex-wrap": "wrap",
                    "flex-direction": "column",
                    padding: 20,
                    margin: 10,
                    "background-color": "#fff",
                    "box-shadow": "0 0px 5px 0 rgba(0,0,0,0.6)",
                    "border-radius": "0.3cm",
                    overflow: "hidden",
                    "text-align": "justify"
                }), new WCssClass( `.InstitucionesContainer`, {
                    display: 'flex',
                    "justify-content": "center"
                }),new WCssClass( `.DetailsDiv`, {
                    display: 'flex',
                    "flex-direction": "column",
                }),new WCssClass( `.InstitucionDiv`, {
                    display: 'flex',
                    "flex-direction": "column",
                    "box-shadow": "0 0px 5px 0 rgba(0,0,0,0.6)",
                    overflow: "hidden",
                    "border-radius": "0.2cm",
                    margin: 10,
                    "align-items": "center", 
                    "justify-content": "center",
                    padding: 5,
                    width: 120,
                    height: 150,
                    "font-size": 12,
                }),new WCssClass( `.InstitucionDiv img`, {
                    width: 80,
                    height: 80,
                    margin: 5,
                    "object-fit": "cover"
                }),new WCssClass( `.headerTitle`, {
                    "text-align": 'center',
                    padding:10,
                    margin: 0
                }), new WCssClass( `.labelDetail`, {
                    "border-radius": "0.2cm",
                    color: "#fff",
                    "background-color": "#28a745",
                    "font-size": 13,
                    padding: "5px 10px",
                    margin: 5,
                    width: 300
                }),new WCssClass(`w-card-carousel`, {
                    //width: "100%"
                }),
            ],  MediaQuery: [{
                condicion: "(max-width: 800px)",
                ClassList: [
                    new WCssClass(`.ProyectContainer`, {
                        overflow: "hidden", 
                        "flex-wrap": "inherit",                        
                    }), new WCssClass( `w-card-carousel`, {
                        //width: "100%"
                    }),
                ]
            }]
        }
    };
}
customElements.define('w-view', ViewProyectDetail);
export {ViewProyectDetail}
window.onload = OnLoad;