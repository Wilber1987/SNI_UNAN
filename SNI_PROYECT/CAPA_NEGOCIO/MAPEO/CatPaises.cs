using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO
{
    public class CatPaises
    {
        private string TableName = "Cat_Paises";
        public int Id_Pais { get; set; }
        public string Estado { get; set; }
        public string Descripcion { get; set; }

        public Object Save(CatPaises Inst)
        {
            try
            {
                if (Inst.Id_Pais == -1)
                {
                    return SqlADOConexion.SQLM.InsertObject(TableName, Inst);
                } else
                {
                    return SqlADOConexion.SQLM.UpdateObject(TableName, Inst, "Id_Pais");
                }               
            }
            catch (Exception)
            {
                throw;
            }
        }
        //public Object GetPaises(CatPaises Inst)
        //{
        //    try
        //    {
        //        SqlADOConexion.IniciarConexion("sa", "zaxscd");
        //        return SqlADOConexion.SQLM.TakeList(TableName, Inst, null);
        //    }
        //    catch (Exception) 
        //    {
        //        throw;
        //    }
        //}
    }
}
