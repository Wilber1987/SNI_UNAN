import "../../WDevCore/WComponents/WCalendar.js";
import { WCssClass } from "../../WDevCore/WModules/WStyledRender.js";
import { WRender } from "../../WDevCore/WModules/WComponentsTools.js";
//console.log(<?php echo json_encode($resp) ?>);  
//console.log(JSON.parse(""));    
const Articulos = [{}, {}]//JSON.parse(<?php echo json_encode($resp) ?>);//[{},{},{},{}];     
//console.log(Articulos);  

const StylePrincipal = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`.CarroselDivHomeLastAd`, {
                display: 'flex',
                "align-items": "center",
                "justify-content": "center",
                "flex-wrap": "wrap"
            }),
            new WCssClass(`.PropiedadCard`, {
                width: 400,
                height: 300,
                background: "#eee",
                margin: "10px !important",
                overflow: "hidden",
                position: "relative",
                "box-shadow": "0 2px 2px 0 rgba(0,0,0,0.4)",
                "border-radius": "0.3cm"
            }),
            new WCssClass(`.PropiedadCard .slide`, {
                width: '100%',
                position: "relative",
                "text-align": "left",
            }),
            new WCssClass(`.PropiedadCard .Details`, {
                width: '100%',
                position: "absolute",
                "text-align": "left",
                display: "grid",
                "grid-template-columns": "100px 100px 100px",
                "grid-template-rows": "auto 50px",
                bottom: 0,
                left: 10,
                right: 0,
                color: "#fff"
                // display: "flex"
            }), new WCssClass(`.PropiedadCard .Details a`, {
                "grid-column": "1/4",
                color: "#fff !important",
                padding: 10,
                margin: 0,
                background: "rgba(0,0,0,0.5)",
                "font-size": 16,
                "border-radius": "0.2cm"
                // display: "flex"
            }), new WCssClass(`.PropiedadCard .Details label`, {
                padding: 10,
                background: "rgba(0,0,0,0.5)",
                "font-size": 12,
                "border-radius": "0.2cm",
                heigth: "100%",
                margin: 5
                // display: "flex"
            }),
            new WCssClass(`.Animate`, {
                animation: "cambio 20s infinite",
            }),
            new WCssClass(`.PropiedadCard img`, {
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
const CarroselDivHomeLastAd = WRender.createElement({ type: 'div', props: { class: 'CarroselDivHomeLastAd', id: "DivHomeServicios" } });
CarroselDivHomeLastAd.append(WRender.createElement(StylePrincipal));
//console.log(Articulos);
Articulos.forEach((element, index) => {
    if (index > 3) {
        return;
    }
    element.title = (`${element.kind} en ${element.street},  ${element.town}`).toUpperCase();
    element.Cuartos = element.bedrooms;
    element["Baños"] = element.bathrooms;
    element["Área"] = element.area;
    element["Costo de alquiler"] = element.renting_cost;
    element["Costo de venta"] = element.selling_cost;
    //console.log(element);
    const Figure = WRender.createElement({
        type: 'div',
        props: { class: 'slide' }, children: []
    });
    const Card = WRender.createElement({
        type: 'div',
        props: { class: 'PropiedadCard' }, children: [
            Figure,
            {
                type: 'div', props: { id: '', class: 'Details' }, children: [
                    {
                        type: 'a', props: {
                            onclick: () => {
                                sessionStorage.setItem("propiety", JSON.stringify(element));
                                window.location = './propiedad/?Prop=' + element.id;
                            },
                            innerText: `${element.kind} en ${element.street},  ${element.town}`
                        }
                    },
                    "Ârea:" + element.area, "Dormitorios:" + element.bedrooms, "Baños:" + element.bathrooms,

                ]
            }
        ]
    });
    if (element.pictures) {
        if (element.pictures.length > 1) {
            Figure.style = `width: ${element.pictures.length * 100}%`;
            Figure.className = Figure.className + ` Animate` + element["id"];
        }
        element.pictures.forEach(img => {
            Figure.append(WRender.createElement({ type: 'img', props: { src: img, class: 'imageClass' } }));
        });
        const style = {
            type: 'w-style', props: {
                "id": '', ClassList: [
                    new WCssClass(`.Animate` + element["id"], {
                        animation: `cambio${element["id"]} ${element.pictures.length * 3}s infinite`,
                    }),
                ], KeyFrame: [{
                    animate: 'cambio' + element["id"],
                    ClassList: []
                }]
            }
        };
        let limit1 = 0;
        let limit2 = 100 / element.pictures.length;
        let block = 100 / element.pictures.length;
        let blockSize = element.pictures.length * 100;
        let left = "0"
        for (let ind = 0; ind < element.pictures.length; ind++) {
            let leftValue = left + "%";
            if (ind != 0) {
                leftValue = "-" + ind * 100 + "%";
            }
            style.props.KeyFrame[0].ClassList.push(new WCssClass(limit1 + "%", {
                "left": leftValue
            }));
            style.props.KeyFrame[0].ClassList.push(new WCssClass(limit2 + "%", {
                "left": leftValue
            }));
            limit1 += block;
            limit2 += block;
        }
        CarroselDivHomeLastAd.append(WRender.createElement(style))
    }

    
    CarroselDivHomeLastAd.append(WRender.createElement(Card));
});
export { CarroselDivHomeLastAd }