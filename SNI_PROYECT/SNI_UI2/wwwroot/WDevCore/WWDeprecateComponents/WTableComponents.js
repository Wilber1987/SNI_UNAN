import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "./WChartJSComponent.js";
import "../WComponents/WModalForm.js";
class WTableComponent extends HTMLElement {
    constructor() {
        super();
        this.TableClass = "WTable WScroll";
        this.Dataset = [];
        this.selectedItems = [];
        this.ModelObject = {};
        this.paginate = true;
        this.attachShadow({ mode: "open" });
        this.TypeMoney = "Euro";       
    }
    connectedCallback() {        
        if (this.shadowRoot.innerHTML != "") {
            return;
        }        
        this.shadowRoot.append(WRender.createElement(this.PaginateTOptionsStyle()));
        switch (this.TableConfig.StyleType) {
            case "Cards":
                this.shadowRoot.append(WRender.createElement(this.TableCardStyle()));
                break;
            case "Cards2":
                this.shadowRoot.append(WRender.createElement(this.TableCardStyle2()));
                break;
            case "Cards3":
                this.shadowRoot.append(WRender.createElement(this.TableCardStyle3()));
                break;
            case "Cards2-ColumnX2":
                this.shadowRoot.append(WRender.createElement(this.TableCardStyle2()));
                this.shadowRoot.append(WRender.createElement(this.TableCardStyle2ColumnX2()));
                break;
            case "Grid":
                this.shadowRoot.append(WRender.createElement(this.TableGridStyle()));
                break;
            default:
                this.shadowRoot.append(WRender.createElement(this.TableStyle()));
                break;
        }
        //PAGINACION
        console.log(this.Dataset);
        console.log(this.TableConfig.Dataset);
        if (this.TableConfig.maxElementByPage == undefined) {
            this.maxElementByPage = 10;
        } else {
            this.maxElementByPage = this.TableConfig.maxElementByPage;
        }
        this.AddItemsFromApi = this.TableConfig.AddItemsFromApi;
        this.SearchItemsFromApi = this.TableConfig.SearchItemsFromApi;
        //this.TableConfig.MasterDetailTable = true
        if (this.TableConfig != undefined && this.TableConfig.MasterDetailTable == true) {
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
        } else if (typeof this.TableConfig.Dataset === "undefined" || this.TableConfig.Dataset.length == 0) {
            //this.innerHTML = "Defina un Dataset en formato JSON";
            //return;
        }
        this.Dataset = this.TableConfig.Dataset;
        this.Colors = ["#ff6699", "#ffbb99", "#adebad"];
        this.AttNameEval = this.TableConfig.AttNameEval;
        this.AttNameG1 = this.TableConfig.AttNameG1;
        this.AttNameG2 = this.TableConfig.AttNameG2;
        this.AttNameG3 = this.TableConfig.AttNameG3;
        this.EvalValue = this.TableConfig.EvalValue;
        this.Options = this.TableConfig.Options;
        if (this.TableConfig.paginate != undefined) {
            this.paginate = this.TableConfig.paginate;
        }
        if (this.TableConfig.TableClass) {
            this.TableClass = this.TableConfig.TableClass + " WScroll";
        }
        this.RunTable();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom attributes changed.' + oldValue + "  -  " + newValue);
    }
    static get observedAttributes() {
        //return ["id", "Dataset"];
    }
    RunTable() {
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
            console.log(this.Options);
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
                                        icon: this.TableConfig.icon,
                                        title: "Nuevo",
                                        ValidateFunction: this.TableConfig.ValidateFunction,
                                        ObjectOptions: {
                                            Url: this.Options.UrlAdd,
                                            AddObject: true,
                                            SaveFunction: (NewObject) => {
                                                if (this.AddItemsFromApi == null) {
                                                    this.Dataset.push(NewObject);
                                                }
                                                this.DrawTable();
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
        if (this.TableConfig.DisplayData != undefined &&
            this.TableConfig.DisplayData.__proto__ == Array.prototype) {
            const findProp = this.TableConfig.DisplayData.find(x => x == prop);
            if (!findProp) {
                flag = false;
            }
        }
        return flag;
    }
    DrawTHead = (element = this.ModelObject) => {
        const thead = { type: "thead", props: {}, children: [] };
        //const element = this.Dataset[0];
        let tr = { type: "tr", children: [] }

        for (const prop in element) {
            const flag = this.checkDisplay(prop);
            if (flag) {
                if (!prop.includes("_hidden")) {
                    const th = {
                        type: "th",
                        children: [
                            prop.replaceAll("_operationValue", "").replaceAll("_", " ")                            
                        ]
                    };
                    tr.children.push(th);
                    const BtnU =  {
                        type: 'img',
                        props:
                        {
                            class: 'orderBtn', src: WIcons.UpRow, onclick: async () => {                                       
                                this.Dataset.sort( (a, b) => {
                                    if (typeof a[prop] === "number") {
                                        return a[prop] - b[prop];
                                    } else {
                                        return parseFloat(a[prop].replaceAll("%", "").replaceAll(Money[this.TypeMoney], "")) 
                                        - parseFloat(b[prop].replaceAll("%", "").replaceAll(Money[this.TypeMoney], ""));
                                         
                                    }
                                });
                                this.DefineTable();
                            }
                        }
                    };
                    const BtnD = {
                        type: 'img',
                        props:
                        {
                            class: 'orderBtn', src: WIcons.DownRow, onclick: async () => {
                                this.Dataset.sort( (a, b) => {                                            
                                    if (typeof a[prop] === "number") {
                                        return b[prop] - a[prop];
                                    } else {
                                        return parseFloat(b[prop].replaceAll("%", "").replaceAll(Money[this.TypeMoney], "")) 
                                        - parseFloat(a[prop].replaceAll("%", "").replaceAll(Money[this.TypeMoney], ""));
                                    }
                                });
                                this.DefineTable();
                            }
                        }
                    };
                    if (parseFloat(element[prop].toString().replaceAll("%", "").replaceAll(Money[this.TypeMoney], "")).toString() != "NaN") {
                        th.children.push(BtnU);
                        th.children.push(BtnD);
                    }
                }
            }

        }
        if (this.Options != undefined) {
            if (this.Options.Select != undefined ||
                this.Options.Show != undefined ||
                this.Options.Edit != undefined ||
                this.Options.Delete != undefined ||
                this.Options.UserActions != undefined) {
                const Options = { type: "th", props: { class: "" }, children: ["Options"] };
                tr.children.push(Options);
            }
        }
        thead.children.push(tr);
        return thead;
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
            let tr = { type: "tr", props: {}, children: [] };
            for (const prop in element) {
                const flag = this.checkDisplay(prop);
                if (flag) {
                    if (!prop.includes("_hidden")) {
                        let value = "";
                        if (element[prop] != null) {
                            value = element[prop].toString();
                        }
                        //DEFINICION DE VALORES-------------
                        if (prop.includes("img") || prop.includes("pict") ||
                            prop.includes("Pict") || prop.includes("image") || prop.includes("Image") ||
                            prop.includes("Photo")) {
                            let cadenaB64 = "";
                            //console.log(this.TableConfig)
                            var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                            if (base64regex.test(value)) {
                                cadenaB64 = "data:image/png;base64,";
                            } else if (this.TableConfig.ImageUrlPath != undefined) {
                                cadenaB64 = this.TableConfig.ImageUrlPath + "/";
                            }
                            tr.children.push({
                                type: "td",
                                props: { class: "tdImage" },
                                children: [{
                                    type: "img",
                                    props: {
                                        src: cadenaB64 + value,
                                        class: "imgPhoto",
                                        height: 50,
                                        width: 50
                                    }
                                }]
                            });
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
                            tr.children.push({
                                type: "td", props: {
                                    style: "text-align: right",
                                    innerHTML: `${Money[this.TypeMoney]} ${value}`
                                }
                            });
                        } else {
                            tr.children.push({ type: "td", props: { innerHTML: value } });
                        }
                    }
                }
            }
            if (this.Options != undefined) {
                if (this.Options.Select != undefined ||
                    this.Options.Show != undefined ||
                    this.Options.Edit != undefined ||
                    this.Options.Delete != undefined ||
                    this.Options.UserActions != undefined) {
                    const Options = { type: "td", props: { class: "tdAction" }, children: [] };
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
                                            this.selectedItems.push(element)
                                        } else {
                                            console.log("Item Existente")
                                        }
                                    } else {
                                        this.selectedItems.splice(index, 1)
                                    }
                                }
                            }
                        })
                    }
                    if (this.Options.Show != undefined && this.Options.Show == true) {
                        Options.children.push({
                            type: "button",
                            children: [{ type: 'img', props: { class: "icon", src: WIcons["show2"] } }],
                            props: {
                                class: "BtnTable",
                                type: "button",
                                onclick: async () => {
                                    this.shadowRoot.append(WRender.createElement({
                                        type: "w-modal-form",
                                        props: {
                                            icon: this.TableConfig.icon,
                                            ImageUrlPath: this.TableConfig.ImageUrlPath,
                                            title: "Detalle",
                                            ObjectDetail: element,
                                        }
                                    }));
                                }
                            }
                        })
                    }
                    if (this.Options.Edit != undefined && this.Options.Edit == true) {
                        Options.children.push({
                            type: "button",
                            children: [{ type: 'img', props: { class: "icon", src: WIcons["edit"] } }],
                            props: {
                                class: "BtnTableS",
                                type: "button",
                                onclick: async () => {
                                    this.shadowRoot.append(WRender.createElement({
                                        type: "w-modal-form",
                                        props: {
                                            ModelObject: this.ModelObject,
                                            EditObject: element,
                                            icon: this.TableConfig.icon,
                                            ImageUrlPath: this.TableConfig.ImageUrlPath,
                                            title: "Editar",
                                            ValidateFunction: this.TableConfig.ValidateFunction,
                                            ObjectOptions: {
                                                Url: this.Options.UrlUpdate,
                                                SaveFunction: () => {
                                                    this.DrawTable();
                                                }
                                            }
                                        }
                                    }));
                                }
                            }
                        })
                    }
                    if (this.Options.Delete != undefined && this.Options.Delete == true) {
                        Options.children.push({
                            type: "button",
                            children: [{ type: 'img', props: { class: "icon", src: WIcons["delete"] } }],
                            props: {
                                class: "BtnTableA",
                                type: "button",
                                onclick: async () => {
                                    this.shadowRoot.append(WRender.createElement({
                                        type: "w-modal-form",
                                        props: {
                                            icon: this.TableConfig.icon,
                                            title: "Eliminar",
                                            id: "Alert" + this.id,
                                            ObjectModal: { type: "h5", children: ["¿Esta seguro de eliminar este elemento?"] },
                                            ObjectOptions: {
                                                Url: this.Options.UrlDelete,
                                                SaveFunction: () => {
                                                    const index = Dataset.indexOf(element);
                                                    if (WArrayF.FindInArray(element, Dataset) == true) {
                                                        ;
                                                        Dataset.splice(index, 1);
                                                        this.DrawTable();
                                                    } else { console.log("No Object") }
                                                }
                                            }
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
                    tr.children.push(Options);
                }
            }

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
    //FIN BASIOC TABLE-------------------------------------------------------------------
    //#region TABLA DINAMICA-------------------------------------------------------------
    DrawGroupTable() {
        this.groupParams.forEach(groupParam => {
            this.GroupsData.push(WArrayF.ArrayUnique(this.TableConfig.Dataset, groupParam))
        });
        this.table = { type: "div", props: { id: "MainTable" + this.id, class: this.TableClass }, children: [] };
        let div = this.DrawGroupDiv(this.ChargeGroup(this.GroupsData))
        this.table.children.push(div);
        let divTableCntainer = { type: "div", props: { class: "tableContainer" }, children: [this.table] };
        this.shadowRoot.append(WRender.createElement(div));
    }
    ChargeGroup = (Groups, inicio = 0) => {
        if (!Groups[inicio]) {
            return null;
        }
        let ObjGroup = {
            data: Groups[inicio],
            groupParam: this.groupParams[inicio],
            children: this.ChargeGroup(Groups, inicio + 1)
        }
        return ObjGroup;
    }
    AttEval = () => {
        let div = { type: "div", props: { class: "TContainerBlockL" }, children: [] };
        div.children.push({ type: "Tlabel", children: [this.AttNameEval] });
        if (this.EvalArray != null) {
            this.EvalArray.forEach(evalValue => {
                div.children.push({ type: "TData", children: [evalValue[this.AttNameEval]] });
            });
            div.children.push({ type: "TDataTotal", children: ["Total"] });
        }
        return div;
    }
    DrawGroupDiv = (Groups, div = { type: "div", props: { class: "TContainer" }, children: [this.AttEval()] }, arrayP = {}) => {
        //console.log(Groups)
        if (Groups == null) {
            return "";
        }
        Groups.data.forEach((Group) => {
            let trGroup = { type: "div", props: { class: "TContainerBlock" }, children: [] };
            trGroup.children.push({ type: "Tlabel", children: [Group[Groups.groupParam]] });
            /////
            let dataGroup = { type: "div", props: { class: "Cajon" }, children: [] };
            trGroup.children.push(dataGroup);
            arrayP[Groups.groupParam] = Group[Groups.groupParam];
            if (Groups.children != null) {
                if (Groups.children.children == null) {
                    trGroup.props.class = "flexChild";
                }
                this.DrawGroupDiv(Groups.children, dataGroup, arrayP);
            } else {
                trGroup.props.class = "TContainerBlockData";
                //let dataGroupeV = { type: "div", props: { class: "Cajon" }, children: [] };
                if (this.EvalArray != null) {
                    this.EvalArray.forEach(Eval => {
                        arrayP[this.AttNameEval] = Eval[this.AttNameEval];
                        const Data = this.FindData(arrayP)
                        dataGroup.children.push({ type: "TData", children: [Data] });
                        let NewObject = {};
                        for (const prop in arrayP) {
                            NewObject[prop] = arrayP[prop];
                        }
                        if (parseFloat(Data).toString() != "NaN") {
                            NewObject[this.EvalValue] = Data;
                            this.ProcessData.push(NewObject)
                        }
                    });
                    let sum = 0;
                    dataGroup.children.forEach(element => {
                        //console.log(element.children[0])
                        const value = parseFloat(element.children[0]);
                        if (typeof value === "number" && value.toString() != "NaN") {
                            sum = sum + value;
                        }
                    });
                    dataGroup.children.push({ type: "TDataTotal", children: [sum] });
                }
            }
            div.children.push(trGroup);
        });
        return div;
    }
    DefineTable(Dataset = this.Dataset) {
        this.ProcessData = [];
        this.TableConfig.Dataset = Dataset;
        let table = this.shadowRoot.querySelector("#MainTable" + this.id);
        let footer = this.shadowRoot.querySelector(".tfooter");
        if (typeof footer !== "undefined" && footer != null) {
            footer.innerHTML = "";
        }
        let thOptions = this.shadowRoot.querySelector(".thOptions");
        if (typeof thOptions !== "undefined" && thOptions != null) {
            thOptions.style.display = "none"
        }
        if (this.EvalValue == null) {
            //table.innerHTML = "Agregue un Value";
            this.DrawTable(Dataset);
        } else {
            this.EvalArray = WArrayF.ArrayUnique(Dataset, this.AttNameEval);
            table.innerHTML = "";
            this.GroupsData = [];
            table.style.display = "flex";
            //console.log(Dataset)
            //console.log(this.Dataset)
            this.groupParams.forEach(groupParam => {
                this.GroupsData.push(WArrayF.ArrayUnique(Dataset, groupParam))
            });
            let div = this.DrawGroupDiv(this.ChargeGroup(this.GroupsData))
            table.append(WRender.createElement(div));
        }
        if (this.TableConfig.AddChart == true && this.EvalValue != null) {
            let ChartContainer = this.shadowRoot.querySelector("#Chart" + this.id);
            ChartContainer.innerHTML = "";
            ChartContainer.append(WRender.createElement(this.DrawChart()));
        }
    }
    TableOptions = () => {
        if (this.shadowRoot.querySelector("#TableOptionstable")) {
            return "";
        }
        const drop = (ev) => {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            let target = ev.target;
            let control = this.shadowRoot.querySelector("#" + data);
            //console.log(control.parentNode);
            const OriginalParent = control.parentNode.id;
            if (control == null) {
                console.log("error", target.parentNode.id, "TableOptions" + this.id)
                return;
            }
            if (target.className == "TableOptionsAtribs") {
                if (target.id.includes("ListEval")) {
                    if (target.children.length == 2) {
                        console.log("entro1");
                        return;
                    }
                    this.AttNameEval = this.shadowRoot.querySelector("#" + data).innerText;
                    this.EvalArray = WArrayF.ArrayUnique(this.TableConfig.Dataset, this.AttNameEval);
                    let find = this.groupParams.find(a => a == this.shadowRoot.querySelector("#" + data).innerText);
                    if (find) {
                        this.groupParams.splice(this.groupParams.indexOf(find), 1);
                    }
                } else if (target.id.includes("ListValue")) {
                    if (target.children.length == 2) {
                        //console.log("entro1");
                        return;
                    }
                    this.EvalValue = this.shadowRoot.querySelector("#" + data).innerText;
                    let find = this.groupParams.find(a => a == this.shadowRoot.querySelector("#" + data).innerText);
                    if (find) {
                        this.groupParams.splice(this.groupParams.indexOf(find), 1);
                    }
                } else if (target.id.includes("ListGroups")) {
                    if (target.children.length == 4) {
                        console.log("Grupos excedidos");
                        return;
                    }
                    let find = this.groupParams.find(a => a == this.shadowRoot.querySelector("#" + data).innerText);
                    if (!find) {
                        this.groupParams.push(this.shadowRoot.querySelector("#" + data).innerText);
                    }
                } else if (target.id.includes("ListAtribs")) {
                    let find = this.groupParams.find(a => a == this.shadowRoot.querySelector("#" + data).innerText);
                    if (find) {
                        this.groupParams.splice(this.groupParams.indexOf(find), 1);
                    }
                }
                target.appendChild(this.shadowRoot.querySelector("#" + data));
                if (OriginalParent.includes("ListEval")) {
                    this.AttNameEval = null;
                    this.EvalArray = null;
                }
                if (OriginalParent.includes("ListValue")) {
                    this.EvalValue = null;
                }
                if (OriginalParent.includes("ListGroups")) {
                    this.groupParams = [];
                    const Parent = this.shadowRoot.querySelector("#" + OriginalParent);
                    Parent.querySelectorAll(".labelParam").forEach(element => {
                        this.groupParams.push(element.innerText);
                    });
                }
                this.DefineTable();
            } else {
                console.log("error")
            }
        }
        const allowDrop = (ev) => { ev.preventDefault(); }
        const drag = (ev) => { ev.dataTransfer.setData("text", ev.target.id); }
        let divAtt = {
            type: "div",
            props: {
                class: "TableOptionsAtribs",
                id: this.id + "ListAtribs",
                ondrop: drop,
                ondragover: allowDrop
            },
            children: [{
                type: "label",
                props: { innerText: "Parametros", class: "titleParam" }
            }]
        };
        let model = this.Dataset[0];
        for (const props in model) {
            divAtt.children.push({
                type: "label",
                children: [props],
                props: {
                    id: props + this.id,
                    class: "labelParam",
                    draggable: true,
                    ondragstart: drag
                }
            });
        }
        let divEvalAttib = {
            type: "div",
            props: {
                class: "TableOptionsAtribs",
                id: this.id + "ListEval",
                ondrop: drop,
                ondragover: allowDrop
            },
            children: [{
                type: "label",
                props: { innerText: "Evaluación", class: "titleParam" }
            }]
        };
        let select = {
            type: "select",
            props: {
                id: "Select" + this.id,
                class: "titleParam",
                onchange: () => { this.DefineTable(); }
            },
            children: [
                { type: "option", props: { innerText: "Value - Suma", value: "sum" } },
                { type: "option", props: { innerText: "Value - Count", value: "count" } }
            ]
        }
        let divEvalValue = {
            type: "div",
            props: {
                class: "TableOptionsAtribs",
                id: this.id + "ListValue",
                ondrop: drop,
                ondragover: allowDrop
            },
            children: [select]
        };
        let divEvalGroups = {
            type: "div",
            props: {
                class: "TableOptionsAtribs",
                id: this.id + "ListGroups",
                ondrop: drop,
                ondragover: allowDrop
            },
            children: [{
                type: "label",
                props: { innerText: "Agrupaciones", class: "titleParam" },
                children: [/*{
                    type: "label",
                    props: {
                        innerText: "»",
                        class: "btn",
                        onclick: () => {
                            const elementS = this.shadowRoot.querySelector("#TableOptions" + this.id)
                            ComponentsManager.DisplayAcorden(elementS, 38);
                        }
                    }
                }*/]
            }]
        };
        return {
            type: "div",
            props: { class: "TableOptions", id: "TableOptions" + this.id },
            children: [divAtt, divEvalAttib, divEvalValue, divEvalGroups]
        };
    }
    DrawChart() {
        /*if (this.shadowRoot.querySelector("#TableOptionstable")) {
            return "";
        }*/
        if (this.groupParams.length > 0 && this.EvalArray != null) {
            let GroupLabelsData = [];
            this.EvalArray.forEach(element => {
                GroupLabelsData.push({
                    id_: element[this.AttNameEval],
                    Descripcion: element[this.AttNameEval]
                });
            });
            if (this.TableConfig.TypeChart == undefined) {// bar or staked
                this.TableConfig.TypeChart = "bar";
            }
            var CharConfig = {
                ContainerName: "MyChart",
                Title: "MyChart",
                TypeChart: this.TableConfig.TypeChart,
                GroupLabelsData: GroupLabelsData,
                GroupDataset: this.EvalArray,
                Dataset: this.ProcessData,
                Colors: this.Colors,
                ContainerSize: 400,
                ColumnLabelDisplay: 0,
                AttNameEval: this.AttNameEval,
                AttNameG1: this.groupParams[0],
                AttNameG2: this.groupParams[1],
                AttNameG3: this.groupParams[2],
                EvalValue: this.EvalValue,
            };

            return { type: 'w-colum-chart', props: { data: CharConfig } };
        }
        return "No hay agrupaciones";
    }
    FindData(arrayP) {
        let val = false;
        let nodes = [];
        this.TableConfig.Dataset.forEach(Data => {
            val = WArrayF.compareObj(arrayP, Data)
            if (val == true) {
                nodes.push(Data)
            }
        });
        if (nodes.length != []) {
            let Operations = this.shadowRoot.querySelector("#Select" + this.id);
            let value = "fail!";
            if (Operations != null) {
                if (Operations.value == "sum") {
                    value = WArrayF.SumValAtt(nodes, this.EvalValue);
                } else if (Operations.value == "count") {
                    value = nodes.length;
                }
            } else {
                value = WArrayF.SumValAtt(nodes, this.EvalValue);
            }
            return value;
        } else {
            return "n/a";
        }
    }
    //#endregion FIN TABLA DINAMICA---------------------------------------------------------------------------
    //ESTILOS-------------------------------------------------------###################
    //#region ESTILOS-------------------------------------------------------------------------------------------
    MediaStyleResponsive() {
        if (this.shadowRoot.querySelector("MediaStyleResponsive" + this.id)) {
            this.removeChild(this.shadowRoot.querySelector("MediaStyleResponsive" + this.id));
        }
        const ClassList = [];
        let index = 1;
        for (const prop in this.ModelObject) {
            const flag = this.checkDisplay(prop);
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
                    //ESTILOS GENERALES-----------------------------------
                    new WCssClass(`#${this.id}`, {
                        border: "#999999 2px solid",
                        overflow: "hidden",
                        display: "block",
                        "border-radius": "0.2cm",
                        "min-height": "50px",
                    }),
                    //ESTILO DE LA TABLA BASICA----------------------------tableContainer
                    new WCssClass(`.tableContainer`, {
                        overflow: "auto"
                    }), new WCssClass(`.WTable`, {
                        "font-family": "Verdana, sans-serif",
                        width: "100%",
                        "border-collapse": "collapse",
                        "font-size": "12px",
                        position: "relative"
                    }), new WCssClass(`.WTable th`, {
                        //padding: "0.5rem",
                        "text-align": "left",
                        border: "1px #ccc solid"
                    }), new WCssClass(`.WTable td`, {
                        padding: "0.25rem",
                        "text-align": "left",
                        border: "1px #ccc solid"
                    }), new WCssClass(`.WTable .tdAction`, {
                        "text-align": "center",
                        "width": "120px",
                    }), new WCssClass(`.WTable tbody tr:nth-child(odd)`, {
                        "background-color": "#f5f4f4"
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
                            "box-shadow": "0 2px 5px 2px rgba(0,0,0,0.2)"
                        }), new WCssClass(`.WTable td`, {
                            display: "flex ",
                            "border-bottom": "1px solid #c5c5c5",
                            padding: "10px"
                            //width: "100%"
                        }), new WCssClass(`.WTable .tdAction`, {
                            display: "block ",
                            "justify-content": "center",
                            "align-items": "center",
                            width: "auto",
                            padding: "10px"
                        }), new WCssClass(`.WTable tbody tr:nth-child(odd)`, {
                            "background-color": "#fff"
                        }),

                    ]
                }]
            }
        }
        return WTableStyle;
    }
    TableStyleDinamic() {
        const style = this.shadowRoot.querySelector("#TableStyleDinamic" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "TableStyleDinamic" + this.id,
                ClassList: [
                    //ESTILO DE LA TABLA BASICA----------------------------tableContainer
                    new WCssClass(`.tableContainer`, {
                        overflow: "auto",
                        "grid-row": "1/2",
                    }), new WCssClass(`.WTable`, {
                        "font-family": "Verdana, sans-serif",
                        width: "100%",
                        "border-collapse": "collapse",
                        "font-size": "12px",
                        // "border-top": "solid 1px #999999",
                        position: "relative"
                    }), new WCssClass(`.WTable th`, {
                        padding: "0.5rem",
                        "text-align": "left",
                        border: "1px #ccc solid"
                    }), new WCssClass(`.WTable td`, {
                        padding: "0.25rem",
                        "text-align": "left",
                        border: "1px #ccc solid"
                    }), new WCssClass(`.WTable .tdAction`, {
                        "text-align": "center",
                        "width": "250px",
                    }), new WCssClass(`.WTable tbody tr:nth-child(odd)`, {
                        "background-color": "#f5f4f4"
                    }),
                    //FIN ESTILO TABLA BASICAA------------------------------
                    //flexcajones TABLA DINAMICA----------------------------
                    new WCssClass(`.TContainer`, {
                        padding: "0px",
                        display: "flex",
                        "flex-grow": 1,
                    }), new WCssClass(`.TContainerBlock`, {
                        width: "100%"
                    }), new WCssClass(" .TContainerBlockL", {
                        display: "flex",
                        "flex-direction": "column",
                        "justify-content": "flex-end",
                        "background-color": "rgb(236, 235, 235)",
                        "font-weight": "bold",
                    }), new WCssClass(" .TContainerBlockData", {
                        width: "100%"
                    }), new WCssClass(` Tlabel`, {
                        display: "block",
                        //padding: "5px",
                        "border-bottom": "1px solid #000",
                        //height: "30px",
                        "overflow-y": "hidden",
                        "white-space": "nowrap",
                        "overflow": "hidden",
                        "text-overflow": "ellipsis",
                        "min-width": "60px",
                        "background-color": "#d4d4d4",
                        color: "#000",
                        padding: "0.5rem",
                        "text-align": "left",
                        "font-weight": "bold",
                        border: "1px rgb(185, 185, 185) solid",
                    }), new WCssClass(`.TContainerBlockData .Cajon`, {
                        overflow: "hidden",
                        display: "flex",
                        "flex-direction": "column",
                    }), new WCssClass(`.flexChild`, {
                        padding: "0px",
                        width: "100%"
                    }), new WCssClass(`TData`, {
                        //padding: "5px",
                        //height: "30px",
                        "overflow-y": "hidden",
                        "white-space": "nowrap",
                        "overflow": "hidden",
                        "text-overflow": "ellipsis",
                        "min-width": "60px",
                        padding: "0.5rem",
                        "text-align": "left",
                        border: "1px #ccc solid"
                    }), new WCssClass(`TDataTotal`, {
                        "overflow-y": "hidden",
                        "white-space": "nowrap",
                        "overflow": "hidden",
                        "text-overflow": "ellipsis",
                        "min-width": "60px",
                        "border-top": "solid 1px #000",
                        "border-bottom": "solid 1px #000",
                        padding: "0.5rem",
                        "text-align": "left",
                        "font-weight": "bold",
                        border: "1px #ccc solid",
                    }), new WCssClass(`.Cajon`, {
                        display: "flex"
                    }),
                    //tABLA DINAMICA OPCIONES ------------------------------
                    new WCssClass(`.TableOptions`, {
                        display: "grid",
                        transition: "all 1s",
                        overflow: "hidden",
                        "grid-column": "2/3",
                        "grid-row": "1/4",
                        "grid-template-columns": "49% 49%",
                        "grid-template-rows": "49% 49%",
                    }), new WCssClass(`.TableOptionsAtribs`, {
                        display: "flex",
                        width: "100%",
                        "flex-direction": "column",
                        "padding-bottom": "20px",
                        "background-color": "#efefef",
                        "border": "1px #cbc9c9 solid"
                    }), new WCssClass(`.titleParam`, {
                        display: "flex",
                        "background-color": "#4da6ff",
                        color: "#fff",
                        "margin-bottom": "10px",
                        cursor: "pointer",
                        "text-align": "center",
                        position: "relative",
                        height: "30px",
                        "min-height": "30px",
                        "max-height": "30px",
                        "align-items": "center",
                        "justify-content": "center",
                    }), new WCssClass(`select.titleParam, select.titleParam:focus, select.titleParam:active`, {
                        cursor: "pointer",
                        "background-color": "#4da6ff",
                        border: "none",
                        color: "#fff",
                        outline: "none", padding: "5px",
                        "outline-width": "0",
                        margin: "0px",
                        font: "400 12px Arial",
                        "margin-bottom": "10px",
                    }), new WCssClass(`.labelParam`, {
                        display: "block",
                        padding: "5px",
                        "background-color": "#fff",
                        cursor: "pointer",
                        border: "solid 3px #efefef"
                    }), new WCssClass(`.btn`, {
                        "margin-left": "10px",
                        cursor: "pointer",
                        display: "inline-block",
                        "font-weight": "bold",
                        position: "absolute",
                        transform: "rotate(90deg)"
                    }), new WCssClass(`.txtControl`, {
                        "display": "block",
                        "width": "100%",
                        "padding": ".375rem .75rem",
                        "font-size": "1rem",
                        "line-height": "1.5",
                        "color": "#495057",
                        "background-color": "#fff",
                        "background-clip": "padding-box",
                        "border": "1px solid #ced4da !important",
                        "border-radius": ".25rem",
                        "transition": "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                    }), new WCssClass(`.tfooter`, {
                        "grid-row": "2/3",
                        height: "40px"
                    }), new WCssClass(`.CharttableReport`, {
                        "grid-row": "3/4",
                    }),

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
                            border: "5px solid #808080"
                        }), new WCssClass(`.WTable td`, {
                            display: "flex ",
                            //width: "100%"
                        }), new WCssClass(`.WTable .tdAction`, {
                            display: "flex ",
                            width: "calc(98% - 0.25rem)",
                            "justify-content": "center",
                            "align-items": "center"
                        }), new WCssClass(`.WTable tbody tr:nth-child(odd)`, {
                            "background-color": "#f9f9f9"
                        }),

                    ]
                }]
            }
        }
        return WTableStyle;
    }
    TableCardStyle() {
        const style = this.shadowRoot.querySelector("#TableCardStyle" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "TableCardStyle" + this.id,
                ClassList: [
                    //ESTILOS GENERALES-----------------------------------
                    new WCssClass(`#${this.id}`, {
                        //border: "#999999 2px solid",
                        overflow: "hidden",
                        display: "block",
                        "border-radius": "0.2cm",
                        "min-height": "50px",
                    }),
                    new WCssClass(`.tableContainer`, {
                        overflow: "auto"
                    }), new WCssClass(`.WTable`, {
                        "font-family": "Verdana, sans-serif",
                        width: "100%",
                        "border-collapse": "collapse",
                        //"border-top": "solid 1px #999999",
                        position: "relative",
                        display: "flex !important",
                        "flex-direction": "column"
                    }), new WCssClass(`.tableContainer thead`, {
                        display: "none",
                    }), new WCssClass(`.tableContainer tbody`, {
                        display: "flex",
                        padding: "20px"
                    }),
                    new WCssClass(`.tableContainer tbody tr`, {
                        //display: "inline-block !important",
                        display: "grid !important",
                        "grid-template-rows": "auto",
                        overflow: "hidden",
                        width: "250px",
                        border: "solid 1px #cbcbcb",
                        "border-radius": "0.2cm",
                        height: "300px",
                        padding: "10px",
                        margin: "10px",
                        "min-width": "220px",
                        position: "relative",
                        "box-shadow": "1px 2px 3px 0px rgb(0 0 0 / 10%)",
                    }), new WCssClass(`.tableContainer td`, {
                        "white-space": "nowrap",
                        "overflow": "hidden",
                        "text-overflow": "ellipsis",
                        //display: "block",
                    }), new WCssClass(`.tableContainer .tdImage`, {
                        "width": "100%",
                        "overflow": "hidden",
                        "grid-row": "1/2",
                    }), new WCssClass(`.tableContainer .tdAction`, {
                        display: "block",
                        //position: "absolute",
                        bottom: 0,
                        padding: "10px 0px",
                        "text-align": "center",
                        "width": "100%",
                        "left": "0",
                        "background-color": "#eee",
                        "border-top": "solid 3px #cbcbcb",
                        //height: "35px"
                    })
                    //TOPCION
                ],
            }
        }
        return WTableStyle;
    }
    TableCardStyle2() {
        const style = this.shadowRoot.querySelector("#TableCardStyle2" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "TableCardStyle2" + this.id,
                ClassList: [
                    //ESTILOS GENERALES-----------------------------------
                    new WCssClass(`#${this.id}`, {
                        //border: "#999999 2px solid",
                        overflow: "hidden",
                        display: "block",
                        "border-radius": "0.2cm",
                        "min-height": "50px",
                    }),
                    new WCssClass(`.tableContainer`, {
                        overflow: "auto"
                    }), new WCssClass(`.WTable`, {
                        "font-family": "Verdana, sans-serif",
                        width: "100%",
                        "border-collapse": "collapse",
                        "border-top": "solid 1px #999999",
                        position: "relative",
                        display: "flex !important",
                        "flex-direction": "column"
                    }), new WCssClass(`.tableContainer thead`, {
                        display: "none",
                    }), new WCssClass(`.tableContainer tbody`, {
                        display: "grid",
                        padding: "20px"
                    }),
                    new WCssClass(`.tableContainer tbody tr`, {
                        display: "grid !important",
                        overflow: "hidden",
                        "grid-template-columns": "auto auto auto auto",
                        "grid-template-rows": "auto",
                        //width: "250px", 
                        border: "solid 1px #999",
                        "border-radius": "0.2cm",
                        //height: "360px",
                        padding: "10px",
                        margin: "10px",
                        "min-width": "200px",
                        position: "relative"
                    }), new WCssClass(`.tableContainer td`, {
                        display: "block",
                        "grid-column": "2/5",
                        padding: "8px",
                        "text-align": "justify",
                    }), new WCssClass(`.tableContainer .tdAction`, {
                        padding: "10px 0px",
                        "text-align": "center",
                        "background-color": "#eee",
                        "border-top": "solid 3px #999999",
                        "grid-column": "1/5",
                    }), new WCssClass(`.tableContainer tr .tdImage`, {
                        "grid-row": "1/6",
                        "grid-column": "1/2",
                        height: "100% !important",
                        //"min-height": "400px"
                        padding: "0px"
                    }),
                    //TOPCION

                ],
            }
        }
        return WTableStyle;
    }
    TableCardStyle3() {
        const style = this.shadowRoot.querySelector("#TableCardStyle3" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "TableCardStyle3" + this.id,
                ClassList: [
                    new WCssClass(`divForm div`, {
                        width: "calc(100% - 10px)",
                        margin: "5px"
                    }), new WCssClass(`.WTable`, {
                        display: "block ", //width: "100%"
                    }), new WCssClass(`.WTable tbody`, {
                        "font-size": "12px",
                        display: "flex",
                        "overflow-x": "scroll"
                    }), new WCssClass(`.WTable thead`, {
                        display: "none ", //width: "100%"
                    }), new WCssClass(`.WTable tr`, {
                        display: "grid",
                        "grid-template-columns": "auto auto",
                        width: "23%",
                        "min-width": "340px",
                        margin: "10px",
                        "border-radius": "0.3cm",
                        overflow: "hidden",
                        "box-shadow": "0 2px 5px 2px rgba(0,0,0,0.2)"
                    }), new WCssClass(`.WTable td`, {
                        //"grid-column": "2/3"
                    }), new WCssClass(`.WTable .tdImage`, {
                        "grid-column": "1/2"
                    }), new WCssClass(`.WTable td`, {
                        display: "flex ",
                        "border-bottom": "1px solid #c5c5c5",
                        padding: "10px"
                        //width: "100%"
                    }), new WCssClass(`.WTable .tdAction`, {
                        display: "block ",
                        "justify-content": "center",
                        "align-items": "center",
                        width: "auto",
                        padding: "10px"
                    }), , new WCssClass(`.WTable tbody tr:nth-child(odd)`, {
                        "background-color": "#fff"
                    }),

                ]
            }
        }
        return WTableStyle;
    }
    TableCardStyle2ColumnX2() {
        const style = this.shadowRoot.querySelector("#TableCardStyle2ColumnX2" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "TableCardStyle2" + this.id,
                ClassList: [
                    //ESTILOS GENERALES-----------------------------------
                    new WCssClass(`.tableContainer tbody`, {
                        display: "grid",
                        padding: "20px",
                        "grid-template-columns": "auto auto"
                    })
                    //TOPCION
                ],
            }
        }
        return WTableStyle;
    }
    TableGridStyle() {
        const style = this.shadowRoot.querySelector("#TableGridStyle" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "TableGridStyle" + this.id,
                ClassList: [
                    //ESTILOS GENERALES-----------------------------------
                    new WCssClass(`#${this.id}`, {
                        // border: "#999999 2px solid",
                        overflow: "hidden",
                        display: "block",
                        //"border-radius": "0.2cm",
                        "min-height": "50px",
                    }),
                    new WCssClass(`.tableContainer`, {
                        overflow: "auto",
                    }), new WCssClass(`.WTable`, {
                        "font-family": "Verdana, sans-serif",
                        width: "100%",
                        "border-collapse": "collapse",
                        position: "relative",
                        display: "flex !important",
                        "flex-direction": "column"
                    }), new WCssClass(`.tableContainer thead`, {
                        display: "none",
                    }), new WCssClass(`.tableContainer tbody`, {
                        display: "grid",
                        "grid-template-columns": "auto auto auto auto",
                        "grid-gap": "20px",
                        padding: "20px"
                    }),
                    new WCssClass(`.tableContainer tbody tr`, {
                        display: "inline-block !important",
                        overflow: "hidden",
                        width: "100%",
                        height: "250px",
                        position: "relative",
                    }), new WCssClass(`.firstTR`, {
                        "grid-row": "1/3",
                        "grid-column": "1/3",
                        height: "100% !important",
                        "min-height": "400px"
                    }), new WCssClass(`.tbodyChild tr:nth-of-type(1)`, {
                        "grid-row": "1/3",
                        "grid-column": "1/3",
                        height: "100% !important",
                        "min-height": "400px"
                    }),
                    new WCssClass(`.tableContainer td`, {
                        display: "block",
                        "z-index": 2,
                        position: "absolute",
                        "background-color": "rgba(0,0,0,0.5)",
                        color: "#fff",
                        padding: "10px",
                    }),
                    new WCssClass(`.tableContainer tr .tdImage`, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        "z-index": 0,
                        //display: "block",
                        padding: "0px"
                    }),
                    new WCssClass(`.tableContainer .tdAction`, {
                        display: "block",
                        position: "absolute",
                        bottom: 0,
                        padding: "10px 0px",
                        "text-align": "center",
                        "width": "100%",
                        "left": "0",
                        "background-color": "rgba(0,0,0,0.5)",
                        //"border-top": "solid 3px #999999"
                    }), new WCssClass(`.imgPhoto`, {
                        "width": "120px",
                        "border-radius": "0.2cm",
                        "height": "120px",
                        "size": "100%",
                        "object-fit": "cover",
                    })
                    //TOPCION

                ],
                MediaQuery: [{
                    condicion: "(max-width: 1100px)",
                    ClassList: [
                        new WCssClass(`.tableContainer tbody`, {
                            display: "grid",
                            "grid-template-columns": "auto auto auto"
                        }),
                    ]
                }, {
                    condicion: "(max-width: 700px)",
                    ClassList: [
                        new WCssClass(`.tableContainer tbody`, {
                            display: "grid",
                            "grid-template-columns": "auto auto"
                        }),
                    ]
                },]
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
                    new WCssClass(`.thOptions`, {
                        display: "flex",
                        //width: "100%",
                        overflow: "hidden",
                        border: "solid #d4d4d4 1px",
                        "margin-bottom": "10px",
                    }), new WCssClass(`input[type=text], 
                                        input[type=string], 
                                        input[type=number],
                                        input[type=date]`, {
                        padding: "8px",
                        border: "none",
                        "border-bottom": "3px solid #999999",
                        width: "calc(100% - 16px)",
                        "font-size": "15px",
                        height: "20px"
                    }), new WCssClass(`input:active, input:focus`, {
                        "border-bottom": "3px solid #0099cc",
                        outline: "none",
                    }), new WCssClass(`input[type=button]`, {
                        cursor: "pointer",
                        width: "calc(100% - 0px)",
                        height: "initial"
                    }),
                    //PAGINACION****************************************************
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
                    }), new WCssClass(`.BtnTable, .BtnTableA, .BtnTableS, .BtnTableSR`, {
                        "font-weight": "bold",
                        "border": "none",
                        "padding": "5px",
                        "margin": "2px",
                        "text-align": "center",
                        "display": "inline-block",
                        "min-width": "30px",
                        "font-size": "12px",
                        "cursor": "pointer",
                        "background-color": "#09f",
                        "color": "#fff",
                        //"border-right": "rgb(3, 106, 175) 5px solid",
                    }), new WCssClass(`.BtnTableS`, {
                        "background-color": "#106705",
                        //"border-right": "#0a3e03 5px solid"
                    }), new WCssClass(`.BtnTableSR`, {
                        "background-color": "#09315f",
                        //"border-right": "#d86060 5px solid",
                        width: "inherit",
                    }), new WCssClass(`.BtnTableA`, {
                        "background-color": "#af0909",
                        //"border-right": "#670505 5px solid"
                    }),
                    //BOTONES
                    new WCssClass(`.BtnAlert,.BtnPrimary, .BtnSuccess,.BtnSecundary,.Btn`, {
                        "font-weight": "bold",
                        "border": "none",
                        "padding": "10px",
                        "text-align": "center",
                        "display": "inline-block",
                        "min-width": "100px",
                        "cursor": "pointer",
                        "background-color": "#09f",
                        "font-size": "12px",
                        "color": "#fff",
                        "border-right": "rgb(3, 106, 175) 5px solid",
                    }), new WCssClass(`.BtnPrimary`, {
                        "color": "#fff",
                        "background-color": "007bff",
                        "border-right": "rgb(3, 106, 175) 5px solid",
                    }), new WCssClass(`.BtnAlert`, {
                        "color": "#fff",
                        "background-color": "#dc3545",
                        "border-right": "#7e1b25 5px solid",
                    }), new WCssClass(`.BtnSuccess`, {
                        "color": "#fff",
                        "background-color": "#28a745",
                        "border-right": "#165c26 5px solid",
                    }), new WCssClass(`.BtnSecundary`, {
                        "color": "#fff",
                        "background-color": "#17a2b8",
                        "border-right": "#0f5964 5px solid",
                    }), new WCssClass(`.Btn[type=checkbox]`, {
                        "height": "20px",
                        "min-width": "20px",
                        "margin": "5px",
                    }), new WCssClass(`.imgPhoto`, {
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