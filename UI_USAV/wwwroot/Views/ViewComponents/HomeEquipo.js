function GetObj(id) {
    var Obj = document.getElementById(id);
    return Obj;
}
function autoplay(ContainerId) {
    var Container = GetObj(ContainerId).getElementsByTagName("div");
    if (Container.length > 1) {
        setTimeout(function () {
            myFunctionNext(ContainerId);
            autoplay(ContainerId);
        }, 15000);
    }
    if (Container.length == 1) {
        //console.log(Container[0])
        // Container[0].style.display = 'block';
        // Container[0].style.margin = 'auto';
    }
}
function myFunctionNext(ContainerId) {
    var slider = GetObj(ContainerId);
    var LastCard = slider.lastElementChild;
    var firstCard = slider.firstElementChild;
    var widthAnimation = firstCard.offsetWidth + 20;
    //console.log(widthAnimation)\
    slider.style.transition = "all 1s";
    slider.style.webkitTransform = "translateX(-" + widthAnimation + "px)";
    setTimeout(function () {
        slider.style.transition = "none";
        slider.style.webkitTransform = "translateX(-" + 0 + "px)";
        LastCard.parentNode.insertBefore(firstCard, LastCard.nextSibling);
    }, 1000);
}

function myFunctionPrev(ContainerId) {
    var slider = GetObj(ContainerId);
    var firstCard = slider.firstElementChild;
    var LastCard = slider.lastElementChild;
    var widthAnimation = firstCard.offsetWidth + 20;

    slider.style.transition = "all 1s";
    slider.style.webkitTransform = "translateX(+" + widthAnimation + "px)";
    setTimeout(function () {
        slider.style.transition = "none";
        slider.style.webkitTransform = "translateX(+" + 0 + "px)";
        slider.insertBefore(LastCard, slider.firstChild);
    }, 1000);
}
beforeLink.onclick = () => { myFunctionPrev('CarroselDivHomeEquipo'); }
afterLink.onclick = () => { myFunctionNext('CarroselDivHomeEquipo'); }

import "../../WDevCore/WComponents/WCalendar.js";
import { WCssClass } from "../../WDevCore/WModules/WStyledRender.js";
import { WRender } from "../../WDevCore/WModules/WComponentsTools.js";
import { StylesControlsV1 } from "../../WDevCore/StyleModules/WStyleComponents.js";
const Contacts = []//JSON.parse(<?php echo json_encode($resp) ?>);
const ContactsSQL = []// <?php echo json_encode($respSql) ?>;
//console.log(ContactsSQL);
const CarroselDivHomeEquipo = WRender.createElement({ type: 'div', props: { class: 'CarroselDivHomeEquipo', id: "DivTipologia" } }); 

const ContactsPartners = Contacts.results.filter(x => x.contact_kind == "partner");
ContactsPartners.forEach(contact => {
    const conFilt = ContactsSQL.find(x => x.id_witei == contact.id.toString());
    if (conFilt != undefined) {
        //console.log(conFilt);
        for (const prop in conFilt) {
            contact[prop] = conFilt[prop];
        }
    }
});
const style = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`.FormContainerContact`, {
                "margin-top": "80px !important",
                display: 'flex',
                "align-items": "center",
                "justify-content": "center",
                "text-align": "justify",
                "flex-direction": "column",
                //height: 500,
                padding: "20px !important",
                overflow: "hidden",
                position: "relative"
                //transform: "translateX(-450px)",
            }), new WCssClass(`.CarroselDivHomeEquipo`, {
                display: 'flex',
                "align-items": "center",
                "justify-content": "left",
                "max-width": 1240,
                overflow: "hidden",
            }),
            new WCssClass(`.ContactCard`, {
                //display: 'flex',
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
                //background: "rgba(0,0,0,0.5)",
                "font-size": 20,
            }), new WCssClass(`.Details`, {
                display: "flex",
                "flex-direction": "column",
                "justify-content": "center",
                "align-items": "center",
            }), new WCssClass(`.ContactCard .Details p`, {
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
            }), new WCssClass(`.ContactCard .Details label`, {
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
            })
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
FormContainerContact.append(WRender.createElement(style));
FormContainerContact.append(WRender.createElement(StylesControlsV1));
const cadenaB64 = "data:image/png;base64,";
ContactsPartners.forEach((element, index) => {
    //console.log(element);
    if (element.foto == undefined) {
        return;
    }
    // if (index > 10) {
    //     return;
    // }
    const Figure = WRender.createElement({
        type: 'img',
        props: { class: 'fotoColaborador', src: cadenaB64 + element.foto }
    });
    const Card = WRender.createElement({
        type: 'div',
        props: { class: 'ContactCard' }, children: [
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
                                window.location = "./colaborador/?id=" + element.id;
                            }
                        }
                    }
                ]
            }
        ]
    });

    CarroselDivHomeEquipo.append(WRender.createElement(Card));
});

export {CarroselDivHomeEquipo}