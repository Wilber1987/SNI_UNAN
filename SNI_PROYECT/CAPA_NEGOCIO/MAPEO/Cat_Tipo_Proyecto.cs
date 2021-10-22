using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;
namespace CAPA_NEGOCIO.MAPEO
{
    public class Cat_Tipo_Proyecto
    {
        public int? Id_Tipo_Proyecto { get; set; }
        public string Descripcion_Tipo_Proyecto { get; set; }
        public string Estado_Tipo_Proyecto { get; set; }
        public string Icon { get; set; }
        public List<Object> TakeTipoProyecto()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList("Cat_Tipo_Proyecto", this);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}