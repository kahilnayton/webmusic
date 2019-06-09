
import p5 from "p5";
import 'p5/lib/addons/p5.sound';




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
let color;
let props;


export default function (p) {
  p.setOnReady = function (cb) {
 
  }

  p.pushProps = function (_props) {
  }

  let onReady = () => { };
  let props = {};

  p.preload = () => {
    p.soundFormats('mp3');

    hh = p.loadSound('samples/Hat5.mp3', () => { })
    clap = p.loadSound('samples/Clap3.mp3', () => { })
    kick = p.loadSound('samples/Kick2.mp3', () => { })
    snare = p.loadSound('samples/Snare1.mp3', () => { })

  }

  p.setup = function () {
    let cnv = p.createCanvas(p.windowWidth, 200);
    cnv.mousePressed(canvasPressed)
    beatLength = 16
    cellWidth = p.width / beatLength
    cursorPos = 0

    p.preload(drums)


    hPat = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    cPat = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
    bPat = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0]
    sPat = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    followBeat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]


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

    // bpmCTRL = p.createSlider()
    // bpmCTRL.position(600, 450)
    // bpmCTRL.input(() => {  drums.setBPM(bpmCTRL.value()) }) 

    drums.setBPM('70')

    drawMatrix()

  }


  p.draw = function () {

    drawMatrix()

  }



  p.keyPressed = () => {
    if (p.key === " ") {
      if (hh.isLoaded() && clap.isLoaded() && kick.isLoaded() && snare.isLoaded()) {
        if (!drums.isPlaying) {
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
    } else if (rowClicked === 1) {
      cPat[indexClicked] = +!cPat[indexClicked]
    } else if (rowClicked === 2) {
      bPat[indexClicked] = +!bPat[indexClicked]
    } else if (rowClicked === 3) {
      sPat[indexClicked] = +!sPat[indexClicked]
    }
    drawMatrix()
  }

  function drawMatrix() {
    p.background(300, 200)
    p.stroke('black')
    p.strokeWeight(2)
    p.fill('green')
  

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

