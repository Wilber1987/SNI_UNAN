using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_DATOS
{
    public class SqlADOConexion
    {
        static string UserSQLConexion = "";
        public static SqlServerGDatos SQLM;
       // static string SQLServer = ".";
        static string SQLServer = "DESKTOP-2GLH51Q\\SQLEXPRESS";
        static public bool IniciarConexion(string user, string password)
        {
            try
            {
                UserSQLConexion = "Data Source="+ SQLServer + 
                    "; Initial Catalog=SNIBD; User ID=" 
                    + user + ";Password=" + password;
                SQLM = new SqlServerGDatos(UserSQLConexion);
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
