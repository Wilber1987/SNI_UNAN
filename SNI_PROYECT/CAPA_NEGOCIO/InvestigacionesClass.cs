using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO
{
    public class InvestigacionesClass
    {
        public int? Id_Investigacion { get; set; }
        public string Nombres { get; set; }
        public string  Apellidos { get; set; }
        public string Foto { get; set; }
        public string Titulo { get; set; }
        public string Resumen { get; set; }
        public byte[] Repositorio { get; set; }
        public string Descripcion { get; set; }
        public DateTime? Fecha_ejecucion { get; set; }
        public string url_publicacion { get; set; }
        public string Photo { get; set; }
        public Object TakeInvestigaciones()
        {
            try
            {
                SqlADOConexion.IniciarConexion("sa", "zaxscd");               
                return SqlADOConexion.SQLM.TakeList("ViewInvestigaciones", this);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
