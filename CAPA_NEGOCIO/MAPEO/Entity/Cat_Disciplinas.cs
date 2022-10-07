using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Cat_Disciplinas: EntityClass
    {
        public int? Id_Disciplina { get; set; }
        public string DescripcionDisciplina { get; set; }
        public string Color { get; set;}
        public string Icono { get; set; }
        public string Estado { get; set; }

        //TBL_Displinas_INvestigaciones
        public int? Id_Investigacion { get; set; }
        public List<Cat_Disciplinas> TakeDisciplinas()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList<Cat_Disciplinas>(this);
            }
            catch (Exception)
            {
                throw;
            }
        }       

    }
}
