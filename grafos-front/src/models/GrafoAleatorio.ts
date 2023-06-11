import { DataSet } from "vis-network/standalone";
import { GrafoLib } from "./GrafoLib";

interface Vertice {
  id: number;
  label: string;
}

interface Aresta {
  id: number;
  from: number;
  to: number;
}

interface GrafoVisNetwork {
  nodes: DataSet<Vertice, "id">;
  edges: DataSet<Aresta, "id">;
}

function aleatorio(limiteInferior: number, limiteSuperior: number): [number, number] {
  const numero1 = Math.floor(Math.random() * (limiteSuperior - limiteInferior + 1)) + limiteInferior;
  const numero2 = Math.floor(Math.random() * (limiteSuperior - limiteInferior + 1)) + limiteInferior;

  return [numero1, numero2];
}

export default function GrafoAleatorio(): [GrafoVisNetwork, GrafoLib] {
  const [numVertices, numArestas] = aleatorio(7, 18);
  const grafo = new GrafoLib();
  const nodes = new DataSet<Vertice, "id">();
  const edges = new DataSet<Aresta, "id">();
  let arestaId = 1;

  // Adicionar vértices
  for (let i = 0; i < numVertices; i++) {
    const verticeId = grafo.adicionarVertice();
    nodes.add({ id: verticeId, label: `${verticeId}` });
  }

  // Adicionar arestas
  let arestasAdicionadas = 0;
  while (arestasAdicionadas < numArestas) {
    const verticeOrigem = Math.floor(Math.random() * numVertices) + 1;
    const verticeDestino = Math.floor(Math.random() * numVertices) + 1;

    try {
      grafo.adicionarAresta(verticeOrigem, verticeDestino);
      edges.add({ id: arestaId, from: verticeOrigem, to: verticeDestino });
      arestasAdicionadas++;
      arestaId++;
    } catch (error) {
      // Ignorar erros ao adicionar arestas duplicadas ou inválidas
    }
  }

  return [{ nodes, edges }, grafo];
}
