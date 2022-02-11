import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WModules/WComponentsTools.js';
import { WCssClass } from '../WModules/WStyledRender.js';
import { StyleScrolls, StylesControlsV2 } from "../StyleModules/WStyleComponents.JS";
let photoB64;
class WForm  extends HTMLElement {
    constructor(Config) { 
        super(); 
        this.attachShadow({ mode: 'open' });
        console.log(Config);
        for (const p in Config) {
            this[p] = Config[p];
        }
        
        this.shadowRoot.append(WRender.createElement(StyleScrolls));
        this.shadowRoot.append(WRender.createElement(StylesControlsV2));
        this.shadowRoot.append(WRender.createElement(this.FormStyle()));
    }
    connectedCallback() { this.DrawComponent(); }    
    DrawComponent = async () => { 
        this.DarkMode = this.DarkMode ?? false;
        this.DivForm = {
            type: "div",
            props: {
                class: "ContainerFormWModal"
            },
            children: []
        };
        if (this.ObjectDetail) { // MUESTRA EL DETALLE DE UN OBJETO EN UNA LISTA
            console.log("detail");
            this.DivForm.children.push(this.ShowFormDetail());
            if (this.UserActions != undefined) {
                this.DivForm.children.push(this.SaveOptions());
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
                    this.DivForm.children.push(this.CrudForm(ObjectProxy, this.ObjectOptions));
                    this.DivForm.children.push(this.SaveOptions(ObjectProxy));
                } else {
                    this.DivForm.children.push(this.CrudForm(NewObject, this.ObjectOptions));
                    this.DivForm.children.push(this.SaveOptions(NewObject));
                }
            } else { //EDITA UN OBJETO EXISTENTE               
                if (this.ObjectModel == undefined) {
                    //verifica que el modelo exista,
                    //sino es asi le asigna el valor de un objeto existente
                    this.ObjectModel = this.EditObject;
                }
                this.DivForm.children.push(this.CrudForm(this.EditObject, this.ObjectOptions));
                this.DivForm.children.push(this.SaveOptions(this.EditObject));
            }
        }
        this.shadowRoot.append(WRender.createElement(this.DivForm));
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
    ShowFormDetail(ObjectF = this.ObjectDetail) {
        const Form = {
            type: 'divForm',
            children: []
        };
        for (const prop in ObjectF) {
            const flag = this.checkDisplay(prop);
            if (flag) {
                if (prop.includes("_hidden")) {

                } else if (prop.toUpperCase().includes("IMG") ||
                    prop.toUpperCase().includes("PICT") || 
                    prop.toUpperCase().includes("IMAGE") || prop.toUpperCase().includes("Image") ||
                    prop.toUpperCase().includes("PHOTO")) {
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
                    let value = ObjectF[prop];
                    if (typeof value === "number") {
                        value = value.toFixed(2)
                    }
                    Form.children.push({
                        type: "div",
                        props: {
                            class: "ModalDetailElement"
                        }, children: [{
                            type: "label",
                            props: {
                                innerText: prop + ": " + value
                            }
                        }]
                    });
                }
            }
        }
        return Form;
    }
    CrudForm(ObjectF = {}, ObjectOptions) {
        console.log(ObjectF);
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
                        if (this.SaveFunction != undefined) {
                            this.SaveFunction(ObjectF);
                        }else if (this.ObjectOptions.SaveFunction != undefined) {
                            this.ObjectOptions.SaveFunction(ObjectF);
                        }
                        if (this.ObjectOptions.Url != undefined) {
                            const response = await WAjaxTools.PostRequest(this.ObjectOptions.Url, ObjectF);
                            console.log(response);
                        }
                        //ComponentsManager.modalFunction(this);
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
    async SelectedFile(value) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            photoB64 = e.target.result.split("base64,")[1];
        }
        reader.readAsDataURL(value);
    }
    FormStyle = () => {
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                     new WCssClass("divForm", {
                        padding: "20px",
                        "display": "grid",
                        //"grid-gap": "1rem",
                        "grid-template-columns": this.DivColumns,// "calc(50% - 10px) calc(50% - 10px)",
                        "grid-template-rows": "auto",
                    }), new WCssClass(" divForm .imageGridForm", {
                        "grid-row": "1/4",
                        //width: "calc(50% - 10px)", margin: "5px"
                    }), new WCssClass(` input:-internal-autofill-selected`, {
                        "appearance": "menulist-button",
                        "background-color": "none !important",
                        "background-image": "none !important",
                        "color": "-internal-light-dark(black, white) !important",
                    }), new WCssClass(` .DivSaveOptions`, {
                        "margin-top": "10px",
                        "margin-bottom": "10px",
                        padding: "20px", "text-align": "center"
                    }), new WCssClass(` .imgPhotoWModal`, {
                        "grid-column": "1/2",
                        "grid-row": "1/5",
                        height: "200px",
                        display: "block",
                        width: "100%",
                        "object-fit": "cover",
                        "border-radius": "0.3cm",
                        "box-shadow": "0 0px 2px 0px #000",
                    }), new WCssClass(` .LabelFile`, {
                        padding: "5px",
                        cursor: "pointer",
                        "background-color": "#4894aa",
                        "border-radius": "0.2cm",
                        display: "block",
                        color: "#fff",
                        "text-align": "center",
                    }), new WCssClass(` .inputTitle`, {
                        padding: "2px",
                        display: "block",
                        "text-align": "center",
                        "font-weight": "bold",
                        "text-transform": "capitalize"
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
                    }), new WCssClass(`.ModalElement`, {
                        padding: 10,
                        "border-radius": 5
                    }), new WCssClass(`.ModalDetailElement`, {
                        "background-color": "#4da6ff",
                        padding: 10,
                        "border-radius": 5,
                        overflow: "hidden",
                        "overflow-y": "auto",
                        "max-height": 300,
                        margin:5
                    }),new WCssClass(` .BtnClose`, {
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
        return WRender.createElement(Style);
    }

}
customElements.define('w-form', WForm);
export { WForm }