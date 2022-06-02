using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Investigaciones:EntityClass
    {
        public int? Id_Investigacion { get; set; }
        public string Visibilidad { get; set; }
        public string Id_Tipo_Investigacion { get; set; }       
        public string Titulo { get; set; }
        public string Abstract { get; set; }
        public string Resumen { get; set; }
        public byte[] Repositorio { get; set; }
        public string Referencias { get; set; }
        public string url_publicacion { get; set; }
        public DateTime? Fecha_ejecucion { get; set; }
        public int? Id_Investigador { get; set; }
        public string Photo { get; set; }
        public string Estado { get; set; }
        public List<Object> TakeInvestigaciones()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList("Tbl_Investigaciones", this);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
