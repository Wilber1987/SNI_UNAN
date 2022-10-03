import { WRender, WAjaxTools, GenerateColor, ComponentsManager } from '../../WDevCore/WModules/WComponentsTools.js';
import { css, WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { WAppNavigator } from '../../WDevCore/WComponents/WAppNavigator.js';
class NotificacionesView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: "TabContainer" } });
        this.DOMManager = new ComponentsManager({ MainContainer: this.TabContainer });
        this.shadowRoot.append(
            this.Style,
            WRender.createElement(StylesControlsV2),
            this.NotificationsNav,
            this.TabContainer
        );
        this.DrawNotificacionesView();
    }
    connectedCallback() { }
    DrawNotificacionesView = async () => { }
    NotificationsNav = new WAppNavigator({
        NavStyle: "tab",
        title: "Menu",
        Inicialize: true,
        Elements: [
            {
                name: "INVESTIGACIONES", url: "#",
                action: async (ev) => {

                }
            }, {
                name: "INVITACIONES", url: "#",
                action: async (ev) => {

                }
            }, {
                name: "PARTICIPACIÓN EN EVENTOS", url: "#",
                action: async (ev) => {
                    const Events = await WAjaxTools.PostRequest("../api/Events/GetParticipaciones");
                    const Notifications = Events.filter(E => E.Estado == "PENDIENTE").map(E => {
                        return {
                            TextAction: E.Estado,
                            Object: E,
                            Titulo: `Participación en el evento ${E.Evento.Nombre} pendiente de aprobar`,
                            Descripcion: this.EventDescripcion(E),
                            Fecha: E.Fecha_Participacion,
                            Actions: [
                                {
                                    TextAction: "Aceptar", Action: async (Event) => {
                                        const Events = await WAjaxTools.PostRequest("../api/Events/AprobarParticipacion", Event);
                                    }
                                }, {
                                    TextAction: "Rechazar", Action: async (Event) => {
                                        const Events = await WAjaxTools.PostRequest("../api/Events/RechazarParticipacion", Event);
                                    }
                                }
                            ]
                        }
                    });
                    this.DOMManager.NavigateFunction("Tab-eventos", this.DrawNotificaciones(Notifications));
                }
            }
        ]
    })
    DrawNotificaciones = (Dataset = []) => {
        return WRender.Create({
            className: "GroupDiv", children: Dataset.map(n => {
                return this.CreateNotificacion(n)
            })
        })
    }
    CreateNotificacion = (Notificacion) => {
        const NotificacionContainer = WRender.Create({
            className: "NotificationContainer", children: [
                { tagName: 'label', className: "titulo", innerText: Notificacion.Titulo },
                { tagName: 'label', innerText: Notificacion.Fecha },
                { tagName: 'p', innerText: Notificacion.Descripcion },
                Notificacion.Actions.map(a => ({
                    tagName: 'input', type: 'button', className: 'btn', value: a.TextAction, onclick: async () => {
                        await a.Action(Notificacion.Object)
                    }
                }))
            ]
        })
        return NotificacionContainer;
    }
    Style = css`
        .NotificationContainer{
            padding: 20px;
            border-radius: 0.3cm;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 3px 0 rgba(0,0,0,0.2);
            background-color: #fff;
            margin: 10px;    
        }
    `

    EventDescripcion(E) {
        return `${E.Evento.Investigador?.Nombres} ${E.Evento.Investigador?.Apellidos} Indico que participarias en el evento con el rol de ${E.Tipo_Participacion.Descripcion} de ${E.Titulo} el ${E.Fecha_Participacion}`;
    }
}
customElements.define('w-notificaciones-view', NotificacionesView);
export { NotificacionesView }