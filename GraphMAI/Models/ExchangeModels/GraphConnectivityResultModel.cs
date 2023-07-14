using Microsoft.Identity.Client;

namespace GraphMAI.Models.ExchangeModels
{
    public class GraphConnectivityResultModel
    {
        public IEnumerable<IEnumerable<int>> StrongComponents;

        public IEnumerable<IEnumerable<int>> WeekComponents;

        public int nStrongComponents;
        public int nWeekComponents;

        public string iStrongComponents;
        public string iWeekComponents;

        public GraphConnectivityResultModel()
        {
            StrongComponents= new List<IEnumerable<int>>();
            WeekComponents= new List<IEnumerable<int>>();
            nStrongComponents = 0;
            nWeekComponents = 0;

        }
    }
}
