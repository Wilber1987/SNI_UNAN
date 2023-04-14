using System.Collections;
using System.Data;
using System.Reflection;
using Newtonsoft.Json;

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
        protected abstract string BuildSelectQuery(object Inst, string CondSQL,
            bool fullEntity = true, bool isFind = true);
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
            Console.WriteLine("===============> BEGIN TRANSACTION <=================");
            MTConnection = SQLMCon();
            SQLMCon().Open();
            this.MTransaccion = SQLMCon().BeginTransaction();
        }
        public void CommitTransaction()
        {
            Console.WriteLine("===============> COMMIT TRANSACTION <=================");
            this.MTransaccion?.Commit();
            SQLMCon().Close();
            MTConnection = null;
        }
        public void RollBackTransaction()
        {
            Console.WriteLine("===============> ROOLBACK TRANSACTION <=================");
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
        public object InsertObject(Object entity)
        {
            Console.WriteLine("->");
            Console.WriteLine("===================>  InsertObject(" + entity.GetType().Name + ")");
            List<PropertyInfo> entityProps = entity.GetType().GetProperties().ToList();
            List<PropertyInfo> pimaryKeyPropiertys = entityProps.Where(p => Attribute.GetCustomAttribute(p, typeof(PrimaryKey)) != null).ToList();
            List<PropertyInfo> manyToOneProps = entityProps.Where(p => Attribute.GetCustomAttribute(p, typeof(ManyToOne)) != null).ToList();
            // SELECCIONAR LOS VALORES DE LAS LLAVES PRIMARIAS DE LOS MANYTOONE
            SetManyToOnePropiertys(entity, manyToOneProps);
            string strQuery = BuildInsertQueryByObject(entity);
            object idGenerated = ExcuteSqlQuery(strQuery);

            if (pimaryKeyPropiertys.Count == 1)
            {
                PrimaryKey? pkInfo = (PrimaryKey?)Attribute.GetCustomAttribute(pimaryKeyPropiertys[0], typeof(PrimaryKey));
                if (pkInfo?.Identity == true)
                {
                    Type? pkType = Nullable.GetUnderlyingType(pimaryKeyPropiertys[0].PropertyType);
                    pimaryKeyPropiertys[0].SetValue(entity, Convert.ChangeType(idGenerated, pkType));
                }
            }
            List<PropertyInfo> oneToManyPropiertys = entityProps.Where(p => Attribute.GetCustomAttribute(p, typeof(OneToMany)) != null).ToList();
            foreach (var oneToManyProp in oneToManyPropiertys)
            {
                string? atributeName = oneToManyProp.Name;
                var atributeValue = oneToManyProp.GetValue(entity);
                if (atributeValue != null)
                {
                    OneToMany? oneToMany = (OneToMany?)Attribute.GetCustomAttribute(oneToManyProp, typeof(OneToMany));
                    foreach (var value in ((IEnumerable)atributeValue))
                    {
                        PropertyInfo? KeyColumn = value.GetType().GetProperty(oneToMany?.KeyColumn);
                        PropertyInfo? ForeignKeyColumn = value.GetType().GetProperty(oneToMany?.ForeignKeyColumn);
                        if (ForeignKeyColumn != null)
                        {
                            var primaryKeyValue = entity?.GetType()?.GetProperty(KeyColumn?.Name)?.GetValue(entity);
                            InsertRelationatedObject(primaryKeyValue, value, ForeignKeyColumn);
                        }
                    }
                }
            }
            return entity;
        }

        private static void SetManyToOnePropiertys(object entity, List<PropertyInfo> manyToOneProps)
        {
            if (manyToOneProps == null) return;
            foreach (var manyToOneProp in manyToOneProps)
            {
                var atributeValue = manyToOneProp.GetValue(entity);
                if (atributeValue != null)
                {
                    ManyToOne? manyToOne = (ManyToOne?)Attribute.GetCustomAttribute(manyToOneProp, typeof(ManyToOne));
                    PropertyInfo? KeyColumn = atributeValue.GetType().GetProperty(manyToOne?.KeyColumn);
                    PropertyInfo? ForeignKeyColumn = atributeValue.GetType().GetProperty(manyToOne?.ForeignKeyColumn);
                    if (ForeignKeyColumn != null)
                    {
                        var FK = entity.GetType().GetProperty(ForeignKeyColumn.Name);
                        if (FK?.GetValue(entity) == null)
                        {
                            var keyVal = atributeValue?.GetType()?.GetProperty(KeyColumn?.Name)?.GetValue(atributeValue);
                            FK?.SetValue(entity, keyVal);
                        }
                    }
                }
            }
        }

        private void InsertRelationatedObject(object foreingKeyValue, object entity, PropertyInfo foreignKeyColumn)
        {
            string action = "InsertO";
            Console.WriteLine("===================> InsertRelationatedObject( -> " + entity.GetType().Name + "): ");
            foreignKeyColumn.SetValue(entity, foreingKeyValue);
            List<PropertyInfo> entityProps = entity.GetType().GetProperties().ToList();
            var pkPropiertys = entityProps.Where(p => (PrimaryKey?)Attribute.GetCustomAttribute(p, typeof(PrimaryKey)) != null).ToList();
            var values = pkPropiertys.Where(p => p.GetValue(entity) != null).ToList();
            if (pkPropiertys.Count == values.Count)
            {
                action = "Update";
                UpdateObject(entity, pkPropiertys.Select(p => p.Name).ToArray());
            }
            else this.InsertObject(entity);

        }

        public object UpdateObject(Object entity, string[] IdObject)
        {
            Console.WriteLine("->");
            Console.WriteLine("-- ==================> UpdateObject(Object Inst, string[] IdObject)");
            List<PropertyInfo> entityProps = entity.GetType().GetProperties().ToList();
            List<PropertyInfo> pimaryKeyPropiertys = entityProps.Where(p => Attribute.GetCustomAttribute(p, typeof(PrimaryKey)) != null).ToList();
            List<PropertyInfo> manyToOneProps = entityProps.Where(p => Attribute.GetCustomAttribute(p, typeof(ManyToOne)) != null).ToList();
            // SELECCIONAR LOS VALORES DE LAS LLAVES PRIMARIAS DE LOS MANYTOONE
            SetManyToOnePropiertys(entity, manyToOneProps);
            string strQuery = BuildUpdateQueryByObject(entity, IdObject);

            var methods = entity.GetType().GetMethods();
            var method = methods.FirstOrDefault(mi => mi.Name == "Find" && mi.GetParameters().Count() == 0);
            if (method != null)
            {
                List<PropertyInfo> oneToManyPropiertys = entityProps.Where(p =>
                    Attribute.GetCustomAttribute(p, typeof(OneToMany)) != null).ToList();
                object? tempEntity = method?.GetGenericMethodDefinition()?.MakeGenericMethod(entity?.GetType())
                    .Invoke(entity, new object[] { });
                foreach (var oneToManyProp in oneToManyPropiertys)
                {
                    string? atributeName = oneToManyProp.Name;
                    var atributeValue = oneToManyProp.GetValue(entity);
                    if (atributeValue != null)
                    {
                        List<PropertyInfo> atributeValueManyToOneProps = atributeValue.GetType().GetProperties().Where(p => Attribute.GetCustomAttribute(p, typeof(ManyToOne)) != null).ToList();
                        SetManyToOnePropiertys(atributeValue, atributeValueManyToOneProps);
                        OneToMany? oneToMany = (OneToMany?)Attribute.GetCustomAttribute(oneToManyProp, typeof(OneToMany));
                        if (tempEntity != null && oneToManyProp.GetValue(tempEntity) != null)
                        {
                            var tempAtributeValue = oneToManyProp.GetValue(tempEntity);
                            foreach (var valueT in ((IEnumerable)tempAtributeValue))
                            {
                                bool exists = false;
                                foreach (var valueE in ((IEnumerable)atributeValue))
                                {
                                    if (JsonCompare(valueT, valueE))
                                    {
                                        exists = true;
                                    }
                                }
                                if (!exists)
                                {
                                    Delete(valueT);
                                }
                            }
                        }
                        foreach (var value in ((IEnumerable)atributeValue))
                        {
                            PropertyInfo? KeyColumn = value.GetType().GetProperty(oneToMany?.KeyColumn);
                            PropertyInfo? ForeignKeyColumn = value.GetType().GetProperty(oneToMany?.ForeignKeyColumn);
                            if (ForeignKeyColumn != null)
                            {
                                var primaryKeyValue = entity?.GetType()?.GetProperty(KeyColumn?.Name)?.GetValue(entity);
                                InsertRelationatedObject(primaryKeyValue, value, ForeignKeyColumn);
                            }
                        }
                    }
                }
            }

            ExcuteSqlQuery(strQuery);
            return entity;

        }
        public object UpdateObject(Object Inst, string IdObject)
        {
            Console.WriteLine("->");
            Console.WriteLine("-- ==================> UpdateObject(Object Inst, string IdObject)");
            if (Inst.GetType().GetProperty(IdObject)?.GetValue(Inst) == null)
            {
                throw new Exception("Valor de la propiedad "
                    + IdObject + " en la instancia "
                    + Inst.GetType().Name + " esta en nulo y no es posible actualizar");
            }
            string strQuery = BuildUpdateQueryByObject(Inst, IdObject);
            return ExcuteSqlQuery(strQuery);
        }
        public object Delete(Object Inst)
        {
            Console.WriteLine("->");
            Console.WriteLine("-- ==================> Delete(Object Inst)");
            string strQuery = BuildDeleteQuery(Inst);
            return ExcuteSqlQuery(strQuery);
        }

        //LECTURA DE OBJETOS
        public List<T> TakeList<T>(Object Inst, bool fullEntity, string CondSQL = "")
        {
            try
            {
                Console.WriteLine("->");
                Console.WriteLine("-- ==================> TakeList<T>(" +
                    Inst.GetType().Name + ",fullEntity: " +
                    fullEntity.ToString() + ", condition: " + CondSQL + ")");
                DataTable Table = BuildTable(Inst, ref CondSQL, fullEntity, false);
                List<T> ListD = ConvertDataTable<T>(Table, Inst);
                return ListD;
            }
            catch (Exception)
            {
                SQLMCon().Close();
                throw;
            }
        }



        public T? TakeObject<T>(Object Inst, string CondSQL = "")
        {
            Console.WriteLine("->");
            Console.WriteLine("-- ==================> TakeObject<T>(Object Inst, bool fullEntity, string CondSQL = )");
            DataTable Table = BuildTable(Inst, ref CondSQL, true, true);
            if (Table.Rows.Count != 0)
            {
                var CObject = ConvertRow<T>(Inst, Table.Rows[0]);
                return CObject;
            }
            else
            {
                return default(T);

            }
        }

        protected private DataTable BuildTable(object Inst, ref string CondSQL, bool fullEntity = true, bool isFind = true)
        {
            string queryString = BuildSelectQuery(Inst, CondSQL, fullEntity, isFind);
            Console.WriteLine("->");
            Console.WriteLine(queryString);
            DataTable Table = TraerDatosSQL(queryString);
            return Table;
        }
        //LECTURA Y CONVERSION DE DATOS       
        protected List<T> ConvertDataTable<T>(DataTable dt, object Inst)
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
                    foreach (PropertyInfo oProperty in temp.GetProperties())
                    {
                        if (oProperty.Name == column.ColumnName)
                        {
                            var val = dr[column.ColumnName];
                            var oneToOne = (OneToOne?)Attribute.GetCustomAttribute(oProperty, typeof(OneToOne));
                            var manyToOne = (ManyToOne?)Attribute.GetCustomAttribute(oProperty, typeof(ManyToOne));
                            var oneToMany = (OneToMany?)Attribute.GetCustomAttribute(oProperty, typeof(OneToMany));
                            if (manyToOne != null)
                            {
                                var getVal = GetListValue(val, oProperty.PropertyType);
                                oProperty.SetValue(obj, getVal);
                            }
                            else if (oneToMany != null)
                            {
                                var getVal = GetListValue(val, oProperty.PropertyType);
                                oProperty.SetValue(obj, getVal);
                            }
                            else
                            {
                                var getVal = GetValue(val, oProperty.PropertyType);
                                oProperty.SetValue(obj, getVal);
                            }

                        }
                        else continue;
                    }
                }
                else continue;

            }
            return obj;
        }

        private static object GetValue(Object DefaultValue, Type type)
        {
            string? Literal = DefaultValue.ToString();
            if (Literal == null || Literal == "" || Literal == string.Empty) return DefaultValue;
            IConvertible obj = Literal;
            Type? u = Nullable.GetUnderlyingType(type);
            if (u != null)
            {
                return (obj == null) ? DefaultValue : Convert.ChangeType(obj, u);
            }
            else
            {
                return Convert.ChangeType(obj, type);
            }
        }
        private static object? GetListValue(Object DefaultValue, Type type)
        {
            string? Literal = DefaultValue.ToString();
            if (Literal == null || Literal == "" || Literal == string.Empty) return null;
            var ListInstanceType = JsonConvert.DeserializeObject(Literal, type);
            return ListInstanceType;
        }
        //DEPRECATE        
        public static bool JsonCompare(object obj, object another)
        {
            if (ReferenceEquals(obj, another)) return true;
            if ((obj == null) || (another == null)) return false;
            if (obj.GetType() != another.GetType()) return false;

            var objJson = JsonConvert.SerializeObject(obj);
            var anotherJson = JsonConvert.SerializeObject(another);

            return objJson == anotherJson;
        }

    }
}
