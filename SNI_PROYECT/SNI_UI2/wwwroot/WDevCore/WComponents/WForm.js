import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WModules/WComponentsTools.js';
import { WCssClass } from '../WModules/WStyledRender.js';
import { StyleScrolls, StylesControlsV2 } from "../StyleModules/WStyleComponents.JS";
import { WModalForm } from './WModalForm.js';
import { WOrtograficValidation } from '../WModules/WOrtograficValidation.js';
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
            this.limit = 2;
        } else if (this.StyleForm == "columnX3") {
            this.DivColumns = this.Config.DivColumns = "calc(33%) calc(33%) calc(33%)";
            this.limit = 4;
        } else {
            this.DivColumns = this.Config.DivColumns = "calc(50%) calc(50%)";
            this.limit = 3;
        }
        this.DivForm = WRender.Create({ class: "ContainerFormWModal" });
        this.shadowRoot.append(WRender.createElement(StyleScrolls));
        this.shadowRoot.append(WRender.createElement(StylesControlsV2));
        this.shadowRoot.append(WRender.createElement(this.FormStyle()));
        this.shadowRoot.append(this.DivForm);
    }
    connectedCallback() {
        this.DrawComponent();
    }
    DrawComponent = async () => {
        this.DarkMode = this.DarkMode ?? false;
        this.DivForm.innerHTML = "";
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
        }
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
        const Model = this.ObjectModel ?? this.EditObject;
        const Form = WRender.Create({ className: 'divForm' });
        for (const prop in Model) {
            const flag = WArrayF.checkDisplay(this.DisplayData, prop);
            let val = ObjectF[prop] == undefined ? Model[prop] : ObjectF[prop];
            ObjectF[prop] = ObjectF[prop] ?? Model[prop];
            Model[prop] = Model[prop] != null ? Model[prop] : "";
            if (!flag) {
                continue;
            }
            if (Model[prop].__proto__ == Object.prototype && (Model[prop].primary || Model[prop].hidden)) {
                if (ObjectOptions.AddObject == true) {
                    ObjectF[prop] = -1;
                } else {
                    ObjectF[prop] = ObjectF[prop] ?? Model[prop];
                }
            } else if (Model[prop].__proto__ == Object.prototype && Model[prop].type.toUpperCase() == "OPERATION") {
                //---------------------------------------->
            } else if (!prop.includes("_hidden")) {
                const ControlContainer = WRender.Create({
                    class: "ModalElement", children: [{
                        tagName: "label", class: "inputTitle",
                        innerText: WOrtograficValidation.es(
                            prop.replaceAll("_id", "")
                                .replaceAll("id_", "")
                                .replaceAll("Id_", "")
                                .replaceAll("_Id", "")
                                .replaceAll("_", " "))
                    }]
                });
                let validateFunction = undefined;
                let InputControl = WRender.Create({ tagName: "input", className: prop, value: val, type: "text" });;
                if (Model[prop].__proto__ == Object.prototype) {
                    validateFunction = Model[prop].validateFunction;
                    switch (Model[prop].type.toUpperCase()) {
                        case "IMAGE": case "IMAGES":
                            const Multiple = Model[prop].type.toUpperCase() == "IMAGES" ? true : false;
                            InputControl = this.CreateImageControl(val, ControlContainer, prop, Multiple);
                            if (Multiple) {
                                ObjectF[prop] = ImageArray;
                            }
                            ControlContainer.className += " imgPhoto";
                            break;
                        case "FECHA": case "HORA": case "PASSWORD":
                            let type = "date";
                            let date_val = val ?? (new Date()).toISO();
                            if (Model[prop].type.toUpperCase() == "HORA") {
                                type = "time";
                                date_val = val ?? "08:00";
                            } else if (Model[prop].type.toUpperCase() == "PASSWORD") {
                                type = "password";
                            }
                            InputControl = WRender.Create({
                                tagName: "input", className: prop, type: type, placeholder: prop
                            });
                            const date = new Date();
                            ObjectF[prop] = InputControl.value = ObjectOptions.AddObject == true ? date_val : ObjectF[prop];
                            break;
                        case "SELECT":
                            InputControl = this.CreateSelect(InputControl, Model[prop].Dataset, prop, ObjectF);
                            ObjectF[prop] = InputControl.value;
                            break;
                        case "MULTISELECT":
                            const { MultiSelect } = await import("./WMultiSelect.js");
                            InputControl = new MultiSelect({ Dataset: Model[prop].Dataset });
                            ObjectF[prop] = InputControl.selectedItems;
                            break;
                        case "TABLE":
                            break;
                        default:
                            val = Model[prop].defaultValue ?? "";
                            InputControl = WRender.Create({ tagName: "input", className: prop, value: val, type: Model[prop].type, placeholder: prop });
                            break;
                    }
                } else if (Model[prop] != null && Model[prop].__proto__ == Array.prototype) {
                    InputControl = this.CreateSelect(InputControl, Model[prop], prop, ObjectF);
                    ObjectF[prop] = InputControl.value
                } else {
                    val = Model[prop] != undefined && Model[prop] != "" && Model[prop] != null ? Model[prop] : "";
                    ObjectF[prop] = val;
                    if (typeof Model[prop] === "string" && Model[prop].length >= 50) {
                        InputControl = WRender.Create({ tagName: "textarea", className: prop });
                    } else if (parseFloat(Model[prop]).toString() != "NaN") {
                        InputControl = WRender.Create({ tagName: "input", className: prop, value: val, type: "number", placeholder: prop });
                    } else {
                        InputControl = WRender.Create({ tagName: "input", className: prop, value: val, type: "text", placeholder: prop });
                    }
                }
                InputControl.id = "ControlValue" + prop;
                InputControl.onchange = async (ev) => { //evento de actualizacion del componente
                    if (validateFunction) {
                        const result = validateFunction(ObjectF, ev.target.value);
                        if (!result.success) {
                            alert(result.message);
                            return;
                        }
                    }
                    if (ev.target.type == "file") {
                        if (ev.target.multiple) {
                            await this.SelectedFile(ev.target.files, true);
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
                    ObjectF[prop] = ObjectF[prop] ?? Model[prop];
                }
            }
        }
        return Form;
    }
    CreateSelect(InputControl, Dataset, prop, ObjectF) {
        InputControl = WRender.Create({
            tagName: "select", value: null, className: prop,
            children: Dataset.map(option => {
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
                        Div.append(WRender.Create(ev.target.files[file].name))
                    }
                }
            });
        } else {
            let cadenaB64 = "";
            let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
            if (base64regex.test(InputValue)) {
                cadenaB64 = "data:image/png;base64,";
            } else if (this.ImageUrlPath != undefined && InputValue
                && InputValue.__proto__ != Object.prototype
                && this.ImageUrlPath.__proto__ == String.prototype) {
                cadenaB64 = this.ImageUrlPath + "/";
            } else {
                cadenaB64 = "data:image/png;base64,";
                InputValue = "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"
            }
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
                                if ((ObjectF[prop] == null || ObjectF[prop] == "") && ObjectF[prop].__proto__ != Array.prototype) {
                                    console.log(prop, ObjectF[prop]);
                                    WRender.SetStyle(control, {
                                        boxShadow: "0 0 3px #ef4d00"
                                    });
                                    return;
                                }
                            }
                        }
                    }
                    if (this.ObjectOptions.Url != undefined) {
                        const ModalCheck = this.ModalCheck(ObjectF);
                        this.shadowRoot.append(ModalCheck)
                    } else {
                        if (this.SaveFunction != undefined) {
                            this.SaveFunction(ObjectF);
                        } else if (this.ObjectOptions.SaveFunction != undefined) {
                            this.ObjectOptions.SaveFunction(ObjectF);
                        }
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
    Save = async () => {

    }
    ModalCheck(ObjectF) {
        const ModalCheck = new WModalForm({
            ObjectModal: [
                WRender.Create({ tagName: "h3", innerText: "¿Esta seguro que desea guardar este registro?" }),
                WRender.Create({
                    style: { textAlign: "center" },
                    children: [
                        WRender.Create({
                            tagName: 'input', type: 'button', className: 'Btn', value: 'SI', onclick: async () => {
                                const response = await WAjaxTools.PostRequest(this.ObjectOptions.Url, ObjectF);
                                console.log(response);
                                if (this.SaveFunction != undefined) {
                                    this.SaveFunction(ObjectF);
                                } else if (this.ObjectOptions.SaveFunction != undefined) {
                                    this.ObjectOptions.SaveFunction(ObjectF);
                                }
                            }
                        }),
                        WRender.Create({
                            tagName: 'input', type: 'button', className: 'Btn', value: 'NO', onclick: async () => {
                                ModalCheck.close();
                            }
                        })
                    ]
                })
            ]
        });
        return ModalCheck;
    }

    async SelectedFile(value, multiple = false) {
        if (multiple) {
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
                        overflow: "hidden",
                    }), new WCssClass(".divForm", {
                        display: "grid",
                        "grid-template-columns": this.DivColumns,// "calc(50% - 10px) calc(50% - 10px)",
                        "grid-template-rows": "auto",
                        height: "calc(100% - 70px)",
                        //"overflow-y": "auto",
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
                    }), new WCssClass(`.imgPhoto`, {
                        "grid-row": "1/3",
                        "grid-column": "1/" + this.limit
                    }), new WCssClass(` .imgPhotoWModal`, {
                        "max-height": "250px",
                        "max-width": "250px",
                        "min-height": "250px",
                        display: "block",
                        margin: "auto",
                        width: "100%",
                        "object-fit": "cover",
                        "box-shadow": "0 0px 2px 0px #000",
                        "object-position": "top",
                        "border-radius": ".5cm"
                    }), new WCssClass(` .LabelFile`, {
                        padding: "5px",
                        "max-width": "250px",
                        margin: "auto",
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
                    }), new WCssClass(`.listImage label`, {
                        "font-size": 11,
                        padding: 5,
                        width: "100%",
                        overflow: "hidden",
                        display: "block"
                    }),
                ], MediaQuery: [{
                    condicion: "(max-width: 800px)",
                    ClassList: [new WCssClass(".divForm", {
                        "display": "grid",
                        "grid-gap": "1rem",
                        "grid-template-columns": "calc(100% - 20px) !important",
                        "grid-template-rows": "auto",
                        "justify-content": "center"
                    }), new WCssClass(" .ContainerFormWModal", {
                        "margin-top": "0px",
                        //"width": "100%",
                        //"max-height": "calc(100vh - 0px)",
                        //"height": "calc(100vh - 0px)",
                        "border-radius": "0cm",
                    }), new WCssClass("", {
                        "padding-bottom": "0px",
                    }), new WCssClass(`.ObjectModalContainer`, {
                        "max-height": "calc(100% - 80px)"
                    }), new WCssClass(`.imgPhoto`, {
                        "grid-row": "1/3",
                        "grid-column": "1/2"
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