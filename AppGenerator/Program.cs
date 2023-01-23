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
                foreach (var schema in SqlADOConexion.SQLM.databaseSchemas())
                {
                    foreach (var schemaType in SqlADOConexion.SQLM.databaseTypes())
                    {
                        StringBuilder entityString, controllerString, jsEntityString;
                        setCSharpHeaders(out entityString, out controllerString);
                        setJsHeaders(out jsEntityString);
                        foreach (var table in SqlADOConexion.SQLM.describeSchema(schema.TABLE_SCHEMA, schemaType.TABLE_TYPE))
                        {
                            //BUILD ENTITY
                            mapCSharpEntity(entityString, table);

                            mapJsEntity(jsEntityString, table);

                            //BUILD ENTITY CONTROLLER
                            buildApiController(schemaType, controllerString, table);

                        }
                        entityString.AppendLine("}");
                        controllerString.AppendLine("   }");
                        controllerString.AppendLine("}");
                        createDataBaseModelFile(entityString.ToString(), schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                        createDataBaseJSModelFile(controllerString.ToString(), schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);
                        createApiControllerFile(controllerString.ToString(), schema.TABLE_SCHEMA, schemaType.TABLE_TYPE);

                    }
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        private static void setJsHeaders(out StringBuilder entityString)
        {
            entityString = new StringBuilder();
            entityString.AppendLine("import { EntityClass } from \"../WDevCore/WModules/EntityClass.js\";");
            entityString.AppendLine("import { WAjaxTools } from \".. /WDevCore/WModules/WComponentsTools.js\";");
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
                    + " " + entity.COLUMN_NAME
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

        private static void mapJsEntity(StringBuilder entityString, EntitySchema table)
        {
            entityString.AppendLine("class " + table.TABLE_NAME + " extends EntityClass {");
            entityString.AppendLine("   constructor(props) {");
            entityString.AppendLine("       super();");
            entityString.AppendLine("       for (const prop in props) {");
            entityString.AppendLine("           this[prop] = props[prop];");
            entityString.AppendLine("       }");
            entityString.AppendLine("   }");
            foreach (var entity in SqlADOConexion.SQLM.describeEntity(table.TABLE_NAME))
            {
                string type = "";
                switch (entity.DATA_TYPE)
                {
                    case "int": type = "number"; break;
                    case "smallint": type = "number"; break;
                    case "bigint": type = "number"; break;
                    case "decimal": type = "number"; break;
                    case "money": type = "number"; break;
                    case "float": type = "number"; break;
                    case "char": type = "text"; break;
                    case "nchar": type = "text"; break;
                    case "varchar": type = "text"; break;
                    case "nvarchar": type = "text"; break;
                    case "uniqueidentifier": type = "text"; break;
                    case "datetime": type = "date"; break;
                    case "date": type = "date"; break;
                    case "bit": type = "checkbox"; break;
                }

                entityString.AppendLine("   " + entity.COLUMN_NAME + " = { type: '"+type+"' };");
            }
            foreach (var entity in SqlADOConexion.SQLM.oneToOneKeys(table.TABLE_NAME))
            {
                entityString.AppendLine("   " + entity.REFERENCE_TABLE_NAME + " = { type: 'Model',  ModelObject: new "+ entity.REFERENCE_TABLE_NAME + "()};");
            }
            foreach (var entity in SqlADOConexion.SQLM.oneToManyKeys(table.TABLE_NAME))
            {                
                entityString.AppendLine("   " + entity.FKTABLE_NAME + " = { type: 'MasterDetail',  ModelObject: new " + entity.FKTABLE_NAME + "()};");
            }
            entityString.AppendLine("}");
            entityString.AppendLine("export { "+ table.TABLE_NAME + " }");
        }

        private static void setCSharpHeaders(out StringBuilder entityString, out StringBuilder controllerString)
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
            controllerString.AppendLine("using CAPA_NEGOCIO.MAPEO;");
            controllerString.AppendLine("using Microsoft.AspNetCore.Http;");
            controllerString.AppendLine("using Microsoft.AspNetCore.Mvc;");

            controllerString.AppendLine("[Route(\"api/[controller]/[action]\")]");
            controllerString.AppendLine("[ApiController]");
            controllerString.AppendLine("[ApiController]");
            controllerString.AppendLine("namespace MODEL.Controllers {");
            controllerString.AppendLine("   public class EntityController : ControllerBase {");
        }

        private static void createDataBaseModelFile(string contain, string name, string type)
        {
            createFile(@"c:\temp\" + name.ToUpper() + (type == "VIEW" ? "ViewModel.cs" : "DataBaseModel.cs"), contain);

        }

        private static void createDataBaseJSModelFile(string contain, string name, string type)
        {
            createFile(@"c:\temp\" + name.ToUpper() + (type == "VIEW" ? "ViewModel.cs" : "DataBaseModel.js"), contain);

        }

        private static void createApiControllerFile(string contain, string name, string type)
        {
            createFile(@"c:\temp\Api"  + (type == "VIEW" ? "View" : "Entity") + name.ToUpper() + "Controller.cs", contain);

        }
        private static void createFile(string path, string text)
        {
            DirectoryInfo di = Directory.CreateDirectory(@"c:\temp");
            // Create the file, or overwrite if the file exists.
            using (FileStream fs = File.Create(path))
            {
                byte[] info = new UTF8Encoding(true).GetBytes(text);
                // Add some information to the file.
                fs.Write(info, 0, info.Length);
            }

            // Open the stream and read it back.
            using (StreamReader sr = File.OpenText(path))
            {
                string s = "";
                while ((s = sr.ReadLine()) != null)
                {
                    Console.WriteLine(s);
                }
            }
        }
    }
}
