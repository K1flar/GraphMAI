namespace GraphMAI.Models.ExchangeModels
{
    public class AntColonyResultModel
    {
        public int length { get; set; }

        public List<EdgeGetModel> edges { get; set; }

        public AntColonyResultModel(HamiltonResultModel model, List<List<int>> matrix)
        {
            edges = new List<EdgeGetModel>();
            length = model.dlina;
            foreach (var edge in model.listOfEdge)
            {
                edges.Add(new EdgeGetModel() { From = edge.Item1 + 1, To = edge.Item2 + 1, Weight = matrix[edge.Item2][edge.Item2]});
            }
        }
    }
}
