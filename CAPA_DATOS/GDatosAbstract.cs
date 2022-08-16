using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

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
        protected abstract List<EntityProps> DescribeEntity(string entityName);
        protected abstract private DataTable BuildTable(object Inst, ref string CondSQL);
        protected abstract string BuildInsertQueryByObject(object Inst);
        protected abstract string BuildUpdateQueryByObject(object Inst, string IdObject);
        protected abstract string BuildUpdateQueryByObject(object Inst, string[] WhereProps);
        protected abstract string BuildDeleteQuery(object Inst);
        public object ExcuteSqlQuery(string strQuery)
        {
            //SQLMCon.Open();
            var com = ComandoSql(strQuery, SQLMCon);
            var scalar = com.ExecuteScalar();
            //SQLMCon.Close();
            if (scalar == (object)DBNull.Value) return true;
            else return Convert.ToInt32(scalar);
        }
        //INSERT, DELETE, UPDATES METHODS
        public Object InsertObject(Object Inst)
        {
            try
            {
                string strQuery = BuildInsertQueryByObject(Inst);
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Object UpdateObject(Object Inst, string[] IdObject)
        {
            try
            {
                string strQuery = BuildUpdateQueryByObject(Inst, IdObject);
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
                string strQuery = BuildUpdateQueryByObject(Inst, IdObject);
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Object Delete(Object Inst)
        {
            string strQuery = BuildDeleteQuery(Inst);
            return ExcuteSqlQuery(strQuery);
        }

        //LECTURA DE OBJETOS
        public List<T> TakeList<T>(Object Inst, string CondSQL = "")
        {
            try
            {
                DataTable Table = BuildTable(Inst, ref CondSQL);
                List<T> ListD = ConvertDataTable<T>(Table, Inst);
                foreach (T item in ListD)
                {
                    Type _type = item.GetType();
                    PropertyInfo[] lst = _type.GetProperties();
                    foreach (PropertyInfo oProperty in lst)
                    {
                        string AtributeName = oProperty.Name;
                        var AtributeValue = oProperty.GetValue(item);
                        Type a_type = oProperty.PropertyType;
                        var methods = a_type.GetMethods();
                        var method = methods.FirstOrDefault(mi => mi.Name == "Find" && mi.GetParameters().Count() == 0);
                        if (method != null)
                        {
                            bool relationated = false;
                            var obj = Activator.CreateInstance(a_type);
                            foreach (PropertyInfo prop in a_type.GetProperties())
                            {
                                var relationatedProp = lst.FirstOrDefault(lstProp =>
                                lstProp.Name == prop.Name && lstProp.GetType() == prop.GetType());
                                if (relationatedProp != null)
                                {
                                    relationated = true;
                                    prop.SetValue(obj, relationatedProp.GetValue(item), null);
                                }
                            }
                            if (relationated)
                            {                               
                                var result = method.GetGenericMethodDefinition().MakeGenericMethod(a_type).Invoke(obj, new object[] { });
                                oProperty.SetValue(item, result, null);
                            }

                        }

                    }
                }
                return ListD;
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }
        public T TakeObject<T>(Object Inst, string CondSQL = "")
        {
            try
            {
                DataTable Table = BuildTable(Inst, ref CondSQL);
                List<T> ListD = ConvertDataTable<T>(Table, Inst);
                return ListD[0];
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }
        //LECTURA Y CONVERSION DE DATOS
        public DataTable TraerDatosSQL(string queryString)
        {
            DataSet ObjDS = new DataSet();
            CrearDataAdapterSql(queryString, SQLMCon).Fill(ObjDS);
            return ObjDS.Tables[0].Copy();

        }
        public DataTable TraerDatosSQL(IDbCommand Command)
        {
            DataSet ObjDS = new DataSet();
            CrearDataAdapterSql(Command).Fill(ObjDS);
            return ObjDS.Tables[0].Copy();
        }
        protected List<T> ConvertDataTable<T>(DataTable dt, Object Inst)
        {
            List<T> data = new List<T>();
            foreach (DataRow dr in dt.Rows)
            {
                T obj = ConvertRow<T>(Inst, dr);
                data.Add(obj);
            }
            return data;
        }
        private static T ConvertRow<T>(object Inst, DataRow dr)
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
                        else continue;
                    }
                }
                else continue;

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
    }
    public class EntityProps
    {
        public string COLUMN_NAME { get; set; }
        public string DATA_TYPE { get; set; }
        public string IS_NULLABLE { get; set; }
    }
}
