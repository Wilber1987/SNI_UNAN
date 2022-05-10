using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public abstract class EntityClass
    {
        public List<Object> Get()
        {
            var Data = SqlADOConexion.SQLM.TakeList(this);
            return Data;
        }
        public List<Object> Get(string condition)
        {
            var Data = SqlADOConexion.SQLM.TakeList(this, condition);
            return Data;
        }
        public List<T> Get<T>(string condition)
        {
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, condition);
            return Data;
        }
        public List<Object> Get_WhereIN(string Field, string[] conditions)
        {
            string condition = BuildArrayIN(conditions);
            var Data = SqlADOConexion.SQLM.TakeList(this, Field + " IN (" + condition + ")");
            return Data;
        }
        public List<T> Get_WhereIN<T>(string Field, string[] conditions)
        {
            string condition = BuildArrayIN(conditions);
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, Field + " IN (" + condition + ")");
            return Data;
        }
        public List<Object> Get_WhereNotIN(string Field, string[] conditions)
        {
            string condition = BuildArrayIN(conditions);
            var Data = SqlADOConexion.SQLM.TakeList(this, Field + " NOT IN (" + condition + ")");
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
            return condition;
        }       
        public bool Save()
        {
            SqlADOConexion.SQLM.InsertObject(this);
            return true;
        }
    }
}
