export default class AgendaModel {
    constructor(Inst = { IdUsuario: 1, IdDependencia: 1 }) {
        this.IdUsuario = Inst.IdUsuario;
        this.IdDependencia = Inst.IdDependencia;
    }
    IdUsuario = "";
    IdDependencia = "";
    Dia = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    Hora_Inicial = { type: "HORA", defaultValue: "08:00" };
    Hora_Final = {
        type: "HORA", defaultValue: "17:00",
        validateFunction: (ModelObject, Hora_Final) => {
            console.log(ModelObject);
            const f1 = new Date("2000-01-01 " + Hora_Final);
            const f2 = new Date("2000-01-01 " + ModelObject.Hora_Inicial);
            console.log(f1, f2);
            if (f1 < f2) {
                console.log("false");
                return {
                    success: false,
                    message: "La hora final no pude ser mayor a la hora inicial"
                };
            } else if (f1 >= f2) {
                return { success: true };
            }
            return { success: false };
        }
    };
    Fecha_Caducidad = { type: "FECHA" , defaultValue: "2022-12-30" };
}
