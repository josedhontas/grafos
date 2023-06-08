import React, { useRef, useEffect } from 'react';
import { Network, Node, Edge } from 'vis-network';

const Grafo: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    let network: Network | null = null;
    let nodes: Node[] = [
        { id: 1, label: '1', x: 100, y: 100 },
        { id: 2, label: '2', x: 200, y: 200 },
        { id: 3, label: '3', x: 300, y: 300 },
    ];
    let edges: Edge[] = [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
    ];

    const handleContainerClick = (event: MouseEvent) => {
        if (network) {
            const position = network.canvasToDOM({ x: event.clientX, y: event.clientY });
            const id = nodes.length + 1;
            const newNode: Node = {
                id,
                label: id.toString(),
                x: position.x,
                y: position.y,
            };
            nodes = [...nodes, newNode];
            network.setData({ nodes, edges });
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            // Opções de configuração do grafo
            const options = {
                nodes: {
                    shape: 'circle',
                    font: {
                        size: 20,
                    },
                    size: 20,
                    borderWidth: 2,
                },
                edges: {
                    width: 3,
                    color: {
                        color: 'gray',
                        highlight: 'black',
                    },
                },
                interaction: {
                    dragNodes: true,
                },
            };

            // Criar a instância do grafo
            network = new Network(containerRef.current, { nodes, edges }, options);

            // Adicionar o evento de clique ao contêiner do grafo
            containerRef.current.addEventListener('click', handleContainerClick);
        }

        // Limpar a instância do grafo e remover o evento ao desmontar o componente
        return () => {
            if (network) {
                network.destroy();
                network = null;
            }
            if (containerRef.current) {
                containerRef.current.removeEventListener('click', handleContainerClick);
            }
        };
    }, []);

    return <div ref={containerRef} style={{ height: '500px' }} />;
};

export default Grafo;
