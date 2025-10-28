import * as d3 from 'd3';
import { getD3Data, subscribe, unsubscribe } from '../console-monkey-patch';
import {useEffect, useRef} from 'react'


export default function D3Graph({ liveUpdate = true}) {
    // Use reference of svg
    const svgCur = useRef(null);
    const liveUp = useRef(liveUpdate)

    // May be useRef will work this
    useEffect(() => {
        liveUp.current = liveUpdate
    }, [liveUpdate])

    useEffect(() => {
        
        // Select the current working svg in App.js
        if (!svgCur.current) return;

        const svg = d3.select(svgCur.current)
            .attr('width', 800)
            .attr('height', 400)
            .attr('overflow', 'visible')
            .attr('background', '282c34')

        // Default variables
        const defaultWidth = 800
        const defaultHeight = 400
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };

        const xScale = d3.scaleLinear().range([margin.left, defaultWidth - margin.right])
        const yScale = d3.scaleLinear().range([defaultHeight - margin.bottom, margin.top])


        const line = d3.line()
            .x((d, i) => xScale(i))
            .y((d) => yScale(d))
            .curve(d3.curveBasis)

        // Update the old graph with new numerical data
        const updateGraph = (data) => {

            if (!liveUp.current) return; // If they toggle nunthing, just skip the update

            const values = data
                .map((v) => parseFloat(v))
                .filter((v) => !isNaN(v));
            
            if (values.length === 0) return;

            xScale.domain([0, values.length - 1]);
            yScale.domain([d3.min(values) - 1, d3.max(values) + 1]);

            svg.selectAll("*").remove();

            const xAxis = d3.axisBottom(xScale).ticks(10);
            const yAxis = d3.axisLeft(yScale).ticks(6);

            svg.append("g")
                .attr("transform", `translate(0,${defaultHeight - margin.bottom})`)
                .call(xAxis)

            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(yAxis)

            svg.append("path")
                .datum(values)
                .attr("stroke", "#38bdf8")
                .attr("stroke-width", 2)
                .attr("d", line);

            svg.selectAll("circle")
                .data(values)
                .enter()
                .append("circle")
                .attr("cx", (data, i) => xScale(i))
                .attr("cy", (d) => yScale(d))
                .attr("r", 3)
            };
            
            // Init rendering
            updateGraph(getD3Data())

            const handleNewEvents = (event) => {
                updateGraph(event.detail)
            }

            subscribe("d3Data", handleNewEvents)
            return () => unsubscribe("d3Data", handleNewEvents)
    }, [])

    return (
        <div>
            <svg ref={svgCur}></svg>
        </div>
    )

}