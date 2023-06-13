export class GrafoLib {
  private vertices: Map<number, string>;
  private arestas: number;
  private adjacencia: Map<number, number[]>;

  constructor() {
    this.vertices = new Map<number, string>();
    this.arestas = 0;
    this.adjacencia = new Map<number, number[]>();
  }

  adicionarVertice(indice: number, rotulo: string = ""): void {
    this.vertices.set(indice, rotulo);
    this.adjacencia.set(indice, []);
    //console.log(`Vértice ${indice} adicionado com rótulo "${rotulo}"`);
  }

  adicionarAresta(verticeOrigem: number, verticeDestino: number): void {
    if (!this.adjacencia.has(verticeOrigem) || !this.adjacencia.has(verticeDestino)) {
      throw new Error('Vértice(s) não existe(m) no grafo.');
    }

    this.adjacencia.get(verticeOrigem)?.push(verticeDestino);
    this.adjacencia.get(verticeDestino)?.push(verticeOrigem);
    this.arestas++;
    //console.log(`Aresta adicionada entre os vértices ${verticeOrigem} e ${verticeDestino}`);
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
      //console.log(`Aresta removida entre os vértices ${verticeOrigem} e ${verticeDestino}`);
    }
  }

  grauVertice(vertice: number): number {
    if (!this.adjacencia.has(vertice)) {
      throw new Error('Vértice não existe no grafo');
    }

    const grau = this.adjacencia.get(vertice)?.length || 0;
    //console.log(`Grau do vértice ${vertice}: ${grau}`);
    return grau;
  }

  saoVizinhos(vertice1: number, vertice2: number): boolean {
    if (!this.adjacencia.has(vertice1) || !this.adjacencia.has(vertice2)) {
      return false;
    }

    const vizinhosVertice1 = this.adjacencia.get(vertice1) || [];
    return vizinhosVertice1.includes(vertice2);
  }

  imprimirGrafo(): void {
    console.log(`Número de vértices: ${this.vertices.size}`);
    console.log(`Número de arestas: ${this.arestas}`);

    for (const [indice, rotulo] of Array.from(this.vertices.entries())) {
      const arestas = this.adjacencia.get(indice)?.join(", ") || "";
      const grau = this.grauVertice(indice);
      console.log(`Vértice ${indice} (${rotulo}): arestas -> ${arestas}, grau: ${grau}`);
    }
  }
}
