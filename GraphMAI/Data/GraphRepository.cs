using GraphMAI.Models;
using Microsoft.EntityFrameworkCore;

namespace GraphMAI.Data
{
    public class GraphRepository : IGraphRepository
    {
        private readonly AppDbContext _context;
        public GraphRepository(AppDbContext context)
        {
            _context = context;
        }
        public IQueryable<TEntity> GetAll<TEntity>() where TEntity : class
            => _context.Set<TEntity>().Select(q => q);

        public async Task<GraphEntity> GetGraphByIdAsync(int id)
        {
            var result = await GetAll<GraphEntity>().FirstOrDefaultAsync(g => g.Id == id);
            if (result == null) throw new ArgumentException($"There is no GraphEntity with id: {id}");
            return result;
        }
        
        public async Task AddGraphAsync(GraphEntity graph)
        {
            await _context.GraphEntities.AddAsync(graph);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteGraphByIdAsync(int graphId)
        {
            var graph = await GetGraphByIdAsync(graphId);
            _context.GraphEntities.Remove(graph);
            await _context.SaveChangesAsync();
        }  
    }
}
