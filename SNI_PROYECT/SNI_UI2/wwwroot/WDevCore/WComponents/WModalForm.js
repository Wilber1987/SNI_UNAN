import { WRender, WAjaxTools, ComponentsManager } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import { StyleScrolls, StylesControlsV2 } from "../StyleModules/WStyleComponents.JS";
let photoB64;
class ModalConfig {
    ShadowRoot = null;
    icon = null;
    title = null;
    HeadOptions = null;
    StyleForm = null;
    ObjectDetail = undefined;
    EditObject = undefined;
    UserActions = undefined;
    ModelObject = {
        property: undefined,
        Operation: {
            type: "OPERATION", Function: (obj) => {
                return obj.value1 + obj.value2;
            }
        }
    };
}
class WModalForm extends HTMLElement {
    constructor(Config = (new ModalConfig())) {
        super();
        this.ShadowRoot = true;
        this.DataRequire = true;
        this.Config = Config;
        //console.log(this.Config);
        for (const p in Config) {
            this[p] = Config[p];
        }
        if (this.StyleForm == "columnX1") {
            this.WidthContainer = "40%";
            this.DivColumns = this.Config.DivColumns = "calc(100% - 20px)";
        } else if (this.StyleForm == "columnX3") {
            this.WidthContainer = "80%";
            this.DivColumns = this.Config.DivColumns = "calc(30%) calc(30%) calc(30%)";
        } else if (this.StyleForm == "FullScreen") {
            this.WidthContainer = "100%";
            this.DivColumns = this.Config.DivColumns = "calc(30%) calc(30%) calc(30%)";
        } else {
            this.WidthContainer = "60%";
            this.DivColumns = this.Config.DivColumns = "calc(50%) calc(50%)";
        }
    }
    attributeChangedCallBack() {
        this.DrawSlide();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        } //NO MODAL 
        if (this.ShadowRoot) {
            this.attachShadow({ mode: "open" });
            this.shadowRoot.append(WRender.createElement(StyleScrolls));
            this.shadowRoot.append(WRender.createElement(StylesControlsV2));
            this.shadowRoot.append(WRender.createElement(this.FormStyle()));
        } else {
            this.append(WRender.createElement(this.FormStyle()));
        }
        //NO MODAL
        this.append(WRender.createElement(StyleScrolls));
        this.append(WRender.createElement({
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(".ModalContentWModal", {
                        "opacity": "0",
                        display: "none",
                        "background-color": "rgba(0, 0, 0, 0.5) !important",
                        "width": "100%",
                        "position": "fixed !important",
                        "top": "0px !important",
                        "left": "0px !important",
                        "bottom": "0px !important",
                        "transition": "all linear 1s",
                        "box-shadow": "0 0px 1px 0px #000",
                        "z-index": "200 !important",
                        "overflow-y": "auto",
                        "padding-bottom": this.StyleForm == "FullScreen" ? 0 : 50
                    })
                ], MediaQuery: [{
                    condicion: "(max-width: 800px)",
                    ClassList: [
                        new WCssClass(".ModalContentWModal", {
                            "padding-bottom": "0px",
                        }),
                    ]
                }]
            }
        }))
        this.DrawComponent();
    }
    checkDisplay(prop) {
        let flag = true
        if (this.DisplayData != undefined &&
            this.DisplayData.__proto__ == Array.prototype) {
            const findProp = this.DisplayData.find(x => x == prop);
            if (!findProp) {
                flag = false;
            }
        }
        return flag;
    }
    DrawComponent = async () => {
        this.DarkMode = this.DarkMode ?? false;
        if (this.id == undefined || this.id == "") {
            this.id = "TempModal";
        }
        this.className = "ModalContentWModal";
        this.Modal = {
            type: "div",
            props: {
                class: "ContainerFormWModal"
            },
            children: []
        };
        this.Modal.children.push(this.DrawModalHead());
        if (this.ObjectModal) { //AGREGA UN OBJETO AL MODAL ENVIDO DESDE LA CONFIGURACION
            this.Modal.children.push({ type: "div", props: { class: "ObjectModalContainer" }, children: [this.ObjectModal] });
        } else if (this.ObjectDetail || this.ModelObject || this.EditObject) { // MUESTRA EL DETALLE DE UN OBJETO EN UNA LISTA
            const { WForm } = await import("./WForm.js");
            this.Config.SaveFunction = (ObjectF) => {
                if (this.ObjectOptions != undefined) {
                    if (this.ObjectOptions.SaveFunction != undefined) {
                        this.ObjectOptions.SaveFunction(ObjectF);
                    }
                }
                this.close();
            }

            this.Modal.children.push({ type: "div", props: { class: "ModalContent" }, children: [new WForm(this.Config)] });
        }
        if (this.ShadowRoot) {
            this.shadowRoot.append(WRender.createElement(this.Modal));
        } else {
            this.append(WRender.createElement(this.Modal));
        }
        ComponentsManager.modalFunction(this)
    }
    DrawModalHead() {
        if (this.HeadOptions == false || this.NoModal == true) {
            return "";
        }
        let icon = "";
        if (this.icon != undefined) {
            icon = WRender.CreateStringNode(`<img src="${this.icon}" class="HeaderIcon" alt="">`)
        }
        const InputClose = {
            type: 'button',
            props: {
                class: 'BtnClose', //class: 'Btn',
                type: "button",
                onclick: () => {
                    ComponentsManager.modalFunction(this);
                    setTimeout(() => {
                        this.parentNode.removeChild(this);
                    }, 1000);
                }, innerText: 'x'
            }
            //children: ['◄ Back']
        };
        const Section = {
            type: 'div',
            props: { className: "ModalHeader" },
            children: [
                icon, { type: "label", props: { innerText: this.title } }, InputClose
            ]
        };
        return Section;
    }
    close = () => {
        ComponentsManager.modalFunction(this);
        setTimeout(() => {
            this.parentNode.removeChild(this);
        }, 1000);
    }
    //STYLES----------------------------------------------------------------->
    FormStyle = () => {
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(" .ContainerFormWModal", {
                        "display": "block",
                        "overflow": "hidden",
                        "margin": "auto",
                        "margin-top": this.StyleForm == "FullScreen" ? 0 : 30,
                        "background-color": this.DarkMode ? "#444444" : "#fff",
                        "width": this.WidthContainer,
                        "max-height": "calc(100vh - 40px)",
                        "overflow-y": "auto",
                        "min-height": this.StyleForm == "FullScreen" ? "100vh" : 200,
                        "border-radius": "0.3cm",
                        "position": "relative",
                        "box-shadow": "0 0px 3px 0px #000",
                    }), new WCssClass(" .ContainerFormWModal h2", {
                        "padding": "10px",
                        "margin": "0px",
                        "background": "#09f",
                    }), new WCssClass(` .ContainerFormWModal h1, 
                         .ContainerFormWModal h3,
                         .ContainerFormWModal h4, .ContainerFormWModal h5`, {
                        display: "block",
                        padding: "10px",
                        "text-align": "center",
                        font: "400 13.3333px !important"
                    }), new WCssClass(`.ModalContent`, {
                        height: 'calc(100% - 60px)',
                        overflow: "hidden",
                        "overflow-y": "auto",
                        display: "block"
                    }),
                    //encabezado
                    new WCssClass(` .ModalHeader`, {
                        "color": this.DarkMode ? "#fff" : "#444",
                        "font-weight": "bold",
                        "font-size": "20px",
                        "display": "flex",
                        "justify-content": "space-between",
                        "align-items": "center",
                        padding: "10px 30px",
                        "margin-top": "10px"
                    }), new WCssClass(` .ModalElement`, {
                        "background-color": "#4da6ff",
                        padding: 10,
                        "border-radius": 5
                    }), new WCssClass(` .BtnClose`, {
                        "font-size": "18pt",
                        "color": "#b9b2b3",
                        "cursor": "pointer",
                        "width": "30px",
                        "border-radius": "10px",
                        "display": "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        border: "none",
                        "background-color": "rgba(0,0,0,0.2)"
                    }), new WCssClass(` .HeaderIcon`, {
                        "height": "50px",
                        "width": "50px",
                        "position": "relative",
                        "left": "-10px;",
                    }), new WCssClass(`.ObjectModalContainer`, {
                        overflow: "hidden",
                        "overflow-y": 'auto',
                        "max-height": "calc(100vh - 120px)",
                        margin: 10
                    }),
                ], MediaQuery: [{
                    condicion: "(max-width: 800px)",
                    ClassList: [new WCssClass(" .ContainerFormWModal", {
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        height: "100%"
                    }), new WCssClass(" divForm", {
                        padding: "20px",
                        "display": "grid",
                        "grid-gap": "1rem",
                        "grid-template-columns": "calc(100% - 20px) !important",
                        "grid-template-rows": "auto",
                        "justify-content": "center"
                    }), new WCssClass(" .ContainerFormWModal", {
                        "margin-top": "0px",
                        "width": "100%",
                        "max-height": "calc(100vh - 0px)",
                        "height": "calc(100vh - 0px)",
                        "border-radius": "0cm",
                    }), new WCssClass("", {
                        "padding-bottom": "0px",
                    }), new WCssClass(`.ObjectModalContainer`, {
                        "max-height": "calc(100% - 80px)"
                    }),
                    ]
                },]
            }
        }
        return Style;
    }

}
customElements.define("w-modal-form", WModalForm);
export { WModalForm }