import React from 'react'
import { useRef, useEffect} from 'react';
import { Network } from 'vis-network';

export default function Grafo() {
    const graphRef = useRef(null);

    useEffect(() => {
      const container = graphRef.current;
      const data = {
        dot: `
          graph {
            1 -- 1 -- 2;
            2 -- 3;
            2 -- 4;
            2 -- 1;
          }
        `,
      };
  
      const options = {
        nodes: {
          shape: 'circle', // Forma do texto do vertice
          font: {
            size: 20, // Tamanho do texto do vertice
          },
          size: 20, // tamanho vertices
          borderWidth: 2, // Ajuste a largura da borda
          borderRadius: 2, // Ajuste o raio da borda para torná-la mais arredondada
        },

        edges: {
            width: 3,
            color: {
                color: 'gray', // Cor padrão das arestas
                highlight: 'black', // Cor quando a aresta é destacada
              },
        }
      };
  
      const network = new Network(container, data, options);
  
      // Limpar o gráfico quando o componente for desmontado
      return () => {
        network.destroy();
      };
    }, []);
  
    return <div ref={graphRef} style={{ height: '500px' }}></div>;
}
