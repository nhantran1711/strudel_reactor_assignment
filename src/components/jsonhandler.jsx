

let curSettings = {
    tempo : null,
    instrument : {}
}

export function getSettings() {
    curSettings = JSON.parse(localStorage.getItem('musicalSetting'))
    return curSettings
}

export function setSettings(obj) {
    curSettings = {...curSettings, ...obj}
    localStorage.setItem('musicalSetting', JSON.stringify(curSettings))
}



