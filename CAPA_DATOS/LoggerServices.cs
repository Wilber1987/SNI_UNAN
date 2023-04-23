using System;
using System.Collections.Generic;
using System.Text;

namespace CAPA_DATOS
{
    public class LoggerServices    
    {
        public static void AddMessageInfo(string message){
            Console.WriteLine("===>");
            Console.WriteLine(message);
        }       
    }

}
