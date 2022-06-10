import { WSecurity } from "./WSecurity.js";
function type(value) {
    var r;
    if (typeof value === 'object') {
        if (value === null) {
            return 'null';
        }
        if (typeof value.constructor === 'function' &&
            (r = value.constructor.name) !== 'Object') {
            if (r === '' || r === undefined) {
                return Function.prototype.toString.call(value.constructor)
                    .match(/^\n?(function|class)(\w?)/)[2] || 'anonymous';
            }
            return r;
        }
        return Object.prototype.toString.call(value).match(/\s(.*)\]/)[1];
    } else if (typeof value === 'number') {
        return isNaN(value) ? 'NaN' : 'number';
    }
    return typeof value;
}
class WAjaxTools {
    static Request = async (Url, typeRequest, Data = {}, typeHeader) => {
        try {
            let ContentType = "application/json; charset=utf-8";
            let Accept = "*/*";
            if (typeHeader == "form") {
                ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
                Accept = "*/*";
            }
            let dataRequest = {
                method: typeRequest,
                headers: {
                    'Content-Type': ContentType,
                    'Accept': Accept,
                    dataType: 'json',
                }
            }
            if (Data != {}) {
                dataRequest.body = JSON.stringify(Data);
            }
            let response = await fetch(Url,);
            const ProcessRequest = await this.ProcessRequest(response, Url);
            return ProcessRequest;
        } catch (error) {
            if (error == "TypeError: Failed to fetch") {
                return this.LocalData(Url);
            }
        }
    }
    static PostRequest = async (Url, Data = {}, PostConfig = {}) => {

        //console.log(Data)
        try {
            let ContentType = "application/json; charset=utf-8";
            let Accept = "*/*";
            if (PostConfig.typeHeader != undefined && PostConfig.typeHeader == "form") {
                ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
                Accept = "*/*";
            }
            const ConfigRequest = {
                method: 'POST',
                //credentials: "same-origin",
                headers: {
                    'Content-Type': ContentType,
                    'Accept': Accept,
                    //"X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify(Data)
            }
            if (PostConfig.token != undefined && PostConfig.token != "") {
                ConfigRequest.headers['X-CSRF-TOKEN'] = PostConfig.token
            }
            let response = await fetch(Url, ConfigRequest);
            const ProcessRequest = await this.ProcessRequest(response, Url);
            return ProcessRequest;
        } catch (error) {
            console.log(error);
            //if (error == "TypeError: Failed to fetch" ) {
            return this.LocalData(Url);
            //}
        }
    }
    static GetRequest = async (Url) => {
        try {
            let response = await fetch(Url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const ProcessRequest = await this.ProcessRequest(response, Url);
            return ProcessRequest;
        } catch (error) {
            console.log(error)
            if (error == "TypeError: Failed to fetch") {
                return this.LocalData(Url);
            }
        }
    }
    static ProcessRequest = async (response, Url) => {
        if (response.status == 404 || response.status == 500) {
            console.log("ocurrio un error: " + response.status);
            if (typeof response !== "undefined" && typeof response !== "null" && response != "") {
                return this.LocalData(Url);
            } else {
                return [];
            }
        } else {
            try {
                response = await response.json(response);
                localStorage.setItem(Url, JSON.stringify(response));
                return response;
            } catch (error) {
                console.log(error);
            }
        }
    }
    static LocalData = (Url) => {
        let responseLocal = localStorage.getItem(Url);
        if (responseLocal != null) {
            return JSON.parse(responseLocal);
        }
        return {};
    }
}
class WRender {
    static CreateStringNode = (string) => {
        let node = document.createRange().createContextualFragment(string);
        return node.childNodes[0];
    }
    static createElement = (Node) => {
        try {
            if (typeof Node === "undefined" || Node == null) {
                return document.createTextNode("Nodo nulo o indefinido.");
            } else if (typeof Node === "string" || typeof Node === "number") {
                if (Node.length > 100) {
                    return this.CreateStringNode(`<p>${Node}</p>`);
                }
                return this.CreateStringNode(`<label>${Node}</label>`);
            } else if (Node.__proto__ === HTMLElement.prototype
                || Node.__proto__.__proto__ === HTMLElement.prototype) {
                return Node;
            } else {
                if (Node.__proto__ == Array.prototype) {
                    Node = { type: "div", children: Node }
                }
                const element = document.createElement(Node.type);
                if (Node.props != undefined && Node.props.__proto__ == Object.prototype) {
                    for (const prop in Node.props) {
                        if (prop == "class") { element.className = Node.props[prop]; }//CLASSNAME
                        else if (prop == "style" && Node.props[prop].__proto__ == Object.prototype) {  //STYLE                          
                            for (const styleProp in Node.props[prop]) {
                                element[prop][styleProp] = Node.props[prop][styleProp];
                            }
                        }
                        else element[prop] = Node.props[prop];//NORMAL
                    }
                }
                if (Node.children != undefined && Node.children.__proto__ == Array.prototype) {
                    Node.children.forEach(Child => {
                        element.appendChild(this.createElement(Child));
                    });
                }
                return element;
            }
        } catch (error) {
            console.log(error, Node);
            return document.createTextNode("Problemas en la construcción del nodo.");
        }
    }
    static createElementNS = (node, uri = "svg") => {
        try {
            let URI = null;
            switch (uri) {
                case "svg":
                    URI = "http:\/\/www.w3.org/2000/svg";
                    break;
                case "html":
                    URI = "http://www.w3.org/1999/xhtml";
                    break;
                case "xbl":
                    URI = "http://www.mozilla.org/xbl";
                    break;
                case "xul":
                    URI = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
                    break;
                default:
                    URI = null;
                    break;
            }
            const element = document.createElementNS(URI, node.type)
            if (node.props) {
                for (const prop in node.props) {
                    if (typeof node.props[prop] === "function") {
                        element[prop] = node.props[prop];
                    } else if (typeof node.props[prop] === 'object') {
                        element[prop] = node.props[prop];
                    } else {
                        try {
                            element.setAttributeNS(null, prop, node.props[prop])
                        } catch (error) {
                            element.setAttributeNS(URI, prop, node.props[prop]);
                        }
                    }
                }
            }
            if (node.children) {
                node.children
                    .map(this.createElementNS)
                    .forEach(child => element.appendChild(child, uri))
            }
            return element;
        } catch (error) {

        }
    }
    static Create = (Node = (new WNode())) => {
        try {
            if (typeof Node === "undefined" || Node == null) {
                return document.createTextNode("Nodo nulo o indefinido.");
            } else if (typeof Node === "string" || typeof Node === "number") {
                if (Node.length == 0) {
                    return "";
                } else if (Node.length > 100) {
                    return this.CreateStringNode(`<p>${Node}</p>`);
                }
                return this.CreateStringNode(`<label>${Node}</label>`);
            } else if (Node.__proto__ === HTMLElement.prototype
                || Node.__proto__.__proto__ === HTMLElement.prototype) {
                return Node;
            } else {
                if (Node.__proto__ == Array.prototype) {
                    Node = new WNode({ children: Node });
                }
                Node.tagName = Node.tagName ?? "div";
                const element = document.createElement(Node.tagName);
                for (const prop in Node) {
                    if (prop == "tagName") { continue; }
                    else if (prop == "class") { element.className = Node[prop]; }//CLASSNAME
                    else if (prop == "style" && Node[prop].__proto__ == Object.prototype) {  //STYLE
                        this.SetStyle(element, Node[prop]);
                    } else if (prop == "children") {
                        if (Node.children != undefined && Node.children.__proto__ == Array.prototype) {
                            Node.children.forEach(Child => {
                                element.appendChild(this.Create(Child));
                            });
                        } else if (Node.children != undefined && Node.children.__proto__ == Object.prototype) {
                            Node.children.N = Node.children.N ?? 0;
                            Node.children.childs = Node.children.childs ?? [];
                            for (let index = 0; index < Node.children.N; index++) {
                                const contain = Node.children.childs[index] ?? "";
                                element.appendChild(this.Create({
                                    tagName: Node.children.tagName,
                                    class: Node.children.className,
                                    children: contain
                                }));
                            }
                        } else {
                            element.appendChild(this.Create(Node.children));
                        }
                    }
                    else element[prop] = Node[prop];//NORMAL
                }
                //children
                return element;
            }
        } catch (error) {
            console.log(error, Node);
            return document.createTextNode("Problemas en la construcción del nodo.");
        }
    }
    static SetStyle = (Node, Style = (new ElementStyle())) => {
        for (const styleProp in Style) {
            Node.style[styleProp] = Style[styleProp];
        }
    }

}
class ComponentsManager {
    constructor(Config = { SPAManage: false, MainContainer: undefined, ContainerName: undefined }) {
        this.DomComponents = [];
        this.type = "div";
        this.props = {
            class: "MyForm"
        };
        this.SelectedComponent = "";
        this.ContainerName = Config.ContainerName;
        this.MainContainer = Config.MainContainer;
        this.Config = Config;
        if (this.Config.SPAManage == true) {
            window.onhashchange = () => {
                if (this.Config.SPAManage != true) {
                    return;
                }
                let NavManageClick = sessionStorage.getItem("NavManageClick");
                if (NavManageClick == "true") {
                    sessionStorage.setItem("NavManageClick", "false");
                    return;
                }
                const hashD = window.location.hash.replace("#", "");
                let navigateComponets = JSON.parse(sessionStorage.getItem("navigateComponets"));
                if (navigateComponets != null) {
                    const newNode = this.DomComponents.find(node => node.id == hashD);
                    //console.log(newNode);
                    this.NavigateFunction(hashD, newNode, this.MainContainer);
                }

            }
        }

    }
    NavigateFunction = async (IdComponent, ComponentsInstance, ContainerName = "ContainerName") => {
        this.ContainerName = ContainerName ?? this.ContainerName;
        if (this.MainContainer == undefined) {
            this.MainContainer = document.querySelector("#" + this.ContainerName);
        }
        const ContainerNavigate = this.MainContainer;
        let Nodes = ContainerNavigate.querySelectorAll(".DivContainer");
        Nodes.forEach((node) => {
            if (node.id != IdComponent) {
                let nodeF = this.DomComponents.find(n => n == node);
                if (nodeF != undefined && nodeF != null) {
                    nodeF = node;
                } else {
                    this.DomComponents.push(node);
                }
                if (ContainerNavigate.querySelector("#" + node.id)) {
                    ContainerNavigate.removeChild(node);
                }
            }
        });
        if (!ContainerNavigate.querySelector("#" + IdComponent)) {
            const node = this.DomComponents.find(node => node.id == IdComponent);
            if (node != undefined && node != null) {
                ContainerNavigate.append(node);
            } else {
                const NewChild = WRender.createElement(ComponentsInstance);
                NewChild.id = IdComponent;
                NewChild.className = NewChild.className + " DivContainer";
                this.DomComponents.push(NewChild);
                ContainerNavigate.append(NewChild);
            }
            if (this.Config.SPAManage == true) {
                sessionStorage.setItem("NavManageClick", "true");
                window.location = "#" + IdComponent;
                const newNode = this.DomComponents.find(node => node.id == IdComponent);
                let navigateComponets = JSON.parse(sessionStorage.getItem("navigateComponets"));
                if (navigateComponets == null) {
                    navigateComponets = [];
                }
                navigateComponets.push(newNode);
                sessionStorage.setItem("navigateComponets", JSON.stringify(navigateComponets));
            }
        }
    }
    AddComponent = async (IdComponent, ComponentsInstance, ContainerName, order = "last") => {
        if (this.MainContainer == undefined) {
            this.MainContainer = ContainerName;
        }
        const ContainerNavigate = document.querySelector("#" + this.MainContainer);
        if (ContainerNavigate.querySelector("#" + IdComponent)) {
            window.location = "#" + IdComponent;
            return;
        } else {
            const NewChild = WRender.createElement(ComponentsInstance);
            NewChild.className = NewChild.className + " AddComponent";
            NewChild.id = IdComponent;
            this.DomComponents[IdComponent] = NewChild;
            if (order == "last") {
                ContainerNavigate.append(NewChild);
                return;
            } else if (order == "first") {
                ContainerNavigate.insertBefore(NewChild, ContainerNavigate.firstElementChild);
            }
        }
    }
    static modalFunction(ventanaM) {
        if (ventanaM.style.opacity == 0) {
            ventanaM.style.transition = "all ease 1s";
            ventanaM.style.display = "block";
            setTimeout(() => {
                ventanaM.style.opacity = 1;
            }, 100);
        } else {
            ventanaM.style.transition = "all ease 1s";
            ventanaM.style.opacity = 0;
            setTimeout(() => {
                ventanaM.style.display = "none";
            }, 1000);
        }
    }
    static DisplayUniqAcorden(elementId) {
        let SectionElement = document.getElementById(elementId);
        let valueSize = "0px"
        if (SectionElement.offsetHeight != 0) {
            valueSize = SectionElement.offsetHeight + "px";
        }
        if (SectionElement.style.display == "none") {
            SectionElement.style.display = "block";
            setTimeout(() => {
                SectionElement.style.maxHeight = "800px";
                SectionElement.style.minHeight = "300px";
            }, 100);
        } else {
            SectionElement.style.maxHeight = valueSize;
            SectionElement.style.minHeight = valueSize;
            setTimeout(() => {
                SectionElement.style.display = "none";
            }, 1000);
        }
    }
    static DisplayAcorden(SectionElement, valueSize = 0) {
        //let SectionElement = document.getElementById(elementId);
        if (SectionElement.offsetHeight == valueSize) {
            SectionElement.style.maxHeight = "800px";
            SectionElement.style.minHeight = "150px";
        } else {
            SectionElement.style.maxHeight = valueSize + "px";
            SectionElement.style.minHeight = valueSize + "px";

        }
    }
}
class WArrayF {
    static JSONParse(param) {
        return JSON.parse((param).replace(/&quot;/gi, '"'));
    }
    static orderByDate(Arry, type) {
        var meses = [
            "enero", "febrero", "marzo",
            "abril", "mayo", "junio", "julio",
            "agosto", "septiembre", "octubre",
            "noviembre", "diciembre"
        ];
        if (type == 1) {
            Arry.sort((a, b) => a.time - b.time);
        } else if (type == 2) {
            Arry.forEach(element => {
                if (element.time.includes("diciembre")) {
                    var Year = new Date(Date.parse(element.time)).getFullYear();
                    element.time = Date.parse(Year + " December");
                } else element.time = Date.parse(element.time);
            });
            Arry.sort((a, b) => a.time - b.time);

            Arry.forEach(element => {
                var fecha = new Date(element.time);
                element.time = meses[fecha.getMonth()] + " " + fecha.getFullYear();
            });

        } else {
            var Array2 = [];
            Arry.forEach(element => {
                var object = {
                    cuarter: null,
                    year: null
                };
                object.cuarter = element.time.substring(1, 0);
                object.year = element.time.substring(element.time.length, 14);
                Array2.push(object);
            })
            Array2.sort((a, b) => a.year - b.year);
            var Array3 = [];
            Array2.forEach(element => {
                var object = Arry.find(x => x.time.substring(1, 0).includes(element.cuarter) &&
                    x.time.includes(element.year));
                Array3.push(object);
            });
            Arry = Array3;
        }
        return Arry;
    }
    static ArrayUnique(DataArray, param, sumParam = null) {
        let DataArraySR = []
        DataArray.forEach(element => {
            const DFilt = DataArraySR.find(x => x[param] == element[param]);
            if (!DFilt) {
                const NewElement = {};
                for (const prop in element) {
                    NewElement[prop] = element[prop]
                }
                //NewElement[param] =  element[param];
                if (!element.count) {
                    NewElement.count = 1;
                }
                NewElement.rate = ((1 / DataArray.length) * 100).toFixed(2) + "%";
                DataArraySR.push(NewElement)
            } else {
                if (!element.count) {
                    DFilt.count = DFilt.count + 1;
                }
                DFilt.rate = ((DFilt.count / DataArray.length) * 100).toFixed(2) + "%";
                if (sumParam != null) {
                    DFilt[sumParam] = DFilt[sumParam] + element[sumParam];
                }
            }
        });
        return DataArraySR;
    }
    static ArrayUniqueByObject(DataArray, param = {}, sumParam = null) {
        let DataArraySR = [];
        DataArray.forEach(element => {
            const DFilt = DataArraySR.find(obj => {
                let flagObj = true;
                for (const prop in param) {
                    if (obj[prop] != element[prop]) {
                        flagObj = false;
                    }
                }
                return flagObj;
            });
            if (!DFilt) {
                const NewElement = {};
                for (const prop in element) {
                    NewElement[prop] = element[prop]
                }
                if (!element.count) {
                    NewElement.count = 1;
                }
                NewElement.rate = ((1 / DataArray.length) * 100).toFixed(2) + "%";
                DataArraySR.push(NewElement)
            } else {
                if (!element.count) {
                    DFilt.count = DFilt.count + 1;
                }
                DFilt.rate = ((DFilt.count / DataArray.length) * 100).toFixed(2) + "%";
                if (sumParam != null) {
                    DFilt[sumParam] = DFilt[sumParam] + element[sumParam];
                }
            }
        });
        return DataArraySR;
    }
    static MaxValue(Data, MaxParam) {
        var Maxvalue = 0;
        for (let index = 0; index < Data.length; index++) {
            if (parseInt(Data[index][MaxParam]) > Maxvalue) {
                Maxvalue = Data[index][MaxParam];
            }
        }
        return Maxvalue;
    }
    static MinValue(Data, MaxParam) {
        var MinValue = Data[0][MaxParam];
        for (let index = 0; index < Data.length; index++) {
            if (parseInt(Data[index][MaxParam]) < MinValue) {
                MinValue = Data[index][MaxParam];
            }
        }
        return MinValue;
    }
    //reparar
    static SumValue(DataArry, EvalValue) {
        var Maxvalue = 0;
        for (let index = 0; index < DataArry.length; index++) {
            Maxvalue = Maxvalue + parseFloat(DataArry[index][EvalValue]);
        }
        return Maxvalue;
    }
    static SumValAtt(DataArry, EvalValue) {//retorna la suma 
        var Maxvalue = 0;
        for (let index = 0; index < DataArry.length; index++) {
            if (typeof DataArry[index][EvalValue] === "number" || parseFloat(DataArry[index][EvalValue]) != "NaN") {
                Maxvalue = Maxvalue + parseFloat(DataArry[index][EvalValue]);
            } else {
                Maxvalue = "Error!";
                break;
            }
        }
        return Maxvalue;
    }
    static SumValAttByProp(DataArry, Atrib, EvalValue) {
        var Maxvalue = 0;
        for (let index = 0; index < DataArry.length; index++) {
            const Obj = DataArry[index];
            if (Obj[Atrib.prop] == Atrib.value) {
                if (typeof Obj[EvalValue] === "number") {
                    Maxvalue = Maxvalue + parseFloat(Obj[EvalValue]);
                } else {
                    Maxvalue = "Error!";
                    break;
                }
            }
        }
        return Maxvalue;
    }
    //BUSQUEDA Y COMPARACIONES
    static FindInArray(element, Dataset) {
        let val = false;
        for (let index = 0; index < Dataset.length; index++) {
            const Data = Dataset[index];
            val = this.compareObj(element, Data)
            if (val == true) {
                break;
            }
        }
        return val;
    }
    static compareObj(ComparativeObject, EvalObject) {//compara si dos objetos son iguales en las propiedades        
        if (typeof ComparativeObject === "string" && typeof ComparativeObject === "number") {
            if (ComparativeObject == EvalObject) return true;
            else return false;
        }
        let val = true;
        for (const prop in ComparativeObject) {
            if (ComparativeObject[prop] !== EvalObject[prop]) {
                val = false;
                break;
            }
        }
        return val;
    }
    //STRINGS
    static Capitalize(str) {
        if (str == null) {
            return str;
        }
        str = str.toString();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    //verifica que un objeto este dentro de un array
    static checkDisplay(DisplayData, prop, Model = {}) {
        let flag = true;        
        if (Model[prop] == undefined  && Model[prop] == null) {
            flag = false;
        }
        if (Model[prop] != undefined && Model[prop] != null
            && Model[prop].__proto__ == Object.prototype
            && (Model[prop].primary || Model[prop].hidden)) {
            flag = false;
        }
        if (DisplayData != undefined && DisplayData.__proto__ == Array.prototype) {
            const findProp = DisplayData.find(x => x.toUpperCase() == prop.toUpperCase());
            if (!findProp) {
                flag = false;
            }
        }
        return flag;
    }
}
//METODOS VARIOS
const GenerateColor = () => {
    var hexadecimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    var color_aleatorio = "#FF";
    for (let index = 0; index < 4; index++) {
        const random = Math.floor(Math.random() * hexadecimal.length);
        color_aleatorio += hexadecimal[random]
    }
    return color_aleatorio
}
//Date
function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}
Date.prototype.toISO = function () {
    return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) /* +
      'T' + pad(this.getUTCHours()) +
      ':' + pad(this.getUTCMinutes()) +
      ':' + pad(this.getUTCSeconds()) +
      '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
      'Z' */;
};
export { WAjaxTools, WRender, ComponentsManager, WArrayF, type, GenerateColor }
class WNode {
    constructor(props = {}) {
        for (const prop in props) {
            this[prop] = props[prop]
        }
        this.tagName = this.tagName ?? "div";
        this.children = this.children ?? [];
    }
    tagName = "div";
    style = new ElementStyle();
    className = null;
    innerText = null;
    value = null;
    innerHTML = null;
    children = [] ?? { tagName: "", N: 0 };
}
class ElementStyle {
    alignContent = null;
    alignItems = null;
    alignSelf = null;
    animation = null;
    animationDelay = null;
    animationDirection = null;
    animationDuration = null;
    animationFillMode = null;
    animationIterationCount = null;
    animationName = null;
    animationTimingFunction = null;
    animationPlayState = null;
    background = null;
    backgroundAttachment = null;
    backgroundColor = null;
    backgroundImage = null;
    backgroundPosition = null;
    backgroundRepeat = null;
    backgroundClip = null;
    backgroundOrigin = null;
    backgroundSize = null;
    backfaceVisibility = null;
    border = null;
    borderBottom = null;
    borderBottomColor = null;
    borderBottomLeftRadius = null;
    borderBottomRightRadius = null;
    borderBottomStyle = null;
    borderBottomWidth = null;
    borderCollapse = null;
    borderColor = null;
    borderImage = null;
    borderImageOutset = null;
    borderImageRepeat = null;
    borderImageSlice = null;
    borderImageSource = null;
    borderImageWidth = null;
    borderLeft = null;
    borderLeftColor = null;
    borderLeftStyle = null;
    borderLeftWidth = null;
    borderRadius = null;
    borderRight = null;
    borderRightColor = null;
    borderRightStyle = null;
    borderRightWidth = null;
    borderSpacing = null;
    borderStyle = null;
    borderTop = null;
    borderTopColor = null;
    borderTopLeftRadius = null;
    borderTopRightRadius = null;
    borderTopStyle = null;
    borderTopWidth = null;
    borderWidth = null;
    bottom = null;
    boxDecorationBreak = null;
    boxShadow = null;
    boxSizing = null;
    captionSide = null;
    caretColor = null;
    clear = null;
    clip = null;
    color = null;
    columnCount = null;
    columnFill = null;
    columnGap = null;
    columnRule = null;
    columnRuleColor = null;
    columnRuleStyle = null;
    columnRuleWidth = null;
    columns = null;
    columnSpan = null;
    columnWidth = null;
    content = null;
    counterIncrement = null;
    counterReset = null;
    cursor = null;
    direction = null;
    display = null;
    emptyCells = null;
    filter = null;
    flex = null;
    flexBasis = null;
    flexDirection = null;
    flexFlow = null;
    flexGrow = null;
    flexShrink = null;
    flexWrap = null;
    cssFloat = null;
    font = null;
    fontFamily = null;
    fontSize = null;
    fontStyle = null;
    fontVariant = null;
    fontWeight = null;
    fontSizeAdjust = null;
    fontStretch = null;
    hangingPunctuation = null;
    height = null;
    hyphens = null;
    icon = null;
    imageOrientation = null;
    isolation = null;
    justifyContent = null;
    left = null;
    letterSpacing = null;
    lineHeight = null;
    listStyle = null;
    listStyleImage = null;
    listStylePosition = null;
    listStyleType = null;
    margin = null;
    marginBottom = null;
    marginLeft = null;
    marginRight = null;
    marginTop = null;
    maxHeight = null;
    maxWidth = null;
    minHeight = null;
    minWidth = null;
    navDown = null;
    navIndex = null;
    navLeft = null;
    navRight = null;
    navUp = null;
    objectFit = null;
    objectPosition = null;
    opacity = null;
    order = null;
    orphans = null;
    outline = null;
    outlineColor = null;
    outlineOffset = null;
    outlineStyle = null;
    outlineWidth = null;
    overflow = null;
    overflowX = null;
    overflowY = null;
    padding = null;
    paddingBottom = null;
    paddingLeft = null;
    paddingRight = null;
    paddingTop = null;
    pageBreakAfter = null;
    pageBreakBefore = null;
    pageBreakInside = null;
    perspective = null;
    perspectiveOrigin = null;
    position = null;
    quotes = null;
    resize = null;
    right = null;
    scrollBehavior = null;
    tableLayout = null;
    tabSize = null;
    textAlign = null;
    textAlignLast = null;
    textDecoration = null;
    textDecorationColor = null;
    textDecorationLine = null;
    textDecorationStyle = null;
    textIndent = null;
    textJustify = null;
    textOverflow = null;
    textShadow = null;
    textTransform = null;
    top = null;
    transform = null;
    transformOrigin = null;
    transformStyle = null;
    transition = null;
    transitionProperty = null;
    transitionDuration = null;
    transitionTimingFunction = null;
    transitionDelay = null;
    unicodeBidi = null;
    userSelect = null;
    verticalAlign = null;
    visibility = null;
    whiteSpace = null;
    width = null;
    wordBreak = null;
    wordSpacing = null;
    wordWrap = null;
    widows = null;
    zIndex = null;
    gridTemplateColumns = null;
    gridTemplateRows = null;
    gridColumn = null;
    gridRow = null;
    gridGap = null;
};