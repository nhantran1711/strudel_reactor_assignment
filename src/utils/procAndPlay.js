import { Proc } from "./proc";
import { getGlobalEditor } from "./editorContext";

const globalEditor = getGlobalEditor();


export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started === true) {
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
    }
}