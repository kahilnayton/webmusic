import React, { useState } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import { render } from 'react-dom'

const NUMBER_OF_BUGS = 5

class Particle {
    constructor(p, diameter) {
        this.p = p
        this.diameter = diameter
        this.scale = this.p.random(0.5, 2.5)
        this.x = this.p.random(300)
        this.y = this.p.random(300)
        this.speed = 1
    }

    move() {
        this.x += this.p.random(-this.speed, this.speed)
        this.y += this.p.random(-this.speed, this.speed)
    }

    display() {
        this.p.circle(this.x, this.y, this.diameter * this.scale)
    }
}

function sketch(p) {
    const bugs = []
    let diameter = 0

    p.setup = () => {
        p.createCanvas(600, 400)
        for (let i = 0; i < NUMBER_OF_BUGS; i++) {
            bugs.push(new Particle(p, diameter))
        }
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (props.diameter) {
            diameter = props.diameter
        }
    }

    p.draw = () => {
        p.background(127)
        bugs.forEach((bug) => {
            bug.move()
            bug.diameter = diameter
            bug.display()
        })
    }
}

function App() {
    const [diameter, setDiameter] = useState(15)
    return (
        <>
            <label htmlFor="slider">
                <input
                    id="slider"
                    type="range"
                    min={10}
                    max={30}
                    step={1}
                    value={diameter}
                    onChange={event => setDiameter(+event.target.value)}
                />
                {diameter}
            </label>
            <P5Wrapper sketch={sketch} diameter={diameter} />
        </>
    )
}

render(<App />, window.document.querySelector('#app-root'))