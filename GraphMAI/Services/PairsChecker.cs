using GraphMAI.Extentions;
using GraphMAI.Models;

namespace GraphMAI.Services
{
    public class PairsChecker
    {
        private readonly List<List<int>> _matrix;
        private readonly Graph _graph;
        public readonly bool _isGraphBipartite;
        private readonly int[] _colors;
        public PairsChecker(Graph graph)
        {
            _graph = graph;
            _matrix = graph.GetCorrelatedMatrix();
            _colors = new int[_matrix.Count];
            _isGraphBipartite = IsGraphBipartite(0, 1, _colors);
        }

        public IEnumerable<(int, int)> FindMaxMatching()
        {
            MakeDirected();
            AddSourseAndSink();

            var modifiedGraph = new Graph(_matrix);
            var flowChecker = new FlowChecker(modifiedGraph);

            flowChecker.FindMaxFlow(out var resultMatrix);

            resultMatrix.RemoveRange(resultMatrix.Count - 3, 2);

            for (int i = 0; i < resultMatrix.Count; i++)
            {
                for (int j = 0; j < resultMatrix.Count; j++)
                {
                    if (resultMatrix[j][i] == 1 && modifiedGraph.IsEdge(i, j))
                    {
                        yield return (j + 1, i + 1);
                    }
                }
            }
        }
        private void MakeDirected()
        {
            for (int i = 0; i < _matrix.Count; i++)
            {
                for (int j = 0; j < _matrix.Count; j++)
                {
                    if (/*_graph.IsEdge(i, j)*/_matrix[i][j] != 0 & _colors[i] != 1 & _colors[j] == 1)
                    {
                        _matrix[j][i] = 0;
                    }
                }
            }
        }
        private void AddSourseAndSink()
        {
            for (int i = 0; i < _matrix.Count; i++)
            {
                if (_colors[i] == 1)
                {
                    _matrix[i].Add(1);
                }
                else
                {
                    _matrix[i].Add(0);
                }
            }

            var sinkLine = new List<int>(_matrix.Count + 2);
            for (int i = 0; i < _matrix.Count + 1; i++) sinkLine.Add(0);
            _matrix.Add(sinkLine);

            foreach (var list in _matrix)
            {
                list.Add(0);
            }

            var sourceLine = new List<int>(_matrix.Count + 2);
            _matrix.Add(sourceLine);

            for (int i = 0; i < _matrix.Count; i++)
            {
                if (i < _colors.Length)
                {
                    if (_colors[i] != 1)
                        sourceLine.Add(1);
                    else
                        sourceLine.Add(0);
                }
                else
                {
                    sourceLine.Add(0);
                }
            }
        }

        private bool IsGraphBipartite(int v, int color, int[] colors)
        {
            var components = GraphFunctionality.GetСonnectivityComponentsByMatrix(_matrix);
            bool result = true;

            foreach(var component in components)
            {
                if(!IsComponentBipartite(component.FirstOrDefault(), color, colors)) 
                    result = false;
            }

            return result;
        }

        private bool IsComponentBipartite(int v, int color, int[] colors)
        {
            colors[v] = color;

            foreach (var u in _matrix.AdjacencyList(v))
            {
                if (colors[u] == 0)
                {
                    IsComponentBipartite(u, InvertColor(color), colors);
                }
                else if (colors[u] == color)
                {
                    return false;
                }
            }

            return true;
        }

        private int InvertColor(int color) => color == 1 ? 2 : 1;
    }
}
