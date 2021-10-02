import { WRender, WArrayF } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";

class ChartConfig {
    constructor(Config) {
        this.ContainerName = Config.ContainerName;
        this.Title = Config.Title;
        this.AttNameEval = Config.AttNameEval;
        this.EvalValue = Config.EvalValue;
        this.AttNameG1 = Config.AttNameG1;
        this.AttNameG2 = Config.AttNameG2;
        this.AttNameG3 = Config.AttNameG3;
        this.GroupLabelsData = Config.GroupLabelsData; //series
        this.Dataset = Config.Dataset; //datos        
        this.Colors = Config.Colors;
        this.GroupDataTotals = Config.GroupDataTotals;
        this.ContainerSize = Config.ContainerSize;
        this.ColumnLabelDisplay = Config.ColumnLabelDisplay;
        this.TypeChart = Config.TypeChart;
    }
}
class ColumChart extends HTMLElement {
    constructor(props) {
        super();
        this.attachShadow({ mode: "open" });
    }
    attributeChangedCallBack() {
        this.DrawChart();
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }
        this.ChartInstance = new ChartConfig(this.data);
        if (this.ChartInstance.TypeChart == undefined) {// bar or staked
            this.ChartInstance.TypeChart = "row";
        }else if (this.ChartInstance.TypeChart == "staked"){
            this.ChartInstance.TypeChart = "column";
        }else {
            this.ChartInstance.TypeChart = "row";
        }
        this.shadowRoot.append(WRender.createElement(WChartStyle(this.ChartInstance)));
        this.DrawChart();
    }
    DrawChart() {
        this.Totals = WArrayF.DataTotals(this.ChartInstance);
        this.MaxVal = WArrayF.MaxValue(this.Totals, this.ChartInstance);
        let ChartFragment = document.createElement("div");
        ChartFragment.className = "WChartContainer";
        ChartFragment.append(this._AddSectionTitle(this.ChartInstance.Title));
        ChartFragment.append(this._AddSectionlabels(this.ChartInstance.GroupLabelsData, this.ChartInstance.Colors));

        let GroupsData = [
            this.ChartInstance.Dataset,
            WArrayF.ArrayUnique(this.ChartInstance.Dataset, this.ChartInstance.AttNameG1),
            WArrayF.ArrayUnique(this.ChartInstance.Dataset, this.ChartInstance.AttNameG2),
            WArrayF.ArrayUnique(this.ChartInstance.Dataset, this.ChartInstance.AttNameG3)
        ];
        ChartFragment.append(this._AddSectionBars(GroupsData, this.ChartInstance));
        ChartFragment.append(this._AddSectionLabelsGroups(this.ChartInstance));
        this.shadowRoot.append(ChartFragment);
    }
    _AddSectionTitle(Title) {
        // var Title = 
        /* sessionStorage.getItem('Title') + ' - ' 
        +sessionStorage.getItem('Indicador') 
        +ChartContainer.name;*/
        var SectionTitle = WRender.CreateStringNode(`<h3 style="font-size:18px; margin:0px">${Title}</h3>`);
        return SectionTitle;
    }
    _AddSectionlabels(GroupLabelsData, Colors) {
        var SectionLabels = document.createElement('section');
        var index = 0
        var style = "";
        if (GroupLabelsData.length > 7) {
            style = "font-size:8px;"
        }
        SectionLabels.className = "SectionLabels"
        GroupLabelsData.forEach(element => {
            var color = Colors[index];
            if (!color) {
                Colors.push(this.GenerateColor());
            }
            SectionLabels.appendChild(WRender.CreateStringNode(
                `<label style="${style}"><span style="background:${Colors[index]}">
                </span>${element.Descripcion}</label>`
            ));
            index++;
        })
        return SectionLabels;
    }
    _AddSectionBars(Groups, Config) {
        //console.log(Config)  
        const DataSet = Groups[0];
        const GroupDataset = Groups[1];
        const SecondGroupDataset = Groups[2];
        const ThreeGroupDataset = Groups[3];
        let SectionBars = document.createElement('section');
        SectionBars.className = "SectionBars";
        var count = 0;
        GroupDataset.forEach(elementGroup => {
            var GroupSection = document.createElement("GroupSection");
            GroupSection.className = "GroupSection";
            var groupBars = document.createElement("groupBar");
            groupBars.className = "groupBars";

            var groupLabels = document.createElement("span");
            var groupLabelsTwo = document.createElement("span");
            var groupLabelsThree = document.createElement("span");
            if (count == 0) {
                groupLabels = document.createElement("groupLabels");
                groupLabels.className = "groupLabels ElementG1";
            } else {
                groupLabels = document.createElement("groupLabels");
                groupLabels.className = "groupLabels";
            }
            if (SecondGroupDataset != null) {
                if (count == 0) {
                    groupLabelsTwo = document.createElement("groupLabelsTwo");
                    groupLabelsTwo.className = "groupLabels ElementG2";
                } else {
                    groupLabelsTwo = document.createElement("groupLabelsTwo");
                    groupLabelsTwo.className = "groupLabels";
                }
            }
            if (ThreeGroupDataset != null) {
                if (count == 0) {
                    groupLabelsThree = document.createElement("groupLabelsThree");
                    groupLabelsThree.className = "groupLabels ElementG3";
                } else {
                    groupLabelsThree = document.createElement("groupLabelsThree");
                    groupLabelsThree.className = "groupLabels";
                }
            }
            //CONSTRUCCCION DE DATOS   
            if (SecondGroupDataset != null) {
                SecondGroupDataset.forEach(elementSecondGroup => { //RECORREMOS la categoria SEGUNDA AGRUPACION                     
                    if (ThreeGroupDataset != null) {
                        ThreeGroupDataset.forEach(elementThreeGroup => { //RECORREMOS la categoria tercera AGRUPACION
                            var ContainerBars = document.createElement("ContainerBar");
                            ContainerBars.className = "ContainerBars";
                            this._DrawGroupChart(Config, ContainerBars, elementGroup, elementSecondGroup, elementThreeGroup);
                            groupBars.append(ContainerBars);
                            groupBars.append(this._DrawBackgroundLine(this.MaxVal, null, Config.ColumnLabelDisplay));
                            groupLabelsThree.append(WRender.CreateStringNode(`<label class="">
                                    ${elementThreeGroup[Config.AttNameG3]}
                                </label>`));
                        });

                    } else {
                        var ContainerBars = document.createElement("ContainerBar");
                        ContainerBars.className = "ContainerBars";
                        this._DrawGroupChart(Config, ContainerBars, elementGroup, elementSecondGroup);
                        groupBars.append(ContainerBars);
                        groupBars.append(this._DrawBackgroundLine(this.MaxVal, null, Config.ColumnLabelDisplay));
                    }
                    groupLabelsTwo.append(WRender.CreateStringNode(`<label class="">
                                ${elementSecondGroup[Config.AttNameG2]}
                            </label>`));
                })
            } else {
                var ContainerBars = document.createElement("ContainerBar");
                ContainerBars.className = "ContainerBars";
                this._DrawGroupChart(Config, ContainerBars, elementGroup);
                groupBars.append(ContainerBars);
                groupBars.append(this._DrawBackgroundLine(this.MaxVal, null, Config.ColumnLabelDisplay));
            }
            groupLabels.append(WRender.CreateStringNode(`<label class="">
                    ${elementGroup[Config.AttNameG1]}
                </labe>`));
            count++;
            GroupSection.append(groupBars, groupLabelsThree, groupLabelsTwo, groupLabels);
            SectionBars.append(GroupSection);
        })
        SectionBars.append(this._DrawBackgroundChart(this.MaxVal, null, Config.ColumnLabelDisplay));
        return SectionBars;
    }
    _DrawGroupChart(Config, ContainerBars, elementGroup = null, elementSecondGroup = null, elementThreeGroup = null) {
        let index = 0;
        Config.GroupLabelsData.forEach(elementLabelData => { //RECORREMOS LOS STAKS 
            Config.Dataset.forEach(element => { //RECORREMOS EL DTA EN BUSCA DEL TIEMPO Y EL STAK                
                let bar = null;
                if (elementThreeGroup != null) {
                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                        element[Config.AttNameEval] == elementLabelData.id_ &&
                        element[Config.AttNameG2] == elementSecondGroup[Config.AttNameG2] &&
                        element[Config.AttNameG3] == elementThreeGroup[Config.AttNameG3]) {
                        bar = this._DrawBar(element, Config, index);
                    }
                } else if (elementSecondGroup != null) {
                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                        element[Config.AttNameEval] == elementLabelData.id_ &&
                        element[Config.AttNameG2] == elementSecondGroup[Config.AttNameG2]) {
                        bar = this._DrawBar(element, Config, index);
                    }
                } else if (elementGroup != null) {
                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                        element[Config.AttNameEval] == elementLabelData.id_) {
                        bar = this._DrawBar(element, Config, index);
                    }
                }
                if (bar != null) {
                    ContainerBars.appendChild(bar);
                }
            }) //FIN DATA
            index++;

        });
    }
    _DrawBackgroundChart(value, size = 600, ValP) {
        var countLine = 0;
        var val = 0;
        var countLine = 0;
        var val = parseFloat(value / 10);
        //%
        countLine = 10
        if (ValP == 1) {
            countLine = 10
            //var value = parseInt(value / 10) * 10 + 10;
            val = 10;
        }
        var ContainerLine = document.createElement('section');
        ContainerLine.className = "BackGrounLineX";
        var valueLabel = 0;

        for (let index = 0; index < countLine; index++) {
            if (ValP == 1) {
                valueLabel = valueLabel + val;
                ContainerLine.appendChild(WRender.CreateStringNode(
                    `<path class="CharLineXNumber"><label>${valueLabel}%</label></path>`
                ));
            } else {
                valueLabel = valueLabel + val;
                ContainerLine.appendChild(WRender.CreateStringNode(
                    `<path class="CharLineXNumber"><label>${valueLabel.toFixed(1)}</label></path>`
                ));
            }

        }
        return ContainerLine;
    }
    _DrawBackgroundLine(value, size = 600, ValP) {
        //console.log(value)
        var countLine = 0;
        var val = parseFloat(value / 10);
        //%
        countLine = 10
        if (ValP == 1) {
            countLine = 10
            //var value = parseInt(value / 10) * 10 + 10;
            val = 10;
        }
        var ContainerLine = document.createElement('section');
        ContainerLine.className = "BackGrounLineX";
        var valueLabel = 0;

        for (let index = 0; index < countLine; index++) {
            if (ValP == 1) {
                valueLabel = valueLabel + val;
                ContainerLine.appendChild(WRender.CreateStringNode(
                    `<path class="CharLineX"></path>`
                ));
            } else {
                valueLabel = valueLabel + val;
                ContainerLine.appendChild(WRender.CreateStringNode(
                    `<path class="CharLineX"></path>`
                ));
            }
        }
        return ContainerLine;
    }
    _DrawBar(element, Config, index) {
        //console.log(element)
        var Size = Config.ContainerSize;
        var Size = 180;
        var BarSize = (element[Config.EvalValue] / this.MaxVal); //% de tamaño
        var labelCol = element[Config.EvalValue];
        var styleP = "";
        if (Config.ColumnLabelDisplay == 1) {
            //dibujar el valor en porcentaje
            styleP = ";flex-grow: 1;"
            var total = WArrayF.FindInTotal(element, this.Totals, Config);
            var multiplier = Math.pow(10, 1 || 0);
            var number = labelCol / total[Config.EvalValue] * 100
            number = Math.round(number * multiplier) / multiplier
            labelCol = number + '%';
        }
        var Bars = WRender.CreateStringNode(`<Bars class="Bars" style="${styleP}height:${Size * BarSize}px;background:${Config.Colors[index]}">
                <label>
                    ${labelCol}
                </labe>
            </Bars>`);
        return Bars;
    }
    _AddSectionLabelsGroups(Config) {
        var SectionLabelGroup = document.createElement('section');
        SectionLabelGroup.className = "SectionLabelGroup";
        var color1 = " #70ad47";
        var AttNameG1 = sessionStorage.getItem('AttNameG1');
        SectionLabelGroup.appendChild(WRender.CreateStringNode(
            `<label><span style="background:${color1}"></span>${Config.AttNameG1}</label>`
        ));
        if (Config.AttNameG2) {
            var color1 = " #5b9bd5";
            var AttNameG1 = sessionStorage.getItem('AttNameG2');
            SectionLabelGroup.appendChild(WRender.CreateStringNode(
                `<label><span style="background:${color1}"></span>${Config.AttNameG2}</label>`
            ));
        }
        if (Config.AttNameG3) {
            var color1 = " #ffc000";
            var AttNameG1 = sessionStorage.getItem('AttNameG3');
            SectionLabelGroup.appendChild(WRender.CreateStringNode(
                `<label><span style="background:${color1}"></span>${Config.AttNameG3}</label>`
            ));
        }
        return SectionLabelGroup;
    }
    GenerateColor() {
        var hexadecimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        var color_aleatorio = "#FF";
        for (let index = 0; index < 4; index++) {
            const random = Math.floor(Math.random() * hexadecimal.length);
            color_aleatorio += hexadecimal[random]
        }
        return color_aleatorio
    }
}
class RadialChart extends HTMLElement {
    constructor(props) {
        super();
        this.attachShadow({ mode: "open" });
    }
    attributeChangedCallBack() {
        this.DrawChart();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        this.shadowRoot.append(WRender.createElement(WChartStyle(this.ChartInstance)));
        this.DrawChart();
    }
    // DrawChart() {
    DrawChart = async () => {
        //const { WRender.createElementNS } = await
        //import ("../WModules/WComponents.js");
        this.ChartInstance = new ChartConfig(this.data);
        let ChartFragment = document.createElement("div");
        ChartFragment.className = "WChartContainer";
        ChartFragment.append(this._AddSectionTitle(this.ChartInstance.Title));
        ChartFragment.append(
            this._AddSectionlabels(
                this.ChartInstance.GroupLabelsData,
                this.ChartInstance.Colors
            )
        );
        ChartFragment.append(this._AddSectionData(this.ChartInstance, WRender.createElementNS));
        this.shadowRoot.append(ChartFragment);
    }
    _AddSectionTitle(Title) {
        var SectionTitle = WRender.CreateStringNode(
            `<h3 style="font-size:18px; margin:0px">${Title}</h3>`
        );
        return SectionTitle;
    }
    _AddSectionlabels(GroupLabelsData, Colors) {
        var SectionLabels = document.createElement("section");
        var index = 0;
        var style = "";
        if (GroupLabelsData.length > 7) {
            style = "font-size:8px;";
        }
        SectionLabels.className = "SectionLabels";
        GroupLabelsData.forEach((element) => {
            SectionLabels.appendChild(
                WRender.CreateStringNode(
                    `<label style="${style}"><span style="background:${Colors[index]}">
                   </span>${element.Descripcion}
            </label>`
                )
            );
            index++;
        });
        return SectionLabels;
    }
    _AddSectionData(Config) {
        const DataSet = Config.Dataset;
        let SectionChart = document.createElement("section");
        SectionChart.className = "SectionRadialChart";
        var Chart = WRender.createElementNS({
            type: "svg",
            props: {
                viewBox: "0 0 120 120",
            }
        });
        Chart.setAttribute("class", "RadialChart");
        var total = WArrayF.SumValue(DataSet, Config);
        var index = 0;
        var porcentajeF = 0;
        DataSet.forEach((element) => {
            let porcentaje = parseInt((element[Config.EvalValue] / total) * 100);
            let color = element.color;
            if (Config.Colors) {
                color = Config.Colors[index];
            }
            let Circle = WRender.createElementNS({
                type: "circle",
                props: {
                    class: "circle",
                    cx: 60,
                    cy: 60,
                    r: 54,
                    "stroke-width": "50",
                    stroke: color,
                    //"stroke-linecap": "round"
                },
            });
            //texto
            let degs = (360 * porcentajeF) / 100;
            let degs2 = (((360 * porcentaje) / 100) / 2) - 12;
            let TextSVG = WRender.createElementNS({
                type: "text",
                class: "circleText",
                props: {
                    x: 0,
                    y: 0,
                    fill: "#fff",
                    //"transform-origin": "60px 60px",
                    "dominant-baseline": "middle",
                    "text-anchor": "middle",
                    "font-size": "6",
                    transform: `translate(0,0),rotate(-${degs + (degs2)})`,
                }
            })
            if (Config.ColumnLabelDisplay == 0) {
                TextSVG.append(document.createTextNode(porcentaje + "%"));
            } else {
                TextSVG.append(document.createTextNode(element[Config.EvalValue]));
            }
            let g = WRender.createElementNS({
                type: "g",
                props: {
                    transform: `translate(100, 70), rotate(${degs + (degs2)})`,
                    "transform-origin": "-40px -10px"
                }
            });
            g.append(TextSVG);
            Circle.style.transform = "rotate(" + (360 * porcentajeF) / 100 + "deg)";
            porcentajeF = porcentajeF + porcentaje;
            if (index == DataSet.length - 1) {
                this.progressInitial(porcentaje, Circle, 4);
            } else {
                this.progressInitial(porcentaje, Circle);
            }
            Chart.append(Circle);
            Chart.append(g)
            index++;
        });
        SectionChart.append(Chart);
        var index = 0;
        return SectionChart;
    }
    progressInitial(value, circle, val = 0) {
        let RADIUS = 54;
        let Perimetro = 2 * Math.PI * RADIUS;
        circle.style.strokeDasharray = Perimetro;
        let progress = value / 100;
        let dashoffset = (Perimetro * (1 - progress)) - val;
        //console.log("progress:", value + "%", "|", "offset:", dashoffset);
        //console.log("perimetro:", Perimetro + "%", "|", "offset:", dashoffset);
        circle.style.strokeDashoffset = dashoffset;
    }
}
const WChartStyle = (ChartInstance) => {
    return {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".WChartContainer ", {
                    "padding-left": " 30px",
                    "font-size": " 12px",
                    "border": " #d4d4d4 solid 1px",
                    "padding": " 20px",
                    //"border-radius":" .4cm",
                    "max-height": " 500px !important",
                    "min-height": " 400px !important",
                    "overflow": " hidden",
                }),
                new WCssClass(".WChartContainer h3 ", {                    
                    "text-align": " center",
                    "display": " block",
                    "font-size": " 16px",
                }),
                new WCssClass(".SectionLabels, .SectionLabelGroup ", {
                    "display": " flex",
                    "justify-content": " center",
                    "align-items": " center",
                    "padding-top": " 5px",
                    "padding-bottom": " 5px",
                    "flex-wrap": " wrap",
                }),
                new WCssClass(".SectionLabels label, .SectionLabelGroup label ", {
                    "display": " flex",
                    "height": " 20px",
                    "justify-content": " center",
                    "align-items": " center",
                    "font-size": " 9px",
                }),
                new WCssClass(".SectionLabels label span, .SectionLabelGroup label span ", {
                    "min-height": " 20px",
                    "width": " 20px",
                    "content": '" "',
                    "border-radius": " 50%",
                    "display": " inline-flex",
                    "margin": " 5px",
                }),
                new WCssClass(".SectionBars ", {
                    "display": " flex",
                    "align-items": " flex-end",
                    "overflow-y": " hidden",
                    "padding-left": " 30px",
                    "position": " relative",
                    "overflow-x": " scroll",
                    //"min-height": " 270px",
                }),
                new WCssClass(".GroupSection ", {
                    "display": " flex",
                    "align-items": " flex-end",
                    "height": " 80%",
                    "border-bottom": " 3px rgb(155, 155, 155) solid",
                    "position": " relative",
                    "flex-direction": " column",
                    "flex-grow": " 1",
                }),
                new WCssClass(".groupBars ", {
                    "width": " 100%",
                    "height": " 180px",
                    "display": " flex",
                    "flex-grow": " 1",
                    "border": " solid 1px #d4d4d4",
                }),
                new WCssClass(".groupLabels ", {
                    "display": " flex",
                    "width": " 100%",
                    "border": " solid 1px #d4d4d4",
                    "align-items": " stretch",
                    "background-color": " #fff",
                }),
                new WCssClass(".groupLabels label ", {
                    "padding": " 5px",
                    "flex-grow": " 1",
                    "width": " 80px",
                    "text-align": " center",
                    "margin-bottom": " 0px !important",
                    "white-space": " nowrap",
                    "overflow": " hidden",
                    "text-overflow": " ellipsis",
                }),

                new WCssClass(".ContainerBars ", {
                    "display": " flex",
                    "width": " 100%",
                    "padding-left": " 10px",
                    "padding-right": " 10px",
                    "flex-direction": ChartInstance.TypeChart,
                    "align-items": " flex-end",
                    "justify-content": " flex-end",
                    overflow: "hidden",
                    "border-right": "1px solid #BFBFBF"
                }),

                new WCssClass(".ContainerBars .Bars ", {
                    "display": " block",
                    "margin": " 0 auto",
                    "margin-top": " 0px",
                    "z-index": " 1",
                    "width": " 60px",
                    "min-height": " 20PX",
                    "background": " rgb(177, 177, 177)",
                    "background": " linear-gradient(0deg, rgba(177, 177, 177, 1) 0%, rgba(209, 209, 209, 1) 53%)",
                }),
                new WCssClass(".Bars label ", {
                    "width": " 100%",
                    "text-align": " center",
                    "display": " block",
                    "font-size": " 11px",
                    "margin-top": " 5px",
                    "font-weight": " bold",
                    "overflow": " hidden",
                }),
                new WCssClass(".BackGrounLineX ", {
                    "display": " flex",
                    "position": " absolute",
                    "flex-direction": " column-reverse",
                    "width": " 100%",
                    "height": " 100%",
                    "left": " 0px",
                    "top": " 0px",
                    "height": " 180px",
                    "right": " 0px",
                }),

                new WCssClass(".CharLineX ", {
                    "position": " relative",
                    "border-top": " rgb(190, 190, 190) solid 1px",
                    "height": " 100%",
                    "display": " block",
                    "align-items": " flex-start",
                    "display": " flex",
                    "padding-left": " 5PX",
                }),

                new WCssClass(".CharLineXNumber ", {
                    "position": " relative",
                    "border-top": " rgba(190, 190, 190, 0) solid 1px",
                    "height": " 100%",
                    "align-items": " flex-start",
                    "display": " flex",
                    "font-size": " 9px",
                }),

                new WCssClass(".ElementG1::before", {
                    "height": " 25px",
                    "width": " 25px",
                    "background-color": " #70ad47",
                    "content": '" "',
                    "position": " absolute",
                    "left": " -30px",
                    "border-radius": " 0.15cm",
                }),

                new WCssClass(".ElementG2::before", {
                    "height": " 25px",
                    "width": " 25px",
                    "background-color": " #5b9bd5",
                    "content": '" "',
                    "position": " absolute",
                    "left": " -30px",
                    "border-radius": " 0.15cm",
                }),
                new WCssClass(".ElementG3::before ", {
                    "height": " 25px",
                    "width": " 25px",
                    "background-color": " #ffc000",
                    "content": '" "',
                    "position": "absolute",
                    "left": " -30px",
                    "border-radius": " 0.15cm",
                }),
                new WCssClass(".SectionBars::-webkit-scrollbar-thumb", {
                    "background": " #ccc",
                    "border-radius": " 4px",
                }),
                new WCssClass(".SectionBars::-webkit-scrollbar-thumb:hover", {
                    "background": " #b3b3b3",
                    "box-shadow": " 0 0 3px 2px rgba(0, 0, 0, 0.2)",
                }),
                new WCssClass(".SectionBars::-webkit-scrollbar-thumb:active ", {
                    "background-color": " #999999",
                }),

                new WCssClass(".SectionBars::-webkit-scrollbar ", {
                    "width": " 8px",
                    "height": " 10px",
                    "margin": " 10px",
                }),

                new WCssClass(".SectionBars::-webkit-scrollbar-track ", {
                    "background": " #e1e1e1",
                    "border-radius": " 4px",
                }),

                new WCssClass(".SectionBars::-webkit-scrollbar-track:active ,.SectionBars::-webkit-scrollbar-track:hover", {
                    "background": " #d4d4d4",
                }),

                new WCssClass(".Contenedor, .ContenedorPregs ", {
                    "display": " block",
                    "overflow": " initial",
                    "margin": " auto",
                    "margin-top": " 50px",
                    "background-color": " #fff",
                    "width": " 70%",
                    "max-height": " 800px",
                    "overflow-y": " initial",
                    "padding": " 20px",
                    "min-height": " 200px",
                    "border-radius": " 5px",
                }),


                /*RADIALLLLL------------------------------------------------------------------------------------------------------*/

                new WCssClass(".SectionRadialChart ", {
                    "position": " relative",
                    "text-align": " center",
                    "display": " block",
                    "width": " 100%",
                    "height": " 300px",
                }),

                new WCssClass(".RadialDataBackground ", {
                    "transform": " rotate(-90deg)",
                }),
                new WCssClass(".RadialDataBackground:first-child ", {
                    "margin-bottom": " 20px",
                }),
                new WCssClass(".RadialData ", {
                    "height": " 200px",
                    "width": " 200px",
                    "border-radius": " 50%",
                    "display": " block",
                    "position": " absolute",
                    "top": " 0",
                    "left": " calc(50% - 100px)",
                    "margin": " auto",
                }),

                new WCssClass(".RadialData::before ", {
                    "content": '" "',
                    "color": " #fff",
                    "height": " 200px",
                    "width": " 200px",
                    "border-radius": " 50%",
                    "display": " block",
                    "position": " absolute",
                    "top": " 0",
                    "left": " calc(50% - 100px)",
                    "margin": " auto",
                    "background": " linear-gradient( 90deg, rgb(12, 109, 148) 50%, rgba(255, 255, 55, 0) 50%)",
                }),

                new WCssClass(".RadialData::after ", {
                    "content": '" "',
                    "color": " #fff",
                    "height": " 200px",
                    "width": " 200px",
                    "border-radius": " 50%",
                    "display": " block",
                    "position": " absolute",
                    "top": " 0",
                    "left": " calc(50% - 100px)",
                    "margin": " auto",
                    "background": " linear-gradient( 180deg, rgb(12, 109, 148) 50%, rgba(255, 255, 55, 0) 50%)",
                }),

                new WCssClass(".RadialChart ", {
                    "height": " 100%",
                }),

                new WCssClass(".circle ", {
                    "transition": " all 0.5s",
                    "transform-origin": " 50% 50%",
                    "fill": " none",
                    "cursor": " pointer",
                    "clip-path": " circle(50% at 50% 50%)",
                }),

                new WCssClass(".circleText ", {
                    "transition": " all 0.5s",
                    "height": " 100%",
                    "width": " 100%",
                    "transform-origin": " 50% 50%",
                }),

                new WCssClass(".circle:hover", {
                    "background-color": " #999999",
                    "background-blend-mode": " screen",
                    "z-index": " 5",
                    "clip-path": " circle(52% at 50% 50%)",
                }),
                new WCssClass(".progress__meter,.progress__value ", {
                    "fill": " none",
                }),

                new WCssClass(".progress__meter ", {
                    "stroke": " #e6e6e6",
                }),
            ]
        }
    };
}
customElements.define("w-radial-chart", RadialChart);
customElements.define("w-colum-chart", ColumChart);