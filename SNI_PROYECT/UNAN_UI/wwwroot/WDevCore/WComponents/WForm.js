import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WModules/WComponentsTools.js';
import { WCssClass } from '../WModules/WStyledRender.js';
import { StyleScrolls, StylesControlsV2 } from "../StyleModules/WStyleComponents.JS";
let photoB64;
const ImageArray = [];
class FormConfig {
    ObjectDetail = undefined;
    EditObject = undefined;
    UserActions = undefined;
    ObjectModel = {
        property: undefined,
        Operation: {
            type: "OPERATION", Function: (obj) => {
                return obj.value1 + obj.value2;
            }
        }
    };
    AddItemsFromApi = undefined;
    DarkMode = false;
    StyleForm = "columnX1";
    ValidateFunction = (Object) => { /* Validacion */ };
    SaveFunction = (Object) => { /* Guardado */ };
    ObjectOptions = { AddObject: false, Url: undefined };
    DisplayData = ["prop"];

}
class WForm extends HTMLElement {
    constructor(Config = (new FormConfig())) {
        super();
        this.attachShadow({ mode: 'open' });
        WRender.SetStyle(this, {
            height: "90%",
            display: "block"
        })
        for (const p in Config) {
            this[p] = Config[p];
        }
        this.Config = Config;
        this.DataRequire = this.DataRequire ?? true;
        if (this.StyleForm == "columnX1") {
            this.DivColumns = this.Config.DivColumns = "calc(100%)";
        } else if (this.StyleForm == "columnX3") {
            this.DivColumns = this.Config.DivColumns = "calc(30%) calc(30%) calc(30%)";
        } else {
            this.DivColumns = this.Config.DivColumns = "calc(50%) calc(50%)";
        }
        this.shadowRoot.append(WRender.createElement(StyleScrolls));
        this.shadowRoot.append(WRender.createElement(StylesControlsV2));
        this.shadowRoot.append(WRender.createElement(this.FormStyle()));
    }
    connectedCallback() { this.DrawComponent(); }
    DrawComponent = async () => {
        this.DarkMode = this.DarkMode ?? false;
        this.DivForm = WRender.Create({ class: "ContainerFormWModal" });
        if (this.ObjectDetail) { // MUESTRA EL DETALLE DE UN OBJETO EN UNA LISTA
            this.DivForm.append(this.ShowFormDetail());
            if (this.UserActions != undefined) {
                this.DivForm.append(this.SaveOptions());
            }
        } else { //AGREGA FORMULARIO CRUD A LA VISTA
            if (this.ObjectOptions == undefined) {
                this.ObjectOptions = {
                    AddObject: false,
                    Url: undefined
                };
            }
            this.FormObject = this.EditObject ?? {};
            const Model = this.ObjectModel;
            const ObjHandler = {
                get: function (target, property) {
                    return target[property];
                },
                set: function (target, property, value, receiver) {
                    target[property] = value;
                    for (const prop in Model) {
                        if (Model[prop].__proto__ == Object.prototype) {
                            if (Model[prop].type.toUpperCase() == "OPERATION") {
                                target[prop] = Model[prop].Function(target);
                            }
                        }
                    }
                    return true;
                }
            };
            const ObjectProxy = new Proxy(this.FormObject, ObjHandler);
            this.DivForm.append(await this.CrudForm(ObjectProxy, this.ObjectOptions));
            this.DivForm.append(await this.SaveOptions(ObjectProxy));
            // if (this.ObjectOptions.AddObject == true) { //AGREGA NUEVO OBJETO
            //     const NewObject = {};
            //     this.DivForm.append(this.CrudForm(NewObject, this.ObjectOptions));
            //     this.DivForm.append(this.SaveOptions(NewObject));
            // } else { //EDITA UN OBJETO EXISTENTE
            //     this.DivForm.append(await this.CrudForm(this.EditObject, this.ObjectOptions));
            //     this.DivForm.append(this.SaveOptions(this.EditObject));
            // }
        }
        this.shadowRoot.append(this.DivForm);
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
                    FormDivForm.append({
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
                    FormDivForm.append({
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
    CrudForm = async (ObjectF = {}, ObjectOptions) => {
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
        //verifica que el modelo exista,
        //sino es asi le asigna el valor de un objeto existente
        //console.log(ObjectF);
        const Model = this.ObjectModel ?? this.EditObject;
        const Form = WRender.Create({ className: 'divForm' });
        for (const prop in Model) {
            let val = ObjectOptions.AddObject == true ? "" : this.EditObject[prop];
            if (Model[prop].__proto__ == Object.prototype && Model[prop].type.toUpperCase() == "OPERATION") {
                //---------------------------------------->
            } else if (!prop.includes("_hidden")) {
                const ControlContainer = WRender.Create({
                    class: "ModalElement", children: [{
                        tagName: "label", class: "inputTitle", innerText: prop.replaceAll("_", " ")
                    }]
                })
                let InputControl = WRender.Create({ tagName: "input", className: prop, value: val, type: "text" });;
                if (Model[prop].__proto__ == Object.prototype) {
                    switch (Model[prop].type.toUpperCase()) {
                        case "IMAGE": case "IMAGES":
                            const Multiple = Model[prop].type.toUpperCase() == "IMAGES" ? true : false;
                            InputControl = this.CreateImageControl(val, ControlContainer, prop, Multiple);
                            break;
                        case "FECHA": case "HORA": case "PASSWORD":
                            let type = "date";
                            if (Model[prop].type.toUpperCase() == "HORA") {
                                type = "time";
                            } else if (Model[prop].type.toUpperCase() == "PASSWORD") {
                                type = "password";
                            }
                            InputControl = WRender.Create({ tagName: "input", className: prop, type: type, placeholder: prop });
                            InputControl.value = ObjectOptions.AddObject == true ? "" : ObjectF[prop];
                            break;
                        case "SELECT":
                            InputControl = this.CreateSelect(InputControl, Model, prop, ObjectF);
                            break;
                        case "MULTISELECT":
                            const { MultiSelect } = await import("./WMultiSelect.js");
                            InputControl = new MultiSelect({ Dataset: Model[prop].Dataset });
                            ObjectF[prop] = InputControl.selectedItems;
                            break;
                        case "TABLE":
                            break;
                        default:
                            break;
                    }
                } else if (Model[prop] != null && Model[prop].__proto__ == Array.prototype) {
                    InputControl = this.CreateSelect(InputControl, Model, prop, ObjectF);
                } else if (typeof Model[prop] === "string" && Model[prop].length >= 50) {
                    InputControl = WRender.Create({ tagName: "textarea", className: prop });
                } else if (parseFloat(Model[prop]).toString() != "NaN") {
                    InputControl = WRender.Create({ tagName: "input", className: prop, value: val, type: "number", placeholder: prop });
                } else {
                    InputControl = WRender.Create({ tagName: "input", className: prop, value: val, type: "text", placeholder: prop });
                }
                InputControl.id = "ControlValue" + prop;
                InputControl.onchange = async (ev) => { //evento de actualizacion del componente
                    if (ev.target.type == "file") {
                        if (ev.target.multiple) {
                            await this.SelectedFile(ev.target.files, true);
                            ObjectF[prop] = ImageArray;
                        } else {
                            await this.SelectedFile(ev.target.files[0]);
                            
                            await setTimeout(() => {
                                ObjectF[prop] = photoB64.toString();
                                this.shadowRoot.querySelector("#imgControl" + prop + this.id).src = "data:image/png;base64," + ObjectF[prop];
                            }, 1000);
                        }
                    } else {
                        WRender.SetStyle(ev.target, {
                            boxShadow: "none"
                        });
                        ObjectF[prop] = ev.target.value;
                    }
                };
                ControlContainer.append(InputControl);
                Form.append(ControlContainer);
            } else {
                if (ObjectOptions.AddObject == true) {
                    ObjectF[prop] = Model[prop];
                }
            }
        }
        return Form;
    }
    CreateSelect(InputControl, Model, prop, ObjectF) {
        InputControl = WRender.Create({
            tagName: "select", value: null, className: prop,
            children: Model[prop].map(option => {
                let OValue, ODisplay;
                if (option.__proto__ == Object.prototype) {
                    OValue = option["id"];
                    ODisplay = option["desc"];
                } else {
                    OValue = option;
                    ODisplay = option;
                }
                const OptionObject = { tagName: "option", value: OValue, innerText: ODisplay };
                if (ObjectF[prop] != undefined && ObjectF[prop].toString() == OValue.toString()) {
                    OptionObject.selected = "true";
                }
                return OptionObject;
            })
        });
        return InputControl;
    }
    CreateImageControl(InputValue, ControlContainer, prop, Multiple) {
        let cadenaB64 = "";
        let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        if (base64regex.test(InputValue)) {
            cadenaB64 = "data:image/png;base64,";
        }
        if (this.ImageUrlPath != undefined
            && this.ImageUrlPath.__proto__ == String.prototype) {
            cadenaB64 = this.ImageUrlPath + "/";
        }
        const InputControl = WRender.Create({
            tagName: "input", className: prop, multiple: Multiple, type: "file", style: {
                display: "none"
            }
        });
        if (Multiple) {
            const Div = WRender.Create({ class: "listImage" });
            ControlContainer.append(Div);
            InputControl.addEventListener("change", (ev) => {
                for (const file in ev.target.files) {
                    if (ev.target.files[file].__proto__ == File.prototype) {
                        Div.append(ev.target.files[file].name)
                    }
                }
            });
        } else {
            ControlContainer.append(WRender.Create({
                tagName: "img",
                src: cadenaB64 + InputValue,
                class: "imgPhotoWModal",
                id: "imgControl" + prop + this.id,
            }));
        }
        ControlContainer.append(WRender.Create({
            tagName: "label",
            class: "LabelFile",
            innerText: "Seleccionar Archivo",
            htmlFor: "ControlValue" + prop
        }));
        ControlContainer.class += " imageGridForm";
        return InputControl;
    }
    SaveOptions(ObjectF = {}) {
        ObjectF = this.ObjectProxy ?? ObjectF;
        const DivOptions = WRender.Create({ class: "DivSaveOptions" });
        if (this.ObjectOptions != undefined) {
            const InputSave = WRender.Create({
                tagName: 'button',
                class: 'Btn',
                type: "button",
                innerText: 'Aceptar',
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
                                const control = this.shadowRoot.querySelector("#ControlValue" + prop);
                                if (ObjectF[prop] == null || ObjectF[prop] == "") {
                                    WRender.SetStyle(control, {
                                        boxShadow: "0 0 3px #ef4d00"
                                    });
                                    return;
                                } 
                            }
                        }
                    }
                    if (this.SaveFunction != undefined) {
                        this.SaveFunction(ObjectF);
                    } else if (this.ObjectOptions.SaveFunction != undefined) {
                        this.ObjectOptions.SaveFunction(ObjectF);
                    }
                    if (this.ObjectOptions.Url != undefined) {
                        const response = await WAjaxTools.PostRequest(this.ObjectOptions.Url, ObjectF);
                        console.log(response);
                    }
                }
            });
            DivOptions.append(InputSave);
        }
        if (this.UserActions != undefined && this.UserActions != Array) {
            this.UserActions.forEach(Action => {
                DivOptions.append({
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
    async SelectedFile(value, multiple = false) {

        if (multiple) {
            //console.log(value);
            for (const file in value) {
                if (value[file].__proto__ == File.prototype) {
                    const reader = new FileReader();
                    reader.onloadend = function (e) {
                        ImageArray.push(e.target.result.split("base64,")[1]);
                    }
                    await reader.readAsDataURL(value[file]);
                }
            }
        } else {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                photoB64 = e.target.result.split("base64,")[1];
            }
            reader.readAsDataURL(value);
        }
    }
    FormStyle = () => {
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(" .ContainerFormWModal", {
                        height: "100%",
                        overflow: "hidden"
                    }), new WCssClass(".divForm", {
                        display: "grid",
                        "grid-template-columns": this.DivColumns,// "calc(50% - 10px) calc(50% - 10px)",
                        "grid-template-rows": "auto",
                        height: "calc(100% - 70px)",
                        "overflow-y": "auto",
                        "border-bottom": "1px solid #888"
                    }), new WCssClass(".divForm .imageGridForm", {
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
                        "text-align": "center",
                        //height: 100
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
                        margin: 5
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
                    ClassList: [new WCssClass(".divForm", {
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