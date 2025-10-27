import { getGlobalEditor } from "../utils/editorContext";

let isRunning = false;
let count = 0


function togglePlayStop() {
    const globalEditor = getGlobalEditor();
    if (!globalEditor) {
        alert("No setting yet!")
    }

    if (count === 0) {
        globalEditor.stop()
        count = count + 1
        isRunning = false
    }
    else {
        if (isRunning) {
            globalEditor.stop();
            isRunning = false
        } 
        else {
            globalEditor.evaluate();
            isRunning = true
        }
    }

}

export function SetupEffectHotkeys() {
    window.addEventListener("keydown", (e) => {

        switch (e.code) {
            case "Space": {
                togglePlayStop()
                e.preventDefault();
                break;
            }

            default: break;
        }
    });
}
