using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL.Entity
{
    public class TblTareas: EntityClass
    {
        public int? IdTarea { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public int? IdTareaPadre { get; set; }
        public int? IdTareaRequicito { get; set; }
        public int? IdActividad { get; set; }
        public List<TblCalendario> Calendarios { get; set; }
        public List<TblEvidencias> Evidencias { get; set; }
        public List<TblParticipantes> Participantes { get; set; }
        public bool SaveTarea()
        {
            this.Estado = "Activa";
            this.IdTarea = (Int32)SqlADOConexion.SQLM.InsertObject(this);
            foreach (TblCalendario obj in this.Calendarios)
            {
                obj.IdTarea = this.IdTarea;
                obj.Save();
            }
            foreach (TblParticipantes obj in this.Participantes)
            {
                obj.IdTarea = this.IdTarea;
                obj.IdTipoParticipacion = 1;
                obj.Save();
            }
            foreach (TblEvidencias obj in this.Evidencias)
            {
                obj.IdTarea = this.IdTarea;
                obj.Save();
            }
            return true;
        }
        public List<TblParticipantes> GetParticiapantes()
        {
            this.Participantes = new List<TblParticipantes>(); // SqlADOConexion.SQLM.TakeList<TblParticipantes>(this);
            return this.Participantes;
        }
    }
}
