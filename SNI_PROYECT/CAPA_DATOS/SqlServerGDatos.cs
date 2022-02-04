using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace CAPA_DATOS
{
    public class SqlServerGDatos: GDatosAbstract
    {
        public SqlServerGDatos(string ConexionString)
        {
            SQLMCon = CrearConexion(ConexionString);
        }
        protected override IDbConnection CrearConexion(string ConexionString)
        {
            return new SqlConnection(ConexionString);
        }
        protected override IDbCommand ComandoSql(string comandoSql, IDbConnection Conexion)
        {
            var com = new SqlCommand(comandoSql, (SqlConnection)Conexion);
            return com;
        }
        protected override IDataAdapter CrearDataAdapterSql(string comandoSql, IDbConnection Conexion)
        {
            var da = new SqlDataAdapter((SqlCommand)ComandoSql(comandoSql, Conexion));
            return da;
        }
        protected override IDataAdapter CrearDataAdapterSql(IDbCommand comandoSql)
        {
            var da = new SqlDataAdapter((SqlCommand)comandoSql);
            return da;
        }

    }
}
