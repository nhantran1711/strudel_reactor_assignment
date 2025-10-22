import { Proc } from "./proc";
import { getGlobalEditor} from "./editorContext";



export function SetupButtons() {

    document.getElementById('play').addEventListener('click', () => {
        const globalEditor = getGlobalEditor();
        if (globalEditor) {
            globalEditor.evaluate();
        } 
        else {
            console.warn("Not ready to PLAY");
        }
    });
    document.getElementById('stop').addEventListener('click', () => {
        const globalEditor = getGlobalEditor();
        if (globalEditor) {
            globalEditor.stop();
        } 
        else {
            console.warn("Not ready to STOP");
        }
    });
    document.getElementById('process').addEventListener('click', () => {
        Proc()
    }
    )
    document.getElementById('process_play').addEventListener('click', () => {
        const globalEditor = getGlobalEditor();

        if (!globalEditor) {
            console.warn("Not ready for Process and Play")
            return;
        }
        Proc();
        globalEditor.evaluate();
    }
    )
}