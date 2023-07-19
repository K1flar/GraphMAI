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

            if (!flag) return BadRequest("Граф не связен");

            int summ;
            var edg = Services.SearchSpanningTree.Kruskal(model, out summ, graph.GetCorrelatedMatrix().Count);

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

            if (!flag) return BadRequest("Граф не связен");

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

            if (!flag) return BadRequest("Граф не связен");

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
                if (isWeekConnected) result.iWeekComponents = "Граф связен";
                else result.iWeekComponents = "Граф не связен";

                result.WeekComponents = GraphFunctionality.GetСonnectivityComponentsByMatrix(graph.GetCorrelatedMatrix())
                    .Select(seq => seq.Select(n => n + 1));
                result.nWeekComponents = result.WeekComponents.Count();

                result.StrongComponents = GraphFunctionality.GetStrongСonnectivityComponents(graph.AdjacencyMatrix())
                    .Select(seq => seq.Select(n => n + 1));
                bool isStrongConnected = result.StrongComponents.Count() == 1;
                if (isStrongConnected) result.iStrongComponents = "Граф сильно связен";
                else result.iStrongComponents = "Граф сильно не связен";
                result.nStrongComponents = result.StrongComponents.Count();
                result.isDirected = true;
                return Ok(result);
            }
            else
            {
                bool isConnected = GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix());
                if (isConnected) result.iWeekComponents = "Граф связен";
                else result.iWeekComponents = "Граф не связен";
                result.WeekComponents = GraphFunctionality.GetСonnectivityComponentsByMatrix(graph.AdjacencyMatrix())
                    .Select(seq => seq.Select(n => n + 1));
                result.nWeekComponents = result.WeekComponents.Count();

                return Ok(result);
            }
        }

        [HttpPost("AntColony")]
        public IActionResult AntColony([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);

            if (graph.IsDirected()) return BadRequest("Граф должен быть не ориентированным");

            if (!graph.IsFull()) return BadRequest("Граф должен быть полным");

            var ans = new HamiltonResultModel();
            ans = SearchHamiltonCycle.Run(graph.AdjacencyMatrix(), 0.33,1,1,1,0.5,500);

            var result = new AntColonyResultModel(ans, graph.AdjacencyMatrix());
            return Ok(result);
        }

        [HttpPost("FindFlow")]
        public IActionResult FindFlow([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);

            if (!graph.IsDirected()) return BadRequest("Граф должен быть ориентированным");

            FlowChecker flowChecker = new FlowChecker(graph);

            if (!GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix()))
                return BadRequest("Граф не связен");

            if (flowChecker.GetSource() == -1 || flowChecker.GetSink() == -1) 
                return BadRequest("Источник или сток не найдены");

            if (flowChecker.HasCycle()) return BadRequest("Граф имеет цикл");


            var result = new FlowCheckerResultModel();
            int size = flowChecker.FindMaxFlow(out var matrix);
            result.Info = $"Максимальный поток от {flowChecker.GetSource() + 1} к {flowChecker.GetSink() + 1} -- {size}";

            for (int i = 0; i < matrix.Count; i++)
            {
                for (int j = 0; j < matrix.Count; j++)
                {
                    if (graph.IsEdge(i, j))
                        result.edges.Add(new EdgeGetModel() { From = i + 1, To = j + 1, Weight = matrix[j][i] });
                }
            }

            return Ok(result);
        }

        [HttpPost("FindPairs")]
        public IActionResult FindPairs([FromBody] List<EdgeGetModel> model)
        {
            Graph graph = new Graph(model);

            //if (!GraphFunctionality.IsMatrixСonnected(graph.GetCorrelatedMatrix()))
            //    return BadRequest("Граф должен быть связен");

            var pairChecker = new PairsChecker(graph);

            if (!pairChecker._isGraphBipartite) return BadRequest("Граф должен быть двудольным");

            var ans = pairChecker.FindMaxMatching();

            var result = new FindPairsResultModel(ans);

            return Ok(result);
        }

    }
}
