class Tbl_Datos_Laborales {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_DatoL = { type: "number" , primary: true  };
	Id_Investigador = { type: "number"  };
	Id_Cargo = { type: "number"  };
	Fecha_Inicio = { type: "date"  };
	Fecha_Finalizacion = { type: "date"  };
	Facultad = { type: "text"  };
	Unidad = { type: "text"  };
}
export{Tbl_Datos_Laborales}
class Tbl_Distinciones {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Distincion = { type: "number" , primary: true  };
	Id_Investigador = { type: "number"  };
	Id_Tipo_Distincion = { type: "number"  };
	Descripcion = { type: "text"  };
	fecha = { type: "date"  };
	Id_Institucion = { type: "number"  };
	Montos = { type: "string"  };
}
export{Tbl_Distinciones}
class Tbl_Evento {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Evento = { type: "number" , primary: true  };
	Id_Tipo_Evento = { type: "number"  };
	Nombre = { type: "text"  };
	Id_Pais = { type: "number"  };
	Titulo_Ponencia = { type: "text"  };
	Fecha_Inicio = { type: "date"  };
	Fecha_Finalizacion = { type: "date"  };
	Modalidad = { type: "text"  };
	Modalidad_Ponencia = { type: "text"  };
	Link = { type: "text"  };
	Datos_Adicionales = { type: "text"  };
	Id_Investigador = { type: "number"  };
}
export{Tbl_Evento}
class Tbl_Formacion_Academica {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdFormacion = { type: "number" , primary: true  };
	Id_TipoEstudio = { type: "number"  };
	Id_Institucion = { type: "number"  };
	Titulo = { type: "text"  };
	Disciplina = { type: "text"  };
	Fecha_Inicio = { type: "date"  };
	Fecha_Finalizacion = { type: "date"  };
	Id_Investigador = { type: "number"  };
}
export{Tbl_Formacion_Academica}
class Tbl_Grupos {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Grupo = { type: "number" , primary: true  };
	Id_Investigador_Crea = { type: "number"  };
	Id_TipoGrupo = { type: "number"  };
	Fecha_Creacion = { type: "date"  };
	Estado = { type: "text"  };
}
export{Tbl_Grupos}
class Tbl_InstitucionesAsociadasGrupos {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Institucion = { type: "number" , primary: true  };
	Id_Grupo = { type: "number"  };
	Fecha_Incorporacion = { type: "date"  };
	Estado = { type: "text"  };
}
export{Tbl_InstitucionesAsociadasGrupos}
class Tbl_InvestigadoresAsociados {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Grupo = { type: "number" , primary: true  };
	Id_Investigador = { type: "number"  };
	Fecha_Incorporacion = { type: "date"  };
	Estado = { type: "text"  };
	Id_TipoMiembro = { type: "number"  };
}
export{Tbl_InvestigadoresAsociados}
class Tbl_Invitaciones {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Invitacion = { type: "number" , primary: true  };
	Id_Investigador = { type: "number"  };
	Id_Evento = { type: "number"  };
	Estado = { type: "text"  };
	Fecha_Invitacion = { type: "date"  };
}
export{Tbl_Invitaciones}
class Tbl_Patentes {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Patente = { type: "number" , primary: true  };
	fecha = { type: "date"  };
	Id_Institucion = { type: "number"  };
	Id_Investigador = { type: "number"  };
	Estado = { type: "text"  };
}
export{Tbl_Patentes}
class TblUser {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_User = { type: "number" , primary: true  };
	Mail = { type: "text"  };
	Password = { type: "text"  };
	token = { type: "text"  };
	token_date = { type: "text"  };
	Nickname = { type: "text"  };
}
export{TblUser}
class Tbl_Investigaciones_Disciplinas {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Disciplina = { type: "number" , primary: true  };
	Id_Investigacion = { type: "number"  };
}
export{Tbl_Investigaciones_Disciplinas}
class CatDisciplinas {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Disciplina = { type: "number" , primary: true  };
	DescripcionDisciplina = { type: "text"  };
	Color = { type: "text"  };
	Icono = { type: "text"  };
}
export{CatDisciplinas}
class ViewInvestigacionesDisciplinas {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigacion = { type: "number" , primary: true  };
	Id_Disciplina = { type: "number"  };
	DescripcionDisciplina = { type: "text"  };
	Color = { type: "text"  };
	Icono = { type: "text"  };
}
export{ViewInvestigacionesDisciplinas}
class Cat_Paises {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Pais = { type: "number" , primary: true  };
	Estado = { type: "text"  };
	Descripcion = { type: "text"  };
}
export{Cat_Paises}
class Cat_TipoLocalidad {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Tipo_Localidad = { type: "number" , primary: true  };
	Nombre_TipoLocalidad = { type: "text"  };
}
export{Cat_TipoLocalidad}
class Cat_Localidad {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Localidad = { type: "number" , primary: true  };
	Nombre_Localidad = { type: "text"  };
	Id_Tipo_Localidad = { type: "number"  };
	Id_LocalidadPadre = { type: "number"  };
	Id_Pais = { type: "number"  };
	Latitud = { type: "text"  };
	Longitud = { type: "text"  };
}
export{Cat_Localidad}
class Cat_instituciones {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Institucion = { type: "number" , primary: true  };
	Nombre = { type: "text"  };
	Direccion = { type: "text"  };
	Estado = { type: "text"  };
	Logo = { type: "text"  };
}
export{Cat_instituciones}
class Cat_Tipo_Investigacion {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Tipo_Investigacion = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
}
export{Cat_Tipo_Investigacion}
class Tbl_InvestigatorProfile {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigador = { type: "number" , primary: true  };
	Nombres = { type: "text"  };
	Apellidos = { type: "text"  };
	FechaNac = { type: "date"  };
	IdUser = { type: "number"  };
	Sexo = { type: "text"  };
	Foto = { type: "text"  };
	DNI = { type: "text"  };
	Correo_institucional = { type: "text"  };
	Id_Pais_Origen = { type: "number"  };
	Id_Institucion = { type: "number"  };
	Indice_H = { type: "text"  };
	Estado = { type: "text"  };
}
export{Tbl_InvestigatorProfile}
class Tbl_Investigaciones {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigacion = { type: "number" , primary: true  };
	Visibilidad = { type: "text"  };
	Id_Tipo_Investigacion = { type: "number"  };
	Titulo = { type: "text"  };
	Abstract = { type: "text"  };
	Resumen = { type: "text"  };
	Repositorio = { type: "string"  };
	Referencias = { type: "text"  };
	url_publicacion = { type: "text"  };
	Fecha_ejecucion = { type: "text"  };
	Id_Investigador = { type: "number"  };
	Photo = { type: "text"  };
	Estado = { type: "text"  };
	Id_Localidad = { type: "number"  };
}
export{Tbl_Investigaciones}
class ViewInvestigacionesPhoto {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Titulo = { type: "text" , primary: true  };
	Repositorio = { type: "string"  };
	Descripcion = { type: "text"  };
	Fecha_ejecucion = { type: "text"  };
	Id_Investigacion = { type: "number"  };
	Resumen = { type: "text"  };
	url_publicacion = { type: "text"  };
	Photo = { type: "text"  };
	Abstract = { type: "text"  };
	NombreInstitucion = { type: "text"  };
	Nombres = { type: "text"  };
	Id_Investigador = { type: "number"  };
	Nombre_TipoLocalidad = { type: "text"  };
	Nombre_Localidad = { type: "text"  };
	País = { type: "text"  };
	Id_LocalidadPadre = { type: "number"  };
	Id_Localidad = { type: "number"  };
	Foto = { type: "text"  };
}
export{ViewInvestigacionesPhoto}
class ViewInvestigacionesPorDisciplinas {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Titulo = { type: "text" , primary: true  };
	Repositorio = { type: "string"  };
	Descripcion = { type: "text"  };
	Fecha_ejecucion = { type: "text"  };
	Id_Investigacion = { type: "number"  };
	Resumen = { type: "text"  };
	url_publicacion = { type: "text"  };
	Abstract = { type: "text"  };
	NombreInstitucion = { type: "text"  };
	Nombres = { type: "text"  };
	Apellidos = { type: "text"  };
	Id_Investigador = { type: "number"  };
	Nombre_TipoLocalidad = { type: "text"  };
	Nombre_Localidad = { type: "text"  };
	País = { type: "text"  };
	Id_LocalidadPadre = { type: "number"  };
	Id_Localidad = { type: "number"  };
	Disciplina = { type: "text"  };
	Id_Disciplina = { type: "number"  };
}
export{ViewInvestigacionesPorDisciplinas}
class ViewInvestigaciones {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Titulo = { type: "text" , primary: true  };
	Repositorio = { type: "string"  };
	Descripcion = { type: "text"  };
	Fecha_ejecucion = { type: "text"  };
	Id_Investigacion = { type: "number"  };
	Resumen = { type: "text"  };
	url_publicacion = { type: "text"  };
	Photo = { type: "text"  };
	Abstract = { type: "text"  };
	NombreInstitucion = { type: "text"  };
	Nombres = { type: "text"  };
	Id_Investigador = { type: "number"  };
	Nombre_TipoLocalidad = { type: "text"  };
	Nombre_Localidad = { type: "text"  };
	País = { type: "text"  };
	Id_LocalidadPadre = { type: "number"  };
	Id_Localidad = { type: "number"  };
}
export{ViewInvestigaciones}
class Cat_Tipo_Asociacion {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Tipo_Asociacion = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	EstadoAsociacion = { type: "text"  };
}
export{Cat_Tipo_Asociacion}
class Tbl_Instituciones_Asociadas {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Institucion = { type: "number" , primary: true  };
	Id_Proyecto = { type: "number"  };
	Id_Tipo_Asociacion = { type: "number"  };
	Fecha_Ingreso = { type: "date"  };
	Estado = { type: "text"  };
}
export{Tbl_Instituciones_Asociadas}
class ViewGPInstitucionesAsociadas {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Institucion = { type: "number" , primary: true  };
	Nombre = { type: "text"  };
	Logo = { type: "text"  };
	Id_Proyecto = { type: "number"  };
	Id_Tipo_Asociacion = { type: "number"  };
	Descripcion = { type: "text"  };
	EstadoAsociacion = { type: "text"  };
	Fecha_Ingreso = { type: "date"  };
}
export{ViewGPInstitucionesAsociadas}
class sysdiagrams {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	name = { type: "text" , primary: true  };
	principal_id = { type: "number"  };
	diagram_id = { type: "number"  };
	version = { type: "number"  };
	definition = { type: "string"  };
}
export{sysdiagrams}
class Cat_Tipo_Colaborador {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Tipo_Colaboracion = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
}
export{Cat_Tipo_Colaborador}
class Tbl_Colaboradores {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigacion = { type: "number" , primary: true  };
	Id_Investigador = { type: "number"  };
	Estado = { type: "text"  };
	Fecha_ingreso = { type: "date"  };
	Id_Tipo_Colaboracion = { type: "number"  };
}
export{Tbl_Colaboradores}
class ViewColaboradores {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigador = { type: "number" , primary: true  };
	Nombres = { type: "text"  };
	Apellidos = { type: "text"  };
	FechaNac = { type: "date"  };
	Sexo = { type: "text"  };
	Foto = { type: "text"  };
	DNI = { type: "text"  };
	Correo_institucional = { type: "text"  };
	Indice_H = { type: "text"  };
	Estado = { type: "text"  };
	Id_Investigacion = { type: "number"  };
	Fecha_ingreso = { type: "date"  };
	TipoColaboracion = { type: "text"  };
	NombreInstitucion = { type: "text"  };
	Titulo = { type: "text"  };
	Fecha_ejecucion = { type: "text"  };
}
export{ViewColaboradores}
class Cat_Tipo_Proyecto {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Tipo_Proyecto = { type: "number" , primary: true  };
	Descripcion_Tipo_Proyecto = { type: "text"  };
	Estado_Tipo_Proyecto = { type: "text"  };
	Icon = { type: "text"  };
}
export{Cat_Tipo_Proyecto}
class Tbl_Proyectos {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Proyecto = { type: "number" , primary: true  };
	Nombre_Proyecto = { type: "text"  };
	DescripcionProyecto = { type: "text"  };
	Id_Tipo_Proyecto = { type: "number"  };
	Visibilidad = { type: "text"  };
	Estado_Proyecto = { type: "text"  };
	Fecha_Inicio = { type: "date"  };
	Fecha_Finalizacion = { type: "date"  };
}
export{Tbl_Proyectos}
class Cat_Cargo_Proyecto {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Cargo_Proyecto = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
}
export{Cat_Cargo_Proyecto}
class Tbl_Participantes_Proyectos {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Proyecto = { type: "number" , primary: true  };
	Id_Investigador = { type: "number"  };
	Id_Cargo_Proyecto = { type: "number"  };
	Fecha_Ingreso = { type: "date"  };
	Estado_Participante = { type: "text"  };
}
export{Tbl_Participantes_Proyectos}
class ViewParticipantesProyectos {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigador = { type: "number" , primary: true  };
	Id_Proyecto = { type: "number"  };
	Fecha_Ingreso = { type: "date"  };
	Estado_Participante = { type: "text"  };
	DescripcionProyecto = { type: "text"  };
	Fecha_Inicio = { type: "date"  };
	Fecha_Finalizacion = { type: "date"  };
	Visibilidad = { type: "text"  };
	Cargo = { type: "text"  };
	Descripcion_Tipo_Proyecto = { type: "text"  };
	Estado_Tipo_Proyecto = { type: "text"  };
	Nombre_Proyecto = { type: "text"  };
	Estado_Proyecto = { type: "text"  };
}
export{ViewParticipantesProyectos}
class CatRedesSociales {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_RedSocial = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	url = { type: "text"  };
	Icon = { type: "text"  };
}
export{CatRedesSociales}
class Tbl_Invest_RedS {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigador = { type: "number" , primary: true  };
	Id_RedSocial = { type: "number"  };
	url_red_inv = { type: "text"  };
}
export{Tbl_Invest_RedS}
class ViewRedesInvestigadores {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_RedSocial = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	url = { type: "text"  };
	Icon = { type: "text"  };
	url_red_inv = { type: "text"  };
	Id_Investigador = { type: "number"  };
}
export{ViewRedesInvestigadores}
class ProyectoTableActividades {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdActividad = { type: "number" , primary: true  };
	Titulo = { type: "text"  };
	Descripcion = { type: "text"  };
	Id_Investigador = { type: "number"  };
	Estado = { type: "text"  };
	IdDependencia = { type: "number"  };
	Fecha_Inicial = { type: "date"  };
	Fecha_Final = { type: "date"  };
	Id_Proyecto = { type: "number"  };
}
export{ProyectoTableActividades}
class Tbl_IdiomasInv {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigador = { type: "number" , primary: true  };
	Id_Idioma = { type: "number"  };
}
export{Tbl_IdiomasInv}
class ProyectoTableCalendario {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdCalendario = { type: "number" , primary: true  };
	IdTarea = { type: "number"  };
	Estado = { type: "text"  };
	Fecha_Inicial = { type: "date"  };
	Fecha_Final = { type: "date"  };
}
export{ProyectoTableCalendario}
class Cat_Idiomas {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Idioma = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
}
export{Cat_Idiomas}
class ProyectoTableTareas {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdTarea = { type: "number" , primary: true  };
	Titulo = { type: "text"  };
	IdTareaPadre = { type: "number"  };
	IdActividad = { type: "number"  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
}
export{ProyectoTableTareas}
class ViewIdiomasInvestigadores {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Idioma = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	Id_Investigador = { type: "number"  };
}
export{ViewIdiomasInvestigadores}
class __EFMigrationsHistory {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	MigrationId = { type: "text" , primary: true  };
	ProductVersion = { type: "text"  };
}
export{__EFMigrationsHistory}
class ViewCalendarioByDependencia {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdDependencia = { type: "number" , primary: true  };
	IdActividad = { type: "number"  };
	IdTareaPadre = { type: "number"  };
	Fecha_Inicial = { type: "date"  };
	Fecha_Final = { type: "date"  };
	Estado = { type: "text"  };
	IdCalendario = { type: "number"  };
	IdTarea = { type: "number"  };
}
export{ViewCalendarioByDependencia}
class ProyectoTableParticipantes {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigador = { type: "number" , primary: true  };
	IdTarea = { type: "number"  };
	IdTipoParticipacion = { type: "number"  };
}
export{ProyectoTableParticipantes}
class AspNetRoleClaims {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id = { type: "number" , primary: true  };
	RoleId = { type: "text"  };
	ClaimType = { type: "text"  };
	ClaimValue = { type: "text"  };
}
export{AspNetRoleClaims}
class ViewActividadesParticipantes {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdActividad = { type: "number" , primary: true  };
	Titulo = { type: "text"  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
	IdUsuario = { type: "number"  };
}
export{ViewActividadesParticipantes}
class AspNetRoles {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id = { type: "text" , primary: true  };
	Name = { type: "text"  };
	NormalizedName = { type: "text"  };
	ConcurrencyStamp = { type: "text"  };
}
export{AspNetRoles}
class ProyectoCatCargosDependencias {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdCargo = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
}
export{ProyectoCatCargosDependencias}
class AspNetUserClaims {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id = { type: "number" , primary: true  };
	UserId = { type: "text"  };
	ClaimType = { type: "text"  };
	ClaimValue = { type: "text"  };
}
export{AspNetUserClaims}
class ProyectoCatDependencias {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdDependencia = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	IdDependenciaP = { type: "number"  };
	IdInstitucion = { type: "number"  };
}
export{ProyectoCatDependencias}
class AspNetUserLogins {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	LoginProvider = { type: "text" , primary: true  };
	ProviderKey = { type: "text"  };
	ProviderDisplayName = { type: "text"  };
	UserId = { type: "text"  };
}
export{AspNetUserLogins}
class ProyectoCatTipoParticipaciones {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdTipoParticipacion = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
}
export{ProyectoCatTipoParticipaciones}
class AspNetUserRoles {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	UserId = { type: "text" , primary: true  };
	RoleId = { type: "text"  };
}
export{AspNetUserRoles}
class ProyectoTableAgenda {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdAgenda = { type: "number" , primary: true  };
	Id_Investigador = { type: "number"  };
	IdDependencia = { type: "number"  };
	Dia = { type: "text"  };
	Hora_Inicial = { type: "text"  };
	Hora_Final = { type: "text"  };
	Fecha_Caducidad = { type: "date"  };
}
export{ProyectoTableAgenda}
class AspNetUsers {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id = { type: "text" , primary: true  };
	UserName = { type: "text"  };
	NormalizedUserName = { type: "text"  };
	Email = { type: "text"  };
	NormalizedEmail = { type: "text"  };
	EmailConfirmed = { type: "checkbox"  };
	PasswordHash = { type: "text"  };
	SecurityStamp = { type: "text"  };
	ConcurrencyStamp = { type: "text"  };
	PhoneNumber = { type: "text"  };
	PhoneNumberConfirmed = { type: "checkbox"  };
	TwoFactorEnabled = { type: "checkbox"  };
	LockoutEnd = { type: "string"  };
	LockoutEnabled = { type: "checkbox"  };
	AccessFailedCount = { type: "number"  };
}
export{AspNetUsers}
class ProyectoTableDependencias_Usuarios {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigador = { type: "number" , primary: true  };
	IdDependencia = { type: "number"  };
	IdCargo = { type: "number"  };
}
export{ProyectoTableDependencias_Usuarios}
class AspNetUserTokens {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	UserId = { type: "text" , primary: true  };
	LoginProvider = { type: "text"  };
	Name = { type: "text"  };
	Value = { type: "text"  };
}
export{AspNetUserTokens}
class ProyectoTableEvidencias {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdEvidencia = { type: "number" , primary: true  };
	IdTipo = { type: "number"  };
	Data = { type: "text"  };
	IdTarea = { type: "number"  };
}
export{ProyectoTableEvidencias}
class Cat_Cargos {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Cargo = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
}
export{Cat_Cargos}
class Cat_Tipo_Evento {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Tipo_Evento = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
}
export{Cat_Tipo_Evento}
class Cat_TipoEstudio {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_TipoEstudio = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
}
export{Cat_TipoEstudio}
class Cat_TipoGrupo {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_TipoGrupo = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
}
export{Cat_TipoGrupo}
class Cat_TipoMiembro {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_TipoMiembro = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
}
export{Cat_TipoMiembro}
class CatTipoDistincion {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Tipo_Distincion = { type: "number" , primary: true  };
	Descripcion = { type: "text"  };
	Estado = { type: "text"  };
}
export{CatTipoDistincion}