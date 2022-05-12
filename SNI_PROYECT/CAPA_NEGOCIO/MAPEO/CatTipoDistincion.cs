using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
	public class CatTipoDistincion : EntityClass
	{
		public int Id_Tipo_Distincion { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
}
