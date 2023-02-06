using DataBaseModel;
using Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers {
   [Route("api/[controller]/[action]")]
   [ApiController]
   public class  ApiEntityDBOController : ControllerBase {
       //CatalogoOfertaEspecial
       [HttpPost]
       [AuthController]
       public List<CatalogoOfertaEspecial> getCatalogoOfertaEspecial() {
           return new CatalogoOfertaEspecial().Get<CatalogoOfertaEspecial>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoOfertaEspecial(CatalogoOfertaEspecial inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoOfertaEspecial(CatalogoOfertaEspecial inst) {
           return inst.Update();
       }
       //CatalogoAlmacen
       [HttpPost]
       [AuthController]
       public List<CatalogoAlmacen> getCatalogoAlmacen() {
           return new CatalogoAlmacen().Get<CatalogoAlmacen>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoAlmacen(CatalogoAlmacen inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoAlmacen(CatalogoAlmacen inst) {
           return inst.Update();
       }
       //CatalogoCaracteristicas
       [HttpPost]
       [AuthController]
       public List<CatalogoCaracteristicas> getCatalogoCaracteristicas() {
           return new CatalogoCaracteristicas().Get<CatalogoCaracteristicas>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoCaracteristicas(CatalogoCaracteristicas inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoCaracteristicas(CatalogoCaracteristicas inst) {
           return inst.Update();
       }
       //CatalogoCategorias
       [HttpPost]
       [AuthController]
       public List<CatalogoCategorias> getCatalogoCategorias() {
           return new CatalogoCategorias().Get<CatalogoCategorias>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoCategorias(CatalogoCategorias inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoCategorias(CatalogoCategorias inst) {
           return inst.Update();
       }
       //CatalogoClientes
       [HttpPost]
       [AuthController]
       public List<CatalogoClientes> getCatalogoClientes() {
           return new CatalogoClientes().Get<CatalogoClientes>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoClientes(CatalogoClientes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoClientes(CatalogoClientes inst) {
           return inst.Update();
       }
       //CatalogoPresentacion
       [HttpPost]
       [AuthController]
       public List<CatalogoPresentacion> getCatalogoPresentacion() {
           return new CatalogoPresentacion().Get<CatalogoPresentacion>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoPresentacion(CatalogoPresentacion inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoPresentacion(CatalogoPresentacion inst) {
           return inst.Update();
       }
       //CatalogoProducto
       [HttpPost]
       [AuthController]
       public List<CatalogoProducto> getCatalogoProducto() {
           return new CatalogoProducto().Get<CatalogoProducto>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoProducto(CatalogoProducto inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoProducto(CatalogoProducto inst) {
           return inst.Update();
       }
       //CatalogoTipoDetalleLote
       [HttpPost]
       [AuthController]
       public List<CatalogoTipoDetalleLote> getCatalogoTipoDetalleLote() {
           return new CatalogoTipoDetalleLote().Get<CatalogoTipoDetalleLote>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoTipoDetalleLote(CatalogoTipoDetalleLote inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoTipoDetalleLote(CatalogoTipoDetalleLote inst) {
           return inst.Update();
       }
       //CatalogoTipoEgreso
       [HttpPost]
       [AuthController]
       public List<CatalogoTipoEgreso> getCatalogoTipoEgreso() {
           return new CatalogoTipoEgreso().Get<CatalogoTipoEgreso>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoTipoEgreso(CatalogoTipoEgreso inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoTipoEgreso(CatalogoTipoEgreso inst) {
           return inst.Update();
       }
       //DetailFactura
       [HttpPost]
       [AuthController]
       public List<DetailFactura> getDetailFactura() {
           return new DetailFactura().Get<DetailFactura>();
       }
       [HttpPost]
       [AuthController]
       public object saveDetailFactura(DetailFactura inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateDetailFactura(DetailFactura inst) {
           return inst.Update();
       }
       //RelationalCaracteristicasProductos
       [HttpPost]
       [AuthController]
       public List<RelationalCaracteristicasProductos> getRelationalCaracteristicasProductos() {
           return new RelationalCaracteristicasProductos().Get<RelationalCaracteristicasProductos>();
       }
       [HttpPost]
       [AuthController]
       public object saveRelationalCaracteristicasProductos(RelationalCaracteristicasProductos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateRelationalCaracteristicasProductos(RelationalCaracteristicasProductos inst) {
           return inst.Update();
       }
       //RelationalDetalleLotes
       [HttpPost]
       [AuthController]
       public List<RelationalDetalleLotes> getRelationalDetalleLotes() {
           return new RelationalDetalleLotes().Get<RelationalDetalleLotes>();
       }
       [HttpPost]
       [AuthController]
       public object saveRelationalDetalleLotes(RelationalDetalleLotes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateRelationalDetalleLotes(RelationalDetalleLotes inst) {
           return inst.Update();
       }
       //RelationalTbl_EquivalenciasPresentacion
       [HttpPost]
       [AuthController]
       public List<RelationalTbl_EquivalenciasPresentacion> getRelationalTbl_EquivalenciasPresentacion() {
           return new RelationalTbl_EquivalenciasPresentacion().Get<RelationalTbl_EquivalenciasPresentacion>();
       }
       [HttpPost]
       [AuthController]
       public object saveRelationalTbl_EquivalenciasPresentacion(RelationalTbl_EquivalenciasPresentacion inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateRelationalTbl_EquivalenciasPresentacion(RelationalTbl_EquivalenciasPresentacion inst) {
           return inst.Update();
       }
       //TransactionEgresosLotes
       [HttpPost]
       [AuthController]
       public List<TransactionEgresosLotes> getTransactionEgresosLotes() {
           return new TransactionEgresosLotes().Get<TransactionEgresosLotes>();
       }
       [HttpPost]
       [AuthController]
       public object saveTransactionEgresosLotes(TransactionEgresosLotes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTransactionEgresosLotes(TransactionEgresosLotes inst) {
           return inst.Update();
       }
       //TransactionFactura
       [HttpPost]
       [AuthController]
       public List<TransactionFactura> getTransactionFactura() {
           return new TransactionFactura().Get<TransactionFactura>();
       }
       [HttpPost]
       [AuthController]
       public object saveTransactionFactura(TransactionFactura inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTransactionFactura(TransactionFactura inst) {
           return inst.Update();
       }
       //TransactionLotes
       [HttpPost]
       [AuthController]
       public List<TransactionLotes> getTransactionLotes() {
           return new TransactionLotes().Get<TransactionLotes>();
       }
       [HttpPost]
       [AuthController]
       public object saveTransactionLotes(TransactionLotes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTransactionLotes(TransactionLotes inst) {
           return inst.Update();
       }
   }
}
