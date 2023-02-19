using System;
using System.Collections;
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
        protected abstract IDbConnection SQLMCon();
        protected String? ConexionString;
        protected IDbTransaction? MTransaccion;
        protected bool EnTransaccion;
        protected IDbConnection? MTConnection;
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
        //ADO.NET METHODS
        public bool TestConnection()
        {
            try
            {
                SQLMCon().Open();
                SQLMCon().Close();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void BeginTransaction()
        {
            MTConnection = SQLMCon();
            SQLMCon().Open();
            this.MTransaccion = SQLMCon().BeginTransaction();
        }
        public void CommitTransaction()
        {
            this.MTransaccion?.Commit();
            SQLMCon().Close();
            MTConnection = null;
        }
        public void RollBackTransaction()
        {
            this.MTransaccion?.Rollback();
            SQLMCon().Close();
            MTConnection = null;
        }
        public object ExcuteSqlQuery(string strQuery)
        {            
            var com = ComandoSql(strQuery, SQLMCon());
            com.Transaction = this.MTransaccion;
            var scalar = com.ExecuteScalar();
            if (scalar == (object)DBNull.Value) return true;
            else return Convert.ToInt32(scalar);
        }
        public DataTable TraerDatosSQL(string queryString)
        {           
            DataSet ObjDS = new DataSet();
            var comando = ComandoSql(queryString, SQLMCon());
            comando.Transaction = this.MTransaccion;
            CrearDataAdapterSql(comando).Fill(ObjDS);
            return ObjDS.Tables[0].Copy();
        }
        public DataTable TraerDatosSQL(IDbCommand Command)
        {            
            DataSet ObjDS = new DataSet();
            Command.Transaction = this.MTransaccion;
            CrearDataAdapterSql(Command).Fill(ObjDS);            
            return ObjDS.Tables[0].Copy();
        }
        //ORM INSERT, DELETE, UPDATES METHODS
        public Object InsertObject(Object Inst)
        {
            Console.WriteLine("=================================>  InsertObject(Object Inst)");
            string strQuery = BuildInsertQueryByObject(Inst);
            Type _type = Inst.GetType();
            List<PropertyInfo> lst = _type.GetProperties().ToList();
            var pkPropiertys = lst.Where(p => (PrimaryKey)Attribute.GetCustomAttribute(p, typeof(PrimaryKey)) != null).ToList();
            PrimaryKey pkInfo = (PrimaryKey)Attribute.GetCustomAttribute(pkPropiertys[0], typeof(PrimaryKey));
            object idGenerated = 0;
            if (pkPropiertys.Count == 1 && pkInfo?.Identity == true)
            {
                idGenerated = (Int32)ExcuteSqlQuery(strQuery);
                var pk = Nullable.GetUnderlyingType(pkPropiertys[0].PropertyType);
                pkPropiertys[0].SetValue(Inst, Convert.ChangeType(idGenerated, pk));
            }//llaves compuestas
            else if (pkPropiertys.Count > 1)
            {
                foreach (var prop in pkPropiertys)
                {
                    var AtributeProp = Inst.GetType().GetProperties()
                        .FirstOrDefault(p => Attribute.GetCustomAttribute(p, typeof(ManyToOne)) != null
                            && p.GetValue(Inst)?.GetType().GetProperty(prop.Name) != null);
                    if (AtributeProp != null && prop.GetValue(Inst) == null)
                    {
                        var AtributeValue = AtributeProp.GetValue(Inst, null);
                        var t = Nullable.GetUnderlyingType(prop.PropertyType);
                        prop.SetValue(Inst, Convert.ChangeType(AtributeValue?.GetType().GetProperty(prop.Name).GetValue(AtributeValue), t));
                    }
                }
                if (true)
                {
                    strQuery = BuildInsertQueryByObject(Inst);
                    idGenerated = ExcuteSqlQuery(strQuery);
                }
            
            }
            else
            {
                idGenerated = ExcuteSqlQuery(strQuery);
                var pk = Nullable.GetUnderlyingType(pkPropiertys[0].PropertyType);
                pkPropiertys[0].SetValue(Inst, Convert.ChangeType(idGenerated, pk));
            }
            //entidades
            foreach (PropertyInfo oProperty in lst)
            {
                string? AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                if (AtributeValue != null)
                {
                    OneToOne? oneToOne = (OneToOne?)Attribute.GetCustomAttribute(oProperty, typeof(OneToOne));
                    if (oneToOne != null)
                    {
                        InsertRelationatedObject(idGenerated, AtributeValue, oneToOne.KeyColumn, oneToOne.ForeignKeyColumn);
                    }
                    ManyToOne? manyToOne = (ManyToOne?)Attribute.GetCustomAttribute(oProperty, typeof(ManyToOne));
                    if (manyToOne != null)
                    {
                        PropertyInfo? KeyColumn = AtributeValue.GetType().GetProperty(manyToOne.KeyColumn);
                        PropertyInfo? ForeignKeyColumn = AtributeValue.GetType().GetProperty(manyToOne.ForeignKeyColumn);
                        if (ForeignKeyColumn != null)
                        {
                            var t = Nullable.GetUnderlyingType(ForeignKeyColumn.PropertyType);
                            var FK = Inst.GetType().GetProperty(ForeignKeyColumn.Name);
                            if (FK?.GetValue(Inst) == null)
                            {
                                var keyVal = Convert.ChangeType(AtributeValue?.GetType()?.GetProperty(KeyColumn.Name).GetValue(AtributeValue), t);
                                FK?.SetValue(Inst, keyVal);                              
                                var values = pkPropiertys.Where(p => p.GetValue(Inst) != null).ToList();
                                if (pkPropiertys.Count == values.Count) UpdateObject(Inst, pkPropiertys.Select(p => p.Name).ToArray());
                            }
                        }
                    }
                    OneToMany? oneToMany = (OneToMany?)Attribute.GetCustomAttribute(oProperty, typeof(OneToMany));
                    if (oneToMany != null)
                    {
                        foreach (var value in ((IEnumerable)AtributeValue))
                        {
                            InsertRelationatedObject(idGenerated, value, oneToMany.KeyColumn, oneToMany.ForeignKeyColumn);
                        }
                    }
                }
                else continue;
            }
            return idGenerated;
        }

        private void InsertRelationatedObject(object idGenerated, object AtributeValue, string keyColumn, string foreignKeyColumn)
        {
            PropertyInfo? KeyColumn = AtributeValue.GetType().GetProperty(keyColumn);
            PropertyInfo? ForeignKeyColumn = AtributeValue.GetType().GetProperty(foreignKeyColumn);
            if (ForeignKeyColumn != null)
            {
                ForeignKeyColumn.SetValue(AtributeValue, idGenerated);
                List<PropertyInfo> lst = AtributeValue.GetType().GetProperties().ToList();
                var pkPropiertys = lst.Where(p => (PrimaryKey?)Attribute.GetCustomAttribute(p, typeof(PrimaryKey)) != null).ToList();
                var values = pkPropiertys.Where(p => p.GetValue(AtributeValue) != null).ToList();
                if (pkPropiertys.Count == values.Count) UpdateObject(AtributeValue, pkPropiertys.Select(p => p.Name).ToArray());
                else this.InsertObject(AtributeValue);
            }
        }

        public Object UpdateObject(Object Inst, string[] IdObject)
        {
            Console.WriteLine("=================================> UpdateObject(Object Inst, string[] IdObject)");
            string strQuery = BuildUpdateQueryByObject(Inst, IdObject);
            return ExcuteSqlQuery(strQuery);

        }
        public Object UpdateObject(Object Inst, string IdObject)
        {
            Console.WriteLine("=================================> UpdateObject(Object Inst, string IdObject)");
            if (Inst.GetType().GetProperty(IdObject).GetValue(Inst) == null)
            {
                throw new Exception("Valor de la propiedad "
                    + IdObject + " en la instancia "
                    + Inst.GetType().Name + " esta en nulo y no es posible actualizar");
            }
            string strQuery = BuildUpdateQueryByObject(Inst, IdObject);
            return ExcuteSqlQuery(strQuery);
        }
        public Object Delete(Object Inst)
        {
            Console.WriteLine("=================================> Delete(Object Inst)");
            string strQuery = BuildDeleteQuery(Inst);
            return ExcuteSqlQuery(strQuery);
        }

        //LECTURA DE OBJETOS
        public List<T> TakeList<T>(Object Inst, string CondSQL = "")
        {
            try
            {
                Console.WriteLine("=================================> TakeList<T>(Object Inst, string CondSQL)");
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
                SQLMCon().Close();
                throw;
            }
        }
        private void FindRelationatedsEntitys<T>(T item, bool fullEntity = true)
        {
            Type _type = item.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(item);
                Type relationatedEntityType = oProperty.PropertyType;
                var oneToOne = (OneToOne)Attribute.GetCustomAttribute(oProperty, typeof(OneToOne));
                var manyToOne = (ManyToOne)Attribute.GetCustomAttribute(oProperty, typeof(ManyToOne));
                var oneToMany = (OneToMany)Attribute.GetCustomAttribute(oProperty, typeof(OneToMany));
                if (oneToOne != null || manyToOne != null)
                {
                    var relationatedEntityInstance = Activator.CreateInstance(relationatedEntityType);
                    PropertyInfo ForeingKeyPropMain = _type.GetProperty(oneToOne?.KeyColumn
                        ?? manyToOne?.KeyColumn);
                    PropertyInfo ForeingKeyPropRelationated = relationatedEntityType.GetProperty(oneToOne?.ForeignKeyColumn
                        ?? manyToOne?.ForeignKeyColumn);
                    if (ForeingKeyPropMain != null && ForeingKeyPropRelationated != null)
                    {
                        ForeingKeyPropRelationated.SetValue(relationatedEntityInstance, ForeingKeyPropMain.GetValue(item, null), null);
                        var method = relationatedEntityType.GetMethods()
                            .FirstOrDefault(mi => mi.Name == "SimpleFind" && mi.GetParameters().Count() == 0);
                        if (method != null && item.GetType() != relationatedEntityInstance.GetType()) 
                            TakeRelationatedObject(item, oProperty, relationatedEntityType, method, relationatedEntityInstance);
                    }
                }
                else if (oneToMany != null && fullEntity)
                {
                    var relationatedEntityInstance = Activator.CreateInstance(relationatedEntityType.GetGenericArguments()[0]);
                    PropertyInfo ForeingKeyPropMain = _type.GetProperty(oneToMany.KeyColumn);
                    PropertyInfo ForeingKeyPropRelationated = relationatedEntityInstance.GetType().GetProperty(oneToMany.ForeignKeyColumn);
                    if (ForeingKeyPropMain != null && ForeingKeyPropRelationated != null)
                    {
                        ForeingKeyPropRelationated.SetValue(relationatedEntityInstance, ForeingKeyPropMain.GetValue(item, null), null);
                        var method = relationatedEntityInstance.GetType().GetMethods()
                            .FirstOrDefault(mi => mi.Name == "Get" && mi.GetParameters().Count() == 0);
                        if (method != null && item.GetType() != relationatedEntityInstance.GetType()) TakeRelationatedObject(item, oProperty, relationatedEntityInstance.GetType(), method, relationatedEntityInstance);

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
            catch (Exception)
            {
            }
        }

        public T? TakeObject<T>(Object Inst, bool fullEntity, string CondSQL = "")
        {
            Console.WriteLine("=================================> TakeObject<T>(Object Inst, bool fullEntity, string CondSQL = )");
            DataTable Table = BuildTable(Inst, ref CondSQL);
            if (Table.Rows.Count != 0)
            {
                var CObject = ConvertRow<T>(Inst, Table.Rows[0]);
                if (fullEntity)
                {
                    FindRelationatedsEntitys(CObject);
                }
                return CObject;
            }
            else
            {
                return default(T);

            }
        }
        //LECTURA Y CONVERSION DE DATOS       
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
                            var val = dr[column.ColumnName];
                            var getVal = GetValue(val, pro.PropertyType);
                            pro.SetValue(obj, getVal);
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
}
