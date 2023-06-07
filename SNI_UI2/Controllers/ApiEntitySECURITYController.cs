using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SNI_UI2.Controllers;
using CAPA_NEGOCIO.Security;
using System.Collections.Generic;

namespace API.Controllers {
   [Route("api/[controller]/[action]")]
   [ApiController]
   public class  ApiEntitySECURITYController : ControllerBase {
       //Security_Permissions
       [HttpPost]
       [AuthController]
       public List<Security_Permissions> getSecurity_Permissions() {
           return new Security_Permissions().Get<Security_Permissions>();
       }
       [HttpPost]
       [AuthController]
       public object? saveSecurity_Permissions(Security_Permissions inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object? updateSecurity_Permissions(Security_Permissions inst) {
           return inst.Update();
       }
       //Security_Permissions_Roles
       [HttpPost]
       [AuthController]
       public List<Security_Permissions_Roles> getSecurity_Permissions_Roles() {
           return new Security_Permissions_Roles().Get<Security_Permissions_Roles>();
       }
       [HttpPost]
       [AuthController]
       public object? saveSecurity_Permissions_Roles(Security_Permissions_Roles inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object? updateSecurity_Permissions_Roles(Security_Permissions_Roles inst) {
           return inst.Update();
       }
       //Security_Roles
       [HttpPost]
       [AuthController]
       public List<Security_Roles> getSecurity_Roles() {
           return new Security_Roles().Get<Security_Roles>();
       }
       [HttpPost]
       [AuthController]
       public object? saveSecurity_Roles(Security_Roles inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object? updateSecurity_Roles(Security_Roles inst) {
           return inst.Update();
       }
       //Security_Users
       [HttpPost]
       [AuthController]
       public List<Security_Users> getSecurity_Users() {
           return new Security_Users().Get<Security_Users>();
       }
       [HttpPost]
       [AuthController]
       public object? saveSecurity_Users(Security_Users inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object? updateSecurity_Users(Security_Users inst) {
           return inst.Update();
       }
       //Security_Users_Roles
       [HttpPost]
       [AuthController]
       public List<Security_Users_Roles> getSecurity_Users_Roles() {
           return new Security_Users_Roles().Get<Security_Users_Roles>();
       }
       [HttpPost]
       [AuthController]
       public object? saveSecurity_Users_Roles(Security_Users_Roles inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object? updateSecurity_Users_Roles(Security_Users_Roles inst) {
           return inst.Update();
       }
   }
}
