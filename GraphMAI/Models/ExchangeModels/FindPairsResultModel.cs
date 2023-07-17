using Microsoft.Identity.Client;

namespace GraphMAI.Models.ExchangeModels
{
    public class FindPairsResultModel
    {
        public FindPairsResultModel(IEnumerable<(int,int)> values)
        {
            Edges = new List<EdgeGetModel> ();
            foreach (var item in values)
            {
                Edges.Add(new EdgeGetModel() { From = item.Item1 + 1, To = item.Item2 + 1, Weight = 1});
                Edges.Add(new EdgeGetModel() { From = item.Item2 + 1, To = item.Item1 + 1, Weight = 1});
            }
        }

        public List<EdgeGetModel> Edges { get; set; }


    }
}
