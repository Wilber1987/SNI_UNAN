using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
	public class Tbl_Evento : EntityClass
	{
		public int? Id_Evento { get; set; }
		public int? Id_Tipo_Evento { get; set; }
		public string Nombre { get; set; }
		public int? Id_Pais { get; set; }
		public string Titulo_Ponencia { get; set; }
		public DateTime? Fecha_Inicio { get; set; }
		public DateTime? Fecha_Finalizacion { get; set; }
		public string Modalidad { get; set; }
		public string Modalidad_Ponencia { get; set; }
		public string Link { get; set; }
		public string Datos_Adicionales { get; set; }
		public int? Id_Investigador { get; set; }
	}
}
