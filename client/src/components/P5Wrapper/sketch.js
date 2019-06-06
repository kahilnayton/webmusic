/* globals $ */
import Tone from 'tone';

import p5 from "p5";
import 'p5/lib/addons/p5.sound';
// import 'p5/lib/addons/p5.dom';



let hh, clap, kick, snare, tom, soundFile
let hPat, cPat, bPat;
let hPhrase, bPhrase, sPhrase, cPhrase;
let drums;
let bpmCTRL;
let beatLength;
let cellWidth
let cnv
let sPat
let cursorPos
let button
let rSlider, gSlider, bSlider;
let followBeat
let reverb, sound
let r, g, b


export default function (p) {
  p.setOnReady = function (cb) {
    p.onReady = cb;
    // stuff you need to render first 
    // console.log(cb, 'cb')
    console.log(p, 'p');
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

  p.preload = () => {
    p.soundFormats('mp3', 'ogg');

    hh = p.loadSound('samples/WMHat04_C-04.mp3', () => { })
    clap = p.loadSound('samples/WMClap03-04.mp3', () => { })
    kick = p.loadSound('samples/MVKick06-04.mp3', () => { })
    snare = p.loadSound('samples/WMSnare16-04.mp3', () => { })


    soundFile = p.loadSound('samples/WMTom03_M-04.mp3')
    soundFile.disconnect();
  }



  p.setup = function () {
    // console.log("::: setup() props:", props);
    let cnv = p.createCanvas(p.windowWidth, 400);
    // p.windowResized = (p.resizeCanvas(p.windowWidth, p.windowHeight)) 
    p.background(255, 0, 200);
    cnv.mousePressed(canvasPressed)
    beatLength = 16
    cellWidth = p.width / beatLength
    cursorPos = 0

    // reverb = new p5.Reverb();
    // reverb.process(soundFile, 3, 2);
    // soundFile.play()


    p.preload(drums)




    hPat = [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]
    cPat = [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1]
    bPat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    sPat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    followBeat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    // console.log(p)
    // p.preload(drums);
    hPhrase = new p5.Phrase('hh', (time) => { hh.play(time) }, hPat);
    cPhrase = new p5.Phrase('clap', (time) => { clap.play(time) }, cPat);
    bPhrase = new p5.Phrase('kick', (time) => { kick.play(time) }, bPat);
    sPhrase = new p5.Phrase('snare', (time) => { snare.play(time) }, sPat);

    drums = new p5.Part();

    drums.addPhrase(hPhrase)
    drums.addPhrase(cPhrase)
    drums.addPhrase(bPhrase)
    drums.addPhrase(sPhrase)

    drums.addPhrase('seq', p.sequence, followBeat)
    drums.onStep(() => { console.log(drums.partStep) })


    // let button = p.createButton('start');
    // button.position(65);
    // button.mousePressed(drums.loop());

    bpmCTRL = p.createSlider()
    bpmCTRL.position(80, 70)
    // bpmCTRL.input(() => { drums.p.setBPM(bpmCTRL.value()) })
    // drums.setBPM('60')

    drawMatrix()


    // let rSlider = p.createSlider(0, 255, 100);
    // rSlider.position(20, 20);
    // let gSlider = p.createSlider(0, 255, 0);
    // gSlider.position(20, 50);
    // let bSlider = p.createSlider(0, 255, 255);
    // bSlider.position(20, 80);

    // r = rSlider.value();
    // g = gSlider.value();
    // b = bSlider.value();


  }

  p.mousePressed = () => {
    soundFile.play()

  }



  p.draw = () => {
  
    // p.background(r, g, b);
    // p.text('red', rSlider.x * 2 + rSlider.width, 35);
    // p.text('green', gSlider.x * 2 + gSlider.width, 65);
    // p.text('blue', bSlider.x * 2 + bSlider.width, 95);

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
      if (hh.isLoaded() && clap.isLoaded() && kick.isLoaded() && snare.isLoaded()) {
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
    let rowClicked = p.floor(4 * p.mouseY / p.height)
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
    } else if (rowClicked === 3) {
      sPat[indexClicked] = +!sPat[indexClicked]
      // console.log('third row clicked')
    }
    drawMatrix()
  }

  function drawMatrix() {
    p.background(300, 400)
    p.stroke('black')
    p.strokeWeight(2)
    p.fill('black')


    for (let i = 0; i < beatLength; i++) {
      p.line(i * p.width / beatLength, 0, i * p.width / beatLength, p.height)
    } for (let i = 0; i < 5; i++) {
      p.line(0, i * p.height / 4, p.width, i * p.height / 4)
    }
    p.noStroke()

    for (let i = 0; i < beatLength; i++) {
      if (hPat[i] === 1) {
        p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height / 8, 25)
      }
      if (cPat[i] === 1) {
        p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height * 3 / 8, 25)
      }
      if (bPat[i] === 1) {
        p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height * 5 / 8, 25)
      }
      if (sPat[i] === 1) {
        p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height * 7 / 8, 25)
      }
    }
  }


  p.sequence = (time, beatIndex) => {
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



