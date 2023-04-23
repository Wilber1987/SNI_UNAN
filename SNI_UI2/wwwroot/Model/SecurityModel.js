class Security_Roles {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Role = { type: "number", primary: true };
	Descripcion = { type: "text" };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
    Security_Permissions_Roles = {
        type: "MULTISELECT", Dataset: [{ Descripcion: "Permission 1" }]
    };
}
export { Security_Roles }
class Security_Permissions {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Permission = { type: "number", primary: true };
	Descripcion = { type: "text" };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
}
export { Security_Permissions }

class Security_Permissions_Roles {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Role = { type: "number", primary: true };
	Id_Permission = { type: "number", primary: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
}
export { Security_Permissions_Roles }

class Security_Users_Roles {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Role = { type: "number", primary: true };
	Id_User = { type: "number", primary: true };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
}
export { Security_Users_Roles }


class Security_Users {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_User = { type: "number", primary: true };
    Nombres = { type: "text" };	
	Descripcion = { type: "text" , require: false};
	Mail = { type: "email" };
    Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
	Password = { type: "password" };    
    Security_Users_Roles = {
        type: "MULTISELECT", Dataset: [{ Descripcion: "Role 1" }]
    };

}
export { Security_Users }
