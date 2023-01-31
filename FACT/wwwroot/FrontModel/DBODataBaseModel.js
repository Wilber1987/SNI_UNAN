import { EntityClass } from "../WDevCore/WModules/EntityClass.js";
import { WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
class TblLotes extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Lote = { type: 'number' };
   Cantidad = { type: 'number' };
   Id_Producto = { type: 'number' };
   Cantidad_Inicial = { type: 'number' };
   Cantidad_Existente = { type: 'number' };
   Costo = { type: 'number' };
   Estado = { type: 'text' };
   Id_Presentacion = { type: 'number' };
   Id_Almacen = { type: 'number' };
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject: ()=> new CatalogoPresentacion()};
   CatalogoAlmacen = { type: 'WSELECT',  ModelObject: ()=> new CatalogoAlmacen()};
   CatalogoProducto = { type: 'WSELECT',  ModelObject: ()=> new CatalogoProducto()};
   TblDetalleLotes = { type: 'MasterDetail',  ModelObject: ()=> new TblDetalleLotes()};
   TblEgresosLotes = { type: 'MasterDetail',  ModelObject: ()=> new TblEgresosLotes()};
}
export { TblLotes }
class CatalogoCategorias extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Categoria = { type: 'number' };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoCategorias }
class CatalogoPresentacion extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Presentacion = { type: 'number' };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   Abreviatura = { type: 'text' };
}
export { CatalogoPresentacion }
class CatalogoTipoDetalle extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Tipo_Detalle = { type: 'number' };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoTipoDetalle }
class TblDetalleLotes extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Detalle = { type: 'number' };
   Descripcion = { type: 'text' };
   Id_Tipo_Detalle = { type: 'number' };
   Estado = { type: 'text' };
   Id_Lote = { type: 'number' };
   TblLotes = { type: 'Model',  ModelObject: ()=> new TblLotes()};
   CatalogoTipoDetalle = { type: 'WSELECT',  ModelObject: ()=> new CatalogoTipoDetalle()};
}
export { TblDetalleLotes }
class TblEquivalenciasPresentacion extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Presentacion_Inicial = { type: 'number' };
   Valor_Presentacion_Inicial = { type: 'number' };
   Id_Presentacion_Final = { type: 'number' };
   Valor_Presentacion_Final = { type: 'number' };
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject: ()=> new CatalogoPresentacion()};
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject: ()=> new CatalogoPresentacion()};
}
export { TblEquivalenciasPresentacion }
class TblEgresosLotes extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Egreso = { type: 'number' };
   Descripcion = { type: 'text' };
   Id_Tipo_Egreso = { type: 'number' };
   Id_Lote = { type: 'number' };
   Cantidad = { type: 'number' };
   Id_Usuario_Gestor = { type: 'number' };
   TblLotes = { type: 'Model',  ModelObject: ()=> new TblLotes()};
   CatalogoTipoEgreso = { type: 'WSELECT',  ModelObject: ()=> new CatalogoTipoEgreso()};
   TblDetalleFactura = { type: 'MasterDetail',  ModelObject: ()=> new TblDetalleFactura()};
}
export { TblEgresosLotes }
class CatalogoTipoEgreso extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Tipo_Egreso = { type: 'number' };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoTipoEgreso }
class CatalogoAlmacen extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Almacen = { type: 'number' };
   Descripcion = { type: 'text' };
   Ubicacion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoAlmacen }
class TblFactura extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Factura = { type: 'number' };
   Nombre_Cliente = { type: 'text' };
   Id_Cliente = { type: 'number' };
   Fecha = { type: 'date' };
   SubTotal = { type: 'number' };
   IVA = { type: 'number' };
   Total = { type: 'number' };
   No_Factura = { type: 'text' };
   Estado = { type: 'text' };
   CatalogoClientes = { type: 'WSELECT',  ModelObject: ()=> new CatalogoClientes()};
   TblDetalleFactura = { type: 'MasterDetail',  ModelObject: ()=> new TblDetalleFactura()};
}
export { TblFactura }
class TblDetalleFactura extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Detalle_Factura = { type: 'number' };
   Id_Factura = { type: 'number' };
   Id_Producto = { type: 'number' };
   Precio_Venta = { type: 'number' };
   Cantidad = { type: 'number' };
   Total = { type: 'number' };
   Id_Egreso = { type: 'number' };
   Id_Oferta = { type: 'number' };
   TblEgresosLotes = { type: 'Model',  ModelObject: ()=> new TblEgresosLotes()};
   TblFactura = { type: 'Model',  ModelObject: ()=> new TblFactura()};
   CatalogoOfertaEspecial = { type: 'WSELECT',  ModelObject: ()=> new CatalogoOfertaEspecial()};
}
export { TblDetalleFactura }
class CatalogoOfertaEspecial extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Oferta = { type: 'number' };
   Id_Lote = { type: 'number' };
   Estado = { type: 'text' };
   Valor = { type: 'number' };
   Vencimiento = { type: 'date' };
}
export { CatalogoOfertaEspecial }
class CatalogoClientes extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Cliente = { type: 'number' };
   Nombres = { type: 'text' };
   Apellidos = { type: 'text' };
   DNI = { type: 'text' };
}
export { CatalogoClientes }
class TblCaracteristicasProductos extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Producto = { type: 'number' };
   Id_Caracteristica = { type: 'number' };
   Descripcion = { type: 'text' };
   CatalogoProducto = { type: 'WSELECT',  ModelObject: ()=> new CatalogoProducto()};
   CatalogoCaracteristicas = { type: 'WSELECT',  ModelObject: ()=> new CatalogoCaracteristicas()};
}
export { TblCaracteristicasProductos }
class CatalogoProducto extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Producto = { type: 'number' };
   Descripcion = { type: 'text' };
   Id_Categoria = { type: 'number' };
   CatalogoCategorias = { type: 'WSELECT',  ModelObject: ()=> new CatalogoCategorias()};
}
export { CatalogoProducto }
class CatalogoCaracteristicas extends EntityClass {
   constructor(props) {
       super(props);
   }
   Id_Caracteristica = { type: 'number' };
   Descripcion = { type: 'text' };
   EStado = { type: 'text' };
}
export { CatalogoCaracteristicas }
