using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Proyectos: Cat_Tipo_Proyecto
    {
        public int? Id_Proyecto { get; set; }
        public new int? Id_Tipo_Proyecto {get; set; }
        public string Visibilidad {get; set; }
        public string DescripcionProyecto { get; set; }
        public string Estado_Proyecto {get; set; }
        public DateTime? Fecha_Inicio {get; set; }
        public DateTime? Fecha_Finalizacion {get; set; }
        public string Nombre_Proyecto { get; set; }
        public List<Object> Participantes { get; set; }
        public List<Object> Instituciones { get; set; }
        public Object TakeProyect()
        {
            try
            {
                SqlADOConexion.IniciarConexion("sa", "zaxscd");
                var List = SqlADOConexion.SQLM.TakeList("Tbl_Proyectos", this);
                Tbl_Proyectos Proyecto = (Tbl_Proyectos)List[0];
                Tbl_Participantes_Proyectos ModelProyect = new Tbl_Participantes_Proyectos();
                ModelProyect.Id_Proyecto = Proyecto.Id_Proyecto;
                Cat_Tipo_Proyecto TP = new Cat_Tipo_Proyecto();
                var CP = (Cat_Tipo_Proyecto)TP.TakeTipoProyecto()[0];
                Proyecto.Descripcion_Tipo_Proyecto = CP.Descripcion_Tipo_Proyecto;
                Proyecto.Participantes = ModelProyect.TakeParicipantesProyectos();
                return Proyecto;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Object> TakeProyects()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList("Tbl_Proyectos", this);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
