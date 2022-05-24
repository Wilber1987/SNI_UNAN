using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.Entity
{
    public class ProyectoTableTareas: EntityClass
    {
        public int? IdTarea { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public int? IdTareaPadre { get; set; }
        public int? IdTareaRequicito { get; set; }
        public int? IdActividad { get; set; }
        public List<ProyectoTableCalendario> Calendarios { get; set; }
        public List<ProyectoTableEvidencias> Evidencias { get; set; }
        public List<ProyectoTableParticipantes> Participantes { get; set; }
        public bool SaveTarea()
        {
            this.Estado = "Activa";
            this.IdTarea = (Int32)SqlADOConexion.SQLM.InsertObject(this);
            foreach (ProyectoTableCalendario obj in this.Calendarios)
            {
                obj.IdTarea = this.IdTarea;
                obj.Save();
            }
            foreach (ProyectoTableParticipantes obj in this.Participantes)
            {
                obj.IdTarea = this.IdTarea;
                obj.IdTipoParticipacion = 1;
                obj.Save();
            }
            foreach (ProyectoTableEvidencias obj in this.Evidencias)
            {
                obj.IdTarea = this.IdTarea;
                obj.Save();
            }
            return true;
        }
        public List<ProyectoTableParticipantes> GetParticiapantes()
        {
            this.Participantes = SqlADOConexion.SQLM.TakeList<ProyectoTableParticipantes>(this);
            return this.Participantes;
        }
    }
}
