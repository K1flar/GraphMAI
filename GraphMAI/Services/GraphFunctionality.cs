using GraphMAI.Extentions;
using GraphMAI.Models.ExchangeModels;

namespace GraphMAI.Services
{
    public static class GraphFunctionality
    {
        public static IEnumerable<IEnumerable<int>> GetStrongСonnectivityComponents(List<List<int>> _graphMatrix)
        {
            var result = new List<IEnumerable<int>>();
            var counters = new int[_graphMatrix.Count];
            var updatedCounters = new int[_graphMatrix.Count];
            var allVertexes = new List<int>();
            var reversiveGraphMatrix = _graphMatrix.Transpose();
            int counter = 0;

            for (int i = 0; i < _graphMatrix.Count; i++) { allVertexes.Add(i); };

            while (allVertexes.Any())
            {
                var dfsResult = DFSWithCounters(allVertexes.First(), ref counter, counters, _graphMatrix);
                foreach (var v in dfsResult) { allVertexes.Remove(v); }
            }

            for (int i = 0; i < _graphMatrix.Count; i++) { allVertexes.Add(i); };
            counter = 0;

            while (allVertexes.Any())
            {
                var vertexInOneComponent = DFSWithCounters(counters.MaxValueIndex(), ref counter, updatedCounters, reversiveGraphMatrix);
                result.Add(vertexInOneComponent);
                foreach (var v in vertexInOneComponent)
                {
                    allVertexes.Remove(v);
                    counters[v] = 0;
                }
            }

            return result;
        }

        public static IEnumerable<int> DFSWithCounters(int vertex, ref int counter, int[] counters, List<List<int>> matrix)
        {
            var vertexes = new List<int>();
            var stack = new Stack<int>();

            stack.Push(vertex);
            while (stack.Any())
            {
                int currentVertex = stack.Pop();

                if (counters[currentVertex] == 0) vertexes.Add(currentVertex);
                counters[currentVertex] = ++counter;

                var neigbors = matrix.AdjacencyList(currentVertex).Where(v => counters[v] == 0);
                foreach (var v in neigbors)
                {
                    stack.Push(currentVertex);
                    stack.Push(v);
                    break;
                }
            }

            return vertexes;
        }

        public static IEnumerable<IEnumerable<int>> GetСonnectivityComponentsByMatrix(List<List<int>> matrix)
        {
            var result = new List<IEnumerable<int>>();
            var allVertex = new List<int>();
            for (int i = 0; i < matrix.Count; i++) { allVertex.Add(i); }

            if (IsMatrixСonnected(matrix))
            {
                result.Add(allVertex);
                return result;
            }

            while (allVertex.Any())
            {
                var vertexInOneComponent = BFS(allVertex.First(), matrix);

                result.Add(vertexInOneComponent);

                foreach (var v in vertexInOneComponent)
                    allVertex.Remove(v);
            }

            return result;

        }

        public static bool IsMatrixСonnected(List<List<int>> matrix)
        {
            var vertexInOneComponent = BFS(0, matrix);

            if (vertexInOneComponent.Count() == matrix.Count)
                return true;

            return false;
        }

        public static IEnumerable<int> BFS(int vertex, List<List<int>> matrix)
        {
            var result = new List<int>();
            var queue = new Queue<int>();

            queue.Enqueue(vertex);
            result.Add(vertex);
            while (queue.Any())
            {
                int currentVertex = queue.Dequeue();

                var neighbors = matrix.AdjacencyList(currentVertex).Where(v => !result.Contains(v));

                foreach (var v in neighbors)
                {
                    queue.Enqueue(v);
                    result.Add(v);
                }
            }

            return result;
        }

        

        

        


    }
}
