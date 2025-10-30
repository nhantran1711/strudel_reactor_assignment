import { getGlobalEditor } from "./editorContext";
import { ProcessText } from "./processText";

export function Proc() {

    const globalEditor = getGlobalEditor();
    if (!globalEditor) {
        console.warn("Proc called before stuff ready!")
        return;
    }

    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = ProcessText(proc_text)
    globalEditor.setCode(proc_text_replaced) 
    globalEditor.evaluate()
}