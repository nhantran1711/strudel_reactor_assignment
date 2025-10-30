
import { Proc } from "../utils/proc";
import { setSettings } from "../utils/jsonhandler";

export default function Instrumental() {

    function saveState() {
        const instrumentIds = ["p1_radio", "p2_radio", "p3_radio", "p4_radio"]
        const instrumentState = {}

        // Loop through each ids into a hashset so that I can access and also update whether if the state toggle or not
        instrumentIds.forEach(id => {
            const element = document.getElementById(id)
            instrumentState[id] = element ? element.checked : false;  
        })
        
        setSettings({instruments : instrumentState})
    }

    return (
        <div className="instrumentals">
            <h2 className="instrumentals-header">Instruments Panel</h2>
            <div className="instrumental-grid">
                <div className="instrumental-items">
                    <label htmlFor="p1_radio">Bassline</label>
                    <input type="checkbox" id="p1_radio" onChange={() => {Proc(); saveState()}} defaultChecked />
                </div>
                <div className="instrumental-items">
                    <label htmlFor="p2_radio">Main </label>
                    <input type="checkbox" id="p2_radio" onChange={() => {Proc(); saveState()}} defaultChecked />
                </div>
                <div className="instrumental-items">
                    <label htmlFor="p3_radio">Drum 1</label>
                    <input type="checkbox" id="p3_radio" onChange={() => {Proc(); saveState()}} defaultChecked />
                </div>
                <div className="instrumental-items">
                    <label htmlFor="p4_radio">Drum 2</label>
                    <input type="checkbox" id="p4_radio" onChange={() => {Proc(); saveState()}} defaultChecked />
                </div>
            </div>

        </div>
  );
}
