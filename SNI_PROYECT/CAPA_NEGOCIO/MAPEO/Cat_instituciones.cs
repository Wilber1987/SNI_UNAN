using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Cat_instituciones : EntityClass
    {
        public int? Id_Institucion { get; set; }
        public string Estado { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        //INSTITUCIONES PROYECTOS
        public int? Id_Proyecto { get; set; }
        public int? Id_Tipo_Asociacion {get; set; }
        public string Logo { get; set; }
        public string Fecha_Ingreso { get; set; }
        public string Descripcion { get; set; }
        public string EstadoAsociacion { get; set; }

        public List<Object> Take()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList("Cat_instituciones", this);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Object> TakeInstitucionesAsociadas()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList("ViewGPInstitucionesAsociadas", this);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
