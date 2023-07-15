namespace GraphMAI.Models.ExchangeModels
{
    public class SpanningTreeResultModel
    {
        public int summ { get; set; }

        public List<EdgeGetModel> edges { get; set; }

        public SpanningTreeResultModel()
        {
            edges= new List<EdgeGetModel>();
            summ = 0;
        }
    }
}
