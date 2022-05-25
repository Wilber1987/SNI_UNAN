class InvestigadorProfile {
    foto =  {
        type: "IMAGE"
    };
    id_Investigador = -1;
    nombres = "";
    apellidos = "";
    fechaNac = { type: "FECHA" , defaultValue: "2000-12-30" };
    idUser = "";
    sexo = ["Masculino", "Femenino"];   
    dni = "";
    correo_institucional = "";
    id_Pais_Origen = ["Nicaragua"];
    idiomas = {
        type: "MULTISELECT", Dataset: [{ Descripcion: "Español" }, { Descripcion: "Ingles" }]
    };
    id_Institucion = ["CONICIT", "UNI", "CNU", "UNAN"];
}
export { InvestigadorProfile }