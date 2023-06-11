import { GrafoLib } from "./models/GrafoLib";

// Criar um objeto Grafo
const grafo = new GrafoLib();

// Adicionar vértices
grafo.adicionarVertice();
grafo.adicionarVertice();
grafo.adicionarVertice();
grafo.adicionarVertice();

grafo.exibirGrafo()
// Adicionar arestas
grafo.adicionarAresta(1, 2);
grafo.adicionarAresta(2, 3);
grafo.adicionarAresta(3, 4);
grafo.adicionarAresta(4, 1);

grafo.exibirGrafo()
grafo.grauVertice(2)
// Remover um vértice e uma aresta
grafo.removerVertice(3);
grafo.removerAresta(4, 1);

grafo.exibirGrafo();