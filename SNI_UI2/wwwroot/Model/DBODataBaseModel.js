import { EntityClass } from "../WDevCore/WModules/EntityClass.js";
import { WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
class Cat_Tipo_Evento extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Tipo_Evento = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Evento = { type: 'MasterDetail', ModelObject: () => new Tbl_Evento() };
}
export { Cat_Tipo_Evento }
class Cat_Idiomas extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Idioma = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_IdiomasInv = { type: 'MasterDetail', ModelObject: () => new Tbl_IdiomasInv() };
}
export { Cat_Idiomas }
class Cat_TipoEstudio extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_TipoEstudio = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Formacion_Academica = { type: 'MasterDetail', ModelObject: () => new Tbl_Formacion_Academica() };
}
export { Cat_TipoEstudio }
class Cat_TipoGrupo extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_TipoGrupo = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Grupos = { type: 'MasterDetail', ModelObject: () => new Tbl_Grupos() };
}
export { Cat_TipoGrupo }
class Cat_TipoMiembro extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_TipoMiembro = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_InvestigadoresAsociados = { type: 'MasterDetail', ModelObject: () => new Tbl_InvestigadoresAsociados() };
}
export { Cat_TipoMiembro }
class CatTipoDistincion extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Tipo_Distincion = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Distinciones = { type: 'MasterDetail', ModelObject: () => new Tbl_Distinciones() };
}
export { CatTipoDistincion }
class ProyectoCatCargosDependencias extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    IdCargo = { type: 'number', primary: true };
    Descripcion = { type: 'text'};
    ProyectoTableDependencias_Usuarios = { type: 'MasterDetail', ModelObject: () => new ProyectoTableDependencias_Usuarios() };
}
export { ProyectoCatCargosDependencias }
class ProyectoCatDependencias extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Dependencia = { type: 'number', primary: true };
    Descripcion = { type: 'text' };
    ProyectoCatDependencia = { type: 'WSelect', ModelObject: () => new ProyectoCatDependencias() , require: false };
    Cat_instituciones = { type: 'WSelect', ModelObject: () => new Cat_instituciones() };
    ProyectoCatDependencias_Hijas = { type: 'Multiselect', ModelObject: () => new ProyectoCatDependencias(), require: false };
    ProyectoTableAgenda = { type: 'MasterDetail', ModelObject: () => new ProyectoTableAgenda() , require: false};
    ProyectoTableDependencias_Usuarios = { type: 'MasterDetail', ModelObject: () => new ProyectoTableDependencias_Usuarios() , require: false};
}
export { ProyectoCatDependencias }
class ProyectoCatTipoParticipaciones extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    IdTipoParticipacion = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    ProyectoTableParticipantes = { type: 'MasterDetail', ModelObject: () => new ProyectoTableParticipantes() };
}
export { ProyectoCatTipoParticipaciones }
class ProyectoTableAgenda extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    IdAgenda = { type: 'number', primary: true };
    Dia = { type: 'Select', Dataset: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] };
    Hora_Inicial = { type: 'HORA' };
    Hora_Final = { type: 'HORA' };
    Fecha_Caducidad = { type: 'date' };
}
export { ProyectoTableAgenda }
class ProyectoTableDependencias_Usuarios extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Tbl_InvestigatorProfile = { type: 'WSelect', ModelObject: () => new Tbl_InvestigatorProfile() }
    ProyectoCatCargosDependencias = { type: 'WSelect', ModelObject: () => new ProyectoCatCargosDependencias() }
}
export { ProyectoTableDependencias_Usuarios }
class CatalogoTipoEvidencia extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    IdTipo = { type: 'number', primary: true };
    Descripcion = { type: 'text' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
}
export { CatalogoTipoEvidencia }
class ProyectoTableEvidencias extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    IdEvidencia = { type: 'number', primary: true };
    CatalogoTipoEvidencia = { type: 'WSelect', ModelObject: () => new CatalogoTipoEvidencia() };
    Data = { type: 'file' };

}
export { ProyectoTableEvidencias }
class Tbl_Datos_Laborales extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_DatoL = { type: 'number', primary: true };
    Fecha_Inicio = { type: 'date' };
    Fecha_Finalizacion = { type: 'date' };
    Unidad = { type: 'text' };
    Institucion = { type: 'text' };
}
export { Tbl_Datos_Laborales }
class Tbl_Distinciones extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Distincion = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    fecha = { type: 'date' };
    Montos = { type: 'number' };
    CatTipoDistincion = { type: 'WSelect', ModelObject: () => new CatTipoDistincion() };
    Cat_instituciones = { type: 'WSelect', ModelObject: () => new Cat_instituciones() };
}
export { Tbl_Distinciones }
class Tbl_Evento extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Evento = { type: 'number', primary: true };
    Nombre = { type: 'text' };
    Fecha_Inicio = { type: 'date' };
    Fecha_Finalizacion = { type: 'date' };
    Modalidad = { type: 'text' };
    Modalidad_Ponencia = { type: 'text' };
    Link = { type: 'text' };
    Datos_Adicionales = { type: 'text' };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Invitaciones = { type: 'MasterDetail', ModelObject: () => new Tbl_Invitaciones() };
    Tbl_Participantes_Eventos = { type: 'MasterDetail', ModelObject: () => new Tbl_Participantes_Eventos() };
}
export { Tbl_Evento }
class Tbl_Participantes_Eventos extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Descripcion = { type: 'text', hiddenInTable: true };
    Fecha_Participacion = { type: 'date' };
    Titulo = { type: 'text' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_InvestigatorProfile = { type: 'WSelect', ModelObject: () => new Tbl_InvestigatorProfile() };
}
export { Tbl_Participantes_Eventos }
class Tbl_Formacion_Academica extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    IdFormacion = { type: 'number', primary: true };
    Titulo = { type: 'text' };
    Disciplina = { type: 'text' };
    Fecha_Inicio = { type: 'date' };
    Fecha_Finalizacion = { type: 'date' };
    Cat_TipoEstudio = { type: 'WSelect', ModelObject: () => new Cat_TipoEstudio() };
    Cat_instituciones = { type: 'WSelect', ModelObject: () => new Cat_instituciones() };

}
export { Tbl_Formacion_Academica }
class Tbl_Grupos extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Grupo = { type: 'number', primary: true };
    Fecha_Creacion = { type: 'date' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Descripcion = { type: 'text', hiddenInTable: true };
    Nombre = { type: 'text' };
    Tbl_InstitucionesAsociadasGrupos = { type: 'MasterDetail', ModelObject: () => new Tbl_InstitucionesAsociadasGrupos() };
    Tbl_InvestigadoresAsociados = { type: 'MasterDetail', ModelObject: () => new Tbl_InvestigadoresAsociados() };
}
export { Tbl_Grupos }
class Tbl_InstitucionesAsociadasGrupos extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Fecha_Incorporacion = { type: 'date' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
}
export { Tbl_InstitucionesAsociadasGrupos }
class Tbl_InvestigadoresAsociados extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Fecha_Incorporacion = { type: 'date' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
}
export { Tbl_InvestigadoresAsociados }
class Tbl_Invitaciones extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Invitacion = { type: 'number', primary: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Fecha_Invitacion = { type: 'date' };
    Tbl_InvestigatorProfile = { type: 'WSelect', ModelObject: () => new Tbl_InvestigatorProfile() };
}
export { Tbl_Invitaciones }
class Tbl_Patentes extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Patente = { type: 'number', primary: true };
    fecha = { type: 'date' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Descripcion = { type: 'text', hiddenInTable: true };
    Cat_instituciones = { type: 'WSelect', ModelObject: () => new Cat_instituciones() };
}
export { Tbl_Patentes }
class TblProcesosEditoriales extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Proceso_Editorial = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Fecha = { type: 'date' };
    Cat_Tipo_Proceso_Editorial = { type: 'WSelect', ModelObject: () => new Cat_Tipo_Proceso_Editorial() };
}
export { TblProcesosEditoriales }
class Cat_Tipo_Participacion_Eventos extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Tipo_Participacion = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Tbl_Participantes_Eventos = { type: 'MasterDetail', ModelObject: () => new Tbl_Participantes_Eventos() };
}
export { Cat_Tipo_Participacion_Eventos }
class Tbl_Investigaciones_Disciplinas extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Cat_Disciplinas = { type: 'WSelect', ModelObject: () => new Cat_Disciplinas() };
}
export { Tbl_Investigaciones_Disciplinas }
class Cat_Disciplinas extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Disciplina = { type: 'number', primary: true };
    DescripcionDisciplina = { type: 'text' };
    Color = { type: 'text' };
    Icono = { type: 'img' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Investigaciones_Disciplinas = { type: 'MasterDetail', ModelObject: () => new Tbl_Investigaciones_Disciplinas() };
}
export { Cat_Disciplinas }
class Tbl_Investigaciones extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Investigacion = { type: 'number', primary: true };
    Visibilidad = { type: 'text' };
    Titulo = { type: 'text' };
    Abstract = { type: 'text', hiddenInTable: true };
    Resumen = { type: 'text', hiddenInTable: true };
    Repositorio = { type: 'text' };
    Referencias = { type: 'text', hiddenInTable: true };
    url_publicacion = { type: 'text', hiddenInTable: true };
    Fecha_ejecucion = { type: 'date' };
    Photo = { type: 'IMG' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo", "Finalizada", "En Proceso"] };
    Fecha_publicacion = { type: 'date' };
    Tbl_Colaboradores = { type: 'MasterDetail', ModelObject: () => new Tbl_Colaboradores() };
    Tbl_Investigaciones_Disciplinas = { type: 'MasterDetail', ModelObject: () => new Tbl_Investigaciones_Disciplinas() };
}
export { Tbl_Investigaciones }
class Cat_Paises extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Pais = { type: 'number', primary: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Descripcion = { type: 'text', hiddenInTable: true };
    Cat_Localidad = { type: 'MasterDetail', ModelObject: () => new Cat_Localidad() };
    Tbl_Evento = { type: 'MasterDetail', ModelObject: () => new Tbl_Evento() };
    Tbl_InvestigatorProfile = { type: 'MasterDetail', ModelObject: () => new Tbl_InvestigatorProfile() };
}
export { Cat_Paises }
class Cat_TipoLocalidad extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Tipo_Localidad = { type: 'number', primary: true };
    Nombre_TipoLocalidad = { type: 'text' };
    Cat_Localidad = { type: 'MasterDetail', ModelObject: () => new Cat_Localidad() };
}
export { Cat_TipoLocalidad }
class Cat_Localidad extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Localidad = { type: 'number', primary: true };
    Nombre_Localidad = { type: 'text' };
    Latitud = { type: 'text' };
    Longitud = { type: 'text' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Cat_Localidad = { type: 'MasterDetail', ModelObject: () => new Cat_Localidad() };
    Tbl_Investigaciones = { type: 'MasterDetail', ModelObject: () => new Tbl_Investigaciones() };
}
export { Cat_Localidad }
class Cat_instituciones extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Institucion = { type: 'number', primary: true };
    Nombre = { type: 'text' };
    Direccion = { type: 'text' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Logo = { type: 'img' };
    ProyectoCatDependencias = { type: 'MasterDetail', ModelObject: () => new ProyectoCatDependencias() };
    Tbl_Distinciones = { type: 'MasterDetail', ModelObject: () => new Tbl_Distinciones() };
    Tbl_Formacion_Academica = { type: 'MasterDetail', ModelObject: () => new Tbl_Formacion_Academica() };
    Tbl_Instituciones_Asociadas = { type: 'MasterDetail', ModelObject: () => new Tbl_Instituciones_Asociadas() };
    Tbl_InstitucionesAsociadasGrupos = { type: 'MasterDetail', ModelObject: () => new Tbl_InstitucionesAsociadasGrupos() };
    Tbl_InvestigatorProfile = { type: 'MasterDetail', ModelObject: () => new Tbl_InvestigatorProfile() };
    Tbl_Patentes = { type: 'MasterDetail', ModelObject: () => new Tbl_Patentes() };
}
export { Cat_instituciones }
class Cat_Tipo_Investigacion extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Tipo_Investigacion = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Investigaciones = { type: 'MasterDetail', ModelObject: () => new Tbl_Investigaciones() };
}
export { Cat_Tipo_Investigacion }
class Tbl_InvestigatorProfile extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Investigador = { type: 'number', primary: true };
    Nombres = { type: 'text' };
    Apellidos = { type: 'text' };
    FechaNac = { type: 'date' };
    Sexo = { type: 'text' };
    Foto = { type: 'img' };
    DNI = { type: 'text' };
    Correo_institucional = { type: 'text' };
    Indice_H = { type: 'text' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_IdiomasInv = { type: 'MasterDetail', ModelObject: () => new Tbl_IdiomasInv() };
    //ProyectoTableActividades = { type: 'MasterDetail',  ModelObject: ()=> new ProyectoTableActividades()};
    //ProyectoTableAgenda = { type: 'MasterDetail',  ModelObject: ()=> new ProyectoTableAgenda()};
    //ProyectoTableDependencias_Usuarios = { type: 'MasterDetail',  ModelObject: ()=> new ProyectoTableDependencias_Usuarios()};
    //ProyectoTableParticipantes = { type: 'MasterDetail',  ModelObject: ()=> new ProyectoTableParticipantes()};
    //Tbl_Colaboradores = { type: 'MasterDetail',  ModelObject: ()=> new Tbl_Colaboradores()};
    Tbl_Datos_Laborales = { type: 'MasterDetail', ModelObject: () => new Tbl_Datos_Laborales() };
    Tbl_Distinciones = { type: 'MasterDetail', ModelObject: () => new Tbl_Distinciones() };
    //Tbl_Evento = { type: 'MasterDetail',  ModelObject: ()=> new Tbl_Evento()};
    Tbl_Formacion_Academica = { type: 'MasterDetail', ModelObject: () => new Tbl_Formacion_Academica() };
    //Tbl_Grupos = { type: 'MasterDetail',  ModelObject: ()=> new Tbl_Grupos()};
    Tbl_Invest_RedS = { type: 'MasterDetail', ModelObject: () => new Tbl_Invest_RedS() };
    //Tbl_Investigaciones = { type: 'MasterDetail',  ModelObject: ()=> new Tbl_Investigaciones()};
    //Tbl_InvestigadoresAsociados = { type: 'MasterDetail',  ModelObject: ()=> new Tbl_InvestigadoresAsociados()};
    //Tbl_Invitaciones = { type: 'MasterDetail',  ModelObject: ()=> new Tbl_Invitaciones()};
    //Tbl_Participantes_Eventos = { type: 'MasterDetail',  ModelObject: ()=> new Tbl_Participantes_Eventos()};
    //Tbl_Participantes_Proyectos = { type: 'MasterDetail',  ModelObject: ()=> new Tbl_Participantes_Proyectos()};
    Tbl_Patentes = { type: 'MasterDetail', ModelObject: () => new Tbl_Patentes() };
    TblProcesosEditoriales = { type: 'MasterDetail', ModelObject: () => new TblProcesosEditoriales() };
}
export { Tbl_InvestigatorProfile }
class Cat_Tipo_Asociacion extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Tipo_Asociacion = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Instituciones_Asociadas = { type: 'MasterDetail', ModelObject: () => new Tbl_Instituciones_Asociadas() };
}
export { Cat_Tipo_Asociacion }
class Tbl_Instituciones_Asociadas extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Fecha_Ingreso = { type: 'date' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
}
export { Tbl_Instituciones_Asociadas }
class Cat_Tipo_Colaborador extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Tipo_Colaboracion = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Colaboradores = { type: 'MasterDetail', ModelObject: () => new Tbl_Colaboradores() };
}
export { Cat_Tipo_Colaborador }
class Tbl_Colaboradores extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Fecha_ingreso = { type: 'date' };
    Tbl_InvestigatorProfile = { type: 'WSelect', ModelObject: () => new Tbl_InvestigatorProfile() };
    Cat_Tipo_Colaborador = { type: 'WSelect', ModelObject: () => new Cat_Tipo_Colaborador() };
}
export { Tbl_Colaboradores }
class Cat_Tipo_Proyecto extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Tipo_Proyecto = { type: 'number', primary: true };
    Descripcion_Tipo_Proyecto = { type: 'text' };
    Estado_Tipo_Proyecto = { type: 'text' };
    Icon = { type: 'img' };
    Tbl_Proyectos = { type: 'MasterDetail', ModelObject: () => new Tbl_Proyectos() };
}
export { Cat_Tipo_Proyecto }
class Tbl_Proyectos extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Proyecto = { type: 'number', primary: true };
    Nombre_Proyecto = { type: 'text' };
    DescripcionProyecto = { type: 'text' };
    Visibilidad = { type: 'text' };
    Estado_Proyecto = { type: 'text' };
    Fecha_Inicio = { type: 'date' };
    Fecha_Finalizacion = { type: 'date' };
    ProyectoTableActividades = { type: 'MasterDetail', ModelObject: () => new ProyectoTableActividades() };
    Tbl_Instituciones_Asociadas = { type: 'MasterDetail', ModelObject: () => new Tbl_Instituciones_Asociadas() };
    Tbl_Participantes_Proyectos = { type: 'MasterDetail', ModelObject: () => new Tbl_Participantes_Proyectos() };
}
export { Tbl_Proyectos }
class Cat_Cargo_Proyecto extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Cargo_Proyecto = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Participantes_Proyectos = { type: 'MasterDetail', ModelObject: () => new Tbl_Participantes_Proyectos() };
}
export { Cat_Cargo_Proyecto }
class Tbl_Participantes_Proyectos extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Fecha_Ingreso = { type: 'date' };
    Estado_Participante = { type: 'text' };
}
export { Tbl_Participantes_Proyectos }
class CatRedesSociales extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_RedSocial = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    url = { type: 'text' };
    Icon = { type: 'img' };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Invest_RedS = { type: 'MasterDetail', ModelObject: () => new Tbl_Invest_RedS() };
}
export { CatRedesSociales }
class Tbl_Invest_RedS extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    url_red_inv = { type: 'text' };
    CatRedesSociales = { type: 'WSelect', ModelObject: () => new CatRedesSociales() };
}
export { Tbl_Invest_RedS }
class Tbl_IdiomasInv extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Cat_Idiomas = { type: 'WSelect', ModelObject: () => new Cat_Idiomas() };
}
export { Tbl_IdiomasInv }
class ProyectoTableActividades extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    IdActividad = { type: 'number', primary: true };
    Titulo = { type: 'text' };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo", "En Proceso", "Pendientes", "Finalizada"] };
    Fecha_Inicial = { type: 'date' };
    Fecha_Final = { type: 'date' };
    ProyectoCatDependencias = { type: 'WSelect', ModelObject: () => new ProyectoCatDependencias() };
    ProyectoTableTareas = { type: 'MasterDetail', ModelObject: () => new ProyectoTableTareas() };
}
export { ProyectoTableActividades }
class ProyectoTableCalendario extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    IdCalendario = { type: 'number', primary: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Fecha_Inicial = { type: 'date' };
    Fecha_Final = { type: 'date' };
}
export { ProyectoTableCalendario }
class ProyectoTableTareas extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    IdTarea = { type: 'number', primary: true };
    Titulo = { type: 'text' };
    IdActividad = { type: 'number', hidden: true, value: undefined };
    Descripcion = { type: 'text', hiddenInTable: true };
    ProyectoTableTarea = { type: 'WSelect', ModelObject: () => new ProyectoTableTareas() };
    Estado = { type: "Select", Dataset: ["Finalizada", "Activo", "Inactivo"] };
    ProyectoTableCalendario = { type: 'CALENDAR', ModelObject: () => new ProyectoTableCalendario(), require: false };
    ProyectoTableParticipantes = { type: 'MasterDetail', ModelObject: () => new ProyectoTableParticipantes() };
    ProyectoTableEvidencias = { type: 'MasterDetail', require: false, ModelObject: () => new ProyectoTableEvidencias() };
    ProyectoTableTareasHijas = { type: 'MULTISELECT', ModelObject: () => new ProyectoTableTareas() };    
}
export { ProyectoTableTareas }
class ProyectoTableParticipantes extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Tbl_InvestigatorProfile = { type: 'WSelect', ModelObject: () => new ProyectoTableParticipantes() }
    ProyectoCatTipoParticipaciones = { type: 'WSelect', ModelObject: () => new ProyectoCatTipoParticipaciones() }
}
export { ProyectoTableParticipantes }
class Cat_Cargos extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Cargo = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Tbl_Datos_Laborales = { type: 'MasterDetail', ModelObject: () => new Tbl_Datos_Laborales() };
}
export { Cat_Cargos }
class Cat_Tipo_Proceso_Editorial extends EntityClass {
    constructor(props) {
        super(props, 'EntityDBO');
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Id_Tipo_Proceso_Editorial = { type: 'number', primary: true };
    Descripcion = { type: 'text', hiddenInTable: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    TblProcesosEditoriales = { type: 'MasterDetail', ModelObject: () => new TblProcesosEditoriales() };
}
export { Cat_Tipo_Proceso_Editorial }
