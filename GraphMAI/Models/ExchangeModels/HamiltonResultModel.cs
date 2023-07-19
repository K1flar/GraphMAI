namespace GraphMAI.Models.ExchangeModels
{
    public class HamiltonResultModel
    {
        public List<(int, int)> listOfEdge;

        public int dlina;

        public HamiltonResultModel()
        {
            listOfEdge = new List<(int, int)>();
            dlina = 0;
        }
    }
}
