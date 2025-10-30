
import { Proc } from "../utils/proc";
import { getSettings, setSettings } from "../utils/jsonhandler";
import { useEffect, useState } from "react";

export default function Instrumental() {

    const saveSettings = getSettings() || {}; // Edge case handling

    const [instrumentState, setInstrumentState] = useState(
        saveSettings.instruments || { p1_radio: true, p2_radio: true, p3_radio: true, p4_radio: true }
    );

    // Anything change will be change and runs
    const toggle = (e) => {
        const curState = {...instrumentState, [e]: !instrumentState[e] }
        setInstrumentState(curState)
        setSettings( {
            instruments: curState
        })
        
        Proc()
    }

    useEffect(() => {
        const importState = () => {
            const update = getSettings()
            // Set a new state in local storage
            if (update?.instruments) {
                setInstrumentState(update.instruments)
                Proc()
            }
        }
        window.addEventListener("instrumentsImported", importState);
        return () => window.removeEventListener("instrumentsImported", importState)
    }, [])
   

    return (
        <div className="instrumentals">
            <h2 className="instrumentals-header">Instruments Panel</h2>
            <div className="instrumental-grid">
                <div className="instrumental-items">
                    <label htmlFor="p1_radio">Bassline</label>
                    <input type="checkbox" id="p1_radio" checked={instrumentState.p1_radio} onChange={() => {toggle("p1_radio")}} />
                </div>
                <div className="instrumental-items">
                    <label htmlFor="p2_radio">Main </label>
                    <input type="checkbox" id="p2_radio" checked={instrumentState.p2_radio} onChange={() => {toggle("p2_radio")}} />
                </div>
                <div className="instrumental-items">
                    <label htmlFor="p3_radio">Drum 1</label>
                    <input type="checkbox" id="p3_radio" checked={instrumentState.p3_radio} onChange={() => {toggle("p3_radio")}} />
                </div>
                <div className="instrumental-items">
                    <label htmlFor="p4_radio">Drum 2</label>
                    <input type="checkbox" id="p4_radio" checked={instrumentState.p4_radio} onChange={() => {toggle("p4_radio")}} />
                </div>
            </div>

        </div>
  );
}
