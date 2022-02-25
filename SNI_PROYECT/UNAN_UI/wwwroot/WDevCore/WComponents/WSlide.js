import { WRender, ComponentsManager } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "./WModalForm.js";
class WSlide extends HTMLElement {
    constructor() {
        super();
        //console.log(this)
        this.slideIndex = 1;
    }
    attributeChangedCallBack() {
        this.DrawSlide();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        this.append(WRender.createElement(this.SlideStyle()));
        this.DrawSlide();
        this.showSlides(this.slideIndex);
    }
    TakeArray = () => {
        let Slides = [];
        if (typeof this.content === "string") {
            let NumSlides = this.content.length / 300;
            let inicio = 0;
            let fin = 300;
            for (let index = 0; index < NumSlides; index++) {
                var cadena = this.content.slice(inicio, fin);
                inicio = inicio + 300;
                fin = fin + 300;
                if (index > 0) {
                    cadena = "..." + cadena;
                }
                if (index < NumSlides - 1) {
                    if (cadena.charAt(cadena.length - 1).includes(" ")) {
                        cadena = cadena.slice(0, -1);
                    }
                    cadena = cadena + "...";
                }
                Slides.push(cadena);
            }
        } else if (typeof this.content === "object" && this.content.length > 0) {
            Slides = this.content;
        }
        return Slides;
    }
    TakeSlide = (element) => {
        let slide = {
            type: "div",
            props: {},
            children: []
        }
        if (this.slideType == "videos") {
            const embed = { type: "div", props: {}, children: [] }
            embed.type = "embed";
            embed.props.frameborder = 0;
            embed.props.allowfullscreen = true;
            embed.props.src = element.url;
            embed.props.class = "ModalVideo";
            slide.props.class = "videoSlide";
            const content = {
                type: "div",
                props: { class: "content" },
                children: [
                    { type: "h3", props: { innerText: element.title } },
                ]
            }
            const image = { type: "img", props: { class: "embed", src: element.image } }
            const midlee = {
                type: "div",
                props: { class: "middle" },
                children: [{
                    type: "input",
                    props: {
                        class: "text",
                        type: "button",
                        value: "Ver Vídeo",
                        onclick: () => {
                            // console.log(this)
                            this.append(WRender.createElement({
                                type: "w-modal-form",
                                props: {
                                    id: "viewVideo" + this.id,
                                    ObjectModal: embed
                                }
                            }));
                        }
                    }
                },]
            }
            slide.children.push({
                type: "div",
                props: { class: "embed" },
                children: [image, midlee]
            })
            //slide.children.push(image);
            slide.children.push({
                type: "div",
                props: { class: "videoSlideInfo" },
                children: [
                    content,
                    { type: "div", props: { class: "bg" } },
                    { type: "div", props: { class: "bg bg2" } },
                    { type: "div", props: { class: "bg bg3" } },
                ]
            });

        } else if (this.slideType == "images") {
            slide.type = "img";
            slide.props.src = element.url;
        } else if (typeof element === "string") {
            slide.type = "p";
            slide.props.class = "pText";
            slide.children.push(element);
        } else {
            slide = element;
        }
        return slide;
    }
    VideoViewer(url) {

    }
    DrawSlide = async () => {
        let frag = { type: "div", props: { class: "slideshow-container" }, children: [] }
        let dotContainer = { type: "div", props: { class: "dot-container" }, children: [] }
        let Slides = this.TakeArray();
        Slides.forEach((element, index = 1) => {
            const slide = this.TakeSlide(element);
            frag.children.push({
                type: "div",
                props: { class: "mySlides" },
                children: [slide]
            });
            dotContainer.children.push({
                type: "span",
                props: {
                    class: "dot",
                    onclick: () => {
                        this.currentSlide(index);
                    }
                }
            });
            index++;
        });
        frag.children.push({
            type: "a",
            props: { class: "prev", onclick: () => { this.plusSlides(-1); } },
            children: ["❮"]
        });
        frag.children.push({
            type: "a",
            props: { class: "next", onclick: () => { this.plusSlides(1); } },
            children: ["❯"]
        });
        this.append(WRender.createElement(frag), WRender.createElement(dotContainer));
    }
    DrawForm = async () => {
        const url = Url_Path + 'api/Form/GetForm?idform=' + this.idform[0];
        this.data = await GetRequest(url);
        let frag = { type: "div", props: { class: "slideshow-container" }, children: [FormStyle] }
        let dotContainer = { type: "div", props: { class: "dot-container" }, children: [] }
        this.data[1].forEach((preg, index = 1) => {
            let pregSection = {
                type: "div",
                props: { id: `section${preg.IdQuestion}`, class: "mySlides" },
                children: [
                    { type: "h4", children: [preg.Description] }
                ]
            }
            let OptionSections = {
                type: "div",
                props: { class: "sectionResp" },
                children: []
            }
            const pregsOptions = this.data[2].filter(
                p => p.IdQuestion == preg.IdQuestion);
            let typeOption = preg.pregType;
            if (preg.IdType == 1) {
                //NO IMPLEMENTED                                
            }
            pregsOptions.forEach(pregOption => {
                OptionSections.children.push({
                    type: "div",
                    props: { class: "divOption" },
                    children: [{
                        type: "label",
                        props: {
                            for: `preg${preg.IdQuestion}_${pregOption.IdQuestionOption}`
                        },
                        children: [pregOption.OptionDesc]
                    },
                    {
                        type: "input",
                        props: {
                            type: typeOption,
                            id: `preg${preg.IdQuestion}_${pregOption.IdQuestionOption}`,
                            name: `preg${preg.IdQuestion}`,
                            value: pregOption.Value
                        }
                    }
                    ]
                })
            });
            //-------------------------------------
            pregSection.children.push(OptionSections);
            frag.children.push(pregSection);

            dotContainer.children.push({
                type: "span",
                props: {
                    class: "dot",
                    onclick: () => {
                        this.currentSlide(index);
                    }
                }
            });
            index++;
        });
        frag.children.push({
            type: "a",
            props: { class: "prev", onclick: () => { this.plusSlides(-1); } },
            children: ["❮"]
        });
        frag.children.push({
            type: "a",
            props: { class: "next", onclick: () => { this.plusSlides(1); } },
            children: ["❯"]
        });
        this.append(createElement(frag), createElement(dotContainer));
        this.showSlides(this.slideIndex);
    }
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }
    showSlides = (n) => {
        var i;
        var slides = this.getElementsByClassName("mySlides");
        var dots = this.getElementsByClassName("dot");
        if (n > slides.length) { this.slideIndex = 1 }
        if (n < 1) { this.slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "block";
        dots[this.slideIndex - 1].className += " active";
    }
    SlideStyle = () => {
        let Id = "#" + this.id + ".";
        if (typeof this.id === "undefined" || this.id == "") {
            Id = "";
        }
        const WSlideStyle = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(Id + "w-slide", {
                        position: "relative",
                        width: "100%",
                        display: "block",
                        overflow: "hidden"
                    }),
                    new WCssClass(Id + "w-slide .slideshow-container", {
                        "box-sizing": "border-box",
                        "position": "relative",
                        "background": "#f1f1f1f1",
                        "font-family": "Verdana, sans-serif",
                        margin: 0
                    }),
                    new WCssClass(Id + "w-slide .mySlides", {
                        "display": "none",
                        //"padding": "20px 50px",
                        "height": "350px",
                        //"overflow-y": "auto",
                        "overflow": "hidden",
                        "text-align": "justify",
                        "white-space": "pre-wrap",
                    }),
                    new WCssClass(Id + "w-slide .prev, " + Id + "w-slide .next", {
                        "cursor": "pointer",
                        "position": "absolute",
                        "top": "50%",
                        "width": "auto",
                        "margin-top": "-30px",
                        "padding": "16px",
                        "color": "#888",
                        "font-weight": "bold",
                        "font-size": "20px",
                        "border-radius": "0 3px 3px 0",
                        "user-select": "none",
                    }),
                    new WCssClass(Id + "w-slide .next", {
                        "position": "absolute",
                        "right": "0",
                        "border-radius": "3px 0 0 3px",
                    }),
                    new WCssClass(Id + "w-slide .prev", {
                        "position": "absolute",
                        "left": "0",
                        "border-radius": "3px 0 0 3px",
                    }),
                    new WCssClass(Id + "w-slide .prev:hover," + Id + "w-slide .next:hover", {
                        "background-color": "rgba(0,0,0,0.8)",
                        "color": "white",
                    }),
                    new WCssClass(Id + "w-slide .dot-container", {
                        "text-align": "center",
                        "padding": "20px",
                        "background": "rgba(0,0,0,0.3)",
                        width: "calc(100% - 0px)",
                        position: "absolute",
                        bottom: "0px"
                    }),
                    new WCssClass(Id + "w-slide .dot", {
                        "cursor": " pointer",
                        "height": " 20px",
                        "width": " 20px",
                        "margin": " 0 2px",
                        "background-color": " #bbb",
                        "border-radius": " 50%",
                        "display": " inline-block",
                        "transition": " background-color 0.6s ease",
                    }),
                    new WCssClass(Id + "w-slide .active, " + Id + "w-slide .dot:hover", {
                        "background-color": "#717171"
                    }),
                    new WCssClass(Id + "w-slide .videoSlide", {
                        width: "100%",
                        height: "100%",
                        margin: "0px",
                        padding: "0px",
                        position: "relative",
                        display: "flex",
                    }),
                    new WCssClass(Id + "w-slide .embed", {
                        "max-width": "600px",
                        width: "100%",
                        height: "100%",
                        margin: "0px",
                        padding: "0px",
                        "object-fit": "cover",
                        position: "relative",
                    }),
                    new WCssClass(Id + "w-slide .embed .middle", {
                        "transition": ".5s ease",
                        "opacity": "0",
                        "position": "absolute",
                        "top": "0",
                        "left": "0",
                        "bottom": 0,
                        right: 0,
                        display: "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        "background-color": "rgba(255,255,255,0.5)"
                    }), new WCssClass(Id + "w-slide .videoSlide .embed:hover .middle", {
                        opacity: 1
                    }), new WCssClass(Id + "w-slide .embed .text", {
                        "background-color": "#09f",
                        "color": "white",
                        "font-size": "16px",
                        "padding": "16px 32px",
                        border: "none",
                        cursor: "pointer"
                    }),
                    new WCssClass(Id + "w-slide .ModalVideo", {
                        height: "450px",
                        width: "100%",
                        display: "block",
                        margin: "auto"
                    }),
                    new WCssClass(Id + "w-slide .videoSlideInfo", {
                        width: "calc(100% - 0px)",
                        height: "100%",
                        margin: "0px",
                        padding: "0px",
                        display: "flex",
                        "flex-direction": "column",
                        "justify-content": "center",
                        "align-items": "center",
                        color: "#3e3e3e",
                        position: "relative",
                        //right: 0,
                        //top: 0,
                        overflow: "hidden",
                    }),
                    new WCssClass(Id + "w-slide p", {
                        width: "100%",
                    }), new WCssClass(Id + "w-slide h3", {
                        width: "80%",
                        "text-align": "center",
                        "border-radius": "0.3cm",
                        padding: "10px",
                        color: "#1e5799"
                    }), new WCssClass( `w-slide .mySlides img`, {
                        "object-fit": "cover",
                        width: "100%",
                    }),
                    //ANIMATION
                    new WCssClass(Id + "w-slide .bg", {
                        animation: "slide 3s ease-in-out infinite alternate",
                        "background-image": "linear-gradient(-60deg, #6c3 50%, #09f 50%)",
                        bottom: "0",
                        left: "-50%",
                        opacity: ".5",
                        position: "absolute",
                        right: "-50%",
                        top: "0",
                        "z-index": "0",
                    }), new WCssClass(Id + "w-slide .bg2", {
                        "animation-direction": "alternate-reverse",
                        "animation-duration": "4s",
                    }), new WCssClass(Id + "w-slide .bg3", {
                        "animation-duration": "5s",
                    }), new WCssClass(Id + "w-slide .content", {
                        "background-color": "rgba(255,255,255,.8)",
                        "border-radius": ".25em",
                        "box-shadow": "0 0 .25em rgba(0,0,0,.25)",
                        "box-sizing": "border-box",
                        display: "flex",
                        width: "80%",
                        "flex-direction": "column",
                        "justify-content": "center",
                        "align-items": "center",
                        "z-index": 1,
                    }),

                ],
                MediaQuery: [{
                    condicion: "max-width: 700px",
                    ClassList: [
                        new WCssClass(Id + "w-slide .videoSlide", {
                            display: "flex",
                            "flex-direction": "column",
                        }),
                        new WCssClass(Id + "w-slide .videoSlideInfo", {
                            height: "100px",
                            "z-index": 1,
                            position: "absolute",
                            bottom: 0,
                            display: "none"
                        }),
                        new WCssClass(Id + "w-slide .embed", {
                            "max-width": "100%"
                        }), new WCssClass(Id + "w-slide .embed .middle", {
                            "opacity": "1",
                            "background-color": "rgba(255,255,255,0.3)"
                        }),
                    ]
                }],
                KeyFrame: [{
                    animate: "slide",
                    ClassList: [
                        new WCssClass("0%", {
                            transform: "translateX(-25%)"
                        }), new WCssClass("100%", {
                            transform: "translateX(25%)"
                        })
                    ]
                }]
            }
        }
        return WSlideStyle;
    }
}

customElements.define("w-slide", WSlide);
export { WSlide }