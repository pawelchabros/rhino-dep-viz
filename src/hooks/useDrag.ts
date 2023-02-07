import { useState } from "react";

interface UseDragParams {
  x: number;
  y: number;
}

type PointerEventHandler = (event: React.PointerEvent<SVGGElement>) => void

type UseDragReturn = [
  {
    position: {
      x: number,
      y: number,
    },
    isDragged: boolean
  },
  {
    onPointerDown: PointerEventHandler,
    onPointerMove: PointerEventHandler,
    onPointerUp: PointerEventHandler,
  }
]

const useDrag = ({ x, y }: UseDragParams): UseDragReturn => {
  const [origin, setOrigin] = useState({
    mouse: { x: 0, y: 0 },
    object: { x: 0, y: 0 },
  })
  const [dragged, setDragged] = useState({ position: { x, y }, isDragged: false })
  const onPointerDown = (event: React.PointerEvent<SVGGElement>) => {
    const { clientX, clientY, target } = event;
    (target as SVGElement).setPointerCapture(event.pointerId);
    setOrigin({
      mouse: { x: clientX, y: clientY },
      object: { x, y },
    })
    setDragged((prev) => ({ ...prev, isDragged: true }))
  }
  const onPointerMove = ({ clientX, clientY }: { clientX: number, clientY: number }) => {
    if (dragged.isDragged) {
      setDragged({
        position: {
          x: origin.object.x + (clientX - origin.mouse.x),
          y: origin.object.y + (clientY - origin.mouse.y),
        }, isDragged: true
      })
    }
  }
  const onPointerUp = () => setDragged((prev) => ({ ...prev, isDragged: false }));
  const handlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
  return [dragged, handlers]
}

export default useDrag
