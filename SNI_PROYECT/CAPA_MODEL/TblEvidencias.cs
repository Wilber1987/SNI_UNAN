using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class TblEvidencias
    {
        public int IdEvidencia { get; set; }
        public int IdTipo { get; set; }
        public string Data { get; set; }
        public int IdActividad { get; set; }
        public TblActividades Actividad { get; set; }

      

    }
}
