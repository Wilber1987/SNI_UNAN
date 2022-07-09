using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;


namespace CAPA_NEGOCIO.Security
{
    public class Security_Roles : EntityClass
    {
        public int? Id_Role { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public List<Security_Permissions_Roles> Security_Permissions_Roles { get; set; }
        public Object SaveRole()
        {
            if (this.Id_Role == null)
            {
                this.Id_Role = (Int32)this.Save();
            }
            else
            {
                this.Update("Id_Role");
            }
            if (this.Security_Permissions_Roles != null)
            {
                Security_Permissions_Roles IdI = new Security_Permissions_Roles();
                IdI.Id_Role = this.Id_Role;
                IdI.Delete();
                foreach (Security_Permissions_Roles obj in this.Security_Permissions_Roles)
                {
                    obj.Id_Role = this.Id_Role;
                    obj.Save();
                }
            }
            return this;
        }
        public Object GetRoles()
        {
            var Security_Roles_List = this.Get<Security_Roles>();
            foreach (Security_Roles role in Security_Roles_List)
            {
                role.Security_Permissions_Roles =
                    (new Security_Permissions_Roles()).Get_WhereIN<Security_Permissions_Roles>(
                         "Id_Role", new string[] { role.Id_Role.ToString() });
            }
            return Security_Roles_List;

        }
    }
    public class Security_Users : EntityClass
    {
        public int? Id_User { get; set; }
        public string Nombres { get; set; }
        public string Estado { get; set; }
        public string Descripcion { get; set; }
        public string Password { get; set; }
        public string Mail { get; set; }
        public List<Security_Users_Roles> Security_Users_Roles { get; set; }
        public Object SaveUser()
        {
            if (this.Id_User == null)
            {
                this.Id_User = (Int32)this.Save();
            }
            else
            {
                this.Update("Id_User");
            }
            if (this.Security_Users_Roles != null)
            {
                Security_Users_Roles IdI = new Security_Users_Roles();
                IdI.Id_User = this.Id_User;
                IdI.Delete();
                foreach (Security_Users_Roles obj in this.Security_Users_Roles)
                {
                    obj.Id_User = this.Id_User;
                    obj.Save();
                }
            }
            return this;
        }
        public Object GetUsers()
        {
            var Security_Users_List = this.Get<Security_Users>();
            foreach (Security_Users User in Security_Users_List)
            {
                User.Security_Users_Roles =
                    (new Security_Users_Roles()).Get_WhereIN<Security_Users_Roles>(
                         "Id_User", new string[] { User.Id_User.ToString() });
            }
            return Security_Users_List;

        }

    }
    public class Security_Permissions : EntityClass
    {
        public int? Id_Permission { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
    }
    public class Security_Permissions_Roles : EntityClass
    {
        public int? Id_Role { get; set; }
        public int? Id_Permission { get; set; }
        public string Estado { get; set; }
    }
    public class Security_Users_Roles : EntityClass
    {
        public int? Id_Role { get; set; }
        public int? Id_User { get; set; }
        public string Estado { get; set; }
    }
}
