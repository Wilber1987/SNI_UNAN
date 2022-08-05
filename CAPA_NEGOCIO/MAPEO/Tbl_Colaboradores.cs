using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Colaboradores: Tbl_InvestigatorProfile
    {
        public int? Id_Investigacion { get; set; }
        //public int Id_Investigador { get; set; }
        //public string Estado { get; set; }
        public DateTime? Fecha_ingreso { get; set; }
        public int? id_Tipo_Colaboracion { get; set; }
        //ADICIONALES
        public string TipoColaboracion { get; set; }
        public string Titulo { get; set; }
        public DateTime? Fecha_ejecucion { get; set; }



        public Object TakeColaboradores()
        {
            try
            {
                return true;// SqlADOConexion.SQLM.TakeList("ViewColaboradores", this);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
