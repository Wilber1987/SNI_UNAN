import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../../WDevCore/WModules/WComponentsTools.js';
import { css, WCssClass } from '../../WDevCore/WModules/WStyledRender.js';
import { WCardCarousel, WCard } from '../../WDevCore/WComponents/WCardCarousel.js';
import { StylesControlsV1 } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { ActionFunction } from '../Home.js';


class InvestigacionViewer extends HTMLElement {
    constructor(response, DomManager) {
        super();
        this.response = response;
        this.DomManager = DomManager;
        this.InvestigacionContainer = WRender.createElement({ type: 'div', props: { class: 'InvestigacionContainer' }, children: [] });
        this.appendChild(WRender.createElement(StylesControlsV1));
        this.profileCard = new WCard({
            titulo: `${response.Tbl_InvestigatorProfile?.Nombres}`,
            picture: "/Media/Image/" + response.Tbl_InvestigatorProfile?.Foto,
            subtitulo: "Autor",
            descripcion: response.Tbl_InvestigatorProfile?.NombreInstitucion,
            id_Investigador: response.Tbl_InvestigatorProfile?.Id_Investigador
        }, 2, () => {
            ActionFunction(response.Id_Investigador, DomManager);
        });
        const BtnReturn = WRender.Create({
            className: "GroupOptions", children: [{
                tagName: 'input', type: 'button', className: 'BtnSuccess BtnReturn', value: 'Regresar', onclick: async () => {
                    this.DomManager.Back()
                }
            }]
        })
        this.append(BtnReturn, WRender.createElement(this.styleComponent), this.InvestigacionContainer);
    }
    connectedCallback() {
        if (this.InvestigacionContainer.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async () => {
        const Card = WRender.Create({
            class: 'InvestigacionCard', children: [
                this.profileCard,
                {
                    class: 'Details', children: [
                        {
                            class: "DetailsHeader", children: [{ tagName: 'label', onclick: () => { }, innerText: (`${this.response.Titulo}`).toUpperCase() }]
                        },
                        [{ tagName: 'img', class: "imgIcon", src: 'https://static.witei.com/static/flat-icons/blueprint.2e0cd5ff617e.svg' }, "Tipo: " + this.response.Descripcion],
                        [{ tagName: 'img', class: "imgIcon", src: 'https://static.witei.com/static/flat-icons/blueprint.2e0cd5ff617e.svg' }, "Fecha: " + this.response.Fecha_ejecucion],
                        [{
                            tagName: 'input',
                            tagName: 'button', class: 'BtnPrimary', innerHTML: 'Leer...', onclick: async () => {
                                //window.location = this.response.url_publicacion;
                                window.open(this.response.url_publicacion, "_blank");
                            }
                        }], WRender.CreateStringNode("<div class='DetailsHeader'>Disciplinas</div>"), {
                            class: 'InvestigationDisciplineContainer',
                            children: this.response.Tbl_Investigaciones_Disciplinas?.map(element => {
                                return {
                                    tagName: 'label', style: { background: element.Cat_Disciplinas?.Color },
                                    innerText: element.Cat_Disciplinas?.DescripcionDisciplina
                                }
                            })
                        }
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
                        this.response.Resumen
                    ]
                },
                {
                    type: 'div', props: { id: '', class: 'DetailsDiv' }, children: [
                        WRender.CreateStringNode("<h4>Abstract</h4>"),
                        this.response.Abstract
                    ]
                }
            ]
        });
        this.response.Tbl_Colaboradores?.forEach(element => {
            console.log(element);
            element.titulo = `${element.Tbl_InvestigatorProfile.Nombres} ${element.Tbl_InvestigatorProfile.Apellidos}`;
            element.picture = "/Media/Image/" + element.Tbl_InvestigatorProfile.Foto;
            element.subtitulo = element.Cat_Tipo_Colaborador.Descripcion;
            element.descripcion = element.Tbl_InvestigatorProfile.NombreInstitucion;
        });
        if (this.response.Photo == null) {
            this.response.Photo = ""
        }
        this.InvestigacionContainer.append(WRender.createElement(Card));
        this.InvestigacionContainer.append(WRender.createElement(Detaills));
        if (this.response.Tbl_Colaboradores?.length > 0) {
            const Colaboradores = new WCardCarousel(this.response.Tbl_Colaboradores);
            Colaboradores.ActionFunction = (Object) => {
                ActionFunction(Object.Id_Investigador, this.DomManager)
            }
            this.InvestigacionContainer.append(WRender.createElement({ type: 'h3', props: { innerText: 'Colaboradores' } }));
            this.InvestigacionContainer.append(WRender.createElement(Colaboradores));
        }
    }
    styleComponent = css`
     w-view-read {
            background-color: #fff;
            display: block;
            box-shadow: 0 0 4px 0 rgb(0, 0, 0, 40%);
            border-radius: 0.3cm;
            padding: 20px;
        }

        .photoBaner {
            width: 95%;
            box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.6);
            border-radius: 0.3cm;
            object-fit: cover;
        }       

        .InvestigacionContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            flex-direction: column;
        }
        .InvestigacionCard .Details {
            height: 100%;
            width: 100%;
            text-align: center;
            display: grid;
            grid-template-columns: 33% 33% 33%;
            grid-template-rows: 150px 80px 50px 50px;
            grid-gap: 5px;
            bottom: 0px;
            left: 10px;
            right: 0px;
            color: #444;
            margin: 10px;
        }
        
        .InvestigacionCard {
            display: flex;
            width: 100%;
            margin-top: 10px !important;
            overflow: hidden;
            position: relative;
            border-radius: 0.3cm;
        }

        .InvestigacionCard .Details a {
            grid-column: 1/4;
            color: #444 !important;
            padding: 10px;
            margin: 0px;
            background: rgb(187 187 187 / 50%);
            font-size: 16px;
            border-radius: 0.2cm;
        }

        .InvestigacionCard .Details div {
            padding: 10px;
            background: rgb(187 187 187 / 50%);
            font-size: 14px;
            border-radius: 0.2cm;
            height: calc(100% - 20px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .DetailsHeader{
            grid-column: span 3;
        }
        .InvestigacionCard .Details .InvestigationDisciplineContainer{
            display: flex;
            flex-direction: row;
            overflow: hidden;
            grid-column: span 3;
        }
        .InvestigationDisciplineContainer label{
            padding: 5px;
            margin: 5px;
            border-radius: 8px;
            color: #fff;
        }

        .InvestigacionCard .Details div .imgIcon {
            height: 40px !important;
            width: 40px !important;
        }

        .Animate {
            animation: cambio 5s infinite;
        }

        .InvestigacionCard img {
            float: left;
            width: 400px !important;
            height: 300px !important;
        }

        .PropiedadDetails {
            display: grid;
            grid-template-columns: 100%;
        }

        .DetailsDiv {
            padding: 10px;
        }

        .DetailsDiv p {
            text-align: justify;
            font-size: 14px;
        }

        .TagContainer {
            display: grid;
            grid-template-columns: auto auto;
        }

        .TagContainer label {
            padding: 10px;
            border-radius: 0.2cm;
            background: #0084d2;
            color: #fff;
            margin: 5px;
        }

        @media (max-width: 800px) {
            .InvestigacionContainer {
                overflow: hidden;
                flex-wrap: inherit;
            }

            w-card-carousel {
                width: 100%;
            }
        }
    `;
}
customElements.define('w-view-read', InvestigacionViewer);
export { InvestigacionViewer }