using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.Security
{
    public enum RoleEnum
    {
        ADMIN
    }
    public enum PermissionsEnum
    {
        ADMIN_ACCESS,
        HOME_ACCESS, 
        ADMINISTRAR_POSTULANTES,
        ADMINISTRAR_INVESTIGACIONES,
        ADMINISTRAR_USUARIOS,
        ADMINISTRAR_CATALOGOS
    }
}
