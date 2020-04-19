import React, { Component, useRef, useLayoutEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function pt(x: number, y: number) {
  return [x, y] as const
}

type Pt = readonly [number, number]

function twoThirdsPoint(first: Pt, second: Pt) {
  return pt((2 * first[0] + second[0]) / 3, (2 * first[1] + second[1]) / 3)
}

function drawCatHead(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#FFFFFF'
  // ctx.fillStyle = '#9996FF'
  ctx.strokeStyle = '#A589E8'
  ctx.lineWidth = 5


  ctx.save();

  // transformations here
  ctx.translate(200, 200);
  ctx.save()
  ctx.rotate(-0.2)

  ctx.beginPath();

  const foreheadLeft = pt(-35, -25)
  const foreheadRight = pt(35, -25)
  const cheekRight = pt(70, 25)
  const chin = pt(0, 75)
  const cheekLeft = pt(-70, 25)

  const earLeft = pt(-60, -50)
  const earRight = pt(60, -50)


  const neckLeft = twoThirdsPoint(cheekLeft, chin)
  const neckRight = twoThirdsPoint(chin, cheekRight)
  const bodyLeft = pt(cheekLeft[0] - 80, chin[1] + 100)
  const bodyRight = pt(chin[0] + 30, bodyLeft[1])
  const pawCenter = pt(bodyRight[0] + 15, bodyRight[1] + 30)
  const armTop = pt(50, 120)
  const shoulderRight = twoThirdsPoint(neckRight, armTop)

  const tailTop = pt(bodyLeft[0] - 15, cheekLeft[1])
  const tailBottom = pt(bodyLeft[0] + 30, bodyLeft[1])

  ctx.moveTo(...foreheadLeft);
  ctx.lineTo(...foreheadRight);
  ctx.lineTo(...cheekRight);
  ctx.lineTo(...chin);
  ctx.lineTo(...cheekLeft);
  ctx.closePath();

  ctx.moveTo(...foreheadLeft);
  ctx.lineTo(...earLeft);
  ctx.lineTo(...cheekLeft);

  ctx.moveTo(...foreheadRight);
  ctx.lineTo(...earRight);
  ctx.lineTo(...cheekRight)

  ctx.moveTo(...neckLeft);
  ctx.rotate(0.2)
  ctx.lineTo(...bodyLeft);
  ctx.lineTo(...bodyRight);
  ctx.lineTo(...pawCenter);

  ctx.rotate(-0.2);
  ctx.lineTo(...armTop);
  ctx.lineTo(...chin);
  ctx.moveTo(...armTop);
  ctx.lineTo(...neckRight);

  ctx.moveTo(...shoulderRight);
  ctx.rotate(0.2);
  ctx.lineTo(...bodyRight);

  ctx.moveTo(...bodyLeft);
  ctx.lineTo(...tailTop);
  ctx.lineTo(...tailBottom)

  ctx.fill();
  ctx.stroke();

  ctx.restore();

}

function Cat() {
  const ref = useRef<HTMLCanvasElement>(null as any)
  useLayoutEffect(() => {
    const context = ref.current.getContext('2d')
    drawCatHead(context!)
  })
  return (
    <canvas ref={ref} width={400} height={500}>

    </canvas>
  )
}
function App() {
  return (
    <Cat />
  );
}

export default App;
