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
        public string Logo { get; set; }
      
    }
}
