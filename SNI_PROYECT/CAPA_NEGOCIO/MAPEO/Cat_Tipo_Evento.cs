using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
	public class Cat_Tipo_Evento : EntityClass
	{
		public int? Id_Tipo_Evento { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
}
