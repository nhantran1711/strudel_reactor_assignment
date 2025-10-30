import { stranger_tune } from "../tunes";
import { getGlobalEditor } from "../utils/editorContext";
import { ProcessText } from "../utils/processText";

let isRunning = false;
let count = 0


function togglePlayStop() {
    const globalEditor = getGlobalEditor();
    if (!globalEditor) {
        alert("No setting yet!")
    }

    if (count === 0) {
        globalEditor.stop()
        window.dispatchEvent(new Event("musicStop"));
        count = count + 1
        isRunning = false
    }
    else {
        if (isRunning) {
            globalEditor.stop();
            window.dispatchEvent(new Event("musicStop"));
            isRunning = false
        } 
        else {
            globalEditor.evaluate();
            isRunning = true
        }
    }

}

const baseTune = stranger_tune;

let prevBassState = true;

function toggleMuteBassline() {
    const globalEditor = getGlobalEditor();
    if (!globalEditor) return;

    const bassElement = document.getElementById("p1_radio");
    if (!bassElement) return;

    // Toggle bassline
    const isMuted = !bassElement.checked;
    bassElement.checked = isMuted ? prevBassState : false // Ternary operator for checking base value by previouse base statuse or false

    // If not muted, mute 
    if (!isMuted) {
        prevBassState = bassElement.checked;
        bassElement.checked = false; // mute
    } 
    else {
        bassElement.checked = prevBassState; // restore
    }

    // Process ONLY the base - replace p1_radio with silence same logic as the checkboxes
    const processedCode = ProcessText(baseTune);
    globalEditor.setCode(processedCode); // Set a new code
    globalEditor.evaluate(); // Run it again
    window.dispatchEvent(new Event("musicPlay"));
}

export function SetupEffectHotkeys() {
    window.addEventListener("keydown", (e) => {

        switch (e.code) {
            case "Space": {
                togglePlayStop()
                e.preventDefault();
                break;
            }
            case "KeyM": {
                toggleMuteBassline();
                break;
            }
            default: break;
        }
    });
}
