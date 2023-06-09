import React, { useRef, useState, useEffect } from 'react';
import vis, { Network, Node, Edge, Position } from 'vis-network';
import { DataSet } from 'vis-network/standalone';
import { GrafoLib } from '../../models/GrafoLib';

interface GraphNode extends Node {
  connections?: string[];
}

const MyNetworkComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const exportAreaRef = useRef<HTMLTextAreaElement>(null);
  const [network, setNetwork] = useState<Network | null>(null);
  const data = {
    nodes: new DataSet<GraphNode>(),
    edges: new DataSet<Edge>(),
  };

  var locales = {
    en: {
      edit: 'Editar',
      del: 'Apagar',
      back: 'Voltar',
      addNode: 'Adicionar vértice',
      addEdge: 'Adcionar aresta',
      editNode: 'Editar vértice',
      editEdge: 'Editar aresta',
      addDescription: 'Clique em um espaço em branco para adicionar um vértice.',
      edgeDescription: 'Selecione um vértice e araste para criar uma aresta.',
      editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
      createEdgeError: 'Cannot link edges to a cluster.',
      deleteClusterError: 'Clusters cannot be deleted.',
      editClusterError: 'Clusters cannot be edited.'
    }
  }

  const draw = () => {
    const options = {
      locale: 'pt-br',
      locales: locales,
        manipulation: {
          enabled: true,
          addNode: (nodeData: Node, callback: (data: Node) => void) => {
            const grafo = new GrafoLib();
            const newNode = {
              id: nodeData.id,
              label: String(grafo.adicionarVertice()),
              x: nodeData.x,
              y: nodeData.y,
            };
            data.nodes.add(newNode);
      
            if (network) {
              network.setData(data);
            }
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
    <div style={{ width: '100%', height: '500px' }}>
      <div ref={containerRef} id="mynetwork" style={{ width: '100%', height: '100%' }}></div>
      <div></div>
    </div>
  );
};

export default MyNetworkComponent;
