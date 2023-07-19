using GraphMAI.Models.ExchangeModels;

namespace GraphMAI.Models
{
    public class Graph
    {
        public List<List<int>> _matrix;

        public Graph(List<EdgeGetModel> edges)
        {
            int firstPar = edges.Select(e => e.From).Max();
            int secondPar = edges.Select(e => e.To).Max();
            int max = Math.Max(firstPar, secondPar);

            var result = CreateEmptyMatrix(max);

            bool haveWeight = edges.Select(e => e.Weight).Max() != 1 ? true : false;

            foreach (var a in edges)
            {
                result[a.From - 1][a.To - 1] = a.Weight;
            }

            _matrix = new List<List<int>>(result);
        }

        public Graph(List<List<int>> matrix)
        {
            _matrix = new List<List<int>>(matrix);
        }

        public bool IsDirected()
        {
            for (int i = 0; i < _matrix.Count; i++)
            {
                for (int j = i; j < _matrix.Count; j++)
                {
                    if (_matrix[i][j] != _matrix[j][i]) return true;
                }
            }

            return false;
        }
        public List<List<int>> AdjacencyMatrix() => _matrix.Select(l => l.ToList()).ToList();

        public List<List<int>> GetCorrelatedMatrix()
        {
            var result = AdjacencyMatrix();

            if (!IsDirected()) return result;

            for (int i = 0; i < result.Count; i++)
            {
                for (int j = 0; j < result.Count; j++)
                {
                    if (IsEdge(i, j))
                        result[j][i] = result[i][j];
                }
            }

            return result;
        }

        public bool IsEdge(int v1, int v2)
        {
            if (v1 > _matrix.Count || v2 > _matrix.Count || v1 < 0 || v2 < 0)
                throw new Exception($"Обращение к несуществующей вершине! Обращение к {v1}, {v2}");

            return _matrix[v1][v2] != 0;
        }

        public bool IsFull()
        {
            for (int i = 0; i < _matrix.Count; i++)
            {
                for (int j = 0; j < _matrix.Count; j++)
                {
                    if (i != j)
                    {
                        if (_matrix[i][j] == 0) return false;
                    }
                }
            }
            return true;
        }

        public static List<List<int>> CreateEmptyMatrix(int size)
        {
            var result = new List<List<int>>();
            for (int i = 0; i < size; i++)
            {
                var list = new List<int>();
                for (int j = 0; j < size; j++)
                {
                    list.Add(0);
                }

                result.Add(list);
            }

            return result;
        }


    }
}
