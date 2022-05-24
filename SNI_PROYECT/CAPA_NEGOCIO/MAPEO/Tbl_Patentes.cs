using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
	public class Tbl_Patentes : EntityClass
	{
		public int? Id_Patente { get; set; }
		public DateTime? fecha { get; set; }
		public int? Id_Institucion { get; set; }
		public int? Id_Investigador { get; set; }
		public string Estado { get; set; }
	}
}
