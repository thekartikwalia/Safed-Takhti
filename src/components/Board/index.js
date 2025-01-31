import { useContext, useEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";

function Board() {
  const canvasRef = useRef();
  const { elements, boardMouseDownHandler } = useContext(boardContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas = rough.canvas(canvas);
    
    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle);    // draw expects element as an object
    });

    // Cleanup Function to clean the board upon change of elements 
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  const handleBoardMouseDown = (event) => {
    boardMouseDownHandler(event);
  };

  return (
    <canvas
      style={{ border: "1px solid black" }}
      ref={canvasRef}
      onMouseDown={handleBoardMouseDown}
    />
  );
}

export default Board;
