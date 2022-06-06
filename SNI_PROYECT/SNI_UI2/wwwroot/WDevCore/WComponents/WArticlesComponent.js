import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import {StyleScrolls, StylesControlsV1} from "../StyleModules/WStyleComponents.JS";
import "./WModalForm.js";
class WArticlesComponent extends HTMLElement {
    constructor() {
        super();
        this.ArticlesClass = "WArticles WScroll";
        this.Dataset = [];
        this.selectedItems = [];
        this.paginate = true;
        this.attachShadow({ mode: "open" });
        this.TypeMoney = "Euro";
        this.ArticleHeader = [];
        this.ArticleBody = [];
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }
        this.shadowRoot.append(WRender.createElement(WArticleStyleContainer));
        this.maxElementByPage = this.maxElementByPage ?? 10;
        //this.AddItemsFromApi = this.AddItemsFromApi ?? false;
        //this.SearchItemsFromApi = this.SearchItemsFromApi ?? false; 
        this.DrawArticles();
    }
    //BASIC Articles-----------------------------------------------------------------------
    //#region tabla basica --------------------------------------------------------------
    DefineModelObject(Dataset = this.Dataset) {
        if (this.ModelObject == undefined) {
            this.ModelObject = { };
            for (const prop in Dataset[0]) {
                this.ModelObject[prop] = Dataset[0][prop];
            }
        }
    }
    DrawArticles(Dataset = this.Dataset) {
        this.DefineModelObject(Dataset);
        let Articles = this.shadowRoot.querySelector("#MainArticles" + this.id);
        const TOptions = this.DrawHeadOptions();
        if (TOptions != null) {
            this.shadowRoot.append(WRender.createElement(TOptions));
        }
        if (typeof Articles === "undefined" || Articles == null) {
            Articles = { type: "Section", props: { class: this.ArticlesClass, id: "MainArticles" + this.id }, children: [] };
            const ArticlesContainer = this.DrawArticlesContainer(Dataset);
            if (this.paginate == true && Dataset.length > this.maxElementByPage) {
                ArticlesContainer.children.forEach(tb => {
                    Articles.children.push(tb);
                });
            } else {
                Articles.children.push(ArticlesContainer);
            }
            let divArticlesCntainer = { type: "div", props: { class: "ArticlesContainer" }, children: [Articles] }
            this.shadowRoot.append(WRender.createElement(divArticlesCntainer));
            if (this.paginate == true) {
                this.shadowRoot.append(WRender.createElement({
                    type: "div",
                    props: { class: "tfooter" },
                    children: this.DrawTFooter(ArticlesContainer.children)
                }));
            }
        } else {
            Articles.style.display = "Articles";
            Articles.innerHTML = "";
            const ArticlesContainer = this.DrawArticlesContainer(Dataset);
            if (this.paginate == true && Dataset.length > this.maxElementByPage) {
                ArticlesContainer.children.forEach(tb => {
                    Articles.append(WRender.createElement(tb));
                });
            } else {
                Articles.append(WRender.createElement(ArticlesContainer));
            }
            let footer = this.shadowRoot.querySelector(".tfooter");
            if (typeof footer !== "undefined" && footer != null) {
                footer.innerHTML = "";
                if (this.paginate == true) {
                    this.DrawTFooter(ArticlesContainer.children).forEach(element => {
                        footer.append(WRender.createElement(element));
                    });
                }
            }
        }
    }
    DrawHeadOptions() {
        if (this.shadowRoot.querySelector(".thOptions")) {
            this.shadowRoot.querySelector(".thOptions").style.display = "flex";
            return "";
        }
        if (this.Options != undefined) {
            if (this.Options.Search != undefined || this.Options.Add != undefined) {
                const trOptions = { type: "div", props: { class:  this.ArticlesClass }, children: [] }
                if (this.Options.Search != undefined) {
                    const InputOptions = {
                        type: "input",
                        props: {
                            class: "txtControl",
                            type: "text",
                            placeholder: "Buscar...",
                            onchange: async (ev) => {
                                if (this.SearchItemsFromApi != undefined) {
                                    if (this.SearchItemsFromApi.Function != undefined) {
                                        const Dataset = await this.SearchItemsFromApi.Function(ev.target.value);
                                        this.DrawArticles(Dataset);
                                    } else {
                                        const Dataset = await WAjaxTools.PostRequest(
                                            this.SearchItemsFromApi.ApiUrl,
                                            { Param: ev.target.value }
                                        );
                                        this.DrawArticles(Dataset);
                                    }
                                } else {
                                    const Dataset = this.Dataset.filter((element) => {
                                        for (const prop in element) {
                                            if (element[prop] != null) {
                                                if (element[prop].toString().includes(ev.target.value)) {
                                                    return element;
                                                }
                                            }
                                        }
                                    });
                                    if (Dataset.length == 0 && this.Options.ApiUrlSearch != undefined) {
                                        const obj = { };
                                        for (const prop in this.ModelObject) {
                                            if (typeof this.ModelObject[prop] === "string"
                                                && (Date.parse(this.ModelObject[prop]).toString() == "NaN"
                                                    || parseFloat(this.ModelObject[prop]).toString() == "NaN")) {
                                                obj[prop] = ev.target.value;
                                            }
                                        }
                                        const DataUrlSearch = await WAjaxTools.PostRequest(
                                            this.Options.ApiUrlSearch, obj
                                        );
                                        this.DrawArticles(DataUrlSearch);
                                        return;
                                    }
                                    this.DrawArticles(Dataset);
                                }
                            }
                        }
                    }
                    trOptions.children.push(InputOptions);
                }
                if (this.Options.Add != undefined) {
                    const BtnOptions = {
                        type: "button",
                        props: {
                            class: "Btn",
                            type: "button",
                            innerText: "Add+",
                            onclick: async () => {
                                this.shadowRoot.append(WRender.createElement({
                                    type: "w-modal-form",
                                    props: {
                                        ModelObject: this.ModelObject,
                                        AddItemsFromApi: this.AddItemsFromApi,
                                        Dataset: this.Dataset,
                                        icon: this.icon,
                                        title: "Nuevo",
                                        ValidateFunction: this.ValidateFunction,
                                        ObjectOptions: {
                                            Url: this.Options.UrlAdd,
                                            AddObject: true,
                                            SaveFunction: (NewObject) => {
                                                if (this.AddItemsFromApi == null) {
                                                    this.Dataset.push(NewObject);
                                                }
                                                this.DrawArticles();
                                            }
                                        }
                                    }
                                }));
                            }
                        }
                    }
                    trOptions.children.push(BtnOptions);
                }
                return trOptions;
            }
            return null;
        }
        return null;
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
    DrawArticlesContainer = (Dataset = this.Dataset) => {
        let ArticlesContainer = { type: "div", props: { }, children: [] };
        if (this.paginate == true && Dataset.length > this.maxElementByPage) {
            this.numPage = Dataset.length / this.maxElementByPage;
            if (Dataset.length > 50) {
                this.numPage = 50 / this.maxElementByPage;
            }
            for (let index = 0; index < this.numPage; index++) {
                let ArticlesContainerStyle = "display:none";
                if (index == 0) {
                    ArticlesContainerStyle = "";
                }
                ArticlesContainer.children.push({ type: "ArticlesContainer", props: { class: "ArticlesContainerChild", style: ArticlesContainerStyle }, children: [] });
            }
        } else {
            this.numPage = 1;
        }
        let page = 0;
        Dataset.forEach((element, DatasetIndex) => {
            if (DatasetIndex >= 50) {
                return;
            }
            const ArticleHeader = { type: 'div', props: { class: 'ArticleHeader' }, children: [] };
            const ArticleBody = { type: 'div', props: { class: 'ArticleBody' }, children: [] };
            const ArticleC = { type: "article", props: { }, children: [] };
            const ArticlePush = (prop, ArticleElement) => {
                if (this.ArticleHeader.find(x => x == prop)) {
                    ArticleHeader.children.push(ArticleElement);
                } else if (this.ArticleBody.find(x => x == prop)) {
                    ArticleBody.children.push(ArticleElement);
                } else if (this.ArticleBody.length == 0 && this.ArticleHeader.length == 0) {
                    ArticleC.children.push(ArticleElement);
                }
            }
            if (this.ArticleBody.length != 0 || this.ArticleHeader.length != 0) {
                ArticleC.children.push(ArticleBody);
                ArticleC.children.push(ArticleHeader);                
            }
            for (const prop in element) {
                const flag = this.checkDisplay(prop);
                if (flag) {
                    if (!prop.includes("_hidden")) {
                        let value = "";
                        if (element[prop] != null && element[prop] != undefined) {
                            value = element[prop].toString();
                        } else {
                            continue;
                        }
                        //DEFINICION DE VALORES-------------
                        if (prop.includes("img") || prop.includes("pict") || prop.includes("foto") ||
                            prop.includes("Pict") || prop.includes("image") || prop.includes("Image") || 
                            prop.includes("Photo")||
                            prop.includes("photo")) {
                            let cadenaB64 = "";
                            //console.log(this)
                            var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                            if (base64regex.test(value)) {
                                cadenaB64 = "data:image/png;base64,";
                            } else if (this.ImageUrlPath != undefined) {
                                cadenaB64 = this.ImageUrlPath + "/";
                            }
                            const ArticleElement = {
                                type: "img",
                                props: {
                                    src: cadenaB64 + value,
                                    class: "imgPhoto",
                                }
                            };
                            ArticlePush(prop, ArticleElement);
                        } else if (prop.toUpperCase().includes("TOTAL")
                            || prop.toUpperCase().includes("MONTO")
                            || prop.toUpperCase().includes("SUBTOTAL")
                            || prop.toUpperCase().includes("SUB-TOTAL")
                            || prop.toUpperCase().includes("SUB TOTAL")
                            || prop.toUpperCase().includes("IMPUESTO")
                            || prop.toUpperCase().includes("IVA")
                            || prop.toUpperCase().includes("TAXT")
                            || prop.toUpperCase().includes("P/U")
                            || prop.toUpperCase().includes("P-U")) {
                            const ArticleElement = {
                                type: "div", props: {
                                    style: "text-align: right",
                                    innerHTML: `${Money[this.TypeMoney]} ${value}`
                                }
                            }
                            ArticlePush(prop, ArticleElement);
                        } else {
                            ArticlePush(prop, value);
                        }
                    }
                }
            }
            if (this.Options != undefined) {
                if (this.Options.Show != undefined ||
                    this.Options.UserActions != undefined) {
                    const Options = ArticleHeader;//{ type: "div", props: { class: "ArticleAction" }, children: [] };
                    if (this.Options.Show != undefined && this.Options.Show == true) {
                        Options.children.push({
                            type: "button",
                            children: [{ type: 'img', props: { class: "icon", src: WIcons["show2"] } }],
                            props: {
                                class: "BtnArticles",
                                type: "button",
                                onclick: async () => {
                                    this.shadowRoot.append(WRender.createElement({
                                        type: "w-modal-form",
                                        props: {
                                            icon: this.icon,
                                            ImageUrlPath: this.ImageUrlPath,
                                            title: "Detalle",
                                            ObjectDetail: element,
                                        }
                                    }));
                                }
                            }
                        })
                    }
                    if (this.Options.UserActions != undefined) {
                        this.Options.UserActions.forEach(Action => {
                            Options.children.push({
                                type: "button",
                                props: {
                                    class: "BtnPrimary",
                                    type: "button",
                                    innerText: Action.name,
                                    onclick: async (ev) => {
                                        Action.Function(element, ev.target);
                                    }
                                }
                            })
                        });
                    }
                    //ArticleC.children.push(Options);
                }
            }
            if (this.numPage > 1 && ArticlesContainer.children[page] &&
                (this.paginate == true && Dataset.length > this.maxElementByPage)) {
                ArticlesContainer.children[page].children.push(ArticleC);
                if (ArticlesContainer.children[page].children.length == this.maxElementByPage) {
                    page++;
                }
            } else {
                ArticlesContainer.children.push(ArticleC);
            }
        });
        if (ArticlesContainer.children.length == 0) {
            ArticlesContainer.children.push({ type: "h5", props: { innerText: "No hay elementos que mostrar" } });
        }
        //this.shadowRoot.append(WRender.createElement(this.MediaStyleResponsive()));
        return ArticlesContainer;
    }
    DrawTFooter(ArticlesContainer) {
        let tfooter = [];
        this.ActualPage = 0;
        const SelectPage = (index) => {
            let bodys = this.shadowRoot.querySelectorAll("#MainArticles" + this.id + " ArticlesContainer");
            bodys.forEach((body, indexBody) => {
                if (indexBody == index) {
                    if (this.StyleType == "Cards") {
                        body.style.display = "flex";
                    } else if (this.StyleType == "Grid") {
                        body.style.display = "grid";
                    } else {
                        body.style.display = "contents";
                    }
                } else {
                    body.style.display = "none";
                }
            });
            let buttons = this.shadowRoot.querySelectorAll(".tfooter a");
            this.ActualPage = index;
            buttons.forEach((button, indexBtn) => {
                if (indexBtn == index) {
                    button.className = "paginateBTN paginateBTNActive";
                } else if (index > 8 && indexBtn < (index - 7)) {
                    button.className = "paginateBTN paginateBTNHidden";
                } else {
                    button.className = "paginateBTN";
                }
            });
        }
        /*if (ArticlesContainer.length == 0) {
            return tfooter;
        }*/
        tfooter.push({
            type: "label",
            props: {
                innerText: "<<",
                class: "pagBTN",
                onclick: () => {
                    this.ActualPage = this.ActualPage - 1;
                    if (this.ActualPage < 0) {
                        this.ActualPage = ArticlesContainer.length - 1;
                    }
                    SelectPage(this.ActualPage);
                }
            }
        });
        const tfooterNumbers = { type: 'div', props: { class: 'tfooterNumbers' }, children: [] }
        for (let index = 0; index < this.numPage; index++) {
            let btnClass = "paginateBTN";
            if (index == 0) {
                btnClass = "paginateBTN paginateBTNActive";
            } else if ((index) > 20) {
                btnClass = "paginateBTN paginateBTNHidden";
            } else {
                btnClass = "paginateBTN";
            }
            tfooterNumbers.children.push({
                type: "a",
                props: {
                    id: "footBtn" + (index + 1),
                    innerText: index + 1,
                    class: btnClass,
                    onclick: () => {
                        SelectPage(index);
                    }
                }
            });
        }
        tfooter.push(tfooterNumbers);
        tfooter.push({
            type: "label",
            props: {
                innerText: ">>",
                class: "pagBTN",
                onclick: () => {
                    this.ActualPage = this.ActualPage + 1;
                    if (this.ActualPage > ArticlesContainer.length - 1) {
                        this.ActualPage = 0;
                    }
                    SelectPage(this.ActualPage);
                }
            }
        });
        return tfooter;
    }
    //#endregion fin tabla basica   
}
const WIcons = {
    UpRow: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjU2IDI1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwb2x5Z29uIHBvaW50cz0iMTI4LDQ4LjkwNyAwLDE3Ni45MDcgMzAuMTg3LDIwNy4wOTMgMTI4LDEwOS4yOCAyMjUuODEzLDIwNy4wOTMgMjU2LDE3Ni45MDcgCQkiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
    DownRow: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjU2IDI1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwb2x5Z29uIHBvaW50cz0iMjI1LjgxMyw0OC45MDcgMTI4LDE0Ni43MiAzMC4xODcsNDguOTA3IDAsNzkuMDkzIDEyOCwyMDcuMDkzIDI1Niw3OS4wOTMgCQkiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
    show2: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNDg4Ljg1IDQ4OC44NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDg4Ljg1IDQ4OC44NTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik0yNDQuNDI1LDk4LjcyNWMtOTMuNCwwLTE3OC4xLDUxLjEtMjQwLjYsMTM0LjFjLTUuMSw2LjgtNS4xLDE2LjMsMCwyMy4xYzYyLjUsODMuMSwxNDcuMiwxMzQuMiwyNDAuNiwxMzQuMgoJCXMxNzguMS01MS4xLDI0MC42LTEzNC4xYzUuMS02LjgsNS4xLTE2LjMsMC0yMy4xQzQyMi41MjUsMTQ5LjgyNSwzMzcuODI1LDk4LjcyNSwyNDQuNDI1LDk4LjcyNXogTTI1MS4xMjUsMzQ3LjAyNQoJCWMtNjIsMy45LTExMy4yLTQ3LjItMTA5LjMtMTA5LjNjMy4yLTUxLjIsNDQuNy05Mi43LDk1LjktOTUuOWM2Mi0zLjksMTEzLjIsNDcuMiwxMDkuMywxMDkuMwoJCUMzNDMuNzI1LDMwMi4yMjUsMzAyLjIyNSwzNDMuNzI1LDI1MS4xMjUsMzQ3LjAyNXogTTI0OC4wMjUsMjk5LjYyNWMtMzMuNCwyLjEtNjEtMjUuNC01OC44LTU4LjhjMS43LTI3LjYsMjQuMS00OS45LDUxLjctNTEuNwoJCWMzMy40LTIuMSw2MSwyNS40LDU4LjgsNTguOEMyOTcuOTI1LDI3NS42MjUsMjc1LjUyNSwyOTcuOTI1LDI0OC4wMjUsMjk5LjYyNXoiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
    delete: "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Im00MjQgNjRoLTg4di0xNmMwLTI2LjQ2Ny0yMS41MzMtNDgtNDgtNDhoLTY0Yy0yNi40NjcgMC00OCAyMS41MzMtNDggNDh2MTZoLTg4Yy0yMi4wNTYgMC00MCAxNy45NDQtNDAgNDB2NTZjMCA4LjgzNiA3LjE2NCAxNiAxNiAxNmg4Ljc0NGwxMy44MjMgMjkwLjI4M2MxLjIyMSAyNS42MzYgMjIuMjgxIDQ1LjcxNyA0Ny45NDUgNDUuNzE3aDI0Mi45NzZjMjUuNjY1IDAgNDYuNzI1LTIwLjA4MSA0Ny45NDUtNDUuNzE3bDEzLjgyMy0yOTAuMjgzaDguNzQ0YzguODM2IDAgMTYtNy4xNjQgMTYtMTZ2LTU2YzAtMjIuMDU2LTE3Ljk0NC00MC00MC00MHptLTIxNi0xNmMwLTguODIyIDcuMTc4LTE2IDE2LTE2aDY0YzguODIyIDAgMTYgNy4xNzggMTYgMTZ2MTZoLTk2em0tMTI4IDU2YzAtNC40MTEgMy41ODktOCA4LThoMzM2YzQuNDExIDAgOCAzLjU4OSA4IDh2NDBjLTQuOTMxIDAtMzMxLjU2NyAwLTM1MiAwem0zMTMuNDY5IDM2MC43NjFjLS40MDcgOC41NDUtNy40MjcgMTUuMjM5LTE1Ljk4MSAxNS4yMzloLTI0Mi45NzZjLTguNTU1IDAtMTUuNTc1LTYuNjk0LTE1Ljk4MS0xNS4yMzlsLTEzLjc1MS0yODguNzYxaDMwMi40NHoiLz48cGF0aCBkPSJtMjU2IDQ0OGM4LjgzNiAwIDE2LTcuMTY0IDE2LTE2di0yMDhjMC04LjgzNi03LjE2NC0xNi0xNi0xNnMtMTYgNy4xNjQtMTYgMTZ2MjA4YzAgOC44MzYgNy4xNjMgMTYgMTYgMTZ6Ii8+PHBhdGggZD0ibTMzNiA0NDhjOC44MzYgMCAxNi03LjE2NCAxNi0xNnYtMjA4YzAtOC44MzYtNy4xNjQtMTYtMTYtMTZzLTE2IDcuMTY0LTE2IDE2djIwOGMwIDguODM2IDcuMTYzIDE2IDE2IDE2eiIvPjxwYXRoIGQ9Im0xNzYgNDQ4YzguODM2IDAgMTYtNy4xNjQgMTYtMTZ2LTIwOGMwLTguODM2LTcuMTY0LTE2LTE2LTE2cy0xNiA3LjE2NC0xNiAxNnYyMDhjMCA4LjgzNiA3LjE2MyAxNiAxNiAxNnoiLz48L2c+PC9zdmc+",
    edit: "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMSIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00MDUuMzMyMDMxIDI1Ni40ODQzNzVjLTExLjc5Njg3NSAwLTIxLjMzMjAzMSA5LjU1ODU5NC0yMS4zMzIwMzEgMjEuMzMyMDMxdjE3MC42Njc5NjljMCAxMS43NTM5MDYtOS41NTg1OTQgMjEuMzMyMDMxLTIxLjMzMjAzMSAyMS4zMzIwMzFoLTI5OC42Njc5NjljLTExLjc3NzM0NCAwLTIxLjMzMjAzMS05LjU3ODEyNS0yMS4zMzIwMzEtMjEuMzMyMDMxdi0yOTguNjY3OTY5YzAtMTEuNzUzOTA2IDkuNTU0Njg3LTIxLjMzMjAzMSAyMS4zMzIwMzEtMjEuMzMyMDMxaDE3MC42Njc5NjljMTEuNzk2ODc1IDAgMjEuMzMyMDMxLTkuNTU4NTk0IDIxLjMzMjAzMS0yMS4zMzIwMzEgMC0xMS43NzczNDQtOS41MzUxNTYtMjEuMzM1OTM4LTIxLjMzMjAzMS0yMS4zMzU5MzhoLTE3MC42Njc5NjljLTM1LjI4NTE1NiAwLTY0IDI4LjcxNDg0NC02NCA2NHYyOTguNjY3OTY5YzAgMzUuMjg1MTU2IDI4LjcxNDg0NCA2NCA2NCA2NGgyOTguNjY3OTY5YzM1LjI4NTE1NiAwIDY0LTI4LjcxNDg0NCA2NC02NHYtMTcwLjY2Nzk2OWMwLTExLjc5Njg3NS05LjUzOTA2My0yMS4zMzIwMzEtMjEuMzM1OTM4LTIxLjMzMjAzMXptMCAwIi8+PHBhdGggZD0ibTIwMC4wMTk1MzEgMjM3LjA1MDc4MWMtMS40OTIxODcgMS40OTIxODgtMi40OTYwOTMgMy4zOTA2MjUtMi45MjE4NzUgNS40Mzc1bC0xNS4wODIwMzEgNzUuNDM3NWMtLjcwMzEyNSAzLjQ5NjA5NC40MDYyNSA3LjEwMTU2MyAyLjkyMTg3NSA5LjY0MDYyNSAyLjAyNzM0NCAyLjAyNzM0NCA0Ljc1NzgxMiAzLjExMzI4MiA3LjU1NDY4OCAzLjExMzI4Mi42Nzk2ODcgMCAxLjM4NjcxOC0uMDYyNSAyLjA4OTg0My0uMjEwOTM4bDc1LjQxNDA2My0xNS4wODIwMzFjMi4wODk4NDQtLjQyOTY4OCAzLjk4ODI4MS0xLjQyOTY4OCA1LjQ2MDkzNy0yLjkyNTc4MWwxNjguNzg5MDYzLTE2OC43ODkwNjMtNzUuNDE0MDYzLTc1LjQxMDE1NnptMCAwIi8+PHBhdGggZD0ibTQ5Ni4zODI4MTIgMTYuMTAxNTYyYy0yMC43OTY4NzQtMjAuODAwNzgxLTU0LjYzMjgxMi0yMC44MDA3ODEtNzUuNDE0MDYyIDBsLTI5LjUyMzQzOCAyOS41MjM0MzggNzUuNDE0MDYzIDc1LjQxNDA2MiAyOS41MjM0MzctMjkuNTI3MzQzYzEwLjA3MDMxMy0xMC4wNDY4NzUgMTUuNjE3MTg4LTIzLjQ0NTMxMyAxNS42MTcxODgtMzcuNjk1MzEzcy01LjU0Njg3NS0yNy42NDg0MzctMTUuNjE3MTg4LTM3LjcxNDg0NHptMCAwIi8+PC9zdmc+"
}
const Money = {
    Euro: "€",
    Dollar: "$",
    Cordoba: "C$"
}
const StyleTFooter = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`.paginateBTN`, {
                display: "inline-block",
                padding: "5px",
                //"background-color": "#09f",
                color: "#888888",
                "margin": "5px",
                cursor: "pointer",
                "border-radius": "0.2cm",
                //"font-weight": "bold",
                transition: "all 0.6s"
            }), new WCssClass(`.paginateBTNHidden`, {
                display: "none",
            }), new WCssClass(`.paginateBTNActive`, {
                //"background-color": "rgb(3, 106, 175)",
                "font-weight": "bold",
                color: "#444444",
            }), new WCssClass(`.pagBTN`, {
                display: "inline-block",
                padding: "5px",
                //"background-color": "rgb(3, 106, 175)",
                color: "#888888",
                "margin": "5px",
                cursor: "pointer",
                "border-radius": "0.2cm",
                "font-weight": "bold",
                transition: "all 0.6s",
                //width: "80px",
                "text-align": "center",
            }), new WCssClass(`.tfooter`, {
                display: "flex",
                "border-bottom": "1px rgb(185, 185, 185) solid",
                "justify-content": "flex-end",
                "padding-left": "20px",
                "padding-right": "20px",
            }), new WCssClass(`.tfooterNumbers`, {
                overflow: "hidden",
                "max-width": "390px",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
            }), new WCssClass(`h5`, {
                padding: "0.25rem 5px",
                "padding-left": "20px",
                "padding-right": "20px",
                margin: "0px",
            })
        ]
    }
}
//#endregion ##################################################################################################
//#region WARTICLESTYLE #######################################################################################
const ArticleStyle = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`.WArticles`, {
                padding: 10,
            }), new WCssClass(`.WArticles article`, {
                padding: 0,
                "background-color": "#fff",
                "margin-bottom": 10,
                "border-radius": "0.2cm",
                "box-shadow": "0 0px 2px 0 rgba(0,0,0,0.3)",
                overflow: "hidden"
            }), new WCssClass(`.WArticles .ArticleHeader`, {
                padding: 10,
                display: "flex",
                "align-items": "center",
                "font-size": 13,
                "font-family": '"Poppins", sans-serif',
                "box-shadow": "0 0px 2px 0 rgba(0,0,0,0.3)",
                "justify-content": "space-between"
            }), new WCssClass(`.WArticles .ArticleBody`, {
                margin: 10,
                display: "flex",
                "flex-direction": "column",
                "font-size": 12,
                "font-family": '"Poppins", sans-serif',
                position: "relative",
                "min-height": 150,
                "border": "solid 1px rgba(0,0,0,0.3)",
                "border-radius": "0.2cm",
                overflow: "hidden"
            }),new WCssClass(`.WArticles  .ArticleBody label`, {
                padding: 10,
                "font-size": 16,
                "font-weight": "bold", 
                color: "#444"               
            }), new WCssClass(`.WArticles .ArticleBody p`, {
                "text-align": "justify",
                "text-overflow": "ellipsis",
                "display": "-webkit-box",
                " display": "-moz-box",
                "  display": "box",
                "-webkit-box-orient": "vertical",
                "-moz-box-orient": "vertical",
                "box-orient": "vertical",
                "-webkit-line-clamp": "4",
                "line-clamp": "4",
                height: 75,
                position: "absolute",
                overflow: "hidden",
                padding: "5px 15px",
                color: "#fff",
                bottom:0,
                "background-color": "rgb(0,0,0,50%)",
                "font-size": 14,
                width: "calc(100% - 30px)"
            }), new WCssClass(`.ArticleHeader img`, {
                //"grid-row": "1/3",
                //"grid-column": "1/2",
                height: 60,
                width: 60,
                "border-radius": "20%",
                "box-shadow": "0 0px 1px 0 rgba(0,0,0,0.3)",
                "object-fit": "cover"
            }), new WCssClass(`.ArticleBody img`, {                
                width: "100%", 
                height: 200, 
                "object-fit": "cover",
                "box-shadow": "0 0px 1px 0 rgba(0,0,0,0.3)"
            }), new WCssClass(`.ArticleBody img`, {                
                width: "100%",  
                "box-shadow": "0 0px 1px 0 rgba(0,0,0,0.3)"
            }), new WCssClass( `.ArticleAction`, {
                display: 'flex',
                //height: 30,
                padding: "10px 30px",
                "justify-content": "flex-end",
                "align-items": "center"
            }),  new WCssClass( `.ArticleAction .BtnArticles, .ArticleAction img`, {                
                height: 30,
                width: 30,
                border: "none",
                "background-color": "initial",
                cursor: "pointer",
            }),
        ], MediaQuery: [{
            condicion: '(max-width: 600px)',
            ClassList: []
        },
        ]
    }
};
const WArticleStyleContainer = {
    type: 'div',
    props: { id: '', style: 'display: none' },
    children: [
        StyleScrolls, ArticleStyle, StylesControlsV1, StyleTFooter
    ]
}
customElements.define("w-articles", WArticlesComponent);
export { WArticlesComponent }