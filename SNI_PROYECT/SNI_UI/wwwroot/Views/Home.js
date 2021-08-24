import { ComponentsManager, WAjaxTools, WRender, WArrayF } from "../WDevCore/WModules/WComponentsTools.js";
import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WComponents/WTableComponents.js";

class HomeClass {
    constructor() {
        this.type = "div";
        this.props = { id: "HomeClass", className: "HomeClass DivContainer" }
        const DivImage = {
            type: 'div', props: { id: '', class: 'ImagesContainer' },
            children: []
        }        
        this.children = [
            this.Style,
            DivImage
        ];
    }
    Style = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".HomeClass", {
                    //display: "flex",
                }), new WCssClass(".ImagesContainer", {
                    display: "grid",
                    "grid-template-columns": "auto auto auto auto"
                }),new WCssClass(".ImagesContainer div", {                    
                    //height: "250px",
                   // width: "360px",
                    "border-radius": "10px",
                    overflow: "hidden",
                    margin: "10px",
                    "box-shadow": "0 2px 5px 2px rgba(0,0,0,0.5)",
                    position: "relative"
                }),new WCssClass(".ImagesContainer img", {
                    display: "block",
                    height: "100%",
                    width: "100%",
                    "object-fit": "cover"
                }),new WCssClass(".ImagesContainer .imgBtn", {
                    position: "absolute",
                    color: "#fff",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    "background-color": "rgba(0,0,0,0.7)",
                    border: "none",
                    padding: "10px 0px",
                    cursor: "pointer",
                }),
            ], MediaQuery: [{
                condicion: "(max-width: 1200px)",
                ClassList: [
                    new WCssClass(".ImagesContainer", {
                        display: "grid",
                        "grid-template-columns": "auto auto auto"
                    })
                ]
            }, {
                condicion: "(max-width: 600px)",
                ClassList: [
                    new WCssClass(".ImagesContainer", {
                        display: "grid",
                        "grid-template-columns": "auto auto"
                    })
                ]
            }]
        }
    };
}
export { HomeClass }
