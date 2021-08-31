import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
//#region  GENERIC STYLESSS#####################################################################################
const StyleScrolls = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass("*::-webkit-scrollbar-thumb", {
                "background": " #ccc",
                "border-radius": " 4px",
            }),
            new WCssClass("*::-webkit-scrollbar-thumb:hover", {
                "background": " #b3b3b3",
                "box-shadow": " 0 0 3px 2px rgba(0, 0, 0, 0.2)",
            }),
            new WCssClass("*::-webkit-scrollbar-thumb:active ", {
                "background-color": " #999999",
            }),

            new WCssClass("*::-webkit-scrollbar ", {
                "width": " 8px",
                "height": " 10px",
                "margin": " 10px",
            }),

            new WCssClass("*::-webkit-scrollbar-track ", {
                "background": " #e1e1e1",
                "border-radius": " 4px",
            }),
            new WCssClass("*::-webkit-scrollbar-track:active ,*::-webkit-scrollbar-track:hover", {
                "background": " #d4d4d4",
            })
        ]
    }
};
//#endregion ##################################################################################################
//#region WARTICLESTYLE #######################################################################################
const WArticleStyle = {
    type: 'div',
    props: { id: '', style: 'display: none' },
    children: [
        StyleScrolls,
    ]
}
//#endregion  #################################################################################################
export { WArticleStyle }