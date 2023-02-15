import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../../WDevCore/WModules/WComponentsTools.js';
import { WSecurity } from '../../WDevCore/WModules/WSecurity.js';
import { WCssClass } from '../../WDevCore/WModules/WStyledRender.js';
import { StyleScrolls } from "../../WDevCore/StyleModules/WStyleComponents.js";
import { WAppNavigator } from "../../WDevCore/WComponents/WAppNavigator.js";
import { WModalForm } from "../../WDevCore/WComponents/WModalForm.js";
Header.append(WRender.createElement({
    type: "w-app-navigator",
    props: {
        Inicialize: false,
        alignItems: "flex-end",
        DisplayMode: "right",
        Elements: [
            {
                name: "Home", url: "#",
                action: async (ev) => {
                    window.location = location.origin + "/";
                }
            }, {
                name: "Proyectos", url: "#",
                action: async (ev) => {
                    window.location = location.origin + "/Perfil/Proyectos";
                }
            }, {
                name: "Opciones", url: "#",
                action: (ev) => {
                    const ModalPerfil = new WModalForm({
                        title: "Eliminar",
                        ObjectModal: new WAppNavigator({
                            Direction: "column",
                            NavStyle: "tab",
                            Elements: [
                                {
                                    name: "Perfil", url: "#",
                                    action: (ev) => {
                                    }
                                }, {
                                    name: "Agenda", url: "#",
                                    action: (ev) => {
                                    }
                                }, {
                                    name: "Cerrar Sesión", url: "#",
                                    action: (ev) => {
                                        WSecurity.LogOut();
                                    }
                                }
                            ]
                        })
                    });
                    AdminTemplate.append(ModalPerfil);
                }
            }
        ]
    }
}));
AdminTemplate.append(WRender.createElement(StyleScrolls));