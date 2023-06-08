import { Grafo } from "./grafo";

// Criar um objeto Grafo
const grafo = new Grafo();

// Adicionar vértices
grafo.adicionarVertice(1);
grafo.adicionarVertice(2);
grafo.adicionarVertice(3);
grafo.adicionarVertice(4);

// Adicionar arestas
grafo.adicionarAresta(1, 2);
grafo.adicionarAresta(2, 3);
grafo.adicionarAresta(3, 4);
grafo.adicionarAresta(4, 1);

// Exibir o número de vértices e arestas
console.log('Número de vértices:', grafo.vertices);
console.log('Número de arestas:', grafo.arestas);

// Remover um vértice e uma aresta
grafo.removerVertice(3);
grafo.removerAresta(4, 1);

// Exibir o número de vértices e arestas após a remoção
console.log('Número de vértices:', grafo.vertices);
console.log('Número de arestas:', grafo.arestas);
