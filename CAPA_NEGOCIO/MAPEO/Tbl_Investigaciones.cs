using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using CAPA_DATOS;
using System.IO;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Investigaciones : EntityClass
    {
        public int? Id_Investigacion { get; set; }
        public string Visibilidad { get; set; }
        public int? Id_Tipo_Investigacion { get; set; }
        public string Titulo { get; set; }
        public string Abstract { get; set; }
        public string Resumen { get; set; }
        public byte[] Repositorio { get; set; }
        public string Referencias { get; set; }
        public string url_publicacion { get; set; }
        public DateTime? Fecha_ejecucion { get; set; }
        public int? Id_Investigador { get; set; }
        public int? Id_Localidad { get; set; }
        //public string Photo { get; set; }
        public string Estado { get; set; }
        public Tbl_InvestigatorProfile Investigador { get; set; }
        public List<Tbl_InvestigatorProfile> Colaboradores { get; set; }
        public List<Tbl_Investigaciones_Disciplinas> Disciplinas { get; set; }
        public Tbl_Investigaciones GetInvestigacion()
        {
            try
            {
                Tbl_Investigaciones Investigacion = GetInvestigaciones()[0];
                List<Tbl_Colaboradores> colaboradores = (new Tbl_Colaboradores()
                {
                    Id_Investigacion = this.Id_Investigacion
                }
                ).Get<Tbl_Colaboradores>();
                Investigacion.Colaboradores = (new Tbl_InvestigatorProfile()).Get_WhereIN<Tbl_InvestigatorProfile>(
                        "Id_Investigador", colaboradores.Select(c => c.Id_Investigador.ToString()).ToArray());
                return Investigacion;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool SaveImage(string ImgStr, string ImgName)
        {
            String path = "";//HttpContext.Current.Server.MapPath("~/ImageStorage"); //Path

            //Check if directory exist
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
            }

            string imageName = ImgName + ".jpg";

            //set the image path
            string imgPath = Path.Combine(path, imageName);

            byte[] imageBytes = Convert.FromBase64String(ImgStr);

            File.WriteAllBytes(imgPath, imageBytes);

            return true;
        }
        public List<Tbl_Investigaciones> GetInvestigaciones()
        {
            try
            {
                List<Tbl_Investigaciones> Investigaciones = this.Get<Tbl_Investigaciones>();
                foreach (Tbl_Investigaciones inv in Investigaciones)
                {
                    inv.Disciplinas = (new Tbl_Investigaciones_Disciplinas()).Get_WhereIN<Tbl_Investigaciones_Disciplinas>(
                        "Id_Investigacion", new string[] { inv.Id_Investigacion.ToString() });

                }
                return Investigaciones;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Object SaveInvestigacion()
        {
            try
            {
                if (this.Id_Investigacion == null)
                {
                    this.Id_Investigacion = (Int32)this.Save();
                }
                else
                {
                    this.Update("Id_Investigacion");
                }
                if (this.Disciplinas != null)
                {
                    Tbl_Investigaciones_Disciplinas IdI = new Tbl_Investigaciones_Disciplinas();
                    IdI.Id_Investigacion = this.Id_Investigacion;
                    IdI.Delete();
                    foreach (Tbl_Investigaciones_Disciplinas obj in this.Disciplinas)
                    {
                        obj.Id_Investigacion = this.Id_Investigacion;
                        obj.Save();
                    }
                }
                return this;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
