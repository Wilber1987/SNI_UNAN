using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Reflection;

namespace CAPA_DATOS
{
    public class SqlServerGDatos : GDatosAbstract
    {
        public SqlServerGDatos(string ConexionString)
        {
            this.ConexionString = ConexionString;
        }

        protected override IDbConnection SQLMCon()
        {
            if (this.MTConnection != null)
            {
                return this.MTConnection;
            }
            return CrearConexion(ConexionString);
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
        protected override List<EntityProps> DescribeEntity(string entityName)
        {
            string DescribeQuery = @"SELECT COLUMN_NAME, IS_NULLABLE, DATA_TYPE, TABLE_SCHEMA
                                    from [INFORMATION_SCHEMA].[COLUMNS] 
                                    WHERE [TABLE_NAME] = '" + entityName
                                   + "' order by [ORDINAL_POSITION]";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            return ConvertDataTable<EntityProps>(Table, new EntityProps());
        }
        protected override string BuildInsertQueryByObject(object Inst)
        {
            string ColumnNames = "";
            string Values = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            List<EntityProps> entityProps = DescribeEntity(Inst.GetType().Name);
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                var EntityProp = entityProps.Find(e => e.COLUMN_NAME == AtributeName);
                if (AtributeValue != null && EntityProp != null)
                {
                    switch (EntityProp.DATA_TYPE)
                    {
                        case "nvarchar":
                        case "varchar":
                        case "char":
                            ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                            Values = Values + "'" + AtributeValue.ToString() + "',";
                            break;
                        case "int":
                        case "float":
                        case "decimal":
                        case "bigint":
                        case "money":
                        case "smallint":
                            ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                            Values = Values + AtributeValue.ToString() + ",";
                            break;
                        case "bit":
                            Values = Values + AtributeName + "= '" + (AtributeValue.ToString() == "True" ? "1" : "0") + "',";
                            break;
                        case "datetime":
                        case "date":
                            ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                            Values = Values + "'" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd HH:mm:ss") + "',";
                            break;
                    }
                }
                else continue;

            }
            ColumnNames = ColumnNames.TrimEnd(',');
            Values = Values.TrimEnd(',');
            string QUERY = "INSERT INTO "  + entityProps[0].TABLE_SCHEMA + "."  + Inst.GetType().Name + "(" + ColumnNames + ") VALUES(" + Values + ") SELECT SCOPE_IDENTITY()";
            LoggerServices.AddMessageInfo(QUERY);
            return QUERY;
        }
        protected override string BuildUpdateQueryByObject(object Inst, string IdObject)
        {
            string TableName = Inst.GetType().Name;
            string Values = "";
            string Conditions = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            List<EntityProps> entityProps = DescribeEntity(Inst.GetType().Name);
            int index = 0;
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                var EntityProp = entityProps.Find(e => e.COLUMN_NAME == AtributeName);
                if (AtributeValue != null && EntityProp != null)
                {
                    if (IdObject != AtributeName)
                    {
                        Values = BuildSetsForUpdate(Values, AtributeName, AtributeValue, EntityProp);
                    }
                    else WhereConstruction(ref Conditions, ref index, AtributeName, AtributeValue);
                }
                else continue;
            }
            Values = Values.TrimEnd(',');
            string strQuery = "UPDATE  "  + entityProps[0].TABLE_SCHEMA + "."  + TableName + " SET " + Values + Conditions;
            LoggerServices.AddMessageInfo(strQuery);
            return strQuery;
        }
        protected override string BuildUpdateQueryByObject(object Inst, string[] WhereProps)
        {
            string TableName = Inst.GetType().Name;
            string Values = "";
            string Conditions = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            List<EntityProps> entityProps = DescribeEntity(Inst.GetType().Name);
            int index = 0;
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                var EntityProp = entityProps.Find(e => e.COLUMN_NAME == AtributeName);
                if (AtributeValue != null && EntityProp != null)
                {
                    if ((from O in WhereProps where O == AtributeName select O).ToList().Count == 0)
                    {
                        Values = BuildSetsForUpdate(Values, AtributeName, AtributeValue, EntityProp);
                    }
                    else WhereConstruction(ref Conditions, ref index, AtributeName, AtributeValue);
                }
                else continue;
            }
            Values = Values.TrimEnd(',');
            string strQuery = "UPDATE  "  + entityProps[0].TABLE_SCHEMA + "." + TableName + " SET " + Values + Conditions;
            LoggerServices.AddMessageInfo(strQuery);
            return strQuery;
        }
        protected override string BuildDeleteQuery(object Inst)
        {
            string TableName = Inst.GetType().Name;
            string CondicionString = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            int index = 0;
            List<EntityProps> entityProps = DescribeEntity(Inst.GetType().Name);
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
            string strQuery = "DELETE FROM  "  + entityProps[0].TABLE_SCHEMA + "."  + TableName + CondicionString;
            LoggerServices.AddMessageInfo(strQuery);
            return strQuery;
        }
        protected override string BuildSelectQuery(object Inst, string CondSQL, bool fullEntity = true, bool isFind = false)
        {
            string CondicionString = "";
            string Columns = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            List<EntityProps> entityProps = DescribeEntity(Inst.GetType().Name);
            int index = 0;
            string tableAlias = tableAliaGenerator();
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var EntityProp = entityProps.Find(e => e.COLUMN_NAME == AtributeName);
                var oneToOne = (OneToOne?)Attribute.GetCustomAttribute(oProperty, typeof(OneToOne));
                var manyToOne = (ManyToOne?)Attribute.GetCustomAttribute(oProperty, typeof(ManyToOne));
                var oneToMany = (OneToMany?)Attribute.GetCustomAttribute(oProperty, typeof(OneToMany));
                if (EntityProp != null)
                {
                    var AtributeValue = oProperty.GetValue(Inst);
                    Columns = Columns + AtributeName + ",";
                    if (AtributeValue != null)
                    {
                        WhereConstruction(ref CondicionString, ref index, AtributeName, AtributeValue);
                    }
                }
                else if (manyToOne != null && fullEntity)
                {
                    var manyToOneInstance = Activator.CreateInstance(oProperty.PropertyType);
                    string condition = " " + manyToOne.KeyColumn + " = " + tableAlias + "." + manyToOne.ForeignKeyColumn
                        + " FOR JSON PATH,  ROOT('object') ";
                    Columns = Columns + AtributeName
                        + " = JSON_QUERY(("
                        + BuildSelectQuery(manyToOneInstance, condition, false)
                        + "),'$.object[0]'),";
                }
                else if (oneToMany != null && fullEntity)
                {
                    var oneToManyInstance = Activator.CreateInstance(oProperty.PropertyType.GetGenericArguments()[0]);
                    string condition = " " + oneToMany.ForeignKeyColumn + " = " + tableAlias + "." + oneToMany.KeyColumn + " FOR JSON PATH";
                    Columns = Columns + AtributeName
                        + " = ("
                        + BuildSelectQuery(oneToManyInstance, condition, oneToMany.TableName != Inst.GetType().Name)
                        + "),";
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
            Columns = Columns.TrimEnd(',');
            string queryString = "SELECT " + Columns
                + " FROM " + entityProps[0].TABLE_SCHEMA + "." + Inst.GetType().Name + " as " + tableAlias
                + CondicionString + CondSQL;
            return queryString;
        }
        private static string BuildSetsForUpdate(string Values, string AtributeName, object AtributeValue, EntityProps EntityProp)
        {
            switch (EntityProp.DATA_TYPE)
            {
                case "nvarchar":
                case "varchar":
                case "char":
                    Values = Values + AtributeName + "= '" + AtributeValue.ToString() + "',";
                    break;
                case "int":
                case "float":
                case "decimal":
                case "bigint":
                case "money":
                case "smallint":
                    Values = Values + AtributeName + "= " + AtributeValue.ToString() + ",";
                    break;
                case "bit":
                    Values = Values + AtributeName + "= '" + (AtributeValue.ToString() == "True" ? "1" : "0") + "',";
                    break;
                case "datetime":
                case "date":
                    Values = Values + AtributeName + "= '" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd") + "',";
                    break;
            }

            return Values;
        }
        private static string tableAliaGenerator()
        {
            char ta = (char)(((int)'A') + new Random().Next(26));
            char ta2 = (char)(((int)'A') + new Random().Next(26));
            char ta3 = (char)(((int)'A') + new Random().Next(26));
            char ta4 = (char)(((int)'A') + new Random().Next(26));
             char ta5 = (char)(((int)'A') + new Random().Next(26));
            return ta.ToString() + ta2 + ta3 + "_" + ta4 + "_" + ta5 ;
        }
        private static void WhereConstruction(ref string CondicionString, ref int index, string AtributeName, object AtributeValue)
        {
            if (AtributeValue != null)
            {
                if (AtributeValue?.GetType() == typeof(string) && AtributeValue?.ToString()?.Length < 200)
                {
                    WhereOrAnd(ref CondicionString, ref index);
                    CondicionString = CondicionString + AtributeName + " LIKE '%" + AtributeValue.ToString() + "%' ";
                }
                else if (AtributeValue?.GetType() == typeof(DateTime))
                {
                    WhereOrAnd(ref CondicionString, ref index);
                    CondicionString = CondicionString + AtributeName
                        + "= '" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd") + "' ";
                }
                else if (AtributeValue?.GetType() == typeof(int)
                                    || AtributeValue?.GetType() == typeof(Double)
                                    || AtributeValue?.GetType() == typeof(Decimal)
                                    || AtributeValue?.GetType() == typeof(int?))
                {
                    WhereOrAnd(ref CondicionString, ref index);
                    CondicionString = CondicionString + AtributeName + "=" + AtributeValue?.ToString() + " ";
                }
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
        //DATA SQUEMA
        public List<EntitySchema> databaseSchemas()
        {
            string DescribeQuery = @"SELECT TABLE_SCHEMA FROM [INFORMATION_SCHEMA].[TABLES]  group by TABLE_SCHEMA";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            var es = ConvertDataTable<EntitySchema>(Table, new EntitySchema());
            return es;
        }

        public List<EntitySchema> databaseTypes()
        {
            string DescribeQuery = @"SELECT TABLE_TYPE FROM [INFORMATION_SCHEMA].[TABLES]  group by TABLE_TYPE";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            var es = ConvertDataTable<EntitySchema>(Table, new EntitySchema());
            return es;
        }
        public List<EntitySchema> describeSchema(string schema, string type)
        {
            string DescribeQuery = @"SELECT TABLE_SCHEMA, TABLE_NAME, TABLE_TYPE 
                                    FROM [INFORMATION_SCHEMA].[TABLES]  
                                    where TABLE_SCHEMA = '" + schema + "' and TABLE_TYPE = '" + type + "'";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            var es = ConvertDataTable<EntitySchema>(Table, new EntitySchema());
            return es;
        }
        public EntityColumn describePrimaryKey(string table, string column)
        {
            string DescribeQuery = @"exec sp_columns'" + table + "'";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            var es = ConvertDataTable<EntityColumn>(Table, new EntityColumn());
            return es.Find(e => e.COLUMN_NAME == column && e.TYPE_NAME.Contains("identity"));
        }

        public List<EntityProps> describeEntity(string entityName)
        {
            string DescribeQuery = @"SELECT COLUMN_NAME, IS_NULLABLE, DATA_TYPE
                                    from [INFORMATION_SCHEMA].[COLUMNS] 
                                    WHERE [TABLE_NAME] = '" + entityName
                                   + "' order by [ORDINAL_POSITION]";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            return ConvertDataTable<EntityProps>(Table, new EntityProps());
        }

        public List<OneToOneSchema> ManyToOneKeys(string entityName)
        {
            string DescribeQuery = @"SELECT   
                    f.name AS foreign_key_name  
                   ,OBJECT_NAME(f.parent_object_id) AS TABLE_NAME  
                   ,COL_NAME(fc.parent_object_id, fc.parent_column_id) AS CONSTRAINT_COLUMN_NAME  
                   ,OBJECT_NAME (f.referenced_object_id) AS REFERENCE_TABLE_NAME  
                   ,COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS REFERENCE_COLUMN_NAME  
                   ,f.is_disabled, f.is_not_trusted
                   ,f.delete_referential_action_desc  
                   ,f.update_referential_action_desc  
                FROM sys.foreign_keys AS f  
                INNER JOIN sys.foreign_key_columns AS fc   
                   ON f.object_id = fc.constraint_object_id   
                WHERE f.parent_object_id = OBJECT_ID('" + entityName + "')";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            return ConvertDataTable<OneToOneSchema>(Table, new OneToOneSchema());
        }

        public Boolean isPrimary(string entityName, string column)
        {
            return evalKeyType(entityName, column, "PRIMARY KEY");
        }
        public Boolean isForeinKey(string entityName, string column)
        {
            return evalKeyType(entityName, column, "FOREIGN KEY");
        }
        private bool evalKeyType(string entityName, string column, string keyType)
        {
            string DescribeQuery = @"SELECT
                    Col.Column_Name,  *
                from
                    INFORMATION_SCHEMA.TABLE_CONSTRAINTS Tab
                    join INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE Col
                        on Col.Constraint_Name = Tab.Constraint_Name
                           and Col.Table_Name = Tab.Table_Name
                where
                    Constraint_Type = '" + keyType + @"'
                    and Tab.TABLE_NAME = '" + entityName + @"'
                    and Col.Column_Name = '" + column + "';";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            return Table.Rows.Count > 0;
        }

        public List<OneToManySchema> oneToManyKeys(string entityName)
        {
            string DescribeQuery = @"exec sp_fkeys '" + entityName + "'";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            return ConvertDataTable<OneToManySchema>(Table, new OneToManySchema());
        }


    }

}
