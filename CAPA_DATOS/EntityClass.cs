using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_DATOS
{
    public abstract class EntityClass
    {
        public List<T> Get<T>()
        {
            var Data = SqlADOConexion.SQLM.TakeList<T>(this);
            return Data;
        }
        public static List<T> EndpointMethod<T>()
        {
            List<T> list = new List<T>();

            return list;
        }
        public T Find<T>()
        {
            var Data = SqlADOConexion.SQLM.TakeObject<T>(this, true);
            return Data;
        }

        public T SimpleFind<T>()
        {
            var Data = SqlADOConexion.SQLM.TakeObject<T>(this, false);
            return Data;
        }
        public List<T> Get<T>(string condition)
        {
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, condition);
            return Data;
        }
        public List<T> Get_WhereIN<T>(string Field, string[] conditions)
        {
            SqlADOConexion.SQLM.BeginTransaction();
            string condition = BuildArrayIN(conditions);
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, Field + " IN (" + condition + ")");
            SqlADOConexion.SQLM.CommitTransaction();
            return Data;
        }
        public List<T> Get_WhereNotIN<T>(string Field, string[] conditions)
        {
            SqlADOConexion.SQLM.BeginTransaction();
            string condition = BuildArrayIN(conditions);
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, Field + " NOT IN (" + condition + ")");
            SqlADOConexion.SQLM.CommitTransaction();
            return Data;
        }
        private static string BuildArrayIN(string[] conditions)
        {
            string condition = "";
            foreach (string Value in conditions)
            {
                condition = condition + Value + ",";
            }
            condition = condition.TrimEnd(',');
            if (condition == "")
            {
                return "-1";
            }
            return condition;
        }
        public object Save()
        {
            try
            {
                SqlADOConexion.SQLM.BeginTransaction();
                var result = SqlADOConexion.SQLM.InsertObject(this);
                SqlADOConexion.SQLM.CommitTransaction();
                return result;
            }
            catch (Exception E)
            {
                SqlADOConexion.SQLM.RollBackTransaction();
                throw E;
            }
        }
        public object Update()
        {
            try
            {
                PropertyInfo[] lst = this.GetType().GetProperties();
                //PrimaryKey primaryKey;
                //foreach (PropertyInfo oProperty in lst)
                //{
                //    primaryKey = (PrimaryKey)Attribute.GetCustomAttribute(oProperty, typeof(PrimaryKey));
                //    if (primaryKey != null)
                //    {
                //        this.Update(oProperty.Name);
                //        break;
                //    }
                //}
                PropertyInfo propierty = lst.FirstOrDefault(p => (PrimaryKey)Attribute.GetCustomAttribute(p, typeof(PrimaryKey)) != null);
                if (propierty != null && propierty.GetValue(this) != null) this.Update(propierty.Name);
                else return false;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(string Id)
        {
            try
            {
                SqlADOConexion.SQLM.BeginTransaction();
                SqlADOConexion.SQLM.UpdateObject(this, Id);
                SqlADOConexion.SQLM.CommitTransaction();
                return true;
            }
            catch (Exception)
            {
                SqlADOConexion.SQLM.RollBackTransaction();
                return false;
            }
        }
        public bool Update(string[] Id)
        {
            try
            {
                SqlADOConexion.SQLM.BeginTransaction();
                SqlADOConexion.SQLM.UpdateObject(this, Id);
                SqlADOConexion.SQLM.CommitTransaction();
                return true;
            }
            catch (Exception)
            {
                SqlADOConexion.SQLM.RollBackTransaction();
                return false;
            }
        }
        public bool Delete()
        {
            try
            {
                SqlADOConexion.SQLM.BeginTransaction();
                SqlADOConexion.SQLM.Delete(this);
                SqlADOConexion.SQLM.CommitTransaction();
                return true;
            }
            catch (Exception)
            {
                SqlADOConexion.SQLM.RollBackTransaction();
                return false;
            }
        }
    }
}
