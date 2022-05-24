class InvestigadorProfile {
    foto =  {
        type: "IMAGE"
    };
    id_Investigador = "1";
    nombres = "Wilber";
    apellidos = "Matus";
    fechaNac = { type: "FECHA" , defaultValue: "2000-12-30" };
    idUser = "";
    sexo = ["Masculino", "Femenino"];   
    dni = "090909";
    correo_institucional = "Wilber@unaun.edu.ni";
    id_Pais_Origen = ["Nicaragua", "Panama"];
    idiomas = {
        type: "MULTISELECT", Dataset: [{ Descripcion: "Español" }, { Descripcion: "Ingles" }]
    };
    id_Institucion = ["CONICIT", "UNI", "CNU", "UNAN"];
    indice_H = "20";
}
export { InvestigadorProfile }