import { GrafoLib } from "./models/GrafoLib";

interface Node {
  id: number;
  label: string;
}

interface Edge {
  from: number;
  to: number;
}

interface GrafoVisNetwork {
  nodes: Node[];
  edges: Edge[];
}

function aleatorio(limiteInferior: number, limiteSuperior: number): [number, number]{
    const numero1 = Math.floor(Math.random()*(limiteSuperior - limiteInferior + 1)) + limiteInferior;
    const numero2= Math.floor(Math.random()*(limiteSuperior - limiteInferior + 1)) + limiteInferior;

    return [numero1, numero2]

}
export default function criarGrafoAleatorio(): GrafoVisNetwork {
  const [numVertices, numArestas] = aleatorio(7, 18)
  const grafo = new GrafoLib();
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Adicionar vértices
  for (let i = 0; i < numVertices; i++) {
    const verticeId = grafo.adicionarVertice();
    nodes.push({ id: verticeId, label: `${verticeId}` });
  }

  // Adicionar arestas
  let arestasAdicionadas = 0;
  while (arestasAdicionadas < numArestas) {
    const verticeOrigem = Math.floor(Math.random() * numVertices) + 1;
    const verticeDestino = Math.floor(Math.random() * numVertices) + 1;

    try {
      grafo.adicionarAresta(verticeOrigem, verticeDestino);
      edges.push({ from: verticeOrigem, to: verticeDestino });
      arestasAdicionadas++;
    } catch (error) {
      // Ignorar erros ao adicionar arestas duplicadas ou inválidas
    }
  }

  return { nodes, edges };
}

// Exemplo de uso:
const grafoAleatorio = criarGrafoAleatorio();
console.log(grafoAleatorio);
