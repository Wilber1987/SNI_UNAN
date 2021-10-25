import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "./WModules/WComponentsTools.js";
import { WCssClass } from "./WModules/WStyledRender.js";
import "./WComponents/WTableComponents.js";
class Expediente extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        const Datos = WRender.createElement({
            type: "div",
            props: {
                class: "datosGenerales"
            },
            children: [{
                type: "img", props: {
                    src: this.paciente.img_hidden
                }
            }, {
                type: "h5", props: {
                    innerText: `${this.paciente.nombres} ${this.paciente.apellidos}`
                }
            },
            { type: "label", props: { innerText: `Empresa: ${this.paciente.nombre_empresa}` } },
            { type: "label", props: { innerText: `Estado psicoemocional: ${this.paciente.estado_psicoemocional}` } },
            { type: "label", props: { innerText: `Última sesión: ${this.paciente['última sesión']}` } },
            //styles
            {
                type: "w-style",
                props: {
                    ClassList: [
                        new WCssClass(`.datosGenerales`, {
                            height: "230px",
                            padding: "10px",
                            width: "calc(100% - 30px)",
                            border: "solid 1px #cbcbcb",
                            padding: "10px",
                            display: "grid",
                            margin: "auto",
                            "border-radius": "0.3cm",
                            "grid-template-rows": "auto auto auto auto auto",
                            "grid-template-columns": "220px calc(100% - 220px)",
                        }), new WCssClass(`.datosGenerales img`, {
                            "grid-row": "1/6",
                            width: "200px",
                            height: "200px",
                            "object-fit": "cover",
                            "border-radius": "0.3cm",
                            "box-shadow": "0 2px 5px 0 rgb(0 0 0 / 30%)"
                        })
                    ]
                }
            }
            ]
        });
        const Historial = WRender.createElement({
            type: "div", props: {id: "Historial"}
        });
        const TablePacientes = WRender.createElement({
            type: "w-table",
            props: {
                id: "tblHistorial",
                TableConfig: {
                    Datasets: this.HistorialCitas,
                    Options: {
                        Search: true,
                        UserActions: [{
                            name: "Tratamiento",
                            Function: async (Param) => {
                                //r el clic
                                var url = "{{URL::action('GpsiSolicitudPsicologoController@ver_documento_sesion',[-1,Session::get('Url_empresa')])}}";
                                var url = url.replace("-1", Param.id_solicitud_hidden);
                                //window.location.href = url;
                                //window.open(url, '_blank').focus();
                                console.log(Param);          
                                
                                
                                 const Modal = WRender.createElement({
                                    type: "w-modal-form",
                                    props: {
                                        ObjectModal: { type: "iframe" ,props:{src: Param.url_hidden.toString(), type: "application/pdf",style: "width: 100%; height: 500px;" }},
                                        ShadowRoot: false,
                                        icon: "../public/images/emo/01.png",
                                        title: "Tratamiento",
                                        //HeadOptions: false,
                                        StyleForm: "columnX3"
                                    }
                                });
                                this.append(Modal);
                                
                            }
                        }]
                    }
                }
            }
        });
        const titleConsulta = WRender.createElement({
            type: "h3", props: {innerText:"Sesiones realizadas"}
        });
        
        const titleEstados = WRender.createElement({
            type: "h3", props: {innerText:"Estados psicoemocionales"}
        });

        this.append(Datos, titleConsulta, TablePacientes, titleEstados,  Historial);
        this.iniciarMultiColunChart(
            this.arrayHistoryDate, 
            this.arrayHistory,
            Historial
        );
    }    
    iniciarMultiColunChart(arrayHistoryDate, arrayHistory, Container, titulo = "") {
        var ChartArry = [];
        for (var i = 0; i < arrayHistoryDate.length; i++) {
            var charRow = new Object();
            const LabelGrup = arrayHistoryDate[i]['area_psicoemocional'];
            charRow['leyendGroup'] = LabelGrup;
            
            for (let index = 0; index < arrayHistory.length; index++) {
                if (arrayHistoryDate[i].area_psicoemocional == arrayHistory[index].area_psicoemocional) {
                    var colorColum = '';
                    var urlImage = '';
                    var Estado = arrayHistory[index]['estado_psicoemocional'];
                    if (arrayHistoryDate[i].area_psicoemocional != 'Estrés laboral') {
                        if (Estado == 'Verde') {
                            urlImage = this.takeIcon("Verde");
                            colorColum = '#00e6cd';
                        }
                        if (Estado == 'Naranja') {
                            urlImage = this.takeIcon('Naranja');
                            colorColum = '#fffa58';
                        }
                        if (Estado == 'Fresa') {
                            urlImage = this.takeIcon("Fresa");
                            colorColum = '#ff8cc7';
                        }
                    }
                    else {
                        if (Estado == 'celeste') {
                            urlImage = this.takeIcon("Verde");
                            colorColum = '#00e6cd';
                        }
                        if (Estado == 'azul') {
                            urlImage = this.takeIcon("Verde");
                            colorColum = '#00e6cd';
                        }
                        if (Estado == 'verde') {
                            urlImage = this.takeIcon('Naranja');
                            colorColum = '#fffa58';
                        }
                        if (Estado == 'amarillo') {
                            urlImage = this.takeIcon('Naranja');
                            colorColum = '#fffa58';
                        }
                        if (Estado == 'naranja') {
                            urlImage = this.takeIcon("Fresa");
                            colorColum = '#ff8cc7';
                        }
                        if (Estado == 'rojo') {
                            urlImage = this.takeIcon("Fresa");
                            colorColum = '#ff8cc7';
                        }
                    }
                    var fecha = new Date(arrayHistory[index]['fecha']);
                    fecha = fecha.toLocaleDateString();
                    charRow['Label' + index] = fecha;
                    charRow['valueC' + index] = arrayHistory[index]['valor_psicoemocional'];
                    charRow['ToolTip' + index] = arrayHistory[index]['area_psicoemocional'];
                    charRow['columColor' + index] = colorColum//opcional 
                    charRow['img' + index] = urlImage;
                    charRow['grado'] = arrayHistory[index]['grado'];

                }
            }
            //console.log(charRow)
            ChartArry.push(charRow);
        }
        DrawMultiColumChart(ChartArry, Container.id, titulo);
    }
    takeIcon(Estado){
        const imgGreen = "data:image/png;base64,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";
        const imgMag = "data:image/png;base64,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";
        const imgNar = "data:image/png;base64,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";
        if (Estado == 'Verde') {
            return imgGreen;
        }
        if (Estado == 'Naranja') {
          return imgNar;
        }
        if (Estado == 'Fresa') {
           return imgMag;
        }
    }
}
customElements.define("w-expediente", Expediente);