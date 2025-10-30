
import { useState } from "react";
import { Proc } from "../utils/proc";

export default function Instrumental() {

    const [instruments, setInstruments] = useState({
        p1_radio: true,
        p2_radio: true,
        p3_radio: true,
        p4_radio: true,
    })

    const toggle = (e) => {

        const update = {...instruments, [e]: !instruments[e]} 
        setInstruments(update)
        Proc() // reevaluate the code
    }

  return (
    <div className="instrumentals">
        <h2 className="instrumentals-header">Instruments Panel</h2>
        <div className="instrumental-grid">
            <div className="instrumental-items">
                <label htmlFor="p1_radio">Bassline</label>
                <input type="checkbox" id="p1_radio" onChange={() => toggle("p1_radio")} checked={instruments.p1_radio} />
            </div>
            <div className="instrumental-items">
                <label htmlFor="p2_radio">Main </label>
                <input type="checkbox" id="p2_radio" onChange={() => toggle("p2_radio")} checked={instruments.p2_radio} />
            </div>
            <div className="instrumental-items">
                <label htmlFor="p3_radio">Drum 1</label>
                <input type="checkbox" id="p3_radio" onChange={() => toggle("p3_radio")} checked={instruments.p3_radio} />
            </div>
            <div className="instrumental-items">
                <label htmlFor="p4_radio">Drum 2</label>
                <input type="checkbox" id="p4_radio" onChange={() => toggle("p4_radio")} checked={instruments.p4_radio} />
            </div>
        </div>

    </div>
  );
}
