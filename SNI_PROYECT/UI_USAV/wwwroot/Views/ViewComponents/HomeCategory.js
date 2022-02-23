import "../../WDevCore/WComponents/WCalendar.js";
import { WCssClass } from "../../WDevCore/WModules/WStyledRender.js";
import { WRender } from "../../WDevCore/WModules/WComponentsTools.js";
const Propiedades = [
    { name: "Oficina", href: "./CategoryProps/?Category=cat", img: "./Media/Categorias/1.jpg" },
    { name: "Habitación", href: "./CategoryProps/?Category=cat", img: "./Media/Categorias/2.jpg" },
    { name: "Edificio", href: "./CategoryProps/?Category=cat", img: "./Media/Categorias/3.jpg" },
    { name: "Casa", href: "./CategoryProps/?Category=cat", img: "./Media/Categorias/4.jpg" },
    { name: "Terreno", href: "./CategoryProps/?Category=cat", img: "./Media/Categorias/5.jpg" },
    { name: "Local", href: "./CategoryProps/?Category=cat", img: "./Media/Categorias/6.jpg" },
    { name: "Plaza", href: "./CategoryProps/?Category=cat", img: "./Media/Categorias/7.jpg" }
];
const CarroselDivHomeCategory = WRender.createElement({ type: 'div', props: { class: 'CarroselDivHomeCategory', id: "DivHomeServicios" } }); 
CarroselDivHomeCategory.append(WRender.createElement({
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`*`, {
                "box-sizing": "initial !important"
            }),

            new WCssClass(`.containerWp`, {
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
                width: "100%",
            }),
            new WCssClass(`.CarroselDivHomeCategory`, {
                "margin-top": "80px !important",
                display: 'grid',
                "grid-template-columns": "repeat(auto-fit, minmax(240px, 1fr))",
                "grid-auto-rows": "240px",
                gap: "1rem",
                //height: 700,
                width: 900,
                padding: "20px !important",
                margin: "auto"
            }), new WCssClass(`.CarroselDivHomeCategory h4`, {
                "font-size": "24px !important",
                color: "#fff !important"
            }),
            new WCssClass(`.CarroselDivHomeCategory label`, {
                "font-size": "18px !important",
                color: "#fff !important"
            }),
            new WCssClass(`.cardServices`, {
                "display": "flex",
                "flex-direction": "column",
                "justify-content": "center",
                "align-items": "center",
                "background": "#717171",
                "font-size": "3rem",
                "color": "#fff",
                "box-shadow": "rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem",
                "height": "100%",
                "width": "100%",
                "border-radius": "4px",
                "transition": "all 500ms",
                "overflow": "hidden",
                "background-size": "cover",
                "background-position": "center",
                "background-repeat": "no-repeat",
                "padding": "0",
                "margin": "0",
            }), new WCssClass(".card-tall", {
                "grid-row": "span 2 / auto",
            }),
            new WCssClass(".card-wide", {
                "grid-column": "span 2 / auto",
            }), new WCssClass(".cardServices img", {
                height: "100% !important",
                width: "100% !important",
                "object-fit": "cover",
                cursor: "pointer"
            })
        ]
    }
}));
CarroselDivHomeCategory.append(WRender.CreateStringNode(`<div class="cardServices card-wide">
                <h4>8 pasos y un objetivo: la venta de tu inmueble</h4>
                <Label>Este es nuestro método de trabajo.</label>
            </div>`));
Propiedades.forEach((element, index) => {
    let ClassName = "cardServices";
    if (index % 2 == 0) {
        ClassName = "cardServices card-tall";
    }
    const Card = WRender.createElement({
        type: 'div',
        props: { class: ClassName }, children: [
            element.name,
            {
                type: 'img', props: {
                    src: element.img, onclick: () => {
                        window.location = "./categorias/?kind=" + element.name;
                    }
                }
            }
        ]
    });
    CarroselDivHomeCategory.append(WRender.createElement(Card));
});
export {CarroselDivHomeCategory}