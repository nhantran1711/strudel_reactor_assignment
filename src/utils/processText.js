export function ProcessText(text) {

    const instruments = [
        {id: "p1_radio", placeholder: "<p1_Radio>"},
        {id: "p2_radio", placeholder: "<p2_Radio>"},
        {id: "p3_radio", placeholder: "<p3_Radio>"},
        {id: "p4_radio", placeholder: "<p4_Radio>"}
    ]
    
    let proccess = text;

    // Extract this tuple of id and placeholder
    for (const { id, placeholder } of instruments) {
        const isActive = document.getElementById(id)?.checked ?? false; // got id else none
        const replacement = isActive ? "" : "silence";
        proccess = proccess.replaceAll(placeholder, replacement); // Replace whatever the radio id with silence if the box is tick as not active
    }

    return proccess
}