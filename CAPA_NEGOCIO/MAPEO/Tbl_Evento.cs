using CAPA_DATOS;
using CAPA_NEGOCIO.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CAPA_NEGOCIO.MAPEO
{
    public class Tbl_Evento : EntityClass
    {
        public int? Id_Evento { get; set; }
        public int? Id_Tipo_Evento { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int? Id_Pais { get; set; }
        public DateTime? Fecha_Inicio { get; set; }
        public DateTime? Fecha_Finalizacion { get; set; }
        public string Modalidad { get; set; }
        public string Modalidad_Ponencia { get; set; }
        public string Link { get; set; }
        public string Datos_Adicionales { get; set; }
        public int? Id_Investigador { get; set; }
        public string Estado { get; set; }
        public Cat_Paises Pais { get; set; }
        [OneToOne(ForeignKeyColumn = "Investigador")]
        public Tbl_InvestigatorProfile Investigador { get; set; }
        public List<Tbl_Participantes_Eventos> Participantes { get; set; }

        public Object SaveEvento()
        {
            try
            {
                if (this.Id_Evento == null)
                {
                    this.Id_Evento = (Int32)this.Save();
                }
                else
                {
                    this.Update("Id_Evento");
                }
                if (this.Participantes != null)
                {
                    Tbl_Participantes_Eventos IdI = new Tbl_Participantes_Eventos();
                    IdI.Id_Evento = this.Id_Evento;                   
                    IdI.Delete();
                    foreach (Tbl_Participantes_Eventos obj in this.Participantes)
                    {
                        if (obj.Id_Investigador != AuthNetCore.User().UserId)
                        {
                            obj.Estado = "PENDIENTE";
                        }else
                        {
                            obj.Estado = "APROBADO";
                        }
                        obj.Id_Evento = this.Id_Evento;
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
        public Tbl_Evento GetEvento()
        {
            ChargeEventData(this);
            return this;
        }       
        public List<Tbl_Evento> GetEventos()
        {
            List<Tbl_Evento> Eventos = this.Get<Tbl_Evento>("Fecha_Inicio > '" +
                DateTime.Now.ToString("yyyy-MM-dd") + "'").
                Where(E => E.Id_Investigador != AuthNetCore.User().UserId).ToList();
            foreach (Tbl_Evento evento in Eventos)
            {
                ChargeEventData(evento);
            }
            return Eventos;
        }
        public List<Tbl_Evento> GetEventosPropiosGestion()
        {
            this.Id_Investigador = AuthNetCore.User().UserId;
            List<Tbl_Evento> Eventos = this.Get<Tbl_Evento>();
            foreach (Tbl_Evento evento in Eventos)
            {
                ChargeEventData(evento);
            }
            return Eventos;
        }
        public List<Tbl_Evento> GetEventosPropios()
        {
            this.Id_Investigador = AuthNetCore.User().UserId;
            List<Tbl_Evento> Eventos = this.Get<Tbl_Evento>("Fecha_Inicio > '" +
                DateTime.Now.ToString("yyyy-MM-dd") + "'");
            foreach (Tbl_Evento evento in Eventos)
            {
                ChargeEventData(evento);
            }
            return Eventos;
        }
        public List<Tbl_Evento> GetEventosInvitados()
        {
            List<Tbl_Evento> Eventos = this.Get_WhereIN<Tbl_Evento>("Id_Evento",
                    new Tbl_Invitaciones()
                    {
                        Id_Investigador = AuthNetCore.User().UserId,
                        Id_Evento = this.Id_Evento,
                        Estado = "ACTIVO"
                    }.Get<Tbl_Invitaciones>().Select(I => I.Id_Evento.ToString()).ToArray()
            ).Where(E => E.Fecha_Inicio > DateTime.Now).ToList();
            foreach (Tbl_Evento evento in Eventos)
            {
                ChargeEventData(evento);
            }
            return Eventos;
        }
        private void ChargeEventData(Tbl_Evento evento)
        {
            evento.Participantes =
                            new Tbl_Participantes_Eventos() { Estado = "APROBADO" }.Get_WhereIN<Tbl_Participantes_Eventos>(
                                    "Id_Evento", new string[] { evento.Id_Evento.ToString() });
        }

    }
    public class Tbl_Participantes_Eventos : EntityClass
    {
        public int? Id_Evento { get; set; }
        public int? Id_Investigador { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }//APROBADO-RECHAZADO-CANCELADO-PENDIENTE
        public int? Id_Tipo_Participacion { get; set; }
        public DateTime? Fecha_Participacion { get; set; }
        public Tbl_Evento Evento { get; set; }
        public Tbl_InvestigatorProfile Investigador { get; set; }
        public Cat_Tipo_Participacion_Eventos Tipo_Participacion { get; set; }
        public Tbl_Participantes_Eventos AprobarParticipacion()
        {
            return this.ChangeEstadoParticipacion("APROBADO");
        }
        public Tbl_Participantes_Eventos RechazarParticipacion()
        {
            return this.ChangeEstadoParticipacion("RECHAZADO");
        }
        public Tbl_Participantes_Eventos CancelarParticipacion()
        {
            return this.ChangeEstadoParticipacion("CANCELADO");
        }
        public Tbl_Participantes_Eventos ChangeEstadoParticipacion(String Estado)
        {
            if (this.Id_Evento != null && this.Id_Investigador != null)
            {
                this.Estado = Estado;
                this.Update(new string[] { "Id_Evento", "Id_Investigador" });
                return this;

            }else
            {
                throw new Exception("Evento no existe");
            }            
        }
    }
    public class Tbl_Invitaciones : EntityClass
    {
        public int? Id_Invitacion { get; set; }
        public int? Id_Investigador { get; set; }
        public int? Id_Evento { get; set; }
        public string Estado { get; set; }
        public DateTime? Fecha_Invitacion { get; set; }
    }
    public class Cat_Tipo_Participacion_Eventos : EntityClass
    {
        public int? Id_Tipo_Participacion { get; set; }
        public string Descripcion { get; set; }
    }
}
