/* globals $ */
import Tone from 'tone';

import p5 from "p5";
import 'p5/lib/addons/p5.sound';
// import 'p5/lib/addons/p5.dom';




let cPhrase;
let hh, clap, bass;
let hPat, cPat, bPat;
let hPhrase, bPhrase;
let drums;
let bpmCTRL;
let beatLength;
let cellWidth
let cnv
let sPat
let cursorPos
let button


export default function (p) {
  p.setOnReady = function (cb) {
    p.onReady = cb;
    // stuff you need to render first 
    // console.log(cb, 'cb')
    // console.log(p, 'p');
    // console.log(p5, 'p5');

  }


  p.pushProps = function (_props) {
    let props = _props;
    // console.log(props, p, 'push props')
    // let hh = props.MainSynth.pentatonic
    // let clap = props.MainSynth.pentatonic[2]
    // let bass = props.MainSynth.pentatonic[3]
    // console.log(hh, 'hh')
    drawMatrix()
    // p.createCanvas(800, 300);
    // p.colorMode(p.RGB, 255, 255, 255, 1.0);
    p.loop();
    Tone.Transport.start()
  }

  p.preload =() => {
    // p.soundFormats('mp3')
    hh = p.loadSound('samples/hh_sample.mp3')
    clap = p.loadSound('samples/clap_sample.mp3')
    bass = p.loadSound('samples/bass_sample.mp3')


  }



  p.setup = function () {
    // console.log("::: setup() props:", props);
    let cnv = p.createCanvas(1000, 300)
    cnv.mousePressed(canvasPressed)
    beatLength = 16
    cellWidth = p.width / beatLength
    cursorPos = 0

    p.preload(drums)





    hPat = [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]
    cPat = [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1]
    bPat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    sPat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    // console.log(p)
    drums = new p5.Part();
    // p.preload(drums);
    hPhrase = new p5.Phrase('hh', (time) => { hh.play(time) }, hPat);
    cPhrase = new p5.Phrase('clap', (time) => { clap.play(time) }, cPat);
    bPhrase = new p5.Phrase('bass', (time) => { bass.play(time) }, bPat);


    drums.addPhrase(hPhrase)
    drums.addPhrase(cPhrase)
    drums.addPhrase(bPhrase)
    drums.addPhrase('seq', p.sequence, sPat)
    drums.onStep(() => { console.log(drums.partStep) })

    
    drums.setBPM('60')
    
    // let button = p.createButton('start');
    // button.position(65);
    // button.mousePressed(drums.loop());
    
    drawMatrix()
    
    // bpmCTRL = new p.createSlider()
    // bpmCTRL.position(800, 70)
    // bpmCTRL.input(() => { drums.setBPM(bpmCTRL.value()) })
  }



  p.draw = function () {
   

    // p.background(100);
    // p.normalMaterial();
    // p.noStroke();
    // p.push();
    // drawMatrix()
    // p.box(100);
    // p.pop();

  }

  p.keyPressed = () => {
    console.log(p.keyPressed, 'key pressed')
    if (p.key === " ") {
      if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded()) {
        if (!drums.isPlaying) {
          // this will take the loop to the start 
          // drums.metro.metroTicks = 0

          drums.loop()
        } else {
          drums.stop()
          console.log('ooops no drums')
        }
      }
    }
  }

  function canvasPressed() {
    let rowClicked = p.floor(3 * p.mouseY / p.height)
    let indexClicked = p.floor(16 * p.mouseX / p.width)
    if (rowClicked === 0) {
      hPat[indexClicked] = +!hPat[indexClicked]
      // console.log('first row clicked')
    } else if (rowClicked === 1) {
      cPat[indexClicked] = +!cPat[indexClicked]
      // console.log('sencond row clicked')
    } else if (rowClicked === 2) {
      bPat[indexClicked] = +!bPat[indexClicked]
      // console.log('third row clicked')
    }
    drawMatrix()
  }

  function drawMatrix() {
    p.background(180)
    p.stroke('black')
    p.strokeWeight(2)
    p.fill('black')


    for (let i = 0; i < p.beatLength + 1; i++) {

      p.line(i * p.cellWidth, 0, i * p.cellWidth, p.height)
    }
    for (let i = 0; i < 4; i++) {
      p.line(0, i * p.height / 3, p.width, i * p.height / 3)
    }
    p.noStroke()
    for (let i = 0; i < beatLength; i++) {
      if (hPat[i] === 1) {
        p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height / 6, 15)
      }
      if (cPat[i] === 1) {
        p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height / 2, 15)
      }
      if (bPat[i] === 1) {
        p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height * 5 / 6, 15)
      }
    }
  }


  function sequence(time, beatIndex) {
    console.log(beatIndex, 'beat index')
    setTimeout(() => {
      drawMatrix()
      drawPlayhead(beatIndex)
    }, time * 1000)


  }

  function drawPlayhead(beatIndex) {
    p.stroke('red')
    p.fill(255, 0, 0, 30)
    p.rect((beatIndex - 1) * cellWidth, 0, cellWidth, p.height)
  }

}



