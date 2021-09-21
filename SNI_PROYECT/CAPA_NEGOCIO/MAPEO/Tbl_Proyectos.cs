using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Proyectos: Cat_Tipo_Proyecto
    {
        public int? Id_Proyecto { get; set; }
        public new int? Id_Tipo_Proyecto {get; set; }
        public string Visibilidad {get; set; }
        public string DescripcionProyecto { get; set; }
        public string Estado_Proyecto {get; set; }
        public DateTime? Fecha_Inicio {get; set; }
        public DateTime? Fecha_Finalizacion {get; set; }
        public string Nombre_Proyecto { get; set; }

    }
}
