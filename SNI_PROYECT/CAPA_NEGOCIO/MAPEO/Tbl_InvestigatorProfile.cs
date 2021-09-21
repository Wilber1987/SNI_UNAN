using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_InvestigatorProfile
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
        public string NombreInstitucion { get; set; }

        public List<Object> Investigaciones { get; set; }
        public List<Object> Colaboraciones { get; set; }
        public List<Object> Grupos { get; set; }
        public List<Object> Proyectos { get; set; }
        public List<Object> Eventos { get; set; }
        public Object TakeInvestigadorProfile()
        {
            try
            {
                SqlADOConexion.IniciarConexion("sa", "zaxscd");
                var List = SqlADOConexion.SQLM.TakeList("Tbl_InvestigatorProfile", this);
                Tbl_InvestigatorProfile Investigador = (Tbl_InvestigatorProfile)List[0];
                //Investigaciones
                Tbl_Investigaciones ModelInvestigacion = new Tbl_Investigaciones();
                ModelInvestigacion.Id_Investigador = this.Id_Investigador;
                Investigador.Investigaciones = ModelInvestigacion.TakeInvestigaciones();
                //Colaboraciones
                Tbl_Colaboradores ModelCol = new Tbl_Colaboradores();
                ModelCol.Id_Investigador = this.Id_Investigador;
                Investigador.Colaboraciones = ModelCol.TakeColaboradores();
                //Proyectos
                Tbl_Participantes_Proyectos ModelProyectos = new Tbl_Participantes_Proyectos();
                ModelProyectos.Id_Investigador = this.Id_Investigador;
                Investigador.Proyectos = ModelProyectos.TakeParicipantesProyectos();

                return Investigador;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
