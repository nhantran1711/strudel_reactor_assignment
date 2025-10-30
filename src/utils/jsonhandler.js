

let curSettings = {
    tempo : null,
    instrument : {}
}

export function getSettings() {
    curSettings = JSON.parse(localStorage.getItem('musicalSetting')) // Get storing local storage
    return curSettings
}

export function setSettings(obj) {
    curSettings = {...curSettings, ...obj} // Merge the cur settings with the saving one
    localStorage.setItem('musicalSetting', JSON.stringify(curSettings)) 
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
        return curSettings
    }
    catch (err) {
        console.error(err)
        alert("Cant get the import")
        return null
    }
}

