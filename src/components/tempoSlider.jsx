
import { useState, useEffect } from "react";

export default function TempoSlider( {
    defaultTempo = 140,
    min = 0.5,
    max = 2,
    step = 0.5
}) {
    const [tempo, setTempo] = useState(1);

    const handleTempoChange = (e) => {

        const value = parseFloat(e.target.value);
        setTempo(value)

        const cps = (defaultTempo * value) / 60 / 4
        const newCps = `setcps(${cps})` // new value of cps

        const textArea = document.getElementById("proc")
        const lines = textArea.value.split("\n") // Getting the lines in text area


        // Checking whether if the cps already exists in our text area
        let flag = false;
        const newLines = lines.map(line => {
            if (line.startsWith("setcps(")) {
                flag = true
                return newCps;
            }
            return line;
        })

        // Making new cps if none were found
        if (!flag) {
            newLines.unshift(newCps)
        }
        textArea.value = newLines.join("\n");
        console.log("%c[hap] " + value, "color: cyan");
    }
    
    useEffect(() => handleTempoChange({ target: { value: tempo } }), []);

    return (
        <div className="tempo-slider mb-3">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={tempo}
                onChange={handleTempoChange}
                className="form-change"
            ></input>
        </div>
    )
}