﻿using System;
using System.Collections.Generic;
using System.Text;
using CAPA_DATOS;

namespace CAPA_NEGOCIO.Security
{
    public class UserModel
    {
        public string user { get; set; }
        public int UserId { get; set; }
        public string password { get; set; }
        public bool success { get; set; }
        public void LoginIn()
        {
           if( SqlADOConexion.IniciarConexionSNIBD(user, password))
           {
                password = "protected";
                success = true;
           }
        }
    }
}
