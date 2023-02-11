import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../../WDevCore/WModules/WComponentsTools.js";
import { WCssClass } from "../../WDevCore/WModules/WStyledRender.js";
import { StyleScrolls, StylesControlsV1 } from "../../WDevCore/StyleModules/WStyleComponents.JS";
import "../../WDevCore/WComponents/WModalForm.js";

class InvestigacionesViewer extends HTMLElement {
    constructor(WArticlesConfig = {}) {
        super();
        this.ArticlesClass = "WArticles WScroll";
        this.Dataset = [];
        this.selectedItems = [];
        this.paginate = true;
        this.attachShadow({ mode: "open" });
        this.TypeMoney = "Euro";
        this.ArticleFooter = [];
        this.ArticleBody = [];
        for (const prop in WArticlesConfig) {
            this[prop] = WArticlesConfig[prop];
        }
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }
        this.shadowRoot.append(WRender.createElement(WArticleStyleContainer));
        this.maxElementByPage = this.maxElementByPage ?? 10;
        this.DrawArticles();
    }
    DefineModelObject(Dataset = this.Dataset) {
        if (this.ModelObject == undefined) {
            this.ModelObject = {};
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
                const trOptions = { type: "div", props: { class: this.ArticlesClass }, children: [] }
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
                                        const obj = {};
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
        let ArticlesContainer = { type: "div", props: {}, children: [] };
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
            const ArticleFooter = WRender.Create({ class: 'ArticleFooter' });
            const ArticleBody = WRender.Create({ class: 'ArticleBody' });
            const ArticleC = WRender.Create({ tagName: "article", class: 'ArticleBody', children: [ArticleBody, ArticleFooter] });

            const Card = WRender.Create({
                className: "InvestigadorCard",
                children: [
                    { tagName: 'img', src: "data:image/png;base64," + element.Tbl_InvestigatorProfile?.Foto },
                    "Autor: ",
                    element.Tbl_InvestigatorProfile?.Nombres + ' ' + element.Tbl_InvestigatorProfile?.Apellidos
                ]
            })
            ArticleBody.append(
                WRender.Create({ tagName: 'label', className: "LabelTitle", innerText: element.Titulo }),
                WRender.Create({
                    className: "DisciplinasCard", children: element.Tbl_Investigaciones_Disciplinas?.map(d => ({
                        tagName: 'label',
                        innerText: d.Cat_Disciplinas?.DescripcionDisciplina,
                        style: { background: d.Cat_Disciplinas?.Color }
                    }))
                }),
                WRender.Create({ tagName: 'p', className: "p", innerText: element.Resumen }),
                Card                
            );
            ArticleFooter.append(element.Fecha_ejecucion?.toDateFormatEs())
            if (this.Options != undefined) {
                if (this.Options.Show != undefined ||
                    this.Options.UserActions != undefined) {
                    const Options = ArticleFooter;
                    if (this.Options.UserActions != undefined) {
                        this.Options.UserActions.forEach(Action => {
                            ArticleFooter.appendChild(WRender.Create({
                                class: "BtnPrimary",
                                type: "button",
                                innerText: Action.name,
                                onclick: async (ev) => {
                                    Action.Function(element, ev.target);
                                }
                            }))
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
            }), new WCssClass(`.WArticles .ArticleFooter`, {
                padding: 10,
                display: "flex",
                "align-items": "center",
                "font-size": 13,
                "font-family": '"Poppins", sans-serif',
                "box-shadow": "0 0px 2px 0 rgba(0,0,0,0.4)",
                "justify-content": "space-between",
                color: "#888"
            }), new WCssClass(`.WArticles .ArticleBody`, {
                display: "flex",
                "flex-direction": "column",
                "font-size": 12,
                "font-family": '"Poppins", sans-serif',
                position: "relative",
                "min-height": 150,
                "border-radius": "0.2cm",
                overflow: "hidden"
            }), new WCssClass(`.WArticles  .ArticleBody .LabelTitle`, {
                color: "#fff",
                background: "#584d6e",
                padding: 10,
                "font-size": 16,
                "font-weight": "bold",
                color: "#fff",
                margin: "20px 20px 20px  0px",
                "border-radius": "0px 20px 20px  0px"
            }), new WCssClass(`.WArticles .ArticleBody p`, {
                "text-align": "justify",
                "text-overflow": "ellipsis",
                "-webkit-box-orient": "vertical",
                "-moz-box-orient": "vertical",
                "box-orient": "vertical",
                overflow: "hidden",
                padding: "0px 25px",
                color: "#888",
                bottom: 0,
                "font-size": 14,
                width: "calc(100% - 50px)"
            }), new WCssClass(`.InvestigadorCard`, {
                display: "flex",
                overflow: "hidden",
                height: 60,
                padding: 20
            }), new WCssClass(`.InvestigadorCard img`, {
                height: 60,
                width: 60,
                "border-radius": "20%",
                "box-shadow": "0 0px 1px 0 rgba(0,0,0,0.3)",
                "object-fit": "cover",
                "margin-right": 10
            }), new WCssClass(`.InvestigadorCard label`, {
                height: 40,
                padding: 10,
                "font-size": 13,
                "margin-right": 10,
                display: "flex",
                "align-items": "flex-end",
                color: "#999"
            }),  new WCssClass(`.DisciplinasCard`, {
                display: "flex",
                "align-items": "center",
                "justify-content": "flex-end",
                padding: 20                
            }), new WCssClass(`.DisciplinasCard label`, {                
                padding: "8px 10px",
                "border-radius": 20,
                "font-size": 11,
                "margin-right": 10,
                color: "#fff"
            }), new WCssClass(`.ArticleAction`, {
                display: 'flex',
                padding: "10px 30px",
                "justify-content": "flex-end",
                "align-items": "center"
            }), new WCssClass(`.ArticleAction .BtnArticles, .ArticleAction img`, {
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
customElements.define("w-investigaciones-viewer", InvestigacionesViewer);
export { InvestigacionesViewer }