using CAPA_NEGOCIO.MAPEO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
[Route("api/[controller]/[action]")]
[ApiController]
[ApiController]
namespace MODEL.Controllers {
   public class EntityController : ControllerBase {
       //TblLotes
       [HttpPost]
       [AuthController]
       public List<TblLotes> getTblLotes() {
           return new TblLotes().Get<TblLotes>();
       }
       [HttpPost]
       [AuthController]
       public object saveTblLotes(TblLotes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTblLotes(TblLotes inst) {
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
       //CatalogoTipoDetalle
       [HttpPost]
       [AuthController]
       public List<CatalogoTipoDetalle> getCatalogoTipoDetalle() {
           return new CatalogoTipoDetalle().Get<CatalogoTipoDetalle>();
       }
       [HttpPost]
       [AuthController]
       public object saveCatalogoTipoDetalle(CatalogoTipoDetalle inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateCatalogoTipoDetalle(CatalogoTipoDetalle inst) {
           return inst.Update();
       }
       //TblDetalleLotes
       [HttpPost]
       [AuthController]
       public List<TblDetalleLotes> getTblDetalleLotes() {
           return new TblDetalleLotes().Get<TblDetalleLotes>();
       }
       [HttpPost]
       [AuthController]
       public object saveTblDetalleLotes(TblDetalleLotes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTblDetalleLotes(TblDetalleLotes inst) {
           return inst.Update();
       }
       //TblEquivalenciasPresentacion
       [HttpPost]
       [AuthController]
       public List<TblEquivalenciasPresentacion> getTblEquivalenciasPresentacion() {
           return new TblEquivalenciasPresentacion().Get<TblEquivalenciasPresentacion>();
       }
       [HttpPost]
       [AuthController]
       public object saveTblEquivalenciasPresentacion(TblEquivalenciasPresentacion inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTblEquivalenciasPresentacion(TblEquivalenciasPresentacion inst) {
           return inst.Update();
       }
       //TblEgresosLotes
       [HttpPost]
       [AuthController]
       public List<TblEgresosLotes> getTblEgresosLotes() {
           return new TblEgresosLotes().Get<TblEgresosLotes>();
       }
       [HttpPost]
       [AuthController]
       public object saveTblEgresosLotes(TblEgresosLotes inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTblEgresosLotes(TblEgresosLotes inst) {
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
       //TblFactura
       [HttpPost]
       [AuthController]
       public List<TblFactura> getTblFactura() {
           return new TblFactura().Get<TblFactura>();
       }
       [HttpPost]
       [AuthController]
       public object saveTblFactura(TblFactura inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTblFactura(TblFactura inst) {
           return inst.Update();
       }
       //TblDetalleFactura
       [HttpPost]
       [AuthController]
       public List<TblDetalleFactura> getTblDetalleFactura() {
           return new TblDetalleFactura().Get<TblDetalleFactura>();
       }
       [HttpPost]
       [AuthController]
       public object saveTblDetalleFactura(TblDetalleFactura inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTblDetalleFactura(TblDetalleFactura inst) {
           return inst.Update();
       }
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
       //TblCaracteristicasProductos
       [HttpPost]
       [AuthController]
       public List<TblCaracteristicasProductos> getTblCaracteristicasProductos() {
           return new TblCaracteristicasProductos().Get<TblCaracteristicasProductos>();
       }
       [HttpPost]
       [AuthController]
       public object saveTblCaracteristicasProductos(TblCaracteristicasProductos inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updateTblCaracteristicasProductos(TblCaracteristicasProductos inst) {
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
       //sysdiagrams
       [HttpPost]
       [AuthController]
       public List<sysdiagrams> getsysdiagrams() {
           return new sysdiagrams().Get<sysdiagrams>();
       }
       [HttpPost]
       [AuthController]
       public object savesysdiagrams(sysdiagrams inst) {
           return inst.Save();
       }
       [HttpPost]
       [AuthController]
       public object updatesysdiagrams(sysdiagrams inst) {
           return inst.Update();
       }
   }
}
