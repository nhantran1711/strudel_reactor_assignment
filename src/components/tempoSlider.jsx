
import { useState, useEffect } from "react";
import { getGlobalEditor } from "../utils/editorContext";
import { ProcessText } from "../utils/processText";
import { getSettings, setSettings } from "../utils/jsonhandler";

export default function TempoSlider( {
    defaultTempo = 140,
    min = 0.5,
    max = 2,
    step = 0.5
}) {
    const savedSetting = getSettings();
    const [tempo, setTempo] = useState( savedSetting.tempo || 1);

    const handleTempoChange = (e) => {

        const value = parseFloat(e.target.value);
        setTempo(value)
        setSettings( {tempo: value})

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

        const globalEditor = getGlobalEditor()
        if (!globalEditor) return;

        const processedCode = ProcessText(textArea.value)
        globalEditor.setCode(processedCode)
        globalEditor.evaluate();

        // Log the tempo change for D3 Graph
        console.log("%c[hap] " + value, "color: cyan");
    }

    useEffect(() => {
        const updateTempo = () => {
        const setting = getSettings()
        setTempo(setting.tempo)
    }

    window.addEventListener("tempo", updateTempo)
    return () => window.removeEventListener("tempo", updateTempo)
    }, [])


    return (
        <div className="tempo-slider mb-3">
            <h6 className="tempo-label">Tempo</h6>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={tempo}
                onChange={handleTempoChange}
                className="dj-slider"
            ></input>
        </div>
    )
}