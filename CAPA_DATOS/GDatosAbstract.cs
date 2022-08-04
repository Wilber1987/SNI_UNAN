using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Globalization;
using System.Linq;

namespace CAPA_DATOS
{
    public abstract class GDatosAbstract
    {
        protected IDbConnection SQLMCon;
        protected IDbTransaction MTransaccion;
        protected bool EnTransaccion;
        protected abstract IDbConnection CrearConexion(string cadena);
        protected abstract IDbCommand ComandoSql(string comandoSql, IDbConnection connection);
        protected abstract IDataAdapter CrearDataAdapterSql(string comandoSql, IDbConnection connection);
        protected abstract IDataAdapter CrearDataAdapterSql(IDbCommand comandoSql);
        public void BeginTransaccion()
        {
            try
            {
                MTransaccion = SQLMCon.BeginTransaction();
                EnTransaccion = true;
            }
            finally
            { EnTransaccion = false; }
        }
        public void EndTransaccion()
        {
            try
            { MTransaccion.Commit(); }
            finally
            {
                MTransaccion = null;
                EnTransaccion = false;
            }
        }
        public void RollbackTransaccion()
        {
            try
            { MTransaccion.Rollback(); }
            finally
            {
                MTransaccion = null;
                EnTransaccion = false;
            }
        }
        public object ExcuteSqlQuery(string strQuery)
        {
            try
            {               
                SQLMCon.Open();
                var com = ComandoSql(strQuery, SQLMCon);
                var scalar = com.ExecuteScalar();
                SQLMCon.Close();
                if (scalar == (object)DBNull.Value)
                {
                    return true;
                }
                else
                {
                    return Convert.ToInt32(scalar);
                }
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }       
        public Object InsertObject(Object Inst)
        {
            try
            {               
                string ColumnNames = "";
                string Values = "";
                string TableName = Inst.GetType().Name;
                BuildInsertQueryByObject(Inst, ref ColumnNames, ref Values);
                string strQuery = "INSERT INTO " + TableName + "(" + ColumnNames + ") VALUES(" + Values + ") SELECT SCOPE_IDENTITY()";
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                throw;
            }
        }
        private static void BuildInsertQueryByObject(object Inst, ref string ColumnNames, ref string Values)
        {
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                if (AtributeValue == null)
                {
                    continue;
                }
                else if (AtributeValue.GetType() == typeof(string))
                {
                    ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                    Values = Values + "'" + AtributeValue.ToString() + "',";
                }
                else if (AtributeValue.GetType() == typeof(DateTime))
                {
                    ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                    Values = Values + "'" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd HH:mm:ss") + "',";
                }
                else if (IsNumeric(AtributeValue))
                {
                    ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                    Values = Values + AtributeValue.ToString() + ",";
                }
            }
            ColumnNames = ColumnNames.TrimEnd(',');
            Values = Values.TrimEnd(',');
        }
        private static bool IsNumeric(object AtributeValue)
        {
            return AtributeValue.GetType() == typeof(int)
                                || AtributeValue.GetType() == typeof(Double)
                                || AtributeValue.GetType() == typeof(Decimal)
                                || AtributeValue.GetType() == typeof(int?);
        }
        public Object UpdateObject(Object Inst, string[] IdObject)
        {
            try
            {
                string TableName = Inst.GetType().Name;
                string Values = "";
                string Conditions = "";
                Type _type = Inst.GetType();
                PropertyInfo[] lst = _type.GetProperties();
                foreach (PropertyInfo oProperty in lst)
                {
                    string AtributeName = oProperty.Name;
                    var AtributeValue = oProperty.GetValue(Inst);
                    if ((from O in IdObject where O == AtributeName select O).ToList().Count == 0)
                    {
                        if (AtributeValue == null)
                        {
                            continue;
                        }
                        else if (AtributeValue.GetType() == typeof(string))
                        {
                            Values = Values + AtributeName + "= '" + AtributeValue.ToString() + "',";
                        }
                        else if (AtributeValue.GetType() == typeof(DateTime))
                        {
                            Values = Values + AtributeName + "= '" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd") + "',";
                        }
                        else if (IsNumeric(AtributeValue))
                        {
                            Values = Values + AtributeName + "= " + AtributeValue.ToString() + ",";
                        }
                    }
                    else
                    {
                        if (AtributeValue == null)
                        {
                            continue;
                        }
                        else if (AtributeValue.GetType() == typeof(string))
                        {
                            Conditions = Conditions + " " + AtributeName + "= '" + AtributeValue.ToString() + "' AND";
                        }
                        else if (AtributeValue.GetType() == typeof(DateTime))
                        {
                            Conditions = Conditions + " " + AtributeName + "= '" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd") + "' AND";
                        }
                        else if (IsNumeric(AtributeValue))
                        {
                            Conditions = Conditions + " " + AtributeName + "= " + AtributeValue.ToString() + " AND";
                        }
                    }

                }
                Values = Values.TrimEnd(',');
                Conditions = Conditions.TrimEnd('D');
                Conditions = Conditions.TrimEnd('N');
                Conditions = Conditions.TrimEnd('A');
                string strQuery = "UPDATE  " + TableName + " SET " + Values +
                    " WHERE " + Conditions;
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Object UpdateObject(Object Inst, string IdObject)
        {
            try
            {
                string TableName = Inst.GetType().Name;
                string Values = "";
                Type _type = Inst.GetType();
                PropertyInfo[] lst = _type.GetProperties();
                PropertyInfo prop = lst[0];
                foreach (PropertyInfo oProperty in lst)
                {
                    string AtributeName = oProperty.Name;
                    var AtributeValue = oProperty.GetValue(Inst);
                    if (AtributeName != IdObject)
                    {
                        if (AtributeValue == null)
                        {
                            continue;
                        }
                        else if (AtributeValue.GetType() == typeof(string))
                        {
                            Values = Values + AtributeName + "= '" + AtributeValue.ToString() + "',";
                        }
                        else if (AtributeValue.GetType() == typeof(DateTime))
                        {
                            Values = Values + AtributeName + "= '" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd") + "',";
                        }
                        else if (IsNumeric(AtributeValue))
                        {
                            Values = Values + AtributeName + "= " + AtributeValue.ToString() + ",";
                        }
                    }
                    else if (AtributeName == IdObject)
                    {
                        prop = oProperty;
                    }

                }
                Values = Values.TrimEnd(',');
                string strQuery = "UPDATE  " + TableName + " SET " + Values +
                    " WHERE " + IdObject + " = " + prop.GetValue(Inst).ToString();
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Object Delete(Object Inst)
        {
            string TableName = Inst.GetType().Name;
            string CondicionString = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            int index = 0;
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                if (AtributeValue != null)
                {
                    WhereConstruction(ref CondicionString, ref index, AtributeName, AtributeValue);
                }

            }
            CondicionString = CondicionString.TrimEnd(new char[] { '0', 'R' });
            string strQuery = "DELETE FROM  " + TableName + CondicionString;
            return ExcuteSqlQuery(strQuery);
        }
        private static void WhereConstruction(ref string CondicionString, ref int index, string AtributeName, object AtributeValue)
        {

            if (AtributeValue.GetType() == typeof(string) && AtributeValue.ToString().Length < 200)
            {
                WhereOrAnd(ref CondicionString, ref index);
                CondicionString = CondicionString + AtributeName + " LIKE '%" + AtributeValue.ToString() + "%' ";
            }
            else if (AtributeValue.GetType() == typeof(DateTime))
            {
                WhereOrAnd(ref CondicionString, ref index);
                CondicionString = CondicionString + AtributeName
                    + "= '" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd") + "' ";
            }
            else if (IsNumeric(AtributeValue))
            {
                WhereOrAnd(ref CondicionString, ref index);
                CondicionString = CondicionString + AtributeName + "=" + AtributeValue.ToString() + " ";
            }
        }
        private static void WhereOrAnd(ref string CondicionString, ref int index)
        {
            if (index == 0)
            {
                CondicionString = " WHERE ";
                index++;
            }
            else
            {
                CondicionString = CondicionString + " AND ";
            }
        }
        public DataTable TraerDatosSQL(string queryString)
        {
            try
            {
                DataSet ObjDS = new DataSet();
                CrearDataAdapterSql(queryString, SQLMCon).Fill(ObjDS);
                return ObjDS.Tables[0].Copy();                
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }

        }
        public DataTable TraerDatosSQL(IDbCommand Command)
        {
            try
            {
                DataSet ObjDS = new DataSet();
                CrearDataAdapterSql(Command).Fill(ObjDS);
                return ObjDS.Tables[0].Copy();
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }

        }
        public List<Object> TakeList(Object Inst, string CondSQL = "")
        {
            try
            {
                string TableName = Inst.GetType().Name;
                DataTable Table = BuildTable(Inst, TableName, ref CondSQL);
                List<Object> ListD = ConvertDataTable(Table, Inst);
                return ListD;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Object> TakeList(string TableName, Object Inst, string CondSQL = "")
        {
            try
            {
                DataTable Table = BuildTable(Inst, TableName, ref CondSQL);
                List<Object> ListD = ConvertDataTable(Table, Inst);
                return ListD;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<T> TakeList<T>(Object Inst, string CondSQL = "")
        {
            try
            {
                string TableName = Inst.GetType().Name;
                DataTable Table = BuildTable(Inst, TableName, ref CondSQL);
                List<T> ListD = ConvertDataTable<T>(Table, Inst);
                return ListD;
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }
        private DataTable BuildTable(object Inst, string TableName, ref string CondSQL)
        {

            string CondicionString = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            int index = 0;
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                if (AtributeValue != null)
                {
                    WhereConstruction(ref CondicionString, ref index, AtributeName, AtributeValue);
                }

            }
            CondicionString = CondicionString.TrimEnd(new char[] { '0', 'R' });
            if (CondicionString == "" && CondSQL != "")
            {
                CondicionString = " WHERE ";
            }
            else if (CondicionString != "" && CondSQL != "")
            {
                CondicionString = CondicionString + " AND ";
            }
            string queryString = "SELECT * FROM " + TableName + CondicionString + CondSQL;
            DataTable Table = TraerDatosSQL(queryString);
            return Table;
        }
        public Object TakeListWithProcedure(string ProcedureName, Object Inst, List<Object> Params)
        {
            try
            {
                SQLMCon.Open();
                var Command = ComandoSql(ProcedureName, SQLMCon);
                Command.CommandType = CommandType.StoredProcedure;
                //REPARAR
                SqlCommandBuilder.DeriveParameters((SqlCommand)Command);
                SQLMCon.Close();
                if (Params.Count != 0)
                {
                    int i = 0;
                    foreach (var param in Params)
                    {
                        var p = (SqlParameter)Command.Parameters[i + 1];
                        p.Value = param;
                        i++;
                    }
                }
                DataTable Table = TraerDatosSQL(Command);
                List<Object> ListD = ConvertDataTable(Table, Inst);
                return ListD;
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }
        private static List<Object> ConvertDataTable(DataTable dt, Object Inst)
        {
            List<Object> data = new List<Object>();
            foreach (DataRow row in dt.Rows)
            {
                var item = GetItem(row, Inst);
                data.Add(item);
            }
            return data;
        }
        private static Object GetItem(DataRow dr, Object Inst)
        {
            Type temp = Inst.GetType();
            var obj = Activator.CreateInstance(Inst.GetType());
            foreach (DataColumn column in dr.Table.Columns)
            {
                if (string.IsNullOrEmpty(dr[column.ColumnName].ToString()))
                {
                    continue;
                }
                else
                {
                    foreach (PropertyInfo pro in temp.GetProperties())
                    {
                        if (pro.Name == column.ColumnName)
                        {
                            pro.SetValue(obj, GetValue(dr[column.ColumnName], pro.PropertyType));
                        }
                        else
                            continue;
                    }
                }
            }
            return obj;
        }
        private static Object GetValue(Object DefaultValue, Type type)
        {
            string Literal = DefaultValue.ToString();
            if (Literal == null || Literal == "" || Literal == string.Empty) return DefaultValue;
            IConvertible obj = Literal;
            Type u = Nullable.GetUnderlyingType(type);
            if (u != null)
            {
                return (obj == null) ? DefaultValue : Convert.ChangeType(obj, u);
            }
            else
            {
                return Convert.ChangeType(obj, type);
            }
        }
        private static List<T> ConvertDataTable<T>(DataTable dt, Object Inst)
        {
            List<T> data = new List<T>();
            foreach (DataRow dr in dt.Rows)
            {
                var obj = Activator.CreateInstance<T>();
                Type temp = Inst.GetType();
                foreach (DataColumn column in dr.Table.Columns)
                {
                    if (!string.IsNullOrEmpty(dr[column.ColumnName].ToString()))
                    {
                        foreach (PropertyInfo pro in temp.GetProperties())
                        {
                            if (pro.Name == column.ColumnName)
                            {
                                pro.SetValue(obj, GetValue(dr[column.ColumnName], pro.PropertyType));
                            }
                            else
                                continue;
                        }
                    }
                    else
                    {
                        continue;
                    }
                }
                //return obj;
                data.Add(obj);
            }
            return data;
        }

    }
}
