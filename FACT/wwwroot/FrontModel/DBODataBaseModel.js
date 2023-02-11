import { EntityClass } from "../WDevCore/WModules/EntityClass.js";
import { WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
class Catalogo_Almacen extends EntityClass {
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
export { Catalogo_Almacen }
class Catalogo_Caracteristicas extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Caracteristica = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   EStado = { type: 'text' };
   Relational_Caracteristicas_Productos = { type: 'MasterDetail',  ModelObject: ()=> new Relational_Caracteristicas_Productos()};
}
export { Catalogo_Caracteristicas }
class Catalogo_Categorias extends EntityClass {
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
export { Catalogo_Categorias }
class Catalogo_Clientes extends EntityClass {
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
export { Catalogo_Clientes }
class Catalogo_Oferta_Especial extends EntityClass {
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
export { Catalogo_Oferta_Especial }
class Catalogo_Presentacion extends EntityClass {
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
   Relational_Equivalencias_Presentacion = { type: 'MasterDetail',  ModelObject: ()=> new Relational_Equivalencias_Presentacion()};
   Relational_Equivalencias_Presentacion = { type: 'MasterDetail',  ModelObject: ()=> new Relational_Equivalencias_Presentacion()};
}
export { Catalogo_Presentacion }
class Catalogo_Producto extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Producto = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Catalogo_Categorias = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Categorias()};
   Relational_Caracteristicas_Productos = { type: 'MasterDetail',  ModelObject: ()=> new Relational_Caracteristicas_Productos()};
}
export { Catalogo_Producto }
class Catalogo_Tipo_Detalle_Lote extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Tipo_Detalle = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   Relational_Detalle_Lotes = { type: 'MasterDetail',  ModelObject: ()=> new Relational_Detalle_Lotes()};
}
export { Catalogo_Tipo_Detalle_Lote }
class Catalogo_Tipo_Transaccion extends EntityClass {
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
export { Catalogo_Tipo_Transaccion }
class Detail_Factura extends EntityClass {
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
   Catalogo_Oferta_Especial = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Oferta_Especial()};
   Catalogo_Producto = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Producto()};
   Detail_Transaccion_Lote = { type: 'WSELECT',  require: false,  ModelObject: ()=> new Detail_Transaccion_Lote()};
}
export { Detail_Factura }
class Detail_Transaccion_Lote extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Detalle_Transaccion = { type: 'number', primary: true };
   Cantidad_Afectada = { type: 'number' };
   Detail_Factura = { type: 'WSELECT',  ModelObject: ()=> new Detail_Factura()};
}
export { Detail_Transaccion_Lote }
class Relational_Caracteristicas_Productos extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Descripcion = { type: 'text' };
   Catalogo_Caracteristicas = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Caracteristicas()};
   Catalogo_Producto = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Producto()};
}
export { Relational_Caracteristicas_Productos }
class Relational_Detalle_Lotes extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Detalle = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Estado = { type: 'text' };
   Catalogo_Tipo_Detalle_Lote = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Tipo_Detalle_Lote()};
   Transaction_Lotes = { type: 'Model',  ModelObject: ()=> new Transaction_Lotes()};
}
export { Relational_Detalle_Lotes }
class Relational_Equivalencias_Presentacion extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Valor_Presentacion_Inicial = { type: 'number' };
   Valor_Presentacion_Final = { type: 'number' };
   Catalogo_Presentacion = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Presentacion()};
   Catalogo_Presentacion = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Presentacion()};
}
export { Relational_Equivalencias_Presentacion }
class Transaction_Factura extends EntityClass {
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
   Catalogo_Clientes = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Clientes()};
   Detail_Factura = { type: 'MasterDetail',  ModelObject: ()=> new Detail_Factura()};
}
export { Transaction_Factura }
class Transaction_Lotes extends EntityClass {
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
   Catalogo_Almacen = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Almacen()};
   Catalogo_Presentacion = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Presentacion()};
   Catalogo_Producto = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Producto()};
   Detail_Transaccion_Lote = { type: 'MasterDetail',  ModelObject: ()=> new Detail_Transaccion_Lote()};
   Relational_Detalle_Lotes = { type: 'MasterDetail',  ModelObject: ()=> new Relational_Detalle_Lotes()};
}
export { Transaction_Lotes }
class Transaction_Transacciones_Lotes extends EntityClass {
   constructor(props) {
       super(props, 'EntityDBO');
       for (const prop in props) {
           this[prop] = props[prop];
       }
   }
   Id_Transaccion = { type: 'number', primary: true };
   Descripcion = { type: 'text' };
   Id_Lote = { type: 'number' };
   Cantidad = { type: 'number' };
   Id_Usuario_Gestor = { type: 'number' };
   Catalogo_Tipo_Transaccion = { type: 'WSELECT',  ModelObject: ()=> new Catalogo_Tipo_Transaccion()};
   Detail_Transaccion_Lote = { type: 'MasterDetail',  ModelObject: ()=> new Detail_Transaccion_Lote()};
}
export { Transaction_Transacciones_Lotes }
