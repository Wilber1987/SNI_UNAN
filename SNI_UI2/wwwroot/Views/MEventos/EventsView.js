import { WRender, WAjaxTools, GenerateColor, ComponentsManager } from '../../WDevCore/WModules/WComponentsTools.js';
import { WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { Tbl_Evento } from '../../Model/ModelDatabase.js';
import { WAppNavigator } from '../../WDevCore/WComponents/WAppNavigator.js';
import { EventViewer } from './EventViewer.js';
class EventsView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.DOMManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.shadowRoot.append(
            this.Style,
            WRender.createElement(StylesControlsV2),
            this.EventsNav,
            this.TabContainer
        );
        this.DrawEventsView();
    }
    connectedCallback() { }
    DrawEventsView = async () => { }
    EventsNav = new WAppNavigator({
        NavStyle: "tab",
        title: "Menu",
        Inicialize: true,
        Elements: [
            {
                name: "PRÓXIMOS", url: "#",
                action: async (ev) => {
                    this.ChargeEvents()
                }
            }, {
                name: "INVITACIONES", url: "#",
                action: async (ev) => {
                    this.ChargeEvents("GetEventosInvitados")
                }
            }, {
                name: "MIS EVENTOS", url: "#",
                action: async (ev) => {
                    this.ChargeEvents("GetEventosPropios", "PROPIOS")
                }
            }
        ]
    })
    GroupDiv = (Evento = (new Tbl_Evento()), type = "PRÓXIMO") => {
        const GrupoDiv = WRender.Create({
            className: "GroupDiv",
            style: {
                backgroundColor: Evento.color
            }, children: [
                WRender.Create({ tagName: "h4", innerText: Evento.Nombre, style: { background: type == "PRÓXIMO" ? "#044f8f" : undefined } }),
                WRender.Create({ tagName: "p", innerText: Evento.Descripcion, style: { background: type == "PRÓXIMO" ? "#044f8f" : undefined } }),
               WRender.Create({
                    tagName: "label",
                    innerText: `Fecha: del ${Evento.Fecha_Inicio?.toDateFormatEs()} ${Evento.Fecha_Finalizacion?.toDateFormatEs() ? " Al " + Evento.Fecha_Finalizacion?.toDateFormatEs() : ""}`
                }),
                WRender.Create({ tagName: "label", innerText: "Tipo: " + Evento.Modalidad }),
                WRender.Create({ tagName: "p", innerText: "Datos adicionales: " + Evento.Datos_Adicionales }),
                WRender.Create({ tagName: "h5", innerText: "Participantes" }),
                WRender.Create({
                    tagName: "InvestigadoresACont", children: Evento.Participantes.map(I => ({
                        tagName: 'img',
                        src: "data:image/png;base64," + I.Tbl_InvestigatorProfile?.Foto
                    }))
                }),
            ]
        })
        //OPTIONS
        GrupoDiv.appendChild(WRender.Create({
            className: "GroupOptions", children: [{
                tagName: 'input', type: 'button', className: 'BtnSuccess', value: 'Ver detalle', onclick: async () => {
                    this.DOMManager.NavigateFunction("Tab-evento" + Evento.Id_Evento,
                        new EventViewer(Evento, () => { this.DOMManager.Back(); }), "TabContainer");
                }
            }]
        }));        
        return GrupoDiv;
    }
    ChargeEvents = async (path = "GetEventos", type = "PRÓXIMOS") => {
        const Events = await WAjaxTools.PostRequest("../api/Events/" + path);
        const EventsContainer = WRender.Create({ class: 'ViewEventsContainer' });
        Events.forEach(group => {
            EventsContainer.append(this.GroupDiv(group, type))
        });
        this.DOMManager.NavigateFunction("Tab-Events" + path, EventsContainer, "TabContainer");
    }
    Style = new WStyledRender({
        ClassList: [
            new WCssClass(`.ViewEventsContainer, .ViewEventsContainer`, {
                display: 'flex',
                "flex-wrap": "wrap"
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
                height: 80, width: 80, "border-radius": "50%",
                margin: 10, overflow: "hidden", "box-shadow": "0 0 3px 0 rgba(0,0,0,0.5)",
                "object-fit": "cover"
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
customElements.define('w-events-view', EventsView);
export { EventsView }