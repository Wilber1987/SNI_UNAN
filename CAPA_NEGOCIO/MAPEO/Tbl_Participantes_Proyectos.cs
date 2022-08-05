using CAPA_DATOS;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Participantes_Proyectos: Tbl_Proyectos
    {
        public int? Id_Investigador { get;  set; }
        public DateTime? Fecha_Ingreso { get; set; }
        public string Estado_Participante { get; set; }
        public int? Id_Cargo_Proyecto { get; set; }
        public string Cargo { get; set; }
        public Object Perfil { get; set; }
        public List<Object> TakeParicipantesProyectos()
        {
            return new List<Object>();
            //try
            //{
            //    List<Object> Participantes = SqlADOConexion.SQLM.TakeList("ViewParticipantesProyectos", this);
            //    List<Object> NewList = new List<Object>();
            //    foreach (Object Participante in Participantes)
            //    {
            //        Tbl_InvestigatorProfile NewId = new Tbl_InvestigatorProfile();
            //        Tbl_Participantes_Proyectos ParticipanteInstance = (Tbl_Participantes_Proyectos)Participante;
            //        NewId.Id_Investigador = ParticipanteInstance.Id_Investigador;
            //        ParticipanteInstance.Perfil = NewId.TakeProfile();
            //        NewList.Add(ParticipanteInstance);
            //    }
            //    return NewList;
            //}
            //catch (Exception)
            //{
            //    throw;
            //}
        }
    }
}
