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
const StylesControlsV1 = {
    type: 'w-style', props: {
        id: '', ClassList: [
            //BOTONES
            new WCssClass(`.BtnAlert,.BtnPrimary, .BtnSuccess,.BtnSecundary,.Btn`, {
                "font-weight": "bold",
                "border": "none",
                "padding": "10px",
                "text-align": "center",
                "display": "inline-block",
                "min-width": "100px",
                "cursor": "pointer",
                "background-color": "#09f",
                "font-size": "12px",
                "color": "#fff",
                "border-right": "rgb(3, 106, 175) 5px solid",
            }), new WCssClass(`.BtnPrimary`, {
                "color": "#fff",
                "background-color": "007bff",
                "border-right": "rgb(3, 106, 175) 5px solid",
            }), new WCssClass(`.BtnAlert`, {
                "color": "#fff",
                "background-color": "#dc3545",
                "border-right": "#7e1b25 5px solid",
            }), new WCssClass(`.BtnSuccess`, {
                "color": "#fff",
                "background-color": "#28a745",
                "border-right": "#165c26 5px solid",
            }), new WCssClass(`.BtnSecundary`, {
                "color": "#fff",
                "background-color": "#17a2b8",
                "border-right": "#0f5964 5px solid",
            }), new WCssClass(`.Btn[type=checkbox]`, {
                "height": "20px",
                "min-width": "20px",
                "margin": "5px",
            }), new WCssClass(`.BtnTable, .BtnTableA, .BtnTableS, .BtnTableSR`, {
                "font-weight": "bold",
                "border": "none",
                "padding": "5px",
                "margin": "2px",
                "text-align": "center",
                "display": "inline-block",
                "min-width": "30px",
                "font-size": "12px",
                "cursor": "pointer",
                "background-color": "#09f",
                "color": "#fff",
                //"border-right": "rgb(3, 106, 175) 5px solid",
            }), new WCssClass(`.BtnTableS`, {
                "background-color": "#106705",
                //"border-right": "#0a3e03 5px solid"
            }), new WCssClass(`.BtnTableSR`, {
                "background-color": "#ff8080",
                //"border-right": "#d86060 5px solid",
                width: "100%",
            }), new WCssClass(`.BtnTableA`, {
                "background-color": "#af0909",
                //"border-right": "#670505 5px solid"
            }),
            //INPUTS
            new WCssClass(`input[type=text], 
            input[type=string], 
            input[type=number],
            input[type=date]`, {
                padding: "8px",
                border: "none",
                "border-bottom": "3px solid #999999",
                width: "calc(100% - 16px)",
                "font-size": "15px",
                height: "20px"
            }), new WCssClass(`input:active, input:focus`, {
                "border-bottom": "3px solid #0099cc",
                outline: "none",
            }), new WCssClass(`input[type=button]`, {
                cursor: "pointer",
                width: "calc(100% - 0px)",
                height: "initial"
            }),
        ]
    }
}
const StyleTFooter = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`.paginateBTN`, {
                display: "inline-block",
                padding: "5px",
                //"background-color": "#09f",
                color: "#888888",
                "margin": "5px",
                cursor: "pointer",
                "border-radius": "0.2cm",
                //"font-weight": "bold",
                transition: "all 0.6s"
            }), new WCssClass(`.paginateBTNHidden`, {
                display: "none",
            }), new WCssClass(`.paginateBTNActive`, {
                //"background-color": "rgb(3, 106, 175)",
                "font-weight": "bold",
                color: "#444444",
            }), new WCssClass(`.pagBTN`, {
                display: "inline-block",
                padding: "5px",
                //"background-color": "rgb(3, 106, 175)",
                color: "#888888",
                "margin": "5px",
                cursor: "pointer",
                "border-radius": "0.2cm",
                "font-weight": "bold",
                transition: "all 0.6s",
                //width: "80px",
                "text-align": "center",
            }), new WCssClass(`.tfooter`, {
                display: "flex",
                "border-bottom": "1px rgb(185, 185, 185) solid",
                "justify-content": "flex-end",
                "padding-left": "20px",
                "padding-right": "20px",
            }), new WCssClass(`.tfooterNumbers`, {
                overflow: "hidden",
                "max-width": "390px",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
            }), new WCssClass(`h5`, {
                padding: "0.25rem 5px",
                "padding-left": "20px",
                "padding-right": "20px",
                margin: "0px",
            })
        ]
    }
}
//#endregion ##################################################################################################
//#region WARTICLESTYLE #######################################################################################
const ArticleStyle = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass(`.WArticles`, {
                padding: 10,
            }), new WCssClass(`.WArticles article`, {
                padding: 0,
                "background-color": "#fff",
                "margin-bottom": 10,
                "border-radius": "0.2cm",
                "box-shadow": "0 0px 2px 0 rgba(0,0,0,0.3)",
                overflow: "hidden"
            }), new WCssClass(`.WArticles .ArticleHeader`, {
                padding: 10,
                display: "grid",
                "grid-template-rows": "20px 20px",
                "grid-template-columns": "50px auto auto",
                "font-size": 11,
                "font-family": "system-ui",
                "box-shadow": "0 0px 2px 0 rgba(0,0,0,0.3)"
            }), new WCssClass(`.WArticles .ArticleBody`, {
                padding: 10,
                display: "flex",
                "flex-direction": "column",
                "font-size": 12,
                "font-family": "system-ui",
            }), new WCssClass(`.WArticles .ArticleBody p`, {
                "text-align": "justify",
            }), new WCssClass(`.ArticleHeader img`, {
                "grid-row": "1/3",
                "grid-column": "1/2",
                height: 40,
                width: 40,
                "border-radius": "20%",
                "box-shadow": "0 0px 1px 0 rgba(0,0,0,0.3)"
            }), new WCssClass(`.ArticleBody img`, {                
                width: "100%",  
                "box-shadow": "0 0px 1px 0 rgba(0,0,0,0.3)"
            }), new WCssClass(`.ArticleBody img`, {                
                width: "100%",  
                "box-shadow": "0 0px 1px 0 rgba(0,0,0,0.3)"
            }), new WCssClass( `.ArticleAction`, {
                display: 'flex',
                //height: 30,
                padding: "10px 30px",
                "justify-content": "flex-end",
                "align-items": "center"
            }),  new WCssClass( `.ArticleAction .BtnArticles, .ArticleAction img`, {                
                height: 30,
                width: 30,
                border: "none",
                "background-color": "initial",
                cursor: "pointer",
            }),
        ], MediaQuery: [{
            condicion: '(max-width: 600px)',
            ClassList: []
        },
        ]
    }
};
const WArticleStyleContainer = {
    type: 'div',
    props: { id: '', style: 'display: none' },
    children: [
        StyleScrolls, ArticleStyle, StylesControlsV1, StyleTFooter
    ]
}

//#endregion  #################################################################################################

export { StyleScrolls, WArticleStyleContainer , StylesControlsV1}