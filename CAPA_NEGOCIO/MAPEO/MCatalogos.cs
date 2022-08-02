using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
	public class CatTipoDistincion : EntityClass
	{
		public int? Id_Tipo_Distincion { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
	public class Cat_Cargos : EntityClass
	{
		public int? Id_Cargo { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
    public class Cat_Paises : EntityClass
    {
        public int? Id_Pais { get; set; }
        public string Estado { get; set; }
        public string Descripcion { get; set; }
    }
	public class Cat_Tipo_Evento : EntityClass
	{
		public int? Id_Tipo_Evento { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}

	public class Cat_TipoEstudio : EntityClass
	{
		public int? Id_TipoEstudio { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}

	public class Cat_TipoGrupo : EntityClass
	{
		public int? Id_TipoGrupo { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}

	public class Cat_TipoMiembro : EntityClass
	{
		public int? Id_TipoMiembro { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
	public class Cat_Cargo_Proyecto : EntityClass
	{
		public int? Id_Cargo_Proyecto { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
	public class Cat_Tipo_Asociacion : EntityClass
	{
		public int? Id_Tipo_Asociacion { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
	public class Cat_Tipo_Investigacion : EntityClass
	{
		public int? Id_Tipo_Investigacion { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
	public class Cat_Localidad : EntityClass
	{
		public int? Id_Localidad { get; set; }
		public string Nombre_Localidad { get; set; }
		public int? Id_Tipo_Localidad { get; set; }
		public int? Id_LocalidadPadre { get; set; }
		public int? Id_Pais { get; set; }
		public string Latitud { get; set; }
		public string Estado { get; set; }

	}
	public class Cat_TipoLocalidad : EntityClass
	{
		public int? Id_Tipo_Localidad { get; set; }
		public string Nombre_TipoLocalidad { get; set; }
		public string Estado { get; set; }
	}
	//public class Cat_Disciplinas : EntityClass
	//{
	//	public int? Id_Disciplina { get; set; }
	//	public string DescripcionDisciplina { get; set; }
	//	public string Color { get; set; }
	//	public string Icono { get; set; }
	//	public string Estado { get; set; }
	//}
	public class Cat_Tipo_Colaborador : EntityClass
	{
		public int? Id_Tipo_Colaboracion { get; set; }
		public string Descripcion { get; set; }
		public string Estado { get; set; }
	}
}
