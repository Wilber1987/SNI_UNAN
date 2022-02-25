using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class CatDependencias
    {
        public int IdDependencia { get; set; }
        public string Descripcion { get;  set; }
        public int IdDependenciaP { get; set; }
        public List<Object> TakeAgenda()
        {
            var Dependencias = SqlADOConexion.SQLM.TakeList(typeof(CatDependencias).Name, this);
            return Dependencias;
        }
    }
}
