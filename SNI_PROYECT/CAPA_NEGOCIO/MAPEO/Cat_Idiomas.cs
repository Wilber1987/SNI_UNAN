using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Cat_Idiomas
    {
        public int? Id_Idioma { get; set; }
        public string Descripcion { get; set; }
        //Idiomas Investigadores
        public int? Id_Investigador { get; set; }
        public List<Object> Take()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList("Cat_Idiomas", this);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Object> TakeIdiomasInv()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList("ViewIdiomasInvestigadores", this);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
