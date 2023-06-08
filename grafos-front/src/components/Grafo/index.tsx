import React, { useRef, useState, useEffect } from 'react';
import vis, { Network, Node, Edge, Position } from 'vis-network';
import { DataSet } from 'vis-network/standalone';


interface GraphNode extends Node {
  connections?: string[];
}

interface GraphData {
  nodes: DataSet<GraphNode>;
  edges: DataSet<Edge>;
}

const MyNetworkComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const exportAreaRef = useRef<HTMLTextAreaElement>(null);
  const [network, setNetwork] = useState<Network | null>(null);

  const draw = () => {
    const data = {
      nodes: new DataSet<GraphNode>(),
      edges: new DataSet<Edge>(),
    };
    const options = {
      manipulation: { enabled: true },
    };

    const networkInstance = new Network(containerRef.current!, data, options);
    setNetwork(networkInstance);
  };

  const clearOutputArea = () => {
    if (exportAreaRef.current) {
      exportAreaRef.current.value = '';
    }
  };

  const exportNetwork = () => {
    if (network && exportAreaRef.current) {
      clearOutputArea();

      const nodes = network.getPositions();
      const exportValue = JSON.stringify(nodes, undefined, 2);

      exportAreaRef.current.value = exportValue;

      resizeExportArea();
    }
  };

  const importNetwork = () => {
    if (exportAreaRef.current) {
      const inputValue = exportAreaRef.current.value;
      const inputData: GraphNode[] = JSON.parse(inputValue);

      const data: GraphData = {
        nodes: new DataSet(inputData),
        edges: new DataSet(),
      };

      if (containerRef.current) {
        const networkInstance = new Network(containerRef.current, data, {});
        setNetwork(networkInstance);
      }

      resizeExportArea();
    }
  };

  const addConnections = (node: GraphNode) => {
    if (network && node.id !== undefined) {
      node.connections = network.getConnectedNodes(node.id) as string[];
    }
  };
    

  const destroyNetwork = () => {
    if (network) {
      network.destroy();
      setNetwork(null);
    }
  };

  const resizeExportArea = () => {
    if (exportAreaRef.current) {
      exportAreaRef.current.style.height = `1px + ${exportAreaRef.current.scrollHeight}px`;
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
    <div>
      <div ref={containerRef} id="mynetwork" />

    </div>
  );
};

export default MyNetworkComponent;
