
using System.Collections.Generic;
using CAPA_NEGOCIO.MAPEO;
using CAPA_NEGOCIO.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SNI_UI2.Controllers;

namespace API.Controllers {
   [Route("api/[controller]/[action]")]
   [ApiController]
   public class  ApiEntityDBOController : ControllerBase {
       //ProyectoTableAgenda
       [HttpPost]
       [AuthController]
       public List<ProyectoTableAgenda> getProyectoTableAgenda() {
           return new ProyectoTableAgenda().Get<ProyectoTableAgenda>();
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
       public List<ProyectoTableDependencias_Usuarios> getProyectoTableDependencias_Usuarios() {
           return new ProyectoTableDependencias_Usuarios().Get<ProyectoTableDependencias_Usuarios>();
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
       public List<ProyectoTableEvidencias> getProyectoTableEvidencias() {
           return new ProyectoTableEvidencias().Get<ProyectoTableEvidencias>();
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
       //Security_Permissions
       [HttpPost]
       [AuthController]
       public List<Security_Permissions> getSecurity_Permissions() {
           return new Security_Permissions().Get<Security_Permissions>();
       }
       [HttpPost]
       [AuthController]
       public object saveSecurity_Permissions(Security_Permissions inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateSecurity_Permissions(Security_Permissions inst) {
           return inst.Update();
       }
       //Security_Permissions_Roles
       [HttpPost]
       [AuthController]
       public List<Security_Permissions_Roles> getSecurity_Permissions_Roles() {
           return new Security_Permissions_Roles().Get<Security_Permissions_Roles>();
       }
       [HttpPost]
       [AuthController]
       public object saveSecurity_Permissions_Roles(Security_Permissions_Roles inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateSecurity_Permissions_Roles(Security_Permissions_Roles inst) {
           return inst.Update();
       }
       //Security_Roles
       [HttpPost]
       [AuthController]
       public List<Security_Roles> getSecurity_Roles() {
           return new Security_Roles().Get<Security_Roles>();
       }
       [HttpPost]
       [AuthController]
       public object saveSecurity_Roles(Security_Roles inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateSecurity_Roles(Security_Roles inst) {
           return inst.Update();
       }
       //Security_Users
       [HttpPost]
       [AuthController]
       public List<Security_Users> getSecurity_Users() {
           return new Security_Users().Get<Security_Users>();
       }
       [HttpPost]
       [AuthController]
       public object saveSecurity_Users(Security_Users inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateSecurity_Users(Security_Users inst) {
           return inst.Update();
       }
       //Security_Users_Roles
       [HttpPost]
       [AuthController]
       public List<Security_Users_Roles> getSecurity_Users_Roles() {
           return new Security_Users_Roles().Get<Security_Users_Roles>();
       }
       [HttpPost]
       [AuthController]
       public object saveSecurity_Users_Roles(Security_Users_Roles inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateSecurity_Users_Roles(Security_Users_Roles inst) {
           return inst.Update();
       }
       //Tbl_Datos_Laborales
       [HttpPost]
       [AuthController]
       public List<Tbl_Datos_Laborales> getTbl_Datos_Laborales() {
           return new Tbl_Datos_Laborales().Get<Tbl_Datos_Laborales>();
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
       public List<Tbl_Distinciones> getTbl_Distinciones() {
           return new Tbl_Distinciones().Get<Tbl_Distinciones>();
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
       public List<Tbl_Evento> getTbl_Evento() {
           return new Tbl_Evento().Get<Tbl_Evento>();
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
       //Tbl_Formacion_Academica
       [HttpPost]
       [AuthController]
       public List<Tbl_Formacion_Academica> getTbl_Formacion_Academica() {
           return new Tbl_Formacion_Academica().Get<Tbl_Formacion_Academica>();
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
       public List<Tbl_Grupos> getTbl_Grupos() {
           return new Tbl_Grupos().Get<Tbl_Grupos>();
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
       //Tbl_Instituciones_Asociadas
       [HttpPost]
       [AuthController]
       public List<Tbl_Instituciones_Asociadas> getTbl_Instituciones_Asociadas() {
           return new Tbl_Instituciones_Asociadas().Get<Tbl_Instituciones_Asociadas>();
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
       //Tbl_InstitucionesAsociadasGrupos
       [HttpPost]
       [AuthController]
       public List<Tbl_InstitucionesAsociadasGrupos> getTbl_InstitucionesAsociadasGrupos() {
           return new Tbl_InstitucionesAsociadasGrupos().Get<Tbl_InstitucionesAsociadasGrupos>();
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
       public List<Tbl_InvestigadoresAsociados> getTbl_InvestigadoresAsociados() {
           return new Tbl_InvestigadoresAsociados().Get<Tbl_InvestigadoresAsociados>();
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
       public List<Tbl_Invitaciones> getTbl_Invitaciones() {
           return new Tbl_Invitaciones().Get<Tbl_Invitaciones>();
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
       //Tbl_Participantes_Eventos
       [HttpPost]
       [AuthController]
       public List<Tbl_Participantes_Eventos> getTbl_Participantes_Eventos() {
           return new Tbl_Participantes_Eventos().Get<Tbl_Participantes_Eventos>();
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
       //Tbl_Patentes
       [HttpPost]
       [AuthController]
       public List<Tbl_Patentes> getTbl_Patentes() {
           return new Tbl_Patentes().Get<Tbl_Patentes>();
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
       public List<TblProcesosEditoriales> getTblProcesosEditoriales() {
           return new TblProcesosEditoriales().Get<TblProcesosEditoriales>();
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
       //Tbl_Investigaciones_Disciplinas
       [HttpPost]
       [AuthController]
       public List<Tbl_Investigaciones_Disciplinas> getTbl_Investigaciones_Disciplinas() {
           return new Tbl_Investigaciones_Disciplinas().Get<Tbl_Investigaciones_Disciplinas>();
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
       public List<Cat_Disciplinas> getCat_Disciplinas() {
           return new Cat_Disciplinas().Get<Cat_Disciplinas>();
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
       public List<Tbl_Investigaciones> getTbl_Investigaciones() {
           return new Tbl_Investigaciones().Get<Tbl_Investigaciones>();
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
       public List<Cat_Paises> getCat_Paises() {
           return new Cat_Paises().Get<Cat_Paises>();
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
       public List<Cat_TipoLocalidad> getCat_TipoLocalidad() {
           return new Cat_TipoLocalidad().Get<Cat_TipoLocalidad>();
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
       public List<Cat_Localidad> getCat_Localidad() {
           return new Cat_Localidad().Get<Cat_Localidad>();
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
       public List<Cat_instituciones> getCat_instituciones() {
           return new Cat_instituciones().Get<Cat_instituciones>();
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
       public List<Cat_Tipo_Investigacion> getCat_Tipo_Investigacion() {
           return new Cat_Tipo_Investigacion().Get<Cat_Tipo_Investigacion>();
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
       public List<Tbl_InvestigatorProfile> getTbl_InvestigatorProfile() {
           return new Tbl_InvestigatorProfile().Get<Tbl_InvestigatorProfile>();
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
       //Cat_Tipo_Colaborador
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Colaborador> getCat_Tipo_Colaborador() {
           return new Cat_Tipo_Colaborador().Get<Cat_Tipo_Colaborador>();
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
       public List<Tbl_Colaboradores> getTbl_Colaboradores() {
           return new Tbl_Colaboradores().Get<Tbl_Colaboradores>();
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
       public List<Cat_Tipo_Proyecto> getCat_Tipo_Proyecto() {
           return new Cat_Tipo_Proyecto().Get<Cat_Tipo_Proyecto>();
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
       public List<Tbl_Proyectos> getTbl_Proyectos() {
           return new Tbl_Proyectos().Get<Tbl_Proyectos>();
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
       public List<Cat_Cargo_Proyecto> getCat_Cargo_Proyecto() {
           return new Cat_Cargo_Proyecto().Get<Cat_Cargo_Proyecto>();
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
       public List<Tbl_Participantes_Proyectos> getTbl_Participantes_Proyectos() {
           return new Tbl_Participantes_Proyectos().Get<Tbl_Participantes_Proyectos>();
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
       public List<CatRedesSociales> getCatRedesSociales() {
           return new CatRedesSociales().Get<CatRedesSociales>();
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
       public List<Tbl_Invest_RedS> getTbl_Invest_RedS() {
           return new Tbl_Invest_RedS().Get<Tbl_Invest_RedS>();
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
       //Cat_Idiomas
       [HttpPost]
       [AuthController]
       public List<Cat_Idiomas> getCat_Idiomas() {
           return new Cat_Idiomas().Get<Cat_Idiomas>();
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
       //Tbl_IdiomasInv
       [HttpPost]
       [AuthController]
       public List<Tbl_IdiomasInv> getTbl_IdiomasInv() {
           return new Tbl_IdiomasInv().Get<Tbl_IdiomasInv>();
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
       public List<ProyectoTableActividades> getProyectoTableActividades() {
           return new ProyectoTableActividades().Get<ProyectoTableActividades>();
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
       public List<ProyectoTableCalendario> getProyectoTableCalendario() {
           return new ProyectoTableCalendario().Get<ProyectoTableCalendario>();
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
       public List<ProyectoTableTareas> getProyectoTableTareas() {
           return new ProyectoTableTareas().Get<ProyectoTableTareas>();
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
       public List<ProyectoTableParticipantes> getProyectoTableParticipantes() {
           return new ProyectoTableParticipantes().Get<ProyectoTableParticipantes>();
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
       public List<Cat_Cargos> getCat_Cargos() {
           return new Cat_Cargos().Get<Cat_Cargos>();
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
       //Cat_Tipo_Asociacion
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Asociacion> getCat_Tipo_Asociacion() {
           return new Cat_Tipo_Asociacion().Get<Cat_Tipo_Asociacion>();
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
       //Cat_Tipo_Evento
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Evento> getCat_Tipo_Evento() {
           return new Cat_Tipo_Evento().Get<Cat_Tipo_Evento>();
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
       //Cat_Tipo_Participacion_Eventos
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Participacion_Eventos> getCat_Tipo_Participacion_Eventos() {
           return new Cat_Tipo_Participacion_Eventos().Get<Cat_Tipo_Participacion_Eventos>();
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
       //Cat_Tipo_Proceso_Editorial
       [HttpPost]
       [AuthController]
       public List<Cat_Tipo_Proceso_Editorial> getCat_Tipo_Proceso_Editorial() {
           return new Cat_Tipo_Proceso_Editorial().Get<Cat_Tipo_Proceso_Editorial>();
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
       //Cat_TipoEstudio
       [HttpPost]
       [AuthController]
       public List<Cat_TipoEstudio> getCat_TipoEstudio() {
           return new Cat_TipoEstudio().Get<Cat_TipoEstudio>();
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
       public List<Cat_TipoGrupo> getCat_TipoGrupo() {
           return new Cat_TipoGrupo().Get<Cat_TipoGrupo>();
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
       public List<Cat_TipoMiembro> getCat_TipoMiembro() {
           return new Cat_TipoMiembro().Get<Cat_TipoMiembro>();
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
       public List<CatTipoDistincion> getCatTipoDistincion() {
           return new CatTipoDistincion().Get<CatTipoDistincion>();
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
       public List<ProyectoCatCargosDependencias> getProyectoCatCargosDependencias() {
           return new ProyectoCatCargosDependencias().Get<ProyectoCatCargosDependencias>();
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
       public List<ProyectoCatDependencias> getProyectoCatDependencias() {
           return new ProyectoCatDependencias().Get<ProyectoCatDependencias>();
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
       public List<ProyectoCatTipoParticipaciones> getProyectoCatTipoParticipaciones() {
           return new ProyectoCatTipoParticipaciones().Get<ProyectoCatTipoParticipaciones>();
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
   }
}
