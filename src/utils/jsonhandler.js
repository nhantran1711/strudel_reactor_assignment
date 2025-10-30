
import { getGlobalEditor } from "./editorContext"
import { ProcessText } from "./processText"

let curSettings = {
    tempo : null,
    instruments : {}
}

export function getSettings() {
    const data = JSON.parse(localStorage.getItem('musicalSetting')) // Get storing local storage

    if (data) {
        curSettings = data
        return data
    }

    // No data, get the default
    curSettings = {
        tempo : 1,
        instruments : {
            p1_radio: true, 
            p2_radio: true, 
            p3_radio: true, 
            p4_radio: true 
        }
    }
    localStorage.setItem('musicalSetting', JSON.stringify(curSettings))
    return curSettings
}

export function setSettings(obj) {
    curSettings = {...curSettings, ...obj} // Merge the cur settings with the saving one
    localStorage.setItem('musicalSetting', JSON.stringify(curSettings)) 
    window.dispatchEvent(new Event("tempo")) // notify slider to update
}

export function exportSettings() {
    const json = JSON.stringify(curSettings)
    navigator.clipboard.writeText(json)

    return json
}

export function importSettings(json) {
    try {
        const parsedSettings = JSON.parse(json)

        curSettings = {...curSettings, ...parsedSettings} // Merge the cur with the newly parse
        localStorage.setItem("musicalSetting", JSON.stringify(curSettings))

        window.dispatchEvent(new Event("instrumentsImported")); // Instruments react with new update inmediately
        window.dispatchEvent(new Event("tempo")); // Tempo react with new update 

        // Let me see if I can make this auto runs
        const globalEditor = getGlobalEditor()
        if (globalEditor) {
            const text = document.getElementById('proc')
            if (text) {
                const code = text.value
                const processed = ProcessText(code);
                globalEditor.setCode(processed)
                globalEditor.evaluate()
                console.log("Imported")
            }
            else {
                console.warn("Not found")
            }
        }
        
        alert("Import successfully")
        return curSettings
    }
    catch (err) {
        console.error(err)
        alert("Please make the import is correct! Can not get the import!")
        return null
    }
}

