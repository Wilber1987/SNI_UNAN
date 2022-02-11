import { WRender, WArrayF } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "../WDeprecateComponents/WTableComponents.js";
const TableId = "tableReport"

//facturas de empresa ligadas al usuario y y por sesiones de empresa
class WReportList extends HTMLElement {
    constructor() {
        super();
      
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }        
        this.DrawReport();
    }
    DrawReport = async () => {
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.append(WRender.createElement(this.style));
        if (this.Dataset != undefined && this.Dataset.__proto__ == Array.prototype) {
            const Pages = { type:'div', props: { id: '', class: 'GFormPrint'}, children:[
                { type:'div', props: { id: '', class: 'pageA4'}, children:[]}
            ]} ;
            const codes = WArrayF.ArrayUnique(this.Dataset, this.groupParam);   
            codes.forEach((code, index) => {
                const header = {
                    type: 'div', props: { id: '', class: "header" }, children: []
                };
                const body = {
                    type: 'div', props: { id: '', class: "body" }, children: []
                }; 
                if (this.header != undefined && this.header.__proto__ == Array.prototype) {                   
                    this.header.forEach(prop => {
                        header.children.push({
                            type: 'div', props: { id: '' }, children: [
                                prop.replace("_", " ") + ": ", code[prop]
                            ]
                        })
                    });
                }                
                this.Dataset.forEach(element => {
                    if (element[this.groupParam] == code[this.groupParam]) {                        
                        if (this.body != undefined && this.body.__proto__ == Array.prototype) {
                            this.body.forEach(prop => {
                                body.children.push({
                                    type: 'div', props: { id: '' }, children: [
                                        element[prop.leyend] + ": ", element[prop.value]
                                    ]
                                })
                            });
                        }
                        if (this.body == undefined && this.header == undefined) {
                            for (const prop in element) {
                                body.children.push({
                                    type: 'div', props: { id: '' }, children: [
                                        prop.replace("_", " ") + ": ", element[prop]
                                    ]
                                })
                            }                            
                        }
                    }
                });
                let Size = 0;
                let page = Pages.children[Pages.children.length - 1];
                //console.log(page);
                page.children.forEach(element => {                   
                    Size = Size + 100;
                });               
                if (Size >= 900) {
                    Pages.children.push({ type:'div', props: { id: '', class: 'pageA4'}, children:[ ]});
                    page = Pages.children[Pages.children.length - 1];
                }
                page.children.push(WRender.createElement({
                    type: 'div', props: { id: 'elme'+index, class: "fact", 
                        onclick: (ev)=>{  
                                //console.log("stile" ,ev.target.parentNode.offsetHeight);
                            } 
                        }, children: [
                        header, body
                    ]
                }));
            });
            this.shadowRoot.append(WRender.createElement(Pages));
            this.shadowRoot.append(WRender.createElement(PrintStyle));
        } else {
            this.shadowRoot.innerHTML = "define un array list"
        }
    }
    style = {
        type: 'w-style', props: {
            id: '', ClassList: [
                new WCssClass(`.fact`, {
                    border: 'solid 1px #999',
                    "border-radius": "0.2cm",
                    margin: "10px",
                    overflow: "hidden"
                }),new WCssClass(`.header`, {
                    display: "flex",
                    "flex-wrap": "wrap",
                    padding: "10px", 
                    "background-color": "#80bfff",
                }),new WCssClass(`.body`, {
                    display: "flex",
                    "flex-wrap": "wrap",
                    padding: "10px",
                }), new WCssClass(`.body div, .header div`, {
                    margin: "5px"
                }), 
            ], MediaQuery: [{
                condicion: '(max-width: 600px)',
                ClassList: []
            },
            ]
        }
    };
}
customElements.define("w-report-list", WReportList);
class WReportView extends HTMLElement{
    constructor(Config) {
        super();  
        if (Config != undefined) {            
            this.id = undefined ?? Config.id;
            this.Config = Config;
        }
        this.attachShadow({ mode: "open" });  
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        } 
        this.className =  this.className + " reportV"; 
        this.DrawReport();
    }
    DrawReport(){
        this.shadowRoot.innerHTML = "";        
        if (this.Config.Dataset.length == 0) {
            this.shadowRoot.innerHTML = "No hay datos que mostrar";
        }
        if (this.ReportList == undefined) {
            this.ReportList = true;
        }  
        const ControlOptions = {
            type: 'div',
            props: { id: 'optionsContainter', class: "OptionContainer" }, children: []
        }
        console.log(this.Config);
        for (const prop in this.Config.Dataset[0]) {             
                                
            if ((typeof this.Config.Dataset[0][prop] != "number" 
            && !prop.toUpperCase().includes("FECHA") 
            && !prop.toUpperCase().includes("DATE") )
            || prop.toUpperCase().includes("AÑO") 
            || prop.toUpperCase().includes("YEAR")) {
                const select = {type:'select', props: {id: prop}, children:[
                    { type:'option', props: { innerText:'Seleccione', value: ''} }
                ]}            
                const SelectData = WArrayF.ArrayUnique(this.Config.Dataset, prop);
                SelectData.forEach(data => {
                    if (data[prop] != "" && data[prop] != null) {
                        select.children.push({
                            type:'option', props: {innerText: data[prop], value: data[prop]}
                        });                        
                    }                           
                });
                select.props.onchange = async (ev)=>{
                    let SelectFlag = false;
                    //const Container =  this.shadowRoot.querySelector("#"+props.id);
                    this.shadowRoot.querySelectorAll("#optionsContainter select").forEach(select => {
                        if (select.id != ev.target.id) {
                            if (select.value != "") {
                                console.log("valor: ",select.value);
                                SelectFlag = true;
                            }
                        }
                    });
                    const table = this.shadowRoot.querySelector("w-table");   
                    const wreport = this.shadowRoot.querySelector("w-report-list");              
                    const DFilt =  this.Config.Dataset.filter( obj => {
                        let flagObj = true;
                        this.shadowRoot.querySelectorAll("#optionsContainter select").forEach(select => {  
                            if (select.value == "") {
                                return
                            }
                            if ( obj[select.id] == select.value) {
                                if (flagObj) {
                                    flagObj = true;
                                } 
                            } else {
                                flagObj = false;
                            }
                        });
                        return flagObj;
                    });  
                   // console.log(DFilt);             
                    wreport.Dataset = DFilt;
                    wreport.DrawReport();
                    table.Dataset = DFilt;
                    table.DefineTable(DFilt);
                }
                ControlOptions.children.push([prop, select]);
            }
        }    
        ControlOptions.children.push([{ type:'input', 
            props: { id: '', type:'button', class: 'BtnSuccess', value: 'Imprimir', onclick: async ()=>{
                const GeneralStyle = `<style>
                * {
                    -webkit-print-color-adjust: exact !important;
                    font-size: 12px;
                    font-family: arial
                } 
                h1 {
                    font-size: 18px;
                    text-align: center;
                }
                h2 {
                    font-size: 16px;
                    text-align: center;
                }
                h3 {
                    font-size: 14px;
                    text-align: center;
                }
                </style>`;
                const WTable = this.shadowRoot.querySelector("w-table");
                let PrintHeader = this.Config.PrintHeader;
                if (PrintHeader == undefined) {
                    PrintHeader = `<div>
                    <h1>WExpDev</h1>
                    <h2>Informe</h2>                
                    <h2>Fecha ${(new Date()).toLocaleDateString()}</h2>
                    </div>`
                }
                const WStyles = WTable.shadowRoot.querySelectorAll("w-style");
                const Table = WTable.shadowRoot.querySelector("#MainTable" + WTable.id); 
                WStyles.forEach(style => {
                    Table.append(style.cloneNode(true));
                }); 
                const ReportView = this.shadowRoot.querySelector("w-report-list"); 
                const RepStyles = ReportView.shadowRoot.querySelectorAll("w-style");
                const RepPage = ReportView.shadowRoot.querySelectorAll(".pageA4");
                const ReportPageContainer = WRender.createElement({ type:'div' });
                const FirstPage = WRender.createElement({ type:'div', props: { class: "pageA4"}});
                Table.append(WRender.CreateStringNode(GeneralStyle));  
                if (WTable.shadowRoot.querySelector("w-colum-chart")) {
                    const Chart = WTable.shadowRoot.querySelector("w-colum-chart").shadowRoot;
                    Chart.append(WRender.CreateStringNode(GeneralStyle)); 
                    FirstPage.innerHTML = PrintHeader + Table.innerHTML + Chart.innerHTML;
                } else {
                    FirstPage.innerHTML = PrintHeader; //+ Table.innerHTML + Chart.innerHTML;
                }   
                if (this.Config.bodyGroup) {    
                    console.log(this.Config.bodyGroup);               
                    const ArraySum = [];
                    const groups = WArrayF.ArrayUnique(this.Config.Dataset, this.Config.bodyGroup[0].leyend);
                    const SumContainer = { type:'div', props: { class: 'sumaryContainer'},
                    children:[]};
                    groups.forEach(element => {
                        ArraySum.push({
                            leyend: element[this.Config.bodyGroup[0].leyend],
                            value: WArrayF.SumValAttByProp(this.Config.Dataset, 
                                { prop: this.Config.bodyGroup[0].leyend , value: element[this.Config.bodyGroup[0].leyend]},
                            this.Config.bodyGroup[0].value)  
                        })                     
                    }); 
                    ArraySum.forEach(element => {
                        SumContainer.children.push([
                            element.leyend+": ",
                            "€ " +element.value
                        ]);
                    }); 
                    FirstPage.append(WRender.createElement(SumContainer))               
                }      
                ReportPageContainer.append(WRender.CreateStringNode(GeneralStyle))
                ReportPageContainer.append(FirstPage)
                RepStyles.forEach(style => {
                    ReportPageContainer.append(style.cloneNode(true));
                }); 
                RepPage.forEach(page => {
                    ReportPageContainer.append(page.cloneNode(true));
                });     
            
                RepStyles.forEach(style => {
                    FirstPage.append(style.cloneNode(true));
                }); 
                //console.log(FirstPage);

                const ventimp =  window.open(' ', 'popimpr');
                ventimp.document.write( ReportPageContainer.innerHTML );
                ventimp.document.close();
                ventimp.print();
                ventimp.close();
            
        }}}])    
        this.shadowRoot.append(WRender.createElement(ControlOptions));
        var TableConfigG = {
            Dataset: this.Config.Dataset,            
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            Dinamic: true,
            AddChart: true,
        };
        const WTableReport = WRender.createElement(WRender.createElement({
            type: "w-table",
            props: {
                id: TableId,
                TableConfig: TableConfigG
            }
        }));
        console.log(WTableReport.TableConfig);
        this.shadowRoot.append(WTableReport);
        if (this.Config.ReportList == true) {
            this.shadowRoot.append(WRender.createElement({
                type: 'w-report-list', props: { id: '', 
                Dataset: this.Config.Dataset, 
                groupParam: this.Config.GroupParam,
                header:this.Config.headerGroup, body: this.Config.bodyGroup 
            }}));
        }

        
        this.shadowRoot.append(WRender.createElement(this.style));
    }
    style = { type: 'w-style', props: {id: '', ClassList: [
            new WCssClass( `.reportV`, {
                margin: '10px',
            }), new WCssClass( `.OptionContainer`, {
                display: "flex",
                "flex-wrap": "wrap",
                "margin-bottom": "10px"
            }),new WCssClass(`.OptionContainer div`, {               
                display: "grid",
                "grid-template-rows": "20px 30px",
                "grid-template-columns": "200px",
                margin: "5px",
                "font-size": "12px",
            }), new WCssClass(
                `.OptionContainer input, .OptionContainer select`, {
                    "grid-row": "2/3",
                    margin: "0px",
                    padding: "5px 10px"
             }),new WCssClass(`.BtnSuccess`, {                
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
            }),
        ], MediaQuery: [ {condicion: '(max-width: 600px)',
            ClassList: []},
        ]}
    };   
}
const MasterStyle = {
    type: "w-style",
    props: {
        ClassList: [
            new WCssClass(".App", {
                display: "grid",
                "grid-template-columns": "250px calc(100% - 250px)",
                "grid-template-rows": "70px calc(100vh - 120px) 50px"
            })
        ], MediaQuery: [{
            condicion: "(max-width: 600px)",
            ClassList: [
                new WCssClass(`.App`, {
                    display: "grid",
                    "grid-template-columns": "100%",
                    "grid-template-rows": "70px auto calc(100vh - 120px) 50px"
                })
            ]
        }
        ]
    }
};
customElements.define("w-report-view", WReportView);
const PrintStyle = { type: 'w-style', props: {id: '', ClassList: [
        new WCssClass(".GFormPrint", {
            "padding": "2% 0",
            "background-color": "#cecdcd",
            "border": "solid 1px #c4c4c4",
            "overflow-x": "scroll"            
        }),        
        new WCssClass(".pageA4", {
            "width": "210mm",
            "height": "297mm",
            "padding": "60px 60px",
            "border": "1px solid #D2D2D2",
            "background": "#fff",
            "margin": " 10PX auto",
            "box-shadow": "0 2px 5px 0px rgba(0,0,0,0.3)"
        }),       
        new WCssClass(".HeaderPrint", {
            "margin": "0px",
            "width": "100%",
            "height": "10mm",
            "top": "0px",
            "color": "#585656",
            "font-size": "25px",
            "font-weight": "bold",
            "text-align": "center",
            "padding": "10mm",
        }),        
        new WCssClass(".FooterPrint", {
            "margin": "0px",
            "width": "100%",
            "height": "20mm",
            "bottom": "0px",
            "text-align": "center",
            "padding": "10mm",
        }),        
    ], MediaQuery: [ {condicion: 'print',
        ClassList: [ new WCssClass(".pageA4", {
            "width": "210mm",
            "height": "307mm",
            "padding": "0px 0px",
            "border": "none",
            "background": "#fff",
            "margin": " 0PX auto",
            "box-shadow": "none",
        }),  ]},
    ]}
};

export { WReportView }