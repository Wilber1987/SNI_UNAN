using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Formacion_Academica : EntityClass
    {
        public int? IdFormacion { get;  set; }
        public int? Id_Investigador { get; set; }
        public int? Id_TipoEstudio { get; set; }
        public int? Id_Institucion { get; set; }
        public string Disciplina { get; set; }
        public DateTime? Fecha_Inicio { get; set; }
        public DateTime? Fecha_Finalizacion { get; set; }
        public Cat_TipoEstudio TipoEstudio { get; set; }
        public Cat_instituciones Institucion { get; set; }
        public Tbl_InvestigatorProfile InvestigatorProfile { get; set; }
    }
}
