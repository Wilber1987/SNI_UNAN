using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_InvestigatorProfile : EntityClass
    {

        public int? Id_Investigador { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public DateTime? FechaNac { get; set; }
        public int? IdUser { get; set; }
        public string Sexo { get; set; }
        public string Foto { get; set; }
        public string DNI { get; set; }
        public string Correo_institucional { get; set; }
        public int? Id_Pais_Origen { get; set; }
        public int? Id_Institucion { get; set; }
        public string Indice_H { get; set; }
        public string Estado { get; set; }
        public string NombreInstitucion { get; set; }     

        public List<Tbl_Investigaciones> Investigaciones { get; set; }
        public List<Object> Colaboraciones { get; set; }
        public List<Object> Grupos { get; set; }
        public List<Object> Proyectos { get; set; }
        public List<CatRedesSociales> RedesSociales { get; set; }
        public List<Object> Idiomas { get; set; }
        public List<Tbl_IdiomasInv> Id_Idiomas { get; set; }
        public List<ProyectoTableDependencias_Usuarios> Dependencias { get; set; }
        public List<Tbl_Formacion_Academica> FormacionAcademica { get; set; }
        public List<Tbl_Patentes> Patentes { get; set; }
        public List<Tbl_Datos_Laborales> DatosLaborales { get; set; }
        public List<Tbl_Evento> Eventos { get; set; }
        public List<Tbl_Distinciones> Distinciones { get; set; }
        public List<TblProcesosEditoriales> ProcesosEditoriales { get; set; }


        public List<ProyectoTableDependencias_Usuarios> TakeDepCoordinaciones()
        {
            ProyectoTableDependencias_Usuarios DU = new ProyectoTableDependencias_Usuarios();
            DU.Id_Investigador = this.Id_Investigador;
            return DU.Get_WhereIN<ProyectoTableDependencias_Usuarios>("Id_Cargo", new string[] { "1", "2" });
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
                Investigador.Investigaciones = ModelInvestigacion.Get<Tbl_Investigaciones>();
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
                Investigador.Patentes = tbl_Patentes.Get<Tbl_Patentes>();

                Tbl_Datos_Laborales dl = new Tbl_Datos_Laborales();
                dl.Id_Investigador = this.Id_Investigador;
                Investigador.DatosLaborales = dl.Get<Tbl_Datos_Laborales>();

                Tbl_Evento tbl_Evento = new Tbl_Evento();
                tbl_Evento.Id_Investigador = this.Id_Investigador;
                Investigador.Eventos = tbl_Evento.Get<Tbl_Evento>();

                Tbl_Distinciones tbl_Distinciones = new Tbl_Distinciones();
                tbl_Distinciones.Id_Investigador = this.Id_Investigador;
                Investigador.Distinciones = tbl_Distinciones.Get<Tbl_Distinciones>();

                Investigador.ProcesosEditoriales =
                    (new TblProcesosEditoriales()).Get_WhereIN<TblProcesosEditoriales>(
                        "Id_Investigador", new string[] { this.Id_Investigador.ToString() }
                        );
                return Investigador;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public Object Postularse()
        {
            try
            {
                this.Estado = "POSTULANTE";
                SaveProfile();
                return true;
            }
            catch (Exception) { return false; }

        }
        public Object SaveProfile()
        {
            if (this.Id_Investigador == null)
            {
                this.Id_Investigador = (Int32)this.Save();
            }
            else
            {
                this.Update("Id_Investigador");
            }
            if (this.Id_Idiomas != null)
            {
                Tbl_IdiomasInv IdI = new Tbl_IdiomasInv();
                IdI.Id_Investigador = this.Id_Investigador;
                IdI.Delete();
                foreach (Tbl_IdiomasInv obj in this.Id_Idiomas)
                {
                    obj.Id_Investigador = this.Id_Investigador;
                    obj.Save();
                }
            }
            if (this.FormacionAcademica != null)
            {
                foreach (Tbl_Formacion_Academica obj in this.FormacionAcademica)
                {
                    obj.Id_Investigador = this.Id_Investigador;
                    obj.Save();
                }
            }
            if (this.DatosLaborales != null)
            {
                foreach (Tbl_Datos_Laborales obj in this.DatosLaborales)
                {
                    obj.Id_Investigador = this.Id_Investigador;
                    obj.Save();
                }
            }
            if (this.Investigaciones != null)
            {
                foreach (Tbl_Investigaciones obj in this.Investigaciones)
                {
                    obj.Id_Investigador = this.Id_Investigador;
                    obj.Save();
                }
            }
            if (this.Id_Idiomas != null)
            {
            }
            if (this.Id_Idiomas != null)
            {
            }
            return this;
        }
    }
}
