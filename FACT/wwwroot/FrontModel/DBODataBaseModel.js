import { EntityClass } from "../WDevCore/WModules/EntityClass.js";
import { WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
class CatalogoAlmacen extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Almacen = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Ubicacion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoAlmacen }
class CatalogoCaracteristicas extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Caracteristica = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   EStado = { type: 'text' };
}
export { CatalogoCaracteristicas }
class CatalogoCategorias extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Categoria = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoCategorias }
class CatalogoClientes extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Cliente = { type: 'number', primary: true };
   Nombres = { type: 'text' };
   Apellidos = { type: 'text' };
   DNI = { type: 'text' };
}
export { CatalogoClientes }
class CatalogoOfertaEspecial extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Oferta = { type: 'number', primary: true };
   Id_Lote = { type: 'number' };
   Estado = { type: 'text' };
   Valor = { type: 'number' };
   Vencimiento = { type: 'date' };
}
export { CatalogoOfertaEspecial }
class CatalogoPresentacion extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Presentacion = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   Abreviatura = { type: 'text' };
}
export { CatalogoPresentacion }
class CatalogoProducto extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Producto = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
}
export { CatalogoProducto }
class CatalogoTipoDetalle extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Tipo_Detalle = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoTipoDetalle }
class CatalogoTipoEgreso extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Tipo_Egreso = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoTipoEgreso }
class TblCaracteristicasProductos extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Descripcion = { type: 'text' };
}
export { TblCaracteristicasProductos }
class TblDetalleFactura extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Detalle_Factura = { type: 'number', primary: true };
   Id_Producto = { type: 'number' };
   Precio_Venta = { type: 'number' };
   Cantidad = { type: 'number' };
   Total = { type: 'number' };
}
export { TblDetalleFactura }
class TblDetalleLotes extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Detalle = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { TblDetalleLotes }
class TblEgresosLotes extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Egreso = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Cantidad = { type: 'number' };
   Id_Usuario_Gestor = { type: 'number' };
   TblDetalleFactura = { type: 'MasterDetail',  ModelObject: ()=> new TblDetalleFactura()};
}
export { TblEgresosLotes }
class TblEquivalenciasPresentacion extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Valor_Presentacion_Inicial = { type: 'number' };
   Valor_Presentacion_Final = { type: 'number' };
}
export { TblEquivalenciasPresentacion }
class TblFactura extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Factura = { type: 'number', primary: true };
   Nombre_Cliente = { type: 'text' };
   Fecha = { type: 'date' };
   SubTotal = { type: 'number' };
   IVA = { type: 'number' };
   Total = { type: 'number' };
   No_Factura = { type: 'text' };
   Estado = { type: 'text' };
   TblDetalleFactura = { type: 'MasterDetail',  ModelObject: ()=> new TblDetalleFactura()};
}
export { TblFactura }
class TblLotes extends EntityClass {
   constructor(props) {
       super(props);
   }
   Namespace = 'EntityDBO';
   Id_Lote = { type: 'number', primary: true };
   Cantidad = { type: 'number' };
   Cantidad_Inicial = { type: 'number' };
   Cantidad_Existente = { type: 'number' };
   Costo = { type: 'number' };
   Estado = { type: 'text' };
   TblDetalleLotes = { type: 'MasterDetail',  ModelObject: ()=> new TblDetalleLotes()};
   TblEgresosLotes = { type: 'MasterDetail',  ModelObject: ()=> new TblEgresosLotes()};
}
export { TblLotes }
