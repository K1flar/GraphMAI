using GraphMAI.Models;
using Microsoft.AspNetCore.Mvc;

namespace GraphMAI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphStorageController : ControllerBase
    {
        [HttpPost]
        public IActionResult Test()
        {
            var result = new List<GraphEdge>() {
                new GraphEdge() { Id = 1, From = 0, To = 1 },
                new GraphEdge() { Id = 2, From = 0, To = 2 },
                new GraphEdge() { Id = 3, From = 2, To = 3 },
                new GraphEdge() { Id = 4, From = 1, To = 2 }
            };

            return Ok(result);
        }
    }
}
