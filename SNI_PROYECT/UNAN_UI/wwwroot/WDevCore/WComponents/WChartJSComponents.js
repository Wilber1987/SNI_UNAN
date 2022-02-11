import { WRender, WArrayF } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";

class ChartConfig {
    TypeChart = 0;
    Dataset = [];
    Colors = [];
    ColumnLabelDisplay = 0;
    AttNameEval = "series";
    EvalValue = "value";
    groupParams = [];
}
class ColumChart extends HTMLElement {
    constructor(ChartInstance = (new ChartConfig())) {
        super();
        this.ChartInstance = ChartInstance;
        this.GroupsData = [];
        this.ProcessData = [];
        this.IconsGroupColores = ["#c39c10", "#ab5", "#285a76", "#4640a3", "#8640a3"]
        this.MainChart = { type: "section", props: { class: "SectionBars" }, children: [] };
        this.attachShadow({ mode: "open" });
    }
    attributeChangedCallBack() {
        this.DrawChart();
    }
    connectedCallback() {
        //console.log("conected");
        this.shadowRoot.innerHTML = "";
        this.MainChart.children = [];
        this.GroupsData = [];
        this.groupParams = this.ChartInstance.groupParams ?? [];
        this.EvalValue = this.ChartInstance.EvalValue ?? null;
        this.AttNameEval = this.ChartInstance.AttNameEval ?? null;
        this.Dataset = this.ChartInstance.Dataset ?? [];
        this.ChartInstance.Colors = this.ChartInstance.Colors ?? [];
        if (this.ChartInstance.TypeChart == "staked") {// bar or staked
            this.ChartInstance.DirectionChart = "column";
        } else if (this.ChartInstance.TypeChart == "Line") {// bar or staked
            this.ChartInstance.DirectionChart = "row";
        } else {
            this.ChartInstance.DirectionChart = "row";
        }
        this.DrawChart();
    }
    DrawChart() {
        this.shadowRoot.append(WRender.createElement(WChartStyle(this.ChartInstance)));
        const object = {};
        if (this.ChartInstance.DirectionChart = "row") {
            object[this.AttNameEval] = "";
        }
        this.groupParams.forEach(element => {
            object[element] = "";
        });
        this.Totals = WArrayF.ArrayUniqueByObject(this.ChartInstance.Dataset, object, this.EvalValue);
        this.MaxVal = WArrayF.MaxValue(this.Totals, this.EvalValue);
        this.MinVal = WArrayF.MinValue(this.Totals, this.EvalValue);
        this.EvalArray = WArrayF.ArrayUnique(this.ChartInstance.Dataset, this.AttNameEval);
        let ChartFragment = WRender.createElement({ type: 'div', props: { id: '', class: 'WChartContainer' } });
        ChartFragment.append(this.DrawSeries(this.EvalArray, this.ChartInstance.Colors));
        const SectionBars = WRender.createElement(this._AddSectionBars());
        ChartFragment.append(SectionBars);
        ChartFragment.append(this.DrawGroups());
        this.shadowRoot.append(ChartFragment);
        if (this.ChartInstance.TypeChart == "Line") {
            SectionBars.append(this.DrawLineChart(this.EvalArray, this.ChartInstance.Colors, ChartFragment));
        }
    }
    _AddSectionBars(Dataset = this.Dataset) {
        this.groupParams.forEach(groupParam => {
            let object = {};
            object[groupParam] = "";
            this.GroupsData.push(WArrayF.ArrayUniqueByObject(Dataset, object))
        });
        return this.DrawGroupBars(this.ChargeGroup(this.GroupsData));
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
    DrawGroupBars = (Groups, div = this.MainChart, arrayP = {}, GroupIndex = 0) => {
        if (Groups == null) {
            return "";
        }
        Groups.data.forEach((Group) => {
            let trGroup = { type: "GroupSection", props: { class: "GroupSection" }, children: [WArrayF.Capitalize(Group[Groups.groupParam])] };
            let groupBar = { type: "containerbar", props: { style: "padding:0px", class: "ContainerBars" }, children: [] };
            if (GroupIndex == 0) {
                trGroup.children.push(this._DrawBackgroundLine(this.MaxVal, null, this.ChartInstance.ColumnLabelDisplay));
                trGroup.children.push(this._DrawIconsGroups());
            }
            GroupIndex++;
            arrayP[Groups.groupParam] = Group[Groups.groupParam];
            if (Groups.children != null) {
                if (Groups.children.children == null) {
                    trGroup.props.class = "GroupSection";
                }
                this.DrawGroupBars(Groups.children, groupBar, arrayP, GroupIndex);
            } else {
                trGroup.type = "groupbar";
                trGroup.props.class = "groupBars";
                groupBar.props.style = "height: 180px";
                groupBar.children.push(this._DrawBackgroundLine(this.MaxVal, null, this.ChartInstance.ColumnLabelDisplay, false));
                if (this.EvalArray != null) {
                    let index = 0;
                    this.EvalArray.forEach(Eval => {
                        arrayP[this.AttNameEval] = Eval[this.AttNameEval];
                        const Data = this.FindData(arrayP);
                        //if (Data != "n/a") {
                        groupBar.children.push(this.DrawBar(Data, this.ChartInstance, index, arrayP[this.AttNameEval]));
                        //}
                        index++;
                    });
                }
            }
            trGroup.children.push(groupBar);
            div.children.push(trGroup);
        });
        return div;
    }
    DrawSeries(GroupLabelsData, Colors) {
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
                Colors.push(GenerateColor());
            }
            SectionLabels.appendChild(WRender.CreateStringNode(
                `<label style="${style}"><span style="background:${Colors[index]}">
                </span>${element[this.AttNameEval]}</label>`
            ));
            index++;
        })
        return SectionLabels;
    }
    DrawBar(DataValue, Config, index, SerieName = "") {
        var Size = Config.ContainerSize;
        var Size = 180;
        var BarSize = DataValue == "n/a" ? 0 : ((DataValue - this.MinVal) / (this.MaxVal + 10  - this.MinVal)); //% de tamaño
        var labelCol = DataValue;
        var styleP = "";
        if (Config.ColumnLabelDisplay == 1) {
            //dibujar el valor en porcentaje
            styleP = ";flex-grow: 1;"
            var multiplier = Math.pow(10, 1 || 0);
            var number = labelCol / total[Config.EvalValue] * 100
            number = Math.round(number * multiplier) / multiplier
            labelCol = number + '%';
        }
        var Bars = WRender.CreateStringNode(`<Bars class="Bars"
                name="${SerieName.replaceAll(" ", "_")}"
                style="${styleP}height:${Size * BarSize}px;background:${Config.Colors[index]}">
                <label>
                    ${labelCol}
                </labe>
            </Bars>`);
        if (this.ChartInstance.TypeChart == "Line") {
            WRender.SetStyle(Bars, {
                margin: "0px 10px",
                //opacity: 0
            });
        }
        return Bars;
    }
    _DrawBackgroundLine(value, size = 600, ValP, label = true) {
        //console.log(value)
        var countLine = 8;
        var val  = parseFloat((value + 10 - this.MinVal) / countLine);
        console.log( value, this.MinVal);
        //%
        //countLine = 7
        if (ValP == 1) {
            countLine = 7
            //var value = parseInt(value / 10) * 10 + 10;
            val = 7;
        }
        var ContainerLine = document.createElement('section');
        ContainerLine.className = "BackGrounLineX";
        var valueLabel = this.MinVal;

        for (let index = 0; index < countLine; index++) {
            if (label) {
                ContainerLine.className = "BackGrounLineX BackGrounLineXNumber";
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
            } else {
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

        }
        return ContainerLine;
    }
    _DrawIconsGroups = () => {
        const IconsGroup = WRender.createElement({ type: 'div', props: { id: '', class: 'IconsGroup' } })
        this.groupParams.forEach((element, index) => {
            IconsGroup.append(WRender.CreateStringNode(`<div class='IconG' 
            style='background: ${this.IconsGroupColores[index]}'>
            <div/>`));
        });
        return IconsGroup;
    }
    DrawGroups() {
        var SectionLabelGroup = document.createElement('section');
        SectionLabelGroup.className = "SectionLabelGroup";
        this.groupParams.forEach((element, index) => {
            SectionLabelGroup.appendChild(WRender.CreateStringNode(
                `<label><span class="IconG" style="background:${this.IconsGroupColores[index]}"></span>${element}</label>`
            ));
        });
        return SectionLabelGroup;
    }
    FindData(arrayP) {
        let nodes = this.Totals.find(Data => WArrayF.compareObj(arrayP, Data));
        if (nodes) {
            return nodes[this.EvalValue];
        } else {
            return "n/a";
        }
    }
    DrawLineChart = (GroupLabelsData, Colors, ChartFragment) => {
        //this.MainChart.querySelector
        const LineChart = WRender.createElementNS({
            type: "svg",
            props: {
                style: "position:absolute; top: 0; width:100%; height: 100%"
            }
        });
        var index = 0
        var style = "";
        const BarContainers = ChartFragment.querySelectorAll(`groupbar`);
        BarContainers.forEach(groupBar => {
            //console.log(groupBar);
            //console.log((groupBar.parentNode.offsetWidth - 50) / BarContainers.length);
            //console.log(groupBar.style);
            groupBar.style.width = ((groupBar.parentNode.offsetWidth - 50) / BarContainers.length) + "px";
            WRender.SetStyle(groupBar.querySelector("containerbar"), {
                justifyContent: "center",
            });
        });
        GroupLabelsData.forEach(element => {
            var color = Colors[index];
            if (!color) {
                Colors.push(GenerateColor());
            }
            const serie = element[this.AttNameEval].replaceAll(" ", "_");
            const bars = ChartFragment.querySelectorAll(`bars[name=${serie}]`);
            const Path = WRender.createElementNS({
                type: "path",
                props: {
                    id: "path_" + serie,
                    name: serie,
                    class: "PathLine",
                    stroke: color,
                    "fill-opacity": 0,
                    "stroke-width": 3,
                    // d: `${M00} ${DPropiety}  m 0 0 z`
                },
            });
            LineChart.append(Path);
            setTimeout(() => {
                LineChart.querySelectorAll(`path[name=${serie}]`).forEach(path => {
                    let M00 = "";
                    let DPropiety = "";
                    let ABar = null;
                    bars.forEach((bar, IndexBars) => {
                        let Cx = 0;
                        if (IndexBars == 0) {
                            M00 = `M ${bar.offsetLeft - 40} ${bar.offsetTop + 2} `
                            DPropiety = DPropiety + ` l 0 0`;
                            Cx = bar.offsetLeft - 40;
                        } else {
                            Cx = bar.offsetLeft - 40;
                            DPropiety = DPropiety + ` l ${bar.offsetLeft - ABar.offsetLeft
                                } ${bar.offsetTop - ABar.offsetTop} `;
                        }
                        ABar = bar;
                        let Circle = WRender.createElementNS({
                            type: "circle",
                            props: {
                                class: "circleLineChart",
                                cx: Cx,
                                cy: bar.offsetTop + 2,
                                r: 5,
                                "stroke-width": 10,
                                fill: color
                            },
                        });
                        LineChart.append(Circle);
                    });
                    path.setAttribute("d", `${M00} ${DPropiety}  m 0 0 z`)
                    //console.log(`${M00} ${DPropiety}  m 0 0 z`);
                });
            }, 10);
            index++;
        });
        return LineChart;
    }

}
class RadialChart extends HTMLElement {
    constructor(ChartInstance = (new ChartConfig())) {
        super();
        this.attachShadow({ mode: "open" });
        this.ChartInstance = ChartInstance;
    }
    attributeChangedCallBack() {
        this.DrawChart();
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }
        this.shadowRoot.append(WRender.createElement(WChartStyle(this.ChartInstance)));
        this.DrawChart();
    }
    DrawChart = async () => {
        if (!this.ChartInstance) {
            this.ChartInstance = new ChartConfig(this.data);
        }
        let ChartFragment = document.createElement("div");
        ChartFragment.className = "WChartContainer";
        if (this.ChartInstance.Title) {
            ChartFragment.append(this._AddSectionTitle(this.ChartInstance.Title));
        }
        ChartFragment.append(
            this.DrawSeries(
                this.ChartInstance.Dataset,
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
    DrawSeries(GroupLabelsData, Colors) {
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
                Colors.push(GenerateColor());
            }
            SectionLabels.appendChild(WRender.CreateStringNode(
                `<label style="${style}"><span style="background:${Colors[index]}">
                </span>${element[this.ChartInstance.AttNameEval]}</label>`
            ));
            index++;
        })
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
        var total = WArrayF.SumValue(DataSet, Config.EvalValue);
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
            if (this.ChartInstance.ChartFunction) {
                Circle.onclick = () => {
                    this.ChartInstance.ChartFunction(element)
                }
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
const GenerateColor = () => {
    var hexadecimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    var color_aleatorio = "#FF";
    for (let index = 0; index < 4; index++) {
        const random = Math.floor(Math.random() * hexadecimal.length);
        color_aleatorio += hexadecimal[random]
    }
    return color_aleatorio
}
const WChartStyle = (ChartInstance) => {
    console.log(ChartInstance);
    return {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".WChartContainer ", {
                    "padding-left": " 30px",
                    "font-size": " 11px",
                    "border": " #d4d4d4 solid 1px",
                    "padding": " 20px",
                    "overflow": " hidden",
                    height: "calc(100% - 40px)",
                    display: "flex",
                    "justify-content": "center",
                    "flex-direction": "column",
                    "text-overflow": "ellipsis",
                    "white-space": "nowrap",
                    "max-height": 450,
                    position: "relative"
                }), new WCssClass(".SectionLabels, .SectionLabelGroup ", {
                    "display": " flex",
                    "justify-content": " center",
                    "align-items": " center",
                    "padding-top": " 5px",
                    "padding-bottom": " 5px",
                    "flex-wrap": " wrap",
                }), new WCssClass(".SectionLabels label, .SectionLabelGroup label ", {
                    "display": " flex",
                    "height": " 20px",
                    "justify-content": " center",
                    "align-items": " center",
                    "font-size": " 9px",
                }), new WCssClass(".SectionLabels label span, .SectionLabelGroup label span ", {
                    "min-height": " 20px",
                    "width": " 20px",
                    "content": '" "',
                    "border-radius": " 50%",
                    "display": " inline-flex",
                    "margin": " 5px",
                }), new WCssClass(".SectionBars", {
                    "display": " flex",
                    "align-items": " flex-end",
                    "overflow-y": " hidden",
                    "position": " relative",
                    "overflow-x": " scroll",
                    //padding: 10,
                    "padding-left": 40,
                    "min-height": 150,
                    //margin: "0px auto"
                }), new WCssClass(".SectionBars label", {
                    padding: 5,
                }), new WCssClass(".GroupSection ", {
                    "display": " flex",
                    "align-items": "center",
                    "height": " 100%",
                    //"position": " relative",
                    "flex-direction": "column-reverse",
                    "flex-grow": " 1",
                    "border-bottom": " solid 1px #d4d4d4",
                    //"border-right": " solid 1px #d4d4d4",
                    "border-top": " solid 1px #d4d4d4"
                }), new WCssClass(".groupBars ", {
                    width: "100%",
                    //width: 300,
                    //"height": " 180px",
                    "display": " flex",
                    "flex-direction": "column-reverse",
                    //"flex-grow": " 1",
                    "border-left": " solid 1px #d4d4d4",
                    "align-items": "center",
                    position: ChartInstance.TypeChart == "Line" ? "initial" : "relative"
                }), new WCssClass(".ContainerBars ", {
                    "display": " flex",
                    "width": " 100%",
                    //"padding-left": " 10px",
                    //"padding-right": " 10px",
                    "flex-direction": ChartInstance.DirectionChart,
                    "align-items": " flex-end",
                    "justify-content": "flex-end",
                    overflow: "hidden",
                    "border-bottom": "1px solid #BFBFBF",
                }), new WCssClass(".ContainerBars .Bars ", {
                    "display": " block",
                    "margin": " 0 auto",
                    //"align-self": "center",
                    "margin-top": " 0px",
                    "z-index": " 1",
                    "width": ChartInstance.TypeChart == "Line" ? 1 : 30,
                    //"min-height": " 20PX",
                    //"min-width": 10,
                    "background": " rgb(177, 177, 177)",
                    "background": " linear-gradient(0deg, rgba(177, 177, 177, 1) 0%, rgba(209, 209, 209, 1) 53%)",
                }), new WCssClass(".Bars label ", {
                    "width": " 100%",
                    "text-align": " center",
                    "display": " block",
                    "font-size": " 8px",
                    "margin-top": " 5px",
                    "font-weight": " bold",
                    "overflow": " hidden",
                    "text-overflow": "hidden",
                    padding: 0
                }), new WCssClass(".BackGrounLineX ", {
                    "display": " flex",
                    "position": " absolute",
                    "flex-direction": " column-reverse",
                    "width": " 100%",
                    "height": " 100%",
                    "left": " 0px",
                    "top": 0,
                    "height": " 180px",
                    "right": " 0px",
                }), new WCssClass(".groupBars .BackGrounLineXNumber ", {
                    "left": ChartInstance.TypeChart == "Line" ? 0 : -40 ,
                }),
                new WCssClass(".groupBars .IconsGroup ", {
                    "left": " -25px",
                }), new WCssClass(".CharLineX ", {
                    "position": " relative",
                    "border-top": " rgb(190, 190, 190) solid 1px",
                    "height": " 100%",
                    "display": " block",
                    "align-items": " flex-start",
                    "display": " flex",
                    "padding-left": " 5PX",
                }), new WCssClass(".CharLineXNumber ", {
                    "position": " relative",
                    "border-top": " rgba(190, 190, 190, 0) solid 1px",
                    "height": " 100%",
                    "align-items": " flex-start",
                    "display": " flex",
                    "font-size": " 9px",
                }), new WCssClass(".CharLineXNumber label", {
                    padding: 0,
                    "padding-top": 5,
                    width: 35,
                    display: "block",
                    "text-align": "right",
                    "padding-right": 5
                }), new WCssClass(".SectionBars::-webkit-scrollbar-thumb", {
                    "background": " #ccc",
                    "border-radius": " 4px",
                }), new WCssClass(".SectionBars::-webkit-scrollbar-thumb:hover", {
                    "background": " #b3b3b3",
                    "box-shadow": " 0 0 3px 2px rgba(0, 0, 0, 0.2)",
                }), new WCssClass(".SectionBars::-webkit-scrollbar-thumb:active ", {
                    "background-color": " #999999",
                }), new WCssClass(".SectionBars::-webkit-scrollbar ", {
                    "width": " 8px",
                    "height": " 10px",
                    "margin": " 10px",
                }), new WCssClass(".SectionBars::-webkit-scrollbar-track ", {
                    "background": " #e1e1e1",
                    "border-radius": " 4px",
                }), new WCssClass(".SectionBars::-webkit-scrollbar-track:active ,.SectionBars::-webkit-scrollbar-track:hover", {
                    "background": " #d4d4d4",
                }), new WCssClass(`.IconsGroup`, {
                    "display": " flex",
                    "position": " absolute",
                    //"justify-content": "space-between",
                    "flex-direction": " column-reverse",
                    "width": " 100%",
                    "height": " 100%",
                    "left": 15,
                    "border-bottom": 0,
                    "right": 0,
                }), new WCssClass(`.IconG`, {
                    height: 20,
                    width: 20,
                    margin: 1,
                    "border-radius": "4px !important"
                }), new WCssClass(`.circleLineChart`, {
                    cursor: "pointer",
                    //"-webkit-filter": "drop-shadow( 0px 0px 1px rgba(0, 0, 0, .7))",
                    //filter: "drop-shadow( 0px 0px 1px rgba(0, 0, 0, .7))"
                }), new WCssClass(`.PathLine`, {
                    transition: 'all 1s',
                    "stroke-dasharray": "1000",
                    "stroke-dashoffset": "0",
                    animation: "dash 1s linear"

                }),
                /*RADIALLLLL------------------------------------------------------------------------------------------------------*/
                //#region RADIALLLLL
                new WCssClass(".SectionRadialChart ", {
                    "position": " relative",
                    "text-align": " center",
                    "display": " block",
                    "width": " 100%",
                    "height": 220,
                }), new WCssClass(".RadialDataBackground ", {
                    "transform": " rotate(-90deg)",
                }), new WCssClass(".RadialDataBackground:first-child ", {
                    "margin-bottom": " 20px",
                }), new WCssClass(".RadialData ", {
                    "height": " 200px",
                    "width": " 200px",
                    "border-radius": " 50%",
                    "display": " block",
                    "position": " absolute",
                    "top": " 0",
                    "left": " calc(50% - 100px)",
                    "margin": " auto",
                }), new WCssClass(".RadialData::before ", {
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
                }), new WCssClass(".RadialData::after ", {
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
                }), new WCssClass(".RadialChart ", {
                    "height": " 100%",
                }), new WCssClass(".circle ", {
                    "transition": " all 0.5s",
                    "transform-origin": " 50% 50%",
                    "fill": " none",
                    "cursor": " pointer",
                    "clip-path": " circle(50% at 50% 50%)",
                }), new WCssClass(".circleText ", {
                    "transition": " all 0.5s",
                    "height": " 100%",
                    "width": " 100%",
                    "transform-origin": " 50% 50%",
                }), new WCssClass(".circle:hover", {
                    "background-color": " #999999",
                    "background-blend-mode": " screen",
                    "z-index": " 5",
                    "clip-path": " circle(52% at 50% 50%)",
                }), new WCssClass(".progress__meter,.progress__value ", {
                    "fill": " none",
                }), new WCssClass(".progress__meter ", {
                    "stroke": " #e6e6e6",
                }),
                //#endregion RADIAL
            ], KeyFrame: [
                { animate: "dash", ClassList: [
                    new WCssClass( `from`, {
                        "stroke-dashoffset": "1000"
                    }), new WCssClass( `to`, {
                        "stroke-dashoffset": "0"
                    }),
                ]  }
            ]
        }
    };
}

customElements.define("w-radial-chart", RadialChart);
customElements.define("w-colum-chart", ColumChart);
export { RadialChart, ColumChart }