import { getGlobalEditor } from "../utils/editorContext";

function togglePlayStop() {
    const globalEditor = getGlobalEditor();
    if (globalEditor) {
        globalEditor.stop();
    } 
    else {
        console.warn("Not ready to STOP");
    }
}

export function SetupEffectHotkeys() {
    window.addEventListener("keydown", (e) => {

        switch (e.code) {
            case "Space": togglePlayStop(); break;
            default: break;
        }
    });
}
