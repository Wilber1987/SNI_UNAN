using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class TblActividades
    {
        public int IdActividad { get; set; }
        public string Titulo   { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public DateTime Fecha { get; set; }
        public int IdUsuario { get; set; }
        public List<TblEvidencias> Evidencias { get; set; }
        public List<TblParticipantes> Participantes { get; set; }

    }
}
