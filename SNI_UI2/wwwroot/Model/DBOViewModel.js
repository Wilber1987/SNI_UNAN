import { EntityClass } from "../WDevCore/WModules/EntityClass.js";
import { WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
class ViewInvestigacionesDisciplinas extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Investigacion = { type: 'number' };
   Id_Disciplina = { type: 'number' };
   DescripcionDisciplina = { type: 'text' };
   Color = { type: 'text' };
   Icono = { type: 'text' };
}
export { ViewInvestigacionesDisciplinas }
class ViewInvestigacionesPhoto extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Titulo = { type: 'text' };
   Repositorio = { type: '' };
   Descripcion = { type: 'text' };
   Fecha_ejecucion = { type: 'date' };
   Id_Investigacion = { type: 'number' };
   Resumen = { type: 'text' };
   url_publicacion = { type: 'text' };
   Photo = { type: 'text' };
   Abstract = { type: 'text' };
   NombreInstitucion = { type: 'text' };
   Nombres = { type: 'text' };
   Id_Investigador = { type: 'number' };
   Nombre_TipoLocalidad = { type: 'text' };
   Nombre_Localidad = { type: 'text' };
   País = { type: 'text' };
   Id_LocalidadPadre = { type: 'number' };
   Id_Localidad = { type: 'number' };
   Foto = { type: 'text' };
}
export { ViewInvestigacionesPhoto }
class ViewInvestigacionesPorDisciplinas extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Titulo = { type: 'text' };
   Repositorio = { type: '' };
   Descripcion = { type: 'text' };
   Fecha_ejecucion = { type: 'date' };
   Id_Investigacion = { type: 'number' };
   Resumen = { type: 'text' };
   url_publicacion = { type: 'text' };
   Abstract = { type: 'text' };
   NombreInstitucion = { type: 'text' };
   Nombres = { type: 'text' };
   Apellidos = { type: 'text' };
   Id_Investigador = { type: 'number' };
   Nombre_TipoLocalidad = { type: 'text' };
   Nombre_Localidad = { type: 'text' };
   País = { type: 'text' };
   Id_LocalidadPadre = { type: 'number' };
   Id_Localidad = { type: 'number' };
   Disciplina = { type: 'text' };
   Id_Disciplina = { type: 'number' };
}
export { ViewInvestigacionesPorDisciplinas }
class ViewInvestigaciones extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Titulo = { type: 'text' };
   Repositorio = { type: '' };
   Descripcion = { type: 'text' };
   Fecha_ejecucion = { type: 'date' };
   Id_Investigacion = { type: 'number' };
   Resumen = { type: 'text' };
   url_publicacion = { type: 'text' };
   Photo = { type: 'text' };
   Abstract = { type: 'text' };
   NombreInstitucion = { type: 'text' };
   Nombres = { type: 'text' };
   Id_Investigador = { type: 'number' };
   Nombre_TipoLocalidad = { type: 'text' };
   Nombre_Localidad = { type: 'text' };
   País = { type: 'text' };
   Id_LocalidadPadre = { type: 'number' };
   Id_Localidad = { type: 'number' };
}
export { ViewInvestigaciones }
class ViewGPInstitucionesAsociadas extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Institucion = { type: 'number' };
   Nombre = { type: 'text' };
   Logo = { type: 'text' };
   Id_Proyecto = { type: 'number' };
   Id_Tipo_Asociacion = { type: 'number' };
   Descripcion = { type: 'text' };
   EstadoAsociacion = { type: 'text' };
   Fecha_Ingreso = { type: 'date' };
}
export { ViewGPInstitucionesAsociadas }
class ViewColaboradores extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Investigador = { type: 'number' };
   Nombres = { type: 'text' };
   Apellidos = { type: 'text' };
   FechaNac = { type: 'date' };
   Sexo = { type: 'text' };
   Foto = { type: 'text' };
   DNI = { type: 'text' };
   Correo_institucional = { type: 'text' };
   Indice_H = { type: 'text' };
   Estado = { type: 'text' };
   Id_Investigacion = { type: 'number' };
   Fecha_ingreso = { type: 'date' };
   TipoColaboracion = { type: 'text' };
   NombreInstitucion = { type: 'text' };
   Titulo = { type: 'text' };
   Fecha_ejecucion = { type: 'date' };
}
export { ViewColaboradores }
class ViewParticipantesProyectos extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Investigador = { type: 'number' };
   Id_Proyecto = { type: 'number' };
   Fecha_Ingreso = { type: 'date' };
   Estado_Participante = { type: 'text' };
   DescripcionProyecto = { type: 'text' };
   Fecha_Inicio = { type: 'date' };
   Fecha_Finalizacion = { type: 'date' };
   Visibilidad = { type: 'text' };
   Cargo = { type: 'text' };
   Descripcion_Tipo_Proyecto = { type: 'text' };
   Estado_Tipo_Proyecto = { type: 'text' };
   Nombre_Proyecto = { type: 'text' };
   Estado_Proyecto = { type: 'text' };
}
export { ViewParticipantesProyectos }
class ViewRedesInvestigadores extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_RedSocial = { type: 'number' };
   Descripcion = { type: 'text' };
   url = { type: 'text' };
   Icon = { type: 'text' };
   url_red_inv = { type: 'text' };
   Id_Investigador = { type: 'number' };
}
export { ViewRedesInvestigadores }
class ViewIdiomasInvestigadores extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Idioma = { type: 'number' };
   Descripcion = { type: 'text' };
   Id_Investigador = { type: 'number' };
}
export { ViewIdiomasInvestigadores }
class ViewCalendarioByDependencia extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   IdActividad = { type: 'number' };
   IdTareaPadre = { type: 'number' };
   Fecha_Inicial = { type: 'date' };
   Fecha_Final = { type: 'date' };
   Estado = { type: 'text' };
   IdCalendario = { type: 'number' };
   IdTarea = { type: 'number' };
   Id_Dependencia = { type: 'number' };
}
export { ViewCalendarioByDependencia }
class ViewActividadesParticipantes extends EntityClass {
   constructor(props) {
       super(props, 'ViewDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   IdActividad = { type: 'number' };
   Titulo = { type: 'text' };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   Id_Investigador = { type: 'number' };
}
export { ViewActividadesParticipantes }
