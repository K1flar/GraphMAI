using GraphMAI.Models.ExchangeModels;

namespace GraphMAI.Services
{
    public static class SearchHamiltonCycle
    {
        public static HamiltonResultModel Run(List<List<int>> _matix, double Q, double alfa, double beta, double p, double startph, int countiter)
        {
            double[,] phermone = new double[_matix.Count, _matix.Count];
            // заполнил фермоны начальным значением
            for (int i = 0; i < _matix.Count; i++)
            {
                for (int j = 0; j < _matix.Count; j++)
                {
                    phermone[i, j] = startph;
                }
            }

            int n = countiter;
            int countVertex = _matix.Count;

            // кол-во итераций
            while (n != 0)
            {
                List<HamiltonResultModel> results = new List<HamiltonResultModel>();

                // i начальная вершина откуда муравей пойдет
                for (int i = 0; i < _matix.Count; i++)
                {
                    var hs = new HashSet<int>();
                    hs.Add(i);

                    var res = new HamiltonResultModel();

                    int howmuch = countVertex - 1; // скок ребер муравьи обойти, кроме последнего
                    int now = i; // в какой вершине мы находимся

                    while (howmuch != 0)
                    {
                        // Item1 - номер вершины, Item2 - вероятность в нее пойти
                        List<(int, double)> nextVertex = new List<(int, double)>();

                        // посчитаем знаменатель вероятности
                        double znamenatel = 0;
                        for (int m = 0; m < _matix.Count; m++)
                        {
                            if (now == m) continue;
                            if (hs.Contains(m)) continue;
                            znamenatel += Math.Pow(phermone[now, m], alfa) * Math.Pow((4 / (double)_matix[now][m]), beta);
                        }

                        // считаем вероятности до всех следующих вершин
                        for (int j = 0; j < _matix.Count; j++)
                        {
                            if (j == now) continue;
                            if (hs.Contains(j)) continue;

                            // числитель вероятности
                            double chislitel = Math.Pow(phermone[now, j], alfa) * Math.Pow((4 / (double)_matix[now][j]), beta); // фермоны на ребре * близость

                            nextVertex.Add((j, chislitel / znamenatel));
                        }

                        // пойти в вершину - добавить ее в hs, обновить now, записать путь в result

                        Random random = new Random();
                        double rand = random.NextDouble();
                        double st = 0;

                        // выбираем следующую вершину рандомно, основываясь на вероятностях
                        foreach (var item in nextVertex)
                        {
                            st += item.Item2;
                            if (st >= rand)
                            {
                                res.listOfEdge.Add((now, item.Item1));
                                res.listOfEdge.Add((item.Item1, now));
                                res.dlina += _matix[now][item.Item1];

                                now = item.Item1;
                                hs.Add(now);
                                break;
                            }

                        }

                        howmuch--;
                    }
                    res.listOfEdge.Add((now, i));
                    res.listOfEdge.Add((i, now));
                    res.dlina += _matix[now][i];
                    results.Add(res);
                }


                // обновляем феромоны
                for (int i = 0; i < _matix.Count; i++)
                {
                    for (int j = 0; j < _matix.Count; j++)
                    {
                        phermone[i, j] = p * phermone[i, j];
                    }
                }

                foreach (var item in results)
                {
                    foreach (var edge in item.listOfEdge)
                    {
                        phermone[edge.Item1, edge.Item2] += (Q / item.dlina);
                        phermone[edge.Item2, edge.Item1] += (Q / item.dlina);
                    }
                }

                n--;
                if (n == 0)
                {
                    int min = int.MaxValue;
                    var ress = new HamiltonResultModel();

                    foreach (var item in results)
                    {
                        if (item.dlina < min)
                        {
                            min = item.dlina;
                            ress = item;
                        }
                    }
                    return ress;
                }

            }

            return null;

        }
    }
}
