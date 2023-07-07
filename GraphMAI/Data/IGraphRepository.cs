using GraphMAI.Models;

namespace GraphMAI.Data
{
    public interface IGraphRepository
    {
        public IQueryable<TEntity> GetAll<TEntity>() where TEntity : class;

        public Task<GraphEntity> GetGraphByIdAsync(int id);
        public Task AddGraphAsync(GraphEntity graph);
        public Task DeleteGraphByIdAsync(int graphId);
    }
}
