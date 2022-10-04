import { WRender, WAjaxTools, GenerateColor, ComponentsManager } from '../../WDevCore/WModules/WComponentsTools.js';
import { css, WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { WAppNavigator } from '../../WDevCore/WComponents/WAppNavigator.js';
import { ModalVericateAction } from '../../WDevCore/WComponents/WForm.js';
import { Tbl_Investigaciones } from '../../Model/ModelDatabase.js';
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
                    const Investigaciones = await WAjaxTools.PostRequest("../api/Investigaciones/GetUltimasInvestigaciones");
                    const Notifications = Investigaciones.map((E = (new Tbl_Investigaciones())) => {
                        return {
                            TextAction: E.Estado,
                            Object: E,
                            Titulo: `Se ha publicado una nueva investigación "${E.Titulo}"`,
                            Descripcion: this.InvestigacionesDescripcion(E),
                            Fecha: E.Fecha_ejecucion,
                            Actions: [
                                {
                                    TextAction: "Ver", Action: async () => {
                                        window.open(E.url_publicacion, '_blank');
                                    }
                                }
                            ]
                        }
                    });
                    this.DOMManager.NavigateFunction("Tab-investigaciones", this.DrawNotificaciones(Notifications));
                }
            }, {
                name: "INVITACIONES", url: "#",
                action: async (ev) => {
                    const Invitaciones = await WAjaxTools.PostRequest("../api/Events/GetEventosInvitaciones");
                    const Notifications = Invitaciones.filter(E => E.Estado == "PENDIENTE").map(E => {
                        return {
                            TextAction: E.Estado,
                            Object: E,
                            Titulo: `Invitación al evento ${E.Evento.Nombre}`,
                            Descripcion: this.EventInvitadosDescripcion(E),
                            Fecha: E.Fecha_Invitacion,
                            Actions: [
                                {
                                    TextAction: "Asistir", Action: async (Event) => {
                                        this.append(ModalVericateAction(async () => {
                                            const Events = await WAjaxTools.PostRequest("../api/Events/AceptarInvitacion", Event);
                                        }))
                                    }
                                }, {
                                    TextAction: "Rechazar", Action: async (Event) => {
                                        this.append(ModalVericateAction(async () => {
                                            const Events = await WAjaxTools.PostRequest("../api/Events/RechazarInvitacion", Event);
                                        }))    
                                    }
                                }
                            ]
                        }
                    });
                    this.DOMManager.NavigateFunction("Tab-eventos-invitados", this.DrawNotificaciones(Notifications));

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
                                        this.append(ModalVericateAction(async () => {
                                            const Events = await WAjaxTools.PostRequest("../api/Events/AprobarParticipacion", Event);
                                        }))                                       
                                    }
                                }, {
                                    TextAction: "Rechazar", Action: async (Event) => {
                                        this.append(ModalVericateAction(async () => {
                                            const Events = await WAjaxTools.PostRequest("../api/Events/RechazarParticipacion", Event);
                                        }))    
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
                { tagName: 'label',className: "fecha", innerText: Notificacion.Fecha },
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
            color: #444;   
        }        
        .titulo{
            font-size: 20px;
            font-weight: 500;
        }
        .fecha{
            padding: 10px 0px;
            font-size: 12px;
            border-bottom: 1px solid #9999;

        }
        .NotificationContainer p{
            padding: 10px 0px;
            margin: 0px;
            border-bottom: 1px solid #9999;
            font-size: 14px;
        } 
        .NotificationContainer div{
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
        } 
        .btn {
            padding: 8px;
            font-size: 12px;
            max-width: 120px;
            min-width: 80px;
            background-color: #335888;
            color: #fff;
            border: none;
            border-radius: 5px;
            margin-left: 10px;
            cursor:pointer;
        }
    `
    EventDescripcion(E) {
        return `${E.Evento.Investigador?.Nombres} ${E.Evento.Investigador?.Apellidos} Indico que participarias en el evento ${E.Evento.Nombre} que se realizara de forma ${E.Evento.Modalidad}, con el rol de ${E.Tipo_Participacion.Descripcion} de ${E.Titulo} el ${E.Fecha_Participacion}.
        
        ¿Desea confirmar su participación?`;
    }
    EventInvitadosDescripcion(E) {
        return `${E.Evento.Investigador?.Nombres} ${E.Evento.Investigador?.Apellidos} le esta invitando a asistir al evento ${E.Evento.Nombre} en la fecha ${E.Fecha_Invitacion} que se realizara de forma ${E.Evento.Modalidad}.
        
        ¿Desea confirmar su asistencia?`;
    }
    InvestigacionesDescripcion(E = (new Tbl_Investigaciones())) {
        return `${E.Investigador?.Nombres} ${E.Investigador?.Apellidos} publico una nueva investigación con el titulo "${E.Titulo}" ejecutada el ${E.Fecha_ejecucion}.
        
        ¿Desea revisar la publicación?`;
    }
}
customElements.define('w-notificaciones-view', NotificacionesView);
export { NotificacionesView }