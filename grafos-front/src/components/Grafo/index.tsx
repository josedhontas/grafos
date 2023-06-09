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

  const draw = () => {
    const options = {
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
    // Cleanup function to destroy the network when the component unmounts
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