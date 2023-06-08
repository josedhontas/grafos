import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { GrafoLib } from '../../models/GrafoLib';

const Grafo: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    let network: Network | null = null;

    const grafo = new GrafoLib();
    grafo.adicionarVertice(1);
    grafo.adicionarVertice(2);
    grafo.adicionarVertice(3);
    grafo.adicionarVertice(4);
    grafo.exibirGrafo();

    useEffect(() => {
        if (containerRef.current) {
            // Dados dos nós
            const nodes = [
                { id: 1, label: '1' },
                { id: 2, label: '2' },
                { id: 3, label: '3' },
            ];

            // Dados das arestas
            const edges = [
                { from: 1, to: 2 },
                { from: 1, to: 3 },
            ];

            // Opções de configuração do grafo
            const options = {
                nodes: {
                    shape: 'circle', // Forma do texto do vertice
                    font: {
                        size: 20, // Tamanho do texto do vertice
                    },
                    size: 20, // tamanho vertices
                    borderWidth: 2, // Ajuste a largura da borda
                    //borderRadius: 2, // Ajuste o raio da borda para torná-la mais arredondada
                },

                edges: {
                    width: 3,
                    color: {
                        color: 'gray', // Cor padrão das arestas
                        highlight: 'black', // Cor quando a aresta é destacada
                    },
                }
            };

            // Criar a instância do grafo
            network = new Network(containerRef.current, { nodes, edges }, options);
        }

        // Limpar a instância do grafo ao desmontar o componente
        return () => {
            if (network) {
                network.destroy();
                network = null;
            }
        };
    }, []);

    return <div ref={containerRef} style={{ height: '500px' }} />;
};

export default Grafo;
