import * as d3 from 'd3';
import { getD3Data, subscribe, unsubscribe } from '../console-monkey-patch';
import {useEffect, useRef} from 'react'


export default function D3Graph() {
    // Use reference of svg
    const svgCur = useRef(null);

    useEffect(() => {
        
        // Select the current working svg in App.js
        const svg = d3.select(svgCur.current)
            .attr('width', 800)
            .attr('height', 400)
            .attr('overflow', 'visible')
            .attr('background', '282c34')

        // Default variables
        const defaultWidth = 800
        const defaultHeight = 400

        const xScale = d3.scaleLinear().range([0, defaultWidth])
        const yScale = d3.scaleBand().range([defaultHeight - 50, 50])


        const line = d3.line()

    }, [])


}