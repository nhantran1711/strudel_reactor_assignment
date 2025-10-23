import React from "react";
import { Proc } from "../utils/proc";


export default function SaveSoundButton( {textareaId = "proc"}) {

    const handleSave = () => {
        const savedCode = document.getElementById(textareaId).value;

        localStorage.setItem("savedBeat", savedCode);
        alert("Cooking beat saved")
    }

    const handleLoad = () => {
        const savedBeat = localStorage.getItem("savedBeat");
        if (savedBeat) {
            document.getElementById(textareaId).value = savedBeat;
            Proc();
            alert("loaded")
        }
        
        else {
            alert("nunthing found...")
        }
    }
    return (
        <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-primary" onClick={handleSave}> Save Beat</button>
            <button className="btn btn-outline-secondary" onClick={handleLoad}>Load Beat</button>
        </div>
    );
}