using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DataBaseModel {
   public class CatalogoAlmacen : EntityClass {
       public int? Id_Almacen { get; set; }
       public string? Descripcion { get; set; }
       public string? Ubicacion { get; set; }
       public string? Estado { get; set; }
       [OneToMany(TableName = "TblLotes", KeyColumn = "Id_Almacen", ForeignKeyColumn = "Id_Almacen")]
       public List<TblLotes>? TblLotes { get; set; }
   }
   public class CatalogoCaracteristicas : EntityClass {
       public int? Id_Caracteristica { get; set; }
       public string? Descripcion { get; set; }
       public string? EStado { get; set; }
       [OneToMany(TableName = "TblCaracteristicasProductos", KeyColumn = "Id_Caracteristica", ForeignKeyColumn = "Id_Caracteristica")]
       public List<TblCaracteristicasProductos>? TblCaracteristicasProductos { get; set; }
   }
   public class CatalogoCategorias : EntityClass {
       public int? Id_Categoria { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
       [OneToMany(TableName = "CatalogoProducto", KeyColumn = "Id_Categoria", ForeignKeyColumn = "Id_Categoria")]
       public List<CatalogoProducto>? CatalogoProducto { get; set; }
   }
   public class CatalogoClientes : EntityClass {
       public int? Id_Cliente { get; set; }
       public string? Nombres { get; set; }
       public string? Apellidos { get; set; }
       public string? DNI { get; set; }
       [OneToMany(TableName = "TblFactura", KeyColumn = "Id_Cliente", ForeignKeyColumn = "Id_Cliente")]
       public List<TblFactura>? TblFactura { get; set; }
   }
   public class CatalogoOfertaEspecial : EntityClass {
       public int? Id_Oferta { get; set; }
       public int? Id_Lote { get; set; }
       public string? Estado { get; set; }
       public Double? Valor { get; set; }
       public DateTime? Vencimiento { get; set; }
       [OneToMany(TableName = "TblDetalleFactura", KeyColumn = "Id_Oferta", ForeignKeyColumn = "Id_Oferta")]
       public List<TblDetalleFactura>? TblDetalleFactura { get; set; }
   }
   public class CatalogoPresentacion : EntityClass {
       public int? Id_Presentacion { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
       public string? Abreviatura { get; set; }
       [OneToMany(TableName = "TblEquivalenciasPresentacion", KeyColumn = "Id_Presentacion", ForeignKeyColumn = "Id_Presentacion_Final")]
       public List<TblEquivalenciasPresentacion>? TblEquivalenciasPresentacionFinal { get; set; }
       [OneToMany(TableName = "TblEquivalenciasPresentacion", KeyColumn = "Id_Presentacion", ForeignKeyColumn = "Id_Presentacion_Inicial")]
       public List<TblEquivalenciasPresentacion>? TblEquivalenciasPresentacionInicial { get; set; }
       [OneToMany(TableName = "TblLotes", KeyColumn = "Id_Presentacion", ForeignKeyColumn = "Id_Presentacion")]
       public List<TblLotes>? TblLotes { get; set; }
   }
   public class CatalogoProducto : EntityClass {
       public int? Id_Producto { get; set; }
       public string? Descripcion { get; set; }
       public int? Id_Categoria { get; set; }
       [OneToOne(TableName = "CatalogoCategorias", KeyColumn = "Id_Categoria", ForeignKeyColumn = "Id_Categoria")]
       public CatalogoCategorias CatalogoCategorias { get; set; }
       [OneToMany(TableName = "TblCaracteristicasProductos", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public List<TblCaracteristicasProductos>? TblCaracteristicasProductos { get; set; }
       [OneToMany(TableName = "TblLotes", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public List<TblLotes>? TblLotes { get; set; }
   }
   public class CatalogoTipoDetalle : EntityClass {
       public int? Id_Tipo_Detalle { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
       [OneToMany(TableName = "TblDetalleLotes", KeyColumn = "Id_Tipo_Detalle", ForeignKeyColumn = "Id_Tipo_Detalle")]
       public List<TblDetalleLotes>? TblDetalleLotes { get; set; }
   }
   public class CatalogoTipoEgreso : EntityClass {
       public int? Id_Tipo_Egreso { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
       [OneToMany(TableName = "TblEgresosLotes", KeyColumn = "Id_Tipo_Egreso", ForeignKeyColumn = "Id_Tipo_Egreso")]
       public List<TblEgresosLotes>? TblEgresosLotes { get; set; }
   }
   public class TblCaracteristicasProductos : EntityClass {
       public int? Id_Producto { get; set; }
       public int? Id_Caracteristica { get; set; }
       public string? Descripcion { get; set; }
       [OneToOne(TableName = "CatalogoCaracteristicas", KeyColumn = "Id_Caracteristica", ForeignKeyColumn = "Id_Caracteristica")]
       public CatalogoCaracteristicas CatalogoCaracteristicas { get; set; }
       [OneToOne(TableName = "CatalogoProducto", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public CatalogoProducto CatalogoProducto { get; set; }
   }
   public class TblDetalleFactura : EntityClass {
       public int? Id_Detalle_Factura { get; set; }
       public int? Id_Factura { get; set; }
       public int? Id_Producto { get; set; }
       public Double? Precio_Venta { get; set; }
       public int? Cantidad { get; set; }
       public Double? Total { get; set; }
       public int? Id_Egreso { get; set; }
       public int? Id_Oferta { get; set; }
       [OneToOne(TableName = "CatalogoOfertaEspecial", KeyColumn = "Id_Oferta", ForeignKeyColumn = "Id_Oferta")]
       public CatalogoOfertaEspecial CatalogoOfertaEspecial { get; set; }
       [OneToOne(TableName = "TblEgresosLotes", KeyColumn = "Id_Egreso", ForeignKeyColumn = "Id_Egreso")]
       public TblEgresosLotes TblEgresosLotes { get; set; }
       [OneToOne(TableName = "TblFactura", KeyColumn = "Id_Factura", ForeignKeyColumn = "Id_Factura")]
       public TblFactura TblFactura { get; set; }
   }
   public class TblDetalleLotes : EntityClass {
       public int? Id_Detalle { get; set; }
       public string? Descripcion { get; set; }
       public int? Id_Tipo_Detalle { get; set; }
       public string? Estado { get; set; }
       public int? Id_Lote { get; set; }
       [OneToOne(TableName = "CatalogoTipoDetalle", KeyColumn = "Id_Tipo_Detalle", ForeignKeyColumn = "Id_Tipo_Detalle")]
       public CatalogoTipoDetalle CatalogoTipoDetalle { get; set; }
       [OneToOne(TableName = "TblLotes", KeyColumn = "Id_Lote", ForeignKeyColumn = "Id_Lote")]
       public TblLotes TblLotes { get; set; }
   }
   public class TblEgresosLotes : EntityClass {
       public int? Id_Egreso { get; set; }
       public string? Descripcion { get; set; }
       public int? Id_Tipo_Egreso { get; set; }
       public int? Id_Lote { get; set; }
       public int? Cantidad { get; set; }
       public int? Id_Usuario_Gestor { get; set; }
       [OneToOne(TableName = "CatalogoTipoEgreso", KeyColumn = "Id_Tipo_Egreso", ForeignKeyColumn = "Id_Tipo_Egreso")]
       public CatalogoTipoEgreso CatalogoTipoEgreso { get; set; }
       [OneToOne(TableName = "TblLotes", KeyColumn = "Id_Lote", ForeignKeyColumn = "Id_Lote")]
       public TblLotes TblLotes { get; set; }
       [OneToMany(TableName = "TblDetalleFactura", KeyColumn = "Id_Egreso", ForeignKeyColumn = "Id_Egreso")]
       public List<TblDetalleFactura>? TblDetalleFactura { get; set; }
   }
   public class TblEquivalenciasPresentacion : EntityClass {
       public int? Id_Presentacion_Inicial { get; set; }
       public int? Valor_Presentacion_Inicial { get; set; }
       public int? Id_Presentacion_Final { get; set; }
       public int? Valor_Presentacion_Final { get; set; }
       [OneToOne(TableName = "CatalogoPresentacion", KeyColumn = "Id_Presentacion_Inicial", ForeignKeyColumn = "Id_Presentacion")]
       public CatalogoPresentacion CatalogoPresentacionInicial { get; set; }
       [OneToOne(TableName = "CatalogoPresentacion", KeyColumn = "Id_Presentacion_Final", ForeignKeyColumn = "Id_Presentacion")]
       public CatalogoPresentacion CatalogoPresentacionFinal { get; set; }
   }
   public class TblFactura : EntityClass {
       public int? Id_Factura { get; set; }
       public string? Nombre_Cliente { get; set; }
       public int? Id_Cliente { get; set; }
       public DateTime? Fecha { get; set; }
       public Double? SubTotal { get; set; }
       public Double? IVA { get; set; }
       public Double? Total { get; set; }
       public string? No_Factura { get; set; }
       public string? Estado { get; set; }
       [OneToOne(TableName = "CatalogoClientes", KeyColumn = "Id_Cliente", ForeignKeyColumn = "Id_Cliente")]
       public CatalogoClientes CatalogoClientes { get; set; }
       [OneToMany(TableName = "TblDetalleFactura", KeyColumn = "Id_Factura", ForeignKeyColumn = "Id_Factura")]
       public List<TblDetalleFactura>? TblDetalleFactura { get; set; }
   }
   public class TblLotes : EntityClass {
       public int? Id_Lote { get; set; }
       public int? Cantidad { get; set; }
       public int? Id_Producto { get; set; }
       public int? Cantidad_Inicial { get; set; }
       public int? Cantidad_Existente { get; set; }
       public Double? Costo { get; set; }
       public string? Estado { get; set; }
       public int? Id_Presentacion { get; set; }
       public int? Id_Almacen { get; set; }
       [OneToOne(TableName = "CatalogoAlmacen", KeyColumn = "Id_Almacen", ForeignKeyColumn = "Id_Almacen")]
       public CatalogoAlmacen CatalogoAlmacen { get; set; }
       [OneToOne(TableName = "CatalogoPresentacion", KeyColumn = "Id_Presentacion", ForeignKeyColumn = "Id_Presentacion")]
       public CatalogoPresentacion CatalogoPresentacion { get; set; }
       [OneToOne(TableName = "CatalogoProducto", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public CatalogoProducto CatalogoProducto { get; set; }
       [OneToMany(TableName = "TblDetalleLotes", KeyColumn = "Id_Lote", ForeignKeyColumn = "Id_Lote")]
       public List<TblDetalleLotes>? TblDetalleLotes { get; set; }
       [OneToMany(TableName = "TblEgresosLotes", KeyColumn = "Id_Lote", ForeignKeyColumn = "Id_Lote")]
       public List<TblEgresosLotes>? TblEgresosLotes { get; set; }
   }
}
