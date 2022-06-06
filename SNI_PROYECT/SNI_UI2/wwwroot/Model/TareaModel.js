class TareaModel {
    constructor(Config){
        this.IdTareaPadre = Config.Tareas.map(x => {
            return { id: x.IdTarea, desc: x.Titulo };
        });
        this.Participantes.Dataset = Config.Participantes.map(x => {
            x.id_ = x.IdUsuario;
            x.IdUsuario = x.IdUsuario;
            x.Descripcion = `${x.Nombres} ${x.Apellidos} - ${x.Mail}`;
            return x;
        })
    }
    Titulo = "";
    Descripcion = "";
    Estado = ["Activa", "Finalizada"];
    IdTareaPadre = [];
    Participantes = {
        type: "MULTISELECT", Dataset: []
    };
    Evidencias = { type: "IMAGES" };
}
export { TareaModel }