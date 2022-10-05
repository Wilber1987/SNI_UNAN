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
        public bool TestConnection()
        {
            try
            {
                SQLMCon.Open();
                SQLMCon.Close();
                return true;
            }
            catch (Exception)
            {

                throw;
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
                if (scalar == (object)DBNull.Value) return true;
                else return Convert.ToInt32(scalar);
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }

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
                    FindRelationatedsEntitys(item);
                }
                return ListD;
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }

        private static void FindRelationatedsEntitys<T>(T item)
        {
            Type _type = item.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(item);
                Type relationatedEntityType = oProperty.PropertyType;
                var methods = relationatedEntityType.GetMethods();
                var method = methods.FirstOrDefault(mi => mi.Name == "Find" && mi.GetParameters().Count() == 0);
                if (method != null && relationatedEntityType.Name != _type.Name)
                {
                    OneToOne oneToOne = (OneToOne)Attribute.GetCustomAttribute(oProperty, typeof(OneToOne));
                    var relationatedEntityInstance = Activator.CreateInstance(relationatedEntityType);
                    if (oneToOne != null)
                    {
                        PropertyInfo ForeingKeyPropMain = _type.GetProperty(oneToOne.KeyColumn ?? oneToOne.ForeignKeyColumn);
                        PropertyInfo ForeingKeyPropRelationated = relationatedEntityType.GetProperty(oneToOne.ForeignKeyColumn);
                        if (ForeingKeyPropMain != null && ForeingKeyPropRelationated != null)
                        {
                            ForeingKeyPropRelationated.SetValue(relationatedEntityInstance, ForeingKeyPropMain.GetValue(item, null), null);
                            TakeRelationatedObject(item, oProperty, relationatedEntityType, method, relationatedEntityInstance);
                        }
                    }
                    else
                    {
                        bool relationated = false;
                        foreach (PropertyInfo prop in relationatedEntityType.GetProperties())
                        {
                            var relationatedProp = lst.FirstOrDefault(lstProp =>
                            lstProp.Name == prop.Name && lstProp.GetType() == prop.GetType()
                                && (lstProp.Name.ToUpper().Contains("ID_") || lstProp.Name.ToUpper().Contains("KEY_")));
                            if (relationatedProp != null)
                            {
                                relationated = true;
                                prop.SetValue(relationatedEntityInstance, relationatedProp.GetValue(item), null);
                            }
                        }
                        if (relationated)
                        {
                            TakeRelationatedObject(item, oProperty, relationatedEntityType, method, relationatedEntityInstance);
                        }
                    }

                }

            }

            static void TakeRelationatedObject<T>(T item, PropertyInfo oProperty, Type relationatedEntityType, MethodInfo method, object relationatedEntityInstance)
            {
                try
                {
                    var result = method.GetGenericMethodDefinition().MakeGenericMethod(relationatedEntityType).Invoke(relationatedEntityInstance, new object[] { });
                    oProperty.SetValue(item, result, null);
                }
                catch (Exception ext)
                {
                }
            }
        }

        public T TakeObject<T>(Object Inst, string CondSQL = "")
        {
            try
            {
                DataTable Table = BuildTable(Inst, ref CondSQL);
                //List<T> ListD = ConvertDataTable<T>(Table, Inst);                
                if (Table.Rows.Count != 0)
                {
                    var CObject = ConvertRow<T>(Inst, Table.Rows[0]);
                    FindRelationatedsEntitys(Inst);
                    return CObject;
                }
                else
                {
                    throw new NullReferenceException("El objeto no fue encontrado");

                }
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
