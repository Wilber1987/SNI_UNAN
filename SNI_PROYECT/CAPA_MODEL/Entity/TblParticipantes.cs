using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class TblParticipantes : EntityClass
    {
        public int? IdTarea { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdTipoParticipacion { get; set; }

    }
}
