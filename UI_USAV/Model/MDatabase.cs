using CAPA_DATOS;
using System;

namespace UI_USAV.Model
{
    public class TblCreadorVideos : EntityClass
    {
        public int? IdCreadorVideo { get; set; }
        public string? RutaImagenDocente { get; set; }
        public string? Nombres { get; set; }
        public string? Apellido1 { get; set; }
        public string? Apellido2 { get; set; }
        public string? Informacion { get; set; }
        public string? Espcialidad { get; set; }
        public bool? Estado { get; set; }
        public string? Sexo { get; set; }
        public string? Cedula { get; set; }
        public string? Usuario { get; set; }
        public string? Email { get; set; }
        public int? IdVideo { get; set; }
    }

    public class TblCurso : EntityClass
    {
        public int? IdCurso { get; set; }
        public string? NombreCurso { get; set; }
        public string? RutaImagenCurso { get; set; }
        public string? DuracionCurso { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public bool? Estado { get; set; }
        public int? IdCatCurso { get; set; }
        public int? IdNivelCurso { get; set; }
        public string? PassCurso { get; set; }
        public string? ResumenCurso { get; set; }
        public bool? Privado { get; set; }
        public int? IdCreadorVideo { get; set; }
        public DateTime? FechaInicio { get; set; }
        public bool? Finalizado { get; set; }
        public int? NumVisitas { get; set; }
        public bool? Bajar { get; set; }
    }

    public class VistaCursosCreados : EntityClass
    {
        public int? IdCurso { get; set; }
        public string? NombreCurso { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? Nombres { get; set; }
    }

    public class CatTipoReserva : EntityClass
    {
        public int? IdTipoReserva { get; set; }
        public string? DescTipoReserva { get; set; }
    }

    public class TblReservas : EntityClass
    {
        public int? IdReserva { get; set; }
        public string? NombreInstitucion { get; set; }
        public string? NombreSolicitante { get; set; }
        public string? Telefono { get; set; }
        public string? Cargo { get; set; }
        public int? IdTipoReserva { get; set; }
        public string? DescReserva { get; set; }
        public DateTime? FechaSolicitud { get; set; }
        public int? HoraSolicitud { get; set; }
        public int? Duracion { get; set; }
        public bool? Confirmacion { get; set; }
        public int? NumeroIndividuos { get; set; }
        public int? NumeroIndFemeninos { get; set; }
        public int? IdCreadorVideo { get; set; }
    }

    public class ViewCounTipoReserva : EntityClass
    {
        public string? TipoReserva { get; set; }
        public int? Total { get; set; }
    }

    public class TblVideos : EntityClass
    {
        public int? Id { get; set; }
        public string? NombreVideo { get; set; }
        public string? DuracionVideo { get; set; }
        public string? IdYoutube { get; set; }
        public int? IdTipoVideo { get; set; }
        public string? RutaVideo { get; set; }
        public int? NumVistas { get; set; }
        public DateTime? FechaSubida { get; set; }
        public bool? Activo { get; set; }
        public string? Descripcion { get; set; }
        public string? FormatoVideo { get; set; }
        public string? PesoVideo { get; set; }
        public int? IdBloque { get; set; }
        public bool? PublicadoVideo { get; set; }
        public string? CodNombreVideo { get; set; }
        public bool? Visible { get; set; }
        public int? IdSubCategoria { get; set; }
        public string? Dimensiones { get; set; }
        public string? CategoriasYoutube { get; set; }
        public string? PalabrasYoutube { get; set; }
        public bool? PrivacidadYoutubeVideo { get; set; }
        public int? IdCreadorVideo { get; set; }
        public bool? IsCurso { get; set; }
        public bool? IsVideoPrincipalCurso { get; set; }
        public int? NumVideo { get; set; }
        public string? Photo { get; set; }
    }

    public class VistaCantidadVideosDocentes : EntityClass
    {
        public string? Nombres { get; set; }
        public string? Apellido1 { get; set; }
        public string? Apellido2 { get; set; }
        public int? TotalVideos { get; set; }
    }

    public class CatLocalidades : EntityClass
    {
        public int? IdLocalidad { get; set; }
        public string? DescLocalidades { get; set; }
        public int? IdEdificio { get; set; }
        public int? IdTipoBloque { get; set; }
        public int? IdConfigLaboral { get; set; }
        public string? Pict { get; set; }
    }

    public class CatEdificios : EntityClass
    {
        public int? IdEdificio { get; set; }
        public string? DescEdificios { get; set; }
        public string? Ubicacion { get; set; }
        public string? Photo { get; set; }
    }

    public class TblCalendario : EntityClass
    {
        public int? IdCalendario { get; set; }
        public string? DescCalendario { get; set; }
        public int? IdLocalidad { get; set; }
        public DateTime? FechaCalendario { get; set; }
        public int? Hora { get; set; }
        public int? Minuto { get; set; }
        public int? DuracionM { get; set; }
    }

    public class TblReservaLocalidad : EntityClass
    {
        public int? IdReserva { get; set; }
        public int? IdCalendario { get; set; }
        public int? IdReservaLocalidad { get; set; }
    }

    public class ViewReservasLoc : EntityClass
    {
        public int? IdReserva { get; set; }
        public string? NombreInstitucion { get; set; }
        public string? NombreSolicitante { get; set; }
        public string? Telefono { get; set; }
        public string? Cargo { get; set; }
        public int? IdTipoReserva { get; set; }
        public string? DescReserva { get; set; }
        public DateTime? FechaSolicitud { get; set; }
        public int? HoraSolicitud { get; set; }
        public int? Duracion { get; set; }
        public bool? Confirmacion { get; set; }
        public int? NumeroIndividuos { get; set; }
        public int? NumeroIndFemeninos { get; set; }
        public string? DescLocalidades { get; set; }
        public string? DescEdificios { get; set; }
        public string? ConfirmacionText { get; set; }
        public int? IdCreadorVideo { get; set; }
    }

    public class TblTiposVideos : EntityClass
    {
        public int? IdTipoVideo { get; set; }
        public string? NombretipoVideo { get; set; }
        public bool? Estado { get; set; }
    }

    public class VistaTiposVideosCantidad : EntityClass
    {
        public int? Cantidad { get; set; }
        public string? NombretipoVideo { get; set; }
    }

    public class TblSubCategorias : EntityClass
    {
        public int? IdSubCategoria { get; set; }
        public string? NombreSubcategoria { get; set; }
        public int? IdCategoria { get; set; }
        public bool? Estado { get; set; }
    }

    public class VistaReporteVideos : EntityClass
    {
        public int? Id { get; set; }
        public string? NombreVideo { get; set; }
        public DateTime? FechaSubida { get; set; }
        public string? NombretipoVideo { get; set; }
        public string? NombreSubcategoria { get; set; }
        public string? NombreDocente { get; set; }
    }

    public class VistaPivote : EntityClass
    {
        public int? Enero { get; set; }
        public int? Febrero { get; set; }
        public int? Marzo { get; set; }
        public int? Abril { get; set; }
        public int? Mayo { get; set; }
        public int? Junio { get; set; }
        public int? Julio { get; set; }
        public int? Agosto { get; set; }
        public int? Septiembre { get; set; }
        public int? Octubre { get; set; }
        public int? Noviembre { get; set; }
        public int? Diciembre { get; set; }
    }

    public class VistaLocalidadCalendario : EntityClass
    {
        public int? IdCalendario { get; set; }
        public DateTime? FechaCalendario { get; set; }
        public string? FechaCal { get; set; }
        public string? hora { get; set; }
        public int? IdLocalidad { get; set; }
        public bool? Confirmacion { get; set; }
    }

    public class VIEW_ESTADISTICAS_TIPORESERVACION : EntityClass
    {
        public int? IdReserva { get; set; }
        public string? DescLocalidades { get; set; }
        public DateTime? FechaSolicitud { get; set; }
        public string? DescTipoReserva { get; set; }
        public string? NombreSolicitante { get; set; }
        public string? NombreInstitucion { get; set; }
        public string? DescReserva { get; set; }
        public int? DuracionMT { get; set; }
    }

    public class Ver_mas_5 : EntityClass
    {
        public int? Totales { get; set; }
        public string? NombreVideo { get; set; }
    }

    public class __MigrationHistory : EntityClass
    {
        public string? MigrationId { get; set; }
        public string? ContextKey { get; set; }
        public string? Model { get; set; }
        public string? ProductVersion { get; set; }
    }

    public class AspNetRoles : EntityClass
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
    }

    public class AspNetUserClaims : EntityClass
    {
        public int? Id { get; set; }
        public string? UserId { get; set; }
        public string? ClaimType { get; set; }
        public string? ClaimValue { get; set; }
    }

    public class AspNetUserLogins : EntityClass
    {
        public string? LoginProvider { get; set; }
        public string? ProviderKey { get; set; }
        public string? UserId { get; set; }
    }

    public class AspNetUserRoles : EntityClass
    {
        public string? UserId { get; set; }
        public string? RoleId { get; set; }
    }

    public class AspNetUsers : EntityClass
    {
        public string? Id { get; set; }
        public string? Email { get; set; }
        public bool? EmailConfirmed { get; set; }
        public string? PasswordHash { get; set; }
        public string? SecurityStamp { get; set; }
        public string? PhoneNumber { get; set; }
        public bool? PhoneNumberConfirmed { get; set; }
        public bool? TwoFactorEnabled { get; set; }
        public DateTime? LockoutEndDateUtc { get; set; }
        public bool? LockoutEnabled { get; set; }
        public int? AccessFailedCount { get; set; }
        public string? UserName { get; set; }
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public string? Photo { get; set; }
    }

    public class CatTipoBloques : EntityClass
    {
        public int? IdTipoBloque { get; set; }
        public string? Descripcion { get; set; }
        public int? DuracionM { get; set; }
    }

    public class TblArticulos : EntityClass
    {
        public int? IdArticulo { get; set; }
        public string? TituloArticulo { get; set; }
        public string? ContenidoArticulo { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public bool? Publicado { get; set; }
        public bool? Destacado { get; set; }
        public int? IdCatArticulo { get; set; }
        public DateTime? FechaPublicacion { get; set; }
    }

    public class TblAuditoria : EntityClass
    {
        public int? Id { get; set; }
        public string? Ip { get; set; }
        public string? Navegador { get; set; }
        public DateTime? FechaVisita { get; set; }
        public string? RutaAcceso { get; set; }
        public string? AccionRealizada { get; set; }
        public string? NombreUsuario { get; set; }
    }

    public class TblBloqueCurso : EntityClass
    {
        public int? IdBloque { get; set; }
        public string? NombreBloque { get; set; }
        public bool? Estado { get; set; }
        public int? IdCurso { get; set; }
        public int? OrdenPosicion { get; set; }
    }

    public class TblCategoriaCurso : EntityClass
    {
        public int? IdCatCurso { get; set; }
        public string? NombreCatCurso { get; set; }
        public bool? Estado { get; set; }
    }

    public class TblCategorias : EntityClass
    {
        public int? IdCategoria { get; set; }
        public string? NombreCategoria { get; set; }
        public bool? Estado { get; set; }
    }

    public class TblCategoriasArticulos : EntityClass
    {
        public int? IdCatArticulo { get; set; }
        public string? NombreCatArticulo { get; set; }
        public bool? Estado { get; set; }
    }

    public class TblComentarios : EntityClass
    {
        public int? IdComentario { get; set; }
        public int? Votacion { get; set; }
        public string? Comentario { get; set; }
        public DateTime? FechaComentario { get; set; }
        public string? UserName { get; set; }
        public string? TipoComentario { get; set; }
        public bool? Estado { get; set; }
        public int? IdComentado { get; set; }
    }

    public class TblConfiguraciones : EntityClass
    {
        public int? IdConf { get; set; }
        public string? RutaVideos { get; set; }
        public string? UserYoutube { get; set; }
        public string? PassYoutube { get; set; }
        public string? KeyDev { get; set; }
        public int? IdUltimosVideo { get; set; }
        public string? NombreApliacion { get; set; }
        public int? IdArticuloServicios { get; set; }
        public int? IdCatArticuloPrincipal { get; set; }
        public int? IdCatArticuloAyuda { get; set; }
        public int? IdTipoVideoCurso { get; set; }
    }

    public class TblConfiguracionLaboral : EntityClass
    {
        public int? IdConfigLababoral { get; set; }
        public int? HorasLaborales { get; set; }
        public string? DiaInicial { get; set; }
        public string? DiaFinal { get; set; }
        public int? DiasLaborales { get; set; }
        public string? HorasAlmuerzo { get; set; }
        public string? HoraInicialLaboral { get; set; }
        public string? HoraFinalLaboral { get; set; }
        public string? Descripcion { get; set; }
    }

    public class TblMatriculadosCursos : EntityClass
    {
        public int? IdMatricula { get; set; }
        public int? IdCurso { get; set; }
        public string? Carnet { get; set; }
        public bool? Activo { get; set; }
        public DateTime? FechaMatricula { get; set; }
        public DateTime? UltimoAcceso { get; set; }
    }

    public class TblNivelCurso : EntityClass
    {
        public int? IdNivelCurso { get; set; }
        public string? NivelCurso { get; set; }
        public bool? Estado { get; set; }
    }

    public class TblRolUsuario : EntityClass
    {
        public int? IdRolUsuario { get; set; }
        public string? NombreRol { get; set; }
        public bool? Estado { get; set; }
    }

    public class TblUsuario : EntityClass
    {
        public int? Carnet { get; set; }
        public string? Nombres { get; set; }
        public string? RutaFotoUsuario { get; set; }
        public string? ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }
        public string? NombreUsuario { get; set; }
        public bool? Activo { get; set; }
        public string? CodigoSexo { get; set; }
        public string? Email { get; set; }
        public DateTime? FechaNac { get; set; }
        public string? Acercademi { get; set; }
        public string? Ciudad { get; set; }
    }

    public class TblVisitas : EntityClass
    {
        public int? IdVisita { get; set; }
        public DateTime? FechaVisita { get; set; }
        public string? IpVisita { get; set; }
        public string? Navegador { get; set; }
    }
}
