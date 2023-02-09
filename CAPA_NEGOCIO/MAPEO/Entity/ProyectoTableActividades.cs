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
        public List<ProyectoTableTareas> Tareas { get; set; }
        public bool SaveActividades()
        {
            this.Id_Investigador = AuthNetCore.User().UserId;
            if (this.CheckCanSaveAct())
            {
                this.Estado = "Activa";
                this.IdActividad = (Int32)SqlADOConexion.SQLM.InsertObject(this);
                foreach (ProyectoTableTareas obj in this.Tareas)
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
            if (DU.Get_WhereIN<ProyectoTableDependencias_Usuarios>("IdCargo", new string[]{ "1", "2"}).Count == 0)
            {
                return false;
            }
            return true;
        }
        public bool SolicitarActividades()
        {
            this.Id_Investigador = AuthNetCore.User().UserId;
            this.Estado = "Pendiente";
            this.IdActividad = (Int32)SqlADOConexion.SQLM.InsertObject(this);
            foreach (ProyectoTableTareas obj in this.Tareas)
            {
                obj.IdActividad = this.IdActividad;
                obj.Save();
            }
            return true;
        }
        public ProyectoTableActividades GetActividad()
        {
            this.Tareas = (new ProyectoTableTareas()).Get<ProyectoTableTareas>("IdActividad = " + this.IdActividad.ToString());
            foreach (ProyectoTableTareas tarea in this.Tareas)
            {
                tarea.ProyectoTableCalendario = (new ProyectoTableCalendario()).Get<ProyectoTableCalendario>("IdTarea = " + tarea.IdTarea.ToString());
            }
            return this;
        }
    }
}
