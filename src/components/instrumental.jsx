
import { Proc } from "../utils/proc";

export default function Instrumental() {

  return (
    <div className="instrumentals">
        <h2 className="instrumentals-header">Instruments Panel</h2>
        <div className="instrumental-grid">
            <div className="instrumental-items">
                <label htmlFor="p1_radio">Bassline</label>
                <input type="checkbox" id="p1_radio" onChange={Proc} defaultChecked />
            </div>
            <div className="instrumental-items">
                <label htmlFor="p2_radio">Main </label>
                <input type="checkbox" id="p2_radio" onChange={Proc} defaultChecked />
            </div>
            <div className="instrumental-items">
                <label htmlFor="p3_radio">Drum 1</label>
                <input type="checkbox" id="p3_radio" onChange={Proc} defaultChecked />
            </div>
            <div className="instrumental-items">
                <label htmlFor="p4_radio">Drum 2</label>
                <input type="checkbox" id="p4_radio" onChange={Proc} defaultChecked />
            </div>
        </div>

    </div>
  );
}
