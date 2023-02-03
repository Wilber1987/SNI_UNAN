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
                StringBuilder indexBuilder = AppGenerator.CSharpEnviroment.CSharpIndexBuilder();
                foreach (var schema in SqlADOConexion.SQLM.databaseSchemas())
                {
                    foreach (var schemaType in SqlADOConexion.SQLM.databaseTypes())
                    {
                        StringBuilder entityString, controllerString, jsEntityString;
                        AppGenerator.CSharpEnviroment.setCSharpHeaders(out entityString, out controllerString, schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                        AppGenerator.JsEnviroment.setJsHeaders(out jsEntityString);
                        foreach (var table in SqlADOConexion.SQLM.describeSchema(schema.TABLE_SCHEMA, schemaType.TABLE_TYPE))
                        {
                            if (table.TABLE_NAME == "sysdiagrams")
                            {
                                continue;
                            }
                            //BUILD ENTITY
                            AppGenerator.CSharpEnviroment.mapCSharpEntity(entityString, table);

                            AppGenerator.JsEnviroment.mapJsEntity(jsEntityString, table, schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);

                            //BUILD ENTITY CONTROLLER
                            AppGenerator.CSharpEnviroment.buildApiController(schemaType, controllerString, table);

                            AppGenerator.JsEnviroment.setJsViewBuilder(schema.TABLE_SCHEMA, table.TABLE_NAME, schemaType.TABLE_TYPE);
                            AppGenerator.CSharpEnviroment.CSharpIndexBuilder(indexBuilder, table);

                        }
                        entityString.AppendLine("}");
                        controllerString.AppendLine("   }");
                        controllerString.AppendLine("}");
                        createDataBaseModelFile(entityString.ToString(), schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                        createDataBaseJSModelFile(jsEntityString.ToString(), schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                        createApiControllerFile(controllerString.ToString(), schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                    }
                }
                AppGenerator.Utility.createFile(@"c:\temp\Controllers\SecurityController.cs", AppGenerator.CSharpEnviroment.buildApiSecurityController());
                AppGenerator.Utility.createFile(@"c:\temp\Security\AuthNetcore.cs", AppGenerator.CSharpEnviroment.body);
                AppGenerator.Utility.createFile(@"c:\temp\Pages\LoginView.cshtml", AppGenerator.CSharpEnviroment.loginString);
                AppGenerator.Utility.createFile(@"c:\temp\Pages\Index.cshtml", indexBuilder.ToString());
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        public static void createDataBaseModelFile(string contain, string name, string type)
        {
           AppGenerator.Utility.createFile(@"c:\temp\Model\" + name.ToUpper() + (type == "VIEW" ? "ViewModel.cs" : "DataBaseModel.cs"), contain);

        }

        public static void createDataBaseJSModelFile(string contain, string name, string type)
        {
            AppGenerator.Utility.createFile(@"c:\temp\FrontModel\" + name.ToUpper() + (type == "VIEW" ? "ViewModel.js" : "DataBaseModel.js"), contain);

        }

        public static void createApiControllerFile(string contain, string name, string type)
        {
            AppGenerator.Utility.createFile(@"c:\temp\Controllers\Api" + (type == "VIEW" ? "View" : "Entity") + name.ToUpper() + "Controller.cs", contain);

        }
        
    }
}
