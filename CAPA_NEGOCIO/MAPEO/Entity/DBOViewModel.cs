using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DataBaseModel {
   public class ViewInvestigacionesDisciplinas : EntityClass {
       public int? Id_Investigacion { get; set; }
       public int? Id_Disciplina { get; set; }
       public string? DescripcionDisciplina { get; set; }
       public string? Color { get; set; }
       public string? Icono { get; set; }
   }
   public class ViewInvestigacionesPhoto : EntityClass {
       public string? Titulo { get; set; }
       public string? Descripcion { get; set; }
       public DateTime? Fecha_ejecucion { get; set; }
       public int? Id_Investigacion { get; set; }
       public string? Resumen { get; set; }
       public string? url_publicacion { get; set; }
       public string? Photo { get; set; }
       public string? Abstract { get; set; }
       public string? NombreInstitucion { get; set; }
       public string? Nombres { get; set; }
       public int? Id_Investigador { get; set; }
       public string? Nombre_TipoLocalidad { get; set; }
       public string? Nombre_Localidad { get; set; }
       public string? País { get; set; }
       public int? Id_LocalidadPadre { get; set; }
       public int? Id_Localidad { get; set; }
       public string? Foto { get; set; }
   }
   public class ViewInvestigaciones : EntityClass {
       public string? Titulo { get; set; }
       public string? Descripcion { get; set; }
       public DateTime? Fecha_ejecucion { get; set; }
       public int? Id_Investigacion { get; set; }
       public string? Resumen { get; set; }
       public string? url_publicacion { get; set; }
       public string? Photo { get; set; }
       public string? Abstract { get; set; }
       public string? NombreInstitucion { get; set; }
       public string? Nombres { get; set; }
       public int? Id_Investigador { get; set; }
       public string? Nombre_TipoLocalidad { get; set; }
       public string? Nombre_Localidad { get; set; }
       public string? País { get; set; }
       public int? Id_LocalidadPadre { get; set; }
       public int? Id_Localidad { get; set; }
   }
   public class ViewColaboradores : EntityClass {
       public int? Id_Investigador { get; set; }
       public string? Nombres { get; set; }
       public string? Apellidos { get; set; }
       public DateTime? FechaNac { get; set; }
       public string? Sexo { get; set; }
       public string? Foto { get; set; }
       public string? DNI { get; set; }
       public string? Correo_institucional { get; set; }
       public string? Indice_H { get; set; }
       public string? Estado { get; set; }
       public int? Id_Investigacion { get; set; }
       public DateTime? Fecha_ingreso { get; set; }
       public string? TipoColaboracion { get; set; }
       public string? NombreInstitucion { get; set; }
       public string? Titulo { get; set; }
       public DateTime? Fecha_ejecucion { get; set; }
   }
   public class ViewParticipantesProyectos : EntityClass {
       public int? Id_Investigador { get; set; }
       public int? Id_Proyecto { get; set; }
       public DateTime? Fecha_Ingreso { get; set; }
       public string? Estado_Participante { get; set; }
       public string? DescripcionProyecto { get; set; }
       public DateTime? Fecha_Inicio { get; set; }
       public DateTime? Fecha_Finalizacion { get; set; }
       public string? Visibilidad { get; set; }
       public string? Cargo { get; set; }
       public string? Descripcion_Tipo_Proyecto { get; set; }
       public string? Estado_Tipo_Proyecto { get; set; }
       public string? Nombre_Proyecto { get; set; }
       public string? Estado_Proyecto { get; set; }
   }
   public class ViewRedesInvestigadores : EntityClass {
       public int? Id_RedSocial { get; set; }
       public string? Descripcion { get; set; }
       public string? url { get; set; }
       public string? Icon { get; set; }
       public string? url_red_inv { get; set; }
       public int? Id_Investigador { get; set; }
   }
   public class ViewIdiomasInvestigadores : EntityClass {
       public int? Id_Idioma { get; set; }
       public string? Descripcion { get; set; }
       public int? Id_Investigador { get; set; }
   }
   public class ViewCalendarioByDependencia : EntityClass {
       public int? IdActividad { get; set; }
       public int? IdTareaPadre { get; set; }
       public DateTime? Fecha_Inicial { get; set; }
       public DateTime? Fecha_Final { get; set; }
       public string? Estado { get; set; }
       public int? IdCalendario { get; set; }
       public int? IdTarea { get; set; }
       public int? Id_Dependencia { get; set; }
   }
   public class ViewActividadesParticipantes : EntityClass {
       public int? IdActividad { get; set; }
       public string? Titulo { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
       public int? Id_Investigador { get; set; }
   }
}
