using System;
using System.IO;
using System.Text;
using CAPA_DATOS;

namespace AppGenerate
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                SqlADOConexion.IniciarConexionAnonima();
                StringBuilder indexBuilder = new StringBuilder();
                indexBuilder.AppendLine("@page");
                foreach (var schema in SqlADOConexion.SQLM.databaseSchemas())
                {
                    foreach (var schemaType in SqlADOConexion.SQLM.databaseTypes())
                    {
                        StringBuilder entityString, controllerString, jsEntityString;
                        setCSharpHeaders(out entityString, out controllerString, schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                        AppGenerator.JsEnviroment.setJsHeaders(out jsEntityString);
                        foreach (var table in SqlADOConexion.SQLM.describeSchema(schema.TABLE_SCHEMA, schemaType.TABLE_TYPE))
                        {
                            if (table.TABLE_NAME == "sysdiagrams")
                            {
                                continue;
                            }
                            //BUILD ENTITY
                            mapCSharpEntity(entityString, table);

                            AppGenerator.JsEnviroment.mapJsEntity(jsEntityString, table);

                            //BUILD ENTITY CONTROLLER
                            buildApiController(schemaType, controllerString, table);

                            AppGenerator.JsEnviroment.setJsViewBuilder(schema.TABLE_SCHEMA, table.TABLE_NAME, schemaType.TABLE_TYPE);
                            indexBuilder.AppendLine("<a class=\"nav-link text-dark\" asp-area=\"\" asp-page=\"/"+ 
                                (table.TABLE_NAME.Contains("Catalogo") ? "PagesCatalogos" : "PagesViews") + "/"
                                + table.TABLE_NAME + "View\"> "+ table.TABLE_NAME + "</a>");

                        }
                        entityString.AppendLine("}");
                        controllerString.AppendLine("   }");
                        controllerString.AppendLine("}");
                        createDataBaseModelFile(entityString.ToString(), schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                        createDataBaseJSModelFile(jsEntityString.ToString(), schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                        createApiControllerFile(controllerString.ToString(), schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                    }
                }
                AppGenerator.Utility.createFile(@"c:\temp\Controllers\SecurityController.cs", buildApiSecurityController());
                AppGenerator.Utility.createFile(@"c:\temp\Security\AuthNetcore.cs", AppGenerator.CSharpEnviroment.body);
                AppGenerator.Utility.createFile(@"c:\temp\Pages\LoginView.cshtml", AppGenerator.CSharpEnviroment.loginString);
                AppGenerator.Utility.createFile(@"c:\temp\Pages\Index.cshtml", indexBuilder.ToString());
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }



        private static void buildApiController(EntitySchema schemaType, StringBuilder controllerString, EntitySchema table)
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
        private static string buildApiSecurityController()
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
            controllerString.AppendLine("   }");
            controllerString.AppendLine("}");
            return controllerString.ToString();

        }

        private static void mapCSharpEntity(StringBuilder entityString, EntitySchema table)
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

                entityString.AppendLine("       public " + type
                    + "? " + entity.COLUMN_NAME
                    + " { get; set; }");
            }
            foreach (var entity in SqlADOConexion.SQLM.oneToOneKeys(table.TABLE_NAME))
            {
                entityString.AppendLine("       [OneToOne("
                    + "TableName = \""
                    + entity.REFERENCE_TABLE_NAME + "\", "
                    + "KeyColumn = \""
                    + entity.CONSTRAINT_COLUMN_NAME + "\", "
                    + "ForeignKeyColumn = \""
                    + entity.REFERENCE_COLUMN_NAME + "\")]");

                entityString.AppendLine("       public " + entity.REFERENCE_TABLE_NAME
                    + " " + entity.REFERENCE_TABLE_NAME
                    + " { get; set; }");
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
                    + "> " + entity.FKTABLE_NAME
                    + " { get; set; }");
            }
            entityString.AppendLine("   }");
        }

        

        private static void setCSharpHeaders(out StringBuilder entityString, out StringBuilder controllerString, string schema, string type)
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

        private static void createDataBaseModelFile(string contain, string name, string type)
        {
           AppGenerator.Utility.createFile(@"c:\temp\Model\" + name.ToUpper() + (type == "VIEW" ? "ViewModel.cs" : "DataBaseModel.cs"), contain);

        }

        private static void createDataBaseJSModelFile(string contain, string name, string type)
        {
            AppGenerator.Utility.createFile(@"c:\temp\FrontModel\" + name.ToUpper() + (type == "VIEW" ? "ViewModel.js" : "DataBaseModel.js"), contain);

        }

        private static void createApiControllerFile(string contain, string name, string type)
        {
            AppGenerator.Utility.createFile(@"c:\temp\Controllers\Api" + (type == "VIEW" ? "View" : "Entity") + name.ToUpper() + "Controller.cs", contain);

        }
        
    }
}
