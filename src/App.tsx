import * as React from 'react';

function pt(x: number, y: number) {
  return [x, y] as const
}

type Pt = readonly [number, number]

function twoThirdsPoint(first: Pt, second: Pt) {
  return pt((2 * first[0] + second[0]) / 3, (2 * first[1] + second[1]) / 3)
}

function choose<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)]
}


function drawCatHead(ctx: CanvasRenderingContext2D) {
  const colorChoices = ["#FF96EF", "#D789E8", "#D254FF", "#D7A3FF", "#A689E8", "#D6D4FC", "#9BEFFA", "#E889B2"]
  const headColor = choose(colorChoices)
  const bodyColor = choose(colorChoices)
  ctx.fillStyle = '#FFFFFF'
  // ctx.fillStyle = '#9996FF'
  ctx.lineWidth = 5
  ctx.lineCap = "round"


  ctx.save();

  // transformations here
  ctx.scale(2, 2)
  ctx.translate(500, 200);
  ctx.save()

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


  ctx.moveTo(...bodyLeft);
  ctx.lineTo(...tailTop);
  ctx.lineTo(...tailBottom)

  ctx.strokeStyle = headColor
  ctx.stroke();
  ctx.beginPath();

  ctx.rotate(-0.2)
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



  ctx.strokeStyle = bodyColor
  ctx.stroke();
  ctx.beginPath();

  ctx.restore();

  ctx.rotate(-0.2)
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

  ctx.strokeStyle = headColor
  ctx.stroke();

}

function Cat() {
  const ref = React.useRef<HTMLCanvasElement>(null as any)
  React.useLayoutEffect(() => {
    const context = ref.current.getContext('2d')
    drawCatHead(context!)
  })
  return (
    <canvas ref={ref} width={3000} height={1000}>

    </canvas>
  )
}
function App() {
  return (
    <Cat />
  );
}

export default App;
