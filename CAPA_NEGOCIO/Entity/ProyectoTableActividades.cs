﻿using CAPA_DATOS;
using CAPA_NEGOCIO.Entity;
using CAPA_NEGOCIO.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CAPA_NEGOCIO
{
    public class ProyectoTableActividades : EntityClass
    {
        public int? IdActividad { get; set; }
        public string Titulo   { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public DateTime? Fecha_Inicial { get; set; }
        public DateTime? Fecha_Final { get; set; }
        public int? Id_Investigador { get; set; }
        public int? Id_Dependencia { get; set; }
        public int? Id_Proyecto { get; set; }
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
                    obj.SaveTarea();
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
            if (DU.Get_WhereIN("IdCargo", new string[]{ "1", "2"}).Count == 0)
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
                obj.SaveTarea();
            }
            return true;
        }
        public ProyectoTableActividades GetActividad()
        {
            this.Tareas = (new ProyectoTableTareas()).Get<ProyectoTableTareas>("IdActividad = " + this.IdActividad.ToString());
            foreach (ProyectoTableTareas tarea in this.Tareas)
            {
                tarea.Calendarios = (new ProyectoTableCalendario()).Get<ProyectoTableCalendario>("IdTarea = " + tarea.IdTarea.ToString());
            }
            return this;
        }
    }
}