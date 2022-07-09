using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using CAPA_NEGOCIO;
using CAPA_NEGOCIO.Security;
using CAPA_NEGOCIO.Entity;
using CAPA_NEGOCIO.Views;
using CAPA_NEGOCIO.MAPEO;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpPost]
        #region INVESTIGADOR
        public Object TakePostulantes(Tbl_InvestigatorProfile inv)
        {
            inv.Estado = "POSTULANTE";
            return inv.Get();
        }
        public Object AdmitirPostulante(Tbl_InvestigatorProfile inv)
        {
            inv.Estado = "ACTIVO";
            //TODO enviar correo
            //CrearUser
            return inv.Update("Id_Investigador");
        }
        public Object RechazarPostulante(Tbl_InvestigatorProfile inv)
        {
            inv.Estado = "RECHAZADO";
            //TODO enviar correo
            return inv.Update("Id_Investigador");
        }
        public Object TakeInvestigadores(Tbl_InvestigatorProfile inv)
        {
            inv.Estado = "ACTIVO";
            return inv.Get();
        }
        public Object TakeRechazados(Tbl_InvestigatorProfile inv)
        {
            inv.Estado = "RECHAZADO";
            return inv.Get();
        }
        #endregion
        #region INVESTIGACIONES
        public Object TakeInvestigaciones(Tbl_Investigaciones Inst)
        {           
            return Inst.Get();
        }
        #endregion
        #region CATALOGOS
        public Object TakeCat_instituciones(Cat_instituciones inv) { return inv.Get(); }
        public Object TakeCat_Paises(Cat_Paises inv) { return inv.Get(); }
        public Object TakeCat_Localidad(Cat_Localidad inv) { return inv.Get(); }
        public Object TakeCat_TipoLocalidad(Cat_TipoLocalidad inv) { return inv.Get(); }
        public Object TakeCatRedesSociales(CatRedesSociales inv) { return inv.Get(); }
        public Object TakeCat_Idiomas(Cat_Idiomas inv) { return inv.Get(); }
        public Object TakeCat_Cargos(Cat_Cargos inv) { return inv.Get(); }
        public Object TakeCatTipoDistincion(CatTipoDistincion inv) { return inv.Get(); }
        public Object TakeCat_Tipo_Investigacion(Cat_Tipo_Investigacion inv) { return inv.Get(); }
        public Object TakeCat_TipoEstudio(Cat_TipoEstudio inv) { return inv.Get(); }
        public Object TakeCatDisciplinas(CatDisciplinas inv) { return inv.Get(); }
        public Object TakeCat_Tipo_Colaborador(Cat_Tipo_Colaborador inv) { return inv.Get(); }
        public Object TakeCat_Cargo_Proyecto(Cat_Cargo_Proyecto inv) { return inv.Get(); }
        public Object TakeCat_Tipo_Asociacion(Cat_Tipo_Asociacion inv) { return inv.Get(); }
        public Object TakeCat_Tipo_Proyecto(Cat_Tipo_Proyecto inv) { return inv.Get(); }
        public Object TakeCat_Tipo_Evento(Cat_Tipo_Evento inv) { return inv.Get(); }
        public Object TakeCat_TipoGrupo(Cat_TipoGrupo inv) { return inv.Get(); }
        public Object TakeCat_TipoMiembro(Cat_TipoMiembro inv) { return inv.Get(); }
        //SAVESSS
        public Object SaveCat_instituciones(Cat_instituciones inv) { return inv.Save(); }
        public Object SaveCat_Paises(Cat_Paises inv) { return inv.Save(); }
        public Object SaveCat_Localidad(Cat_Localidad inv) { return inv.Save(); }
        public Object SaveCat_TipoLocalidad(Cat_TipoLocalidad inv) { return inv.Save(); }
        public Object SaveCatRedesSociales(CatRedesSociales inv) { return inv.Save(); }
        public Object SaveCat_Idiomas(Cat_Idiomas inv) { return inv.Save(); }
        public Object SaveCat_Cargos(Cat_Cargos inv) { return inv.Save(); }
        public Object SaveCatTipoDistincion(CatTipoDistincion inv) { return inv.Save(); }
        public Object SaveCat_Tipo_Investigacion(Cat_Tipo_Investigacion inv) { return inv.Save(); }
        public Object SaveCat_TipoEstudio(Cat_TipoEstudio inv) { return inv.Save(); }
        public Object SaveCatDisciplinas(CatDisciplinas inv) { return inv.Save(); }
        public Object SaveCat_Tipo_Colaborador(Cat_Tipo_Colaborador inv) { return inv.Save(); }
        public Object SaveCat_Cargo_Proyecto(Cat_Cargo_Proyecto inv) { return inv.Save(); }
        public Object SaveCat_Tipo_Asociacion(Cat_Tipo_Asociacion inv) { return inv.Save(); }
        public Object SaveCat_Tipo_Proyecto(Cat_Tipo_Proyecto inv) { return inv.Save(); }
        public Object SaveCat_Tipo_Evento(Cat_Tipo_Evento inv) { return inv.Save(); }
        public Object SaveCat_TipoGrupo(Cat_TipoGrupo inv) { return inv.Save(); }
        public Object SaveCat_TipoMiembro(Cat_TipoMiembro inv) { return inv.Save(); }
        //UPDATES
        public Object UpdateCat_instituciones(Cat_instituciones inv) { return inv.Update("Id_Institucion"); }
        public Object UpdateCat_Paises(Cat_Paises inv) { return inv.Update("Id_Pais"); }
        public Object UpdateCat_Localidad(Cat_Localidad inv) { return inv.Update("Id_Localidad"); }
        public Object UpdateCat_TipoLocalidad(Cat_TipoLocalidad inv) { return inv.Update("Id_Tipo_Localidad"); }
        public Object UpdateCatRedesSociales(CatRedesSociales inv) { return inv.Update("Id_RedSocial"); }
        public Object UpdateCat_Idiomas(Cat_Idiomas inv) { return inv.Update("Id_Idioma"); }
        public Object UpdateCat_Cargos(Cat_Cargos inv) { return inv.Update("Id_Cargo"); }
        public Object UpdateCatTipoDistincion(CatTipoDistincion inv) { return inv.Update("Id_Tipo_Distincion"); }
        public Object UpdateCat_Tipo_Investigacion(Cat_Tipo_Investigacion inv) { return inv.Update("Id_Tipo_Investigacion"); }
        public Object UpdateCat_TipoEstudio(Cat_TipoEstudio inv) { return inv.Update("Id_TipoEstudio"); }
        public Object UpdateCatDisciplinas(CatDisciplinas inv) { return inv.Update("Id_Disciplina"); }
        public Object UpdateCat_Tipo_Colaborador(Cat_Tipo_Colaborador inv) { return inv.Update("Id_Tipo_Colaboracion"); }
        public Object UpdateCat_Cargo_Proyecto(Cat_Cargo_Proyecto inv) { return inv.Update("Id_Cargo_Proyecto"); }
        public Object UpdateCat_Tipo_Asociacion(Cat_Tipo_Asociacion inv) { return inv.Update("Id_Tipo_Asociacion"); }
        public Object UpdateCat_Tipo_Proyecto(Cat_Tipo_Proyecto inv) { return inv.Update("Id_Tipo_Proyecto"); }
        public Object UpdateCat_Tipo_Evento(Cat_Tipo_Evento inv) { return inv.Update("Id_Tipo_Evento"); }
        public Object UpdateCat_TipoGrupo(Cat_TipoGrupo inv) { return inv.Update("Id_TipoGrupo"); }
        public Object UpdateCat_TipoMiembro(Cat_TipoMiembro inv) { return inv.Update("Id_TipoMiembro"); }
        #endregion

        #region SECURITY
        public Object TakeSecurity_Permissions(Security_Permissions inv) { return inv.Get();  }
        public Object TakeSecurity_Roles(Security_Roles inv) { return inv.GetRoles(); }
        public Object TakeSecurity_Users(Security_Users inv) { return inv.GetUsers(); }

        public Object SaveSecurity_Permissions(Security_Permissions inv) { return inv.Save(); }
        public Object SaveSecurity_Roles(Security_Roles inv) { return inv.SaveRole(); }
        public Object SaveSecurity_Users(Security_Users inv) { return inv.SaveUser(); }

        public Object UpdateSecurity_Permissions(Security_Permissions inv) { return inv.Update("Id_Permission"); }


        #endregion
    }
}
