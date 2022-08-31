using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Instituciones_Asociadas: EntityClass
    {
        public int? Id_Institucion { get; set; }
        public int? Id_Proyecto { get; set; }
        public int? Id_Tipo_Asociacion { get; set; }
        public DateTime? Fecha_Ingreso { get; set; }
        public string Estado { get; set; }

        //CAT TIPO ASOCIACION Cat_Tipo_Asociacion
        public string Descripcion { get; set; }
        public Cat_instituciones Institucion { get; set; }
        public Cat_Tipo_Asociacion Asociacion { get; set; }

    }
}
