using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CAPA_DATOS;
using DataBaseModel;

namespace Security
{
    public class AuthNetCore
    {
        static private string SGBD_USER = "sa";
        static private string SWGBD_PASSWORD = "zaxscd";
        static public bool AuthAttribute = false;
        static private Security_Users security_User;
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
        static public bool loginIN(string mail, string password)
        {
            if (mail == null || password == null) throw new Exception();
            try
            {
                SqlADOConexion.IniciarConexionSNIBD(SGBD_USER, SWGBD_PASSWORD);
                security_User = new Security_Users()
                {
                    Mail = mail,
                    Password = password
                }.Find<Security_Users>();
                if (security_User.Id_User == null)
                {
                    security_User = null;
                    SqlADOConexion.SQLM = null;
                    throw new Exception();
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

        public static bool HavePermission(string permission)
        {
            if (Authenticate())
            {
            //    var roleHavePermision = security_User.Security_Users_Roles.Where(r => RoleHavePermission(permission, r).Count != 0).ToList();
            //    if (roleHavePermision.Count != 0) return true;
                return false;
            }
            else
            {
                return false;
            }
        }

        //private static List<Security_Permissions_Roles> RoleHavePermission(string permission, Security_Users_Roles r)
        //{
        //    return r.Security_Role.Security_Permissions_Roles.Where(p => p.Security_Permissions.Descripcion == permission).ToList();
        //}
    }
}
