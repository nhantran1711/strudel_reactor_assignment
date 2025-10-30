
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

        // Deley re-render as I got a bug where stuff does not update well
        setTimeout(() => {
            window.dispatchEvent(new Event("instrumentsImported")); // Instruments react with new update inmediately
            window.dispatchEvent(new Event("tempo")); // Tempo react with new update 
        }, 50)


        // Let me see if I can make this auto runs
        const globalEditor = getGlobalEditor()
        if (globalEditor) {
            const text = document.getElementById('proc')
            if (text) {
                // Use the logic of settings value in tempo to set up in here
                const tempoValue = curSettings.tempo;
                const defaultTempo = 140;
                const cps = (defaultTempo * tempoValue) / 60 / 4
                const newCps = `setcps(${cps})`

                const lines = text.value.split("\n")

                let flag = false
                
                // Use to find the line starts with setcps to change the settings for tempo value
                const updateLines = lines.map(line => {
                    if (line.startsWith("setcps(")) {
                        flag = true;
                        return newCps
                    }
                    return line
                })
                
                // If we didnt found the setcps aka it does not exists
                if (!flag) return updateLines.unshift(newCps)
                text.value = updateLines.join("\n")
                

                // Logic for update the new code into text area and strudel code
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

