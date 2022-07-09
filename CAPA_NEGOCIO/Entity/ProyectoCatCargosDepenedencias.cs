using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO
{
    public class ProyectoCatCargosDepenedencias : EntityClass
    {
        public int? IdCargo { get; set; }
        public string Descripcion { get; set; }
        public List<ProyectoTableDependencias_Usuarios> DependenciasUsuarios { get; set; }
    }
}
