using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
   public class CatRedesSociales: EntityClass
    {
        public int? Id_RedSocial { get; set; }
        public string Descripcion { get; set; }
        public string Icon { get; set; }
        public string url { get; set; }
        public string Estado { get; set; }
        //investigadores redes
        public int? Id_Investigador { get; set; }
        public string url_red_inv { get; set; }

        public List<CatRedesSociales> TakeRedesInv()
        {
            try
            {
                return new List<CatRedesSociales>(); //SqlADOConexion.SQLM.TakeList<CatRedesSociales>(this);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
