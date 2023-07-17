using Microsoft.Identity.Client;

namespace GraphMAI.Models.ExchangeModels
{
    public class GraphConnectivityResultModel
    {
        public IEnumerable<IEnumerable<int>> StrongComponents { get; set; }

        public IEnumerable<IEnumerable<int>> WeekComponents { get; set; }
        public bool isDirected { get; set; }

        public int nStrongComponents { get; set; }
        public int nWeekComponents {get; set; }

        public string iStrongComponents { get; set; }
        public string iWeekComponents { get; set; }

        public GraphConnectivityResultModel()
        {
            StrongComponents= new List<IEnumerable<int>>();
            WeekComponents= new List<IEnumerable<int>>();
            nStrongComponents = 0;
            nWeekComponents = 0;
            iStrongComponents = "";
            iWeekComponents = "";
            isDirected= false;

        }
    }
}
