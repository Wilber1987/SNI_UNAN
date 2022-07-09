using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO
{
    public class ProyectoCatDependencias : EntityClass
    {
        public int? Id_Dependencia { get; set; }
        public string Descripcion { get;  set; }
        public int? Id_Dependencia_Padre { get; set; }
        public int? Id_Institucion { get; set; }

    }
}
