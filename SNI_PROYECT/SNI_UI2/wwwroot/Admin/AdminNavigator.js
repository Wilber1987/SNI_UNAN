import { WAppNavigator } from "../WDevCore/WComponents/WAppNavigator.js";
Aside.append(new WAppNavigator({
    DarkMode: true,
    Elements: [
    {
        name: "Investigaciones", url: "#",
        action: (ev) => {
            window.location = location.origin + "/";
        }
    }]}));