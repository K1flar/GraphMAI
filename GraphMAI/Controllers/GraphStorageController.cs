using GraphMAI.Data;
using GraphMAI.Models;
using GraphMAI.Models.ExchangeModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

namespace GraphMAI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphStorageController : ControllerBase
    {
        private readonly IGraphRepository _repository;
        private readonly ILogger<GraphStorageController> _logger;
        public GraphStorageController(IGraphRepository repository, ILogger<GraphStorageController> logger)
        {
            _repository = repository;  
            _logger = logger;
        }


        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() 
        {
            var result = await _repository.GetAll<GraphEntity>()
                .Select(g => new { Id = g.Id, Name = g.Name })
                .ToArrayAsync();
            return Ok(result);
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var graph = await _repository.GetGraphByIdAsync(id);

                var result = graph.Edges.Select(e => new { Id = e.Id, From = e.From, To = e.To, Weight = e.Weight });
                return Ok(result);
            } 
            catch (ArgumentException ex)
            {
                _logger.LogWarning($"id: {id} was not found in DB");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Save([FromBody]GraphGetModel model)
        {
            try
            {
                var graph = new GraphEntity()
                {
                    Name = model.Name,
                    Edges = model.Edges.Select(e => new GraphEdge() { From = e.From, To = e.To, Weight = e.Weight }).ToList()
                };

                await _repository.AddGraphAsync(graph);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return BadRequest();
            }
        }

    }
}
