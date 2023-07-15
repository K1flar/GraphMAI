using GraphMAI.Models.ExchangeModels;

namespace GraphMAI.Services
{
    public static class SearchSpanningTree
    {
        public static List<List<int>> Kruskal(List<EdgeGetModel> edg, out int summ)
        {
            int n = edg.Count;
            var sets = new int[n];
            int summa = 0;

            for (int i = 0; i < n; i++)
            {
                sets[i] = i;
            }

            var edges = new List<Tuple<int, int, int>>();

            foreach (var item in edg)
            {
                edges.Add(new Tuple<int, int, int>(item.From, item.To, item.Weight));
            }

            // сортируем список ребер по весу
            edges.Sort((x, y) => x.Item3.CompareTo(y.Item3));

            var result = new List<List<int>>();

            // бегаем по отсортированному списку ребер и если обе вершины не связны, то добавляем ребро в список
            foreach (var edge in edges)
            {
                int set1 = sets[edge.Item1 - 1];
                int set2 = sets[edge.Item2 - 1];

                if (set1 != set2)
                {
                    result.Add(new List<int> { edge.Item1 + 1, edge.Item2 + 1, edge.Item3 });
                    summa += edge.Item3;

                    for (int i = 0; i < n; i++)
                    {
                        if (sets[i] == set2)
                        {
                            sets[i] = set1;
                        }
                    }
                }

            }

            summ = summa;
            return result;

        }

        public static List<List<int>> Prim(List<List<int>> _matrix, out int summ)
        {
            int summa = 0;

            // Создаем список, который будет содержать все ребра остовного дерева
            var mst = new List<List<int>>();

            // Создаем список для хранения вершин, которые уже включены в остовное дерево
            var visited = new HashSet<int>();

            // Для начала выбираем первую вершину графа в качестве стартовой
            visited.Add(0);

            // список ребер
            var edges = new List<Tuple<int, int, int>>();

            int n = _matrix.Count;

            // матрицу смежности переводим в список ребер
            for (int i = 0; i < n; i++)
            {
                for (int j = i + 1; j < n; j++)
                {
                    if (_matrix[i][j] != 0)
                    {
                        edges.Add(new Tuple<int, int, int>(i, j, _matrix[i][j]));

                    }
                }
            }

            // Пока не включим в остовное дерево все вершины графа
            while (visited.Count < _matrix.Count)
            {
                // Создаем переменные для хранения минимального веса и соответствующего ему ребра
                int minWeight = int.MaxValue;
                int u = -1;
                int v = -1;

                foreach (var edge in edges)
                {
                    if ((edge.Item3 < minWeight) &&
                        (visited.Contains(edge.Item1) || visited.Contains(edge.Item2)) &&
                        (!visited.Contains(edge.Item1) || !visited.Contains(edge.Item2)))
                    {
                        minWeight = edge.Item3;
                        u = edge.Item1;
                        v = edge.Item2;
                    }
                }

                // Добавляем найденное ребро в список остовного дерева
                mst.Add(new List<int>() { u + 1, v + 1, minWeight });
                summa += minWeight;

                // Добавляем новую вершину в visited
                visited.Add(v);
                visited.Add(u);
            }
            summ = summa;
            return mst;
        }


        public static List<List<int>> Boruvka(List<List<int>> _matrix, out int summ)
        {
            int summa = 0;
            int n = _matrix.Count;
            List<List<int>> mst = new List<List<int>>();

            // список ребер
            var edges = new List<List<int>>();

            // матрицу смежности переводим в список ребер
            for (int i = 0; i < n; i++)
            {
                for (int j = i + 1; j < n; j++)
                {
                    if (_matrix[i][j] != 0)
                    {
                        edges.Add(new List<int> { i, j, _matrix[i][j] });
                    }
                }
            }

            int[] colors = new int[_matrix.Count];
            for (int i = 0; i < _matrix.Count; i++) colors[i] = i;

            // количество компонент связности
            int countTree = colors.Length;

            while (countTree > 1)
            {
                // номера минимальных ребер для каждой компоненты связности
                int[] numMinEdges = new int[_matrix.Count];
                for (int i = 0; i < n; i++) numMinEdges[i] = -1;

                for (int i = 0; i < edges.Count; i++)
                {
                    var e = edges[i];

                    if (colors[e[0]] == colors[e[1]]) continue;

                    // находим принадлежность вершины u к компоненте
                    int r_u = colors[e[0]];

                    // обновляем минимальное ребро у компоненты
                    if (numMinEdges[r_u] == -1 || e[2] < edges[numMinEdges[r_u]][2])
                        numMinEdges[r_u] = i;

                    // находим принадлежность вершины u к компоненте
                    int r_v = colors[e[1]];

                    // обновляем минимальное ребро у компоненты
                    if (numMinEdges[r_v] == -1 || e[2] < edges[numMinEdges[r_v]][2])
                        numMinEdges[r_v] = i;

                }

                // добавление минимальных ребер к каждой компоненте (слияние компонент)
                for (int i = 0; i < _matrix.Count; i++)
                {
                    if (numMinEdges[i] != -1)
                    {
                        // узнаем принадлежность к компонентам у обоих вершин из ребра
                        int r_u = colors[edges[numMinEdges[i]][0]];
                        int r_v = colors[edges[numMinEdges[i]][1]];
                        if (r_u == r_v) continue; // случай когда ребро принадлежит одной компоненте - не подходит

                        // производим слияние компонент
                        for (int j = 0; j < n; j++)
                            if (colors[j] == r_v) colors[j] = r_u;

                        mst.Add(new List<int> { edges[numMinEdges[i]][0] + 1,
                            edges[numMinEdges[i]][1] + 1, edges[numMinEdges[i]][2]});
                        summa += edges[numMinEdges[i]][2];

                        countTree--;
                    }
                }

            }

            summ = summa;
            return mst;
        }


    }
}
