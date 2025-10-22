import { Proc } from "./proc";

let globalEditor = null;

export function setProcAndPlayEditor(editor) {
    globalEditor = editor;
}


export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started === true) {
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
    }
}