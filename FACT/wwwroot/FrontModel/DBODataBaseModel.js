import { EntityClass } from "../WDevCore/WModules/EntityClass.js";
import { WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
class sysdiagrams extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   name = { type: 'text' };
   principal_id = { type: 'number' };
   diagram_id = { type: 'number' };
   version = { type: 'number' };
   definition = { type: '' };
}
export { sysdiagrams }
class CatalogoAlmacen extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Almacen = { type: 'number' };
   Descripcion = { type: 'text' };
   Ubicacion = { type: 'text' };
   Estado = { type: 'text' };
   TblLotes = { type: 'MasterDetail',  ModelObject:  TblLotes.prototype};
}
export { CatalogoAlmacen }
class CatalogoCaracteristicas extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Caracteristica = { type: 'number' };
   Descripcion = { type: 'text' };
   EStado = { type: 'text' };
   TblCaracteristicasProductos = { type: 'MasterDetail',  ModelObject:  TblCaracteristicasProductos.prototype};
}
export { CatalogoCaracteristicas }
class CatalogoCategorias extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Categoria = { type: 'number' };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   CatalogoProducto = { type: 'WMULTYSELECT',  ModelObject:  CatalogoProducto.prototype};
}
export { CatalogoCategorias }
class CatalogoClientes extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Cliente = { type: 'number' };
   Nombres = { type: 'text' };
   Apellidos = { type: 'text' };
   DNI = { type: 'text' };
   TblFactura = { type: 'MasterDetail',  ModelObject:  TblFactura.prototype};
}
export { CatalogoClientes }
class CatalogoOfertaEspecial extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Oferta = { type: 'number' };
   Id_Lote = { type: 'number' };
   Estado = { type: 'text' };
   Valor = { type: 'number' };
   Vencimiento = { type: 'date' };
   TblDetalleFactura = { type: 'MasterDetail',  ModelObject:  TblDetalleFactura.prototype};
}
export { CatalogoOfertaEspecial }
class CatalogoPresentacion extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Presentacion = { type: 'number' };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   Abreviatura = { type: 'text' };
   TblEquivalenciasPresentacion = { type: 'MasterDetail',  ModelObject:  TblEquivalenciasPresentacion.prototype};
   TblEquivalenciasPresentacion = { type: 'MasterDetail',  ModelObject:  TblEquivalenciasPresentacion.prototype};
   TblLotes = { type: 'MasterDetail',  ModelObject:  TblLotes.prototype};
}
export { CatalogoPresentacion }
class CatalogoProducto extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Producto = { type: 'number' };
   Descripcion = { type: 'text' };
   Id_Categoria = { type: 'number' };
   CatalogoCategorias = { type: 'WSELECT',  ModelObject:  CatalogoCategorias.prototype};
   TblCaracteristicasProductos = { type: 'MasterDetail',  ModelObject:  TblCaracteristicasProductos.prototype};
   TblLotes = { type: 'MasterDetail',  ModelObject:  TblLotes.prototype};
}
export { CatalogoProducto }
class CatalogoTipoDetalle extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Tipo_Detalle = { type: 'number' };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   TblDetalleLotes = { type: 'MasterDetail',  ModelObject:  TblDetalleLotes.prototype};
}
export { CatalogoTipoDetalle }
class CatalogoTipoEgreso extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Tipo_Egreso = { type: 'number' };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   TblEgresosLotes = { type: 'MasterDetail',  ModelObject:  TblEgresosLotes.prototype};
}
export { CatalogoTipoEgreso }
class TblCaracteristicasProductos extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Producto = { type: 'number' };
   Id_Caracteristica = { type: 'number' };
   Descripcion = { type: 'text' };
   CatalogoCaracteristicas = { type: 'WSELECT',  ModelObject:  CatalogoCaracteristicas.prototype};
   CatalogoProducto = { type: 'WSELECT',  ModelObject:  CatalogoProducto.prototype};
}
export { TblCaracteristicasProductos }
class TblDetalleFactura extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Detalle_Factura = { type: 'number' };
   Id_Factura = { type: 'number' };
   Id_Producto = { type: 'number' };
   Precio_Venta = { type: 'number' };
   Cantidad = { type: 'number' };
   Total = { type: 'number' };
   Id_Egreso = { type: 'number' };
   Id_Oferta = { type: 'number' };
   CatalogoOfertaEspecial = { type: 'WSELECT',  ModelObject:  CatalogoOfertaEspecial.prototype};
   TblEgresosLotes = { type: 'Model',  ModelObject:  TblEgresosLotes.prototype};
   TblFactura = { type: 'Model',  ModelObject:  TblFactura.prototype};
}
export { TblDetalleFactura }
class TblDetalleLotes extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Detalle = { type: 'number' };
   Descripcion = { type: 'text' };
   Id_Tipo_Detalle = { type: 'number' };
   Estado = { type: 'text' };
   Id_Lote = { type: 'number' };
   CatalogoTipoDetalle = { type: 'WSELECT',  ModelObject:  CatalogoTipoDetalle.prototype};
   TblLotes = { type: 'Model',  ModelObject:  TblLotes.prototype};
}
export { TblDetalleLotes }
class TblEgresosLotes extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Egreso = { type: 'number' };
   Descripcion = { type: 'text' };
   Id_Tipo_Egreso = { type: 'number' };
   Id_Lote = { type: 'number' };
   Cantidad = { type: 'number' };
   Id_Usuario_Gestor = { type: 'number' };
   CatalogoTipoEgreso = { type: 'WSELECT',  ModelObject:  CatalogoTipoEgreso.prototype};
   TblLotes = { type: 'Model',  ModelObject:  TblLotes.prototype};
   TblDetalleFactura = { type: 'MasterDetail',  ModelObject:  TblDetalleFactura.prototype};
}
export { TblEgresosLotes }
class TblEquivalenciasPresentacion extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Presentacion_Inicial = { type: 'number' };
   Valor_Presentacion_Inicial = { type: 'number' };
   Id_Presentacion_Final = { type: 'number' };
   Valor_Presentacion_Final = { type: 'number' };
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject:  CatalogoPresentacion.prototype};
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject:  CatalogoPresentacion.prototype};
}
export { TblEquivalenciasPresentacion }
class TblFactura extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
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
   CatalogoClientes = { type: 'WSELECT',  ModelObject:  CatalogoClientes.prototype};
   TblDetalleFactura = { type: 'MasterDetail',  ModelObject:  TblDetalleFactura.prototype};
}
export { TblFactura }
class TblLotes extends EntityClass {
   constructor(props) {
       super();
       for (const prop in props) {
           this[prop] = props[prop];
       }
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
   CatalogoAlmacen = { type: 'WSELECT',  ModelObject:  CatalogoAlmacen.prototype};
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject:  CatalogoPresentacion.prototype};
   CatalogoProducto = { type: 'WSELECT',  ModelObject:  CatalogoProducto.prototype};
   TblDetalleLotes = { type: 'MasterDetail',  ModelObject:  TblDetalleLotes.prototype};
   TblEgresosLotes = { type: 'MasterDetail',  ModelObject:  TblEgresosLotes.prototype};
}
export { TblLotes }
