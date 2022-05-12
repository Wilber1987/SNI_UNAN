using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
	public class Tbl_Datos_Laborales : EntityClass
	{
		public int? Id_DatoL { get; set; }
		public int? Id_Investigador { get; set; }
		public int? Id_Cargo { get; set; }
		public DateTime? Fecha_Inicio { get; set; }
		public DateTime? Fecha_Finalizacion { get; set; }
		public string Facultad { get; set; }
		public string Unidad { get; set; }

	}
}
