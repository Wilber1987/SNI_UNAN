using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_DATOS
{
    public class SqlADOConexion
    {
        static string UserSQLConexion = "";
        public static SqlServerGDatos SQLM;
        static public bool IniciarConexion(string user, string password)
        {
            try
            {
                UserSQLConexion = "Data Source=DESKTOP-2GLH51Q\\SQLEXPRESS; Initial Catalog=SNIBD; User ID=" 
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
