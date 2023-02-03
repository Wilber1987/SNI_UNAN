USE [master]
GO
/****** Object:  Database [SIGFACT]    Script Date: 3/2/2023 16:59:36 ******/
CREATE DATABASE [SIGFACT]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SIGFACT', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SIGFACT.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SIGFACT_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SIGFACT_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SIGFACT] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SIGFACT].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SIGFACT] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SIGFACT] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SIGFACT] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SIGFACT] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SIGFACT] SET ARITHABORT OFF 
GO
ALTER DATABASE [SIGFACT] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [SIGFACT] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SIGFACT] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SIGFACT] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SIGFACT] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SIGFACT] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SIGFACT] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SIGFACT] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SIGFACT] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SIGFACT] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SIGFACT] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SIGFACT] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SIGFACT] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SIGFACT] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SIGFACT] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SIGFACT] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SIGFACT] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SIGFACT] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SIGFACT] SET  MULTI_USER 
GO
ALTER DATABASE [SIGFACT] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SIGFACT] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SIGFACT] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SIGFACT] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SIGFACT] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SIGFACT] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SIGFACT] SET QUERY_STORE = OFF
GO
USE [SIGFACT]
GO
/****** Object:  Schema [security]    Script Date: 3/2/2023 16:59:37 ******/
CREATE SCHEMA [security]
GO
/****** Object:  Table [dbo].[CatalogoAlmacen]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoAlmacen](
	[Id_Almacen] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Ubicacion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatalogoAlmacen] PRIMARY KEY CLUSTERED 
(
	[Id_Almacen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatalogoCaracteristicas]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoCaracteristicas](
	[Id_Caracteristica] [int] IDENTITY(0,1) NOT NULL,
	[Descripcion] [varchar](100) NULL,
	[EStado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cat_Caracteristicas] PRIMARY KEY CLUSTERED 
(
	[Id_Caracteristica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatalogoCategorias]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoCategorias](
	[Id_Categoria] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatalogoCategorias] PRIMARY KEY CLUSTERED 
(
	[Id_Categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatalogoClientes]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoClientes](
	[Id_Cliente] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [nvarchar](50) NULL,
	[Apellidos] [nvarchar](50) NULL,
	[DNI] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatalogoClientes] PRIMARY KEY CLUSTERED 
(
	[Id_Cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatalogoOfertaEspecial]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoOfertaEspecial](
	[Id_Oferta] [int] NOT NULL,
	[Id_Lote] [int] NULL,
	[Estado] [nvarchar](50) NULL,
	[Valor] [float] NULL,
	[Vencimiento] [datetime] NULL,
 CONSTRAINT [PK_CatalogoOfertaEspecial] PRIMARY KEY CLUSTERED 
(
	[Id_Oferta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatalogoPresentacion]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoPresentacion](
	[Id_Presentacion] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
	[Abreviatura] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatalogoPresentacion] PRIMARY KEY CLUSTERED 
(
	[Id_Presentacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatalogoProducto]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoProducto](
	[Id_Producto] [int] IDENTITY(0,1) NOT NULL,
	[Descripcion] [varchar](100) NULL,
	[Id_Categoria] [int] NULL,
 CONSTRAINT [PK_CatProducto] PRIMARY KEY CLUSTERED 
(
	[Id_Producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatalogoTipoDetalleLote]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoTipoDetalleLote](
	[Id_Tipo_Detalle] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatalogoTipoDetalle] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Detalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatalogoTipoEgreso]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoTipoEgreso](
	[Id_Tipo_Egreso] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatalogoTipoEgreso] PRIMARY KEY CLUSTERED 
(
	[Id_Tipo_Egreso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetailFactura]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetailFactura](
	[Id_Detalle_Factura] [int] IDENTITY(1,1) NOT NULL,
	[Id_Factura] [int] NULL,
	[Id_Producto] [int] NULL,
	[Precio_Venta] [float] NULL,
	[Cantidad] [int] NULL,
	[Total] [float] NULL,
	[Id_Egreso] [int] NULL,
	[Id_Oferta] [int] NULL,
 CONSTRAINT [PK_TblDetalleFactura] PRIMARY KEY CLUSTERED 
(
	[Id_Detalle_Factura] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RelationalCaracteristicasProductos]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RelationalCaracteristicasProductos](
	[Id_Producto] [int] NOT NULL,
	[Id_Caracteristica] [int] NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_TblCaracteristicasProductos] PRIMARY KEY CLUSTERED 
(
	[Id_Producto] ASC,
	[Id_Caracteristica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RelationalDetalleLotes]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RelationalDetalleLotes](
	[Id_Detalle] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Id_Tipo_Detalle] [int] NULL,
	[Estado] [nvarchar](50) NULL,
	[Id_Lote] [int] NULL,
 CONSTRAINT [PK_TblDetalleLotes] PRIMARY KEY CLUSTERED 
(
	[Id_Detalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RelationalTbl_EquivalenciasPresentacion]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RelationalTbl_EquivalenciasPresentacion](
	[Id_Presentacion_Inicial] [int] NOT NULL,
	[Valor_Presentacion_Inicial] [int] NULL,
	[Id_Presentacion_Final] [int] NOT NULL,
	[Valor_Presentacion_Final] [int] NULL,
 CONSTRAINT [PK_TblEquivalenciasPresentacion] PRIMARY KEY CLUSTERED 
(
	[Id_Presentacion_Inicial] ASC,
	[Id_Presentacion_Final] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionEgresosLotes]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionEgresosLotes](
	[Id_Egreso] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Id_Tipo_Egreso] [int] NULL,
	[Id_Lote] [int] NULL,
	[Cantidad] [int] NULL,
	[Id_Usuario_Gestor] [int] NULL,
 CONSTRAINT [PK_TblEgresosLotes] PRIMARY KEY CLUSTERED 
(
	[Id_Egreso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionFactura]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionFactura](
	[Id_Factura] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_Cliente] [nvarchar](50) NULL,
	[Id_Cliente] [int] NULL,
	[Fecha] [datetime] NULL,
	[SubTotal] [float] NULL,
	[IVA] [float] NULL,
	[Total] [float] NULL,
	[No_Factura] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_TblFactura] PRIMARY KEY CLUSTERED 
(
	[Id_Factura] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionLotes]    Script Date: 3/2/2023 16:59:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionLotes](
	[Id_Lote] [int] IDENTITY(1,1) NOT NULL,
	[Cantidad] [int] NULL,
	[Id_Producto] [int] NULL,
	[Cantidad_Inicial] [int] NULL,
	[Cantidad_Existente] [int] NULL,
	[Costo] [float] NULL,
	[Estado] [nvarchar](50) NULL,
	[Id_Presentacion] [int] NULL,
	[Id_Almacen] [int] NULL,
 CONSTRAINT [PK_TblLotes] PRIMARY KEY CLUSTERED 
(
	[Id_Lote] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[Security_Permissions]    Script Date: 3/2/2023 16:59:37 ******/
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
/****** Object:  Table [security].[Security_Permissions_Roles]    Script Date: 3/2/2023 16:59:37 ******/
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
/****** Object:  Table [security].[Security_Roles]    Script Date: 3/2/2023 16:59:37 ******/
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
/****** Object:  Table [security].[Security_Users]    Script Date: 3/2/2023 16:59:37 ******/
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
/****** Object:  Table [security].[Security_Users_Roles]    Script Date: 3/2/2023 16:59:37 ******/
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
SET IDENTITY_INSERT [dbo].[CatalogoAlmacen] ON 

INSERT [dbo].[CatalogoAlmacen] ([Id_Almacen], [Descripcion], [Ubicacion], [Estado]) VALUES (1, N'rt', N'rt', N'ert')
INSERT [dbo].[CatalogoAlmacen] ([Id_Almacen], [Descripcion], [Ubicacion], [Estado]) VALUES (2, N'asd', N'asd', N'asd')
INSERT [dbo].[CatalogoAlmacen] ([Id_Almacen], [Descripcion], [Ubicacion], [Estado]) VALUES (3, N'asd', N'asd', N'asd')
SET IDENTITY_INSERT [dbo].[CatalogoAlmacen] OFF
GO
SET IDENTITY_INSERT [dbo].[CatalogoCaracteristicas] ON 

INSERT [dbo].[CatalogoCaracteristicas] ([Id_Caracteristica], [Descripcion], [EStado]) VALUES (0, N'sweft', N'wer')
SET IDENTITY_INSERT [dbo].[CatalogoCaracteristicas] OFF
GO
SET IDENTITY_INSERT [dbo].[CatalogoCategorias] ON 

INSERT [dbo].[CatalogoCategorias] ([Id_Categoria], [Descripcion], [Estado]) VALUES (1, N'dty', N'ert')
INSERT [dbo].[CatalogoCategorias] ([Id_Categoria], [Descripcion], [Estado]) VALUES (2, N'fgh', N'fgh')
SET IDENTITY_INSERT [dbo].[CatalogoCategorias] OFF
GO
SET IDENTITY_INSERT [dbo].[CatalogoClientes] ON 

INSERT [dbo].[CatalogoClientes] ([Id_Cliente], [Nombres], [Apellidos], [DNI]) VALUES (1, N'ert', N'ert', N'ert')
SET IDENTITY_INSERT [dbo].[CatalogoClientes] OFF
GO
SET IDENTITY_INSERT [dbo].[CatalogoPresentacion] ON 

INSERT [dbo].[CatalogoPresentacion] ([Id_Presentacion], [Descripcion], [Estado], [Abreviatura]) VALUES (1, N'rt', N'sdf', N'sdf')
SET IDENTITY_INSERT [dbo].[CatalogoPresentacion] OFF
GO
SET IDENTITY_INSERT [dbo].[CatalogoProducto] ON 

INSERT [dbo].[CatalogoProducto] ([Id_Producto], [Descripcion], [Id_Categoria]) VALUES (31, N'ASD', 1)
INSERT [dbo].[CatalogoProducto] ([Id_Producto], [Descripcion], [Id_Categoria]) VALUES (32, N'ASD', 1)
INSERT [dbo].[CatalogoProducto] ([Id_Producto], [Descripcion], [Id_Categoria]) VALUES (33, N'wer', 2)
SET IDENTITY_INSERT [dbo].[CatalogoProducto] OFF
GO
SET IDENTITY_INSERT [dbo].[CatalogoTipoDetalleLote] ON 

INSERT [dbo].[CatalogoTipoDetalleLote] ([Id_Tipo_Detalle], [Descripcion], [Estado]) VALUES (1, N'sdf', N'sdf')
SET IDENTITY_INSERT [dbo].[CatalogoTipoDetalleLote] OFF
GO
SET IDENTITY_INSERT [dbo].[CatalogoTipoEgreso] ON 

INSERT [dbo].[CatalogoTipoEgreso] ([Id_Tipo_Egreso], [Descripcion], [Estado]) VALUES (1, N'sdf', N'sdf')
SET IDENTITY_INSERT [dbo].[CatalogoTipoEgreso] OFF
GO
SET IDENTITY_INSERT [security].[Security_Users] ON 

INSERT [security].[Security_Users] ([Id_User], [Nombres], [Estado], [Descripcion], [Password], [Mail], [Token], [Token_Date], [Token_Expiration_Date]) VALUES (1, N'Wilber', N'ACT', N'Test', N'zaxscd', N'sa', N'', CAST(N'1900-01-01T00:00:00.000' AS DateTime), CAST(N'1900-01-01T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [security].[Security_Users] OFF
GO
ALTER TABLE [dbo].[CatalogoProducto]  WITH CHECK ADD  CONSTRAINT [FK_CatalogoProducto_CatalogoCategorias] FOREIGN KEY([Id_Categoria])
REFERENCES [dbo].[CatalogoCategorias] ([Id_Categoria])
GO
ALTER TABLE [dbo].[CatalogoProducto] CHECK CONSTRAINT [FK_CatalogoProducto_CatalogoCategorias]
GO
ALTER TABLE [dbo].[DetailFactura]  WITH CHECK ADD  CONSTRAINT [FK_TblDetalleFactura_CatalogoOfertaEspecial] FOREIGN KEY([Id_Oferta])
REFERENCES [dbo].[CatalogoOfertaEspecial] ([Id_Oferta])
GO
ALTER TABLE [dbo].[DetailFactura] CHECK CONSTRAINT [FK_TblDetalleFactura_CatalogoOfertaEspecial]
GO
ALTER TABLE [dbo].[DetailFactura]  WITH CHECK ADD  CONSTRAINT [FK_TblDetalleFactura_TblEgresosLotes] FOREIGN KEY([Id_Egreso])
REFERENCES [dbo].[TransactionEgresosLotes] ([Id_Egreso])
GO
ALTER TABLE [dbo].[DetailFactura] CHECK CONSTRAINT [FK_TblDetalleFactura_TblEgresosLotes]
GO
ALTER TABLE [dbo].[DetailFactura]  WITH CHECK ADD  CONSTRAINT [FK_TblDetalleFactura_TblFactura] FOREIGN KEY([Id_Factura])
REFERENCES [dbo].[TransactionFactura] ([Id_Factura])
GO
ALTER TABLE [dbo].[DetailFactura] CHECK CONSTRAINT [FK_TblDetalleFactura_TblFactura]
GO
ALTER TABLE [dbo].[DetailFactura]  WITH CHECK ADD  CONSTRAINT [TblDetalleFactura_FK] FOREIGN KEY([Id_Producto])
REFERENCES [dbo].[CatalogoProducto] ([Id_Producto])
GO
ALTER TABLE [dbo].[DetailFactura] CHECK CONSTRAINT [TblDetalleFactura_FK]
GO
ALTER TABLE [dbo].[RelationalCaracteristicasProductos]  WITH CHECK ADD  CONSTRAINT [FK_TblCaracteristicasProductos_CatalogoCaracteristicas] FOREIGN KEY([Id_Caracteristica])
REFERENCES [dbo].[CatalogoCaracteristicas] ([Id_Caracteristica])
GO
ALTER TABLE [dbo].[RelationalCaracteristicasProductos] CHECK CONSTRAINT [FK_TblCaracteristicasProductos_CatalogoCaracteristicas]
GO
ALTER TABLE [dbo].[RelationalCaracteristicasProductos]  WITH CHECK ADD  CONSTRAINT [FK_TblCaracteristicasProductos_CatalogoProducto] FOREIGN KEY([Id_Producto])
REFERENCES [dbo].[CatalogoProducto] ([Id_Producto])
GO
ALTER TABLE [dbo].[RelationalCaracteristicasProductos] CHECK CONSTRAINT [FK_TblCaracteristicasProductos_CatalogoProducto]
GO
ALTER TABLE [dbo].[RelationalDetalleLotes]  WITH CHECK ADD  CONSTRAINT [FK_TblDetalleLotes_CatalogoTipoDetalle] FOREIGN KEY([Id_Tipo_Detalle])
REFERENCES [dbo].[CatalogoTipoDetalleLote] ([Id_Tipo_Detalle])
GO
ALTER TABLE [dbo].[RelationalDetalleLotes] CHECK CONSTRAINT [FK_TblDetalleLotes_CatalogoTipoDetalle]
GO
ALTER TABLE [dbo].[RelationalDetalleLotes]  WITH CHECK ADD  CONSTRAINT [FK_TblDetalleLotes_TblLotes] FOREIGN KEY([Id_Lote])
REFERENCES [dbo].[TransactionLotes] ([Id_Lote])
GO
ALTER TABLE [dbo].[RelationalDetalleLotes] CHECK CONSTRAINT [FK_TblDetalleLotes_TblLotes]
GO
ALTER TABLE [dbo].[RelationalTbl_EquivalenciasPresentacion]  WITH CHECK ADD  CONSTRAINT [FK_TblEquivalenciasPresentacion_CatalogoPresentacion] FOREIGN KEY([Id_Presentacion_Inicial])
REFERENCES [dbo].[CatalogoPresentacion] ([Id_Presentacion])
GO
ALTER TABLE [dbo].[RelationalTbl_EquivalenciasPresentacion] CHECK CONSTRAINT [FK_TblEquivalenciasPresentacion_CatalogoPresentacion]
GO
ALTER TABLE [dbo].[RelationalTbl_EquivalenciasPresentacion]  WITH CHECK ADD  CONSTRAINT [FK_TblEquivalenciasPresentacion_CatalogoPresentacion1] FOREIGN KEY([Id_Presentacion_Final])
REFERENCES [dbo].[CatalogoPresentacion] ([Id_Presentacion])
GO
ALTER TABLE [dbo].[RelationalTbl_EquivalenciasPresentacion] CHECK CONSTRAINT [FK_TblEquivalenciasPresentacion_CatalogoPresentacion1]
GO
ALTER TABLE [dbo].[TransactionEgresosLotes]  WITH CHECK ADD  CONSTRAINT [FK_TblEgresosLotes_CatalogoTipoEgreso] FOREIGN KEY([Id_Tipo_Egreso])
REFERENCES [dbo].[CatalogoTipoEgreso] ([Id_Tipo_Egreso])
GO
ALTER TABLE [dbo].[TransactionEgresosLotes] CHECK CONSTRAINT [FK_TblEgresosLotes_CatalogoTipoEgreso]
GO
ALTER TABLE [dbo].[TransactionEgresosLotes]  WITH CHECK ADD  CONSTRAINT [FK_TblEgresosLotes_TblLotes] FOREIGN KEY([Id_Lote])
REFERENCES [dbo].[TransactionLotes] ([Id_Lote])
GO
ALTER TABLE [dbo].[TransactionEgresosLotes] CHECK CONSTRAINT [FK_TblEgresosLotes_TblLotes]
GO
ALTER TABLE [dbo].[TransactionFactura]  WITH CHECK ADD  CONSTRAINT [FK_TblFactura_CatalogoClientes] FOREIGN KEY([Id_Cliente])
REFERENCES [dbo].[CatalogoClientes] ([Id_Cliente])
GO
ALTER TABLE [dbo].[TransactionFactura] CHECK CONSTRAINT [FK_TblFactura_CatalogoClientes]
GO
ALTER TABLE [dbo].[TransactionLotes]  WITH CHECK ADD  CONSTRAINT [FK_TblLotes_CatalogoAlmacen] FOREIGN KEY([Id_Almacen])
REFERENCES [dbo].[CatalogoAlmacen] ([Id_Almacen])
GO
ALTER TABLE [dbo].[TransactionLotes] CHECK CONSTRAINT [FK_TblLotes_CatalogoAlmacen]
GO
ALTER TABLE [dbo].[TransactionLotes]  WITH CHECK ADD  CONSTRAINT [FK_TblLotes_CatalogoPresentacion] FOREIGN KEY([Id_Presentacion])
REFERENCES [dbo].[CatalogoPresentacion] ([Id_Presentacion])
GO
ALTER TABLE [dbo].[TransactionLotes] CHECK CONSTRAINT [FK_TblLotes_CatalogoPresentacion]
GO
ALTER TABLE [dbo].[TransactionLotes]  WITH CHECK ADD  CONSTRAINT [FK_TblLotes_CatalogoProducto] FOREIGN KEY([Id_Producto])
REFERENCES [dbo].[CatalogoProducto] ([Id_Producto])
GO
ALTER TABLE [dbo].[TransactionLotes] CHECK CONSTRAINT [FK_TblLotes_CatalogoProducto]
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catalogo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CatalogoAlmacen'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catalogo Caracteristicas' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CatalogoCaracteristicas'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catalogo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CatalogoCategorias'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catalogo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CatalogoClientes'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catalogo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CatalogoOfertaEspecial'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catalogo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CatalogoPresentacion'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catalogo de productos' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CatalogoProducto'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catalogo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CatalogoTipoDetalleLote'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catalogo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CatalogoTipoEgreso'
GO
USE [master]
GO
ALTER DATABASE [SIGFACT] SET  READ_WRITE 
GO
