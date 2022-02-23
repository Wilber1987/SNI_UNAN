import "../../WDevCore/WComponents/WCalendar.js";
import { WCssClass } from "../../WDevCore/WModules/WStyledRender.js";
import { WRender } from "../../WDevCore/WModules/WComponentsTools.js";

const Tipologias = [
    { name: "Tipologia", pictures: ["./Media/Tipologias/1.jpg"] },
    { name: "Tipologia", pictures: ["./Media/Tipologias/2.jpg"] },
    { name: "Tipologia", pictures: ["./Media/Tipologias/3.jpg", "./Media/Tipologias/1.jpg", "./Media/Tipologias/2.jpg"] },
    { name: "Tipologia", pictures: ["./Media/Tipologias/4.jpg"] }
];

const style = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`.DivTipologia`, {
                display: 'flex',
                "align-items": "center",
                "justify-content": "center",
                "flex-wrap": "wrap"
            }), new WCssClass(`.Tipologia`, {
                //display: 'flex',
                width: 400,
                height: 300,
                "min-width":  400,
                background: "#eee",
                margin: "10px !important",
                overflow: "hidden",
                position: "relative",
                "box-shadow": "0 2px 2px 0 rgba(0,0,0,0.4)",
                "border-radius": "0.3cm"
            }), new WCssClass(`.Tipologia .slide`, {
                width: '100%',
                //animation: "cambio 20s infinite",
                position: "relative",
                "text-align": "left",
                // display: "flex"
            }),
            new WCssClass(`.Tipologia .Details`, {
                width: '100%',
                position: "absolute",
                "align-items": "center",
                "justify-content": "center",
                display: "flex",
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                color: "#fff",
                background: "rgba(0,0,0,0.1)",
                cursor: "pointer"
                // display: "flex"
            }),
            new WCssClass(`.Animate`, {
                animation: "cambio 20s infinite",
            }),
            new WCssClass(`.Tipologia img`, {
                //"width": '20%',
                float: "left",
                width: "400px !important",
                height: "300px !important",
                //animation: "cambio 20s infinite alternate linear",
            }),
        ], KeyFrame: [{
            animate: 'cambio',
            ClassList: [
                new WCssClass("0%", { "left": "0" }),
                new WCssClass("20%", { "left": "0" }),

                new WCssClass("25%", { "left": "-100%" }),
                new WCssClass("45%", { "left": "-100%" }),

                new WCssClass("50%", { "left": "-200%" }),
                new WCssClass("70%", { "left": "-200%" }),

                new WCssClass("75%", { "left": "-300%" }),
                new WCssClass("100%", { "left": "-300%" }),
            ]
        },
        ]
    }
};
const DivTipologia = WRender.createElement({ type: 'div', props: { class: 'DivTipologia', id: "DivTipologia" } }); 
DivTipologia.append(WRender.createElement(style));
//console.log(Tipologias);
Tipologias.forEach((element, index) => {
    console.log(element);
    if (index > 10) {
        return;
    }
    const Figure = WRender.createElement({
        type: 'div',
        props: { class: 'slide' }, children: []
    });
    const Card = WRender.createElement({
        type: 'div',
        props: { class: 'Tipologia' }, children: [
            Figure,
            {
                type: 'div',
                props: { id: '', class: 'Details', innerHTML: `${element.name}` }
            }
        ]
    });
    if (element.pictures.length > 1) {
        Figure.style = `width: ${element.pictures.length * 100}%`;
        Figure.className = Figure.className + " Animate";
    }
    element.pictures.forEach(img => {
        Figure.append(WRender.createElement({ type: 'img', props: { src: img, class: 'imageClass' } }));
    });
    DivTipologia.append(WRender.createElement(Card));
});           
export {DivTipologia}