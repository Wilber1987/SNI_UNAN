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
            var Data = SqlADOConexion.SQLM?.TakeList<T>(this);
            return Data ?? new List<T>();
        }
        public static List<T> EndpointMethod<T>()
        {
            List<T> list = new List<T>();
            return list;
        }
        public T? Find<T>()
        {
            var Data = SqlADOConexion.SQLM != null ? SqlADOConexion.SQLM.TakeObject<T>(this, true) : default(T);
            return Data;
        }

        public T? SimpleFind<T>()
        {
            var Data = SqlADOConexion.SQLM != null ? SqlADOConexion.SQLM.TakeObject<T>(this, false) : default(T);
            return Data;
        }
        public List<T> Get<T>(string condition)
        {
            var Data = SqlADOConexion.SQLM?.TakeList<T>(this, condition);
            return Data ?? new List<T>();
        }
        public List<T> Get_WhereIN<T>(string Field, string?[]? conditions)
        {
            string condition = BuildArrayIN(conditions);
            var Data = SqlADOConexion.SQLM?.TakeList<T>(this, Field + " IN (" + condition + ")");
             return Data ?? new List<T>();
        }
        public List<T> Get_WhereNotIN<T>(string Field, string[] conditions)
        {
            string condition = BuildArrayIN(conditions);
            var Data = SqlADOConexion.SQLM?.TakeList<T>(this, Field + " NOT IN (" + condition + ")");
            return Data ?? new List<T>();
        }
        private static string BuildArrayIN(string?[]? conditions)
        {
            string condition = "";
            foreach (string? Value in conditions ?? new string?[0])
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
        public object? Save()
        {
            try
            {
                SqlADOConexion.SQLM?.BeginTransaction();
                var result = SqlADOConexion.SQLM?.InsertObject(this);
                SqlADOConexion.SQLM?.CommitTransaction();
                return result;
            }
            catch (Exception E)
            {
                SqlADOConexion.SQLM?.RollBackTransaction();
                throw E;
            }
        }
        public object? Update()
        {
            try
            {
                PropertyInfo[] lst = this.GetType().GetProperties();
                var pkPropiertys = lst.Where(p => (PrimaryKey?)Attribute.GetCustomAttribute(p, typeof(PrimaryKey)) != null).ToList();
                var values = pkPropiertys.Where(p => p.GetValue(this) != null).ToList();
                if (pkPropiertys.Count == values.Count) this.Update(pkPropiertys.Select(p => p.Name).ToArray());
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
                SqlADOConexion.SQLM?.BeginTransaction();
                SqlADOConexion.SQLM?.UpdateObject(this, Id);
                SqlADOConexion.SQLM?.CommitTransaction();
                return true;
            }
            catch (Exception)
            {
                SqlADOConexion.SQLM?.RollBackTransaction();
                return false;
            }
        }
        public bool Update(string[] Id)
        {
            try
            {
                SqlADOConexion.SQLM?.BeginTransaction();
                SqlADOConexion.SQLM?.UpdateObject(this, Id);
                SqlADOConexion.SQLM?.CommitTransaction();
                return true;
            }
            catch (Exception)
            {
                SqlADOConexion.SQLM?.RollBackTransaction();
                return false;
            }
        }
        public bool Delete()
        {
            try
            {
                SqlADOConexion.SQLM?.BeginTransaction();
                SqlADOConexion.SQLM?.Delete(this);
                SqlADOConexion.SQLM?.CommitTransaction();
                return true;
            }
            catch (Exception)
            {
                SqlADOConexion.SQLM?.RollBackTransaction();
                return false;
            }
        }
    }
}
