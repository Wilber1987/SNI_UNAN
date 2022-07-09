CREATE TABLE `TblMatricula` (
`IdMatricula` varchar(255) NOT NULL,
`Fecha` varchar(255) NULL,
`IdEstudiante` varchar(255) NULL,
`IdCarrera` varchar(255) NULL,
PRIMARY KEY (`IdMatricula`) 
);

CREATE TABLE `CatCarrera` (
`IdCarrera` varchar(255) NOT NULL,
`Nombre` varchar(255) NULL,
PRIMARY KEY (`IdCarrera`) 
);

CREATE TABLE `TblEstdudiante` (
`IdEstudiante` varchar(255) NOT NULL,
`Nombre` varchar(255) NULL,
`Genero` varchar(255) NULL,
`Departamento` varchar(255) NULL,
PRIMARY KEY (`IdEstudiante`) 
);


ALTER TABLE `TblEstdudiante` ADD CONSTRAINT `fk_TblEstdudiante_TblMatricula_1` FOREIGN KEY (`IdEstudiante`) REFERENCES `TblMatricula` (`IdEstudiante`);
ALTER TABLE `CatCarrera` ADD CONSTRAINT `fk_CatCarrera_TblMatricula_1` FOREIGN KEY (`IdCarrera`) REFERENCES `TblMatricula` (`IdCarrera`);

