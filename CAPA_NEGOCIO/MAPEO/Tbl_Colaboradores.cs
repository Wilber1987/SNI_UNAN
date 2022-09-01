using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Colaboradores: EntityClass
    {
        public int? Id_Investigacion { get; set; }
        public int? Id_Tipo_Colaboracion { get; set; }
        public int? Id_Investigador { get; set; }
        //public string Estado { get; set; }
        public DateTime? Fecha_ingreso { get; set; }

        [OneToOne(ForeignKeyColumn  = "Id_Investigacion")]
        public Tbl_Investigaciones Investigacion { get; set; }
        public Cat_Tipo_Colaborador TipoColaboracion { get; set; }

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
