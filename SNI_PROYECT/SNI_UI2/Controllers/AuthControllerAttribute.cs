using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using Microsoft.AspNetCore.Routing;
using CAPA_NEGOCIO.Security;

namespace SNI_UI2.Controllers
{
    public class AuthControllerAttribute : ActionFilterAttribute
    {
        class Authenticate
        {
            public bool AuthVal { get; set; }
        }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!AuthNetCore.Authenticate())
            {
                Authenticate Aut = new Authenticate();            
                Aut.AuthVal = AuthNetCore.Authenticate();
                filterContext.Result = new ObjectResult(false);
            }
        }
    }
}
