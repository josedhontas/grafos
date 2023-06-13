import { GrafoLib } from "../models/GrafoLib";

export default function Grafo2(){
    const grafo2 = new GrafoLib()
    grafo2.adicionarVertice(1)
    grafo2.adicionarVertice(2)
    grafo2.adicionarVertice(3)
    grafo2.adicionarVertice(4)
    grafo2.adicionarVertice(5)
    grafo2.adicionarAresta(1,2)
    grafo2.adicionarAresta(1,3)
    grafo2.adicionarAresta(1,4)
    grafo2.adicionarAresta(1,5)
    grafo2.adicionarAresta(2,3)
    grafo2.adicionarAresta(2,4)
    grafo2.adicionarAresta(2,5)
    grafo2.adicionarAresta(3,4)
    grafo2.adicionarAresta(3,5)
    grafo2.adicionarAresta(4,5)

    grafo2.imprimirGrafo()

}