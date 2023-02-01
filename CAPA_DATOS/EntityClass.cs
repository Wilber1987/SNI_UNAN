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
            SqlADOConexion.SQLM.BeginTransaction();
            var Data = SqlADOConexion.SQLM.TakeList<T>(this);
            SqlADOConexion.SQLM.CommitTransaction();
            return Data;
        }
        public static List<T> EndpointMethod<T>()
        {
            List<T> list = new List<T>();

            return list;
        }
        public T Find<T>()
        {
            SqlADOConexion.SQLM.BeginTransaction();
            var Data = SqlADOConexion.SQLM.TakeObject<T>(this);
            SqlADOConexion.SQLM.CommitTransaction();
            return Data;
        }
        public List<T> Get<T>(string condition)
        {
            SqlADOConexion.SQLM.BeginTransaction();
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, condition);
            SqlADOConexion.SQLM.CommitTransaction();
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
                //var method = this.GetType().GetMethods().FirstOrDefault(mi => mi.Name == "Find" && mi.GetParameters().Count() == 0);
                var result = SqlADOConexion.SQLM.InsertObject(this);
                SqlADOConexion.SQLM.CommitTransaction();
                return result;
            }
            catch (Exception)
            {
                SqlADOConexion.SQLM.RollBackTransaction();
                return false;
            }
        }
        public object Update()
        {
            try
            {
                SqlADOConexion.SQLM.BeginTransaction();
                //var method = this.GetType().GetMethods().FirstOrDefault(mi => mi.Name == "Find" && mi.GetParameters().Count() == 0);
                //var result = SqlADOConexion.SQLM.InsertObject(this);
                SqlADOConexion.SQLM.CommitTransaction();
                return true;
            }
            catch (Exception)
            {
                SqlADOConexion.SQLM.RollBackTransaction();
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
