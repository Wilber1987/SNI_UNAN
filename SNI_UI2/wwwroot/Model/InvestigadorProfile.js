class InvestigadorProfile {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    Foto = { type: "IMAGE" };
    Id_Investigador = { type: "NUMBER", primary: true };
    Nombres = { type: "TEXT" };
    Apellidos = { type: "TEXT" };
    FechaNac = { type: "FECHA", defaultValue: "2000-12-30" };
    IdUser = { type: "NUMBER", primary: true };
    Sexo = ["Masculino", "Femenino"];
    DNI = { type: "TEXT" };
    Correo_institucional = { type: "EMAIL" };
    Id_Pais_Origen = ["Nicaragua"];
    Id_Institucion = ["CONICIT", "UNI", "CNU", "UNAN"];
    Id_Idiomas = {
        type: "MULTISELECT", Dataset: [{ Descripcion: "Español" }, { Descripcion: "Ingles" }]
    };
}
export { InvestigadorProfile }