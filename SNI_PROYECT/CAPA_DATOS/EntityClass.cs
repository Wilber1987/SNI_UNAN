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
    }
}
