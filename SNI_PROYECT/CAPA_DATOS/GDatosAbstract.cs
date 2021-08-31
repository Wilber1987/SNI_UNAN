﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace CAPA_DATOS
{
    public abstract class GDatosAbstract
    {
        protected IDbConnection SQLMCon;
        protected abstract IDbConnection CrearConexion(string cadena);
        protected abstract IDbCommand ComandoSql(string comandoSql, IDbConnection connection);
        protected abstract IDataAdapter CrearDataAdapterSql(string comandoSql, IDbConnection connection);
        public bool ExcuteSqlQuery(string strQuery)
        {
            try
            {              
                SQLMCon.Open();
                var com = ComandoSql(strQuery, SQLMCon);
                com.ExecuteNonQuery();
                SQLMCon.Close();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Object InsertObject(string TableName, Object Inst)
        {
            try
            {
                string Values = "";
                Type _type = Inst.GetType();
                PropertyInfo[] lst = _type.GetProperties();
                foreach (PropertyInfo oProperty in lst) {
                    string AtributeName = oProperty.Name;
                    var AtributeValue = oProperty.GetValue(Inst);
                    if (AtributeValue.GetType() == typeof(string) || AtributeValue.GetType() == typeof(DateTime))
                    {
                        Values = Values + "'" + AtributeValue.ToString() + "',";
                    }
                    else
                    {
                        if ((Int32)AtributeValue != -1)
                        {
                            Values = Values + AtributeValue.ToString() + ",";
                        }
                    }
                }
                Values = Values.TrimEnd(',');
                string strQuery = "INSERT INTO " + TableName + " VALUES(" + Values + ")";                
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Object UpdateObject(string TableName, Object Inst, string IdObject)
        {
            try
            {
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
                        if (AtributeValue.GetType() == typeof(string) || AtributeValue.GetType() == typeof(DateTime))
                        {
                            Values = Values + AtributeName + "= '" + AtributeValue.ToString() + "',";
                        }
                        else
                        {
                            Values = Values + AtributeName + "=" + AtributeValue.ToString() + ",";
                        }
                    } else
                    {
                        prop = oProperty;
                    }
                   
                }              
                Values = Values.TrimEnd(',');
                string strQuery = "UPDATE  " + 
                    TableName + " SET " +
                    Values + " WHERE " + IdObject + " = " + prop.GetValue(Inst).ToString();
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public DataTable TraerDatosSQL(string queryString)
        {
            DataSet ObjDS = new DataSet();
            CrearDataAdapterSql(queryString, SQLMCon).Fill(ObjDS);
            return ObjDS.Tables[0].Copy();
        }
        public Object TakeList(string TableName, Object Inst)
        {
            try
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
                        if (index == 0)
                        {
                            CondicionString = " WHERE ";
                            index++;
                        } else
                        {
                            CondicionString = CondicionString + " OR ";
                        }
                        if (AtributeValue.GetType() == typeof(string) || AtributeValue.GetType() == typeof(DateTime))
                        {
                            CondicionString = CondicionString + AtributeName + " LIKE '%" + AtributeValue.ToString() + "%' ";
                        }
                        else
                        {
                            CondicionString = CondicionString + AtributeName + "=" + AtributeValue.ToString() + " ";
                        }
                    }

                }               
                CondicionString = CondicionString.TrimEnd(new char[] { '0', 'R'});
                string queryString = "SELECT TOP 10 * FROM " + TableName + CondicionString;
                DataTable Table = TraerDatosSQL(queryString);
                List<Object> ListD = ConvertDataTable(Table, Inst);
                return ListD;
            }
            catch (Exception)
            {
                throw;
            }
        }
        private static List<Object> ConvertDataTable(DataTable dt, Object Inst) {
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
    }
}
