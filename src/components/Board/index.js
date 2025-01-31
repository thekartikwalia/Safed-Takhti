import { useEffect, useRef } from "react";
import rough from "roughjs";

function Board() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // const context = canvas.getContext("2d");

    const roughCanvas = rough.canvas(canvas);
    const generator = roughCanvas.generator;
    let rect1 = generator.rectangle(10, 10, 100, 100);
    let rect2 = generator.rectangle(10, 120, 100, 100, {
      fill: "red",
      stroke: "blue",
    });
    roughCanvas.draw(rect1);
    roughCanvas.draw(rect2);

    // context.fillStyle = "red";
    // context.fillRect(0, 0, 150, 75);
  }, []);

  return <canvas style={{ border: "1px solid black" }} ref={canvasRef} />;
}

export default Board;
