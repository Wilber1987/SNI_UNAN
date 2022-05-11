using CAPA_DATOS;
using CAPA_NEGOCIO.MAPEO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO
{
    public class ProyectoTableDependencias_Usuarios : EntityClass
    {
        public int? Id_Investigador { get; set; }
        public int? IdDependencia { get; set; }
        public int? IdCargo { get; set; }
        public Tbl_InvestigatorProfile Usuario { get; set; }
        public ProyectoCatDependencias Dependencia { get; set; }
        public ProyectoCatCargosDepenedencias CargoDependencia { get; set; }

    }
}
