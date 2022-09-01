using CAPA_DATOS;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Participantes_Proyectos: EntityClass
    {
        public int? Id_Investigador { get;  set; }
        public int? Id_Proyecto { get; set; }
        public DateTime? Fecha_Ingreso { get; set; }
        public string Estado_Participante { get; set; }
        public int? Id_Cargo_Proyecto { get; set; }
        public Cat_Cargo_Proyecto Cargo { get; set; }
        public Tbl_InvestigatorProfile Perfil { get; set; }
        public Tbl_Proyectos Proyecto { get; set; }

       
    }
}
