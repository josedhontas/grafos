import React, { useRef, useEffect, useState } from 'react';
import { Network, Node, Edge } from 'vis-network';
import { GrafoLib } from '../../models/GrafoLib';

const Grafo: React.FC = () => {
    const [grafo, setGrafo] = useState<GrafoLib | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);
    let network: Network | null = null;
    let nodes: Node[] = [
    ];
    let edges: Edge[] = [

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

        grafo?.exibirGrafo()
    };

    useEffect(() => {
        const aux = new GrafoLib()
        aux.adicionarVertice(1)
        setGrafo(aux)
        //aux.exibirGrafo()

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
