using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Grupos : EntityClass
    {
        public int? Id_Grupo { get; set; }
        public int? Id_Investigador_Crea { get; set; }
        public int? Id_TipoGrupo { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public string Estado { get; set; }
        List<Tbl_InstitucionesAsociadasGrupos> Instituciones_Asociadas { get; set; }
        List<Tbl_InvestigadoresAsociados> Investigadores_Asociados { get; set; }
        public Object SaveGrupo()
        {
            if (this.Id_Grupo == null)
            {
                this.Id_Grupo = (Int32)this.Save();
            }
            else
            {
                this.Update("Id_Grupo");
            }
            if (this.Instituciones_Asociadas != null)
            {
                Tbl_InstitucionesAsociadasGrupos IdI = new Tbl_InstitucionesAsociadasGrupos();
                IdI.Id_Grupo = this.Id_Grupo;
                IdI.Delete();
                foreach (Tbl_InstitucionesAsociadasGrupos obj in this.Instituciones_Asociadas)
                {
                    obj.Id_Grupo = this.Id_Grupo;
                    obj.Save();
                }
            }
            return true;
        }
        public Tbl_Grupos GetGroup()
        {
            this.ChargeGroupData(this);
            return this;
        }

        private void ChargeGroupData(Tbl_Grupos grupo)
        {
            grupo.Instituciones_Asociadas =
                            (new Tbl_InstitucionesAsociadasGrupos()).Get_WhereIN<Tbl_InstitucionesAsociadasGrupos>(
                                    "Id_Grupo", new string[] { grupo.Id_Grupo.ToString() });
            var Ives = new Tbl_InvestigadoresAsociados();
            Ives.Estado = "ACTIVO";
            grupo.Investigadores_Asociados = Ives.Get_WhereIN<Tbl_InvestigadoresAsociados>(
                        "Id_Grupo", new string[] { grupo.Id_Grupo.ToString() });
        }

        public List<Tbl_Grupos> GetGroups()
        {
            List<Tbl_Grupos> grupos = this.Get<Tbl_Grupos>();
            foreach (Tbl_Grupos grupo in grupos)
            {
                this.ChargeGroupData(grupo);
            }           
            return grupos;
        }
        public List<Tbl_Grupos> GetGroupsByInvestigator(Tbl_InvestigatorProfile Inv)
        {
            var Ids = (new Tbl_InvestigadoresAsociados()).Get_WhereIN<Tbl_InvestigadoresAsociados>(
                "Id_Investigador", new string[] { Inv.Id_Investigador.ToString() }
                ).Select(g => g.Id_Grupo.ToString()).ToArray();
            return this.Get_WhereIN<Tbl_Grupos>("Id_Grupo", Ids);
        }
        public Object SolicitarUnirse(Tbl_InvestigatorProfile Inv)
        {
            Tbl_InvestigadoresAsociados tbl_InvestigadoresAsociado = BuildInvAsociado(Inv, "SOLICITANTE");
            tbl_InvestigadoresAsociado.Save();
            return true;
        }
        public Object AprobarSolicitud(Tbl_InvestigadoresAsociados Inv)
        {
            Inv.Estado = "ACTIVO";
            Inv.Update(new string[] { "Id_Grupo", "Id_Investigador" });
            return true;
        }
        public Object RechazarSolicitud(Tbl_InvestigadoresAsociados Inv)
        {
            Inv.Estado = "RECHAZADO";
            Inv.Update(new string[] { "Id_Grupo", "Id_Investigador" });
            return true;
        }
        public Object InvitarInvestigador(Tbl_InvestigatorProfile Inv)
        {
            Tbl_InvestigadoresAsociados tbl_InvestigadoresAsociado = BuildInvAsociado(Inv, "INVITADO");
            tbl_InvestigadoresAsociado.Save();
            //ENVIAR CORREO
            return true;
        }
        private Tbl_InvestigadoresAsociados BuildInvAsociado(Tbl_InvestigatorProfile Inv, string Estado)
        {
            Tbl_InvestigadoresAsociados tbl_InvestigadoresAsociado = new Tbl_InvestigadoresAsociados();
            tbl_InvestigadoresAsociado.Id_Grupo = this.Id_Grupo;
            tbl_InvestigadoresAsociado.Id_Investigador = Inv.Id_Investigador;
            tbl_InvestigadoresAsociado.Estado = Estado;
            return tbl_InvestigadoresAsociado;
        }

    }

    public class Tbl_InstitucionesAsociadasGrupos : EntityClass
    {
        public int? Id_Institucion { get; set; }
        public int? Id_Grupo { get; set; }
        public DateTime? Fecha_Incorporacion { get; set; }
        public string Estado { get; set; }
    }
    public class Tbl_InvestigadoresAsociados : EntityClass
    {
        public int? Id_Grupo { get; set; }
        public int? Id_Investigador { get; set; }
        public DateTime? Fecha_Incorporacion { get; set; }
        public string Estado { get; set; }
        public int? Id_TipoMiembro { get; set; }
    }
}
