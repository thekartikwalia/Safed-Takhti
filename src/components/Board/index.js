import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ITEMS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";

function Board() {
  const canvasRef = useRef();
  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  } = useContext(boardContext);
  const { toolboxState } = useContext(toolboxContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  // useLayoutEffect hook is almost identical to 'useEffect', but it fires
  // synchronously after all DOM mutations.It's used to read layout from DOM and
  // re-render synchronously. Updates scheduled inside 'useLayoutEffect' will be
  // flushed synchronously, before the browser has a chance to paint. Essentially,
  // it's used for the tasks that need to be done right after the DOM updates,
  // before the screen is updated. This avoids flickering issue that can happen
  // with 'useEffect' if you're manipulating the DOM.

  // In simple terms, if you need to directly interact with the DOm or need to adjust
  // something in the DOM before the screen is updated (like measurements or scroll
  // positions), 'useLayoutEffect' is the better choice. For other side effects that don't
  // require immediate synchronisation with the DOM (like fetching data, setting up
  // subscriptions, etc.), 'useEffect' is suitable and generally preferred due to it's
  // non-blocking nature
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.ARROW:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.RECTANGLE:
          roughCanvas.draw(element.roughEle); // draw expects element as an object
          break;

        // Don't use rough library in case of BRUSH tool
        case TOOL_ITEMS.BRUSH:
          context.fillStyle = element.stroke;
          context.fill(element.path);
          context.restore(); // Bcoz jab mai fillStyle change krunga toh har cheez ki fillStyle change hojayegi
          break;

        default:
          throw new Error("Type not recognised");
      }
    });

    // Cleanup Function to clean the board upon change of elements
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  const handleMouseDown = (event) => {
    boardMouseDownHandler(event, toolboxState);
  };

  // Mekro move tabhi karna hai jab mera toolActionType DRAWING ho (mtlb CLICK ho chuka ho)
  const handleMouseMove = (event) => {
    boardMouseMoveHandler(event);
  };

  const handleMouseUp = () => {
    boardMouseUpHandler();
  };

  return (
    <canvas
      // style={{ border: "1px solid black" }}
      ref={canvasRef}
      id="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

export default Board;
