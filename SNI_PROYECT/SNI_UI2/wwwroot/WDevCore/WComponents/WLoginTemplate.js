import { WRender, WAjaxTools, ComponentsManager } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "../WComponents/WModalForm.js";
let photoB64;
class WLoginTemplate extends HTMLElement {
    constructor() {
        super();
        this.Data = {};
    }
    #LoginData = {
        username: null,
        token: null
    }
    connectedCallback() {        
        this.DrawComponent();
    }
    async DrawComponent() {
        console.log("drawing login...");
        this.#LoginData.username = sessionStorage.getItem(this.id + "username");
        this.#LoginData.token = sessionStorage.getItem(this.id + "token");
        this.innerHTML = "";
        this.childsContainer = WRender.createElement({ type: "div" });
        this.append(WRender.createElement(this.StyleLoginTemplate()));
        this.append(this.childsContainer);
        this.childsContainer.innerHTML = "";        
        if (this.#LoginData.token == null ||
            this.#LoginData.token == undefined ||
            this.#LoginData.token == "") {
            this.LoginOptions();
            this.RegisterOptions();
        } else {
            this.DataLogin();
            this.LogoutOptions();
        }
    }
    //#region OPCIONES DE LOGUEO Y REGISTRO------------------------------------------------
    LoginOptions() {
        if (this.LoginModel) {
            const InputLogin = {
                type: 'button',
                props: {
                    class: 'Btn',
                    type: "button",
                    onclick: async () => {
                        this.append(WRender.createElement({
                            type: "w-modal-form",
                            props: {
                                StyleForm: "columnX1",
                                ModelObject: this.LoginModel,
                                ObjectOptions: {
                                    AddObject: true,
                                    SaveFunction: async (LoginObject) => {
                                        if (this.LoginFuncion == undefined) {
                                            alert("Debe definir una funcion asyncrona de logueo, que retorne un token y un username");
                                        } else {
                                            const response = await this.LoginFuncion(LoginObject);
                                            this.#LoginData.username = response.username;
                                            this.#LoginData.token = response.token;
                                            sessionStorage.setItem(this.id + "username", this.#LoginData.username);
                                            sessionStorage.setItem(this.id + "token", this.#LoginData.token);
                                            this.DrawComponent();
                                        }
                                    }
                                }
                            }
                        }));
                    }
                },
                children: ['Login In']
            };
            this.childsContainer.append(WRender.createElement(InputLogin));
        }
    }
    RegisterOptions() {
        if (this.RegisterModel) {
            const InputRegister = {
                type: 'button',
                props: {
                    class: 'BtnSecundary',
                    type: "button",
                    onclick: async () => {
                        this.append(WRender.createElement({
                            type: "w-modal-form",
                            props: {
                                StyleForm: "columnX1",
                                ModelObject: this.RegisterModel,
                                ObjectOptions: {
                                    AddObject: true,
                                    SaveFunction: async (LoginObject) => {
                                        if (this.RegisterFuncion == undefined) {
                                            alert("Debe definir una funcion asyncrona de registro");
                                        } else {
                                            const response = await this.RegisterFuncion(LoginObject);
                                            this.DrawComponent();
                                        }
                                    }
                                }
                            }
                        }));
                    }
                },
                children: ['Register']
            };
            this.childsContainer.append(WRender.createElement(InputRegister));
        }
    }
    ////#endregion-------------------------------------------------------------------------
    DataLogin() {
        this.childsContainer.append(WRender.createElement({ type: "label", props: { innerText: this.#LoginData.username } }))
    }
    LogoutOptions() {
        const InputLogin = {
            type: 'button',
            props: {
                class: 'BtnRadio',
                type: "button",
                onclick: async () => {
                    if (this.LogoutFuncion) {
                        this.LoginFuncion();
                    } else {
                        console.log("no ha definido un funcion de cierre de sesion");
                    }
                }
            },
            children: ['▼']
        };
        this.childsContainer.append(WRender.createElement(InputLogin));
    }
    StyleLoginTemplate() {
        const Style = {
            type: "w-style",
            props: {
                id: "StyleLoginTemplate",
                ClassList: [
                    new WCssClass(`#${this.id}`, {
                        display: "block",
                        margin: "auto",
                        "text-align": "center"
                    }), 
                    new WCssClass(`#${this.id} label`, {
                        //"font-weight": "bold",
                        //color: "#808080",
                        padding: "10px",
                    }), new WCssClass(`#${this.id} .BtnRadio`, {
                        //"font-weight": "bold",
                        color: "#808080",
                        padding: "5px 7px",
                        "border-radius": "50%",
                        border: "none",
                        cursor: "pointer"
                    }), new WCssClass(`#${this.id} .BtnAlert,#${this.id} .BtnPrimary,#${this.id} 
                    .BtnSuccess,#${this.id} .BtnSecundary,#${this.id} .Btn`, {
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
                    }), new WCssClass(`#${this.id} .BtnPrimary`, {
                        "color": "#fff",
                        "background-color": "007bff",
                        "border-right": "rgb(3, 106, 175) 5px solid",
                    }), new WCssClass(`#${this.id} .BtnAlert`, {
                        "color": "#fff",
                        "background-color": "#dc3545",
                        "border-right": "#7e1b25 5px solid",
                    }), new WCssClass(`#${this.id} .BtnSuccess`, {
                        "color": "#fff",
                        "background-color": "#28a745",
                        "border-right": "#165c26 5px solid",
                    }), new WCssClass(`#${this.id} .BtnSecundary`, {
                        "color": "#fff",
                        "background-color": "#17a2b8",
                        "border-right": "#0f5964 5px solid",
                    }), new WCssClass(`#${this.id} .Btn[type=checkbox]`, {
                        "height": "20px",
                        "min-width": "20px",
                        "margin": "5px",
                    })
                ],
                MediaQuery: [{
                    condicion: "(max-width: 800px)",
                    ClassList: []
                },]
            }
        }
        return Style;
    }

}
customElements.define("w-login-template", WLoginTemplate);