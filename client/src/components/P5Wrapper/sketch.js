/* globals $ */
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

export default function (p) {
  // Methods -------------------------------------------------------------------
  p.setOnReady = function (cb) {
    p.onReady = cb;
  };

  p.pushProps = function (_props) {
    let props = _props;
    console.log(_props, 'push props')
    p.loop();
    
  }
  
  // Private members -----------------------------------------------------------
  
  
  
  
  
  
  
  // Private classes -----------------------------------------------------------
  
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
  
  
  // renderEffects(dir, depth, cfg) {
    //   const pg = this.pg;
    //   const {
      //     reverb
      //   } = cfg;
      
      //   this.reverbCounter++;
      
      
      
      function drawMatrix() {
        p.background(180)
        p.stroke('pink')
        p.strokeWeight(2)
        p.fill('white')
        for (let i = 0; i < p.beatLength + 1; i++) {
          
          p.line(i * p.cellWidth, 0, i * p.cellWidth, p.height)
        }
        for (let i = 0; i < 4; i++) {
          p.line(0, i * p.height / 3, p.width, i * p.height / 3)
        }
        p.noStroke()
        for (let i = 0; i < beatLength; i++) {
          if (hPat[i] === 1) {
            p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height / 6, 10)
          }
          if (cPat[i] === 1) {
            p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height / 2, 10)
          }
          if (bPat[i] === 1) {
            p.ellipse(i * cellWidth + 0.5 * cellWidth, p.height * 5 / 6, 10)
          }
        }
      }
      
      
      
      
      // Lifecycle methods =========================================================
      // preload() -----------------------------------------------------------------
      // p.preload = function() {

      //   hh = p.loadSound('assets/hh_sample.mp3')
      //   clap = p.loadSound('assets/clap_sample.mp3')
      //   bass = p.loadSound('assets/bass_sample.mp3')
      // }
      
      // setup() -------------------------------------------------------------------
      p.setup = function () {
        // console.log("::: setup() props:", props);
        let cnv = p.createCanvas(400, 300)
        cnv.mousePressed(canvasPressed)

        beatLength = 16
        
        cellWidth = p.width / beatLength
        cursorPos = 0
        
        hPat = [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1]
        cPat = [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1]
        bPat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
        sPat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

        // hPhrase = new p.p5.Phrase('hh', (time) => {
        //   hh.play(time)
        //   // console.log(time, 'this is time')
        // }, hPat);
      
      
      //   cPhrase = new p.p5.Phrase('clap', (time) => {
      //     clap.play(time)
      //     // console.log(time, 'this is time')
      //   }, cPat);
      
      
      //   bPhrase = new p.p5.Phrase('bass', (time) => {
      //     bass.play(time)
      //   }, bPat);
      
      //   drums = new p.p5.Part()
      
      //   drums.addPhrase(hPhrase)
      //   drums.addPhrase(cPhrase)
      //   drums.addPhrase(bPhrase)
      //   drums.addPhrase('seq', p.sequence, sPat)
      //   drums.onStep(() => { console.log(drums.partStep) })
      
      
        // bpmCTRL.position(800, 70)
        // bpmCTRL.input(() => { drums.setBPM(bpmCTRL.value()) })
        // drums.setBPM('80')
      
      //   drawMatrix()
    
      
        
      //   p.createCanvas(800, 300);
      //   p.colorMode(p.RGB, 255, 255, 255, 1.0);
        
      }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    // if (props.hh){
    //   hh = props.rotation * Math.PI / 180;
    // }
  }




  // draw() --------------------------------------------------------------------

    p.draw = function () {
      // p.background(100);
      // p.normalMaterial();
      // p.noStroke();
      // p.push();
      drawMatrix()
      // p.box(100);
      // p.pop();

  }

}


