class InvestigadorProfile {
    constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
    Foto =  {
        type: "IMAGE"
    };
    Id_Investigador = -1;
    Nombres = "";
    Apellidos = "";
    FechaNac = { type: "FECHA" , defaultValue: "2000-12-30" };
    IdUser = "";
    Sexo = ["Masculino", "Femenino"];   
    DNI = "";
    Correo_institucional = "";
    Id_Pais_Origen = ["Nicaragua"];   
    Id_Institucion = ["CONICIT", "UNI", "CNU", "UNAN"];
    Id_Idiomas = {
        type: "MULTISELECT", Dataset: [{ Descripcion: "Español" }, { Descripcion: "Ingles" }]
    };
}
export { InvestigadorProfile }