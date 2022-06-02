class WOrtograficValidation {
    static es = (val = "") => {
        val = val.replaceAll("_id", "")
            .replaceAll("id_", "")
            .replaceAll("Id_", "")
            .replaceAll("_Id", "")
            .replaceAll("_", " ");
        const words = val.split(" ");
        let valReturn = "";
        words.forEach((word, index) => {
            const valUper = word.toUpperCase();
            const validate = this.spanish.find(v => v.error.find(e => e == valUper));
            if (index > 0) {
                valReturn += " ";
            }
            if (validate != null) {
                valReturn += validate.value;
            } else {
                valReturn += word;
            }
        });
        return valReturn;
    }
    static spanish = [
        { error: ["INSTITUCION", "INSTITUSION"], value: "Institución" },
        { error: ["FINALIZACION"], value: "Finalización" }
    ]
}
export { WOrtograficValidation }