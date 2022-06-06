import { WCssClass } from "../WModules/WStyledRender.js";
import { WRender } from "../WModules/WComponentsTools.js";
import { StylesControlsV1 } from "../StyleModules/WStyleComponents.js";
import { WIcons } from "../WModules/WIcons.js";

class CardModel {
    picture = "image url/image base64";
    titulo = "corto";
    subtitulo = "corto";
    descripcion = "parrafo de tres lineas";
    ActionFunction = null;
}

class WCardCarousel extends HTMLElement {
    constructor(Dataset = []) {
        super();
        this.attachShadow({ mode: 'open' });
        this.Container = WRender.createElement({ type: 'div', props: { class: 'Links' }, children: [] });
        this.CarouselDiv = WRender.createElement({ type: 'div', props: { class: 'CarouselDiv' }, children: [] });
        this.beforeLink = WRender.createElement({ type: 'a', props: { onclick: this.myFunctionPrev, class: "beforeLink", innerText: '<' } });
        this.afterLink = WRender.createElement({ type: 'a', props: { onclick: this.myFunctionNext, class: "afterLink", innerText: '>' } });
        this.Container.append(this.CarouselDiv, this.beforeLink, this.afterLink);
        this.Dataset = Dataset;
        this.shadowRoot.append(this.Container, this.StyleCarousel, WRender.createElement(StylesControlsV1));
    }
    connectedCallback() {
        if (this.Container.innerHTML == "") {
            return;
        }
        this.DrawCardCarousel();
    }
    DrawCardCarousel = async () => {
        this.Dataset.forEach((element, index) => {
            const Card = WRender.createElement(new WCard(element, this.CardType, this.ActionFunction));
            this.CarouselDiv.append(Card);
        });
    }
    myFunctionNext = () => {
        const slider = this.CarouselDiv;
        const LastCard = slider.lastElementChild;
        const firstCard = slider.firstElementChild;
        const widthAnimation = firstCard.offsetWidth + 20;
        slider.style.transition = "all 1s";
        slider.style.webkitTransform = "translateX(-" + widthAnimation + "px)";
        setTimeout(function () {
            slider.style.transition = "none";
            slider.style.webkitTransform = "translateX(-" + 0 + "px)";
            LastCard.parentNode.insertBefore(firstCard, LastCard.nextSibling);
        }, 1000);
    }
    myFunctionPrev = () => {
        const slider = this.CarouselDiv;
        const firstCard = slider.firstElementChild;
        const LastCard = slider.lastElementChild;
        const widthAnimation = firstCard.offsetWidth + 20;
        slider.style.transition = "all 1s";
        slider.style.webkitTransform = "translateX(+" + widthAnimation + "px)";
        setTimeout(function () {
            slider.style.transition = "none";
            slider.style.webkitTransform = "translateX(+" + 0 + "px)";
            slider.insertBefore(LastCard, slider.firstChild);
        }, 1000);
    }
    StyleCarousel = WRender.createElement({
        type: 'w-style', props: {
            id: '', ClassList: [
                new WCssClass(`.CarouselDiv`, {
                    display: 'flex',
                    "align-items": "center",
                    "justify-content": "left",
                }), new WCssClass(".Links", {
                    "position": "relative",
                    "width": "100%",
                    "bottom": "0",
                    "height": "480px",
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center",
                    "overflow": "hidden",
                }), new WCssClass(".beforeLink, .afterLink", {
                    "cursor": "pointer",
                    "font-size": "30px !important",
                    "color": "#fff",
                    "padding": "10px !important",
                    "transition": "all 0.6s",
                    "background": "rgb(0,0,0,30%)",
                    "top": "430px",
                    "position": "absolute",
                }), new WCssClass(".beforeLink:hover, .afterLink:hover", {
                    background: "rgb(0,0,0,70%)",
                }), new WCssClass(".beforeLink", {
                    left: 0,
                    top: 220,
                }), new WCssClass(".afterLink", {
                    right: 0,
                    top: 220,
                })
            ]
        }
    });
}
customElements.define('w-card-carousel', WCardCarousel);
class WCard extends HTMLElement {
    constructor(element = (new CardModel()), CardType = 1, ActionFunction) {
        super();
        this.style.transition = "all 0.6s";
        this.className = "CardElement";
        let cadenaB64 = "data:image/png;base64,";
        if (!element.picture) {
            element.picture =  WIcons.UserIcon}
        const Figure = WRender.createElement({
            type: 'img',
            props: { class: 'fotoColaborador', src: cadenaB64 + element.picture }
        });
        this.ActionFunction = ActionFunction;
        switch (CardType) {
            case 2:               
                this.append(this.StyleCard2);
                break;
            default:
                this.append(this.StyleCard);
                break;
        }
        const cardC = WRender.createElement({
            type: 'div', props: { id: '', class: 'Details' }, children: [
                {
                    type: 'label', props: {
                        class: "aLabel",
                        innerText: `${element.titulo}`
                    }
                },
                { type: 'label', props: { innerText: element.subtitulo } },
                { type: 'label', props: { innerText: element.descripcion } }
            ]
        })
        if (this.ActionFunction != undefined) {
            cardC.append(WRender.createElement({
                type: 'a',
                props: {
                    id: '', type: 'button', class: 'BtnPrimary',
                    innerText: 'Ver Perfil', onclick: async () => {
                        this.ActionFunction(element);
                    }
                }
            }));
        }
        this.append( WRender.createElement(Figure), cardC);
    }
    connectedCallback() {
        setTimeout(() => {
            this.style.opacity = 1;
        }, 50);
    }
    disconnectedCallback() {
        this.style.opacity = 0;
    }
    StyleCard = WRender.createElement({
        type: 'w-style', props: {
            id: '', ClassList: [
                new WCssClass(`.CardElement`, {
                    width: 220,
                    height: 330,
                    "min-width": 220,
                    margin: "10px !important",
                    overflow: "hidden",
                    position: "relative",
                    "box-shadow": "0 0px 5px 0 rgba(0,0,0,0.6)",
                    "border-radius": "0.3cm",
                    display: "flex",
                    "flex-direction": "column",
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
                    "margin-top": 10
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
                    padding: 5,
                    // background: "rgba(0,0,0,0.5)",
                    "font-size": 14,
                    "border-radius": "0.2cm",
                    //heigth: "100%",
                }), new WCssClass(".fotoColaborador", {
                    "object-fit": "cover",
                    "height": "180px",
                    "max-height": "180px",
                    "width": "180px",
                    "max-width": "180px",
                    "border-radius": "50%",
                    "box-shadow": "0 0 6px 0 rgb(0,0,0,50%)",
                    //"filter": "grayscale(100%)",
                })
            ]
        }
    });
    StyleCard2 = WRender.createElement({
        type: 'w-style', props: {
            id: '', ClassList: [
                new WCssClass(`.CardElement`, {
                    width: 250,//"calc(100% - 20px)",
                    height: 330,
                    "min-width": 220,
                    margin: "10px !important",
                    overflow: "hidden",
                    position: "relative",
                    "box-shadow": "0 0px 5px 0 rgba(0,0,0,0.6)",
                    "border-radius": "0.3cm",
                    display: "flex",
                    "flex-direction": "column",
                    //"justify-content": "space-between",
                    "align-items": "center",
                    "padding-bottom": 10,
                }), new WCssClass(`.Details .aLabel`, {
                    color: "#09f !important",
                    padding: 5,
                    margin: 0,
                    "font-weight": "bold",
                    "font-size": 18,
                }), new WCssClass(`.Details`, {
                    display: "flex",
                    "flex-direction": "column",
                    "justify-content": "center",
                    "align-items": "center",
                    "margin-top": 10
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
                    padding: 5,
                    // background: "rgba(0,0,0,0.5)",
                    "font-size": 14,
                    "border-radius": "0.2cm",
                    //heigth: "100%",
                   // margin: 5
                }), new WCssClass(".fotoColaborador", {
                    "object-fit": "cover",
                    "object-position": "top",
                    "height": "250px",
                    "max-height": "250px",
                    "width": "100%",
                    //"border-radius": "50%",
                    "box-shadow": "0 0 6px 0 rgb(0,0,0,50%)",
                    //"filter": "grayscale(100%)",
                })
            ]
        }
    });
}

customElements.define('w-card', WCard);
export { WCardCarousel, WCard }
//CARDSSSSS STYLES
