namespace GraphMAI.Models.ExchangeModels
{
    public class SpanningTreeResultModel
    {
        public int summ;

        public List<EdgeGetModel> edges;

        public SpanningTreeResultModel()
        {
            edges= new List<EdgeGetModel>();
            summ = 0;
        }
    }
}
