using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class CatTipoParticipaciones : EntityClass
    {
        public int? IdTipoParticipacion { get; set; }
        public string Descripcion { get; set; }
    }
}
