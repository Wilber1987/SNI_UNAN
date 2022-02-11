//TABLAS -------------------------------------->
function GetObj(id) {
    var Obj = document.getElementById(id)
    return Obj;
}

function CreateStringNode(string) {
    let node = document.createRange().createContextualFragment(string);
    return node;
}
function createElement(node) {   
    
    if (typeof node === 'string') {
      return document.createTextNode(node)
    }
    if(node.tagName){
        return node;
    }    
    //HTMLDivElement
    const element = document.createElement(node.type)
    if (node.props) {
        for (const prop in node.props) {             
            if (typeof  node.props[prop] === "function") {
                element[prop] = node.props[prop];
            }else if (typeof  node.props[prop] === 'object') {                
                element[prop] = node.props[prop];
            }else{
                element.setAttribute(prop, node.props[prop]);
            }  
         }
    }  
    
    if (node.children) {
        node.children
            .map(createElement)
            .forEach(child => element.appendChild(child))
    }  
    return element;
}
function createElementNS(node) {
    //console.log(node);
    if (typeof node === 'string') {
      return document.createTextNode(node)
    }
    const SVGN = "http:\/\/www.w3.org/2000/svg";
    const element = document.createElementNS(SVGN,node.type)
    if (node.props) {
        for (const prop in node.props) {             
            if (typeof  node.props[prop] === "function") {
                element[prop] = node.props[prop];
            }else if (typeof  node.props[prop] === 'object') {                
                element[prop] = node.props[prop];
            }else{
                try {
                    element.setAttributeNS(null, prop, node.props[prop])
                } catch (error) {
                    //console.log(prop, node.props[prop])
                    console.log(error);
                    element.setAttributeNS(SVGN, prop, node.props[prop]);
                }  
            }  
         }
    }  
    if (node.children) {
        node.children
            .map(createElementNS)
            .forEach(child => element.appendChild(child))
    }  
    return element;
}
//export{createElementNS, createElement}

function CreateInput(Data) {
    var InputForRT = document.createElement("input");
    InputForRT.className = Data.className;
    InputForRT.type = Data.type;
    if ( Data.type != 'text') {
        InputForRT.value = Data.value;
        //InputForRT.index = Data.value;
    }    
    InputForRT.placeholder = Data.placeholder;
    return InputForRT;
}
function CreateTable(Config) {
    var Table = document.createElement('table');
    Table.append(document.createElement('tOptions'));
    Table.append(document.createElement('thead'));
    Table.append(document.createElement('tbody'));
    Table.append(document.createElement('tfoot'));
    Table.id = Config.TableId;
    if (Config.CardStyle === true) {
       Table.className = "CardStyleComponent";
    }else {
        if (Config.className) {
            Table.className = Config.className;
        }else{
            Table.className = "TblForm";
        }      
    }
    return Table;
}
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
//MODALES-------------------------------->
function modalFunction(DivModal) {    
    var ventanaM = document.getElementById(DivModal);     
    if (ventanaM.style.opacity == 0) {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.opacity = 1;
      ventanaM.style.pointerEvents = "all";
    } else {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.opacity = 0;
      ventanaM.style.pointerEvents = "none";
    }
}



export{createElementNS, createElement, CreateTable}