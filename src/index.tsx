import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import * as d3 from "d3";
import {node, optionsType, propsType} from "./types"
import {classNameSetter, validateData} from "./utils";
import {defaultOptions} from "./constants"

function Graph(
    {
        data,
        nodeSize,
        nodeType,
        distance,
        color,
        nodeClassName,
        linkClassName,
        linkLabelClassName,
        titleClassName,
        directedLinks,
        enableDrag,
        ...props
    }: React.SVGProps<SVGSVGElement> & propsType
    ): JSX.Element {
    const [svgHeight, setSVGHeight] = useState<number>(0)
    const [svgWidth, setSVGWidth] = useState<number>(0)
    const graphRef = useRef<SVGSVGElement>(null);

    const propsOptions : any = {
        nodeSize,
        nodeType,
        nodeClassName,
        linkClassName,
        linkLabelClassName,
        titleClassName,
        directedLinks,
        enableDrag,
        distance,
        color
    }

    const options: optionsType  = {
        ...defaultOptions,
        ...Object.keys(propsOptions).reduce((acc:any, curr: any)=>{
            if(propsOptions[curr] !== undefined) acc[curr] = propsOptions[curr]
            return acc
        }, {})
    }

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setSVGHeight(entry.contentRect.height)
                setSVGWidth(entry.contentRect.width)
            }
        });

        if (graphRef.current) {
            observer.observe(graphRef.current);
        }

        return () => {
            if (graphRef.current) {
                observer.unobserve(graphRef.current);
            }
        };
    }, []);

    const drawGraph = useCallback(() => {
        const nodes = data.nodes.map(d => Object.create(d));
        const links = data.links.map(d => Object.create(d));
        const colorSetter = (d: any) => d.color || options.color
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d:any) => d.id).distance(options.distance))
            .force("charge", d3.forceManyBody())
            .force('collide', d3.forceCollide(() => 65))
            .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))

        d3.select(`#rgv-container`).select('svg').remove()
        const svg = d3.select(`#rgv-container`).append("svg")


        if(options.directedLinks){
            // arrow creation
            svg.append("defs").selectAll("marker")
                .data(links)
                .join("marker")
                .attr("id", d =>`arrow-${d.source.index}-${d.target.index}`)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 23)
                .attr("refY", 0)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr('fill', (d)=>colorSetter(data.links[d.index]))
                .attr('class', (link: any)=>classNameSetter(data.links[link.index]?.linkClassName, options.linkClassName))
                .attr("d", 'M0,-5L10,0L0,5')
        }

        // links creation
        const link = svg.append("g")
            .selectAll("path")
            .data(links)
            .join("path")
            .attr("id", d =>`link-${d.source.index}-${d.target.index}`)
            .attr('stroke', (d)=>colorSetter(data.links[d.index]))
            .attr("marker-end", d => `url(#arrow-${d.source.index}-${d.target.index}`)
            .attr('class', (link: any)=>classNameSetter(data.links[link.index]?.linkClassName, options.linkClassName))

        // links labels creation
        const linkLabels = svg
            .selectAll(`.rgv-link-label`)
            .remove()
            .data(links)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", -5)
            .attr('id', (link, i)=>`linkLabel${i}`)

        linkLabels
            .append("textPath")
            .attr("xlink:href", d=>`#link-${d.source.index}-${d.target.index}`)
            .style("text-anchor", "middle")
            .attr("startOffset", "50%")
            .attr('fill', (d)=>colorSetter(data.links[d.index]))
            .text(d=>d.label)
            .attr('class', (link: any)=>'rgv-link-label '+ classNameSetter(data.links[link.index]?.labelClassName, options.linkLabelClassName))

        // nodes creation
        const node = svg.append("g")
            .selectAll("g")
            .data(nodes)
            .join("g");

        node.on('click', (d: any) => {
            if (options.onClick && data.nodes[d.target.id] !== undefined)
                    options.onClick(data.nodes[d.target.id] as node)
        })

        if(options.enableDrag)
            node.attr('cursor', 'move')
                // @ts-ignore
                .call(drag(simulation));

        let image: any;
        if(options.nodeType === "image") image = node
            .append("svg:image")
            .attr('width', options.nodeSize)
            .attr('height', options.nodeSize)
            .attr("xlink:href", d=>d.image)
            .attr('class', (node: any)=>classNameSetter(data.nodes[node.index]?.className, options.nodeClassName))


        else node.append("circle")
            .attr("r", options.nodeSize/2)
            .attr('fill', (d)=>colorSetter(data.nodes[d.index]))
            .attr('class', (node: any)=>classNameSetter(data.nodes[node.index]?.className, options.nodeClassName))
            .attr('id', (d:any)=>d.index)

        // nodes text creation
        node.append("text")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", options.nodeSize/2 + 15)
            .attr('fill', (d)=>colorSetter(data.nodes[d.index]))
            .text(d => d.label)
            .attr('class', (node: any)=>classNameSetter(data.nodes[node.index]?.titleClassName, options.titleClassName))
            .clone(true).lower()

        simulation.on("tick", tick);

        function tick() {

            // nodes position translate
            node.attr("transform", function(d) {
                d.x = Math.max(options.nodeSize/2, Math.min(svgWidth - options.nodeSize/2, d.x));
                d.y = Math.max(options.nodeSize/2, Math.min(svgHeight - options.nodeSize/2, d.y));
                return "translate(" + d.x + ", " + d.y + ")";
            });

            // link drawing
            link.attr("d", (d:any)=>`M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`);

            // nodes images position translate
            if(options.nodeType === "image") image.attr("x", -options.nodeSize/2).attr("y", -options.nodeSize/2);

            // links label position translate
            linkLabels.attr("transform", function(d) {
                if (d.target.x < d.source.x) {
                    let bbox = this.getBBox();
                    let rx = bbox.x + bbox.width / 2;
                    let ry = bbox.y + bbox.height / 2;
                    return "rotate(180 " + rx + " " + ry + ")";
                }
                return "rotate(0)";
            });

        }

        function drag (simulation:any){

            function dragStarted(event: any, d:any){
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event :any, d :any) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragEnded(event :any, d :any) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragStarted)
                .on("drag", dragged)
                .on("end", dragEnded);
        }

    },
        [data.nodes, data.links, options, svgHeight, svgWidth]
    );

    useEffect(()=>{
        validateData(data.nodes, data.links)
        drawGraph();
    }, [data.nodes, data.links, props, drawGraph])


    return (
        <svg
            id="rgv-container"
            ref={graphRef}
            {...props}
        />
    );
}

export default Graph;


