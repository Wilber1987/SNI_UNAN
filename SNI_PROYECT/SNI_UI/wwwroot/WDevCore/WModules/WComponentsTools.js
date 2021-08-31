function DisplayAcordeon(value, SectionId, size = null) {
    //console.log(value)
    if (size == null) {
        size = "500px";
    }
    // var ventanaM = document.getElementById(idModal);
    var acc = document.getElementsByClassName("GroupFormAcordeon");
    for (var i = 0; i < acc.length; i++) {
        ventanaM = acc[i];
        if (ventanaM.id != SectionId) {
            //  if (ventanaM.style.height != "300px") {
            ventanaM.style.transition = "all ease 1s";
            ventanaM.style.height = "0px";
            //ventanaM.style.overflow = "scroll";
        } else {
            ventanaM.style.transition = "all ease 1s";
            ventanaM.style.height = size;
            //ventanaM.style.oveflow = "hidden";
        }
    }
}
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
                    'Accept': Accept
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
            if (error == "TypeError: Failed to fetch") {
                return this.LocalData(Url);
            }
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
            response = await response.json();
            localStorage.setItem(Url, JSON.stringify(response));
            return response;
        }
    }
    static LocalData = (Url) => {
        let responseLocal = localStorage.getItem(Url);
        return JSON.parse(responseLocal);
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
                        if (prop == "class") element.className = Node.props[prop];
                        else element[prop] = Node.props[prop];
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
}
class ComponentsManager {
    constructor(Config = {}) {
        this.DomComponents = [];
        this.type = "div";
        this.props = {
            class: "MyForm"
        };
        this.SelectedComponent = "";
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
                    this.NavigateFunction(hashD, newNode , this.MainContainer);
                }      
                       
            }
        }

    }
    NavigateFunction = async (IdComponent, ComponentsInstance, ContainerName) => {
        if (this.MainContainer == undefined) {
            this.MainContainer = ContainerName;
        }
        const ContainerNavigate = document.querySelector("#" + ContainerName);
        let Nodes = ContainerNavigate.querySelectorAll(".DivContainer");
        Nodes.forEach((node) => {
            if (node.id != IdComponent) {
                let nodeF = this.DomComponents.find(n => n.id == node.id);
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
                console.log(navigateComponets);
                if (navigateComponets == null) {
                    navigateComponets = [];
                }
                navigateComponets.push(newNode);
                sessionStorage.setItem("navigateComponets", JSON.stringify(navigateComponets));
            }
        }
    }
    AddComponent = async (IdComponent, ComponentsInstance, ContainerName, order = "last") => {
        const ContainerNavigate = document.querySelector("#" + ContainerName);
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
        //var ventanaM = document.getElementById(DivModal);
        //console.log(DivModal)
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
    static ArrayUnique(DataArray, param, param2 = null, param3 = null) {
        if (typeof param3 !== 'undefined' && param3 != null && param3 != "") {
            let DataArraySR = DataArray.filter((ActalValue, ActualIndex, Array) => {
                return Array.findIndex(ArryValue =>
                    (JSON.stringify(ArryValue[param3]) ===
                        JSON.stringify(ActalValue[param3])) &&
                    (JSON.stringify(ArryValue[param2]) ===
                        JSON.stringify(ActalValue[param2])) &&
                    (JSON.stringify(ArryValue[param]) ===
                        JSON.stringify(ActalValue[param]))
                ) === ActualIndex
            });
            return DataArraySR;
        } else if (typeof param2 !== 'undefined' && param2 != null && param2 != "") {
            let DataArraySR = DataArray.filter((ActalValue, ActualIndex, Array) => {
                return Array.findIndex(ArryValue =>
                    (JSON.stringify(ArryValue[param2]) ===
                        JSON.stringify(ActalValue[param2])) &&
                    (JSON.stringify(ArryValue[param]) ===
                        JSON.stringify(ActalValue[param]))
                ) === ActualIndex
            });
            return DataArraySR;
        } else if (typeof param !== 'undefined' && param != null && param != "") {
            let DataArraySR = [] /* DataArray.filter((ActalValue, ActualIndex, Array) => {
                return Array.findIndex(ArryValue => JSON.stringify(ArryValue[param]) ===
                    JSON.stringify(ActalValue[param])) === ActualIndex
            });*/
            DataArray.forEach(element => {
                if (!DataArraySR.find(x => x[param] == element[param])) {
                    DataArraySR.push(element)
                }
            });
            return DataArraySR;
        }
        return null;
    }
    static ArrayUniqueByObject(DataArray, param = {}) {
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
                element.count = 1;
                element.rate = ((1 / DataArray.length) * 100).toFixed(2) + "%";
                DataArraySR.push(element)
            } else {
                DFilt.count = DFilt.count + 1;
                DFilt.rate = ((DFilt.count / DataArray.length) * 100).toFixed(2) + "%";
            }
        });
        return DataArraySR;
    }
    static DataTotals(Config) {
        let UniqueTotals = this.ArrayUnique(Config.Datasets, Config.AttNameG1, Config.AttNameG2, Config.AttNameG3);
        let Totals = [];
        if (typeof Config.AttNameG3 !== 'undefined' && Config.AttNameG3 != null && Config.AttNameG3 != "") {
            UniqueTotals.forEach(element => {
                let suma = 0;
                Config.Datasets.forEach(elementGroup => {

                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                        element[Config.AttNameG2] == elementGroup[Config.AttNameG2] &&
                        element[Config.AttNameG3] == elementGroup[Config.AttNameG3]) {
                        suma = suma + parseFloat(elementGroup[Config.EvalValue]);
                    }
                });
                let NewObj = {};
                NewObj[Config.AttNameG1] = element[Config.AttNameG1];
                NewObj[Config.AttNameG2] = element[Config.AttNameG2];
                NewObj[Config.AttNameG3] = element[Config.AttNameG3];
                NewObj[Config.EvalValue] = suma;
                Totals.push(NewObj);
            });
        } else if (typeof Config.AttNameG2 !== 'undefined' && Config.AttNameG2 != null && Config.AttNameG2 != "") {
            UniqueTotals.forEach(element => {
                let suma = 0;
                Config.Datasets.forEach(elementGroup => {

                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                        element[Config.AttNameG2] == elementGroup[Config.AttNameG2]) {
                        suma = suma + parseFloat(elementGroup[Config.EvalValue]);
                    }
                });
                let NewObj = {};
                NewObj[Config.AttNameG1] = element[Config.AttNameG1];
                NewObj[Config.AttNameG2] = element[Config.AttNameG2];
                NewObj[Config.EvalValue] = suma;
                Totals.push(NewObj);
            });
        } else if (typeof Config.AttNameG1 !== 'undefined' && Config.AttNameG1 != null && Config.AttNameG1 != "") {
            UniqueTotals.forEach(element => {
                let suma = 0;
                Config.Datasets.forEach(elementGroup => {

                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]) {
                        suma = suma + parseFloat(elementGroup[Config.EvalValue]);
                    }
                });
                let NewObj = {};
                NewObj[Config.AttNameG1] = element[Config.AttNameG1];
                NewObj[Config.EvalValue] = suma;
                Totals.push(NewObj);
            });
        }
        return Totals;
    }
    static MaxValue(DataArry, Config) {
        var Maxvalue = 0;
        //Config.TypeChart = "row";
        //Config.TypeChart = "column"; 
        let Data = [];
        if (Config.TypeChart == "column") {
            Data = DataArry;
        } else {
            console.log(Config.Datasets);
            Data = Config.Datasets;
        }
        console.log(Data);
        for (let index = 0; index < Data.length; index++) {
            if (parseInt(Data[index][Config.EvalValue]) > Maxvalue) {
                Maxvalue = Data[index][Config.EvalValue];
            }
        }
        console.log(Maxvalue);
        return Maxvalue;
    }
    static FindInTotal(Elemento, list, Config) {
        var FindElement = false;
        for (let index = 0; index < list.length; index++) {
            if (list[index][Config.AttNameG3]) {
                if (list[index][Config.AttNameG1] == Elemento[Config.AttNameG1] &&
                    list[index][Config.AttNameG2] == Elemento[Config.AttNameG2] &&
                    list[index][Config.AttNameG3] == Elemento[Config.AttNameG3]) {
                    FindElement = list[index];
                }
            } else if (list[index][Config.AttNameG2]) {
                if (list[index][Config.AttNameG1] == Elemento[Config.AttNameG1] &&
                    list[index][Config.AttNameG2] == Elemento[Config.AttNameG2]) {
                    FindElement = list[index];
                }
            } else {
                if (list[index][Config.AttNameG1] == Elemento[Config.AttNameG1]) {
                    FindElement = list[index];
                }
            }
        }
        return FindElement;
    }
    //reparar
    static SumValue(DataArry, Config) {
        var Maxvalue = 0;
        for (let index = 0; index < DataArry.length; index++) {
            Maxvalue = Maxvalue + parseFloat(DataArry[index][Config.EvalValue]);
        }
        return Maxvalue;
    }
    static SumValAtt(DataArry, EvalValue) {
        var Maxvalue = 0;
        for (let index = 0; index < DataArry.length; index++) {
            if (typeof DataArry[index][EvalValue] === "number") {
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
    static FindInArray(element, Datasets) {
        let val = false;
        for (let index = 0; index < Datasets.length; index++) {
            const Data = Datasets[index];
            val = this.compareObj(element, Data)
            if (val == true) {
                break;
            }
        }
        return val;
    }
    static compareObj(arrayP, Data) {
        let val = true;
        for (const prop in arrayP) {
            if (arrayP[prop] !== Data[prop]) {
                val = false;
                break;
            }
        }
        return val;
    }

}
function _DispalNav(NavContainerId, NavAnimation) {
    let NavContainer = document.querySelector("#" + NavContainerId);
    let Nav = NavContainer.querySelector("ul");
    NavContainer.style.transition = "all 1s";
    Nav.style.transition = "all 1s";
    Nav.style.webkitTransform = "translateX(-100%)";
    if (NavContainer.style.opacity == 0) {
        NavContainer.style.pointerEvents = "all";
        NavContainer.style.opacity = 1;
        if (NavAnimation == "SlideLeft") {
            Nav.style.webkitTransform = "translateX(0%)";
        }
        if (NavAnimation == "SlideRight") {
            Nav.style.webkitTransform = "translateX(0%)";
        }
    } else {
        NavContainer.style.pointerEvents = "none";
        NavContainer.style.opacity = 0;
        if (NavAnimation == "SlideLeft") {
            Nav.style.webkitTransform = "translateX(-100%)";
        }
        if (NavAnimation == "SlideRight") {
            Nav.style.webkitTransform = "translateX(+100%)";
        }
    }
}
const ModalNavigateFunction = async (IdComponent, ComponentsInstance, ContainerName) => {
    const ContainerNavigate = document.querySelector("#" + ContainerName);
    if (!ContainerNavigate.querySelector("#" + IdComponent)) {
        if (typeof this.DomComponents[IdComponent] != "undefined") {
            ContainerNavigate.append(this.DomComponents[IdComponent]);
            setTimeout(
                () => {
                    this.modalFunction(this.DomComponents[IdComponent].id);
                }, 100
            );
            return;
        }
        this.DomComponents[IdComponent] = WRender.createElement(ComponentsInstance);
        ContainerNavigate.append(this.DomComponents[IdComponent]);
        setTimeout(
            () => {
                this.modalFunction(this.DomComponents[IdComponent].id);
            }, 100
        );
        return;
    } else {
        this.DomComponents[IdComponent] = ContainerNavigate.querySelector("#" + IdComponent);
        this.modalFunction(this.DomComponents[IdComponent].id);
        setTimeout(
            () => {
                ContainerNavigate.removeChild(this.DomComponents[IdComponent]);
            }, 1000
        );
    }
}
export { WAjaxTools, WRender, ComponentsManager, WArrayF, type }