import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CommitIcon from '@mui/icons-material/Commit';
import ClearIcon from '@mui/icons-material/Clear';
import { Network, Node, Edge } from 'vis-network';
import { DataSet } from 'vis-network/standalone';
import { GrafoLib } from '../../models/GrafoLib';

interface GraphNode extends Node {
  connections?: string[];
}

const MyNetworkComponent: React.FC = () => {
  const [value, setValue] = React.useState<number>(8);

  const handleNavigationChange = (event: React.SyntheticEvent, newValue: string | number) => {
    setValue(Number(newValue));
      if (network) {
    network.off('click');
    network.off('select'); 
    network.off('selectNode'); 


  }
    if (newValue === 0) {
      addNodeMode()
    }

    if (newValue === 1) {
      addEdgeMode()
    }

    if( newValue === 2){
      editEdgeMode()
    }

    if (newValue === 3) {
      deleteSelected();
    }

  };
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
      const handleSingleClick = (event: MouseEvent) => {
        setTimeout(() => {
          handleClick(event);
        }, 30);
      };
      const handleClick = (event: MouseEvent) => {
        network.addNodeMode();
      };
      network.addNodeMode();
      network.on('click', handleSingleClick);

    }

  };

  const addEdgeMode = () => {
    if (network) {
      const handleSingleClick = () => {
        console.log('teste')
        network.addEdgeMode();
        //network.unselectAll(); 

      };
  
  
      network.on('selectNode', handleSingleClick);
    }
  };
  

  const deleteSelected = () => {
    if (network) {
      const handleSingleClick = () => {
        console.log('teste')
        network.deleteSelected();
      };
      network.on('select', handleSingleClick);

    }
  };

  const editEdgeMode = () => {
    if (network) {
      const handleSingleClick = () => {
        network.editEdgeMode()
      };
  
      network.off('selectNode');
      network.on('select', handleSingleClick);
    }
  };


  const draw = () => {
    const options = {
      interaction: {
        hover: true // Habilita a funcionalidade de hover
      },
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
          //const grau = grafo.grauVertice(vertice)
          const novoVertice = {
            id: vertice,
            label: String(vertice),
            //title: `Grau: ${grau}`,
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
          /*
          const fromNode = data.nodes.get(from);
          const toNode = data.nodes.get(to);
          if (fromNode && toNode) {
            const fromNodeGrado = grafo.grauVertice(from);
            const toNodeGrado = grafo.grauVertice(to);
            data.nodes.update({ ...fromNode, title: `Grau: ${fromNodeGrado}` });
            data.nodes.update({ ...toNode, title: `Grau: ${toNodeGrado}` });
          }*/

          if (network) {
            network.setData(data);
          }
        },

        deleteNode: (nodeData: any, callback: () => void) => {
          const vertice = nodeData.nodes[0];
          data.nodes.remove(vertice);
          grafo.removerVertice(Number(vertice));
          grafo.exibirGrafo();

          /*const adjacentes = grafo.adjacencia.get(Number(vertice));
          if (adjacentes) {
            adjacentes.forEach((adjacente) => {
              const node = data.nodes.get(adjacente);
              if (node) {
                const grado = grafo.grauVertice(adjacente);
                data.nodes.update({ ...node, title: `Grau: ${grado}` });
              }
            });
          }*/
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
    <div style={{ backgroundColor: '#B0C4DE' }}>
    <Box sx={{ width: "100%" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleNavigationChange}
        >
          <BottomNavigationAction label="Vértice" icon={<AddCircleOutlineIcon />} />
          <BottomNavigationAction label="Aresta" icon={<CommitIcon />} />
          <BottomNavigationAction label="Editar" icon={<EditIcon />} />
          <BottomNavigationAction label="Apagar" icon={<ClearIcon />} />
        </BottomNavigation>
      </Box>
      <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-50px', }}>
        <div ref={containerRef} id="mynetwork" style={{ width: '70%', height: '500px', backgroundColor: '#dddddd', borderRadius: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'  }}></div>
        <div></div>
      </div>


    </div>
  );
};

export default MyNetworkComponent;
