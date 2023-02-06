using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CAPA_DATOS;

namespace AppGenerator
{
    internal class JsEnviroment
    {
        public static void setJsHeaders(out StringBuilder entityString)
        {
            entityString = new StringBuilder();
            entityString.AppendLine("import { EntityClass } from \"../WDevCore/WModules/EntityClass.js\";");
            entityString.AppendLine("import { WAjaxTools } from \"../WDevCore/WModules/WComponentsTools.js\";");
        }
        public static void mapJsEntity(StringBuilder entityString, EntitySchema table, string schema, string typeshema)
        {
            entityString.AppendLine("class " + table.TABLE_NAME + " extends EntityClass {");
            entityString.AppendLine("   constructor(props) {");
            entityString.AppendLine("       super(props, '" + (typeshema == "VIEW" ? "View" : "Entity") + schema.ToUpper() + "');");
            entityString.AppendLine("       for (const prop in props) {");
            entityString.AppendLine("           this[prop] = props[prop];");
            entityString.AppendLine("       }");
            entityString.AppendLine("   }");
            //entityString.AppendLine("   Namespace = '" + (typeshema == "VIEW" ? "View" : "Entity") + schema.ToUpper() + "';");
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
                if (!SqlADOConexion.SQLM.isForeinKey(table.TABLE_NAME, entity.COLUMN_NAME))
                {
                    entityString.AppendLine("   " + entity.COLUMN_NAME + " = { type: '" + type + "'"
                    + (SqlADOConexion.SQLM.isPrimary(table.TABLE_NAME, entity.COLUMN_NAME) ? ", primary: true" : "") + " };");
                }

            }
            foreach (var entity in SqlADOConexion.SQLM.ManyToOneKeys(table.TABLE_NAME))
            {
                var oneToMany = SqlADOConexion.SQLM.oneToManyKeys(entity.REFERENCE_TABLE_NAME);
                var find = oneToMany.Find(o => o.FKTABLE_NAME == table.TABLE_NAME);
                string controlType = "WSELECT";
                if (entity.REFERENCE_TABLE_NAME.ToLower().StartsWith("catalogo") || entity.REFERENCE_TABLE_NAME.ToLower().StartsWith("catalog"))
                {
                    controlType = "WSELECT";
                    entityString.AppendLine("   " + entity.REFERENCE_TABLE_NAME + " = { type: '" + controlType
                       + "',  ModelObject: ()=> new " + entity.REFERENCE_TABLE_NAME + "()};");
                    continue;
                }
                else if (entity.REFERENCE_TABLE_NAME.ToLower().StartsWith("detail") || entity.REFERENCE_TABLE_NAME.ToLower().StartsWith("detalle"))
                {
                    //controlType = "WSELECT";
                }
                else if (entity.REFERENCE_TABLE_NAME.ToLower().StartsWith("transaction"))
                {
                    controlType = "Model";
                    if (table.TABLE_NAME.ToLower().StartsWith("transaction"))
                    {
                        controlType = "WSELECT";
                    }
                    if (!table.TABLE_NAME.ToLower().StartsWith("detail")  && !table.TABLE_NAME.ToLower().StartsWith("catalogo"))
                    {
                        entityString.AppendLine("   " + entity.REFERENCE_TABLE_NAME + " = { type: '" + controlType
                            + "',  ModelObject: ()=> new " + entity.REFERENCE_TABLE_NAME + "()};");
                    }
                    continue;
                }
                else if (entity.REFERENCE_TABLE_NAME.ToLower().StartsWith("relational") || entity.REFERENCE_TABLE_NAME.ToLower().StartsWith("relacional"))
                {
                    controlType = "Model";
                    entityString.AppendLine("   " + entity.REFERENCE_TABLE_NAME + " = { type: '" + controlType
                            + "',  ModelObject: ()=> new " + entity.REFERENCE_TABLE_NAME + "()};");
                    controlType = "Model";
                    continue;
                }          

            }
            foreach (var entity in SqlADOConexion.SQLM.oneToManyKeys(table.TABLE_NAME))
            {
                string mapType = "MasterDetail";
                if (entity.FKTABLE_NAME.StartsWith("Catalogo") || (table.TABLE_NAME.ToLower().StartsWith("transaction")
                    && entity.FKTABLE_NAME.ToLower().StartsWith("transaction")))
                {
                    mapType = "WMULTYSELECT";
                }
                if (!table.TABLE_NAME.ToLower().StartsWith("catalogo") 
                    || !table.TABLE_NAME.ToLower().StartsWith("transaction") 
                    || entity.FKTABLE_NAME.ToLower().StartsWith("relational"))
                {
                    entityString.AppendLine("   " + entity.FKTABLE_NAME + " = { type: '" + mapType + "',  ModelObject: ()=> new " + entity.FKTABLE_NAME + "()};");
                }
            }
            entityString.AppendLine("}");
            entityString.AppendLine("export { " + table.TABLE_NAME + " }");
        }
        public static void setJsViewBuilder(string schema, string name, string type)
        {
            if (name.ToLower().StartsWith("relational") || name.ToLower().StartsWith("detail"))
            {
                return;
            }
            var entityString = new StringBuilder();
            entityString.AppendLine("import { WRender, ComponentsManager, WAjaxTools } from \"../WDevCore/WModules/WComponentsTools.js\";");
            entityString.AppendLine("import { StylesControlsV2, StyleScrolls } from \"../WDevCore/StyleModules/WStyleComponents.js\"");
            entityString.AppendLine("import { WTableComponent } from \"../WDevCore/WComponents/WTableComponent.js\"");
            entityString.AppendLine("import { " + name + " } from \"../FrontModel/" + schema.ToUpper() + (type == "VIEW" ? "ViewModel.js\"" : "DataBaseModel.js\""));
            entityString.AppendLine("class " + name + "View extends HTMLElement {");
            entityString.AppendLine("   constructor(props) {");
            entityString.AppendLine("       super();");
            entityString.AppendLine("       this.TabContainer = WRender.createElement({ type: 'div', props: { class: 'TabContainer', id: 'TabContainer' } })");
            entityString.AppendLine("       this.MainComponent = new WTableComponent({ ModelObject: new " + name + "(), Dataset: [], Options: {");
            if (type != "VIEW")
            {
                entityString.AppendLine("           Add: true, UrlAdd: \"../api/Api" + (type == "VIEW" ? "View" : "Entity") + schema.ToUpper() + "/save" + name + "\",");
                entityString.AppendLine("           Edit: true, UrlUpdate: \"../api/Api" + (type == "VIEW" ? "View" : "Entity") + schema.ToUpper() + "/update" + name + "\",");
            }

            entityString.AppendLine("           Search: true, UrlSearch: \"../api/Api" + (type == "VIEW" ? "View" : "Entity") + schema.ToUpper() + "/get" + name + "\"");
            entityString.AppendLine("       }})");
            entityString.AppendLine("       this.TabContainer.append(this.MainComponent)");
            entityString.AppendLine("       this.append(");
            entityString.AppendLine("           StylesControlsV2.cloneNode(true),");
            entityString.AppendLine("           StyleScrolls.cloneNode(true),");
            entityString.AppendLine("           this.TabContainer");
            entityString.AppendLine("       );");
            entityString.AppendLine("   }");
            entityString.AppendLine("}");
            entityString.AppendLine("customElements.define('w-" + name.ToLower() + "', " + name + "View );");
            entityString.AppendLine(@"window.addEventListener('load', async () => {  MainBody.append(new " + name + @"View())  })");

            AppGenerator.CSharpEnviroment.createCSharpView(name);
            AppGenerator.Utility.createFile(@"c:\temp\Views\" + name + "View.js", entityString.ToString());

        }
    }
}
