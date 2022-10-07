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
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int? Id_Investigador_Crea { get; set; }
        public int? Id_TipoGrupo { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public string Estado { get; set; }
        public Cat_TipoGrupo Tipo { get; set; }
        public List<Tbl_InstitucionesAsociadasGrupos> Instituciones_Asociadas { get; set; }
        public List<Tbl_InvestigadoresAsociados> Investigadores_Asociados { get; set; }
        public Object SaveGrupo()
        {
            if (this.Id_Grupo == null)
            {
                this.Id_Grupo = (Int32)this.Save();
                //INVESTIGADOR CREA ES ASOCIADO POR DEFECTO
                Tbl_InvestigadoresAsociados invCreador = new Tbl_InvestigadoresAsociados()
                {
                    Id_Investigador = this.Id_Investigador_Crea,
                    Id_TipoMiembro = 1,//coordinador
                    Id_Grupo = this.Id_Grupo,
                    Fecha_Incorporacion = DateTime.Now,
                    Estado = "Activo"
                };
                invCreador.Save();
                if (this.Instituciones_Asociadas != null)
                {
                    foreach (Tbl_InstitucionesAsociadasGrupos obj in this.Instituciones_Asociadas)
                    {
                        obj.Id_Grupo = this.Id_Grupo;
                        obj.Estado = "Activo";
                        obj.Fecha_Incorporacion = DateTime.Now;
                        obj.Save();
                    }
                }
                return true;
            }
            return false;
        }
        public Tbl_Grupos GetGroup()
        {
            this.ChargeGroupData(this);
            return this;
        }        
        public List<Tbl_Grupos> GetRecomendedGroups()
        {
            List<Tbl_Grupos> grupos = this.Get<Tbl_Grupos>();
            foreach (Tbl_Grupos grupo in grupos)
            {
                ChargeGroupData(grupo);
            }
            return grupos;
        }
        private void ChargeGroupData(Tbl_Grupos grupo)
        {
            grupo.Instituciones_Asociadas =
                            (new Tbl_InstitucionesAsociadasGrupos()).Get_WhereIN<Tbl_InstitucionesAsociadasGrupos>(
                                    "Id_Grupo", new string[] { grupo.Id_Grupo.ToString() });
            var Ives = new Tbl_InvestigadoresAsociados();
            Ives.Estado = "Activo";
            grupo.Investigadores_Asociados = Ives.Get_WhereIN<Tbl_InvestigadoresAsociados>(
                        "Id_Grupo", new string[] { grupo.Id_Grupo.ToString() });
        }

        public List<Tbl_Grupos> GetGroups()
        {
            List<Tbl_Grupos> grupos = this.Get<Tbl_Grupos>();
            foreach (Tbl_Grupos grupo in grupos)
            {
                ChargeGroupData(grupo);
            }
            return grupos;
        }
        public List<Tbl_Grupos> GetGroupsByInvestigator(Tbl_InvestigatorProfile Inv)
        {
            var Ids = (new Tbl_InvestigadoresAsociados()).Get_WhereIN<Tbl_InvestigadoresAsociados>(
                "Id_Investigador", new string[] { Inv.Id_Investigador.ToString() }
                ).Select(g => g.Id_Grupo.ToString()).ToArray();
            List<Tbl_Grupos> groups =  this.Get_WhereIN<Tbl_Grupos>("Id_Grupo", Ids);
            foreach (var group in groups)
            {
                ChargeGroupData(group);
            }
            return groups;
        }
        public Object SolicitarUnirse(Tbl_InvestigatorProfile Inv)
        {
            Tbl_InvestigadoresAsociados tbl_InvestigadoresAsociado = BuildInvAsociado(Inv, "Solicitante");
            tbl_InvestigadoresAsociado.Save();
            return true;
        }
        public Object AprobarSolicitud(Tbl_InvestigadoresAsociados Inv)
        {
            Inv.Estado = "Activo";
            Inv.Fecha_Incorporacion = DateTime.Now;
            Inv.Update(new string[] { "Id_Grupo", "Id_Investigador" });
            return true;
        }
        public Object RechazarSolicitud(Tbl_InvestigadoresAsociados Inv)
        {
            Inv.Estado = "Rechazado";
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
        public Cat_instituciones Institucion { get; set; }
    }
    public class Tbl_InvestigadoresAsociados : EntityClass
    {
        public int? Id_Grupo { get; set; }
        public int? Id_Investigador { get; set; }
        public DateTime? Fecha_Incorporacion { get; set; }
        public string Estado { get; set; }
        public int? Id_TipoMiembro { get; set; }
        public Tbl_InvestigatorProfile Investigador { get; set; }
    }
}
