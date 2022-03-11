USE [master]
GO
/****** Object:  Database [SIAC_BD]    Script Date: 11/3/2022 16:30:51 ******/
CREATE DATABASE [SIAC_BD]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SIAC_BD', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SIAC_BD.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SIAC_BD_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SIAC_BD_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
/****** Object:  Table [dbo].[TblActividades]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[TblCalendario]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[TblTareas]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  View [dbo].[ViewCalendarioByDependencia]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[TblParticipantes]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  View [dbo].[ViewActividadesParticipantes]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[CatCargosDependencias]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[CatDependencias]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[CatTipoParticipaciones]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[TblAgenda]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[TblDependencias_Usuarios]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[TblEvidencias]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[TblPermanencia]    Script Date: 11/3/2022 16:30:51 ******/
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
/****** Object:  Table [dbo].[TblUsuario]    Script Date: 11/3/2022 16:30:51 ******/
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
