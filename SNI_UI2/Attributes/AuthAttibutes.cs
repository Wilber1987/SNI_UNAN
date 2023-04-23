using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using CAPA_NEGOCIO.Security;

namespace SNI_UI2.Controllers
{
    public class AuthControllerAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!AuthNetCore.Authenticate())
            {
                Authenticate Aut = new Authenticate();
                Aut.AuthVal = AuthNetCore.Authenticate();
                filterContext.Result = new ObjectResult(Aut);
            }
        }
    }

    public class AdminAuthAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!AuthNetCore.HavePermission(PermissionsEnum.ADMIN_ACCESS.ToString()))
            {
                Authenticate Aut = new Authenticate();
                Aut.AuthVal = false;
                Aut.Message = "Inaccessible resource";
                filterContext.Result = new ObjectResult(Aut);
            }
        }
    }
    public class AnonymousAuthAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!AuthNetCore.Authenticate())
            {
                if (!AuthNetCore.Authenticate())
                {
                    AuthNetCore.AnonymousAuthenticate();
                }
            }
        }
    }
    class Authenticate
    {
        public bool AuthVal { get; set; }
        public string? Message { get; set; }
    }
}
