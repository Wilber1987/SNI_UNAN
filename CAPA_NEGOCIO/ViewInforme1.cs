using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO
{
    class ViewInforme1
    {
        public int Num { get; set; }
        public string Nombre { get; set; }
        public DateTime Fecha { get; set; }
        public Object TakeInforme(DateTime date1, DateTime date2)
        {
            try
            {
            //    var Informe = SqlADOConexion.SQLM.TakeList("ViewInforme1", this,
            //        "Where Fecha between '" +
            //        date1.ToString("yyyy/MM/dd")+"' and '"+ 
            //        date2.ToString("yyyy/MM/dd") + "'");               
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
