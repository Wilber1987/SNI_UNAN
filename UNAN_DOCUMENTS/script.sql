USE [master]
GO
/****** Object:  Database [SIAC_BD]    Script Date: 10/5/2022 15:04:12 ******/
CREATE DATABASE [SIAC_BD]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SIAC_BD', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SIAC_BD.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SIAC_BD_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SIAC_BD_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SIAC_BD] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SIAC_BD].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SIAC_BD] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SIAC_BD] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SIAC_BD] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SIAC_BD] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SIAC_BD] SET ARITHABORT OFF 
GO
ALTER DATABASE [SIAC_BD] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SIAC_BD] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SIAC_BD] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SIAC_BD] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SIAC_BD] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SIAC_BD] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SIAC_BD] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SIAC_BD] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SIAC_BD] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SIAC_BD] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SIAC_BD] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SIAC_BD] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SIAC_BD] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SIAC_BD] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SIAC_BD] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SIAC_BD] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SIAC_BD] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SIAC_BD] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SIAC_BD] SET  MULTI_USER 
GO
ALTER DATABASE [SIAC_BD] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SIAC_BD] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SIAC_BD] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SIAC_BD] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SIAC_BD] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SIAC_BD] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SIAC_BD] SET QUERY_STORE = OFF
GO
USE [SIAC_BD]
GO
/****** Object:  DatabaseRole [db_test]    Script Date: 10/5/2022 15:04:12 ******/
CREATE ROLE [db_test]
GO
/****** Object:  Schema [sc_test]    Script Date: 10/5/2022 15:04:12 ******/
CREATE SCHEMA [sc_test]
GO
/****** Object:  Table [dbo].[TblActividades]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblActividades](
	[IdActividad] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [nvarchar](250) NULL,
	[Descripcion] [nvarchar](500) NULL,
	[IdUsuario] [int] NULL,
	[Estado] [nvarchar](50) NULL,
	[IdDependencia] [int] NULL,
	[Fecha_Inicial] [datetime] NULL,
	[Fecha_Final] [datetime] NULL,
 CONSTRAINT [PK_TblActividades] PRIMARY KEY CLUSTERED 
(
	[IdActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblCalendario]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblCalendario](
	[IdCalendario] [int] IDENTITY(1,1) NOT NULL,
	[IdTarea] [int] NULL,
	[Estado] [nvarchar](50) NULL,
	[Fecha_Inicial] [datetime] NULL,
	[Fecha_Final] [datetime] NULL,
 CONSTRAINT [PK_TblCalendario] PRIMARY KEY CLUSTERED 
(
	[IdCalendario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblTareas]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblTareas](
	[IdTarea] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [nvarchar](50) NULL,
	[IdTareaPadre] [int] NULL,
	[IdActividad] [int] NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_TblTareas] PRIMARY KEY CLUSTERED 
(
	[IdTarea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewCalendarioByDependencia]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewCalendarioByDependencia]
AS
SELECT        dbo.TblActividades.IdDependencia, dbo.TblTareas.IdActividad, dbo.TblTareas.IdTareaPadre, dbo.TblCalendario.Fecha_Inicial, dbo.TblCalendario.Fecha_Final, dbo.TblCalendario.Estado, dbo.TblCalendario.IdCalendario, 
                         dbo.TblCalendario.IdTarea
FROM            dbo.TblActividades INNER JOIN
                         dbo.TblTareas ON dbo.TblActividades.IdActividad = dbo.TblTareas.IdActividad INNER JOIN
                         dbo.TblCalendario ON dbo.TblTareas.IdTarea = dbo.TblCalendario.IdTarea
GO
/****** Object:  Table [dbo].[TblParticipantes]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblParticipantes](
	[IdUsuario] [int] NOT NULL,
	[IdTarea] [int] NOT NULL,
	[IdTipoParticipacion] [int] NULL,
 CONSTRAINT [PK_TblParticipantes] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC,
	[IdTarea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewActividadesParticipantes]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewActividadesParticipantes]
AS
SELECT        dbo.TblActividades.IdActividad, dbo.TblActividades.Titulo, dbo.TblActividades.Descripcion, dbo.TblActividades.Estado, dbo.TblParticipantes.IdUsuario
FROM            dbo.TblActividades INNER JOIN
                         dbo.TblTareas ON dbo.TblActividades.IdActividad = dbo.TblTareas.IdActividad INNER JOIN
                         dbo.TblParticipantes ON dbo.TblTareas.IdTarea = dbo.TblParticipantes.IdTarea
GROUP BY dbo.TblActividades.IdActividad, dbo.TblActividades.Titulo, dbo.TblActividades.Descripcion, dbo.TblActividades.Estado, dbo.TblParticipantes.IdUsuario
GO
/****** Object:  Table [dbo].[CatCargosDependencias]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatCargosDependencias](
	[IdCargo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatCargosDependencias] PRIMARY KEY CLUSTERED 
(
	[IdCargo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatDependencias]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatDependencias](
	[IdDependencia] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[IdDependenciaP] [int] NULL,
 CONSTRAINT [PK_CatDependencias] PRIMARY KEY CLUSTERED 
(
	[IdDependencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatTipoParticipaciones]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatTipoParticipaciones](
	[IdTipoParticipacion] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatTipoParticipaciones] PRIMARY KEY CLUSTERED 
(
	[IdTipoParticipacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblAgenda]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblAgenda](
	[IdAgenda] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NULL,
	[IdDependencia] [int] NULL,
	[Dia] [nvarchar](50) NULL,
	[Hora_Inicial] [nvarchar](50) NULL,
	[Hora_Final] [nvarchar](50) NULL,
	[Fecha_Caducidad] [datetime] NULL,
 CONSTRAINT [PK_TblAgendas] PRIMARY KEY CLUSTERED 
(
	[IdAgenda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDependencias_Usuarios]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDependencias_Usuarios](
	[IdUsuario] [int] NOT NULL,
	[IdDependencia] [int] NOT NULL,
	[IdCargo] [int] NULL,
 CONSTRAINT [PK_TblDependencias_Usuarios] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC,
	[IdDependencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblEvidencias]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblEvidencias](
	[IdEvidencia] [int] IDENTITY(1,1) NOT NULL,
	[IdTipo] [int] NULL,
	[Data] [nvarchar](max) NULL,
	[IdTarea] [int] NULL,
 CONSTRAINT [PK_TblEvidencias] PRIMARY KEY CLUSTERED 
(
	[IdEvidencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblPermanencia]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblPermanencia](
	[IdPermanencia] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_TblPermanencia] PRIMARY KEY CLUSTERED 
(
	[IdPermanencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblUsuario]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblUsuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [nvarchar](50) NULL,
	[Apellidos] [nvarchar](50) NULL,
	[Mail] [nvarchar](50) NULL,
 CONSTRAINT [PK_TblUsuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [sc_test].[TblAgendaTest]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [sc_test].[TblAgendaTest](
	[IdAgenda] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NULL,
	[IdDependencia] [int] NULL,
	[Dia] [nvarchar](50) NULL,
	[Hora_Inicial] [nvarchar](50) NULL,
	[Hora_Final] [nvarchar](50) NULL,
	[Fecha_Caducidad] [datetime] NULL,
 CONSTRAINT [PK_TblAgendas] PRIMARY KEY CLUSTERED 
(
	[IdAgenda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CatCargosDependencias] ON 

INSERT [dbo].[CatCargosDependencias] ([IdCargo], [Descripcion]) VALUES (1, N'Encargado')
INSERT [dbo].[CatCargosDependencias] ([IdCargo], [Descripcion]) VALUES (2, N'Coordinador')
INSERT [dbo].[CatCargosDependencias] ([IdCargo], [Descripcion]) VALUES (3, N'Tecnico')
SET IDENTITY_INSERT [dbo].[CatCargosDependencias] OFF
GO
SET IDENTITY_INSERT [dbo].[CatDependencias] ON 

INSERT [dbo].[CatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (1, N'USAV', 3)
INSERT [dbo].[CatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (2, N'CTS', NULL)
INSERT [dbo].[CatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (3, N'TIC', NULL)
SET IDENTITY_INSERT [dbo].[CatDependencias] OFF
GO
SET IDENTITY_INSERT [dbo].[CatTipoParticipaciones] ON 

INSERT [dbo].[CatTipoParticipaciones] ([IdTipoParticipacion], [Descripcion]) VALUES (1, N'Colaborador')
INSERT [dbo].[CatTipoParticipaciones] ([IdTipoParticipacion], [Descripcion]) VALUES (2, N'Coordinador')
SET IDENTITY_INSERT [dbo].[CatTipoParticipaciones] OFF
GO
SET IDENTITY_INSERT [dbo].[TblActividades] ON 

INSERT [dbo].[TblActividades] ([IdActividad], [Titulo], [Descripcion], [IdUsuario], [Estado], [IdDependencia], [Fecha_Inicial], [Fecha_Final]) VALUES (1, N'act 1', N'test de des', 1, N'Activa', 1, NULL, NULL)
INSERT [dbo].[TblActividades] ([IdActividad], [Titulo], [Descripcion], [IdUsuario], [Estado], [IdDependencia], [Fecha_Inicial], [Fecha_Final]) VALUES (2, N'efwer', N'werwe', 1, N'Activa', 1, NULL, NULL)
INSERT [dbo].[TblActividades] ([IdActividad], [Titulo], [Descripcion], [IdUsuario], [Estado], [IdDependencia], [Fecha_Inicial], [Fecha_Final]) VALUES (3, N'qwe', N'qwe', 1, N'Activa', 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[TblActividades] OFF
GO
SET IDENTITY_INSERT [dbo].[TblAgenda] ON 

INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (4, 1, 1, N'Lunes', N'08:00', N'17:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (5, 1, 1, N'Martes', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (8, 1, 1, N'Miercoles', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (9, 1, 1, N'Jueves', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (10, 1, 1, N'Viernes', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[TblAgenda] OFF
GO
SET IDENTITY_INSERT [dbo].[TblCalendario] ON 

INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (1, 1, NULL, CAST(N'2022-04-28T08:00:00.000' AS DateTime), CAST(N'2022-04-28T08:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (2, 1, NULL, CAST(N'2022-04-28T09:00:00.000' AS DateTime), CAST(N'2022-04-28T09:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (3, 2, NULL, CAST(N'2022-04-29T08:00:00.000' AS DateTime), CAST(N'2022-04-29T08:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (4, 3, NULL, CAST(N'2022-04-29T09:00:00.000' AS DateTime), CAST(N'2022-04-29T09:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (5, 4, NULL, CAST(N'2022-04-28T12:00:00.000' AS DateTime), CAST(N'2022-04-28T12:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (6, 7, NULL, CAST(N'2022-04-29T10:00:00.000' AS DateTime), CAST(N'2022-04-29T10:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (7, 8, NULL, CAST(N'2022-04-29T10:00:00.000' AS DateTime), CAST(N'2022-04-29T10:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (8, 8, NULL, CAST(N'2022-04-28T11:00:00.000' AS DateTime), CAST(N'2022-04-28T11:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (9, 9, NULL, CAST(N'2022-04-29T10:00:00.000' AS DateTime), CAST(N'2022-04-29T10:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (10, 9, NULL, CAST(N'2022-04-28T11:00:00.000' AS DateTime), CAST(N'2022-04-28T11:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (11, 9, NULL, CAST(N'2022-04-28T10:00:00.000' AS DateTime), CAST(N'2022-04-28T10:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (12, 10, NULL, CAST(N'2022-04-28T13:00:00.000' AS DateTime), CAST(N'2022-04-28T13:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (13, 11, NULL, CAST(N'2022-04-29T11:00:00.000' AS DateTime), CAST(N'2022-04-29T11:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (14, 12, NULL, CAST(N'2022-04-29T12:00:00.000' AS DateTime), CAST(N'2022-04-29T12:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (15, 13, NULL, CAST(N'2022-04-29T13:00:00.000' AS DateTime), CAST(N'2022-04-29T13:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (16, 13, NULL, CAST(N'2022-04-29T14:00:00.000' AS DateTime), CAST(N'2022-04-29T14:59:00.000' AS DateTime))
INSERT [dbo].[TblCalendario] ([IdCalendario], [IdTarea], [Estado], [Fecha_Inicial], [Fecha_Final]) VALUES (17, 14, NULL, CAST(N'2022-04-29T15:00:00.000' AS DateTime), CAST(N'2022-04-29T15:59:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[TblCalendario] OFF
GO
INSERT [dbo].[TblDependencias_Usuarios] ([IdUsuario], [IdDependencia], [IdCargo]) VALUES (1, 1, 1)
GO
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 2, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 3, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 4, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 5, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 10, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 12, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 13, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 14, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (2, 6, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (2, 7, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (2, 8, 1)
INSERT [dbo].[TblParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (3, 9, 1)
GO
SET IDENTITY_INSERT [dbo].[TblTareas] ON 

INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (1, N'Ejecución', NULL, 1, N'Tarea principal', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (2, N'dsf', 1, 1, N'zdf', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (3, N'fg', 2, 1, N'vh', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (4, N'as', 2, 1, N'sa', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (5, N'qwe', 2, 1, N'qwe', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (6, N'qwe', 1, 1, N'qwe', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (7, N'wqe', 1, 1, N'qw', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (8, N'aw1111', 1, 1, N'we', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (9, N'awe', 1, 1, N'qwe', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (10, N'sa', 1, 1, N'as', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (11, N's', 1, 1, N'as', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (12, N'aw', 1, 1, N'awe', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (13, N'Ejecución', NULL, 2, N'Tarea principal', N'Activa')
INSERT [dbo].[TblTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (14, N'Ejecución', NULL, 3, N'Tarea principal', N'Activa')
SET IDENTITY_INSERT [dbo].[TblTareas] OFF
GO
SET IDENTITY_INSERT [dbo].[TblUsuario] ON 

INSERT [dbo].[TblUsuario] ([IdUsuario], [Nombres], [Apellidos], [Mail]) VALUES (1, N'Wilber Jose ', N'Matus', N'wmatus@unan.edu.ni')
INSERT [dbo].[TblUsuario] ([IdUsuario], [Nombres], [Apellidos], [Mail]) VALUES (2, N'Marlon', N'Aguilar', N'maguilar@unan.edu.ni')
INSERT [dbo].[TblUsuario] ([IdUsuario], [Nombres], [Apellidos], [Mail]) VALUES (3, N'Roberto A', N'Robleto Matus', N'rmatus@unan.edu.ni')
SET IDENTITY_INSERT [dbo].[TblUsuario] OFF
GO
ALTER TABLE [dbo].[CatDependencias]  WITH CHECK ADD  CONSTRAINT [FK_CatDependencias_CatDependencias] FOREIGN KEY([IdDependenciaP])
REFERENCES [dbo].[CatDependencias] ([IdDependencia])
GO
ALTER TABLE [dbo].[CatDependencias] CHECK CONSTRAINT [FK_CatDependencias_CatDependencias]
GO
ALTER TABLE [dbo].[TblActividades]  WITH CHECK ADD  CONSTRAINT [FK_TblActividades_CatDependencias] FOREIGN KEY([IdDependencia])
REFERENCES [dbo].[CatDependencias] ([IdDependencia])
GO
ALTER TABLE [dbo].[TblActividades] CHECK CONSTRAINT [FK_TblActividades_CatDependencias]
GO
ALTER TABLE [dbo].[TblAgenda]  WITH CHECK ADD  CONSTRAINT [FK_TblAgendas_CatDependencias] FOREIGN KEY([IdDependencia])
REFERENCES [dbo].[CatDependencias] ([IdDependencia])
GO
ALTER TABLE [dbo].[TblAgenda] CHECK CONSTRAINT [FK_TblAgendas_CatDependencias]
GO
ALTER TABLE [dbo].[TblAgenda]  WITH CHECK ADD  CONSTRAINT [FK_TblAgendas_TblUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[TblUsuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[TblAgenda] CHECK CONSTRAINT [FK_TblAgendas_TblUsuario]
GO
ALTER TABLE [dbo].[TblCalendario]  WITH CHECK ADD  CONSTRAINT [FK_TblCalendario_TblTareas] FOREIGN KEY([IdTarea])
REFERENCES [dbo].[TblTareas] ([IdTarea])
GO
ALTER TABLE [dbo].[TblCalendario] CHECK CONSTRAINT [FK_TblCalendario_TblTareas]
GO
ALTER TABLE [dbo].[TblDependencias_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_TblDependencias_Usuarios_CatCargosDependencias] FOREIGN KEY([IdCargo])
REFERENCES [dbo].[CatCargosDependencias] ([IdCargo])
GO
ALTER TABLE [dbo].[TblDependencias_Usuarios] CHECK CONSTRAINT [FK_TblDependencias_Usuarios_CatCargosDependencias]
GO
ALTER TABLE [dbo].[TblDependencias_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_TblDependencias_Usuarios_CatDependencias] FOREIGN KEY([IdDependencia])
REFERENCES [dbo].[CatDependencias] ([IdDependencia])
GO
ALTER TABLE [dbo].[TblDependencias_Usuarios] CHECK CONSTRAINT [FK_TblDependencias_Usuarios_CatDependencias]
GO
ALTER TABLE [dbo].[TblDependencias_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_TblDependencias_Usuarios_TblUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[TblUsuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[TblDependencias_Usuarios] CHECK CONSTRAINT [FK_TblDependencias_Usuarios_TblUsuario]
GO
ALTER TABLE [dbo].[TblEvidencias]  WITH CHECK ADD  CONSTRAINT [FK_TblEvidencias_TblTareas] FOREIGN KEY([IdTarea])
REFERENCES [dbo].[TblTareas] ([IdTarea])
GO
ALTER TABLE [dbo].[TblEvidencias] CHECK CONSTRAINT [FK_TblEvidencias_TblTareas]
GO
ALTER TABLE [dbo].[TblParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_TblParticipantes_CatTipoParticipaciones] FOREIGN KEY([IdTipoParticipacion])
REFERENCES [dbo].[CatTipoParticipaciones] ([IdTipoParticipacion])
GO
ALTER TABLE [dbo].[TblParticipantes] CHECK CONSTRAINT [FK_TblParticipantes_CatTipoParticipaciones]
GO
ALTER TABLE [dbo].[TblParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_TblParticipantes_TblTareas] FOREIGN KEY([IdTarea])
REFERENCES [dbo].[TblTareas] ([IdTarea])
GO
ALTER TABLE [dbo].[TblParticipantes] CHECK CONSTRAINT [FK_TblParticipantes_TblTareas]
GO
ALTER TABLE [dbo].[TblParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_TblParticipantes_TblUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[TblUsuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[TblParticipantes] CHECK CONSTRAINT [FK_TblParticipantes_TblUsuario]
GO
ALTER TABLE [dbo].[TblTareas]  WITH CHECK ADD  CONSTRAINT [FK_TblTareas_TblActividades] FOREIGN KEY([IdActividad])
REFERENCES [dbo].[TblActividades] ([IdActividad])
GO
ALTER TABLE [dbo].[TblTareas] CHECK CONSTRAINT [FK_TblTareas_TblActividades]
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
         Begin Table = "TblActividades"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "TblParticipantes"
            Begin Extent = 
               Top = 50
               Left = 1004
               Bottom = 210
               Right = 1195
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "TblTareas"
            Begin Extent = 
               Top = 71
               Left = 497
               Bottom = 282
               Right = 667
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
         Begin Table = "TblActividades"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 228
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "TblCalendario"
            Begin Extent = 
               Top = 15
               Left = 987
               Bottom = 291
               Right = 1157
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "TblTareas"
            Begin Extent = 
               Top = 6
               Left = 454
               Bottom = 296
               Right = 624
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewCalendarioByDependencia'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewCalendarioByDependencia'
GO
USE [master]
GO
ALTER DATABASE [SIAC_BD] SET  READ_WRITE 
GO
