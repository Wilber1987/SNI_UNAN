import { WRender, WAjaxTools, GenerateColor, ComponentsManager } from '../../WDevCore/WModules/WComponentsTools.js';
import { css, WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { Tbl_Evento } from '../../Model/ModelDatabase.js';
import { WAppNavigator } from '../../WDevCore/WComponents/WAppNavigator.js';
class EventViewer extends HTMLElement {
    constructor(Evento = new Tbl_Evento(), actionReturn = () => { }) {
        super();
        this.attachShadow({ mode: 'open' });
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.DOMManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.shadowRoot.append(
            this.Style,
            this.BtnReturn,
            WRender.createElement(StylesControlsV2),
            this.TabContainer
        );
        this.actionReturn = actionReturn;
        this.Evento = Evento;
        this.DrawEventsView();
    }
    connectedCallback() { }
    DrawEventsView = async () => {
        const Evento = await WAjaxTools.PostRequest("../api/Events/GetEvento", this.Evento);
        const EventoContainer = WRender.Create({ class: 'ViewEventsContainer' });
        EventoContainer.append(this.GroupDiv(Evento))
        this.DOMManager.NavigateFunction("Tab-Evento", EventoContainer, "TabContainer");
    }
    GroupDiv = (Evento = (new Tbl_Evento()), type = "PRÓXIMO") => {
        const GrupoDiv = WRender.Create({
            className: "GroupDiv",
            style: {
                backgroundColor: Evento.color
            }, children: [
                WRender.Create({
                    tagName: "h4", innerText: Evento.Titulo_Ponencia,
                    style: { background: type == "PRÓXIMO" ? "#044f8f" : undefined }
                }),
                WRender.Create({ tagName: "h5", innerText: Evento.Nombre }),
                WRender.Create({ tagName: "h5", innerText: "Participantes" }),
                WRender.Create({
                    tagName: "InvestigadoresACont", children: Evento.Participantes.map(I => ({
                        tagName: 'img',
                        src: "data:image/png;base64," + I.Investigador.Foto
                    }))
                }),
                WRender.Create({
                    tagName: "label",
                    innerText: `Fecha: del ${Evento.Fecha_Inicio} ${Evento.Fecha_Finalizacion ? " Al " + Evento.Fecha_Finalizacion : ""}`
                }),
                WRender.Create({ tagName: "label", innerText: "Tipo: " + Evento.Modalidad }),
                WRender.Create({ tagName: "p", innerText: "Tipo: " + Evento.Datos_Adicionales })
            ]
        })
        //OPTIONS
        GrupoDiv.appendChild(WRender.Create({
            className: "GroupOptions", children: [{
                tagName: 'input', type: 'button', className: 'BtnSuccess', value: 'Ver detalle', onclick: async () => {

                }
            }]
        }));
        return GrupoDiv;
    }
    BtnReturn = WRender.Create({
        className: "GroupOptions", children: [{
            tagName: 'input', type: 'button', className: 'BtnSuccess BtnReturn', value: 'Regresar', onclick: async () => {
                this.actionReturn();
            }
        }]
    })
    Style = new WStyledRender({
        ClassList: [
            new WCssClass(`.ViewEventsContainer, .ViewEventsContainer`, {
                display: 'flex',
                "flex-wrap": "wrap",            
            }), new WCssClass(`.GroupDiv`, {
                width: "100%",
                padding: 0,
                margin: 10,
                background: "#eee",
                "box-shadow": "0 0 3px 0 rgba(0,0,0,0.5)",
                "border-radius": 5,
                display: "flex",
                "justify-content": "flex-start",
                "flex-direction": "column",
                "align-items": "flex-start",
                color: "#2e2e2e",
                background: "#fff",
                "text-align": "justify",
                overflow: "hidden"
            }), new WCssClass(`.GroupDiv *`, {
                margin: 0, padding: "10px 30px",
            }), new WCssClass(`.GroupDiv h4`, {
                margin: 0, "margin-bottom": 20, padding: 20,
                display: "flex",
                width: "calc(100% - 40px)",
                "justify-content": "center",
                "flex-direction": "row",
                "align-items": "center",
                color: "#fff",
                background: "#468f04"
            }), new WCssClass(`.GroupDiv img`, {
                padding: 0,
                height: 50, width: 50, "border-radius": "50%",
                margin: 10, overflow: "hidden", "box-shadow": "0 0 3px 0 rgba(0,0,0,0.5)"
            }), new WCssClass(`.GroupOptions`, {
                display: "flex",
                width: "calc(100% - 60px)",
                "justify-content": "flex-end",
                "flex-direction": "row",
                "align-items": "center",
                "border-top": "solid 1px #999"
            }),
        ], MediaQuery: [{
            condicion: '(max-width: 600px)',
            ClassList: []
        }]
    });
}
customElements.define('w-event-viewer', EventViewer);
export { EventViewer }