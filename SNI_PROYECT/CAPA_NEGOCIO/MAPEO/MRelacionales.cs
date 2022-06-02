using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
	public class Tbl_Investigaciones_Disciplinas : EntityClass
	{
		public int? Id_Disciplina { get; set; }
		public int? Id_Investigacion { get; set; }
	}

	public class Tbl_IdiomasInv : EntityClass
	{
		public int? Id_Investigador { get; set; }
		public int? Id_Idioma { get; set; }
	}
}
