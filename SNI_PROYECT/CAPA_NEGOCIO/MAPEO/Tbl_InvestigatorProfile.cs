using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_InvestigatorProfile: EntityClass
    {
        private List<Tbl_Distinciones> distinciones;

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
        public List<Object> RedesSociales { get; set; }
        public List<Object> Idiomas { get; set; }
        public List<ProyectoTableDependencias_Usuarios> Dependencias { get; set; }
        public List<Tbl_Formacion_Academica> FormacionAcademica { get; set; }
        public List<Tbl_Patentes> patentes { get;  set; }
        public List<Tbl_Datos_Laborales> datosLaborales { get;  set; }
        public List<Tbl_Evento> eventosIN { get;  set; }

        public List<Object> TakeDepCoordinaciones()
        {
            ProyectoTableDependencias_Usuarios DU = new ProyectoTableDependencias_Usuarios();
            DU.Id_Investigador = this.Id_Investigador;
            return DU.Get_WhereIN("IdCargo", new string[] { "1", "2" });
        }
        public Object TakeProfile()
        {
            try
            {
                var List = SqlADOConexion.SQLM.TakeList("Tbl_InvestigatorProfile", this);
                Tbl_InvestigatorProfile Investigador = (Tbl_InvestigatorProfile)List[0];
                return Investigador;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public Object TakeInvestigadorProfile()
        {
            try
            {
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
                //Idiomas
                Cat_Idiomas ModelIdiom = new Cat_Idiomas();
                ModelIdiom.Id_Investigador = this.Id_Investigador;
                Investigador.Idiomas = ModelIdiom.TakeIdiomasInv();
                //RedesSociales
                CatRedesSociales ModelRedes = new CatRedesSociales();
                ModelRedes.Id_Investigador = this.Id_Investigador;
                Investigador.RedesSociales = ModelRedes.TakeRedesInv();

                //Formacion Academica
                Tbl_Formacion_Academica Fa = new Tbl_Formacion_Academica();
                Fa.Id_Investigador = this.Id_Investigador;
                Investigador.FormacionAcademica = Fa.Get<Tbl_Formacion_Academica>();

                Tbl_Patentes tbl_Patentes = new Tbl_Patentes();
                tbl_Patentes.Id_Investigador = this.Id_Investigador;
                Investigador.patentes = tbl_Patentes.Get<Tbl_Patentes>();

                Tbl_Datos_Laborales dl = new Tbl_Datos_Laborales();
                dl.Id_Investigador = this.Id_Investigador;
                Investigador.datosLaborales = dl.Get<Tbl_Datos_Laborales>();

                Tbl_Evento tbl_Evento = new Tbl_Evento();
                tbl_Evento.Id_Investigador = this.Id_Investigador;
                Investigador.eventosIN = tbl_Evento.Get<Tbl_Evento>();

                Tbl_Distinciones tbl_Distinciones = new Tbl_Distinciones();
                tbl_Distinciones.Id_Investigador = this.Id_Investigador;
                Investigador.distinciones = tbl_Distinciones.Get<Tbl_Distinciones>();

                return Investigador;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
