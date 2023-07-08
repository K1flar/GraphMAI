namespace GraphMAI.Models.ExchangeModels
{
    public class EdgeGetModel
    {
        public int From { get; set; }
        public int To { get; set; }
        public int Weight { get; set; } = 1;
    }
}
