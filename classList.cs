 
public class Tbl_Datos_Laborales: EntityClass {
	public int Id_DatoL { get; set; }
	public int? Id_Investigador { get; set; }
	public int? Id_Cargo { get; set; }
	public DateTime? Fecha_Inicio { get; set; }
	public DateTime? Fecha_Finalizacion { get; set; }
	public string Facultad { get; set; }
	public string Unidad { get; set; }
}
 
public class Tbl_Distinciones: EntityClass {
	public int Id_Distincion { get; set; }
	public int? Id_Investigador { get; set; }
	public int? Id_Tipo_Distincion { get; set; }
	public string Descripcion { get; set; }
	public DateTime? fecha { get; set; }
	public int? Id_Institucion { get; set; }
	public string Montos { get; set; }
}
 
public class Tbl_Evento: EntityClass {
	public int Id_Evento { get; set; }
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
 
public class Tbl_Formacion_Academica: EntityClass {
	public int IdFormacion { get; set; }
	public int? Id_TipoEstudio { get; set; }
	public int? Id_Institucion { get; set; }
	public string Titulo { get; set; }
	public string Disciplina { get; set; }
	public DateTime? Fecha_Inicio { get; set; }
	public DateTime? Fecha_Finalizacion { get; set; }
	public int? Id_Investigador { get; set; }
}
 
public class Tbl_Grupos: EntityClass {
	public int Id_Grupo { get; set; }
	public int? Id_Investigador_Crea { get; set; }
	public int? Id_TipoGrupo { get; set; }
	public DateTime? Fecha_Creacion { get; set; }
	public string Estado { get; set; }
}
 
public class Tbl_InstitucionesAsociadasGrupos: EntityClass {
	public int Id_Institucion { get; set; }
	public int Id_Grupo { get; set; }
	public DateTime? Fecha_Incorporacion { get; set; }
	public string Estado { get; set; }
}
 
public class Tbl_InvestigadoresAsociados: EntityClass {
	public int Id_Grupo { get; set; }
	public int Id_Investigador { get; set; }
	public DateTime? Fecha_Incorporacion { get; set; }
	public string Estado { get; set; }
	public int? Id_TipoMiembro { get; set; }
}
 
public class Tbl_Invitaciones: EntityClass {
	public int Id_Invitacion { get; set; }
	public int? Id_Investigador { get; set; }
	public int? Id_Evento { get; set; }
	public string Estado { get; set; }
	public DateTime? Fecha_Invitacion { get; set; }
}
 
public class Tbl_Patentes: EntityClass {
	public int Id_Patente { get; set; }
	public DateTime? fecha { get; set; }
	public int? Id_Institucion { get; set; }
	public int? Id_Investigador { get; set; }
	public string Estado { get; set; }
}
 
public class TblUser: EntityClass {
	public int Id_User { get; set; }
	public string Mail { get; set; }
	public string Password { get; set; }
	public string token { get; set; }
	public string token_date { get; set; }
	public string Nickname { get; set; }
}
 
public class Tbl_Investigaciones_Disciplinas: EntityClass {
	public int Id_Disciplina { get; set; }
	public int Id_Investigacion { get; set; }
}
 
public class CatDisciplinas: EntityClass {
	public int Id_Disciplina { get; set; }
	public string DescripcionDisciplina { get; set; }
	public string Color { get; set; }
	public string Icono { get; set; }
}
 
public class ViewInvestigacionesDisciplinas: EntityClass {
	public int Id_Investigacion { get; set; }
	public int Id_Disciplina { get; set; }
	public string DescripcionDisciplina { get; set; }
	public string Color { get; set; }
	public string Icono { get; set; }
}
 
public class Cat_Paises: EntityClass {
	public int Id_Pais { get; set; }
	public string Estado { get; set; }
	public string Descripcion { get; set; }
}
 
public class Cat_TipoLocalidad: EntityClass {
	public int Id_Tipo_Localidad { get; set; }
	public string Nombre_TipoLocalidad { get; set; }
}
 
public class Cat_Localidad: EntityClass {
	public int Id_Localidad { get; set; }
	public string Nombre_Localidad { get; set; }
	public int? Id_Tipo_Localidad { get; set; }
	public int? Id_LocalidadPadre { get; set; }
	public int? Id_Pais { get; set; }
	public string Latitud { get; set; }
	public string Longitud { get; set; }
}
 
public class Cat_instituciones: EntityClass {
	public int Id_Institucion { get; set; }
	public string Nombre { get; set; }
	public string Direccion { get; set; }
	public string Estado { get; set; }
	public string Logo { get; set; }
}
 
public class Cat_Tipo_Investigacion: EntityClass {
	public int Id_Tipo_Investigacion { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
}
 
public class Tbl_InvestigatorProfile: EntityClass {
	public int Id_Investigador { get; set; }
	public string Nombres { get; set; }
	public string Apellidos { get; set; }
	public DateTime? FechaNac { get; set; }
	public int? IdUser { get; set; }
	public string Sexo { get; set; }
	public string Foto { get; set; }
	public string DNI { get; set; }
	public string Correo_institucional { get; set; }
	public int? Id_Pais_Origen { get; set; }
	public int? Id_Institucion { get; set; }
	public string Indice_H { get; set; }
	public string Estado { get; set; }
}
 
public class Tbl_Investigaciones: EntityClass {
	public int Id_Investigacion { get; set; }
	public string Visibilidad { get; set; }
	public int? Id_Tipo_Investigacion { get; set; }
	public string Titulo { get; set; }
	public string Abstract { get; set; }
	public string Resumen { get; set; }
	public string Repositorio { get; set; }
	public string Referencias { get; set; }
	public string url_publicacion { get; set; }
	public DateTime? Fecha_ejecucion { get; set; }
	public int? Id_Investigador { get; set; }
	public string Photo { get; set; }
	public string Estado { get; set; }
	public int? Id_Localidad { get; set; }
}
 
public class ViewInvestigacionesPhoto: EntityClass {
	public string Titulo { get; set; }
	public string Repositorio { get; set; }
	public string Descripcion { get; set; }
	public DateTime? Fecha_ejecucion { get; set; }
	public int Id_Investigacion { get; set; }
	public string Resumen { get; set; }
	public string url_publicacion { get; set; }
	public string Photo { get; set; }
	public string Abstract { get; set; }
	public string NombreInstitucion { get; set; }
	public string Nombres { get; set; }
	public int Id_Investigador { get; set; }
	public string Nombre_TipoLocalidad { get; set; }
	public string Nombre_Localidad { get; set; }
	public string País { get; set; }
	public int? Id_LocalidadPadre { get; set; }
	public int Id_Localidad { get; set; }
	public string Foto { get; set; }
}
 
public class ViewInvestigacionesPorDisciplinas: EntityClass {
	public string Titulo { get; set; }
	public string Repositorio { get; set; }
	public string Descripcion { get; set; }
	public DateTime? Fecha_ejecucion { get; set; }
	public int Id_Investigacion { get; set; }
	public string Resumen { get; set; }
	public string url_publicacion { get; set; }
	public string Abstract { get; set; }
	public string NombreInstitucion { get; set; }
	public string Nombres { get; set; }
	public string Apellidos { get; set; }
	public int Id_Investigador { get; set; }
	public string Nombre_TipoLocalidad { get; set; }
	public string Nombre_Localidad { get; set; }
	public string País { get; set; }
	public int? Id_LocalidadPadre { get; set; }
	public int Id_Localidad { get; set; }
	public string Disciplina { get; set; }
	public int Id_Disciplina { get; set; }
}
 
public class ViewInvestigaciones: EntityClass {
	public string Titulo { get; set; }
	public string Repositorio { get; set; }
	public string Descripcion { get; set; }
	public DateTime? Fecha_ejecucion { get; set; }
	public int Id_Investigacion { get; set; }
	public string Resumen { get; set; }
	public string url_publicacion { get; set; }
	public string Photo { get; set; }
	public string Abstract { get; set; }
	public string NombreInstitucion { get; set; }
	public string Nombres { get; set; }
	public int Id_Investigador { get; set; }
	public string Nombre_TipoLocalidad { get; set; }
	public string Nombre_Localidad { get; set; }
	public string País { get; set; }
	public int? Id_LocalidadPadre { get; set; }
	public int Id_Localidad { get; set; }
}
 
public class Cat_Tipo_Asociacion: EntityClass {
	public int Id_Tipo_Asociacion { get; set; }
	public string Descripcion { get; set; }
	public string EstadoAsociacion { get; set; }
}
 
public class Tbl_Instituciones_Asociadas: EntityClass {
	public int Id_Institucion { get; set; }
	public int Id_Proyecto { get; set; }
	public int? Id_Tipo_Asociacion { get; set; }
	public DateTime? Fecha_Ingreso { get; set; }
	public string Estado { get; set; }
}
 
public class ViewGPInstitucionesAsociadas: EntityClass {
	public int Id_Institucion { get; set; }
	public string Nombre { get; set; }
	public string Logo { get; set; }
	public int Id_Proyecto { get; set; }
	public int? Id_Tipo_Asociacion { get; set; }
	public string Descripcion { get; set; }
	public string EstadoAsociacion { get; set; }
	public DateTime? Fecha_Ingreso { get; set; }
}
 
public class sysdiagrams: EntityClass {
	public string name { get; set; }
	public int principal_id { get; set; }
	public int diagram_id { get; set; }
	public int? version { get; set; }
	public string definition { get; set; }
}
 
public class Cat_Tipo_Colaborador: EntityClass {
	public int Id_Tipo_Colaboracion { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
}
 
public class Tbl_Colaboradores: EntityClass {
	public int Id_Investigacion { get; set; }
	public int Id_Investigador { get; set; }
	public string Estado { get; set; }
	public DateTime? Fecha_ingreso { get; set; }
	public int? Id_Tipo_Colaboracion { get; set; }
}
 
public class ViewColaboradores: EntityClass {
	public int Id_Investigador { get; set; }
	public string Nombres { get; set; }
	public string Apellidos { get; set; }
	public DateTime? FechaNac { get; set; }
	public string Sexo { get; set; }
	public string Foto { get; set; }
	public string DNI { get; set; }
	public string Correo_institucional { get; set; }
	public string Indice_H { get; set; }
	public string Estado { get; set; }
	public int Id_Investigacion { get; set; }
	public DateTime? Fecha_ingreso { get; set; }
	public string TipoColaboracion { get; set; }
	public string NombreInstitucion { get; set; }
	public string Titulo { get; set; }
	public DateTime? Fecha_ejecucion { get; set; }
}
 
public class Cat_Tipo_Proyecto: EntityClass {
	public int Id_Tipo_Proyecto { get; set; }
	public string Descripcion_Tipo_Proyecto { get; set; }
	public string Estado_Tipo_Proyecto { get; set; }
	public string Icon { get; set; }
}
 
public class Tbl_Proyectos: EntityClass {
	public int Id_Proyecto { get; set; }
	public string Nombre_Proyecto { get; set; }
	public string DescripcionProyecto { get; set; }
	public int? Id_Tipo_Proyecto { get; set; }
	public string Visibilidad { get; set; }
	public string Estado_Proyecto { get; set; }
	public DateTime? Fecha_Inicio { get; set; }
	public DateTime? Fecha_Finalizacion { get; set; }
}
 
public class Cat_Cargo_Proyecto: EntityClass {
	public int Id_Cargo_Proyecto { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
}
 
public class Tbl_Participantes_Proyectos: EntityClass {
	public int Id_Proyecto { get; set; }
	public int Id_Investigador { get; set; }
	public int? Id_Cargo_Proyecto { get; set; }
	public DateTime? Fecha_Ingreso { get; set; }
	public string Estado_Participante { get; set; }
}
 
public class ViewParticipantesProyectos: EntityClass {
	public int Id_Investigador { get; set; }
	public int Id_Proyecto { get; set; }
	public DateTime? Fecha_Ingreso { get; set; }
	public string Estado_Participante { get; set; }
	public string DescripcionProyecto { get; set; }
	public DateTime? Fecha_Inicio { get; set; }
	public DateTime? Fecha_Finalizacion { get; set; }
	public string Visibilidad { get; set; }
	public string Cargo { get; set; }
	public string Descripcion_Tipo_Proyecto { get; set; }
	public string Estado_Tipo_Proyecto { get; set; }
	public string Nombre_Proyecto { get; set; }
	public string Estado_Proyecto { get; set; }
}
 
public class CatRedesSociales: EntityClass {
	public int Id_RedSocial { get; set; }
	public string Descripcion { get; set; }
	public string url { get; set; }
	public string Icon { get; set; }
}
 
public class Tbl_Invest_RedS: EntityClass {
	public int Id_Investigador { get; set; }
	public int Id_RedSocial { get; set; }
	public string url_red_inv { get; set; }
}
 
public class ViewRedesInvestigadores: EntityClass {
	public int Id_RedSocial { get; set; }
	public string Descripcion { get; set; }
	public string url { get; set; }
	public string Icon { get; set; }
	public string url_red_inv { get; set; }
	public int Id_Investigador { get; set; }
}
 
public class ProyectoTableActividades: EntityClass {
	public int IdActividad { get; set; }
	public string Titulo { get; set; }
	public string Descripcion { get; set; }
	public int? Id_Investigador { get; set; }
	public string Estado { get; set; }
	public int? IdDependencia { get; set; }
	public DateTime? Fecha_Inicial { get; set; }
	public DateTime? Fecha_Final { get; set; }
	public int? Id_Proyecto { get; set; }
}
 
public class Tbl_IdiomasInv: EntityClass {
	public int Id_Investigador { get; set; }
	public int Id_Idioma { get; set; }
}
 
public class ProyectoTableCalendario: EntityClass {
	public int IdCalendario { get; set; }
	public int? IdTarea { get; set; }
	public string Estado { get; set; }
	public DateTime? Fecha_Inicial { get; set; }
	public DateTime? Fecha_Final { get; set; }
}
 
public class Cat_Idiomas: EntityClass {
	public int Id_Idioma { get; set; }
	public string Descripcion { get; set; }
}
 
public class ProyectoTableTareas: EntityClass {
	public int IdTarea { get; set; }
	public string Titulo { get; set; }
	public int? IdTareaPadre { get; set; }
	public int? IdActividad { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
}
 
public class ViewIdiomasInvestigadores: EntityClass {
	public int Id_Idioma { get; set; }
	public string Descripcion { get; set; }
	public int Id_Investigador { get; set; }
}
 
public class __EFMigrationsHistory: EntityClass {
	public string MigrationId { get; set; }
	public string ProductVersion { get; set; }
}
 
public class ViewCalendarioByDependencia: EntityClass {
	public int? IdDependencia { get; set; }
	public int? IdActividad { get; set; }
	public int? IdTareaPadre { get; set; }
	public DateTime? Fecha_Inicial { get; set; }
	public DateTime? Fecha_Final { get; set; }
	public string Estado { get; set; }
	public int IdCalendario { get; set; }
	public int? IdTarea { get; set; }
}
 
public class ProyectoTableParticipantes: EntityClass {
	public int Id_Investigador { get; set; }
	public int IdTarea { get; set; }
	public int? IdTipoParticipacion { get; set; }
}
 
public class AspNetRoleClaims: EntityClass {
	public int Id { get; set; }
	public string RoleId { get; set; }
	public string ClaimType { get; set; }
	public string ClaimValue { get; set; }
}
 
public class ViewActividadesParticipantes: EntityClass {
	public int IdActividad { get; set; }
	public string Titulo { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
	public int IdUsuario { get; set; }
}
 
public class AspNetRoles: EntityClass {
	public string Id { get; set; }
	public string Name { get; set; }
	public string NormalizedName { get; set; }
	public string ConcurrencyStamp { get; set; }
}
 
public class ProyectoCatCargosDependencias: EntityClass {
	public int IdCargo { get; set; }
	public string Descripcion { get; set; }
}
 
public class AspNetUserClaims: EntityClass {
	public int Id { get; set; }
	public string UserId { get; set; }
	public string ClaimType { get; set; }
	public string ClaimValue { get; set; }
}
 
public class ProyectoCatDependencias: EntityClass {
	public int IdDependencia { get; set; }
	public string Descripcion { get; set; }
	public int? IdDependenciaP { get; set; }
	public int? IdInstitucion { get; set; }
}
 
public class AspNetUserLogins: EntityClass {
	public string LoginProvider { get; set; }
	public string ProviderKey { get; set; }
	public string ProviderDisplayName { get; set; }
	public string UserId { get; set; }
}
 
public class ProyectoCatTipoParticipaciones: EntityClass {
	public int IdTipoParticipacion { get; set; }
	public string Descripcion { get; set; }
}
 
public class AspNetUserRoles: EntityClass {
	public string UserId { get; set; }
	public string RoleId { get; set; }
}
 
public class ProyectoTableAgenda: EntityClass {
	public int IdAgenda { get; set; }
	public int? Id_Investigador { get; set; }
	public int? IdDependencia { get; set; }
	public string Dia { get; set; }
	public string Hora_Inicial { get; set; }
	public string Hora_Final { get; set; }
	public DateTime? Fecha_Caducidad { get; set; }
}
 
public class AspNetUsers: EntityClass {
	public string Id { get; set; }
	public string UserName { get; set; }
	public string NormalizedUserName { get; set; }
	public string Email { get; set; }
	public string NormalizedEmail { get; set; }
	public bool EmailConfirmed { get; set; }
	public string PasswordHash { get; set; }
	public string SecurityStamp { get; set; }
	public string ConcurrencyStamp { get; set; }
	public string PhoneNumber { get; set; }
	public bool PhoneNumberConfirmed { get; set; }
	public bool TwoFactorEnabled { get; set; }
	public string LockoutEnd { get; set; }
	public bool LockoutEnabled { get; set; }
	public int AccessFailedCount { get; set; }
}
 
public class ProyectoTableDependencias_Usuarios: EntityClass {
	public int Id_Investigador { get; set; }
	public int IdDependencia { get; set; }
	public int? IdCargo { get; set; }
}
 
public class AspNetUserTokens: EntityClass {
	public string UserId { get; set; }
	public string LoginProvider { get; set; }
	public string Name { get; set; }
	public string Value { get; set; }
}
 
public class ProyectoTableEvidencias: EntityClass {
	public int IdEvidencia { get; set; }
	public int? IdTipo { get; set; }
	public string Data { get; set; }
	public int? IdTarea { get; set; }
}
 
public class Cat_Cargos: EntityClass {
	public int Id_Cargo { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
}
 
public class Cat_Tipo_Evento: EntityClass {
	public int Id_Tipo_Evento { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
}
 
public class Cat_TipoEstudio: EntityClass {
	public int Id_TipoEstudio { get; set; }
	public string Descripcion { get; set; }
}
 
public class Cat_TipoGrupo: EntityClass {
	public int Id_TipoGrupo { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
}
 
public class Cat_TipoMiembro: EntityClass {
	public int Id_TipoMiembro { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
}
 
public class CatTipoDistincion: EntityClass {
	public int Id_Tipo_Distincion { get; set; }
	public string Descripcion { get; set; }
	public string Estado { get; set; }
}
 