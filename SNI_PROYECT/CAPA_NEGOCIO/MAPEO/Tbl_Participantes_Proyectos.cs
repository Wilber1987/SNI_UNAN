using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Participantes_Proyectos: Tbl_Proyectos
    {
        public int? Id_Investigador { get;  set; }


        public DateTime? Fecha_Ingreso { get; set; }
        public string Estado_Participante { get; set; }
        public int? Id_Cargo_Proyecto { get; set; }
        public string Cargo { get; set; }
        public List<Object> TakeParicipantesProyectos()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList("ViewParticipantesProyectos", this);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
