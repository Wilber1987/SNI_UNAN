using DataBaseModel;
using Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers {
   [Route("api/[controller]/[action]")]
   [ApiController]
   public class  ApiEntityDBOController : ControllerBase {
       //Catalogo_Almacen
       [HttpPost]
       [AuthController]
       public List<Catalogo_Almacen> getCatalogo_Almacen() {
           return new Catalogo_Almacen().Get<Catalogo_Almacen>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogo_Almacen(Catalogo_Almacen inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogo_Almacen(Catalogo_Almacen inst) {
           return inst.Update();
       }
       //Catalogo_Caracteristicas
       [HttpPost]
       [AuthController]
       public List<Catalogo_Caracteristicas> getCatalogo_Caracteristicas() {
           return new Catalogo_Caracteristicas().Get<Catalogo_Caracteristicas>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogo_Caracteristicas(Catalogo_Caracteristicas inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogo_Caracteristicas(Catalogo_Caracteristicas inst) {
           return inst.Update();
       }
       //Catalogo_Categorias
       [HttpPost]
       [AuthController]
       public List<Catalogo_Categorias> getCatalogo_Categorias() {
           return new Catalogo_Categorias().Get<Catalogo_Categorias>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogo_Categorias(Catalogo_Categorias inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogo_Categorias(Catalogo_Categorias inst) {
           return inst.Update();
       }
       //Catalogo_Clientes
       [HttpPost]
       [AuthController]
       public List<Catalogo_Clientes> getCatalogo_Clientes() {
           return new Catalogo_Clientes().Get<Catalogo_Clientes>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogo_Clientes(Catalogo_Clientes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogo_Clientes(Catalogo_Clientes inst) {
           return inst.Update();
       }
       //Catalogo_Oferta_Especial
       [HttpPost]
       [AuthController]
       public List<Catalogo_Oferta_Especial> getCatalogo_Oferta_Especial() {
           return new Catalogo_Oferta_Especial().Get<Catalogo_Oferta_Especial>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogo_Oferta_Especial(Catalogo_Oferta_Especial inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogo_Oferta_Especial(Catalogo_Oferta_Especial inst) {
           return inst.Update();
       }
       //Catalogo_Presentacion
       [HttpPost]
       [AuthController]
       public List<Catalogo_Presentacion> getCatalogo_Presentacion() {
           return new Catalogo_Presentacion().Get<Catalogo_Presentacion>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogo_Presentacion(Catalogo_Presentacion inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogo_Presentacion(Catalogo_Presentacion inst) {
           return inst.Update();
       }
       //Catalogo_Producto
       [HttpPost]
       [AuthController]
       public List<Catalogo_Producto> getCatalogo_Producto() {
           return new Catalogo_Producto().Get<Catalogo_Producto>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogo_Producto(Catalogo_Producto inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogo_Producto(Catalogo_Producto inst) {
           return inst.Update();
       }
       //Catalogo_Tipo_Detalle_Lote
       [HttpPost]
       [AuthController]
       public List<Catalogo_Tipo_Detalle_Lote> getCatalogo_Tipo_Detalle_Lote() {
           return new Catalogo_Tipo_Detalle_Lote().Get<Catalogo_Tipo_Detalle_Lote>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogo_Tipo_Detalle_Lote(Catalogo_Tipo_Detalle_Lote inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogo_Tipo_Detalle_Lote(Catalogo_Tipo_Detalle_Lote inst) {
           return inst.Update();
       }
       //Catalogo_Tipo_Transaccion
       [HttpPost]
       [AuthController]
       public List<Catalogo_Tipo_Transaccion> getCatalogo_Tipo_Transaccion() {
           return new Catalogo_Tipo_Transaccion().Get<Catalogo_Tipo_Transaccion>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogo_Tipo_Transaccion(Catalogo_Tipo_Transaccion inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogo_Tipo_Transaccion(Catalogo_Tipo_Transaccion inst) {
           return inst.Update();
       }
       //Detail_Factura
       [HttpPost]
       [AuthController]
       public List<Detail_Factura> getDetail_Factura() {
           return new Detail_Factura().Get<Detail_Factura>();
       }
       [HttpPost]
       [AuthController]
       public object saveDetail_Factura(Detail_Factura inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateDetail_Factura(Detail_Factura inst) {
           return inst.Update();
       }
       //Detail_Transaccion_Lote
       [HttpPost]
       [AuthController]
       public List<Detail_Transaccion_Lote> getDetail_Transaccion_Lote() {
           return new Detail_Transaccion_Lote().Get<Detail_Transaccion_Lote>();
       }
       [HttpPost]
       [AuthController]
       public object saveDetail_Transaccion_Lote(Detail_Transaccion_Lote inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateDetail_Transaccion_Lote(Detail_Transaccion_Lote inst) {
           return inst.Update();
       }
       //Relational_Caracteristicas_Productos
       [HttpPost]
       [AuthController]
       public List<Relational_Caracteristicas_Productos> getRelational_Caracteristicas_Productos() {
           return new Relational_Caracteristicas_Productos().Get<Relational_Caracteristicas_Productos>();
       }
       [HttpPost]
       [AuthController]
       public object saveRelational_Caracteristicas_Productos(Relational_Caracteristicas_Productos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateRelational_Caracteristicas_Productos(Relational_Caracteristicas_Productos inst) {
           return inst.Update();
       }
       //Relational_Detalle_Lotes
       [HttpPost]
       [AuthController]
       public List<Relational_Detalle_Lotes> getRelational_Detalle_Lotes() {
           return new Relational_Detalle_Lotes().Get<Relational_Detalle_Lotes>();
       }
       [HttpPost]
       [AuthController]
       public object saveRelational_Detalle_Lotes(Relational_Detalle_Lotes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateRelational_Detalle_Lotes(Relational_Detalle_Lotes inst) {
           return inst.Update();
       }
       //Relational_Equivalencias_Presentacion
       [HttpPost]
       [AuthController]
       public List<Relational_Equivalencias_Presentacion> getRelational_Equivalencias_Presentacion() {
           return new Relational_Equivalencias_Presentacion().Get<Relational_Equivalencias_Presentacion>();
       }
       [HttpPost]
       [AuthController]
       public object saveRelational_Equivalencias_Presentacion(Relational_Equivalencias_Presentacion inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateRelational_Equivalencias_Presentacion(Relational_Equivalencias_Presentacion inst) {
           return inst.Update();
       }
       //Transaction_Factura
       [HttpPost]
       [AuthController]
       public List<Transaction_Factura> getTransaction_Factura() {
           return new Transaction_Factura().Get<Transaction_Factura>();
       }
       [HttpPost]
       [AuthController]
       public object saveTransaction_Factura(Transaction_Factura inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTransaction_Factura(Transaction_Factura inst) {
           return inst.Update();
       }
       //Transaction_Lotes
       [HttpPost]
       [AuthController]
       public List<Transaction_Lotes> getTransaction_Lotes() {
           return new Transaction_Lotes().Get<Transaction_Lotes>();
       }
       [HttpPost]
       [AuthController]
       public object saveTransaction_Lotes(Transaction_Lotes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTransaction_Lotes(Transaction_Lotes inst) {
           return inst.Update();
       }
       //Transaction_Transacciones_Lotes
       [HttpPost]
       [AuthController]
       public List<Transaction_Transacciones_Lotes> getTransaction_Transacciones_Lotes() {
           return new Transaction_Transacciones_Lotes().Get<Transaction_Transacciones_Lotes>();
       }
       [HttpPost]
       [AuthController]
       public object saveTransaction_Transacciones_Lotes(Transaction_Transacciones_Lotes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTransaction_Transacciones_Lotes(Transaction_Transacciones_Lotes inst) {
           return inst.Update();
       }
   }
}
