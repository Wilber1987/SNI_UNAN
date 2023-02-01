import { EntityClass } from "../WDevCore/WModules/EntityClass.js";
import { WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
class TblLotes extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Lote = { type: 'number', primary: true };
   Cantidad = { type: 'number' };
   Cantidad_Inicial = { type: 'number' };
   Cantidad_Existente = { type: 'number' };
   Costo = { type: 'number' };
   Estado = { type: 'text' };
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject: ()=> new CatalogoPresentacion()};
   CatalogoAlmacen = { type: 'WSELECT',  ModelObject: ()=> new CatalogoAlmacen()};
   CatalogoProducto = { type: 'WSELECT',  ModelObject: ()=> new CatalogoProducto()};
   TblDetalleLotes = { type: 'MasterDetail',  ModelObject: ()=> new TblDetalleLotes()};
   TblEgresosLotes = { type: 'MasterDetail',  ModelObject: ()=> new TblEgresosLotes()};
}
export { TblLotes }
class CatalogoCategorias extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Categoria = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoCategorias }
class CatalogoPresentacion extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Presentacion = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   Abreviatura = { type: 'text' };
}
export { CatalogoPresentacion }
class CatalogoTipoDetalle extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Tipo_Detalle = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoTipoDetalle }
class TblDetalleLotes extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Detalle = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   TblLotes = { type: 'Model',  ModelObject: ()=> new TblLotes()};
   CatalogoTipoDetalle = { type: 'WSELECT',  ModelObject: ()=> new CatalogoTipoDetalle()};
}
export { TblDetalleLotes }
class TblEquivalenciasPresentacion extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Valor_Presentacion_Inicial = { type: 'number' };
   Valor_Presentacion_Final = { type: 'number' };
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject: ()=> new CatalogoPresentacion()};
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject: ()=> new CatalogoPresentacion()};
}
export { TblEquivalenciasPresentacion }
class TblEgresosLotes extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Egreso = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Cantidad = { type: 'number' };
   Id_Usuario_Gestor = { type: 'number' };
   TblLotes = { type: 'Model',  ModelObject: ()=> new TblLotes()};
   CatalogoTipoEgreso = { type: 'WSELECT',  ModelObject: ()=> new CatalogoTipoEgreso()};
   TblDetalleFactura = { type: 'MasterDetail',  ModelObject: ()=> new TblDetalleFactura()};
}
export { TblEgresosLotes }
class CatalogoTipoEgreso extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Tipo_Egreso = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoTipoEgreso }
class CatalogoAlmacen extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Almacen = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Ubicacion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoAlmacen }
class TblFactura extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Factura = { type: 'number', primary: true };
   Nombre_Cliente = { type: 'text' };
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
       super(props, 'ApiEntityDBO');
   }   
   Id_Detalle_Factura = { type: 'number', primary: true };
   Id_Producto = { type: 'number' };
   Precio_Venta = { type: 'number' };
   Cantidad = { type: 'number' };
   Total = { type: 'number' };
   TblEgresosLotes = { type: 'Model',  ModelObject: ()=> new TblEgresosLotes()};
   TblFactura = { type: 'Model',  ModelObject: ()=> new TblFactura()};
   CatalogoOfertaEspecial = { type: 'WSELECT',  ModelObject: ()=> new CatalogoOfertaEspecial()};
}
export { TblDetalleFactura }
class CatalogoOfertaEspecial extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Oferta = { type: 'number', primary: true };
   Id_Lote = { type: 'number' };
   Estado = { type: 'text' };
   Valor = { type: 'number' };
   Vencimiento = { type: 'date' };
}
export { CatalogoOfertaEspecial }
class CatalogoClientes extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Cliente = { type: 'number', primary: true };
   Nombres = { type: 'text' };
   Apellidos = { type: 'text' };
   DNI = { type: 'text' };
}
export { CatalogoClientes }
class TblCaracteristicasProductos extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Descripcion = { type: 'text' };
   CatalogoProducto = { type: 'WSELECT',  ModelObject: ()=> new CatalogoProducto()};
   CatalogoCaracteristicas = { type: 'WSELECT',  ModelObject: ()=> new CatalogoCaracteristicas()};
}
export { TblCaracteristicasProductos }
class CatalogoProducto extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Producto = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   CatalogoCategorias = { type: 'WSELECT',  ModelObject: ()=> new CatalogoCategorias()};
}
export { CatalogoProducto }
class CatalogoCaracteristicas extends EntityClass {
   constructor(props) {
       super(props, 'ApiEntityDBO');
   }   
   Id_Caracteristica = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   EStado = { type: 'text' };
}
export { CatalogoCaracteristicas }
