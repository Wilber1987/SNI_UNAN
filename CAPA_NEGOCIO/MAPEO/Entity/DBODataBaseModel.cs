using CAPA_DATOS;
using CAPA_NEGOCIO.Security;
using CAPA_NEGOCIO.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CAPA_NEGOCIO.MAPEO
{
    public class Cat_Tipo_Evento : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Tipo_Evento { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Evento", KeyColumn = "Id_Tipo_Evento", ForeignKeyColumn = "Id_Tipo_Evento")]
        public List<Tbl_Evento>? Tbl_Evento { get; set; }
    }
    public class Cat_Idiomas : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Idioma { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_IdiomasInv", KeyColumn = "Id_Idioma", ForeignKeyColumn = "Id_Idioma")]
        public List<Tbl_IdiomasInv>? Tbl_IdiomasInv { get; set; }
    }
    public class Cat_TipoEstudio : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_TipoEstudio { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Formacion_Academica", KeyColumn = "Id_TipoEstudio", ForeignKeyColumn = "Id_TipoEstudio")]
        public List<Tbl_Formacion_Academica>? Tbl_Formacion_Academica { get; set; }
    }
    public class Cat_TipoGrupo : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_TipoGrupo { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Grupos", KeyColumn = "Id_TipoGrupo", ForeignKeyColumn = "Id_TipoGrupo")]
        public List<Tbl_Grupos>? Tbl_Grupos { get; set; }
    }
    public class Cat_TipoMiembro : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_TipoMiembro { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_InvestigadoresAsociados", KeyColumn = "Id_TipoMiembro", ForeignKeyColumn = "Id_TipoMiembro")]
        public List<Tbl_InvestigadoresAsociados>? Tbl_InvestigadoresAsociados { get; set; }
    }
    public class CatTipoDistincion : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Tipo_Distincion { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Distinciones", KeyColumn = "Id_Tipo_Distincion", ForeignKeyColumn = "Id_Tipo_Distincion")]
        public List<Tbl_Distinciones>? Tbl_Distinciones { get; set; }
    }
    public class ProyectoCatCargosDependencias : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? IdCargo { get; set; }
        public string? Descripcion { get; set; }
        [OneToMany(TableName = "ProyectoTableDependencias_Usuarios", KeyColumn = "IdCargo", ForeignKeyColumn = "Id_Cargo")]
        public List<ProyectoTableDependencias_Usuarios>? ProyectoTableDependencias_Usuarios { get; set; }
    }
    public class ProyectoCatDependencias : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Dependencia { get; set; }
        public string? Descripcion { get; set; }
        public int? Id_Dependencia_Padre { get; set; }
        public int? Id_Institucion { get; set; }
        [ManyToOne(TableName = "ProyectoCatDependencias", KeyColumn = "Id_Dependencia_Padre", ForeignKeyColumn = "Id_Dependencia")]
        public ProyectoCatDependencias? ProyectoCatDependencia { get; set; }
        [ManyToOne(TableName = "Cat_instituciones", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public Cat_instituciones? Cat_instituciones { get; set; }
        [OneToMany(TableName = "ProyectoCatDependencias", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia_Padre")]
        public List<ProyectoCatDependencias>? ProyectoCatDependencias_Padre { get; set; }
        [OneToMany(TableName = "ProyectoTableActividades", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia")]
        public List<ProyectoTableActividades>? ProyectoTableActividades { get; set; }
        [OneToMany(TableName = "ProyectoTableAgenda", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia")]
        public List<ProyectoTableAgenda>? ProyectoTableAgenda { get; set; }
        [OneToMany(TableName = "ProyectoTableDependencias_Usuarios", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia")]
        public List<ProyectoTableDependencias_Usuarios>? ProyectoTableDependencias_Usuarios { get; set; }
    }
    public class ProyectoCatTipoParticipaciones : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? IdTipoParticipacion { get; set; }
        public string? Descripcion { get; set; }
        [OneToMany(TableName = "ProyectoTableParticipantes", KeyColumn = "IdTipoParticipacion", ForeignKeyColumn = "IdTipoParticipacion")]
        public List<ProyectoTableParticipantes>? ProyectoTableParticipantes { get; set; }
    }
    public class ProyectoTableAgenda : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? IdAgenda { get; set; }
        public int? Id_Investigador { get; set; }
        public int? Id_Dependencia { get; set; }
        public string? Dia { get; set; }
        public string? Hora_Inicial { get; set; }
        public string? Hora_Final { get; set; }
        public DateTime? Fecha_Caducidad { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "ProyectoCatDependencias", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia")]
        public ProyectoCatDependencias? ProyectoCatDependencias { get; set; }
    }
    public class ProyectoTableDependencias_Usuarios : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Investigador { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_Dependencia { get; set; }
        public int? Id_Cargo { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "ProyectoCatDependencias", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia")]
        public ProyectoCatDependencias? ProyectoCatDependencias { get; set; }
        [ManyToOne(TableName = "ProyectoCatCargosDependencias", KeyColumn = "Id_Cargo", ForeignKeyColumn = "IdCargo")]
        public ProyectoCatCargosDependencias? ProyectoCatCargosDependencias { get; set; }
    }
    public class ProyectoTableEvidencias : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? IdEvidencia { get; set; }
        public int? IdTipo { get; set; }
        public string? Data { get; set; }
        public int? IdTarea { get; set; }
        [ManyToOne(TableName = "ProyectoTableTareas", KeyColumn = "IdTarea", ForeignKeyColumn = "IdTarea")]
        public ProyectoTableTareas? ProyectoTableTareas { get; set; }
    }
    public class Tbl_Datos_Laborales : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_DatoL { get; set; }
        public int? Id_Investigador { get; set; }
        public int? Id_Cargo { get; set; }
        public DateTime? Fecha_Inicio { get; set; }
        public DateTime? Fecha_Finalizacion { get; set; }
        public string? Unidad { get; set; }
        public string? Institucion { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Cat_Cargos", KeyColumn = "Id_Cargo", ForeignKeyColumn = "Id_Cargo")]
        public Cat_Cargos? Cat_Cargos { get; set; }
    }
    public class Tbl_Distinciones : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Distincion { get; set; }
        public int? Id_Investigador { get; set; }
        public int? Id_Tipo_Distincion { get; set; }
        public string? Descripcion { get; set; }
        public DateTime? fecha { get; set; }
        public int? Id_Institucion { get; set; }
        public Double? Montos { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "CatTipoDistincion", KeyColumn = "Id_Tipo_Distincion", ForeignKeyColumn = "Id_Tipo_Distincion")]
        public CatTipoDistincion? CatTipoDistincion { get; set; }
        [ManyToOne(TableName = "Cat_instituciones", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public Cat_instituciones? Cat_instituciones { get; set; }
    }
    public class Tbl_Evento : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Evento { get; set; }
        public int? Id_Tipo_Evento { get; set; }
        public string? Nombre { get; set; }
        public int? Id_Pais { get; set; }
        public DateTime? Fecha_Inicio { get; set; }
        public DateTime? Fecha_Finalizacion { get; set; }
        public string? Modalidad { get; set; }
        public string? Modalidad_Ponencia { get; set; }
        public string? Link { get; set; }
        public string? Datos_Adicionales { get; set; }
        public int? Id_Investigador { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [ManyToOne(TableName = "Cat_Tipo_Evento", KeyColumn = "Id_Tipo_Evento", ForeignKeyColumn = "Id_Tipo_Evento")]
        public Cat_Tipo_Evento? Cat_Tipo_Evento { get; set; }
        [ManyToOne(TableName = "Cat_Paises", KeyColumn = "Id_Pais", ForeignKeyColumn = "Id_Pais")]
        public Cat_Paises? Cat_Paises { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [OneToMany(TableName = "Tbl_Invitaciones", KeyColumn = "Id_Evento", ForeignKeyColumn = "Id_Evento")]
        public List<Tbl_Invitaciones>? Tbl_Invitaciones { get; set; }
        [OneToMany(TableName = "Tbl_Participantes_Eventos", KeyColumn = "Id_Evento", ForeignKeyColumn = "Id_Evento")]
        public List<Tbl_Participantes_Eventos>? Tbl_Participantes_Eventos { get; set; }

        public Object SaveEvento()
        {
            try
            {
                if (this.Id_Evento == null)
                {
                    this.Id_Evento = (Int32)this.Save();
                }
                else
                {
                    this.Update("Id_Evento");
                }
                if (this.Tbl_Participantes_Eventos != null)
                {
                    Tbl_Participantes_Eventos IdI = new Tbl_Participantes_Eventos();
                    IdI.Id_Evento = this.Id_Evento;
                    IdI.Delete();
                    foreach (Tbl_Participantes_Eventos obj in this.Tbl_Participantes_Eventos)
                    {
                        if (obj.Id_Investigador != AuthNetCore.User().UserId)
                        {
                            obj.Estado = "PENDIENTE";
                        }
                        else
                        {
                            obj.Estado = "APROBADO";
                        }
                        obj.Id_Evento = this.Id_Evento;
                        obj.Save();
                    }
                }
                return this;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Tbl_Evento GetEvento()
        {
            ChargeEventData(this);
            return this;
        }
        public List<Tbl_Evento> GetEventos()
        {
            List<Tbl_Evento> Eventos = this.Get<Tbl_Evento>("Fecha_Inicio > '" +
                DateTime.Now.ToString("yyyy-MM-dd") + "'").
                Where(E => E.Id_Investigador != AuthNetCore.User().UserId).ToList();
            foreach (Tbl_Evento evento in Eventos)
            {
                ChargeEventData(evento);
            }
            return Eventos;
        }
        public List<Tbl_Evento> GetEventosPropiosGestion()
        {
            this.Id_Investigador = AuthNetCore.User().UserId;
            List<Tbl_Evento> Eventos = this.Get<Tbl_Evento>();
            foreach (Tbl_Evento evento in Eventos)
            {
                ChargeEventData(evento);
            }
            return Eventos;
        }
        public List<Tbl_Evento> GetEventosPropios()
        {
            this.Id_Investigador = AuthNetCore.User().UserId;
            List<Tbl_Evento> Eventos = this.Get<Tbl_Evento>("Fecha_Inicio > '" +
                DateTime.Now.ToString("yyyy-MM-dd") + "'");
            foreach (Tbl_Evento evento in Eventos)
            {
                ChargeEventData(evento);
            }
            return Eventos;
        }
        public List<Tbl_Evento> GetEventosInvitados()
        {
            List<Tbl_Evento> Eventos = this.Get_WhereIN<Tbl_Evento>("Id_Evento",
                    new Tbl_Invitaciones()
                    {
                        Id_Investigador = AuthNetCore.User().UserId,
                        Id_Evento = this.Id_Evento,
                        Estado = "ACTIVO"
                    }.Get<Tbl_Invitaciones>().Select(I => I.Id_Evento.ToString()).ToArray()
            ).Where(E => E.Fecha_Inicio > DateTime.Now).ToList();
            foreach (Tbl_Evento evento in Eventos)
            {
                ChargeEventData(evento);
            }
            return Eventos;
        }
        private void ChargeEventData(Tbl_Evento evento)
        {
            evento.Tbl_Participantes_Eventos =
                            new Tbl_Participantes_Eventos() { Estado = "APROBADO" }.Get_WhereIN<Tbl_Participantes_Eventos>(
                                    "Id_Evento", new string[] { evento.Id_Evento.ToString() });
        }
        public Object InvitarInvestigadores()
        {
            try
            {
                if (this.Id_Evento != null && this.Tbl_Invitaciones != null)
                {
                    foreach (var Invitacion in this.Tbl_Invitaciones)
                    {
                        Invitacion.Id_Evento = this.Id_Evento;
                        Invitacion.Fecha_Invitacion = DateTime.Now;
                        Invitacion.Estado = "PENDIENTE";
                        Invitacion.Save();
                    }
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
    public class Tbl_Participantes_Eventos : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Investigador { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_Evento { get; set; }
        public string? Descripcion { get; set; }
        public int? Id_Tipo_Participacion { get; set; }
        public DateTime? Fecha_Participacion { get; set; }
        public string? Titulo { get; set; }
        public string? Estado { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Tbl_Evento", KeyColumn = "Id_Evento", ForeignKeyColumn = "Id_Evento")]
        public Tbl_Evento? Tbl_Evento { get; set; }
        [ManyToOne(TableName = "Cat_Tipo_Participacion_Eventos", KeyColumn = "Id_Tipo_Participacion", ForeignKeyColumn = "Id_Tipo_Participacion")]
        public Cat_Tipo_Participacion_Eventos? Cat_Tipo_Participacion_Eventos { get; set; }

        public Tbl_Participantes_Eventos AprobarParticipacion()
        {
            return this.ChangeEstadoParticipacion("APROBADO");
        }
        public Tbl_Participantes_Eventos RechazarParticipacion()
        {
            return this.ChangeEstadoParticipacion("RECHAZADO");
        }
        public Tbl_Participantes_Eventos CancelarParticipacion()
        {
            return this.ChangeEstadoParticipacion("CANCELADO");
        }
        public Tbl_Participantes_Eventos ChangeEstadoParticipacion(String Estado)
        {
            if (this.Id_Evento != null && this.Id_Investigador != null)
            {
                this.Estado = Estado;
                this.Update(new string[] { "Id_Evento", "Id_Investigador" });
                return this;

            }
            else
            {
                throw new Exception("Evento no existe");
            }
        }
    }
    public class Tbl_Formacion_Academica : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? IdFormacion { get; set; }
        public int? Id_TipoEstudio { get; set; }
        public int? Id_Institucion { get; set; }
        public string? Titulo { get; set; }
        public string? Disciplina { get; set; }
        public DateTime? Fecha_Inicio { get; set; }
        public DateTime? Fecha_Finalizacion { get; set; }
        public int? Id_Investigador { get; set; }
        [ManyToOne(TableName = "Cat_TipoEstudio", KeyColumn = "Id_TipoEstudio", ForeignKeyColumn = "Id_TipoEstudio")]
        public Cat_TipoEstudio? Cat_TipoEstudio { get; set; }
        [ManyToOne(TableName = "Cat_instituciones", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public Cat_instituciones? Cat_instituciones { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
    }
    public class Tbl_Grupos : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Grupo { get; set; }
        public int? Id_Investigador_Crea { get; set; }
        public int? Id_TipoGrupo { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public string? Estado { get; set; }
        public string? Descripcion { get; set; }
        public string? Nombre { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador_Crea", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Cat_TipoGrupo", KeyColumn = "Id_TipoGrupo", ForeignKeyColumn = "Id_TipoGrupo")]
        public Cat_TipoGrupo? Cat_TipoGrupo { get; set; }
        [OneToMany(TableName = "Tbl_InstitucionesAsociadasGrupos", KeyColumn = "Id_Grupo", ForeignKeyColumn = "Id_Grupo")]
        public List<Tbl_InstitucionesAsociadasGrupos>? Tbl_InstitucionesAsociadasGrupos { get; set; }
        [OneToMany(TableName = "Tbl_InvestigadoresAsociados", KeyColumn = "Id_Grupo", ForeignKeyColumn = "Id_Grupo")]
        public List<Tbl_InvestigadoresAsociados>? Tbl_InvestigadoresAsociados { get; set; }
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
                if (this.Tbl_InstitucionesAsociadasGrupos != null)
                {
                    foreach (Tbl_InstitucionesAsociadasGrupos obj in this.Tbl_InstitucionesAsociadasGrupos)
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
            grupo.Tbl_InstitucionesAsociadasGrupos =
                            (new Tbl_InstitucionesAsociadasGrupos()).Get_WhereIN<Tbl_InstitucionesAsociadasGrupos>(
                                    "Id_Grupo", new string[] { grupo.Id_Grupo.ToString() });
            var Ives = new Tbl_InvestigadoresAsociados();
            Ives.Estado = "Activo";
            grupo.Tbl_InvestigadoresAsociados = Ives.Get_WhereIN<Tbl_InvestigadoresAsociados>(
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
            List<Tbl_Grupos> groups = this.Get_WhereIN<Tbl_Grupos>("Id_Grupo", Ids);
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
        [PrimaryKey(Identity = false)]
        public int? Id_Institucion { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_Grupo { get; set; }
        public DateTime? Fecha_Incorporacion { get; set; }
        public string? Estado { get; set; }
        [ManyToOne(TableName = "Cat_instituciones", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public Cat_instituciones? Cat_instituciones { get; set; }
        [ManyToOne(TableName = "Tbl_Grupos", KeyColumn = "Id_Grupo", ForeignKeyColumn = "Id_Grupo")]
        public Tbl_Grupos? Tbl_Grupos { get; set; }
    }
    public class Tbl_InvestigadoresAsociados : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Grupo { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_Investigador { get; set; }
        public DateTime? Fecha_Incorporacion { get; set; }
        public string? Estado { get; set; }
        public int? Id_TipoMiembro { get; set; }
        [ManyToOne(TableName = "Tbl_Grupos", KeyColumn = "Id_Grupo", ForeignKeyColumn = "Id_Grupo")]
        public Tbl_Grupos? Tbl_Grupos { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Cat_TipoMiembro", KeyColumn = "Id_TipoMiembro", ForeignKeyColumn = "Id_TipoMiembro")]
        public Cat_TipoMiembro? Cat_TipoMiembro { get; set; }
    }
    public class Tbl_Invitaciones : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Invitacion { get; set; }
        public int? Id_Investigador { get; set; }
        public int? Id_Evento { get; set; }
        public string? Estado { get; set; }
        public DateTime? Fecha_Invitacion { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Tbl_Evento", KeyColumn = "Id_Evento", ForeignKeyColumn = "Id_Evento")]
        public Tbl_Evento? Tbl_Evento { get; set; }

        public Tbl_Invitaciones ChangeEstadoInvitacion(String Estado)
        {
            if (this.Id_Evento != null && this.Id_Investigador != null)
            {
                this.Estado = Estado;
                this.Update(new string[] { "Id_Invitacion" });
                return this;

            }
            else
            {
                throw new Exception("Invitaci�n no existe");
            }
        }
    }
    public class Tbl_Patentes : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Patente { get; set; }
        public DateTime? fecha { get; set; }
        public int? Id_Institucion { get; set; }
        public int? Id_Investigador { get; set; }
        public string? Estado { get; set; }
        public string? Descripcion { get; set; }
        [ManyToOne(TableName = "Cat_instituciones", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public Cat_instituciones? Cat_instituciones { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
    }
    public class TblProcesosEditoriales : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Proceso_Editorial { get; set; }
        public int? Id_Investigador { get; set; }
        public string? Descripcion { get; set; }
        public DateTime? Fecha { get; set; }
        public int? Id_Tipo_Proceso_Editorial { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Cat_Tipo_Proceso_Editorial", KeyColumn = "Id_Tipo_Proceso_Editorial", ForeignKeyColumn = "Id_Tipo_Proceso_Editorial")]
        public Cat_Tipo_Proceso_Editorial? Cat_Tipo_Proceso_Editorial { get; set; }
    }
    public class Cat_Tipo_Participacion_Eventos : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Tipo_Participacion { get; set; }
        public string? Descripcion { get; set; }
        [OneToMany(TableName = "Tbl_Participantes_Eventos", KeyColumn = "Id_Tipo_Participacion", ForeignKeyColumn = "Id_Tipo_Participacion")]
        public List<Tbl_Participantes_Eventos>? Tbl_Participantes_Eventos { get; set; }
    }
    public class Tbl_Investigaciones_Disciplinas : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Disciplina { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_Investigacion { get; set; }
        [ManyToOne(TableName = "Cat_Disciplinas", KeyColumn = "Id_Disciplina", ForeignKeyColumn = "Id_Disciplina")]
        public Cat_Disciplinas? Cat_Disciplinas { get; set; }
        [ManyToOne(TableName = "Tbl_Investigaciones", KeyColumn = "Id_Investigacion", ForeignKeyColumn = "Id_Investigacion")]
        public Tbl_Investigaciones? Tbl_Investigaciones { get; set; }
    }
    public class Cat_Disciplinas : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Disciplina { get; set; }
        public string? DescripcionDisciplina { get; set; }
        public string? Color { get; set; }
        public string? Icono { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Investigaciones_Disciplinas", KeyColumn = "Id_Disciplina", ForeignKeyColumn = "Id_Disciplina")]
        public List<Tbl_Investigaciones_Disciplinas>? Tbl_Investigaciones_Disciplinas { get; set; }
    }
    public class Tbl_Investigaciones : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Investigacion { get; set; }
        public string? Visibilidad { get; set; }
        public int? Id_Tipo_Investigacion { get; set; }
        public string? Titulo { get; set; }
        public string? Abstract { get; set; }
        public string? Resumen { get; set; }
        public string? Referencias { get; set; }
        public string? url_publicacion { get; set; }
        public DateTime? Fecha_ejecucion { get; set; }
        public int? Id_Investigador { get; set; }
        public string? Photo { get; set; }
        public string? Estado { get; set; }
        public int? Id_Localidad { get; set; }
        public DateTime? Fecha_publicacion { get; set; }
        [ManyToOne(TableName = "Cat_Tipo_Investigacion", KeyColumn = "Id_Tipo_Investigacion", ForeignKeyColumn = "Id_Tipo_Investigacion")]
        public Cat_Tipo_Investigacion? Cat_Tipo_Investigacion { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Cat_Localidad", KeyColumn = "Id_Localidad", ForeignKeyColumn = "Id_Localidad")]
        public Cat_Localidad? Cat_Localidad { get; set; }
        [OneToMany(TableName = "Tbl_Colaboradores", KeyColumn = "Id_Investigacion", ForeignKeyColumn = "Id_Investigacion")]
        public List<Tbl_Colaboradores>? Tbl_Colaboradores { get; set; }
        [OneToMany(TableName = "Tbl_Investigaciones_Disciplinas", KeyColumn = "Id_Investigacion", ForeignKeyColumn = "Id_Investigacion")]
        public List<Tbl_Investigaciones_Disciplinas>? Tbl_Investigaciones_Disciplinas { get; set; }

        public Tbl_Investigaciones GetInvestigacion()
        {
            try
            {
                Tbl_Investigaciones Investigacion = GetInvestigaciones()[0];
                //List<Tbl_Colaboradores> colaboradores = (new Tbl_Colaboradores()
                //{
                //    Id_Investigacion = this.Id_Investigacion
                //}
                //).Get<Tbl_Colaboradores>();
                //Investigacion.Tbl_Colaboradores = (new Tbl_InvestigatorProfile()).Get_WhereIN<Tbl_InvestigatorProfile>(
                //        "Id_Investigador", colaboradores.Select(c => c.Id_Investigador.ToString()).ToArray());
                return Investigacion;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool SaveImage(string ImgStr, string ImgName)
        {
            String path = "";//HttpContext.Current.Server.MapPath("~/ImageStorage"); //Path

            //Check if directory exist
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
            }

            string imageName = ImgName + ".jpg";

            //set the image path
            string imgPath = Path.Combine(path, imageName);

            byte[] imageBytes = Convert.FromBase64String(ImgStr);

            File.WriteAllBytes(imgPath, imageBytes);

            return true;
        }
        public List<Tbl_Investigaciones> GetInvestigaciones()
        {
            try
            {
                List<Tbl_Investigaciones> Investigaciones = this.Get<Tbl_Investigaciones>();
                foreach (Tbl_Investigaciones inv in Investigaciones)
                {
                    inv.Tbl_Investigaciones_Disciplinas = (new Tbl_Investigaciones_Disciplinas()).Get_WhereIN<Tbl_Investigaciones_Disciplinas>(
                        "Id_Investigacion", new string[] { inv.Id_Investigacion.ToString() });
                    inv.Tbl_Colaboradores = (new Tbl_Colaboradores()).Get_WhereIN<Tbl_Colaboradores>(
                        "Id_Investigacion", new string[] { inv.Id_Investigacion.ToString() });

                }
                return Investigaciones;
            }
            catch (Exception)
            {
                throw;
            }
        }
        //public Object SaveInvestigacion()
        //{
        //    try
        //    {
        //        if (this.Id_Investigacion == null)
        //        {
        //            this.Fecha_publicacion = DateTime.Now;
        //            this.Id_Investigacion = (Int32)this.Save();
        //        }
        //        else
        //        {
        //            this.Update("Id_Investigacion");
        //        }
        //        if (this.Tbl_Investigaciones_Disciplinas != null)
        //        {
        //            Tbl_Investigaciones_Disciplinas IdI = new Tbl_Investigaciones_Disciplinas();
        //            IdI.Id_Investigacion = this.Id_Investigacion;
        //            IdI.Delete();
        //            foreach (Tbl_Investigaciones_Disciplinas obj in this.Tbl_Investigaciones_Disciplinas)
        //            {
        //                obj.Id_Investigacion = this.Id_Investigacion;
        //                obj.Save();
        //            }
        //        }
        //        return this;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
    }
    public class Cat_Paises : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Pais { get; set; }
        public string? Estado { get; set; }
        public string? Descripcion { get; set; }
        [OneToMany(TableName = "Cat_Localidad", KeyColumn = "Id_Pais", ForeignKeyColumn = "Id_Pais")]
        public List<Cat_Localidad>? Cat_Localidad { get; set; }
        [OneToMany(TableName = "Tbl_Evento", KeyColumn = "Id_Pais", ForeignKeyColumn = "Id_Pais")]
        public List<Tbl_Evento>? Tbl_Evento { get; set; }
        [OneToMany(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Pais", ForeignKeyColumn = "Id_Pais_Origen")]
        public List<Tbl_InvestigatorProfile>? Tbl_InvestigatorProfile { get; set; }
    }
    public class Cat_TipoLocalidad : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Tipo_Localidad { get; set; }
        public string? Nombre_TipoLocalidad { get; set; }
        [OneToMany(TableName = "Cat_Localidad", KeyColumn = "Id_Tipo_Localidad", ForeignKeyColumn = "Id_Tipo_Localidad")]
        public List<Cat_Localidad>? Cat_Localidad { get; set; }
    }
    public class Cat_Localidad : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Localidad { get; set; }
        public string? Nombre_Localidad { get; set; }
        public int? Id_Tipo_Localidad { get; set; }
        public int? Id_LocalidadPadre { get; set; }
        public int? Id_Pais { get; set; }
        public string? Latitud { get; set; }
        public string? Longitud { get; set; }
        public string? Estado { get; set; }
        [ManyToOne(TableName = "Cat_TipoLocalidad", KeyColumn = "Id_Tipo_Localidad", ForeignKeyColumn = "Id_Tipo_Localidad")]
        public Cat_TipoLocalidad? Cat_TipoLocalidad { get; set; }
        [ManyToOne(TableName = "Cat_Localidad", KeyColumn = "Id_LocalidadPadre", ForeignKeyColumn = "Id_Localidad")]
        public Cat_Localidad? Cat_Localidad_Padre { get; set; }
        [ManyToOne(TableName = "Cat_Paises", KeyColumn = "Id_Pais", ForeignKeyColumn = "Id_Pais")]
        public Cat_Paises? Cat_Paises { get; set; }
        [OneToMany(TableName = "Cat_Localidad", KeyColumn = "Id_Localidad", ForeignKeyColumn = "Id_LocalidadPadre")]
        public List<Cat_Localidad>? Cat_Localidades { get; set; }
        [OneToMany(TableName = "Tbl_Investigaciones", KeyColumn = "Id_Localidad", ForeignKeyColumn = "Id_Localidad")]
        public List<Tbl_Investigaciones>? Tbl_Investigaciones { get; set; }
    }
    public class Cat_instituciones : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Institucion { get; set; }
        public string? Nombre { get; set; }
        public string? Direccion { get; set; }
        public string? Estado { get; set; }
        public string? Logo { get; set; }
        [OneToMany(TableName = "ProyectoCatDependencias", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public List<ProyectoCatDependencias>? ProyectoCatDependencias { get; set; }
        [OneToMany(TableName = "Tbl_Distinciones", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public List<Tbl_Distinciones>? Tbl_Distinciones { get; set; }
        [OneToMany(TableName = "Tbl_Formacion_Academica", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public List<Tbl_Formacion_Academica>? Tbl_Formacion_Academica { get; set; }
        [OneToMany(TableName = "Tbl_Instituciones_Asociadas", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public List<Tbl_Instituciones_Asociadas>? Tbl_Instituciones_Asociadas { get; set; }
        [OneToMany(TableName = "Tbl_InstitucionesAsociadasGrupos", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public List<Tbl_InstitucionesAsociadasGrupos>? Tbl_InstitucionesAsociadasGrupos { get; set; }
        [OneToMany(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public List<Tbl_InvestigatorProfile>? Tbl_InvestigatorProfile { get; set; }
        [OneToMany(TableName = "Tbl_Patentes", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public List<Tbl_Patentes>? Tbl_Patentes { get; set; }

    }
    public class Cat_Tipo_Investigacion : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Tipo_Investigacion { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Investigaciones", KeyColumn = "Id_Tipo_Investigacion", ForeignKeyColumn = "Id_Tipo_Investigacion")]
        public List<Tbl_Investigaciones>? Tbl_Investigaciones { get; set; }
    }
    public class Tbl_InvestigatorProfile : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Investigador { get; set; }
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public DateTime? FechaNac { get; set; }
        public int? IdUser { get; set; }
        public string? Sexo { get; set; }
        public string? Foto { get; set; }
        public string? DNI { get; set; }
        public string? Correo_institucional { get; set; }
        public int? Id_Pais_Origen { get; set; }
        public int? Id_Institucion { get; set; }
        public string? Indice_H { get; set; }
        public string? Estado { get; set; }
        [ManyToOne(TableName = "Security_Users", KeyColumn = "IdUser", ForeignKeyColumn = "Id_User")]
        public Security_Users? Security_Users { get; set; }
        [ManyToOne(TableName = "Cat_Paises", KeyColumn = "Id_Pais_Origen", ForeignKeyColumn = "Id_Pais")]
        public Cat_Paises? Cat_Paises { get; set; }
        [ManyToOne(TableName = "Cat_instituciones", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public Cat_instituciones? Cat_instituciones { get; set; }
        [OneToMany(TableName = "ProyectoTableActividades", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<ProyectoTableActividades>? ProyectoTableActividades { get; set; }
        [OneToMany(TableName = "ProyectoTableAgenda", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<ProyectoTableAgenda>? ProyectoTableAgenda { get; set; }
        [OneToMany(TableName = "ProyectoTableDependencias_Usuarios", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<ProyectoTableDependencias_Usuarios>? ProyectoTableDependencias_Usuarios { get; set; }
        [OneToMany(TableName = "ProyectoTableParticipantes", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<ProyectoTableParticipantes>? ProyectoTableParticipantes { get; set; }
        [OneToMany(TableName = "Tbl_Colaboradores", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Colaboradores>? Tbl_Colaboradores { get; set; }
        [OneToMany(TableName = "Tbl_Datos_Laborales", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Datos_Laborales>? Tbl_Datos_Laborales { get; set; }
        [OneToMany(TableName = "Tbl_Distinciones", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Distinciones>? Tbl_Distinciones { get; set; }
        [OneToMany(TableName = "Tbl_Evento", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Evento>? Tbl_Evento { get; set; }
        [OneToMany(TableName = "Tbl_Formacion_Academica", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Formacion_Academica>? Tbl_Formacion_Academica { get; set; }
        [OneToMany(TableName = "Tbl_Grupos", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador_Crea")]
        public List<Tbl_Grupos>? Tbl_Grupos { get; set; }
        [OneToMany(TableName = "Tbl_IdiomasInv", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_IdiomasInv>? Tbl_IdiomasInv { get; set; }
        [OneToMany(TableName = "Tbl_Invest_RedS", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Invest_RedS>? Tbl_Invest_RedS { get; set; }
        [OneToMany(TableName = "Tbl_Investigaciones", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Investigaciones>? Tbl_Investigaciones { get; set; }
        [OneToMany(TableName = "Tbl_InvestigadoresAsociados", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_InvestigadoresAsociados>? Tbl_InvestigadoresAsociados { get; set; }
        [OneToMany(TableName = "Tbl_Invitaciones", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Invitaciones>? Tbl_Invitaciones { get; set; }
        [OneToMany(TableName = "Tbl_Participantes_Eventos", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Participantes_Eventos>? Tbl_Participantes_Eventos { get; set; }
        [OneToMany(TableName = "Tbl_Participantes_Proyectos", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Participantes_Proyectos>? Tbl_Participantes_Proyectos { get; set; }
        [OneToMany(TableName = "Tbl_Patentes", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<Tbl_Patentes>? Tbl_Patentes { get; set; }
        [OneToMany(TableName = "TblProcesosEditoriales", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public List<TblProcesosEditoriales>? TblProcesosEditoriales { get; set; }

        public List<ProyectoTableDependencias_Usuarios> TakeDepCoordinaciones()
        {
            ProyectoTableDependencias_Usuarios DU = new ProyectoTableDependencias_Usuarios();
            DU.Id_Investigador = this.Id_Investigador;
            return DU.Get_WhereIN<ProyectoTableDependencias_Usuarios>("Id_Cargo", new string[] { "1", "2" });
        }
        public Object TakeInvestigadorProfile()
        {
            try
            {
                return this.Find<Tbl_InvestigatorProfile>();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public Object Postularse()
        {
            try
            {
                this.Estado = "POSTULANTE";
                SaveProfile();
                return true;
            }
            catch (Exception) { return false; }

        }
        public Object SaveProfile()
        {
            if (this.Id_Investigador == null)
            {
                this.Id_Investigador = (Int32)this.Save();
            }
            else
            {
                this.Update("Id_Investigador");
            }
            if (this.Tbl_IdiomasInv != null)
            {
                Tbl_IdiomasInv IdI = new Tbl_IdiomasInv();
                IdI.Id_Investigador = this.Id_Investigador;
                IdI.Delete();
                foreach (Tbl_IdiomasInv obj in this.Tbl_IdiomasInv)
                {
                    obj.Id_Investigador = this.Id_Investigador;
                    obj.Save();
                }
            }
            if (this.Tbl_Formacion_Academica != null)
            {
                foreach (Tbl_Formacion_Academica obj in this.Tbl_Formacion_Academica)
                {
                    obj.Id_Investigador = this.Id_Investigador;
                    if (obj.IdFormacion == null)
                    {
                        obj.Save();
                    }
                    else
                    {
                        obj.Update();
                    }

                }
            }
            if (this.Tbl_Datos_Laborales != null)
            {
                foreach (Tbl_Datos_Laborales obj in this.Tbl_Datos_Laborales)
                {
                    obj.Id_Investigador = this.Id_Investigador;
                     if (obj.Id_DatoL == null)
                    {
                        obj.Save();
                    }
                    else
                    {
                        obj.Update();
                    }
                }
            }
            if (this.Tbl_Investigaciones != null)
            {
                foreach (Tbl_Investigaciones obj in this.Tbl_Investigaciones)
                {
                    obj.Id_Investigador = this.Id_Investigador;                   
                    if (obj.Id_Investigacion == null)
                    {
                        obj.Save();
                    }
                    else
                    {
                        obj.Update();
                    }
                }
            }
            return this;
        }
        public Object AdmitirPostulante()
        {
            try
            {
                new Security_Users()
                {
                    Mail = this.Correo_institucional,
                    Nombres = this.Nombres + " " + this.Apellidos,
                    Estado = "Activo",
                    Descripcion = "Investigador postulado",
                    Password = Guid.NewGuid().ToString(),
                    Token = Guid.NewGuid().ToString(),
                    Token_Date = DateTime.Now,
                    Token_Expiration_Date = DateTime.Now.AddMonths(6),
                    Security_Users_Roles = new List<Security_Users_Roles>(){
                        new Security_Users_Roles() { Id_Role = 2 }
                    }
                }.SaveUser();
                this.Estado = "ACTIVO";
                this.Update("Id_Investigador");
                MailServices.SendMail(this.Correo_institucional);
                return true;
            }
            catch (Exception) { return false; }
        }
    }
    public class Cat_Tipo_Asociacion : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Tipo_Asociacion { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Instituciones_Asociadas", KeyColumn = "Id_Tipo_Asociacion", ForeignKeyColumn = "Id_Tipo_Asociacion")]
        public List<Tbl_Instituciones_Asociadas>? Tbl_Instituciones_Asociadas { get; set; }
    }
    public class Tbl_Instituciones_Asociadas : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Institucion { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_Proyecto { get; set; }
        public int? Id_Tipo_Asociacion { get; set; }
        public DateTime? Fecha_Ingreso { get; set; }
        public string? Estado { get; set; }
        [ManyToOne(TableName = "Cat_instituciones", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public Cat_instituciones? Cat_instituciones { get; set; }
        [ManyToOne(TableName = "Tbl_Proyectos", KeyColumn = "Id_Proyecto", ForeignKeyColumn = "Id_Proyecto")]
        public Tbl_Proyectos? Tbl_Proyectos { get; set; }
        [ManyToOne(TableName = "Cat_Tipo_Asociacion", KeyColumn = "Id_Tipo_Asociacion", ForeignKeyColumn = "Id_Tipo_Asociacion")]
        public Cat_Tipo_Asociacion? Cat_Tipo_Asociacion { get; set; }
    }
    public class Cat_Tipo_Colaborador : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Tipo_Colaboracion { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Colaboradores", KeyColumn = "Id_Tipo_Colaboracion", ForeignKeyColumn = "Id_Tipo_Colaboracion")]
        public List<Tbl_Colaboradores>? Tbl_Colaboradores { get; set; }
    }
    public class Tbl_Colaboradores : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Investigacion { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_Investigador { get; set; }
        public string? Estado { get; set; }
        public DateTime? Fecha_ingreso { get; set; }
        public int? Id_Tipo_Colaboracion { get; set; }
        [ManyToOne(TableName = "Tbl_Investigaciones", KeyColumn = "Id_Investigacion", ForeignKeyColumn = "Id_Investigacion")]
        public Tbl_Investigaciones? Tbl_Investigaciones { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Cat_Tipo_Colaborador", KeyColumn = "Id_Tipo_Colaboracion", ForeignKeyColumn = "Id_Tipo_Colaboracion")]
        public Cat_Tipo_Colaborador? Cat_Tipo_Colaborador { get; set; }
    }
    public class Cat_Tipo_Proyecto : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Tipo_Proyecto { get; set; }
        public string? Descripcion_Tipo_Proyecto { get; set; }
        public string? Estado_Tipo_Proyecto { get; set; }
        public string? Icon { get; set; }
        [OneToMany(TableName = "Tbl_Proyectos", KeyColumn = "Id_Tipo_Proyecto", ForeignKeyColumn = "Id_Tipo_Proyecto")]
        public List<Tbl_Proyectos>? Tbl_Proyectos { get; set; }
    }
    public class Tbl_Proyectos : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Proyecto { get; set; }
        public string? Nombre_Proyecto { get; set; }
        public string? DescripcionProyecto { get; set; }
        public int? Id_Tipo_Proyecto { get; set; }
        public string? Visibilidad { get; set; }
        public string? Estado_Proyecto { get; set; }
        public DateTime? Fecha_Inicio { get; set; }
        public DateTime? Fecha_Finalizacion { get; set; }
        [ManyToOne(TableName = "Cat_Tipo_Proyecto", KeyColumn = "Id_Tipo_Proyecto", ForeignKeyColumn = "Id_Tipo_Proyecto")]
        public Cat_Tipo_Proyecto? Cat_Tipo_Proyecto { get; set; }
        [OneToMany(TableName = "ProyectoTableActividades", KeyColumn = "Id_Proyecto", ForeignKeyColumn = "Id_Proyecto")]
        public List<ProyectoTableActividades>? ProyectoTableActividades { get; set; }
        [OneToMany(TableName = "Tbl_Instituciones_Asociadas", KeyColumn = "Id_Proyecto", ForeignKeyColumn = "Id_Proyecto")]
        public List<Tbl_Instituciones_Asociadas>? Tbl_Instituciones_Asociadas { get; set; }
        [OneToMany(TableName = "Tbl_Participantes_Proyectos", KeyColumn = "Id_Proyecto", ForeignKeyColumn = "Id_Proyecto")]
        public List<Tbl_Participantes_Proyectos>? Tbl_Participantes_Proyectos { get; set; }
    }
    public class Cat_Cargo_Proyecto : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Cargo_Proyecto { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Participantes_Proyectos", KeyColumn = "Id_Cargo_Proyecto", ForeignKeyColumn = "Id_Cargo_Proyecto")]
        public List<Tbl_Participantes_Proyectos>? Tbl_Participantes_Proyectos { get; set; }
    }
    public class Tbl_Participantes_Proyectos : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Proyecto { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_Investigador { get; set; }
        public int? Id_Cargo_Proyecto { get; set; }
        public DateTime? Fecha_Ingreso { get; set; }
        public string? Estado_Participante { get; set; }
        [ManyToOne(TableName = "Tbl_Proyectos", KeyColumn = "Id_Proyecto", ForeignKeyColumn = "Id_Proyecto")]
        public Tbl_Proyectos? Tbl_Proyectos { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Cat_Cargo_Proyecto", KeyColumn = "Id_Cargo_Proyecto", ForeignKeyColumn = "Id_Cargo_Proyecto")]
        public Cat_Cargo_Proyecto? Cat_Cargo_Proyecto { get; set; }
    }
    public class CatRedesSociales : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_RedSocial { get; set; }
        public string? Descripcion { get; set; }
        public string? url { get; set; }
        public string? Icon { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Invest_RedS", KeyColumn = "Id_RedSocial", ForeignKeyColumn = "Id_RedSocial")]
        public List<Tbl_Invest_RedS>? Tbl_Invest_RedS { get; set; }
    }
    public class Tbl_Invest_RedS : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Investigador { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_RedSocial { get; set; }
        public string? url_red_inv { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "CatRedesSociales", KeyColumn = "Id_RedSocial", ForeignKeyColumn = "Id_RedSocial")]
        public CatRedesSociales? CatRedesSociales { get; set; }
    }
    public class Tbl_IdiomasInv : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Investigador { get; set; }
        [PrimaryKey(Identity = false)]
        public int? Id_Idioma { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "Cat_Idiomas", KeyColumn = "Id_Idioma", ForeignKeyColumn = "Id_Idioma")]
        public Cat_Idiomas? Cat_Idiomas { get; set; }
    }

    public class ProyectoTableCalendario : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? IdCalendario { get; set; }
        public int? IdTarea { get; set; }
        public string? Estado { get; set; }
        public DateTime? Fecha_Inicial { get; set; }
        public DateTime? Fecha_Final { get; set; }
        [ManyToOne(TableName = "ProyectoTableTareas", KeyColumn = "IdTarea", ForeignKeyColumn = "IdTarea")]
        public ProyectoTableTareas? ProyectoTableTareas { get; set; }
    }
    public class ProyectoTableTareas : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? IdTarea { get; set; }
        public string? Titulo { get; set; }
        public int? IdTareaPadre { get; set; }
        public int? IdActividad { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [ManyToOne(TableName = "ProyectoTableTareas", KeyColumn = "IdTareaPadre", ForeignKeyColumn = "IdTarea")]
        public ProyectoTableTareas? ProyectoTableTarea { get; set; }
        [ManyToOne(TableName = "ProyectoTableActividades", KeyColumn = "IdActividad", ForeignKeyColumn = "IdActividad")]
        public ProyectoTableActividades? ProyectoTableActividades { get; set; }
        [OneToMany(TableName = "ProyectoTableCalendario", KeyColumn = "IdTarea", ForeignKeyColumn = "IdTarea")]
        public List<ProyectoTableCalendario>? ProyectoTableCalendario { get; set; }
        [OneToMany(TableName = "ProyectoTableEvidencias", KeyColumn = "IdTarea", ForeignKeyColumn = "IdTarea")]
        public List<ProyectoTableEvidencias>? ProyectoTableEvidencias { get; set; }
        [OneToMany(TableName = "ProyectoTableParticipantes", KeyColumn = "IdTarea", ForeignKeyColumn = "IdTarea")]
        public List<ProyectoTableParticipantes>? ProyectoTableParticipantes { get; set; }
        [OneToMany(TableName = "ProyectoTableTareas", KeyColumn = "IdTarea", ForeignKeyColumn = "IdTareaPadre")]
        public List<ProyectoTableTareas>? ProyectoTableTareasHijas { get; set; }
    }
    public class ProyectoTableParticipantes : EntityClass
    {
        [PrimaryKey(Identity = false)]
        public int? Id_Investigador { get; set; }
        [PrimaryKey(Identity = false)]
        public int? IdTarea { get; set; }
        public int? IdTipoParticipacion { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "ProyectoTableTareas", KeyColumn = "IdTarea", ForeignKeyColumn = "IdTarea")]
        public ProyectoTableTareas? ProyectoTableTareas { get; set; }
        [ManyToOne(TableName = "ProyectoCatTipoParticipaciones", KeyColumn = "IdTipoParticipacion", ForeignKeyColumn = "IdTipoParticipacion")]
        public ProyectoCatTipoParticipaciones? ProyectoCatTipoParticipaciones { get; set; }
    }
    public class Cat_Cargos : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Cargo { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "Tbl_Datos_Laborales", KeyColumn = "Id_Cargo", ForeignKeyColumn = "Id_Cargo")]
        public List<Tbl_Datos_Laborales>? Tbl_Datos_Laborales { get; set; }
    }
    public class Cat_Tipo_Proceso_Editorial : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Tipo_Proceso_Editorial { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        [OneToMany(TableName = "TblProcesosEditoriales", KeyColumn = "Id_Tipo_Proceso_Editorial", ForeignKeyColumn = "Id_Tipo_Proceso_Editorial")]
        public List<TblProcesosEditoriales>? TblProcesosEditoriales { get; set; }
    }
}
