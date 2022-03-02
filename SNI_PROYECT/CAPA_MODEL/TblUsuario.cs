using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class TblUsuario
    {
        public int? IdUsuario { get; set; }
        public string Nombres   { get; set; }
        public string Apellidos { get; set; }
        public List<Object> Dependencias { get; set; }
    }
}
