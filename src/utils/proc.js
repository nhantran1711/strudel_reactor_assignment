import { ProcessText } from "./processText";
import { getGlobalEditor } from "./editorContext";



export function Proc() {

    const globalEditor = getGlobalEditor();
    if (!globalEditor) {
        console.warn("Proc called before stuff ready!")
        return;
    }

    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    globalEditor.setCode(proc_text_replaced)
}