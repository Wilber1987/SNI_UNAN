using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CAPA_DATOS;

namespace AppGenerator
{
    public class CSharpEnviroment
    {
        public static string body = @"using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CAPA_DATOS;
using DataBaseModel;

namespace Security
{
    public class AuthNetCore
    {
        static private string SGBD_SERVER = server;
        static private string SWGBD_BD = bd;
        static private string SGBD_USER = dbuser;
        static private string SWGBD_PASSWORD = dbpassword;
        static public bool AuthAttribute = false;
        static private Security_Users security_User;
        static public bool Authenticate()
        {
            if (SqlADOConexion.SQLM == null || SqlADOConexion.Anonimo || security_User == null)
            {
                security_User = null;
                SqlADOConexion.SQLM = null;
                return false;
            }
            return true;

        }
        static public bool AnonymousAuthenticate()
        {
            SqlADOConexion.IniciarConexionAnonima();
            return true;
        }
        static public bool loginIN(string mail, string password)
        {
            if (mail == null || password == null) throw new Exception();
            try
            {
                SqlADOConexion.IniciarConexionSNIBD(SGBD_USER, SWGBD_PASSWORD);
                security_User = new Security_Users()
                {
                    Mail = mail,
                    Password = password
                }.Find<Security_Users>();
                if (security_User.Id_User == null)
                {
                    security_User = null;
                    SqlADOConexion.SQLM = null;
                    throw new Exception();
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        static public bool ClearSeason()
        {
            SqlADOConexion.SQLM = null;
            security_User = null;
            return true;

        }

        public static bool HavePermission(string permission)
        {
            if (Authenticate())
            {
                var roleHavePermision = security_User.Security_Users_Roles.Where(r => RoleHavePermission(permission, r).Count != 0).ToList();
                if (roleHavePermision.Count != 0) return true;
                return false;
            }
            else
            {
                return false;
            }
        }

        private static List<Security_Permissions_Roles> RoleHavePermission(string permission, Security_Users_Roles r)
        {
            return r.Security_Role.Security_Permissions_Roles.Where(p => p.Security_Permissions.Descripcion == permission).ToList();
        }
    }
}
";

        public static string loginString = @"@page
@{
     Layout = null;
}
<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8' />
        <title> Login </title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>  
        <script type='module'>
            import { WRender, WAjaxTools } from './WDevCore/WModules/WComponentsTools.js';
            import { WSecurity } from './WDevCore/WModules/WSecurity.js';
            import { WForm } from './WDevCore/WComponents/WForm.js';

            const OnLoad = async () => {                
                const LoginForm = new WForm({
                    ModelObject: { Mail: { type: 'email'}, Password: { type: 'password' } } ,
                    SaveFunction: async (UserData) => { 
                        WSecurity.Login(UserData, window.location.origin)
                    }
                });
                App.appendChild(LoginForm);
            }
            window.onload = OnLoad;

        </script>
    </head>
    <body id='App'>
    </body>
</html>";

        public static StringBuilder CSharpIndexBuilder()
        {
            StringBuilder indexBuilder = new StringBuilder();
            indexBuilder.AppendLine("@page");
            indexBuilder.AppendLine(@"@using API.Controllers
@{
    if (!SecurityController.Auth())
    {
        Response.Redirect(" + "\"../LoginView\");" + @"
        return;
    }
    if (!SecurityController.HavePermission(" + "\"HOME_ACCESS\"))" + @"
    {
        //Response.Redirect(" + "\"../permission_error\");" + @"
        //return;
    }
}");
            return indexBuilder;
        }

        public static void CSharpIndexBuilder(StringBuilder indexBuilder, EntitySchema table)
        {
            if (table.TABLE_NAME.ToLower().StartsWith("relational") || table.TABLE_NAME.ToLower().StartsWith("detail"))
            {
                return;
            }
            indexBuilder.AppendLine("<a class=\"nav-link text-dark\" asp-area=\"\" asp-page=\"/" +
                (table.TABLE_NAME.Contains("Catalogo") ? "PagesCatalogos" : "PagesViews") + "/"
                + table.TABLE_NAME + "View\"> " + table.TABLE_NAME + "</a>");
        }

        public static string buildApiSecurityController()
        {
            StringBuilder controllerString = new StringBuilder();
            controllerString.AppendLine("using DataBaseModel;");
            controllerString.AppendLine("using Security;");
            controllerString.AppendLine("using Microsoft.AspNetCore.Http;");
            controllerString.AppendLine("using Microsoft.AspNetCore.Mvc;");


            controllerString.AppendLine("namespace API.Controllers {");
            controllerString.AppendLine("   [Route(\"api/[controller]/[action]\")]");
            controllerString.AppendLine("   [ApiController]");
            controllerString.AppendLine("   public class SecurityController : ControllerBase {");
            controllerString.AppendLine("       [HttpPost]");
            controllerString.AppendLine("       public object Login(Security_Users Inst) {");
            controllerString.AppendLine("           return AuthNetCore.loginIN(Inst.Mail, Inst.Password);");
            controllerString.AppendLine("       }");
            controllerString.AppendLine("       public  static bool Auth() {");
            controllerString.AppendLine("           return AuthNetCore.Authenticate();");
            controllerString.AppendLine("       }");
            controllerString.AppendLine("       public  static bool HavePermission(string permission) {");
            controllerString.AppendLine("           return AuthNetCore.HavePermission(permission);");
            controllerString.AppendLine("       }");
            controllerString.AppendLine("   }");

            controllerString.AppendLine("}");
            return controllerString.ToString();

        }

        public static void buildApiController(EntitySchema schemaType, StringBuilder controllerString, EntitySchema table)
        {
            controllerString.AppendLine("       //" + table.TABLE_NAME);
            controllerString.AppendLine("       [HttpPost]");
            controllerString.AppendLine("       [AuthController]");
            controllerString.AppendLine("       public List<" + table.TABLE_NAME + "> get" + table.TABLE_NAME + "() {");
            controllerString.AppendLine("           return new " + table.TABLE_NAME + "().Get<" + table.TABLE_NAME + ">();");
            controllerString.AppendLine("       }");
            if (schemaType.TABLE_TYPE == "BASE TABLE")
            {
                controllerString.AppendLine("       [HttpPost]");
                controllerString.AppendLine("       [AuthController]");
                controllerString.AppendLine("       public object save" + table.TABLE_NAME + "(" + table.TABLE_NAME + " inst) {");
                controllerString.AppendLine("           return inst.Save();");
                controllerString.AppendLine("       }");
                controllerString.AppendLine("       [HttpPost]");
                controllerString.AppendLine("       [AuthController]");
                controllerString.AppendLine("       public object update" + table.TABLE_NAME + "(" + table.TABLE_NAME + " inst) {");
                controllerString.AppendLine("           return inst.Update();");
                controllerString.AppendLine("       }");
            }
        }

        public static void mapCSharpEntity(StringBuilder entityString, EntitySchema table)
        {
            entityString.AppendLine("   public class " + table.TABLE_NAME + " : EntityClass {");
            foreach (var entity in SqlADOConexion.SQLM.describeEntity(table.TABLE_NAME))
            {
                string type = "";
                switch (entity.DATA_TYPE)
                {
                    case "int": type = "int"; break;
                    case "smallint": type = "short"; break;
                    case "bigint": type = "long"; break;
                    case "decimal": type = "Double"; break;
                    case "money": type = "Double"; break;
                    case "float": type = "Double"; break;
                    case "char": type = "string"; break;
                    case "nchar": type = "string"; break;
                    case "varchar": type = "string"; break;
                    case "nvarchar": type = "string"; break;
                    case "uniqueidentifier": type = "string"; break;
                    case "datetime": type = "DateTime"; break;
                    case "date": type = "DateTime"; break;
                    case "bit": type = "bool"; break;
                }

                if (SqlADOConexion.SQLM.isPrimary(table.TABLE_NAME, entity.COLUMN_NAME))
                {
                    var columnProps = SqlADOConexion.SQLM.describePrimaryKey(table.TABLE_NAME, entity.COLUMN_NAME);
                    entityString.AppendLine("       [PrimaryKey(Identity = " +  columnProps != null ? "true" : "false" +")]");                  
                }
                entityString.AppendLine("       public " + type
                                     + "? " + entity.COLUMN_NAME
                                     + " { get; set; }");

            }
            foreach (var entity in SqlADOConexion.SQLM.ManyToOneKeys(table.TABLE_NAME))
            {

                //var oneToMany = SqlADOConexion.SQLM.oneToManyKeys(entity.REFERENCE_TABLE_NAME);
                //var find = oneToMany.Find(o => o.FKTABLE_NAME == table.TABLE_NAME);
                //if (find == null)
                //{
                entityString.AppendLine("       [ManyToOne("
                                  + "TableName = \""
                                  + entity.REFERENCE_TABLE_NAME + "\", "
                                  + "KeyColumn = \""
                                  + entity.CONSTRAINT_COLUMN_NAME + "\", "
                                  + "ForeignKeyColumn = \""
                                  + entity.REFERENCE_COLUMN_NAME + "\")]");
                entityString.AppendLine("       public " + entity.REFERENCE_TABLE_NAME
                    + "? " + entity.REFERENCE_TABLE_NAME
                    + " { get; set; }");
                //}

            }
            foreach (var entity in SqlADOConexion.SQLM.oneToManyKeys(table.TABLE_NAME))
            {
                entityString.AppendLine("       [OneToMany("
                    + "TableName = \""
                    + entity.FKTABLE_NAME + "\", "
                    + "KeyColumn = \""
                    + entity.PKCOLUMN_NAME + "\", "
                    + "ForeignKeyColumn = \""
                    + entity.FKCOLUMN_NAME + "\")]");

                entityString.AppendLine("       public List<" + entity.FKTABLE_NAME
                    + ">? " + entity.FKTABLE_NAME
                    + " { get; set; }");
            }
            entityString.AppendLine("   }");
        }

        public static void setCSharpHeaders(out StringBuilder entityString, out StringBuilder controllerString, string schema, string type)
        {
            entityString = new StringBuilder();
            entityString.AppendLine("using CAPA_DATOS;");
            entityString.AppendLine("using System;");
            entityString.AppendLine("using System.Collections.Generic;");
            entityString.AppendLine("using System.Linq;");
            entityString.AppendLine("using System.Text;");
            entityString.AppendLine("using System.Threading.Tasks;");

            entityString.AppendLine("namespace DataBaseModel {");

            controllerString = new StringBuilder();
            controllerString.AppendLine("using DataBaseModel;");
            controllerString.AppendLine("using Security;");
            controllerString.AppendLine("using Microsoft.AspNetCore.Http;");
            controllerString.AppendLine("using Microsoft.AspNetCore.Mvc;");


            controllerString.AppendLine("namespace API.Controllers {");
            controllerString.AppendLine("   [Route(\"api/[controller]/[action]\")]");
            controllerString.AppendLine("   [ApiController]");

            controllerString.AppendLine("   public class  Api" + (type == "VIEW" ? "View" : "Entity") + schema.ToUpper() + "Controller : ControllerBase {");
        }
        public static void createCSharpView(string name)
        {
            if (name.ToLower().StartsWith("relational") || name.ToLower().StartsWith("detail"))
            {
                return;
            }
            var pageString = new StringBuilder();
            pageString.AppendLine(@"@page
@using API.Controllers
@{
    if (!SecurityController.Auth())
    {
        Response.Redirect(" + "\"../LoginView\");" + @"
        return;
    }
    if (!SecurityController.HavePermission(" + "\"HOME_ACCESS\"))" + @"
    {
        //Response.Redirect(" + "\"../permission_error\");" + @"
        //return;
    }
}
<script src='~/Views/" + name + @"View.js' type='module'></script>
<div id='MainBody'></div>");
            AppGenerator.Utility.createFile(@"c:\temp\" + (name.Contains("Catalogo") ? "PagesCatalogos" : "PagesViews") + "\\" + name + "View.cshtml", pageString.ToString());
        }

    }

}
