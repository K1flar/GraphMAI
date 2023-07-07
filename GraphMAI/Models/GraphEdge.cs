namespace GraphMAI.Models
{
    public class GraphEdge
    {
        public int Id { get; set; }
        public int From { get; set; }
        public int To { get; set; }
        public double Weight { get; set; } = 1;

        public int GraphId { get; set; }
        public GraphEntity? Graph { get; set; }
    }
}
