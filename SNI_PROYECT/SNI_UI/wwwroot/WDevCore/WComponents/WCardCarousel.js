import { WCssClass } from "../WModules/WStyledRender.js";
import { WRender } from "../WModules/WComponentsTools.js";
import {  StylesControlsV1 } from "../StyleModules/WStyleComponents.js";

 
class WCardCarousel extends HTMLElement {
    constructor(Dataset) {
        super();
        this.attachShadow({ mode: 'open' });
        this.Container = WRender.createElement({ type: 'div', props: { class: 'Links' }, children: [] });
        this.CarouselDiv = WRender.createElement({ type: 'div', props: { class: 'CarouselDiv' }, children: [] });
        this.beforeLink = WRender.createElement({ type: 'a', props: { class: "beforeLink", innerText: '<' } });
        this.afterLink = WRender.createElement({ type: 'a', props: { class: "afterLink", innerText: '>' } });
        this.Container.append(this.CarouselDiv, this.beforeLink, this.afterLink);
        this.Dataset = Dataset;
        this.shadowRoot.append(this.Container, this.StyleCarousel);        
    }
    connectedCallback() {
        if (this.Container.innerHTML == "") {
            return;
        } 
        this.DrawCardCarousel();
    }
    DrawCardCarousel = async () => {
        const cadenaB64 = "data:image/png;base64,";
        this.Dataset.forEach((element, index) => {
            if (element.foto == undefined) {
                return;
            }
            const Figure = WRender.createElement({
                type: 'img',
                props: { class: 'fotoColaborador', src: cadenaB64 + element.foto }
            });
            const Card = WRender.createElement({
                type: 'div',
                props: { class: 'CardElement' }, children: [
                    Figure,
                    {
                        type: 'div', props: { id: '', class: 'Details' }, children: [
                            {
                                type: 'a', props: {
                                    href: '#' + element.id, class: "aLabel",
                                    innerText: `${element.name}`
                                }
                            },
                            { type: 'h4', props: { innerText: element.puesto } },
                            { type: 'p', props: { innerText: element.descripcion } },
                            {
                                type: 'a',
                                props: {
                                    id: '', type: 'button', class: 'BtnPrimary',
                                    innerText: 'Ver Perfil', onclick: async () => {
                                        this.ActionFunction();
                                    }
                                }
                            }
                        ]
                    }
                ]
            });
            this.CarouselDiv.append(WRender.createElement(Card));
        });
    }
    StyleCarousel = WRender.createElement({
        type: 'w-style', props: {
            id: '', ClassList: [
                new WCssClass(`.CarouselDiv`, {
                    display: 'flex',
                    "align-items": "center",
                    "justify-content": "left",
                    "max-width": 1240,
                    overflow: "hidden",
                }), new WCssClass(`.CardElement`, {
                    width: 250,
                    height: 400,
                    "min-width": 250,
                    margin: "10px !important",
                    overflow: "hidden",
                    position: "relative",
                    "box-shadow": "0 0px 5px 0 rgba(0,0,0,0.6)",
                    "border-radius": "0.3cm",
                    display: "flex",
                    "flex-direction": "column",
                    "justify-content": "space-between",
                    "align-items": "center",
                    padding: 20,
                }), new WCssClass(`.Details .aLabel`, {
                    color: "#09f !important",
                    padding: 10,
                    margin: 0,
                    "font-weight": "bold",
                    "font-size": 20,
                }), new WCssClass(`.Details`, {
                    display: "flex",
                    "flex-direction": "column",
                    "justify-content": "center",
                    "align-items": "center",
                }), new WCssClass(`.CardElement .Details p`, {
                    height: 75,
                    overflow: "hidden",
                    "text-overflow": "ellipsis",
                    "display": "-webkit-box",
                    " display": "-moz-box",
                    "  display": "box",
                    "-webkit-box-orient": "vertical",
                    "-moz-box-orient": "vertical",
                    "box-orient": "vertical",
                    "-webkit-line-clamp": "3",
                    "line-clamp": "3",
                }), new WCssClass(`.CardElement .Details label`, {
                    padding: 10,
                    background: "rgba(0,0,0,0.5)",
                    "font-size": 12,
                    "border-radius": "0.2cm",
                    heigth: "100%",
                    margin: 5
                }), new WCssClass(".fotoColaborador",{
                    "object-fit": "cover",
                    "height": "180px",
                    "max-height": "180px",
                    "width": "180px",
                    "max-width": "180px",
                    "border-radius": "50%",
                    "box-shadow": "0 0 6px 0 rgb(0,0,0,50%)",
                    //"filter": "grayscale(100%)",
                }), new WCssClass(".Links", {
                    "position": "relative",
                    "max-width": "1240px",
                    "width": "100%",
                    "bottom": "0",
                    "height": "480px",
                    "display": "flex",
                    "align-items": "center",
                    "overflow": "hidden",
                }), new WCssClass(".beforeLink, .afterLink",{
                    "cursor": "pointer",
                    "font-size": "30px !important",
                    "color": "#fff",
                    "padding": "10px !important",
                    "transition": "all 0.6s",
                    "background": "rgb(0,0,0,30%)",
                    "top": "430px",
                    "position": "absolute",
                }), new WCssClass(".beforeLink:hover, .afterLink:hover",{
                     background: "rgb(0,0,0,70%)",
                }), new WCssClass(".beforeLink",{
                    left: 0,
                    top: 220,
                }), new WCssClass(".afterLink",{
                    right: 0,
                    top: 220,
                })
            ]
        }
    });
}
customElements.define('w-card-carousel', WCardCarousel);
export { WCardCarousel }