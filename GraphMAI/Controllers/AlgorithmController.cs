using GraphMAI.Models.ExchangeModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GraphMAI.Services;
using GraphMAI.Models;
using Microsoft.Identity.Client;

namespace GraphMAI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlgorithmController : ControllerBase
    {

        [HttpPost("Kruskal")]
        public IActionResult Kruskal([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);
            bool flag = GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix());

            if (!flag) return BadRequest("Graph is not connected");

            int summ;
            var edg = Services.SearchSpanningTree.Kruskal(model, out summ);

            var corEd = new List<EdgeGetModel>();
            foreach (var edge in edg)
            {
                corEd.Add(new EdgeGetModel() { From = edge[0], To = edge[1], Weight = edge[2]});
            }
            SpanningTreeResultModel result = new SpanningTreeResultModel();
            result.summ = summ;
            result.edges = corEd;

            return Ok(result);
        }

        [HttpPost("Prim")]
        public IActionResult Prim([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);

            bool flag = GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix());

            if (!flag) return BadRequest("Graph is not connected");

            int summ;
            var edg = Services.SearchSpanningTree.Prim(graph.GetCorrelatedMatrix(), out summ);
            var corEd = new List<EdgeGetModel>();

            foreach (var edge in edg)
            {
                corEd.Add(new EdgeGetModel() { From = edge[0], To = edge[1], Weight = edge[2] });
            }

            SpanningTreeResultModel result = new SpanningTreeResultModel();
            result.summ = summ;
            result.edges = corEd;

            return Ok(result);
        }

        [HttpPost("Boruvka")]
        public IActionResult Boruvka([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);

            bool flag = GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix());

            if (!flag) return BadRequest("Graph is not connected");

            int summ;
            var edg = Services.SearchSpanningTree.Boruvka(graph.GetCorrelatedMatrix(), out summ);
            var corEd = new List<EdgeGetModel>();

            foreach (var edge in edg)
            {
                corEd.Add(new EdgeGetModel() { From = edge[0], To = edge[1], Weight = edge[2] });
            }

            SpanningTreeResultModel result = new SpanningTreeResultModel();
            result.summ = summ;
            result.edges = corEd;

            return Ok(result);
        }

        [HttpPost("CheckerConnectivity")]
        public IActionResult CheckerConnectivity([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);
            GraphConnectivityResultModel result = new GraphConnectivityResultModel();

            if (graph.IsDirected())
            {
                bool isWeekConnected = GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix());
                if (isWeekConnected) result.iWeekComponents = "Граф слабо связен";
                else result.iWeekComponents = "Граф не связен";

                result.WeekComponents = GraphFunctionality.GetСonnectivityComponentsByMatrix(graph.GetCorrelatedMatrix());
                result.nWeekComponents = result.WeekComponents.Count();

                result.StrongComponents = GraphFunctionality.GetStrongСonnectivityComponents(graph.AdjacencyMatrix());
                bool isStrongConnected = result.StrongComponents.Count() == 1;
                if (isStrongConnected) result.iStrongComponents = "Граф сильно связен";
                else result.iStrongComponents = "Граф сильно не связен";
                result.nStrongComponents = result.StrongComponents.Count();

                return Ok(result);
            }
            else
            {
                bool isConnected = GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix());
                if (isConnected) result.iWeekComponents = "Граф связен";
                else result.iWeekComponents = "Граф не связен";
                result.WeekComponents = GraphFunctionality.GetСonnectivityComponentsByMatrix(graph.AdjacencyMatrix());
                result.nWeekComponents = result.WeekComponents.Count();

                return Ok(result);
            }
        }

        [HttpPost("AntColony")]
        public IActionResult AntColony([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);

            if (graph.IsDirected()) return BadRequest("Graph must be undirected");

            if (!graph.IsFull()) return BadRequest("Graph must be full");

            var ans = new HamiltonResultModel();
            ans = SearchHamiltonCycle.Run(graph.AdjacencyMatrix(), 0.33,1,1,1,0.5,500);

            var result = new AntColonyResultModel(ans, graph.AdjacencyMatrix());
            return Ok(result);
        }

        [HttpPost("FindFlow")]
        public IActionResult FindFlow([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);

            if (!graph.IsDirected()) return BadRequest("Graph must be directed");

            FlowChecker flowChecker = new FlowChecker(graph);

            if (flowChecker._source == -1 || flowChecker._sink == -1) 
                return BadRequest("Not found source or sink");

            if (!GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix()))
                return BadRequest("Graph is not connected");

            if (flowChecker.HasCycle()) return BadRequest("Graph has cycle");


            var result = new FlowCheckerResultModel();
            result.Info = $"Max flow from {flowChecker.GetSource()} to {flowChecker.GetSink()}";
            result.Size = flowChecker.FindMaxFlow(out var matrix);

            for (int i = 0; i < matrix.Count; i++)
            {
                for (int j = 0; j < matrix.Count; j++)
                {
                    if (matrix[i][j] != 0)
                        result.edges.Add(new EdgeGetModel() { From = i, To = j, Weight = matrix[i][j] });
                }
            }

            return Ok(result);
        }

        [HttpPost("FindPairs")]
        public IActionResult FindPairs([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);

            if (!GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix()))
                return BadRequest("Graph must be connected");

            var pairChecker = new PairsChecker(graph);

            if (!pairChecker._isGraphBipartite) return BadRequest("Graph must be bipartite");

            var ans = pairChecker.FindMaxMatching();

            var result = new FindPairsResultModel(ans);

            return Ok(result);
        }

    }
}
