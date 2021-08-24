const OnLoad = async() => {
    const { WRender } = await import ("./WDevCore/WModules/WComponentsTools.js");
    const modules = await import ("./MasterDomClass.js");
    const BodyComponents = new modules.MasterDomClass();
    App.appendChild(WRender.createElement(BodyComponents));
}

window.onload = OnLoad;