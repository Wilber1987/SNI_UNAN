USE [master]
GO
/****** Object:  Database [SIAC_BD]    Script Date: 4/3/2022 16:12:13 ******/
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
/****** Object:  Table [dbo].[CatCargosDependencias]    Script Date: 4/3/2022 16:12:14 ******/
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
/****** Object:  Table [dbo].[CatDependencias]    Script Date: 4/3/2022 16:12:14 ******/
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
/****** Object:  Table [dbo].[CatTipoParticipaciones]    Script Date: 4/3/2022 16:12:14 ******/
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
/****** Object:  Table [dbo].[TblActividades]    Script Date: 4/3/2022 16:12:14 ******/
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
	[Fecha_Inicial] [datetime] NULL,
	[Fecha_Final] [datetime] NULL,
	[IdDependencia] [int] NULL,
 CONSTRAINT [PK_TblActividades] PRIMARY KEY CLUSTERED 
(
	[IdActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblAgenda]    Script Date: 4/3/2022 16:12:14 ******/
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
/****** Object:  Table [dbo].[TblDependencias_Usuarios]    Script Date: 4/3/2022 16:12:14 ******/
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
/****** Object:  Table [dbo].[TblEvidencias]    Script Date: 4/3/2022 16:12:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblEvidencias](
	[IdEvidencia] [int] IDENTITY(1,1) NOT NULL,
	[IdTipo] [int] NULL,
	[Data] [nvarchar](max) NULL,
	[IdActividad] [int] NULL,
 CONSTRAINT [PK_TblEvidencias] PRIMARY KEY CLUSTERED 
(
	[IdEvidencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblParticipantes]    Script Date: 4/3/2022 16:12:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblParticipantes](
	[IdUsuario] [int] NULL,
	[IdActividad] [int] NULL,
	[IdTipoParticipacion] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblPermanencia]    Script Date: 4/3/2022 16:12:14 ******/
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
/****** Object:  Table [dbo].[TblUsuario]    Script Date: 4/3/2022 16:12:14 ******/
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
SET IDENTITY_INSERT [dbo].[CatDependencias] ON 

INSERT [dbo].[CatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (1, N'Permanencia', NULL)
INSERT [dbo].[CatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (2, N'USAV', 6)
INSERT [dbo].[CatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (3, N'LAB1', 6)
INSERT [dbo].[CatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (4, N'LAB2', 6)
INSERT [dbo].[CatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (5, N'LAB3', 6)
INSERT [dbo].[CatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (6, N'TIC', NULL)
SET IDENTITY_INSERT [dbo].[CatDependencias] OFF
GO
SET IDENTITY_INSERT [dbo].[TblAgenda] ON 

INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (1, 1, 2, N'Lunes', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (2, 1, 2, N'Martes', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (3, 1, 2, N'Miercoles', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (4, 1, 2, N'Jueves', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (5, 1, 2, N'Viernes', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (6, 1, 1, N'Lunes', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (7, 1, 1, N'Martes', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (8, 1, 1, N'Miercoles', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (9, 1, 1, N'Jueves', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[TblAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (10, 1, 1, N'Viernes', N'8:00', N'12:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[TblAgenda] OFF
GO
SET IDENTITY_INSERT [dbo].[TblUsuario] ON 

INSERT [dbo].[TblUsuario] ([IdUsuario], [Nombres], [Apellidos], [Mail]) VALUES (1, N'Wilber Jose', N'Matus G', N'wmatus@unan.edu.ni')
INSERT [dbo].[TblUsuario] ([IdUsuario], [Nombres], [Apellidos], [Mail]) VALUES (2, N'Marlon A', N'Aguilar', N'maguilar@unan.edu.ni')
INSERT [dbo].[TblUsuario] ([IdUsuario], [Nombres], [Apellidos], [Mail]) VALUES (3, N'Ixchel', N'Lopez', N'ilopez@unan.edu.ni')
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
ALTER TABLE [dbo].[TblEvidencias]  WITH CHECK ADD  CONSTRAINT [FK_TblEvidencias_TblActividades] FOREIGN KEY([IdActividad])
REFERENCES [dbo].[TblActividades] ([IdActividad])
GO
ALTER TABLE [dbo].[TblEvidencias] CHECK CONSTRAINT [FK_TblEvidencias_TblActividades]
GO
ALTER TABLE [dbo].[TblParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_TblParticipantes_CatTipoParticipaciones] FOREIGN KEY([IdTipoParticipacion])
REFERENCES [dbo].[CatTipoParticipaciones] ([IdTipoParticipacion])
GO
ALTER TABLE [dbo].[TblParticipantes] CHECK CONSTRAINT [FK_TblParticipantes_CatTipoParticipaciones]
GO
ALTER TABLE [dbo].[TblParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_TblParticipantes_TblActividades] FOREIGN KEY([IdActividad])
REFERENCES [dbo].[TblActividades] ([IdActividad])
GO
ALTER TABLE [dbo].[TblParticipantes] CHECK CONSTRAINT [FK_TblParticipantes_TblActividades]
GO
ALTER TABLE [dbo].[TblParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_TblParticipantes_TblUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[TblUsuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[TblParticipantes] CHECK CONSTRAINT [FK_TblParticipantes_TblUsuario]
GO
USE [master]
GO
ALTER DATABASE [SIAC_BD] SET  READ_WRITE 
GO
