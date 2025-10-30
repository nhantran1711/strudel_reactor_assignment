import { Proc } from "./proc";
import { getGlobalEditor } from "./editorContext";


export function ProcAndPlay() {
    const globalEditor = getGlobalEditor();
    
    if (globalEditor != null && globalEditor.repl.state.started === true) {
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
        window.dispatchEvent(new Event("musicPlay"));
    }
}