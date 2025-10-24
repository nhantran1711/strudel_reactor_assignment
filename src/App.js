import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useRef } from "react";
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
import { ProcAndPlay } from './utils/procAndPlay';
import { setGlobalEditor } from './utils/editorContext';
import SaveSoundButton from './components/saveSound';
import TempoSlider from './components/tempoSlider';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

const hasRun = useRef(false);

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
        Proc()
    }

}, []);


return (
    <div>
        <h2>Cooking up some beat</h2>
        <main>

            <div className="container-fluid">
                <div className="row">

                    {/* Text Process */}
                    <div className="col-md-8">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label text-dark fw-medium">Type your beat here:...</label>
                        <textarea className="form-control" rows={15} id="proc" ></textarea>
                    </div>

                    {/* Control Panel */}
                    <div className="col-md-4">
                        <div className="control-panel">
                            <h5 className="text-center text-dark mb-3 fw-semibold" >Control Panel</h5>

                            <button id="process" className="btn">Preprocess</button>
                            <button id="process_play" className="btn">Proc & Play</button>
                            <button id="play" className="btn">Play</button>
                            <button id="stop" className="btn">Stop</button>

                            <SaveSoundButton textareaId='proc' />

                            <h2>Audio Control</h2>
                            <TempoSlider defaultTempo={140} min={0.5} max={2} step={0.01} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" className='mt-2' />
                    </div>
                    <div className="col-md-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                p1: ON
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                p1: HUSH
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}