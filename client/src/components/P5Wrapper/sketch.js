/* globals $ */
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
let color;
let props;


export default function (p) {
  // p.state = {}
  p.setOnReady = function (cb) {
    // p.onReady = cb;
    // stuff you need to render first 
    // console.log(cb, 'cb')
    // console.log(p, 'p');
    // console.log(p5, 'p5');
  }


  p.pushProps = function (_props) {
    // props = _props;
    // color = props.color
    // console.log(props.colors.red, props.colors.green, props.colors.blue)
    // console.log(props)
    // let updateAppProps = _updateApp
    // let hh = props.MainSynth.pentatonic
    // let clap = props.MainSynth.pentatonic[2]
    // let bass = props.MainSynth.pentatonic[3]
    // drawMatrix()
    // p.createCanvas(800, 300);
    // p.colorMode(p.RGB, 255, 255, 255, 1.0);
    // p.loop();
    // p.background(props.colors.red, props.colors.green, props.colors.blue);

  }

  // Private members ----------------------
  let onReady = () => { };
  let props = {};
  // let drumProps = [];


  // Private classes ---------------------------


  // Lifecycle methods ================
  p.preload = () => {
    // p.soundFormats('mp3', 'ogg');

    hh = p.loadSound('samples/WMHat04_C-04.mp3', () => { })
    clap = p.loadSound('samples/WMClap03-04.mp3', () => { })
    kick = p.loadSound('samples/MVKick06-04.mp3', () => { })
    snare = p.loadSound('samples/WMSnare16-04.mp3', () => { })


    tom = p.loadSound('samples/WMTom03_M-04.mp3')

    tom.disconnect();
  }



  p.setup = function () {
    let cnv = p.createCanvas(p.windowWidth, 300);
    // p.windowResized = (p.resizeCanvas(p.windowWidth, p.windowHeight)) 
    button = p.createButton();
    // console.log(props);

    cnv.mousePressed(canvasPressed)
    beatLength = 16
    cellWidth = p.width / beatLength
    cursorPos = 0


    // tom.disconnect()
    // reverb = new p5.Reverb()
    // console.log(p.getAudioContext(), window.AudioContext);
    // // reverb.addReverb(tom)
    // reverb.process(tom, 4, 2);



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
    bpmCTRL.position(600, 450)
    // bpmCTRL.input(() => {  drums.setBPM(bpmCTRL.value()) }) 

    drums.setBPM('70')

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
    // p.pixelDensity(1);
    // p.frameRate(15);
    // p.noLoop();
    // onReady();

  }


  // testing buttons() --------------------------------------------------------------------
  function mousePressed() {
    let checkPress = () => {
      console.log('button pressed')
    }
  }




  // draw() --------------------------------------------------------------------
  p.draw = function () {

    drawMatrix()
    // tom.play()
    // console.log('passingAnArrayOfapropsFromController')

  }



  p.keyPressed = () => {
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
    // this.updateApp(hPat,cPat,bPat,sPat);
  }

  function drawMatrix() {
    p.background(300, 400)
    p.stroke('black')
    p.strokeWeight(2)

    p.fill('green')
    


    // console.log('yeet');

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

