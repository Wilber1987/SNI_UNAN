using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DataBaseModel {
   public class Security_Permissions : EntityClass {
       public int? Id_Permission { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
   }
   public class Security_Permissions_Roles : EntityClass {
       public int? Id_Role { get; set; }
       public int? Id_Permission { get; set; }
       public string? Estado { get; set; }
   }
   public class Security_Roles : EntityClass {
       public int? Id_Role { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
   }
   public class Security_Users : EntityClass {
       public int? Id_User { get; set; }
       public string? Nombres { get; set; }
       public string? Estado { get; set; }
       public string? Descripcion { get; set; }
       public string? Password { get; set; }
       public string? Mail { get; set; }
       public string? Token { get; set; }
       public DateTime? Token_Date { get; set; }
       public DateTime? Token_Expiration_Date { get; set; }
   }
   public class Security_Users_Roles : EntityClass {
       public int? Id_Role { get; set; }
       public int? Id_User { get; set; }
       public string? Estado { get; set; }
   }
}
