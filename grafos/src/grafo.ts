export class Grafo {
    public vertices: number;
    public arestas: number;
    public adjacencia: Map<number, number[]>;
  
    constructor() {
      this.vertices = 0;
      this.arestas = 0;
      this.adjacencia = new Map<number, number[]>();
    }
  
    adicionarVertice(vertice: number): void {
      this.adjacencia.set(vertice, []);
      this.vertices++;
    }
  
    adicionarAresta(verticeOrigem: number, verticeDestino: number): void {
      if (!this.adjacencia.has(verticeOrigem) || !this.adjacencia.has(verticeDestino)) {
        throw new Error('Vértice(s) não existe(m) no grafo.');
      }
  
      this.adjacencia.get(verticeOrigem)?.push(verticeDestino);
      this.adjacencia.get(verticeDestino)?.push(verticeOrigem);
      this.arestas++;
    }
  
    removerVertice(vertice: number): void {
      if (!this.adjacencia.has(vertice)) {
        throw new Error('Vértice não existe no grafo.');
      }
  
      const verticesAdjacentes = this.adjacencia.get(vertice);
      if (verticesAdjacentes) {
        for (const adjacente of verticesAdjacentes) {
          const index = this.adjacencia.get(adjacente)?.indexOf(vertice);
          if (index !== undefined && index > -1) {
            this.adjacencia.get(adjacente)?.splice(index, 1);
            this.arestas--;
          }
        }
      }
  
      this.adjacencia.delete(vertice);
      this.vertices--;
    }
  
    removerAresta(verticeOrigem: number, verticeDestino: number): void {
      if (!this.adjacencia.has(verticeOrigem) || !this.adjacencia.has(verticeDestino)) {
        throw new Error('Vértice(s) não existe(m) no grafo.');
      }
  
      const indexOrigem = this.adjacencia.get(verticeOrigem)?.indexOf(verticeDestino);
      const indexDestino = this.adjacencia.get(verticeDestino)?.indexOf(verticeOrigem);
      
      if (indexOrigem !== undefined && indexOrigem > -1 && indexDestino !== undefined && indexDestino > -1) {
        this.adjacencia.get(verticeOrigem)?.splice(indexOrigem, 1);
        this.adjacencia.get(verticeDestino)?.splice(indexDestino, 1);
        this.arestas--;
      }
    }
  }
  