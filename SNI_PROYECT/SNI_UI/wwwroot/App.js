import { HomeClass } from "./Views/Home.js";
import { WCssClass } from "./WDevCore/WModules/WStyledRender.js";
const OnLoad = async () => {
    const { WRender, WAjaxTools } = await import("./WDevCore/WModules/WComponentsTools.js");
    const response = await WAjaxTools.PostRequest("api/Investigaciones/TakeInvestigaciones");
    const modules = await import("./MasterDomClass.js");
    const DisplinesList = WRender.createElement({ type: 'div', props: { class: 'DisciplineClass' } });
    DisplinesList.appendChild(WRender.createElement({
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
                    "font-weight": "bold"
                }), new WCssClass(`.DisciplineClass img`, {
                    height: 18,
                    width: 18
                }), new WCssClass(`.HeaderDis`, {
                    "color": "#444",
                    "font-size": "22px",
                    "display": "flex",
                    "justify-content": "center",
                    "align-items": "center",
                    margin: 10
                }),
            ]
        }
    }));
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
                { type: 'img', props: { src: 'data:image/png;base64,' + element.icono, class: 'className' } }
            ]
        }));
    });
    const BodyComponents = new modules.MasterDomClass(new HomeClass(response[0]), DisplinesList);
    App.appendChild(WRender.createElement(BodyComponents));

}

window.onload = OnLoad;