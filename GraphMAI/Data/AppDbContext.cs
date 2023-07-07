using GraphMAI.Models;
using Microsoft.EntityFrameworkCore;

namespace GraphMAI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }
        
        public DbSet<GraphEntity> GraphEntities { get; set; }
        public DbSet<GraphEdge> Edges { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GraphEntity>().HasMany(g => g.Edges)
                .WithOne(e => e.Graph)
                .HasForeignKey(e => e.GraphId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Cascade);
            
        }
    }
}
