
import { ComponentsManager, WAjaxTools, WArrayF, WRender } from "./WComponentsTools.js";
import "../WComponents/WModalForm.js";
import "../WComponents/WLoginTemplate.js";

class WSecurity {
    constructor() {
        WAjaxTools.PostRequest(WSecurity.urlLogin, this.UserData).then((result) => {
            if (result.success == false) {
                WSecurity.LoginIn();
                WSecurity.Authenticate = false;
            }
        })
    }
    static urlLogin = "http://seyfergames.mygamesonline.org/API/Auth.php/?function=login";
    static urlRegister = "http://seyfergames.mygamesonline.org/API/Auth.php/?function=Register";
    static UserData = {
        nickname: "null",
        password: "null"
    }
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
    static Authenticate = false;
    static Auth = () => {
        try {
            this.Authenticate;
        } catch (error) { }
    }
    static Security = async () => {
        try {

        } catch (error) {

        }
    }
    static LoginIn = async () => {
        try {
            console.log("login in...");
            const Modal = WRender.createElement({
                type: "w-modal-form",
                props: {
                    ObjectModal: WRender.createElement({
                        type: "w-login-template",
                        props: {
                            id: "MyLogin",
                            LoginModel: this.UserData,//{ Email: null, Password: null },
                            LoginFuncion: async (Data) => {
                                const dataLog = await this.login(Data);
                                //console.log(dataLog)
                                return { username: dataLog.data.nickname, token: dataLog.data.login_token };
                            },
                            RegisterModel: this.RegisterModel,
                            RegisterFuncion: async (NewUser) => {
                                return Register(NewUser);
                            },
                        }
                    })
                }
            });
            document.body.append(WRender.createElement(Modal));
        } catch (error) {

        }
    }
    static login = async (UserData) => {
        const result = await WAjaxTools.PostRequest(WSecurity.urlLogin, UserData)
        if (result.success == true) {
            this.UserData = result.data;
            WSecurity.Authenticate = true;
        } else {
            WSecurity.LoginIn();
            WSecurity.Authenticate = false;
        }
        return result;
    }
    static User = () => {
        try {
            const UserData = {
                id_user: "null"
            }
            return UserData;
        } catch (error) {

        }
    }
}
export { WSecurity }