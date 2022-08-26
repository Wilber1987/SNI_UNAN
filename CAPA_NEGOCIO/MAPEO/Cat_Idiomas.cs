using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Cat_Idiomas: EntityClass
    {
        public int? Id_Idioma { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        //Idiomas Investigadores
        public int? Id_Investigador { get; set; }        
        
    }
}
