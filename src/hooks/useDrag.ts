import { useState } from "react";

interface UseDragParams {
  x: number;
  y: number;
}

type PointerEventHandler = (event: React.PointerEvent<SVGGElement>) => void

type UseDragReturn = [
  {
    x: number,
    y: number,
  },
  boolean,
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
  const [draggedPosition, setDraggedPosition] = useState({ x, y })
  const [isDragged, setIsDragged] = useState(false)
  const onPointerDown = (event: React.PointerEvent<SVGGElement>) => {
    const { clientX, clientY, target } = event;
    (target as SVGElement).setPointerCapture(event.pointerId);
    setOrigin({
      mouse: { x: clientX, y: clientY },
      object: { x, y },
    })
    setIsDragged(true)
  }
  const onPointerMove = ({ clientX, clientY }: { clientX: number, clientY: number }) => {
    if (isDragged) {
      setDraggedPosition({
        x: origin.object.x + (clientX - origin.mouse.x),
        y: origin.object.y + (clientY - origin.mouse.y),
      })
    }
  }
  const onPointerUp = () => setIsDragged(false);
  const handlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
  return [draggedPosition, isDragged, handlers]
}

export default useDrag
