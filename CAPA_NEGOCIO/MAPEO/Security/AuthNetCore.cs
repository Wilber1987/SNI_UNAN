using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.Security
{
    public class AuthNetCore
    {
        static private string SGBD_USER = "sa";
        static private string SWGBD_PASSWORD = "zaxscd";
        static public bool AuthAttribute = false;
        static private Security_Users? security_User;
        static public bool Authenticate()
        {
            if (SqlADOConexion.SQLM == null || SqlADOConexion.Anonimo || security_User == null)
            {
                security_User = null;
                SqlADOConexion.SQLM = null;
                return false;
            }
            return true;

        }
        static public bool AnonymousAuthenticate()
        {
            SqlADOConexion.IniciarConexionAnonima();
            return true;
        }
        static public object loginIN(string? mail, string? password)
        {
            if (mail == null ||  mail.Equals("") || password == null || password.Equals("")) 
                return new UserModel() { success= false, message= "Usuario y contraseña son requeridos.",  status = 500 };
            try
            {
                SqlADOConexion.IniciarConexionSNIBD(SGBD_USER, SWGBD_PASSWORD);
                security_User = new Security_Users()
                {
                    Mail = mail,
                    Password = password
                }.GetUserData();
                if (security_User == null) ClearSeason();
                return User();
            }
            catch (Exception ex)
            {
                Console.WriteLine("-- ==================> :" + ex);
                throw;
                return new UserModel() { success = false, message = "Error al intentar iniciar sesión, favor intentarlo mas tarde, o contactese con nosotros.", status = 500 };
            }
        }
        static public bool ClearSeason()
        {
            SqlADOConexion.SQLM = null;
            security_User = null;
            return true;

        }
        public static UserModel User()
        {
            if (security_User != null)
            {
                return new UserModel()
                {
                    UserId = security_User.Id_User,
                    mail = security_User.Mail,
                    password = "PROTECTED",
                    status = 200,
                    success = true,
                    message = "Inicio de sesión exitoso."
                };
            }
            else
            {
                return new UserModel()
                {
                    UserId = 0,
                    mail = "FAILD",
                    password = "FAILD",
                    status = 500,
                    success = false,
                    message = "Usuario o contraseña incorrectos."
                };
            }
        }
        public static bool HavePermission(string permission)
        {
            if (Authenticate())
            {
                var roleHavePermision = security_User?.Security_Users_Roles?.Where(r => RoleHavePermission(permission, r)?.Count != 0).ToList();
                if (roleHavePermision?.Count != 0) return true;
                return false;
            }
            else
            {
                return false;
            }
        }
        private static List<Security_Permissions_Roles>? RoleHavePermission(string permission, Security_Users_Roles? r)
        {
            return r?.Security_Role?.Security_Permissions_Roles?.Where(p => p.Security_Permissions?.Descripcion == permission).ToList();
        }
    }
    public class UserModel
    {
        public int? UserId { get; set; }
        public int? status { get; set; }
        public string? mail { get; set; }
        public string? password { get; set; }
        public string? message { get; set; }
        public bool? success { get; set; }
    }
}
