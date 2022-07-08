import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
//#region  GENERIC STYLESSS#####################################################################################
const StyleScrolls = {
    type: 'w-style', props: {
        id: '', ClassList: [
            new WCssClass("*::-webkit-scrollbar ", {
                "width": "20px",
            }), new WCssClass("*::-webkit-scrollbar-track ", {
                "background": "transparent",
            }), new WCssClass("*::-webkit-scrollbar-thumb", {
                "background-color": "#8f8f8f",
                "border-radius": "20px",
                "border": "6px solid transparent",
                "background-clip": "content-box",
            }), new WCssClass("*::-webkit-scrollbar-thumb:hover", {
                "background": " #646464",
                "background-clip": "content-box",
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
                //"border-right": "rgb(3, 106, 175) 5px solid",
                "border-radius": "0.2cm",
                "max-height": 40
            }), new WCssClass(`.BtnPrimary`, {
                "color": "#fff",
                "background-color": "007bff",
                //"border-right": "rgb(3, 106, 175) 5px solid",
            }), new WCssClass(`.BtnAlert`, {
                "color": "#fff",
                "background-color": "#dc3545",
                //"border-right": "#7e1b25 5px solid",
            }), new WCssClass(`.BtnSuccess`, {
                "color": "#fff",
                "background-color": "#28a745",
                //"border-right": "#165c26 5px solid",
            }), new WCssClass(`.BtnSecundary`, {
                "color": "#fff",
                "background-color": "#17a2b8",
                //"border-right": "#0f5964 5px solid",
            }), new WCssClass(`.Btn[type=checkbox]`, {
                "height": "20px",
                "min-width": "20px",
                "margin": "5px",
            }),
            //INPUTS
            new WCssClass(`input[type=text], 
            input[type=string], 
            input[type=password], 
            input[type=number],
            input[type=color], input[type=email], 
            input[type=date],  input[type=time],select, textarea,
            input:-internal-autofill-selected`, {
                padding: 10,
                border: "none",
                border: "2px solid #dddada",
                width: "calc(100%)",
                //height: "100%",
                "font-size": "15px",
                "border-radius": "0.2cm",
                "box-sizing": "border-box",
                "border-radius": 10,
                cursor: "pointer"
            }), new WCssClass(`input:active, input:focus, select:active, select:focus`, {
                "border-bottom": "2px solid #0099cc",
                outline: "none",
            })
        ]
    }
}
const StylesControlsV2 = {
    type: 'w-style', props: {
        id: '', ClassList: [
            //BOTONES
            new WCssClass(`.Btn-Mini`, {
                width: 120,
                "background-color": "#5995fd",
                border: "none",
                outline: "none",
                "border-radius": "10px",
                color: "#fff",
                "font-weight": "600",
                margin: "10px 0",
                cursor: "pointer",
                transition: "0.5s",
                "font-size": 11,
                padding: 8
            }), new WCssClass(`.BtnAlert,.BtnPrimary, .BtnSuccess,.BtnSecundary,.Btn`, {
                "min-width": "150px",
                "background-color": "#5995fd",
                border: "none",
                outline: "none",
                height: "40px",
                "border-radius": "49px",
                color: "#fff",
                "text-transform": "uppercase",
                "font-weight": "600",
                margin: "10px 5px",
                padding: "0 10px",
                cursor: "pointer",
                transition: "0.5s",
            }), new WCssClass(`.BtnPrimary`, {
                "color": "#fff",
                "background-color": "007bff",
            }), new WCssClass(`.BtnAlert`, {
                "color": "#fff",
                "background-color": "#dc3545",
            }), new WCssClass(`.BtnSuccess`, {
                "color": "#fff",
                "background-color": "#28a745",
            }), new WCssClass(`.BtnSecundary`, {
                "color": "#fff",
                "background-color": "#17a2b8",
            }), new WCssClass(`.Btn[type=checkbox]`, {
                "height": "20px",
                "min-width": "20px",
                "margin": "5px",
            }),
            //INPUTS
            new WCssClass(`input[type=text], 
            input[type=string], 
            input[type=password], 
            input[type=number],
            input[type=color], input[type=email], 
            input[type=date],  input[type=time],select, textarea,
            input:-internal-autofill-selected`, {
                width: "100%",
                "background-color": "#f0f0f0 !important",
                "border-radius": "55px",
                padding: "10px 15px",
                outline: "none",
                border: "none",
                "line-height": "1",
                "font-weight": "600 !important",
                "font-size": "1.1rem !important",
                color: "#333 !important",
                "box-sizing": "border-box",
                cursor: "pointer",
                height: 40
            }), new WCssClass(`input:active, 
                input:focus, 
                select:active, 
                select:focus,
                textarea:focus,textarea:focus`, {
                "box-shadow": "0 0 5px #4894aa",
                // outline: "none",
            })
        ]
    }
}
//#endregion  #################################################################################################

export { StyleScrolls, StylesControlsV1, StylesControlsV2 }