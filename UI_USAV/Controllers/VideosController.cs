using CAPA_DATOS;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UI_USAV.Model;

namespace UI_USAV.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        public VideosController (){
            SqlADOConexion.IniciarConexionUSAV();
        }
        [HttpPost]
        public object TakeVideos() {
            return (new TblVideos()).Get<TblVideos>();
        }
    }
}
