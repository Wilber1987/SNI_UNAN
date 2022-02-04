using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.Security
{
    public class AuthNetCore
    {
        static string user = "sa";
        static string password = "zaxscd";
        static public bool AuthAttribute = false;
        static public bool Authenticate()
        {
            if (SqlADOConexion.SQLM == null)
            {
                return false;
            }
            return true;

        }
        static public bool loginIN(string user, string password) {
            try
            {
                SqlADOConexion.IniciarConexion(user, password);
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
            return true;

        }
    }
}
