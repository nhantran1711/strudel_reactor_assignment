import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import { SetupButtons} from './utils/setup';
import { Proc } from './utils/proc';
import { setGlobalEditor } from './utils/editorContext';
import SaveSoundButton from './components/saveSound';
import TempoSlider from './components/tempoSlider';
import Instrumental from './components/instrumental';
import { SetupEffectHotkeys } from './components/hotkeys';
import D3Graph from "./components/d3graph";
import { exportSettings, importSettings } from './utils/jsonhandler';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

const defaultTrack = stranger_tune
const hasRun = useRef(false);
const [procText, setProcText] = useState(defaultTrack)
const [liveUpdate, setLiveUpdate] = useState(true)

const toggleUpdate = () => setLiveUpdate(!liveUpdate)

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps

            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
        
        setGlobalEditor(globalEditor);
        
        document.getElementById('proc').value = stranger_tune
        SetupButtons()
        SetupEffectHotkeys()
        Proc()
    }

}, []);


return (

    <div className="container-fluid min-vh-100 d-grid gap-4 p-4 app-grid">

        <div className="panel panel-controls">
            <h5 className="panel-title text-success">Controls</h5>
            <div className="pad-grid">
                <button className="dj-btn btn-green" id='process_play'>Play</button>
                <button className="dj-btn btn-blue" id='play'>Run</button>
                <button className="dj-btn btn-purple" id='stop'>Stop</button>
                <button className="dj-btn btn-gray" id='process'>Update</button>
            </div>
        </div>

        <div className="panel panel-notepad shadow-lg">
            <h5 className="panel-title text-purple">Music Notepad</h5>
            <textarea
                className="music-textarea form-control"
                rows="10"
                id="proc"
                value={procText}
                onChange={(e) => setProcText(e.target.value)}
                placeholder="Write your strudel sequences here..."></textarea>
        </div>


        <div className="panel panel-effects">
            <h5 className="panel-title text-blue">Effects</h5>
            <div className="d-grid gap-2">
                <SaveSoundButton textareaId='proc' /> 
                <TempoSlider />
                <Instrumental />
            </div>
            <div className='d-flex gap-2'>
                <button className='dj-btn btn-blue' onClick={() => alert(exportSettings())}>Export JSON</button>
                <button className='dj-btn btn-purple' onClick={() => {
                    const json = prompt("Please paste the code....");
                    importSettings(json)
                }}>Import JSON</button>
            </div>
        </div>

        <div className="panel panel-canvas">
            <h6 className="panel-subtitle text-blue">Canvas</h6>
            <div className="canvas-container">
                <canvas id="roll"></canvas> 
            </div>
        </div>


        <div className="panel panel-code">
            <h6 className="panel-subtitle text-purple">Strudel Code</h6>
            <div id="editor"></div>
            <div id="output" className="mt-2"></div>
        </div>


        <div className="panel panel-graph">
            <h6 className="panel-subtitle text-blue">Live Graph</h6>
            <div className="canvas-container">
                <D3Graph liveUpdate={liveUpdate} />
            </div>
        </div>

    </div>
    )
}
