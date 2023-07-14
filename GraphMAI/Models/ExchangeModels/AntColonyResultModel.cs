namespace GraphMAI.Models.ExchangeModels
{
    public class AntColonyResultModel
    {
        public int length;

        public List<EdgeGetModel> edges;

        public AntColonyResultModel(HamiltonResultModel model, List<List<int>> matrix)
        {
            edges = new List<EdgeGetModel>();
            length = model.dlina;
            foreach (var edge in model.listOfEdge)
            {
                edges.Add(new EdgeGetModel() { From = edge.Item1, To = edge.Item2, Weight = matrix[edge.Item2][edge.Item2]});
            }
        }
    }
}
