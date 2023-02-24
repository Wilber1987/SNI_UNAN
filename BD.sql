USE [master]
GO
/****** Object:  Database [SNIBD]    Script Date: 24/2/2023 16:14:38 ******/
CREATE DATABASE [SNIBD]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SNIBD', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SNIBD.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SNIBD_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SNIBD_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SNIBD] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SNIBD].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SNIBD] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SNIBD] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SNIBD] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SNIBD] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SNIBD] SET ARITHABORT OFF 
GO
ALTER DATABASE [SNIBD] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SNIBD] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SNIBD] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SNIBD] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SNIBD] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SNIBD] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SNIBD] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SNIBD] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SNIBD] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SNIBD] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SNIBD] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SNIBD] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SNIBD] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SNIBD] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SNIBD] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SNIBD] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SNIBD] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SNIBD] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SNIBD] SET  MULTI_USER 
GO
ALTER DATABASE [SNIBD] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SNIBD] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SNIBD] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SNIBD] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SNIBD] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SNIBD] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SNIBD] SET QUERY_STORE = OFF
GO
USE [SNIBD]
GO
/****** Object:  Schema [proyect]    Script Date: 24/2/2023 16:14:38 ******/
CREATE SCHEMA [proyect]
GO
/****** Object:  Schema [security]    Script Date: 24/2/2023 16:14:38 ******/
CREATE SCHEMA [security]
GO
/****** Object:  Table [dbo].[Tbl_Investigaciones_Disciplinas]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Investigaciones_Disciplinas](
	[Id_Disciplina] [int] NOT NULL,
	[Id_Investigacion] [int] NOT NULL,
 CONSTRAINT [PK_Tbl_Investigaciones_Disciplinas] PRIMARY KEY CLUSTERED 
(
	[Id_Disciplina] ASC,
	[Id_Investigacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Disciplinas]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Disciplinas](
	[Id_Disciplina] [int] IDENTITY(1,1) NOT NULL,
	[DescripcionDisciplina] [nvarchar](50) NULL,
	[Color] [nvarchar](50) NULL,
	[Icono] [nvarchar](max) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatDisciplinas] PRIMARY KEY CLUSTERED 
(
	[Id_Disciplina] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewInvestigacionesDisciplinas]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewInvestigacionesDisciplinas]
AS
SELECT        dbo.Tbl_Investigaciones_Disciplinas.Id_Investigacion, dbo.Tbl_Investigaciones_Disciplinas.Id_Disciplina, dbo.Cat_Disciplinas.DescripcionDisciplina, dbo.Cat_Disciplinas.Color, dbo.Cat_Disciplinas.Icono
FROM            dbo.Cat_Disciplinas INNER JOIN
                         dbo.Tbl_Investigaciones_Disciplinas ON dbo.Cat_Disciplinas.Id_Disciplina = dbo.Tbl_Investigaciones_Disciplinas.Id_Disciplina
GO
/****** Object:  Table [dbo].[Tbl_Investigaciones]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Investigaciones](
	[Id_Investigacion] [int] IDENTITY(1,1) NOT NULL,
	[Visibilidad] [nvarchar](50) NULL,
	[Id_Tipo_Investigacion] [int] NULL,
	[Titulo] [nvarchar](50) NULL,
	[Abstract] [nvarchar](2000) NULL,
	[Resumen] [nvarchar](2000) NULL,
	[Repositorio] [varbinary](max) NULL,
	[Referencias] [nvarchar](1000) NULL,
	[url_publicacion] [nvarchar](250) NULL,
	[Fecha_ejecucion] [datetime] NULL,
	[Id_Investigador] [int] NULL,
	[Photo] [nvarchar](max) NULL,
	[Estado] [nvarchar](50) NULL,
	[Id_Localidad] [int] NULL,
	[Fecha_publicacion] [datetime] NULL,
 CONSTRAINT [PK_Tbl_Investigaciones] PRIMARY KEY CLUSTERED 
(
	[Id_Investigacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Paises]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Paises](
	[Id_Pais] [int] IDENTITY(1,1) NOT NULL,
	[Estado] [nvarchar](50) NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Nacionalidad] PRIMARY KEY CLUSTERED 
(
	[Id_Pais] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_TipoLocalidad]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_TipoLocalidad](
	[Id_Tipo_Localidad] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_TipoLocalidad] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_TipoLocalidad] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Localidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Localidad]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Localidad](
	[Id_Localidad] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_Localidad] [nvarchar](50) NULL,
	[Id_Tipo_Localidad] [int] NULL,
	[Id_LocalidadPadre] [int] NULL,
	[Id_Pais] [int] NULL,
	[Latitud] [nvarchar](50) NULL,
	[Longitud] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Localidad] PRIMARY KEY CLUSTERED 
(
	[Id_Localidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_instituciones]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_instituciones](
	[Id_Institucion] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Direccion] [nvarchar](250) NULL,
	[Estado] [nvarchar](50) NULL,
	[Logo] [nvarchar](max) NULL,
 CONSTRAINT [PK_Cat_instituciones] PRIMARY KEY CLUSTERED 
(
	[Id_Institucion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Tipo_Investigacion]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Tipo_Investigacion](
	[Id_Tipo_Investigacion] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Tipo_Investigacion] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Investigacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_InvestigatorProfile]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_InvestigatorProfile](
	[Id_Investigador] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [nvarchar](50) NULL,
	[Apellidos] [nvarchar](50) NULL,
	[FechaNac] [date] NULL,
	[IdUser] [int] NULL,
	[Sexo] [nvarchar](50) NULL,
	[Foto] [nvarchar](max) NULL,
	[DNI] [nvarchar](50) NULL,
	[Correo_institucional] [nvarchar](50) NULL,
	[Id_Pais_Origen] [int] NULL,
	[Id_Institucion] [int] NULL,
	[Indice_H] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_InvestigatorProfile] PRIMARY KEY CLUSTERED 
(
	[Id_Investigador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewInvestigacionesPhoto]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewInvestigacionesPhoto]
AS
SELECT        TOP (100) PERCENT dbo.Tbl_Investigaciones.Titulo, dbo.Tbl_Investigaciones.Repositorio, dbo.Cat_Tipo_Investigacion.Descripcion, dbo.Tbl_Investigaciones.Fecha_ejecucion, dbo.Tbl_Investigaciones.Id_Investigacion, 
                         dbo.Tbl_Investigaciones.Resumen, dbo.Tbl_Investigaciones.url_publicacion, dbo.Tbl_Investigaciones.Photo, dbo.Tbl_Investigaciones.Abstract, dbo.Cat_instituciones.Nombre AS NombreInstitucion, 
                         dbo.Tbl_InvestigatorProfile.Nombres + ' ' + dbo.Tbl_InvestigatorProfile.Apellidos AS Nombres, dbo.Tbl_InvestigatorProfile.Id_Investigador, dbo.Cat_TipoLocalidad.Nombre_TipoLocalidad, dbo.Cat_Localidad.Nombre_Localidad, 
                         dbo.Cat_Paises.Descripcion AS País, dbo.Cat_Localidad.Id_LocalidadPadre, dbo.Cat_Localidad.Id_Localidad, dbo.Tbl_InvestigatorProfile.Foto
FROM            dbo.Cat_Tipo_Investigacion INNER JOIN
                         dbo.Tbl_Investigaciones ON dbo.Cat_Tipo_Investigacion.Id_Tipo_Investigacion = dbo.Tbl_Investigaciones.Id_Tipo_Investigacion INNER JOIN
                         dbo.Tbl_InvestigatorProfile ON dbo.Tbl_Investigaciones.Id_Investigador = dbo.Tbl_InvestigatorProfile.Id_Investigador INNER JOIN
                         dbo.Cat_instituciones ON dbo.Tbl_InvestigatorProfile.Id_Institucion = dbo.Cat_instituciones.Id_Institucion INNER JOIN
                         dbo.Cat_Localidad ON dbo.Tbl_Investigaciones.Id_Localidad = dbo.Cat_Localidad.Id_Localidad INNER JOIN
                         dbo.Cat_Paises ON dbo.Cat_Localidad.Id_Pais = dbo.Cat_Paises.Id_Pais INNER JOIN
                         dbo.Cat_TipoLocalidad ON dbo.Cat_Localidad.Id_Tipo_Localidad = dbo.Cat_TipoLocalidad.Id_Tipo_Localidad
GO
/****** Object:  View [dbo].[ViewInvestigacionesPorDisciplinas]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewInvestigacionesPorDisciplinas]
AS
SELECT        TOP (100) PERCENT dbo.Tbl_Investigaciones.Titulo, dbo.Tbl_Investigaciones.Repositorio, dbo.Cat_Tipo_Investigacion.Descripcion, dbo.Tbl_Investigaciones.Fecha_ejecucion, dbo.Tbl_Investigaciones.Id_Investigacion, 
                         dbo.Tbl_Investigaciones.Resumen, dbo.Tbl_Investigaciones.url_publicacion, dbo.Tbl_Investigaciones.Abstract, dbo.Cat_instituciones.Nombre AS NombreInstitucion, dbo.Tbl_InvestigatorProfile.Nombres, 
                         dbo.Tbl_InvestigatorProfile.Apellidos, dbo.Tbl_InvestigatorProfile.Id_Investigador, dbo.Cat_TipoLocalidad.Nombre_TipoLocalidad, dbo.Cat_Localidad.Nombre_Localidad, dbo.Cat_Paises.Descripcion AS País, 
                         dbo.Cat_Localidad.Id_LocalidadPadre, dbo.Cat_Localidad.Id_Localidad, dbo.CatDisciplinas.DescripcionDisciplina AS Disciplina, dbo.CatDisciplinas.Id_Disciplina
FROM            dbo.Cat_Tipo_Investigacion INNER JOIN
                         dbo.Tbl_Investigaciones ON dbo.Cat_Tipo_Investigacion.Id_Tipo_Investigacion = dbo.Tbl_Investigaciones.Id_Tipo_Investigacion INNER JOIN
                         dbo.Tbl_InvestigatorProfile ON dbo.Tbl_Investigaciones.Id_Investigador = dbo.Tbl_InvestigatorProfile.Id_Investigador INNER JOIN
                         dbo.Cat_instituciones ON dbo.Tbl_InvestigatorProfile.Id_Institucion = dbo.Cat_instituciones.Id_Institucion INNER JOIN
                         dbo.Cat_Localidad ON dbo.Tbl_Investigaciones.Id_Localidad = dbo.Cat_Localidad.Id_Localidad INNER JOIN
                         dbo.Cat_Paises ON dbo.Cat_Localidad.Id_Pais = dbo.Cat_Paises.Id_Pais INNER JOIN
                         dbo.Cat_TipoLocalidad ON dbo.Cat_Localidad.Id_Tipo_Localidad = dbo.Cat_TipoLocalidad.Id_Tipo_Localidad INNER JOIN
                         dbo.Tbl_Investigaciones_Disciplinas ON dbo.Tbl_Investigaciones.Id_Investigacion = dbo.Tbl_Investigaciones_Disciplinas.Id_Investigacion INNER JOIN
                         dbo.CatDisciplinas ON dbo.Tbl_Investigaciones_Disciplinas.Id_Disciplina = dbo.CatDisciplinas.Id_Disciplina
GO
/****** Object:  View [dbo].[ViewInvestigaciones]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewInvestigaciones]
AS
SELECT        TOP (100) PERCENT dbo.Tbl_Investigaciones.Titulo, dbo.Tbl_Investigaciones.Repositorio, dbo.Cat_Tipo_Investigacion.Descripcion, dbo.Tbl_Investigaciones.Fecha_ejecucion, dbo.Tbl_Investigaciones.Id_Investigacion, 
                         dbo.Tbl_Investigaciones.Resumen, dbo.Tbl_Investigaciones.url_publicacion, dbo.Tbl_Investigaciones.Photo, dbo.Tbl_Investigaciones.Abstract, dbo.Cat_instituciones.Nombre AS NombreInstitucion, 
                         dbo.Tbl_InvestigatorProfile.Nombres + ' ' + dbo.Tbl_InvestigatorProfile.Apellidos AS Nombres, dbo.Tbl_InvestigatorProfile.Id_Investigador, dbo.Cat_TipoLocalidad.Nombre_TipoLocalidad, dbo.Cat_Localidad.Nombre_Localidad, 
                         dbo.Cat_Paises.Descripcion AS País, dbo.Cat_Localidad.Id_LocalidadPadre, dbo.Cat_Localidad.Id_Localidad
FROM            dbo.Cat_Tipo_Investigacion INNER JOIN
                         dbo.Tbl_Investigaciones ON dbo.Cat_Tipo_Investigacion.Id_Tipo_Investigacion = dbo.Tbl_Investigaciones.Id_Tipo_Investigacion INNER JOIN
                         dbo.Tbl_InvestigatorProfile ON dbo.Tbl_Investigaciones.Id_Investigador = dbo.Tbl_InvestigatorProfile.Id_Investigador INNER JOIN
                         dbo.Cat_instituciones ON dbo.Tbl_InvestigatorProfile.Id_Institucion = dbo.Cat_instituciones.Id_Institucion INNER JOIN
                         dbo.Cat_Localidad ON dbo.Tbl_Investigaciones.Id_Localidad = dbo.Cat_Localidad.Id_Localidad INNER JOIN
                         dbo.Cat_Paises ON dbo.Cat_Localidad.Id_Pais = dbo.Cat_Paises.Id_Pais INNER JOIN
                         dbo.Cat_TipoLocalidad ON dbo.Cat_Localidad.Id_Tipo_Localidad = dbo.Cat_TipoLocalidad.Id_Tipo_Localidad
GO
/****** Object:  Table [dbo].[Cat_Tipo_Asociacion]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Tipo_Asociacion](
	[Id_Tipo_Asociacion] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Tipo_Asociacion] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Asociacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Instituciones_Asociadas]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Instituciones_Asociadas](
	[Id_Institucion] [int] NOT NULL,
	[Id_Proyecto] [int] NOT NULL,
	[Id_Tipo_Asociacion] [int] NULL,
	[Fecha_Ingreso] [date] NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_Instituciones_Asociadas] PRIMARY KEY CLUSTERED 
(
	[Id_Institucion] ASC,
	[Id_Proyecto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewGPInstitucionesAsociadas]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewGPInstitucionesAsociadas]
AS
SELECT        dbo.Cat_instituciones.Id_Institucion, dbo.Cat_instituciones.Nombre, dbo.Cat_instituciones.Logo, dbo.Tbl_Instituciones_Asociadas.Id_Proyecto, dbo.Tbl_Instituciones_Asociadas.Id_Tipo_Asociacion, 
                         dbo.Cat_Tipo_Asociacion.Descripcion, dbo.Cat_Tipo_Asociacion.EstadoAsociacion, dbo.Tbl_Instituciones_Asociadas.Fecha_Ingreso
FROM            dbo.Tbl_Instituciones_Asociadas INNER JOIN
                         dbo.Cat_instituciones ON dbo.Tbl_Instituciones_Asociadas.Id_Institucion = dbo.Cat_instituciones.Id_Institucion INNER JOIN
                         dbo.Cat_Tipo_Asociacion ON dbo.Tbl_Instituciones_Asociadas.Id_Tipo_Asociacion = dbo.Cat_Tipo_Asociacion.Id_Tipo_Asociacion
GO
/****** Object:  Table [dbo].[Cat_Tipo_Colaborador]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Tipo_Colaborador](
	[Id_Tipo_Colaboracion] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Tipo_Colaborador] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Colaboracion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Colaboradores]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Colaboradores](
	[Id_Investigacion] [int] NOT NULL,
	[Id_Investigador] [int] NOT NULL,
	[Estado] [nvarchar](50) NULL,
	[Fecha_ingreso] [date] NULL,
	[Id_Tipo_Colaboracion] [int] NULL,
 CONSTRAINT [PK_Tbl_Colaboradores] PRIMARY KEY CLUSTERED 
(
	[Id_Investigacion] ASC,
	[Id_Investigador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewColaboradores]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewColaboradores]
AS
SELECT        dbo.Tbl_InvestigatorProfile.Id_Investigador, dbo.Tbl_InvestigatorProfile.Nombres, dbo.Tbl_InvestigatorProfile.Apellidos, dbo.Tbl_InvestigatorProfile.FechaNac, dbo.Tbl_InvestigatorProfile.Sexo, dbo.Tbl_InvestigatorProfile.Foto, 
                         dbo.Tbl_InvestigatorProfile.DNI, dbo.Tbl_InvestigatorProfile.Correo_institucional, dbo.Tbl_InvestigatorProfile.Indice_H, dbo.Tbl_InvestigatorProfile.Estado, dbo.Tbl_Colaboradores.Id_Investigacion, 
                         dbo.Tbl_Colaboradores.Fecha_ingreso, dbo.Cat_Tipo_Colaborador.Descripcion AS TipoColaboracion, dbo.Cat_instituciones.Nombre AS NombreInstitucion, dbo.Tbl_Investigaciones.Titulo, 
                         dbo.Tbl_Investigaciones.Fecha_ejecucion
FROM            dbo.Tbl_Colaboradores INNER JOIN
                         dbo.Tbl_InvestigatorProfile ON dbo.Tbl_Colaboradores.Id_Investigador = dbo.Tbl_InvestigatorProfile.Id_Investigador INNER JOIN
                         dbo.Cat_Tipo_Colaborador ON dbo.Tbl_Colaboradores.Id_Tipo_Colaboracion = dbo.Cat_Tipo_Colaborador.Id_Tipo_Colaboracion INNER JOIN
                         dbo.Cat_instituciones ON dbo.Tbl_InvestigatorProfile.Id_Institucion = dbo.Cat_instituciones.Id_Institucion INNER JOIN
                         dbo.Tbl_Investigaciones ON dbo.Tbl_Colaboradores.Id_Investigacion = dbo.Tbl_Investigaciones.Id_Investigacion
GO
/****** Object:  Table [dbo].[Cat_Tipo_Proyecto]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Tipo_Proyecto](
	[Id_Tipo_Proyecto] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion_Tipo_Proyecto] [nvarchar](50) NULL,
	[Estado_Tipo_Proyecto] [nvarchar](50) NULL,
	[Icon] [nvarchar](max) NULL,
 CONSTRAINT [PK_Cat_Tipo_Proyecto] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Proyecto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Proyectos]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Proyectos](
	[Id_Proyecto] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_Proyecto] [nvarchar](250) NULL,
	[DescripcionProyecto] [nvarchar](2000) NULL,
	[Id_Tipo_Proyecto] [int] NULL,
	[Visibilidad] [nvarchar](50) NULL,
	[Estado_Proyecto] [nvarchar](50) NULL,
	[Fecha_Inicio] [date] NULL,
	[Fecha_Finalizacion] [date] NULL,
 CONSTRAINT [PK_Tbl_Proyectos] PRIMARY KEY CLUSTERED 
(
	[Id_Proyecto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Cargo_Proyecto]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Cargo_Proyecto](
	[Id_Cargo_Proyecto] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Cargo_Proyecto] PRIMARY KEY CLUSTERED 
(
	[Id_Cargo_Proyecto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Participantes_Proyectos]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Participantes_Proyectos](
	[Id_Proyecto] [int] NOT NULL,
	[Id_Investigador] [int] NOT NULL,
	[Id_Cargo_Proyecto] [int] NULL,
	[Fecha_Ingreso] [date] NULL,
	[Estado_Participante] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_Participantes] PRIMARY KEY CLUSTERED 
(
	[Id_Proyecto] ASC,
	[Id_Investigador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewParticipantesProyectos]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewParticipantesProyectos]
AS
SELECT        dbo.Tbl_Participantes_Proyectos.Id_Investigador, dbo.Tbl_Participantes_Proyectos.Id_Proyecto, dbo.Tbl_Participantes_Proyectos.Fecha_Ingreso, dbo.Tbl_Participantes_Proyectos.Estado_Participante, 
                         dbo.Tbl_Proyectos.DescripcionProyecto, dbo.Tbl_Proyectos.Fecha_Inicio, dbo.Tbl_Proyectos.Fecha_Finalizacion, dbo.Tbl_Proyectos.Visibilidad, dbo.Cat_Cargo_Proyecto.Descripcion AS Cargo, 
                         dbo.Cat_Tipo_Proyecto.Descripcion_Tipo_Proyecto, dbo.Cat_Tipo_Proyecto.Estado_Tipo_Proyecto, dbo.Tbl_Proyectos.Nombre_Proyecto, dbo.Tbl_Proyectos.Estado_Proyecto
FROM            dbo.Cat_Tipo_Proyecto INNER JOIN
                         dbo.Tbl_Proyectos ON dbo.Cat_Tipo_Proyecto.Id_Tipo_Proyecto = dbo.Tbl_Proyectos.Id_Tipo_Proyecto INNER JOIN
                         dbo.Tbl_Participantes_Proyectos ON dbo.Tbl_Proyectos.Id_Proyecto = dbo.Tbl_Participantes_Proyectos.Id_Proyecto INNER JOIN
                         dbo.Cat_Cargo_Proyecto ON dbo.Tbl_Participantes_Proyectos.Id_Cargo_Proyecto = dbo.Cat_Cargo_Proyecto.Id_Cargo_Proyecto
GO
/****** Object:  Table [dbo].[CatRedesSociales]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatRedesSociales](
	[Id_RedSocial] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[url] [nvarchar](250) NULL,
	[Icon] [nvarchar](max) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatRedesSociales] PRIMARY KEY CLUSTERED 
(
	[Id_RedSocial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Invest_RedS]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Invest_RedS](
	[Id_Investigador] [int] NOT NULL,
	[Id_RedSocial] [int] NOT NULL,
	[url_red_inv] [nvarchar](250) NULL,
 CONSTRAINT [PK_Tbl_Invest_RedS] PRIMARY KEY CLUSTERED 
(
	[Id_Investigador] ASC,
	[Id_RedSocial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewRedesInvestigadores]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewRedesInvestigadores]
AS
SELECT        dbo.CatRedesSociales.Id_RedSocial, dbo.CatRedesSociales.Descripcion, dbo.CatRedesSociales.url, dbo.CatRedesSociales.Icon, dbo.Tbl_Invest_RedS.url_red_inv, dbo.Tbl_Invest_RedS.Id_Investigador
FROM            dbo.CatRedesSociales INNER JOIN
                         dbo.Tbl_Invest_RedS ON dbo.CatRedesSociales.Id_RedSocial = dbo.Tbl_Invest_RedS.Id_RedSocial
GO
/****** Object:  Table [dbo].[Cat_Idiomas]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Idiomas](
	[Id_Idioma] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Idiomas] PRIMARY KEY CLUSTERED 
(
	[Id_Idioma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_IdiomasInv]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_IdiomasInv](
	[Id_Investigador] [int] NOT NULL,
	[Id_Idioma] [int] NOT NULL,
 CONSTRAINT [PK_Tbl_IdiomasInv] PRIMARY KEY CLUSTERED 
(
	[Id_Investigador] ASC,
	[Id_Idioma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewIdiomasInvestigadores]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewIdiomasInvestigadores]
AS
SELECT        dbo.Cat_Idiomas.Id_Idioma, dbo.Cat_Idiomas.Descripcion, dbo.Tbl_IdiomasInv.Id_Investigador
FROM            dbo.Cat_Idiomas INNER JOIN
                         dbo.Tbl_IdiomasInv ON dbo.Cat_Idiomas.Id_Idioma = dbo.Tbl_IdiomasInv.Id_Idioma
GO
/****** Object:  Table [dbo].[ProyectoTableActividades]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableActividades](
	[IdActividad] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [nvarchar](250) NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Id_Investigador] [int] NULL,
	[Estado] [nvarchar](50) NULL,
	[Id_Dependencia] [int] NULL,
	[Fecha_Inicial] [datetime] NULL,
	[Fecha_Final] [datetime] NULL,
	[Id_Proyecto] [int] NULL,
 CONSTRAINT [PK_ProyectoTableActividades] PRIMARY KEY CLUSTERED 
(
	[IdActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoTableCalendario]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableCalendario](
	[IdCalendario] [int] IDENTITY(1,1) NOT NULL,
	[IdTarea] [int] NULL,
	[Estado] [nvarchar](50) NULL,
	[Fecha_Inicial] [datetime] NULL,
	[Fecha_Final] [datetime] NULL,
 CONSTRAINT [PK_ProyectoTableCalendario] PRIMARY KEY CLUSTERED 
(
	[IdCalendario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoTableTareas]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableTareas](
	[IdTarea] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [nvarchar](50) NULL,
	[IdTareaPadre] [int] NULL,
	[IdActividad] [int] NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_ProyectoTableTareas] PRIMARY KEY CLUSTERED 
(
	[IdTarea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewCalendarioByDependencia]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewCalendarioByDependencia]
AS
SELECT        dbo.ProyectoTableTareas.IdActividad, dbo.ProyectoTableTareas.IdTareaPadre, dbo.ProyectoTableCalendario.Fecha_Inicial, dbo.ProyectoTableCalendario.Fecha_Final, dbo.ProyectoTableCalendario.Estado, 
                         dbo.ProyectoTableCalendario.IdCalendario, dbo.ProyectoTableCalendario.IdTarea, dbo.ProyectoTableActividades.Id_Dependencia
FROM            dbo.ProyectoTableActividades INNER JOIN
                         dbo.ProyectoTableTareas ON dbo.ProyectoTableActividades.IdActividad = dbo.ProyectoTableTareas.IdActividad INNER JOIN
                         dbo.ProyectoTableCalendario ON dbo.ProyectoTableTareas.IdTarea = dbo.ProyectoTableCalendario.IdTarea
GO
/****** Object:  Table [dbo].[ProyectoTableParticipantes]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableParticipantes](
	[Id_Investigador] [int] NOT NULL,
	[IdTarea] [int] NOT NULL,
	[IdTipoParticipacion] [int] NULL,
 CONSTRAINT [PK_ProyectoTableParticipantes] PRIMARY KEY CLUSTERED 
(
	[Id_Investigador] ASC,
	[IdTarea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewActividadesParticipantes]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewActividadesParticipantes]
AS
SELECT        dbo.ProyectoTableActividades.IdActividad, dbo.ProyectoTableActividades.Titulo, dbo.ProyectoTableActividades.Descripcion, dbo.ProyectoTableActividades.Estado, dbo.ProyectoTableActividades.Id_Investigador
FROM            dbo.ProyectoTableActividades INNER JOIN
                         dbo.ProyectoTableTareas ON dbo.ProyectoTableActividades.IdActividad = dbo.ProyectoTableTareas.IdActividad INNER JOIN
                         dbo.ProyectoTableParticipantes ON dbo.ProyectoTableTareas.IdTarea = dbo.ProyectoTableParticipantes.IdTarea
GROUP BY dbo.ProyectoTableActividades.IdActividad, dbo.ProyectoTableActividades.Titulo, dbo.ProyectoTableActividades.Descripcion, dbo.ProyectoTableActividades.Estado, dbo.ProyectoTableActividades.Id_Investigador
GO
/****** Object:  Table [dbo].[Cat_Cargos]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Cargos](
	[Id_Cargo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Cargos] PRIMARY KEY CLUSTERED 
(
	[Id_Cargo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Tipo_Evento]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Tipo_Evento](
	[Id_Tipo_Evento] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Tipo_Evento] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Tipo_Participacion_Eventos]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Tipo_Participacion_Eventos](
	[Id_Tipo_Participacion] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Tipo_Participacion_Eventos] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Participacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Tipo_Proceso_Editorial]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Tipo_Proceso_Editorial](
	[Id_Tipo_Proceso_Editorial] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Tipo_Proceso_Editorial] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Proceso_Editorial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_TipoEstudio]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_TipoEstudio](
	[Id_TipoEstudio] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_TipoEstudio] PRIMARY KEY CLUSTERED 
(
	[Id_TipoEstudio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_TipoGrupo]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_TipoGrupo](
	[Id_TipoGrupo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_TipoGrupo] PRIMARY KEY CLUSTERED 
(
	[Id_TipoGrupo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_TipoMiembro]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_TipoMiembro](
	[Id_TipoMiembro] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_TipoMiembro] PRIMARY KEY CLUSTERED 
(
	[Id_TipoMiembro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatalogoTipoEvidencia]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoTipoEvidencia](
	[IdTipo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatalogoTipoEvidencia] PRIMARY KEY CLUSTERED 
(
	[IdTipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatTipoDistincion]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatTipoDistincion](
	[Id_Tipo_Distincion] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatTipoDistincion] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Distincion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoCatCargosDependencias]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoCatCargosDependencias](
	[Id_Cargo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_ProyectoCatCargosDependencias] PRIMARY KEY CLUSTERED 
(
	[Id_Cargo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoCatDependencias]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoCatDependencias](
	[Id_Dependencia] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Id_Dependencia_Padre] [int] NULL,
	[Id_Institucion] [int] NULL,
 CONSTRAINT [PK_ProyectoCatDependencias] PRIMARY KEY CLUSTERED 
(
	[Id_Dependencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoCatTipoParticipaciones]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoCatTipoParticipaciones](
	[IdTipoParticipacion] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_ProyectoCatTipoParticipaciones] PRIMARY KEY CLUSTERED 
(
	[IdTipoParticipacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoTableAgenda]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableAgenda](
	[IdAgenda] [int] IDENTITY(1,1) NOT NULL,
	[Id_Investigador] [int] NULL,
	[Id_Dependencia] [int] NULL,
	[Dia] [nvarchar](50) NULL,
	[Hora_Inicial] [nvarchar](50) NULL,
	[Hora_Final] [nvarchar](50) NULL,
	[Fecha_Caducidad] [datetime] NULL,
 CONSTRAINT [PK_ProyectoTableAgendas] PRIMARY KEY CLUSTERED 
(
	[IdAgenda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoTableDependencias_Usuarios]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableDependencias_Usuarios](
	[Id_Investigador] [int] NOT NULL,
	[Id_Dependencia] [int] NOT NULL,
	[Id_Cargo] [int] NULL,
 CONSTRAINT [PK_ProyectoTableDependencias_Usuarios] PRIMARY KEY CLUSTERED 
(
	[Id_Investigador] ASC,
	[Id_Dependencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoTableEvidencias]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableEvidencias](
	[IdEvidencia] [int] IDENTITY(1,1) NOT NULL,
	[IdTipo] [int] NULL,
	[Data] [nvarchar](max) NULL,
	[IdTarea] [int] NULL,
 CONSTRAINT [PK_ProyectoTableEvidencias] PRIMARY KEY CLUSTERED 
(
	[IdEvidencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Datos_Laborales]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Datos_Laborales](
	[Id_DatoL] [int] IDENTITY(1,1) NOT NULL,
	[Id_Investigador] [int] NULL,
	[Id_Cargo] [int] NULL,
	[Fecha_Inicio] [date] NULL,
	[Fecha_Finalizacion] [date] NULL,
	[Unidad] [nvarchar](150) NULL,
	[Institucion] [nvarchar](150) NULL,
 CONSTRAINT [PK_Tbl_Datos_Laborales] PRIMARY KEY CLUSTERED 
(
	[Id_DatoL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Distinciones]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Distinciones](
	[Id_Distincion] [int] IDENTITY(1,1) NOT NULL,
	[Id_Investigador] [int] NULL,
	[Id_Tipo_Distincion] [int] NULL,
	[Descripcion] [nvarchar](50) NULL,
	[fecha] [date] NULL,
	[Id_Institucion] [int] NULL,
	[Montos] [float] NULL,
 CONSTRAINT [PK_Tbl_Distinciones] PRIMARY KEY CLUSTERED 
(
	[Id_Distincion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Evento]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Evento](
	[Id_Evento] [int] IDENTITY(1,1) NOT NULL,
	[Id_Tipo_Evento] [int] NULL,
	[Nombre] [nvarchar](250) NULL,
	[Id_Pais] [int] NULL,
	[Fecha_Inicio] [date] NULL,
	[Fecha_Finalizacion] [date] NULL,
	[Modalidad] [nvarchar](50) NULL,
	[Modalidad_Ponencia] [nvarchar](50) NULL,
	[Link] [nvarchar](250) NULL,
	[Datos_Adicionales] [nvarchar](250) NULL,
	[Id_Investigador] [int] NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_Evento] PRIMARY KEY CLUSTERED 
(
	[Id_Evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Formacion_Academica]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Formacion_Academica](
	[IdFormacion] [int] IDENTITY(1,1) NOT NULL,
	[Id_TipoEstudio] [int] NULL,
	[Id_Institucion] [int] NULL,
	[Titulo] [nvarchar](50) NULL,
	[Disciplina] [nvarchar](50) NULL,
	[Fecha_Inicio] [date] NULL,
	[Fecha_Finalizacion] [date] NULL,
	[Id_Investigador] [int] NULL,
 CONSTRAINT [PK_Tbl_Formacion_Academica] PRIMARY KEY CLUSTERED 
(
	[IdFormacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Grupos]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Grupos](
	[Id_Grupo] [int] IDENTITY(1,1) NOT NULL,
	[Id_Investigador_Crea] [int] NULL,
	[Id_TipoGrupo] [int] NULL,
	[Fecha_Creacion] [date] NULL,
	[Estado] [nvarchar](50) NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_Grupos] PRIMARY KEY CLUSTERED 
(
	[Id_Grupo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_InstitucionesAsociadasGrupos]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_InstitucionesAsociadasGrupos](
	[Id_Institucion] [int] NOT NULL,
	[Id_Grupo] [int] NOT NULL,
	[Fecha_Incorporacion] [date] NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_InstitucionesAsociadas] PRIMARY KEY CLUSTERED 
(
	[Id_Institucion] ASC,
	[Id_Grupo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_InvestigadoresAsociados]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_InvestigadoresAsociados](
	[Id_Grupo] [int] NOT NULL,
	[Id_Investigador] [int] NOT NULL,
	[Fecha_Incorporacion] [date] NULL,
	[Estado] [nvarchar](50) NULL,
	[Id_TipoMiembro] [int] NULL,
 CONSTRAINT [PK_Tbl_InvestigadoresAsociados] PRIMARY KEY CLUSTERED 
(
	[Id_Grupo] ASC,
	[Id_Investigador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Invitaciones]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Invitaciones](
	[Id_Invitacion] [int] IDENTITY(1,1) NOT NULL,
	[Id_Investigador] [int] NULL,
	[Id_Evento] [int] NULL,
	[Estado] [nvarchar](50) NULL,
	[Fecha_Invitacion] [date] NULL,
 CONSTRAINT [PK_Tbl_Invitaciones] PRIMARY KEY CLUSTERED 
(
	[Id_Invitacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Participantes_Eventos]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Participantes_Eventos](
	[Id_Investigador] [int] NOT NULL,
	[Id_Evento] [int] NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Id_Tipo_Participacion] [int] NULL,
	[Fecha_Participacion] [datetime] NULL,
	[Titulo] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_Participantes_Eventos] PRIMARY KEY CLUSTERED 
(
	[Id_Investigador] ASC,
	[Id_Evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Patentes]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Patentes](
	[Id_Patente] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [date] NULL,
	[Id_Institucion] [int] NULL,
	[Id_Investigador] [int] NULL,
	[Estado] [nvarchar](50) NULL,
	[Descripcion] [nvarchar](max) NULL,
 CONSTRAINT [PK_Tbl_Patentes] PRIMARY KEY CLUSTERED 
(
	[Id_Patente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblProcesosEditoriales]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblProcesosEditoriales](
	[Id_Proceso_Editorial] [int] IDENTITY(1,1) NOT NULL,
	[Id_Investigador] [int] NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Fecha] [date] NULL,
	[Id_Tipo_Proceso_Editorial] [int] NULL,
 CONSTRAINT [PK_TblProcesosEditoriales] PRIMARY KEY CLUSTERED 
(
	[Id_Proceso_Editorial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[Security_Permissions]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[Security_Permissions](
	[Id_Permission] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](100) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Security_Permissions] PRIMARY KEY CLUSTERED 
(
	[Id_Permission] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[Security_Permissions_Roles]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[Security_Permissions_Roles](
	[Id_Role] [int] NOT NULL,
	[Id_Permission] [int] NOT NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Security_Permissions_Roles] PRIMARY KEY CLUSTERED 
(
	[Id_Role] ASC,
	[Id_Permission] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[Security_Roles]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[Security_Roles](
	[Id_Role] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](150) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Security_Roles] PRIMARY KEY CLUSTERED 
(
	[Id_Role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[Security_Users]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[Security_Users](
	[Id_User] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [nvarchar](150) NULL,
	[Estado] [nvarchar](50) NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Password] [nvarchar](500) NULL,
	[Mail] [nvarchar](150) NULL,
	[Token] [nvarchar](500) NULL,
	[Token_Date] [datetime] NULL,
	[Token_Expiration_Date] [datetime] NULL,
 CONSTRAINT [PK_Security_Users] PRIMARY KEY CLUSTERED 
(
	[Id_User] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[Security_Users_Roles]    Script Date: 24/2/2023 16:14:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[Security_Users_Roles](
	[Id_Role] [int] NOT NULL,
	[Id_User] [int] NOT NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Security_Users_Roles] PRIMARY KEY CLUSTERED 
(
	[Id_Role] ASC,
	[Id_User] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Cat_Cargo_Proyecto] ON 

INSERT [dbo].[Cat_Cargo_Proyecto] ([Id_Cargo_Proyecto], [Descripcion], [Estado]) VALUES (1, N'Gerente', N'act')
INSERT [dbo].[Cat_Cargo_Proyecto] ([Id_Cargo_Proyecto], [Descripcion], [Estado]) VALUES (2, N'Asistente', N'act')
SET IDENTITY_INSERT [dbo].[Cat_Cargo_Proyecto] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Cargos] ON 

INSERT [dbo].[Cat_Cargos] ([Id_Cargo], [Descripcion], [Estado]) VALUES (1, N'Gerente', N'Activo')
INSERT [dbo].[Cat_Cargos] ([Id_Cargo], [Descripcion], [Estado]) VALUES (2, N'Decano', N'Activo')
INSERT [dbo].[Cat_Cargos] ([Id_Cargo], [Descripcion], [Estado]) VALUES (3, N'Director', N'Activo')
INSERT [dbo].[Cat_Cargos] ([Id_Cargo], [Descripcion], [Estado]) VALUES (4, N'Técnico', N'Activo')
INSERT [dbo].[Cat_Cargos] ([Id_Cargo], [Descripcion], [Estado]) VALUES (5, N'Docente', N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_Cargos] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Disciplinas] ON 

INSERT [dbo].[Cat_Disciplinas] ([Id_Disciplina], [DescripcionDisciplina], [Color], [Icono], [Estado]) VALUES (1, N'Social', N'#8e1010', N'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAewAAAHsBR0tLmwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADySURBVDiNzdExSkNBEMbxXyJE0wYMqYwhViqCEbS0EEVJINiJ3sHCwlt4hWjpHbyD2KmFoGBlsBZtnoXzcAkPEwTBgQ92Z//fzO4s/z2amPuNsYQLZKHzyE0cO4k513YRWE7WmzjCDBoFbAMVHGBr9LCfdLpEHcMkN8QsBknuML3BalJsDS/YwFloPYp0Eq4DU7F5xB6qOMU9eljAdDS6i8K7eMYJXtNntLGCVsCjQ7zFfDDt1FjDVUDHuCkw57oOJgtPje///sD+D+Zc/WAzDMroxk0esGh8LAULvRKWY1BvMaTmmAJPvr65ivcJGv5xfALYlUYKw+IFRAAAAABJRU5ErkJggg==', N'Activo')
INSERT [dbo].[Cat_Disciplinas] ([Id_Disciplina], [DescripcionDisciplina], [Color], [Icono], [Estado]) VALUES (2, N'Didáctica', N'#9966ff', N'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADbSURBVDiNtdM9SkNBFAXgLy/BBFGwE1xANhBQsEkKd6BmA4Iuwjo70DXEHdiZzkJIJ2ijQkDU2jYQi3fFRzIRM+CFwzDDOef+zAz/HM3AylHgGE+Y4BSNvwhrIXzEbA4vYVRfJj7AOCGcx30kqX1n7GGA/YrZB+7wGvsd7GG7wrnFeYE1P4O6CcMOhngOXMVZNzgi4Ua19yPs4hLTROlTXASnj3e0UrMY/dL/qMJ7Q6tIOawSuQZ1Zfnrqcdxhs0lws9YD7GFk8wCXCtn8pBr0FZeby/XgMxPthBfWi0148GsgHEAAAAASUVORK5CYII=', N'Activo')
INSERT [dbo].[Cat_Disciplinas] ([Id_Disciplina], [DescripcionDisciplina], [Color], [Icono], [Estado]) VALUES (3, N'Robótica', N' #ff3333', N'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFSSURBVDiNpdMxS5ZhFAbg69YUi4aClE8oMFoiGsSgBmlSaPAPBDm1ukRQUDRE/YKgobnam4JIjOoHBNIUQRTREA0WuJmdhl7j9e37TPDAgcNz7nM/9znneVJV9mJDOyWTHElyO8mpJL0kN5IM75oAz3Aa5zCCm7izK4IkJ/ETLzCGcTzBdJK/dRk0gyQTmMF7jOIbTuAQlqvqF6iqvo7DWMcDXMM0PmKljRvYQlWt4QqO4y2+oHB9m9L/rTFJDz8w3BCvt/NDLeBMkltJRpIsJTmaZLFRsYSNbvGWXfVnymt4hzMtqfeauDDbmdElLMJ3TLWAC5jFAZzHRcy32t2PRw32E8x1CAqreI35zq1TeNNgPuMsLPchaPtTjDUEj5uzV5jYWsAH9HYgeIkLeI5J3MW+lioHm+AhNvsQ3MdlfMWx7oPb9g6SjPr3f2xW1YYB9hsJ0rLCz6V3IwAAAABJRU5ErkJggg==', N'Activo')
INSERT [dbo].[Cat_Disciplinas] ([Id_Disciplina], [DescripcionDisciplina], [Color], [Icono], [Estado]) VALUES (4, N'Salud', N'#668cff', N'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAD+SURBVDiNhdG/L0NRGMbxT9V/UbvJLMEskUr/CDEx2Uz2kvCvsNoIaWsXkwmz6oAOdQ3e25x7nbZP8uacPOf7vOdX02wto4NVPONnDjtVE1s4xSuKqBd0sYmlXLCLW4yS0Kwa4SYyGtGgyDTtoxfzDaxnmDJf2eEdOxm4jWGNnSo10/BRVKndRQ16qvoHYpD69Re9j/G4FizCg7s0UDb4irFhsUrmMzWfYpd+Dc5d4SG8x9Q8S+B24p9EleokXDdtsIJxLAz9vXZdHXwE841WHdhX/aIBznGRHLusvcwG4DA5Sa7GOJgVLrWGK0yS4ASXsVbRvG9rYTvm13jLQb+fOWNV7zNQxwAAAABJRU5ErkJggg==', N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_Disciplinas] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Idiomas] ON 

INSERT [dbo].[Cat_Idiomas] ([Id_Idioma], [Descripcion], [Estado]) VALUES (1, N'Español', N'Activo')
INSERT [dbo].[Cat_Idiomas] ([Id_Idioma], [Descripcion], [Estado]) VALUES (2, N'Ingles', N'Activo')
INSERT [dbo].[Cat_Idiomas] ([Id_Idioma], [Descripcion], [Estado]) VALUES (3, N'Portugues', N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_Idiomas] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_instituciones] ON 

INSERT [dbo].[Cat_instituciones] ([Id_Institucion], [Nombre], [Direccion], [Estado], [Logo]) VALUES (1, N'UNAN', N'Carazo', N'Activo', N'icon.png')
INSERT [dbo].[Cat_instituciones] ([Id_Institucion], [Nombre], [Direccion], [Estado], [Logo]) VALUES (2, N'Carlos III Madrid', N'Madrid', N'Activo', N'icon.png')
INSERT [dbo].[Cat_instituciones] ([Id_Institucion], [Nombre], [Direccion], [Estado], [Logo]) VALUES (3, N'UAB', N'Barcelona', N'Activo', N'icon.png')
INSERT [dbo].[Cat_instituciones] ([Id_Institucion], [Nombre], [Direccion], [Estado], [Logo]) VALUES (4, N'CONICIT', N'Managua', N'Activo', N'icon.png')
INSERT [dbo].[Cat_instituciones] ([Id_Institucion], [Nombre], [Direccion], [Estado], [Logo]) VALUES (5, N'TestIN', N'Nicaragua', N'Activo', N'icon.png')
SET IDENTITY_INSERT [dbo].[Cat_instituciones] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Localidad] ON 

INSERT [dbo].[Cat_Localidad] ([Id_Localidad], [Nombre_Localidad], [Id_Tipo_Localidad], [Id_LocalidadPadre], [Id_Pais], [Latitud], [Longitud], [Estado]) VALUES (1, N'Jinotepe', 2, 5, 10, NULL, NULL, N'Activo')
INSERT [dbo].[Cat_Localidad] ([Id_Localidad], [Nombre_Localidad], [Id_Tipo_Localidad], [Id_LocalidadPadre], [Id_Pais], [Latitud], [Longitud], [Estado]) VALUES (2, N'Diriamba', 2, 5, 10, NULL, NULL, N'Activo')
INSERT [dbo].[Cat_Localidad] ([Id_Localidad], [Nombre_Localidad], [Id_Tipo_Localidad], [Id_LocalidadPadre], [Id_Pais], [Latitud], [Longitud], [Estado]) VALUES (3, N'Managua', 2, 6, 10, NULL, NULL, N'Activo')
INSERT [dbo].[Cat_Localidad] ([Id_Localidad], [Nombre_Localidad], [Id_Tipo_Localidad], [Id_LocalidadPadre], [Id_Pais], [Latitud], [Longitud], [Estado]) VALUES (4, N'Leon', 2, 7, 10, NULL, NULL, N'Activo')
INSERT [dbo].[Cat_Localidad] ([Id_Localidad], [Nombre_Localidad], [Id_Tipo_Localidad], [Id_LocalidadPadre], [Id_Pais], [Latitud], [Longitud], [Estado]) VALUES (5, N'Carazo', 1, NULL, 10, NULL, NULL, N'Activo')
INSERT [dbo].[Cat_Localidad] ([Id_Localidad], [Nombre_Localidad], [Id_Tipo_Localidad], [Id_LocalidadPadre], [Id_Pais], [Latitud], [Longitud], [Estado]) VALUES (6, N'Leon', 1, NULL, 10, NULL, NULL, N'Activo')
INSERT [dbo].[Cat_Localidad] ([Id_Localidad], [Nombre_Localidad], [Id_Tipo_Localidad], [Id_LocalidadPadre], [Id_Pais], [Latitud], [Longitud], [Estado]) VALUES (7, N'Managua', 1, NULL, 10, NULL, NULL, N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_Localidad] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Paises] ON 

INSERT [dbo].[Cat_Paises] ([Id_Pais], [Estado], [Descripcion]) VALUES (10, N'Activo', N'Nicaragua')
INSERT [dbo].[Cat_Paises] ([Id_Pais], [Estado], [Descripcion]) VALUES (11, N'Activo', N'Brazil')
INSERT [dbo].[Cat_Paises] ([Id_Pais], [Estado], [Descripcion]) VALUES (12, N'Activo', N'Costa Rica 3')
INSERT [dbo].[Cat_Paises] ([Id_Pais], [Estado], [Descripcion]) VALUES (13, N'Activo', N'EEUU')
SET IDENTITY_INSERT [dbo].[Cat_Paises] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Asociacion] ON 

INSERT [dbo].[Cat_Tipo_Asociacion] ([Id_Tipo_Asociacion], [Descripcion], [Estado]) VALUES (1, N'Financiante', N'act')
INSERT [dbo].[Cat_Tipo_Asociacion] ([Id_Tipo_Asociacion], [Descripcion], [Estado]) VALUES (2, N'Colaboradora', N'act')
INSERT [dbo].[Cat_Tipo_Asociacion] ([Id_Tipo_Asociacion], [Descripcion], [Estado]) VALUES (3, N'Ejecutora', N'act')
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Asociacion] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Colaborador] ON 

INSERT [dbo].[Cat_Tipo_Colaborador] ([Id_Tipo_Colaboracion], [Descripcion], [Estado]) VALUES (1, N'Tutor', N'act')
INSERT [dbo].[Cat_Tipo_Colaborador] ([Id_Tipo_Colaboracion], [Descripcion], [Estado]) VALUES (2, N'Acesor', N'act')
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Colaborador] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Evento] ON 

INSERT [dbo].[Cat_Tipo_Evento] ([Id_Tipo_Evento], [Descripcion], [Estado]) VALUES (1, N'Congreso', N'Activo')
INSERT [dbo].[Cat_Tipo_Evento] ([Id_Tipo_Evento], [Descripcion], [Estado]) VALUES (2, N'Simposio', N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Evento] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Investigacion] ON 

INSERT [dbo].[Cat_Tipo_Investigacion] ([Id_Tipo_Investigacion], [Descripcion], [Estado]) VALUES (1, N'Doctorado', N'Activo')
INSERT [dbo].[Cat_Tipo_Investigacion] ([Id_Tipo_Investigacion], [Descripcion], [Estado]) VALUES (2, N'Master', N'Activo')
INSERT [dbo].[Cat_Tipo_Investigacion] ([Id_Tipo_Investigacion], [Descripcion], [Estado]) VALUES (3, N'Grado', N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Investigacion] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Participacion_Eventos] ON 

INSERT [dbo].[Cat_Tipo_Participacion_Eventos] ([Id_Tipo_Participacion], [Descripcion]) VALUES (1, N'PONENTE')
INSERT [dbo].[Cat_Tipo_Participacion_Eventos] ([Id_Tipo_Participacion], [Descripcion]) VALUES (2, N'FACILITADOR')
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Participacion_Eventos] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Proceso_Editorial] ON 

INSERT [dbo].[Cat_Tipo_Proceso_Editorial] ([Id_Tipo_Proceso_Editorial], [Descripcion], [Estado]) VALUES (1, N'Libro', N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Proceso_Editorial] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Proyecto] ON 

INSERT [dbo].[Cat_Tipo_Proyecto] ([Id_Tipo_Proyecto], [Descripcion_Tipo_Proyecto], [Estado_Tipo_Proyecto], [Icon]) VALUES (1, N'Internacional', N'act', N'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')
INSERT [dbo].[Cat_Tipo_Proyecto] ([Id_Tipo_Proyecto], [Descripcion_Tipo_Proyecto], [Estado_Tipo_Proyecto], [Icon]) VALUES (2, N'Inversión', N'act', N'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')
INSERT [dbo].[Cat_Tipo_Proyecto] ([Id_Tipo_Proyecto], [Descripcion_Tipo_Proyecto], [Estado_Tipo_Proyecto], [Icon]) VALUES (3, N'Académico', N'act', N'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAPfSURBVHic7dtLaFxVGMDxX9LaNibFCoqmahMjpFK0KkUXihUhG0GXLtxY3LgRUXxQdVU3VnyBO12JQVy4ERSs0iBSXfmu+FhpoKC12JpWG/OgTV18d0xynUlmpvfeudPeP3ybcOac73Ve37mhoqKioqJjXJvIeUM/xvAqDuFMIkcwjnuxqWPa5cQIHsF+zFk0upGcwpfYgx3oKVzjs6RRlNuVrsiOVqPcrpQmO7KOcldkR1FRLk12lCXKhWfHnfgY8yUwIiuZT2y6I21sOk36Es9tbMVjXcQJXCamMOhNNViPC4vUqGD6hY3/sSbVYBYzuA0XFKRUUfyDZ/DJ0j82Win7hBPGcA+25alZjkyKXWsCH+LvdINmt4oR4Ywx3IWBjBTMmll8JgyewFd5DNInHPE8ftD5Ff4XvC62u44s3iN4EO+IFMvb4BmR1rvFgadU5JUdHY9yu7SbHe1GeRA3Z6R75qyWHe1GeQDP4Rss4I3sVG6NPhGBZhnFA4mMtvC7wWSsGsOWO7JjDqgp8rO4QI1hXQb9rhHTYI+47S0kY6XHLY0DlspJvC/WgStb6OtSMRXG8WedfodXGLclB6xtpXEb9OPuROBH4ZAJHBC3NCLKN1o8ed6qoGpP3g5Isy2R3ZgW06VH7Bb9BeuC4h2wlH5s7+D4+P91+Gz4w5J7do7MJWNlQpYOmMYTFud1Hszj8WSs0rJFbIMzsi1pjeOaOuMNK8k2mCYLR6xkeI0hJXVAjXYc0YzhNdZhaslvn8xW/ewYwmtWflOYS9oMtdj37XgXe7EhI31zY1QchNLG79fanaCr6RXROp3IXtnuSF3DFlzVaSUqKirOX+rduXfiMdldT8/gsHileQ9fr9J+h6gJXC3KX1nVBabxiqhDNGQ9jsvuDF9PvhUHlzQ7cTDnsaesUqZLn6vzktOiklujdiYoYuxlp8x0QaSoj4568XSiEDxV0LikbMzD4I2iVj8gSl3bcb1I++Em+5jEp/heTItJUWA9qc4Lb7fQg1vwolgU06n5G15Q4pedLNmAh3EMR/GQ1JcbRVGbAtfh8gz6WxC7yHGx4k6t0v4SEf1jq7S7OJFNiWRxcfpdTDEvy2/FPYoP8Kyo+zfLTclv9iV95KXfS/BXjgOk5XPsUn/x7RXvhF8UqM8J+KjAAWtyAFuXGL9VrPpF67GvR2xXu2R3L1+Li7AZN+CKBu1m8bbIhvs0LmX9Kk6Ph0XETmWk5yFRd8ydzXgU32k+MgfFd8mtPLeXnh7cb+VFbUoYfk6XxwbxluXfIs/hTR2IeCf/HWXA4j9M/aTkz10VFRUV5yT/AgeCSWxx2ygvAAAAAElFTkSuQmCC')
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Proyecto] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_TipoEstudio] ON 

INSERT [dbo].[Cat_TipoEstudio] ([Id_TipoEstudio], [Descripcion], [Estado]) VALUES (1, N'Grado', N'Activo')
INSERT [dbo].[Cat_TipoEstudio] ([Id_TipoEstudio], [Descripcion], [Estado]) VALUES (2, N'Maestría', N'Activo')
INSERT [dbo].[Cat_TipoEstudio] ([Id_TipoEstudio], [Descripcion], [Estado]) VALUES (3, N'Doctorado', N'Activo')
INSERT [dbo].[Cat_TipoEstudio] ([Id_TipoEstudio], [Descripcion], [Estado]) VALUES (4, N'Especialidad', N'Activo')
INSERT [dbo].[Cat_TipoEstudio] ([Id_TipoEstudio], [Descripcion], [Estado]) VALUES (5, N'Técnico', N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_TipoEstudio] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_TipoGrupo] ON 

INSERT [dbo].[Cat_TipoGrupo] ([Id_TipoGrupo], [Descripcion], [Estado]) VALUES (1, N'Grupos de investigación', N'Activo')
INSERT [dbo].[Cat_TipoGrupo] ([Id_TipoGrupo], [Descripcion], [Estado]) VALUES (2, N'Redes de conocimiento', N'Activo')
INSERT [dbo].[Cat_TipoGrupo] ([Id_TipoGrupo], [Descripcion], [Estado]) VALUES (3, N'Academicos', N'Activo')
INSERT [dbo].[Cat_TipoGrupo] ([Id_TipoGrupo], [Descripcion], [Estado]) VALUES (4, N'Sociedad', N'Activo')
INSERT [dbo].[Cat_TipoGrupo] ([Id_TipoGrupo], [Descripcion], [Estado]) VALUES (5, N'Comisiones', N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_TipoGrupo] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_TipoLocalidad] ON 

INSERT [dbo].[Cat_TipoLocalidad] ([Id_Tipo_Localidad], [Nombre_TipoLocalidad]) VALUES (1, N'Departamento')
INSERT [dbo].[Cat_TipoLocalidad] ([Id_Tipo_Localidad], [Nombre_TipoLocalidad]) VALUES (2, N'Municipio')
INSERT [dbo].[Cat_TipoLocalidad] ([Id_Tipo_Localidad], [Nombre_TipoLocalidad]) VALUES (3, N'Provincia')
SET IDENTITY_INSERT [dbo].[Cat_TipoLocalidad] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_TipoMiembro] ON 

INSERT [dbo].[Cat_TipoMiembro] ([Id_TipoMiembro], [Descripcion], [Estado]) VALUES (1, N'Coordinador', N'Activo')
INSERT [dbo].[Cat_TipoMiembro] ([Id_TipoMiembro], [Descripcion], [Estado]) VALUES (2, N'Secretario', N'Activo')
INSERT [dbo].[Cat_TipoMiembro] ([Id_TipoMiembro], [Descripcion], [Estado]) VALUES (3, N'Colaborador', N'Activo')
SET IDENTITY_INSERT [dbo].[Cat_TipoMiembro] OFF
GO
SET IDENTITY_INSERT [dbo].[CatalogoTipoEvidencia] ON 

INSERT [dbo].[CatalogoTipoEvidencia] ([IdTipo], [Descripcion], [Estado]) VALUES (1, N'IMG', NULL)
INSERT [dbo].[CatalogoTipoEvidencia] ([IdTipo], [Descripcion], [Estado]) VALUES (2, N'PDF', NULL)
SET IDENTITY_INSERT [dbo].[CatalogoTipoEvidencia] OFF
GO
SET IDENTITY_INSERT [dbo].[CatRedesSociales] ON 

INSERT [dbo].[CatRedesSociales] ([Id_RedSocial], [Descripcion], [url], [Icon], [Estado]) VALUES (1, N'Facebook', N'facebook.com', N'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', N'Activo')
INSERT [dbo].[CatRedesSociales] ([Id_RedSocial], [Descripcion], [url], [Icon], [Estado]) VALUES (2, N'LinkIn', N'https://www.linkedin.com/', N'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', N'Activo')
INSERT [dbo].[CatRedesSociales] ([Id_RedSocial], [Descripcion], [url], [Icon], [Estado]) VALUES (3, N'Twitter', N'twitter.com', N'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', N'Activo')
SET IDENTITY_INSERT [dbo].[CatRedesSociales] OFF
GO
SET IDENTITY_INSERT [dbo].[CatTipoDistincion] ON 

INSERT [dbo].[CatTipoDistincion] ([Id_Tipo_Distincion], [Descripcion], [Estado]) VALUES (1, N'Doctorado', N'Activo')
INSERT [dbo].[CatTipoDistincion] ([Id_Tipo_Distincion], [Descripcion], [Estado]) VALUES (2, N'Beca', N'Activo')
SET IDENTITY_INSERT [dbo].[CatTipoDistincion] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoCatCargosDependencias] ON 

INSERT [dbo].[ProyectoCatCargosDependencias] ([Id_Cargo], [Descripcion]) VALUES (1, N'Encargado')
INSERT [dbo].[ProyectoCatCargosDependencias] ([Id_Cargo], [Descripcion]) VALUES (2, N'Coordinador')
INSERT [dbo].[ProyectoCatCargosDependencias] ([Id_Cargo], [Descripcion]) VALUES (3, N'Tecnico')
SET IDENTITY_INSERT [dbo].[ProyectoCatCargosDependencias] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoCatDependencias] ON 

INSERT [dbo].[ProyectoCatDependencias] ([Id_Dependencia], [Descripcion], [Id_Dependencia_Padre], [Id_Institucion]) VALUES (1, N'USAV', 10, NULL)
INSERT [dbo].[ProyectoCatDependencias] ([Id_Dependencia], [Descripcion], [Id_Dependencia_Padre], [Id_Institucion]) VALUES (2, N'CTS', 10, NULL)
INSERT [dbo].[ProyectoCatDependencias] ([Id_Dependencia], [Descripcion], [Id_Dependencia_Padre], [Id_Institucion]) VALUES (3, N'TIC', NULL, NULL)
INSERT [dbo].[ProyectoCatDependencias] ([Id_Dependencia], [Descripcion], [Id_Dependencia_Padre], [Id_Institucion]) VALUES (10, N'test', 1, 1)
SET IDENTITY_INSERT [dbo].[ProyectoCatDependencias] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoCatTipoParticipaciones] ON 

INSERT [dbo].[ProyectoCatTipoParticipaciones] ([IdTipoParticipacion], [Descripcion]) VALUES (1, N'Colaborador')
INSERT [dbo].[ProyectoCatTipoParticipaciones] ([IdTipoParticipacion], [Descripcion]) VALUES (2, N'Coordinador')
SET IDENTITY_INSERT [dbo].[ProyectoCatTipoParticipaciones] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoTableActividades] ON 

INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (1, N'Actividad de prueba 1', N'Test de actividad', 1, N'Finalizada', 3, NULL, NULL, 1)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (2, N'Actividad de prueba 2', N'Test de actividad', 2, N'Finalizada', 1, NULL, NULL, 1)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (3, N'Actividad de prueba 3', N'Test de actividad', 1, N'Activa', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (4, N'Actividad de prueba 3', N'Test de actividad', 1, N'Pendiente', 1, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (5, N'Actividad de prueba 3', N'Test de actividad', 1, N'Pendiente', 1, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (6, N'Actividad de prueba 3', N'Test de actividad', 1, N'Finalizada', 2, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (7, N'Actividad de prueba 3', N'Test de actividad', 1, N'Finalizada', 2, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (8, N'Actividad de prueba 3', N'Test de actividad', 1, N'Pendiente', 2, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (9, N'Actividad de prueba 3', N'Test de actividad', 1, N'En Proceso', 2, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (10, N'Actividad de prueba 3', N'Test de actividad', 1, N'Finalizada', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (11, N'Actividad de prueba 3', N'Test de actividad', 1, N'Finalizada', 1, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (12, N'Actividad de prueba 3', N'Test de actividad', 1, N'Finalizada', 1, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (13, N'Actividad de prueba 3', N'Test de actividad', 1, N'Activa', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (14, N'Actividad de prueba 3', N'Test de actividad', 1, N'En Proceso', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (15, N'Actividad de prueba 3', N'Test de actividad', 1, N'Activa', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (16, N'Actividad de prueba 3', N'Test de actividad', 1, N'Pendiente', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (17, N'Actividad de prueba 3', N'Test de actividad', 1, N'En Proceso', 2, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (18, N'Actividad de prueba 3', N'Test de actividad', 1, N'Activa', 2, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (19, N'Actividad de prueba 3', N'Test de actividad', 1, N'Pendiente', 2, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (20, N'Actividad de prueba 3', N'Test de actividad', 1, N'En Proceso', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (21, N'Actividad de prueba 3', N'Test de actividad', 1, N'En Proceso', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (22, N'Actividad de prueba 3', N'Test de actividad', 1, N'En Proceso', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (23, N'Actividad de prueba 3', N'Test de actividad', 1, N'Finalizada', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (24, N'Actividad de prueba 3', N'Test de actividad', 1, N'Finalizada', 3, NULL, NULL, 2)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [Id_Investigador], [Estado], [Id_Dependencia], [Fecha_Inicial], [Fecha_Final], [Id_Proyecto]) VALUES (25, N'ert', N'ert', NULL, N'Activo', 1, CAST(N'2023-02-17T00:00:00.000' AS DateTime), CAST(N'2023-02-17T00:00:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[ProyectoTableActividades] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoTableAgenda] ON 

INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [Id_Investigador], [Id_Dependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (4, 1, 1, N'Lunes', N'08:00', N'17:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [Id_Investigador], [Id_Dependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (5, 1, 1, N'Martes', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [Id_Investigador], [Id_Dependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (8, 1, 1, N'Miercoles', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [Id_Investigador], [Id_Dependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (9, 1, 1, N'Jueves', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [Id_Investigador], [Id_Dependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (10, 1, 1, N'Viernes', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [Id_Investigador], [Id_Dependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (17, NULL, 10, N'Domingo', N'07:00', N'10:00', CAST(N'2023-02-24T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[ProyectoTableAgenda] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoTableCalendario] ON 

INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (1, 1, NULL, CAST(N'2022-04-28T08:00:00.000' AS DateTime), CAST(N'2022-04-28T08:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (2, 1, NULL, CAST(N'2022-04-28T09:00:00.000' AS DateTime), CAST(N'2022-04-28T09:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (3, 2, NULL, CAST(N'2022-04-29T08:00:00.000' AS DateTime), CAST(N'2022-04-29T08:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (4, 3, NULL, CAST(N'2022-04-29T09:00:00.000' AS DateTime), CAST(N'2022-04-29T09:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (5, 4, NULL, CAST(N'2022-04-28T12:00:00.000' AS DateTime), CAST(N'2022-04-28T12:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (6, 7, NULL, CAST(N'2022-04-29T10:00:00.000' AS DateTime), CAST(N'2022-04-29T10:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (7, 8, NULL, CAST(N'2022-04-29T10:00:00.000' AS DateTime), CAST(N'2022-04-29T10:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (8, 8, NULL, CAST(N'2022-04-28T11:00:00.000' AS DateTime), CAST(N'2022-04-28T11:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (9, 9, NULL, CAST(N'2022-04-29T10:00:00.000' AS DateTime), CAST(N'2022-04-29T10:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (10, 9, NULL, CAST(N'2022-04-28T11:00:00.000' AS DateTime), CAST(N'2022-04-28T11:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (11, 9, NULL, CAST(N'2022-04-28T10:00:00.000' AS DateTime), CAST(N'2022-04-28T10:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (12, 10, NULL, CAST(N'2022-04-28T13:00:00.000' AS DateTime), CAST(N'2022-04-28T13:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (13, 11, NULL, CAST(N'2022-04-29T11:00:00.000' AS DateTime), CAST(N'2022-04-29T11:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (14, 12, NULL, CAST(N'2022-04-29T12:00:00.000' AS DateTime), CAST(N'2022-04-29T12:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (15, 13, NULL, CAST(N'2022-04-29T13:00:00.000' AS DateTime), CAST(N'2022-04-29T13:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (16, 13, NULL, CAST(N'2022-04-29T14:00:00.000' AS DateTime), CAST(N'2022-04-29T14:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (17, 14, NULL, CAST(N'2022-04-29T15:00:00.000' AS DateTime), CAST(N'2022-04-29T15:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (18, 16, NULL, CAST(N'2022-06-16T08:00:00.000' AS DateTime), CAST(N'2022-06-16T08:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (19, 16, NULL, CAST(N'2022-06-16T09:00:00.000' AS DateTime), CAST(N'2022-06-16T09:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (20, 16, NULL, CAST(N'2022-06-16T10:00:00.000' AS DateTime), CAST(N'2022-06-16T10:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (21, 17, NULL, CAST(N'2022-06-17T08:00:00.000' AS DateTime), CAST(N'2022-06-17T08:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (22, 17, NULL, CAST(N'2022-06-17T09:00:00.000' AS DateTime), CAST(N'2022-06-17T09:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (23, 27, NULL, CAST(N'2023-02-20T08:00:00.000' AS DateTime), CAST(N'2023-02-20T08:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (24, 28, NULL, CAST(N'2023-02-20T08:00:00.000' AS DateTime), CAST(N'2023-02-20T08:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (25, 28, NULL, CAST(N'2023-02-20T09:00:00.000' AS DateTime), CAST(N'2023-02-20T09:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (26, 28, NULL, CAST(N'2023-02-20T10:00:00.000' AS DateTime), CAST(N'2023-02-20T10:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (27, 28, NULL, CAST(N'2023-02-20T11:00:00.000' AS DateTime), CAST(N'2023-02-20T11:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (28, 28, NULL, CAST(N'2023-02-20T12:00:00.000' AS DateTime), CAST(N'2023-02-20T12:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (29, 28, NULL, CAST(N'2023-02-20T13:00:00.000' AS DateTime), CAST(N'2023-02-20T13:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (30, 28, NULL, CAST(N'2023-02-20T14:00:00.000' AS DateTime), CAST(N'2023-02-20T14:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (31, 28, NULL, CAST(N'2023-02-20T15:00:00.000' AS DateTime), CAST(N'2023-02-20T15:59:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (32, 28, NULL, CAST(N'2023-02-20T16:00:00.000' AS DateTime), CAST(N'2023-02-20T16:59:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[ProyectoTableCalendario] OFF
GO
INSERT [dbo].[ProyectoTableDependencias_Usuarios] ([Id_Investigador], [Id_Dependencia], [Id_Cargo]) VALUES (1, 1, 1)
INSERT [dbo].[ProyectoTableDependencias_Usuarios] ([Id_Investigador], [Id_Dependencia], [Id_Cargo]) VALUES (1, 10, 1)
GO
SET IDENTITY_INSERT [dbo].[ProyectoTableEvidencias] ON 

INSERT [dbo].[ProyectoTableEvidencias] ([IdEvidencia], [IdTipo], [Data], [IdTarea]) VALUES (1, 1, N'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', 16)
INSERT [dbo].[ProyectoTableEvidencias] ([IdEvidencia], [IdTipo], [Data], [IdTarea]) VALUES (2, 1, N'/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAIgAmADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+b6K2B3ck9Oh+vqo/SrKQ7M4zzjqR2z6D3qeGE/Nj26An1qfyW/2v++T/AJ7H8q/VrSv0a7P5eVt1+Z8LeX938SpsPt/n8KljhL5z2x+ufcVZSAnOc8Y6jHr7j0qxFbkbse3v6+/vTS8kn5L/AICD3/7v4lPyAByCeenP55B/SjyV/uH/AMe/xrSCFOvf+n4n1FLWqw6mlJyav0t20/Q5KqvOV99Nm0tl5lBLcHOFI6dz7+pp/wBm/wA/5arw3c49u31pcv7/AJf/AFqlw5Hyq7t1tvez/N2JVd01yJXS8++vVN9e5RFuO65/HH9fr+dL9nX+5/48f8a0ogW3bs8Yx29fpU2xfT+f+NddJyVONkuv2pLq+iIlVcm21v5+Vuxj/Z1/uf8Ajx/xo+zr/c/8eP8AjWxsX0/n/jRsX0/n/jWnNLsv/ApE+08vx/4Bj/Z1/uf+PH/Gj7Ov9z/x4/41sbF9P5/40bF9P5/40c0uy/8AApB7Ty/H/gGP9nX+5/48f8aPs6/3P/Hj/jWxsX0/n/jRsX0/n/jRzS7L/wACkHtPL8f+AY/2df7n/jx/xo+zr/c/8eP+NbGxfT+f+NGxfT+f+NHNLsv/AAKQe08vx/4Bj/Z1/uf+PH/Gj7Ov9z/x4/41sbF9P5/40bF9P5/40c0uy/8AApB7Ty/H/gGP9nX+5/48f8aPs6/3P/Hj/jWxsX0/n/jRsX0/n/jRzS7L/wACkHtPL8f+AY/2df7n/jx/xo+zr/c/8eP+NbGxfT+f+NGxfT+f+NHNLsv/AAKQe08vx/4Bj/Z1/uf+PH/Gj7Ov9z/x4/41sbF9P5/40bF9P5/40c0uy/8AApB7Ty/H/gGP9nX+5/48f8aPs6/3P/Hj/jWxsX0/n/jRsX0/n/jRzS7L/wACkHtPL8f+AY/2df7n/jx/xo+zr/c/8eP+NbGxfT+f+NGxfT+f+NHNLsv/AAKQe08vx/4Bj/Z1/uf+PH/Gj7Ov9z/x4/41sbF9P5/40bF9P5/40c0uy/8AApB7Ty/H/gGP9nX+5/48f8aPs6/3P/Hj/jWxsX0/n/jRsX0/n/jRzS7L/wACkHtPL8f+AY/2df7n/jx/xo+zr/c/8eP+NbGxfT+f+NGxfT+f+NHNLsv/AAKQe08vx/4Bj/Z1/uf+PH/Gj7Ov9z/x4/41sbF9P5/40bF9P5/40c0uy/8AApB7Ty/H/gGP9nX+5/48f8aPs6/3P/Hj/jWjMANuB6/0qCnzP+nL/MtO6uVfIx90YPrnP8zR5Lf5x/jVqiodBVHzuCbfVy7adZX6BZdl9xV8jP3hn8cfyNH2df7n/jx/xq1RVJezXIlZLom+uvSVuoyr9nX+5/48f8aPs6/3P/Hj/jWjCAd2R6f1qfYvp/P/ABo5pdl/4FIhzs7W/H/gGP8AZ1/uf+PH/Gj7Ov8Ac/8AHj/jWxsX0/n/AI0bF9P5/wCNHNLsv/ApC9p5fj/wDH+zr/c/8eP+NH2df7n/AI8f8a2Ni+n8/wDGjYvp/P8Axo5pdl/4FIPaeX4/8Ax/s6/3P/Hj/jR9nX+5/wCPH/GtjYvp/P8Axo2L6fz/AMaOaXZf+BSD2nl+P/AMf7Ov9z/x4/40fZ1/uf8Ajx/xrY2L6fz/AMaNi+n8/wDGjml2X/gUg9p5fj/wDH+zr/c/8eP+NH2df7n/AI8f8a2Ni+n8/wDGjYvp/P8Axo5pdl/4FIPaeX4/8Ax/s6/3P/Hj/jR9nX+5/wCPH/GtjYvp/P8Axo2L6fz/AMaOaXZf+BSD2nl+P/AMf7Ov9z/x4/40fZ1/uf8Ajx/xrY2L6fz/AMaNi+n8/wDGjml2X/gUg9p5fj/wDH+zr/c/8eP+NH2df7n/AI8f8a2Ni+n8/wDGjYvp/P8Axo5pdl/4FIPaeX4/8Ax/s6/3P/Hj/jR9nX+5/wCPH/GtjYvp/P8Axo2L6fz/AMaOaXZf+BSD2nl+P/AMf7Ov9z/x4/40fZ1/uf8Ajx/xrY2L6fz/AMaNi+n8/wDGjml2X/gUg9p5fj/wDH+zr/c/8eP+NH2df7n/AI8f8a2Ni+n8/wDGjYvp/P8Axo5pdl/4FIPaeX4/8AxjbjsuPxz/AFpPs3+f8tWpKCMbc/z9fr7VFl/f8v8A61cdW7qSdt7d30S3f9dDSOIcVZR/H/7UzXgAxlSevr7eh+v51H5K/wBw/wDj3+NapLd8/lim0lh1NKTk1fpbtp+gOXtHzu6b83006WXTsZLwdNo29c5Lc9MetR+Q/qv5n/Ctny/M68Y9s9fxHpUb2542kHrngD0x1PNZSp8knFNO1t473s/6/wCGIa32+ab7by/re3YyTEy9SOfr/hUTw78ZzxnoR3x6j2rSlgYbffPQA+h7E9qqzQn5cg9+oI9P8P0pWfZJ91/lZb+p2UXL2cbcnX/0p/5/iakcTR5yOuMdO2fQn1FSVI56fj/SnwgHdken9a7qWlONl302+0zkvaN7fLbqQVPCR82fbHGfWp9i+n8/8aekO/OMDGOpPfP19Kv3vJerdvyJ5nLRKzfW/wDwBoI7UtWY7XrkgdOh+vXKmpPso9T+f/2NdEF7qu9fJXW/r9/o/K65e8rPr17dfmv6RUERl6HG3+v4H0pfsp9R+f8A9jWhFF5W7BJ3Y/TPsPWparRdE/Nr0f6EvR6a+ZlfZT6j8/8A7Gj7KfUfn/8AY1q7N/tj+v4H0o8j3/X/AOtRfyX3en+X4sRlfZT6j8//ALGj7KfUfn/9jWrs2e+f6fgPWii/kvu9P8vxYGV9lPqPz/8AsaPsp9R+f/2NatFF/Jfd6f5fiwMr7KfUfn/9jR9lPqPz/wDsa1aKL+S+70/y/FgZX2U+o/P/AOxo+yn1H5//AGNatFF/Jfd6f5fiwMr7KfUfn/8AY0fZT6j8/wD7GtWii/kvu9P8vxYGV9lPqPz/APsaPsp9R+f/ANjWrRRfyX3en+X4sDK+yn1H5/8A2NH2U+o/P/7GtWii/kvu9P8AL8WBlfZT6j8//saPsp9R+f8A9jWrRRfyX3en+X4sDK+yn1H5/wD2NH2U+o/P/wCxrVoov5L7vT/L8WBlfZT6j8//ALGj7KfUfn/9jWrRRfyX3en+X4sDK+yn1H5//Y0fZT6j8/8A7GtWii/kvu9P8vxYGV9lPqPz/wDsaPsp9R+f/wBjWrUcnb8f6UX8l93p/l+LAzvsp9R+f/2NRSxGLbk53Z/THsPWtExeb1JG3+v4H0qCW1+7g+vU/T/Zp6NdE/T06/jt3Az6KtGIxdTnd/T8B602moXSd9/ICJRuBHTkf1pGh3Y+bGPb/wCvT3JGMcdf6Uzc3r/L/Cl9Vcpc91r6p7W80XGL0a/rp2Y3ySvo2fbGPzNLt29sZ/z2qRCTnNPrlq4dqclft102XmvyBuz639U106WXkQBS3QZx/nv9KCpXtj/PtU9FZ/V3/T/+28kTfr176W+63Yjj7/h/WpKKK6qUOWMYbb/r59gXvP162I5O34/0oj7/AIf1qSp4YvN3ZJG3H659j6Vty8ure3l307g1Z2IhEZehxt/r+B9KX7KfUfn/APY1cEXldCTu/p+A9alj7/h/Wpb1ukum69P8vzEZ32U+o/P/AOxo+yn1H5//AGNatFK/kvu9P8vxYGV9lPqPz/8AsaPsp9R+f/2NatFF/Jfd6f5fiwMr7KfUfn/9jR9lPqPz/wDsa1aKL+S+70/y/FgZX2U+o/P/AOxo+yn1H5//AGNatFF/Jfd6f5fiwMr7KfUfn/8AY0fZT6j8/wD7GtWii/kvu9P8vxYGV9lPqPz/APsaPsp9R+f/ANjWrRRfyX3en+X4sDK+yn1H5/8A2NH2U+o/P/7GtWii/kvu9P8AL8WBlfZT6j8//saPsp9R+f8A9jWrRRfyX3en+X4sDK+yn1H5/wD2NH2U+o/P/wCxrVo2b/bH9fwPpRfyX3en+X4sDK+yn1H5/wD2NH2U+o/P/wCxrV8j3/X/AOtRs2e+f6fgPWi/kvu9P8kBiyxGLbk53Z/THsPWoa3JO34/0qIxeb1JG3+v4H0o/BeS/QDLQjnPt/Wo5iDtx/tdvp/9etKS26AHI5PJPt0wBVd4dmM4Oc9Ce2Pp61hO/M7crWm909l69X+DKSa97p/S/r0M6kKF+nb+v1PtV/Yvp/P/ABqCYAbcD1/pUXl5Lz3/AAsi1O7ta34/5fmWAQelSIhfOMDGOue+fY+lEUW84HAyM+pznp+Xfp1rTWPy1GO46fT/APX+Pet6fwxbte70tpuQrLV/Jd/6897FSJCm7ODnHTPbPsPWrMff8P61JUkff8P61Qm9dFYj2b/bH9fwPpUkabM984/TPsPWpKKaV3YQUhAPUVNHGZM4JGMds9c+/tVmO1znOT0xwV9f9rmt4pJK7v5a3/y/EydlK7fyV77fd+OxQAA6ClrS+yL6fqf/AIqj7Ivp+p/+Kp+70v8Ad/wROze7+6/6mbRWl9kX0/U//FUfZF9P1P8A8VRp3f3f8EWnd/d/wTNorS+yL6fqf/iqPsi+n6n/AOKo07v7v+CGnd/d/wAEzaK0vsi+n6n/AOKo+yL6fqf/AIqjTu/u/wCCGnd/d/wTNorS+yL6fqf/AIqj7Ivp+p/+Ko07v7v+CGnd/d/wTNorS+yL6fqf/iqPsi+n6n/4qjTu/u/4Iad393/BM2itL7Ivp+p/+Ko+yL6fqf8A4qjTu/u/4Iad393/AATNorS+yL6fqf8A4qj7Ivp+p/8AiqNO7+7/AIIad393/BM2itL7Ivp+p/8AiqPsi+n6n/4qjTu/u/4Iad393/BM2itL7Ivp+p/+Ko+yL6fqf/iqNO7+7/ghp3f3f8EzaK0vsi+n6n/4qnLD5WdoA3dc57fifWjTu/u/4Iad393/AATLorQmjaTbk4xnoCeuPf2qpJGY8ZJOc9sdMe/vTSv1/P8A4b8RpX6/n/w34laTt+P9KjqxUcnb8f6VhUVpten5I1SsrEdRydvx/pUlRydvx/pUXGU5/wCD/gX9Kr1Yn/g/4F/Sqcnb8f6VqnaF/wCtwJKKg7fiP60xhnGTjrXHVr8tRp6LTpf7K/ujSvr077/hu90WSQOvFJuX1/n/AIVSIx0INJUc/NqpR18v+CvyLVNvVX/8BZfBB6c0tUAM9TipUXrg7unQdOv1odZQVuZXXRLu+9n+YnBrTVvtytfjsWqKYmRnOR9afXTQmpqMr3vf9QimpK6/qzLEH8f/AAH+tWKz6sQfx/8AAf61rOO8r9tLeiFL4n8vyRcj7/h/WpKjj7/h/WrEff8AD+tZkhH3/D+tSUUVvTV0l6/qZNXnb+tgoqWOMyZwSMY7Z659/arcMbR7sHOcdQR0z7+9W1br+f8Aw34iat1/P/hvxM+itRofNxuAO3pjPf8AEelN+yL6fqf/AIqlp3f3f8EWnd/d/wAEzaK0vsi+n6n/AOKo+yL6fqf/AIqjTu/u/wCCGnd/d/wTNorS+yL6fqf/AIqj7Ivp+p/+Ko07v7v+CGnd/d/wTNorS+yL6fqf/iqPsi+n6n/4qjTu/u/4Iad393/BM2itL7Ivp+p/+Ko+yL6fqf8A4qjTu/u/4Iad393/AATNorS+yL6fqf8A4qj7Ivp+p/8AiqNO7+7/AIIad393/BM2itL7Ivp+p/8AiqPsi+n6n/4qjTu/u/4Iad393/BMwgHqKTYvp/P/ABrU+yL6fqf/AIqq1xCItmBjdu/Tb7n1qoqLstb/AHfr/X5XG2ivL8l36P8Ar8qmxfT+f+NMcAYwPX+lS0VlUik5P0/T+vn6GmxXqOTt+P8ASrlRydvx/pWIGbNEZduDjbn9cex9KpyxGLbk53Z/THsPWtqopYvN25JG3P649j6U12f3216f5fmA9Y/LUY7jp9P/ANf496mj7/h/WiPv+H9akoSu7d+oBRRVy0j3l/bb+u7j15x2rphHlipXva+m27aIas+f8Pw3/wCANto/M3+239d3uPSr8dvjPHp7+vqauJHsH+9/T/PtU8ff8P60m7u5nJ3b0KscBGccdOw9/epQhTr3/p+J9as0UhFepI+/4f1qSijXsAUUUU7Ps/u/ruvvAKKKKLPs/u/ruvvAKKKKLPs/u/ruvvAKKKKLPs/u/ruvvAKKKKLPs/u/ruvvAKKKKLPs/u/ruvvAKKKKLPs/u/ruvvAKKKKLPs/u/ruvvAKKKKQEcnb8f6VWlj37fbPb1x6/SrtFAGRJb5xx6+3p6Gqksfl7ffP6Y9z61uTfdH+fSsw57Y/HNAGZJ2/H+lV5O34/0q/dZ+TOP4umf9ms5/vH8P5CsprW/f8AC1kbQ+FfP8xjdD9D/I1Q8wxebwfmPH4E++erdO/TirFzLFEn72Ty1YE/Xbjv0HUDn14rynxF8StM0LzIopd8q7xg/wAO3bz7feOcY+h7eficZhcKnOo1z6cy/FfNpJfg7aHdhsHicU1Gkvdbsnqr2fR+Ul+Z38k/3maXy/XvuyPwBx06YBPOOKx7vXdLtgWlnh3AHHnY7YyVHQ8YJzgcA4xxXy/rXxY1S+lIhkKJIXAHQsOOeepX+XJwBiuJuNU1DU2Es9zjGdvTjfgsPzUH/wCvmvksfxfh6cpQw+tSNtUrfZj1Wmiem60+76GlwzXcIvE/w7aLRWXW33aXvsldXPq26+IukW+E8yKXO4fuB93aR1GP4tx4wO/Tvzt78TtOVd1vjcuSRg7sDbjIPtnGPbrwa+drK1lu5dk9ziEEGSTA/d/eI6ZPzAEeg2561rjUoN8ukwW2+CO1uHluehmKhNvI6FCG5x/H0r5rEcT5xio8sPhloradvXrfTr+foYbJ8DRcaa0jF+usrN9+9m77W6HoVx8Uby4jn8rjymjAx23F8ccZPy5yeMepGKjT4g6zOXSSQoNkZh4I3cMSQAexC9CM9+5ryVJJbuSBYfJt4fKG3zf4/KyflGB93cMnrkr7VQnZ5JZ5JJYpMjYPK6gR7gd+O5zxyeBx0rzFjMzetRtzb1s32Xp+X4HswwOBhFRsn6xXy3e3+fzO/v8A4m+ILa48gXDYQnGegH557dxxkVe034o69LKF2/aHVC44PybR9OS3HfBwevFeVW9uszynJHlbMYB4yGznkd175FXYruSykAXIUkh8D+7jHHcdSBj6jHTphmePjFRalp67O1t1/XUznluAnJy01t2S2W3TX8/PQ9/0b4y6fcoP7Si8u4DBC/II2khmzjPH8/QACvQdK8eaHqe9Yr6J2XYQsuTs8zeNoPU52nOVOMZ4r4/mtI5nNwudzkE9eo6Yzjjr/wDrqpLJNE0ZglmjnXd5flY5A27t2R0Axj2J68CuihxBjsNPm1smu/le2lrvd/irHn4rKMFWXsrO2npd2b63a36K2ve599w3kUoR43iYHB3Rdum0vngA845PQ5FbMFz8rcZxjpg+vuD/ADwMc18IaR4y1zTJVlFxL+6Keesn8QOdmz0Aw2cDj5R61734W+KtvqpFteRbAFUyyZxu2bsdccA7sAHnOfr9RlvF9DEVIwxK/eq3P08l/wCS29Omh4WI4Zr0F7TD/wALTkW/bm0vZrm2Wutn0Pf4nL7s9sY4A659CfSrUff8P61yukatBf24uba4+0RFtu3BzEFzjvj58nt/ByR26RZPMUY7Dr9f/wBX4d6+2pV4YinGtStyTWlrdNHovP7z56rTqUZyp1V78Lc2nkrP7mtS1RUcff8AD+tScnoK3jLaNv63My1bR+Zv9tv67vcelX47fGePT39fU1TtQR5mQR93t/vVuw/dP+fWtDGXxP5fkiCKPZu98dvTPp9asx9/w/rUlFBIUUUUAFFFFGvYAooop2fZ/d/XdfeAUUUUWfZ/d/XdfeAUUUUWfZ/d/XdfeBHJ2/H+lR1Yoos+z+7+u6+8CvSFC/Tt/X8R6VZopAUZICcZ569h7e9VpLfOOPX29PQ1r1HJ2/H+lAHO3Mfl7Pfd+m33PrUUcZkzgkYx2z1z7+1dA8e8f7v9f8+9Y13HsKe+79NvHrxnvVxd0o/jv57Gid0o97677a7f13IJIzHjJJzntjpj396rSdvx/pUlFY1I2bd+3S3YtaK36W/Ajj7/AIf1qSirlpHvL+239d3HrzjtW8Hy009/+C/+CDdlcLRN5f22/ru/wrZSPYP97+n+fahI9g/3v6f59qnj7/h/Wobu7mMndvQI+/4f1qSiitYfCvn+bEFSR9/w/rRH3/D+tSVQDHyMEHFR7j6n86kfOBx3/wD1fzpqxs+cHGMde+fwP+TXVSvyK3L13vff/hvwOed+d25em977L/gfgN3H1P50bj6n86k+zv8A3h/n/gNH2d/7w/z/AMBrS0u0fuf9dF9xNpdo/c/66L7iPcfU/nRuPqfzqT7O/wDeH+f+A0fZ3/vD/P8AwGi0u0fuf9dF9wWl2j9z/rovuI9x9T+dG4+p/OpPs7/3h/n/AIDR9nf+8P8AP/AaLS7R+5/10X3BaXaP3P8ArovuI9x9T+dG4+p/OpPs7/3h/n/gNH2d/wC8P8/8BotLtH7n/XRfcFpdo/c/66L7iPcfU/nRuPqfzqT7O/8AeH+f+A0fZ3/vD/P/AAGi0u0fuf8AXRfcFpdo/c/66L7iPcfU/nRuPqfzqT7O/wDeH+f+A0fZ3/vD/P8AwGi0u0fuf9dF9wWl2j9z/rovuI9x9T+dG4+p/OpPs7/3h/n/AIDR9nf+8P8AP/AaLS7R+5/10X3BaXaP3P8ArovuI9x9T+dG4+p/OpPs7/3h/n/gNH2d/wC8P8/8BotLtH7n/XRfcFpdo/c/66L7gQ5B7nNJJ2/H+lPEZj6nOf6fgPWlrkqfG9um22yMpbvb5bFeipJO34/0qOoOul/Dj8//AEpjX+6fw/mKyrnqPq38xWjN90f59KyZO34/0rGfxP5fkjQzmPzH8vzH/wBes66uIrOOSeYnykUl/wAv8M/4Zq5O0qFXjzgMqMRnjfjHPbo1eSfEPXZFMeiW1wLWa6mWB5s/cjlADk55GcHkY4H0NcGZY9Zfg6lfRvlk2uq5drdu/m/w7sDhPrdehC329Xrtzf1+fQ8j+InxLnmeey0yTywjuo7bgSo9OCBngcDkcDr8/XVzLdXMk08m+VgjP7Zz2z0PI+qkitPxAsUWr38EFz9rS2uGgM396ROXwB2BbP41ildwz6f1/wD1V+KYzPHmUqk9nKXmvh9z7lbXSz2R+sUMs+qUoWSuox89Gk9/nq/K3a8sSF2xx6YPvnn6AA5/DithVMMJTp5rRADnI2bhg9xw3cnpzzxWNCfLbIPJwRnpxkfrzW7bf6YVXrtdHBHXgk8n1AHOQO+e5HFTVlG9r6t9Xv08/XzsXiLypfJ83Xql+Wi6p3RtNBJawZizvuPKA6g/JuyRk/7eDx39xToLeOS6njfOJLOR77pgFADFxwP4pvpwcjFSTy+cJT1ykScf7Acd+c/MOvfPtmmsEqRhlHEjqrDH95j09TyfYnv3rXms1svXvZev42721OaFBzipXavfsJHGht7u5Uf6OsVslnznOwTiXtj5sxnIyPTgEHMikkt4nuHHE25BgjvkMMj646YzntzXWJaW5Z7B3NuoSN5b7JxAXyAnb/j4CsOOf3QPSnNp8V462MaBLW0WRjnnfv2lZMf7XlkjjHBPHApNrS7V9Ov9X+a8z0aOF/dxu1179352/P7jkY4jFYxp3JkkPuGZDnr6D8R2ycUj5+zN1zt4/Pjn6Yx6V1MOlPGYrmEzeSWkhHlD92cFR+9zn2Kjp196bf6elqBEnk5+Zn8sfOC2CPM9+Dt+jHrRddGvT7rClCVOXKuWytunron8+xxiuY4gOec/oTx19/8AIrThT7bAYOu7DDP+zk5yQMfz478CrmnaYLyWffKUaPYV/wCmm/fu9vlIHb+IHAyKfOTZO8U0WEX5I17TvICqnvyhHAzwXI65zhPm5m1y/j2V/wAiHzt3tD1s99OnyXXTQgW0SFILuX/VSTxwuB1wNyjv6uTxzxj0NZJtoYp7iOKTygkskkOMYcvgtjJGMEJnnnIz0rbm0RnihjkuvMv23u9sMf6LG2xoumD+8+YZzz5Z7Yqk8CW80VrL/rCsofgdtuPfOCeR74xitKafKvh66pPa+mv9dBrmt9n097TY6fwz441LRrZUkl8yCGTjvtAzkgnPU/hxnnivo7wl8QbDXEWAvslOwHryxyenf7p44Az75r5TtLWO4t2ijkMQic9ACCXyc5yBxtJGPXPBzVRLm40q5ja0vvLlgbIUnG8ZGDnIxgg9uc9u/r5TnePy/EqLf+yQa5Hq90pSvp0bb+W2x4uaZZTxkZezSVeW9vJK2m+yWq1b6dV+iULA7cS+YDyM9QCCegA69vb8qt9duOozkdjxx144H+elfO3w9+Jn26SLTtQk2yqqKhP8ed27jgZXavbkvk4xmvfbeUSRo4k3oSxHH3c/TnPQH/dr9Wy3Oo5jGnKNrzsklbdaPS97b/gfnuOy2rg5zpVU+eFrpf3kpRaerd+ZP59Tfj7/AIf1rWh+6f8APrXOQ/eOf7o/Kt606P8AUfyNew1yu3z+/X9TzFHkSj2/XX9S3RRUkff8P61rH4V/XUYR9/w/rUlFGzf7Y/r+B9Ko46t3UkvT/wBJQxyRjBx1qPcfU/nUxgbswH4//Y037O/94f5/4DXVSvyK3L13vff/AIb8BpSSWkfmnf8Ar/gEe4+p/OjcfU/nUn2d/wC8P8/8Bo+zv/eH+f8AgNaWl2j9z/rovuHaXaP3P+ui+4j3H1P50bj6n86k+zv/AHh/n/gNH2d/7w/z/wABotLtH7n/AF0X3BaXaP3P+ui+4j3H1P50bj6n86k+zv8A3h/n/gNH2d/7w/z/AMBotLtH7n/XRfcFpdo/c/66L7iPcfU/nRuPqfzqT7O/94f5/wCA01o2TGTuz6c9Mew9RRaXaP3P+ui+4LS7R+5/10X3DScgZ55P9KSpU6H6/wBBT65Knxvbpttsjen8C267bbsr0VYqOTt+P9Kgsrydvx/pUDx7x/u/1/z71bqOTt+P9Kxn8T+X5IDn7tNhT33fpt/xqnXSvHvH+7/X/PvWdJHsP1/p29eM96anZWt+P/ALUrJad+pSg6t9B/OtqDo31H8qyrT/AJaf8A/9mreh+6f8+tQKfxP5fkh0ff8AD+tSUVJH3/D+tbQ+FfP82SM5x+I/rj+VGT7/AOf/ANQ/KpHzgcd//wBX86WKPfnO7jGMe/4H2/Ouylzcity9e993v/Wxzz5uZ25ene+y3/rYfAm8Nz0I/Ucdj6VP5Hv+v/1qdDGEDYzzjr7fgPWpqxqX55X3029EYtu7ulf09P8AL8WRxpsz3zj9M+w9akoqSPv+H9azEtXb+tER0VYooK5H5f18ivRViigOR+X9fIr0VYooDkfl/XyK9FWKKA5H5f18ivRViigOR+X9fIr0VYooDkfl/XyK9FWKKA5H5f18ivRViigOR+X9fIr1Xn/g/wCBf0q5J2/H+lV5O34/0oFyu/L1/wCBcz5O34/0qOrknb8f6VXk7fj/AErWX8BekvzOumrQS9fzZUnk2Ae+f0x/ntWFdybyntu/Xbz68479a6CX7h/z2Nc5c9R9W/mK81u0/u/I6Y/Cv66mNqF19lt55OoVDJjHXy1/Ife7n0r4Z8eeKRrGs3D8kwvJFx6ZAz6ZwueSPXBPX6V+KviH+zdCuVUYeUPHGevACh+O5G4EdDXxPM2+SQvjzSVkcZ6eYSRn8mGTzgfWvzbjLFvmeGTfuuPdbxi+j81p5v1PuuGMH+7eJf2uZ6/3W4/ounUVmRyWYck/u/Q/3+3049xToo3llRSDtw+3rtxjn6YOMnp1qzYWwuJFGeVK45xy+c5PoMGvT9I8OR3GN/bZt7AZyePy69+vXmvzyvL6vDnW2jttbZ9ba9f6sfb4SDxDVPX4mk1fu7X89L6WXTSx5xaabLhNp/1jOG6noV24H/fR69uvNaEGlXkMzlPOCvtLeWOuCdu7qcfMxHpyOep+hNJ8G2852k527e3HOTz65A55yO2TXrOi/DSymIElsLjfsAIz+6PIz0yA+eg5+X614WI4gwuGjz1HaStfVW6WWvV/13PoMNw7isRJU6a9xtW0std399+mnyPki3013Q7fPJGzfv4OecYyPrnv0rp7PSJHjTzI5nHGBD/CMdG9zgAdMYOAelfYcfwUgeQNbkhnAyvkedtI4HH8JOS3Gc8+nMv/AAo28t5XnNuZ8YMZ8gQbeuRn+LcCuewxnoePGfGeBlJvX8fLbXuel/qZjoPlS7Wt52fZ9Nv6R8rWvhN9UZLSKOaPLRsfNwdxUnG3PHrnnuMDoK6O98Hx6bNBLepLPFJtX7NHwsxhxu8z/d8wbfTcx6YJ+sPD/wAMNTsrsStZwoJAAhlGXUJuVvK5x1cbv+Ag9K3W+E817qV1cXsd3eQfZpVMfG2ORwpQJk7SH2Y4xwoz61zS4rwUpOSbs7b/AC8/O2j8krnfQ4Xq06cY1Vea3vHzTXbo0vw7HxfrkTuscWl6TaQLDGZm4O+IR7drNk/xhjj3Vq8xvtLys5WSO7nmKz3UUXS383IjDe8nlvjpxHkdq+0/H3grVl0qPw1oWjXVve4WW6PeSIMBbcdcqrTHPJO70IFZeqfBNfDHhbSLaTTNROs6h5t7fTRH93AWELRiTpxJvlCkdlYmvTw3EWAnRjJvdtPVfzdfw09EePnHD+KjKnGmvdutlZrVPT579Nb9T5e8D+CbrUNRgndNlpYMt5qQPIfT4xJ9o7H7oC9epOD0rB8UaZa3Fzdro9mY7SS/uJrCTsYAyYI69COMdyD0r708O+HL6P4VavBYaXCL6wkmR7iX70iXIYNkHuogPXI+b2r588GeEI57bxM0xLS2Nq80Npaj/Wyz/aPPDn1QwRhccEk9OAeyjnEJ1FKnL3HZRV1bZX/4Py0XTz62UY2FNRtslurPVJ9r3t/Xf5vks5IYnum/f3Q8lVXH+q8rdnv0bd3/ALucDk1jyvNJfI1umy6ZQHwGwYh978QOvPQ9R291bwZIvhvUfEOpW8kDO8NrpdpJn95vacXOM44XbbZ68OPesFPDtlZ6cNa1BJJZ7lfstrpkeQH+yg+bIR0Hk/aIscdWI7Yr3MPjVOSnffTV+mmvy2+fW3nrBzgrVFeS+J8vV2e/L1umeStYoJZJ38zyo3jMXlcYkO/z931KoQeM8570XEUc93titpZ5GiMivKARH5YGdpOdu7cM4HO1eprp7i2t4plNs0v2lBMwnk5Nv5gXES+/ykE+3NYMFpcP9tmuBI7ywyW/nx5/f+d14z1j2DBPOGOOBz6vOp+8vLz20/T5Lrpc48THk93t5f4fJGRHPcWrQ3sEskdysjq6RDnETR7d3UnG5wOg689q+gPBHxSkLQ2F/JNKP3KSmTqv3sYHPvknnpyDivD4po7eZS/m/ureC2AlIB/cmTOOPVxuzzjaTjvHdNmSO4tv9Y88TA8H7u4nnv1JAPFdOFx+Ly3EUa1N2hzJpX9L6ebXX/M8WeD+tU6sX1j18opaPe6eu2vk9T9C7G9S4hSeD/VyqCvfPc5xnt75569K6C0lEnA/hK5HPGSf8O35Cvmf4QeL4prf+zbz/WpM6jk8E8Nk9OqD9ck45+ktPl2x8fd3HH5/X0I9evev2HL82nmFOniZq86iV9tORezs0r/y+TV1a92fm2Ow31WpOhZ+5K60t8Scvn0v2XmbifdH4/zNTR9/w/rUCPvGfpU8ff8AD+te5Slz1OZdV+SS6adDzY6L/t6T++TZJViD+P8A4D/Wo4+/4f1qxH3/AA/rW1X+JL5f+ko5qsXzSl00/JIkoqSPv+H9akrMzUW1fT+vkV6KsUUD5H5f18ivRViigOR+X9fIr0VYooDkfl/XyK9FWKjk7fj/AEoE4tK+n9fIryJvx2xn9cex9Kj8j3/X/wCtViigV/Jfd6f5fiyhOhj289c/pj2FV8n3/wA//qH5VqPH5g6Z2545yc+mOvT/AArOkjKH1B6evbrx7j6+1dVLm5Fbl673vu9/62saR5rK3Lb5+gzPA+p/kKSpU6H6/wBBSSdvx/pWNS/PK++m3ojphflV99dvVleTt+P9KqTpvA9s/rj/AA//AFVfqGb7o/z6Vyz+J/L8kUVoOjfUfyq3H3/D+tQWnR/qP5GrdSAVJH3/AA/rRH3/AA/rUlbQ+FfP82cdX+JL5f8ApKHJ94fj/I1dHQfQfyqCD+P/AID/AFqxVGd+n9dP8hrAnGP8KdF8u7dxnGO/TPpn2p6AHOR6f1p+xfT+f+NddPm5Fa3Xe993/S8jSPNZW5bed7huX1/n/hRuX1/n/hRsX0/n/jRsX0/n/jV+/wD3fxK9/wDu/iG5fX+f+FG5fX+f+FGxfT+f+NGxfT+f+NHv/wB38Q9/+7+Ibl9f5/4Ubl9f5/4UbF9P5/40bF9P5/40e/8A3fxD3/7v4huX1/n/AIUbl9f5/wCFGxfT+f8AjRsX0/n/AI0e/wD3fxD3/wC7+Ibl9f5/4Ubl9f5/4UbF9P5/40bF9P5/40e//d/EPf8A7v4huX1/n/hRuX1/n/hRsX0/n/jRsX0/n/jR7/8Ad/EPf/u/iG5fX+f+FG5fX+f+FGxfT+f+NGxfT+f+NHv/AN38Q9/+7+Ibl9f5/wCFG5fX+f8AhRsX0/n/AI0bF9P5/wCNHv8A938Q9/8Au/iG5fX+f+FG5fX+f+FGxfT+f+NGxfT+f+NHv/3fxD3/AO7+JDL823bzjOe3pjrj0qEhgCT0A557D8fb9KubF9P5/wCNQy/Lt28Zzn8MetHv/wB38Q9/+7+Jnk5dyOny/wAqa/3T+H8xVpiSDnng/wAqpdn+o/nWVe/s3fez2+R0Qvyq++u3qzJvOqfV/wCa1z0rfewO/f0+96dunXHPPauhvOqfV/5rXF63cG0sLi5xkQxN17Fg389pBxXi4qoqGGxFX+7vdq2n56dDanT9tVo0/wC96O/MrW3623PlH40a19svVsccw3CjHT/WFeTye0fTg9hwM14bbKfOMHrM/P1xx644HQ/hXVeLdS+26xfyZUeY2M9+r889+5xg59O9DR7QyOj/AL4AsuBH0xuz8w5Oe6575HY1+G5vjnWxNWd3bmW762S6rr069dXy2/X8owXssPRhtaLXl7zcvvt67e7Y6zQNG2yoRH5pk2HuSuM/q27I54x9Me06VphjVg1v+6by97cHG3ft6Z6kkdu+eoB5TSLXZCP9bzsx5me27hc9xkZ/D6V6v4et9+yH+/5Zz/u59OvXPYEdeRkfAZ3mXJTnG69317J/ft1eh+kZBlvPKnLS73b069PQ7Xw7pCwRmU4uodoMdsMgeZhhH655PbOMck4wfXfDek6tcw+Zfj7Ed6hOMC3i+cL167xzgddozWNoOlyB7aOMjKFC2c4G7OB6+o559TxivcdI0o5j+0R+Yg2f8BPPHPvjn25r8pzfNWsPJrV673362XlbT5K/f9byzBODgu1lqvT8LNab2/HY0bQozAkaD7Sz7d9z64zt6emWA9MAV6DpGj+SZf3sTrFA24S8bN3GFB7nbznHQHkfKV02xkiES+X5cD7fJXrv2/fHvjcvp97J5wD6ZpujyS+WiW4g34ywP+sxyD/wHJ7fxV+cYrNWru27+fTrffTS3Va2Vz7GhhLyTavtq1psu/y89F52rWOj6ZN5PmW8U7S28WPL/h2787v97Ix/ut7VtDw/DJ9oghg8iRbdwn+3G2PN/LC+/INdHpulT292sZk2LtYlc/fH/wBb+pFdV/ZUE1txbfvlfKsP4s4z/IcZ715cc0xens78uyWr7fhftZbJnXUy3Czk5Vbc7tfTskltptY8Yf4d2k13aSQ2UV1GqQyI0sBmEMin95j+7vO3P97YM/d47C6+Fdn4hJbUbeLYkIMCxWP3di/Pu7dkx+NfRPhbw3Hc2awLbx+a4jEjSn7v3tuPrls/QYNdvN4BkgtJCklq/GSv9zrj88n8ulenh8bj50oybere7aur2/S/m0eXiMswPtZLTTl6f3Yv+v8ALQ/PvxH8J9Su9K/svT3lstJuZXjvJY4PJ3LAAsMTZB37w8oHIK8/3q8N0H4TweA7bXGhswtxfvPZ2dncwee0qyFxcSw/3N5aEvnOSU5yK/T688NvbRSNJ5W1WUfuvqc7u/0/HNcNqvhjTEnF6/8AripVF/vF9u4e+ML/AIdq9fB8SY7L+WOto+ffXffa/n+ZwYjhnA42PT3vzVl92i9D8ttY/Z/1fxXqdgt9/aVtpOmlJvskMAhheycFtSiP98OIrUA4O0ZH8WK8V+IfwY12WO6urOz/ALE0GzuJodH07Hz3dqpjDSOM4+Xah/7aE1+wuswaXYLbwjTv3od2kk/66eXsPp2bp+HeuA8ceDLbxHpvlwGLfIhDLIT8qMF37eB1xyPZfx97CcfYl4mi8Q/3XMtE9Vayt0W6e9vmeNU4CgqVdU9YWvHvsru+ut79d1fofgr4j8IahpLJG0U3+lhw8cY/1f2cR4zzk7/NOP8Adb3riri1ktIfK+zyiPLee0nIXH3MAg9fm3fQZ71+knxG+Cd7o89zcWH2VbGQSMk/OYHTZ5mMH+Iup6c7MMe4+Q/FXhS4sh5zRwzMTMpnj48zYE5Y4zxngHoCQAc1+zZTxHTzBUpUZfu5RVlfsuVt9bt/10PyfPuFcXgoVfZp8ilpdd7PR97vTTRW1eiPnW9jR44xHJvj+fC/3M7cjj1I/wDHc9ajayR7dXkllQDKKsZHz+ZgHd9Nox0+8fw19Q0mSOaSZ4ynmnaB6nge/TcMYz1HQ8VBKstvajTF6Oysxx6nKjp7nH6V9zSlzQi9NVffzPz/ANnVpe5UUVJN336vT8GvyLPhq/j0DU7FI45UMcm8vMB8+4j7vA4GDk+pHfmvuHR77+0bGyuf76If/QT+g796+ILci33W8XOxEMvPHIwnuTnd7+/cfTHws1iOeyhtkAzb43c9DJuAyOnO04xz7V9lwhm31XGVMM9qjsr7K/L3631su58lxVg/9np4lWvN62/uuyt5WV3f8D3y3+4fw/lVyPv+H9ao2hzCD1yTzVsdR9R/Ov1eiuWdu65v/AkpfqfnqlzK69Pu0/QnBw6ntzn8Qcfyq0AxAIzg4I5+mO/0pqkgDHHA/lViL5t27nGMfjn0r0nzdLW87mM+bmdrW03v2QRfLu3cZxjv0z6Z9qm3L6/z/wAKNi+n8/8AGjYvp/P/ABpe/wD3fxI9/wDu/iG5fX+f+FG5fX+f+FGxfT+f+NGxfT+f+NHv/wB38Q9/+7+Ibl9f5/4Ubl9f5/4UbF9P5/40bF9P5/40e/8A3fxD3/7v4huX1/n/AIUbl9f5/wCFGxfT+f8AjRsX0/n/AI0e/wD3fxD3/wC7+Ibl9f5/4Ubl9f5/4UbF9P5/40bF9P5/40e//d/EPf8A7v4huX1/n/hUMvzbdvOM57emOuPSpti+n8/8aNi+n8/8aPf/ALv4h7/938SuoIHPr/QUp6H6H+VSOAMYHr/SmVy1L88r76beiM22pXdr6ehRf7x/D+QqGTt+P9KuT/wf8C/pVesyW76leo5O34/0qxJ2/H+lV5O34/0rGfxP5fkjspfw4/P/ANKYRfcH+ewqSo4vuD/PYVJUmr3+S/JCg8H6j+tPjOHXJ45/l/8AqpnY/Uf+zU+MZdQff+Rr0aPN7ONrfO5zT5ueVrbre/8ALEvgEoO+SCPpjip4jtGDx/8ArPpUAJCDHY4H0x0qeIbhzz/+s+lZy5vbO9um1/5UR71+nxee/L/l+JKSB14pNy+v8/8AClIB6ipYkPzbQvbO7d74xg10+905bfMfv/3fxCJj820r2zu3e+MYFTbn9Y//AB//AAo2P6R/+P8A+NGx/SP/AMf/AMaPf/u/iHv/AN38Q3P6x/8Aj/8AhRuf1j/8f/wo2P6R/wDj/wDjRsf0j/8AH/8AGj3/AO7+Ie//AHfxDc/rH/4//hRuf1j/APH/APCjY/pH/wCP/wCNGx/SP/x//Gj3/wC7+Ie//d/ENz+sf/j/APhRuf1j/wDH/wDCjY/pH/4//jRsf0j/APH/APGj3/7v4h7/APd/ENz+sf8A4/8A4Ubn9Y//AB//AAo2P6R/+P8A+NGx/SP/AMf/AMaPf/u/iHv/AN38Q3P6x/8Aj/8AhRuf1j/8f/wo2P6R/wDj/wDjRsf0j/8AH/8AGj3/AO7+Ie//AHfxDc/rH/4//hRuf1j/APH/APCjY/pH/wCP/wCNGx/SP/x//Gj3/wC7+Ie//d/ENz+sf/j/APhRuf1j/wDH/wDCjY/pH/4//jRsf0j/APH/APGj3/7v4h7/APd/ENz+sf8A4/8A4VDKx+XcV7427vbOciptj+kf/j/+NQyofl3Be+Nu72znJo9/+7+Ie/8A3fxIdy+v8/8ACoZuQCOQNxPt0/wolG3bt4znPf0x1z61CSxBB6Ec8dj+Hv8ArR7/APd/EPf/ALv4lUnLuR0+X+VQzfd/z6inSjDkAccfyFV5fuH/AD2NY17+zd7Xs72+R0Qvyq++u3qzMueo+rfzFeXfEK7+y6BcuMkmOTHTggAk89xk4A9a9CuBllyccvz+VeJ/Fi6NvoN0g6zFuB22lQDnrn5xyOnH1r53N8R7PAVo/wByXl0v6vddrW72PVyuh7TFUJafH5dGtOr81p+aPjyQi5u55sfekI6ggc9j68+n06Guq0aPypfN8veVKL/u7934c454z7gE1ylnBunWQjG4nH0LZH0/EZ+nQ+g6RBH54aS28/bs2t/zyzuz7/NhSP8Ad9eK/n7MHzwqy/6ePTVvRpK/4eW3qfsWDwv79O7ty01u39iOlt+mh6XZyMn2O2EZj/i9m34J+uAM556/SvcfDGl/LBL/AHkye2cYPQdTgjHIGDnGM58Z0Xy5L2AJj92p3Ln7ueOoPfaeh7djX0p4agxZxyCMybSME8lcnkfQgdOScGvzjO/hd9nZa/8Abv5fp8z9U4ewtnTu7dvvXb033fluejeFk2yWyf3jKCcccYHI9ctn3Oea9/0ay/cK/uD+Iz06968W8P2pkuYZhF5ZOwk45I5wM88jv79euK9306PeIkz02j+g/WvyHN8RyOcVpbl231Sb+STXn8rH63lmF1hbsn372/p9/JHfeHYN1wZF4kgVNnf7+4t/6BXsmlQ+dbqz5R8M0tz/AM8NmCp5/v5b/vnvXOeDNH80Mf3X+o/5ae/Yenv+H0r3HT9Gt/OtobmOJ45bWPPldtmc7u/O7j8TntXwbq+3xLpro0tddGlqn5+Vm9F5n1ajyJR7dfkcrp2nx6hCs9rcfamZyk0vqYyNg69sv0/lXrdn4Uxpkc91beZCoVXuOv2YSd/+2m3p/wBM+9aOm6UthAg0+CLknHnH/lmv+s29s4YZ/CulgW2ura7tl8qG3ZFd1i582RC27d/u9v8Ae/CvRpU1Smqa1UV+dn+Fyatfkp8ttr/jrf5afhqtTu/A/hzSoLaCKG3iuZBs8qaXtHNu87H/AHymc+gr1280eDTrZLOA2v2NlLMv912ALjjpnPTpxzWD4Pt4JI7FkjihSOzhWK5k/hIDhiv14zn279PQNQjkbTdrSRbVfCSx/wDLxnGQ3+5gY/66V79L+HH5/mz5nEz5605d+X8IxR4XrvhoTKyjyvJl3FfL5xjbnP5jHpzj0ryrXPCluIFij+RFZhPPknyiduz/AL6w/wD3zX1DcW+f+XKWT/R5sNF3z5fXOevY+ua5rW/CpEMFx9jljF1bhS0nbGMY+m85x7Vz4qhzrm7/AKafhb/htDswdfkUY+vp/Vvnd6HyP4h8F+VZtN5ZmtgFbz/+enH9P5nt38U1WOSGWSKKPZCi4HTn/wDVX2Fqllq9mtxYTyeZY2oLRr/zzEwJb/vrYv5e1fMHjG13XLMPuKZtuf8AgG7j8B/kV83WouhUlUVt72d+y/D+kfTUZynTjJWs77+vloeHa9YWeoobeaPejiUSY7btmD684P5V8o/ED4YafdpPGieWgZ3iwMnjbuwPQfL3BGSSTX1lqcsiTLbx/wAe9iP+uWwj9XOK808RW0moYZ/4/NRT/uGMH09R7nt6V7+RZvjMNOE6b91O8Unpv8+vbrY+fzzLMLjIT9okpytzWvbZJfhZ27n5g+P/AIfPp5uLmFPMaRWVTgDaINo468/vB0HTpxmvnprdIxOoJgmjb98v/PUnds49Uw2eT9/iv1I8a+Hba806e2ni8zywzof7nTPTnBAGfp6V+efxG8PW8d7PNBLvWRyjoP8AlmYmXYDz3DnAPpgcgY/ofg3OKmPhH2r9+Saa1115dNe9tbdEfztxvkNPB3lT0SceXvqk3b810PKIbp4Z3dB5CoG3t/z0BJCnoOm0+ucnHSvaPhfqKLqELpLvaU/Of7u3oQDj7xY9jyBxmvCr608tWXJ6xAjryN38+nUdDXoXw9i2a7b5/iNse/PLZH/j3btg96/T8mr+zx9CDv8AGum95LTytputtup+U47D82Cq3d1yve1tFbbdPTXfTZ9F9x2cnmDd6lT+ef65rYT7o/H+ZrnrH7i/SP8Akf5dPwrdh+7/AJ9TX75hJ86py70136JL9D8lceRuK2UpW+9vzLcQJ3Y7Y/rVuL5d27jOMfhn0rOH+tj/AOBH8gCPyrRhG4sW5Pyj/wBC9K9Z83S1vO5hPm5na1tN79kTbl9f5/4VNEx+baV7Z3bvfGMCodi+n8/8amiQ/NtC9s7t3vjGDS9/+7+JHv8A938Sbc/rH/4//hRuf1j/APH/APCjY/pH/wCP/wCNGx/SP/x//Gj3/wC7+Ie//d/ENz+sf/j/APhRuf1j/wDH/wDCjY/pH/4//jRsf0j/APH/APGj3/7v4h7/APd/ENz+sf8A4/8A4Ubn9Y//AB//AAo2P6R/+P8A+NGx/SP/AMf/AMaPf/u/iHv/AN38Q3P6x/8Aj/8AhRuf1j/8f/wo2P6R/wDj/wDjRsf0j/8AH/8AGj3/AO7+Ie//AHfxIZWPy7ivfG3d7ZzkVDuX1/n/AIVc2P6R/wDj/wDjUMqH5dwXvjbu9s5yaPf/ALv4h7/938SIEHpzTJO34/0p4AHQUyTt+P8ASuWrfnd/LbbZClzWd7W8r9yB84z2GSf5/pis6Q/O2Dxx/If4VoueMdjnP+fxrOkGHYD2/kK2pc3Ircttd733Yo81lblt53uM7D6n+QpKXsPqf5Ckrjr39rK+/u7f4UdUL8qvvrt6sji+4P8APYVJUcX3B/nsKkrmh/FfqvyiUFSRnDrn3/kajqSMZdQff+Rr14c3JG1rW63MJ83M7Wtpvfsi+ASgwOpyPpip4jtGDx/+s+lQAkIMdjgfTHSp4huHPP8A+s+lYS5vbO9um1/5UZ+9fp8Xnvy/5fiSkgdeKliY/NtK9s7t3vjGBURAPUVLEh+baF7Z3bvfGMGup83S1vO4/f8A7v4k25/WP/x//Cjc/rH/AOP/AOFGx/SP/wAf/wAaNj+kf/j/APjS9/8Au/iHv/3fxDc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4Ubn9Y/wDx/wDwo2P6R/8Aj/8AjRsf0j/8f/xo9/8Au/iHv/3fxDc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4VDKx+XcV7427vbOciiVD8u4L3xt3e2c5NQ7F9P5/40e//AHfxD3/7v4jHIOMc9f6VXl6fg38qt4ABwOx/lWfN97/PoK5al+eV99NvREPmT5tL/PyX6lI9T9T/ADqtcfcH4/yq8/3T+H8xWNedU+r/AM1rln8T/rojppfw4/P/ANKZh3JJynPzMDx/slv55/8ArV81/Gq9zFb2mQMznjn0j/IkHBHtyOlfSU33s+n4dv8A9dfG/wAabovqnl9SC4z9TF04HUckYBycnNfM8SYjkwbj2V/1+dr3Posgoc+KUr7tJ9eqX3aK/r5a+ZW/EbJ/dmlP/fRB59xyOgzjNdTovmeeu3G3cu7Pplsfj16dq5exikUBowcukZb2wGKg56Ebj+OOtdtoNvc3Vz5bdAYnOfRd3X1PAHAPPvX4PmWKXLLyvot91b0/R90fr2Xx5Kqh/LGP6f8ADHsvhlEef5Dhgse/tjIcqc4PGA359hg19LeGrSKSwgik/ilQLyR0LHpknAJx/ezz6V4R4Pht7meWTALqsSjnHK+b3OMYIHU56HOOK+i/B9jOSu3zt25BH5fUAlw24dc42kEnvjHzYr8wz7E3jU/4PaNn/S23bP1/hvDucKUtUpN36a3tb0stFp29PXtItIonSKMc7Ysk9/vbcn16n8ccdvZ9BsZIdj/vfJbYZvK9s7N2Oe7Y6Dr1rgtEsUM8WDL5239/5ntjZtx9Xz+Fe5eF7SSPyHT7o3F+/Bxt4+mePwr8dzafPKcr6txvqvu0fT56W9V+sYKPIoR9P1PSvBsqNO8Mfm7JLZoh5vfd12/985P4e9e76FPHJIly3+si0+ayj/7ZbQ//AKGn+cV5fpOg/bbSOSGMyM0iGQcDGM7fbnJ7dq9s8P6XcWkscRt/leJbQ/8AbwMfT+A9upHevlKN+desen/Da6rXvqfT0/8Ad4fP80bVosYsEtVfZK6K8n7jztwbdiPnhN/zD3x6Cuy8PWkcbRqyfZ5QP3Vl5Hk+Ru+9J/tfaMKeOnld81Rt7PyYvskVvLH5TGKW4j/5Ybfu595NzY/3TXTeHdBRbsslzK0kjREtJx5pUvgD/d3HPpkYr1aPx/J/keVidn6o9u8K+HbOSCGWfObgOZO33Pu/U/O34V0k2lbYHt1H7lWbym7L69vQD8ulV9E+2RtaRN+5WGN9n/TbIQHj/Y2r/wB91vTXUjjY8ezDOFbpvzjJ69gB/wB9dq9B1+R8vb9dez7niT+J/L8kcRLaXGUjjk+1wwFvPX/njv27OP8Ab2P0/ue+anEaNG4ePy0UfJ0+YnO78sKPx7da0b7zIlBj6Puz/wAB24H6n19a5K6u5EDecf3R+/059Pw556dKyrZj7OnydvLvr5a66adzrwtDnal3/r8lfvtY858ZxRpDO6c8SIf+B44/8dPfvzmvkDxRpzwyNCn3WW4mb/gIRh057t/L1r608WXu61aJbnyI5C3lr/z127c/Qrlfxavmzxim4Bf7iy5b+9uEfp9PavBq1Z1pyqaWla179El+h9JRjKFOMVbS+977+R8q6ksd2ZJIvK86N5UHm9cggHHvxz+BrzTWuDEG8rzQz+Z5f0G3P/j2K9n1a3/ezf8AAh6dfx6/5JrxLXLffcsmR1dz/wAAx+vPf2+tejl1767qV/Lb59PT/PizC/s3e17Pb/t04rxDbm5WWIDkqvzD+EY/qD/Wvzz+L2lR2+q3rSXHn7QzKv8Azz3YJGOcbgB/3yPQiv0UulN3FJIufNj+SM+4zkc9jgZ9q+IPjRbxSXF758ZeWIDdjoucY9znb9MgcjgH9m8P7/2jPteP5r/gH4lx9/uqX95/pp/Xdnx2NMWQTXcMW8xFS55+VGLbj7ZCn6EAjGK7LwSFGsWvkxeXa+ZH5Q45kB/fdPQlOMcZFc/LHG05Cx+XGqN5p9cj5fy5H49ya6nwLa79YgYH92ko8vPHBJDHPtheB196/oTA/wC/YL/HD849Oh/PuZf7tW7KP6K3y/4B9f2X+ph/3T/Wt8fcT6H+lYVt91B2CKB/3ya3R9xPof6V+/4feH/XuP8A6RE/I3dSlfV80vzY+I4cE9BnP4g4/lWpDwCTwDtI9+v+NZcXLgHoc5/AHFakIyCDyBtA9uv+Fem+bpa3nc5583M7Wtpvfsibcvr/AD/wqaJj820r2zu3e+MYFQ7F9P5/41NEh+baF7Z3bvfGMGl7/wDd/Ej3/wC7+JNuf1j/APH/APCjc/rH/wCP/wCFGx/SP/x//GjY/pH/AOP/AONHv/3fxD3/AO7+Ibn9Y/8Ax/8Awo3P6x/+P/4UbH9I/wDx/wDxo2P6R/8Aj/8AjR7/APd/EPf/ALv4huf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40e/8A3fxD3/7v4huf1j/8f/wo3P6x/wDj/wDhRsf0j/8AH/8AGjY/pH/4/wD40e//AHfxD3/7v4huf1j/APH/APCoZWPy7ivfG3d7ZzkVNsf0j/8AH/8AGoZUPy7gvfG3d7Zzk0e//d/EPf8A7v4kQIPTmmSdvx/pTwAOgpknb8f6U539mr2vre3+JEy57O/LbTa9/wCrkDjjPYZJ/wA/hWdIcu2Pb+QrRc8Y7HOf8/jWdIMOwHt/IVnT5uSNrW13v3Y481la1vO/cZ2H1P8AIUlL2H1P8hSVxV7+1lff3dv8KOmF+VX3129WRxfcH+ewqSo4vuD/AD2FSVzQ/iy9V+UCgqSM4dc+/wDI1HUkYy6g+/8AI168Obkja23W9zCfNzO1rab37IvgEoMDqcj6YqeI7Rg8f/rPpUAJCDHY4H0x0qeIbhzz/wDrPpWEub2zvbptf+VGfvX6fF578v8Al+JKSB14qWJj820r2zu3e+MYFREA9RUsSH5toXtndu98Ywa6nzdLW87j9/8Au/iTbn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjS9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4Ubn9Y/wDx/wDwo2P6R/8Aj/8AjRsf0j/8f/xo9/8Au/iHv/3fxDc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4Ubn9Y/wDx/wDwo2P6R/8Aj/8AjRsf0j/8f/xo9/8Au/iHv/3fxIZWPy7ivfG3d7ZzkVTl+bbt5xnP449auSofl3Be+Nu72znJqnL8u3bxnOfwx60e/wD3fxD3/wC7+IwAhWz7/wAqoTfe/wA+gq2xJXnn738hWeep+p/nXLUvzyvvpt6I6IX5VffXb1YH7j/Qf1rnL37yf8C/klbVx9wfj/KuXlYKzE/3m/nXO3abb6b/AHJfrc1jfTR6X+d3b8LlK8OI3PPbp1zjivif4mEXPiG4XP8AqifY/Ptz685T34zg+v2Xf3A8qUdflbOM+nTPTIOM+gyOTmvh/wAbyCTxLMByvmM3fgh0x6dwTyP0r8842xHJh4xXdW+fLvrpvo+9lvZn2PCmleV1/La6tfSO349uvZlfTbTzPLHl+ZjHB7E+hHB5z26DnPGfZPCelmCQzeWU+VNv+1y5+vyn9eeOMcdoFrhbc9mCAfh1/n7de3GPZtCtRLdqnOAq5PUHv1+nTjr39fxDMcUuRpK99krfyrXr96bXfqfr2S4fnrqWjvLrfv6P8OzO78J6b5sjO022N3jDqM/NjfjrkcZPHoenXH0v4b0eS0Ec8MJSI7Nhxw/rzngDIPf7xJ5NeUeF7jR7WNEupIYlVl3yyffXqcR+m4jLe+CCRzX1D4V1HSLuKCO2t2eBSoa4ugQs+4naYR6LtJfsd6gY5r8tz6WJnGpOCbg7JXt0STWtuq/K3Q/XspqqiqdNr4fNd0/116fO53vhvTnlQvJF5m7ygOvH38/gePywDX0F4e06JI4fPtv3JKeY393Gcf1/zmvO9PtXt0tpIooo7WTn92B823B5PPA38euT3r1vwzLdSPJJD1gg2xf7k+RN+kcf61+V42hUnKcqlrtxul30Sfbbr5an6FgZ86hJdbfr/me+eHtOs3tI/scvyAJul/59/vY9v3nP/fFeq2Gm+XFGwj86Tadk2eZOgP1xx+debeGbhodtsP8AVGxiZMcfO+4y/wAk/OvorwpY2hlglurfz2+yw+Uf+eWRJv8A++vk9vk71y4XCbWtp6338+1l1/C9/ZnXcKKXa/pv+mnze6uzNj0PfptvLs8u5laX/gW3y8fln9a2bGx+y3WkReVm5uZn/wBJ/wCfYxeXz/2039sf6uvXtP8ADqzpHd25wELbl67Yzjd+YGOemPatc6DChk1BIxJa2aNLBx86vjE+3PriPPXoK9R4XXddO/byPKnifefT/hvQydF03MgJud80M9xub/nrv8vA/wCAbDn/AHuOldLd6VcNZmS4+yQQuX+e5+/LtI5i75XIL/7y1zeh20en3Msyx3ccVzIl1KLkfKTMX2+V34w27ryUPXivUbqP7XYwuoiEZJ2NIPu5C7ivX2z36e1L6r5r/wAmPOr4n97LXt5fZXmvyPJrnSJHjiSG4O3ZPIn9z5PLPyZ+oz68elefahbX8kHnTH7SqXISOD1C5DS9f+WXyn8a9g19TZMsn2mKfKlNsfHl529f97oP9w+tee6yZPIhhXG1RMzcdpPLwf8Ax015mMwusvl3tsvnr/Sep62Xy56cZb3b/Nep84eI7m4Z2j2/aVW4uwbn6+SfL/7Z4wOR1xXk2tJpkcE0t1LvlCt5S/3M8uP+BfL1/u17H4vS3gHPWa5iyP8AdJ9fXea8L8TWltcgwfafI+0S3B2f89dvk/qu7/x7ivClFwm4p6K3putPvf3bn1FH+FD0f5s8M1JN891Mv3M/J/48T+mPp79a8Q8SybmmU5AU5bHT5j/PAP4dO9fRmq6Vb2llMOf3BB3f3t+cflt/XHNfPXidY3umCdZQc+2zaR9c55xz+letl32L3+Lp89/Lv/keRnL/AHT/AMP52R5rcGzFs5EgjIyX9yOmODyO/v0r4f8AjM/2u/mhguSeWD8YHOzHPpkHjHv1Oa+zNfu4bG1nkuf9TDFN7ZkZR5fp/dbP075r4W8U34urq9mcbWmnbz7jPMKKxMHp9/MnToFHcV+38AU3TxLr23/LRdv+Da71ufhPGdTnwsaHWMpW2trqte+/9M8J1Oxkh2xvJ5m4HHHThc+uc5HAz711Xw903Zq0b567T+Rf8x1HXrjgday9Zh23HnAb40Rik2f9bkjd1yQVIH03Cu4+GNqJJJJiTzs3D/dMnsRyB39D65H9BZDN1czoT3vKCdkt1yx2WmtvmfhGfQ9lh5QXRb6dbPp16L5Hv9rx8uOh/mCOn4frW8PuJ9D/AErEt87Qv91mHHoQD/X8sVvx/cX6V+90/wCIv8Ef/SIn5LW/iz06/ohIjhwT0Gc/iDj+VakPAJPAO0j36/41nD/Wx/8AAj+QBH5VowjcWLcn5R/6F6V6D5ulredzjnzczta2m9+yJty+v8/8KmiY/NtK9s7t3vjGBUOxfT+f+NTRIfm2he2d273xjBpe/wD3fxI9/wDu/iTbn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABo2P6R/+P8A+NHv/wB38Q9/+7+Ibn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjR7/938Q9/wDu/iG5/WP/AMf/AMKNz+sf/j/+FGx/SP8A8f8A8aNj+kf/AI//AI0e/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KhlY/LuK98bd3tnORU2x/SP/AMf/AMahlQ/LuC98bd3tnOTR7/8Ad/EPf/u/iRAg9OaZJ2/H+lPAA6CmSdvx/pVTv7NX89tviJlz2d+W2m17/wBXIHHGewyT/n8KzpDl2x7fyFaLnjHY5z/n8azpBh2A9v5CsqfNyRta2u9+7HHmsrWt537jOw+p/kKSl7D6n+QpK4q9/ayvv7u3+FHTC/Kr767erI4vuD/PYVJUcX3B/nsKkrmh/Fl6r8oFBUkZw659/wCRqOpIxl1B9/5GvXhzckbW263uYT5uZ2tbTe/ZF8AlBgdTkfTFTxHaMHj/APWfSoASEGOxwPpjpU8Q3Dnn/wDWfSsJc3tne3Ta/wDKjP3r9Pi89+X/AC/ElJA68VLEx+baV7Z3bvfGMCoiAeoqWJD820L2zu3e+MYNdT5ulredx+//AHfxJtz+sf8A4/8A4Ubn9Y//AB//AAo2P6R/+P8A+NGx/SP/AMf/AMaXv/3fxD3/AO7+Ibn9Y/8Ax/8Awo3P6x/+P/4UbH9I/wDx/wDxo2P6R/8Aj/8AjR7/APd/EPf/ALv4huf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40e/8A3fxD3/7v4huf1j/8f/wo3P6x/wDj/wDhRsf0j/8AH/8AGjY/pH/4/wD40e//AHfxD3/7v4huf1j/APH/APCjc/rH/wCP/wCFGx/SP/x//GjY/pH/AOP/AONHv/3fxD3/AO7+Ibn9Y/8Ax/8Awo3P6x/+P/4UbH9I/wDx/wDxo2P6R/8Aj/8AjR7/APd/EPf/ALv4huf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40e/8A3fxD3/7v4huf1j/8f/wqGVj8u4r3xt3e2c5FTbH9I/8Ax/8AxqGVD8u4L3xt3e2c5NHv/wB38Q9/+7+JDuX1/n/hUMvzbdvOM5/HHrU2xfT+f+NQzDAAHQhs/Tgf1o9/+7+Ie/8A3fxKkoI25Hr/AEqB/un8P5imy8OQOnH8hTD9x/oP61lXv7N33s9vkdEL8qvvrt6sy72Ty9vuX+nBXr26kdfy61w3iTVlsLKWVuojkKf74CbDjB/ibA6n3FddeMgVvN/1YG9uM/cHf255AwcA81ycmkv4hS5uP+WMK7Yce4bzOnORtU9gc9M4r4XizN6WU4Byp/7xWXK7vroo29Ev6TPqeE8lq57mPsKn+70Wn8na9++rb8l03PItK1XVdcsNRfGdRtSHwP8An3fzT0JxkCPJ4PUZ7Y+d9WVb/XZWUDL3CpJ/10jZtxzjPVsc/n2r26K8i0TX9YsZBjz4SqkZP+q87r/39Hr05wa8wsLK3fUTOJfLaS5nbH987x/6Dkjnjn0FfieGzTFYx11im/ZSbdru3K7a3vrffTs0frmYZNlmWTpU6CXt6fLsrXbjFrb5J/dqzvrY/wBnW0KEZzEpAz/dH4/3sdc5HStG01WSUSiGf7PJGYwjcnO/dn04G0Ht2x61k3e8wGBoggbG1h/y0wOTnuFzx169+a3fCsVvNJ9juo4nhbZuEuTtzvGV4PXvkdgMdK8jERpxuqXwX93/AMlu/m7/AObPay5t1YN2vaN7bWVktn2Sv0+87vw3oLavIq3HiSWF59hLx9FkXd5UJ9RKSQPlbGzI6V65BqniLwaED300X2V41MMhB3RMP3Uoz8wMoDEkZJ4HvW18PPDuh2MlnPHHaIm/cMjn5iBjI4XH54Ix7fSc3ws0nxrCkPmWsazKoJ4+YsAFHQcDa35njPNfG4zE03iKmHxC/dx5d13jCVttrvW3TzPuMNha3sY4nDu9Sd9Xr8LsvuseR6H+0Hb6NMi63FNLEz2pV4s7Bnf5hk/NSBgdGzgnFfZng/4u6PrItbjS7mEQXFrsulj++u8J5PmD3/e7foR1r8//AInfszeMvCi311p9v9u0mXHlNa/8u6rnG/HP7zzMr15jYkDrXzvp/iXxb8N9WtraSW8s1Vg0ajI3CPBcDoMpvUcjjd9K4K2RZTjqdZ4VWqSS325uW2nbXZa76Hfg8+zbKa6eKV6dW0brZKySt93l36s/pB8P61thsVEnmRxW8E8ftu3MfzwD+Ge1fQfhbxVHcRXDy9JbeP8A8l5oxj34kr8QvhZ+0yTFZQ3t3K8jC3WcSc4OH24HBwfmz6jHcV9++BPixHrc8LQy+ZGtq+3tjzNme4HOz9Ovavy/MMmxuW1KsIL3YSur6bpS6b/F6WP0vI85jmVKVHbmXXzs38tVr1S+Z+vvh3xPZ3OnyfY5Io5pJ/LbzB18uGEDb9Cxz7YrqJ38jR7+ZriIyzwhZFj6NncF3fTccf8AAq+H/Bvi4W/2SY9ZIYO3OxS/mfzFer6p4qbbZ3VhbTSWHnKWuYz8tq+BuMntIc4558tvWuahiJxppVHaabv9/wDiOieWPnl7t9b3t3229bHrujyJPrenW0tl5iWtuGMnXH2nB657+T/nrXvkXh0W1kbmaPfb3ZHk/wDTHys7x/wLzUyevymvkDQvGkkxZbkwvG07vBLGfnfysGTzPddyY6dW79fUB8V4JbZbf7Z9l2KY9v8Az2xgf+Oev+19a6cPmGFhKtGorzSV3a/RW77Lz6fd5WOyvFudP2ekLq34f0vuLniix0qDUZc/v1dTv/6YyD/U/wDfZLf98ce3kOpRqtw4uJN5bcCv9yMY8r8SC3/fOfStC/8AEdvPdSXUckUlyhPkNL/t/fK/XagJz6c1grd28dxPfSRxSXMyGe4aLjZ9lzs3Hnr5zkeyn6V42KxEMSnGmvcbtF/159D1MNhp4VxlUfvpXa6bJ2XTa13ueOeLrULLI0p/csJPI9eNnmA/nHgetfPetJHHIzRn/npn9Nv9f/rV9O67Fb6gCVuf3szTXaR9/mK7h+gwa8K8T21uYZZT+4ncOjN/z18vbtPHdd/r/FzXiTwjUmt9t7+XbTr+h9DSxadOOtt9PnZdGfN/iK6LxXieZ5eP/Hs5xx7Y/WvELtbdBK80gkJ3mP2wPn/PKivZvFsdwse0SeYru+32wU/nkY+ma8i1y2uPLMJ6Xe2I9fXv16Z689PavVy2DhKK10b2Tt00vvtb1PFzafO5S78v6LyPlX4hXrFp4AP3Fx59swHOZJNnk5J4/vcnjBPFfGOuuy3ssN7j5We3YjPCQ4MQGOeBIx7nJ5zX3v8AEXwidYtHvYJdjWMFxFIAD+88hIdox04yw6DqOlfn54nvZ7oyQmIp9kkuIg/eQkqo685Xyx36sD1PP7twP+r7/wA5+H8bL3F/27ft8K8vuvrd6HnusXcaGa3h4iw23AHPfnHGQSAeOue4r1z4Y2vl6Z53TJjbHrjzsZ9/17nsK8Gvt5kiD5y0jY9MfJ0+ua+nPA8Hl6Nbt2dFyM9SgOB+O7/JGT/QfA+H58wqS78t99bJLRbdHu2umyPwDi3EOFCMVpb8nZ66r/hj0a0l8xnwOFMY56859PT6mtyH7v8An1NY1t1P1X+ZrZh+7/n1NftVOPJU5ey9eif9dO2h+Zyk5ycn11/DyJgcOhPQZz+IOP5VoQ8Ak8A7SPfr/jVOPqT3GOfzH9TWiqgqpI5IBPX0r0HzdLW87nNPm5na1tN79kLuX1/n/hU0TH5tpXtndu98YwKIkPzbQvbO7d74xg1Nsf0j/wDH/wDGl7/938SPf/u/iG5/WP8A8f8A8KNz+sf/AI//AIUbH9I//H/8aNj+kf8A4/8A40e//d/EPf8A7v4huf1j/wDH/wDCjc/rH/4//hRsf0j/APH/APGjY/pH/wCP/wCNHv8A938Q9/8Au/iG5/WP/wAf/wAKNz+sf/j/APhRsf0j/wDH/wDGjY/pH/4//jR7/wDd/EPf/u/iG5/WP/x//Cjc/rH/AOP/AOFGx/SP/wAf/wAaNj+kf/j/APjR7/8Ad/EPf/u/iG5/WP8A8f8A8KhlY/LuK98bd3tnORU2x/SP/wAf/wAahlQ/LuC98bd3tnOTR7/938Q9/wDu/iRAg9OaZJ2/H+lPAA6CmSdvx/pVTv7NX89tviJlz2d+W2m17/1cgccZ7DJP+fwrOkOXbHt/IVoueMdjnP8An8azpBh2A9v5CsqfNyRta2u9+7HHmsrWt537jOw+p/kKSl7D6n+QpK4q9/ayvv7u3+FHTC/Kr767erI4vuD/AD2FSVHF9wf57CpK5ofxZeq/KBQVJGcOuff+RqOpIxl1B9/5GvXhzckbW263uYT5uZ2tbTe/ZF8AlBgdTkfTFTxHaMHj/wDWfSoASEGOxwPpjpU8Q3Dnn/8AWfSsJc3tne3Ta/8AKjP3r9Pi89+X/L8SUkDrxUsTH5tpXtndu98YwKiIB6ipYkPzbQvbO7d74xg11Pm6Wt53H7/938Sbc/rH/wCP/wCFG5/WP/x//CjY/pH/AOP/AONGx/SP/wAf/wAaXv8A938Q9/8Au/iG5/WP/wAf/wAKNz+sf/j/APhRsf0j/wDH/wDGjY/pH/4//jR7/wDd/EPf/u/iG5/WP/x//Cjc/rH/AOP/AOFGx/SP/wAf/wAaNj+kf/j/APjR7/8Ad/EPf/u/iG5/WP8A8f8A8KNz+sf/AI//AIUbH9I//H/8aNj+kf8A4/8A40e//d/EPf8A7v4huf1j/wDH/wDCjc/rH/4//hRsf0j/APH/APGjY/pH/wCP/wCNHv8A938Q9/8Au/iG5/WP/wAf/wAKNz+sf/j/APhRsf0j/wDH/wDGjY/pH/4//jR7/wDd/EPf/u/iG5/WP/x//Cjc/rH/AOP/AOFGx/SP/wAf/wAaNj+kf/j/APjR7/8Ad/EPf/u/iG5/WP8A8f8A8KhlY/LuK98bd3tnORU2x/SP/wAf/wAahlQ/LuC98bd3tnOTR7/938Q9/wDu/iVnIOMc9f6VGeh+h/lUjgDGB6/0qpP/AAf8C/pXLUvzyvvpt6Izbald2vp6FeX+L8P6VQbo/wBf6NVuTt+P9Kp3H3B+P8qwrP3F6P8A9uOqk7wT9f8A0pnPXxIgnKnEqI8kfbOz72D9DXZaXaQaT4Ea5uT++VJ9SyRn/WAHnPLc9u3PHAJ861ibybS9Y/da2ZW/3TIAfyz+PvW7rdw+paRonhWw+5fabb3F2eBj7OA0fI68SzE9vfINfhni3iHTwWDjfVVHtv8AFfv+a7eR+3eEOG9pi8ZJ6+72292P9f8AAufMfjCESWsupgEJdXb3AzxwwOcgd+Mj6njvXidld7DJL5csjfbXx5XbDAHcc9TkAepXHXp9E/EdVsbF4FP7yJGt5cdiAoUZ7HIbOO+O+a8x8G6JG95ZrcpFNZmdHuLaTI85pWzEF9NhDqfdh9a+FymsqeA9v1cNvRtW6769P+B9vnmH9pjXSa150k36L8H11PS/C2kn4irP4f8AD6iLWYtMe9vkuLgQStpcEkBvXtv7zRjYZAem5D3ra8SaBofhW5a2Sw8S6g7tu/tKHVvJjljjhgWOOPuwhYuDydoYdN3H0v8ADL4feF9O8b6NrdrpUUF9aeFPFGr3iRf8sxZx6Vb2hYdfmGoT4yOoYjua4/4leG0WCEQEDywsCp/d+drjGOc/8fXQnPcdOfGWY/WK84X6tPoui8/zOnCYF0va01uorvu4xfXprsr/AIHz1F4j0RY0QXvinSZ0kQQzfbvtuw5O/H/PEj5f+unX+HjuLL4m+IvCksd7F4t1+7tZGgigF7OYbWScBzA8vTcYQZMc5G846nHA6D4QkudQuxeD9wtw8QB5QiVxneM/9MxjnONx7V9KfEPwJL4q8CaRL4eisrmfQBZu9pb5MtxDaqfMMnYsij5fXcxx0xrUpYSrP2c9Z6Nv1tbVaaRt310NKDzTC01LD3dJSlbsveu+l9Hfy+R6n4L+PnjzUfB4127tNXuPB5u5NPfxDHANT0972PauoIgAzAIi8G7/AJ6buOI+ON8faFa+JbMatc6GL3TL0NJa6zptj9heJm2Gb7fgfvCS0ZgzyhWbP3ya8A8AaR8WdYspfhT4PTXLnTtb1tLwaNHa+dDZ3NzNhpWlH+oGA7Dj59mckJX7E3fwM1P4J+GfClxp+oXeprLoATxNp4/4mn2WRo7Uapd3Wnn/AJdtNMqCb/ZnPpXk4ujTy1yrU7cqtJKL7RXz19Nfmezg8TmuL5I4iK9k9tF39OjTt+p+Qa+H9b8J3R1bSboHT1Xaq/xHqAJM/wB0MQvJHJ7HB+ufgl8Wbyzkgjm8m3lJhJaXP70t5nK9hsIOcddynpjP1X40+Gfw/wBR8M2NzNoNr8P5dVtnNp448Mv9s8J64JBH5L+JfDvH2G0ld2F3cj7hcnnZXwxdeDrzwJ4obTrlYGit5o57W5tJze6feRTPkXGmX+D5umSBUa1tcj7H86nHm18/iZrO6FaVvgi9t/dVtb66Wvv2eu59flzWDnh3G6XNo78u8m+9lbXW3kfrl4C8Y3espZtFeWqTOPl7ZjOPM/Ibfz4r6aXV9QtNFjksriKeBQ6yeVj5PMC+bu/3sDHH8Jr41/Z/0241gaT5Hlg3H2fPm+g342/gTn2xj3/RTxV4Ig0vwtFLH9l+0yQsJ/rtTZ7fxP8Ahz2r8vxODklNWfuyktuztdfk+vY/WsHj1VjCd0rxirN6+6ku/ddt/mfM9943udOMkFvJIlq2XXys8yDmXd2yCRj6/hXHn4syNfxZ1E2tvpkV1cXUtz2wI/L2f98Pu/4DmvKPitqeoaE81t5fmRRmVj9m6rvKEeZz3wdvf71fD/ibWfGOq3d3FpdtdPFIA4iyctszg9f4ckcHgtk8GryzAuvKNN2Tbd387bt21/4bdHFnmNxNGE6tK3Jyrld1b4Y3f39b66dz7vvf2qLjRLl41EV7YmWWcyRf8vETsvmlh1+QBccfxGo2/bh8OThbLRr2GBiCZIZT/wAe5XHm47DeD3/ujrmvyr1TwB8R/FlwgvNVmsbEMwmtZZxBsAK4C7sCTOGJ5+X5eMnj0Lwf+y94x1uRGsPFOn29tKY1k+2zid32lsfZx/BjL+YOSxKc4Ga+1pZBlcYRVdv2tk5NedrNK91pZtb+dz85qZvm1SbnB2i7cqfdWT3V91210skrX/Rq2/ay0a+inuGvLC/gkCLFPJn/AIl86b9xH/XwzLn18kfjxOtfH2116OZYJbWbUICXkktv4kfmAP64Ecmzr1YV5Dpn7H+o6dJbDU/FLXAlBYx21uJoSU25D/3B8y7P72CT0IMXiP4JeIfDymTw81miW8im4k+z+S8seSV3ZPzlQHIPG3cT3rT+yMkh7t1p35W9dV17dPTYwhjM6nVctdWl0StZX2T/ACu9+uncWHxMfxZKkF9cxQKiyRsso/1u7aAF7nbsGf8AfHXBrmdWu41LWkIh8ovJteL+LJUsWA9iCOe569K8P8SaDq9jdTXk0+IxAHDW2flliH73eB1+8m3Ho+OelLwTrOq3F/BNrOoy3GmStKkCzA5ieHAOMjjeWQnjqoxXHicgoJPEYe3spK8dUrqKSe2+qb2SfqetHNa/KsPiFerH4k07O9pLXtZ+h6L4jdP7OFtIcF0lIBPoF6joDlgcH1wRg8/m38ULWO18Q34TGWbnA6AHgZx6Me5/Cv0evJHllmLyeYSkhHcCMgBPzyenHFfAnxot/L8W3vXElpEv02gg9en3uMk+vSvpuC6bpYqVNfZt93NF+vV+vU+I40fPhIP+9fvp7j+a0e/c+cLaD7RqcEfT98h6Zxjac/hivq3Srf7NZwR9cRR884IK5Hc9OR6+tfOng/Td+uW8h6CSXIOOny5985xgDk54xzX0vBF5Mapjr1OPQD+vQcYz26V/VXh9g9KuJ195Oza00drfet+9l2P5l4wxadT6svsuCe/WMJdHvd+a11VzpLPq/wBU/m1bKfdH4/zNYVseW+q/zNbMP3f8+pr9GoO87/4/wbR8Jbl0t0X4q/6lqPkkdzj+p/oa0VYBVBPIAB6+lZ0fUnuMc/mP6mtFVBVSRyQCevpXpvm6Wt53MJ83M7WtpvfsieJj820r2zu3e+MYFTbn9Y//AB//AAqGJD820L2zu3e+MYNTbH9I/wDx/wDxpe//AHfxI9/+7+Ibn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABo2P6R/+P8A+NHv/wB38Q9/+7+Ibn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjR7/938Q9/wDu/iG5/WP/AMf/AMKNz+sf/j/+FGx/SP8A8f8A8aNj+kf/AI//AI0e/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KhlY/LuK98bd3tnORU2x/SP/AMf/AMahlQ/LuC98bd3tnOTR7/8Ad/EPf/u/iRAg9OaZJ2/H+lPAA6CmSdvx/pVTv7NX89tviJlz2d+W2m17/wBXIHHGewyT/n8KzpDl2x7fyFaLnjHY5z/n8azpBh2A9v5CsqfNyRta2u9+7HHmsrWt537jOw+p/kKSl7D6n+QpK4q9/ayvv7u3+FHTC/Kr767erI4vuD/PYVJUcX3B/nsKkrmh/Fl6r8oFBUkZw659/wCRqOpIxl1B9/5GvXhzckbW263uYT5uZ2tbTe/ZF8AlBgdTkfTFTxHaMHj/APWfSoASEGOxwPpjpU8Q3Dnn/wDWfSsJc3tne3Ta/wDKjP3r9Pi89+X/AC/ElJA68VLEx+baV7Z3bvfGMCoiAeoqWJD820L2zu3e+MYNdT5ulredx+//AHfxJtz+sf8A4/8A4Ubn9Y//AB//AAo2P6R/+P8A+NGx/SP/AMf/AMaXv/3fxD3/AO7+Ibn9Y/8Ax/8Awo3P6x/+P/4UbH9I/wDx/wDxo2P6R/8Aj/8AjR7/APd/EPf/ALv4huf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40e/8A3fxD3/7v4huf1j/8f/wo3P6x/wDj/wDhRsf0j/8AH/8AGjY/pH/4/wD40e//AHfxD3/7v4huf1j/APH/APCjc/rH/wCP/wCFGx/SP/x//GjY/pH/AOP/AONHv/3fxD3/AO7+Ibn9Y/8Ax/8Awo3P6x/+P/4UbH9I/wDx/wDxo2P6R/8Aj/8AjR7/APd/EPf/ALv4huf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40e/8A3fxD3/7v4huf1j/8f/wqGVj8u4r3xt3e2c5FTbH9I/8Ax/8AxqGVD8u4L3xt3e2c5NHv/wB38Q9/+7+JTl+bbt5xnPb0x1x6VRuAw2ZyPvd/Tb/9ar0vy7dvGc5/DHrVC4JOzPP3v/ZaPf8A7v4h7/8Ad/Er9h9T/IVWuv8AUt+FWew+p/kKrXX+pb8K8+vf2sr7+7t/hR0Qvyq++u3qzhtdbbYP/tyQxf8AfZYnHv8AKPeut+GlxaX9zrWp3X3rCxs7KM987b0OSfqqDuSOmDxXK63uOm3CpjzGTjOPuAgv1/4D+lY+k3A0PVYkvBMmi6jYwbLmLrBNbCTdkHH+sNwpGOcqR3NfgnjBQc4YaSu7yh30a5FokvJb/pY/dPB3EcmJxcdfhenTZf0+t3pqzO+K2kxfZb3UIsFYRE5wAMeazkD/AMcI/nnjHlngqDz7uCYZz5sAz3OGcjvjv1P68itj4g6+WSawiuJLu3ub2HMsgxmNC4jC8/7bdBg8c9KXwIvlzQxyfcNx/o+eB83+s9cHhOQM9RX5zQg6eBcbvSC/FL/PbzP0LH1vb5m6Vr+/FaJPpHfbq/u0Z+k/7MfgS6+Jnxn8K/D+0nhtr7xh4C+JGg6RLJP5JOuR6FaeJbGJT38yDw1fhv7uB3NeceJPCU88smm3kEVtfRqqyxRT+fmJkVUkfgbfMnS8K9c7c9iKpeFIp7WO3vYbqewvbeeyuLDUIJfsctnLGJS0lnfjHl6kS0f2G2/5fSs6n/U8eux+IPEMc01z4w0s+JGud7v440ezH2pIrjYEXxPoOcf2ooXDan04kkOM8fFTruE5rmsuZ9bbtO+6V/l1+/3FlmKlW5qd+S0GtNvdh3363/yZ82t8M7iwPnwp5i53OpPv8vp/tAYx+ODXb6LpV9p7wy2Nh5Vw6sjsP+Wy/wAXqAUDdT/f9K+qLDSdH1B7dY7uzvIpbKCSB/O+2StvD71lvhxNj5MWo/48vmX/AJbZrsNI8HaePLjmsrVIg52tnO/p+W3j8T9CcHmWLg3Gk+aK2ad+idr3+W/TXz+mwOWUOSCxNvaq7l/7bv3Vt+uutzyDwLdeItGnilsNPMMQkUMvnX0P2l5i2/8A48vvbMDmTAXzPk6tX1Fo+nW1/vuNd0i60uR7Zw95bX19+8Sdf3qSfbeOQibRGO7b/wCGtzR/CFvYCOdTawWxZGVBx5uzOf8Avnd/48Ky/GerXETtbJFFHCI2ERj/AI+F3Z78fLg9tx/DycbmNWu5UqrfPpfprZW20va35Hs1Mvp0aSnStyP4XpsrXtb+8v6aueTeOvFOh6f4PuvBWi27yxQTXU1tFezidrNpWia6lg/um6KxNJ6+TH6V8BeJdSkuvF0m/UZGsrWHSYYLW5g8+3Wdp2uXxz8h3WSAAZ3HGemB7d8W9RutN0rVL2F5Y5+RmMY3wHiaNiQeH/dY4OMHmvFPgT4I1zxX4wstS1qw3390H+z2VyM/Y9LVswSIc9bpdxbpkQjtXpZTH6nl9fFN3vCbW+rUrbbdL6N210tv8xVbxmZ4fDK/uzhrbvyNvt3W229lq/0e/Zb8aX3hD4naX8TLzTU8eW1xeDUrvwV4ws9e/wCEXuYbmG3toXtV8P8AiDw7fRtEtlIZLv7VdpaZhb+zbxZGjr9ifiT+1H+y98Q/C97Z6j8NPiD8JPGMaQXOn6n8Mda034x+C4rtAFluNU8NXuieHfHK2mnQeezCDTpTp6Xc26/ucK5+Wvg94Q0nSdOtbd9LsPssVjZ74Zf+W0hWcSbfXZxnPXevevnP9pOxt9Ba71PQJLXSTJcbJI7afyd0gKNBE/TfvHnhfTDetfKwzv2/NSt/HqTjrFP7fL20ejejVnc/S8Xw17PkxPNNPD06c0o1akI/BGXvQjNQl6TTLnxzh+HnhSSfVdP+IPhLxl4TvdOtdS0HxNpseorHe29+rm4s7zRtWH2/S76zuY3WW0mOA8rKn+rIr4wuPENtcQ21zofhzxje2b3ZZLux8I+daXW+Kba2l2//AC/Kgz9obpCGhPWStD4YyaL8YvixHdTWRHhvwTBbSXWjSziay1PxExkP2m6/uiBrFjHz83nv021+gvxlvdT8SeFdL0fwrqen+HbWN7Rbue2l+xW4ikhlS+sY9U6WBkSKNGJ/12B/zy40wuGwuFxLo1PjjaT/AO4iU196kvnbRHj1sTisXT5KfwfCr/3bRf466a6n5t2/gzxR4gtrGXRvDWr6/dXsCxroNzLp2l6msjzTCBJdGvB59u0pL7VsyC3lkS8iIHi9Xl+L/wAN/F3hnwd4m/Zz8a+F213xBp2hw+INRi8RabotsdWZhBf3Gun/AECyFv5YEbAlZPOY9I+fsvwjF4L+H3iS2vofA1pd6RFosRuRJfHxRE10Llhd6g/ecytIsiAZ2bTnrXyB8fPFvx1+HvxT1/xT8IPG/j3R/Cuu3QuoItEm1CbQbVmihIjn0KyBgs44fNYRLe/LODII+IZc/oGSYXA4qdSMrW0td6dL/O3z9T4PO6+NwNVLonHZd1F6eqfmemeIv2jfD/gLxRefDLxNL4m+H/jbQLt7GG9m1bTvGfgzU4ysZTUZryzxcaes2VwLzm4BPlf8e8tdXJ8dZYrK3l19NO1TT7gqU8S6U3/EvuFyuSI/+WZXchIPXd/s15B8HX8e/HDWLzxD8evhP4H8beG7KxMSfEDU/D194S8U3N8BII00zWPDX/H1KPLH2ltdx5LfZ/sQxNe447xh8NfC3g7xhHB8JPET+Hm1SdGvvBvjPVUhtJZrhiDFpXiE5nZXDSC5Fx8wH2XYMu5M5jw9l1Oc6tJv27equuiVtdndWS0s9NbJM6csz7MHKEqitQ0tounKnr633fQ978Qa1beJobe802+tJtNkjkKfZj87bvLys3qRgBPU7+4rxrWNA0+MG4tohFqAkBS57qmR5p5JxkBSMY+726Vw9tp3ibwfrlxofmJZFrozzaTa351TT7Z7ghjLZagRi4F2clv7nlR5+8wr6B8OfD3WNeMdzLZb4mEUtxL/AHduWU4PQ/fA+nIr5PGVJUL0ZacttL23tJf8Femq1v8ATOUcwfPHafKlZXd0ktbXtt577I5ewsIfsksg+dfsy7J/+esij950/uHb17nv8uPgn48vJH4kuUc5RrVCnf8A3h+W04PAJzxjJ/TbxJYQaVp08Jk8tGMVvt/3N27n2z6etflp8ZJ5/GPxCbS9A86e7M8OlfuiBsuy6pZgnPG8C4I69D3r6DgutUhiMViqiaw9FXTWmiUW9f8AEn8XdXsj4XjGhVwsMNhcPd1sXJQtu91bT/hvxscP4Itd1xv8uV9oVh5dubjH38E4Py56DrnBBGRz7PZTeYSnlTR+WcHzofJLEsOF/vbQvPZcgZAavu/4dfs9+Dvgv8M7fxR4ttPO1i9tbaQW9yf9dqzpIZvLPGMPNBu9Ny18mfESzvovEEd5f6dFp8moXPnQxR/8+ybTCW5xlRLkd/mNft3BHiXTx+YxyWj/AA6VTkXRvmalLyteV/Lc/N+M/CTE5bwvjOIMVmPsK2I9nVlSf2OWMVG2l7NRjJK61XZFC0/+IH8/8O+frWp2T6n+dZmnfcnHJInfOfw6Y7VojqPqP51/REP4v/bqf3xTP50bva1b6xaMF7X+e0Ir10ty/IvLyFHcgY/LNXlYBVBPIAB6+lUV6Ke4Ax+WP61eVQVUkckAnr6V6D5ulredznnzczta2m9+yJ4mPzbSvbO7d74xgVNuf1j/APH/APCoYkPzbQvbO7d74xg1Nsf0j/8AH/8AGl7/APd/Ej3/AO7+Ibn9Y/8Ax/8Awo3P6x/+P/4UbH9I/wDx/wDxo2P6R/8Aj/8AjR7/APd/EPf/ALv4huf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40e/8A3fxD3/7v4huf1j/8f/wo3P6x/wDj/wDhRsf0j/8AH/8AGjY/pH/4/wD40e//AHfxD3/7v4huf1j/APH/APCjc/rH/wCP/wCFGx/SP/x//GjY/pH/AOP/AONHv/3fxD3/AO7+Ibn9Y/8Ax/8AwqGVj8u4r3xt3e2c5FTbH9I//H/8ahlQ/LuC98bd3tnOTR7/APd/EPf/ALv4kQIPTmmSdvx/pTwAOgpknb8f6VU7+zV/Pbb4iZc9nfltpte/9XIHHGewyT/n8KzpDl2x7fyFaLnjHY5z/n8azpBh2A9v5CsqfNyRta2u9+7HHmsrWt537jOw+p/kKSl7D6n+QpK4q9/ayvv7u3+FHTC/Kr767erI4vuD/PYVJUcX3B/nsKkrmh/Fl6r8oFBUkZw659/5Go6kjGXUH3/ka9eHNyRtbbre5hPm5na1tN79kXwCUGB1OR9MVPEdoweP/wBZ9KgBIQY7HA+mOlTxDcOef/1n0rCXN7Z3t02v/KjP3r9Pi89+X/L8SUkDrxUsTH5tpXtndu98YwKiIB6ipYkPzbQvbO7d74xg11Pm6Wt53H7/APd/Em3P6x/+P/4Ubn9Y/wDx/wDwo2P6R/8Aj/8AjRsf0j/8f/xpe/8A3fxD3/7v4huf1j/8f/wo3P6x/wDj/wDhRsf0j/8AH/8AGjY/pH/4/wD40e//AHfxD3/7v4huf1j/APH/APCjc/rH/wCP/wCFGx/SP/x//GjY/pH/AOP/AONHv/3fxD3/AO7+Ibn9Y/8Ax/8Awo3P6x/+P/4UbH9I/wDx/wDxo2P6R/8Aj/8AjR7/APd/EPf/ALv4huf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40e/8A3fxD3/7v4huf1j/8f/wo3P6x/wDj/wDhRsf0j/8AH/8AGjY/pH/4/wD40e//AHfxD3/7v4huf1j/APH/APCjc/rH/wCP/wCFGx/SP/x//GjY/pH/AOP/AONHv/3fxD3/AO7+Ibn9Y/8Ax/8AwqGVj8u4r3xt3e2c5FTbH9I//H/8ahlQ/LuC98bd3tnOTR7/APd/EPf/ALv4lOX5tu3nGc/jj1qhcAjZkf3v/Zavy/Lt28Zzn8MetVZPmU55wrY/L2+lHv8A938Q9/8Au/iUar3H3B+P8qmUklvY/wCNQ3H3B+P8q4sVfW/bptszohflV99dvVnHapGZILgdvLI/HLEHoemP5etcdKz6hoTWySGNbRnZz1zuxgEHjgI3ToG46kDurr5g0ecbz+i7ice+P84zXAaW8YttRtJAP3184B9wW5+pyRx9M9SfxvxPwlsFgsT/ADVJPa792dtuq0+bP1XwqxqeZY7DPTljFa9fci+63v6K22p5b45VJtI0l1k8xheSI3Q7dhhxz05zj0+UcdK9B+G9gkscbSRmRI5Fz227t4HQgc7enPGfUCvOPiBax211ZCPHzXYzj0GzH/oRHtjFereApvLt4U/56XUefooOe4/vZ/8ArZr8lxTvhakl1hFd9ora3r/mz9fytOOdVYu/8SD+Uox3v3XS/U+sNEtbtrceSnl26CHb/tA78+nQAAHqfTHFe6eFG8pUITdOlvIEf7P56J93cH4+UNwOvOD1wa868IeZLPaQRjH2iFctz8pUAjjr/GeD6V9F+F/DNwBMHuZZoGaLzVj58v8A1u0H/fG7A/2TX4/mNeUKtVa6S07bJ6bN+u/lpp+35Vg/rXs4W38t79b/AHeexSvfBfgzxc0P9p6Fc2Wrw28Zj1fQLn+xb1xLkzO95/D5flRmP3aT1qCHwl400CRYvBfxKbUrGE5h0jxdpd7qaW7L1in1yyHziTON0h48oFOS9e66P4RgijnuI/Nd0i/cQS/8tchvM2+6YXP+8K6Twx4Bku4vPaOI3M7zeXDJ/wAsNmM4P+3vBP8Aujk151PF+6t9337+Wmmi/wCGPqXwxhW7z+NpX+5We2jtb/M8k0XxP8X7LzpdU8EeHtXhtbd0km8PeMTZrMJeCy2WtAZJ2DatuRty3nE5irjfHXj3SrSFW1rwl4ysZhCrmKLU/CQsYnbGY5NUvP8ASLVZSFC/YzulCt5pzFFX1RN4UuNPs7mOaO1juA48v1OC+78uPxz718K/tCRzwWjW9t5X2+7u44P3YPMZZfMzj224/HoOR6eAr+3qqnZaP8+uuu3mtNdjys3yuOCw75G+SK927fa79dbr/I8L8Uai/jW9j80raaPp93bXFn4ct53vZnMhfM99f/8AHvclPKQx/ZyBHumJOJEx9o/s+eCYrS7F0lnCLyWF5Xnj+8UuBiJJB/0yEbbf95hxzXyB4E8Gtrt3bQvc+RBaXCxzJwBI68sOmRswBgf3vcmv1Y+D+iWmlwWQgtvtbskCQx9fN8kOGOenG9c/X8+7Nq/s6Dwa2pp6L++lL03e/wA1c8fhzKvrmNWJdv3b5v8AwGys/wDwFW0XzPp3w8n9kaNFaN5s0ktujSeX/wAscByN3+/uOO/yH8Pj/wCPfhyXXtE1mO3uZRcLNG0KywCfbvEgO3pt6DOThuB2r61uZrjbOht/srfut0P9wYfb/X0xivHvGMYE8SXPy/aZvs8M3/PKSSCbH/fWB/3yK+Kpv2FWjPrz38/ibv8APT8Ln6ZjpJ0q6/5/QjC/+GCh+nz/AD/OP9lj4Y6n4T8f+OZ9Sv7tjZaW8kWnW0HkrfDXJpi0k2T8/wBkFhGyYxt89sda/UTSvDf9q+HZ2Kh1YiEqfvT+XEn7t+2YN+B7yGvhTwrqcvgn4srdasf+JTq2nvo+sX8nNpaOk8y6Vqlxj/nwNxelO589+mK/R3wQ5tI7SEan/aMXkhrfUIv+PXUoHy0d1bepdTiT6J0r18XLFTxE8XTtyzVOy8o04x236f1sfIUcNhcHhI0Kv8SEpyl6Tm5xd/SSv8vJnyT4w+DNzk3mkXItbjzJGktgfm/g8vZnv9/P1FePanofivRJX8+TUAgMcc0cn3bn7wUxH0j+bd7SL61+oPiHw9Jc2Au4o9kjOzL6zfdz/wB8+n+1615Pr2mRyRR297Z+XLscbv7+QoPX+6cZx1zxV4bOqlJqE7qa0e/WzXVdLfl2PMxGV4HGp3+1t300/T7z8/tR/tpkktX1G6tbAQs01uJxDh5F/c9R83Kv/u9OcnPz3q/w1uPEV5af2j5tzBFqIkdJJ/P3bpAbeRc8r5QRi3Y7hjpz+jms/D7T5S8vl+Xksfr0P6fpmuct/AtopeVP+WCsT/wLP9VPvzXpPN5VHzu+qXnsklr+fY8mrksMNT9lT1hHVaX39579238lbU8G034LaT4p0VrDU45PttpDd/2F4jiufJ/sPUIbdru1naLI8/abLCgn5Np/v1654H1K1k+EWj+IfEk0tnqP2C/bVtVltvIN79gn+yDU1lyfP+2rAST/AA+WD/Hzk+KNfg8IeHdc1Ebj9i029ljSNj5stxCYpLeNI/8AloDIgZ+uNo45r4v+Nd/+2/qXw/8A+EV8X+MvD3xB8PRaTYaRpyWGnfYfFWiaBpzPFpWk+Zn/AEiGwjlkF0f+Wa7Tkb+Lo4fC5xP96/3lNXd212+/ouux4uIxFbKIv6td1ajS2fW22j766nEfHz42zeL9QbQ/BeX0aLbFd6n/AM/IU7WHOOY9knvl/XFcT+y/4X0LWfiJ/bOtaZ52j6DK188gPF5qKszWyfhJCwwccFQQeta+g/Dm70vw9pg1sWraxHZQS3s9qMxPhJDFE44P2iEeYs/PVwCO9e2/se+HNGm1PUdQ1G62KmtXU8Nr/wA/j2Uj7Rj/AKZGVMdeJAfr7mYYqnk3C+O9m1y1Goq2+lk13Svd+lkmRw/leJzniTLsRi03WjeU1rZWdo7/AN1J+nofTOqaT4g+JPxC0iHXrX7NZAQ3Wm6F/wA+tlBFIEk/7eE8o+n7rNfKX7Xfhq38O+MvCNlbRGFW0i6k8gc7P3tnjPckjPPPT24/VGz062/4WVouo3Fr9kiuNKu2aX+6HgjFsnv52JAB0+Wvzf8A26L+2n+KXhmwig+zXFh4fLTwf3Y7mWP7PL/21EEvtx+eXgjJ5hxrhJ2/hxU316X181db/cktfa8dq6y7gPFUtP3knC3d/Cl107b9+58l2Uflq2O4Tn6bh1/TpWjH3/D+tUbXgMMdAnPrwatjqPqP51/e+HnzzcvOa/8AAXb9D/PCOkVbqk+vVX/UuRAndjtj+tW4vl3buM4x+GfSq6kgDHHA/lViL5t27nGMfjn0r0/e6ctvmYz5uZ2tbTe/ZFyJj820r2zu3e+MYFTbn9Y//H/8KhiQ/NtC9s7t3vjGDU2x/SP/AMf/AMaPf/u/iR7/APd/ENz+sf8A4/8A4Ubn9Y//AB//AAo2P6R/+P8A+NGx/SP/AMf/AMaPf/u/iHv/AN38Q3P6x/8Aj/8AhRuf1j/8f/wo2P6R/wDj/wDjRsf0j/8AH/8AGj3/AO7+Ie//AHfxDc/rH/4//hRuf1j/APH/APCjY/pH/wCP/wCNGx/SP/x//Gj3/wC7+Ie//d/ENz+sf/j/APhRuf1j/wDH/wDCjY/pH/4//jRsf0j/APH/APGj3/7v4h7/APd/ENz+sf8A4/8A4VDKx+XcV7427vbOciptj+kf/j/+NQyofl3Be+Nu72znJo9/+7+Ie/8A3fxIgQenNMk7fj/SngAdBTJO34/0qp39mr+e23xEy57O/LbTa9/6uQOOM9hkn/P4VnSHLtj2/kK0XPGOxzn/AD+NZ0gw7Ae38hWVPm5I2tbXe/djjzWVrW879xnYfU/yFJS9h9T/ACFJXFXv7WV9/d2/wo6YX5VffXb1ZHF9wf57CpKji+4P89hUlc0P4svVflAoKkjOHXPv/I1HUkYy6g+/8jXrw5uSNrbdb3MJ83M7Wtpvfsi+ASgwOpyPpip4jtGDx/8ArPpUAJCDHY4H0x0qeIbhzz/+s+lYS5vbO9um1/5UZ+9fp8Xnvy/5fiSkgdeKliY/NtK9s7t3vjGBURAPUVLEh+baF7Z3bvfGMGup83S1vO4/f/u/iTbn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NL3/AO7+Ie//AHfxDc/rH/4//hRuf1j/APH/APCjY/pH/wCP/wCNGx/SP/x//Gj3/wC7+Ie//d/ENz+sf/j/APhRuf1j/wDH/wDCjY/pH/4//jRsf0j/APH/APGj3/7v4h7/APd/ENz+sf8A4/8A4Ubn9Y//AB//AAo2P6R/+P8A+NGx/SP/AMf/AMaPf/u/iHv/AN38Q3P6x/8Aj/8AhRuf1j/8f/wo2P6R/wDj/wDjRsf0j/8AH/8AGj3/AO7+Ie//AHfxDc/rH/4//hRuf1j/APH/APCjY/pH/wCP/wCNGx/SP/x//Gj3/wC7+Ie//d/ENz+sf/j/APhRuf1j/wDH/wDCjY/pH/4//jRsf0j/APH/APGj3/7v4h7/APd/ENz+sf8A4/8A4VDKx+XcV7427vbOciptj+kf/j/+NQyofl3Be+Nu72znJo9/+7+Ie/8A3fxKcvzbdvOM5/HHrUJUgEkcDk9KubF9P5/41DMMAAcA7gffp/jR7/8Ad/EPf/u/iZcpy5I6cfyFV5fuH/PY1cPDuB0+X+VQzfd/z6isq9/Zu+9nt8johflV99dvVnMTxmTI4/i656kjH8v5VwNzGLDUIpW8nyZZf3vnZyQpGwKeezMDgdQvXBA9KuiQye5f+n+NczqFrFeKEfPRgpB+7lVJ78++ME84+br8hxFlH9qYD2dt1Jf1933/ACPayXM3k+OoYu2jmndX1s0nt6LfT5njPxWS3kTT7i28rY10h/dc8Zjxu6+57EHOc10Pgm42vCpj8wCSNt3H7vy/u+n3gcj1xnnk1y3xAsY7e0tlj/guwG6jJJTBH0wcj24rR8IzkQRcfddvxOVPHfouO/PQV/PWfZO8sVTBNu9LXXtNKpfVbWnp6fd/ROQZ5/a+JhmCX8ZU9k7/ALuMaS8ldxT9WffngHzJ401FbnIAt1eP/c83C569d3qcH16/ZXgW7juYpUjiMczi2QOf493nD9MHH1Jr4S+Gmqf6JZR/usgMP3meBx93PXrzjnlQR3P1/wCB5n8uedJYkCPbq6xfx+b54Gen3dpxznknoTn8UzmnyTqxe9/TpBprr1+7qf0Pw1ivcpdPz+L5de3zPrfwutvDL9iuot7QKrO3XYZtxB6H72w/98163okFvBFdyvLvj8pvsy/3OT5nHvlP++c9a8F8N6nHbIlqItiMu6Zv7+QSn/fPzc+9ekWPiOC2s5Vkj3qsb+Q39zkeZ+fyfTHtivk42tp3f5/5H6QsVotei6+Xk0b/AIpaJNPa4l4he1EZ9gwJHt2/IV+Vfxf1uPU9f1HUIY9403zLGMn+Hdw3bv5Y+m0Hg4r7m+JnjWT+zp2jvZI1isP9XHnndG3DfTbx3HPSvyV0n4hQX+u+ItM1AZSfUbkRvc9co8gYpnnJLKWx/sj6/WcPUPac8rpXvrr300t3SWvXRbnwfFuNc7UeicdddbqP377ar7j6O+BUWmSaojTH7VcSFXeDj5SxlPrwSSeTjpjrnP6u/BnwOPEl3DDFefZ7eJo/Oj/59/NZvLi/7b+U49f3fevwv+HHj6Pwh49tAL21exmnEbrj7gVuBntnzD2HA755/af4WfFfTtOgs9Qs7yKONLfzH8s9ZXAMO489Nr4I9TWGdUKtGpGpUT9hzLvrortLffW6ez+Q+HZ0pYZ0KbX1hRd3fR3ba1X91pdelz7b+KnwgTRbCG9hT7G0Wkh44f8AnrhIy0p/3/lOa+DPiFe5FvC0ZSS2h/eN/f8Au7eP+An86+nfGHx51HxBpFnb6peRSRi3BCyd48LsC/UDnHt3ya+YPEd9b+JZHntI4tysqpDH/wAvWT82f+uZXj18w147xVN126a9z3OW6f8ALFO1/wC99/mfU4bC1FRiqzXtLyb36ydvTSx8za3pE2p69pV9C4QXE7pJ2Z44/JzGvHJcOQT9OK+qvhloE2npC+kXd5piy3JMenXtt59gZEx5ryyf8sBIXXaf48H+5XILYfaNR02xbTpUl8zEixf8sctHgt/vYbHXlSea+t/D/gw21qjDzUZooCJJP+WGA/C/7+fm6/cFaTxPvOz00t9yvbR7+pnicuws051GudrXfpZLd9kizqms6volnby6lps1wj/IbrRW+22UQ+QFriP/AJdgwYeWP+Wm2T/nnWFd3Xh7WJbaCLW9N+2ENL9jlg8i43NsIQ/3myCD/d+prtpvD2ry+XHDHFPEu55J5f8AloF27QvQ8Ddn6j1rh/EGhpeoyzWdq8nzZ9jDt5/HPb9a0hPCTjzVbc73v5afoeTWyyap/wCxr3un3tLv+u5nan4H1q7t5NRbRrz7FEMLcW3+qkGM7n7YAA29uT0Nedp4S13UblbPSdOkupZ2MEMEP7mYzuCYoZ9Q/wCXO3l2yNN/z1WL/plUGqaRZw7ZJLLy/N8xA1tfX1ljytud/wBi4k+/8vm/c+bZ9565KS302MSoZbuZpVZPsv8Aa99MkiYw++O967cjiPjk7/4KxqYjBQm4Lpba3VJ/qefHLMwt++t7T7Wn3d+n+R8t+NtJm8QeMJfCkUkV3pvhXVpNT8V63Yfv9HfV9OZWtPClnqB/4/biFjdpfdRCzW+f9YK5nX9Ql1C4mnv2xHukdLbH/HlAwRIrT38oRHj/AGvavorV5dNt7M2Njbw2trbNO6RR23kOHm2mUySdJz+7XacfJlv79fNfiyeMCaRPK+TzMmTuTtxtz34OeeOM8ZrfBV41q3s6bahpb00b8t32Z5+YYaWGpuVS3MlrovLv5W/4B5NfWKeIdVsNEtn8ttZ1Ox0aMHPKaldwxy/l5ac+/PpX6a2H7KVr8I9RtbDRrmLz1hW5uVl/ilurazkAA65yz55z0yTyB+ePwzvLK3+KXgPUtRjtJLPTvFFnqlyo4cwWCTs2z8ZAPrjiv120vxjrXxA1C48Xajp01r4ciEiwXUoOxNKjkYW5jB7bYn3e+PxriJt4elhVe0bbN/atLb5pq/melwTTUa+IzDdzV1/25aL7b8tuvzPPvHFhJ4Z1zwVcX9vFsgivJ7uSL/n0jSyect9MJj8a/Dr41eNpPiF8WfG/iES77MavJpWnr12WenM6R/TPnenO3jiv0h/bJ+PWnmx1jVtBvgsc+mHwhoTHpO1wqQ6p/wB8bLPjkfP+NfkhbQtGqLIMzrDGJW/vSfvGzx0xvOO3J6nJr9/+j5wl7PmzqyXtVJ3tb+HN09PlTeiP54+kpxl7eGHyhO3sqkU1p9vkm306Sd99Dbi+4Pw/9BHSrUP3v8+hqIfcT6H+lSw/e/z6Gv6ohLmV/wC9Jfiz+UpKz/7di/vin+upeIJC47D+gqSL5d27jOMfhn0qMkgLj0/oKki+bdu5xjH459K7qfNyRta2u977s5p83M7Wtpvfsi5Ex+baV7Z3bvfGMCptz+sf/j/+FQxIfm2he2d273xjBqbY/pH/AOP/AONX7/8Ad/Ej3/7v4huf1j/8f/wo3P6x/wDj/wDhRsf0j/8AH/8AGjY/pH/4/wD40e//AHfxD3/7v4huf1j/APH/APCjc/rH/wCP/wCFGx/SP/x//GjY/pH/AOP/AONHv/3fxD3/AO7+Ibn9Y/8Ax/8Awo3P6x/+P/4UbH9I/wDx/wDxo2P6R/8Aj/8AjR7/APd/EPf/ALv4huf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40e/8A3fxD3/7v4huf1j/8f/wqGVj8u4r3xt3e2c5FTbH9I/8Ax/8AxqGVD8u4L3xt3e2c5NHv/wB38Q9/+7+JECD05pknb8f6U8ADoKZJ2/H+lVO/s1fz22+ImXPZ35babXv/AFcgccZ7DJP+fwrOkOXbHt/IVoueMdjnP+fxrOkGHYD2/kKyp83JG1ra737sceayta3nfuM7D6n+QpKXsPqf5Ckrir39rK+/u7f4UdML8qvvrt6sji+4P89hUlRxfcH+ewqSuaH8WXqvygUFSRnDrn3/AJGo6kjGXUH3/ka9eHNyRtbbre5hPm5na1tN79kXwCUGB1OR9MVPEdoweP8A9Z9KgBIQY7HA+mOlTxDcOef/ANZ9Kwlze2d7dNr/AMqM/ev0+Lz35f8AL8SUkDrxUsTH5tpXtndu98YwKiIB6ipYkPzbQvbO7d74xg11Pm6Wt53H7/8Ad/Em3P6x/wDj/wDhRuf1j/8AH/8ACjY/pH/4/wD40bH9I/8Ax/8Axpe//d/EPf8A7v4huf1j/wDH/wDCjc/rH/4//hRsf0j/APH/APGjY/pH/wCP/wCNHv8A938Q9/8Au/iG5/WP/wAf/wAKNz+sf/j/APhRsf0j/wDH/wDGjY/pH/4//jR7/wDd/EPf/u/iG5/WP/x//Cjc/rH/AOP/AOFGx/SP/wAf/wAaNj+kf/j/APjR7/8Ad/EPf/u/iG5/WP8A8f8A8KNz+sf/AI//AIUbH9I//H/8aNj+kf8A4/8A40e//d/EPf8A7v4huf1j/wDH/wDCjc/rH/4//hRsf0j/APH/APGjY/pH/wCP/wCNHv8A938Q9/8Au/iG5/WP/wAf/wAKNz+sf/j/APhRsf0j/wDH/wDGjY/pH/4//jR7/wDd/EPf/u/iG5/WP/x//CoZWPy7ivfG3d7ZzkVNsf0j/wDH/wDGjY/pH/4//jR7/wDd/EPf/u/iU9y+v8/8Khl+bbt5xnP449auSofl3Be+Nu72znJqnL8u3bxnOfwx60e//d/EPf8A7v4lSUEbcj1/pVaTt+P9K0ASQ2eeP6GqM33v8+grKvf2bvvZ7fI6IX5VffXb1Zm3aF/Lx0G/P4hcfy+n6Vz91HscejB8cdMAf59v1rp5en4N/Kuau/vL/wBtf5CvKrN8n3L8bmlP4pf10ieJfEuPfZ2rdluj7dXXgYHt7VU8Fvu2Dskjg/jtz/n8K3fiVAZdGRm4jjaTzOP73lEcdf4Sc/8A1q4bwicSW6r/AKoL+7x05I3fyHPfivw/j+g51ZT2vyeW0Irr3019d7H7b4dYhxUIbq33Xla/6/gt3f7N8AGQFWjOAqpn2O6XA/NSPevrPwnqssMEccg3+btAg6ebtzng/wBwuPf5u9fJvws5fa+WiIh8wkHsZNoPrnJ657+lfVfh622Fyv8Aq2UlOvYNnn8Qa/nHiiPJV5POPXf3ad9u13a1tkz+nOGa7hTdbe9/uVlZb9r/ADPZ9J8T/YjIVjtDJF5RSO5zvt8793lHn/WYXeMn/Vpz3rp5fGNxqESQw3J86RlMsf8AB8hyoX8C/wCmK+R77xG8GoPB+98m3kYT+V6MRsyT67GxkjocZrptL8VR3EkUMfmeWxGGk/g5OcZ6543D8Rx1+Wlgfav2m91Hp1SS6eS/4c+ojnnKrc1tbavzWmq03fZbH0pfWNhrNpdCS3/0i5hVJ2/vbA4X6AFm/wA4r83vi78DbiDVLvVtHjlSV2meTyv4sGPy85I6ZcjsOcmvvTSNb8tYoPtJn3gfJ/zyx+uWz3x901YvvDsXiGUwPH5kzMGj9k6TevUbM9+PSu7L8d/ZlVU/5HfytJJ6tf4u3yMMZiP7To+z0u1v3/q1/n02PyF0/wCH3inTrlNUtoruS9ikUnjoFO7pjJzyMnpyccCvsHwN8ZNV0a2srK/kurG8g2RvJ75wB74x1+voK/Q7wJ+zTYeIZFu4LMyQCBwR6OR8/wCq9Pb1xWr4g/ZLtzq1vFY2MQkmiSOSOWDzvMzjbgfw7dz5H8W4dcV6+M4kw2JTp1Vea5U+i2Vlfa1rOxz5VlbwTjvu3vbd33XrtbT0Pj3XvjN4/wBd0fZ4Ys4b2W0Hmy3mpzmG3kVsGKIjjcZfLkGe233rsPhV+09Pdp/YninwkdB1e3jWOSSKfz7KRlEmZbXugbCl8j5t0foK+zh+yr/wjegyLBc2qXojWJrbyfJEH2oMen8W/wAs49NvTmvPfDv7Gfh7xPrK6lrt5smgkEUq23AkMZJ/eY9P4Pdn9a8erjcDUpqlZK35Np/hdeiW2tl9jQxNpJdrK2vb9f60vb1/9nbSdQ+JHioa3eR+VpGmwT3EKnB+3s+cf9+PJH4z194yaOLZbe1EYil2fafIz1RseX+in8OvWuC+Hvg/w/8ADbSdP0/RRLutI3XdLzu8sJtI/wC+mz6cd8129trf2+6D3PdmDdvp+B9q8ysoRptU3eFm0/WzZ2TnKcnJWs7b36JLp6GjErzxym6t/IUoUi5/1+wHf3H3Mr/33XIX2j28kAK23kS7pijf89MlM/8AfOB+LdK2tXOr5V7Dyfs275/N+/gY2eX7n5g3vtrntV1YwxtFc+d5rhGHmfczEPm8v6bhn/gNcFwo39pr3W22x4h4o8PRtP50f/HzGZUP/bbZj/0A15fd6R9k82Lpcqkj9/4uf6f49q9R1O9kfUL+8kk8uGcRKf8Aa8nzfT08zn65rx/xNrkYhuQ0vmRA/u/b7276fw/y+ulHD89Tn7+vTTXp6dNdfPPG4jkco9revwrT8fTXXpfwLxZP9njuN0uySSWSB1/v+aRt79tp49+K+UPHerST3ASOLyzB5ltvPSTy/KA9DxuPYjnPtXvvjrWYyZ3STZsVnK/38YIHPHHP/fVfLGqypfyy6qY9kiuTEf8Anq8eVUH2UuOPVsgc19blOCVNVK1lqrrTTRW8t/z7u9vzbP8AHc2IWHWvtXFaa3vGK66a/wBI9r/Zx8DWHirV/FXiHXdQtbDTfB2gi8eO54e6uL95RbCIf9Mm059/J/1iHPevovSNa8QeKNOvPDl/qx0jwst9dajezi4EK3tlbxwtaxpj7w2+cCCflEg9a574I+EksvhI8t/beRdajdzapdt/z0igObc/8AE0v/fXfivCv2pvi/aeGtIs/CXhIbdX1aykM8//ADyg/wBGR/f51kfH+71qssyfF8UcQ4fL8FrCjWh9da19yXJLZd4tPp+Z2YjNsJwTwti62N0qToVZYK715pXl8ryuv89j5W+P/jiy8c+OZNM0jjw14aa5tbCPz/P/AHrmFbyU/wBzzjaQcfxY/wBnjyy0X5RIo/dOVSPOf+WRw3X3Yf5xWTa2wUDHzhz58k56y3Eh3T57/IwXOOOfbB6GNNgT3B/Qf/XHp+df3hwzk2EyDK8HlWBTVDDU7rSz56j9tVf/AINnO19kf58cSZ5i+Isyx2b47Wvia7unquSklSp29acIvZa9C0h6/h/Wpk+8Px/karDqPqP51pRdPwX+VfTPf5L8kfLq+/az/FInjIA544H8qk3L6/z/AMKYgBzken9asxIfm2he2d273xjBrqp83JG1ra73vuzSPNZWtbzv3CJj820r2zu3e+MYFTbn9Y//AB//AAo2P6R/+P8A+NGx/SP/AMf/AMav3/7v4j9/+7+Ibn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjR7/938Q9/wDu/iG5/WP/AMf/AMKNz+sf/j/+FGx/SP8A8f8A8aNj+kf/AI//AI0e/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABo2P6R/+P8A+NHv/wB38Q9/+7+Ibn9Y/wDx/wDwqGVj8u4r3xt3e2c5FTbH9I//AB//ABqGVD8u4L3xt3e2c5NHv/3fxD3/AO7+JECD05pknb8f6U8ADoKZJ2/H+lVO/s1fz22+ImXPZ35babXv/VyBxxnsMk/5/Cs6Q5dse38hWi54x2Oc/wCfxrOkGHYD2/kKyp83JG1ra737sceayta3nfuM7D6n+QpKXsPqf5Ckrir39rK+/u7f4UdML8qvvrt6sji+4P8APYVJUcX3B/nsKkrmh/Fl6r8oFBUkZw659/5Go6kjGXUH3/ka9eHNyRtbbre5hPm5na1tN79kXwCUGB1OR9MVPEdoweP/ANZ9KgBIQY7HA+mOlTxDcOef/wBZ9Kwlze2d7dNr/wAqM/ev0+Lz35f8vxJSQOvFSxMfm2le2d273xjAqIgHqKliQ/NtC9s7t3vjGDXU+bpa3ncfv/3fxJtz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABpe/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABo2P6R/+P8A+NHv/wB38Q9/+7+Ibn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjR7/938Q9/wDu/iG5/WP/AMf/AMKNz+sf/j/+FGx/SP8A8f8A8aNj+kf/AI//AI0e/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABo2P6R/+P8A+NHv/wB38Q9/+7+Ibn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjR7/938Q9/wDu/iQysfl3Fe+Nu72znIqHcvr/AD/wqaVD8u4L3xt3e2c5NQ7F9P5/40e//d/EPf8A7v4kchBHHPB/lWXN97/PoK2MAA4HY/yqlJ1b6f0rlqX55X3029ES1J6aa69elkZj/dP4fzFZVz1H1b+YrYPU/U/zqndpvCe279dv+H/6q5Z/E/l+SOil/Dj8/wD0pnmXjS38/RbtQOingDuV/wDrH8/wPgvhxzDO8f8AzzbjBx1LZ+oyOx5PNfUOpWsT28ocfMUZE4OfmGD754HHXoM96+Yb62fSNcuoW5V5EkXg9MvnsB3GccfTpX5n4gYB18Kqi6/emklf8NPO5+m8AZh7DFOm9OXa+2uvz638uuh9Z/CbVU+0wxy8fNHgHrgbh+WccEdOAfT778HwR30GU/gaEn2DrLjp/ukk/Q96/LPwTqRjuojzgPAw6Z/jPI6/4E/Sv0e+F/iL/RoMy7AI4Qy9nyHAA5PA29vXvX8p8VZc6FX2u6bj16pR09U1t33ulr/VfC+J+tUeW6V1JfjZW+d/6TOA8TQ/YNQ1qRWm8xruUxpFxu8skvuHVuWAHuSK8Tl+LcWmaklncRTWjJMqyNMx/fjIAI542DOex3Y9TX2L4nstO1e7nmkjjTGDiTnzpDkoB/ukHPdg3pwfkL4jeGfD+v382lalaw2uqQhmtbyLH7pTsyT0IztTHXgY9BSyHC4bFylCp8cku+lrLyVrq+/m7l5rRxOHrxnTfuc6trvpG7ffrv8AfufRnhX4q+G5pYJYZYpLyOFCvm/w7gc7emMkc9DwMjHX3DQfiUJWjkaKJ1Z/naP/AJZj+Hdz3BJHpg1+ZWhfDnxHFIH0DUxqMkDLvTGHwuREE6cttk7Dtu4yK9PsvFvjDww8Vt4h0nVrJEZAl8f9Sdn+sx24zH3A56HNehiuGIS5nT+C91v21310s7du3b6rJpVKtOnOa95/E1tpLl/Kx+/fwg+IrrodjPoEEOo3VuUe6tZfvlBkqIxnqQsmfotdFrvxLv8AW9ZvrzTPDd3Ddxxxo0X8CybmDbPqUOa/JT4Z/Hq68PyWWoafewi8ae0S2aX780f7wT7sn+DdHk/9NOpwcfYOiftGXWom4WR/LYuzSyW3GXkHzF/90r8o9zXyuIyDkrTj2a894p/qfYxw7nFS1V15dNOp94HxBeTaTbyatpctpcy2cGfM/wCWmA+dv+5kZ/3hXPjVvJgZ7RPLmY5Ueu3+oz2Hc18mWvxdEWJodR895fMLrcj/AFe3GNnu247v91e1bvh/4w6RqFyttLe2qTGTFyv98n7n5Yf8/evMxOU8icVe6128lt63/Af1bzf4f5+aPpyx8V3ieYbyKV3VSitFn5PMznd/vYGD/sn6Vn/2/HGDAb26gmkMrwSf88c7d4/4H8vGf4a84v8AxJb3UBiSSJImUmJo/wDlpkDO7/d+XH1NcLdX8fESy+ZHiQy85xwNn5/Px7fSvIrYN06fLrp+rv8Aqvw0epnCt7Gs6e/Lb8Upa9NL+mmp9K2/i28tNNVEuJrp8yCSaU/ezjZt/M5PuKx7jWmkjN7ffPHhtkP/AD1kIG3/AL5OP++u9eLaJ4hktrF0iufIijYIq/8APXzNwP8A3xt/WtSXVPKtmaf/AJZAujf3vNGWPbptB/HrXmQjyVuS70ce/VX/AMrX7I9eE+eKl3/4ZFPxL4jmLs0sX+kN5nlR/wDPtGNgX/vvI/74r5x8R6x9pmlLS75I2O9efk39Pz2n6ba7zxPrkd1DIkX+tk37fw2/4j/9fFeE69dSJZmNf9bubzfXts/9m/l1zX0uW0HOSl3dl+SXfz6+h85nmI5IzXZLX1UXv6v1PJvGepSXl7La+Z5cDAmbGOcYKZz0Aw2OfpnFecJqWkWmqaDaapeW0emLq9pLctcngRRMC+zueD83UcqMkV0HiO4Mdw8c+cXBymP+mfX04+devXHccH5H+JerDUdYg0uMfuLb7Q1xnjr5PlkexKOc9gPwP6xwnw7/AG7iJ4Cz0UY9dnr+vl0PwniviT+x7Yt2/wBnand+ienpdL/h7H7IeMP2mPgt4Q8Fy/2RrWn3v2ewEFnpsX37i6WEBwvTlGK8f7QwK/Grxf4pu/HXijU/El15sQvpy1taS8pbRbnKmIjoJAw3cZIRe3XjbaJHwyfc+VVyf7ucngnoGA9/T02obfHPcfUYHYfgOcc49TX9CcEeG+B4QxDxmn1urbn6pvTl17Wtd7n4Nx/4qY7jLC4fCq/1WnaEemiajJ/+BJv57LZ6dnH5Y92KHHp1444zz16nv7bCfdH4/wAzVSKPYuf7wH6f/r/pVuH73+fQ1+qxk5VnJ9V2t9ldEflknd6dl99lf8bjhw6np1z+IOP1zWhCcAkng7SPyP8ATFRkkBcccf4VJF827dzjGPxz6V3e905bfM5583M7Wtpvfsibcvr/AD/wqaJj820r2zu3e+MYFQ7F9P5/41NEh+baF7Z3bvfGMGj3/wC7+JHv/wB38Sbc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4Ubn9Y/wDx/wDwo2P6R/8Aj/8AjRsf0j/8f/xo9/8Au/iHv/3fxDc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIVDKx+XcV7427vbOciptj+kf/j/APjUMqH5dwXvjbu9s5yaPf8A7v4h7/8Ad/EiBB6c0yTt+P8ASngAdBTJO34/0qp39mr+e23xEy57O/LbTa9/6uQOOM9hkn/P4VnSHLtj2/kK0XPGOxzn/P41nSDDsB7fyFZU+bkja1td792OPNZWtbzv3Gdh9T/IUlL2H1P8hSVxV7+1lff3dv8ACjphflV99dvVkcX3B/nsKkqOL7g/z2FSVzQ/iy9V+UCgqSM4dc+/8jUdSRjLqD7/AMjXrw5uSNrbdb3MJ83M7Wtpvfsi+ASgwOpyPpip4jtGDx/+s+lQAkIMdjgfTHSp4huHPP8A+s+lYS5vbO9um1/5UZ+9fp8Xnvy/5fiSkgdeKliY/NtK9s7t3vjGBURAPUVLEh+baF7Z3bvfGMGup83S1vO4/f8A7v4k25/WP/x//Cjc/rH/AOP/AOFGx/SP/wAf/wAaNj+kf/j/APjS9/8Au/iHv/3fxDc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4Ubn9Y/wDx/wDwo2P6R/8Aj/8AjRsf0j/8f/xo9/8Au/iHv/3fxDc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4VDKx+XcV7427vbOciptj+kf8A4/8A41DKh+XcF7427vbOcmj3/wC7+Ie//d/Epy/Nt284znt6Y649KhIYAk9AOeew/H2/SrmxfT+f+NQzDAAHAO4H36f40e//AHfxD3/7v4mXKcucdOP5Cq8v3D/nsasS8OQOnH8hTD9x/oP61xYq+t+3TbZnRC/Kr767erOYuRxuPQMQf+BH/wCt+teJfEHRJ1lGoQ8KGLOf++CMdeSd3oDgHoRXuV795Po//oK1zGrWMeo2s0DAkkHbjjsC2cjpkDPB+hr5/McH9awdZPrGVr9NWtPW19vTqerleLeExdCon9pXS3+LR3+/t96V/GPD2qmDUrRmxuwAx55C9+56En8Bkda+/vhv4j83R3BufI2W4+QAjzWIY8fTA465PTOK/Oi7tX0u+ktm+6X+XgdATnt6EdOQew4z9KfC3xX5BFp0G62XAB4/12PXn+ecZ4xX8zcaZN7KHI1a0nfo7Np2+6W5/U/BmcKrShUT3h0evu6d7309D7ObWXcQ7M4SKJmfn5sbiPfjnjBHtgV4J8WoGvo/7btCPtEc8SuenyDAbjHAOMHnjmvUS0txbCWOMOdoJ9uvA9yQeD074IFcner9rElpcW/yzKRxnaMDB9D39untivgcsj9SxWzTTj+UXvq7LRrofd1cT9ap8reuvd/a6bq3zOU+Cmv/AGfxHZvJKVtLi5KOp+5O8Z/ewvypAYsoHqSw4Br9adFg+HfxH0aFptC0+wvvLFh5EfLosI2zSye8u5CvXO1q/HCXw/qmgal9usbeXZ5gdDF3CnkN1PR8KP4ecZwN30h4J+LsmmQJDqIu7cOIlmk+0GDb5W8Dn+PG8gYPHXgk4+txGO9rHm2TSXpZJd91ptZbban6HwTmuFwtCOAqr36and2X25OomtO0kvyPtHW/2I/AutxG+02/+wGe5i8j7NP5OZZd/m7+m4rhAv8AdLE9TivPV/ZH8d+E7q/tdA8XXckESzT+Xn7btCY8vHTys+Y3PO/B/u1P4a+MVmzRvYeJpZHXy5EhkvvubdxKj69+2AK9htvjbqlzaTzR3EVxJKiW7NJP5/Tdtx/d3YOf72B6V5yeFneVVLnb10fSyXTsj7ypi8C6d9LP9df+A7/8A+ZPE/wQ+OHhyJb6DVCY4Y4rmSe508bEF5u24k4Ee7yTuORnaOuKxbSH4naKjve6VBqxCxubnSdTAmJG8/6Rbc8n/lkvPSXjHFfUPjH4veJ/FkCWb3EUFrDa29nKsX/LURBguev3fm/Fj+HmSWuo3sv2e2iDvlCsnPBfOSR7kD/OKzr08DCHtrLW/Ttb17f0z57F1KFS8sP/ABHv3vaKXlslv1scxo3xL+KRdIo/CPiV7e1GFkubbyNPhEnDefJn99u8sbDzsCtjG/NfRXhbVptfsYL3WUks7mzEhljPFvun25EH08n94fdKn0LQLxLCKG+lldyFysf3EABz5v8AvZ+X6N7V01pb29v5kEMcMmCglEX31++E83n/AHscdmFfD5xOnUlUnS+B25dL7Kmnta2qf5s8an7T2t6vx+7f7tPwtfzN7RLjevnJJ5kKN5cf+z5hO7/0Fe3bpWpqd4mm2swf5ztDpCP+Wu7JP028df73FZcyWlnY/aI49jgqSPU9vy568c155rOqPfTgN0UEL9GC5+v3R+tfLYTAOtiHV6yafn7vu6brp/w56lbEcmFjHqr/AC137ff06mJq99JqUoRpPJEhk2Qf888bCf8AvrI/KvJ/Et1HYxyRSyb0hV89Tt3bcfnt6D0xXoWofuIzJ2w36YP9ef8A9VfPfi7UrjU5GsIfNwXcSeV1P3du4enXH4+or7jLsrbnHW2z7W662dm7P02PiM3xX7l/P9P679tDybxXfLa2uo6rcf8AHraxvcW/GMSIG5ySP7wB7cV8irdzX9zd6jP9++lacf8AXN93l89eRknOCD65r2j403NxDYWOiJ5wikuS915nGTGYfKwDz0Z93Hpz0rxq1BA2jOzzGVe/3QoPJHXp6dM4wRX9NeFmRqhTljn9rmtdLXlny7+dtFq7de/8m+Kucyq1ll6b92UF5e9GEvwbNa1j38dSoXPHrnj29h+WK3bZNn4lf0J/x/8A11j2+cn0JX+ZH58c10UX3B/nsK/Y4Sc1fd8zXzTt/wABH45KPI+VLRKL++Kf6lpPuj/Pc1Yh+9/n0NV4fvf59DWiOg+g/lXRH4V/XU4quk5P5f8Akq/zJ8gAZ44H8qNy+v8AP/CmIAc5Hp/WrMSH5toXtndu98Ywa7afNyR2673vu/69ATlZW5bfPpoETH5tpXtndu98YwKm3P6x/wDj/wDhRsf0j/8AH/8AGjY/pH/4/wD41fv/AN38R+//AHfxDc/rH/4//hRuf1j/APH/APCjY/pH/wCP/wCNGx/SP/x//Gj3/wC7+Ie//d/ENz+sf/j/APhRuf1j/wDH/wDCjY/pH/4//jRsf0j/APH/APGj3/7v4h7/APd/ENz+sf8A4/8A4Ubn9Y//AB//AAo2P6R/+P8A+NGx/SP/AMf/AMaPf/u/iHv/AN38Q3P6x/8Aj/8AhRuf1j/8f/wo2P6R/wDj/wDjRsf0j/8AH/8AGj3/AO7+Ie//AHfxDc/rH/4//hRuf1j/APH/APCjY/pH/wCP/wCNGx/SP/x//Gj3/wC7+Ie//d/ENz+sf/j/APhUMrH5dxXvjbu9s5yKm2P6R/8Aj/8AjUMqH5dwXvjbu9s5yaPf/u/iHv8A938SIEHpzTJO34/0p4AHQUyTt+P9Kqd/Zq/ntt8RMuezvy202vf+rkDjjPYZJ/z+FZ0hy7Y9v5CtFzxjsc5/z+NZ0gw7Ae38hWVPm5I2tbXe/djjzWVrW879xnYfU/yFJS9h9T/IUlcVe/tZX393b/CjphflV99dvVkcX3B/nsKkqOL7g/z2FSVzQ/iy9V+UCgqSM4dc+/8AI1HUkYy6g+/8jXrw5uSNrbdb3MJ83M7Wtpvfsi+ASgwOpyPpip4jtGDx/wDrPpUAJCDHY4H0x0qeIbhzz/8ArPpWEub2zvbptf8AlRn71+nxee/L/l+JKSB14qWJj820r2zu3e+MYFREA9RUsSH5toXtndu98Ywa6nzdLW87j9/+7+JNuf1j/wDH/wDCjc/rH/4//hRsf0j/APH/APGjY/pH/wCP/wCNL3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4Ubn9Y/wDx/wDwo2P6R/8Aj/8AjRsf0j/8f/xo9/8Au/iHv/3fxDc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4Ubn9Y/wDx/wDwo2P6R/8Aj/8AjRsf0j/8f/xo9/8Au/iHv/3fxDc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFQysfl3Fe+Nu72znIqbY/pH/4//jUMqH5dwXvjbu9s5yaPf/u/iHv/AN38SHcvr/P/AAqGbkAjkDcT7dP8Km2L6fz/AMaRlAViByASOvpR7/8Ad/EPf/u/iZoOWlI6YX/0E1Tk6N9f61oN0Y9yOT+GKp9n+o/nWVe/s3fez2+R0Qvyq++u3qzFueo+rfzFc/ONxQeu7r9Bx/SukvOqfV/5rXOy9Pwb+VeTLeXrH8mdEPhXz/M8x8X6fm0llP8AyzfJJJ/ixzwT6c9eD2JzWL4P182moxQnA/1YPXkAtx1x3zjA6Z613OvJ5tlcx/3g3B78/wD1+v8A+uvGbZJLaadkwBAQSDkk7i3Hf/HB9c4/LuPsvVaCqWXvcuyt9mN+lvL7vRfrHh/mDoz9ndvlu9b/AGpX+V3bXsfpT4K1KO70RHkP3EwDgDAYMD0PbYPpn8K6mw0eK4QSR/8ALZmz9ByB+p47455r5g+D/jKSSC1sJZPLiLxq3BOcFx6ZJHTJAxnr2r68068KzIfM32zCMkdh1HBHPPBHsAa/nXNsNisLXqzp3UVyWvp9mPay/q+y1/o3JMThcVTpwq/G207aaqdlp6Pr1b6Gvpnw8N+SPI+0b9nXomd3bA5Yde/ymvQLH9n2S/QILPZFLjzB0z1K49MZbofyzXYeGrmaaC3S0/1g2PB/1zTJn7+mz9K+vvA1/pNxBay3oiFvAEkmaT+GSDIbb+Lc/hXylbM8aqko2ejj17JW6eWq+8+/weWwfK6Xwbq3l+rf5W9Pge9/ZUvyzyWcV1G0JDQtbDuepft/D8uRx83Tin2HwL8T6U0atqt+hGN8cvomNu3gcDcc9eor9YY00dP9JtrmOeymC3AWI/6rzc8N2+bbx/umobvTtP1OMsv+rAbZyf4sbvbsPrWf9t42Hu2281fo93qe7HCOEVDV2XVX8+z+Wp+b2j/Dm/F15d5cSmEKPN8wcPjP3fpzn6g8V6vpWm6bosCQRRRIzCTa0nVym3JHrjfzz0Ir2fWvC0EdxILf/lqW3+nyY2/+hn+Y7iuIudJjRhFL92Mnk/7WM/j8o/z1f9tTr/uqnxdb2622totNtPUf1by/D/7UxbSafyyJvK2Fj5Xl9cfxZ/NcfjirqQxhvMY4IGUH4f8A6sVuLY2kFrutfvEfvc+3Cfzf9PrWLqE+IkXrjfx/3x9P8/pEIfWazh3t6bLbz/UyrVfYw9nbWP62fqvP00MLVdQkcNG33VBCH8gcgfQc4rmVXzEc+VvJ53f3OvPrzj9K02T7RI7n/lif/Qyfw/g+vWsrU9QkWMQRSywlklXzIv4fu4BHOc9ua93AZTy1UtdLfir9t9bej9DxMRivdf8AVvP5aL7ttTzLxVqb7JLKKWV5fmCpF/BnaDuHP3sccY4POK4FtLe2tIp5Uka5u5kRVe38+YyckLB/dJ3YfPJyg4xivqb4J/s1eP8A45+MbLQ/C+j3N4817BPqGryW3n29jYMZBLdzSf8ALAoFLIf4yrf3OP6Gv2b/APgmz8H/AIH21v4m8W6d/wALN+IMHmXkOt6s3220sopgDDFpEfP2byGDC7HSTZa/886/Rsl4b9tUhUenNbbbSy/Ren5fE53muFwkJqpfnrWjJJ7KyivTp0v5n8rXi39ib4oeMfgZ42+PmseHdW0DRPDAifRb3U4fIh1xV+0teG0I+8LL7PaGbHT7ZDxzX5k28hkjt5GiMcrRKZGP8ZBcLnuMbScdMNx7f6Cv7WfgiHxb8IfHXh4JGlo/he8VFig8hEP2G6MMK8/P5Wwj/Zz6mv8AP+1TTm0rWNV0qQfvtL1PULFh1/d297dCLAwMDDsR/XrX9AcJ4f6lQjh9lTUvJe87+nU/l3xIw0J1YYyn8M5xlFrS+kVt+i8i3ZHlvoP/AGeuiH3E+h/pXO2XDP8ARP1VjXRD7ifQ/wBK+yofEvT8f87/AIn5lN3lfyivuil+g+I4cenf8Qcfyq8AxAIzg4I5+mO/0qjEMuOOO/5HHNakIyCCOBtA/I/0xXpa/Z5bfPt5f1Y5J83M7cvTvfZb/wBbBF8u7dxnGO/TPpmrkTH5tpXtndu98YwKrMAHQY4O7PvgcVbj3tnG04x97PfPTb/Wj3/7v4k+/wD3fxJNz+sf/j/+FG5/WP8A8f8A8KNj+kf/AI//AI0bH9I//H/8aPf/ALv4h7/938Q3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aPf/u/iHv8A938Q3P6x/wDj/wDhRuf1j/8AH/8ACjY/pH/4/wD40bH9I/8Ax/8Axo9/+7+Ie/8A3fxDc/rH/wCP/wCFG5/WP/x//CjY/pH/AOP/AONGx/SP/wAf/wAaPf8A7v4h7/8Ad/ENz+sf/j/+FG5/WP8A8f8A8KNj+kf/AI//AI0bH9I//H/8aPf/ALv4h7/938Q3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aPf/u/iHv8A938Q3P6x/wDj/wDhUMrH5dxXvjbu9s5yKm2P6R/+P/41DKh+XcF7427vbOcmj3/7v4h7/wDd/EiBB6c0yTt+P9KeAB0FMk7fj/Sqnf2av57bfETLns78ttNr3/q5A44z2GSf8/hWdIcu2Pb+QrRc8Y7HOf8AP41nSDDsB7fyFZU+bkja1td792OPNZWtbzv3Gdh9T/IUlL2H1P8AIUlcVe/tZX393b/CjphflV99dvVkcX3B/nsKkqOL7g/z2FSVzQ/iy9V+UCgqSM4dc+/8jUdSRjLqD7/yNevDm5I2tt1vcwnzczta2m9+yL4BKDA6nI+mKniO0YPH/wCs+lQAkIMdjgfTHSp4huHPP/6z6VhLm9s726bX/lRn71+nxee/L/l+JKSB14qWJj820r2zu3e+MYFREA9RUsSH5toXtndu98Ywa6nzdLW87j9/+7+JNuf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40vf8A7v4h7/8Ad/ENz+sf/j/+FG5/WP8A8f8A8KNj+kf/AI//AI0bH9I//H/8aPf/ALv4h7/938Q3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aPf/u/iHv8A938Q3P6x/wDj/wDhRuf1j/8AH/8ACjY/pH/4/wD40bH9I/8Ax/8Axo9/+7+Ie/8A3fxDc/rH/wCP/wCFG5/WP/x//CjY/pH/AOP/AONGx/SP/wAf/wAaPf8A7v4h7/8Ad/ENz+sf/j/+FG5/WP8A8f8A8KNj+kf/AI//AI0bH9I//H/8aPf/ALv4h7/938Q3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aPf/u/iHv8A938Q3P6x/wDj/wDhRuf1j/8AH/8ACjY/pH/4/wD40bH9I/8Ax/8Axo9/+7+Ie/8A3fxDc/rH/wCP/wCFQysfl3Fe+Nu72znIolQ/LuC98bd3tnOTUOxfT+f+NHv/AN38Q9/+7+Ibl9f5/wCFQzcgEcgbifbp/hRKNu3bxnOe/pjrn1qEliCD0I547H8Pf9aPf/u/iHv/AN38SAHLSkdML/6CapydG+v9allGHIA44/kKry/cP+exrGvf2bva9ne3yOiF+VX3129WZlz1H1b+YrDuOp+h/kKuz/eH/bT+VZc8nl5PfoO3Yf5/M9q8usvc07r5avc1pfG/Vf8Atpz+pH9xN7bzjH1/qa8VkB+2SKByzfqGb/CvXtSS5msbu6iyYbUAXHPaUOYz1BP+rkB+mMZ5rxxY/PuvPB+SR8If90gEnPqWXj688V+YcW4y9sN/Jbs90n+vrZH6lwXg2p/WWn7yT1TT0sreTVvXvdbd14buX0e+gvEkKLvXzP8AaCZPA4xgMcEZ/wAfsjw94ujurO0uVm8xlMIcHp8w79OoDZz90g454r460yA5i/d7sbRu7x85544z7/3eM849u8KyS2tzCI5N/mKoPUeVt4AA6HeWPOf4OpXAr8uzPLPrcZJ7tLd9eWN1v0f4fI/aspq+z5KvV33+1aSX36PXq9NdD9CfAevpPPGrfemii2Ec/d8zj64Ye1e+6RrNxabgB8uMj8Mn09/096+DPCeqXGkSW9/9tMm1whGPu729Pf1HPymvqix8TyXGnQpJF9q85QwbP+p6ZHH9/jv/AAHrXw2K4WtzJPW/S99bP7+i81Y/TcozzlVNa9tX56dvL9ep9NeGvFsjgCfiFYLgSHz/ACcZ8vHpu6H12465Y16knjaC006I2s321pI4US28/wA7bksDJ/s7Mg/7X/Aa+NNG1yOCZIn805Iwsf8ADgnOc+uRj6Hr0r2bRtSt2WSbzJYwgi/1vGciT7v5c9eor52rw/i4VJRp25Fa2/ZX/H/I+wjm/OlK8XdW13007/1oerXmvRysltM/nSyqHacfxbgCI+P+eX/s3as+SeOFHKRBxEjXDt/FH5QGNv13k/gD6VxkV9aC7N09xltrbF/vdM+nTjp09qil1SS5jfyLbfKzMsS/89fU/wDAeP8AvrrRR4anUqXqL942rvzsktfT9Sa2aXhp6aefVf11JbqewitWn8y7d7lpLgrccKhcj/U/X+P6LwDXHya384RYy42yBPb7vTP+ePxrSstE1nUrwwRJLd3052Q6dbD/AEuMngiDr9/I3+mxa+vfg9+w/wCPPHk9nea5Zy6RprujusmP7VaOUsSF+gQZ/wB4V9flXD7g4RtqrpPydrf5Xtbb1PDxOY1Kadaq/wBxLbXXZX/r9T4v0TR9b8U3sNjY6Xd6hK0j+TZWVv59xNKxUR7P7oUrz67vQV+kf7On/BNvxt8Ub7T9c+JZm8PaBmK7k0sweRdXUERdhDqH975SBD3G+b1r9Z/2d/2M/A3w6gtLq30WJ7sLAJ726gM11cOnmbTP/c2b22YOWLt6ZH6F6R4bstGt1tYkiiRcHbFb+Tx6tjG4dcDHA3ZznNfoOW8O4aE416ifO7X0bWmia+VrvTQ+Cz3jvDYOM8NhfjmuVesoxe9/60Pnz4L/ALO/gL4PeH7XQfCnh6HTIURZVWMfMzAMPOk95CSVH+9Xq9zpsccZdCfMJlDr/d27Nvr1GQDyCMcZwT6S8UTR7Ys/LkN3HP3eRx2Ofp1x15XVYMwSL3Y9Rk45x/8AW6f419tg6dOly06a9xaR078v3K/Y/MK+YVcRUlVrXc6lpPXbs9n09T46+Llut1pd/YyR+dHeCaz8ntJJcwyLF+RB/P2r/P2/af8ACF14E/aF+LHhu7j8mSDxbqV6sH/POO9eV0P/AALyvXjb61/ojeONH3tO5+6FOT9VP9Af6V/Br/wUxggg/bD+I4h6n7IJPqDc7f5tX1eW/HH/AA/qfD8ZSc8DCWqu29eycfzsfDlt1P1X+Zro4vuD/PYVzNtJs/EL+mf15+v1rftJN6t7bf13fzx9DX1yei9I/gkfk8neT9fy0NGH73+fQ1f7p9D/ACrOj7/h/WrkH8f/AAH+tbR+Ff11OKq/fl/W8Ui9kADPHA/lU0TH5tpXtndu98YwKrIAc5Hp/Wn7F9P5/wCNdtPm5I7dd733f9egJysrctvn00Lm5/WP/wAf/wAKNz+sf/j/APhUMSH5toXtndu98Ywam2P6R/8Aj/8AjV+//d/Efv8A938Q3P6x/wDj/wDhRuf1j/8AH/8ACjY/pH/4/wD40bH9I/8Ax/8Axo9/+7+Ie/8A3fxDc/rH/wCP/wCFG5/WP/x//CjY/pH/AOP/AONGx/SP/wAf/wAaPf8A7v4h7/8Ad/ENz+sf/j/+FG5/WP8A8f8A8KNj+kf/AI//AI0bH9I//H/8aPf/ALv4h7/938Q3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aPf/u/iHv8A938Q3P6x/wDj/wDhRuf1j/8AH/8ACjY/pH/4/wD40bH9I/8Ax/8Axo9/+7+Ie/8A3fxDc/rH/wCP/wCFQysfl3Fe+Nu72znIqbY/pH/4/wD41DKh+XcF7427vbOcmj3/AO7+Ie//AHfxIgQenNMk7fj/AEp4AHQUyTt+P9Kqd/Zq/ntt8RMuezvy202vf+rkDjjPYZJ/z+FZ0hy7Y9v5CtFzxjsc5/z+NZ0gw7Ae38hWVPm5I2tbXe/djjzWVrW879xnYfU/yFJS9h9T/IUlcVe/tZX393b/AAo6YX5VffXb1ZHF9wf57CpKji+4P89hUlc0P4svVflAoKkjOHXPv/I1HUkYy6g+/wDI168Obkja23W9zCfNzO1rab37IvgEoMDqcj6YqeI7Rg8f/rPpUAJCDHY4H0x0qeIbhzz/APrPpWEub2zvbptf+VGfvX6fF578v+X4kpIHXipYmPzbSvbO7d74xgVEQD1FSxIfm2he2d273xjBrqfN0tbzuP3/AO7+JNuf1j/8f/wo3P6x/wDj/wDhRsf0j/8AH/8AGjY/pH/4/wD40vf/ALv4h7/938Q3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aPf/u/iHv8A938Q3P6x/wDj/wDhRuf1j/8AH/8ACjY/pH/4/wD40bH9I/8Ax/8Axo9/+7+Ie/8A3fxDc/rH/wCP/wCFG5/WP/x//CjY/pH/AOP/AONGx/SP/wAf/wAaPf8A7v4h7/8Ad/ENz+sf/j/+FG5/WP8A8f8A8KNj+kf/AI//AI0bH9I//H/8aPf/ALv4h7/938Q3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aPf/u/iHv8A938Q3P6x/wDj/wDhRuf1j/8AH/8ACjY/pH/4/wD41DKh+XcF7427vbOcmj3/AO7+Ie//AHfxCVj8u4r3xt3e2c5FQ7l9f5/4UbF9P5/40bF9P5/40e//AHfxD3/7v4huX1/n/hUMvzbdvOM5/HHrRL8u3bxnOfwx61WebZjOTnPQDtj6etHv/wB38Q9/+7+JMGManIxn+nv+NVGfex9v6/8A6qVpPMA68E9QB1x6VBJ2/H+lctS/PK++m3ojohflV99dvVhJ2/H+lULuTYq++79Nv+NF3JsVffd+m3+WfoKxZLjOe/4/Xn6+/X2rln8T/roiiC7n5HfGePqVx16Z9cE+3NZcUd1qmo6foenxl9T1y8i02xPGPtFw6gZz14PT2xT7mfBGJdjEkFP76AEuPwHYZ5OMc192f8E9PgbL8UPHY+IGo6d9o07RzdjRpeRsey8w6geScA/6H/3yOMcnyM1x/wDZuFr1N/bR5befKo7a6q33Nad/d4fymrm2Y0IVP93pTTVuuqbv00d1rufO3xj8AJ4D8K2/hkx+Xc2sEbagB0N/Ikb3H5YUH65+nx1caWLfE/I+VT8vI4zx0z0644HXjNfq1+19p1vB4x8boieV5FtAVQHp5nnr394gPw9jj87JtMlls1kk/wBS1vESemMb8emOvsfWvxitVeIqTqtu85PVva70V/kj+iaOAo0KUKVKNoQhFKyW/Kr9L3Tbsr6dt0ZWiWn2qGNxkYPUAk4Yn6ddpA9wCB6+qaHZS286PHyMrvUchgC3PrwSwwQRyMZHFeU6FY3UV+sdhBf3c1xIi21lpsKz3VywYhgn9zaWUHA53gjha+9PhX+yb8ePiCbeez8MXWgWF2sJN5q1kftojYOVYd8gZLdhleMV42Npum5V7t81vwSXbo1tdJtPyt9JlNJz9nQ0SV1qtVzSu7emj266+VDwve2c4aGW1MCJARJJ/A+cffP+zg+o+bjvj3fTdOgEMJtb3T3SW3tyixgbk2+YcSDg5O4bOf4W4z1+ofAf/BPK6sLW3j8TavqOqXsxRnEUAgiiZM71YDG8PvXHHGw+tfU2gfsOaHZLbra6cN0YXzWMHnO393f/AHejY9efSvJWMur/AOa28lofc4TBez5YK3u2d/Wz9Hv+OvU/ObTdD1Ri/lyxSI/l8R8EAb+v1zxxxj1r1zw94K1y+VIokupC2wbbbvndw/67T67hX6O6F+yFp63KRvp8Xkgxeb5lie27bt/8ez7Yr7H8Bfs2aJpiW6w6fFiJF2+VD5HODnP971HTbyO9HtlX/dtLtf8AH1t/SPQr0sNRh7So/f3e3ZW28kui6H5R+Bv2d/Fmr3Hz6VdRrIItslz3Db+U9cYG7r1Wvsr4f/sSX9+0A1q6u4LaYg/Z7f7swGd4mP8AsblCf77Zr9QfB/wnjh+zxxWflhcj69P5dO3B9Oa+qfBPwvt4fJkuLf7vKfj17HHGPftxnjqwWVt17tPWz8un47W8mj53HcS4fAUnHDu9SL9dN1/wOm2x8T/CL9kHwp4ejg+xaDCk0IiAuJYPPeYvv5P93bg9ud3tX6A+CPhLpegWsMMlvF5qlX2x2/kbeSPnP8WTwMdMN616xouj2VlEiRxeWA+1uvO3oR78n1HTg4FdExhDYQdMkn+R9T0OPr65x9Zh8v8AYSVT8k+iXyvp5ta76H5vm3FeOxvtLppystHpblS2v20+7ro821s4bNTFFGFXCduSFBx+Qbjk9ecZwJZQ3y7AnfOQfbpj8c1YIHBByec8euKciF847Y/XPuPSvbi1yp7eunl19EfJ8860XOr8cnq35Oy/IzzGzglgox3UdCfXPuP6ZGRWZc2PnEx+zc/UD9f1Hv36hYT82Twdo7Z/iPHX9az9Un/s+2aRY/MklV442PWMHAY9O+R0z05qIfx0k7+8mrdL26/13FS/iNLXVK6/7c6f107HzJ8QYZxb39pD9/7PcGPnP+kjyxCfxHmfXpX8Zn/BYX9l/wAY+GfijJ8dNK067u/C+tQW9hr91a/dstQQwhfO5/5bGeYp/wBcX/H+17VYtL09rq51S5PnzgvHF09d44z/AHk6cHHOcGvmH4gfDvwx8RbHUtH1fQbPXNC1dHt9R068z5V1HICqn2MYL9/4hz0r6XLcRyTjHtbTt59H93Xrua5vl/8AaGAjQfWNrfh8unz+TP8AOR3fP5RKs0JK78/OVx8of/dwdv1PpV+3byyP9rHbp+XJ6/078f0N/tvf8EY9V0N9c+Iv7O/nS28ctxqV18OX/wBWYvlmL6EOR+7Hnm94/itO9fz36vpWseHNTvdF1qxm0zUdPvbm1u9PuP8AX29zCUWeOTHQBgAhwuMN619fCXPFSv8AEuvk/wBbdfn5/jmYZJissnUhD4YWs+91GVr+vbb0RrRSb1HsB+v/AOqrUP3v8+hrAtrnP1+XI9Ov4epyPxFbcMm8H2x/WuzD6SV+z/M8G85a1Pj6/LRfgkaRBIXHYf4VJF8u7dxnGPwz6Vn+Z5bKcZyfTn0GO2fmOAevTg1aDlgMfXIHXPr/AC6D35r0/e6ctvn+hzz5uZ25bab3vsi5uX1/n/hU0TH5tpXtndu98YwKpxfNu3c4xjt1z6YqbYvp/P8Axo9/+7+JPv8A938S5uf1j/8AH/8ACjc/rH/4/wD4VDEh+baF7Z3bvfGMGptj+kf/AI//AI0e/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABo2P6R/+P8A+NHv/wB38Q9/+7+Ibn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjR7/938Q9/wDu/iG5/WP/AMf/AMKNz+sf/j/+FGx/SP8A8f8A8aNj+kf/AI//AI0e/wD3fxD3/wC7+Ibn9Y//AB//AAqGVj8u4r3xt3e2c5FTbH9I/wDx/wDxqGVD8u4L3xt3e2c5NHv/AN38Q9/+7+JECD05pknb8f6U8ADoKZJ2/H+lVO/s1fz22+ImXPZ35babXv8A1cgccZ7DJP8An8KzpDl2x7fyFaLnjHY5z/n8azpBh2A9v5CsqfNyRta2u9+7HHmsrWt537jOw+p/kKSl7D6n+QpK4q9/ayvv7u3+FHTC/Kr767erI4vuD/PYVJUcX3B/nsKkrmh/Fl6r8oFBUkZw659/5Go6kjGXUH3/AJGvXhzckbW263uYT5uZ2tbTe/ZF8AlBgdTkfTFTxHaMHj/9Z9KgBIQY7HA+mOlTxDcOef8A9Z9Kwlze2d7dNr/yoz96/T4vPfl/y/ElJA68VLEx+baV7Z3bvfGMCoiAeoqWJD820L2zu3e+MYNdT5ulredx+/8A3fxJtz+sf/j/APhRuf1j/wDH/wDCjY/pH/4//jRsf0j/APH/APGl7/8Ad/EPf/u/iG5/WP8A8f8A8KNz+sf/AI//AIUbH9I//H/8aNj+kf8A4/8A40e//d/EPf8A7v4huf1j/wDH/wDCjc/rH/4//hRsf0j/APH/APGjY/pH/wCP/wCNHv8A938Q9/8Au/iG5/WP/wAf/wAKNz+sf/j/APhRsf0j/wDH/wDGjY/pH/4//jR7/wDd/EPf/u/iG5/WP/x//Cjc/rH/AOP/AOFGx/SP/wAf/wAaNj+kf/j/APjR7/8Ad/EPf/u/iG5/WP8A8f8A8KhlY/LuK98bd3tnORRKh+XcF7427vbOcmodi+n8/wDGj3/7v4h7/wDd/ENy+v8AP/Cjcvr/AD/wo2L6fz/xqGUbdu3jOc9/THXPrR7/APd/EPf/ALv4j3IOMc9f6VBI+zHHXP6Y9x600yFQM85J7egH09ahkffjjpn9ce59K5al+eV99NvRGbvdt2v2+7/P8GEk/Tj17fT3qvI+/HHTP649z6USdvx/pULSbB9alV3Bctnp6ep1Uvgj8/zY6ql3JsVffd+m3/Gq8k/X/Prz9Pfp7VmyT9f/AK/vz9ffr7VhUlzycrb2/BJGl9bde3USacnOPr1PHB5+v1/LnjMknX5hxx17Y/EYH4Dvx1plxdIhBzKZfm8uKL/loR1DegBKgY7sevNdNofgHx34nZX0nw9IQkbTwzy5/dXC4EV6o5x9lg+15wf+Wo+lcGJq+xXOmtdb32atr8t+vT5ejhMHisUoxpr3W9H5N9Om9/LfZpnM6Ro2q+M/Evh7wXokU8+oeJ9YtdLijtrUzzSxSyKs8Ql6QCQOoJ/j2jsma/qd+BehfBL9jL4U6HpvxW8V+CPAt9qyWugWtrq2of8AE4hv9Tj2yKI8/u2u3lgBHcovpz+af7M/7Nmrfs5+Cbv9oLxFaQ618V9Y0y+j+FGj3wA0rwnpTI/meMLn/p5uZ7iF7Lr81jN1r8a/2g/F3iXx18Ttc1zxX4n1DxL4knuZI9V1e/6XGp+cJP8ARev+jLs2oeuxBjHQ/EZzinjJRir2bS6tK3Km7WfbXS/5H67wll1DIcPHG4m3tqyfN8pcq/8AJUr731P1Z/bl0B4vG3jD7E6XWna7psbaFexT+db30CTQvHPCf4QFu4yf728ema2/2VP+Cd2pfHeM3mseIbuC2sV0+TWYbGDzri2h1KKY2kK5+79qWyuQRyT5XHINcF4J+KPgn9ov4BeHPCt14m0TSfip8KbaxuhYa5P5EGveGdKvLI65p9v3a5ZLTT/KPG1pFPU1/R3/AMEbfDmj+NPgd8SvGSwzSDWPi1rsFq11P508NjptjZR21kP7ttaGaX7NwMrM/Py15U8svK65dVH/ANJR9fgswhXr16tP4J6xd+0Yx/TX57M4j4Cf8E4vhN8MI7aXTvCOnLcxGO2mutSsf+JhcyS+ZtmccfMxDEfXFffOifATSrKERQaWkcUO2FFigMKAR54H9773X+H8eftHTPBNvGoAtxt3/KPx565x2xnueO9dzbeFbeFVzb8NjjnJ288dfXnp6Z71w4nBYWMZRqazVr280mtlrp/wbHoUc59jBU1b3W7bX1bf4Hxba/CGzjG2Oz2dM+pPOPy579DzXQ2fwks2SSN4/L3+Xt98bs/gMj86+w/7At49n7vy8np64x+oye/Ofzux6JBx79uenPv6cc544rzFk2Dqp1NuZ6LXZadn2fbzszX/AFmxcPdpuXIttO9r6373R8r6b8K7O2AVI/M27SfYfN+XfnpkZr0bR/h3bmePMYj8tfY53YwPphevvXvFvo9umR0zj1465/oM9ceta0enRx4aPqPvf0/+t/KtqOS4KjU9pve336LbTt6X9bnLieJMbXXs3fRrfbW2+/3focn4d8JW1kiNnkOMd+nfv2Jx/iM16TaRxRZSMHIK78/Vsf1zmorb7rj02AfiT/h0+tXF+6P8969dRpwjFU0lG6S7731PAxFWpW9+o/elZtXuutvwS+VjQT7o/wA9zSOgfGcjGenvj1B9KpR/6z/gSVoVlUT9pdPXf7kl+J53V/4pf+lMjESr0Lc/T/Cpo4i2dp6Yzn8fQUm+ONWaaTZHxuXn58dPbg8DP97is251IN8ltGEiBO1j/EeOo7kDvwfm5751gvdV9fyev/A++/cpXa30/wCCv61a/M1XKW0bzTyhI1+8Bn58g+3b8eucHFcVqgk1eKf7B+48pHeMf89sAe38AQHr1cYrQWC4unKc4bG7IxkZ4444HYL37E1V1y4j0awKxf6+4ItcY/57emcEDK49R7ZxW9DSo7d1bTyh3v8A15mUansKsqm6vF+WkY+T/PS77njaafPemd7qIxyo5Qn+/jPfjpgH/gXTtVO70qW3t52Tvjd/wHdjPfv+HpXol5bvLDB5YkF5AjRgxcDyxs8zJ6cgjGff6VztydNjR2QzblBRhLjiST74XpnoM9AOPpXq0vj69PX4X+J6izD28fZrql0sto9uv9dzwzV7GS/gntXijaV1dLeWWDztkz4IiH90zhWB9dg9K/nD/wCCs37Ac/i15fjp8HtBxr1nG8PjHRrGDybu/jtPsrXNzFn73kjz2bnjzgO9f0w3NvHbXdwj/dZg6/8AAsk/0/TpXH6zpdnrEN3YSW0dwZ4JEi+0wedaB2XHlzf3fOBIX+9tb0r28NiORqPb19fT06aa9Dy82wyxlB4bqlvbvZ9uz9Ln+bpKlxYXFxZ30Mtvd29xLDJDc4N3CiECOKcY/gYSeX3wH5JGK1bJ9ytzkDb+u7p7Hr6d/Wv2/wD+Cvf7Ecfwz1kfHf4faJNb6HrN6tt4ns9Og8myttSD2370cfMLkz3Xrjyj/eOfwphmRWbZGIwbmZCv8YZRFkvjP9/r6e3NfRUZudKLT3u/S21r6qy036W02PyHNMoll1aot1FrWzt70Yve/wDe7eR1EZ+97Yz+tTK+xh7/ANP/ANdZ0D71z7DI9Cc/Xg9v/wBdW4+/4f1rqWiS/r+ux48XdX9fzNAsZAMc4z+v/wCqpIvl3buM4x+GfSs/zDGy8ZyfT8OO2fm6Hr04NWg5YDH1yB1z6/y6D35rspuXIrW673vu/wCvQwnzczty203vfZFzcvr/AD/wqaJj820r2zu3e+MYFU4vm3bucYx2659MVciQ/NtC9s7t3vjGDV+//d/En3/7v4k25/WP/wAf/wAKNz+sf/j/APhRsf0j/wDH/wDGjY/pH/4//jR7/wDd/EPf/u/iG5/WP/x//Cjc/rH/AOP/AOFGx/SP/wAf/wAaNj+kf/j/APjR7/8Ad/EPf/u/iG5/WP8A8f8A8KNz+sf/AI//AIUbH9I//H/8aNj+kf8A4/8A40e//d/EPf8A7v4huf1j/wDH/wDCjc/rH/4//hRsf0j/APH/APGjY/pH/wCP/wCNHv8A938Q9/8Au/iG5/WP/wAf/wAKhlY/LuK98bd3tnORU2x/SP8A8f8A8ahlQ/LuC98bd3tnOTR7/wDd/EPf/u/iRAg9OaZJ2/H+lPAA6CmSdvx/pVTv7NX89tviJlz2d+W2m17/ANXIHHGewyT/AJ/Cs6Q5dse38hWi54x2Oc/5/Gs6QYdgPb+QrKnzckbWtrvfuxx5rK1red+4zsPqf5Ckpew+p/kKSuKvf2sr7+7t/hR0wvyq++u3qyOL7g/z2FSVHF9wf57CpK5ofxZeq/KBQVJGcOuff+RqOpIxl1B9/wCRr14c3JG1tut7mE+bmdrW03v2RfAJQYHU5H0xU8R2jB4//WfSoASEGOxwPpjpU8Q3Dnn/APWfSsJc3tne3Ta/8qM/ev0+Lz35f8vxJSQOvFSxMfm2le2d273xjAqIgHqKliQ/NtC9s7t3vjGDXU+bpa3ncfv/AN38Sbc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxpe//AHfxD3/7v4huf1j/APH/APCjc/rH/wCP/wCFGx/SP/x//GjY/pH/AOP/AONHv/3fxD3/AO7+Ibn9Y/8Ax/8Awo3P6x/+P/4UbH9I/wDx/wDxo2P6R/8Aj/8AjR7/APd/EPf/ALv4huf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40e/8A3fxD3/7v4huf1j/8f/wo3P6x/wDj/wDhRsf0j/8AH/8AGoZUPy7gvfG3d7Zzk0e//d/EPf8A7v4hKx+XcV7427vbOciody+v8/8ACjYvp/P/ABqGUbdu3jOc9/THXPrR7/8Ad/EPf/u/iPcg4xz1/pVeV9g+uf6f404SFFOe/fp6f4+lUJpN5+mf6f4Vy1L88r76beiM5Xvd2T0/pf8ABImfeT7H/P8AKkpyybFb3x+meP1rPuZ/6/0/QfkPfiuWfxP5fkjrpX9nH5/m/wDhyeeTYFH97PHrjB6f/q96w7qcgq3GBuxnPXg9QR6Z59CevFU73VI7QDcQHlOyE5y7t3iQesuQD3PHHQV7d8Mv2YPi98X73T549Kl8I+GriSJVu7gn7XdQ3TZc6Z/10WIfafUNbjA+9XFiMf7FOn/J380n87X/AM7I9TCYLFYrlVNe437t/Xp/29d7rXp1PBZNT82WKCOKW4uZCUtre1/4+riYlQsUHXO5ioY+u33r6R+G37KvxH+ID29/4gE3hLTJ1jaW2uR/pcMEmTHJOP8ApsqsVBBztfqK/Vv4bfsbfDz4KWeny2WhRal41uIVL3GpQefd27RjMkwz937UbgEn+LyVx93j6p8MfDFok+36qplgUq8VkIPJRJX3EhP73KqTxhcD+9Xj1swxNaHs6fw6pPS+r1v9/wDWh9Rg+HKNLlq4j+M173layjazstF230Wx+dvgT9kDwp4Vgt5lsotRMZUNqMkPnfa2PUjn5dh54+9vHpXvMHw90bTZtK0XT7W1sZL7VNNsfN/48t8l1dxYjH/PTdbpdD/pn/wKvqfW7CG0imcGK1kUqJoJP4Y1z5G36jfnHTivk74keOrLw2ZNcd91r4enh1i8a16y/wBmut3DYPx/y+vC23/rg1ccsPUlQXtH7zu2r93/AF8tj6DDKnhJKVNLlS00Xld+rd/w9Tnf+Cln7SOhfB6z8SfDvw3dRTeONR0fSfD+j20U/n/2P4atbKNY5Wz93+0Jry82/wB77GR2r+bSef7TNNN5omadg00uD811kvc+2QXAPPP0xXq/x1+KuvfG/wCLXjz4neILmWe88Y+JL7VLNZePsWjiO2tdOsF75tltJd2c/wCsHTnHmen2RMyMSMEjGc5zzjP889ccjnBriUJR91cvu7XWt73u3+GnTuaV8yeJqSp9uVW1T2WnpddO2t2NtbaZA0igBHZAzY+69uk2pRf+m9z744Bzmv7nv+DZ7WB4k/Yo+KujXdx5954X+P3iQzJ3jTXtF0fUoc9huCP0/u5HWv4iby0mW3aO3y7zRyRNEQf36TxNatjPZRc9ucMPc1/W7/wa3ePC8/7Zvw3n+WEz/Db4jabCf+WT28GvaBe/TcdPth+GPeuTE83vX3Vttvht63/H5I9LKk4yqR8vzcdLejtfqf1jraJGoVOB+XYEeo7n0pDDyvPr/T2rais1T90Th4VaJuD/AM/d5OO4/wCe5/wxgmb7Kv8Ae/Q//FV5q2+b/NnoRrqC5dU1KV/e/vPv5f5mZHBnrggADHI+nT29STV23tQd+MD7v+1/e9SMfhV2G2HzdG6dR06+pNXYo/L3cAZx0AHTPp9aYnJ1HzdH9pPXT730sVIrXG7IB6fwj396txRBN3yjnHYds+n1q1H3/D+tSVDnZ2t+P/AJbUXs211b8vQhVFOeOmOgH+FP2D3/AE/wp9HmJGct97qo7cdfc4O3jIz60lK7Ss18/Ty8vxZPNJvS/pv/AF/XmIFiUMX3cdOQPXOTjp0/wNZlzqsFuAg+9IGA4A+7gc4yT97qe/rmsXWNYnR/KzhWLgck9x2A/Htt46Y5zIEklVWfnPQgH15z2zyO3Bx1Jrqhh+eKla9+6vt/26/Uwm3zO/K/hd7Xey7/AC6d7mpJPLcOhb7vz7PxAz6DsvPc5q3HFuPPbHA6nPbjp0H1ptnAQH4J+56jsfp6j16jnmti0TZ5nGM7P03f41XLyLl6K/46+Rn73930V/z1/r10WKNljdT/ABtHz1+6zD1/2vb2rz7X2k1jW7WxH+osfMupsH+55RXB5B6P+PQDJrudW1CHTLOW9l6wI0kX/XRR8v6kH864nQdPmkR7y5/4+NQl+1vgf8s5dxhwPUjdgDt04oF73Xlt8zQfMLxC1PzSKZYz/wBdAufy2j34zXMXvhq7muze8/MT5/042fT+L/PNempasqpyPm78diM/idw46epzmn3VhDLbss9yIIwCdv8Az1kIPl8cn5TnnHAbNRDEclZw9LfcnfolbVXbvvqmaUcRyVHB9Lemtm+72026qy3b8YvfBdhdBp2k8t15fHQn8PTH681zGp6Hb2lrugl8zyw+8ZPGQuOO2cGvR7lroyy20jlJIjgsB/rI3z5R/Dae38RPNYV9aSJC5kk8zfnbgggY5PQn+8DyR+NenRxdqmn93vronZdnfqtHbtc9ByU/e6v8dl006Pt+h8tfE74Y+FPix4K8R+CPGmjf2/oGv6bd2Nxp/wDdmlTZBff9ubFm9fm+gr+In9u/9iHxn+yF49vza293rfw31PUHOh63bZ2WcUsis1lNntbfaIETnrvz61/fVNDEFPmR+YVYMn+yF5b88jv279/k/wDad/Z68B/tA+A/EPhbWtKh1D+17KaGeCWDznQeXgXMefu+Q4Rm/vbl/u8e3h8UuZb2/Xr5dPPZXPEzzALMsK6XWim/v1sra9fv77H+enHNhjkhnEjIzH75Vdvlhx14DHHfk5FbsUm9R7Afr/8Aqr3T9q79mvxh+zJ8SdY8Ga1aTTaKt7dSeHtWlg8lLrSYpIjDbR/3hYrcRq3p54BxmvnW2n+Yv5odGWPap/5Zkbs9fXI+mOhr6GjPnpxktb9tev8AWh+P4mi8PWnRatyNRV9Oia/M3o+/4f1q5B/H/wAB/rWakm8Z9P8AP+f0p46j6j+ddUPhXz/NnmVf4kvl/wCko2kIGc8dP60/cvr/AD/wqkhIUY9B2qeIbt27nGMduufTHtXbTcuRWt13vfd/16DjzWVuX8euv6lyJj820r2zu3e+MYFTbn9Y/wDx/wDwqnsX0/n/AI1NEh+baF7Z3bvfGMGr9/8Au/iP3/7v4k25/WP/AMf/AMKNz+sf/j/+FGx/SP8A8f8A8aNj+kf/AI//AI0e/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABo2P6R/+P8A+NHv/wB38Q9/+7+Ibn9Y/wDx/wDwqGVj8u4r3xt3e2c5FTbH9I//AB//ABqGVD8u4L3xt3e2c5NHv/3fxD3/AO7+JECD05pknb8f6U8ADoKZJ2/H+lVO/s1fz22+ImXPZ35babXv/VyBxxnsMk/5/Cs6Q5dse38hWi54x2Oc/wCfxrOkGHYD2/kKyp83JG1ra737sceayta3nfuM7D6n+QpKXsPqf5Ckrir39rK+/u7f4UdML8qvvrt6sji+4P8APYVJUcX3B/nsKkrmh/Fl6r8oFBUkZw659/5Go6kjGXUH3/ka9eHNyRtbbre5hPm5na1tN79kXwCUGB1OR9MVPEdoweP/ANZ9KgBIQY7HA+mOlTxDcOef/wBZ9Kwlze2d7dNr/wAqM/ev0+Lz35f8vxJSQOvFSxMfm2le2d273xjAqIgHqKliQ/NtC9s7t3vjGDXU+bpa3ncfv/3fxJtz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABpe/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABo2P6R/+P8A+NHv/wB38Q9/+7+Ibn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjR7/938Q9/wDu/iG5/WP/AMf/AMKhlY/LuK98bd3tnORRKh+XcF7427vbOcmodi+n8/8AGj3/AO7+Ie//AHfxGOQcY56/0qM9D9D/ACqfAAOB2P8AKs+b73+fQVy1L88r76beiIkmnzO3fS/SyI3+8fw/kKjf7p/D+Ypsnb8f6VTuZNij3z+OMf4/5OKwrP3F6P8A9uOmk7wT9f8A0pkF05UcHGSf0I/l1/Km6F4d8W+O/EWi+DvA2i3eveItcvUgs7O1PzworKsuoTc/8e9oJBJNkZIIxjtm23n3mpWNhZ2/2jUNR1C102xj6+fNeMY/smOMCc7c8/8ALLrgV/Sd+yF+yh4f/Z2+F8fi7V7W01X4o+L7HzLvUJP+P3SNIaN3n0yx64+zLfIJs5P+pryMZiOSg49U3ovn+at1/wCB9LkeUVc2rRjUv7Clqmui0b213vpv23Z8c/BX9hXwz8Nora+8c29p49+Izuk2o3wg87S9MnkBaCy0v+7cRM0i6l0y0Vp0xX6X+A/A9h4Tsrcxwl/EU6bLWy8jyE01BwAv97zxIO/y+T71s6HpS/aVvEtTqNzJ5cOlW0n/AB8SRZfzJJv+uBaMp2wzV9F6H4Oj0+GO9vhFNeuqyyLJ/wAscglYh/uknPJ4Ar5+M+dc3du/3n6PTy+lh4RpUV7kEkntfvs11v8A8Hc8y0rwD5BbUtTP/EwlbzZl/u9dvHqdx/L0q/qMFvaxNJP0VW8vvwACf5r6V6lqN0sUbDy4k+VseX3jUDzM/gVx35NfN/j7xSLi1urWyn8mzt2MQ/6az3GB5f8AwIxY96mNBzrOWtnb00Uf8r99Fby58TV9inT/AJf197v0v3+a1PBfiJ4ha4a6sdN++zMJf9wY/oT/ADr8nP23PFlxovw11HSrD/mYr2Dw4eP+f/8Afz5Hp/og/HtgV+n/AIn0y4gspY0Ty9XvEO6Lp/Z1uxUiXnp9sVienW3r8Uv28vGtrcarb/DOzJupdOMOoX0oGcyHyinpySko7nA966K8XCPLq7NL79f1PFnifeetvk3bTtys/NqGNvMVYf8AVE+a45HzviBzz15t+AOoGOcmuvtILTyw0pO/CnOOmc55PHOeh4xwc1Bp+npK8hSMxsrLI/PUyAgfXbsJOBn1yTW5cWzlILdVD+dKESKSAz2/2gDMEsxzlCmJTHzg5bOcEDmp4ZSgptpN779HZLp5628iqM+aqpb3a6eVvJrTy7a7XrefZCNylz5+x03Jg/uslgMf7TAHPAPy9PX+hb/g2j8Ww6Z+3V8TfAxk2RfEv4AeJbd1P8cnhXW9C1mI5J4I3uMccHvzX5J/sr/sRfHL9rrxS+k/Crw/ND4esp1j8UeOtTg8nw1pLAyrKg6AzypDcfZ+4MJ9RX9I/wCwN+yD4R/Yd/bV/Z0XTNVl1XWdfm8TeDPEPiCf711feJPCl/KkMY4/0cPp1yIB/dJ9KqpHkw1WCe0NGujbun6rzfbsj6jK8Ji71MRSTUJK8V/hSjs1pquvrsf1q2yPKDK8QjlmH2hj/ejuZJrmEcnHyiVunr9M2ghTr3/p+J9aSSXa8wCiJTdXmIB22Xc0Xm/WbygeoHyjIqilzkvyAMjBJAz19Rn/AD26V8vC7V+jbdnq9W+t/wCkdcZyavUceZt3sn0+f3WW1rF5tvG78Ov9KA6p93PPXj0+v1rPluuVAw3B6Ee3saoXV2o8vzB/exyv+znqB7V0woRqRTau36dHbZx8u4292lFrzTv99rG8zhsZBOM+3X6VE8sMalpF9Mc/nzxj9fwHNcs98QVEA65342n029AefvY6H060ilzlnBGcYySenHf8Kr6pptp935K5yVMRyycbLS3TyT3sbw1HzN6W/G0qW5zyc4689m6H17Eis+d/LV5ZyCwGIunXHzZHTGcd+Oveqfn+SCO74x/wH27/AHvp356VWjgNxJv6bDnJ/wBof/Y9gcUcnJ7nbT79eqXc5JYn3tr7bW7Lyv8Ar1Vyvs+0O9zL/wAs8eVz/ezuz/3yvX39q1NNSWRpGblW8sJnsPm3D1wflJ/PFUJ28tzHnqcfkecdz/h6V0elwHy1PPJGM47g5OOp+XkfjyelaTf7iOq05v8A27r/AFcylNy9629tPOyV/wDM2oIOFPJPGB9BgE/hg9gOc96uTKkMGXPLEYx0G0nOOnHOMck9QB2mhgwAe4HA7AEcDnknHHP/ANeuY8Uaqun2crvjDI8Sjv5jbQh69yD+nTmuTDpud9fi1t2Tjouy29e+wjj9auJPEOsR6Vb58mzP2m55ycJt8r9RJ713trZCG1hjBwpXzFzz/rMZwPQ7B6Z646Vz/g3R3gsGvJyPtV64klz/AM81LmHkA44d8jjsR79rK7QogU9AxPGRnjPb1zjjJxjrXTUqc8vYRWqUV/5Kndbu6v27fM/r9f6X/DEajyk3Hjg4zkkgcsfxzn37DGKx76/G1kYZi5EvtjAHbJ5J+nX0pLzUVKNI+cwqwTIx98DOBggfcHTORjOATXLxeZfyySyn9ym3PP8Ae3YHXvtzz9T2qFhEkrrXdvfd310vp5t9NjGXxPfptp0X9L7wvtOk1GKM28ZlEfmeT6Ddt3dOOQq/iOPfkrq3lRXgliKTRZ49SeCOfTB98/r6AtveTqEtJBHajG8gnncflPJPK7W6c84zxWRrOi2ggSR7nN0u8xpjGSQhfr1wdvX19Ou9GLhK3RJ9HpezXReXy3OvC4l02o3ej29det16adF528pe1uHkfzgNo/1efQk7j29BVeWxzJCP3O7LELJ/EBtBA+mRn8K6hY4vnE0fltEeWzjfuzj642/rzxWbcXdvEB+88vGfx6fyP869iHwr5/mz1Obn9++/36aenTv+J+WP/BRf9ifw7+0h8LddVNNiXxFbxXN5otzbQedejVUjie2S2/uGZocP67E9K/h48beEfEXw68V654K8VWF3p+uaBqV3ZXsF7b+TcM8cm1ZH/vh0Rdpz8oHHWv8AS8n1bT54riG7Ed3bSwyW0kcsHnqrT42SE/whdhz6+vFfi1/wUF/4JwfD39pCx1HxBoEVroHxBSHOleKLGHybe7ljVXTTtR67jIY0S2HbdccfNXqYSvyKMb7aW7a9PX8XfzPkeIMjWZc9RL+HaW1r2jFdFfV9erVj+NC2uM/+O/h/n1/MVrLJvH0rpfin8KvG/wAGfHGt+BvHulS6NrOjXk0Ats5tJoI22pfW3TH2pQHm+kXPGK4mK734Awdv9T/T1/SvcjPnipdz82lTdGTpNWcHa34/qbMMmxj74/r/ADzWiJN4Ht/X/wDVWTDIGB9sdfx/zjtVlX2MPf8Ap/8Arroh8K+f5s4qrfPJdHZfgn/X4bmihAznjp/Wn7l9f5/4VWMhcDHbv169P84zT4hu3bucYx2659Me1dtNy5Fa3Xe993/XoC5krLl/Hrr0LkTH5tpXtndu98YwKm3P6x/+P/4VT2L6fz/xqaJD820L2zu3e+MYNX7/APd/Efv/AN38Sbc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIVDKx+XcV7427vbOciptj+kf/j/APjUMqH5dwXvjbu9s5yaPf8A7v4h7/8Ad/EiBB6c0yTt+P8ASngAdBTJO34/0qp39mr+e23xEy57O/LbTa9/6uQOOM9hkn/P4VnSHLtj2/kK0XPGOxzn/P41nSDDsB7fyFZU+bkja1td792OPNZWtbzv3Gdh9T/IUlL2H1P8hSVxV7+1lff3dv8ACjphflV99dvVkcX3B/nsKkqOL7g/z2FSVzQ/iy9V+UCgqSM4dc+/8jUdSRjLqD7/AMjXrw5uSNrbdb3MJ83M7Wtpvfsi+ASgwOpyPpip4jtGDx/+s+lQAkIMdjgfTHSp4huHPP8A+s+lYS5vbO9um1/5UZ+9fp8Xnvy/5fiSkgdeKliY/NtK9s7t3vjGBURAPUVLEh+baF7Z3bvfGMGup83S1vO4/f8A7v4k25/WP/x//Cjc/rH/AOP/AOFGx/SP/wAf/wAaNj+kf/j/APjS9/8Au/iHv/3fxDc/rH/4/wD4Ubn9Y/8Ax/8Awo2P6R/+P/40bH9I/wDx/wDxo9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A41DKh+XcF7427vbOcmj3/wC7+Ie//d/EJWPy7ivfG3d7ZzkVTl+bbt5xnP449am2L6fz/wAaRlAViByASOvpR7/938Q9/wDu/iVwCFbPv/KqE33v8+gqaTqD3PU/kKrydvx/pXLUvzyvvpt6I6IX5VffXb1ZC0mwfWsa7cO0WTs/ebYpOBtuWyYeeThgknTrjOOKv3cmwJ7h/wBNv+P4e9cprNzElpcNJ9wQTeYmM7oV2S9OORcxWp6+hrhxGI5E49vR7/166adzWmv31GCV/bT5Xq97qO1u1up+hX/BMT4FxfG34/zeP9f07zvA3wkgk1qVzj/SvEubiC2b/tm1u5/7acYAFf0H+PNWuL3XLfQrKPfHDbQ2kdl/zykH71PpuEy/98818r/8E3fAFt8HP2UPD2p6za/ZdY8bfaviF4ouvTUdWHlaIn/bWC3mH/AeOK++vhf4NeZp/GWvQebqGqTpcJBx/otoxmNtL/29KxP/AGyr5DFzlPEVJK1ny7/4Y320P2/Kstp5VlOFnT/3ivGTnfe8pvlv8mu9n5Gz4D+H8WhafDq2q+U+rzLH+4k5+xrhimP+uofn2jHrit7Wr+K2JgWWJzh2lWL+AHG3P1+bGMYANb3iPVrfTYih+SGJJGeT/nhnZgcD+PB/74zXyf4p8bXurT3NhpLeSiswk1P+7G3DR+v73aR/wH8qw1Bzak9328tLL+u+j0McXOphqCnWa9pq3a2z1XXtZ/5F/wAW+JxO32K0fyVimDXU+Pux9RH6HzgHH/AeteHCWHUbi+vp12aPbXDpbWX9+7fP7z/gbIh5/CtfU57lrJbGyTa0j/OOu/BHnSf8Dyp/+vVFo7K3geS5u/sdvpdvJfRT/wDPvdwL5st37/Z7dLgf9tfavZhhvdX9fqfJVcc6s5Ts/e9Oit+h8vftI/F7Tfgf4A1fxjrk0K6/fB7Tw7pcn35bxV2Wcsfvb/aVLE8fvFz7fzha9ruteMNe1XxZ4jupbrWNW1G5u7vzR8sTyvvWGP8A3V2l+TnAHTivpL9tL9oSb4+fF/Un0ybPgbw1cXOi+GIOu+C2kt49Q1Tj/oJ3FupP/Xtgc4r5jRFnbdHnywqICeMBd3bgkn/DpzXJWgoVJRvZq3y92LutdevX01Q1NzjGWi33vdarsrf1pdk1vBFIrF2lRZSPM+zf8fEcMEU80l3GBz/ozRop/wCuwPYZ/oI/4J3f8Ebk+Png/wACfHb9oHW5tF+Gvi21tPEeneFrBgNV8SWM091DFcX6DHm296LKJWAxhS453V+EnhDwtqnjTxR4a8G6DbfaNb8W6/o/hzTCefKn13UbbRBN0PKPqSMOgyOBzX+ip8JPBfg34KfC/wAB+Fn8URXOifD7wr4d8DabH/y9bPD2nxW0NraemFljSXH/AEzHvXJXfuddGtN+33Pv22PquGsHhcZVqe2up0km/uXf+l2Ok8H/AAl+Hvwe+H9p4D+GXhLQ/BPhXSbJ4LDTdL0/7FFFHGkardmTOLm6uxlrj/nkyL/z0r8w/jhdXXhb9oX4DeJ7Pznn0T42fDe9lmk+5Lp7eI7G2vfL/wB0XEW72ZfWv1h8S+JDbaM+pmGKCO5RW03R8/6VcRY+e5uv9wPC0Q773/D86f2jdNtdY8L3XiO+g3Xmkanpmt2M0f8Ax9xXFldxkJb/AO4JAH/4B6Vjg6HOq0n1j1v2Sv8AltZn19LNaWEqV8NSXuTSgr92le3zfZH7r33iDS47lo5v9RHLZs5PXZdRtdWeOwG6a4qCzkaT7VesDjz22f8AXM52e3Qfjz6V57a2Ul3Pc31j5Wo2evrpupyTXM/k3WlXslqovPP7N9q/c7cfd+zMO+a6O51FdM22kksVzIEGI45vO8045DH+HaWAH97cfSvGqYW9SWibv230X93/AIPktjypRcJSV7K/Nu18TTvp1fN+dtbGxdahKrLsHMm7IP8As4xzkcYJqr5m/wCabPB+Tbgdeuc5PYY61gx3cl1IJJPlEf3IP+eWcE/99BMf8B57Zk88zO4PJTaPzz9PT+verjDkiov7Kv11Tfy017I8jG4nlco3va3rrFf127ra+7HIi525OcZyPTOMdPU1Yj/fZ7bce3XP19KzrdN/4HjHvn+orUVNgHv/AE//AF03u120+7Q8pT5/e7+vp1J4bfO4g8jBA9evfjHt+uKSe4yoBHI3Ansen5f1PTFIkpjD4/ixz6Yz0Pbr6H2wapSN5rge5/p/h+HekAsH76dR/dYcn3I/Pp049M16Fp6FFjyc7lz/AOOsf6/56DmtHsD52/3U9ge5Hbqx6H0B7HNd0sedvcoMDt1GM498fr+NceKu4ta9P0X63+RtH4V8/wAyGe4Nvbs/b5d3X3x+p7jGcZrye5Y+J/Ea28nFnp5W6nJ6b1wYPp9yT2GSAAK63xfqy6Xp0879ERyCccSHCpg9c88//rrP8CaK1npi3M//AB9Xz/b5s55juCxhH1wHxzwMntmrwcFSw88RJ25rqOnZ2t82r/gUdupWCED+IoJD/DmKTAi69sK+T0x64xWBdX/mNtx9wt9M8dPcEckk45xmptV1ArttP+eu8f8AfJTPQd8/h1qhbo6IMbdp7HOeOBj+RzzxWGEm6l5tPWTXzUkt7W6X06aHLUd5uzVrL0vp+W/yKLqZyeR8h6EnA3YPHX/H3qSCzLMWABKkHhvXPXOM9OP1qzN87xwuB+9LAYzj5fL6/wDfXb+ta0UBt4HT/d545wcdiegx1JrtnrJd2o6212Wt73b+79Sk3yrez8/JX/MzXkkWMRpweRz35HB4z65x16cdazWgudxlRBLMCNnHQfxE5XHUL9cZ64rofIE5UH+HI7/xfT/d+gq0I4bRdz4yR8vXqOWOfbPUngcd6y9vyPlvqvPWz125kHyd/wAOm39bnAalo8jQi9njMbrvMg7HOMD2xj24PcHA5Y2mmXIJlj8xlJGPQk/129fb8K9WngXd9quAPI5yen90kj3Ax3GMkVyOovbu5m0+SKNV3B/NPB3YClfQKQ27tgpnJzXoUJynTjZK1nq723el77+XRHbha7hZdE7d3ve3lv03tba5xbaTo/mKvlmMknj8B9enX8fbjC8QeDNI1OzuLcJEfOhkRZJD/q3baV2jH8eDk/7IrobuGSc+bJ9jusbisX8ZGBnbjvx65PB785RhuJMraXUy3MbI0VnJ91MZLCPHZsDd06CumjXcKnLLvr22Tfd9fx0T1v3V588VJdf05UttOjsfg1/wVB/YZ0/4v/DLW/GPh3SNnjvwdB9qttStj9+2gVWmjf8A3xbKF+jd6/jyuorrTNQvtPv4Zba8s72eC7tpM/u5o38t5V4/5alMt3yo69K/0vPGmj3urwSTT6RuuDDIk8Hked9vG0Js/wBnahf/AHvMz2r+Qb/gq/8AsDx/DXWtX+O/wx0nHhbVtQeTxd4d8gQ/2Vqt60DfaTnG83LfamHPH2bPevpMHivh6p79tXe2l+/TXbR6p/E55lanTnirWc7Wtv7qS6enn2PxOtJPMD+wQ/nu/wAM+hz2rQj7/h/Wuat51Vnjj+aOFhGJfVlzvi/7YHA46b+PStqCTeD7Y/XP+e9ejGXPWlK1ruOnooI+CUeT3ezffv56mir7GHv/AE//AF1dEm8D2/r/APqrMj7/AIf1qZX2MPf+n/6663v8l+SOSq3zyXfl/JP+vnbc0UIGc8dP60/cvr/P/CqxkLgY7d+vXp/nGafEN27dzjGO3XPpj2rqp83IrW673vu/6XkC5krLl/Hrr0LkTH5tpXtndu98YwKm3P6x/wDj/wDhVPYvp/P/ABqaJD820L2zu3e+MYNX7/8Ad/Efv/3fxJtz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4VDKx+XcV7427vbOciptj+kf8A4/8A41DKh+XcF7427vbOcmj3/wC7+Ie//d/EiBB6c0yTt+P9KeAB0FMk7fj/AEqp39mr+e23xEy57O/LbTa9/wCrkDjjPYZJ/wA/hWdIcu2Pb+QrRc8Y7HOf8/jWdIMOwHt/IVlT5uSNrW13v3Y481la1vO/cZ2H1P8AIUlL2H1P8hSVxV7+1lff3dv8KOmF+VX3129WRxfcH+ewqSo4vuD/AD2FSVzQ/iy9V+UCgqSM4dc+/wDI1HUkYy6g+/8AI168Obkja23W9zCfNzO1rab37IvgEoMDqcj6YqeI7Rg8f/rPpUAJCDHY4H0x0qeIbhzz/wDrPpWEub2zvbptf+VGfvX6fF578v8Al+JKSB14qWJj820r2zu3e+MYFREA9RUsSH5toXtndu98Ywa6nzdLW87j9/8Au/iTbn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjS9/+7+Ie/wD3fxDc/rH/AOP/AOFG5/WP/wAf/wAKNj+kf/j/APjRsf0j/wDH/wDGj3/7v4h7/wDd/ENz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABo9/wDu/iHv/wB38Q3P6x/+P/4VDKx+XcV7427vbOciptj+kf8A4/8A41DKh+XcF7427vbOcmj3/wC7+Ie//d/Epy/Nt284zn8cetQlSASRwOT0qaUbdu3jOc9/THXPrVaTLKc84Vsfl7fhR7/938Q9/wDu/iVJTlyR04/kKhaTYPrQCctn14/z+VNl+4f89jXFir637dNtmdEL8qvvrt6syLqTzGWP+9vx9eMHHf26dK674QfDa6+MHxK8O+DlTfpY1bTm1T/put5exWFvp+OM/bPtM+Sc4MGetcPPjIDcAsyR/wDXzOrWqdv+eFxc1+pv/BOD4dIg8GePb22M0vi3xZq3jaJj/wAsvDfgmB9I0nv/ABXL6l2/hryKr9y3nL7+ZfofQ5FhHjMZh76qjNStZfzX16+nb0P3E8J6DpereItN+ElrHs0jwTpujT3f/TGXSbRdNt7AY4/0I6bNx/02r6m1u+tfDOlf63ZHHC1zt/vw7QPr8oXv6189fsz2sUHhzxV8TvEUsUN3r3iHVL6Npesek2U90LIL9Vmlzz29M15h8RPiTf8AxJ1m8t9Okit/DNpPKizR/wDL6xZRJu/65eSMZ/56mvE9n7avKnsvd1/7dj+rR+t5hj1SpqmtoQhHyXuRfR+n4a9CfxX45ufGt5Nb6fJ9l0cPIoP/AD8OhAk/79lR+D+vXkEsEkAKDIiO0t/ex1/LHPXqPpRaRQNbCK1kKbfljc/8tCn3u/8ADx/31Qt1LEzQrJvkXAl77c52fnhvrj1r2qWC9lTjC609euvQ+JxdZ1lOpfSV9L3Wiiv0FdfKVwFiyI2eSWXqtrGVE8Y4x+93xg/7o5r80f8Agot+0ND8O/Akfwt8LXsUPjfxop/tCOLn+yPDUYth8w6/8TOO8lx2/wBEPbmv0I8ceLdF8CeDvEPjLxVNFaaF4f0+bUdRuZfvyW8EchXTIvfUbsWgb/r3Wv5Rvi/8Utf+MvxG8ReP/EN1NNdavqcy29tIcrp9hBKVsbSPBP3LRoC3PPFOrDkhyX2u/wAU+vrY8iF/aPe11Z/KJ5vawq8jlF2Kk0ig9N4BBaX/ALaM7H8enUjq7SAsvy5zwFAA9+x6+uB0GOeRjJ0+CSZiyAlUC78ejA4/9BJ/Cuqjt4rhfKJmWFYma78v/lnAjRvM5ycYe2S5s1PpeHPIrhjRc1GV7b9uj1dr30t5Ho0tZJ6p2i//ACXb8F/Vz9Zf+COPwKsPir+1dF4p8VSbNA+E/hXU/Etl+48/PjLVgdF8L46BMRSa3xj5snniv6tfFPw1uNZ1bwh8PfDdx/xO2Nhr5/ceRjRdM1rR4NT/AN754x9Ouea+JP8Agld+ydJ8E/gT8O11DRf7O+L3xtsZPiX4s+0wed/wjXhy6EaaD4dQDIT7D4elsrxvX+0l/umv2H1mJvDMgt9EsbRNQFrbwnXPI8hjbgOBGn9/zC0gPHy4HY1wVo8lSUe3L+MUz7zK8V9VwUp/3Z699W/w0RxHjvTQmu3dpF+/jiMdvD/s+TNPG35t7Y+WuK8WfCF/GPhbXtFuIvKk1bR5bXS5P+on59rd2kXbHmm1Yc/3etetWOmsz+fIs0cpxLKkn3fMfJaSP2cjJ+i5rWFx/plpaDgPKG/79FT/AOz+tZz/AIXz/VnirGe0xE8Za3O72/w2jfff3fySWx6f4aPiTQ/hZov2iw/s/XrbSLOK7j/56PDbLaLL9StsSPx4rjtP1/UJ1EupH/SJd4b/AIDyf5j8ua9fjuI7qwiSTtEsY/AAH+nTt16Vxt5okZ82RO5BP645/wAn061y4f416r9Tor5l9ZhyK60t0e36/p6Bpl9ut1/2mb+f4ev0ro7fn5/TH0zzn8B/k1x0EHkYHqT+gP8AjXQxT+Si9fmA9e2fT61pW5vaSta2m9/5UeelbT5/fr+p00d70Tt/nH1xWza8hm7nbn/x7FcXb33z9+o9ff8Az/8AWrpLa637Ony/1/l0/n3rhqp8zbS82vRfP/gAa0nb8f6UwZOB6kf5/WrQkLog/uh8fiP16Z59fyqW0fmXjcZww49Rlif0H19Kz7+X+aX6gd3pEHkxof74B/BQ/sOCSfqPzO3K0aQSyPx5e0jHpzuH8vxx16GtZoUhUZz8qgcY9f8AGoNauzaWXmj7yq0g/wC2a5Pb3/DiuCtT9vXhTX8yWnklr0t3f/BNo/Cv66nkeuXP/CSeK9O0aL/VI017cf8AboYCnU/7ch/P2r2MlLe1WOL7ghMuOOGQYIzjPGBjOePwrx74ZxXGq6prviObpdSzQJ/2waTcfpiQfiR3zXfeJbuW2gWxTrLCrE/ovB7jJzjkdjXTj4ezlRwcWrQ5Fpr8XLKz089X0/Azn8T/AK6L7+v3HP28xvrp7rpiRl6f3Mj+fA9AQMnit1p2I2/wgAfXHfoT/npWLpSSpEgfODkr6dVyf1+tbrn52/3j/OuiNPktFWVkul/sxenrzepJPaWu8s56Ljacd8nsD7d/yOeLtzII1RecHOAP9kDGT6cjPU9D2pYcDex7AflyT/IUx2e5mhhWPei79zcEoG27fYFgCe/T6Zxno3ZW217XUX6u34bqwf0izE0cERmkk8tj91cn5+vTHcAjHf5jRFLPKHkFtCVYAiWTl8Dd80ZwefX3A75FWPJjH7uMefPGDg94Sfw/ixjOMfIOhAFOW13n5pC0gPzoP4BzgNnpnDdCBwQOlck9ZPt7tvkl3tppfX8jphh3OKk21ford7d/LbrrcyLi388jzfOuGXPlq5GyLJ+YR+obC5xwdqjioDpjujK9vDt48vzMnv8ANjGR2HTpn8a6WWJLaEyMDlM7NucDofY+mec9DnmqUc81wu8j5c/KABkdM9h14x/knSGI5IqKasr9e/z1/A66UHTio3TSvv8AFrbovXXpbqzlU8L28kj/AGqLy1b7v2Y8Nyc7z+W3OOC3cVn3XgPRJWYR6heWDnlh/wAs5iPu7un3Mkj2c9Miu/WRkPzAkHHp09vfkex9RWhEtvOjCb5hgbCM55zu7H0UHI9Qec0pYrExu4XUdOV73va/d6a/K7Kdfk9120d9u9ntr+f4M8RvvDviXTVxYfY/EenxHc1lnMuxMEA+7AnI/wBkd6+V/j98KfDnxW8K+IdOvNE8r7Zpd5Z67otz2t7iNYxJbf8AXIq5k/3oxX6Ez6LaTsJIpJrdlJPnRcLGWx/rSR0Yj5f+BDB7YWs+Hor6zltbq3tNRJik8m4jwL4ABfNMXoxHl7zx90V1YLMJ0ayqTbc7q/lb18rPvbbocOJj9ZThtfRPTsvJWtrr+R/mj/tq/szan+zB8aNe8JSRTxaBfyzax4aEh/diyuJFeWOL08oS24Ye4xXyXbz5Ab+979QO46k4yOR0PrX91P8AwVk/4J0aT+0P8HdT8QeFI9nxC8JW0+s+HIo4PNu7mcpbyXWl3gz8v277DCIfXyZcjgGv4Vdc0TVvCut6r4e13T5dN1bS7+4tNUtJYPI+zalC/lXdqvXd5BRCR2MnbPP3WGxKxdGFfrO911XK+TZu+y8vu2+BzbLfq1erU/wu1v7kP6v/AMMbUEm8H2x+uf8APercff8AD+tc1bT9fbbnnnpwfX8evtW1BJvB9sfrn/PevSw+6v2f/A/4B883dt/1poaKvsYe/wDT/wDXV0SbwPb+v/6qzI+/4f1qZX2MPf8Ap/8ArrpqfG7eVreiOOq/fkuj5fyT/r8NzRQgZzx0/rT9y+v8/wDCqxkLgY7d+vXp/nGafEN27dzjGO3XPpj2renzcitbrve+7/peQLmSsuX8euvQuRMfm2le2d273xjAqbc/rH/4/wD4VT2L6fz/AMamiQ/NtC9s7t3vjGDV+/8A3fxH7/8Ad/Em3P6x/wDj/wDhUMrH5dxXvjbu9s5yKm2P6R/+P/41DKh+XcF7427vbOcmj3/7v4h7/wDd/EiBB6c0yTt+P9KeAB0FMk7fj/Sqnf2av57bfETLns78ttNr3/q5A44z2GSf8/hWdIcu2Pb+QrRc8Y7HOf8AP41nSDDsB7fyFZU+bkja1td792OPNZWtbzv3Gdh9T/IUlL2H1P8AIUlcVe/tZX393b/CjphflV99dvVkcX3B/nsKkqOL7g/z2FSVzQ/iy9V+UCgqSM4dc+/8jUdSRjLqD7/yNevDm5I2tt1vcwnzczta2m9+yL4BKDA6nI+mKniO0YPH/wCs+lQAkIMdjgfTHSp4huHPP/6z6VhLm9s726bX/lRn71+nxee/L/l+JKSB14qWJj820r2zu3e+MYFREA9RUsSH5toXtndu98Ywa6nzdLW87j9/+7+JNuf1j/8AH/8ACjc/rH/4/wD4UbH9I/8Ax/8Axo2P6R/+P/40vf8A7v4h7/8Ad/ENz+sf/j/+FG5/WP8A8f8A8KNj+kf/AI//AI0bH9I//H/8aPf/ALv4h7/938Q3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aPf/u/iHv8A938Q3P6x/wDj/wDhUMrH5dxXvjbu9s5yKJUPy7gvfG3d7Zzk1DsX0/n/AI0e/wD3fxD3/wC7+IxyDjHPX+lVJ/4P+Bf0q1IABwOx/lWe/wB4/h/IVy1L88r76beiM5J6t23tp6EMnb8f6VQu+ifU/wAhV2b7v+fUVjXPUfVv5iuWfxP5fkjqpfw4/P8A9KZzHiCR49PufLj8yZ4HS39rhSs8f5iFhjvX9E3wG8Lr4A8D+B/D8EEQTQ/gp4b0keZzt1PxhLc63eSKf+mYmiJz6iv55UsTq+u+FtFJ/daz4o8O6c/P/PbW9OYY9hsbP+Nf0ffGzWn8Ewao9pJ5d5Drnhrw5pY9bjSfD8Sn6EC+H5+4FeNi3+/n/wBu/L3In33CNP2axFZ21jdd3olb70j2P4gfFRbjT7D4XeFbyI6JpdpbQ65dx/8AL5qTwwGaI9f+PYo4H/XY9eai8OwrNaRWUEfmWyIgnbjknO3p9Gr5f+F1rLe/Zrqa4xvZ5bj/AK/7qWVrzP8A3xF+tfU0N3JY20OlaaPMllLGW4/59c7dmOn+t3P0/wCedaYWhztS7/1+Sv32sdOKxjlzN6tyl1vs2v8Agdu/Q2ftf9nmWG1j2GLbHH3z5obP1xsA/HvWlb6ZgCe5/wBcIJr3/gURiK/rIP8APSfQ9JRMSXsvnXHynzOm77xPbtwMe/eud+MPxE0T4Z+A9e8X+IbiG30jw/p13qU/m/eumtov9GsI/e6u2t93p5aivXqR5Kaj2T/9u/Sx5inzrm769fTr3sfkz/wVI/aBltIdI+Anhi8+w3F6LXxD42mzyYz9mOhR4/6aA6wO3SvxVgSOSZwkflA3MjmIgYBbZmUDoPOK/Xjmur+Jvj7Wvin4+8SePvEVzLc6r4k1KW9n8z7lqnmyC1sIyDz9ltDBu7jzFz2rndPiVztI4Lx55Pq9eBWv7Wa89PuR30G3CNktE31XXztrt89dzdknjs7ZHIEkkkkS2qfxi8Xf5EiHj/V7nzx3Bz6fp1/wS/8A2QtU/aT+MFprPiC2ux8MPhtdWfjHx3rFyPl1DVbe5kn0bRIfa8ksdQR+cYiT3FfCPwn+FPiX4z/EjQfAnhq3mlmu72zhklig89ITPI6RCU/wh1SfAyd20jtz/d7+wL+y/wCE/gX8J9A+FOjaZDYQaUbXxJ471GKDyHvtZlWSW10yT++bx1v9vp5Z/vUTp+zoqtfe7tts7Wfnp/XTtwWHc63N3t+SVtr/AJ6n3P4F0tfD+i3ni67svs2ra3bQ6boNjz/xIvDlvbRwWEP/AG3jk3f9sqgu5yZgpO7EMaGX++43F/y3D3wa6LW75bi6doWxaCNFtbb/AJ8o1BX7IP8ArkFU/wDAvbFcgyfaZN3aM/8AoXTnj+77fzrhVT2i5+/6WW69P+Hdz1sXieRPCL7CWv8AiSl+vz+el23gzv8A9rb3/wB7j8c//Xqc6XiSKTrtYnp9Pw4/SpNPj3SBe6YH55P07V1MVqWYt/dx+uf6/T8ayn8T+X5I8yK5Vb1/FtnQaZdeVaxpzwB3P9K0ln88hfw5z/F/+qsGPjavdSB+vFbNrJsI9wv6Z/x9q5p83M7WtpvfsjeHwr5/mzR+xZTPqPfH+H+cc1Qksevuf8/jx9e9dDHPlQPX9P8AP+eQauW8Gd/+1t7/AO9x+Of/AK9R7/8Ad/EtK7seeXUP2eNnOfXPbjniotP1whxH6ED8zj1+tek3OjmVNnPzqxzjGcAf4+1eCeK7W40i5kuIfuwMxkH1wV+mcN+H6bQh7eKp6X36W3v1+V/l5BZr+vR/qe9WF0ZYT/tBcdj/ABfr+dbmiptvM/3tv6bv8fU14f4P8RG+hDH7wUA49ww/oe/8q9y8IyeYSf8AaXt7t/h+dcGNo+wcqTWsbP8A8ChzP81r+XXWOkV62/H/AIJ6LGheTPZQCfqc/rx+nJ9fLPifqw07QtSI/wBbcoNNtR0P2y8wkA46/wCrbHsT36esQcCZv7qof1evn/4lP/amu+FNDHS+8Rwy9+tomfz/AH3+HHNedgNa1dvZc34KP/BY+v8AX9dj0PwVp39jeEtLt3HMVlHNe9T/AKWQWm75/iUYH15HTCjuf7d1iadf9VbsqIDzjduDHjpzGOR7V1GpGWLSIrC1ObmSJbdD/wBM45GWU4+joexwfQ885oEUNnqVzYQ/8uwtnk/66TtIW47YMZruwn/L++rSeu/WN7P5L5ehk9ZetvldL/M6GWMxsAuPQ55PHHUflUZdgjRnb+8ZOeeNmT+PX8gaW8+e8jtiM+eZP/HCvuP73TIz61BfP5U1raKP3qGQL2+95e7jrjAXb0PPGeK5t29ftS/9Kf8AW3/ASf579d18tP8AM05ZbqaRLKybE0iLn18sAeb1xzyMcgHoMmtiBLW0ha3tyA6hRMBwfN+bntj5tx7Y/EZr28D2kQaLH224A25JAMceTJjp2dehweeOasjbGhEZ/eTY25/vj7/0HzLjvjkcc1zzacpPs0tttFptr06bmsfhX3/qTgpDCGaTYXwVB6uQMt6DC5A5xweoJzSLvl8oNHsAyEY4w+SAxGMnA4xkdGHWlktvs1uJmOZG+8RwRtwBjHqC36Z4AxoWPzQCTn58df8AZ69PrWFT3kkno73tqk046dPO3zK/4H5J/wDB9H2KerJ5emyKO5TPue/r6n8/TFMtEZ7aLH93ufUA1o6q+LeOPp5rN0/2SuOvfLcevHvU0cJ8uNc/dRfTuPw9K56b9zpb+9fvb/g9d0gs3sm/JfL8jNe1d8cE4z0Prj0I9Kj+xTLh1BG3qMkk/T5uox+eDg4rZCFOvf8Ap+J9aZJ2/H+lae9bRr0V7dL9fLt/mZSb5mndeT9F/wAOZSan5J8u4jLR/wB/rtA9eB1+vUEZIrSjliuUzG++MY2jBwm7k9ePm2jPH8PtVS5gMwXp8u7r746deePSsr7NJG2Uzxy3H6+mOvt1rWEE4p/a6u99Vonrs7Lpb5mbbT0Xbbpt/wAF/PokX72zinjmtpreKaGe3lE32n/j08tQoMU/b9+GYJwPuMT7/iP+21/wRI/Zp/al1fWPH/h+TVfhX8SNSgElzqmh/wDIHvmAyr6iD/y7RvkkAn5biQ55xX7apdSJtVznPA6HGM+uPX1yfXpVsRl9pxx/iAe31FdmGxeJwclOEmo3vvo7WWzdr6Wukn2e94rYTC4qm41fi+1vt079+ltfU/zVP2zf+CcX7Q37Enim803x54dutV8JveJ/YPj/AETT/tnhbU9MnKiEGTj7NdKskZue8jSpj/VGvhcSyxvJHMskc0UhRoC3+jogwUkt4yMx+ZlvM9SidcV/ql/Ez4X+CPi14V1nwL8QvD2k+KPC2tWk1vqOk6vB58EqMuzzYRj5bmIPmHkEsSf4a/kb/wCCkH/BDHV/h2mufFf9l62uvFXg+23X+o+A5YfJ1/S4eJEfSO7W0Y+2fRY4jxur6/L89oYiEKeJ0rJe80rRbul0bSuuXS6bXezt8dm2RQoc9Sk7038Pe1o6LZrVb63flofzWQSbwenGOnvk+n+ecVbj7/h/WqGoaXf+Hr270rUIby3uLO9uYJ7fUv8AkJ211Eyrc2t17W77Vix0y/XvJBJvB9sfrn/PevpcPiYKSVNe4rWtf5/j+Wp81CLjHle6bT0trdmir7GHv/T/APXV0SbwPb+v/wCqsyPv+H9amT7w/H+RroqS55uS62/CKX6HNUb55Lvyr8F/X39zRQgZzx0/rT9y+v8AP/CqpJAXHp/QVJF827dzjGPxz6V0U+bkjt13vfd/16BHmsrWt537lyJj820r2zu3e+MYFErH5dxXvjbu9s5yKIkPzbQvbO7d74xg0Sofl3Be+Nu72znJq/f/ALv4j9/+7+JECD05pknb8f6U8ADoKZJ2/H+lVO/s1fz22+ImXPZ35babXv8A1cgccZ7DJP8An8KzpDl2x7fyFaLnjHY5z/n8azpBh2A9v5CsqfNyRta2u9+7HHmsrWt537jOw+p/kKSl7D6n+QpK4q9/ayvv7u3+FHTC/Kr767erI4vuD/PYVJUcX3B/nsKkrmh/Fl6r8oFBUkZw659/5Go6kjGXUH3/AJGvXhzckbW263uYT5uZ2tbTe/ZF8AlBgdTkfTFTxHaMHj/9Z9KgBIQY7HA+mOlTxDcOef8A9Z9Kwlze2d7dNr/yoz96/T4vPfl/y/ElJA68VLEx+baV7Z3bvfGMCoiAeoqWJD820L2zu3e+MYNdT5ulredx+/8A3fxJtz+sf/j/APhRuf1j/wDH/wDCjY/pH/4//jRsf0j/APH/APGl7/8Ad/EPf/u/iG5/WP8A8f8A8KNz+sf/AI//AIUbH9I//H/8aNj+kf8A4/8A40e//d/EPf8A7v4huf1j/wDH/wDCjc/rH/4//hRsf0j/APH/APGjY/pH/wCP/wCNHv8A938Q9/8Au/iQysfl3Fe+Nu72znIqHcvr/P8AwqaVD8u4L3xt3e2c5NU5fl27eM5z+GPWj3/7v4h7/wDd/EdIQRxzw38qy5vvf59BV8ElWzz1/lVCb73+fQVy1L88r76beiOiF+VX3129WQN0P0P8jXO3/Vfo/wDJa3pen4N/Kudueo+rfzFc7fvr5L7/APhy4O0v+3vzSR2Hwb0r+2fjf8HLJv8AVjx/ot5JjA/49ZQR6dnPTnjHev2j/aS1OTWvitZ+Gkm22mkalczPbf8APf7ZFpgD+v7j7GT/ANta/H/9maHzP2g/hq8n+og12OSZD/FtcOgx3+434E1+qc6T+P8A4weMPEdx/oOkWusy6Yv/AE8iyypH/bLIOf8AppXh4h/7bUttZW/8Aj2Pscpf+zy/69r8z3nwFDqV2i6doq+e28xvqI/5ZxKMNH/wEEivpjw9oltYwwwGTz5GYmaT+9IuN/HsW/X8uE8BLYQ6bHbaeMxBgxb+8Y92P/Qj+f5emWVzm4a683y9iFPrtH9PevRw+/z/APkS4fCvWX/pTOjurmCygIxGBAud0uflfgR7fXJ3Z/Cvwy/4Km/H/wC0S6N8FtL1CL93cLrfiqOL0Y2R0QHPf5NU2g479+K/VD4o/EnSfh34Q8S+OdauNum+H9Pu765/6b+XGfJsM/8AT3dG39P9VxX8ovxH8ear8SPG+v8AjnWpPN1LxNqd1f3H/TsXkxDYen+h2ptz6jzs+oFZhiOWm472ir/NJvu+upUP4u3TbpsjkllnneVjyXuZDu/vLhFjxjA6A4PA56dq6y2DWNp9rlIz8scK5zueQMF/EELkemOpxjnbG286RYu8kisWB54JB9eu79M47j6S/Z9+FF78cvjX4K+HFsm62XVbLUNSlOf3NrBIIpADyPnWZ+n9zPbNeRhZc9pa2308ubXr2+86439q7X05Wu600slt0totfM/eH/gjt+zLF4c8Kz/GnxDokV9rOqiOPwzbS8b9XM84s7leT/x6m4JI5/1g61/UzBoMPgnQ7bR0mik1rUWGr+I7uI/67U72G3drZv8ArzAZRjH+uPvXyp+yb8G/D/g7RtK1eBTa+FfhXpkfhXQoP+gxr9nAZJpP+4fJJF/4F19Fx3dxm81DUZvPe8uZLuRu6STEkx5/2AEH4/hUYmp7StOitkkrdPhje3p/W578av1DDQrW/j8y9Gm469tl8jVvL6SKIxPJv3+Vj2xnPvzkD8OlSRIUSSf/AGYj/wCh9P1rDtJJLqd5esII8n8S2/8Akpz69/XUZ97bMen68/0/CohD2cVDt+up57n7Ruf82p0OlcypJ/fI9e2f8a7uLp+C/wAq5LTYfs8Qn9NvbPr9a6izn8/c/un9fy6Vy1fjfy/JCNCH73+fQ1px/wAP0/pVeNN+32A/WtKODp/9f24+vt1965J83M7WtpvfsgL1t1P1X+Zrfs+/+f71ZNvB1/D8ev8AL8h781tWybPx/oD/AI//AFq46r96z3W9ttUjaHwr5/mzdhj8xVX1VRz06c59sA/54rifGfhz7fp9xGse87JCPYYHQ+hxgZ6Yxg4NdrD/AAf9c/8A4irMsXmW568E/wDj2B/7KD9Rjvip9p7H2NRbuev3td/JW01ZR8C2d7d+GfELW8kflpvIH+1sPP4YcdfU19n/AAz1JNTtjIn3gsW7r/Fvx+HB7f0r5t+N3haS2SfWYf8AWQrLMvtjym69s8Z4yPwrt/2cNfk1XTommx5jwvE3bmItjHTuemP1r2MwSxOEjXW8o/8ApNo9fTy66aI9Km/9np+t/ulH/hvmfW8GTHcp3aM89vl3A8/j6V8/62n234paNF/z6Wkw7/8ALb7OM+3MWe9e/REj7QmQdtkD7fMHzj/vnj+QrwyBPM+K82O2nL/6Cc/oD/hnFfPZVHkeNTe0PzSlp/lucq6L5Hqpto1kWV/v25kkU4AI4BI7n+HP5givOPB13JqGta7dyYEP2vB9P3TTYzx0G73HFegeMb0aTok1yn+sNusadc5kVg36AcjAH6HyX4fvt0CeT/l5vdQuRzjuw7/8C/r2qstv7Kv0u562/vK39f5mL+K3p5dF9x6XpkqXmo3WoHHkQ/u1ycZ5bJ/DaPfgd+ujp9j5moNqkh/dQ+d9l6fxkCX5ex+WMAHH54w7TrGW3torSP8A4+JMvJ0+4eWz6ZUn37nFN1u6MVva2NjJsVbuNnXs4HzSj1wCQfx+lZPW6Wusm/JOTV/V6WfX5GlD4+q3s1/S/PT5h9uEsl1d3R/dROAnOf3hDbOvAOVPPfJxg4zuaNatNuurvmSUpt4GPKG7y8984OcZ9M55Fc/pVp/a94ty8Xl6XBK6Bh/y0nOzJOeGIKjjvuH4eiyK0KMsgwiKGYdtiZ8sDtj73f6+3BXq3qSopK0eW3RaqL02Wl7WvvZG1XWo7W6a9Nlv/n2MHW5E/wBHtV6XEjA98+WY/Yn/AJafQj16Hagh2RrHxiFVOOmdyjn/AMd6evU1yemS/wBpavNcrkxRjy4+MdC+SevQqvcenbnrt+2N09WGf+A55/mKjkdNezVrpLrrq1r16fic0vie/n56J9v60Mx/3t2gxxFn9QGPbGcgEZz0yPStAqR1HX+n/wCuliXaD74/TP8AjU1ZSV5NvfTa/wDWvUgr0VYopW83/Vv8vxfcCnJ2/H+lU5/4P+Bf0rSmRHA3jJGQvtnGcHt0H5Vh3X2yBkMbfuzuyNx6DAHTByM5x36CtYuXKrWstNb3Grdb/L/P/gFmJPNSSPoG2ZP0JpbfMErQHnOMEewOM556H3/Gq1rqJkLI3zMpUH1Gcj0GckHoMZ7+mq8ayhS3bp1749CPSq96y2/H+vUNPO33/wCX6GfeJtcP/fz/AOO4/wAaxb6FLm3nhkSN0aM7hcw+dZFOA0VznhRKDhM9SGP8OK2NQiWOEbe7D17EepNVCAeorooT9i5VJOylb4d1ytW9b2s/LXyFfXvaz1X6fI/n4/4Km/8ABILwn+0ToOs/F74GaXp/hX4yWVpJf3WlWkHk6V4vgjjikawl/vXMnkTfYzjhriXHDc/xTeLPCniHwD4o1rwv4p0a60LXdI1CfTtT06/4vbO6s2Mctq/Gfs8THdanPSV+Djn/AFV7sYt5MeUu4eWWlGflkI3RL7S7Ru6/dHBFfzD/APBb3/gnfpnj3RNU/aU+FWjfZfF+jRK/i/R7YEf2vpVoLdluXxk/6Kou2T/r5Y9q+04fzh1JSw7bklFrmaV/s2unrd30fW15O+r+XznLOaVTFRVlLl0XTlhGLt8038km7XP5EoH3hvbH65/z1PtVuPv+H9ax0d4JriEwSwIk7FIpf+WfO14x/wBc3RgTkjkHHNaSybx9K+pw8uaSffm/Nr/hj5BrlbXZl+IE7sdsf1q3F8u7dxnGPwz6VlxDLjjjv+RxzV4FgABnAwBx9MdvpXp+905bfP8AQ5puXM7cttO/ZFzcvr/P/Cjcvr/P/CoYvm3bucYx2659MVNsX0/n/jR7/wDd/En3/wC7+IoIPTmmSdvx/pTwAOgpknb8f6VU7+zV/Pbb4iZc9nfltpte/wDVyBxxnsMk/wCfwrOkOXbHt/IVoueMdjnP+fxrOkGHYD2/kKyp83JG1ra737sceayta3nfuM7D6n+QpKXsPqf5Ckrir39rK+/u7f4UdML8qvvrt6sji+4P89hUlRxfcH+ewqSuaH8WXqvygUFSRnDrn3/kajqSMZdQff8Aka9eHNyRtbbre5hPm5na1tN79kXwCUGB1OR9MVPEdoweP/1n0qAEhBjscD6Y6VPENw55/wD1n0rCXN7Z3t02v/KjP3r9Pi89+X/L8SUkDrxUsTH5tpXtndu98YwKiIB6ipYkPzbQvbO7d74xg11Pm6Wt53H7/wDd/Em3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aXv/wB38Q9/+7+Ibn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjR7/938Q9/wDu/iG5/WP/AMf/AMKNz+sf/j/+FGx/SP8A8f8A8aNj+kf/AI//AI0e/wD3fxD3/wC7+JDKx+XcV7427vbOciqcvzbdvOM5/HHrVyVD8u4L3xt3e2c5NQMoCsQOQCR19KPf/u/iHv8A938SkwIByOx/lVA9T9T/ADq3J1B7nqfyFQv90/h/MVlXv7N33s9vkdEL8qvvrt6soXP3V+rf+gmuZlJ836k59+BW/c/eX/ef+VYV0xzs7MhJ99mT/NhmvLqu0L+mn/b236mtL436r/21HonwVkurP4gWmrWUnl3emMsqf7SSCQy/l5a9s5bjrX6XfDXxJe6jeNbxy72u9ReUeoe6bEn5+WB0HTvX5m/CG2ZNbtr2OQpNfLJaKufvpnEmcd1DDk5zuwCO36s/s7+HYvtj655UP2PSTGfKk4a4uIfP/wBXj/nmT83++PWvAp0OfGTld2bhb1UYrS/W/wArH1mDv7CHo7+bvf8A4P3H3n4b006ZplpA/wDrmjEkn/Alyv8AM11s0yxW0hMe9vs0zK3PyKpQP+YYflXJ6RM1xGLyTzkmuXM5hkxsijb/AFfl4/vbW3f7q1zHxL8e6b4D8H+IfFOsSeXpfh/Sr3WbvPAuRYxHyLDtj7XdS2//AH67Zr6SUeSjGN9Ev8/z0/QuXxP5fkj8oP8Agpv8e4Zn0z4GeHb0JCpsda8Xx9vMPlHRRx2G3VfwOeelfjmRmSUMP3klzIWfn5lxHtzj0w3T178V1PxF8aal8RPGfiHxtq8nm6n4l1W81S7wc/ZjPMfs9h9bS0W3B95Onc8tp8H2i5RP9oHP59u+fxx19q8arN1akqCa0lb05le3rpp+PQ7qCl7KDstb2vdP+lp+j6nZWBt9NtJdQuX2wWyCeQ/30jDgxjr99ioxnOOMdK/oY/4I6fs46pDp9p8VLuxil8a/EW/XRfA+my/8w61vHugdYGO8NlI7HGOGAr8EvBfhC+8d+M/BvgaxO2fW9f06y3d4UkmXzbvrjNvbG4/CUY5HP+gb+wx+z9pHwR+Fmn+MrhN11D4Vh8P+DIP+fHSIEiF3qnTn+2ri4H/gv/A66YKhGKSbrXV1ru7Lp2s2/wDI9PAUPa1PbaXotNvSzWjv6NNdunZH0p4i03SvBmi6J4Q8OXkSaf4atRa3zxf8vl7IIWurpsH/AJaXa3QHsD0rjE1iTUZHs1/49gI/Mb+9ndj8tpH88VW8T31xJeXslud0l3dSxvL/AH3EcGR/wHzPTofrTNAsP7PHlv8A65ykkv4hyv8AM1lTwtorzu/vd+68h5pmP1irOCtaKjFJeUIrp5rf+n3FrerbpBaW331yE6/cO3zePpt/yOO0sIVYB4v9U2Cv/XTnzP1K+355rz9BhjKv+tSSJI/+2md3/oI/zivTbBfsyxRN/rGRHk/4Fkj8cZ7etKtHkpuPZN+t2vW+/fY82mpKCSt13bfXy+/5m9b2+V/Af19x/WtC3b7M+P8Anrj/AMc/E9mNWbO180KfbP5/554/Srgtdkh99p/LP+ew+ori0S7WaT0Xdd1u+12vkdkL8qvvrt6s07STauP+emOR7Z/xrctoO+eu3r+P8/8AJrLsU2bvcx/oW/xrqYei/UfyFefW5vaSta2m97/Ciie3g/p/XJ+vv6dB0rZhjMbJn+IHj2APUfl3P4GqsXT8F/lVmI/vB+P8jXBUvzyvvpt6I3jpFf1vqaEff8P61rxjLgeoYfmpqhaf8tP+Af8As1Xk++v+8v8AMVz3fO13VvTRPT7hnnfxJ0A6p4evofK8zCSzh8f6vy7a4P8A48T9RjvwT8wfBg3fh/wDofiu3l321h4iurTUF/uWcl2yye/Pl/hjI6Zr7i1KGGeznjuMfZ2jZLjP/Pu5VZPyyvt27ivl/wCDWlYuvi38M73odZ1O9sP+vPWI3ez6nn/jxfj0HSvWwtb/AGOrTfwwV3dv3YNpyb/wpuTta9l3NqGtRLve3qz6+029jvY47yPpeWsssPr9lKxG3OeP77/kOuK8y0KzM3xL1WXj5NOtz/30Lj2yTxn/APVV34V3c954Vt7G5I+0aBdy6M46Hy7ZykXbnjdjP8q0tAtyvj7xDcdo7O0U/wDbYXXvz9z64FfPqLoTxkFvGMrb/wAi5Vbd7rTXvsb1NarXmvySf9M5v4x38ltpmk2kZJ+2Xkdu3/AimO/oT1x1BFZfwz0qS4gu3kyPsl4Y16/8sdzH8RkZx05yCKr/ABhuHbXvBenxIZHbV1n6dNsaL198njtjrXqvhPR7bRNISF4jHPcK15Jg/eaWSUpg+3OD0x0746p1Hh8swkrq+IlVjtrf20o7fLXy/HCn/ET8u3WyZNe31vZQz6jMfm2iGMf7m4EY5B6qRhR06r0rzzTI7rxHqFxZW/8Ax6xvFNc9+JPNMX1wEkxj34qt4u1ma/uV03TlM16l3HHawZyJJ5uI5f8Atj5bYz0DgYHNd94T0FdJ09IA4mlkmeS+uO5vmC/aovQeSSijjJ3HotRKDy+gq17vEJvXV72V1obVdJy+X5LtZfgdlptulrAIo84QKnP+xnH86peIbv7Jp8hX/WS/u06jrgN09iM+2fqNdYzHCX9GTp7hv8Mn9evHn+pXEmqa2lnz5EH+lTDuPJA2Dk+rPjtk8da8hU/rNeWv8J8zetn7sZPW/wDVjO7aV+3/AAf6XTY6PwzZ/ZLHDf62XZJJ9TuI/mf881vydvx/pVW3VFiUx/dcCQd+H9Py/wD1Vaj7/h/WnVnz1JPX7Ov+GMV+lvOzMZfE/l+SCPv+H9akooqCQoqxB/H/AMB/rRP/AAf8C/pU83vctv6tcCvUcib1x9R+f+FSUVQHL32lycywnMi5254IyBnI6c4464zwMkmn6dqEjbYJh+8TarD+IFiQp69OOnauiZS5Cjvn29BXK6jpMhkE8MvlzRbjGgAy+du7I6fLgZPozc811U581OFF6KOkZPdXfda21/RdQ/r1Ne9jLqGH8IbI9jjP+f0OeKqW5ZUOcZz+Qxj8xk5+g21hx6/cQN5GoRiOReEbr5mCQxHrj5cdSc5zWvb6lHID5eD03c/Xkfr368ZrRU5U7w0ve/3/ACX4egFm5txtCesE3Hsoj9ehAJPc5HUmvFvG2kWviK8u9Cv7S0vbO60a4tLiC8g863niukEU1o/HyefaeeR6+V1yBXt03+qEg6qy9D2OM89u3PX6VxniCyb7dHdZ/dSQTxsp6s8ph8r6AEMOvrzXRgKro4j2l+/rpyqy6v0X3aGdan7en7PTtr5u/wAun49z/Pb/AOCq37H11+yl+0n4m0/RLYv4C8ZyTeKfBNxHB5FlDpk8kc11ploM/OdOub3bJz8v2hB/FivzUiYyAMJfMcKuV/uZyB9M4P8A3zX90/8AwWx/Zjtfjf8Assap470zTh/wmnwpYeKIJOv/ABJ7VbeLVu/HyLaY+lfwniH7PcTQA4SCQRon9xSWmPr1aVvy+lfpGAr+3w1Kr9p3XldNprb/AIDWqsz4PN8D7DEVIdHy+S1hF79d/wAlbc1Ymzn8Mj86uwfx/wDAf61Rh+7/AJ9TVhPvD8f5GvRjsv8Ah+p81OPLNxXdWfr+hooQM546f1p+5fX+f+FRxgEcjsP5VJsX0/n/AI12U+bkVrdd733f9LyKjzWVrW879xQQenNMk7fj/SngAdBTJO34/wBK1nf2av57bfEKXPZ35babXv8A1cgccZ7DJP8An8KzpDl2x7fyFaLnjHY5z/n8azpBh2A9v5CsqfNyRta2u977sceayta3nfuM7D6n+QpKXsPqf5Ckrir39rK+/u7f4UdML8qvvrt6sji+4P8APYVJUcX3B/nsKkrmh/Fl6r8oFBUkZw659/5Go6kjGXUH3/ka9eHNyRtbbre5hPm5na1tN79kXwCUGB1OR9MVPEdoweP/ANZ9KgBIQY7HA+mOlTxDcOef/wBZ9Kwlze2d7dNr/wAqM/ev0+Lz35f8vxJSQOvFSxMfm2le2d273xjAqIgHqKliQ/NtC9s7t3vjGDXU+bpa3ncfv/3fxJtz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABpe/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABqGVD8u4L3xt3e2c5NHv/3fxD3/AO7+ISsfl3Fe+Nu72znIqBmBVgDyQQOvpS7F9P5/41DMMAAcA7gffp/jR7/938Q9/wDu/iU5OCB3HX9DVWb7v+fUVZHDSgdML/6CarN92T/PrWVe/s3fez2+R0Qvyq++u3qzGueo+rfzFc/fOUilbAIVcnOMY4AznsCx/P8AGta8+8n0f/0Fawp43mcQxZ825lht0I6eXI6ed9eFH6jua8PErR+l/wAYo0gv32HfS876eaWv3/gfSvw80ttOufDtpb/8fs9mtxa98JqQQ3Ge+f3MZyfU565r9bvg1orWWkWOlpHLI0Q+03Hl/wAMkoLfN9SrY+nYdfz48E+E/P8AGvhKZYw9lY+HdPgbGQFuBHx1xwSDjPT+X6ufDTTVtNJhdo/Lndl8ztujTPk/luk/OufC0OdqXf8Ar8lfvtY+u6L/AAx/9JR6ZCsNvZR3JiljDMYWaTB/eLgRbfxLZ/D1FflT/wAFKvi9/wAIz8O7PwJbXpe/8XauW1hefk8P6SbT7UO3WbU7P8scV+p2v6glnZ7zxJDHLKG54gGyGfP4XCce1fzX/tyfECPxx8dNXsrG48/SfB1rB4bsl6mOeH9/e8f7Rkg+uz2rrxseSmo32W/q9Pz0sbUFeol3T6dlc+NtzM9xG8m+ZZc3HT5ZSMgcesHkD6DpXUaHZmF1vfN8p4sDzePkjmDl+v8AeEY7DHrnAPLQE+Yy5I3FADjPrx+OT+Ndkqm3sooVQtJetGluYs/a3uw6w29tbdR/pDXBWQYJ+VDnOBXiUMPzVOa71bV/R2X4W69dez75T537G1lG1rLfms/u11s9PQ/Yn/gkp+ylqH7QHiP4o/EW40w6na+GNJ0jRPAynrdeOvEurT6fo8wwSf8AR1s7o8kf6zpxX9fPi/xiugeIk8EaVxofhjS9E0DR1z/q7bStKs9LaL/gDWIB+tfHH/BND4AQfsn/ALIPga51fTv7I+JPxC0M+JRpcvN3pmn6pEsqXFx1P/ExS4DR+1s/Wvpez0yTxRrcOo3UeLCELvm/573KMzN/3w3/AKFXsQjyRUe3l536/K333Z2zrPLsFGne7qKSa62bbW3/AAD0CxHnLHdT/wAYDJ6erY/MDHX1rQiEdxdLBH/eG78+P69+fyqhq07xQKjddpjXt8keAnp2Y/8A1skVZ8IwzXl9Fa28XnTygzLHH/x9tHbnMht/pvXzPqlRW+H+u6PDpU/bVnSv56P+a0tOz1/XyPQ4bX7LHAnqD+hT/H8sV0lscLn0K/yqKGWyktL7ULGXfNaRG2lsJB/pSSNuVvtPPcofL/3X9a6i0s430iGSQbZpLeFzD/zy3b+vT72Pp8vXtXmne8E6XuNbJfiubuu5vaJdb/LT025H5+p6cf5NdyIN3zeoH+etea6JayRklum5CnT/AGs/0/z09TsG3xhO67f1rzsY9dPL79PxOinHkgo9v68+g2G3wT74/r7n+n1ratk2fjj9Af8AHr+VPWwOBJ14BxjpnnngY6++fSrELlNyDo2B+WR9e/tkda8lv7v+B5aeX/BudMfhX9dS5AfmT6f+y1oJnnGO3XPvVNrfgEEkjPXoTx09P19M9as2ly3zrgE/KCT3PzY44/H9KFo16ry3/r7ii/b5+fOP4emf9qraffX/AHl/mKaE2jcBjeT3Jzg9fbkn/OKcn31/3l/mKlq8+a/bTf7KW4GiBlW/z05/lXgNxby+E/j/AKbfv/x4+O9Hm0eb/r7sxDNY9c9p7kH9etfQULlSAO5P6YH17/lnNeN/GaGawTwd4ltv+Pjw94usLtP+uVwGtZc8ejJznnjj0jDVrVa1N25ZU5U301lTg077pq3yvc2oO1RPtr/Xc3/DMh0f4jeL9G/5c9c0yx8Q22cg/bEnuIb/ANeuLXr6Cu50eGT/AITTxMz/AHJI7GZcf7UM389oPt39+E8W3Ueh+Nfhx4pyBaNLJ4ZvAOMTanHFLAPr88uRnHrx19QgsxHrN62SZHsIoj6bEuJJI+g4/wBY2PbrnmuPFpx9nVassRBrmervGXspabJpRi9f5uiRvVv7R6dY9PJP9P6seN65byeIvi9o0H/LHQ7ae7nx/t+QyeuP9Q3Y45xxXpfivXIdJsQ+/wAtHdpBx1KqO+exOQB1yCc4rl/BMcd54t8ca46byt+NJVh1URowY/8AAjtHbnn2rzz4q6ymqavZ+G7aXfLIy2e3/nnGGj8znIyWyM8ds1108NKVdUd1h6cZtX0vUUKlrLrqu1lfd7b0ub2ael7vXW7133+567mn8PNJfU9T1HxReyb4Zrsx2P8AshTIJz7HmHHbivfrNdiNGPuqQw/4Fnnj6f8A664zw3aLZafawxcxW8EVsuM43woRKM465dT9OnBBrsrWXeGZhxEUQnPQSEnp/wBs/wDOTXLj6/tqsoN6RUIK22kUvO7XyvskctVv2jT3916X20/plLXb9dO0+e4k6Ro8i4OPnQAJn3y/9cGue8J2DG2F1P8A8fV3IbycnvHMcwjHuA/XjnPXFZXia4j1jX7TQID+7t/Mv7s9M+SYjET6n55frXc2sSRJA0Z+WVWOOgGB0x6dOO2PasadP2WFhGzXvPffWTfqlZLR9jnn8T/rojaT+L8P61JVepI+/wCH9a5G7vb/AC2X9feSSUUUUAWIP4/+A/1on/g/4F/Sq9FTy+9zX+VvKwBRRRVARydvx/pUTLuHP+c1M/T8f6Goe5+g/ma1g9PRv/P9QM+XT0nDByfbPPUY6/gD0HHBHOa5a90OS2WSayAMh5+m3kcnpnn2z+FdtJ2/H+lRMm+OQd9px+R/z/WtKWIlCpy72tftayfe6aW2vys2Hfz3/r5HBWuuT2+YrnIl4B6jOCRn9fw4x1OHatfGexZ/9pfbkk5z1yRg9cfyrSurQSFjjgZPrgn8c4z14I4yRgVzeqx/Y7O6k5/49p8ZIPA2A4x9c8ivUpNTnzW3V1t0sr6W10XfRmTtzPo/ReVra/PW3buc1478P6f4y8C6/wCHdUi86y1bRr6xlh6mRL22ltT164aZPTGe9f5qf7UnwruPgx8ffij8OrqPyJPDXjTWrC2hz/q9LFyLuwz/ALy3c3XNf6YOlO0ulxFIxJJc2UsI9owVlk5/2liHtxzxX8L3/BdL4e2vgz9svXNatI/Lj8ZaBpXiQjg5knPkPnp3j5+o6V9Xktbkq1YLpbTTS6i/lrr/AMOfOcRUPaUKc9r7+duvzWumtz8eovuj8OPwq1D97/PoaoW0nmLv55ROv0NWh1H1H86+jw8ueXN35j4/l5PdXSxrDoPoP5UtRRdPwX+VS101f4kvl/6Sjjq/xJfL/wBJQ9CBnPHT+tMl+bbt5xnP449aegBzken9aZL8u3bxnOfwx61vT5uSNrW13vfdjjzWVrW879yEqwBJHQe3QVRkOXbHt/IVeLEggng8HpVGQYdgPb+Qq/f/ALv4j9/+7+IzsPqf5Ckpew+p/kKSvPr39rK+/u7f4UdEL8qvvrt6sji+4P8APYVJUcX3B/nsKkrmh/Fl6r8oFBUkZw659/5Go6kjGXUH3/ka9eHNyRtbbre5hPm5na1tN79kXwCUGB1OR9MVPEdoweP/ANZ9KgBIQY7HA+mOlTxDcOef/wBZ9Kwlze2d7dNr/wAqM/ev0+Lz35f8vxJSQOvFSxMfm2le2d273xjAqIgHqKliQ/NtC9s7t3vjGDXU+bpa3ncfv/3fxJtz+sf/AI//AIUbn9Y//H/8KNj+kf8A4/8A40bH9I//AB//ABpe/wD3fxD3/wC7+Ibn9Y//AB//AAo3P6x/+P8A+FGx/SP/AMf/AMaNj+kf/j/+NHv/AN38Q9/+7+Ibn9Y//H/8KhlY/LuK98bd3tnORU2x/SP/AMf/AMahlQ/LuC98bd3tnOTR7/8Ad/EPf/u/iU5fm27ecZz+OPWoSpAJI4HJ6VNKNu3bxnOe/pjrn1qtJllOecK2Py9vwo9/+7+Ie/8A3fxKkpy5I6cfyFV5fuH/AD2NOBOWz68f5/Kmy/cP+exrixV9b9um2zOiF+VX3129Wc9cdD9T/MU/QbP+0fE2iWTReZE12Lm6P92ztdjT/nvT8sDrUdzwpb0b+ZxW18N7OTVPE+tOpytnp0Mb8g/8fU2Fzz6wMT1POe+K8iq/ctrvJ/8Ak0UvwPQwKbqLTr+sfz289j9NPgbo39sau2oiMxxxRNBa9ebOEbbf8R8/pwRX6SeFYvJs7dP+ecMf/s9fJ/wM0WDS9FtUEZeZyjr/ALP7lC3Hqcj8u1fW9jdRxWqbf3EoP7z/AG8Z2n/gPz/99cdBW2F/gx+f5n1K2XovyPM/jh4yh8IeDPEPiC4k8iPSdJ1K8E3/ADzkihQR57clj+Vfyn+I9dn8Ra7rWvTy+fJrer6hqYn/AOekdzMfL/75CHvjkV+2P/BSD4kNo/w7HhCC9Ed3491eLSdh/jsLNoLi/wD++RNb/nz6V+GhlW4kkkQErPK0qMc5a3CrbwZP1t5P6k1xZnU9oqVHXRrVWurtaetmkddPm5ItWW+vX4v12/pG3oNvG9y3m/dyjnpjMYc/45PbJx0zX3l/wT4/Z01f9rH9rr4ZeAYdO+3eFNG17S/FvxAllyLS1+HXhvWNN1LxV9o5zmSG2tfLzk/u5Oua+H7VBaWMk8i7ohHl1j/4/LrzlNodPtuOPtMV080vHW1QYIOK/rK/4JG/BC+/Zs/ZN1P4p6xpcMnxf/arlW40qOTnVfDHwX0wX+maNqC/9jndNc+KTgdb4fWrw2DceVWsradujv8Ad267Ws0t6N3Uc3Zexs/ylo1r1v66H6uW3jDUfGPjnxNb2pI0pNavNN0qOL/j1j0jS55NNtRb/We1vBJ/uoa920qCDT7MWp/1q8n647fkfX+p8O+HWjJ4V0qF9QmiuNT1cJqd/Nn/AEp7u6aSFhdf7sMEAi9cyfSvVUuJ3dLS36O6t36Nn09s+v4V6bjyPl7frr+pz4vE/XK86/8ANyr05Ixht0fu/edA0Et5Mjt/qoVfGR/HJt2f+gGu/wDC+mCytGuW41CW7tHl/wCnhIfPMNh/29iR+P8ApjVHSbKxhnQTfMxgP2r/AKYHb+6v+v8Ay6Zk/wC/vY10tjDOkcDji382ZLDr/pG8oJ7/AP7fMQ9B/wAscCuLE9fl/wC2noZZg/ejif5tf/AdO2+mn6F7TIhd6tfX7HMrzor/APTv5e8LYY/6c9x/7/V6Coju2hSSPzPJyA2Pub8c/wDAtg/75qlYaZ5EYRv9YcPJ0z84O3+vT8q6mwsDiTAJ4j6D/e/yP0rwKjtUff3fyjpt5dD36lH2tRzS35dvKKWmq7GhZ6dG8TNHIH27cr/cyGxz77SOn8NXrP8AcSsuOpX68bvz69c/hUEEElu/mRuY3BGFPG/r/wCg/wBa6W3jtJU8yWPy52A3t18wjOPy6/8AAvxrjqOTm2rW03vfZHLPCvme620+S9e50OnSb429tnrn+KrM1psjLgEbvmAyO35Y4PXnI9cg1l2SBJDgfKSmO/Rv/riuqtuflAySFx+HH9a4pr35J2vp6Lb/AD+SOSpHkm49rfkmZltJ5ibO4wCf/wBXsMfr1zVh4PJweMvycZ7Y69s89utMu7TY7Pz83IHXpyBjnPoCDg8Hk1PFm4i8kD/aGfQ9FwATnJ9fYVO+nXpr6adu/wCRBpWP3JP94fyq9XPwyG0k8ocZI4BPIGSMZ4P3s4PbI9a3gvmJyOoUnHvzx9D/AJNYz96be233WS62QEiffX/eX+Yrjfinp/8AaHgbVh/z5ol9/wCA7E4/8eFdM0RRS2eQVIPIOPp65IPXoKXUbc6tot9YY/1ttKp/78zHp/wEAdTjrXNH+K3fTnjd9tIL1/A2j8K/rr+hyGs6S/i74WWK2/8Ax+jQrG8sOv8Ax82im6X8/s2Ocex7HqfAviNfEXhLT/EC/futPa7uwP8AoIWyGyuv1t16Hk857DO+HVy58Cac6DmxtZLKPI5FxDdSRJjHfynuD9PTArD8IBfD3irxt4CZhFpt00niXw3GOd1tqEIa/AbGT5d0g74IyeSamcXU9pF6qjOU7doOUXOys1opqVtN32R203Jwja1lprvpvt6mv4IWOy8PXt/IeNQ1XUZ8/UkjJ/OvCfBzTeJ/GOveIbvP2eyuZ7C069EaRZvr92If/W4r13X9QfQPh9fGSIoZYLyMHghlvCFyOOPujj6E+lcl8LbD+zdKtoP+eiQ3P/gQ0h/pXp4Wq6dKtVa/jpwi0+kPcj16bW+82nf2cF1e6V1u13/P9D1uOSKzt4ok6GGJyOxJ3EdOoznvgfLn2uTa1DYWcl1Kf9RBLPDnJPmRr8uOnUuPw98iud1+Tywvurtj6BB/n/OeBsbi58S6kml/8w2yctf+u+Q/6J6Z5in79Pxrmo5cqlJVJaKm5Td30b5uj6p6Hm/1+P8AX9Xv3Pgmymuftmr3I/0nVJ0uScHiMNN5fXth2z+XXkenIGGQMcBev4+lZFnELeKKJSB5a+Xx/cUYTPrx69xnANbCljnofr/9auGvVdWtKatyuyXf3YqPp0JfxR0+7e+m/fTR+Q8Z74/DNLUT54zjv0z7UJ1/D+orHXsvv/4BEt+vTffZb+ZZj7/h/WpKYnT8f6Cn1lP4n8vyRIUUUVIBRRRQBHJ2/H+lR1JJ2/H+lR1tD4V8/wA2AUVHJ2/H+lEff8P61Kl+8krdvyuBzFx/x8S/Uf1rD1q3+1WTwqD5sgMceP8AaBJ/9BFa2pyFNRn+YLmODrjnAf1+tUstNkMwaLaySdMfPgDpxk4I59wOa9jDSuorbRv73tt5/wBMyfxbafhsuv8AXz2OF8FXfnaZ5PP2iHUri0PoPIubZfQ5Pzc/pzX8d3/Bw5awW/7Rfw/eP/XS/D6Lz/8AgGr3Oz/0J/8AOK/sTsLT7BrWp2f/ACxnjCK390TJOzfiQoOOxHQ4r+LD/g4B8X2+rftb6fpMFx550DwRoFrIuD+7Mzy7fT732dsc/wAPPv8AU5F/vVdq1nGPTXSKs9ut3v2+7weIP90pecnv6tL8kfhdYf6uX/r4l/8AZa0o+/4f1rJsuVkP964c/Xla2E+6Px/ma+qp/wAV+j/I+Le/yj/6Si1B/H/wH+tWf4H+gqtB/H/wH+tWK1q/xJfL/wBJRx1Hao36f+kokQgIueOKjl+bbt5xnP449aegBzken9aZL8u3bxnOfwx61vT5uSNrW13v3YJysrctvn00ISpAJI4HJ6VRkOXbHt/IVeLEggng8HpVGQYdgPb+Qq/f/u/iP3/7v4jOw+p/kKSl7D6n+QpK8+vf2sr7+7t/hR0Qvyq++u3qyOL7g/z2FSVHF9wf57CpK5ofxZeq/KBQVJGcOuff+RqOpIxl1B9/5GvXhzckbW263uYT5uZ2tbTe/ZF8AlBgdTkfTFTxHaMHj/8AWfSoASEGOxwPpjpU8Q3Dnn/9Z9Kwlze2d7dNr/yoz96/T4vPfl/y/ElJA68VLEx+baV7Z3bvfGMCoiAeoqWJD820L2zu3e+MYNdT5ulredx+/wD3fxJtz+sf/j/+FG5/WP8A8f8A8KNj+kf/AI//AI0bH9I//H/8aXv/AN38Q9/+7+Ibn9Y//H/8KNz+sf8A4/8A4UbH9I//AB//ABo2P6R/+P8A+NHv/wB38Q9/+7+Ibn9Y/wDx/wDwqGVj8u4r3xt3e2c5FTbH9I//AB//ABqGVD8u4L3xt3e2c5NHv/3fxD3/AO7+JWcg4xz1/pVSf+D/AIF/Sr2AAcDsf5Vnzfe/z6CuWpfnlffTb0REk93b5X6WX6lWTt+P9Kp3H3B+P8qvP90/h/MVjXnVPq/81rln8T+X5I6aX8OPz/8ASmYF7J5Mck+M+X/7Nv8A8K9w/ZY0b+2dSeU8xyXzSScEcxlzz6cnoPbGea8A1t9mn3RP3Qgz+nT/AD/OvtX9k20tINJtryP78jKjYz1Pm4Bz6biPwHHFeXjfip/4v1pn0mRL35vzf5Jn6oeAovI0+2C/6pCEj/4Bwfxzj6/SvTNS1ExwKUuPIkhjkm/3oBsguPToJ0+mRxXi/h+6+zackM/+qVzKv8/X/PrT/H3jm38JfD7xZ481H/kHeFfD2pa0n/Xazh+y2/8A5NX0HX8ffup1+SnUi1tCH4xi/wA/n2PZe79X+Z+HP7dXxEHjj45anplrcefpPgi0i8N2X+xOmJ77/votb9fT05r47tIPPmRRF5m10y3/ADzySR/31j/x38DNrGpXeu6tq2t6l/yFNZ1K81DVj/1EbuZrl+T3FvPac9Pqc1p6dA8FtczRZ817YhQOf3Qli35HPUAY/wA48KlLnrOXVt767PT9H5dDeleytbrv3u+3ld7nv37PXwpX47/Hj4a/Ci8vTa+HtZ8Q6fP441M/8wT4eaTKmr+M9WIz0tNFsJ29z1z2/uQ+FuiTa/pVrr95Yf2Vp32a1GkaVx/xKdE0uH+ytJ0n/txsdNgX/gR9K/mN/wCCO3wabx78QfH/AMQpbOe7uNQtofA+jNH9yLT9Ua5l8RmXH/PQaTpWP+ubZNf1oa4NL8DeDIrSDybf7PZwRwJH98xw2y26+b3JBjbHHdq+ietDDdX717ec2Otfkfdp7fK35I8j1LxVHdeI1tIf9Xazoif8A3A9OP4e1fRXw4exOn6x4m1D54dNik2wf89nkDhf++TH/wCPV8V/DiKfX9Uvb+S5z52oyxQL/eEzuHH/AI6nHWvq/W7pPDnhW30C3XEkZe+uoP8An5kj8s20n1tzJKf+2p74roxX/tkfxgc+Dw7nW5trtNfcte39eh6fptrDqUEIt2+zGYDU7vB/4945CWtY/wDt4CTY7fu/WvWdIeS8W3mK+VEB5MUB/h8oANJ0587Knr/D2rzLwDYTyeGLPV3fF3djzLicf8vKP/qIs/8ATv8AvR/21r1PS38pSk8ezydmxv7/ANpLZOP9nyx+fWvAxPwy/wC3vzR9nhMLpHovP1/rbyszu7KPYxH97b+m4Z/X2/WuttYfJUn/AJ6Y4/3c9/8AgX+ecctotvG8vlJ/Btc/9tA2O3+ycdP1rfkug90tmBgKcdzwcfyxwPrzXgVub2krWtpvf+VHq8vI+W97dd99eh1Vom8Pz0I/UH2PpVhoOV5z19/T2H86Za/uUWLpnGfT+Z6HjvWqqbQD/e/p/wDr9TXHNXk7u0tL2v2X6fqUlfpp6dUl/wAP6X+T7FfKJPPOPywf6nP5cCuht2y2cYwV/Hkn09ax7Tq/0H8zWq5/df8AAj/7JXJVsptJdvyRzVcOpVJSvq7dL68qW2iX4m4sJuIiQPu5z64YkexPTsQenWsopLZyeYoyucH6Dpnv3OD256E06yu5LbKoMrJ97227sHPY/Mefw75Gq0VvfIRn5lB9ON2OCO/TBJBHp05zu12stnrf5/1oedVwv7yVpb8r202Wiu7/AD9bdnUuYWvbbzLbmYZPTgg446d8dW6DsOapaZqmJfsl0B50ZCnPGd27rjqSVHQcck5FWrZ/sc0kc/3VKhAMnPXcRjOOijtxznIxWdr+lXE8B1DT+ZoQ0ufUDBBwOOoY9Se574Pac7dK6Vn6bq6W+vxaK2nTzy+q/wB5+ei8vO2+m6OueC3bJySrr82c8DbweeP04xXH3d43h+/hnuY9+lXfmWzPz+7kYKsTds53vj6cE4qx4c8QW+r2z+bgXtqY47rIHBbzBHgnp/q5Dgc9x7dJd2Vnq1nNaXC+dFIpQwc5MjcRyDI/5ZHOPUt27Yxj7Kcoyu0pK/ezUL2t6/jchx5Hy6u1t/PX/gGD4JiVbDWNKllDwi5muIV5OwXe94xjPJPk469jnsRwPiy5mgXw/wCPbPi68KatPo+vgdR4b1GS1S66ntLZWgGepz2Azc8K3Nz4R8YSeH9Vbzor2CcWc/8AejBXdGO/7pZYwOx35PStLU5I9N8U3HhzU+dI8X6fNpsH/X24PkcZ65kfHOATn2qpR9niZVFtXjCSe6lHlUZqyVnor+baZtQvzPe91a3R2/B6O1tdDivj5eRnwdpnkf6nXNYsGbHeefYz+xxF5HvxWl4HP2fTok4/cMIP+/SA59CcP7DivMfH0k03h3wp4f1PH2/wt40jsW/69bVW+xn1x5YYfQceldha6nBpOjIMfKFnuj65kbgdv7h/GvceFawOGocqXvVNVppOpNxl6OLT+fU9OS/delvl73+TL3jzXpYltbW0Xzry7ufIsoefmnYxqsvU8QgnHHG6ux8CaLDolgkET+dLLM099Of49QkKtcxDrnyTt9/mFePeDxJ4j1oaze/6lJGWx/Mib/0GHn1r6Us4xHGhTkHPT2H/ANkAD+lcuPbwlL2C3hHTs20pX9Neuttuh48/ify/JGvGRz+FS+b5fU43fXt9PrVdZTGvTO4D9Pft1PY/hVZ5MsSeSeuOn0/D/PNeJSlzwTfVt/Pmb29fU55/E/l+SLskvmYwc7c+vfHr9KIj+8H4/wAjVINnpmtOz/i/3VqJ8yk0krK1r37IWnnf+vIvVcbOyPPq+PpkdffOfwxUCdPx/oKfWE/i9H28rfqIKsQfx/8AAf61XoqWrqwFif8Ag/4F/Sq9FFCVlYAqOTt+P9KkqOTt+P8ASm/nutvX+r+QFeTt+P8AShGxkepX9M/40Sdvx/pRH3/D+taQvyra3nfm07+enyA5TXmMV6pxxIhHoPlC4wcerH17cVyUt3Jp90GGfIm4m+ibdmM85+dvx/Ku68QQebHbNnHltJ6/x+Vn68L7fUVxuuWf22KWJf8AWxxeZH2ztA3fyXFerg17sdb2jK+m/vafPr8jkxPkvN/+SJfi3br0MXVZo4Xt9U83ZaIXafPBJVoXQYzn/lm5J7k+tf55n/BUX4pf8LT/AGz/AIz63HJ5lvp3iq+0CE9l/spYEfP18xPrj8R/cv8AtMfE+X4Zfs7fFDx3FJLHqHhDwvq9/beV0N4LZ7O3zj/r4f8AM1/m7+LfEF54q8YeJPEV480k+ra7ql3cGXteXF19rudoxx/x8RA9jwfr93kuEtGeJ6SXf+W0fzWurPkM7xbdGlhlvF79uZqX4c2hHaptRT/eI/Q//XrUT7o/H+ZrOh6L9R/IVop90fj/ADNevhneV/8AFf72eE1b7k/vSf6lqD+P/gP9asVXg/j/AOA/1qz/AAP9BXTV/iS+X/pKOOor1GvT/wBJQ5CBnPHT+tMl+bbt5xnP449akQAouR2qOX5du3jOc/hj1renzckbWtrvfuwXMkrctvn11ISpAJI4HJ6VRkOXbHt/IVeLEggng8HpVGQYdgPb+Qq/f/u/iP3/AO7+IzsPqf5Ckpew+p/kKSvPr39rK+/u7f4UdEL8qvvrt6sji+4P89hUlRxfcH+ewqSuaH8WXqvygUFSRnDrn3/kajqSMZdQff8Aka9eHNyRtbbre5hPm5na1tN79kXwCUGB1OR9MVPEdoweP/1n0qAEhBjscD6Y6VPENw55/wD1n0rCXN7Z3t02v/KjP3r9Pi89+X/L8SUkDrxUsTH5tpXtndu98YwKiIB6ipYkPzbQvbO7d74xg11Pm6Wt53H7/wDd/Em3P6x/+P8A+FG5/WP/AMf/AMKNj+kf/j/+NGx/SP8A8f8A8aXv/wB38Q9/+7+Ibn9Y/wDx/wDwo3P6x/8Aj/8AhRsf0j/8f/xo2P6R/wDj/wDjR7/938Q9/wDu/iQysfl3Fe+Nu72znIqHcvr/AD/wqaVD8u4L3xt3e2c5NU5fl27eM5z+GPWj3/7v4h7/APd/EdIQRxzw38qy5vvf59BV8ElWzz1/lVCb73+fQVy1L88r76beiOiF+VX3129WV3+6fw/mKwtQ6x/WT+aVty/cP+exrnLnqPq38xXPf3/67Gsd4+svyRyniOYxabeKv3pICoOOh823HPI/ve/5ZB+zv2XNXuILz+x7kDyQxbgjo8SEfoAevv8AT4y8R86dOM4JaMj8CP8AEV9S/s/hbXxhpY83y5JfD5kCj/lokUsBkOeeQHXuByR0Ar5/HP8A2qnb+aH4cv8An5/lb6nIqCqUpS7p/hZdvTy72Vz9PdZ1O6EelaVYf6+9MFrb9f8AVylRP+gT/Oa+aP8Agop41Twh8FdA+H+my7NR8aazaaLeL/z0tLGFbm9x06GaPuMbuT0r6Q8Ej/hJPHF3qn2b/QPDFpcXtrJ/09vFbW+ePT/9Vfk3/wAFFfH0Pib4z2/hqyl32PgrRItOC/3L+/EU+ofn5Nv+RHHf0cT/AAIf4D06UXCbj2b1+9/hc+BbWRrgwEx+X9phSWF/79sss1rHnHX5oH5BP3vTAHSzyyQ28cUUZeSJkmjAPAnjHlwgnAByZuenPrWVpUJ3o/rh+npu/wAj6jp1r6B/Zv8AhZd/HH9oH4X/AAvtbf7VH4l8X6TbX8GD8+mW063d71H8IgTnp19hXmYGhz1uZu2re19mrb2S1jff5k4j+NK2m3TT4V6Lz+8/q+/4I9/AaX4Wfs9+F9S1yz3614uku/Etww6JDfYktccdw8vPoPrX2x+0J4zeK9j8Oxn5C0MZT+6JiAo/HB6+mPWu58IxaR8P7yx8HaVb/ZbLQdEthaw/3Et7VbXv72vP596+WNc1OXxz8QtQlMfnl70W8UPTzHDuB/3yQPpu96+nwdF0a9ep2jB/PkjbT19F52sbU3LkVrdd733f9eh9QfCDwjY2XhoXdzzHbCe8f/roV3RfXkN/kVSOp3viS8mupj+7S6MEeOnlxsVUdPQDr1H6XPGmunwT8MbTw6n+i6/qLR2z2w6iCQRgce4c/hWP4GnhggSJo9j+TbRyN/fkUSlvfgt69+lRWqe1jz97/hzL9Ejtw17q9t+m28T7r+HUcB0OwgaPzGjRQ2OxYf1212dxaR210rxx7N5wffBx+m7r61xPwqjjkso2j7eXn2z5mO/17cema9O1WD/SY/8Ae/8Aie+P6f1FfN4z4pf10Z9HQf7qHp+rO00rTvstot//AHlH6fp/Fj8Km06GM3txfN951G3r23lj+GR64rrtCsUudDWFs7nRAgHrhsjgfTv+dcxrdrPotnJN/AHXH0Gen/fXoePTjPiScuaVrbve9zpp/H80/vjTv/XqaNpNIZCzfdkchPopOf1I6+3au1tYMx555A7H39D/AJ/nyWimPUIILlOu0b/xBxz+f+Rx08D+XOo9CAOvb+vNc1RPmlzWT026rTv57eeh1T+JOT0stOvwr9U9flttoeX5fzD8c5Ht3z61fs7gzeYv/PPZ/wCPb/8A4n8OlU7iTeB7Bv1A/wAKz1k2SfUj9P8A9dck/idtVpr8lcxnG91t+Pb+vmdWOo+o/nVwNhRnPf8AnVLT5fMRx/dCDPsd2Onpj/PU6IUkFv7mP/HuOPyrjqP37W2ae/8Ad/q5k3a0Wtn333/zKs7RvGY2i8xn4QkcoR3HXqSvbt1xkFImni8tGl3xIwVlHPlBzgc5GOh4JwMfQ02V9xx/dz+v/wCqqkxw0behbj8VP9K2p/CtNfv8t+9jOVLmnvbbzton9+l/U5fxXod5o98vi7w5+8vbf57uDqJrdtpc4xj5QsnPbd6gkdDaXg8V6RBq/h2cWeoQK+Y+DsuGA+0RHPaZowBnONp+o07bUFQMrIZIQNsmcDAOQBxknOWH4c+tcldeH5bLUhr/AIMmij1CUlr7TrrIstTjXaUWTBH+kW4eb7KByDcSdcEgae19UtJPZrqpK+/Xyvo9xLDro+murWvlZ727rr1MjU9Wi8Qh9L1KD+yPFWhypfwRf8/SRtm4kHoMJEcdPmGOpFXvHVg3jDwVFqNnJ9n1axUX1re8/u5rYIXj7/68xoDzyV6jNXde0vTPiBp5s54hpfiTT1ae0+2D/TrK5IHmEDJzbTPFH5JGeEdgOoPmng7xhe+HdbvfAPjTzVv7iBja30n3NRil3oTHjtCPLBPPE649a6KevsbJ88Jp8t3tK11G28ZW93pzK2ysaUMNea87dvL13166nz/4m+J1t4r1TwpBeL9h8U22qfZNYg/6CKWcapZS5/2P9KPr+998BmqeJLnXtUs9Csm+zs8Ia9bj91HbSuVj/wC2++Tv/BXiv7QbHwF8WvDV0Y/Lsrye/s0PXdb3cVvcz/iPskP5+9X/AIbX11PZS+KbzPma3u1G3/68DNcwWf6QSfljjpX31HBxWDo10tJR91LX4Wtl2TVklolZJWR34nC/7On1s9dur+V+7/4B90eAvKxB9nTyYUjEQh/uyRqwlk/7akqf+A4r3mH/AFMf/Av6V84fCC++3wCfnkn+Z/wr6Wh/1D/Vv5mvheIHevzecVb0jGP6nyc4clScPRffyszr6fyYx0+bd19sZ/Q5J7D3IIy477lPT5jweOSOx5x/eBPB54NS69DJLbEx/wACPn/gWMdemCufrx3rzuGWWJ035OC+OfXAP49MfrjpUYei5UoNNrTZW8uj9benkzI9CGo7Z1H9/wB8cDrxg4ABOOecEnPSuwsJfMTvwB19CeP8MZPT3rx+K++1XMUHPXHXPp3x19+/f39b0pPLgCf3QB/L/I/ma58VFwXK9042vq0mu6/rTTcfRP5fdb/M2U6fj/QU+oOw+p/kKSvKm/eej6dPJf5/gxFiiq9FTfyf3en+f4MCxRT2zsTp1fH5jr75z+GKZTTv97/B2AKjk7fj/SpKjk7fj/Sh/Pdbev8AV/ICOo5O34/0qSitYX5F6dV+YHPa4hNkZc/6phkdzuIPH02/r+I5C8cSwg9d4Xn/AHQQOw65z7dMV6Jfx+bayx5xuHP0wc+2cHivMZv3LPbdNxbP1Unseejf/qr08G3ou3Mvlo/zb6szra036p/+TR69/wCup+Xf/BUTVf8AhG/2TfjVdH/l88JX1if+25iH6D6/nX+fMT8zexP+Nf6J/wDwUk8AN8Tf2P8A44+GYf8Aj6tfCV5q0XX7lhh5/rwU+oJr/O91C0Wzv5oE6QSNbN/10tyqP+pBPJ5yBwK/RMta+pU1u9U/L3m/v2v6nwWb3+sT7Wh3/kgaFmflH/Af5mthPuj8f5mse0+83/bL+RrV7J9T/OvSpfxF/h/RHjr9X+bLsH8f/Af61Z/gf6CoYun4L/Kpv4H+grar/El8v/SUc07+1dt9N/8ACh6EBFzxxUcvzbdvOM5/HHrUiAFFyO1Ry/Lt28Zzn8Metb0+bkja1td792Jc1l8Oy7kJUgEkcDk9KoyHLtj2/kKvFiQQTweD0qjIMOwHt/IVfv8A938R+/8A3fxGdh9T/IUlL2H1P8hSV59e/tZX393b/CjohflV99dvVkcX3B/nsKkqOL7g/wA9hUlc0P4svVflAoKkjOHXPv8AyNR1JGMuoPv/ACNevDm5I2tt1vcwnzczta2m9+yL4BKDA6nI+mKniO0YPH/6z6VACQgx2OB9MdKniG4c8/8A6z6VhLm9s726bX/lRn71+nxee/L/AJfiSkgdeKliY/NtK9s7t3vjGBURAPUVLEh+baF7Z3bvfGMGup83S1vO4/f/ALv4k25/WP8A8f8A8KNz+sf/AI//AIUbH9I//H/8aNj+kf8A4/8A40vf/u/iHv8A938Q3P6x/wDj/wDhRuf1j/8AH/8ACjY/pH/4/wD41DKh+XcF7427vbOcmj3/AO7+Ie//AHfxCVj8u4r3xt3e2c5FU5fm27ecZz+OPWpti+n8/wDGkZQFYgcgEjr6Ue//AHfxD3/7v4lJgQDkdj/KqB6n6n+dW5OoPc9T+QqrN93/AD6isq9/Zu+9nt8johflV99dvVlW5+6Px/ka5a5yW2D+IHPGejDjr3z6Gtq5PzAe7fzH+Fctq95FZ27yyffH+o5x+/wBH0Oerehx17V5Va/J81b8zSlD21R0u7iuvdS7r8zDu473VJm0mwjEk4iml3c5RIjGX4G7PB4JxkY7CvpT4Sajb2WveH5lkLt/Zl5YSKR9y4CwTLn/AHjbNz1OM1Q8OeDx4W+G91qOoHHiXX7WSWXk5FndBmhyfQKzcdMjp6c/8OYJr3xb4e0mwi8wzzRaexH8IeQef+JwM+hxn28Ktd1aO796N+v2lv8Ap5H3OU4b6phm+ydtVZu7v99tj9kfhFJBoPwu1LxlfyeXcarb6n4huOvNosTsfyNgvvzk8mv5u/ij4uuvHvjzxf4vu5N7eJPEOpata/7OnyTfZbX8xaSenT8a/ez9q/xjL8K/2W9WstP/AHF3Npsfh62x/H/aMaLdnj+7ti/Ov51onYvBC0vmSJHbiTGflkzIzcHr97j8hxXVmF/Z0bXTUfn9k6KdSVWPOrWbe9+7OusoooNOkVpdk17AtpaKeQ9zJLEU646bWwD3PXnNf0A/8EGvgMPGvxv8cfGDUrMyWfgDQp9I8PyY6eK9SEglOcc7odMOfdc5Nfz6yyz3F5Y2sByUljRUx96cq0tv65w0D56cHAB6D+4X/giL8Hrn4bfsb6bruqW/ka34813VfFuoN/z0g1A+TZY/3BDP0H8dXS0wmLe16lG3yVK/9etyY4dzrOT62ei8kr7b6fj2PXviv4pi0D4s+ILNZdjS6KfscfrFLCA44x0nM3865n4LeH59S1i0vmj2Fbh55D/z2EvnMv8A3zsOOeN34Vw/7S5+x/G1gf44kbv/ABbT6+/9eK9y/Z+iktLFtX8uOSGKWczNL/ACRsxj+9h8/QfWvoZT+r4enLf21KC06NRit/kvuOuOF/fPt7vp8Kf9ddPW2H+0r47gX4u+CtDe3EC2PhO1SVv+epkkAH/fPlH/AL6rQ8Na/Gby3tYf9VOw2f8AAcE/+hD8+9fOn7VGrf2l8crO9t5d6Q6VbNstv4CNn3+P4sHb/umvRvhfYar4maG+sXliltracCeX+BzHujiX/rt5LA/7gFQoezwyj5Sf3u/66eR7GHwvvfjfr/lp6/rf9dPhJIbfQoB/z1EWPoof/wCK7163eJ5gRz2Pv3IPH+f61+ef7Mnxqj1mzvtC1pvsusaNq1xptzCeyI8qQydf+WvlufoK+8rS7jv4baKKTeskoP0yV/mc/TGOM183j7+0na+0baafAvl2/A9uMHCKj2/XX9T3fwnORZQqDggKD69+v6Y7E+vbU8S6VHf2U8LnLGN9meT0X/63+eBDaaRcw6Ir23+sSKNhnqeD+PB9OPT35Sy8XbbmXS9Q/wBYpVV/8e3e/ZeK+Wm74mfXe1tr6dvLT8wh8b82v/bLfk/L5l3wfaSWVlJaOPlWQBfxMmf6f0rsbm2uIITcW8vlukbsUzy4wCPyx2JxnnvjHsruzE5Ef8ewnH449B3Jrvo0t54UGf8AWKfTHbgj6YIA75wQRxnX/iS+T220j21S3103XYK91Ue+qjffX3Y69ttNfu2PKLfxRbyxyW1zL9kuEmVSc/8AHxu3j2+4Vz/wOt5ZRNJ5oGV2xlW7n72eOnv9DWV408LpLYXcsEe+dUlMbD+DAy354X8uB6edfDPxS4u30O9like3cIFl42BjIGx9Qgz67R079UKHPh4S3eqav2e3lsreujVzrhrho7vSV/8AwJf16nvtpdhwFP8ADtGc9Mk4znsP0A6em0jl4pAf4dmPxP59u/TtWHHZW5RpPtMMBJ3BYukmSchv9zjBJ5yeoqMTyWzMrrlSRscg/Ntzn0PG5evrXBy8jceikrfOz02XWz2V3p1RwyV5O3l59vLe1/uvY1j1P1P86q3Exi2YON27t6bfY+tVvtxbpxj265+oNPW63BgecjGfTOc9AKmWrv3t+SCMHo2tO3/DroV5rkshB5/z9B/nNVHSSNI3jjkkJ3E+V/Djbjd9ecH0GKiv4ZQoaPhySe3P3eOeMf8A6uc1TivWhQRarJdQ28nEU1t9yOQcDzfqxXbjn7/bitqfwq6vvbf+bbRPv+PodUPhXz/Nhd6ksT2nmwf6Ss4+xrc85k43eX9MR7z3+U9uPO/H3htPiDo15aXqR6N4o0yWe50/UY/4JZBG0JY5ycm3Xvxg8nJrpfFPh7WfEOlS29tfbLgnzLO56vKRzFvx0IwAP941863vxB8VeC7ie18exR2lvZxNCmpy/wDLZVwsZX02DbnnjcPevXy3DqpODuk7q3dO61te+q3urPpqjooP3u3p8/Tb/I/P/wDaE8W+JdaOk+CPG6iDxppniTT4PDWudtXIlCyx8f8APK1iHH/Tc9cV9I2bQ6T4cUeR9mWGzVbSId7XyU2y/wDbS5+1H8K+WP2itV0/xN8Vvhh4hS4i1DHiyxEc8Wf3aTqm3d67vK46/dNe1eMdRFholyol3rI8oC/3PMdcj/gXf/dr7fEQ5FlEFsoVdOn8aXy7nfif4EfSX/pTPt79nOSSfRILlvuzytt/4CXz/wChCvrmBsRL6ZbP518jfs8v5PhzShz81lav0/vLMQO2Rnn+ua+qFu9qxejF89MDGMA8Zzkk9uvevzzNP94xKt9vT8f6/pHweM/3mr6x/wDSImhMqzfLyNuR7Hdj3z0HqK4PWIDp7Szfe3q4/LByOPf9R1HXuVKFS8nqm049znGO4wOB6c8Zryf4jarHEv2SL/W3bCNDzngqp4JA43DoMY688VwYa+mj0c91ory9NP8APtc5vl0T+9Jlzw1H9rkSXrtkyB0zlv8A6x5445yOte128ixwoG449+vU9AfUV5l4N0z7Dp9vE4/eBEkfPbzMlTx0OQccjIB616EJC4Cn+EfzJ/Tjj+dRjtZN+av8kkvLq3bS3XzDR+0x+v8AP/4mpI5Vkzt7Yz1759QPSqcH8f8AwH+tWK8uPNZbW873/r9CpJJta/f/AMAsVJH3/D+tV4+/4f1qSqaurbfj/kSWKKr1JH3/AA/rWLVnbfz+7/MAk7fj/So6kk7fj/So61h8K+f5sAooqOTt+P8ASqASYfupD3Eb/qpz+led6hB5tq0n/PGQ/wDj+3/4nHHPP1rv3Tejr6o38ulcCspMskWcmGVh+DMQOw7L6n8K6sLfnXfmXXzivIxrK8fT/Nf1/wAE+avj/pi3Xw88XwXEfmWOqeHNZ0259pLrT5vs/Udykv4etf5sfxQ09tJ+IXizSzHsTTfEWs2UXqY4dRmxz7bv1r/T0+IOlRa54b1bRp/9XqVtJbDj/lrJbTKmPfk/5xX+bP8Ati+B5vh3+0t8XPDE4O+38Z6tdA9QY7u4LJj6BCK+/wAjb9lr/L+sd/O+3kfFZ1fmh6/+2o8DtOg+kf8AWtdPuj8f5msfT+kv/bP/ANBataPv+H9a9rD/ABfOp/6Uzxanxv0h/wCkRLkH8f8AwH+tWf4H+gqtB/H/AMB/rViumr/El8v/AElHDUdqjfp/6SiRCAi544qOX5tu3nGc/jj1p6AHOR6f1pkvy7dvGc5/DHrW9Pm5I2tbXe/dgnKyty2+fTQhKkAkjgcnpVGQ5dse38hV4sSCCeDwelUZBh2A9v5Cr9/+7+I/f/u/iM7D6n+QpKXsPqf5Ckrz69/ayvv7u3+FHRC/Kr767erP/9k=', 17)
INSERT [dbo].[ProyectoTableEvidencias] ([IdEvidencia], [IdTipo], [Data], [IdTarea]) VALUES (3, 1, N'data:image/png;base64,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+a/wP5421p19pQ//871PPLd56mIltm8LIfS1vfibJ3eq5Xfg/Cu9+M0lVYfARZw6X4lvNT+tl8VitdgW/k84b14bu/6p72LTO70515Oea3nbxbjx5g/wNzt34p6NFfia+r/U4/YzJ3Bu6pzrNlPbO/B/PRjClx8M4+rxFB7o+D4eDN2LWOUVxH/zJk7ceATP/HAvnnh8G26b+C0u/zlyrkfudr1tmRD9/z7zECo23oPHH388U365WeWueytQve12HD8xq/ozu7/jqe36GtwPVWzCPQ+pPlLr1a5L6Ot7e/XRJ5+412/svXM4r+rQrOrwpLTN9V/jt+kovvPI7Yib9XBsz7BxPXCnsoj3b9yPJ76vtvnQvZj9rWqX6gbsDV/Fmcq97u1pu0a403XDV3ub5Vre8SAunCrDt575oTHe77mOXx8eNMoSmFHtcgNf3/V9vezBP7+M/r6f4r1Psuta4+nBTardVb/a+0mu13/b+FGXehMREREREREROQs8tvPbOamDlZs349wHH5iPDPdt2TLnucXy0ZXL5l+0UuhJqY4QersGzWfWNvl1QEdzCF0+9b0V2iVd14KOmnF09Z40n6FiSfZ1a08M423GfQfWmrU6HtZ6vxERERERERHR4uHkOznSWcD7GxAKBJBOJ5Ho75xzc8Nb0a3QLjLh/kKzcZPLtFyCo++IvgQILZxkusfQV+BNXFe+W2U8dITi6FojfUZERERERERES4eT70REREREREREREREJcYbrhIRERERERERERERlRgn34mIiIiIiIiIiIiISoyT70REREREREREREREJcbJdyIiIiIiIiIiIiKiEuPkOxERERERERERERFRiXHynYiIiIiIiIiIiIioxDj5TkRERERERERERERUYpx8JyIiIiIiIiIiIiIqMU6+ExERERERERERERGVGCffiYiIiIiIiIiIiIhKjJPvREREREREREREREQlxsl3IiIiIiIiIiIiIqIS4+Q7EREREREREREREVGJcfKdiIiIiIiIiIiIiKjEOPlORERERERERERERFRinHwnIiIiIiIiIiIiIiqx2yo3b4b9HxERERERERERERERLUxgxzceTZt/u7pvyxac++AD89Hi+ujKZfMvIiIiIiIiIiIiIqLViZedISIiIiIiIiIiIiIqMU6+ExERERERERERERGVGCffiYiI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OA+oS611zWrvZSPH7FydPqffMU15cJebw52/zAWvZOHNF3W5Wotc+de7aT/fdKrX3YtvCalL9yJVhSzroPNl7KeOeTN+KGPhrnGt9+w6Uq/re0AHtE+/du3wy0O+9ZdL/7ta+yvP9tJ32r8NDi34lW+5OPei9cpDdrm4/174td2+wR8a24TXftfe/jtEWn5izLsc19SW/MZIvzZ4I2pOp5DJkeoN63E1a9E737wb6sGzLbkWATX1FUlHxaqfIuqRv9BpMfUxn3R69iPXMf3S4rSpnOqoUOOZod+aylp4pdM5j5v064sH3rbqyCcPwjd/QWOPIZ1+ZZ24x7+/Z9ffndinhbQN94KrHOukDDjWTdaxzuFVh0HpzLfenf380uK1sH3cXpTatE0/d/XD0X3wA8zqLdxtboiIiIjyxcl3mpD0BY26uD3n+vBMNNmxXRNNPuy35OY34Ug0menJ63WxjOCAqYD9lYiIiCYC3naGJgyZ4JCfoep/cv/IoMWTiCYBtmuiyYf9lvzo220cr8YsZ7FJoklKIuZrnvnAHus8bhs0FSxcj2nHs26LQ0RERDTOGPlORERERERERERERFRgnHyfAiRihYiIiIiIiILJAq1ERERE44GT70REREREREREREREBcZ7vhMRERERERERERERFRgn34mIiIiIiIiIiIiICoyT70REREREREREREREBcbJdyIiIiIiIiIiIiKiAuOCqzRppMp/gNon5yOx/TkMRSL2q5NHyUNvoaaxGqnUe7jgkYdc8le68gPMjR323N8k7H6UKVXeguqWF1FaZpXhUEcr+s+c0Y+L2T7Hq/4KmYdUSpXVBlVWruMMn3se5w522M+mplTdNixqeVg/Hj7WinPvn0n3ffdrfoLGiTDc7TY1qI4bB6LYYUyHKEZainHMycDdBkQq1YfrnVvS40dYt7M85dxV2KLbEfs7+7uX29k+w5D32lm9japf3r50jqq/DlVuSSs9qVQdZq76KebVqDLN3qbaYu09wfVMREREROOPke93AJlQq1nZYj+bvCLJn+Pcqxsn7WTN8Ptr0LO9Eckr9gtZcsnf0MEHffc3CbsfZZq+oB2IP6XrUf65J86K2T7Hq/4KmYdIpAN9+3frCTinvBJX2jGvLuP73gmhkGNk5MxGnOx4L2PSTfr+uWN9GOpoCJwYCRon8iWTNdUtzbjaYdXBqd0b1asjk8AmhU6LCHvMyfI+5pdOyXf/uT4k9jXo/Pfs3wmsWI/S1Nj6QzHqKBfSrqINKj9HTuvn7O/s717CHvN29Xd5r72dE++ioqUdw0etzxnxo8Dclh/aW6An3mf1bklvizY9bm9RTu/ArYaxjylEREREVHiMfJ8iSuq2oWrFMpREIuridxcuHngdw+qxOyrLkVIXx6dyiEbLiL6RKL14n7ogeA6JpHquLoyqW9rSkTnJjucwkHhcR77NQD9uYh4QfwFDZS+ifHY/kvtX6/1MnDzcrfa/fvwQ0NCGGeoYklaJRppXI+nIL3oq3zzI6xKpFWsAbqqLxZIyidjqy0h/dlTSdfXa1V1WmvyO6RZt24Zh++8dpvxl1u3zqkyb0/v71XvQfn7pdKIXpQ6TnYdQ0qTqYHZuEddhyjrofO4IQtnPHeVlUox6j7Z9gKjax5Ea3IVTu3+uH+dSf17t2iTf+sul/5nai18egsrFRNJZ2xRPR7+6I/P80hLYJjz2u4Ec8u7TloLGSN/9DOm8hoWoXrceCVVfVp7qUKGeD9nPTfXgyB4npH6cXz9cW/iyTrO7DZryZ4qGDJMW4dfHhpuOGdPp8Dqmb5sIqKNijGdOWrz6bdi2VLryLZQctdqjVX4x1UbsPPrkQZi2OTzL0yedwq+sZZ9c+rvktb62O2McY39nf5+M/V232yfbdDr08+z3QI903lB1XrFuj/5M4OQ3+z30lioPU1k7dShf0vhN+Os8rYuhP6s8hU6X6oPuX5dIGqJXngr80oeIiIiIxhcj36eIG4M7cHG7Fel08cp8VC1dqF/XUVn7dqkP/iPRaO6LZT/64tEVfdOzfQuG1YW4tU0uwqAuNK3j9ezaAbS8jJl4W0e+3UQfEvuf0hfDpRIl3NmH0gVWevzIxU9V03mdh1OvrsFVPIIZV3an0yrRSHKufKKnwuRBIoYkUutCXF3QD+7U2+Iq/eWu6KKZTe2Ac8yObmC29brpmEH88ucuF9l+8Uozyu3zCb96N+1nSqdEL/a/+qDOf3nTfKvsOoFZ9nH9hC1r0/kkD1FYEV7OfiVNP0RJQHkWq94Tux9MRzPKdvfkQi7159Wu/YSpv1z6n197EX55CCqXfMysrcaty1akrO+YFdAGvfZzom798m5qS6Yx0rifIZ2RyBkk4tWIOsW7cD1KB7vTEy+mevAj9ePUjU7zK8/rL/6EKZ3T7xkpcy9h0mLqY6Z0BvFtE6Y6KsZ4Zui3YduSZR6ia4+jfsMxLFr7E0yLv2NNNhryYNpmYkqn8CvrXPv7zNpluHnl9/Yzb+zv7O8mvm1inPu79Ysv6/3PK/3ebfAMBnY9hYR88bHrdf131w5Yz+P2xH2Yss42fWm7HifcpP5rnvkAsSbg4oG37Vct13oP4+7Z99nPiIiIiGii4OT7FDF9wXpUqQt6uaivacyMGAol+pi6eNyJhH1bDX1xuXuNFf22sDk9aeBsG1IXnrOc64p4N4aSst/h9E/Sg0xf8AhuHR2JCrp29pC6sB6jseQB/Rg6al3U3DjdjetlMf1YXOvtw7QVe3RZ1z/ZDnTaEVKBx8xfdrncOLIj48LQr96N++WUzn4rmkyVnVwI9wdFUY2prMXo80keShv3WuWs/i16di/KY+q1qL2LnyLVexhh2/WY6s/Q/8KPE2Mol9iL6TqMXpF7XFvpDk6Ldxs07ueT97BtKbf9vNN5Q9X1tFpr0lImIZ3yE4Uer0P3FSVUWkx9bAxCpaUI45mp346lrCUdzm1nTr7SiqHYT63bspjykFP+RgtKp7msg/t7SRm8J3nZ39nfcxQqLUXo70H80innHpBbvziT6vKlS3xHOm1B+XNuyeMX9V7y0DZUzd45Kord+bJAbjtTtcrji/Axfm4hIiIiosLj5PsUIFEwVQ1AYr8VYSP3H6XikYs5J0oq3qkuuF3RhONpqtf7jct9+j66kjfnn0ShjvWC/05129pL/IV0/TmTCGHTEna/sG1pLG1QJkgSaEe0vAWzyg6l9ylGPZjSKdum3eM9UzuRxpCJlBaTQo1L1sSdf92MlSmdRS1r9nf29xxMpLSYBKZT7rMeW68+A9ahokn9nf0l0FjzJ7eo0ovkZvxyJtOw+iwqt6ML+hUMEREREd1+nHyfKuLnrft9lssFwDL7RZeymJ4glvt2zmv7IHgRtMQ76kO9XEhafyfHjaqLgXkP1amLjW51sfFYesJZfpJcGuvDVY8gOC9yn0uJBHKnQUeNuSaxZza14W79KDdexyxGHuQnz/Oe2YZS+5g3BvV/LGMsFy/Z5TJ96XrM0I9sPvVu3K8I9VeU9qL3W58uay/jlpaQcmnXufSHgtVf0DgRkmc9BAmbljD75dCWPMfIXPYzkF/JlLbIbaqs2xKkha6HapRErTZdsU7ubWwzpfP0Dh1hne4P0l6kPzh1FSYtpj6m+aQzSFBafOuosOOZsd+GbUtZJJ0Vtcus6HFTHsLmLyidodugZVi99+X1xUHY84XZL2wd5bKfAft7VjqDBKVlnPp7IEM69a8A4tWIrlL1EVdlb0e9awH580qL5Cfa9hZm9a5OR+zL/fJ1Oaht89S2aJ1V7nLP93Kcxy39zGUwbj8gIiIioomCC65OEfriqsZeHO14H6KND2cs4uTefv34lpx+hisXPBkLbLn2k6gevwUfS9XFh0RlDcX2qAuD3eg5Ol8vnuWkRy44vBaZ0guFrXAtcBeDXmRK3+PTPq4jexE432PmmQc5nnMsa9GsHShxFtWS+48eUJeZ65rV3stGjtmpLpLsc/od05QHd7k53PnLXOxLFt58UZertcCXf72b9vNNp3rdvfCYkLp0/+y5kGUddL6M/dQxb8YPZSxaNq71nl1H6nV9D+iA9unXrh1+eci3/nLpf1drf+XZXvpO+7fBoQW/8i0X5z68XnnILhf33wu/tts3+ENjm/Da79rbf4dIy0+MeZfjmtqS3xjp1wZvRM3pFDJZUr1hPa5mLfjnm3dDPXi2JdcioKa+IumoWPVTRD3yFzotpj7mk07PfuQ6pl9anDaVUx0Vajwz9FtTWQuvdDrncZN+Lfds1nXkkwfhm7+gsceQTr+yTtwT3N+FlI97wVX2dykD9vfJ2t8dXnUYlM58693Zz/N90yMPzgKucuyMelB5dy+iLGTB1Vm9/reyISIiIqLbg5PvNCHpizl1YW/6yS3RZMN2TTT5sN+O5jfhSDSZ6S+R1sUyviCfLNgniYiIiCYu3naGJgyZ4JCf4Op/cu9M14JlRJMV2zXR5MN+a6Zvt3G8GrOcxSaJJimJNq955gO7v3vcNmiyWLge045n3fqGiIiIiCYERr4TERERERERERERERUYJ9+nAInWISIiIiIicuvZ3mg/IiIiIqLbgZPvREREREREREREREQFxnu+ExEREREREREREREVGCffiYiIiIiIiIiIiIgKjJPvREREREREREREREQFxsl3IiIiIiIiIiIiIqIC44KrNGmkyn+A2ifnI7H9OQxFIvark0fJQ2+hprEaqdR7uOCRh1zyV7ryA8yNHfbc3yTsfpQpVd6C6pYXUVpmleFQRyv6z5zRj4vZPser/gqZh1RKldUGVVau4wyfex7nDnbYz6amVN02LGp5WD8ePtaKc++fSfd992t+gsaJMNztNjWojhsHothhTIcoRlqKcczJwN0GRCrVh+udW9LjR1i3szzl3FXYotsR+zv7u5fb2T7DkPfaWb2Nql/evnSW1LWgtLYd5bG+jDLz6mMp1cdO2X1M2mLtPcH1TERERETjj5HvdwCZUKtZ2WI/m7wiyZ/j3KsbJ/zFm5/h99egZ3sjklfsF7Lkkr+hgw/67m8Sdj/KNH1BOxB/Stej/HNPnBWzfY5X/RUyD5FIB/r279YTcE55Ja60Y15dxve9E0Ihx8jImY042fFexqSb9P1zx/ow1NEQODESNE7kK5WqQ3VLM652WHVwavdG9erIJLBJodMiwh5zsryP+aVT8t1/rg+JfQ06/z37dwIr1qM0Nbb+UIw6yoW0q2iDys+R0/o5+zv7u5ewx7xd/V3ea2/nxLsYPtOBxME13mV2ZbcuT/l3ct8u3LRf1k7vwK2GsY8pRERERFR4jHyfIkrqtqFqxTKURCLq4ncXLh54HcPqsTsqy+GOlDHJiJ6SKL14H4aPPodEUj1XF0bVLW3pyKpkx3MYSDyuo3JmoF9dEMwD4i9gqOxFlM/uR3L/ar2fiZOHu9X+148fAhraMEMdQ9Iq0UjzaiQd+UVP5ZsHeV0itWINwE114VNSJhFbfRnpz44qu65eu7rLSpPfMd2ibdswbP+9w5S/zLp9XpVpc3p/v3oP2s8vnU5kldRhsvMQSppUHczOLeI6TFkHnc8dQSj7XVD7DWWVp5di1Hu07QNE1T6O1OAunNr9c/04l/rzatcm+dZfLv3P1F788hBULiaSztqmeDr61R2Z55eWwDbhsd8N5JB3n7YUNEb67mdI5zUsRPW69Uio+rLyVIcK9XzIfm6qB0f2OCH14/z64drCl3Wa3W3QlD9TNGSYtAi/PjbcdMyYTofXMX3bREAdFU54fvgAAKnbSURBVGM8c9Li1W/DtqXSlW+h5KjVHq3yi6k2YufRJw/CtM3hWZ4+6RR+ZS375NLfJa/1td0Z4xj7O/v7ZOzvut0+2abToZ9nvwd6pPOGqvOKdXv0ZwInv9nvobdUeZjK2qlD+ZLGa8Lfq8zcZP/o5dUZ+0oaoleeCvzSh4iIiIjGFyPfp4gbgztw0Y6GuXhlPqqWLtSv66isfbvUB/+RaDT3xbIfffHY0q4urpwo3y0YVhfi1ja5CIO60LSO17NrB9DyMmbibR35dhN9SOx/Sl8Ml0qUcGcfShdY6fEjFz9VTed1Hk69ugZX8QhmXNmdTqtEI8m58omeCpMHiRiSSK0LcXVBP7hTb4ur9Jc3Pa73EzOb2gHnmB3dwGzrddMxg/jlz10usv3ilWaU2+cTfvVu2s+UTole7H/1QZ3/8qb5Vtl1ArPs4/oJW9am80keothiH8/ar6TphygJKM9i1Xti94PpaEbZ7p5cyKX+vNq1nzD1l0v/82svwi8PQeWSj5m11bh12YqU9R2zAtqg135O1K1f3k1tyTRGGvczpDMSOYNEvBpRp3gXrkfpYHd64sVUD36kfpy60Wl+5Xn9xZ8wpXP6PSNl7iVMWkx9zJTOIL5twlRHxRjPDP02bFuyzEN07XHUbziGRWt/gmnxd6zJRkMeTNtMTOkUfmWda3+fWbsMN6/83n7mjf2d/d3Et02Mc3+3fvFlvf95pd+7DZ7BwK6nkJAvPna9rv/u2gHredyeuA9T1vkojfXhalZVX+s9jLtn32c/IyIiIqKJgpPvU8T0BetRpS7o5aK+pjEzYiiU6GPq4nEnEvZtNfTF5e41VvTbwub0pIGzbUhdeM5yrivi3RhKyn6H0z9JDzJ9wSO4dXQkKuja2UPqwnqMxpIH9GPo6Nv60Y3T3bheFtOPxbXePkxbsUeXdf2T7UCnHZkUeMz8ZZfLjSM7Mi4M/erduF9O6ey3oslU2cmFcH9QFNWYylqMPp/kobRxr1XO6t+iZ/eiPKZei9q7+ClSvYcRtl2Pqf4M/S/8ODGGcom9mK7D6BW5x7WV7uC0eLdB434+eQ/blnLbzzudN1RdT6u1Ji1lEtIpP1Ho8Tp0X1FCpcXUx8YgVFqKMJ6Z+u1YylrS4dx25uQrrRiK/dS6LYspDznlb7SgdJrLOri/l5TBe5KX/Z39PUeh0lKE/h7EL51y7oGjqnicSXX50iW+I522oPw5t+QJc5sb+QJGvuDxjIof4+cWIiIiIio8Tr5PAfIhvKoBSOy3Imzk/qNUPHIx50RJxTvVBbcrmnA8TfV6v3G5T99HV/Lm/JMo1LFe8N+pblt7ib+Qrj/np/Bh0xJ2v7BtaSxtUKIpE2hHtLwFs8oOpfcpRj2Y0inbpt3jPVM7kcaQiZQWk0KNS9bEnX/djJUpnUUta/Z39vccTKS0mASmU+6zHluvPgPWoaJJ/Z39JVDR81c2Hwj45QkRERERTRycfJ8q4uet+32WywXAMvtFl7KYniCW+3bOa/sgeBG0xDsYKpMLSevv5LjRlW9h3kN16mKjW11sPJaecJafJHv9/NWP3KdSIoHcadBRY65J7JlNbbhbP8qN1zGLkQf5yfO8Z7ah1D7mjUH9H8sYy8VLdrlMX7oeM/Qjm0+9G/crQv0Vpb3o/dany9rLuKUlpFzadS79oWD1FzROhORZD0HCpiXMfjm0Jc8xMpf9DORXMqUtcpsq67YEaaHroRolUatNV6yTexvbTOk8vUNHWKf7g7QX6Q9OXYVJi6mPaT7pDBKUFt86Kux4Zuy3YdtSFklnRe0yK3rclIew+QtKZ+g2aBlW7315fXEQ9nxh9gtbR7nsZ8D+npXOIEFpGaf+HsiQTv0rgHg1oqtUfcRV2bsj0QPyFyotNv3rirM+mR6M2w+IiIiIaKLggqtThL64qrEXRzveh2jjwxmLOLm3Xz++Jaef4coFT8YCW679JKrHb8HHUnXxIVFZQ7E9KMdu9BydrxfPctIjFxxei0zphcJWuBa4iwH9u3+uzq3SYR/Xkb0InO8x88yDHM85lrVo1g6UOItqyf1HD6jLzHXNau9lI8fsHFnwyu+Ypjy4y83hzl/mYl+y8OaLulytBb786920n2861evuhceE1KV78a5ClnXQ+TL2U8e8GT+UsWjZuNZ7dh2p1/U9oAPap1+7dvjlId/6y6X/Xa39lWd76Tvt3waHFvzKt1yc+/B65SG7XNx/L/zabt/gD41twmu/a2//HSItPzHmXY5rakt+Y6RfG7wRNadTyMRQ9Yb1uJq14J9v3g314NmWXIuAmvqKpKNi1U8R9chf6LSY+phPOj37keuYfmlx2lROdVSo8czQb01lLbzS6ZzHTfr1xQNvW3Xkkwfhm7+gsceQTr+yTtwT3N+FlI97wVX2dykD9vfJ2t8dXnUYlM58693Zzy8tXou7x+2FmfVz6WvrRhZrdpMFV2f1hruVDREREREVDyffaULSF3Pqwv6c6+KdaLJjuyaafNhvR/ObcCSazJyJbfcX5JMF+yQRERHRxMXbztCEIRMc8hNc/U/unelasIxosmK7Jpp82G/N9O02jldjlrPYJNEkJRHzNc98YPd3j9sGTRYL12Pa8axb3xARERHRhMDIdyIiIiIiIiIiIiKiAuPk+xQg0TpERERERERuPdsb7UdEREREdDtw8p2IiIiIiIiIiIiIqMB4z3ciIiIiIiIiIiIiogLj5DsRERERERERERERUYFx8p2IiIiIiIiIiIiIqMA4+U5EREREREREREREVGCcfKdJI1X+A9Q8sw2lqYw1gieNkofeQv2GY/i6Tx5yyV/pyg989zcJux9lSpW3YF7bB7oe5d+8ujp7S3Hb53jVX6HzYJWX3e7btiG6Uv0rt44d1B+8RFXZf73tB/az/JjO565XSWfpQ9tQ89BI3YZ1u9pLIY13OvM9XyqlyviZkTJ2/rnbyUQq6zBpyavt2v1rIhrPesguFxmHnLFnPFl5ttPxzOg0mOo2zBhZKKb3HEmXe3zkOD9yXPnHcT430sbm1d3ecgkaP1OpOtWeXW3Ktb1UvS59W9pqiavcUnWFaVdEREQ0tUT+suWvMj5pzLn3XvSeO2c/s9TW1Ix6rViuXE7Yj6hQ5EN1bVMc5w522K/Q7RRVH/CHdz2HoUjEfiU/Yfcf63nJurCPYgv63z9jvzJ+Jlv9yUVr9br1uNqh0pyM6OcV634KdKxGQj135JMvmWitXhdD/+6f26/kL/t82ekUpXY9nxtjPd/O9pKrqfD+kJ2HQrSTiciz7W7YA3Q+hf4zZ1BStw1VTUDiNo0TE6ktSVlB9WkZa1LlauxpGRl7bkc6rbGgD9Oww3NcMY2D+YyRheR1XqvNqfFyu/U6x3mO85NZtO0t4OgWJOzxM9Z0Hqfsdqfb8qr1QO8Ovd2t5KFtiF5+To271nhSveCddP1n9xEiIiIiwcn3KUJfdK9YhhL1QW/43C5cPPA6huXCSL2+qOVh+68sqXPP41QOH8AlIqS65UWUlskFVR+ux/swfNS5mFUfNlvarG2D7yGpLmgGEo+rD5wvYgb6cRPzgPgLGCp7EeWz+5Hcn3kh5sXJw91q/+vHDwENbZihjiFp1REyNZKO93Ahjw+0+eZBXpcLqVgDcPOKSlNZtd7Pnf6MY6r9rqvXrtoXeX7HdPO6CDXlL7Nun1dl2pze36/eg/bzS6e+6LXrMNl5CCVNqg5mH86pzMOUddD5pC5qGqut46v9Lqj9nAtnk2LUu0TjRdU+jtTgrvRFWi7159WuTfKtv1z6n6m9+OUhqFz8yNhTe4/3RJOb5wSPqb2siyERf0S3C123nVv0xKMw5c8xalImIJ0Tpb1cwIuYG7P6xrWFL+tx3TlmYD/yKZeg9wdTOsOWi4n5fK4+rc6XPe7KxFLvAYyatAvbrv3KLGg/09iTS72Pte1K+qKXV2O46RjKsRsXBh9R5/ToK+rvvMbWydSWTG3CPanmFpRO49gT8r3KmpBej6FdOxBd9xgSu4Lr1i3XMdL9HuCUk+4bT7ap8cRK662lv/JNZ2bdZr7nOKT86mu7R8pLPec478oTx3l7T29Oe5Q06ufZ47JHHm5goeo/e3Q5O2WRneZbqqxMbcLpn0MdDXrC3IvT7pz3Dym3algT7Nnc7St7PyHpi155KrBfEBER0Z2Dt52ZIm4M7sDF7Y3oUf8uXpmPqqUL9euRMxtxct8ufSEl2+Sf84HbRF8strRj+OhT9n5bMKw+YFvb1AfNFomus47Xoy4o0fIyZuJt9O3fjZvoQ2L/U3rirzSu9u/sQ+kCKz1+5AN5VdN5nYdTr67BVTyCGVd2p9M6dPBBfa6k+qCfqzB5kJ/cDr+/Bhfi84DBnXpbXKW/vOlxvZ+Y2dSuLurtY3Z0A7Ot103HDOKXP3e5yPaLV5pRbp9P+NW7aT9TOiORDvS/+qDOf3nTfKvsOoFZ9nH9hC1r0/kkDxJNZh3P2q+k6YcZP+/1Uqx6T+x+EOeO9emLN9nuXGCLXOrPq137CVN/ufQ/v/Yi/PIQVC5+pt9TjVuXT9vPchfYj2a3qXZhpaVnv6rbpp+mb3Fgyp8fUzonUnuRfZy/1+P6K8/ryUb9PKDfhn1/8E3nGMrFxO98wm/cTYu9iEXP/gQz7KeOsO3ar8xM+5nGHmHKX6Ha7o3LfZh2z0IM7HoB11VfmXXFSqduT7XrdV8xja2TqS2Z2sRAx06Vpz3p20k4Y4Qpnaa0jOm9KvoYSge7MRw5g6uDj6A0ar0cll869XtA52HcPL4lPQkaSf4cvfq1HbgW/aFvOk3vOW4za5fh5pXf2884znOc9y4XP9Iez6k8yD7uvDm88hBR/WZg11NIyJdFu17Xf3ftgPU8bk/ch2kT2aYvbce0+Dv2M2kz6v9qX7ZuLfPMWxm3E3KTehnG/JG2q1zrPYy7Z99nPyMiIiLi5PuUMX3BelTZ95usacyMcAlFXyzuTEeNyYffxO411gXdwmb9AdWJKpFtQ/FqzHI+68a7MZSU/Q4jcSS3i7LpCx7BraMjkSrXzh7CTf1oDMaSB/Rj6Ojb+tGN0924XhbTj8W13j5MW2Fd1Nc/qS7+O+2oncBj5i+7XG4c2ZFxseJX78b9ckpnvxXhpMpOLtwCf049prIWo88neSht3GuVs/q36Nm9KI/lMHFRpHoPI2y7HlP9Gfpf+HFibOUiUWdOPX59pbqaNwmsI8mXlZaIyufA0ZEvFwo+Dk6S9jLCu99O9nIRvuOuI/6C52SOmX86zWXms59p7AlQ8DoSV3an+4q41gvdV3IbWyd+WzK1iUiyA/27rUk+mZgvedI1sesnMC0i//cq3a97rTxImoOCEQKZ0jl4Hph9n47atSYMU5hZW42hs6eN6cwee7I/azhKyuA7ic1xPjfZZc1xfoRfHuTcA0fVEOtMqi9cj9L4jnTagvIuXxbIWOAX9S63kamavTMjUn3a7GWYobKU2G99SZK4R43vQWOIWwHKg4iIiKYOTr5PATqKpsH6gKijSTres7dQMcjFjhO5E+88hGk5RGMXw1Svd4ngHD7Wak2e2P/0BVAOE1k02ni3FycCV6QvfM/1IWlfrBda2Py50zkVTZVxIpdxV0eGuiJPwxrvMitk280lEjns2DrR2lKu78UyEX81Xo2SMUac+zGVp/waojQ2D6Utx/XEoNz+4+7YY/aeRZB4B7fKYrodyO1MptU+jpKyPgwlwte7ibsNcpy/fabCOB+Yh9M7cCu2XvXxOlTI2hZ2cMFY8y4Lp0ZlLQbXrwEc8ouRkVsdzvccQ6SPl+B85pfBRERERFk4+T5VxNUHP7nQk4XFmpbZL7qoizHrp8XWyv4SDWWkLuCGytrTP/OV48qK//NkBf/T3eoD8GPpi1zr4rIPV3MLck9HR7nTcONs5oXzzCa5R2nuvI5ZjDzIz3DnPbMNpemfP+v/WMZYLl6yy2X60vWZt1XwqXfjfkWov6K0F73f+nRZexm3tISUS7vOpT8UrP6CxomQPOvBvlA21Z+nwPwtQ3SpfZsPnQ8rqlMLkz+VzqHYyC0N9PmkvUheJlx7sSYQdf7Wyb1/c1To94cxlotnezEwjrvFEqYtmcaeICHb7q2GPaocrePr+yVn1MMj6b4inAhoq/5C9E0xQdqSqU3IZFxN2w9Q4urTs+wJ6DSvdIZt16by1L+GeEFPCjr/5D78ThsJxZBOiRC+OjhftQNg+KzVHq1b3kSM6Qz8rGEbVuWcMYnNcT5vHOcNDHmQtp2IVyO6SrW3uKpP92R3QN690iL5kbUhZvWuTv96QO7l7uT32tHdgJ1/+dtps89j2B5DhuLqmE43UH1cfiEwyqD6IyIiIiIbF1ydIvRFhL2oWvJ4H6KND2csLOTefv34lvQHTRP5gJ6xcJxrP7m49Vvsq1R9IJboqqHYHr3gW8/R+Tray0mPfAj2WvhIL4jlXoBKXTz27x5ZZEqO68he3Mn3mHnmQY7nHMtayGkHSpyFnuR+mXpBv2a197KRY3aqD+72Of2OacqDu9wc7vxlLkAli6C9qMvVWnTKv95N+/mmU73uXgxLSF1mL+hXqLIOOl/GfuqYN+OHMhbSGtd6z64j9brcNzWoffq1a4dfHvKtv1z639XaX3m2l77T/m1waIG1QJ9XuTj3jc23HgLLzKeOZHE7yVPcZyE+v/5gyp8+n7qwrlj1U0Q9xsiJ1F5GbbMX6es5GjP2ozDvD2HryFQupvYSOEb6jLvZ+7nPYzpmULv2K7PEPeb9wrb50G3XfT5VDxkLpxoWrcyoP7XNGVtvRH84KdqS6b1YjlfbMh+3XNucczm80in80qKPmed7Vf+/AvPWWvuMtKsP1Hmtv0nsewPT1/7Es1yCPhf4pVNIucVih/R7hTyuwpac3lNN7zkOGYPcC64KjvOu8znjQFDe79Bx3k3qo3rDelx1LbgalAevfUTQfl5pkbxll6eVn5Fj69vRNNh14fqsL6KyqKr05cFdiGctoiz9fFav/21uiIiI6M7DyXeakPTFh7rA8/oZKNFkxXZN+WB7obCcyXf3F31EY+U3+Unh3anj/FQdo9hHiIiIyAsn32nCkAsQidDVjwdHIviIJjO2a8oH2wsVgkQPSySq8Is8JQpDooijGIkap/zdqeO8O9pcR+BnRZNPBfrLlHt2pH+RQERERCQ4+U5EREREREREREREVGCcfJ8CZBEhIiIiIiIimnhkwWUiIiK6M3HynYiIiIiIiIiIiIiowL5k/5eIiIiIiIiIiIiIiAqEk+9ERERERERERERERAXGyXciIiIiIiIiIiIiogLj5DsRERERERERERERUYFxwVWaNFLlP0Dtk/OR2P4chiIR+9XJo+Sht1DTWI1U6j1c8MhDLvkrXfkB5sYOe+5vEnY/mnhSqRZUb3gRpdntZ3AXTu3+uWpHanuL2l4WUa+pttah6jwZ0W1gXs3IPu5t+nnWftdRjeGO1UjY2wvNL50mqbptWNTysP0MGOpoQP+Z4qSvWJxxwJFK9eF65xaVjzP2K/lz2sSM+As4dbDDfjXTZB8/cyXlW4UtOPf+GfYV9pVRJmpfkTY3q7fxttZRKlWHmat+qtq++pzi0c5KV76FaGwe7r6yG/Fdr2PYLhtpa7X37NB9joiIiIiIRrsrVrvg7+3HWumMGRgcHLSfWf6srGzUa8Uy/MXn9iMqFH0h+b//GQbPjs8XKMUS+eIDDB79Z9ycpBNH/+vCm0j86/+NSN1y/K8TXaPykUv+bp71398k7H40doXuf5HIOVz9/d2Y+e/+Ead3/1fdpgZ+dxHTl5Th6sfXUP2fXwP+5Sn0/tNWXB9ejq89our94y4M9b4BLFiOz/+xGef/v/83rn91Of5DzV1I2umqWPNf8L861uhtiU/7UFL7KHDuTXz+ReHbi0zy+KXT1D4jn/2zlde6fvT+4j/j2mcTty371buMA8P3LMfNDqseEr+/jln/6dtI/Wv4vpluE1VXfNvZZB8/cyHtas7f1OCzN/fpfLKvsK9km6h9Rd6jb3cdzVz1C8zq3TLSzr5xV7qMSh7ahj+72I7z//SGavMPYs79Q7h24TO9DZf7MONv1o+pXoiIiIiIpjJGvk8RJXXbULViGUrUhc/wuV24eMCKSsqOfhOpc8/7Rny5ZUTbScRZvA/DR5/T0X1ysVzd0paOxEt2PIeBxONWRBn6cRPzgPgLGCp7EeWz+5HcHxwV6OThbrX/9eOHgIa2dHSaE4noFzXuJ988yOsSbRdrUBfDV1SayiRSvS8j/aOjHoGru6w0+R3TLdq2DcP23ztM+cus2+dVmTan9/er96D9/NKZjgpUdZDsPISSJlUHs3OLmA9T1kHnc0c+yn45RXyGPGa07QOUYzcuDD5iRf5lRVmGycO1hS8b+5+pLZlIWmqb4ug9AFSvi6F/98+t11WdZ0cgSn6jl1friMpo21uAHaGr0+3aV287ugUJj6hSr3Z2AwtRsW4PojrtViRxdju+tfRXnmVtSmfinl+Z+19Wut286sg9LjnH0eX3ZJsaa+x6iqq/ybPtWufzrr+gepcI0pKjTlrkGDEk7EhS8/nM26RNnHOPlz714rSvoLHONCabmNp1oduSm7Sr+trujPQ55cK+ksmrLbGvjG9fccpW2op+nn3OsG1JlWn2fs7nAiF5kbZm+jWEPrfqS1JGwv25xatdSRqiV55i9DsRERERkQfe832KuDG4Axe3N6JH/bt4ZT6qli7Ur0fObMTJfbvUBdjzepv8C5o4ERJtV9HSri6qn7L324JhdcFpbZMLYKgLYOt4Pbt2AC0vYybeRt/+3biJPiT2P6Un3kvjav/OPpQusNLjRy5Cq5rO6zycenUNruIRzLiyO53WoYMP6nMl1YVvrsLkoTSVwvD7a3AhPg8Y3Km3xVX6y5se1/uJmU3tgHPMjm5gtvW66ZhB/PLnLhfZfvFKM8rt8wm/ejftZ0pnJNKB/lcf1Pkvb5pvlV0nMMs+rp+wZW06n+Qhii328az9Spp+iJKA8gx7zIFdL+D67DbMumLVu26HtesRLU+FzkNQ//NrSzmJvYhFz/4EM+ynYvo91bh1+bT9zHLjch+m3TO6/mYubce0wbj9DBjo2KnKYg/qNxzD19u26Xw7vNpZJHJGldlTSAy+hwu7Xtd/d+2A9TyuJ+l+6FvWpnQG9T8/fnWkx6XOw7h5fEt6oiyS/Dl69Ws7cE0ms0K0XeFXf8Hj7jxE1x7XZb1o7U8wLf6ONZloOF9QWtxuXTmMxL4GPTEn/MYXU1kHjckmpnZd6LbkNrN2GW5e+b39zIV9JQP7yojb2VekbM+p9w453slXntdfSLiFaUsyOe73uSAXkpeaZz5ArAm4eOBt+9VM8p43jPkZ5Xmt9zDunn2f/YyIiIiIiNw4+T5FTF+wHlXq4lQuUGsaM6PIQok+hlJ1kelE9skFX2L3GuuCfGFz+gLY2TYUr8Ys5/ou3o2hpOynLmqPZE4a+Jm+4BHcOjoSnXXt7CHc1I/GYCx5QD+GjloXnjdOd+N6WUw/Ftd6+zBthTXxUv9kO9BpR6oFHjN/2eVy48iOjAt0v3o37pdTOvutSEFVdjI50h8UzTamshajzyd5KG3ca5Wz+rfo2b0oj6nXovYugUIc88pu1WZHJhyu9cL64qgYZab4tqVcxF/wnLAxG5nImjv7UMbkSiTZgf7d1kSQTI6VPDkyWeXXzqQcBo6q6ncmdxauR2l8hy6nsdWff//zZaqjwfPA7Pt0FPHXn3kL8+pSmFlbjaGzanwaQ9sNX3/9esLPmnRrxVDspzpNxvPl1AZjiK7chtKzI1G+wbzLOnsMyWdMNpVLMdtSSRlGTVRr7CuZ2FeUidFXTMK0JeG3n0O+SJDy9Ip6d74QiKvjV60K/iInQy5tj4iIiIjoDsTJ9ylAR101AIn9VqTTyY737C1UDDKx6kSrxTsPYVoO0djFMNXrXaI7h4+16rw5/ySqMPeJktGKccyxGGtb0lH3rp/+e0XuZkbOWhNZJ/e1Iln2CKKZf5omk4tX49UoiebQzk7vwK3YepXuOlQ0qb+zv3AzlXVwOnMnk4Q1D9XZz3wk3sGtspg+h9wSYlrt4ygp68PQGO9yVoixwJpIG10eociEbRkwfJvv3uZXLsVoS7liX2FfyTBB+oqfsG2pUJ8LhlV9ya3qvH4tIL90K8H53L8oJiIiIiK6w3HyfaqIqwshdaGeKpcLsWX2iy7qYtqa/GjBvLYPrMgxE3UBPlTWnv45vRw3uvItzJML99Pd6qLvsfSFs1yIlcb6cDXHuQC536hEZLnTcONs5sX4zCa5x2zuvI5ZjDzIz9nnPbMNpfYxb7jXIR5juXjJLpfpS9dn3DrBr96N+xWh/orSXvR+69Nl7cUzLSaBx3wE0aUj0X7piM+x1q1H/zO2JVv++duBWw171N9bE2z6vr0e6Ywkz2Bg105ghX2bhvIfoKbtByhx6k/lb5Z7ws0wvsiEWCJejegqK/oyPSFjKusc05kXQx1JGq8OzlfnAIbPWm21dLDbihQN2XZzqb9cxl05ZkXtMmsy1dTOcmmD8Z3o7TiP6Lr8Jzaz5TIme7XPwHIpdFtyGVbnynliln3Fsy2xr+QvbF8JFKYtCcN+wrvf1qlyfwtRVzsrx3nc0s+Aobh6zela0cf0LwtGcd2aiYiIiIiIRnDB1SlCFiVzFolMHu9DtPHhjMW03NuvH9+S0y0xrMXNXAurufaTCQi/xdpK1UWgRPENxfboBSx7js7XC6o56ZELP6/FvvTCcu4Fy9TFf//un6tzq3TYx3WMWuzM75h55kGO5xzLWrxsB0qcxc3knrR60b5mtfeykWN2Wgv0mY5pyoO73Bzu/OnJlvTiabJw6ou6XK2F1vzr3bSfbzrV6+4F4ITUZfZif4Uq66DzZeynjnkzLrd/GPl5v1dawh7zBlQ9rIshEX/Ern+p2xwWXA04n/Dqf7pNGNqS8MxfVlvKXkA5ox5UOp2FG51F+US6jajjxxr60L/vPCoen49brrS4+1fQ+CITN9Ub1uOqfc9hh6n+/NJp7H+9zaMWZxROefvVkdB5jR3S7V8eV2GLq02EaLs51J9XvTv5c5P+Kbc1scrFPw/GtKg2IQs8ustI6qjvtP/4MrTAWuTTq6ylTfmNyQ4nL6Pap6FcitGWHJJe94Kr7CvsK55pmSB9xc2rXYRtS0H7+aXFr505orKoqr04bdxe9NYhfWZWr/etbIiIiIiI7nScfKcJSV/I1nbjnGuihKiYrAmiWMaECRFZJsOY7DcZSTSewvSVyfz+w35HRERERGTGyXeaMOSC1YlC84q6IiqmaNsHOpJR+EUnEt1JJuOYLFG9UYxEYxONhzB9RaLznV9Nef0aYLLQXzbcsyPj115ERERERDSCk+9ERERERERERERERAXGyfcpQBbOIiIiIiKaKHq2N9qPiIiIiIjuXJx8JyIiIiIiIiIiIiIqsC/Z/yUiIiIiIiIiIiIiogLh5DsRERERERERERERUYFx8p2IiIiIiIiIiIiIqMA4+U5EREREREREREREVGBccJUmjVT5D1D75Hwktj+HoUjEfnXyKHnoLdQ0ViOVeg8XPPKQS/5KV36AubHDnvubhN2PJh6py3k1I3WYGlTtqUPVa3Ls9ToR+pjTT9z8+oyXsHkodN5T5S2obnkRpWURXUfXUY3hjtVIFKCe/Ez2MdJPqm4bFrU8bD8Dhjoa0H9mcudP2nkVtuDc+2fYpwOwT49v/Ul7nNXbeNv6WCqlynmDKmdXflPnnsepgx32M/mbOlSs+imiNfZnqv2qfFQ9yFhRe88O3a+IiIiIiCYKTr7fAfTFW1Mc51wXLnT7RNu2YXhX+AvpsPuP9bwUTjH6X7TtLcCe9Cl5aBtis7szJibGU7HzZz2ffG1X0oyO53QeUuV1qGj5aUaeKD96Qm5dDP27f26/MjHl0h9k4rB6w3pcdU2osk9PfOzT4yO7r2e3R2vifT3QuwOJM5mT7F59i4iIiIjoduPk+xRRUrcNVSuWoURdbAyf24WLB17HsHqcHTEosiOI/GREeaX6cD3eh+GjzoXnD9S2tnQEWFJdkA4kHtfRSjPQj5uYB8RfwFDZiyif3Y/k/uALVCcPd6v9rx8/BDS0YYY6hqTViQzMJ1pO5JsHeV2i9GINwM0rKk1lElXVl5H+0dFvwFV7EsHvmG5ekw6m/GXW7fOqTJvT+/vVe9B+ful0Is6kDpOdh1DSpOpgdm4R82HKOuh87ohJ2S+XaNCwx4y2fYBy7MaFwUdUXVj1fr1zC/rti/swebi28GVj/zO1JRP3RFb2RIWpzML2Mb90mvIXVA+mvuLkb7jpVyg56sqnfTy/8SVMHuRvzPt5pzNonNB5OLpl1OSQ8KsjvzLrf+UXmP7/2YuoTsMunFJ1nZ1mrDqWW96z+maYPiZM5ek1Lt3AQlSs22PMw62lv/JNS3Y7d/OqI/f7kVMv8ne1T7ap9m/3z6j6G59yMbXPMP3BTd6X62szJ9fZp9mnb2efdvqG9Fn9POucofu0ak/Z+zmfUYSTVtOvWeRvopdXp7dL/6nGc75/L2mIXnmK0e9ERERENGFw8n2KkCis6YnT+qJGouaqMPKzW31RlWcUm44sWvfT9IVm+rm6eNaTGutiSOyyJ/j1tvV6Yvda9IfWT6T370BJyx6Uxp9C7+X1gT8D1mlsAS7axyxVF1tzY4f0xZxbPtFyYfPgXLhH8YIuM7nojLkmSkpXvoVZvdakrL4AfrJZR1ldg/mYDlMesrdll4uOiGxA+qLYr95N++WSTsn/3LLDSB7dgQGsR7Wqv35T/Y2hrIXX+frOPobqBe+kz6v3W/UYhrIu3v3ke8wbUi4bXgSOv6C2O3W9DSVH7Ym8kGVm6n9+bck5ph/3RJ30lejsnfr4ci7f/EnfDNnHTOk05U941sOR+4zlKV+E6AmdrMkvfa4cxpd88+AY1f/sSVC/dEre/MaJjMkx1wSfqY6cdu1dZsg4t5OWIfXc2U+MzoP8nU/fxA9D9zFzm/AZl+w0e+VB2qcpLdkT0g5THclEcnbbcG5L0avLM9yYNZb+IHS7yZocZJ9mn3bScrv6tMP6wiCzLMP0aV2+hs+mIpfJ9+z8y3Gis4FpMftLJ9eX5MLryy0iIiIiotuJC65OEdMXrEfVhmOoV/9qGjOj1kKJPobSwZ36wk5EImeQ2L3GumBe2Ixp8XfSF3KybShejVkL9VMg3o2hpOx3GIkjp63XAkxf8AhuHR25OLx29hBu6kdjMJY8qAu6oaNv60c3TnfjellMPxbXevswbcUeXdb1T7YDnfZFYeAx85ddLjeO7NDRfQ6/ejful1M6+62JBVV2kTMb0xfyvsZU1mL0+SQPpY17rXJW/xY9uxflMfVa1N4lUIhjXtmt2qxV7+JaL1C6QCW0GGWm+LalQPMQXXtc7zd39iFcPGCl2ZS/7DaRTx8Ln07hUS459L/EvgZciNtP3UKMLyJUHnJIp984EUl2oH/3g+jZ3oiejm6UPPkySlOpHNv16DKTcw8cVV1tqX3yhetRGt+RTpsvQ98cSx8zlaffuGTKQ+i0mOpo8Dww+z49Gff1Z97CvLoUZtZWY+isajdjGLPG1h+AkjLg1uXstss+zT59e/u0SZg+LYI+mw6/v0aXp9/Eu3yxUTqo2oerTKbNXoYZqloS+xtx6lWV73tUeah6yOCqNyIiIiKi242T71OAXJxUNVgXInIRc7LjPXsLFYNcOJ971boAj3cewrSmH6Ik+8JvHEz1er9xuQ/Dx1qtiQ77n77QlsmxkIpxzLEI35asiayT+1qRLHsEUXveo1j5u11tfuhg4ermdvZbmbS7Gq9GSXSMdXR6B27F1qt016GiSfX9PCYqvYwlLX7lGTgu+eQh37TIhHrNQ3X2Mx+Jd3CrLIbp91TrW7JMq30cJWV9GBrjD+yK05bYp/PFPj1aMdpL2D5dkM8oZfOBK7+3n4y4eXyH61Y683U9EBERERFNVJx8nyri5/WFiPzEt6Jpmf2iS1lMX5TKz6bntX2gIwCNEu9gqKwd0XLr7+S40ZVvYZ5MdpzuVhdaj6UvcuVnxqWxPlzN8ZpRfmYsUVDuNNw4m3nhPLNJ7subO69jFiMP8nPsec9sQ6l9zBuD+j+WMZaLl+xymb50PWboRzafejfuV4T6K0p70futT5e1F8+0mAQe8xFElz5uP1bt0ImSHWvdevQ/Y1uyBeUvkjyDgV07gRVWBKYpf2H7WC7pzHt8ybM8pRxyrmMPOeXBS8h6l0mnmrYfoMQ+n+w3y5n0DWyD/nSEa7wa0VVWdGlOkcqBfTP/PhZYnob3I988hC0XQx3Jua4OzkdVDBg+a5WDRNHqqNyQY1Yh+sOw2mfaPelQ6wzs07lhny5snw4Upk+LgM+mQWlJvwe7XDu6G7DrUOph2uzzGM7+Qm3Q6ycWRERERES3B+/5PkXIvU+dRSKTx/sQbXw44x6a7u3Xj2/J6ZYYctGdsaCXaz+5EPVb4K5UXXhJ5NVQbI9ewLLn6Hy9gJuTHrnY8rrHp74Xr3vhuBj0/X3lIts5riP7vrG+x8wzD3I851jWgmE7UOIsKHbuefQcAKrXNau9l40cs9O1EJjPMU15cJebw52/zIXOZOHUF3W5Woub+de7aT/fdKrX3YuuCanLXO7RGqasg86XsZ865s243I5h5DYLXmkJe0x9z3e5F3D8Ebv+pW5H7iUbNg/Cq//pNmFoS8Irf3LvYFnQTqTrWv1drKHPuqe/3Dvbp8zC9DHr/tfmdHrmL5968Oh/2a69/XeItPzEd3xxb3fkkoeg8SUonZ7jxNEYalvm45brfM7x9PHdx1Tb0m1Qr5lhbksy2VS9YX3m/ZgD85Bj33SlxdjHAtpu0PuRVx6Eb7l4LAIqnLLxqyOh+4Z9H3R5XIUtrjaYY7m4+3sO/Tbo/Tb7ntTs0+zTt7tPu3mlJ2yfDtrPlBarr43cn99N3z++wbnne3bb/QCzev1vZUNERERENN44+U4Tkp5QqO02LlpHVEjOhb5MXN0J2MeIbg+/icqxYp+mQpjM74XF6ltERERERGPByXeaMGTiwIlulGi0Cx3q4smOKiMqtmjbBzrKUfhFBE527GNEE4NE/EYxOio+X+zTVAjuXzXoSPqsaPLJQn8Bdc+OjF8WEBERERHdbpx8JyIiIiIiIiIiIiIqME6+TwGyWBUREREREY3Ws73RfkRERERENL44+U5EREREREREREREVGBfsv9LREREREREREREREQFwsl3IiIiIiIiIiIiIqIC4+Q7EREREREREREREVGBcfKdiIiIiIiIiIiIiKjAuOAqTRqp8h+g9sn5SGx/DkORiP3q5FHy0FuoaaxGKvUeLnjkIZf8la78AHNjhz33Nwm7HxWGX90GtQmTVHkLqlteRGmZtc9QRyv6z5zRj/PlpMORSvXheueW0McTqZRK34YXMSP+Ak4d7LBftTjbSrPymxrchQuDbZhXM/J6alCVTYcqm2TuZTNVSL1UYQvOvX9mytWRjEmzehtV+m9fvZbUtaC0th3lsT7f/iflHmvI3J5K1WHmqp+qMlB9NyvvqbptqL1nh64zIiIiIiIiIka+3wFk4q9mZYv9bPKKJH+Oc69unLSTx8Pvr0HP9kYkr9gvZMklf0MHH/Td3yTsfuNhKrTPoDz41W1QmzCZvqAdiD+l95d/Y5mElXT0n+tDYl+Ddbz9O4EV61GayvhuNi+RSAf69u/GTfu5m7Nt+Nzz6fSffOV5XFfbpK0mBkfSEo8Dc5set3acRMbarmWCN9qgyuHIaf18qtWRHON2TryL4TMdSBxc49v/5AuIaOwQrmdtl4n3Wb1brLwfBaLuvJ/egVsNY6sXIiIiIiIimjoY+T5FlNRtQ9WKZSiJRDB8bhcuHngdw+qxROEtannY/itL6tzzo6Icvbgja3WUZbwPw0efQyKpnpf/QG1rs7YNvodkx3MYSDxuRVGiHzcxD4i/gKGyF1E+ux/J/av1fiZOHu5W+18/fghoaEtHZEqUpERa5hshnG8e5HUr0hG4eUWlqUyikvsy0p9xTLWfTEZd3WWlye+YbtG2bRi2/95hyl9m3T6vyrQ5vb9fvQft55fOdCSsqoNk5yGUNKk6mJ1bxLyp/vzSGdQ+3dG+kk6JML3mamdOvUh+ap9sU+e20npr4cvG80n07qndPx/13I/7lwPX1LG9juHmzkMubderTZhE2z5AVNWdI52WMdRf6cq3UHLUKU9p4zEkdtnlZmjXQdtqm+I45+7DTlrtbb0HgOp1MfS7yj/a9hbQYadF8pS13Y9Xe5GI5HQ96zroxiw7onuoo0FPAPvtp5/7jCHDTcdCtwnT+RxyjPra7vQ+YrLXkT6e6qfSL/XzrD7hNU7cwEJUrNuj27uTruw+5dffHU55O/Wdza//yX7Ry6tVXb/s2z91mlU9Sfk5JH3RK08x+p2IiIiIiIgY+T5V3BjcgYt2dOLFK/NRtXShfj1yZiNO7tulJ1+d6EX3ZI4fibqsaGnH8FEnsnYLhsvsySKZaGkBErus4/Xs2gG0vIyZeNuOouxDYv9TeuK9VCJzO/tQusBKjx+ZlKlqOq/zcOrVNbiKRzDjyu50WiVKUs6VT4RwmDxItKJEmF6IzwMGd+ptcZX+cldk48ymdsA5Zkc3MNt63XTMIH75c5eLbL94pRnl9vmEX72b9jOlU6Jd+199UOe/vGm+VXadwCz7uH6C6i9M+5RjRmFFlzrpLGn6IaZLO+s8jJvHt6QnECWyvFe/tkNPkJnOJ9HDyY7XPZ/7kfpx6kan2Y4ATj839LEwbTdIYveDOHesT08m6vPZk55h688yD9G1x1G/4RgWrf0JpsXfsSZ1De0lnzZ/68phHSntpFWLvYhFz/4EM+ynXmYubce0wbj9zJ9feymRdq3qSMoLV87jlmo/V+P99m16VP4M+5nGkLBtwnQ+t5m1y3Dzyu/tZ47JXUfWL0Cs/uAuL4dXv41EzmBg11NIyJcUu6x+eu2A9TxuT9z79fex0GPa7J2+0fmyveaZDxBrAi4eeNt+1XKt9zDunn2f/YyIiIiIiIjuZJx8nyKmL1iPqg3H9KRMTWNmxGUo0cdQOrgTCftWFjIBkti9xprsXNicnvRxtg3FqzHLme+Id2MoKfsdTt8yIcj0BY/g1tGRaMVrZw953gohL2PJA/oxdNSaULlxuhvXy2L6sbjW24dpK/bosq5/sh3otCMiA4+Zv+xyuXFkR8aElV+9G/fLKZ39VnSsKjuZSOwPiOAMqr8w7VOOWdq41ypn9W/Rs3tRHlOvRdXGwfPA7Pt0dPDXn3kL8+pSmFlbjaGzVnszne/a0UMotb9MsSZCVRuxJ/Gnjvzqz9Kfvo3IyVdaMRT7qS5XY3vJqS3FEF25DaVnR6Kt0+IveE7CuieZ584+NGpy04uxvSjypVo8/giq1v1K3zLEuU2PcT/TGBJSUDodJWXArcvZ4+fkrqMgfv1W0jwgt3dxJtUXrkdpfEc6T0Hji3N7p3xuczOz6ZH0e4AX54sEue1M1SqPW+643jOIiIiIiIjozsXJ9ylAR+g1AIn9VuTfyY737C1UDDqK1o7ejHcewjSPqNXxMFnqPWw6b1zuw/CxVr2P80+i6vXkYOId3CqLYfo91foWN9NqH0dJWR+GEsHnk0mzobJ2RMtTeiL0Vu/YJw2nGmuysw/T7smYoQ1HJpbLgGGfO4rpaP1RtyuxJplP7mtFsuwRRHNIhrG92KbNBm4Nqv/W3pfus7nsV0iFOt9krCOTwHFC7qUeW6/qrQ4VTerv7C92izUOlpSNfLkQLXsYc9f90N6SaVi9H8gtvbx+SUBERERERETEyfepIn7eurdxuUxMLLNfdCmLWbdRKG/BvLYPrGhJk8Q76QlKIceNrnwL8x6qA05341bssfTkldyaoTTWh6u5Bbnr++jKhIY7DTfOZk5iz2yS+3fnzuuYxciD3MJh3jPbUGof88ag/o9ljOXiJbtcpi9dn3n7B596N+53O+ovTPvU6VyfLms3mXi8OjgfVTFg+KxVz6WD3elI2KDzyaRlqUqvLKaYyMq3Z1vSqlEStdpRxTq5r3qWfPtYDvzTEl4ux9S3W6ldZkVem9pLLm0pvhO9HecRXZf/l1SRpNxyRBYWzbxNimceDO1FyP3SdcT7wTW4eKV9JFrZtJ9pDNFCtImAdDqG5UsCw8T6pKyjIIZ+K30+Ea9GdJUV9Z5x//WA/h4mLXJrJ+fLEfctb6T85rW9hWid1Qbknu/lkNsZZcnhNjxEREREREQ09XHB1SlCJpbm1diLgx7vQ7Tx4YzF5dzbrx/fktNtKKwF/VwLDbr2k2jD7AX8nAVXZSFDiewciu1BOXaj5+h8vfhg9uKG2YvfyS1Eat0Ldsagoy31PYvt4zqyF0H1PWaeeZDjOceyFvPbgRJnsT+5f7NeeLBZ7b1s5Jidq9Pn9DumKQ/ucnO485e5CKEsnPqiLldr4UH/ejft55tO9bp7QUQhdeleODDf+hNh22dGOtW2m3G5vYV1extJRyx2SOdHHldhSzqdQecTsmiprEmQvShizvlzLSgrvPIwlnoXXmnxPKaqX0lH2PpzXnOTNiO3EpGy9msvwrct2emUMurpbU4vQCrn7TudmXevBWqFk0ZJX6yhL704p28d+bQXLP2V/vvsPu2UjamdGceQEG1CmM7nkGO7F1ydKnXkkEns6g3rcdW14GpQv/XaRwTt55cWr4WL4/YCtvq5q6+585/RJlR5Zi+YK+Uzqze/29wQERERERHR1MTJd5qQ9KRWbTfO2ZMdNLlM9PqTSbyKdesxtOu5jAlPoonCb6J5qtAT2+tiHrezmdymer0RERERERFRfnjbGZowdKTnBmvRvHq5p69hsTuaeCZD/cnEmES7yiKXch/nmNdCiUQTgL7NyvFqzHIWGZ0CJAK/5pkP7HGiHThq3cplSlm4HtOOZ90Wh4iIiIiIiO5YjHwnIiIiIiIiIiIiIiowTr5PARJFSERERBOXLN5KREREREREdxZOvhMRERERERERERERFRjv+U5EREREREREREREVGCcfCciIiIiIiIiIiIiKjBOvhMRERERERERERERFRgn34mIiIiIiIiIiIiICuyuWO2Cv7cfa6UzZmBwcNB+ZvmzsrJRrxXL8Bef24+IMqXKf4Da//x/4H/9axduRiL2q5NHyUNvYeHqv0V500Lc9MhDLvkrXfkBalq89zcJux+NSJW3oHrNS5j7v6k6XLAQkbnL8e+vdOHzLzLLM5+yzvWYE1W07QPM/9/Wo/Su9zB44bP087sH/wUlf9WB/7D4blz/+Cj+lyqHVKoOFeus1xLD/wcWPfVTRP/jev2v5MoOXPssOM9yfNk/eeID+5WxS6VUHWzYj6ryi0ieNS8sLn34P8w7ofMq2CZGG+824SblXBHJf79Csupvv6q/9br+bn6q6jyr7qQd1f1NU0Z7MO2XqtuG2oV96XZHREREREREkwcj3+8AMqlbs7LFfjZ5RZI/x7lXN2IoYPJqohp+fw16tjciecV+IUsu+Rs6+KDv/iZh9xsPk6F9yiRhdUszrnas1nXYs2sHUFZtb82Ua1nnc8xsE6XMBnY9haHB95A4ctp6fvQwho+14sLZs/rxTTyC6EK9CVi4HqXox/WjryNyZiNOvvK82neXznv/mdz69MCuF3DdflwokUgH+vbvVmk1k/qKNvSl88o24W2824SblHOY/QqpoqUdw0ef0nmIHwXmtvzQ3mKRL3uisUO4ntUejPud3oFbDaqsUin7BSIiIiIiIposIn/Z8lcZV3Nz7r0Xvecyo/9qa2pGvVYsVy4n7EeUj5K6bahasQwlkQiGz+3CxQOvY1giC9Xri1oetv/Kkjr3PE4d7LCf+dOReC0vorRMIhT7cD3eh+GjzyGRVM/Lf6C2tVnbBt9DsuM5DCQeR/WGFzED/biJeUD8BQyVvYjy2f1I7l+t9zNx8nC3TMYcPwQ0tGGGOoakVSIa59VIOt7Dhe3P5TwBn28e5HWJSow1ADevqDSVVev93OnPOKbaTyYDr+6y0uR3TLdo2zYM23/vMOUvs26fV2XanN7fr96D9vNLpxUFbNVhsvMQSppUHcw+nFOZm+rPL51B7VPqoqbRmnyUdF5Q6bzmamdOvUh+ap9sU+e20npr4cvG86UGd+HU7p+Peu5HR57eswPn3j9jv5LJXNbe7eWaSmPux5y4ZaaP0wJcVKevkv/uGtmvtlZS0Y1zKm3RtrdQIj+g6l2tJ0h1W1sXQ7+h3LM5+yTij+g86j7duUUdzypDU/8L2lbbFNfpTPfFrDYh+amv7U6Xs84f28TtbxN2miWN+nnWGOpVZjewEBXr9iCqy99Kc/YY7Jd3h1OmQx0NvhP+XvmR/aKXV2O46eVR7wMOr/0kfdErT/m2DSIiIiIiIpqYGPk+RdwY3IGLEimp/l28Mh9VS63QQh1NuG+XnvzRkZTqnzMhYyIRmO5IvJ7tWzBsR2DqiYEWILHLOp6Ozmx5GTPxth1B2ofE/qf0xHtpXO3f2YfSBU6oozeZQKlqOq/zcOrVNbiKRzDjyu50WiWiUc6VT/R2mDxIZKFEqF+IzwMGd+ptcZX+8qbH9X5iZlM74ByzoxuYbb1uOmYQv/y5y0W2X7zSjHL7fMKv3k37mdIpUcD9rz6o81/eNN8qu05gln1cP0H1F6Z9yjGj2JJ+XdJZ0vRDTJd21nkYN49vSU+eyq8GevVrO/Rklul8/ef6kOx43fO5n+n3VOPWZSuSN1tQHfm1F9MxxWQpMznOxfgjiD05X7WpzAlKXFHHLmtGad0PUKr6UyKP/utrdpvKo9U3e/arPt30U0TLU8Z2nU/fvHXlMBL7GjIm3sXM2mW4eeX39jO2iYnSJuRc59SYJWmUyPnsX0Z45SESOaMj9BPyRYRKn7h2wHoetyfu/fKej+lL2zEt/o79zG4Xs3cGRudn7yeu9R7G3bPvs58RERERERHRZMHJ9yli+oL1qNpwDPXqX01jZgRkKNHHrIkRO6JUJisSu9dYkzQLm/XEgDOhItuG4tWY5cxNxLsxlJT9DqdvPRBk+oJHcOvoyCTNtbOHAm8DEWgseUA/ho6+rR/dON2N62Ux/Vhc6+3DtBV7dFnXP9kOdNrRi4HHzF92udw4siNjcsmv3o375ZTOfujIYFV2emItINoyqP7CtE85ZmnjXquc1b9Fz+5FeUy9FlUbB88Ds+/TkbRff+YtzKtLYWZtNYbOWu3NdL5rRw+h1P4yxZqYVG3EnnzMhUSuOmn6+soWc1krvu3FJfuYYrKV2c0r3m19QG6hsUKVUa/Vn8ZOxhXrWBE1zgwctb/cM7XrnNp8DNGV21B6dvSvVURJGXwnxtkmbneb8OeXB2kDko6oM6kut8CJ70jXWVBZO7cR85tIL3lom55od0eqz2x6JP2+4sdrvzTX+xARERERERFNDpx8nwJ0NF0DkNhvRemd7HjP3kLFIJPRTqRlvPMQpjX9ECU5RLcX2mSp97DpvHG5T98rWvZx/klUvZ7gS7yDW2UxHSkst7iZVvs4Ssr6MJQIPp9Eyg6VtetoaT1JmsMEoKRl2j3WJF160k0ifQMm0oRfezEdczKVmUzcymRh7y6JQh8dTS75lzQERfvKcWoeqrOf3QYyIV2m6iLHO5+xTUz8NhFYZnIv9dh6VfZ1qGhSf+fczz9kWTtKV76FKHboW+u4lZTNQ3TtcT2hHy17GHPXZd4P3m8/IiIiIiIimrw4+T5VxM9jKBlBqlwmEZbZL7qUxfTkjtxreF7bBzrC0SjxTnpiRchxoyvfwjyZCDndjVuxx9ITznJ7l9JYH656B4WO4kR0utNw4+zIBJSY2ST3Hc6d1zGLkQe5fcW8Z7ah1D7mDblfsWOM5eIlu1ymL12PGfqRzafejfvdjvoL0z51Oteny9pNolavDs5HVQwYPmvVc+lgdzpqNeh8OlpapVcWPkxk5duzLdmTdF5pMZW1ub34H1ObBGWmb+cit1c58LYVSdxxHtF1I2UxFp71oC1DdKkTcS1ptSO1Te06lzYf34leQ/qHVd05E+Ma28QEahMGhjxI+hLxakRXqfKJW7faSQvIu1dapF3JfexnyT3s7ch1WePDyXtit/WFi/xz3/ImaL+0wbj9gIiIiIiIiCYLLrg6RUjE3Lwae3HQ432INj6csRCce/v141sCbyMiMhYFzNpPIgOzFy90FlwtjUR0pOVQbA/KsRs9R+frxfic9MikhddCdRLlWLvCtWBnDHrBOT2ZYx/Xkb0Iqu8x88yDHM85lrXw3g6UOAvzyf2UDwDV65rV3stGjtlpLRZoOqYpD+5yc7jzN3rhxhd1uVqLBPrXu2k/33Sq192LFwqpS/ctEPKtPxG2fWakU227GT+UXvhQ0hGLHdL5kcdV2JJOZ9D5RLTtA70mQfbtHcK0Jb+y7tkVD2gv/secDGUmz52+IfcYd57///oP4dbcv9Dl4WwbWdCyD4n3+1Cx1ONWHq625lUPcnwp13gBF1x1+qYsDtzT25xeuHRU/as6di+4Ktgmbn+bcJNJ7OoN63HVteBqUB689hFB+3mlRco5e/zMXgDW/V7glEMu+0lZzer1v80NERERERERTUycfKcJSU/k1nbz5/eT1ESvP5lwq1i3HkO7nhuJ8iWjO73M/CZp72QTrU3oie11sfSXflMF2x4REREREdHkxdvO0IShI0s3WAvc1cv9d3O4dzJNHJOh/mQSSyJxZdFJuedybJV1+xLyxzKz6FuUHK/GLGeBzjvYRGoTEjVe88wH9tjTDhy1buUypSxcj2nHs26LQ0RERERERJMCI9+JiIiIiIiIiIiIiAqMk+9TgET8ERER0Z1FFm8lIiIiIiKiiYuT70REREREREREREREBcZ7vhMRERERERERERERFRgn34mIiIiIiIiIiIiICoyT70REREREREREREREBcbJdyIiIiIiIiIiIiKiAuOCqzRppMp/gNon5yOx/TkMRSL2q5NHyUNvoaaxGqnUe7jgkYdc8le68gPMjR323N8k7H40IlXeguqWdpSWqTocfA/JQfXi0eeQSGaWZz5lnesxJzIrDy+qPER0Hq6jGsMdq4uah8k8FjjjgCOV6sP1zi3oP3PGfiV/qZSqgw0vYkb8BZw62GG/anG2lWaVU2pwFy4MtmFezcjrUn8XOlSZ2nVXUteC0tp2lMf6Qow5byEam4e7r+xGfNfrGPbYV8qiCltw7n0r7+xj3u6UPib1Oqu3UfWF21c3pjafStWhYt0eRO16uLBrZLtxv7ptqL1nR7qdExERERHRnYWR73cAuYiuWdliP5u8Ismf49yrG8dtIqDQht9fg57tjUhesV/Ikkv+hg4+6Lu/Sdj9xsNkaJ8y6VLd0oyrHat1Hfbs2gGUjUyguuVa1vkcM9tEKrMKlYfhDpV+yUPHDgzbrxfTZBgL/OpIxoH+c31I7Guwymz/TmDFepSmMr4Hz0sk0oG+/btx037u5mwbPve8dT717+Qrz+O62iZtNTE4kpZ4HJjb9Li1ozJ8pgOJg2vyHjtKHtqGWb2rVR09qNoEEF260N4yQtp/tEGd+8jp9HP2MW93Sh+Ter2dE+/C1OanL/0pSuNPjbSlhSPt2thXTu/ArYax9XEiIiIiIpq8GPk+RZTUbUPVimUoURfKw+d24eIBK9JQIq4WtTxs/5Ulde75UdGRXjKi7SQ6M96HYTtiUCYmqlva0pF4yY7nMJB43Iq+RD9uYh4QfwFDZS+ifHY/kvuDo/ScPNyt9r9+/BDQ0JaO5JSIOInQ9Isa95NvHuR1icaMNQA31UV0iURLqv3c6R8dhQhctSPg/I7pFm3bhmFXxJww5S+zbp9XZdqc3t+v3oP280tnOoJW1UGy8xBKmlQdzM4twtRUf37pDGqf7ihhSadE5V5ztTOnXiQ/tU+2qXNbab218GXj+STq99Tun4967icoctFc1t7t5ZpKY+7HnLhlFm17Czi6BQmPyG2vtDhR1eZ+5L/N1FfC9mkTY7v2yV9QHUlUeMlRpx4krzEk7Ohw0xgStK22KY5z6hzpMnLqzN7WewCoXhdDv6ut6/qzo6h1/8/aLrzGLBP33/sdU8qovrY7XSbynH3szutjThlJmejnWef0qqMbWOiKQLfKKDvNfmXtcMptqKPBc8Lf+316pN+K6Er1Nwcy/8avr0j6oleeYvQ7EREREdEdiJHvU8SNwR24KNFY6t/FK/NRZUcaRs5sxMl9u/RkhY7WUv+cCQQTiRisaGnH8FE7ymv7FgzbEYN6MqUFSOyyjqcjwFpexky8bUdf9iGx/yk98a6jxDr7ULpgdOSjm1yAVzWd13k49eoaXMUjmHFldzqtEhEn58onAjNMHiQyTSJTL8TnAYM79ba4Sn+5Kxp0ZlM74ByzoxuYbb1uOmYQv/y5y0W2X7zSjHL7fMKv3k37mdIpUbL9rz6o81/eNN8qu05glkfkqltQ/YVpn3LMKLakX5d0ljT9ENOlnXUexs3jW9KTIBKl2atf26EnPUznk6jjZMfrns/9TL+nGrcuWxG62YLqyK+9mI4pJkuZDXTsVOfYg/oNx/D1tm2Illvt3S8tJXZ/8CsXYdrm21fG0Kf9mNq1KX+mOrLMQ3TtcV1mi9b+BNPi71iTsIY85DO+3LpyWEezy6RkWuxFLHr2J5hhP/Uyc2k7pg3G7WeFIWPKMOaPSufM2mW4eeX39jP2sTu1j1kR9tb5nF9kuHmVWSRyBgO7nkJCvmzYZZXRtQPW87g9ce9X1mNxS5WH81mmpO4HKI1VoySqnwa61nsYd8++z35GRERERER3Ek6+TxHTF6xHlbowl4vzmsbMiL1Qoo+hVF1EO5F2crGb2L3GmlRY2JyeLHK2DcWrMcu5to13Yygp+x1O31IgyPQFj+DW0ZHItGtnD3neQiEvY8kD+jF09G396Mbpblwvi+nH4lpvH6atsCZC6p9sBzrtKLfAY+Yvu1xuHNmRMTnhV+/G/XJKZz90RKMqOz0RFBCtF1R/YdqnHLO0ca9Vzurfomf3ojymXpPJjsHzwOz7dITo1595C/PqUphZW42hs1Z7M53v2tFDKLUnhazJK9VG7MmyXEjEpJOmr69sMZe14tteXLKPKSZLmUWSHejfbU2eySReyZPWZJwxLYqpXHIps1HG0Kf9mNp1UP7M+tO3ejn5SiuGYj/V9WHMQ079NqajcUvPjkTEp8Vf8JzcdH8RMHf2IVw8YJVRsZWUwXdinH3szuljQfzKTM49cFS9zTuT6gvXozS+I522oLp1bgOXz21ubhzZiVsxq8xiTfP1ZHxeClAeREREREQ0+XDyfQqQC/WqBiCx34ryOtnxnr2FikEmo51IvXjnIUxzRRqOp8lS72HTeeNyH4aPtep9nH8SfawnpBLv4FZZTEe2yq1AptU+jpKyPgwlgs8nkZZDZe06elRP6vUGTzZKWqbdY03ypCdtJDLVnmgy8WsvpmNO1jKTScKrcSsa1JgW+VtDP5oofcwkKH+5siYRR9rCmMjEa5lqTz53b9O/bMm6/YvzRcDJfa1Ilj2CaAGS4Sa/QCrB+cCJXfYx9rFsgXUk91KPrVfprkNFk/o7Z/2AkHUbxOo/Vpmd2r0Rw7DqloiIiIiIyIST71NF/Lx1r+FyuQhdZr/oUhbTF9Zyn9d5bR9YUZYmiXfSEwFCjhtd+RbmPVSnLni71QXvY+kLdZlcKY314ap3EOMoTgSiOw03zmZe/M9skvvk5s7rmMXIg/zsft4z21BqH/PGoP6PZYzl4iW7XKYvXZ952wifejfudzvqL0z71Olcny5rN5mwvDo4H1UxYPisVc+lg93pqMeg88lkZ6lKbzR2CImsfHu2JXuSxystprI2txf/Y2qToMxkkqum7Qcosc8nbWmWPdloSoupXIxlZjLe7dqQv7Qcxl1JZ0XtMisK3JSHXPIX34nejvOIrhtJc64iSbmVhyz+6n0rm3wMxVV5OpP40cd0tHS2YVWvGV84sI/dkX0skKHMpLwT8WpEV6kyiFu39kkLKOswaZH8OmR/d6R9Tgp8SyciIiIiIpocuODqFCELgc2rsRc5O96HaOPDGQuJubdfP74l8DYiQiYc0guyZe0nEwLZi645C66WqotRicYbiu1BOXaj5+h8vXickx65aPVa6Ex+ql+7wrWwYQw6SlMmCpzjOrIXc/M9Zp55kOM5x7IWbtuBEmdhN7n/r16wsFntvWzkmJ2r0+f0O6YpD+5yc7jzN3qhwRd1uVqLzPnXu2k/33Sq192L3wmpS/cicfnWnwjbPjPSqbbdjMttMazbT0g6YrFDOj/yuApb0ukMOp+Itn2g1yTIXgAvTFvyK+ueXfGA9uJ/zMlQZrq9tMzHLVf+3P3SLy03oNq8T7novmLaZugrGefLsU879/L2rXdDuzaVtfCqI+c8btJm5HYvsp9fHoTfNqdcZCHYnt7m9GKhkpe+05njS+bCrx+o9FmvO/nWbaShTy9aWbLumC4nhyxuGbcXhg0SlQUm7UVfvfaRcnUvuCrYx+7MPuaQye3qDetx1bXgalCZee0jgvbzS4uUv1+bT+dxUJXXUdUeXAvgmvYT0tdm9eZ3mxsiIiIiIpoaOPlOE5Ke8KrtxjnXxAxNHhO9/mTCpmLdegztei6niURimQmOS4XjN2l6J7vT+5j1pUDM49ZIkxvbOhERERHRnY2T7zRhyMSWE7EpEXUXOtSFqh3dRxPfZKg/a3LLisjUz11RmeTtTi8zjkvFI5HEUYxElN+p7uQ+piP77V9buSPwpxL9pd09O0b9yoqIiIiIiO4MnHwnIiKinLgnS7343VKEiIiIiIiI6E7EyfcpQBYNIyIiIqLJo2d7o/2IiIiIiIimKk6+ExEREREREREREREV2Jfs/xIRERERERERERERUYFw8p2IiIiIiIiIiIiIqMA4+U5EREREREREREREVGCcfCciIiIiIiIiIiIiKjBOvlOghvZX0N6QsS7vuFq56RW8smml/Wz8pRrasam9wX42IqhcZPsrr7SjIZVCKtWA9lfUc4/j5CJVtRKb7GNNRlUrN2H79u3p8hgPqSpV5qrtyHnlX3tDlX79dqTFi27Xr2zCyirVPnT9WmktRFsvVHtJparS/a/KPpb7tbDcfWMsMvqYuwztcp1qpNyd9lyotjKW/jBe49JYx8+G9k26bbjbcTYph00rrTFiMvRNk8nUb4V+j7XLnoiIiIiIaKq5K1a74O/tx1rpjBkYHBy0n1n+rKxs1GvFMvzF5/YjKhS52N/87VIc+ehT+5X8fPpRFz76NGI/G39nDn+GqmVfxUdHztqvjK9VbcuR+PX/wNmhzDIIKhfZ/pX7H8CfjnyIP0b+iA9PfQX31/wpVD1Ehs7iSNdH+DSSez2Mtd4LaejsEXR2dqbLI598hDX34TbUJH6Bra+9qc/90adD+vVipCVMWet2ff99mP+1m3j/Xw6p+u3Cl5fMwe+2/vfANAWdL0x78RKJDOHMcBXuv28+vnbziNXeG7+N1fel8En3zsBxwS+d7r4xljRm9LHrvboMe768BKXnk5hfmcSRs1adTxVnj3Tptivt5Ldb/gH/7f1ee0t4Y+kPhWpnQSKRT0OPn1Ur2/FQ/DW8/t9U2X2yAN/5ixv4KKtdyMT0d773NfzutUM6L5Ohb5pMpn6rj/OHJBZ+bznu6izMeExERERERDSRRP6y5a8yQpjm3Hsves+ds59ZamtqRr1WLFcuJ+xHlI+qhna0rq1HpbpwvXSyG3vfOICL6rFElL3ausj+K0vq5F48u/O4/cybvvje+Kg+nn6eOol9G97Acfu51/kuYC5Wbd6I5kp13kvdePalgzrCrXWRem7vf6nxac90mkjU49ObK9HVU48fNVeq55fQs28vdh6/qLf75V1I9PPTrWuxSKfpJHrUaye2WvmQSEc5nv47tW3fXvX6xcy0SPltXnwCL9nllV+57EVP+WJcss+n911+SR8rXS52OZlkl2H6XCr9KikYGAAqK61yeXfbVhxUeQiqd7+867Levhb1GMC7+3pQ0fwo6it6rLpbtdn3fMJUD46Vm9rT5RHElJag+pMIT2mHDq9y9kqL6ZgZbUnaYE8SA11v4EDl0+H6mN2uTyRVmXVZ5ehOU9g+7dVeZHIxsG+q+vVsE+p8mxfLq1Y/WLlpEyqS8nSr6oP+9RCUTslrRbIcixaNbkvSV55ufTTdb99Vx/RuZ1l9TOdzOT7e2oXlm5ega6vPWOCqP91fDNtybhNqm3t8MW/zzl9Qm3e424l7nwFUQA2OqkzW4tEKdQxVpmjdjkfxLvapdtZql7V7/HTk0zdFvuPSgQvB7w/H5q7yLBdhGj/NY0FWWak+tzNrLJC2ul2N807bnCx902Qy9VsheW4e2IaXDma2SyIiIiIiosmOke9TxLUvJdH35pt4s6sLn8xZhtY6K+oz8ulH6Oj5Mu6f8Vv8eOsvdYRjVw6Rg1Z0nhVl2dFxGVUrKjHgikrzOt/7vRdx5vApfOX+GekIwT98aD3/9Y/fwGn13C+dZvfigTV/jZrzv8HW11QeTn2COU+0YsEnh3U0uumYjd9uQ+XvfoGtv3wTnZ/chQces/Lxh7mr8J3Kf05HRXceTuLPv/MX+OLDMxiy8ygaW5bji66RqHdTucjEw/ef+Bx7f/yanZYWrF0EnHTKrXQBltmRm1+aU4Uv/vEf8PrbwZGrEiXoFZkqEaufVa3GfV/8Rtftqc/qsPahu3T9mupd0umX9+uRP+IjlXY57l8v+gInu/fgtZM1ePzPk/iXg2/7nk/kUrcLluYeNSnRrn5p+fCLh431JxHCEgE947dbVN13ocvjVxPZaTGVyzX5Yun7T+Dz7l/gNWlLnaoNLv8m8G9H0Hs6XB/T7XrZV3Hw1wmsXj5Ttwt3msL2aa/2oiNhDX3z/zX1hzkPYFlElef8h1A6PAf/cca/4dcD96HmT0fw4Zf897v+R3M6Fyxtw39UbWnbP+zE7z5bmG5LeuLz+19F11arH8kx677/HZQetvqtsY/NfRirvxbH2x+dxl11f4Oa5BHdd/UEp0/9nbnmX7dnSs3jhN/4ImnxHXvQ6Js/+YWMX5t3R2u720k6KvxbEXRv24Mvvvld1Pdsw49/9zWsrkli587zqFLjZ+VJa/zs6jqCu1q+jQeSH2b8miefvinyH5dOm9ugoVz0sX3GT1O/lTrKLqs5S5eNHNPW2NKGioF3XOPVJOmbrjyMcu8k6rfKH+6qwprY5xnnIiIiIiIimgp4z/cpYu6S5Wi17wP8o+bMqLVi8DtfJHIRB7qB5lVzrRcal6O+pysdfRo+nT3oOnBMP4pclHMkUb/EOofpmMdOJFG+dqPetn1jM7DPirSbu6Qei5p/ZL2u/r366o/waH097ENqMqnTjO505F4QOWayeyTS9sKBLh3tmqkSK9vbseTjkYjAsRlAT5dVLheOnUBPuRXJaJJL3uW4Omrx+EVEju/EznQ0ov/5itcGR6cltzzkx3jMuUtQn1RtwY4WlnZ+8KWXClKHkYsHVStrHnWP8kKXp6lv5lKesu/ataqNn7DqX4ytHnpUdzymz5/RlhoXo7zn43Q/knR/3FOOxY3W+Ux9TG+30yd93xkj1Ab/+jNsC8qf3/hi3GbI3wi//mfQcwLH1dgo5dp94IL1mmPg3fT4KVRxj5RNUXiPE6Y2mFu5jB4/x9YGLZXlQPJSVpkpk6VvmkyGfpuWw/sXERERERHRZMPJ9ylAJolbHwW6t23Ahg0b8Mzek/aW4gg837EuJOuXo0qiTZvV39kTQcVIZ9AxZeLqpWef1du27etBefMqvQDdhUtJXOr+mX7d+ffss5mTqY3L69MTSAVTX4/6csBjnmfc5JL3fI13GyxGHopxzFwd6+pB/fKRWcailadP38wl79KX5DW5ZYXjdpZZNoluX1JfgUWtr1oTiq2LUFG/xN4aTlD+/MaXoG13NJ82mBOP8TOfNihtpAID6S9IcjEZ+qbJRO+3REREREREUx0n36eKngHrfq1VcuFeb7/oUl6pJ37kPsTtm15Be8MYJ4EM55OIt66ecix/2orey5joCEin3IdWJs5Gp68ey1dZEyDWvuXo+diegfE5pvwMvv2VdjTYUYsXLun/WI6d0BMdzrZsMsHSXN6T12TEhY8zJ9jmrlL5149cerqxde8AmjePnojzz/sYeNV7QN5DC2qDBnnnvRh5MB3zwsfoKR+JgJU8rmzfhPaVVfq5ZuhjQflzImwzSq0Ifdq3b4Ytz1z2yzed+phL0v3DmlRPQgJ3jX1MR7Dvy5hQlPuc6zoz1Z9pmyF/pvEleOzxzl/xjIyfonGxa/wMUOhxydwGA8rFa/wMaIOqyaDSybpqIxKdne1SUpqpd9j3pO2bJrkcc7z6rVvS3VGIiIiIiIimBi64OkU0tG+Cs5jeu+8m0dy8CCf3PpOOdnNv73l3b263MbDJRfTT25fjhGtRvaDzee0jgvaTiR5ZBM79miyeKQsGbvNZcNXvmG8ca8TTesW5emsBOL2ftdickAn29OJwattAT0964Tw55mJ7YTo/XnkcvajcWp32DVsvWYsi9uzDhhOL0wvaBeVd30dX7bfIVYY6n9u24uMl1iJ81qJ8Xah0Fu3LWODPu9798n5h7qqMBWWFREjKInhO+vzOZ6wHnzw4X2545l2l0S8twjcPcu/o7PPZaTSVp6TF1CZkEipjUc6sfuRX1sKvXevys89/AFL2Fei225NfeTr7e50vKH/Wc+++6ZX33R0ptP1ts66DkXp2FoMcSbdfmQmvdLoXzNyw9eORBSedenKnJXDhxrX43798Hok/mx+QTtUufOrPVLfGduYzvuh6yHXsceVPXje1ea+FhJ2xRepc/ranfqM15nRX6HHm3/bsQeSxr3kuWJ1LeynGuJRTG3SXi30+v/HTr46cNrhSFvO029s21yK8juwFVydD33TnL5u7HU3kfivtVBaYFXLsxSc2pMuQiIiIiIhoquDkOwWyJpIqsdO+SJ7qZCJuc2slXgrI751WLkQ0+XCcCuY36U3jg+VPRERERERTGSffyVNG5JxEvrmiNu9kLBcimkzc0fLu6GzKJBH+yzHyiwcaP/LLg82VXelfeBAREREREU0lnHwnIiIiIiIiIiIiIiowLrhKRERERERERERERFRgnHwnIiIiIiIiIiIiIiowTr4TERERERERERERERUYJ9+JiIiIiIiIiIiIiAqMk+9ERERERERERERERAXGyXciIiIiIiIiIiIiogK7K1a74O/tx1rpjBkYHBy0n1n+rKxs1GvFMvzF5/Yjmiga2l9By12d+OjTiP3K+Fq56RX8l6VfQdeRs/Yr4yvV0I7NLXfhyEef2q9YgspFtv9tWxU+6/wQf0Ajnt7+t2ir+gxdWcfJRapqJTa/uAzD6lifRm5PPYxF1cpN+Mn31mD58jm6PMYjD6mqBjz9vb/FujUtWLFiBeZc7lF1NXRb0uJFt+vV9+Mrpw7jTOkqVb//BWtaWrB8yZfH3NYL1V5SqSqs2vyi7n+nDp/BkDqW+7Ww6XT3jbGkL6OPzXWV4fIlulzPDk2+vmIibeZ7dnuWf4VoK2PpD+M1LqVSqi+PYfx0SF6/t+ATHDk7xP7H/pe3idb/hNTB7fx85tDt8unv4Xvr7LycUnlR9e9+H16+RL3+ifW63kc+Wz2Q1P2RiIiIiGgq4+T7HUBPBHy7dNTkca4+/ajrtl7YnTn8GaqWfRUfjfEiN6xVbcuR+PX/GDWREFQusv0r9z+APx35EH+M/BEfnvoK7q/5U6h6iAydxZGuj/KfGBtDvRfS0Nkj6OzsTJdHMSfqHHMfbkNN4hfY+tqb+twy8S6KkZYwZa3b9f33Yf7XbuL9fzmk6rcLX14yB7/b+t8D0xR0vjDtxUskMoQzw1W4/775+NrNI1Z7b/w2Vt+XwifdOwPHBb90uvvGWNKY0ceu9+oy7PnyEpSeT2J+5dSb1Dl7pEu3XWknv93yD/hv7/faW8IbS38oVDsLEol8OqbxU8jk4He+9zX87rVDOr3sf+x/+Zpo/U9IHQS1g2KzJt6XAyd+jdd++Sa6pO3bn5dWfa8Nn3f/Qr9+avgBfPeJOSNfWPwhiYXfW467ivzlHRERERHR7Rb5y5a/StmPtTn33ovec+fsZ5bamppRrxXLlcsJ+xHlo6qhHa1r61GpLmAunezG3jcO4KJ6LJFFr7Yusv/Kkjq5F8/uPG4/86Yv2jc+qo+nn6dOYt+GN3Dcfu51vguYi1WbN6K5Up33UjeefemgjspqXSTRetb+lxqf9kyniY563FyJrp56/Ki5Uj2/hJ59e7Hz+EW93S/vQkddta7FIp2mk+hRr53YauVDIs7kePrv1LZ9e9XrFzPToiOzFp/AS3Z55Vcue9FTvhiX7PPpfZdf0sdKl4tdTibZZZg+l0q/SgoGBoDKSqtc3t22FQdVHoLq3S/vVoTpWtRjAO/u60FF86Oor+ix6m7VZt/zCVM9OFZuak+XRxBTWoLqTyIUpR06vMrZKy2mY2a0JWmDPUkMdL2BA5VPh+tjdrs+kVRl1mWVoztNYfu0V3uxomUD+qaqX882oc63ebG8avWDlZs2oSIpT7eqPuhfD0HplLxWJMuxaNHotiR95enWR9P99l11TO92ltXHdD6X4+OtXVi+eQm6tvqMBa760/3FsC3nNqG2uccX8zbv/AW1eYe7nbj3GUAF1OCoymQtHq1Qx1BlitbteBTvYp9qZ612WbvHT0c+fVPkOy4duBD8/nBs7irPchGm8dNURw5pj9vVWO60P/Y/9r/s/E2W/qf7wm34fObUxcm9z+i255C29jTeyHjNi9PndqpzOyQNzQPb8NLBzPIgIiIiIppKGPk+RVz7UhJ9b76JN7u68MmcZWits6LOIp9+hI6eL+P+Gb/Fj7f+UkdY5fKzfStyz4ry6ui4jKoVlRhwRSd5ne/93os4c/gUvnL/jHT04B8+tJ7/+sdv4LR67pdOs3vxwJq/Rs3532DrayoPpz7BnCdaseAT62ftpmM2frsNlb/7Bbb+8k10fnIXHnjMyof8RP47lf+cjoruPJzEn3/nL/DFh9ZP+x2NLcvxRddI1LupXOSC+PtPfI69P37NTksL1i4CTjrlVroAy+zIzS/NqcIX//gPeP3t4Mg5iWzzioyTiLnPqlbjvi9+o+v21Gd1WPvQXbp+TfUu6fTL+/XIH///7d1vbBvXnTf6L+PkzV3bt0gvKyamLm4cx+kLqpIdCcgfO8U+Ykt7V0KzdZI3EhxcUBfd2i8iw24hoXmAdl9UehHBsvtmA1h9gBsK2PUCGxRSG3NLASms1k8hw5KsMTa208YLKQ5pxinixL7um0f3/M7MkENq5pCiKNmSvh9DMMnDmTl/fmeoOTqcg2mVd9nv95ruYS7zLk7P7cLfPZfH78Z/E3g8UU3b7t5X/ew+me0alJdL9142tp/MUJQZmNv+8BPV9mnfWwOU58VUL1/IwMXRVwoz+M6dUzGYeAG4PInrH9bWx3Rc79+K8fdu4VDif9dx4c1TrX3aL170DFpD3/xPU3/YsRf7Q6o+n3oJ2+/vwPPbLuO93E7s+moSlx4J3u7LT8353L3vMJ5XsTT08xFcuP3NQizpAZqjW5EesPuR7PPZo69j+3m73xr7WOPLOPTEn/Cb6Q+x5dnvY1d+UvddPSgY0H5XvwhuW7kdiSnOgs4vkpfAc4/cgiqgfPINmaCYn/b0JW+cFGaFvxhCZuhd3HvhB4hZQ3jrwhM4tCuPkZGPEVXnz8icff5Mpyex5eBr2Ju/VPJtnuX0TbH889KH5hg01Ived8D509RvS8/lh9GQ+63nnMT+x/63Pvvfg/r9bPvufXhx51bculx6m5vGvXux6+m9SBw+jEMH9iB6+4ZKL/3sF42dh/HCrf8o2ecnW6J49em7JbFJRERERLTRcMHVDaKxJYHu4WEMq58T8dLZbqsh6Hih0ALGMkC8s9F+oS2hLkTThdlTtefTQnpsSj8KLcgx8oi12Mcw7XNqNo9w13GdNnw8Dozas8MaW2Joip+wX1c/p06dQHssBmeXmgzqxJEpzPirRPaZzxRnis2PpfVsu1IRdCSTaJkpziRcmRystF0v81OzsML2DEGTasou+9WzAS8uIHRxBCOFWWnBx1u9GFyal+rKsDzGfTa2IJZXseDMVpQ4Hx8crEsbhhbGVZTF0REt+RJS3evT1DerqU/ZtqtLxfis3f5iZe1gqe44pY9fEkttzQhbM4V+JPmescJobrOPZ+pjOt3Jn/R99xyhEoLbz5BWqXxB5xdjmqF8RUH9z8CaxUV1bpR6zYzN26+5chOF86dQ1V2sm1Xhf54wxWB19bL0/FltDEbCQD5bVi8K+x/730brf0Gxa4pBUSnmF8YH0dvbu2SGe6QhBtUsyAz14tixQaQjLWhdLO1P0Y4kuhsy/jPcq/i9hYiIiIhoPePg+wYgg8Td7faFj1wYvZmac1JWR8XjTaWRjyUQldlu6prXvRBdjXxW2qdcOA8eO6bThkYthOOdKl+LmM/mkc28rV93f+Si0R3QEW2JWGEAqW7UFWosDPiMAa2Zasq+XGsdg6tRhtXYZ7Wm0hZiieLoz6rVZ0DfrKbs0pfkNe/Ay4Oss3Iyu7Yl1oCm7lP2QF13ExpiLU5qbSqVL+j8UiltUwuIwar4nD/rEYPsfyvH/vdwqBi7q/T7WW4iXbgdENCAiOdvC63JPiSQLty+j4iIiIhos+Hg+0Zh5ez7vEblgirmvOgRjugLT7kParLvJJKtK7wINRxPZlelrTASPfasKncmmlYhn3JPUblwX5q/GBKd9uCIvW0Y1owzAhOwT/n6fPJkEq3OjMb5rP7PNjWrL0DdtHJyIRoPW8saxJifKb3Ab+xU5dePPKwMBlI5xPuXDgQEl30F/Nq9QtlrVikGDZZd9tUog2mf8zOwwsXZsVLGjmQfkh1R/Vwz9LFK5XNn35bU2ir06cC+WWt9VrPdcvOp99lS6B/2oF4eMqHW2Mf0DNpRPXDk/sh9lnWbmdrPlGYon+n8Uvnc41++1VM8f4q2Zs/5s4J6n5fMMVihXvzOn9XEoJLNSyj6zzZm//MwtAP7X63WuP8ZYnc1fj+bSk+oItp1KvUZacjpP5DJY1mjoFnWJ3BmvMu97d26L8h7G4iIiIiIaOPhgqsbhMwschfzmpjIIx5vKlkUy5tuTaSq+xq1Qy6geoYTmPUs6FXpeH7biErbycVd+YJesnimLFg2FLDgatA+z0y1oUevVBcrLuQ2ai9SJ2SAvbDomkrLWVZhgTHZp75gdN7rx6+MSxej69J57x3I2ouyWaPonW0uLIRXqewyiCDbNXnqUJdzaAAzLfYCffZiaWlE3MXUShb/82/3oLLPN3aWLOQmZOahfFXczV/Q8YztEFAG948bvmVXeQzKiwgsg9zTt/x4Th5N9Sl5McWEDF6VLApY1o+C6loExbWuP+f4Y5C6b0DGiaeg+nS39ztepfLZz/37pl/Z/9/3F3H4R3HdBsV2dhfpK+Y7qM6EXz4L+8hmVN+YKS4E6LaTNy8VF3zswn979GPc+vpTFfKp4iKg/Uxta4yzgPOLbodqzz3eBR/V66aY91tI2D23SJvLe63Ycfuck2nQ55nL776L0HeegN+C1dXEy2qcl6qKQb+FMAPOn0Ft5MagKF9wlf1PvZ/9b132Py+/eKoUu0ExWGk7U170bWXaY2iQW0657eBTn+WLw0qcNM8uvZUNEREREdFGwsF3qsi+kI1gZHDceWVjk4GA/u4IBiuUd7PVCxGtPzxP2YIGHIlW02r3v/Xcv9kniYiIiGiz4OA7+fLOWCqfNbaZsV6IaD3xztYNmj27WcjM3QSKs6qJVttq9L+N8nuIfBulP5L2X4SViIiIiGgD4eA7EREREREREREREVGdccFVIiIiIiIiIiIiIqI64+A7EREREREREREREVGdcfCdiIiIiIiIiIiIiKjOOPhORERERERERERERFRnHHwnIiIiIiIiIiIiIqozDr4TEREREREREREREdXZlqef2f1T57G2fds2fP75584z29cff3zJa6vl/r27ziN6WLQmT+LglnOYvhlyXllbHX0n8cN9jyE9ec15ZW0ttibRf3ALJqdvOq/YKtWLpP/ocBS3z13CJ2hDz/CPcDh6G+my/VRjMdqB/p/tx321r5uhB9MOKxHt6MM/HXkVicQOXR9rUYbFaCt6jvwIb7x6EAcOHMCOzyzVVnceSF78SFyd+vEbOm/yk0i0IHr7fFX97GEpg6te8bm4GEVn/890f79y/iruqH15X6v1HODtiyvJX0mfbuxUZf4hXj14ULfdY1fO49qdB9sO9Sbn3iNO/9Ex2vLois/DK4ndtToPLi6qc8cKztcuKeuR3Tcwee0O+7sP9veHy8PW34W0wYP8/dNLyvKzHz5bUg6J17aeI/jxG6qMLaqMN1SaExf6d8e9ed3/iYiIiGhz4+D7JqAvlF/bvmTwuFo3p9MP9MLn6vnbiO7fiukHNPjeeTiBW+/965IL7Ur1IumP7dmLryYv4dPQp7h05THs2fVVTe0QunMNk+npZV24rrTd6+nOtUmcO3euUB8rGRCpVuPLh7Hr1jsYOH1WH1sG3sVq5KWWug7dnIb1aAu2/eEnGPhlWuXpBva+cRQ7blQe1Fnr+qxUvlri008odAdX70exZ+dTeOKvk3b/ansNh3Yu4kZmpOJ5KCif3r64kjyW9Okvr6syp3Ubbv84j6ciG2+Q5dqkxOU5PNqyA3/4yc/xP35/3Ump3Upit15xVkkodHNF52shg3KvH3kCF05/oPPL/r4U+/vD5WHr70LaoFIcrAX5g9zrh+7h1t2tyHnKIQPvzbMp1afP4sr9vXjlJc9EjU/y+OaRBLas8I9ARERERLT+hb578O8XncfajiefxPWPPnKe2Z7ZtWvJa6vlL5/dch7RckRbk+juiiGifsHPzmWQOjOGBfVYz7brbnLeZVucS+HYyEXnmT99UXu8Xe9PP1+cw2jvGVx0nvsdbx6N6Ow/jnhEHTebwbHBcT1rqbtJZrPZ22fbenzzaaJnIfZHkLZiOBGPqOdZWKMpjFxc0OlBZRd69nN3F5p0nuZgqddmB+xyyCwm2Z9+n0obTanXF0rzomcuNc9i0Kmv5dVLCla4GVnneHrbRFbvq1AvTj2ZlNdh4Vgq/yoryOWASMSul4mhAYyrMlRq96Cy2zM+uxBDDhOjFhri7Yg1WHbbdfYHHk+Y2sHV0Zcs1EclprxUaj+ZwSdx6PKrZ7+8mPZZEksSg1YeufQZjEV6aupjQo6XyA6oWHaOIfEWSWNwfMGYF9dyy+C2UYOqU2tC9YZ2VafWqM5rUPtViqVa4lOnB+Sld7ZZ9Tl5h93vOvr60JCXp3Y9BZWvUj6lrhryYTQ1Lc2L9M2e7vbCeWJC7dM/rsv6tJ6lm8DMQBqJ/hakBwLOPZ540f3TkGZqP9P5zJzmX75KfczljTPvNjnVeupkrOqkC+0Nah+qTtE9jHZMYDQfU3Gx9HztWs65QCw3zsbmK38eTTV2+taLMJ2vTW3kkngcVp8d3vOAbMf+zv7O/m6m+54KJmkD/bw81nxitx6/f7ptMZd6s9BHXZImfTcX7wksh86X5/dFIXmI54Z0HyciIiKizYsz3zeILx7J47/OnsXZdBo3duxH97P2rCyZbfe+9Sj2bPsD3hr4pZ6BVM3X6O2ZbfYsqPff/wzRAxHkPLN3/I73++sLuHr+Ch7bsw0XBv5Fv/eTS/bz9946gw/V86B8mj2Jva9+D7s+/hUGTqsyXLmBHa90Y7czY9C0z7bXDiNy4R09K+ncjS3Y+x27HPIV8tcj/1GYFX3ufB7Pvf5t3Ltkf/Xd1XYwgXvp4qx3U73IBePRV+4i9dZpJy8H0dUEzLn1tn039jszKR/ZEcW9f/85fvGbyjPLZOaX38wxmVF2O3oIO+/9SrftldvPouulLbp9Te0u+Qwq+5ehTzGt8i77/V7TPcxl3sXpuV34u+fy+N34bwKPJ6pp2937qp/9JrNPg/Jy6d7LxvaTGXzeWaZ+X50vz4upXr6QC/ujr+Bu5h2cllg6p2Iw8QJweRLXP6ytj4ntu/dh11fOjE/xyA7sbwbO5/dWFZ/LKoOKeTc+/y39e2zZ/X3E/+aPOPaLD/S2tZ5DaolPb19Zkpcn92J/SLXfUy9h+/0deH7bZbyX26nr6dIjwf32y0/N+dy97zCeV3kZ+vkILtz+ZjEvMrh0dCvSA3a/lX0+e/R1bD9vnyeMfbrxZRx64k/4zfSH2PLs97ErP6nPFXqQLiBern4RHEtXt5vPS0HnM8lL4LlObnkVUD75Rk5QH5v29F1vnBVmhb8YQmboXdx74QeIWUN468ITOLQrj5GRjxFV5+vInH2+TqcnseXga9ibv1Qyw3s55wKx/Dj70Ph59J+GetH7Djhfm/pY6WfHYTTkfltyDmR/Z39nfy++FuRB/f4p/fPFnVtx63LpbW50/DZfxi9+/alvOSRdbkn0nYZbeOf0eEmf/WRLFK8+fbckNomIiIho8+GCqxtEY0sC3cPDGFY/J+Kls8FWQ9DxQqEFjGWAeGej/UJbQl2opQuzi2rPp4X02JR+FFqQY+QRa7GPYdrn1Gwe4a7jOm34eBwYtWcsNbbE0BQ/Yb+ufk6dOoH2WAzOLjW5oIojU5gRV4nsM58pzqSaH0vr2WilIuhIJtEyU5xptzI5WGm7XuanZmGF7Rl0JtWUXfarZ8tdXEDo4ghGCrO2go+3ejG4NC/VlWF5jPtsbEEsr2LBmc0ncT4+OFinNlyq1vKZtpM0b3xOzViqZotWp/3846VSXoScR7q61Ptm7e1FrfVis1T3n9LHLIndtmaErZlCXqRtZ6wwmtuW5rO8T+t0J39yrnHPSSohOF4MaZXKF3Q+M6YZylcU1N8NrFlcVOdiqdfM2Lz9mis3UThfC1XdxbpZFf5xJmUN/Dyqql6Wnq+rjcFIGMhny+olQK1xbdpOxyb7uz4m+/vG6u9BsStlXcnvnwvjg+jt7V0y670tESvEtZ/QwjgGjx3DkDp2d09JRdvc2CMiIiKiTYuD7xuADBJ3twOZoV594fBmas5JWR0VjzeVRj6WQFRmg6lrQvdCbTXyWWmfcmEpF0WSNjRqIRzvVPlaxHw2j2zmbf26+3PsWOlgaqULrpqoC+tYGKhyTGZVVFP25VrrGFyNMqzGPpct0gDksjXnpdbt1rr9qiF9V/LuHQh5KNrIIbNdW2INaOo+ZQ+cdTehIdbipNamUvmCzmeV0ja1gM+jqvicr+sag+zvBezvS8vH/r5Uxdhdhd8/I+EGxE/Y7R6PNKGrv9NJKbWg2kRuU9TK8y4RERERleHg+0Zh5ez7oEblgiPmvOgRjugLM7lPaLLvJJKtK7w4MBxPZh+lrTASPfasI3emllYhn3JfTbnAWZq/GBKd9owie9swrBlnRCRgn/L18uTJJFqj9r7ms/o/29SsvkBz08rJhVo8bC3rIn9+pvQCuLFTlV8/8rAyGEjlEFcXb+UXysFlXwG/dq9Q9ppVikGDZZd9Ncpg2uf8jLqojqPDSZMydiT7kOyI6ueaoY9VUz596wI3rmstn2G78vhsS7TLHXyL1vAcUjEvQaqpl+XmU++zpZAXe5AtD5ngauzTekbrqB7IcX/kvsc6RkzxYkozlM90Pqt8rvMv3+opnq9FW7PnfF1Bvc+DgZ9H1dSL3/m6mhhUsnkJxeDZv+zvVaimXtjfN19/N8Tuavz+OT54rNDmGbkv/8CYfl3qNtnXh45W+/cAued7O3LwNoeWX/IKEREREW0yXHB1g2hVF3PuYlcTE3nE400li0Z5062JVHVfM3bIBUbPcAKzngWvKh3PbxtRaTu5+Clf8EoWz5QFvYYCFlwN2ueZqTb06JXcYsWFzkY9i91FPYuSqbScZRUW4JJ9NjsLvgXxK+PSxdq6dN57B7L2omXOAnPuQnGVyi4X2bJdk6cOdTmHBjDT0u/UhywmlkbEXWysZHE8/3YPKvt8Y2fJQmdCZuZ5FwQMOp6xHQLK4P5xw7fsKo9BeRGBZZB73pYfz8mjqT4lL6aYkMGdkkXzyvpRUF0L3/KpWPEuGKi3qyI+fcun0qsqgzpmv4rPwqKHMWDEWYg2qP3c/PiVbyXx6ZeXMykU2rwYV+6iefZ+x+BZJLOsfMIvn94FM3sHZooL87l58daZZ4FC4den/9ujH+PW15+qkE/VTgHxYoolY7sHnM90O1R7rvMuwKheN/Uxv4WL3XOZtLm814odt89xmQYdz5fffReh7zzhu0B2pf4nVuM8GPR5FFgvzvGCztdBbeTGoJD49i64yv7O/u6fZmj3TdrfvR70758ub1lKzi3etlV1Xb5QssRJ8+zSW9kQERER0ebCwXeqyL7QixQu2jc6uZjq745gsEJ5N1u90MaiB8OaZzHoDCI8SA9TXmhleF60BQ0APijs77QaVru/r+fzycN2DiAiIiKiB4eD7+TLO0OqfFbVZsZ6ofVMBr3c2bd+s/TW0sOUF6of7+zZoNmsm4XMpE2gOMt5rbG/02pbjf6+UX7P0n9kiqQL3ywgIiIios2Lg+9ERERERERERERERHXGBVeJiIiIiIiIiIiIiOqMg+9ERERERERERERERHXGwXciIiIiIiIiIiIiojrj4DsRERERERERERERUZ1x8J2IiIiIiIiIiIiIqM44+E5EREREREREREREVGccfKeKWpMnkWxddJ6tvY6+kzjZ1+E8W3uLrUn0JVudZ0UPul5EtKMPw8PDOHkyidbFB5uXlViMtiKp2lnKIj/J1qh+/WEo3+JitBCDUScP3tdqJfFTj3Itdz+L0Q70rUF9Li6qNj2p8ubTd5ZDYqCvI7rh2kE8TOcQ90fq2kvXcdLTD6PF/Aal6XNm2X6IiIiIiIiINqMtTz+z+6fOY237tm34/PPPnWe2rz/++JLXVsv9e3edR1QvMtjW/9p2TE7fdF5ZnpvTaUzfDDnP1t7V87cR3b8V05PXnFfWVufhBG6996+4dqe0Dh50vYg71yZx7tw5PLZnL76avISboQebn1o1vnwYu269g4HTZ3V5pm/e0a+vRvmW2x9CoTu4ej+KPTufwhN/nbTbvO01HNq5iBuZkYoxEHQ8iZ96lGu5+wnduYbJ9PSqx0oodBOXrjyGPbu+qvncI4O7rx95AhdOf4BPQ19uqHYQD8M5ZPvufdj553/GW07fm7xm9z0h9d/ZkwBm38PpX55FWuLGOQ+a0vBJHt88ksCWc/Xps0RERERERETrVei7B/++ZNrdjiefxPWPPnKe2Z7ZtWvJa6vlL5/dch7RckRbk+juiiESCiE7l0HqzBgW1GOZgXiqu8l5l21xLoVjIxedZ/70QNXxdr0//XxxDqO9Z3DRee53vHk0orP/OOIRddxsBscGx/XMzu4m9dzZPtvW45tPE5lB29MfQdqK4UQ8op5nYY2mMHJxQacHlV3IjOqe7i406TzNwVKvzQ7Y5ZAZn7I//T6VNppSry+U5kXqr795FoNOfT1M9eLV0ZdE1imXK6hepNyqCMjlgEjErs+JoQGMO2V3t2tADtaEqrH2dsSsUWPM6DYa7kJMbTMxaqEhrrZpsAp1Y6prmbksdeNy68jLt3yGfZa0u8SLlUcufQZjkZ7a+oOOA3lkx0JHXx8a8vJ0QMVhcPkq9T8pV0M+jKampe0gsdbT3V6I3Qm1z/I2sts2BSvcvKR+/JTHXSFuA2JibL5y7E41dgbmU/eXRFbXWWE7Zz+m9nNJ/Q2r/ufW10Zohwd1DnHrZi71pq4rl7zejRQGx+3zqZfUWw/OlLzfZUoTkr94bsh3v0RERERERESbBQffN4jFaBSN8/PO4GoS3UgXBj28A2C1sAdWmzHrGSAKOp6eDdmfKAxAuc9n1HN5rymfQdyBXUyMYmT8ot5HZ3c3kLIHyEz7bE32oXnWHqjXA7LH7XLoAcOWGbU/p470LM4WzJQNWMn2kXRxIM7rQdeLl9/gtLleTiKOUR0TMth33Bng1LGiq9auh9aOPnTFrCWD4UFkv11hCxOZNMaQQE8kjTMzLRXrWgYAE1l7ANVPefn0gGjAPu2BSlWITArj0u66rr3xsvz+oAd9VVmsmGrDTA7x5ixSubjO85msOZZMx5M/PLTnRzF0Zgpo6ym2g/sHJ6cd3HiROpDY9baRtK0MnHsHcCvxi5fAmPAcuzx259EWmE/9Xk/ZJZ8tM/bAtan93JgQ5QO4G60d1vIcYhp8L/zBQv5QNVrsh7KfRAMQjjl/jPP+0dOQJqStvH84ISIiIiIiItqMeM/3DaKxJYFu5569J+KlMzxXQ9DxQqEFjGWAeGej/UJbAjErrQeERO35tJAem9KPQgtyjDxiLfYxTPucms0j3HVcpw0fjwOj9sBVY0sMTfET9uvq59SpE2iPxeDsUpPBujgyvgPvQda+XoKZ95mDlbbrc35qFlbYHnyTeslnigOgUzOWeudy5OyZwRcXELo4ogdCq6nr5TLus7EFsbxqN2cgUOp+fHBwWe0YRNqwq0vV0axdd2Jl5bNUSE7p+va2A9qaEbZmCu0gZZixwmhuW9pG82Np/Y2OlfOPCWPsGvJZFEFHsjjwLqqts0gYyGfnnWdFG7kdVuscsjA+iN7e3iV/4HJft39S6gA9hXvqRxpiUFWIzFAvjh0bRDrSUrinvSmtwK1HIiIiIiIiok2Kg+8bgAwSd7fbgyAygPJmas5JWR0VjzeVRj6WQFRmZsbV+8bswbPVyGelfcoA8OCxYzptaNRCON6pB5bms3lkM2/r190fGUDyDtC2JWKFwchqrKd6WUvV1PVyrcY+qyHxJMfxDmA+qLysqYDYrUoshlgY8I6hr7TONmo7POhziAzwyx/bvEPmuYm053ZADYh4/phhSiMiIiIiIiIiDr5vHFbOvrdxVAZlYs6LHuGIHnSWW68k+04i2Vo2Q3G5DMeTAZy0FUaix56ZWXILhgr5lFsgyMzNpfmLIdFpT6e1tw3DmnFG8wL2Kbd0SJ5MojVq72s+q/+zTc3qQSw3rZwMZsXD1vIH7ta8Xgwq7NPP/EzxDxSiLdGOBv2oaNl5qVDXNTHtc34GVjiODidNyt+R7EOyI6qfa4b+sCrlW27/0/tsKbSD3GKkJZaHTPQub6PGThVP+lFRTfFiEBi7hnwWWBkMpHKI9xfzXG1MZPNSdVWO6G6UdljDc4iUJ9nXh45Wu29EWzv0ug3uqXIqPaFOvXb55b2RBpXmnHZNaQV570mXiIiIiIiIaPPZ8vQzu3/qPNa2b9uGzz//3Hlm+/rjjy95bbXcv3fXeUTVCt25hvt7v48fv/EqDrywEx//8Qa+Ff8H7PjsfUzfDNnpz34f//jGayr9G7j1x3cw8sGXztbVeAR7D+xC7twl3Aw5+zMcT3xx9Qb2Ht6FC6c/0NuIarbbvnsfXty5Fbcunyu81tn/Izx/dwLv3noe/3TE3vber1L41w+/NO7z0s0d2Lsngsi3DuONVw+q9P8NN341gt99qsoQuolLN3bg77qP6LREogV7ol/DjUtXcUflt+2172PbhZFCHvw92Hqx7xf9I7xx8CB2bm3At9T/Uo7HrpzH9YXrgfvM7+3HP74QwVMvRHH7XB7P9f8AL0SeRmLHZ0j/7gOcv78fR398GIcO7MEjc3/ErW8A05PX9DGFb16iHej/2Q/xYsM27HxR1fWBA2h51MLktTvGuv5C7hmuyvAPT29Dw7fs7XQ+pm+ay/flp4H7/DL0Ja7euI+Xu3/stLuKl7lU4V7gur4N/aG8fLpsP3gekadfKuRN7kX+jy9swzea9qj8/Cv+5XJwLAUdT/bxytMNaNrzGM6dv6fi3NMO0xdV+Xbj9aP2Pg/s2YaPU2fwwZf2/m6oNupWbfSq1M3d3+KPi3F8b/9jSDvttNx4ufeyISZUeYVv7Oq29c+nPt4/fQ87b83h3N2n8dqLL+BFdUwd158Gt5/UmeuTLVG8+vRdOx42SDuUerDnkFDojiqf6iuv/ECX74Vv3MWvUv+CD1X5dLqU8WuqjEdUGQ88jUd+O4Jfq/NnpTTRdvAwHpn9ZUC5iYiIiIiIiDYHLrhKFelBtP4IRqpcdHO9k1mx/d0RDFYo72aoF73AZfPsshYnJaoXmVHdM5woWZB0I9mo55CN3m5ERERERERE1eLgO/nSs0yPtyMSkhmsWVijA0sW6tuMNkO9yID7qW57wcbF7BxGU2f07SyIHgS5XUoCxW8urHeb5RzSH0ljcIO0GREREREREVGtOPhORERERERERERERFRnXHCViIiIiIiIiIiIiKjOOPhORERERERERERERFRnHHwnIiIiIiIiIiIiIqozDr4TEREREREREREREdUZB9+JiIiIiIiIiIiIiOqMg+9ERERERERERERERHUW+u7Bv190Hms7nnwS1z/6yHlme2bXriWvrZa/fHbLeURUFO3ow4l4BIuLcxjtPYOLoZCTsnoWo63o6e5CU8Q+1lzqbYxcXNCPF6Md6D/egEyVeWlNnkRXzFq1vMv+m2d7Vf7sfXf0nUQ7JnBscFw/X8+WW9cPm0qxu9blW6vjueX2Kq+D8vdI+q8zYXR8x/taFtZoytP3iv1yMTsHC2HkUgMYX3gwsVGv+lxcjKKz/7jut0MDY1hQ+/K+thH6cr2tVp3V63xt2o/EfjdSGBxfYF9Zps3WV8o/3x+E8vjLZt7WsSsWF1Wc9btxlim0ScW01iT6I+nCfoiIiIiINqotTz+z+6fOY237tm34/PPPnWe2rz/++JLXVsv9e3edR1Qv+oL3te2YnL7pvLL+3Lk2iXPnzuGxPXvx1eQl3FzBhXu1Gl8+jF233sHA6bP62NM37zgpQOjONUymp6vOx83p9KrmXfY/fbO436vnbyO6fyumJ685r6xfQXW9XuK6UuwuN5YqqVQv9T5eECn3oy0t+PM//wSnz6Z968Ctm/c/24E9t97Ff//F7/Dn65P4bEcLbr3rbHflPvb+4CVsOWdv13nkIO6mfm6n3chjx7e+BVyexLU7q1ueIPWKz1DoDq7ej2LPzqfwxF8n7f7c9hoO7VzEjcxISf8m20rrLKiN6nW+DtqPDBS/fuQJXDj9gX6dfYV9xaT88/1B2L57H3b++Z/xlvP70OS14u9DbT2HEXrvLTvO7u/H0efyhXRTGj7J45tHEoV4JSIiIiLaqDjzfYOItibR3RVDRF3AZOcySJ1xZoOp1091Nznvsi3OpXBs5KLzLJhcEPd0txdmzU2kzugZc3om03AXYshhYtRCQ7wdsYbi7D43Lw0q3ZqwgHaVbo1WPGY123X0JZEdKJ01F1R2sXTmHzDrbG9Kk5njcfW6S2ZsubPpZBZad5PUw9KZzOZ9JtGQD6OpSWZBZzExVN0MRO+MM9nnqGqHi9IOMmBxvF2XW6d58mPPNosgbcX0tuUzIk1MZQjKi37u3U6OZ+WRS59BNjFcmP051daj49Gtz0qxFFTXprh20wrHKHtuEhRL7jcJRvMxlZ/S+jSlefnFbtWx5KlPiZla+7v5eP79XdpchRlyOSASWV7sdvT1AakBFQP9iKSDt5F8e2dAtib7Cu+360HFsjNjUu8zk8K4Tyyv9/jszTSgv1nePYtB9V4pa0Neng7oWa9B7V6pjUznSDfN77wbeO6pUC9BTNuphMB2MJVPx46pzoLK4NS7l7evmM7XQX1FlNZ1Cla4eUm/l2MPN88WjiXYV4rYV6QNgj/fhV8+59GoZ//L7y5unZXXe1a1W1D5hFuOudSbuh5d8rr7TY1ypTGo8p3I6japlCYkf/HcEGe/ExEREdGGxpnvG8QXj+TxX2fP4mw6jRs79qP7WXt2UejmNN63HsWebX/AWwO/1DOW0lXMLtMXjEe3qov403qf587n8ezR17H9/CV8GvoU0+q129FD+F7TPcxl3sXpuV34u+fyuHTvZRx95S5Sb53Gv6V/jy27v4/43/wRx37xgbNnf3JRVs12u/ctnUUYVHbR9tphRC68g4FfnsW5G1uw9zsR5JxZVqa0a5NpWI+2YNsffqLS00h7ZpDLLDS/mYnCtM/d+w7j+Xu/wtDPR3Dh9jfR9dKWim0h9fJ65D8Ks++lHZ57/du4d+kqvvzyOialbWQ25PufIXqgeCzgSex99XvY9fGv1Laq3a/cwI5XurH7xvmKsx6DyvBJY2dgXr6Qi/6jr+Bu5h2clu3OqeMlXtCzLD/4XXH256efqniUvDqz8kOhm4GxNK3aMKiuTXEtaTIbNP/eiC5r+XOToFjS3yRQ9RmZs+sznZ7EloOvYW/+EsZ+HZzmPZ5f7AaVT99CIaA+ZZ+19vfg4wX39w+v/163z04Vu7LPK7efrSp2xe59hxD/7kE0feMrfHzBMOP2yb3Yv/VPhX775N5DeOUfDuLAgQM4+OK3sPg//x2/uf6lTrt64z5efuUHeOPVg0i07MBjN+x6NvWVdROfW1U9hNS556mXsP3+Djy/7TLey+3Erq/s2b1B7S6zok1tFLSd6bxrPPcYPgOkXoKY6vPX//pvge1gLJ/ETkCdXXok+Jz1pRzD0FeCztemviLnSLc+7bo+iK4mYK5wXra1HTyMhtxvC/Eu2FfYV7zsbwnYdbb0890/n7+/vqA+q66oOt6GCwP/ot/7ySX7+XtvncGH6nlQ+Vwyw/3FnVtx67J8268Yg/L6d+Pf1XGWSLQgevt8If2T/NdwqPsQ9h3ah/3bQ8ikx3HTiV9TmvhkSxSvPn23pO8REREREW00XHB1g2hsSaB7eBjD6udEvHQWWU3amhG2ZgozokKhBcxYYTS36aeOnD3j7+ICQhdHMDK+oPIRQz5TnEk1NWOpd1VW63bCVPap2TzCXcd12vDxODBanDlmSquVeZ+Wejqlyzg/NQsrbM+SM5F6aYqfsPenfk6dOoH2WAwtjc4bjCykx6b0o9DCAsYyecSq2DCoDMa8NLYgls8UZlhKvIwPDgbO3lxqaSytxFTaQixhB6sMjMSh8lZFXoz9KDdRqE+hmrBYn6a0WlSoz7Xv7zlYabt81cauLYfM229iVL4+4SFt0pdsdZ75sbfr7e3Fm2++DSvWjWSr/SWt0MJFjAwe02m9qVk0HO9B6+LihorPsQzQ1aXOibPFmBLmdg9uo6DtTOfd6s49tdZLLduZY9CvzlZ6/vQ9Xxv6Snl9zo+l9TeHykXCQD477zxzsa/4YV/xF5RPaS+pk3inc/C2BGJWupBvc70AC+ODOl7K7y/vvm7/pNQBehBVsSQaVfVlUgMYPDaIgfQsIp6uaUorqPrzhIiIiIhofeLg+wYgF6Td7eoCZ8i+MHozNeekbHyVyi4XuYPH7MGHoVEL4Xhn4YLRlFareu9zPpvXC5vJ/tyfY+oitvqBkOULKsODyEutQgvjsMJxdETtgabygRk/66Ufrcf+fnGk9jixB5PyCEeWjpjK4OKsFYYkbaT4lD4oefcOgNXa7rVut57qU/jV2Xorg2BfKcW+slTFfE6lkY8l1Od2FJ1x9b4x+w89tZavnMSZ/OHBHTJviTeg8Lck9X+DZ5aGKY2IiIiIaLPg4PtGYeXs+4tG5WIr5rzoEY7oAVS5l2uy72RhZlygqVl18dZSGDiW22C0xPKoNIY5P1M64NyWaEeDflQk9w6VWVfePFSzXaCAssvtAZInk2hVF+1iPqv/00xptVrpPv3qxW6HRGGfyxNDotOdMSh1E4Y1414F+x/PWAZTXuZnCgMkQo7XkexDsiOqn6sA1IM+Oh/9cv/bOjHEtZ7pn+hEImbBmeRY4FvXwtiPivUp2pq99WlKq0Gl+nxI+rsrsD7LyPv0e1Rg5Z3y6VvsqDIsnQls0+nNdroMHvX1dSDq1otKaw7noat6A8VnoErtHiRgO+N5d0XnnupjolSd26GaMtSxr5TXZ2NnwrcM2bwcdukAuRf7SjFv7Cs+DOWTwfG0FUaix571XvKNvgr14pcXiZ1kXx86Wu0YiLZ2qHbPwf31QOK5EM4y1d3DlFaQr8MvYEREREREDzEuuLpByKJW7mKPExN5xONNJQtmedOtiVRVX3mWi3ffBVfV696FwITM+nIXzNILwnV5FiVT13cjg8WFLuXizm9Br6Dt9D12h7vQ5Dmed5G0oLKfmWpDj16RLVZcOG7UXoxN79OUVn48dwE4Q17G5oOPV1j0TBaKG5gpLormWeAvsF687aD2mbOsJYukycVxz3ACs86CbO4ioEOGBVf9jmeqF51uyIsMmpQs0ueJsyVt6yxU15uOBMZSpXYXleJa6iFmLV3MLaiuzbHkv4CtXWeGNFO8GMpnqs9a+nul+gzq725d2Qv2pRGpMnbd18q57/GWTxamHCzbl5ekp85MYb6xE/3dDch74tMbD+s5Pr3nVbdui4sl2vuVxTj92j0d6Te2kSleTOfroPrU7WD4DBB+MeEto8v42eG0w1Au7lu+/3X9Mm7tajLW2Rg6A2NC+LVRpfN1UF8RSxdc7dLnYln80iXl9C64yr7CvlLeV7zKP9+FKZ/CbxtRabugvJTERPkCvfoz0JPmWWDYlCak3Zpnl97mhoiIiIhoI+HgO60qfbHaPFsYLKhWrdttVvYFbqTkjxybnQw+dPYnMKMu9r1/qKiFqX5Z91SLesZnvfC8uzaCBkbJ32bvKxv1M4b9gIiIiIg2Cw6+U93JRempbnshr/IZUia1brdZlcz+W8yWzFDfzOyBGns2o37uzGhcCZl16e6vfEagKY2o3GrE50rwvPtgyAzjBJbO8KaizdxXNsPnu/4DRiRd8i0AIiIiIqKNiIPvRERERERERERERER1xgVXiYiIiIiIiIiIiIjqjIPvRERERERERERERER1xsF3IiIiIiIiIiIiIqI64+A7EREREREREREREVGdcfCdiIiIiIiIiIiIiKjOOPhORERERERERERERFRnoe8e/PtF57G248kncf2jj5xntmd27Vry2mr5y2e3nEdERdGOPpyIR7C4OIfR3jO4GAo5KatnMdqKnu4uNEXsY82l3sbIxQX9eDHagf7jDchUmZfW5El0xaxVy7vsv3m2V+XP3ndH30m0YwLHBsf18/VsuXX9sKkUu2tdvrU6nltur/I6KH+PpP86E0bHd7yvZWGNpjx9r9gvF7NzsBBGLjWA8YUHExv1qs/FxSg6+4/rfjs0MIYFtS/vaxuhL7vWKgYXF1WsDHchZo3i2MhF59XlkzjtRgqD4wuM62XaTHEtyj+LHySJw+Pt+SWfO63JPsRjDWjIFdtE6P7S78ZgpjStNYn+SFr3ASIiIiIiWp4tTz+z+6fOY237tm34/PPPnWe2rz/++JLXVsv9e3edR1Qv+iL6te2YnL7pvLL+3Lk2iXPnzuGxPXvx1eQl3FzBYEC1Gl8+jF233sHA6bP62NM37zgpQOjONUymp6vOx83p9KrmXfY/fbO436vnbyO6fyumJ685r6xfQXW9XuK6UuwuN5YqqVQv9T5eECn3oy0t+PM//wSnz6Z968Ctm/c/24E9t97Ff//F7/Dn65P4bEcLbr3rbHflPvb+4CVsOWdv13nkIO6mfm6n3chjx7e+BVyexLU7q1ueIPWKz1DoDq7ej2LPzqfwxF8n7f7c9hoO7VzEjcxISf9e79YqBkOhm7h05THs2fVVzecJGSh+/cgTuHD6A51fxjXj2qT8s/hBkYH01w/dw627W5HzxGa0I4mX/nQav/gfEme78fq3/z9MX7N/t2nrOYzQe2/ZMXh/P44+l8ekk4ZP8vjmkUQhXomIiIiIqHqc+b5BRFuT6O6KIaIuirJzGaTOODPM1Ounupucd9kW51JVzQKUi+ye7vbCTLyJ1Bk9C68wmxA5TIxaaIi3I9ZQnNXt5qVBpVsTFtCu0quYeVjNdh19SWQHSmdxBZVdLJ1NCMw625vSZOZ4XL3ukllg7gw9mdnW3ST1sHQms3mfSTTkw2hqklnQWUwMVTer0TuLUvY5qtrhorSDDIIcb9fl1mme/Ngz2CJIWzG9bfksSxNTGYLyop97t5PjWXnk0meQTQwXZv1PtfXoeHTrs1IsBdW1Ka7dtMIxyp6bBMWS+02C0XxM5ae0Pk1pXn6xW3UseepTYqbW/m4+nn9/t2dPArkcEIksL3Y7+vqA1ICKgX5E0sHbSL69syplZqb7frseVCw7szD1PjMpjPvE8nqPz95MA/qb5d2zGFTvlbI25OXpgJ5JG9TuldrIdI500/zOu4Hnngr1YhJUZ0FlGJtv1LOk5Xzs1ln5PqYaO31jV+jzZCKr67OwnbMfU7y4pH2Gm2fLPocY1y7GtbRB8Gex8MvnPCrHdVa1W1D5hFuOudSbuh69JC2RHUAu3lPyueP9HNLlVb8njKhji9L4LPYbl+Qvnhvi7HciIiIiomXizPcN4otH8vivs2dxNp3GjR370f2sPWMpdHMa71uPYs+2P+CtgV/q2XjpKmas6Yuyo1uRHjit93nufB7PHn0d289fwqehTzGtXrsdPYTvNd3DXOZdnJ7bhb97Lo9L917G0VfuIvXWafxb+vfYsvv7iP/NH3HsFx84e/YnF3rVbLd739LZw0FlF22vHUbkwjsY+OVZnLuxBXu/E0HOmbllSrs2mYb1aAu2/eEnKj2NtGcGucxs85vtKEz73L3vMJ6/9ysM/XwEF25/E10vbanYFlIvr0f+ozD7Xtrhude/jXuXruLLL69jUtpGZli+/xmiB4rHAp7E3le/h10f/0ptq9r9yg3seKUbu2+crziTMqgMnzR2BublCxlIOPoK7mbewWnZ7pw6XuIFPXPzg98VZ/1/+qmKR8mrMytfZqYGxZLMxguqa1NcS5rMMM2/N6LLWv7cJCiW9DcJVH1G5uz6TKcnseXga9ibv4SxXweneY/nF7tB5dO3ZQioT9lnrf09+HjB/f3D67/X7bNTxa7s88rtZ6uKXbF73yHEv3sQTd/4Ch9fMMzifXIv9m/9U6HfPrn3EF75h4M4cOAADr74LSz+z3/Hb65/qdOu3riPl1/5Ad549SASLTvw2A27nk19Zd3E51ZVDyF17nnqJWy/vwPPb7uM93I7sesre8ZwULvLTGtTGwVtZzrvGs89hs8AdxZtkKA6Cy7Dh6r/XVHv34YLA/+i3//JJfv5e2+dwX+iLTB29b6378Z+Z+b7IzuiuPfvP8cvfnPdWL47Tp5E28HDaMj9thCbgnHNuPayvyVg19nSz2L/fP7++oIxrj9Uz4PK59q+ex9e3LkVty7LN/OKMajL33wZv/j1p0s+d7zPJQ527Ntf6Cuf5L+GQ92HsO/QPuzfHkImPY6bntj+ZEsUrz59t1D/RERERERUnUdkprv3h9anxpYEuoeHMax+TsRLZ6bVpK0ZYWumMMsqFFrAjBVGc5t+6sjZMwwvLiB0cQQj4wsqHzHkM8XZWVMzlnpXZbVuJ0xln5rNI9x1XKcNH48Do8UZYKa0Wpn3aamnU7qM81OzsML2zDsTqZem+Al7f+rn1KkTaI/F0NLovMHIQnpsSj8KLSxgLJNHrIoNg8pgzEtjC2L5TGHWpsTL+OBg4IzQpZbG0kpMpS3EEnawykBEHCpvVeTF2I9yE4X6FKoJi/VpSqtFhfpc+/6eg5W2y1dt7NpyyLz9Jkbl6xMe0iZ9yVbnmR97u97eXrz55tuwYt1Ittpf0gotXMTI4DGd1puaRcPxHrQuLm6o+BzLAF1d6pw4W4wpYW734DYK2s503q3u3FPfegkqg7SX1Em80zl4WwIxK23nu6rPqgg6kkm0zBRnxFd7bo2EgXx23nnmYlz7YVz7C8qnMa4Vc70AC+ODOl7KZ723JWKFOluORlW1mdQABo8NYiA9i4jfab7qcz8REREREbkekdvJeH9o/ZGL3O52ddE0pC7a5aI+NeekbHyVyi4XzoPH7AGNoVEL4XgnoovOYIchrVb13ud8No9s5m29P/fnmLowrn5wZfmCyvAg8lKr0MI4rHAcHVF78Kp8sMfPeulH67G/XxypPU7sAao8wpGyUVFFBixnrTAkaSPFp/RBybt3UK3Wdq91u4euPqfSyMcS6lwURWdclWesfEDcIBZDLAx4x9DrUT7GdSnG9VIV8xkQ17WWT0TCDYifOKUH7eORJnT1dzoppeQbVnJbHneCQEu8odhH1P8NpX/BIiIiIiKiGj3i/E/rnaUuoNTF42JULuBizose4YgeQJX7wyb7ThZm2wWamlUXhC2FgWO5SGuJ5VFpDHN+pnTAuS3Rri7uSsm9SOWi0JuHarYLFFB2uZVG8mQSrVF7n/NZ/Z9mSqvVSvfpVy92OyQK+1yeGBKd7ixEqZswrJni6JPf8YxlMOVlfqYw6CLkeB3JPiQ7ovq5CkA9kKTz0S/31K0TQ1zrmf6JTiRiFsonAfrWtTD2o2J9irZmb32a0mpQqT4fkv7uCqzPMvI+/R4VWHmnfPoWO6oMS2cX23R6s50uA1J9fR2IuvWi0prDeeiq3kDxGahSuwcJ2M543l3Ruaf6mKiWDFanrTASPfbs4MI3iqqJXSuDgVQO8X7PH0OrLF82L824dIDci3FdzBvj2oehfIFxLSrUS1Bext1vUKifjNzTfmDMSQFU1SDiflQ1tuhvjbgk1guhLtPg/eTr8MsSEREREdEmE9r37b8t+a3db3FVLrj68JOFstzFHicm8ojHm0oW4fKmWxOpqr5GLQMCvguuqte9i4sJmUnmLsKlF5nzLnSmrhndBb2EXDD6LRIWtJ2+H/VwF5o8x/MuvBZU9jNTbejRq7zFiovRjdoLvOl9mtLKj+cuKmfIy9h88PG8C/31DswUF1rzLIYZWC/edlD7zFnWkoXXZLCmZziBWWeRN3cR0CHDgqt+xzPVi0435EUGYkoW/vPE2ZK2dRa/601HAmOpUruLSnEt9RCzli4QF1TX5ljyX8DWrjNDmileDOUz1Wct/b1SfQb1d7eu7EUA04hUGbvua+Xc93jLl1X7Gizbl5ekp85MYb6xE/3dDch74tMbD+s5Pr3nVbduiwsw2vuVBT792j0d6Te2kSleTOfroPrU7WD4DBB+MWGqs5kWcxns95ae51xBseseT7flbHNhsdBiDAbHi0vqx7vgKuOacV0e115+MWrKpwiK60rbmfLibUdvHxIdsnCq8/vIkLPgr9Db9DuxpAfty/NzEs2zS29zQ0REREREZhx8p1WlL4CbZwsDENWqdbvNyr5ojpT8kWOzkwGNzv4EZgbOlAym1cJUv6x7qkU947NeeN5dKmhglPxt9rjeqJ8H7AdERERERLXj4DvVnVzoujMM9eyplLpYc2bMmdS63WZVMqNwMVsyQ30zswd/7BmS+nnZrL9ayExOd3/lswxNaUTlViM+V4Ln3cpkhnECS2d4U9FmjuvN8Fms/4ARSZd8C4CIiIiIiKrDwXciIiIiIiIiIiIiojrjgqtERERERERERERERHXGwXciIiIiIiIiIiIiojrj4DsRERERERERERERUZ1x8J2IiIiIiIiIiIiIqM44+E5EREREREREREREVGccfCciIiIiIiIiIiIiqrMt/+f/9dRPncfa1x9/HJ9//rnzzOb32mq5f++u84jowWtNnsTBLecwfTOkn3f0ncQP9z2G9OQ1/Xw9W4x2oP9n+3H/3CXcDNnle5hEO/rwT0dexYEDB/RPItGC6O0bqi3uOO+ov8VoK3qO/AhvvHoQiZYduP21vTi8O4/Ja6t3TJOHqY3WKi+Li6oNhn+Ew9HbSE/fdF6tbC3jZXExis7+n+lzwZXzV3FH1Yf3tVrPD3K++dHhKG6vsI5N+5F6OrL7ho5p9rGHq4+J8s+cB0ni42c/fLYkjnT/7Hfb79FC/NtpUbT1HMGP33jVbtsbars7dlp5rLU8ahXafLE1if69Dy4GiIiIiIiIVhMH3zcBPbjw2nZMLmMgi2w3p9MlgyBXz99GdP9WTD8kg+8radvQnWuYTE8/FANOfu5cm8RnO1pw692f4PTZNM5duY+9P3gJW1ZpkEwGjnqOvoTZ1M/xS3W89OQ0ntydwE5cXtGg0EZpo7XKSyh0E5euPIY9u75aVp2tZbyEQndw9X4Ue3Y+hSf+OmmfI9pew6Gdi7iRGak4cBoUE3K+eWzPXnw1ubI8B+1HYvz1I0/gwukP9OvsYw/febD8M+dBkUH21w/dw627W5HzxFFbz2GE3nvLjpf7+3H0ueKguQy8N8+mMPDLs7hyfy9eeWlLoU22796HnX/+Z7x1+izOnTtX2t6f5PHNI4lVizsiIiIiIqIHKbTv23+76DzWntm1C9c/+sh5ZvN7bbX85bNbziNajmhrEt1dMUTUhWt2LoPUmTEsqMcyo+xUd5PzLtviXArHRi46z4LpGYrdXWiKyKzOLCwrj1z6DMYX1PNoh0prt9Oyc5hIncHYfBt6hrsQQ079awCsUVjhLrQ35DAxNKC3Myk5ntqnpV6bHTgDtVN0xSyM9p7BVFuPLs9iNoNjg+N6Nt3xdiCXAyKRiM5nNccSsu2JeEQ/luONqjJcdMrWr3YqdanTFlWaOvZFqU896y+CtBXT2+p6GU1h5OKCfq/JcutTXjeVr1LbBsWEkNmV3U2Sj2LZRKX6DKwzPVvZbvuJUQsN8XbEGuw20/UW0LbucYO0JvsQSTvl1ftQdT9gl8NUPtPxAsug9tcfSWNw3L8tN3obmSw3L2PzjejsP464riu7r5bvY6qx07c+he6DiSwGVT0VtvP0eb/yCWO8GLYLagdTXet4aZatZ3U+O/r60JCXpwPqfGCOM1NMdPQl1X7CaGpa2rZBMShKy5BS595mZMv6mBx7uHm25PzPPqb28YD7mI53dUDJo35enh+fMsyjch/Lqs/LoLILtxxzqTd1zHpJWiI7gFy8pySOSuOl2E/L6TyrWHPTZH/dSAW2veQ9nhsKTCciIiIiIlqvOPi+QSxGo2icn3cGjNRFL4oDHKYL5CD2LRS6gUwK4xcXis9TMrDWZg9AOwM0dlpCX6DLgFr/8QZkhtKIdB9HzBrCQDZhHHBxyUW9zJqTgWw9sHO8GbPOAIQMSLkDAO4A+MjguLOdumjHqC6fXPAfLxtc8qMHeVpmMOLWkZShpwUzZYMT9mBKMR/u4AomRtW2F3W9d3bb9eIOzPiptT7lmKbymdrWFBMub726go5XTZ3Jtl1hCxOZNMaQQI9qd3m/qW1NZH8ymOTKZt72xHVw+YKOpwd8A8qgKl0PNpUPQgk35jZyG1VjWXkpqyP3+Yx6Pg9zzHvrTOqlZcYehK1UvqB4qbSdOZYCyqcey3nNiql8Z3KIN2eRysV1DJ3JBseZfbzgmJBbW7XnRzF0ZkqmEnvqMzgG9XlXn07sNCmDDB6XD/rqspQNcAbVmTDXC/uYKG9bIdvW2sfKP3P0awFlKK8j97n0MV2HFcoeNPjurc/yutFp3THI39dh5ZFJqzTPZ59OV8HXkLMw5ORDlPzBYlH+aF0aB35/GCIiIiIiItoIuODqBtHYkkD38DCG1c+JeOkswJo0tiCWz+iBYhEKLWB8cNAeYG5rRtiaKVxUS9qMFUZzm36qLshn1cW4bGchMzZvv1aFqdk8wl3HdRmGj8eB0dLBkGA5WOkp/Wh+ahZW2L7AN2lsiaEpfsI+lvo5deoE2mMxtDQ6bzCykB6zjxdS5RzL5BGrtOFK6rOG8onaY8L/eNXVWc6erarKGbo4UhhwWknbZt5+E729vXjzzbdhxbqRbLX/XmgqX9Dxam73TdBGtfPPi9TRWAaIdzoHb0sgZqXtOqxYnyKCjmRx4F1ULp9/vFTaztwO5raVMnZ1xZCftd8jao4zzVLhOqXrpuR4hjqT4+UzxcHf+bG0noleLhIG8tnyczL7mL+Hp48FlcHYx5RKZV8YH9TtXv7HkLZErFD2co2qGjKpAQweG8RAehaRsmYILYyrtGMYUvnq7il2aPdY9k9KZboH0cWSuR9AlW1KRERERES0nnDwfQOQmWbd7eqCeMi+sH0zNeekrC8ySCEX7VKGoVEL4Xjn0ovzOpnP5vUMz+JgQC+OHXMGwzeA1YiJldRZPdrWHmjKIxxprFi+oOOZyiBpsu+18rC10aqYSiMfS6i6j6Izrsq6jD/GIRZDLAx4x4qXUz5vvJi2W2k7SKzJvrwDmA9dO1SJfayytW7bimUI6GMrKXsk3ID4iVN60D4eaUJXf6eTArTEG4p9Uv3fUPoXs4IFFR9y66NWn/O8xFlO/c+hdiIiIiIi2gw4+L5RWDn7nrNRuQCPOS96hCN6YERuD5DsO1mY2RhofkZdOMfREbXfJ/vtSPYh2RGVKY/qYr9F70+nqYv+llgenomfRvL1c7mo9+ZBvmqfPJlEq3O8+az+zyMMGbPR5euXe+pWz+94dhkSheMtTwyJTnvAwa7vMKyZ4gih7/FWsT4D27ZSTCxXjXVWuW0D6qyMvqVCc6w4czegfMbjmcowJbcQ6S62kTqe3FpD52mDt5GrmnZYDhlkS1thJHrsGbmFbztUU59WBgOpHOL9nj/ULKN8JfFSabsH0Q7LPScb6mx+pvQPWo2dqr71o1LZvBw2ePC7pM4E+9hS1bStQU19zFCGwD4mKpQ9KC/jg8cKf1jIyD3tB8acFDuGCiEk0+Ad0l7Jvj50tKrPNEVu1dOOHCQ0lqZ16PviL/koyPt8OBAREREREa1zvOf7BiEDGN3uAn0TecTjTSX3cfWmWxOpqr4GL4MYJQuEeraTWXXlC+O5C642qYt/mRloxY6ri+8J9GYa9IJ4bn7kgr/8PrP6Prd69cJY8Xiee8Lq+yt3xdAgtwKYsID2dsSsUQzl4npf9gJzaUTcBei8C+75HE+UlEEdL2dZSxakk0GDnuFE4f67+n7MqkxDhgVXg4+3vPqUmZTuvkzlC2rboJg4M1VsJ5d+z9AAZlr6jccLqrN5fa//4oKBQmLAvi+xuW2FX525r3nJQpIp55YcxvKZYsnQ7tLenT3diPvU50ZuI5dfO+j2qzEv9ntL+5ArqD7d40n/7p1tLiym6eYpqHxyP3FTvJjaPagd0hH/8v2v65dxa1eTrku3rO690926GYNnQdmy4wm/mCjsI5tB78CMKpKhbT11JmSws3TB1S59rpKFOF3l99VmH3s4+piXX38JKkOxj/r3sUrbmfLi7fel/VnO5+p1p41GS+4Hr9I8i/B6FzU2pQmJ/ebZpbfAISIiIiIiWu84+E5kYA80FBd3JSJar4IGaenhsRk/cxiXRERERES0kfG2M0RlZFZj38mT+uv4w8P6JrpOChHR+qVvUTIRRrO7QCc9FDb9Z05bAuGJslvmEBERERERbRCc+U5EREREREREREREVGec+U5EREREREREREREVGccfCciIiIiIiIiIiIiqjMOvhMRERERERERERER1dlDd8/3R7ZscR4tX+TJHc4jItpIsjc/cR4RERERERERERGtD5z5TkRERERERERERERUZxx8JyIiIiIiIiIiIiKqMw6+ExERERERERERERHVGQffiYiIiIiIiIiIiIjqjIPvRERERERERERERER1xsF3IiIiIiIiIiIiIqI64+A7EREREREREREREVGdcfCdiIiIiIiIiIiIiKjOOPhORERERERERERERFRnof87+f8sOo8Lrn/0kfPI9syuXc4jIiIiIiIiIiIiIiKqJLTv23+7ZPCdiIiIiIiIiIiIiIhqx9vOEBERERERERERERHVGQffiYiIiIiIiIiIiIjqjIPvRERERERERERERER1xsF3IiIiIiIiIiIiWpH/4+tfdx7RerJW7bZZ44OD70REREREREREREREdcbBdyIiIiIiIiIiIiKiOuPgOxERERERERERERFRXQH/P9uC8idGtdAzAAAAAElFTkSuQmCC', 1)
SET IDENTITY_INSERT [dbo].[ProyectoTableEvidencias] OFF
GO
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 2, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 3, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 4, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 5, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 10, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 12, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 13, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 14, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 24, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 25, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 26, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 27, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 28, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (1, 30, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (2, 6, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (2, 7, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (2, 8, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (3, 9, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (3, 16, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (4, 16, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (5, 17, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([Id_Investigador], [IdTarea], [IdTipoParticipacion]) VALUES (34, 17, 1)
GO
SET IDENTITY_INSERT [dbo].[ProyectoTableTareas] ON 

INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (1, N'Ejecución', NULL, 1, N'Tarea principal', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (2, N'Test-T', 1, 1, N'zdf', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (3, N'Test-T', 2, 1, N'vh', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (4, N'Test-T', 2, 1, N'sa', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (5, N'Test-T', 2, 1, N'qwe', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (6, N'Test-T', 1, 1, N'qwe', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (7, N'Test-T', 1, 1, N'qw', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (8, N'Test-T', 12, 2, N'we', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (9, N'Test-T', 12, 2, N'qwe', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (10, N'Test-T', 13, 2, N'as', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (11, N'Test-T', 12, 2, N'as', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (12, N'Test-T', 13, 2, N'awe', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (13, N'Ejecución', NULL, 2, N'Tarea principal', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (14, N'Ejecución', NULL, 3, N'Tarea principal', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (15, N'ert', 1, 1, N'ert', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (16, N'qwe', 1, 1, N'qw', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (17, N'aaaaaaaaaaaaaaaaA', 3, 1, N'AAAS', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (24, N'qwe', NULL, 1, N'qwe', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (25, N'qwe', NULL, 1, N'qwe', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (26, N'qwe', NULL, 1, N'qwe', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (27, N'jhklgg', NULL, 1, N'ghj', N'Activo')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (28, N'wer', NULL, 2, N'wer', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (29, N'wer', NULL, 1, N'wer', N'Finalizada')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (30, N'ert', NULL, 25, N'ert', N'Finalizada')
SET IDENTITY_INSERT [dbo].[ProyectoTableTareas] OFF
GO
INSERT [dbo].[Tbl_Colaboradores] ([Id_Investigacion], [Id_Investigador], [Estado], [Fecha_ingreso], [Id_Tipo_Colaboracion]) VALUES (4, 2, N'act', CAST(N'2011-06-20' AS Date), 1)
INSERT [dbo].[Tbl_Colaboradores] ([Id_Investigacion], [Id_Investigador], [Estado], [Fecha_ingreso], [Id_Tipo_Colaboracion]) VALUES (4, 3, N'act', CAST(N'2011-06-20' AS Date), 2)
INSERT [dbo].[Tbl_Colaboradores] ([Id_Investigacion], [Id_Investigador], [Estado], [Fecha_ingreso], [Id_Tipo_Colaboracion]) VALUES (5, 1, N'act', CAST(N'2011-06-20' AS Date), 2)
INSERT [dbo].[Tbl_Colaboradores] ([Id_Investigacion], [Id_Investigador], [Estado], [Fecha_ingreso], [Id_Tipo_Colaboracion]) VALUES (6, 1, N'act', CAST(N'2011-06-20' AS Date), 2)
INSERT [dbo].[Tbl_Colaboradores] ([Id_Investigacion], [Id_Investigador], [Estado], [Fecha_ingreso], [Id_Tipo_Colaboracion]) VALUES (1064, 1, N'Activo', CAST(N'2023-02-13' AS Date), NULL)
GO
SET IDENTITY_INSERT [dbo].[Tbl_Datos_Laborales] ON 

INSERT [dbo].[Tbl_Datos_Laborales] ([Id_DatoL], [Id_Investigador], [Id_Cargo], [Fecha_Inicio], [Fecha_Finalizacion], [Unidad], [Institucion]) VALUES (2002, 3047, 1, CAST(N'2022-06-20' AS Date), CAST(N'2022-06-20' AS Date), N'ing', N'unan')
INSERT [dbo].[Tbl_Datos_Laborales] ([Id_DatoL], [Id_Investigador], [Id_Cargo], [Fecha_Inicio], [Fecha_Finalizacion], [Unidad], [Institucion]) VALUES (2003, 1, 1, CAST(N'2022-08-26' AS Date), CAST(N'2022-08-26' AS Date), N'asdasdasdasdasd', N'asd')
INSERT [dbo].[Tbl_Datos_Laborales] ([Id_DatoL], [Id_Investigador], [Id_Cargo], [Fecha_Inicio], [Fecha_Finalizacion], [Unidad], [Institucion]) VALUES (2004, 1, 1, CAST(N'2022-08-26' AS Date), CAST(N'2022-08-26' AS Date), N'asdasdsss', N'asdasd')
INSERT [dbo].[Tbl_Datos_Laborales] ([Id_DatoL], [Id_Investigador], [Id_Cargo], [Fecha_Inicio], [Fecha_Finalizacion], [Unidad], [Institucion]) VALUES (3003, 3048, 1, CAST(N'2022-09-26' AS Date), CAST(N'2022-09-26' AS Date), N'wer', N'wewr')
SET IDENTITY_INSERT [dbo].[Tbl_Datos_Laborales] OFF
GO
SET IDENTITY_INSERT [dbo].[Tbl_Distinciones] ON 

INSERT [dbo].[Tbl_Distinciones] ([Id_Distincion], [Id_Investigador], [Id_Tipo_Distincion], [Descripcion], [fecha], [Id_Institucion], [Montos]) VALUES (2, 1, 1, N'asee', CAST(N'2022-06-15' AS Date), 1, 200)
INSERT [dbo].[Tbl_Distinciones] ([Id_Distincion], [Id_Investigador], [Id_Tipo_Distincion], [Descripcion], [fecha], [Id_Institucion], [Montos]) VALUES (3, 1, 1, N'asdfasd', CAST(N'2022-06-15' AS Date), 1, 22222)
SET IDENTITY_INSERT [dbo].[Tbl_Distinciones] OFF
GO
SET IDENTITY_INSERT [dbo].[Tbl_Evento] ON 

INSERT [dbo].[Tbl_Evento] ([Id_Evento], [Id_Tipo_Evento], [Nombre], [Id_Pais], [Fecha_Inicio], [Fecha_Finalizacion], [Modalidad], [Modalidad_Ponencia], [Link], [Datos_Adicionales], [Id_Investigador], [Descripcion], [Estado]) VALUES (1012, 1, N'qwer', 11, CAST(N'2022-12-30' AS Date), CAST(N'2022-12-30' AS Date), N'wer', N'wer', N'wer', N'wer', 1, N'Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más', NULL)
SET IDENTITY_INSERT [dbo].[Tbl_Evento] OFF
GO
SET IDENTITY_INSERT [dbo].[Tbl_Formacion_Academica] ON 

INSERT [dbo].[Tbl_Formacion_Academica] ([IdFormacion], [Id_TipoEstudio], [Id_Institucion], [Titulo], [Disciplina], [Fecha_Inicio], [Fecha_Finalizacion], [Id_Investigador]) VALUES (3, 3, 2, N'asasd', N'xzc', CAST(N'2022-05-05' AS Date), CAST(N'2022-06-01' AS Date), 1)
INSERT [dbo].[Tbl_Formacion_Academica] ([IdFormacion], [Id_TipoEstudio], [Id_Institucion], [Titulo], [Disciplina], [Fecha_Inicio], [Fecha_Finalizacion], [Id_Investigador]) VALUES (4, 3, 1, N'asdasdasdasdsdsdf', N'xzc', CAST(N'2022-05-27' AS Date), CAST(N'2022-01-06' AS Date), 1)
INSERT [dbo].[Tbl_Formacion_Academica] ([IdFormacion], [Id_TipoEstudio], [Id_Institucion], [Titulo], [Disciplina], [Fecha_Inicio], [Fecha_Finalizacion], [Id_Investigador]) VALUES (9, 4, 2, N'wwwwwwwwwwwwwwwwwww', N'zxc', CAST(N'2022-05-26' AS Date), CAST(N'2022-05-24' AS Date), 1)
INSERT [dbo].[Tbl_Formacion_Academica] ([IdFormacion], [Id_TipoEstudio], [Id_Institucion], [Titulo], [Disciplina], [Fecha_Inicio], [Fecha_Finalizacion], [Id_Investigador]) VALUES (10, 1, 1, N'aweawe', N'ser', CAST(N'2022-05-26' AS Date), CAST(N'2022-05-24' AS Date), 1)
INSERT [dbo].[Tbl_Formacion_Academica] ([IdFormacion], [Id_TipoEstudio], [Id_Institucion], [Titulo], [Disciplina], [Fecha_Inicio], [Fecha_Finalizacion], [Id_Investigador]) VALUES (2013, 1, 1, N'Ing', N'ing', CAST(N'2022-06-20' AS Date), CAST(N'2022-06-20' AS Date), 3047)
INSERT [dbo].[Tbl_Formacion_Academica] ([IdFormacion], [Id_TipoEstudio], [Id_Institucion], [Titulo], [Disciplina], [Fecha_Inicio], [Fecha_Finalizacion], [Id_Investigador]) VALUES (2014, 1, 1, N'drg', N'dfg', CAST(N'2022-08-26' AS Date), CAST(N'2022-08-26' AS Date), 1)
INSERT [dbo].[Tbl_Formacion_Academica] ([IdFormacion], [Id_TipoEstudio], [Id_Institucion], [Titulo], [Disciplina], [Fecha_Inicio], [Fecha_Finalizacion], [Id_Investigador]) VALUES (2015, 1, 1, N'drgsdfsdf', N'dfgwewwwwwwwwwwww', CAST(N'2022-08-26' AS Date), CAST(N'2022-08-26' AS Date), 1)
INSERT [dbo].[Tbl_Formacion_Academica] ([IdFormacion], [Id_TipoEstudio], [Id_Institucion], [Titulo], [Disciplina], [Fecha_Inicio], [Fecha_Finalizacion], [Id_Investigador]) VALUES (3014, 1, 1, N'test1', N'aq', CAST(N'2022-09-26' AS Date), CAST(N'2022-09-26' AS Date), 3048)
SET IDENTITY_INSERT [dbo].[Tbl_Formacion_Academica] OFF
GO
SET IDENTITY_INSERT [dbo].[Tbl_Grupos] ON 

INSERT [dbo].[Tbl_Grupos] ([Id_Grupo], [Id_Investigador_Crea], [Id_TipoGrupo], [Fecha_Creacion], [Estado], [Descripcion], [Nombre]) VALUES (1, 1, 1, CAST(N'2022-08-02' AS Date), N'Activo', N'Podemos describir al conocimiento abierto como aquel conocimiento que puede ser usado, reutilizado y compartido sin restricciones, ya que cuenta con las características tanto legales como tecnológicas para ser accedido por cualquier persona, en cualquier momento y en cualquier lugar del mundo.', N'Grupo de prueba')
INSERT [dbo].[Tbl_Grupos] ([Id_Grupo], [Id_Investigador_Crea], [Id_TipoGrupo], [Fecha_Creacion], [Estado], [Descripcion], [Nombre]) VALUES (2, 1, 1, CAST(N'2022-08-02' AS Date), N'Inactivo', N'Podemos describir al conocimiento abierto como aquel conocimiento que puede ser usado, reutilizado y compartido sin restricciones, ya que cuenta con las características tanto legales como tecnológicas para ser accedido por cualquier persona, en cualquier momento y en cualquier lugar del mundo.', N'Grupo de prueba')
INSERT [dbo].[Tbl_Grupos] ([Id_Grupo], [Id_Investigador_Crea], [Id_TipoGrupo], [Fecha_Creacion], [Estado], [Descripcion], [Nombre]) VALUES (3, 1, 1, CAST(N'2022-08-02' AS Date), N'Activo', N'Podemos describir al conocimiento abierto como aquel conocimiento que puede ser usado, reutilizado y compartido sin restricciones, ya que cuenta con las características tanto legales como tecnológicas para ser accedido por cualquier persona, en cualquier momento y en cualquier lugar del mundo.', N'Grupo de prueba')
INSERT [dbo].[Tbl_Grupos] ([Id_Grupo], [Id_Investigador_Crea], [Id_TipoGrupo], [Fecha_Creacion], [Estado], [Descripcion], [Nombre]) VALUES (4, 1, 1, CAST(N'2022-08-02' AS Date), N'Activo', N'Podemos describir al conocimiento abierto como aquel conocimiento que puede ser usado, reutilizado y compartido sin restricciones, ya que cuenta con las características tanto legales como tecnológicas para ser accedido por cualquier persona, en cualquier momento y en cualquier lugar del mundo.', N'Grupo de prueba')
INSERT [dbo].[Tbl_Grupos] ([Id_Grupo], [Id_Investigador_Crea], [Id_TipoGrupo], [Fecha_Creacion], [Estado], [Descripcion], [Nombre]) VALUES (5, 1, 1, CAST(N'2022-08-31' AS Date), N'Activo', N'Podemos describir al conocimiento abierto como aquel conocimiento que puede ser usado, reutilizado y compartido sin restricciones, ya que cuenta con las características tanto legales como tecnológicas para ser accedido por cualquier persona, en cualquier momento y en cualquier lugar del mundo.', N'Grupo de prueba')
SET IDENTITY_INSERT [dbo].[Tbl_Grupos] OFF
GO
INSERT [dbo].[Tbl_IdiomasInv] ([Id_Investigador], [Id_Idioma]) VALUES (1, 1)
INSERT [dbo].[Tbl_IdiomasInv] ([Id_Investigador], [Id_Idioma]) VALUES (45, 1)
INSERT [dbo].[Tbl_IdiomasInv] ([Id_Investigador], [Id_Idioma]) VALUES (45, 2)
INSERT [dbo].[Tbl_IdiomasInv] ([Id_Investigador], [Id_Idioma]) VALUES (45, 3)
GO
INSERT [dbo].[Tbl_Instituciones_Asociadas] ([Id_Institucion], [Id_Proyecto], [Id_Tipo_Asociacion], [Fecha_Ingreso], [Estado]) VALUES (1, 1, 1, CAST(N'2020-10-20' AS Date), N'act')
INSERT [dbo].[Tbl_Instituciones_Asociadas] ([Id_Institucion], [Id_Proyecto], [Id_Tipo_Asociacion], [Fecha_Ingreso], [Estado]) VALUES (2, 1, 2, CAST(N'2020-10-20' AS Date), N'act')
INSERT [dbo].[Tbl_Instituciones_Asociadas] ([Id_Institucion], [Id_Proyecto], [Id_Tipo_Asociacion], [Fecha_Ingreso], [Estado]) VALUES (3, 1, 3, CAST(N'2020-10-20' AS Date), N'act')
GO
INSERT [dbo].[Tbl_InstitucionesAsociadasGrupos] ([Id_Institucion], [Id_Grupo], [Fecha_Incorporacion], [Estado]) VALUES (1, 4, NULL, NULL)
INSERT [dbo].[Tbl_InstitucionesAsociadasGrupos] ([Id_Institucion], [Id_Grupo], [Fecha_Incorporacion], [Estado]) VALUES (2, 5, CAST(N'2022-08-31' AS Date), N'Activo')
INSERT [dbo].[Tbl_InstitucionesAsociadasGrupos] ([Id_Institucion], [Id_Grupo], [Fecha_Incorporacion], [Estado]) VALUES (3, 5, CAST(N'2022-08-31' AS Date), N'Activo')
INSERT [dbo].[Tbl_InstitucionesAsociadasGrupos] ([Id_Institucion], [Id_Grupo], [Fecha_Incorporacion], [Estado]) VALUES (5, 4, NULL, NULL)
GO
INSERT [dbo].[Tbl_Invest_RedS] ([Id_Investigador], [Id_RedSocial], [url_red_inv]) VALUES (1, 1, N'asd')
INSERT [dbo].[Tbl_Invest_RedS] ([Id_Investigador], [Id_RedSocial], [url_red_inv]) VALUES (1, 2, N'asda')
GO
SET IDENTITY_INSERT [dbo].[Tbl_Investigaciones] ON 

INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (4, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 1, N'test.png', N'Finalizada', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (5, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 2, N'test.png', N'Finalizada', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (6, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (7, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 4, N'test.png', N'Finalizada', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (8, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 1, N'test.png', N'Finalizada', 3, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (9, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 2, N'test.png', N'Finalizada', 3, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (10, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (11, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 6, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (12, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 5, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (13, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 4, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (14, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 2, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (15, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 5, N'test.png', N'Finalizada', 2, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (16, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 4, N'test.png', N'Finalizada', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (17, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 34, N'test.png', N'Finalizada', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (18, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 45, N'test.png', N'Finalizada', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (19, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 1, N'test.png', N'Finalizada', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (20, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 2, N'test.png', N'Finalizada', 3, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (22, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 6, N'test.png', N'Finalizada', 4, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (23, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 34, N'test.png', N'Finalizada', 4, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (25, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 45, N'test.png', N'Finalizada', 4, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (26, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 6, N'test.png', N'Finalizada', 4, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (28, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 4, N'test.png', N'Finalizada', 4, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (29, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 2, N'test.png', N'Finalizada', 3, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (31, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 4, N'test.png', N'Finalizada', 3, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (32, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 5, N'test.png', N'Finalizada', 3, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (34, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 6, N'test.png', N'Finalizada', 5, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (35, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 5, N'test.png', N'Finalizada', 5, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (37, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 6, N'test.png', N'Finalizada', 5, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (38, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 6, N'test.png', N'Finalizada', 5, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (40, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 2, N'test.png', N'Finalizada', 6, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (41, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 6, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (43, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 4, N'test.png', N'Finalizada', 6, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (44, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 5, N'test.png', N'Finalizada', 6, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (46, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 2, N'test.png', N'Finalizada', 6, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (47, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 5, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (49, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 1, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (50, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 1, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (52, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, N'Finalizada', N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 2, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (53, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (55, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (57, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (59, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (61, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 3, N'test.png', N'Finalizada', 7, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (63, N'public', 1, N'Investigación de Prueba', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', N'El objetivo de este estudio es determinar cómo las intenciones de los individuos a donar a una organización medioambiental pueden aumentarse. Con este fin, la pregunta de investigación es la siguiente: ¿Hasta qué punto la distancia social de un donante potencial con las víctimas del cambio climático retratada en campañas de recaudación de fondos afecta su intención de hacer una donación? En este contexto, la distancia social es la medida en que las personas sienten que están en el mismo grupo social (es decir, dentro del grupo) o en otro (es decir, fuera del grupo), en relación con las víctimas del cambio climático.', NULL, NULL, N'www.repo.com', CAST(N'2000-12-12T00:00:00.000' AS DateTime), 4, N'test.png', N'Finalizada', 6, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (64, N'Pública', 1, N'test 1', NULL, NULL, NULL, NULL, N'wer', CAST(N'2022-09-26T00:00:00.000' AS DateTime), 1, N'test.png', N'PENDIENTE', 1, NULL)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Abstract], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador], [Photo], [Estado], [Id_Localidad], [Fecha_publicacion]) VALUES (1064, N'awde', NULL, N'qawe', N'qwe', N'qwe', NULL, N'qwe', N'qwe', CAST(N'2023-02-13T00:00:00.000' AS DateTime), 1, N'test.png', N'PENDIENTE', NULL, CAST(N'2023-02-13T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Tbl_Investigaciones] OFF
GO
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 4)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 6)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 7)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 8)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 11)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 13)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 16)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 23)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 25)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 31)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 37)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 40)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 50)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 55)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 59)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (1, 1064)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 4)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 5)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 7)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 9)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 14)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 15)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 16)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 17)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 34)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 38)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 46)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 52)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 57)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 61)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (2, 64)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 9)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 10)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 12)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 18)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 20)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 26)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 29)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 35)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 44)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 49)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 53)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (3, 64)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 10)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 12)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 19)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 22)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 28)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 32)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 41)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 43)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 47)
INSERT [dbo].[Tbl_Investigaciones_Disciplinas] ([Id_Disciplina], [Id_Investigacion]) VALUES (4, 63)
GO
INSERT [dbo].[Tbl_InvestigadoresAsociados] ([Id_Grupo], [Id_Investigador], [Fecha_Incorporacion], [Estado], [Id_TipoMiembro]) VALUES (1, 1, NULL, NULL, 1)
INSERT [dbo].[Tbl_InvestigadoresAsociados] ([Id_Grupo], [Id_Investigador], [Fecha_Incorporacion], [Estado], [Id_TipoMiembro]) VALUES (2, 1, NULL, NULL, 1)
INSERT [dbo].[Tbl_InvestigadoresAsociados] ([Id_Grupo], [Id_Investigador], [Fecha_Incorporacion], [Estado], [Id_TipoMiembro]) VALUES (3, 1, NULL, NULL, 1)
INSERT [dbo].[Tbl_InvestigadoresAsociados] ([Id_Grupo], [Id_Investigador], [Fecha_Incorporacion], [Estado], [Id_TipoMiembro]) VALUES (4, 2, NULL, NULL, 1)
INSERT [dbo].[Tbl_InvestigadoresAsociados] ([Id_Grupo], [Id_Investigador], [Fecha_Incorporacion], [Estado], [Id_TipoMiembro]) VALUES (5, 1, CAST(N'2022-08-31' AS Date), N'Activo', 1)
GO
SET IDENTITY_INSERT [dbo].[Tbl_InvestigatorProfile] ON 

INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (1, N'Wilber', N'Matus', CAST(N'1987-07-24' AS Date), 1, N'Masculino', N'avatar.png', N'1112dfg', N'Wilber@unaun.edu.ni', 10, 1, N'20', N'ACTIVO')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (2, N'Mario', N'Matus', CAST(N'1987-07-24' AS Date), NULL, N'Masculino', N'avatar.png', N'090909', N'Wilber@unaun.edu.ni', 10, 1, N'100', N'POSTULANTE')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (3, N'Maria', N'Altamirano', CAST(N'1987-07-24' AS Date), NULL, N'Masculino', N'avatar.png', N'090909', N'Wilber@unaun.edu.ni', 10, 1, N'90', N'ACTIVO')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (4, N'Juan', N'Aragon', CAST(N'1987-07-24' AS Date), NULL, N'Masculino', N'avatar.png', N'090909', N'Wilber@unaun.edu.ni', 12, 1, N'30', N'POSTULANTE')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (5, N'Julieta', N'Aguilar', CAST(N'2021-05-10' AS Date), NULL, N'Masculino', N'avatar.png', N'0098', N'test@mail.test', 10, 1, N'4ee', N'POSTULANTE')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (6, N'Eddy', N'Aragon', CAST(N'2021-09-10' AS Date), NULL, N'Masculino', N'avatar.png', N'99908', N'test@mail.com', 10, 1, N'0098', N'POSTULANTE')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (34, N'Harold', N'Gutiérrez', CAST(N'2021-09-10' AS Date), NULL, N'Masculino', N'avatar.png', N'332', N'test', 10, 1, N'111', N'POSTULANTE')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (45, N'Alvaro', N'Mejía', CAST(N'2021-10-15' AS Date), NULL, N'Masculino', N'avatar.png', N'Test2', N'Test2', 10, 1, N'Test2', N'POSTULANTE')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (46, N'test1', N'test3', NULL, NULL, NULL, N'avatar.png', NULL, NULL, NULL, NULL, NULL, N'POSTULANTE')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (47, N'test2', N'test3', NULL, NULL, NULL, N'avatar.png', NULL, NULL, NULL, NULL, NULL, N'POSTULANTE')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (3047, N'wilberTest', N'matus', CAST(N'2022-06-20' AS Date), NULL, N'Masculino', N'avatar.png', N'01236', N'test', 10, 1, NULL, N'ACTIVO')
INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (3048, N'Wilber', N'Matus', CAST(N'2022-09-26' AS Date), NULL, N'Masculino', N'avatar.png', N'001', N'test@email.com', 10, 1, NULL, N'POSTULANTE')
SET IDENTITY_INSERT [dbo].[Tbl_InvestigatorProfile] OFF
GO
SET IDENTITY_INSERT [dbo].[Tbl_Invitaciones] ON 

INSERT [dbo].[Tbl_Invitaciones] ([Id_Invitacion], [Id_Investigador], [Id_Evento], [Estado], [Fecha_Invitacion]) VALUES (1, 1, 1012, N'PENDIENTE', NULL)
INSERT [dbo].[Tbl_Invitaciones] ([Id_Invitacion], [Id_Investigador], [Id_Evento], [Estado], [Fecha_Invitacion]) VALUES (2, 2, 1012, N'PENDIENTE', NULL)
INSERT [dbo].[Tbl_Invitaciones] ([Id_Invitacion], [Id_Investigador], [Id_Evento], [Estado], [Fecha_Invitacion]) VALUES (3, 1, 1012, N'PENDIENTE', CAST(N'2022-10-04' AS Date))
INSERT [dbo].[Tbl_Invitaciones] ([Id_Invitacion], [Id_Investigador], [Id_Evento], [Estado], [Fecha_Invitacion]) VALUES (4, 2, 1012, N'PENDIENTE', CAST(N'2022-10-04' AS Date))
INSERT [dbo].[Tbl_Invitaciones] ([Id_Invitacion], [Id_Investigador], [Id_Evento], [Estado], [Fecha_Invitacion]) VALUES (5, 3, 1012, N'PENDIENTE', CAST(N'2022-10-04' AS Date))
INSERT [dbo].[Tbl_Invitaciones] ([Id_Invitacion], [Id_Investigador], [Id_Evento], [Estado], [Fecha_Invitacion]) VALUES (6, 4, 1012, N'PENDIENTE', CAST(N'2022-10-04' AS Date))
INSERT [dbo].[Tbl_Invitaciones] ([Id_Invitacion], [Id_Investigador], [Id_Evento], [Estado], [Fecha_Invitacion]) VALUES (7, 5, 1012, N'PENDIENTE', CAST(N'2022-10-04' AS Date))
SET IDENTITY_INSERT [dbo].[Tbl_Invitaciones] OFF
GO
INSERT [dbo].[Tbl_Participantes_Eventos] ([Id_Investigador], [Id_Evento], [Descripcion], [Id_Tipo_Participacion], [Fecha_Participacion], [Titulo], [Estado]) VALUES (1, 1012, N'wer', 1, CAST(N'2022-09-30T00:00:00.000' AS DateTime), N'Test', N'PENDIENTE')
INSERT [dbo].[Tbl_Participantes_Eventos] ([Id_Investigador], [Id_Evento], [Descripcion], [Id_Tipo_Participacion], [Fecha_Participacion], [Titulo], [Estado]) VALUES (5, 1012, N'wer', 1, CAST(N'2022-09-30T00:00:00.000' AS DateTime), N'Test', N'APROBADO')
GO
INSERT [dbo].[Tbl_Participantes_Proyectos] ([Id_Proyecto], [Id_Investigador], [Id_Cargo_Proyecto], [Fecha_Ingreso], [Estado_Participante]) VALUES (1, 1, 1, CAST(N'2021-01-12' AS Date), N'act')
INSERT [dbo].[Tbl_Participantes_Proyectos] ([Id_Proyecto], [Id_Investigador], [Id_Cargo_Proyecto], [Fecha_Ingreso], [Estado_Participante]) VALUES (1, 2, 2, CAST(N'2021-01-12' AS Date), N'act')
INSERT [dbo].[Tbl_Participantes_Proyectos] ([Id_Proyecto], [Id_Investigador], [Id_Cargo_Proyecto], [Fecha_Ingreso], [Estado_Participante]) VALUES (2, 1, 1, CAST(N'2021-01-12' AS Date), N'act')
INSERT [dbo].[Tbl_Participantes_Proyectos] ([Id_Proyecto], [Id_Investigador], [Id_Cargo_Proyecto], [Fecha_Ingreso], [Estado_Participante]) VALUES (2, 2, 2, CAST(N'2021-01-12' AS Date), N'act')
INSERT [dbo].[Tbl_Participantes_Proyectos] ([Id_Proyecto], [Id_Investigador], [Id_Cargo_Proyecto], [Fecha_Ingreso], [Estado_Participante]) VALUES (2, 3, 2, CAST(N'2021-01-12' AS Date), N'act')
GO
SET IDENTITY_INSERT [dbo].[Tbl_Patentes] ON 

INSERT [dbo].[Tbl_Patentes] ([Id_Patente], [fecha], [Id_Institucion], [Id_Investigador], [Estado], [Descripcion]) VALUES (1, CAST(N'2022-05-19' AS Date), 1, 1, N'Activo', N'asdasd')
INSERT [dbo].[Tbl_Patentes] ([Id_Patente], [fecha], [Id_Institucion], [Id_Investigador], [Estado], [Descripcion]) VALUES (2, CAST(N'2022-06-15' AS Date), 2, 1, N'Activo', N'asdasd')
INSERT [dbo].[Tbl_Patentes] ([Id_Patente], [fecha], [Id_Institucion], [Id_Investigador], [Estado], [Descripcion]) VALUES (3, CAST(N'2022-06-15' AS Date), 1, 1, N'Activo', N'werwer')
INSERT [dbo].[Tbl_Patentes] ([Id_Patente], [fecha], [Id_Institucion], [Id_Investigador], [Estado], [Descripcion]) VALUES (4, CAST(N'2022-08-26' AS Date), 1, 1, N'Activo', N'asd')
INSERT [dbo].[Tbl_Patentes] ([Id_Patente], [fecha], [Id_Institucion], [Id_Investigador], [Estado], [Descripcion]) VALUES (1004, CAST(N'2022-09-26' AS Date), 3, 1, N'ElementIndex_0', N'ADS')
SET IDENTITY_INSERT [dbo].[Tbl_Patentes] OFF
GO
SET IDENTITY_INSERT [dbo].[Tbl_Proyectos] ON 

INSERT [dbo].[Tbl_Proyectos] ([Id_Proyecto], [Nombre_Proyecto], [DescripcionProyecto], [Id_Tipo_Proyecto], [Visibilidad], [Estado_Proyecto], [Fecha_Inicio], [Fecha_Finalizacion]) VALUES (1, N'Proyecto 1', N'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here''', 1, N'publica', N'activo', CAST(N'2021-01-12' AS Date), CAST(N'2021-12-12' AS Date))
INSERT [dbo].[Tbl_Proyectos] ([Id_Proyecto], [Nombre_Proyecto], [DescripcionProyecto], [Id_Tipo_Proyecto], [Visibilidad], [Estado_Proyecto], [Fecha_Inicio], [Fecha_Finalizacion]) VALUES (2, N'Proyecto 2', N'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here''', 2, N'publica', N'activo', CAST(N'2021-01-12' AS Date), CAST(N'2021-12-12' AS Date))
INSERT [dbo].[Tbl_Proyectos] ([Id_Proyecto], [Nombre_Proyecto], [DescripcionProyecto], [Id_Tipo_Proyecto], [Visibilidad], [Estado_Proyecto], [Fecha_Inicio], [Fecha_Finalizacion]) VALUES (3, N'Proyecto 3', N'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here''', 1, N'publica', N'activo', CAST(N'2021-01-12' AS Date), CAST(N'2021-12-12' AS Date))
INSERT [dbo].[Tbl_Proyectos] ([Id_Proyecto], [Nombre_Proyecto], [DescripcionProyecto], [Id_Tipo_Proyecto], [Visibilidad], [Estado_Proyecto], [Fecha_Inicio], [Fecha_Finalizacion]) VALUES (4, N'Proyecto 4', N'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here''', 2, N'publica', N'activo', CAST(N'2021-01-12' AS Date), CAST(N'2021-12-12' AS Date))
INSERT [dbo].[Tbl_Proyectos] ([Id_Proyecto], [Nombre_Proyecto], [DescripcionProyecto], [Id_Tipo_Proyecto], [Visibilidad], [Estado_Proyecto], [Fecha_Inicio], [Fecha_Finalizacion]) VALUES (5, N'Proyecto 5', N'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here''', 1, N'publica', N'activo', CAST(N'2021-01-12' AS Date), CAST(N'2021-12-12' AS Date))
SET IDENTITY_INSERT [dbo].[Tbl_Proyectos] OFF
GO
SET IDENTITY_INSERT [dbo].[TblProcesosEditoriales] ON 

INSERT [dbo].[TblProcesosEditoriales] ([Id_Proceso_Editorial], [Id_Investigador], [Descripcion], [Fecha], [Id_Tipo_Proceso_Editorial]) VALUES (1, 1, N'sadfasd', CAST(N'2022-06-16' AS Date), 1)
INSERT [dbo].[TblProcesosEditoriales] ([Id_Proceso_Editorial], [Id_Investigador], [Descripcion], [Fecha], [Id_Tipo_Proceso_Editorial]) VALUES (2, 1, N'ert', CAST(N'2022-08-26' AS Date), 1)
INSERT [dbo].[TblProcesosEditoriales] ([Id_Proceso_Editorial], [Id_Investigador], [Descripcion], [Fecha], [Id_Tipo_Proceso_Editorial]) VALUES (3, 1, N'ertwerwwer', CAST(N'2022-08-26' AS Date), 1)
SET IDENTITY_INSERT [dbo].[TblProcesosEditoriales] OFF
GO
SET IDENTITY_INSERT [security].[Security_Permissions] ON 

INSERT [security].[Security_Permissions] ([Id_Permission], [Descripcion], [Estado]) VALUES (1, N'ADMIN_ACCESS', N'Activo')
INSERT [security].[Security_Permissions] ([Id_Permission], [Descripcion], [Estado]) VALUES (2, N'ADMINISTRAR_POSTULANTES', N'Activo')
INSERT [security].[Security_Permissions] ([Id_Permission], [Descripcion], [Estado]) VALUES (3, N'ADMINISTRAR_INVESTIGACIONES', N'Activo')
INSERT [security].[Security_Permissions] ([Id_Permission], [Descripcion], [Estado]) VALUES (4, N'ADMINISTRAR_USUARIOS', N'Activo')
INSERT [security].[Security_Permissions] ([Id_Permission], [Descripcion], [Estado]) VALUES (5, N'ADMINISTRAR_CATALOGOS', N'Activo')
INSERT [security].[Security_Permissions] ([Id_Permission], [Descripcion], [Estado]) VALUES (6, N'HOME_ACCESS', N'Activo')
INSERT [security].[Security_Permissions] ([Id_Permission], [Descripcion], [Estado]) VALUES (7, N'PERFIL_ACCESS', N'Activo')
SET IDENTITY_INSERT [security].[Security_Permissions] OFF
GO
INSERT [security].[Security_Permissions_Roles] ([Id_Role], [Id_Permission], [Estado]) VALUES (1, 1, N'Activo')
INSERT [security].[Security_Permissions_Roles] ([Id_Role], [Id_Permission], [Estado]) VALUES (1, 2, N'Activo')
INSERT [security].[Security_Permissions_Roles] ([Id_Role], [Id_Permission], [Estado]) VALUES (1, 3, N'Activo')
INSERT [security].[Security_Permissions_Roles] ([Id_Role], [Id_Permission], [Estado]) VALUES (1, 4, N'Activo')
INSERT [security].[Security_Permissions_Roles] ([Id_Role], [Id_Permission], [Estado]) VALUES (1, 5, N'Activo')
INSERT [security].[Security_Permissions_Roles] ([Id_Role], [Id_Permission], [Estado]) VALUES (1, 6, N'Activo')
INSERT [security].[Security_Permissions_Roles] ([Id_Role], [Id_Permission], [Estado]) VALUES (1, 7, NULL)
INSERT [security].[Security_Permissions_Roles] ([Id_Role], [Id_Permission], [Estado]) VALUES (2, 6, NULL)
INSERT [security].[Security_Permissions_Roles] ([Id_Role], [Id_Permission], [Estado]) VALUES (2, 7, NULL)
GO
SET IDENTITY_INSERT [security].[Security_Roles] ON 

INSERT [security].[Security_Roles] ([Id_Role], [Descripcion], [Estado]) VALUES (1, N'ADMIN', N'Activo')
INSERT [security].[Security_Roles] ([Id_Role], [Descripcion], [Estado]) VALUES (2, N'INVESTIGADOR', N'Activo')
SET IDENTITY_INSERT [security].[Security_Roles] OFF
GO
SET IDENTITY_INSERT [security].[Security_Users] ON 

INSERT [security].[Security_Users] ([Id_User], [Nombres], [Estado], [Descripcion], [Password], [Mail], [Token], [Token_Date], [Token_Expiration_Date]) VALUES (1, N'Wilber', N'Activo', N'testsdfsdf', N'zaxscd', N'wmatus@unan.edu.ni', NULL, NULL, NULL)
INSERT [security].[Security_Users] ([Id_User], [Nombres], [Estado], [Descripcion], [Password], [Mail], [Token], [Token_Date], [Token_Expiration_Date]) VALUES (3, N'Mario Matus', N'Activo', N'Investigador postulado', N'255df622-017a-4ab4-9385-dc9f770f77b0', N'Wilber@unaun.edu.ni', N'f4a83888-a925-4f12-873a-aa84da47bb08', CAST(N'2022-10-06T09:29:55.000' AS DateTime), CAST(N'2023-04-06T09:29:55.000' AS DateTime))
INSERT [security].[Security_Users] ([Id_User], [Nombres], [Estado], [Descripcion], [Password], [Mail], [Token], [Token_Date], [Token_Expiration_Date]) VALUES (4, N'Maria Altamirano', N'Activo', N'Investigador postulado', N'44e3fbd9-c1bc-4c58-83dc-6cd66d075e7d', N'Wilber@unaun.edu.ni', N'39044cb5-6dd6-424e-b255-17071db11bc1', CAST(N'2022-10-06T09:32:34.000' AS DateTime), CAST(N'2023-04-06T09:32:34.000' AS DateTime))
INSERT [security].[Security_Users] ([Id_User], [Nombres], [Estado], [Descripcion], [Password], [Mail], [Token], [Token_Date], [Token_Expiration_Date]) VALUES (5, N'wilberTest matus', N'Activo', N'Investigador postulado', N'55ed61a6-2560-40a4-bb9e-3fad49728cd7', N'test', N'f06fcb0e-9514-4858-8b0b-34566b6f2ffd', CAST(N'2022-10-06T09:32:57.000' AS DateTime), CAST(N'2023-04-06T09:32:57.000' AS DateTime))
SET IDENTITY_INSERT [security].[Security_Users] OFF
GO
INSERT [security].[Security_Users_Roles] ([Id_Role], [Id_User], [Estado]) VALUES (1, 1, N'Activo')
INSERT [security].[Security_Users_Roles] ([Id_Role], [Id_User], [Estado]) VALUES (2, 1, N'Activo')
INSERT [security].[Security_Users_Roles] ([Id_Role], [Id_User], [Estado]) VALUES (2, 3, NULL)
INSERT [security].[Security_Users_Roles] ([Id_Role], [Id_User], [Estado]) VALUES (2, 4, NULL)
INSERT [security].[Security_Users_Roles] ([Id_Role], [Id_User], [Estado]) VALUES (2, 5, NULL)
GO
ALTER TABLE [dbo].[Cat_Localidad]  WITH CHECK ADD  CONSTRAINT [FK_Cat_Localidad_Cat_Localidad] FOREIGN KEY([Id_LocalidadPadre])
REFERENCES [dbo].[Cat_Localidad] ([Id_Localidad])
GO
ALTER TABLE [dbo].[Cat_Localidad] CHECK CONSTRAINT [FK_Cat_Localidad_Cat_Localidad]
GO
ALTER TABLE [dbo].[Cat_Localidad]  WITH CHECK ADD  CONSTRAINT [FK_Cat_Localidad_Cat_Paises] FOREIGN KEY([Id_Pais])
REFERENCES [dbo].[Cat_Paises] ([Id_Pais])
GO
ALTER TABLE [dbo].[Cat_Localidad] CHECK CONSTRAINT [FK_Cat_Localidad_Cat_Paises]
GO
ALTER TABLE [dbo].[Cat_Localidad]  WITH CHECK ADD  CONSTRAINT [FK_Cat_Localidad_Cat_TipoLocalidad] FOREIGN KEY([Id_Tipo_Localidad])
REFERENCES [dbo].[Cat_TipoLocalidad] ([Id_Tipo_Localidad])
GO
ALTER TABLE [dbo].[Cat_Localidad] CHECK CONSTRAINT [FK_Cat_Localidad_Cat_TipoLocalidad]
GO
ALTER TABLE [dbo].[ProyectoCatDependencias]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoCatDependencias_Cat_instituciones] FOREIGN KEY([Id_Institucion])
REFERENCES [dbo].[Cat_instituciones] ([Id_Institucion])
GO
ALTER TABLE [dbo].[ProyectoCatDependencias] CHECK CONSTRAINT [FK_ProyectoCatDependencias_Cat_instituciones]
GO
ALTER TABLE [dbo].[ProyectoCatDependencias]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoCatDependencias_ProyectoCatDependencias] FOREIGN KEY([Id_Dependencia_Padre])
REFERENCES [dbo].[ProyectoCatDependencias] ([Id_Dependencia])
GO
ALTER TABLE [dbo].[ProyectoCatDependencias] CHECK CONSTRAINT [FK_ProyectoCatDependencias_ProyectoCatDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableActividades]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableActividades_ProyectoCatDependencias] FOREIGN KEY([Id_Dependencia])
REFERENCES [dbo].[ProyectoCatDependencias] ([Id_Dependencia])
GO
ALTER TABLE [dbo].[ProyectoTableActividades] CHECK CONSTRAINT [FK_ProyectoTableActividades_ProyectoCatDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableActividades]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableActividades_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[ProyectoTableActividades] CHECK CONSTRAINT [FK_ProyectoTableActividades_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[ProyectoTableActividades]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableActividades_Tbl_Proyectos] FOREIGN KEY([Id_Proyecto])
REFERENCES [dbo].[Tbl_Proyectos] ([Id_Proyecto])
GO
ALTER TABLE [dbo].[ProyectoTableActividades] CHECK CONSTRAINT [FK_ProyectoTableActividades_Tbl_Proyectos]
GO
ALTER TABLE [dbo].[ProyectoTableAgenda]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableAgenda_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[ProyectoTableAgenda] CHECK CONSTRAINT [FK_ProyectoTableAgenda_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[ProyectoTableAgenda]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableAgendas_ProyectoCatDependencias] FOREIGN KEY([Id_Dependencia])
REFERENCES [dbo].[ProyectoCatDependencias] ([Id_Dependencia])
GO
ALTER TABLE [dbo].[ProyectoTableAgenda] CHECK CONSTRAINT [FK_ProyectoTableAgendas_ProyectoCatDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableCalendario]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableCalendario_ProyectoTableTareas] FOREIGN KEY([IdTarea])
REFERENCES [dbo].[ProyectoTableTareas] ([IdTarea])
GO
ALTER TABLE [dbo].[ProyectoTableCalendario] CHECK CONSTRAINT [FK_ProyectoTableCalendario_ProyectoTableTareas]
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoCatCargosDependencias] FOREIGN KEY([Id_Cargo])
REFERENCES [dbo].[ProyectoCatCargosDependencias] ([Id_Cargo])
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios] CHECK CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoCatCargosDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoCatDependencias] FOREIGN KEY([Id_Dependencia])
REFERENCES [dbo].[ProyectoCatDependencias] ([Id_Dependencia])
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios] CHECK CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoCatDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios] CHECK CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[ProyectoTableEvidencias]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableEvidencias_CatalogoTipoEvidencia] FOREIGN KEY([IdTipo])
REFERENCES [dbo].[CatalogoTipoEvidencia] ([IdTipo])
GO
ALTER TABLE [dbo].[ProyectoTableEvidencias] CHECK CONSTRAINT [FK_ProyectoTableEvidencias_CatalogoTipoEvidencia]
GO
ALTER TABLE [dbo].[ProyectoTableEvidencias]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableEvidencias_ProyectoTableTareas] FOREIGN KEY([IdTarea])
REFERENCES [dbo].[ProyectoTableTareas] ([IdTarea])
GO
ALTER TABLE [dbo].[ProyectoTableEvidencias] CHECK CONSTRAINT [FK_ProyectoTableEvidencias_ProyectoTableTareas]
GO
ALTER TABLE [dbo].[ProyectoTableParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableParticipantes_ProyectoCatTipoParticipaciones] FOREIGN KEY([IdTipoParticipacion])
REFERENCES [dbo].[ProyectoCatTipoParticipaciones] ([IdTipoParticipacion])
GO
ALTER TABLE [dbo].[ProyectoTableParticipantes] CHECK CONSTRAINT [FK_ProyectoTableParticipantes_ProyectoCatTipoParticipaciones]
GO
ALTER TABLE [dbo].[ProyectoTableParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableParticipantes_ProyectoTableTareas] FOREIGN KEY([IdTarea])
REFERENCES [dbo].[ProyectoTableTareas] ([IdTarea])
GO
ALTER TABLE [dbo].[ProyectoTableParticipantes] CHECK CONSTRAINT [FK_ProyectoTableParticipantes_ProyectoTableTareas]
GO
ALTER TABLE [dbo].[ProyectoTableParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableParticipantes_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[ProyectoTableParticipantes] CHECK CONSTRAINT [FK_ProyectoTableParticipantes_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[ProyectoTableTareas]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableTareas_ProyectoTableActividades] FOREIGN KEY([IdActividad])
REFERENCES [dbo].[ProyectoTableActividades] ([IdActividad])
GO
ALTER TABLE [dbo].[ProyectoTableTareas] CHECK CONSTRAINT [FK_ProyectoTableTareas_ProyectoTableActividades]
GO
ALTER TABLE [dbo].[ProyectoTableTareas]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableTareas_ProyectoTableTareas] FOREIGN KEY([IdTareaPadre])
REFERENCES [dbo].[ProyectoTableTareas] ([IdTarea])
GO
ALTER TABLE [dbo].[ProyectoTableTareas] CHECK CONSTRAINT [FK_ProyectoTableTareas_ProyectoTableTareas]
GO
ALTER TABLE [dbo].[Tbl_Colaboradores]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Colaboradores_Cat_Tipo_Colaborador] FOREIGN KEY([Id_Tipo_Colaboracion])
REFERENCES [dbo].[Cat_Tipo_Colaborador] ([Id_Tipo_Colaboracion])
GO
ALTER TABLE [dbo].[Tbl_Colaboradores] CHECK CONSTRAINT [FK_Tbl_Colaboradores_Cat_Tipo_Colaborador]
GO
ALTER TABLE [dbo].[Tbl_Colaboradores]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Colaboradores_Tbl_Investigaciones] FOREIGN KEY([Id_Investigacion])
REFERENCES [dbo].[Tbl_Investigaciones] ([Id_Investigacion])
GO
ALTER TABLE [dbo].[Tbl_Colaboradores] CHECK CONSTRAINT [FK_Tbl_Colaboradores_Tbl_Investigaciones]
GO
ALTER TABLE [dbo].[Tbl_Colaboradores]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Colaboradores_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Colaboradores] CHECK CONSTRAINT [FK_Tbl_Colaboradores_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Datos_Laborales]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Datos_Laborales_Cat_Cargos] FOREIGN KEY([Id_Cargo])
REFERENCES [dbo].[Cat_Cargos] ([Id_Cargo])
GO
ALTER TABLE [dbo].[Tbl_Datos_Laborales] CHECK CONSTRAINT [FK_Tbl_Datos_Laborales_Cat_Cargos]
GO
ALTER TABLE [dbo].[Tbl_Datos_Laborales]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Datos_Laborales_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Datos_Laborales] CHECK CONSTRAINT [FK_Tbl_Datos_Laborales_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Distinciones]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Distinciones_Cat_instituciones] FOREIGN KEY([Id_Institucion])
REFERENCES [dbo].[Cat_instituciones] ([Id_Institucion])
GO
ALTER TABLE [dbo].[Tbl_Distinciones] CHECK CONSTRAINT [FK_Tbl_Distinciones_Cat_instituciones]
GO
ALTER TABLE [dbo].[Tbl_Distinciones]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Distinciones_CatTipoDistincion] FOREIGN KEY([Id_Tipo_Distincion])
REFERENCES [dbo].[CatTipoDistincion] ([Id_Tipo_Distincion])
GO
ALTER TABLE [dbo].[Tbl_Distinciones] CHECK CONSTRAINT [FK_Tbl_Distinciones_CatTipoDistincion]
GO
ALTER TABLE [dbo].[Tbl_Distinciones]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Distinciones_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Distinciones] CHECK CONSTRAINT [FK_Tbl_Distinciones_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Evento]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Evento_Cat_Paises] FOREIGN KEY([Id_Pais])
REFERENCES [dbo].[Cat_Paises] ([Id_Pais])
GO
ALTER TABLE [dbo].[Tbl_Evento] CHECK CONSTRAINT [FK_Tbl_Evento_Cat_Paises]
GO
ALTER TABLE [dbo].[Tbl_Evento]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Evento_Cat_Tipo_Evento] FOREIGN KEY([Id_Tipo_Evento])
REFERENCES [dbo].[Cat_Tipo_Evento] ([Id_Tipo_Evento])
GO
ALTER TABLE [dbo].[Tbl_Evento] CHECK CONSTRAINT [FK_Tbl_Evento_Cat_Tipo_Evento]
GO
ALTER TABLE [dbo].[Tbl_Evento]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Evento_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Evento] CHECK CONSTRAINT [FK_Tbl_Evento_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Formacion_Academica]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Formacion_Academica_Cat_instituciones] FOREIGN KEY([Id_Institucion])
REFERENCES [dbo].[Cat_instituciones] ([Id_Institucion])
GO
ALTER TABLE [dbo].[Tbl_Formacion_Academica] CHECK CONSTRAINT [FK_Tbl_Formacion_Academica_Cat_instituciones]
GO
ALTER TABLE [dbo].[Tbl_Formacion_Academica]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Formacion_Academica_Cat_TipoEstudio] FOREIGN KEY([Id_TipoEstudio])
REFERENCES [dbo].[Cat_TipoEstudio] ([Id_TipoEstudio])
GO
ALTER TABLE [dbo].[Tbl_Formacion_Academica] CHECK CONSTRAINT [FK_Tbl_Formacion_Academica_Cat_TipoEstudio]
GO
ALTER TABLE [dbo].[Tbl_Formacion_Academica]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Formacion_Academica_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Formacion_Academica] CHECK CONSTRAINT [FK_Tbl_Formacion_Academica_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Grupos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Grupos_Cat_TipoGrupo] FOREIGN KEY([Id_TipoGrupo])
REFERENCES [dbo].[Cat_TipoGrupo] ([Id_TipoGrupo])
GO
ALTER TABLE [dbo].[Tbl_Grupos] CHECK CONSTRAINT [FK_Tbl_Grupos_Cat_TipoGrupo]
GO
ALTER TABLE [dbo].[Tbl_Grupos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Grupos_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador_Crea])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Grupos] CHECK CONSTRAINT [FK_Tbl_Grupos_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_IdiomasInv]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_IdiomasInv_Cat_Idiomas] FOREIGN KEY([Id_Idioma])
REFERENCES [dbo].[Cat_Idiomas] ([Id_Idioma])
GO
ALTER TABLE [dbo].[Tbl_IdiomasInv] CHECK CONSTRAINT [FK_Tbl_IdiomasInv_Cat_Idiomas]
GO
ALTER TABLE [dbo].[Tbl_IdiomasInv]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_IdiomasInv_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_IdiomasInv] CHECK CONSTRAINT [FK_Tbl_IdiomasInv_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Instituciones_Asociadas]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Instituciones_Asociadas_Cat_instituciones] FOREIGN KEY([Id_Institucion])
REFERENCES [dbo].[Cat_instituciones] ([Id_Institucion])
GO
ALTER TABLE [dbo].[Tbl_Instituciones_Asociadas] CHECK CONSTRAINT [FK_Tbl_Instituciones_Asociadas_Cat_instituciones]
GO
ALTER TABLE [dbo].[Tbl_Instituciones_Asociadas]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Instituciones_Asociadas_Cat_Tipo_Asociacion] FOREIGN KEY([Id_Tipo_Asociacion])
REFERENCES [dbo].[Cat_Tipo_Asociacion] ([Id_Tipo_Asociacion])
GO
ALTER TABLE [dbo].[Tbl_Instituciones_Asociadas] CHECK CONSTRAINT [FK_Tbl_Instituciones_Asociadas_Cat_Tipo_Asociacion]
GO
ALTER TABLE [dbo].[Tbl_Instituciones_Asociadas]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Instituciones_Asociadas_Tbl_Proyectos] FOREIGN KEY([Id_Proyecto])
REFERENCES [dbo].[Tbl_Proyectos] ([Id_Proyecto])
GO
ALTER TABLE [dbo].[Tbl_Instituciones_Asociadas] CHECK CONSTRAINT [FK_Tbl_Instituciones_Asociadas_Tbl_Proyectos]
GO
ALTER TABLE [dbo].[Tbl_InstitucionesAsociadasGrupos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InstitucionesAsociadas_Cat_instituciones] FOREIGN KEY([Id_Institucion])
REFERENCES [dbo].[Cat_instituciones] ([Id_Institucion])
GO
ALTER TABLE [dbo].[Tbl_InstitucionesAsociadasGrupos] CHECK CONSTRAINT [FK_Tbl_InstitucionesAsociadas_Cat_instituciones]
GO
ALTER TABLE [dbo].[Tbl_InstitucionesAsociadasGrupos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InstitucionesAsociadas_Tbl_Grupos] FOREIGN KEY([Id_Grupo])
REFERENCES [dbo].[Tbl_Grupos] ([Id_Grupo])
GO
ALTER TABLE [dbo].[Tbl_InstitucionesAsociadasGrupos] CHECK CONSTRAINT [FK_Tbl_InstitucionesAsociadas_Tbl_Grupos]
GO
ALTER TABLE [dbo].[Tbl_Invest_RedS]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Invest_RedS_CatRedesSociales] FOREIGN KEY([Id_RedSocial])
REFERENCES [dbo].[CatRedesSociales] ([Id_RedSocial])
GO
ALTER TABLE [dbo].[Tbl_Invest_RedS] CHECK CONSTRAINT [FK_Tbl_Invest_RedS_CatRedesSociales]
GO
ALTER TABLE [dbo].[Tbl_Invest_RedS]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Invest_RedS_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Invest_RedS] CHECK CONSTRAINT [FK_Tbl_Invest_RedS_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Investigaciones]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Investigaciones_Cat_Localidad] FOREIGN KEY([Id_Localidad])
REFERENCES [dbo].[Cat_Localidad] ([Id_Localidad])
GO
ALTER TABLE [dbo].[Tbl_Investigaciones] CHECK CONSTRAINT [FK_Tbl_Investigaciones_Cat_Localidad]
GO
ALTER TABLE [dbo].[Tbl_Investigaciones]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Investigaciones_Cat_Tipo_Investigacion] FOREIGN KEY([Id_Tipo_Investigacion])
REFERENCES [dbo].[Cat_Tipo_Investigacion] ([Id_Tipo_Investigacion])
GO
ALTER TABLE [dbo].[Tbl_Investigaciones] CHECK CONSTRAINT [FK_Tbl_Investigaciones_Cat_Tipo_Investigacion]
GO
ALTER TABLE [dbo].[Tbl_Investigaciones]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Investigaciones_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Investigaciones] CHECK CONSTRAINT [FK_Tbl_Investigaciones_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Investigaciones_Disciplinas]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Investigaciones_Disciplinas_CatDisciplinas] FOREIGN KEY([Id_Disciplina])
REFERENCES [dbo].[Cat_Disciplinas] ([Id_Disciplina])
GO
ALTER TABLE [dbo].[Tbl_Investigaciones_Disciplinas] CHECK CONSTRAINT [FK_Tbl_Investigaciones_Disciplinas_CatDisciplinas]
GO
ALTER TABLE [dbo].[Tbl_Investigaciones_Disciplinas]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Investigaciones_Disciplinas_Tbl_Investigaciones] FOREIGN KEY([Id_Investigacion])
REFERENCES [dbo].[Tbl_Investigaciones] ([Id_Investigacion])
GO
ALTER TABLE [dbo].[Tbl_Investigaciones_Disciplinas] CHECK CONSTRAINT [FK_Tbl_Investigaciones_Disciplinas_Tbl_Investigaciones]
GO
ALTER TABLE [dbo].[Tbl_InvestigadoresAsociados]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InvestigadoresAsociados_Cat_TipoMiembro] FOREIGN KEY([Id_TipoMiembro])
REFERENCES [dbo].[Cat_TipoMiembro] ([Id_TipoMiembro])
GO
ALTER TABLE [dbo].[Tbl_InvestigadoresAsociados] CHECK CONSTRAINT [FK_Tbl_InvestigadoresAsociados_Cat_TipoMiembro]
GO
ALTER TABLE [dbo].[Tbl_InvestigadoresAsociados]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InvestigadoresAsociados_Tbl_Grupos] FOREIGN KEY([Id_Grupo])
REFERENCES [dbo].[Tbl_Grupos] ([Id_Grupo])
GO
ALTER TABLE [dbo].[Tbl_InvestigadoresAsociados] CHECK CONSTRAINT [FK_Tbl_InvestigadoresAsociados_Tbl_Grupos]
GO
ALTER TABLE [dbo].[Tbl_InvestigadoresAsociados]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InvestigadoresAsociados_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_InvestigadoresAsociados] CHECK CONSTRAINT [FK_Tbl_InvestigadoresAsociados_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_InvestigatorProfile]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InvestigatorProfile_Cat_instituciones] FOREIGN KEY([Id_Institucion])
REFERENCES [dbo].[Cat_instituciones] ([Id_Institucion])
GO
ALTER TABLE [dbo].[Tbl_InvestigatorProfile] CHECK CONSTRAINT [FK_Tbl_InvestigatorProfile_Cat_instituciones]
GO
ALTER TABLE [dbo].[Tbl_InvestigatorProfile]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InvestigatorProfile_Cat_Nacionalidad] FOREIGN KEY([Id_Pais_Origen])
REFERENCES [dbo].[Cat_Paises] ([Id_Pais])
GO
ALTER TABLE [dbo].[Tbl_InvestigatorProfile] CHECK CONSTRAINT [FK_Tbl_InvestigatorProfile_Cat_Nacionalidad]
GO
ALTER TABLE [dbo].[Tbl_InvestigatorProfile]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InvestigatorProfile_Security_Users] FOREIGN KEY([IdUser])
REFERENCES [security].[Security_Users] ([Id_User])
GO
ALTER TABLE [dbo].[Tbl_InvestigatorProfile] CHECK CONSTRAINT [FK_Tbl_InvestigatorProfile_Security_Users]
GO
ALTER TABLE [dbo].[Tbl_Invitaciones]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Invitaciones_Tbl_Evento] FOREIGN KEY([Id_Evento])
REFERENCES [dbo].[Tbl_Evento] ([Id_Evento])
GO
ALTER TABLE [dbo].[Tbl_Invitaciones] CHECK CONSTRAINT [FK_Tbl_Invitaciones_Tbl_Evento]
GO
ALTER TABLE [dbo].[Tbl_Invitaciones]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Invitaciones_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Invitaciones] CHECK CONSTRAINT [FK_Tbl_Invitaciones_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Participantes_Eventos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Participantes_Eventos_Cat_Tipo_Participacion_Eventos] FOREIGN KEY([Id_Tipo_Participacion])
REFERENCES [dbo].[Cat_Tipo_Participacion_Eventos] ([Id_Tipo_Participacion])
GO
ALTER TABLE [dbo].[Tbl_Participantes_Eventos] CHECK CONSTRAINT [FK_Tbl_Participantes_Eventos_Cat_Tipo_Participacion_Eventos]
GO
ALTER TABLE [dbo].[Tbl_Participantes_Eventos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Participantes_Eventos_Tbl_Evento] FOREIGN KEY([Id_Evento])
REFERENCES [dbo].[Tbl_Evento] ([Id_Evento])
GO
ALTER TABLE [dbo].[Tbl_Participantes_Eventos] CHECK CONSTRAINT [FK_Tbl_Participantes_Eventos_Tbl_Evento]
GO
ALTER TABLE [dbo].[Tbl_Participantes_Eventos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Participantes_Eventos_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Participantes_Eventos] CHECK CONSTRAINT [FK_Tbl_Participantes_Eventos_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Participantes_Proyectos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Participantes_Cat_Cargo_Proyecto] FOREIGN KEY([Id_Cargo_Proyecto])
REFERENCES [dbo].[Cat_Cargo_Proyecto] ([Id_Cargo_Proyecto])
GO
ALTER TABLE [dbo].[Tbl_Participantes_Proyectos] CHECK CONSTRAINT [FK_Tbl_Participantes_Cat_Cargo_Proyecto]
GO
ALTER TABLE [dbo].[Tbl_Participantes_Proyectos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Participantes_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Participantes_Proyectos] CHECK CONSTRAINT [FK_Tbl_Participantes_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Participantes_Proyectos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Participantes_Tbl_Proyectos] FOREIGN KEY([Id_Proyecto])
REFERENCES [dbo].[Tbl_Proyectos] ([Id_Proyecto])
GO
ALTER TABLE [dbo].[Tbl_Participantes_Proyectos] CHECK CONSTRAINT [FK_Tbl_Participantes_Tbl_Proyectos]
GO
ALTER TABLE [dbo].[Tbl_Patentes]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Patentes_Cat_instituciones] FOREIGN KEY([Id_Institucion])
REFERENCES [dbo].[Cat_instituciones] ([Id_Institucion])
GO
ALTER TABLE [dbo].[Tbl_Patentes] CHECK CONSTRAINT [FK_Tbl_Patentes_Cat_instituciones]
GO
ALTER TABLE [dbo].[Tbl_Patentes]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Patentes_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Patentes] CHECK CONSTRAINT [FK_Tbl_Patentes_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Proyectos]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Proyectos_Cat_Tipo_Proyecto] FOREIGN KEY([Id_Tipo_Proyecto])
REFERENCES [dbo].[Cat_Tipo_Proyecto] ([Id_Tipo_Proyecto])
GO
ALTER TABLE [dbo].[Tbl_Proyectos] CHECK CONSTRAINT [FK_Tbl_Proyectos_Cat_Tipo_Proyecto]
GO
ALTER TABLE [dbo].[TblProcesosEditoriales]  WITH CHECK ADD  CONSTRAINT [FK_TblProcesosEditoriales_Cat_Tipo_Proceso_Editorial] FOREIGN KEY([Id_Tipo_Proceso_Editorial])
REFERENCES [dbo].[Cat_Tipo_Proceso_Editorial] ([Id_Tipo_Proceso_Editorial])
GO
ALTER TABLE [dbo].[TblProcesosEditoriales] CHECK CONSTRAINT [FK_TblProcesosEditoriales_Cat_Tipo_Proceso_Editorial]
GO
ALTER TABLE [dbo].[TblProcesosEditoriales]  WITH CHECK ADD  CONSTRAINT [FK_TblProcesosEditoriales_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[TblProcesosEditoriales] CHECK CONSTRAINT [FK_TblProcesosEditoriales_Tbl_InvestigatorProfile]
GO
ALTER TABLE [security].[Security_Permissions_Roles]  WITH CHECK ADD  CONSTRAINT [FK_Security_Permissions_Roles_Security_Permissions] FOREIGN KEY([Id_Permission])
REFERENCES [security].[Security_Permissions] ([Id_Permission])
GO
ALTER TABLE [security].[Security_Permissions_Roles] CHECK CONSTRAINT [FK_Security_Permissions_Roles_Security_Permissions]
GO
ALTER TABLE [security].[Security_Permissions_Roles]  WITH CHECK ADD  CONSTRAINT [FK_Security_Permissions_Roles_Security_Roles] FOREIGN KEY([Id_Role])
REFERENCES [security].[Security_Roles] ([Id_Role])
GO
ALTER TABLE [security].[Security_Permissions_Roles] CHECK CONSTRAINT [FK_Security_Permissions_Roles_Security_Roles]
GO
ALTER TABLE [security].[Security_Users_Roles]  WITH CHECK ADD  CONSTRAINT [FK_Security_Users_Roles_Security_Roles] FOREIGN KEY([Id_Role])
REFERENCES [security].[Security_Roles] ([Id_Role])
GO
ALTER TABLE [security].[Security_Users_Roles] CHECK CONSTRAINT [FK_Security_Users_Roles_Security_Roles]
GO
ALTER TABLE [security].[Security_Users_Roles]  WITH CHECK ADD  CONSTRAINT [FK_Security_Users_Roles_Security_Users] FOREIGN KEY([Id_User])
REFERENCES [security].[Security_Users] ([Id_User])
GO
ALTER TABLE [security].[Security_Users_Roles] CHECK CONSTRAINT [FK_Security_Users_Roles_Security_Users]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = -96
         Left = 0
      End
      Begin Tables = 
         Begin Table = "ProyectoTableActividades"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 224
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "ProyectoTableTareas"
            Begin Extent = 
               Top = 6
               Left = 262
               Bottom = 136
               Right = 448
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "ProyectoTableParticipantes"
            Begin Extent = 
               Top = 138
               Left = 38
               Bottom = 251
               Right = 245
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 12
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewActividadesParticipantes'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewActividadesParticipantes'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "ProyectoTableActividades"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 247
               Right = 211
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "ProyectoTableTareas"
            Begin Extent = 
               Top = 38
               Left = 397
               Bottom = 289
               Right = 567
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "ProyectoTableCalendario"
            Begin Extent = 
               Top = 117
               Left = 666
               Bottom = 300
               Right = 836
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewCalendarioByDependencia'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewCalendarioByDependencia'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = -96
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Tbl_Colaboradores"
            Begin Extent = 
               Top = 18
               Left = 77
               Bottom = 181
               Right = 286
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_InvestigatorProfile"
            Begin Extent = 
               Top = 107
               Left = 386
               Bottom = 390
               Right = 581
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_Tipo_Colaborador"
            Begin Extent = 
               Top = 298
               Left = 87
               Bottom = 411
               Right = 290
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_instituciones"
            Begin Extent = 
               Top = 257
               Left = 684
               Bottom = 393
               Right = 854
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_Investigaciones"
            Begin Extent = 
               Top = 0
               Left = 869
               Bottom = 278
               Right = 1071
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 4305
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewColaboradores'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N' = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewColaboradores'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewColaboradores'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Tbl_Instituciones_Asociadas"
            Begin Extent = 
               Top = 6
               Left = 710
               Bottom = 236
               Right = 900
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_instituciones"
            Begin Extent = 
               Top = 107
               Left = 1017
               Bottom = 275
               Right = 1187
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_Tipo_Asociacion"
            Begin Extent = 
               Top = 32
               Left = 309
               Bottom = 229
               Right = 499
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewGPInstitucionesAsociadas'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewGPInstitucionesAsociadas'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Cat_Idiomas"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 175
               Right = 199
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_IdiomasInv"
            Begin Extent = 
               Top = 6
               Left = 246
               Bottom = 200
               Right = 416
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewIdiomasInvestigadores'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewIdiomasInvestigadores'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[26] 4[26] 2[29] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = -288
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Cat_Tipo_Investigacion"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 119
               Right = 240
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_Investigaciones"
            Begin Extent = 
               Top = 29
               Left = 971
               Bottom = 327
               Right = 1173
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_InvestigatorProfile"
            Begin Extent = 
               Top = 283
               Left = 382
               Bottom = 586
               Right = 577
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_instituciones"
            Begin Extent = 
               Top = 301
               Left = 124
               Bottom = 431
               Right = 294
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_Localidad"
            Begin Extent = 
               Top = 110
               Left = 417
               Bottom = 240
               Right = 606
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_Paises"
            Begin Extent = 
               Top = 120
               Left = 38
               Bottom = 233
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_TipoLocalidad"
            Begin Extent = 
               Top = 356
               Left = 674
               Bottom = 586' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigaciones'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'
               Right = 886
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 7065
         Alias = 2790
         Table = 4050
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigaciones'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigaciones'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Tbl_Investigaciones_Disciplinas"
            Begin Extent = 
               Top = 6
               Left = 278
               Bottom = 200
               Right = 452
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_Disciplinas"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 240
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 2340
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigacionesDisciplinas'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigacionesDisciplinas'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Cat_Tipo_Investigacion"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 145
               Right = 240
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_Investigaciones"
            Begin Extent = 
               Top = 6
               Left = 278
               Bottom = 215
               Right = 472
            End
            DisplayFlags = 280
            TopColumn = 10
         End
         Begin Table = "Tbl_InvestigatorProfile"
            Begin Extent = 
               Top = 6
               Left = 518
               Bottom = 316
               Right = 713
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_instituciones"
            Begin Extent = 
               Top = 6
               Left = 751
               Bottom = 150
               Right = 921
            End
            DisplayFlags = 280
            TopColumn = 1
         End
         Begin Table = "Cat_Localidad"
            Begin Extent = 
               Top = 6
               Left = 959
               Bottom = 136
               Right = 1148
            End
            DisplayFlags = 280
            TopColumn = 3
         End
         Begin Table = "Cat_Paises"
            Begin Extent = 
               Top = 163
               Left = 55
               Bottom = 276
               Right = 225
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_TipoLocalidad"
            Begin Extent = 
               Top = 202
               Left = 858
               Bottom = 298
       ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigacionesPhoto'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'        Right = 1070
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 3705
         Alias = 3435
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigacionesPhoto'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigacionesPhoto'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[41] 4[20] 2[17] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Cat_Tipo_Investigacion"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 119
               Right = 240
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_Investigaciones"
            Begin Extent = 
               Top = 6
               Left = 278
               Bottom = 296
               Right = 480
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_InvestigatorProfile"
            Begin Extent = 
               Top = 6
               Left = 518
               Bottom = 325
               Right = 713
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_instituciones"
            Begin Extent = 
               Top = 6
               Left = 751
               Bottom = 136
               Right = 921
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_Localidad"
            Begin Extent = 
               Top = 6
               Left = 959
               Bottom = 136
               Right = 1148
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_Paises"
            Begin Extent = 
               Top = 120
               Left = 38
               Bottom = 233
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_TipoLocalidad"
            Begin Extent = 
               Top = 138
               Left = 246
               Bottom = 234
        ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigacionesPorDisciplinas'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'       Right = 458
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_Investigaciones_Disciplinas"
            Begin Extent = 
               Top = 173
               Left = 590
               Bottom = 269
               Right = 764
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "CatDisciplinas"
            Begin Extent = 
               Top = 212
               Left = 911
               Bottom = 342
               Right = 1113
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 21
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 4875
         Table = 3120
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigacionesPorDisciplinas'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigacionesPorDisciplinas'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[41] 4[20] 2[15] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Cat_Tipo_Proyecto"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 126
               Right = 217
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_Proyectos"
            Begin Extent = 
               Top = 70
               Left = 264
               Bottom = 298
               Right = 462
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_Participantes_Proyectos"
            Begin Extent = 
               Top = 71
               Left = 560
               Bottom = 235
               Right = 752
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Cat_Cargo_Proyecto"
            Begin Extent = 
               Top = 53
               Left = 874
               Bottom = 201
               Right = 1062
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 2910
         Alias = 2460
         Table = 2940
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
    ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewParticipantesProyectos'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'     Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewParticipantesProyectos'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewParticipantesProyectos'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "CatRedesSociales"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 257
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Tbl_Invest_RedS"
            Begin Extent = 
               Top = 6
               Left = 246
               Bottom = 233
               Right = 416
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewRedesInvestigadores'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewRedesInvestigadores'
GO
USE [master]
GO
ALTER DATABASE [SNIBD] SET  READ_WRITE 
GO
