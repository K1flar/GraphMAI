namespace GraphMAI.Models
{
    public class GraphEntity
    {
        public int Id { get; set; } 
        public string Name { get; set; }

        public List<GraphEdge> Edges { get; set; }
    }
}
