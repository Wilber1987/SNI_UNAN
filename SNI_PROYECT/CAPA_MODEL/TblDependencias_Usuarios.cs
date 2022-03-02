using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class TblDependencias_Usuarios
    {
        public int? IdUsuario { get; set; }
        public int? IdDependencia { get; set; }
        public int? IdCargo { get; set; }
        public TblUsuario Usuario { get; set; }
        public CatDependencias Dependencia { get; set; }
        public CatCargosDepenedencias CargoDependencia { get; set; }

    }
}
