namespace GraphMAI.Models.ExchangeModels
{
    public class FlowCheckerResultModel
    {
        public string Info { get; set; }
        public int Size { get; set; }

        public List<EdgeGetModel> edges { get; set; }

        public FlowCheckerResultModel()
        {
            edges= new List<EdgeGetModel>();
            Size = 0;
        }
    }
}
