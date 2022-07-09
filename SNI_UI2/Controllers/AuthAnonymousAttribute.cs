using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using Microsoft.AspNetCore.Routing;
using CAPA_NEGOCIO.Security;
namespace SNI_UI2.Controllers
{
    public class AuthAnonymousAttribute : ActionFilterAttribute
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
}
