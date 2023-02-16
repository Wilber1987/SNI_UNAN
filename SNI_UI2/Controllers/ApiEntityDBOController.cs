using DataBaseModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CAPA_NEGOCIO.MAPEO;
using SNI_UI2.Controllers;
using System.Collections.Generic;

namespace API.Controllers {
   [Route("api/[controller]/[action]")]
   [ApiController]
   public class  ApiEntityDBOController : ControllerBase {
       //Cat_Tipo_Evento
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Evento> getCat_Tipo_Evento(Cat_Tipo_Evento Inst) {
           return Inst.Get<Cat_Tipo_Evento>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Tipo_Evento(Cat_Tipo_Evento inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Tipo_Evento(Cat_Tipo_Evento inst) {
           return inst.Update();
       }

        [HttpPost]
        [AuthController]
        public List<CatalogoTipoEvidencia> getCatalogoTipoEvidencia(CatalogoTipoEvidencia Inst)
        {
            return Inst.Get<CatalogoTipoEvidencia>();
        }
        [HttpPost]
        [AuthController]
        public object saveCatalogoTipoEvidencia(CatalogoTipoEvidencia inst)
        {
            return inst.Save();
        }
        [HttpPost]
        [AuthController]
        public object updateCatalogoTipoEvidencia(CatalogoTipoEvidencia inst)
        {
            return inst.Update();
        }
        //Cat_Idiomas
        [HttpPost]
       [AuthController]
       public List<Cat_Idiomas> getCat_Idiomas(Cat_Idiomas Inst) {
           return Inst.Get<Cat_Idiomas>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Idiomas(Cat_Idiomas inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Idiomas(Cat_Idiomas inst) {
           return inst.Update();
       }
       //Cat_TipoEstudio
       [HttpPost]
       [AuthController]
       public List<Cat_TipoEstudio> getCat_TipoEstudio(Cat_TipoEstudio Inst) {
           return Inst.Get<Cat_TipoEstudio>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_TipoEstudio(Cat_TipoEstudio inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_TipoEstudio(Cat_TipoEstudio inst) {
           return inst.Update();
       }
       //Cat_TipoGrupo
       [HttpPost]
       [AuthController]
       public List<Cat_TipoGrupo> getCat_TipoGrupo(Cat_TipoGrupo Inst) {
           return Inst.Get<Cat_TipoGrupo>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_TipoGrupo(Cat_TipoGrupo inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_TipoGrupo(Cat_TipoGrupo inst) {
           return inst.Update();
       }
       //Cat_TipoMiembro
       [HttpPost]
       [AuthController]
       public List<Cat_TipoMiembro> getCat_TipoMiembro(Cat_TipoMiembro Inst) {
           return Inst.Get<Cat_TipoMiembro>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_TipoMiembro(Cat_TipoMiembro inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_TipoMiembro(Cat_TipoMiembro inst) {
           return inst.Update();
       }
       //CatTipoDistincion
       [HttpPost]
       [AuthController]
       public List<CatTipoDistincion> getCatTipoDistincion(CatTipoDistincion Inst) {
           return Inst.Get<CatTipoDistincion>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatTipoDistincion(CatTipoDistincion inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatTipoDistincion(CatTipoDistincion inst) {
           return inst.Update();
       }
       //ProyectoCatCargosDependencias
       [HttpPost]
       [AuthController]
       public List<ProyectoCatCargosDependencias> getProyectoCatCargosDependencias(ProyectoCatCargosDependencias Inst) {
           return Inst.Get<ProyectoCatCargosDependencias>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoCatCargosDependencias(ProyectoCatCargosDependencias inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoCatCargosDependencias(ProyectoCatCargosDependencias inst) {
           return inst.Update();
       }
       //ProyectoCatDependencias
       [HttpPost]
       [AuthController]
       public List<ProyectoCatDependencias> getProyectoCatDependencias(ProyectoCatDependencias Inst) {
           return Inst.Get<ProyectoCatDependencias>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoCatDependencias(ProyectoCatDependencias inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoCatDependencias(ProyectoCatDependencias inst) {
           return inst.Update();
       }
       //ProyectoCatTipoParticipaciones
       [HttpPost]
       [AuthController]
       public List<ProyectoCatTipoParticipaciones> getProyectoCatTipoParticipaciones(ProyectoCatTipoParticipaciones Inst) {
           return Inst.Get<ProyectoCatTipoParticipaciones>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoCatTipoParticipaciones(ProyectoCatTipoParticipaciones inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoCatTipoParticipaciones(ProyectoCatTipoParticipaciones inst) {
           return inst.Update();
       }
       //ProyectoTableAgenda
       [HttpPost]
       [AuthController]
       public List<ProyectoTableAgenda> getProyectoTableAgenda(ProyectoTableAgenda Inst) {
           return Inst.Get<ProyectoTableAgenda>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoTableAgenda(ProyectoTableAgenda inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoTableAgenda(ProyectoTableAgenda inst) {
           return inst.Update();
       }
       //ProyectoTableDependencias_Usuarios
       [HttpPost]
       [AuthController]
       public List<ProyectoTableDependencias_Usuarios> getProyectoTableDependencias_Usuarios(ProyectoTableDependencias_Usuarios Inst) {
           return Inst.Get<ProyectoTableDependencias_Usuarios>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoTableDependencias_Usuarios(ProyectoTableDependencias_Usuarios inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoTableDependencias_Usuarios(ProyectoTableDependencias_Usuarios inst) {
           return inst.Update();
       }
       //ProyectoTableEvidencias
       [HttpPost]
       [AuthController]
       public List<ProyectoTableEvidencias> getProyectoTableEvidencias(ProyectoTableEvidencias Inst) {
           return Inst.Get<ProyectoTableEvidencias>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoTableEvidencias(ProyectoTableEvidencias inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoTableEvidencias(ProyectoTableEvidencias inst) {
           return inst.Update();
       }
       //Tbl_Datos_Laborales
       [HttpPost]
       [AuthController]
       public List<Tbl_Datos_Laborales> getTbl_Datos_Laborales(Tbl_Datos_Laborales Inst) {
           return Inst.Get<Tbl_Datos_Laborales>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Datos_Laborales(Tbl_Datos_Laborales inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Datos_Laborales(Tbl_Datos_Laborales inst) {
           return inst.Update();
       }
       //Tbl_Distinciones
       [HttpPost]
       [AuthController]
       public List<Tbl_Distinciones> getTbl_Distinciones(Tbl_Distinciones Inst) {
           return Inst.Get<Tbl_Distinciones>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Distinciones(Tbl_Distinciones inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Distinciones(Tbl_Distinciones inst) {
           return inst.Update();
       }
       //Tbl_Evento
       [HttpPost]
       [AuthController]
       public List<Tbl_Evento> getTbl_Evento(Tbl_Evento Inst) {
           return Inst.Get<Tbl_Evento>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Evento(Tbl_Evento inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Evento(Tbl_Evento inst) {
           return inst.Update();
       }
       //Tbl_Participantes_Eventos
       [HttpPost]
       [AuthController]
       public List<Tbl_Participantes_Eventos> getTbl_Participantes_Eventos(Tbl_Participantes_Eventos Inst) {
           return Inst.Get<Tbl_Participantes_Eventos>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Participantes_Eventos(Tbl_Participantes_Eventos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Participantes_Eventos(Tbl_Participantes_Eventos inst) {
           return inst.Update();
       }
       //Tbl_Formacion_Academica
       [HttpPost]
       [AuthController]
       public List<Tbl_Formacion_Academica> getTbl_Formacion_Academica(Tbl_Formacion_Academica Inst) {
           return Inst.Get<Tbl_Formacion_Academica>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Formacion_Academica(Tbl_Formacion_Academica inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Formacion_Academica(Tbl_Formacion_Academica inst) {
           return inst.Update();
       }
       //Tbl_Grupos
       [HttpPost]
       [AuthController]
       public List<Tbl_Grupos> getTbl_Grupos(Tbl_Grupos Inst) {
           return Inst.Get<Tbl_Grupos>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Grupos(Tbl_Grupos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Grupos(Tbl_Grupos inst) {
           return inst.Update();
       }
       //Tbl_InstitucionesAsociadasGrupos
       [HttpPost]
       [AuthController]
       public List<Tbl_InstitucionesAsociadasGrupos> getTbl_InstitucionesAsociadasGrupos(Tbl_InstitucionesAsociadasGrupos Inst) {
           return Inst.Get<Tbl_InstitucionesAsociadasGrupos>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_InstitucionesAsociadasGrupos(Tbl_InstitucionesAsociadasGrupos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_InstitucionesAsociadasGrupos(Tbl_InstitucionesAsociadasGrupos inst) {
           return inst.Update();
       }
       //Tbl_InvestigadoresAsociados
       [HttpPost]
       [AuthController]
       public List<Tbl_InvestigadoresAsociados> getTbl_InvestigadoresAsociados(Tbl_InvestigadoresAsociados Inst) {
           return Inst.Get<Tbl_InvestigadoresAsociados>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_InvestigadoresAsociados(Tbl_InvestigadoresAsociados inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_InvestigadoresAsociados(Tbl_InvestigadoresAsociados inst) {
           return inst.Update();
       }
       //Tbl_Invitaciones
       [HttpPost]
       [AuthController]
       public List<Tbl_Invitaciones> getTbl_Invitaciones(Tbl_Invitaciones Inst) {
           return Inst.Get<Tbl_Invitaciones>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Invitaciones(Tbl_Invitaciones inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Invitaciones(Tbl_Invitaciones inst) {
           return inst.Update();
       }
       //Tbl_Patentes
       [HttpPost]
       [AuthController]
       public List<Tbl_Patentes> getTbl_Patentes(Tbl_Patentes Inst) {
           return Inst.Get<Tbl_Patentes>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Patentes(Tbl_Patentes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Patentes(Tbl_Patentes inst) {
           return inst.Update();
       }
       //TblProcesosEditoriales
       [HttpPost]
       [AuthController]
       public List<TblProcesosEditoriales> getTblProcesosEditoriales(TblProcesosEditoriales Inst) {
           return Inst.Get<TblProcesosEditoriales>();
       }
       [HttpPost]
       [AuthController]
       public object saveTblProcesosEditoriales(TblProcesosEditoriales inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTblProcesosEditoriales(TblProcesosEditoriales inst) {
           return inst.Update();
       }
       //Cat_Tipo_Participacion_Eventos
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Participacion_Eventos> getCat_Tipo_Participacion_Eventos(Cat_Tipo_Participacion_Eventos Inst) {
           return Inst.Get<Cat_Tipo_Participacion_Eventos>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Tipo_Participacion_Eventos(Cat_Tipo_Participacion_Eventos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Tipo_Participacion_Eventos(Cat_Tipo_Participacion_Eventos inst) {
           return inst.Update();
       }
       //Tbl_Investigaciones_Disciplinas
       [HttpPost]
       [AuthController]
       public List<Tbl_Investigaciones_Disciplinas> getTbl_Investigaciones_Disciplinas(Tbl_Investigaciones_Disciplinas Inst) {
           return Inst.Get<Tbl_Investigaciones_Disciplinas>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Investigaciones_Disciplinas(Tbl_Investigaciones_Disciplinas inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Investigaciones_Disciplinas(Tbl_Investigaciones_Disciplinas inst) {
           return inst.Update();
       }
       //Cat_Disciplinas
       [HttpPost]
       [AuthController]
       public List<Cat_Disciplinas> getCat_Disciplinas(Cat_Disciplinas Inst) {
           return Inst.Get<Cat_Disciplinas>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Disciplinas(Cat_Disciplinas inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Disciplinas(Cat_Disciplinas inst) {
           return inst.Update();
       }
       //Tbl_Investigaciones
       [HttpPost]
       [AuthController]
       public List<Tbl_Investigaciones> getTbl_Investigaciones(Tbl_Investigaciones Inst) {
           return Inst.Get<Tbl_Investigaciones>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Investigaciones(Tbl_Investigaciones inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Investigaciones(Tbl_Investigaciones inst) {
           return inst.Update();
       }
       //Cat_Paises
       [HttpPost]
       [AuthController]
       public List<Cat_Paises> getCat_Paises(Cat_Paises Inst) {
           return Inst.Get<Cat_Paises>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Paises(Cat_Paises inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Paises(Cat_Paises inst) {
           return inst.Update();
       }
       //Cat_TipoLocalidad
       [HttpPost]
       [AuthController]
       public List<Cat_TipoLocalidad> getCat_TipoLocalidad(Cat_TipoLocalidad Inst) {
           return Inst.Get<Cat_TipoLocalidad>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_TipoLocalidad(Cat_TipoLocalidad inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_TipoLocalidad(Cat_TipoLocalidad inst) {
           return inst.Update();
       }
       //Cat_Localidad
       [HttpPost]
       [AuthController]
       public List<Cat_Localidad> getCat_Localidad(Cat_Localidad Inst) {
           return Inst.Get<Cat_Localidad>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Localidad(Cat_Localidad inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Localidad(Cat_Localidad inst) {
           return inst.Update();
       }
       //Cat_instituciones
       [HttpPost]
       [AuthController]
       public List<Cat_instituciones> getCat_instituciones(Cat_instituciones Inst) {
           return Inst.Get<Cat_instituciones>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_instituciones(Cat_instituciones inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_instituciones(Cat_instituciones inst) {
           return inst.Update();
       }
       //Cat_Tipo_Investigacion
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Investigacion> getCat_Tipo_Investigacion(Cat_Tipo_Investigacion Inst) {
           return Inst.Get<Cat_Tipo_Investigacion>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Tipo_Investigacion(Cat_Tipo_Investigacion inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Tipo_Investigacion(Cat_Tipo_Investigacion inst) {
           return inst.Update();
       }
       //Tbl_InvestigatorProfile
       [HttpPost]
       [AuthController]
       public List<Tbl_InvestigatorProfile> getTbl_InvestigatorProfile(Tbl_InvestigatorProfile Inst) {
           return Inst.Get<Tbl_InvestigatorProfile>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_InvestigatorProfile(Tbl_InvestigatorProfile inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_InvestigatorProfile(Tbl_InvestigatorProfile inst) {
           return inst.Update();
       }
       //Cat_Tipo_Asociacion
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Asociacion> getCat_Tipo_Asociacion(Cat_Tipo_Asociacion Inst) {
           return Inst.Get<Cat_Tipo_Asociacion>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Tipo_Asociacion(Cat_Tipo_Asociacion inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Tipo_Asociacion(Cat_Tipo_Asociacion inst) {
           return inst.Update();
       }
       //Tbl_Instituciones_Asociadas
       [HttpPost]
       [AuthController]
       public List<Tbl_Instituciones_Asociadas> getTbl_Instituciones_Asociadas(Tbl_Instituciones_Asociadas Inst) {
           return Inst.Get<Tbl_Instituciones_Asociadas>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Instituciones_Asociadas(Tbl_Instituciones_Asociadas inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Instituciones_Asociadas(Tbl_Instituciones_Asociadas inst) {
           return inst.Update();
       }
       //Cat_Tipo_Colaborador
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Colaborador> getCat_Tipo_Colaborador(Cat_Tipo_Colaborador Inst) {
           return Inst.Get<Cat_Tipo_Colaborador>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Tipo_Colaborador(Cat_Tipo_Colaborador inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Tipo_Colaborador(Cat_Tipo_Colaborador inst) {
           return inst.Update();
       }
       //Tbl_Colaboradores
       [HttpPost]
       [AuthController]
       public List<Tbl_Colaboradores> getTbl_Colaboradores(Tbl_Colaboradores Inst) {
           return Inst.Get<Tbl_Colaboradores>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Colaboradores(Tbl_Colaboradores inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Colaboradores(Tbl_Colaboradores inst) {
           return inst.Update();
       }
       //Cat_Tipo_Proyecto
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Proyecto> getCat_Tipo_Proyecto(Cat_Tipo_Proyecto Inst) {
           return Inst.Get<Cat_Tipo_Proyecto>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Tipo_Proyecto(Cat_Tipo_Proyecto inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Tipo_Proyecto(Cat_Tipo_Proyecto inst) {
           return inst.Update();
       }
       //Tbl_Proyectos
       [HttpPost]
       [AuthController]
       public List<Tbl_Proyectos> getTbl_Proyectos(Tbl_Proyectos Inst) {
           return Inst.Get<Tbl_Proyectos>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Proyectos(Tbl_Proyectos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Proyectos(Tbl_Proyectos inst) {
           return inst.Update();
       }
       //Cat_Cargo_Proyecto
       [HttpPost]
       [AuthController]
       public List<Cat_Cargo_Proyecto> getCat_Cargo_Proyecto(Cat_Cargo_Proyecto Inst) {
           return Inst.Get<Cat_Cargo_Proyecto>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Cargo_Proyecto(Cat_Cargo_Proyecto inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Cargo_Proyecto(Cat_Cargo_Proyecto inst) {
           return inst.Update();
       }
       //Tbl_Participantes_Proyectos
       [HttpPost]
       [AuthController]
       public List<Tbl_Participantes_Proyectos> getTbl_Participantes_Proyectos(Tbl_Participantes_Proyectos Inst) {
           return Inst.Get<Tbl_Participantes_Proyectos>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Participantes_Proyectos(Tbl_Participantes_Proyectos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Participantes_Proyectos(Tbl_Participantes_Proyectos inst) {
           return inst.Update();
       }
       //CatRedesSociales
       [HttpPost]
       [AuthController]
       public List<CatRedesSociales> getCatRedesSociales(CatRedesSociales Inst) {
           return Inst.Get<CatRedesSociales>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatRedesSociales(CatRedesSociales inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatRedesSociales(CatRedesSociales inst) {
           return inst.Update();
       }
       //Tbl_Invest_RedS
       [HttpPost]
       [AuthController]
       public List<Tbl_Invest_RedS> getTbl_Invest_RedS(Tbl_Invest_RedS Inst) {
           return Inst.Get<Tbl_Invest_RedS>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_Invest_RedS(Tbl_Invest_RedS inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_Invest_RedS(Tbl_Invest_RedS inst) {
           return inst.Update();
       }
       //Tbl_IdiomasInv
       [HttpPost]
       [AuthController]
       public List<Tbl_IdiomasInv> getTbl_IdiomasInv(Tbl_IdiomasInv Inst) {
           return Inst.Get<Tbl_IdiomasInv>();
       }
       [HttpPost]
       [AuthController]
       public object saveTbl_IdiomasInv(Tbl_IdiomasInv inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTbl_IdiomasInv(Tbl_IdiomasInv inst) {
           return inst.Update();
       }
       //ProyectoTableActividades
       [HttpPost]
       [AuthController]
       public List<ProyectoTableActividades> getProyectoTableActividades(ProyectoTableActividades Inst) {
           return Inst.Get<ProyectoTableActividades>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoTableActividades(ProyectoTableActividades inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoTableActividades(ProyectoTableActividades inst) {
           return inst.Update();
       }
       //ProyectoTableCalendario
       [HttpPost]
       [AuthController]
       public List<ProyectoTableCalendario> getProyectoTableCalendario(ProyectoTableCalendario Inst) {
           return Inst.Get<ProyectoTableCalendario>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoTableCalendario(ProyectoTableCalendario inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoTableCalendario(ProyectoTableCalendario inst) {
           return inst.Update();
       }
       //ProyectoTableTareas
       [HttpPost]
       [AuthController]
       public List<ProyectoTableTareas> getProyectoTableTareas(ProyectoTableTareas Inst) {
           return Inst.Get<ProyectoTableTareas>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoTableTareas(ProyectoTableTareas inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoTableTareas(ProyectoTableTareas inst) {
           return inst.Update();
       }
       //ProyectoTableParticipantes
       [HttpPost]
       [AuthController]
       public List<ProyectoTableParticipantes> getProyectoTableParticipantes(ProyectoTableParticipantes Inst) {
           return Inst.Get<ProyectoTableParticipantes>();
       }
       [HttpPost]
       [AuthController]
       public object saveProyectoTableParticipantes(ProyectoTableParticipantes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateProyectoTableParticipantes(ProyectoTableParticipantes inst) {
           return inst.Update();
       }
       //Cat_Cargos
       [HttpPost]
       [AuthController]
       public List<Cat_Cargos> getCat_Cargos(Cat_Cargos Inst) {
           return Inst.Get<Cat_Cargos>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Cargos(Cat_Cargos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Cargos(Cat_Cargos inst) {
           return inst.Update();
       }
       //Cat_Tipo_Proceso_Editorial
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Proceso_Editorial> getCat_Tipo_Proceso_Editorial(Cat_Tipo_Proceso_Editorial Inst) {
           return Inst.Get<Cat_Tipo_Proceso_Editorial>();
       }
       [HttpPost]
       [AuthController]
       public object saveCat_Tipo_Proceso_Editorial(Cat_Tipo_Proceso_Editorial inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCat_Tipo_Proceso_Editorial(Cat_Tipo_Proceso_Editorial inst) {
           return inst.Update();
       }
   }
}
