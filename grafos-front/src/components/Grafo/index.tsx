import React, { useRef, useState, useEffect } from 'react';
import { Network, Node, Edge } from 'vis-network';
import { DataSet } from 'vis-network/standalone';
import { GrafoLib } from '../../models/GrafoLib';

interface GraphNode extends Node {
  connections?: string[];
}

const MyNetworkComponent: React.FC = () => {
  const [grafo, setGrafo] = useState<GrafoLib>(() => {
    const newGrafo = new GrafoLib();
    return newGrafo;
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [network, setNetwork] = useState<Network | null>(null);
  const data = {
    nodes: new DataSet<GraphNode>(),
    edges: new DataSet<Edge>(),
  };

  useEffect(() => {
  }, [grafo]);

  const addNodeMode = () => {
    if (network) {
      network.addNodeMode();
    }
  };

  const addEdgeMode = () => {
    if (network) {
      network.addEdgeMode();
    }
  };

  const deleteSelected = () => {
    if (network) {
      network.deleteSelected();
    }
  };


  const draw = () => {
    const options = {
      nodes: {
        shape: "dot",
        size: 15,
        font: {
          size: 17,
          align: "center", // Alinha o texto no centro do nó
        },
        borderWidth: 2,
        shadow: true,
        
      },
      edges: {
        width: 2,
      },
      locale: 'pt-br',
      manipulation: {
        enabled: false,
        addNode: (nodeData: Node, callback: (data: Node) => void) => {
          const vertice = grafo.adicionarVertice()
          const novoVertice = {
            id: vertice,
            label: String(vertice),
            x: nodeData.x,
            y: nodeData.y,
          };
          data.nodes.add(novoVertice);
          grafo.exibirGrafo()
          if (network) {
            network.setData(data);
          }
        },
        addEdge: (edgeData: Edge, callback: (data: Edge) => void) => {
          const from = Number(edgeData.from);
          const to = Number(edgeData.to);
          const timestamp = Date.now(); // Obtém o timestamp atual em milissegundos
        
          const arestaId = `${from},${to},${timestamp}`;
          const novaAresta = {
            id: arestaId,
            from: from,
            to: to,
          };
        
          console.log(novaAresta);
          grafo.adicionarAresta(from, to);
          grafo.exibirGrafo();
          data.edges.add(novaAresta);
        
          if (network) {
            network.setData(data);
          }
        },        
        deleteNode: (nodeData: any, callback: () => void) => {
          const vertice = nodeData.nodes[0];
          data.nodes.remove(vertice);
          grafo.removerVertice(Number(vertice));
          grafo.exibirGrafo()
          if (network) {
            network.setData(data);
          }
          callback();
        },
        deleteEdge: (edgeData: any, callback: () => void) => {
          const edgeId = edgeData.edges[0];
          const [from, to] = edgeId.split(",").map(Number);
          console.log(from, to)
          data.edges.remove(edgeId);
          grafo.removerAresta(from, to);
          grafo.exibirGrafo();
          if (network) {
            network.setData(data);
          }
          callback();
        },
      },
    };



    const networkInstance = new Network(containerRef.current!, data, options);
    setNetwork(networkInstance);
  };

  const destroyNetwork = () => {
    if (network) {
      network.destroy();
      setNetwork(null);
    }
  };

  useEffect(() => {
    draw();
    return () => {
      destroyNetwork();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '500px'}}>
      <div ref={containerRef} id="mynetwork" style={{ width: '80%', height: '100%', backgroundColor: '#dddddd'  }}></div>
      <button onClick={addNodeMode}>Adicionar vértice</button>
      <button onClick={addEdgeMode}>Adicionar aresta</button>
      <button onClick={deleteSelected}>Apagar</button>
      <div></div>
    </div>
  );
};

export default MyNetworkComponent;
