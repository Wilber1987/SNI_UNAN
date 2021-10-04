import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel, WCard } from '../WDevCore/WComponents/WCardCarousel.js';
import { StylesControlsV1 } from "../WDevCore/StyleModules/WStyleComponents.js";

const OnLoad = async () => {
    const Id_Investigacion = new URLSearchParams(window.location.search).get('param');
    const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigacion",
        { Id_Investigacion: Id_Investigacion }
    );
    const { WRender } = await import("../WDevCore/WModules/WComponentsTools.js");
    const modules = await import("../MasterDomDetaills.js");
    const ActionFunction = (Object) => {
        window.location = "./ViewProfile.html?param=" + Object.id_Investigador;
    }
    const Card = new WCard({
        titulo: `${response.nombres} ${response.apellidos}`,
        picture: response.foto,
        subtitulo: "Autor",
        descripcion: response.nombreInstitucion,
        id_Investigador: response.id_Investigador
    }, 2, ActionFunction);

    const BodyComponents = new modules.MasterDomDetaills(new WReadInvestigacion(response), Card);
    App.appendChild(WRender.createElement(BodyComponents));
}
class WReadInvestigacion extends HTMLElement {
    constructor(response) {
        super();
        this.response = response;

        this.InvestigacionContainer = WRender.createElement({ type: 'div', props: { class: 'InvestigacionContainer' }, children: [] });
        this.appendChild(WRender.createElement(StylesControlsV1));
        this.append(WRender.createElement(this.styleComponent), this.InvestigacionContainer);
    }
    connectedCallback() {
        if (this.InvestigacionContainer.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async () => {
        const Card = WRender.createElement({
            type: 'div',
            props: { class: 'InvestigacionCard' }, children: [
                {
                    type: 'div', props: { id: '', class: 'Details' }, children: [
                        {
                            type: 'a', props: {
                                onclick: () => { }, innerText: (`${this.response.titulo}`).toUpperCase()
                            }
                        },
                        [{ type: 'img', props: { class: "imgIcon", src: 'https://static.witei.com/static/flat-icons/blueprint.2e0cd5ff617e.svg' } }, "Tipo: " + this.response.descripcion],
                        [{ type: 'img', props: { class: "imgIcon", src: 'https://static.witei.com/static/flat-icons/blueprint.2e0cd5ff617e.svg' } }, "Fecha: " + this.response.fecha_ejecucion],
                        [{
                            type: 'input', props: {
                                type: 'button', class: 'BtnPrimary', value: 'Leer...', onclick: async () => {
                                    window.location = this.response.url_publicacion;
                                }
                            }
                        }]
                    ]
                }
            ]
        });       
        const Detaills = WRender.createElement({
            type: 'div',
            props: { class: 'PropiedadDetails' }, children: [
                {
                    type: 'div', props: { id: '', class: 'DetailsDiv' }, children: [
                        WRender.CreateStringNode("<h4>Resumen</h4>"),
                        this.response.resumen
                    ]
                },
                {
                    type: 'div', props: { id: '', class: 'DetailsDiv' }, children: [
                        WRender.CreateStringNode("<h4>Abstract</h4>"),
                        this.response.abstract
                    ]
                }
            ]
        });
        this.response.colaboradores.forEach(element => {
            element.titulo = `${element.nombres} ${element.apellidos}`;
            element.picture = element.foto;
            element.subtitulo = element.tipoColaboracion;
            element.descripcion = element.nombreInstitucion;
        });
        const Colaboradores = new WCardCarousel(this.response.colaboradores);
        Colaboradores.ActionFunction = (Object) => {
            window.location = "./ViewProfile.html?param=" + Object.id_Investigador;
        }
        if (this.response.photo == null) {
            this.response.photo = ""
        }
        this.InvestigacionContainer.append(WRender.createElement({
            type: 'img',
            props: { src: "data:image/png;base64," + this.response.photo, class: 'photoBaner' }
        }));
        const DisplinesList = WRender.createElement({ type: 'div', props: { class: 'DisciplineClass' } });
        DisplinesList.appendChild(WRender.createElement({
            type: 'w-style', props: {
                id: '', ClassList: [
                    new WCssClass(`.DisciplineClass`, {
                        display: 'flex',
                    }), new WCssClass(`.DisciplineClass div`, {
                        display: 'flex',
                        "justify-content": "space-between",
                        padding: 10,
                        "border-radius": 10,
                        filter: "invert(100%)",
                        "background-color": "#999",
                        margin: "10px 5px",
                        cursor: "pointer",
                        "font-weight": "bold"
                    }), new WCssClass(`.DisciplineClass img`, {
                        height: 18,
                        width: 18,
                        "margin-left": 10
                    }), new WCssClass(`.HeaderDis`, {
                        "color": "#444",
                        "font-size": "22px",
                        "display": "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        margin: 10
                    }),
                ]
            }
        }));
        this.response.disciplinas.forEach(element => {
            if (element.icono == null) {
                return;
            }
            DisplinesList.appendChild(WRender.createElement({
                type: 'div', props: {
                    style: 'background:' + element.color, onclick: async () => {
                        console.log(element)
                    }
                }, children: [
                    element.descripcionDisciplina,
                    { type: 'img', props: { src: 'data:image/png;base64,' + element.icono, class: 'className' } }
                ]
            }));
        });
        this.InvestigacionContainer.append(WRender.createElement(Card));
        this.InvestigacionContainer.append(WRender.CreateStringNode("<h3 class='HeaderDis'>Disciplinas</h3>"));
        this.InvestigacionContainer.append(WRender.createElement(DisplinesList));
        this.InvestigacionContainer.append(WRender.createElement(Detaills));
        this.InvestigacionContainer.append(WRender.createElement({ type: 'h3', props: { innerText: 'Colaboradores' } }));
        this.InvestigacionContainer.append(WRender.createElement(Colaboradores));

    }
    styleComponent = {
        type: 'w-style', props: {
            ClassList: [
                new WCssClass(`.photoBaner`, {
                    width: "95%",
                    "box-shadow": "0 0px 5px 0 rgba(0,0,0,0.6)",
                    "border-radius": "0.3cm",
                    "object-fit": "cover",
                }), new WCssClass(`.InvestigacionContainer`, {
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
            ], MediaQuery: [{
                condicion: "(max-width: 800px)",
                ClassList: [
                    new WCssClass(`.InvestigacionContainer`, {
                        overflow: "hidden",
                        "flex-wrap": "inherit",
                    }), new WCssClass(`w-card-carousel`, {
                        width: "100%"
                    }),
                ]
            }]
        }
    };
}
customElements.define('w-view', WReadInvestigacion);
window.onload = OnLoad;