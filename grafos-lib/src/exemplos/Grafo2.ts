import { GrafoLib } from "../models/GrafoLib";

export default function Grafo2(){
    const grafo1 = new GrafoLib(true)
    grafo1.adicionarVertice(0)
    grafo1.adicionarVertice(1)
    grafo1.adicionarVertice(2)
    grafo1.adicionarVertice(3)
    grafo1.adicionarVertice(4)
    grafo1.adicionarAresta(0,1)
    grafo1.adicionarAresta(0,2)
    grafo1.adicionarAresta(0,3)
    grafo1.adicionarAresta(0,4)
    grafo1.adicionarAresta(1,2)
    grafo1.adicionarAresta(1,3)
    grafo1.adicionarAresta(1,4)
    grafo1.adicionarAresta(2,3)
    grafo1.adicionarAresta(2,4)
    grafo1.adicionarAresta(3,4)

    grafo1.imprimirGrafo()

}