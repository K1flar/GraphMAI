using GraphMAI.Extentions;
using GraphMAI.Models;

namespace GraphMAI.Services
{
    public class FlowChecker
    {
        private readonly Graph _graph;
        private readonly List<List<int>> _matrix;
        private readonly int _source;
        private readonly int _sink;
        public FlowChecker(Graph graph)
        {
            _graph = graph;
            _matrix = graph.AdjacencyMatrix();
            _source = FindSource(_matrix);
            _sink = FindSink(_matrix);

        }

        public bool HasCycle()
        {
            for (int i = 0; i < _matrix.Count; i++)
            {
                for (int j = 0; j < _matrix.Count; j++)
                {
                    if (_matrix[i][j] != 0 && _matrix[j][j] != 0)
                        return true;
                }
            }
            return false;
        }

        public int GetSource() => _source;

        public int GetSink() => _sink;

        public int FindMaxFlow(out List<List<int>> maxFlowMatrix)
        {
            while (true)
            {
                var wayToSink = FirstWayToSink(_matrix);
                if (!wayToSink.Any()) { break; }
                int minWeight = wayToSink.Min(e => e.weight);

                foreach (var edge in wayToSink)
                {
                    if (_graph.IsEdge(edge.v, edge.u))
                    {
                        _matrix[edge.v][edge.u] -= minWeight;
                        _matrix[edge.u][edge.v] += minWeight;
                    }
                    else
                    {
                        _matrix[edge.v][edge.u] += minWeight;
                        _matrix[edge.u][edge.v] -= minWeight;
                    }
                }
            }

            maxFlowMatrix = _matrix.Select(l => l.ToList()).ToList();
            return _matrix[_sink].Sum();
        }

        private IEnumerable<(int v, int u, int weight)> FirstWayToSink(List<List<int>> matrix)
        {
            var result = new List<int>();
            var queue = new Queue<int>();
            var used = new bool[matrix.Count];
            var parents = new int[matrix.Count];

            queue.Enqueue(_source);
            used[_source] = true;
            parents[_source] = _source;

            bool isSinkFind = false;

            while (queue.Any())
            {
                int currentVertex = queue.Dequeue();

                var neighbors = matrix.AdjacencyList(currentVertex).Where(v => !used[v]);

                foreach (var n in neighbors)
                {
                    queue.Enqueue(n);
                    used[n] = true;
                    parents[n] = currentVertex;

                    if (n == _sink)
                    {
                        isSinkFind = true;
                        break;
                    }
                }

                if (isSinkFind) { break; }
            }

            if (!isSinkFind) { return new List<(int, int, int)>(); }

            int stepVertex = _sink;
            while (stepVertex != _source)
            {
                result.Add(stepVertex);
                stepVertex = parents[stepVertex];
            }
            result.Add(_source);
            result.Reverse();

            var resultInEdges = new List<(int v, int u, int weight)>();

            for (int i = 0; i < result.Count - 1; i++)
            {
                resultInEdges.Add((v: result[i], u: result[i + 1], weight: matrix[result[i]][result[i + 1]]));
            }

            return resultInEdges;
        }

        private static int FindSource(List<List<int>> matrix)
        {
            for (int j = 0; j < matrix.Count; j++)
            {
                bool isItSource = true;

                for (int i = 0; i < matrix.Count; i++)
                {
                    if (matrix[i][j] > 0)
                    {
                        isItSource = false;
                    }
                }

                if (isItSource) { return j; }
            }

            return -1;
        }

        private static int FindSink(List<List<int>> matrix)
        {
            for (int i = 0; i < matrix.Count; i++)
            {
                var edgesFrom = matrix[i].Where(n => n > 0);

                if (!edgesFrom.Any())
                {
                    return i;
                }
            }

            return -1;
        }
    }
}
