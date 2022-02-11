import { ComponentsManager, WAjaxTools, WArrayF, WRender } from "./WComponentsTools.js";
// import "../WComponents/WModalForm.js";
// import "../WComponents/WLoginTemplate.js";

class WSecurity {
    constructor() {
        WSecurity.Authenticate = true;
        console.log(WSecurity.UserData);
        WAjaxTools.PostRequest(WSecurity.urlVerification).then((result) => {
            if (result == false) {
                console.log("no auth");
                WSecurity.LogOut();
            } 
        })
    }
    static Path = location.origin;
    static Authenticate = false;
    //VIEWS
    static LoginInView = WSecurity.Path + "/security/login.html";
    static urlHomeView = WSecurity.Path;
    //API
    static urlVerification = WSecurity.Path + "/api/Security/Verification";
    static urlLogIn = WSecurity.Path + "/api/Security/Login";
    static urlRegister = WSecurity.Path + "/api/Security/Register";
    static urlLogOut = WSecurity.Path + "/api/Security/LogOut";
    
    static UserData = localStorage.getItem(WSecurity.urlLogIn) != null ? 
        localStorage.getItem(WSecurity.urlLogIn):{
            success: false,
            nickname: "null",
            password: "null"
        };
    static RegisterModel = {
        nickname: "xx",
        name: "xx",
        surnames: "xx",
        birthday: "xx",
        mail: "xx",
        password: "xx",
        confirm_password: "xx",
        photo: "xx",
        //state: "xx",
    };
    static Login = async (UserData) => {
        const result = await WAjaxTools.PostRequest(WSecurity.urlLogIn, UserData)
        if (result.success == true) {
            this.UserData = result;
            window.location = WSecurity.urlHomeView;
        } else {
            console.log("Fail to login");
        }
    }
    static LogOut = async () => {
        const result = await WAjaxTools.PostRequest(WSecurity.urlLogOut);
        localStorage.clear();        
        window.location = WSecurity.LoginInView;  
        return result;
    }
}
export { WSecurity }