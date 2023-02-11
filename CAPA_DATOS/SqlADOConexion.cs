using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_DATOS
{
    public class SqlADOConexion
    {
        private static string UserSQLConexion = "";
        public static SqlServerGDatos? SQLM;
        //public static string DataBaseName = "SIGFACT";
        //public static string DataBaseName = "SIAC_BD";
        public static string DataBaseName = "SNIBD";
        public static bool Anonimo = true;
        //static string SQLServer = ".";
        //static string SQLServer = "localhost\\SQLEXPRESS";
        static string SQLServer = "localhost";
        static public bool IniciarConexionSNIBD(string user, string password)
        {
            try
            {
                Anonimo = false;
                UserSQLConexion = "Data Source=" + SQLServer +
                    "; Initial Catalog=" + DataBaseName + "; User ID="
                    + user + ";Password=" + password + ";MultipleActiveResultSets=true";
                SQLM = new SqlServerGDatos(UserSQLConexion);
                if (SQLM.TestConnection()) return true;
                else
                {
                    SQLM = null;
                    return false;
                }
            }
            catch (Exception)
            {
                SQLM = null;
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
                    "; Initial Catalog=" + DataBaseName + "; User ID="
                    + user + ";Password=" + password + ";MultipleActiveResultSets=true";
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
                    "; Initial Catalog=" + DataBaseName +
                    "; User ID=sa;Password=zaxscd;MultipleActiveResultSets=true";
                SQLM = new SqlServerGDatos(UserSQLConexion);
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }
        static public bool IniciarConexionUSAV()
        {
            try
            {
                Anonimo = false;
                UserSQLConexion = "Data Source=" + SQLServer +
                    "; Initial Catalog=BDVideosUSAV; User ID=sa;Password=zaxscd";
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
    }

}
