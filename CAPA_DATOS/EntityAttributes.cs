using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CAPA_DATOS
{
    
    public class OneToMany : Attribute
    {
        public string TableName { get; set; }
        public string KeyColumn { get; set; }
        public string ForeignKeyColumn { get; set; }
    }
    public class ManyToOne : Attribute
    {
        public string TableName { get; set; }
        public string KeyColumn { get; set; }
        public string ForeignKeyColumn { get; set; }
    }
    public class OneToOne : Attribute
    {
        public string TableName { get; set; }
        public string KeyColumn { get; set; }
        public string ForeignKeyColumn { get; set; }
    }
    public class ManyToMany : Attribute
    {
        public string TableName { get; set; }
        public string KeyColumn { get; set; }
        public string ForeignKeyColumn { get; set; }
    }
}
