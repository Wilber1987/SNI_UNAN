using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class CatCargosDepenedencias
    {
        public int? IdCargo { get; set; }
        public string Descripcion { get; set; }
        public List<TblDependencias_Usuarios> DependenciasUsuarios { get; set; }
    }
}
