//TABLAS -------------------------------------->
function GetObj(id) {
    var Obj = document.getElementById(id)
    return Obj;
  }

var ArrayList = [];
class ConfigTable{
    constructor(Config) {        
        this.Table = Config.Table;
        this.Options = Config.Options;
        this.CardStyle = Config.CardStyle;  
        this.TableContainer = Config.TableContainer;      
    }
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
  
function DrawTable(List, Config, TableId = null) {
   // console.log(List.length);
   var urlPath = "";
   if (typeof Url_Path != "undefined") {
        urlPath = Url_Path;
   }
    ArrayList = List;
    
    var Config = new ConfigTable(Config);
    if (TableId == null) {
        var tbody = Config.Table.querySelector("tbody");
        var TableId =  Config.Table.id;
    }else {
        var tbody = document.querySelector("#" + TableId + " tbody");
    }
    if (tbody.parentNode.querySelector("tOptions")) {      
        let Search = true;
        if (Config.Options) {         
            if (Config.Options.hasOwnProperty('Search')) {
                Search = Config.Options.Search;
            }
        }
        if (Search) {
            if (tbody.parentNode.querySelector("tOptions").innerHTML == "") { 
                var tOptions = tbody.parentNode.querySelector("tOptions");
                tOptions.className = "toptions";
                var input = CreateInput({type:"text", placeholder:"Search"});  
                var BTNinput = CreateInput({type:"button", value:"Search"});      
                input.addEventListener('change',
                    function () {
                        FilterInList(List, input.value, Config, TableId);
                    }
                )
                BTNinput.addEventListener('click',
                    function () {
                        FilterInList(List, input.value, Config, TableId);
                    }
                )
                tOptions.append(input, BTNinput);
            }
        }        
    }
    tbody.innerHTML = "";    
    //COMPONENTS OPTIONS
     
    for (var i = 0; i < ArrayList.length; i++) {
        var row = tbody.insertRow(i);
        for (var Propiedad in ArrayList[i]) {        
          if (Propiedad.includes("id_")) {
            var TdForRow = document.createElement("td");
            TdForRow.style.display = 'none';
            TdForRow.setAttribute('name', Propiedad);
            TdForRow.innerHTML = ArrayList[i][Propiedad];
            row.appendChild(TdForRow);
          } else if (Propiedad.includes("img")) {
            var TdForRow = document.createElement("td");
            //TdForRow.style.display = 'none';
            TdForRow.setAttribute('name', Propiedad);
            TdForRow.append(CreateStringNode(`<img src="${urlPath + ArrayList[i][Propiedad]}"></img>`));
            row.appendChild(TdForRow);
          }else if (Propiedad.includes("video")) {
            var TdForRow = document.createElement("td");
            TdForRow.style.display = 'block';
            TdForRow.setAttribute('name', Propiedad);
            TdForRow.append(CreateStringNode(
                `<iframe style="width:100%; height:300px" 
                allowfullscreen webkitallowfullscreen mozallowfullscreen src="${ArrayList[i][Propiedad]}"></iframe>`
            ));
            row.appendChild(TdForRow);
          } else if (Propiedad.includes("_hiddenInTable")) {
            var TdForRow = document.createElement("td");
            TdForRow.style.display = 'none';
            TdForRow.setAttribute('name', Propiedad);
            TdForRow.append(CreateStringNode(
                `<hidden  value="${ArrayList[i][Propiedad]}">`
            ));
            row.appendChild(TdForRow);
          } else if (Propiedad.includes("url")) {
            var TdForRow = document.createElement("td");
            TdForRow.style.display = 'block';
            TdForRow.setAttribute('name', Propiedad);
            TdForRow.append(CreateStringNode(
                `<a class="BtnSecundary" href="${ArrayList[i][Propiedad]}">${ArrayList[i][Propiedad]}</a>`
            ));
            row.appendChild(TdForRow);
          }else {
            var TdForRow = document.createElement("td");
            TdForRow.setAttribute('name', Propiedad);
            if (Config.CardStyle == true) {
                TdForRow.innerHTML =  Propiedad + ": <label>" + ArrayList[i][Propiedad] + "</label>";
            }else {
                TdForRow.innerHTML = "<label>" + ArrayList[i][Propiedad] + "</label>";
            }
            row.appendChild(TdForRow);
          }
        }
        if (Config.Options) {
            var tdForInput = document.createElement("td");
            tdForInput.className = "TdOptions";
            if (Config.Options.Del) {
                var InputForRT = CreateInput({type:'button',value:'Del',className: "BtnAlert"}); 
                var DelData = {
                    Index:i,
                    Config:Config,
                    TableId:TableId
                }
                AsigEventsDel(InputForRT, DelData)
                //InputForRT.setAttribute("onclick","DeleteElement("+JSON.stringify(DelData) +")");                              
                tdForInput.appendChild(InputForRT);            
           }
           if (Config.Options.Edit) {                          
                var InputForRT = CreateInput({type:'button',value:'Edit',className: "BtnPrimary"});
                var EditData = {
                    Index:i,
                    Config:Config,
                    TableId:TableId,
                    DataElement:ArrayList[i]
                } 
                AsigEventsEdit(InputForRT, EditData)         
               // InputForRT.setAttribute("onclick","EditElement("+JSON.stringify(EditData) +")");
                tdForInput.appendChild(InputForRT);                           
            }
            if (Config.Options.Select) {
                var InputForRT = CreateInput({type:'button',value:'Select',className: "BtnSuccess"});
                var SelectData = {           
                    'sector': i,
                    'holding': "", 
                    'empresa': ""
                }  
                AsigEventsSelect(InputForRT, SelectData)
                tdForInput.appendChild(InputForRT);               
            }            
            if (Config.Options.Show) {                
                const InputForRT = CreateInput({type:'button',value:'Show',className: "BtnSecundary"});  
                var ShowData = {
                    Index:i,
                    Config:Config,
                    TableId:TableId,
                    DataElement:ArrayList[i]
                }  
                AsigEventsShow(InputForRT, ShowData)           
                //InputForRT.setAttribute("onclick","ShowElement("+JSON.stringify(ShowData) +")");
                tdForInput.appendChild(InputForRT);                               
            }
            if (tdForInput.innerHTML != "") {
                row.appendChild(tdForInput);
            }
          
        }
    }   
    if (Config.TableContainer) {
        GetObj(TableContainer).append(Table);
    }   
}
//ASIGNACION DE EVENTOS
function AsigEventsDel(InputForRT, DelData){ 
    InputForRT.addEventListener('click',
        function() {
            DeleteElement(DelData)           
        }
    )  
}function AsigEventsEdit(InputForRT, EditData){ 
    InputForRT.addEventListener('click',
        function() {
            EditElement(EditData)
            //console.log(Data);
        }
    )  
}function AsigEventsSelect(InputForRT, Data){ 
    InputForRT.addEventListener('click',
        function() {
            console.log(Data);
        }
    )  
}function AsigEventsShow(InputForRT, ShowData){ 
    InputForRT.addEventListener('click',
        function() {
            ShowElement(ShowData)
            //console.log(Data);
        }
    )  
}
//FIN ASIGNACION DE EVENTOS



function FilterInList(ArrayList, Param, Config, TableId) {
   if (Param != "") {
        // var ListArray = ArrayList.filter(
        //     element => element.name.includes(Param)
        // );
        var ListArray = ArrayList.filter(function (element) {
                //element => element.name.includes(Param)
                for (var key in element) {
                    if (element[key].toString().includes(Param)) {
                        return element;                                                
                    }
                }
            }
        );
        if (ListArray.length == 0) {          
            if(Config.Options){
                if(Config.Options.ApiSelect){
                    if(Config.Options.ApiSelect.ApiUrlSelect){
                        FilterArrayForApi(Param, Config, TableId)
                    }
                }
            }
        }else {
            DrawTable(ListArray, Config, TableId);
        }      
   }else{
        DrawTable(ArrayList, Config, TableId);
   }
}
function ShowElement(Data){  
    var Form;  
    if (Data.Config.Options.ShowOptions.FormName) {
        Form = document.getElementById(Data.Config.Options.ShowOptions.FormName).querySelectorAll(".FormControl"); 
        if(Data.Config.Options.ShowOptions.FormName){
            var UpdateData = {
                Index:Data.Index,
                Config:Data.Config,
                DataElement:Data.DataElement,
                TableId:Data.TableId
            }           
            var control = GetObj(Data.Config.Options.ShowOptions.FormName).querySelector(".BtnUpdate");
            //control.setAttribute("onclick","UpdateElement("+JSON.stringify(UpdateData) +");");
            control.onclick = ()=>{
                UpdateElement(UpdateData);
            }
        }   
        var index = 0;
        for (var Propiedad in Data.DataElement) {
            
            if (Form[index].tagName == "INPUT" || Form[index].tagName == "input") {
                console.log(Form[index].tagName)      
                if (Form[index].type != "button") {
                    Form[index].value = Data.DataElement[Propiedad];
                }
            } 
            if (Form[index].tagName == "TEXTAREA" || Form[index].tagName == "textarea") { 
                Form[index].innerText = Data.DataElement[Propiedad];                
            } 
            if (Form[index].tagName == "SELECT" || Form[index].tagName == "select") { 
                var aTags = Form[index].getElementsByTagName("option");
                var searchText = Data.DataElement[index];
                var found;
                for (var i = 0; i < aTags.length; i++) {
                    if (aTags[i].textContent == searchText) {
                      found = aTags[i].value;
                      Form[index].value = found;
                      break;
                    }
                  }
            } 
            index++;
        } 
        modalFunction(Data.Config.Options.ShowOptions.FormName)      
    }else{     
        CreateShowForm(Data);
    }  
}

//#region PENDIENTE
    function InicializePaginateTable(Config) { 
        var PaginateContainer = document.createElement('div');
        PaginateContainer.className = 'ShowPaginate';
        PaginateContainer.id = 'ShowPag_'+ Config.Name;   
        if (GetObj('ShowPag_'+ Config.Name)) {
            PaginateContainer = GetObj('ShowPag_'+ Config.Name);
            PaginateContainer.innerHTML = "";
        }    
        var Cont  = Math.round(ArrayList.length / GetObj('Show_' + Config.Name).value);
        for (let index = 0; index < Cont; index++) {
            var Link = document.createElement('a');
            Link.innerText = index + 1;
            Link.href = '#Show_' + Config.Name;
            Link.className = "ShowPaginate";
            PaginateContainer.append(Link);                       
        }
        
        return PaginateContainer;
    }

    function InicializeShowTable(Config) {
        var sel = document.createElement('select');
        sel.id = 'Show_' + Config.Name ;
        sel.className = 'ShowTable'
        var i = 10;
        for (let index = 0; index < 10; index++) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerText = i;
            i = i + 10;
            sel.appendChild(opt);
        }
        return sel;
    }
//#endregion

function EditElement(Data) {  
    var Form;  
    if (Data.Config.Options.EditOptions.FormName) {
        Form = document.getElementById(Data.Config.Options.EditOptions.FormName).querySelectorAll(".FormControl"); 
        if(Data.hasOwnProperty(Config.Options.EditOptions.FormName)){
            var UpdateData = {
                Index:Data.Index,
                Config:Data.Config,
                DataElement:Data.DataElement,
                TableId:Data.TableId
            }           
            var control = GetObj(Data.Config.Options.EditOptions.FormName).querySelector(".BtnUpdate");
            //control.setAttribute("onclick","UpdateElement("+JSON.stringify(UpdateData) +");");
            control.onclick = ()=>{
                UpdateElement(UpdateData);
            }
        }   
        var index = 0;
        for (var Propiedad in Data.DataElement) {            
            if (Form[index].tagName == "INPUT" || Form[index].tagName == "input") {
                console.log(Form[index].tagName)      
                if (Form[index].type != "button") {
                    Form[index].value = Data.DataElement[Propiedad];
                }
            } 
            if (Form[index].tagName == "TEXTAREA" || Form[index].tagName == "textarea") { 
                Form[index].innerText = Data.DataElement[Propiedad];                
            } 
            if (Form[index].tagName == "SELECT" || Form[index].tagName == "select") { 
                var aTags = Form[index].getElementsByTagName("option");
                var searchText = Data.DataElement[index];
                var found;
                for (var i = 0; i < aTags.length; i++) {
                    if (aTags[i].textContent == searchText) {
                      found = aTags[i].value;
                      Form[index].value = found;
                      break;
                    }
                  }
            } 
            index++;
        } 
        modalFunction(Data.Config.Options.EditOptions.FormName)      
    }else{     
        CreateForm(Data);
    }      
}
function CreateForm(Data) {
    if (GetObj('TempForm')) {
        return;
    }
    var FormContainer = document.createElement('div');
    FormContainer.className = 'ModalContent';
    FormContainer.id = "TempForm";
    var Form = document.createElement('div');
    Form.className = 'ContainerForm WScroll';
    var Header = document.createElement('div');
    var ControlContainer = document.createElement('div');
    ControlContainer.className = 'GroupForm';   
    for (var Prop in Data.DataElement) {
        var DivContainer = document.createElement('div');
        DivContainer.className = "divControl"
        var ControlLabel = document.createElement('label');
        ControlLabel.innerText = Prop +": ";
        var ControlInput = document.createElement('input');
        ControlInput.id = Prop;
        ControlInput.value = Data.DataElement[Prop];
        ControlInput.className = 'FormControl';
        if (Prop.includes("id_")) {
            DivContainer.hidden = true;
        }
        DivContainer.append(ControlLabel,ControlInput);
        ControlContainer.append(DivContainer);
    }
    var ActionsContainer = document.createElement('div');
    ActionsContainer.className = 'GroupForm';
    var InputSave = CreateInput({type:'button',value:'Guardar'});
    var UpdateData = {
        Index:Data.Index,
        Config:Data.Config,
        DataElement:Data.DataElement,
        TableId:Data.TableId
    }
   // InputSave.setAttribute("onclick","UpdateElement("+JSON.stringify(UpdateData) +");");
    InputSave.onclick = ()=>{
        UpdateElement(UpdateData);
    }
    ActionsContainer.appendChild(InputSave);
    var InputClose = CreateInput({type:'button',value:'Cerrar'});   
    //InputClose.setAttribute("onclick","modalFunction('TempForm'); RemoveTempForm()");
    InputClose.onclick = ()=>{
        modalFunction('TempForm'); RemoveTempForm()
    }
    ActionsContainer.appendChild(InputClose);
    Form.append(Header,ControlContainer,ActionsContainer);
    FormContainer.append(Form);
    document.body.append(FormContainer);
    setTimeout(function(){ modalFunction('TempForm');},100);    
}
function CreateShowForm(Data) {
    if (GetObj('TempForm')) {
        return;
    }
    var urlPath = "";
    if (typeof Url_Path != "undefined") {
        urlPath = Url_Path;
    }
    var FormContainer = document.createElement('div');
    FormContainer.className = 'ModalContent';
    FormContainer.id = "TempForm";
    var Form = document.createElement('div');
    Form.className = 'ContainerForm WScroll';
    var Header = document.createElement('div');
    var ControlContainer = document.createElement('div');
    ControlContainer.className = 'GroupForm';   
    for (var Prop in Data.DataElement) {
        var DivContainer = document.createElement('div');
        DivContainer.className = "divForm";
        var ControlLabel = document.createElement('label');
        let PropDescription = Prop.replace("_hiddenInTable","");
        PropDescription = PropDescription.replace("Table","");
        PropDescription = PropDescription.replace("Card","");
        PropDescription = PropDescription.replace(/_/g," ");
        ControlLabel.innerText = PropDescription +": ";         
        if (Prop.includes("img")) {
            ControlLabel.style.display = 'none';            
            var ControlInput = document.createElement('img');
            ControlInput.className = "ImageDetail";
            ControlInput.id = Prop;
            ControlInput.src = urlPath + Data.DataElement[Prop];
            DivContainer.append(ControlLabel,ControlInput);
            ControlContainer.append(DivContainer);
        }else if (Prop.includes("video")) {
            ControlLabel.style.display = 'none';
            var ControlInput = document.createElement('iframe');
            ControlInput.id = Prop;
            ControlInput.src = Data.DataElement[Prop];
            DivContainer.append(ControlLabel,ControlInput);
            ControlContainer.append(DivContainer);
            //ControlInput.className = 'FormControl';
        }else if (Prop.includes("ListTable")) {
            ControlLabel.style.display = 'none';            
            var ControlInput = CreateTable({TableId:Prop+"Table"});
            DivContainer.style.width = '100%';
            DivContainer.style.float = 'none';
            DivContainer.style.display = 'block';
            DivContainer.style.maxWidth = '100%';
            DivContainer.style.clear = "left";
            DivContainer.className = 'Acordeon';
            ControlInput.id = Prop;
            //ajustar a la necesidad de la lista
            var ConfigPropList = {
                Table: ControlInput,
                CardStyle: true,
                Options: {
                    Search: false
                }
            } 
            //console.log(JSON.parse(Data.DataElement[Prop]));
            DrawTable(JSON.parse(Data.DataElement[Prop]), ConfigPropList)
            DivContainer.append(ControlLabel,ControlInput);
            ControlContainer.append(DivContainer);
        } else if (Prop.includes("ListCard")) {
            ControlLabel.style.display = 'none';            
            var ControlInput = CreateTable({TableId:Prop+"Table", CardStyle:true});
            DivContainer.style.width = '100%';
            DivContainer.style.float = 'none';
            DivContainer.style.display = 'block';
            DivContainer.style.maxWidth = '100%';
            DivContainer.append(CreateStringNode(`
                <div style="width:calc(100% - 20px); max-width:100%">      
                    <label class="BtnPrimary" style="width:calc(100% - 30px);"  for="r${Prop}"> ${PropDescription}
                    </label>
                    <input type="radio" 
                    style="display:none" onclick="DisplayAcordeon(this.checked, 'Group${Prop}', '500px')" 
                    name="Opcion" id="r${Prop}">                    
                </div>
            `));
            var DivContainerTable = document.createElement('div');
            DivContainerTable.className = 'GroupFormAcordeon WScroll';
            DivContainerTable.id = 'Group' + Prop;
            
            ControlInput.id = Prop;
            //ajustar a la necesidad de la lista
            var ConfigPropList = {
                Table: ControlInput,
                CardStyle: true,
                Options: {
                    Search: false
                }
            } 
            DrawTable(JSON.parse(Data.DataElement[Prop]), ConfigPropList)
            //DivContainer.append(DivContainerTable.append(ControlInput));  
            DivContainerTable.append(ControlInput)          
            DivContainer.append(ControlLabel,DivContainerTable);
            ControlContainer.append(DivContainer);
        }else  {
            var ControlInput = document.createElement('label');
            ControlInput.id = Prop;
            ControlInput.innerText = Data.DataElement[Prop];
            ControlInput.className = 'FormControl';
            DivContainer.append(ControlLabel,ControlInput);
            ControlContainer.append(DivContainer);
        }       
        if (Prop.includes("id_")) {
            DivContainer.hidden = true;
            DivContainer.append(ControlLabel,ControlInput);
            ControlContainer.append(DivContainer);
        }
       
    }
    var ActionsContainer = document.createElement('div');
    ActionsContainer.className = 'GroupForm HeaderForm';
    var InputClose = CreateInput({type:'button',value:'◄ Back', className: 'BtnPrimary'});   
    //InputClose.setAttribute("onclick","modalFunction('TempForm'); RemoveTempForm()"); 
    InputClose.onclick = ()=>{
        modalFunction('TempForm'); RemoveTempForm();
    }  
    ActionsContainer.appendChild(InputClose);
    
    Form.append(ActionsContainer,ControlContainer);
    FormContainer.append(Form);
    document.body.append(FormContainer);
    setTimeout(function(){ modalFunction('TempForm');},100);    
}

function UpdateElement(Data) {   
    var ArrayObject = ArrayList.find(element => element = Data.DataElement);
    for (let index = 0; index < Object.keys(Data.DataElement).length; index++) {
      var prop = Object.keys(Data.DataElement)[index];
      ArrayObject[prop] = GetObj(prop).value;
    }    
    if (Data.Config.Options.EditOptions.ApiUrlUpdate) {
        UpdateArrayForApi(ArrayObject,Data.Config, Data.TableId);
    }else{
        DrawTable(ArrayList,Data.Config,Data.TableId);
    }    
    if (Data.Config.FormName) {
        modalFunction(Data.Config.FormName)
    } else{       
        modalFunction("TempForm")
        setTimeout(function(){ 
            document.body.removeChild(GetObj("TempForm"));
        }, 1000);        
    }  
}

function RemoveTempForm() {
    setTimeout(function(){ 
        document.body.removeChild(GetObj("TempForm"));
    }, 1000); 
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


//CRUDDDDDDDD 
function  FilterArrayForApi(Param, Config, TableId){
    let xhr
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest()
    else xhr = new ActiveXObject("Microsoft.XMLHTTP") 
    //AJUSTAR A API
    url = Config.Options.ApiSelect.ApiUrlSelect + "/?param=" + Param;
    xhr.open('GET', url)
    xhr.addEventListener('load', (data) => {
        const dataJSON = JSON.parse(data.target.response);
        DrawTable(dataJSON[Config.Options.ApiSelect.ResponseName], Config, TableId);
    })
    xhr.send() 
}

function  UpdateArrayForApi(UpdateObject, Config, TableId){    
    var url =  url = Config.Options.EditOptions.ApiUrlUpdate;
    var xhr = new XMLHttpRequest(); xhr.open("POST", url, true); 
   // xhr.setRequestHeader("Content-Type",  'multipart/form-data');//application/json
    xhr.setRequestHeader("Content-Type",  'application/json');//application/json
    xhr.onreadystatechange = function(data) { 
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) 
        {        
            var dataJson = JSON.parse(data.target.response); 
            DrawTable(ArrayList, Config, TableId);
        } 
    } 
    xhr.send(JSON.stringify(UpdateObject));
}


export{createElementNS, createElement, CreateTable, DrawTable}