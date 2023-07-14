namespace GraphMAI.Extentions
{
    public static class MatrixExtentions
    {
        public static IEnumerable<int> AdjacencyList(this List<List<int>> matrix, int v)
        {
            if (v < 0 || v > matrix.Count) throw new Exception($"Обращение к несуществующей вершине!Обращение к {v}");

            for (int i = 0; i < matrix.Count; i++)
            {
                if (matrix[v][i] != 0) yield return i;
            }
        }

        public static List<List<int>> Transpose(this List<List<int>> matrix)
        {
            var transposeMatrix = matrix.Select(l => l.ToList()).ToList();

            for (int i = 0; i < transposeMatrix.Count; i++)
            {
                for (int j = i; j < transposeMatrix.Count; j++)
                {
                    int temp = transposeMatrix[i][j];
                    transposeMatrix[i][j] = transposeMatrix[j][i];
                    transposeMatrix[j][i] = temp;
                }
            }

            return transposeMatrix;
        }
    }
}
