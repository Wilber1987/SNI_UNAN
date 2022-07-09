import "../../WDevCore/WComponents/WCalendar.js";
import { WCssClass } from "../../WDevCore/WModules/WStyledRender.js";
import { WRender } from "../../WDevCore/WModules/WComponentsTools.js";

const Footer = [
    { name: "Topologia", pictures: ["./Media/LogosGrises/Arag.png"] },
    { name: "Topologia", pictures: ["./Media/LogosGrises/gas.png"] },
    { name: "Topologia", pictures: ["./Media/LogosGrises/Big Data.png"] },
    { name: "Topologia", pictures: ["./Media/LogosGrises/accesia.png"] },
    { name: "Topologia", pictures: ["./Media/LogosGrises/Idealista.png"] },
    { name: "Topologia", pictures: ["./Media/LogosGrises/3D Spaces.png"] },
    { name: "Topologia", pictures: ["./Media/LogosGrises/BetterPlaces Ico pq.png"] }
];

const style = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`.DivFooter`, {
                display: 'flex',
                "align-items": "center",
                "justify-content": "center",
            }), new WCssClass(`.DivFooter img`, {
                width: "100px",
                margin: 20,
            })]
    }
};
const DivFooter = WRender.createElement({ type: 'div', props: { class: 'DivFooter', id: "DivFooter" } }); 

DivFooter.append(WRender.createElement(style));
//console.log(Footer);
Footer.forEach((element, index) => {
    DivFooter.append(WRender.createElement({ type: 'img', props: { src: element.pictures[0], class: 'imageClass' } }));
}); 
export {DivFooter}