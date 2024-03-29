USE SNIBD
GO
/****** Object:  Database [SIAC_BD]    Script Date: 10/5/2022 15:04:12 ******/

CREATE TABLE [dbo].[ProyectoTableActividades](
	[IdActividad] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [nvarchar](250) NULL,
	[Descripcion] [nvarchar](500) NULL,
	[IdUsuario] [int] NULL,
	[Estado] [nvarchar](50) NULL,
	[IdDependencia] [int] NULL,
	[Fecha_Inicial] [datetime] NULL,
	[Fecha_Final] [datetime] NULL,
 CONSTRAINT [PK_ProyectoTableActividades] PRIMARY KEY CLUSTERED 
(
	[IdActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoTableCalendario]    Script Date: 10/5/2022 15:04:12 ******/
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
/****** Object:  Table [dbo].[ProyectoTableTareas]    Script Date: 10/5/2022 15:04:12 ******/
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
/****** Object:  View [dbo].[ViewCalendarioByDependencia]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewCalendarioByDependencia]
AS
SELECT        dbo.ProyectoTableActividades.IdDependencia, dbo.ProyectoTableTareas.IdActividad, dbo.ProyectoTableTareas.IdTareaPadre, dbo.ProyectoTableCalendario.Fecha_Inicial, dbo.ProyectoTableCalendario.Fecha_Final, dbo.ProyectoTableCalendario.Estado, dbo.ProyectoTableCalendario.IdCalendario, 
                         dbo.ProyectoTableCalendario.IdTarea
FROM            dbo.ProyectoTableActividades INNER JOIN
                         dbo.ProyectoTableTareas ON dbo.ProyectoTableActividades.IdActividad = dbo.ProyectoTableTareas.IdActividad INNER JOIN
                         dbo.ProyectoTableCalendario ON dbo.ProyectoTableTareas.IdTarea = dbo.ProyectoTableCalendario.IdTarea
GO
/****** Object:  Table [dbo].[ProyectoTableParticipantes]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableParticipantes](
	[IdUsuario] [int] NOT NULL,
	[IdTarea] [int] NOT NULL,
	[IdTipoParticipacion] [int] NULL,
 CONSTRAINT [PK_ProyectoTableParticipantes] PRIMARY KEY CLUSTERED 
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
SELECT        dbo.ProyectoTableActividades.IdActividad, dbo.ProyectoTableActividades.Titulo, dbo.ProyectoTableActividades.Descripcion, dbo.ProyectoTableActividades.Estado, dbo.ProyectoTableParticipantes.IdUsuario
FROM            dbo.ProyectoTableActividades INNER JOIN
                         dbo.ProyectoTableTareas ON dbo.ProyectoTableActividades.IdActividad = dbo.ProyectoTableTareas.IdActividad INNER JOIN
                         dbo.ProyectoTableParticipantes ON dbo.ProyectoTableTareas.IdTarea = dbo.ProyectoTableParticipantes.IdTarea
GROUP BY dbo.ProyectoTableActividades.IdActividad, dbo.ProyectoTableActividades.Titulo, dbo.ProyectoTableActividades.Descripcion, dbo.ProyectoTableActividades.Estado, dbo.ProyectoTableParticipantes.IdUsuario
GO
/****** Object:  Table [dbo].[ProyectoCatCargosDependencias]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoCatCargosDependencias](
	[IdCargo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_ProyectoCatCargosDependencias] PRIMARY KEY CLUSTERED 
(
	[IdCargo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoCatDependencias]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoCatDependencias](
	[IdDependencia] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[IdDependenciaP] [int] NULL,
 CONSTRAINT [PK_ProyectoCatDependencias] PRIMARY KEY CLUSTERED 
(
	[IdDependencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoCatTipoParticipaciones]    Script Date: 10/5/2022 15:04:12 ******/
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
/****** Object:  Table [dbo].[ProyectoTableAgenda]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableAgenda](
	[IdAgenda] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NULL,
	[IdDependencia] [int] NULL,
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
/****** Object:  Table [dbo].[ProyectoTableDependencias_Usuarios]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableDependencias_Usuarios](
	[IdUsuario] [int] NOT NULL,
	[IdDependencia] [int] NOT NULL,
	[IdCargo] [int] NULL,
 CONSTRAINT [PK_ProyectoTableDependencias_Usuarios] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC,
	[IdDependencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoTableEvidencias]    Script Date: 10/5/2022 15:04:12 ******/
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
/****** Object:  Table [dbo].[ProyectoTablePermanencia]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTablePermanencia](
	[IdPermanencia] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_ProyectoTablePermanencia] PRIMARY KEY CLUSTERED 
(
	[IdPermanencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoTableUsuario]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoTableUsuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [nvarchar](50) NULL,
	[Apellidos] [nvarchar](50) NULL,
	[Mail] [nvarchar](50) NULL,
 CONSTRAINT [PK_ProyectoTableUsuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [sc_test].[ProyectoTableAgendaTest]    Script Date: 10/5/2022 15:04:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [sc_test].[ProyectoTableAgendaTest](
	[IdAgenda] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NULL,
	[IdDependencia] [int] NULL,
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
SET IDENTITY_INSERT [dbo].[ProyectoCatCargosDependencias] ON 

INSERT [dbo].[ProyectoCatCargosDependencias] ([IdCargo], [Descripcion]) VALUES (1, N'Encargado')
INSERT [dbo].[ProyectoCatCargosDependencias] ([IdCargo], [Descripcion]) VALUES (2, N'Coordinador')
INSERT [dbo].[ProyectoCatCargosDependencias] ([IdCargo], [Descripcion]) VALUES (3, N'Tecnico')
SET IDENTITY_INSERT [dbo].[ProyectoCatCargosDependencias] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoCatDependencias] ON 

INSERT [dbo].[ProyectoCatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (1, N'USAV', 3)
INSERT [dbo].[ProyectoCatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (2, N'CTS', NULL)
INSERT [dbo].[ProyectoCatDependencias] ([IdDependencia], [Descripcion], [IdDependenciaP]) VALUES (3, N'TIC', NULL)
SET IDENTITY_INSERT [dbo].[ProyectoCatDependencias] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoCatTipoParticipaciones] ON 

INSERT [dbo].[ProyectoCatTipoParticipaciones] ([IdTipoParticipacion], [Descripcion]) VALUES (1, N'Colaborador')
INSERT [dbo].[ProyectoCatTipoParticipaciones] ([IdTipoParticipacion], [Descripcion]) VALUES (2, N'Coordinador')
SET IDENTITY_INSERT [dbo].[ProyectoCatTipoParticipaciones] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoTableActividades] ON 

INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [IdUsuario], [Estado], [IdDependencia], [Fecha_Inicial], [Fecha_Final]) VALUES (1, N'act 1', N'test de des', 1, N'Activa', 1, NULL, NULL)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [IdUsuario], [Estado], [IdDependencia], [Fecha_Inicial], [Fecha_Final]) VALUES (2, N'efwer', N'werwe', 1, N'Activa', 1, NULL, NULL)
INSERT [dbo].[ProyectoTableActividades] ([IdActividad], [Titulo], [Descripcion], [IdUsuario], [Estado], [IdDependencia], [Fecha_Inicial], [Fecha_Final]) VALUES (3, N'qwe', N'qwe', 1, N'Activa', 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[ProyectoTableActividades] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoTableAgenda] ON 

INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (4, 1, 1, N'Lunes', N'08:00', N'17:00', CAST(N'2022-12-12T00:00:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (5, 1, 1, N'Martes', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (8, 1, 1, N'Miercoles', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (9, 1, 1, N'Jueves', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
INSERT [dbo].[ProyectoTableAgenda] ([IdAgenda], [IdUsuario], [IdDependencia], [Dia], [Hora_Inicial], [Hora_Final], [Fecha_Caducidad]) VALUES (10, 1, 1, N'Viernes', N'08:00', N'17:00', CAST(N'2022-12-30T00:00:00.000' AS DateTime))
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
SET IDENTITY_INSERT [dbo].[ProyectoTableCalendario] OFF
GO
INSERT [dbo].[ProyectoTableDependencias_Usuarios] ([IdUsuario], [IdDependencia], [IdCargo]) VALUES (1, 1, 1)
GO
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 2, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 3, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 4, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 5, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 10, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 12, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 13, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (1, 14, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (2, 6, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (2, 7, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (2, 8, 1)
INSERT [dbo].[ProyectoTableParticipantes] ([IdUsuario], [IdTarea], [IdTipoParticipacion]) VALUES (3, 9, 1)
GO
SET IDENTITY_INSERT [dbo].[ProyectoTableTareas] ON 

INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (1, N'Ejecución', NULL, 1, N'Tarea principal', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (2, N'dsf', 1, 1, N'zdf', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (3, N'fg', 2, 1, N'vh', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (4, N'as', 2, 1, N'sa', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (5, N'qwe', 2, 1, N'qwe', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (6, N'qwe', 1, 1, N'qwe', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (7, N'wqe', 1, 1, N'qw', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (8, N'aw1111', 1, 1, N'we', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (9, N'awe', 1, 1, N'qwe', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (10, N'sa', 1, 1, N'as', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (11, N's', 1, 1, N'as', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (12, N'aw', 1, 1, N'awe', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (13, N'Ejecución', NULL, 2, N'Tarea principal', N'Activa')
INSERT [dbo].[ProyectoTableTareas] ([IdTarea], [Titulo], [IdTareaPadre], [IdActividad], [Descripcion], [Estado]) VALUES (14, N'Ejecución', NULL, 3, N'Tarea principal', N'Activa')
SET IDENTITY_INSERT [dbo].[ProyectoTableTareas] OFF
GO
SET IDENTITY_INSERT [dbo].[ProyectoTableUsuario] ON 

INSERT [dbo].[ProyectoTableUsuario] ([IdUsuario], [Nombres], [Apellidos], [Mail]) VALUES (1, N'Wilber Jose ', N'Matus', N'wmatus@unan.edu.ni')
INSERT [dbo].[ProyectoTableUsuario] ([IdUsuario], [Nombres], [Apellidos], [Mail]) VALUES (2, N'Marlon', N'Aguilar', N'maguilar@unan.edu.ni')
INSERT [dbo].[ProyectoTableUsuario] ([IdUsuario], [Nombres], [Apellidos], [Mail]) VALUES (3, N'Roberto A', N'Robleto Matus', N'rmatus@unan.edu.ni')
SET IDENTITY_INSERT [dbo].[ProyectoTableUsuario] OFF
GO
ALTER TABLE [dbo].[ProyectoCatDependencias]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoCatDependencias_ProyectoCatDependencias] FOREIGN KEY([IdDependenciaP])
REFERENCES [dbo].[ProyectoCatDependencias] ([IdDependencia])
GO
ALTER TABLE [dbo].[ProyectoCatDependencias] CHECK CONSTRAINT [FK_ProyectoCatDependencias_ProyectoCatDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableActividades]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableActividades_ProyectoCatDependencias] FOREIGN KEY([IdDependencia])
REFERENCES [dbo].[ProyectoCatDependencias] ([IdDependencia])
GO
ALTER TABLE [dbo].[ProyectoTableActividades] CHECK CONSTRAINT [FK_ProyectoTableActividades_ProyectoCatDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableAgenda]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableAgendas_ProyectoCatDependencias] FOREIGN KEY([IdDependencia])
REFERENCES [dbo].[ProyectoCatDependencias] ([IdDependencia])
GO
ALTER TABLE [dbo].[ProyectoTableAgenda] CHECK CONSTRAINT [FK_ProyectoTableAgendas_ProyectoCatDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableAgenda]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableAgendas_ProyectoTableUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[ProyectoTableUsuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[ProyectoTableAgenda] CHECK CONSTRAINT [FK_ProyectoTableAgendas_ProyectoTableUsuario]
GO
ALTER TABLE [dbo].[ProyectoTableCalendario]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableCalendario_ProyectoTableTareas] FOREIGN KEY([IdTarea])
REFERENCES [dbo].[ProyectoTableTareas] ([IdTarea])
GO
ALTER TABLE [dbo].[ProyectoTableCalendario] CHECK CONSTRAINT [FK_ProyectoTableCalendario_ProyectoTableTareas]
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoCatCargosDependencias] FOREIGN KEY([IdCargo])
REFERENCES [dbo].[ProyectoCatCargosDependencias] ([IdCargo])
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios] CHECK CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoCatCargosDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoCatDependencias] FOREIGN KEY([IdDependencia])
REFERENCES [dbo].[ProyectoCatDependencias] ([IdDependencia])
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios] CHECK CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoCatDependencias]
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoTableUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[ProyectoTableUsuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[ProyectoTableDependencias_Usuarios] CHECK CONSTRAINT [FK_ProyectoTableDependencias_Usuarios_ProyectoTableUsuario]
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
ALTER TABLE [dbo].[ProyectoTableParticipantes]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableParticipantes_ProyectoTableUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[ProyectoTableUsuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[ProyectoTableParticipantes] CHECK CONSTRAINT [FK_ProyectoTableParticipantes_ProyectoTableUsuario]
GO
ALTER TABLE [dbo].[ProyectoTableTareas]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoTableTareas_ProyectoTableActividades] FOREIGN KEY([IdActividad])
REFERENCES [dbo].[ProyectoTableActividades] ([IdActividad])
GO
ALTER TABLE [dbo].[ProyectoTableTareas] CHECK CONSTRAINT [FK_ProyectoTableTareas_ProyectoTableActividades]
GO
