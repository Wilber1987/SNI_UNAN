CREATE VIEW [dbo].[View]
	AS  SELECT count(TblMatricula.IdMatricula) as Num, CatCarrera.Nombre 
	FROM TblMatricula inner join CatCarrera on CatCarrera.IdCarrera = TblMatricula.IdCarrera
	group by TblMatricula.IdCarrera, CatCarrera.Nombre 

