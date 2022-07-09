using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL
{
    public class TblUsuario: EntityClass
    {
        public int? IdUsuario { get; set; }
        public string Nombres   { get; set; }
        public string Apellidos { get; set; }
        public string Mail { get; set; }
        public List<TblDependencias_Usuarios> Dependencias { get; set; }
        public List<Object> TakeDepCoordinaciones()
        {
            TblDependencias_Usuarios DU = new TblDependencias_Usuarios();
            DU.IdUsuario = this.IdUsuario;            
            return DU.Get_WhereIN("IdCargo", new string[] { "1", "2" });
        }

    }
}
