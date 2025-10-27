import { Proc } from "./proc";
import { getGlobalEditor} from "./editorContext";
import { ProcAndPlay } from "./procAndPlay";



export function SetupButtons() {

    document.getElementById('play').addEventListener('click', () => {
        const globalEditor = getGlobalEditor();
        if (globalEditor) {
            globalEditor.evaluate();
        } 
        else {
            console.warn("Not ready to PLAY");
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
        Proc()
        document.activeElement.blur();
    }
    )
    document.getElementById('process_play').addEventListener('click', () => {
        const globalEditor = getGlobalEditor();

        if (!globalEditor) {
            console.warn("Not ready for Process and Play")
            return;
        }
        ProcAndPlay();
        globalEditor.evaluate();
        document.activeElement.blur();
    }
    )
}