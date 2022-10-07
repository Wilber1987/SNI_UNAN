using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Proyectos : EntityClass
    {
        public int? Id_Proyecto { get; set; }
        public string Nombre_Proyecto { get; set; }
        public string DescripcionProyecto { get; set; }
        public int? Id_Tipo_Proyecto { get; set; }
        public string Visibilidad { get; set; }
        public string Estado_Proyecto { get; set; }
        public DateTime? Fecha_Inicio { get; set; }
        public DateTime? Fecha_Finalizacion { get; set; }
        public Cat_Tipo_Proyecto Tipo_Proyecto { get; set; }
        public List<Tbl_Participantes_Proyectos> Participantes { get; set; }
        public List<Tbl_Instituciones_Asociadas> Instituciones { get; set; }
        public Object TakeProyect()
        {
            try
            {
                Tbl_Proyectos Proyecto = this.Find<Tbl_Proyectos>();
                Cat_Tipo_Proyecto TP = new Cat_Tipo_Proyecto();

                Proyecto.Participantes = new Tbl_Participantes_Proyectos()
                {
                    Id_Proyecto = this.Id_Proyecto
                }.Get<Tbl_Participantes_Proyectos>();

                Proyecto.Instituciones = new Tbl_Instituciones_Asociadas()
                {
                    Id_Proyecto = this.Id_Proyecto
                }.Get<Tbl_Instituciones_Asociadas>();
                return Proyecto;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Tbl_Proyectos> TakeProyects()
        {
            try
            {
                return this.Get<Tbl_Proyectos>();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
