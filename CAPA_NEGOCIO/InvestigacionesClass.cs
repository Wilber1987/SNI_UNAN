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
        public string Foto { get; set; }
        public string Photo { get; set; }
        public string Nombres { get; set; }
        public string  Apellidos { get; set; }       
        public string Titulo { get; set; }
        public string Resumen { get; set; }
        public string Abstract { get; set; } 
        public byte[] Repositorio { get; set; }
        public string Descripcion { get; set; }
        public DateTime? Fecha_ejecucion { get; set; }
        public string url_publicacion { get; set; }
        public string NombreInstitucion { get; set; }
        public string País { get; set; }
        public string Nombre_Localidad { get; set; }
        public string Nombre_TipoLocalidad { get; set; }
      
        
        public int? Id_Localidad { get; set; }
        public int? Id_LocalidadPadre { get; set; }
        public List<Object> Colaboradores { get; set; }
        public List<Object> Disciplinas { get; set; }
        //DATOS PARA VIEW ViewInvestigacionesPorDisciplinas
        public int? Id_Disciplina { get; set; }
        public string Disciplina { get; set; }
        public Object TakeInvestigaciones()
        {
            try
            {               

                var Investigaciones = SqlADOConexion.SQLM.TakeList("ViewInvestigaciones", this);
                foreach (var item in Investigaciones)
                {
                    MAPEO.Cat_Disciplinas ModelDis = new MAPEO.Cat_Disciplinas();
                    ModelDis.Id_Investigacion = ((InvestigacionesClass)item).Id_Investigacion;
                    ((InvestigacionesClass)item).Disciplinas = ModelDis.TakeDisciplinasInvestigaciones();
                }
                return Investigaciones;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Object TakeInvestigacionesPorDisciplinas()
        {
            try
            {
                var Investigaciones = SqlADOConexion.SQLM.TakeList("ViewInvestigacionesPorDisciplinas", this);                
                return Investigaciones;
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
                var List = SqlADOConexion.SQLM.TakeList("ViewInvestigaciones", this);
                InvestigacionesClass Investigacion = (InvestigacionesClass)List[0];
                //Colaboradores
                MAPEO.Tbl_Colaboradores ModelCol = new MAPEO.Tbl_Colaboradores();
                ModelCol.Id_Investigacion = this.Id_Investigacion;
                Investigacion.Colaboradores = ModelCol.TakeColaboradores();
                //Disciplinas
                MAPEO.Cat_Disciplinas ModelDis = new MAPEO.Cat_Disciplinas();
                ModelDis.Id_Investigacion = this.Id_Investigacion;
                Investigacion.Disciplinas = ModelDis.TakeDisciplinasInvestigaciones();
                return Investigacion;
            }
            catch (Exception)
            {
                throw;
            }
        }        
    }
}
