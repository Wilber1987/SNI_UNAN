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
            var Data = SqlADOConexion.SQLM.TakeObject<T>(this);
            return Data;
        }
        public List<T> Get<T>(string condition)
        {
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, condition);
            return Data;
        }      
        public List<T> Get_WhereIN<T>(string Field, string[] conditions)
        {
            string condition = BuildArrayIN(conditions);
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, Field + " IN (" + condition + ")");
            return Data;
        }
        public List<T> Get_WhereNotIN<T>(string Field, string[] conditions)
        {
            string condition = BuildArrayIN(conditions);
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, Field + " NOT IN (" + condition + ")");
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
                //var method = this.GetType().GetMethods().FirstOrDefault(mi => mi.Name == "Find" && mi.GetParameters().Count() == 0);
                return SqlADOConexion.SQLM.InsertObject(this);
               
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(string Id)
        {
            SqlADOConexion.SQLM.UpdateObject(this, Id);
            return true;
        }
        public bool Update(string[] Id)
        {
            SqlADOConexion.SQLM.UpdateObject(this, Id);
            return true;
        }
        public bool Delete()
        {
            SqlADOConexion.SQLM.Delete(this);
            return true;
        }
    }
}
