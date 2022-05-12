using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
	public class Tbl_Distinciones : EntityClass
	{
		public int? Id_Distincion { get; set; }
		public int? Id_Investigador { get; set; }
		public int? Id_Tipo_Distincion { get; set; }
		public string Descripcion { get; set; }
		public DateTime? fecha { get; set; }
		public int? Id_Institucion { get; set; }
		public string Montos { get; set; }
        public CatTipoDistincion TipoDistincion { get; set; }
    }
}
