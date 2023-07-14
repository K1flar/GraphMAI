namespace GraphMAI.Models.ExchangeModels
{
    public class FlowCheckerResultModel
    {
        public string Info;
        public int Size;

        public List<EdgeGetModel> edges;

        public FlowCheckerResultModel()
        {
            edges= new List<EdgeGetModel>();
            Size = 0;
        }
    }
}
