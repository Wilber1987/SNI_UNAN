using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Investigaciones:EntityClass
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
        public string Photo { get; set; }
        public string Estado { get; set; }
        public List<Tbl_Investigaciones_Disciplinas> Disciplinas { get; set; }
        public Object GetInvestigaciones()
        {
            try
            {
                List<Tbl_Investigaciones> Investigaciones = this.Get<Tbl_Investigaciones>();
                foreach (Tbl_Investigaciones inv in Investigaciones)
                {
                    inv.Disciplinas = (new Tbl_Investigaciones_Disciplinas()).Get_WhereIN<Tbl_Investigaciones_Disciplinas>(
                        "Id_Investigacion", new string[] { inv.Id_Investigacion.ToString() } );
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
        public List<Object> TakeInvestigaciones()
        {
            try
            {
                return SqlADOConexion.SQLM.TakeList("Tbl_Investigaciones", this);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
