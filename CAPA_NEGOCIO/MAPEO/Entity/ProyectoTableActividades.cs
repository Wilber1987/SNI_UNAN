using CAPA_DATOS;
using CAPA_NEGOCIO.MAPEO;
using CAPA_NEGOCIO.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CAPA_NEGOCIO.MAPEO
{
    public class ProyectoTableActividades : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? IdActividad { get; set; }
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        public int? Id_Investigador { get; set; }
        public string? Estado { get; set; }
        public int? Id_Dependencia { get; set; }
        public DateTime? Fecha_Inicial { get; set; }
        public DateTime? Fecha_Final { get; set; }
        public int? Id_Proyecto { get; set; }
        [ManyToOne(TableName = "Tbl_InvestigatorProfile", KeyColumn = "Id_Investigador", ForeignKeyColumn = "Id_Investigador")]
        public Tbl_InvestigatorProfile? Tbl_InvestigatorProfile { get; set; }
        [ManyToOne(TableName = "ProyectoCatDependencias", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia")]
        public ProyectoCatDependencias? ProyectoCatDependencias { get; set; }
        [ManyToOne(TableName = "Tbl_Proyectos", KeyColumn = "Id_Proyecto", ForeignKeyColumn = "Id_Proyecto")]
        public Tbl_Proyectos? Tbl_Proyectos { get; set; }
        [OneToMany(TableName = "ProyectoTableTareas", KeyColumn = "IdActividad", ForeignKeyColumn = "IdActividad")]
        public List<ProyectoTableTareas>? ProyectoTableTareas { get; set; }
        public bool SaveActividades()
        {
            this.Id_Investigador = AuthNetCore.User().UserId;
            if (this.CheckCanSaveAct())
            {
                this.Estado = "Activa";
                this.IdActividad = (Int32?)SqlADOConexion.SQLM?.InsertObject(this);
                foreach (ProyectoTableTareas obj in this.ProyectoTableTareas ?? new List<ProyectoTableTareas>())
                {
                    obj.IdActividad = this.IdActividad;
                    obj.Save();
                }
                return true;
            }
            return false;
        }
        public bool CheckCanSaveAct()
        {
            ProyectoTableDependencias_Usuarios DU = new ProyectoTableDependencias_Usuarios();
            DU.Id_Investigador = this.Id_Investigador;
            DU.Id_Dependencia = this.Id_Dependencia;
            if (DU.Get_WhereIN<ProyectoTableDependencias_Usuarios>("Id_Cargo", new string[] { "1", "2" }).Count == 0)
            {
                return false;
            }
            return true;
        }
        public bool SolicitarActividades()
        {
            this.Id_Investigador = AuthNetCore.User().UserId;
            this.Estado = "Pendiente";
            this.IdActividad = (Int32?)SqlADOConexion.SQLM?.InsertObject(this);
            foreach (ProyectoTableTareas obj in this.ProyectoTableTareas ?? new List<ProyectoTableTareas>())
            {
                obj.IdActividad = this.IdActividad;
                obj.Save();
            }
            return true;
        }
        public ProyectoTableActividades GetActividad()
        {
            this.ProyectoTableTareas = (new ProyectoTableTareas()).Get<ProyectoTableTareas>("IdActividad = " + this.IdActividad.ToString());
            foreach (ProyectoTableTareas tarea in this.ProyectoTableTareas ?? new List<ProyectoTableTareas>())
            {
                tarea.ProyectoTableCalendario = (new ProyectoTableCalendario()).Get<ProyectoTableCalendario>("IdTarea = " + tarea.IdTarea.ToString());
            }
            return this;
        }
        public List<ProyectoTableActividades> GetOwActivities()
        {
            return new ProyectoTableActividades()
            {
                Id_Investigador = AuthNetCore.User().UserId
            }.Get<ProyectoTableActividades>();
        }
    }

    public class ProyectoCatCargosDependencias : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Cargo { get; set; }
        public string? Descripcion { get; set; }
        [OneToMany(TableName = "ProyectoTableDependencias_Usuarios", KeyColumn = "Id_Cargo", ForeignKeyColumn = "Id_Cargo")]
        public List<ProyectoTableDependencias_Usuarios>? ProyectoTableDependencias_Usuarios { get; set; }
    }
    public class ProyectoCatDependencias : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? Id_Dependencia { get; set; }
        public string? Descripcion { get; set; }
        public int? Id_Dependencia_Padre { get; set; }
        public int? Id_Institucion { get; set; }
        [ManyToOne(TableName = "ProyectoCatDependencias", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia_Padre")]
        public ProyectoCatDependencias? ProyectoCatDependencia { get; set; }
        [ManyToOne(TableName = "Cat_instituciones", KeyColumn = "Id_Institucion", ForeignKeyColumn = "Id_Institucion")]
        public Cat_instituciones? Cat_instituciones { get; set; }
        [OneToMany(TableName = "ProyectoCatDependencias", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia_Padre")]
        public List<ProyectoCatDependencias>? ProyectoCatDependencias_Hijas { get; set; }
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
        [ManyToOne(TableName = "ProyectoCatCargosDependencias", KeyColumn = "Id_Cargo", ForeignKeyColumn = "Id_Cargo")]
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
        [ManyToOne(TableName = "CatalogoTipoEvidencia", KeyColumn = "IdTipo", ForeignKeyColumn = "IdTipo")]
        public CatalogoTipoEvidencia? CatalogoTipoEvidencia { get; set; }

    }

    public class ProyectoTableCalendario : EntityClass
    {
        [PrimaryKey(Identity = true)]
        public int? IdCalendario { get; set; }
        public int? IdTarea { get; set; }
        public int? Id_Dependencia { get; set; }
        public string? Estado { get; set; }
        public DateTime? Fecha_Inicial { get; set; }
        public DateTime? Fecha_Final { get; set; }
        [ManyToOne(TableName = "ProyectoTableTareas", KeyColumn = "IdTarea", ForeignKeyColumn = "IdTarea")]
        public ProyectoTableTareas? ProyectoTableTareas { get; set; }
        [ManyToOne(TableName = "ProyectoCatDependencias", KeyColumn = "Id_Dependencia", ForeignKeyColumn = "Id_Dependencia")]
        public ProyectoCatDependencias? ProyectoCatDependencias { get; set; }

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
        [ManyToOne(TableName = "ProyectoTableTareas", KeyColumn = "IdTarea", ForeignKeyColumn = "IdTareaPadre")]
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
        public List<ProyectoTableTareas> GetOwParticipations()
        {
            ProyectoTableParticipantes Inst = new ProyectoTableParticipantes();
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            return new ProyectoTableTareas().Get_WhereIN<ProyectoTableTareas>(
                "IdTarea", Inst.Get<ProyectoTableParticipantes>().Select(p => p.IdTarea.ToString()).ToArray()
            );
        }

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
}
