import { ComponentsManager, WAjaxTools, WRender, WArrayF } from "../WDevCore/WModules/WComponentsTools.js";
import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import { WArticlesComponent } from "../WDevCore/WComponents/WArticlesComponent.js";
import { WCard } from "../WDevCore/WComponents/WCardCarousel.js";
import { InvestigacionViewer } from "./MInvestigaciones/InvestigacionViewer.js";
import { WModalForm } from "../WDevCore/WComponents/WModalForm.js";
import { WProfileInvestigador } from "./Perfil/ViewProfile.js";
import { InvestigacionesViewer } from "./MInvestigaciones/InvestigacionesViewer.js";

class HomeClass extends HTMLElement {
    constructor(response) {
        super();
        this.id = "HomeClass";
        this.className = "HomeClass DivContainer";
        this.response = response;
        this.contain = WRender.createElement({ type: 'div', props: { id: '', class: 'CardContainer' }, children: [] });
        this.append(WRender.createElement(this.Style));
        this.append(this.contain);
    }
    connectedCallback() {
        if (this.contain.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async () => {
        this.append(new InvestigacionesViewer({
            id: "Artcles",
            ArticleHeader: ["Foto", "Nombres", "Apellidos", "Fecha_ejecucion"],
            ArticleBody: ["Titulo", "Investigador", "Resumen"],
            Dataset: this.response, Options: {
                Search: true,
                ApiUrlSearch: "api/Investigaciones/TakeInvestigaciones",
                UserActions: [{
                    name: "Leer...", Function: async (Article) => {
                        //const Id_Investigacion = new URLSearchParams(window.location.search).get('param');
                        const Id_Investigacion = Article.Id_Investigacion;
                        const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigacion",
                            { Id_Investigacion: Id_Investigacion }
                        );
                        const Card = new WCard({
                            titulo: `${response.Investigador.Nombres}`,
                            picture: response.Investigador.Foto,
                            subtitulo: "Autor",
                            descripcion: response.Investigador.NombreInstitucion,
                            id_Investigador: response.Investigador.Id_Investigador
                        }, 2, () => {
                            ActionFunction(response.Id_Investigador, this);
                        });
                        const Reader = new InvestigacionViewer(response);                          
                        const Modal = ModalComp(Reader, Card);
                        this.append(Modal)
                    }
                }]
            }
        }))
    }    
    Style = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".CardContainer", {
                    display: "flex",
                    "flex-direction": "column"
                }), new WCssClass(".CardInves", {
                    overflow: "auto",
                    padding: "20px",
                    "margin-bottom": 10,
                    "margin-left": 5,
                    "margin-right": 5,
                    "min-height": 100,
                    "border-radius": "0.2cm",
                    "background-color": "#fff",
                    "box-shadow": "0 0px 3px 0 rgba(0,0,0,0.4)"
                }),
            ], MediaQuery: [{
                condicion: "(max-width: 1200px)",
                ClassList: [
                    new WCssClass(".ImagesContainer", {
                        display: "grid",
                        "grid-template-columns": "auto auto auto"
                    })
                ]
            }, {
                condicion: "(max-width: 600px)",
                ClassList: [
                    new WCssClass(".ImagesContainer", {
                        display: "grid",
                        "grid-template-columns": "auto auto"
                    })
                ]
            }]
        }
    };
}
customElements.define("app-home", HomeClass);
const ActionFunction = async (Id_Investigador, Container) => {
    const response = await WAjaxTools.PostRequest("../api/Investigaciones/TakeInvestigadorProfile",
        { Id_Investigador: Id_Investigador }
    );
    const divRedes = WRender.createElement({ type: 'div', props: { id: '', class: 'divRedes' } });
    const cadenaB64 = "data:image/png;base64,";
    response.RedesSociales.forEach(element => {
        divRedes.append(WRender.createElement([{ type: 'img', props: { src: cadenaB64 + element.Icon, class: 'RedsIcon' } },
        { type: 'a', props: { innerText: element.Descripcion, href: element.Url_red_inv, target: "_blank" } }]));
    });
    divRedes.append(WRender.CreateStringNode("<hr style='margin-top: 30px'>"))
    const dataResume = WRender.createElement({
        type: 'div', props: { id: '', class: 'ResumenContainer' }, children: [
            WRender.CreateStringNode("<h3>Logros</h3>"),
            "Investigaciones: " + response.Investigaciones?.length,
            "Proyectos: " + response.Proyectos?.length,
            "Colaboraciones: " + response.Colaboraciones?.length,
            WRender.CreateStringNode("<h3>Redes Sociales</h3>"),
            divRedes
        ]
    });
    const BodyComponents = new WProfileInvestigador(response);
    const Modal = ModalComp(BodyComponents, dataResume);
    Container.appendChild(WRender.createElement(Modal));
}

function ModalComp(BodyComponents, dataResume) {
    return new WModalForm({
        title: "Perfil",
        StyleForm: "FullScreen",
        ObjectModal: WRender.Create({
            style: {
                display: "grid",
                gridTemplateColumns: "calc(98% - 270px) 250px",
                justifyContent: "center",
                margin: "5px"
            }, children: [BodyComponents, dataResume]
        })
    });
}

export { HomeClass, ActionFunction, ModalComp }