import { WRender } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class WRichText extends HTMLElement {
    constructor() {
        super();
        this.value = "";
    }
    attributeChangedCallBack() {
        this.DrawSlide();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async () => {
        this.append(WRender.createElement(WRichTextStyle))
        this.DrawOptions();
        this.append(WRender.createElement({
            type: "div",
            props: { contentEditable: true, class: "WREditor" },
            events: {
                input: () => {
                    this.value = this.querySelector(".WREditor").innerHTML;
                }
            },
            children: []
        }));
    }
    DrawOptions() {
        const OptionsSection = {
            type: "section",
            props: { class: "WOptionsSection" },
            children: []
        }
        this.Commands.forEach(command => {
            let CommandBtn = {
                type: "input",
                props: {
                    type: command.type,
                    class: "ROption tooltip",
                    id: "ROption" + command.commandName,
                    title: command.commandName,
                    value: command.commandName
                },
            };
            CommandBtn.props[command.event] = () => {
                const ROption = this.querySelector("#ROption" + command.commandName);
                //console.log( ROption.value );   
                document.execCommand(command.commandName, false, ROption.value);
            }
            OptionsSection.children.push({
                type: "div", props: { class: "tooltip" },
                children: [CommandBtn, { type: "span", props: { class: "tooltiptext" }, children: [command.commandName] }]
            })
        });
        this.append(WRender.createElement(OptionsSection));
    }
    Commands = [
        { commandName: "backColor", icon: "", type: "color", commandOptions: null, state: 1, event: "onchange" },
        { commandName: "bold", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "createLink", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "copy", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "cut", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "defaultParagraphSeparator", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "delete", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "fontName", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "fontSize", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "foreColor", icon: "", type: "color", commandOptions: null, state: 1, event: "onchange" },
        { commandName: "formatBlock", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "forwardDelete", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "insertHorizontalRule", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "insertHTML", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "insertImage", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "insertLineBreak", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "insertOrderedList", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "insertParagraph", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "insertText", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "insertUnorderedList", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "justifyCenter", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "justifyFull", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "justifyLeft", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "justifyRight", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "outdent", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "paste", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "redo", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "selectAll", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "strikethrough", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "styleWithCss", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "subscript", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "superscript", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "undo", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
        { commandName: "unlink", icon: "", type: "button", commandOptions: null, state: 1, event: "onclick" },
    ];
}

const WRichTextStyle = {
    type: "w-style",
    props: {
        ClassList: [
            new WCssClass("w-rich-text .WREditor", {
                height: "200px",
                border: "solid 1px #000",
                display: "block",
                margin: 0,
                padding: "10px"
            }),
            new WCssClass("w-rich-text .WOptionsSection", {
                border: "solid 1px #000",
                display: "block",
                margin: 0
            }),
            new WCssClass("w-rich-text .ROption", {
                border: "solid 1px #000",
                padding: "5px",
                margin: "0px"
            }),
            new WCssClass(".tooltip", {
                position: "relative",
                display: "inline-block",
                padding: "0px", margin: "5px"
            }),
            new WCssClass(" .tooltiptext", {
                "visibility": "hidden",
                "min-width": "120px",
                "background-color": "black",
                "color": "#fff",
                "text-align": "center",
                "border-radius": "6px",
                "padding": "5px 0",
                "position": "absolute",
                "z-index": "1",
                "bottom": "150%",
                "left": "50%",
                padding:"5px",
                "margin-left": "-60px",
            }),
            new WCssClass(" .tooltiptext::after", {
                "content": '""',
                "position": "absolute",
                "top": "100%",
                "left": "50%",
                "margin-left": "-5px",
                "border-width": "5px",
                "border-style": "solid",
                "border-color": "black transparent transparent transparent",
            }),
            new WCssClass(".tooltip:hover .tooltiptext", {
                "visibility": "visible"
            }),
        ]
    }
}
customElements.define("w-rich-text", WRichText);