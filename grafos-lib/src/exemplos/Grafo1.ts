import { GrafoLib } from "../models/GrafoLib"

export default function Grafo1(){
    const grafo1 = new GrafoLib()
    grafo1.adicionarVertice(1, "v1")
    grafo1.adicionarVertice(2, "v2")
    grafo1.adicionarVertice(3, "v3")
    grafo1.adicionarVertice(4, "v4")
    grafo1.adicionarVertice(5, "v5")
    grafo1.adicionarAresta(1,2)
    grafo1.adicionarAresta(2,3)
    grafo1.adicionarAresta(2,5)
    grafo1.adicionarAresta(2,4)
    grafo1.adicionarAresta(3,3)
    grafo1.adicionarAresta(3,4)
    grafo1.adicionarAresta(4,5)
    grafo1.adicionarAresta(5,2)

    grafo1.imprimirGrafo()
    
}