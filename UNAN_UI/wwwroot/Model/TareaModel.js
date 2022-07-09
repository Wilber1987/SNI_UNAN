class TareaModel {
    constructor(Config){
        this.idTareaPadre = Config.Tareas.map(x => {
            return { id: x.idTarea, desc: x.titulo };
        });
        this.participantes.Dataset = Config.Participantes.map(x => {
            x.id_ = x.idUsuario;
            x.IdUsuario = x.idUsuario;
            x.Descripcion = `${x.nombres} ${x.apellidos} - ${x.mail}`;
            return x;
        })
    }
    titulo = "";
    descripcion = "";
    estado = ["Activa", "Finalizada"];
    idTareaPadre = [];
    participantes = {
        type: "MULTISELECT", Dataset: []
    };
    evidencias = { type: "IMAGES" };
}
export { TareaModel }