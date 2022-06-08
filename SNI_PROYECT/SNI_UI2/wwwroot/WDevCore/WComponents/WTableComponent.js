import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WOrtograficValidation } from "../WModules/WOrtograficValidation.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import { WModalForm } from "./WModalForm.js";
class WTableComponent extends HTMLElement {
    constructor(TableConfig = {}) {
        super();
        this.TableClass = "WTable WScroll";
        this.Dataset = [];
        this.selectedItems = [];
        this.ModelObject = {};
        this.paginate = true;
        this.attachShadow({ mode: "open" });
        this.TypeMoney = "Euro";
        this.TableConfig = TableConfig;
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }
        this.shadowRoot.append(WRender.createElement(this.PaginateTOptionsStyle()));
        switch (this.TableConfig.StyleType) {
            default:
                this.shadowRoot.append(WRender.createElement(this.TableStyle()));
                break;
        }
        //PAGINACION
        this.append(WRender.createElement(
            {
                type: 'w-style', props: {
                    id: '', ClassList: [
                        new WCssClass(`w-table`, {
                            display: "block"
                        }),
                    ]
                }
            }));
        if (this.TableConfig.maxElementByPage == undefined) {
            this.maxElementByPage = 10;
        } else {
            this.maxElementByPage = this.TableConfig.maxElementByPage;
        }
        this.AddItemsFromApi = this.TableConfig.AddItemsFromApi;
        this.SearchItemsFromApi = this.TableConfig.SearchItemsFromApi;
        this.DisplayData = this.TableConfig.DisplayData ?? null;
        //this.TableConfig.MasterDetailTable = true
        if (this.TableConfig != undefined) {
            this.Dataset = this.TableConfig.Dataset;
            if (this.Dataset == undefined) {
                this.Dataset = [];
            }
            if (this.TableConfig.Options) {
                this.Options = this.TableConfig.Options;
            } else {
                this.Options = {
                    Search: true,
                    Add: true,
                    Edit: true,
                    Show: true,
                };
            }
            if (this.TableConfig.ModelObject) {
                this.ModelObject = this.TableConfig.ModelObject;
            }
            if (this.TableConfig.selectedItems == undefined) {
                this.selectedItems = [];
            } else {
                this.selectedItems = this.TableConfig.selectedItems;
            }
            this.DrawTable();
            return;
        } else if (typeof this.TableConfig.Dataset === "undefined") {
            this.innerHTML = "Defina un Dataset en formato JSON";
            return;
        }
        this.Dataset = this.TableConfig.Dataset;
        this.Colors = ["#ff6699", "#ffbb99", "#adebad"];
        this.Options = this.TableConfig.Options;
        if (this.TableConfig.paginate != undefined) {
            this.paginate = this.TableConfig.paginate;
        }
        if (this.TableConfig.TableClass) {
            this.TableClass = this.TableConfig.TableClass + " WScroll";
        }
        this.RunTable();
    }
    RunTable() {
        this.DarkMode = this.DarkMode ?? false;
        this.GroupsData = [];
        this.ProcessData = [];
        this.EvalArray = WArrayF.ArrayUnique(this.TableConfig.Dataset, this.AttNameEval);
        if (this.TableConfig.Dinamic == true) {
            this.className = "DinamicContainer";
            this.append(WRender.createElement({
                type: 'w-style', props: {
                    id: '', ClassList: [
                        new WCssClass(`.DinamicContainer`, {
                            overflow: "hidden",
                            height: "700px",
                            display: "grid",
                            border: "solid 1px #d1cfcf",
                            "border-radius": "0.2cm",
                            "grid-template-columns": "calc(100% - 250px) 250px",
                            "grid-template-rows": "280px 40px calc(100% - 320px)",
                            "font-size": "12px",
                            "grid-gap": "5px",
                            padding: "10px"
                        }),
                    ]
                }
            }))
            this.AttNameEval = null;
            this.EvalValue = null;
            this.groupParams = [];
            this.EvalArray = [];
            this.shadowRoot.append(WRender.createElement(this.TableStyleDinamic()));
            this.shadowRoot.append(WRender.createElement(this.TableOptions()));
            this.DrawTable();
            if (this.TableConfig.AddChart == true) {
                if (this.shadowRoot.querySelector("#Chart" + this.id)) {
                    let ChartContainer = this.shadowRoot.querySelector("#Chart" + this.id);
                    ChartContainer.innerHTML = "";
                    ChartContainer.append(WRender.createElement(this.DrawChart()));
                } else {
                    let ChartContainer = {
                        type: "div",
                        props: { id: "Chart" + this.id, className: "CharttableReport" }, children: [this.DrawChart()]
                    }
                    this.shadowRoot.append(WRender.createElement(ChartContainer));
                }
            }
            return;
        }
        if (!this.groupParams || typeof this.groupParams !== "object") {
            this.groupParams = [];
            if (this.AttNameG1) {
                this.groupParams.push(this.AttNameG1)
            }
            if (this.AttNameG2) {
                this.groupParams.push(this.AttNameG2)
            }
            if (this.AttNameG3) {
                this.groupParams.push(this.AttNameG3)
            }
            if (this.groupParams.length > 0 && this.AttNameEval !== undefined && this.EvalValue !== undefined) {
                this.DrawGroupTable();
                if (this.TableConfig.AddChart == true) {
                    if (this.shadowRoot.querySelector("#Chart" + this.id)) {
                        let ChartContainer = this.shadowRoot.querySelector("#Chart" + this.id);
                        ChartContainer.innerHTML = "";
                        ChartContainer.append(WRender.createElement(this.DrawChart()));
                    } else {
                        let ChartContainer = { type: "div", props: { id: "Chart" + this.id }, children: [this.DrawChart()] }
                        this.shadowRoot.append(WRender.createElement(ChartContainer));
                    }
                }
            } else {
                this.DrawTable();
            }
            return;
        }
    }
    //BASIC TABLE-----------------------------------------------------------------------
    //#region tabla basica --------------------------------------------------------------
    DefineModelObject(Dataset = this.Dataset) {
        if (this.TableConfig.ModelObject == undefined) {
            for (const prop in Dataset[0]) {
                this.ModelObject[prop] = Dataset[0][prop];
            }
        } else {
            this.ModelObject = this.TableConfig.ModelObject;
        }
    }
    DrawTable(Dataset = this.Dataset) {
        let ChartContainer = this.shadowRoot.querySelector("#Chart" + this.id);
        if (ChartContainer) {
            ChartContainer.innerHTML = "";
        }
        this.DefineModelObject(Dataset);
        let table = this.shadowRoot.querySelector("#MainTable" + this.id);
        const TOptions = this.DrawHeadOptions();
        if (TOptions != null) {
            this.shadowRoot.append(WRender.createElement(TOptions));
        }
        if (typeof table === "undefined" || table == null) {
            table = { type: "table", props: { class: this.TableClass, id: "MainTable" + this.id }, children: [] };
            table.children.push(this.DrawTHead());
            const tbody = this.DrawTBody(Dataset);
            if (this.paginate == true && Dataset.length > this.maxElementByPage) {
                tbody.children.forEach(tb => {
                    table.children.push(tb);
                });
            } else {
                table.children.push(tbody);
            }
            let divTableCntainer = { type: "div", props: { class: "tableContainer" }, children: [table] }
            this.shadowRoot.append(WRender.createElement(divTableCntainer));
            if (this.paginate == true) {
                this.shadowRoot.append(WRender.createElement({
                    type: "div",
                    props: { class: "tfooter" },
                    children: this.DrawTFooter(tbody.children)
                }));
            }
        } else {
            table.style.display = "table";
            table.innerHTML = "";
            table.append(WRender.createElement(this.DrawTHead()));
            const tbody = this.DrawTBody(Dataset);
            if (this.paginate == true && Dataset.length > this.maxElementByPage) {
                tbody.children.forEach(tb => {
                    table.append(WRender.createElement(tb));
                });
            } else {
                table.append(WRender.createElement(tbody));
            }
            let footer = this.shadowRoot.querySelector(".tfooter");
            if (typeof footer !== "undefined" && footer != null) {
                footer.innerHTML = "";
                if (this.paginate == true) {
                    this.DrawTFooter(tbody.children).forEach(element => {
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
                const trOptions = { type: "div", props: { class: "thOptions" }, children: [] }
                if (this.Options.Search != undefined) {
                    const InputOptions = {
                        type: "input",
                        props: {
                            class: "txtControl",
                            type: "text",
                            placeholder: "Buscar...",
                            onchange: async (ev) => {
                                this.SearchFunction(ev);
                            }
                        }
                    }
                    trOptions.children.push(InputOptions);
                }
                if (this.Options.Add != undefined) {
                    const BtnOptions = {
                        type: "button",
                        props: {
                            class: "BtnTableSR",
                            type: "button",
                            innerText: "Add+",
                            onclick: async () => {
                                if (this.Options.AddFunction)
                                    this.Options.AddFunction();
                                else this.ModalCRUD();
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
    DrawTHead = (element = this.ModelObject) => {
        const thead = { type: "thead", props: {}, children: [] };
        //const element = this.Dataset[0];
        let tr = { type: "tr", children: [] }

        for (const prop in element) {
            const flag = WArrayF.checkDisplay(this.DisplayData, prop, this.ModelObject);
            if (flag) {
                if (!prop.includes("_hidden")) {
                    const th = {
                        type: "th",
                        children: [WOrtograficValidation.es(prop)]
                    };
                    tr.children.push(th);
                    const BtnU = {
                        type: 'img',
                        props:
                        {
                            class: 'orderBtn', src: WIcons.UpRow, onclick: async () => {
                                this.Dataset.sort((a, b) => {
                                    if (typeof a[prop] === "number") {
                                        return a[prop] - b[prop];
                                    } else {
                                        return parseFloat(a[prop].replaceAll("%", "").replaceAll(Money[this.TypeMoney], ""))
                                            - parseFloat(b[prop].replaceAll("%", "").replaceAll(Money[this.TypeMoney], ""));
                                    }
                                });
                                this.DrawTable();
                            }
                        }
                    };
                    const BtnD = {
                        type: 'img',
                        props:
                        {
                            class: 'orderBtn', src: WIcons.DownRow, onclick: async () => {
                                this.Dataset.sort((a, b) => {
                                    if (typeof a[prop] === "number") {
                                        return b[prop] - a[prop];
                                    } else {
                                        return parseFloat(b[prop].replaceAll("%", "").replaceAll(Money[this.TypeMoney], ""))
                                            - parseFloat(a[prop].replaceAll("%", "").replaceAll(Money[this.TypeMoney], ""));
                                    }
                                });
                                this.DrawTable();
                            }
                        }
                    };
                    if (element[prop] != null && parseFloat(element[prop].toString().replaceAll("%", "").replaceAll(Money[this.TypeMoney], "")).toString() != "NaN") {
                        th.children.push(BtnU);
                        th.children.push(BtnD);
                    }
                }
            }

        }
        if (this.Options != undefined) {
            if (this.TrueOptions()) {
                const Options = { type: "th", props: { class: "" }, children: ["Options"] };
                tr.children.push(Options);
            }
        }
        thead.children.push(tr);
        return thead;
    }
    DrawTRow = (tr, element) => {
        tr.innerHTML = "";
        for (const prop in element) {
            if (WArrayF.checkDisplay(this.DisplayData, prop, this.ModelObject)) {
                if (!prop.includes("_hidden")) {
                    let value = "";
                    if (element[prop] != null) {
                        value = element[prop];
                    }
                    const Model = this.ModelObject;
                    let IsImage = this.IsImage(prop);
                    ({ IsImage, value } = this.EvalModelPrototype(Model, prop, IsImage, value));
                    //DEFINICION DE VALORES-------------
                    if (IsImage) {
                        let cadenaB64 = "";
                        //console.log(this.TableConfig)
                        var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                        if (base64regex.test(value)) {
                            cadenaB64 = "data:image/png;base64,";
                        } else if (this.TableConfig.ImageUrlPath != undefined) {
                            cadenaB64 = this.TableConfig.ImageUrlPath + "/";
                        }
                        tr.append(WRender.createElement({
                            type: "td", props: { class: "tdImage" },
                            children: [{
                                type: "img",
                                props: {
                                    src: cadenaB64 + value,
                                    class: "imgPhoto",
                                    height: 50,
                                    width: 50
                                }
                            }]
                        }));
                    } else if (this.IsMoney(prop)) {
                        tr.append(WRender.createElement({
                            type: "td", props: {
                                style: "text-align: right",
                                innerHTML: `${Money[this.TypeMoney]} ${value}`
                            }
                        }));
                    } else if (typeof value === "number") {
                        tr.append(WRender.createElement({ type: "td", props: { innerHTML: value.toFixed(2) } }));
                    } else {
                        tr.append(WRender.createElement({ type: "td", props: { innerHTML: value } }));
                    }
                }
            }
        }
        if (this.Options != undefined) {
            if (this.TrueOptions()) {
                const Options = { type: "td", props: { class: "tdAction" }, children: [] };
                this.SelectBTN(element, Options);
                this.ShowBTN(Options, element);
                this.EditBTN(Options, element, tr);
                this.DeleteBTN(Options, element, tr);
                if (this.Options.UserActions != undefined) {
                    this.Options.UserActions.forEach(Action => {
                        Options.children.push({
                            type: "button",
                            props: {
                                class: "BtnTableSR",
                                type: "button",
                                innerText: Action.name,
                                onclick: async (ev) => {
                                    Action.Function(element, ev.target);
                                }
                            }
                        })
                    });
                }
                tr.append(WRender.createElement(Options));
            }
        }
    }
    DrawTBody = (Dataset = this.Dataset) => {
        let tbody = { type: "tbody", props: {}, children: [] };
        if (this.paginate == true && Dataset.length > this.maxElementByPage) {
            this.numPage = Dataset.length / this.maxElementByPage;
            if (Dataset.length > 50) {
                this.numPage = 50 / this.maxElementByPage;
            }
            for (let index = 0; index < this.numPage; index++) {
                let tBodyStyle = "display:none";
                if (index == 0) {
                    //tBodyStyle = "display:table-row-group";
                    if (this.TableConfig.StyleType != undefined && this.TableConfig.StyleType.includes("Cards")) {
                        tBodyStyle = "display:flex";
                    } else if (this.TableConfig.StyleType != undefined && this.TableConfig.StyleType == "Grid") {
                        tBodyStyle = "display:grid";
                    } else {
                        //tBodyStyle = "display:table-row-group";
                        tBodyStyle = "display:contents";
                    }
                }
                tbody.children.push({ type: "tbody", props: { class: "tbodyChild", style: tBodyStyle }, children: [] });
            }
        } else {
            this.numPage = 1;
        }
        let page = 0;
        Dataset.forEach((element, DatasetIndex) => {
            if (DatasetIndex >= 50) {
                return;
            }
            let tr = WRender.Create({ tagName: "tr" });
            this.DrawTRow(tr, element);
            if (this.numPage > 1 && tbody.children[page] &&
                (this.paginate == true && Dataset.length > this.maxElementByPage)) {
                tbody.children[page].children.push(tr);
                if (tbody.children[page].children.length == this.maxElementByPage) {
                    page++;
                }
            } else {
                tbody.children.push(tr);
            }
        });
        if (tbody.children.length == 0) {
            tbody.children.push({ type: "h5", props: { innerText: "No hay elementos que mostrar" } });
        }
        this.shadowRoot.append(WRender.createElement(this.MediaStyleResponsive()));
        return tbody;
    }
    EvalModelPrototype(Model, prop, IsImage, value) {
        if (Model != undefined && Model[prop] != undefined && Model[prop].__proto__ == Object.prototype) {
            switch (Model[prop].type.toUpperCase()) {
                case "IMAGE": case "IMAGES":
                    IsImage = true;
                    break;
                case "SELECT":
                    const element = Model[prop].Dataset.find(e => {
                        let flag = false;
                        if (e == value) {
                            flag = true;
                        } else if (e.__proto__ == Object.prototype && e.id == value) {
                            flag = true;
                        }
                        return flag;
                    });

                    value = element && element.__proto__ == Object.prototype ? element.desc : element;
                    break;
                case "MULTISELECT":
                    break;
                case "TABLE":
                    break;
                default:
                    break;
            }
        } else if (Model[prop] != null && Model[prop].__proto__ == Array.prototype) {
            InputControl = this.CreateSelect(InputControl, Model[prop], prop, ObjectF);
            ObjectF[prop] = InputControl.value;
        }
        return { IsImage, value };
    }

    DeleteBTN(Options, element, tr) {
        if (this.Options.Delete != undefined && this.Options.Delete == true) {
            Options.children.push({
                type: "button",
                children: [{ type: 'img', props: { class: "icon", src: WIcons["delete"] } }],
                props: {
                    class: "BtnTableA",
                    type: "button",
                    onclick: async () => {
                        this.shadowRoot.append(
                            new WModalForm({
                                icon: this.TableConfig.icon,
                                title: "Eliminar",
                                id: "Alert" + this.id,
                                ObjectModal: { type: "h5", children: ["¿Esta seguro de eliminar este elemento?"] },
                                ObjectOptions: {
                                    Url: this.Options.UrlDelete,
                                    SaveFunction: () => {
                                        const index = Dataset.indexOf(element);
                                        if (WArrayF.FindInArray(element, Dataset) == true) {
                                            Dataset.splice(index, 1);
                                            tr.parentNode.removeChild(tr);
                                        } else { console.log("No Object"); }
                                    }
                                }
                            }));
                    }
                }
            });
        }
    }

    EditBTN(Options, element, tr) {
        if (this.Options.Edit != undefined && this.Options.Edit == true) {
            Options.children.push({
                type: "button",
                children: [{ type: 'img', props: { class: "icon", src: WIcons["edit"] } }],
                props: {
                    class: "BtnTableS",
                    type: "button",
                    onclick: async () => { this.ModalCRUD(element, tr); }
                }
            });
        }
    }

    ShowBTN(Options, element) {
        if (this.Options.Show != undefined && this.Options.Show == true) {
            Options.children.push({
                type: "button",
                children: [{ type: 'img', props: { class: "icon", src: WIcons["show2"] } }],
                props: {
                    class: "BtnTable",
                    type: "button",
                    onclick: async () => {
                        this.shadowRoot.append(
                            new WModalForm({
                                icon: this.TableConfig.icon,
                                ImageUrlPath: this.TableConfig.ImageUrlPath,
                                title: "Detalle",
                                ObjectDetail: element,
                            }));
                    }
                }
            });
        }
    }

    SelectBTN(element, Options) {
        if (this.Options.Select != undefined && this.Options.Select == true) {
            let Checked = WArrayF.FindInArray(element, this.selectedItems);
            Options.children.push({
                type: "input",
                props: {
                    class: "Btn",
                    type: "checkbox",
                    innerText: "Select",
                    checked: Checked,
                    onclick: async (ev) => {
                        const control = ev.target;
                        const index = this.selectedItems.indexOf(element);
                        if (index == -1 && control.checked == true) {
                            if (WArrayF.FindInArray(element, this.selectedItems) == false) {
                                this.selectedItems.push(element);
                            } else {
                                console.log("Item Existente");
                            }
                        } else {
                            this.selectedItems.splice(index, 1);
                        }
                    }
                }
            });
        }
    }

    ModalCRUD(element, tr) {
        this.shadowRoot.append(
            new WModalForm({
                ModelObject: this.ModelObject,
                EditObject: element,
                DisplayData: this.DisplayData,
                icon: this.TableConfig.icon,
                ImageUrlPath: this.TableConfig.ImageUrlPath,
                title: element ? "Editar" : "Nuevo",
                ValidateFunction: this.TableConfig.ValidateFunction,
                AddItemsFromApi: this.AddItemsFromApi,
                ObjectOptions: {
                    Url: element ? this.Options.UrlUpdate : this.Options.UrlAdd,
                    AddObject: element ? false : true,
                    SaveFunction: (NewObject) => {
                        if (element == undefined) {
                            if (this.AddItemsFromApi == null) {
                                this.Dataset.push(NewObject);
                            }
                            this.DrawTable();
                        } else {
                            this.DrawTRow(tr, element);
                        }
                    }
                }
            }));
    }
    SearchFunction = async (ev) => {
        if (this.SearchItemsFromApi != undefined) {
            if (this.SearchItemsFromApi.Function != undefined) {
                const Dataset = await this.SearchItemsFromApi.Function(ev.target.value);
                this.DrawTable(Dataset);
            } else {
                const Dataset = await WAjaxTools.PostRequest(
                    this.SearchItemsFromApi.ApiUrl, { Param: ev.target.value }
                );
                this.DrawTable(Dataset.data);
            }
        } else {
            const Dataset = this.Dataset.filter((element) => {
                for (const prop in element) {
                    try {
                        if (element[prop] != null) {
                            if (element[prop].toString().includes(ev.target.value)) {
                                return element;
                            }
                        }
                    } catch (error) {
                        console.log(element);
                    }
                }
            })
            if (Dataset.length == 0 && this.Options.UrlSearch != undefined) {
                const DataUrlSearch = await WAjaxTools.PostRequest(
                    this.Options.UrlSearch, { Param: ev.target.value }
                );
                this.DrawTable(DataUrlSearch);
                return;
            }
            this.DrawTable(Dataset);
        }
    }
    TrueOptions() {
        return this.Options.Select != undefined ||
            this.Options.Show != undefined ||
            this.Options.Edit != undefined ||
            this.Options.Delete != undefined ||
            this.Options.UserActions != undefined;
    }

    IsMoney(prop) {
        return prop.toUpperCase().includes("TOTAL")
            || prop.toUpperCase().includes("MONTO")
            || prop.toUpperCase().includes("SUBTOTAL")
            || prop.toUpperCase().includes("SUB-TOTAL")
            || prop.toUpperCase().includes("SUB TOTAL")
            || prop.toUpperCase().includes("IMPUESTO")
            || prop.toUpperCase().includes("IVA")
            || prop.toUpperCase().includes("TAXT")
            || prop.toUpperCase().includes("P/U")
            || prop.toUpperCase().includes("P-U");
    }

    IsImage(prop) {
        return prop.includes("img") || prop.includes("pict") ||
            prop.includes("Pict") || prop.includes("image") || prop.includes("Image") ||
            prop.includes("Photo");
    }

    DrawTFooter(tbody) {
        let tfooter = [];
        this.ActualPage = 0;
        const SelectPage = (index) => {
            let bodys = this.shadowRoot.querySelectorAll("#MainTable" + this.id + " tbody");
            bodys.forEach((body, indexBody) => {
                if (indexBody == index) {
                    if (this.TableConfig.StyleType == "Cards") {
                        body.style.display = "flex";
                    } else if (this.TableConfig.StyleType == "Grid") {
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
        /*if (tbody.length == 0) {
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
                        this.ActualPage = tbody.length - 1;
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
                    if (this.ActualPage > tbody.length - 1) {
                        this.ActualPage = 0;
                    }
                    SelectPage(this.ActualPage);
                }
            }
        });
        return tfooter;
    }
    //#endregion fin tabla basica   
    //#region ESTILOS-------------------------------------------------------------------------------------------
    MediaStyleResponsive() {
        if (this.shadowRoot.querySelector("MediaStyleResponsive" + this.id)) {
            this.removeChild(this.shadowRoot.querySelector("MediaStyleResponsive" + this.id));
        }
        const ClassList = [];
        let index = 1;
        for (const prop in this.ModelObject) {
            const flag = WArrayF.checkDisplay(this.DisplayData, prop);
            if (flag) {
                if (!prop.includes("Photo") &&
                    !prop.includes("img") &&
                    !prop.includes("image") &&
                    !prop.includes("Image") &&
                    !prop.includes("Pict") &&
                    !prop.includes("_hidden")) {
                    ClassList.push(new WCssClass(`td:nth-of-type(${index}):before`, {
                        content: `"${prop}:"`,
                        "margin-right": "10px"
                    }))
                }
                index++;
            }
        }
        if (this.TableConfig.StyleType != undefined
            && this.TableConfig.StyleType.includes("Cards")) {
            return {
                type: "w-style",
                props: { ClassList: ClassList }
            }
        }
        return {
            type: "w-style",
            props: {
                id: "MediaStyleResponsive" + this.id,
                MediaQuery: [{
                    condicion: "(max-width: 600px)",
                    ClassList: ClassList
                }]
            }
        }
    }
    TableStyle() {
        const style = this.shadowRoot.querySelector("#TableStyle" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "TableStyle" + this.id,
                ClassList: [
                    //ESTILO DE LA TABLA BASICA----------------------------tableContainer
                    new WCssClass(`.tableContainer`, {
                        overflow: "auto"
                    }), new WCssClass(`.WTable`, {
                        "font-family": "Verdana, sans-serif",
                        width: "100%",
                        "border-collapse": "collapse",
                        "font-size": "12px",
                        //"box-shadow": "0 0 2px 0 rgba(0,0,0,0.5)",
                        border: "1px rgba(10, 10, 10, 0.2) solid",
                        position: "relative",
                        //overflow: "hidden",
                        //"border-radius": 10
                    }), new WCssClass(`.WTable th`, {
                        "text-align": "left",
                        //border: "1px rgba(10, 10, 10, 0.3) solid",
                    }), new WCssClass(`.WTable td`, {
                        padding: "0.25rem 0.8rem",
                        "text-align": "left",
                        //"border-bottom": "1px rgba(10, 10, 10, 0.5) solid",
                        //border: "1px #ccc solid"
                    }), new WCssClass(`.WTable .tdAction`, {
                        "text-align": "center",
                        "width": "120px",
                    }), new WCssClass(`.WTable tbody tr:nth-child(odd)`, {
                        "background-color": "rgba(0,0,0,0.05)"
                    }), new WCssClass(`.icon`, {
                        height: "16px", width: "16px", filter: "invert(1)",
                    }), new WCssClass(`.orderBtn`, {
                        height: "14px",
                        "max-width": "14px",
                        width: "10%",
                        cursor: "pointer",
                        margin: "2px",
                    }), new WCssClass(`th label`, {
                        padding: "5px",
                        width: "calc(70% - 10px)",
                        display: "inline-block",
                        "text-align": "center",
                        "text-overflow": "ellipsis",
                        overflow: "hidden"
                    }), new WCssClass(`.thOptions`, {
                        display: "flex",
                        overflow: "hidden",
                        padding: "10px 0px",
                        "justify-content": "space-between"
                    }), new WCssClass(`input[type=text], input[type=string], input[type=number], input[type=date]`, {
                        padding: 10,
                        "border": "2px solid rgba(0,0,0,0.2)",
                        width: 300,
                        "font-size": "15px",
                        "border-radius": 10
                    }), new WCssClass(`input:active, input:focus`, {
                        //"border-bottom": "2px solid #0099cc",
                        outline: "none",
                    }), new WCssClass(`input[type=button]`, {
                        cursor: "pointer",
                        width: "calc(100% - 0px)",
                        height: "initial"
                    })
                ],
                MediaQuery: [{
                    condicion: "(max-width: 600px)",
                    ClassList: [
                        new WCssClass(`divForm div`, {
                            width: "calc(100% - 10px)",
                            margin: "5px"
                        }), new WCssClass(`.WTable`, {
                            display: "block ", //width: "100%"
                        }), new WCssClass(`.WTable tbody`, {
                            display: "block ", //width: "100%"
                        }), new WCssClass(`.WTable thead`, {
                            display: "none ", //width: "100%"
                        }), new WCssClass(`.WTable tr`, {
                            display: "block ",
                            //border: "1px solid #999",
                            margin: "10px",
                            "border-radius": "0.3cm",
                            overflow: "hidden",
                            "box-shadow": "0 0 5px 2px rgba(0,0,0,0.4)"
                        }), new WCssClass(`.WTable td`, {
                            display: "flex ",
                            "border-bottom": "1px rgba(10, 10, 10, 0.3) solid",
                            padding: "10px"
                            //width: "100%"
                        }), new WCssClass(`.WTable .tdAction`, {
                            display: "block ",
                            "justify-content": "center",
                            "align-items": "center",
                            width: "auto",
                            padding: "10px"
                        }), new WCssClass(`.WTable tbody tr:nth-child(odd)`, {
                            "background-color": "rgba(0,0,0,0.2)"
                        }), new WCssClass(`input[type=text], input[type=string], input[type=number], input[type=date]`, {
                            padding: "5px 10px",
                            width: "calc(100% - 20px)",
                        }),

                    ]
                }]
            }
        }
        return WTableStyle;
    }
    PaginateTOptionsStyle() {
        const style = this.shadowRoot.querySelector("#PaginateTOptionsStyle" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "PaginateTOptionsStyle" + this.id,
                ClassList: [
                    //PAGINACION****************************************************
                    new WCssClass(`.paginateBTN`, {
                        display: "inline-block",
                        padding: "5px",
                        color: "#888888",
                        "margin": "5px",
                        cursor: "pointer",
                        "border-radius": "0.2cm",
                        transition: "all 0.6s"
                    }), new WCssClass(`.paginateBTNHidden`, {
                        display: "none",
                    }), new WCssClass(`.paginateBTNActive`, {
                        "font-weight": "bold",
                        color: "#444444",
                    }), new WCssClass(`.pagBTN`, {
                        display: "inline-block",
                        padding: "5px",
                        color: "#888888",
                        "margin": "5px",
                        cursor: "pointer",
                        "border-radius": "0.2cm",
                        "font-weight": "bold",
                        transition: "all 0.6s",
                        "text-align": "center",
                    }), new WCssClass(`.tfooter`, {
                        display: "flex",
                        border: "1px rgba(10, 10, 10, 0.2) solid",
                        "border-top": "none",
                        "justify-content": "flex-end",
                        "padding-left": "20px",
                        "padding-right": "20px",
                    }), new WCssClass(`.tfooterNumbers`, {
                        overflow: "hidden",
                        "max-width": "390px",
                        "text-overflow": "ellipsis",
                        "white-space": "nowrap",
                    }),
                    //BTN OPTIONS BOTONES               
                    new WCssClass(`.BtnTable, .BtnTableA, .BtnTableS, .BtnTableSR`, {
                        "font-weight": "bold",
                        "border": "none",
                        "padding": "5px",
                        "margin": "2px",
                        "text-align": "center",
                        "display": "inline-block",
                        "min-width": "30px",
                        "font-size": "12px",
                        "cursor": "pointer",
                        "background-color": "#4894aa",
                        "color": "#fff",
                        "border-radius": "0.2cm"
                    }), new WCssClass(`.Btn`, {
                        width: 120,
                    }), , new WCssClass(`.BtnTableS`, {
                        "background-color": "#5fb454",
                    }), new WCssClass(`.BtnTableA`, {
                        "background-color": "#d24545",
                    }), new WCssClass(`.BtnTableSR`, {
                        "background-color": "#4894aa",
                        width: "inherit",
                        "min-width": 100
                    }), new WCssClass(`.Btn[type=checkbox]`, {
                        "height": "20px",
                        "min-width": "20px",
                        "margin": "5px",
                    }),
                    //IMAGE TABLE
                    new WCssClass(`.imgPhoto`, {
                        "width": "80px",
                        "border-radius": "50%",
                        "height": "80px",
                        "size": "100%",
                        display: "block",
                        margin: "auto",
                        "object-fit": "cover",
                        "box-shadow": "0 2px 5px 0 rgb(0 0 0 / 30%)",
                    }),
                    //SCROLLLLSSSSSSSSSS
                    new WCssClass("*::-webkit-scrollbar-thumb", {
                        "background": " #ccc",
                        "border-radius": " 4px",
                    }),
                    new WCssClass("*::-webkit-scrollbar-thumb:hover", {
                        "background": " #b3b3b3",
                        "box-shadow": " 0 0 3px 2px rgba(0, 0, 0, 0.2)",
                    }),
                    new WCssClass("*::-webkit-scrollbar-thumb:active ", {
                        "background-color": " #999999",
                    }),
                    new WCssClass("*::-webkit-scrollbar ", {
                        "width": " 8px",
                        "height": " 10px",
                        "margin": " 10px",
                    }),
                    new WCssClass("*::-webkit-scrollbar-track ", {
                        "background": " #e1e1e1",
                        "border-radius": " 4px",
                    }),
                    new WCssClass("*::-webkit-scrollbar-track:active ,*::-webkit-scrollbar-track:hover", {
                        "background": " #d4d4d4",
                    }),

                ]
            }
        }
        return WTableStyle;

    }
    //#endregion FIN ESTILOS-----------------------------------------------------------------------------------
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
customElements.define("w-table", WTableComponent);
export { WTableComponent }