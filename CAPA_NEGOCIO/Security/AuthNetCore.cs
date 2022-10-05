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
        static private Security_Users security_User;
        static public bool Authenticate()
        {
            if (SqlADOConexion.SQLM == null || SqlADOConexion.Anonimo)
            {
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
        static public bool loginIN(string mail, string password)
        {
            try
            {
                SqlADOConexion.IniciarConexionSNIBD(SGBD_USER, SWGBD_PASSWORD);
                security_User = new Security_Users()
                {
                    Mail = mail,
                    Password = password
                }.GetUserData();
                if (security_User.Id_User == null)
                {
                    SqlADOConexion.SQLM = null;
                    return false;
                }
                return true;
            }
            catch (Exception)
            {
                return false;
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
            try
            {
                if (security_User != null)
                {
                    UserModel Model = new UserModel();
                    Model.UserId = security_User.Id_User;
                    Model.mail = security_User.Mail;
                    Model.password = "PROTECTED";
                    Model.success = true;
                    return Model;
                }
                else
                {
                    throw new Exception("El usuario no a sido encontrado");
                }
            }
            catch (Exception)
            {
                throw;
            }          
        }
        public static bool HavePermission(string permission)
        {
            if (Authenticate())
            {
                var roleHavePermision = security_User.security_Users_Roles.Where(r => RoleHavePermission(permission, r).Count != 0).ToList();
                if (roleHavePermision.Count != 0 ) return true;
                return false;
            }
            else
            {
                return false;
            }
        }

        private static List<Security_Permissions_Roles> RoleHavePermission(string permission, Security_Users_Roles r)
        {
            return r.security_Role.Security_Permissions_Roles.Where(p => p.security_Permissions.Descripcion == permission).ToList();
        }
    }
}
