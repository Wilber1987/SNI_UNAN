using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DataBaseModel {
   public class TransactionLotes : EntityClass {
       [PrimaryKey]
       public int? Id_Lote { get; set; }
       public int? Cantidad { get; set; }
       public int? Id_Producto { get; set; }
       public int? Cantidad_Inicial { get; set; }
       public int? Cantidad_Existente { get; set; }
       public Double? Costo { get; set; }
       public string? Estado { get; set; }
       public int? Id_Presentacion { get; set; }
       public int? Id_Almacen { get; set; }
       [ManyToOne(TableName = "CatalogoPresentacion", KeyColumn = "Id_Presentacion", ForeignKeyColumn = "Id_Presentacion")]
       public CatalogoPresentacion? CatalogoPresentacion { get; set; }
       [ManyToOne(TableName = "CatalogoAlmacen", KeyColumn = "Id_Almacen", ForeignKeyColumn = "Id_Almacen")]
       public CatalogoAlmacen? CatalogoAlmacen { get; set; }
       [ManyToOne(TableName = "CatalogoProducto", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public CatalogoProducto? CatalogoProducto { get; set; }
       [OneToMany(TableName = "RelationalDetalleLotes", KeyColumn = "Id_Lote", ForeignKeyColumn = "Id_Lote")]
       public List<RelationalDetalleLotes>? RelationalDetalleLotes { get; set; }
       [OneToMany(TableName = "TransactionEgresosLotes", KeyColumn = "Id_Lote", ForeignKeyColumn = "Id_Lote")]
       public List<TransactionEgresosLotes>? TransactionEgresosLotes { get; set; }
   }
   public class CatalogoCategorias : EntityClass {
       [PrimaryKey]
       public int? Id_Categoria { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
       [OneToMany(TableName = "CatalogoProducto", KeyColumn = "Id_Categoria", ForeignKeyColumn = "Id_Categoria")]
       public List<CatalogoProducto>? CatalogoProducto { get; set; }
   }
   public class CatalogoPresentacion : EntityClass {
       [PrimaryKey]
       public int? Id_Presentacion { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
       public string? Abreviatura { get; set; }
       [OneToMany(TableName = "RelationalTbl_EquivalenciasPresentacion", KeyColumn = "Id_Presentacion", ForeignKeyColumn = "Id_Presentacion_Final")]
       public List<RelationalTbl_EquivalenciasPresentacion>? RelationalTbl_EquivalenciasPresentacion { get; set; }
       [OneToMany(TableName = "RelationalTbl_EquivalenciasPresentacion", KeyColumn = "Id_Presentacion", ForeignKeyColumn = "Id_Presentacion_Inicial")]
       public List<RelationalTbl_EquivalenciasPresentacion>? RelationalTbl_EquivalenciasPresentacion1 { get; set; }
       [OneToMany(TableName = "TransactionLotes", KeyColumn = "Id_Presentacion", ForeignKeyColumn = "Id_Presentacion")]
       public List<TransactionLotes>? TransactionLotes { get; set; }
   }
   public class CatalogoTipoDetalleLote : EntityClass {
       [PrimaryKey]
       public int? Id_Tipo_Detalle { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
       [OneToMany(TableName = "RelationalDetalleLotes", KeyColumn = "Id_Tipo_Detalle", ForeignKeyColumn = "Id_Tipo_Detalle")]
       public List<RelationalDetalleLotes>? RelationalDetalleLotes { get; set; }
   }
   public class RelationalDetalleLotes : EntityClass {
       [PrimaryKey]
       public int? Id_Detalle { get; set; }
       public string? Descripcion { get; set; }
       public int? Id_Tipo_Detalle { get; set; }
       public string? Estado { get; set; }
       public int? Id_Lote { get; set; }
       [ManyToOne(TableName = "TransactionLotes", KeyColumn = "Id_Lote", ForeignKeyColumn = "Id_Lote")]
       public TransactionLotes? TransactionLotes { get; set; }
       [ManyToOne(TableName = "CatalogoTipoDetalleLote", KeyColumn = "Id_Tipo_Detalle", ForeignKeyColumn = "Id_Tipo_Detalle")]
       public CatalogoTipoDetalleLote? CatalogoTipoDetalleLote { get; set; }
   }
   public class RelationalTbl_EquivalenciasPresentacion : EntityClass {
       [PrimaryKey (Identity = false)]
       public int? Id_Presentacion_Inicial { get; set; }
       public int? Valor_Presentacion_Inicial { get; set; }
       [PrimaryKey (Identity = false)]
       public int? Id_Presentacion_Final { get; set; }
       public int? Valor_Presentacion_Final { get; set; }
       [ManyToOne(TableName = "CatalogoPresentacion", KeyColumn = "Id_Presentacion_Inicial", ForeignKeyColumn = "Id_Presentacion")]
       public CatalogoPresentacion? CatalogoPresentacion { get; set; }
       [ManyToOne(TableName = "CatalogoPresentacion", KeyColumn = "Id_Presentacion_Final", ForeignKeyColumn = "Id_Presentacion")]
       public CatalogoPresentacion? CatalogoPresentacion1 { get; set; }
   }
   public class TransactionEgresosLotes : EntityClass {
       [PrimaryKey]
       public int? Id_Egreso { get; set; }
       public string? Descripcion { get; set; }
       public int? Id_Tipo_Egreso { get; set; }
       public int? Id_Lote { get; set; }
       public int? Cantidad { get; set; }
       public int? Id_Usuario_Gestor { get; set; }
       [ManyToOne(TableName = "TransactionLotes", KeyColumn = "Id_Lote", ForeignKeyColumn = "Id_Lote")]
       public TransactionLotes? TransactionLotes { get; set; }
       [ManyToOne(TableName = "CatalogoTipoEgreso", KeyColumn = "Id_Tipo_Egreso", ForeignKeyColumn = "Id_Tipo_Egreso")]
       public CatalogoTipoEgreso? CatalogoTipoEgreso { get; set; }
       [OneToMany(TableName = "DetailFactura", KeyColumn = "Id_Egreso", ForeignKeyColumn = "Id_Egreso")]
       public List<DetailFactura>? DetailFactura { get; set; }
   }
   public class CatalogoTipoEgreso : EntityClass {
       [PrimaryKey]
       public int? Id_Tipo_Egreso { get; set; }
       public string? Descripcion { get; set; }
       public string? Estado { get; set; }
       [OneToMany(TableName = "TransactionEgresosLotes", KeyColumn = "Id_Tipo_Egreso", ForeignKeyColumn = "Id_Tipo_Egreso")]
       public List<TransactionEgresosLotes>? TransactionEgresosLotes { get; set; }
   }
   public class CatalogoAlmacen : EntityClass {
       [PrimaryKey]
       public int? Id_Almacen { get; set; }
       public string? Descripcion { get; set; }
       public string? Ubicacion { get; set; }
       public string? Estado { get; set; }
       [OneToMany(TableName = "TransactionLotes", KeyColumn = "Id_Almacen", ForeignKeyColumn = "Id_Almacen")]
       public List<TransactionLotes>? TransactionLotes { get; set; }
   }
   public class TransactionFactura : EntityClass {
       [PrimaryKey]
       public int? Id_Factura { get; set; }
       public string? Nombre_Cliente { get; set; }
       public int? Id_Cliente { get; set; }
       public DateTime? Fecha { get; set; }
       public Double? SubTotal { get; set; }
       public Double? IVA { get; set; }
       public Double? Total { get; set; }
       public string? No_Factura { get; set; }
       public string? Estado { get; set; }
       [ManyToOne(TableName = "CatalogoClientes", KeyColumn = "Id_Cliente", ForeignKeyColumn = "Id_Cliente")]
       public CatalogoClientes? CatalogoClientes { get; set; }
       [OneToMany(TableName = "DetailFactura", KeyColumn = "Id_Factura", ForeignKeyColumn = "Id_Factura")]
       public List<DetailFactura>? DetailFactura { get; set; }
   }
   public class DetailFactura : EntityClass {
       [PrimaryKey]
       public int? Id_Detalle_Factura { get; set; }
       public int? Id_Factura { get; set; }
       public int? Id_Producto { get; set; }
       public Double? Precio_Venta { get; set; }
       public int? Cantidad { get; set; }
       public Double? Total { get; set; }
       public int? Id_Egreso { get; set; }
       public int? Id_Oferta { get; set; }
       [ManyToOne(TableName = "TransactionEgresosLotes", KeyColumn = "Id_Egreso", ForeignKeyColumn = "Id_Egreso")]
       public TransactionEgresosLotes? TransactionEgresosLotes { get; set; }
       [ManyToOne(TableName = "TransactionFactura", KeyColumn = "Id_Factura", ForeignKeyColumn = "Id_Factura")]
       public TransactionFactura? TransactionFactura { get; set; }
       [ManyToOne(TableName = "CatalogoOfertaEspecial", KeyColumn = "Id_Oferta", ForeignKeyColumn = "Id_Oferta")]
       public CatalogoOfertaEspecial? CatalogoOfertaEspecial { get; set; }
       [ManyToOne(TableName = "CatalogoProducto", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public CatalogoProducto? CatalogoProducto { get; set; }
   }
   public class CatalogoOfertaEspecial : EntityClass {
       [PrimaryKey]
       public int? Id_Oferta { get; set; }
       public int? Id_Lote { get; set; }
       public string? Estado { get; set; }
       public Double? Valor { get; set; }
       public DateTime? Vencimiento { get; set; }
       [OneToMany(TableName = "DetailFactura", KeyColumn = "Id_Oferta", ForeignKeyColumn = "Id_Oferta")]
       public List<DetailFactura>? DetailFactura { get; set; }
   }
   public class CatalogoClientes : EntityClass {
       [PrimaryKey]
       public int? Id_Cliente { get; set; }
       public string? Nombres { get; set; }
       public string? Apellidos { get; set; }
       public string? DNI { get; set; }
       [OneToMany(TableName = "TransactionFactura", KeyColumn = "Id_Cliente", ForeignKeyColumn = "Id_Cliente")]
       public List<TransactionFactura>? TransactionFactura { get; set; }
   }
   public class RelationalCaracteristicasProductos : EntityClass {
       [PrimaryKey]
       public int? Id_Producto { get; set; }
       [PrimaryKey]
       public int? Id_Caracteristica { get; set; }
       public string? Descripcion { get; set; }
       [ManyToOne(TableName = "CatalogoProducto", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public CatalogoProducto? CatalogoProducto { get; set; }
       [ManyToOne(TableName = "CatalogoCaracteristicas", KeyColumn = "Id_Caracteristica", ForeignKeyColumn = "Id_Caracteristica")]
       public CatalogoCaracteristicas? CatalogoCaracteristicas { get; set; }
   }
   public class CatalogoProducto : EntityClass {
       [PrimaryKey(Identity = true)]
       public int? Id_Producto { get; set; }
       public string? Descripcion { get; set; }
       public int? Id_Categoria { get; set; }
       [ManyToOne(TableName = "CatalogoCategorias", KeyColumn = "Id_Categoria", ForeignKeyColumn = "Id_Categoria")]
       public CatalogoCategorias? CatalogoCategorias { get; set; }
       [OneToMany(TableName = "DetailFactura", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public List<DetailFactura>? DetailFactura { get; set; }
       [OneToMany(TableName = "RelationalCaracteristicasProductos", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public List<RelationalCaracteristicasProductos>? RelationalCaracteristicasProductos { get; set; }
       [OneToMany(TableName = "TransactionLotes", KeyColumn = "Id_Producto", ForeignKeyColumn = "Id_Producto")]
       public List<TransactionLotes>? TransactionLotes { get; set; }
   }
   public class CatalogoCaracteristicas : EntityClass {
       [PrimaryKey]
       public int? Id_Caracteristica { get; set; }
       public string? Descripcion { get; set; }
       public string? EStado { get; set; }
       [OneToMany(TableName = "RelationalCaracteristicasProductos", KeyColumn = "Id_Caracteristica", ForeignKeyColumn = "Id_Caracteristica")]
       public List<RelationalCaracteristicasProductos>? RelationalCaracteristicasProductos { get; set; }
   }
}
