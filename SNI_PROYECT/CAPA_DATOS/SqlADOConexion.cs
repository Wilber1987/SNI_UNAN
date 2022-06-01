using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_DATOS
{
    public class SqlADOConexion
    {
        private static string UserSQLConexion = "";
        public static SqlServerGDatos SQLM;
        public static string DataBaseNameSNIBD = "SNIBD";
        public static string DataBaseNameSIAC_BD = "SIAC_BD";
        public static bool Anonimo = true;
        //static string SQLServer = ".";
        //static string SQLServer = "DESKTOP-2GLH51Q\\SQLEXPRESS";
        static string SQLServer = ".";
        static public bool IniciarConexionSNIBD(string user, string password)
        {
            try
            {
                Anonimo = false;
                UserSQLConexion = "Data Source="+ SQLServer + 
                    "; Initial Catalog="+ DataBaseNameSNIBD + "; User ID=" 
                    + user + ";Password=" + password;
                SQLM = new SqlServerGDatos(UserSQLConexion);                
                return true;
            }
            catch (Exception)
            {
                Anonimo = true;
                return false;
                throw;
            }
        }
        static public bool IniciarConexion(string user, string password)
        {
            try
            {
                Anonimo = false;
                UserSQLConexion = "Data Source=" + SQLServer +
                    "; Initial Catalog=" + DataBaseNameSIAC_BD + "; User ID="
                    + user + ";Password=" + password;
                SQLM = new SqlServerGDatos(UserSQLConexion);
                return true;
            }
            catch (Exception)
            {
                Anonimo = true;
                return false;
                throw;
            }
        }
        static public bool IniciarConexionAnonima()
        {
            try
            {
                Anonimo = false;
                UserSQLConexion = "Data Source=" + SQLServer +
                    "; Initial Catalog=" + DataBaseNameSNIBD + "; User ID=sa;Password=zaxscd";
                SQLM = new SqlServerGDatos(UserSQLConexion);
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }
    }
}
