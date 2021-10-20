import { HomeClass } from "./Views/Home.js";
import { WCssClass } from "./WDevCore/WModules/WStyledRender.js";
import { WRender, WAjaxTools } from "./WDevCore/WModules/WComponentsTools.js";
const OnLoad = async () => {
    //const { WRender, WAjaxTools } = await import("./WDevCore/WModules/WComponentsTools.js");
    const response =  await WAjaxTools.PostRequest("api/Investigaciones/TakeInvestigaciones");    
    const modules = await import("./MasterDomDetaills.js");
    const DisplinesList = WRender.createElement({ type: 'div', props: { class: 'DisciplineClass' } });
    DisplinesList.appendChild(AppStyle);
    DisplinesList.append(WRender.CreateStringNode("<h3 class='HeaderDis'>Mapa de Conocimiento</h3>"));
    DisplinesList.append(WRender.createElement({ type:'img', props: { src: MapIcon, class: 'MapIcon',onclick: async ()=>{
        window.location = "./Views/KnowledgeMap.html"
    }}}));
    DisplinesList.append(WRender.CreateStringNode("<h3 class='HeaderDis'>Disciplinas</h3>"));
    response[1].forEach(element => {
        if (element.icono == null) {
            return;
        }
        DisplinesList.appendChild(WRender.createElement({
            type: 'div', props: {
                style: 'background:' + element.color, onclick: async () => {
                    console.log(element)
                }
            }, children: [
                element.descripcionDisciplina,
                { type: 'img', props: { src: 'data:image/png;base64,' + element.icono, class: 'img' } }
            ]
        }));
    });
    const BodyComponents = new modules.MasterDomDetaills(new HomeClass(response[0]), DisplinesList);
    App.appendChild(WRender.createElement(BodyComponents));

}
const AppStyle = WRender.createElement({
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`.DisciplineClass`, {
                display: 'flex',
                "flex-direction": "column"
            }), new WCssClass(`.DisciplineClass div`, {
                display: 'flex',
                "justify-content": "space-between",
                padding: "5px 15px",
                "border-radius": 10,
                filter: "invert(100%)",
                "background-color": "#999",
                margin: "5px 10px",
                cursor: "pointer",
                "font-weight": "500",
            }), new WCssClass(`.DisciplineClass .img`, {
                height: 18,
                width: 18
            }), new WCssClass(`.HeaderDis`, {
                "color": "#888",
                "font-size": "18px",
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
                margin: 10, 
                "font-weight": "400",
            }), new WCssClass( `.MapIcon`, {
                height: 40,
                width: 40,
                margin: "auto",
                cursor: "pointer"
            }),
        ]
    }
})
const MapIcon = "data:image/png;base64,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";
window.onload = OnLoad;