using CAPA_DATOS;
using CAPA_MODEL.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class TblActividades : EntityClass
    {
        public int? IdActividad { get; set; }
        public string Titulo   { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public DateTime? Fecha_Inicial { get; set; }
        public DateTime? Fecha_Final { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdDependencia { get; set; }
        public List<TblTareas> Tareas { get; set; }
        //public bool SaveActividades()
        //{
        //    this.IdUsuario = AuthNetCore.User().UserId;
        //    if (this.CheckCanSaveAct())
        //    {
        //        this.Estado = "Activa";
        //        this.IdActividad = (Int32)SqlADOConexion.SQLM.InsertObject(this);
        //        foreach (TblTareas obj in this.Tareas)
        //        {
        //            obj.IdActividad = this.IdActividad;
        //            obj.SaveTarea();
        //        }
        //        return true;
        //    }            
        //    return false;
        //}
        //public bool CheckCanSaveAct()
        //{
        //    TblDependencias_Usuarios DU = new TblDependencias_Usuarios();
        //    DU.IdUsuario = this.IdUsuario;
        //    DU.IdDependencia = this.IdDependencia;
        //    if (DU.Get_WhereIN("IdCargo", new string[]{ "1", "2"}).Count == 0)
        //    {
        //        return false;
        //    }
        //    return true;
        //}
        public bool SolicitarActividades()
        {           
            return true;
        }
        public TblActividades GetActividad()
        {
            this.Tareas = (new TblTareas()).Get<TblTareas>("IdActividad = " + this.IdActividad.ToString());
            foreach (TblTareas tarea in this.Tareas)
            {
                tarea.Calendarios = (new TblCalendario()).Get<TblCalendario>("IdTarea = " + tarea.IdTarea.ToString());
            }
            return this;
        }
    }
}
