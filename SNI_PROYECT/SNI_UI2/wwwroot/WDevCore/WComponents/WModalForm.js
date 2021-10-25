import {
    WRender,
    WAjaxTools,
    ComponentsManager
} from "../WModules/WComponentsTools.js";
import {
    WCssClass
} from "../WModules/WStyledRender.js";
let photoB64;
class WModalForm extends HTMLElement {
    constructor() {
        super();
        this.ShadowRoot = true;
        this.DataRequire = true;
    }
    attributeChangedCallBack() {
        this.DrawSlide();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        } //NO MODAL        
        if (this.StyleForm == "columnX1") {
            this.WidthContainer = "40%";
            this.DivColumns = "calc(100% - 20px)";
        } else if (this.StyleForm == "columnX3") {
            this.WidthContainer = "100%";
            this.DivColumns = "calc(30%) calc(30%) calc(30%)";
        } else {
            this.WidthContainer = "70%";
            this.DivColumns = "calc(50% - 10px) calc(50% - 10px)";
        }
        if (this.ShadowRoot) {
            this.attachShadow({
                mode: "open"
            });            
            this.shadowRoot.append(WRender.createElement(this.FormStyle()));
        } else {
            this.append(WRender.createElement(this.FormStyle()));            
        }
        //NO MODAL
        if (this.NoModal == true) {
            const StyleNoM = {
                type: "w-style",
                props: {
                    ClassList: [
                        new WCssClass(" .ContainerFormWModal", {
                            "margin-top": "0px",
                            "width": "100% !important",
                            "max-height": "auto !important",
                            "height": "auto !important",
                            "border-radius": "0cm",
                        })
                    ]
                }
            }
            
            this.HeadOptions == false;
            this.append(WRender.createElement(this.StyleNoModal()));
            if (this.ShadowRoot) {
                this.shadowRoot.append(WRender.createElement(StyleNoM))
            } else {
                this.append(WRender.createElement(StyleNoM))
            }

        } else {
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
                            "padding-bottom": "50px",
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
        }
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
            this.Modal.children.push(this.ObjectModal);
            if (this.ObjectOptions != undefined) {
                if (this.ObjectOptions.SaveFunction != undefined || this.UserActions != undefined) {
                    this.Modal.children.push(this.SaveOptions());
                }
            }
        } else if (this.ObjectDetail) { // MUESTRA EL DETALLE DE UN OBJETO EN UNA LISTA
            this.Modal.children.push(this.ShowFormDetail());
            if (this.UserActions != undefined) {
                this.Modal.children.push(this.SaveOptions());
            }
        } else { //AGREGA FORMULARIO CRUD A LA VISTA
            if (this.ObjectOptions == undefined) {
                this.ObjectOptions = {
                    AddObject: false,
                    Url: undefined
                };
            }
            if (this.ObjectOptions.AddObject == true) { //AGREGA NUEVO OBJETO
                const NewObject = {};
                let ProxyFlag = false;
                const ModelH = this.ObjectModel;
                for (const prop in this.ObjectModel) {
                    if (prop.includes("_operationValue")) {
                        ProxyFlag = true;
                    }
                }
                if (ProxyFlag) {
                    const ObjHandler = {
                        get: function (target, property) {
                            return target[property];
                        },
                        set: function (target, property, value, receiver) {
                            target[property] = value;
                            for (const prop in target) {
                                if (prop.includes("_operationValue")) {
                                    switch (ModelH[prop].operation) {
                                        case "+":
                                            target[prop] =
                                                target[ModelH[prop].value1] +
                                                target[ModelH[prop].value2];
                                            break;
                                        case "-":
                                            target[prop] =
                                                target[ModelH[prop].value1] -
                                                target[ModelH[prop].value2];
                                            break;
                                        case "*":
                                            target[prop] =
                                                target[ModelH[prop].value1] *
                                                target[ModelH[prop].value2];
                                            break;
                                        case "/":
                                            target[prop] =
                                                target[ModelH[prop].value1] /
                                                target[ModelH[prop].value2];
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                            //console.log(target);
                            return true;
                        }
                    };
                    const ObjectProxy = new Proxy(NewObject, ObjHandler);
                    this.Modal.children.push(this.CrudForm(ObjectProxy, this.ObjectOptions));
                    this.Modal.children.push(this.SaveOptions(ObjectProxy));

                } else {
                    this.Modal.children.push(this.CrudForm(NewObject, this.ObjectOptions));
                    this.Modal.children.push(this.SaveOptions(NewObject));
                }
            } else { //EDITA UN OBJETO EXISTENTE               
                if (this.ObjectModel == undefined) {
                    //verifica que el modelo exista,
                    //sino es asi le asigna el valor de un objeto existente
                    this.ObjectModel = this.EditObject;
                }
                this.Modal.children.push(this.CrudForm(this.EditObject, this.ObjectOptions));
                this.Modal.children.push(this.SaveOptions(this.EditObject));
            }
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
                }
            },
            children: ['x']
            //children: ['◄ Back']
        };
        const Section = {
            type: 'div',
            props: {
                className: "ModalHeader"
            },
            children: [
                icon,
                {
                    type: "label",
                    props: {
                        innerText: this.title
                    }
                },
                InputClose
            ]
        };
        return Section;
    }
    ShowFormDetail(ObjectF = this.ObjectDetail) {
        const Form = {
            type: 'divForm',
            children: []
        };
        for (const prop in ObjectF) {
            const flag = this.checkDisplay(prop);
            if (flag) {
                if (prop.includes("_hidden")) {

                } else if (prop.includes("img") || prop.includes("pic") ||
                    prop.includes("Pict") || prop.includes("image") || prop.includes("Image") ||
                    prop.includes("Photo")) {
                    let cadenaB64 = "";
                    var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                    if (base64regex.test(ObjectF[prop])) {
                        cadenaB64 = "data:image/png;base64,";
                    }
                    if (this.ImageUrlPath != undefined
                        && this.ImageUrlPath.__proto__ == String.prototype) {
                        cadenaB64 = this.ImageUrlPath + "/";
                    }
                    Form.children.push({
                        type: "img",
                        props: {
                            src: cadenaB64 + ObjectF[prop],
                            class: "imgPhotoWModal",
                            id: "imgControl" + prop + this.id,
                        }
                    })
                } else {
                    Form.children.push({
                        type: "div",
                        props: {
                            class: "ModalElement"
                        },
                        children: [{
                            type: "label",
                            props: {
                                innerText: prop + ": "
                            }
                        },
                        {
                            type: "label",
                            props: {
                                innerHTML: ObjectF[prop]
                            }
                        }
                        ]
                    });
                }
            }
        }
        return Form;
    }
    CrudForm(ObjectF = {}, ObjectOptions) {
        if (this.AddItemsFromApi != undefined) {
            var Config = {
                MasterDetailTable: true,
                SearchItemsFromApi: this.AddItemsFromApi,
                selectedItems: this.Dataset,
                Options: {
                    Search: true,
                    Select: true,
                }
            }
            return {
                type: "w-table",
                props: {
                    id: "SearchTable" + this.id,
                    TableConfig: Config
                }
            };
        }
        const Model = this.ObjectModel;
        const Form = {
            type: 'divForm',
            children: []
        };

        for (const prop in Model) {
            if (prop.includes("_operationValue")) {
                if (ObjectOptions.AddObject == true) {
                    ObjectF[prop] = "";
                }
            } else if (!prop.includes("_hidden")) {
                const ControlContainer = {
                    type: "div",
                    props: {
                        class: "ModalElement"
                    },
                    children: []
                }
                let ControlTagName = "input";
                let InputType = typeof Model[prop];
                let InputValue = "";
                //--------------------------------
                if (ObjectOptions.AddObject == true) {
                    InputValue = "";
                } else {
                    InputValue = this.EditObject[prop];
                }
                let Options = [];
                if (prop.toUpperCase().includes("PASS") || prop.toUpperCase().includes("PASSWORD")) {
                    InputType = "password";
                } else if (prop.toUpperCase().includes("DATE") || prop.toUpperCase().includes("FECHA") || prop.toUpperCase().includes("TIME")) {
                    InputType = "date";
                } else if (prop.toUpperCase().includes("HORA") || prop.toUpperCase().includes("HOUR")) {
                    InputType = "time";
                } else if (prop.toUpperCase().includes("IMG") || prop.toUpperCase().includes("PICT") ||
                    prop.toUpperCase().includes("IMAGE") || prop.toUpperCase().includes("PHOTO")) {
                    let cadenaB64 = "";
                    let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                    if (base64regex.test(InputValue)) {
                        cadenaB64 = "data:image/png;base64,";
                    }
                    if (this.ImageUrlPath != undefined
                        && this.ImageUrlPath.__proto__ == String.prototype) {
                        cadenaB64 = this.ImageUrlPath + "/";
                    }
                    ControlContainer.children.push({
                        type: "img",
                        props: {
                            src: cadenaB64 + InputValue,
                            class: "imgPhotoWModal",
                            id: "imgControl" + prop + this.id,
                        }
                    })
                    ControlContainer.children.push({
                        type: "label",
                        props: {
                            class: "LabelFile",
                            innerText: "Seleccionar Archivo ⇪",
                            htmlFor: "ControlValue" + prop
                        }
                    })
                    InputType = "file";
                    ControlTagName = "input";
                    ControlContainer.props.class += " imageGridForm";
                } else if (Model[prop] != null && Model[prop].__proto__ == Array.prototype) {
                    ControlTagName = "select";
                    InputType = "";
                    Options.push({
                        type: "option",
                        props: {
                            value: "",
                            innerText: "Seleccionar"
                        }
                    })
                    for (const key in Model[prop]) {
                        let OValue, ODisplay;
                        if (typeof Model[prop][key] === "object" &&
                            Model[prop][key].__proto__ == Object.prototype) {
                            OValue = Model[prop][key]["id"];
                            ODisplay = Model[prop][key]["desc"];
                        } else {
                            OValue = Model[prop][key];
                            ODisplay = Model[prop][key];
                        }
                        const Option = {
                            type: "option",
                            props: {
                                value: OValue,
                                innerText: ODisplay
                            }
                        };
                        if (key == 0 && ObjectOptions.AddObject == true) {
                            ObjectF[prop] = OValue;
                        } else {
                            if (ObjectF[prop].toString() == OValue.toString()) {
                                Option.props.selected = "true";
                            }
                        }
                        Options.push(Option)
                    }
                } else if (typeof Model[prop] === "string" && Model[prop].length >= 50) {
                    ControlTagName = "textarea";
                    InputType = "";
                } else if (parseFloat(Model[prop]).toString() != "NaN") {
                    InputType = "number";
                } else {
                    InputType = "text";
                }
                //DEFINICION DE TIPO            
                const InputControl = {
                    type: ControlTagName,
                    props: {
                        id: "ControlValue" + prop,
                        class: prop,
                        value: null,
                        onchange: async (ev) => { //evento de actualizacion del componente
                            if (ev.target.type == "file") {
                                await this.SelectedFile(ev.target.files[0]);
                                await setTimeout(() => {
                                    ObjectF[prop] = photoB64.toString();
                                    this.shadowRoot.querySelector("#imgControl" + prop + this.id).src = "data:image/png;base64," + ObjectF[prop];
                                }, 1000);
                            } else {
                                ev.target.style = "";
                                ObjectF[prop] = ev.target.value;
                            }
                        }
                    },
                    children: []
                }
                if (InputType != "" && InputType != "file") {
                    InputControl.props.type = InputType;
                    InputControl.props.placeholder = prop + "..."
                } else if (InputType == "file") {
                    InputControl.props.type = InputType;
                    InputControl.props.style = "display: none";
                } else if (ControlTagName == "select") {
                    InputControl.children = Options;
                }
                InputControl.props.value = InputValue;
                const label = {
                    type: "label",
                    props: {
                        class: "inputTitle",
                        innerText: prop.replaceAll("_", " ")
                    }
                }
                ControlContainer.children.push(label, InputControl);
                if (ObjectOptions.AddObject == true) {
                    ObjectF[prop] = "";
                }
                Form.children.push(ControlContainer);
            } else {
                if (ObjectOptions.AddObject == true) {
                    ObjectF[prop] = Model[prop];
                }
            }
        }
        return Form;
    }
    SaveOptions(ObjectF = {}) {
        const DivOptions = {
            type: 'div',
            props: {
                class: "DivSaveOptions"
            },
            children: []
        };
        if (this.ObjectOptions != undefined) {
            const InputSave = {
                type: 'button',
                props: {
                    class: 'Btn',
                    type: "button",
                    onclick: async () => {
                        if (this.ValidateFunction != undefined &&
                            this.ValidateFunction.__proto__ == Function.prototype) {
                            const response = this.ValidateFunction(ObjectF);
                            if (response.validate == false) {
                                alert(response.message);
                                return;
                            }
                        }
                        if (this.DataRequire == true) {
                            for (const prop in ObjectF) {
                                if (!prop.includes("_hidden")) {
                                    if (ObjectF[prop] == null || ObjectF[prop] == "") {
                                        if (this.ShadowRoot) {
                                            const control = this.shadowRoot.querySelector("." + prop);
                                            control.style = "border-bottom:3px solid #ef4d00";
                                            return;
                                        } else {
                                            const control = this.querySelector("." + prop);
                                            control.style = "border-bottom:3px solid #ef4d00";
                                            return;
                                        }

                                    }
                                }
                            }
                        }
                        if (this.ObjectOptions.SaveFunction != undefined) {
                            this.ObjectOptions.SaveFunction(ObjectF);
                        }
                        if (this.ObjectOptions.Url != undefined) {
                            const response = await WAjaxTools.PostRequest(this.ObjectOptions.Url, ObjectF);
                            console.log(response);
                        }
                        ComponentsManager.modalFunction(this);
                        setTimeout(() => {
                            this.parentNode.removeChild(this);
                        }, 1000);
                    }
                },
                children: ['Aceptar']
            };
            DivOptions.children.push(InputSave);
        }
        if (this.UserActions != undefined && this.UserActions != Array) {
            this.UserActions.forEach(Action => {
                DivOptions.children.push({
                    type: "button",
                    props: {
                        class: "Btn",
                        type: "button",
                        innerText: Action.name,
                        onclick: async (ev) => {
                            Action.Function(ev.target);
                        }
                    }
                });
            });
        }
        return DivOptions;
    }
    FormStyle = () => {
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(" .ContainerFormWModal", {
                        "display": "block",
                        "overflow": "hidden",
                        "margin": "auto",
                        "margin-top": "30px",
                        "background-color": "#fff",
                        "width": this.WidthContainer,
                        "max-height": "calc(100vh - 40px)",
                        "overflow-y": "auto",
                        "min-height": "200px",
                        "border-radius": "0.3cm",
                        "position": "relative",
                        "box-shadow": "0 0px 3px 0px #000",
                    }), new WCssClass(" .ContainerFormWModal h2", {
                        "padding": "10px",
                        "margin": "0px",
                        "background": "#09f",
                    }), new WCssClass(" divForm", {
                        //display: "flex", "flex-wrap": "wrap",
                        padding: "20px",
                        "display": "grid",
                        "grid-gap": "1rem",
                        "grid-template-columns": this.DivColumns,// "calc(50% - 10px) calc(50% - 10px)",
                        "grid-template-rows": "auto",
                    }), new WCssClass(" divForm .imageGridForm", {
                        "grid-row": "1/5",
                        //width: "calc(50% - 10px)", margin: "5px"
                    }), new WCssClass(`.ContainerFormWModal input[type=text],
                                        .ContainerFormWModal input[type=string],
                                        .ContainerFormWModal input[type=number], 
                                        .ContainerFormWModal input[type=date],
                                        .ContainerFormWModal input[type=password],
                                        .ContainerFormWModal input[type=time],
                                        .ContainerFormWModal select, textarea`, {
                        width: "calc(100% - 16px)",
                        "font-size": "15px",
                        transition: "all 0.7s",
                        padding: 8,
                        "border": "2px solid #e1d4d4",
                        "font-size": "15px",
                        "border-radius": "0.1cm"
                    }), new WCssClass(` input:-internal-autofill-selected`, {
                        "appearance": "menulist-button",
                        "background-color": "none !important",
                        "background-image": "none !important",
                        "color": "-internal-light-dark(black, white) !important",
                    }),
                    new WCssClass(` input:active,
                                         input:focus,
                                         select:focus`, {
                        "border-bottom": "2px solid #09f",
                        outline: "none",
                    }), new WCssClass(` .DivSaveOptions`, {
                        "margin-top": "10px",
                        "margin-bottom": "10px",
                        padding: "20px", "text-align": "center"
                    }), new WCssClass(` .imgPhotoWModal`, {
                        "grid-column": "1/2",
                        "grid-row": "1/10",
                        height: "300px",
                        display: "block",
                        width: "100%",
                        "object-fit": "cover",
                        "border-radius": "0.3cm",
                        "box-shadow": "0 0px 2px 0px #000",
                    }), new WCssClass(` .ContainerFormWModal h1, 
                         .ContainerFormWModal h3,
                         .ContainerFormWModal h4, .ContainerFormWModal h5`, {
                        display: "block",
                        padding: "10px",
                        "text-align": "center",
                        font: "400 13.3333px !important"
                    }),
                    new WCssClass(` .LabelFile`, {
                        //code---
                        padding: "5px",
                        cursor: "pointer",
                        "background-color": "#09f",
                        "border-radius": "0.2cm",
                        display: "block",
                        color: "#fff",
                        "text-align": "center",
                        //"font-weight": "bold"
                    }), new WCssClass(` .inputTitle`, {
                        //code---
                        padding: "2px",
                        display: "block",
                        "text-align": "center",
                        "font-weight": "bold",
                        "text-transform": "capitalize"
                    }),
                    //encabezado
                    new WCssClass(` .ModalHeader`, {
                        "text-align": "center",
                        "color": "var(--main-color)",
                        "font-weight": "bold",
                        "font-size": "20px",
                        "display": "flex",
                        "justify-content": "space-between",
                        "align-items": "center",
                        padding: "10px 30px",
                        color: "#7b7b7b",
                        "margin-top": "10px"
                    }),
                    new WCssClass(` .BtnClose`, {
                        "font-size": "18pt",
                        "color": "#b9b2b3",
                        "cursor": "pointer",
                        "width": "30px",
                        //"height": "35px",
                        "border-radius": "10px",
                        "display": "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        //"transform": "translateY(-5px)",
                        border: "none",
                        //float: "right",
                        "background-color": "#fff"
                    }), new WCssClass(` .HeaderIcon`, {
                        "height": "50px",
                        "width": "50px",
                        "position": "relative",
                        "left": "-10px;",
                    }),
                    //BORONES
                    new WCssClass(` .BtnAlert, .BtnPrimary, 
                                    .BtnSuccess, .BtnSecundary, .Btn`, {
                        "font-weight": "bold",
                        "border": "none",
                        "padding": "10px",
                        "text-align": "center",
                        "display": "inline-block",
                        "min-width": "100px",
                        "cursor": "pointer",
                        "background-color": "#09f",
                        "color": "#fff",
                        "border-right": "rgb(3, 106, 175) 5px solid",
                    }), new WCssClass(` .BtnPrimary`, {
                        "color": "#fff",
                        "background-color": "007bff",
                        "border-right": "rgb(3, 106, 175) 5px solid",
                    }), new WCssClass(` .BtnAlert`, {
                        "color": "#fff",
                        "background-color": "#dc3545",
                        "border-right": "#7e1b25 5px solid",
                    }), new WCssClass(` .BtnSuccess`, {
                        "color": "#fff",
                        "background-color": "#28a745",
                        "border-right": "#165c26 5px solid",
                    }), new WCssClass(` .BtnSecundary`, {
                        "color": "#fff",
                        "background-color": "#17a2b8",
                        "border-right": "#0f5964 5px solid",
                    }), new WCssClass(` .Btn[type=checkbox]`, {
                        "height": "20px",
                        "min-width": "20px",
                        "margin": "5px",
                    })
                ],
                MediaQuery: [{
                    condicion: "(max-width: 800px)",
                    ClassList: [
                        new WCssClass(" divForm", {
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
                        }),
                    ]
                },]
            }
        }
        return Style;
    }
    StyleNoModal() {
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(`.ModalContentWModal`, {
                        "opacity": "1 !important",
                        display: "block !important",
                        "background-color": "rgba(0, 0, 0, 0.5) !important",
                        "width": "100%",
                        "position": "relative !important",
                        "transition": "all linear 1s",
                        "box-shadow": "0 0px 0px 0px #000",
                        "z-index": "1 !important",
                        "overflow-y": "auto",
                        "padding-bottom": "0px",
                    })
                ],
            }
        }
        return Style;
    }    
    async SelectedFile(value) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            photoB64 = e.target.result.split("base64,")[1];
        }
        reader.readAsDataURL(value);
    }    
}
customElements.define("w-modal-form", WModalForm);