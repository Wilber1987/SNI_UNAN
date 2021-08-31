USE [master]
GO
/****** Object:  Database [SNIBD]    Script Date: 31/08/2021 16:35:25 ******/
CREATE DATABASE [SNIBD]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SNIBD', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SNIBD.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SNIBD_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SNIBD_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
ALTER DATABASE [SNIBD] SET QUERY_STORE = OFF
GO
USE [SNIBD]
GO
/****** Object:  Table [dbo].[Tbl_InvestigatorProfile]    Script Date: 31/08/2021 16:35:25 ******/
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
	[Foto] [varbinary](max) NULL,
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
/****** Object:  Table [dbo].[Cat_Tipo_Investigacion]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Tbl_Investigaciones]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Investigaciones](
	[Id_Investigacion] [int] IDENTITY(1,1) NOT NULL,
	[Visibilidad] [nvarchar](50) NULL,
	[Id_Tipo_Investigacion] [int] NULL,
	[Titulo] [nvarchar](50) NULL,
	[Resumen] [nvarchar](500) NULL,
	[Repositorio] [varbinary](max) NULL,
	[Referencias] [nvarchar](1000) NULL,
	[url_publicacion] [nvarchar](250) NULL,
	[Fecha_ejecucion] [nvarchar](50) NULL,
	[Id_Investigador] [int] NULL,
 CONSTRAINT [PK_Tbl_Investigaciones] PRIMARY KEY CLUSTERED 
(
	[Id_Investigacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewInvestigaciones]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewInvestigaciones]
AS
SELECT        dbo.Tbl_InvestigatorProfile.Nombres, dbo.Tbl_InvestigatorProfile.Apellidos, dbo.Tbl_InvestigatorProfile.Foto, dbo.Tbl_Investigaciones.Titulo, dbo.Tbl_Investigaciones.Repositorio, dbo.Cat_Tipo_Investigacion.Descripcion, 
                         dbo.Tbl_Investigaciones.Fecha_ejecucion, dbo.Tbl_Investigaciones.Id_Investigacion, dbo.Tbl_Investigaciones.Resumen, dbo.Tbl_Investigaciones.url_publicacion
FROM            dbo.Cat_Tipo_Investigacion INNER JOIN
                         dbo.Tbl_Investigaciones ON dbo.Cat_Tipo_Investigacion.Id_Tipo_Investigacion = dbo.Tbl_Investigaciones.Id_Tipo_Investigacion INNER JOIN
                         dbo.Tbl_InvestigatorProfile ON dbo.Tbl_Investigaciones.Id_Investigador = dbo.Tbl_InvestigatorProfile.Id_Investigador
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](128) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Cargo_Proyecto]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Cat_Cargos]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Cat_Idiomas]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Idiomas](
	[Id_Idioma] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Idiomas] PRIMARY KEY CLUSTERED 
(
	[Id_Idioma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_instituciones]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_instituciones](
	[Id_Institucion] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Direccion] [nvarchar](250) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_instituciones] PRIMARY KEY CLUSTERED 
(
	[Id_Institucion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_Paises]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Cat_Tipo_Asociacion]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Cat_Tipo_Colaborador]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Cat_Tipo_Evento]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Cat_Tipo_Proyecto]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_Tipo_Proyecto](
	[Id_Tipo_Proyecto] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Tipo_Proyecto] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Proyecto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_TipoEstudio]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cat_TipoEstudio](
	[Id_TipoEstudio] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_TipoEstudio] PRIMARY KEY CLUSTERED 
(
	[Id_TipoEstudio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cat_TipoGrupo]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Cat_TipoMiembro]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[CatRedesSociales]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatRedesSociales](
	[Id_RedSocial] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[url] [nvarchar](250) NULL,
 CONSTRAINT [PK_CatRedesSociales] PRIMARY KEY CLUSTERED 
(
	[Id_RedSocial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatTipoDistincion]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Tbl_Colaboradores]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Tbl_Datos_Laborales]    Script Date: 31/08/2021 16:35:25 ******/
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
	[Facultad] [nvarchar](50) NULL,
	[Unidad] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_Datos_Laborales] PRIMARY KEY CLUSTERED 
(
	[Id_DatoL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Distinciones]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Tbl_Evento]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Evento](
	[Id_Evento] [int] IDENTITY(1,1) NOT NULL,
	[Id_Tipo_Evento] [int] NULL,
	[Nombre] [nvarchar](250) NULL,
	[Id_Pais] [int] NULL,
	[Titulo_Ponencia] [nvarchar](250) NULL,
	[Fecha_Inicio] [date] NULL,
	[Fecha_Finalizacion] [date] NULL,
	[Modalidad] [nvarchar](50) NULL,
	[Modalidad_Ponencia] [nvarchar](50) NULL,
	[Link] [nvarchar](250) NULL,
	[Datos_Adicionales] [nvarchar](250) NULL,
	[Id_Investigador] [int] NULL,
 CONSTRAINT [PK_Tbl_Evento] PRIMARY KEY CLUSTERED 
(
	[Id_Evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Formacion_Academica]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Tbl_Grupos]    Script Date: 31/08/2021 16:35:25 ******/
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
 CONSTRAINT [PK_Tbl_Grupos] PRIMARY KEY CLUSTERED 
(
	[Id_Grupo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_IdiomasInv]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Tbl_Instituciones_Asociadas]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Tbl_InstitucionesAsociadas]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_InstitucionesAsociadas](
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
/****** Object:  Table [dbo].[Tbl_Invest_RedS]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Invest_RedS](
	[Id_investigador] [int] NOT NULL,
	[Id_RedSocial] [int] NOT NULL,
	[url] [nvarchar](250) NULL,
 CONSTRAINT [PK_Tbl_Invest_RedS] PRIMARY KEY CLUSTERED 
(
	[Id_investigador] ASC,
	[Id_RedSocial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_InvestigadoresAsociados]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Tbl_Invitaciones]    Script Date: 31/08/2021 16:35:25 ******/
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
/****** Object:  Table [dbo].[Tbl_Participantes]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Participantes](
	[Id_Proyecto] [int] NOT NULL,
	[Id_Investigador] [int] NOT NULL,
	[Id_Cargo_Proyecto] [int] NULL,
	[Fecha_Ingreso] [date] NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_Participantes] PRIMARY KEY CLUSTERED 
(
	[Id_Proyecto] ASC,
	[Id_Investigador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Patentes]    Script Date: 31/08/2021 16:35:25 ******/
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
 CONSTRAINT [PK_Tbl_Patentes] PRIMARY KEY CLUSTERED 
(
	[Id_Patente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Proyectos]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Proyectos](
	[Id_Proyecto] [int] IDENTITY(1,1) NOT NULL,
	[Id_Tipo_Proyecto] [int] NULL,
	[Visibilidad] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
	[Fecha_Inicio] [date] NULL,
	[Fecha_Finalizacion] [date] NULL,
 CONSTRAINT [PK_Tbl_Proyectos] PRIMARY KEY CLUSTERED 
(
	[Id_Proyecto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblUser]    Script Date: 31/08/2021 16:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblUser](
	[Id_User] [int] IDENTITY(1,1) NOT NULL,
	[Mail] [nvarchar](50) NULL,
	[Password] [nvarchar](250) NULL,
	[token] [nvarchar](250) NULL,
	[token_date] [nvarchar](50) NULL,
	[Nickname] [nvarchar](50) NULL,
 CONSTRAINT [PK_TblUser] PRIMARY KEY CLUSTERED 
(
	[Id_User] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'00000000000000_CreateIdentitySchema', N'5.0.0')
GO
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'9c7964f5-9e4f-409c-8fc4-3c55e7987553', N'wilberj1987@hotmail.com', N'WILBERJ1987@HOTMAIL.COM', N'wilberj1987@hotmail.com', N'WILBERJ1987@HOTMAIL.COM', 0, N'AQAAAAEAACcQAAAAEDl2h3D0FgMA8x1fn7bwBTgcNhLkj86XBxlvcKzQuXTu4GsZbpQznxF0nAUavLVArA==', N'MK3J26GSUOLSBN6ZZA4OIOHVIZUCRKGZ', N'4972daf0-13cf-47b4-a2b3-11cf6d88b7ca', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'dec57434-b60a-4c97-bbf8-b12c9d827832', N'wilberj1987@gmail.com', N'WILBERJ1987@GMAIL.COM', N'wilberj1987@gmail.com', N'WILBERJ1987@GMAIL.COM', 1, N'AQAAAAEAACcQAAAAECghLB2g05d89GDbsZ2KvcYvESP+ZNGrlhVVaqRK7+3iw4xAjFs8lB6pDypVfB+0BQ==', N'S63YUAJUUQ3I4NR7PXCY3GQN367GS7TM', N'79c48ef9-1d7c-434a-a20b-f6a7bf883662', NULL, 0, 0, NULL, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[Cat_Paises] ON 

INSERT [dbo].[Cat_Paises] ([Id_Pais], [Estado], [Descripcion]) VALUES (10, N'ACT', N'Nicaragua')
INSERT [dbo].[Cat_Paises] ([Id_Pais], [Estado], [Descripcion]) VALUES (11, N'ACT', N'Brazil')
SET IDENTITY_INSERT [dbo].[Cat_Paises] OFF
GO
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Investigacion] ON 

INSERT [dbo].[Cat_Tipo_Investigacion] ([Id_Tipo_Investigacion], [Descripcion], [Estado]) VALUES (1, N'Doctorado', N'act')
INSERT [dbo].[Cat_Tipo_Investigacion] ([Id_Tipo_Investigacion], [Descripcion], [Estado]) VALUES (2, N'Master', N'act')
INSERT [dbo].[Cat_Tipo_Investigacion] ([Id_Tipo_Investigacion], [Descripcion], [Estado]) VALUES (3, N'Grado', N'act')
SET IDENTITY_INSERT [dbo].[Cat_Tipo_Investigacion] OFF
GO
SET IDENTITY_INSERT [dbo].[Tbl_Investigaciones] ON 

INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (4, N'public', 1, N'Investigacion 1', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (5, N'public', 1, N'Investigacion 2', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (6, N'public', 1, N'Investigacion 3', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (7, N'public', 1, N'Investigacion 4', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (8, N'public', 1, N'Investigacion 5', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (9, N'public', 1, N'Investigacion 1', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (10, N'public', 1, N'Investigacion 2', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (11, N'public', 1, N'Investigacion 3', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (12, N'public', 1, N'Investigacion 4', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (13, N'public', 1, N'Investigacion 5', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (14, N'public', 1, N'Investigacion 1', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (15, N'public', 1, N'Investigacion 2', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (16, N'public', 1, N'Investigacion 3', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (17, N'public', 1, N'Investigacion 4', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
INSERT [dbo].[Tbl_Investigaciones] ([Id_Investigacion], [Visibilidad], [Id_Tipo_Investigacion], [Titulo], [Resumen], [Repositorio], [Referencias], [url_publicacion], [Fecha_ejecucion], [Id_Investigador]) VALUES (18, N'public', 1, N'Investigacion 50000', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to 50000', NULL, NULL, N'www.repo.com', N'24-07-2000', 1)
SET IDENTITY_INSERT [dbo].[Tbl_Investigaciones] OFF
GO
SET IDENTITY_INSERT [dbo].[Tbl_InvestigatorProfile] ON 

INSERT [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador], [Nombres], [Apellidos], [FechaNac], [IdUser], [Sexo], [Foto], [DNI], [Correo_institucional], [Id_Pais_Origen], [Id_Institucion], [Indice_H], [Estado]) VALUES (1, N'Wilber', N'Matus', CAST(N'1987-07-24' AS Date), NULL, N'Masculino', NULL, N'090909', N'Wilber@unaun.edu.ni', NULL, NULL, NULL, N'act')
SET IDENTITY_INSERT [dbo].[Tbl_InvestigatorProfile] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 31/08/2021 16:35:26 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 31/08/2021 16:35:26 ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 31/08/2021 16:35:26 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 31/08/2021 16:35:26 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 31/08/2021 16:35:26 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 31/08/2021 16:35:26 ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 31/08/2021 16:35:26 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
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
ALTER TABLE [dbo].[Tbl_InstitucionesAsociadas]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InstitucionesAsociadas_Cat_instituciones] FOREIGN KEY([Id_Institucion])
REFERENCES [dbo].[Cat_instituciones] ([Id_Institucion])
GO
ALTER TABLE [dbo].[Tbl_InstitucionesAsociadas] CHECK CONSTRAINT [FK_Tbl_InstitucionesAsociadas_Cat_instituciones]
GO
ALTER TABLE [dbo].[Tbl_InstitucionesAsociadas]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InstitucionesAsociadas_Tbl_Grupos] FOREIGN KEY([Id_Grupo])
REFERENCES [dbo].[Tbl_Grupos] ([Id_Grupo])
GO
ALTER TABLE [dbo].[Tbl_InstitucionesAsociadas] CHECK CONSTRAINT [FK_Tbl_InstitucionesAsociadas_Tbl_Grupos]
GO
ALTER TABLE [dbo].[Tbl_Invest_RedS]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Invest_RedS_CatRedesSociales] FOREIGN KEY([Id_RedSocial])
REFERENCES [dbo].[CatRedesSociales] ([Id_RedSocial])
GO
ALTER TABLE [dbo].[Tbl_Invest_RedS] CHECK CONSTRAINT [FK_Tbl_Invest_RedS_CatRedesSociales]
GO
ALTER TABLE [dbo].[Tbl_Invest_RedS]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Invest_RedS_Tbl_InvestigatorProfile] FOREIGN KEY([Id_investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Invest_RedS] CHECK CONSTRAINT [FK_Tbl_Invest_RedS_Tbl_InvestigatorProfile]
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
ALTER TABLE [dbo].[Tbl_InvestigatorProfile]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_InvestigatorProfile_TblUser] FOREIGN KEY([IdUser])
REFERENCES [dbo].[TblUser] ([Id_User])
GO
ALTER TABLE [dbo].[Tbl_InvestigatorProfile] CHECK CONSTRAINT [FK_Tbl_InvestigatorProfile_TblUser]
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
ALTER TABLE [dbo].[Tbl_Participantes]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Participantes_Cat_Cargo_Proyecto] FOREIGN KEY([Id_Cargo_Proyecto])
REFERENCES [dbo].[Cat_Cargo_Proyecto] ([Id_Cargo_Proyecto])
GO
ALTER TABLE [dbo].[Tbl_Participantes] CHECK CONSTRAINT [FK_Tbl_Participantes_Cat_Cargo_Proyecto]
GO
ALTER TABLE [dbo].[Tbl_Participantes]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Participantes_Tbl_InvestigatorProfile] FOREIGN KEY([Id_Investigador])
REFERENCES [dbo].[Tbl_InvestigatorProfile] ([Id_Investigador])
GO
ALTER TABLE [dbo].[Tbl_Participantes] CHECK CONSTRAINT [FK_Tbl_Participantes_Tbl_InvestigatorProfile]
GO
ALTER TABLE [dbo].[Tbl_Participantes]  WITH CHECK ADD  CONSTRAINT [FK_Tbl_Participantes_Tbl_Proyectos] FOREIGN KEY([Id_Proyecto])
REFERENCES [dbo].[Tbl_Proyectos] ([Id_Proyecto])
GO
ALTER TABLE [dbo].[Tbl_Participantes] CHECK CONSTRAINT [FK_Tbl_Participantes_Tbl_Proyectos]
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
               Bottom = 136
               Right = 480
            End
            DisplayFlags = 280
            TopColumn = 6
         End
         Begin Table = "Tbl_InvestigatorProfile"
            Begin Extent = 
               Top = 6
               Left = 518
               Bottom = 136
               Right = 713
            End
            DisplayFlags = 280
            TopColumn = 9
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
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewInvestigaciones'
GO
USE [master]
GO
ALTER DATABASE [SNIBD] SET  READ_WRITE 
GO
