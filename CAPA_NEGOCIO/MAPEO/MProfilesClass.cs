using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
	public class TblProcesosEditoriales : EntityClass
	{
		public int? Id_Proceso_Editorial { get; set; }
		public int? Id_Investigador { get; set; }
		public string Descripcion { get; set; }
		public DateTime? Fecha { get; set; }
		public int? Id_Tipo_Proceso_Editorial { get; set; }
	}
	public class Cat_Tipo_Proceso_Editorial : EntityClass
	{
		public int? Id_Tipo_Proceso_Editorial { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}

	public class Tbl_Patentes : EntityClass
	{
		public int? Id_Patente { get; set; }
		public DateTime? fecha { get; set; }
		public int? Id_Institucion { get; set; }
		public int? Id_Investigador { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
	public class Tbl_Formacion_Academica : EntityClass
	{
		public int? IdFormacion { get; set; }
		public int? Id_Investigador { get; set; }
		public int? Id_TipoEstudio { get; set; }
		public int? Id_Institucion { get; set; }
		public string Titulo { get; set; }
		public string Disciplina { get; set; }
		public DateTime? Fecha_Inicio { get; set; }
		public DateTime? Fecha_Finalizacion { get; set; }
		public Cat_TipoEstudio TipoEstudio { get; set; }
		public Cat_instituciones Institucion { get; set; }
		//public Tbl_InvestigatorProfile InvestigatorProfile { get; set; }
	}
	public class Tbl_Distinciones : EntityClass
	{
		public int? Id_Distincion { get; set; }
		public int? Id_Investigador { get; set; }
		public int? Id_Tipo_Distincion { get; set; }
		public string Descripcion { get; set; }
		public DateTime? fecha { get; set; }
		public int? Id_Institucion { get; set; }
		public Double? Montos { get; set; }
		public CatTipoDistincion TipoDistincion { get; set; }
	}
	public class Tbl_Datos_Laborales : EntityClass
	{
		public int? Id_DatoL { get; set; }
		public int? Id_Investigador { get; set; }
		public int? Id_Cargo { get; set; }
		public DateTime? Fecha_Inicio { get; set; }
		public DateTime? Fecha_Finalizacion { get; set; }
		public string Institucion { get; set; }
		public string Unidad { get; set; }

	}

}
