using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class CatDependencias : EntityClass
    {
        public int? IdDependencia { get; set; }
        public string Descripcion { get;  set; }
        public int? IdDependenciaP { get; set; }
        
    }
}
