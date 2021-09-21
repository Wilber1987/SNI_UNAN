using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO
{
    public class InvestigacionesClass
    {
        public int? Id_Investigacion { get; set; }
        public int? Id_Investigador { get; set; }
        public string Nombres { get; set; }
        public string  Apellidos { get; set; }
        public string Foto { get; set; }
        public string Titulo { get; set; }
        public string Resumen { get; set; }
        public string Abstract { get; set; }
        public byte[] Repositorio { get; set; }
        public string Descripcion { get; set; }
        public DateTime? Fecha_ejecucion { get; set; }
        public string url_publicacion { get; set; }
        public string NombreInstitucion { get; set; }
        public string Photo { get; set; }
        public List<Object> Colaboradores { get; set; }
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
        public Object TakeInvestigacion()
        {
            try
            {
                SqlADOConexion.IniciarConexion("sa", "zaxscd");
                var List = SqlADOConexion.SQLM.TakeList("ViewInvestigaciones", this);
                InvestigacionesClass Investigacion = (InvestigacionesClass)List[0];
                MAPEO.Tbl_Colaboradores ModelCol = new MAPEO.Tbl_Colaboradores();
                ModelCol.Id_Investigacion = this.Id_Investigacion;
                Investigacion.Colaboradores = ModelCol.TakeColaboradores();
                return Investigacion;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
