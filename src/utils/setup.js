import { Proc, startAudio } from "./proc";
import { getGlobalEditor} from "./editorContext";
import { ProcAndPlay } from "./procAndPlay";



export function SetupButtons() {

    document.getElementById('play').addEventListener('click', () => {
        startAudio()
        const globalEditor = getGlobalEditor();
        if (globalEditor) {
            globalEditor.evaluate()
        }
        document.activeElement.blur();
    });
    document.getElementById('stop').addEventListener('click', () => {
        const globalEditor = getGlobalEditor();
        if (globalEditor) {
            globalEditor.stop();
        } 
        else {
            console.warn("Not ready to STOP");
        }
        document.activeElement.blur();
    });
    document.getElementById('process').addEventListener('click', () => {
        startAudio()
        Proc()
        document.activeElement.blur();
    }
    )
    document.getElementById('process_play').addEventListener('click', () => {
        startAudio()
        ProcAndPlay()
        document.activeElement.blur();
    }
    )
}