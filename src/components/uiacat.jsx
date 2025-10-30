
import { useEffect, useState } from "react";
import catGif from '../assets/uia.gif'
import catStatic from '../assets/stacticcat.png'

export default function SpinningCat() {

    const [playing, setPlaying] = useState(false);

    // Keep checking whether the music is play or stop based on the global window events to keep everythin in sync
    useEffect(() => {
        const onPlay = () => setPlaying(true)
        const onStop = () => setPlaying(false)

        window.addEventListener("musicPlay", onPlay);
        window.addEventListener("musicStop", onStop);

        return () => {
            // Remove the event when done
            window.removeEventListener('musicPlay', onPlay)
            window.removeEventListener('musicStop', onStop)
        }
    }, [])

    return (
        <div className="spinning-cat">
            <img src={playing ? catGif : catStatic} alt="cat"></img>
        </div>
    )
}
