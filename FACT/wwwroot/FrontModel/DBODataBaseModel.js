import { EntityClass } from "../WDevCore/WModules/EntityClass.js";
import { WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
class TransactionLotes extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
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
   RelationalDetalleLotes = { type: 'MasterDetail',  ModelObject: ()=> new RelationalDetalleLotes()};
   TransactionEgresosLotes = { type: 'MasterDetail',  ModelObject: ()=> new TransactionEgresosLotes()};
}
export { TransactionLotes }
class CatalogoCategorias extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Categoria = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoCategorias }
class CatalogoPresentacion extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Presentacion = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   Abreviatura = { type: 'text' };
   RelationalTbl_EquivalenciasPresentacion = { type: 'MasterDetail',  ModelObject: ()=> new RelationalTbl_EquivalenciasPresentacion()};
   RelationalTbl_EquivalenciasPresentacion = { type: 'MasterDetail',  ModelObject: ()=> new RelationalTbl_EquivalenciasPresentacion()};
}
export { CatalogoPresentacion }
class CatalogoTipoDetalleLote extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Tipo_Detalle = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   RelationalDetalleLotes = { type: 'MasterDetail',  ModelObject: ()=> new RelationalDetalleLotes()};
}
export { CatalogoTipoDetalleLote }
class RelationalDetalleLotes extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Detalle = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   TransactionLotes = { type: 'Model',  ModelObject: ()=> new TransactionLotes()};
   CatalogoTipoDetalleLote = { type: 'WSELECT',  ModelObject: ()=> new CatalogoTipoDetalleLote()};
}
export { RelationalDetalleLotes }
class RelationalTbl_EquivalenciasPresentacion extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Valor_Presentacion_Inicial = { type: 'number' };
   Valor_Presentacion_Final = { type: 'number' };
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject: ()=> new CatalogoPresentacion()};
   CatalogoPresentacion = { type: 'WSELECT',  ModelObject: ()=> new CatalogoPresentacion()};
}
export { RelationalTbl_EquivalenciasPresentacion }
class TransactionEgresosLotes extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Egreso = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Cantidad = { type: 'number' };
   Id_Usuario_Gestor = { type: 'number' };
   TransactionLotes = { type: 'Model',  ModelObject: ()=> new TransactionLotes()};
   CatalogoTipoEgreso = { type: 'WSELECT',  ModelObject: ()=> new CatalogoTipoEgreso()};
   DetailFactura = { type: 'MasterDetail',  ModelObject: ()=> new DetailFactura()};
}
export { TransactionEgresosLotes }
class CatalogoTipoEgreso extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Tipo_Egreso = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoTipoEgreso }
class CatalogoAlmacen extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Almacen = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Ubicacion = { type: 'text' };
   Estado = { type: 'text' };
}
export { CatalogoAlmacen }
class TransactionFactura extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
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
   DetailFactura = { type: 'MasterDetail',  ModelObject: ()=> new DetailFactura()};
}
export { TransactionFactura }
class DetailFactura extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Detalle_Factura = { type: 'number', primary: true };
   Precio_Venta = { type: 'number' };
   Cantidad = { type: 'number' };
   Total = { type: 'number' };
   TransactionEgresosLotes = { type: 'Model',  ModelObject: ()=> new TransactionEgresosLotes()};
   TransactionFactura = { type: 'Model',  ModelObject: ()=> new TransactionFactura()};
   CatalogoOfertaEspecial = { type: 'WSELECT',  ModelObject: ()=> new CatalogoOfertaEspecial()};
   CatalogoProducto = { type: 'WSELECT',  ModelObject: ()=> new CatalogoProducto()};
}
export { DetailFactura }
class CatalogoOfertaEspecial extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
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
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Cliente = { type: 'number', primary: true };
   Nombres = { type: 'text' };
   Apellidos = { type: 'text' };
   DNI = { type: 'text' };
}
export { CatalogoClientes }
class RelationalCaracteristicasProductos extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Descripcion = { type: 'text' };
   CatalogoProducto = { type: 'WSELECT',  ModelObject: ()=> new CatalogoProducto()};
   CatalogoCaracteristicas = { type: 'WSELECT',  ModelObject: ()=> new CatalogoCaracteristicas()};
}
export { RelationalCaracteristicasProductos }
class CatalogoProducto extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Producto = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   CatalogoCategorias = { type: 'WSELECT',  ModelObject: ()=> new CatalogoCategorias()};
   RelationalCaracteristicasProductos = { type: 'MasterDetail',  ModelObject: ()=> new RelationalCaracteristicasProductos()};
}
export { CatalogoProducto }
class CatalogoCaracteristicas extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Caracteristica = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   EStado = { type: 'text' };
   RelationalCaracteristicasProductos = { type: 'MasterDetail',  ModelObject: ()=> new RelationalCaracteristicasProductos()};
}
export { CatalogoCaracteristicas }
