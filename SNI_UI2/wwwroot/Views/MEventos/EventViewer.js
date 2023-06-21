import { WRender, WAjaxTools, GenerateColor, ComponentsManager } from '../../WDevCore/WModules/WComponentsTools.js';
import { css, WCssClass, WStyledRender } from '../../WDevCore/WModules/WStyledRender.js';
import "../../WDevCore/WComponents/WTableComponent.js";
import { StylesControlsV2 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { Tbl_Evento, Tbl_Participantes_Eventos } from '../../Model/ModelDatabase.js';
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
           StylesControlsV2.cloneNode(true),
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
                WRender.Create({ tagName: "h2", innerText: Evento.Nombre }),
                WRender.Create({ tagName: "p", innerText: Evento.Descripcion }),
                WRender.Create({
                    tagName: "label",
                    innerText: `Fecha: del ${Evento.Fecha_Inicio?.toDateFormatEs()} ${Evento.Fecha_Finalizacion?.toDateFormatEs() ? " Al " + Evento.Fecha_Finalizacion?.toDateFormatEs() : ""}`
                }),
                WRender.Create({ tagName: "label", innerText: "Tipo: " + Evento.Modalidad }),
                WRender.Create({ tagName: "p", innerText: Evento.Datos_Adicionales }),
                WRender.Create({ tagName: "h3", innerText: "Participaciones" }),
                WRender.Create({
                    tagName: "InvestigadoresACont", children: Evento.Tbl_Participantes_Eventos?.map(I => (this.ParticipacionesCard(I)))
                })
            ]
        })
        //OPTIONS
        GrupoDiv.appendChild(WRender.Create({
            className: "GroupOptions", children: [{
                tagName: 'input', type: 'button', className: 'BtnSuccess', value: 'Ingresar', onclick: async () => {
                    window.open(Evento.Link, '_blank');
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
    ParticipacionesCard(Participacion = (new Tbl_Participantes_Eventos())) {
        return WRender.Create({
            className: "ParticipantesCard",
            children: [
                { tagName: 'img', src: "data:image/png;base64," + Participacion.Tbl_InvestigatorProfile?.Foto },
                { tagName: 'h4', innerText: Participacion.Titulo },
                { tagName: 'p', innerText: Participacion.Descripcion },
                { tagName: "label", innerText: `Fecha y Hora:  ${Participacion.Fecha_Participacion?.toDateTimeFormatEs()}` },
                { tagName: 'label', innerText: Participacion.Tipo_Participacion.Descripcion },
            ]
        });
    }
    Style = css`
        .TabContainer{
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 3px 0 rgba(0,0,0,0.5);
            border-radius: 0.2cm;
        }
        .InvestigadoresACont{
            display: flex;
            flex-direction: column;            
        }
        .GroupDiv{
            display: flex;
            flex-direction: column;
        }
        h2, h3, h4 {
            padding: 10px 0px;
            margin: 0px;
            color: #5e5e5e;
            text-transform: capitalize;
        }

        .ParticipantesCard{
            display: grid;
            grid-template-columns: 100px calc(100% - 100px);
            grid-template-rows: 20px 40px 20px 20px;
            grid-column-gap: 20px;
            grid-row-gap:10px;
            margin-top: 10px;
            margin-bottom: 10px;
            padding: 20px;
            box-shadow: 0 0 3px 0 rgba(0,0,0,0.5);            
            border-radius: 0.2cm;
        }
        .ParticipantesCard img {
            grid-row: span 4;
            border-radius: 50%;
            overflow: hidden;
            height: 100px;
            width: 100px;
            object-fit: cover;
            align-self: center;
            justify-self: center;
        }
    `
}
customElements.define('w-event-viewer', EventViewer);
export { EventViewer }