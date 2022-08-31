import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel, WCard } from '../../WDevCore/WComponents/WCardCarousel.js';
import { StylesControlsV1 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { ActionFunction } from '../Home.js';


class ProyectDetailViewer extends HTMLElement {
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
                        WRender.CreateStringNode(`<h3 class="headerTitle">Proyecto ${this.response.Nombre_Proyecto}</h3>`),
                        WRender.CreateStringNode("<h4>Descripción del Proyecto <hr></h4>"),
                        this.response.DescripcionProyecto,
                        WRender.CreateStringNode(`<label class="labelDetail">Tipo de Proyecto: ${this.response.Descripcion_Tipo_Proyecto}</label>`),
                        WRender.CreateStringNode(`<label class="labelDetail">Estado: ${this.response.Estado_Proyecto}</label>`),
                        WRender.CreateStringNode(`<label class="labelDetail">Fecha de Inicio: ${this.response.Fecha_Inicio}</label>`),
                        WRender.CreateStringNode("<h4>Instituciones<hr></h4>"),
                        WRender.CreateStringNode(`<div class="InstitucionesContainer">${
                            this.response.Instituciones.map(x=>{
                                return `<div class="InstitucionDiv">
                                    <img src="${x.Institucion.Logo}"/>
                                    <label>${x.Institucion.Nombre}</label>
                                    <label>${x.Asociacion.Descripcion}</label>
                                </div>`;
                            }).join('')
                        }</div>`)
                    ]
                }
            ]
        });
        this.ProyectContainer.append(WRender.createElement(Detaills));
        this.ProyectContainer.append(WRender.CreateStringNode("<h4>Participantes<hr></h4>"));
        this.response.Participantes.forEach(element => {
            element.titulo = `${element.Perfil.Nombres} ${element.Perfil.Apellidos}`;
            element.picture = element.Perfil.Foto;
            element.subtitulo = element.Cargo.Descripcion;
            element.descripcion = "";
        });
        const Colaboradores = new WCardCarousel(this.response.Participantes);
        Colaboradores.ActionFunction = (Object) => {
            ActionFunction(Object.Id_Investigador);
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
customElements.define('w-view', ProyectDetailViewer);
export {ProyectDetailViewer}