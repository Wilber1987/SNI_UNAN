using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_InvestigadorProfile
    {
        public int? Id_Investigador { get; set; }
        public string Nombres {get; set;}
        public string Apellidos {get; set;}
        public DateTime? FechaNac {get; set;}
        public int? IdUser {get; set;}
        public string Sexo {get; set;}
        public string Foto {get; set;}
        public string DNI {get; set;}
        public string Correo_institucional {get; set;}
        public int? Id_Pais_Origen {get; set;}
        public int? Id_Institucion {get; set;}
        public string Indice_H {get; set;}
        public string Estado {get; set;}

    }
}
