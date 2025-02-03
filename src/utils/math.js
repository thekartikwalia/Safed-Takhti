import { ELEMENT_ERASE_THRESHOLD, TOOL_ITEMS } from "../constants";

export const getArrowHeadsCoordinates = (x1, y1, x2, y2, arrowLength) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);

  const x3 = x2 - arrowLength * Math.cos(angle - Math.PI / 6);
  const y3 = y2 - arrowLength * Math.sin(angle - Math.PI / 6);

  const x4 = x2 - arrowLength * Math.cos(angle + Math.PI / 6);
  const y4 = y2 - arrowLength * Math.sin(angle + Math.PI / 6);

  return { x3, y3, x4, y4 };
};

// Takes in the stroke (in library), and converts it into SVG path
// Turn the points returned from perfect-freehand into SVG path data.
// Taken from: https://codesandbox.io/p/sandbox/perfect-freehand-example-biwyi?file=/src/utils.js:1,1-18,1
export function getSvgPathFromStroke(stroke) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}

// Logic would be dependent upon the type of tool element we wanna erase
export const isPointNearElement = (element, pointX, pointY) => {
  const { x1, y1, x2, y2, type } = element;
  switch (type) {
    case TOOL_ITEMS.LINE:
    case TOOL_ITEMS.ARROW:
      return isPointCloseToLine(x1, y1, x2, y2, pointX, pointY);

    case TOOL_ITEMS.RECTANGLE:
    case TOOL_ITEMS.CIRCLE:
      return (
        isPointCloseToLine(x1, y1, x2, y1, pointX, pointY) ||
        isPointCloseToLine(x1, y1, x1, y2, pointX, pointY) ||
        isPointCloseToLine(x2, y1, x2, y2, pointX, pointY) ||
        isPointCloseToLine(x1, y2, x2, y2, pointX, pointY)
      );

    // isPointInPath() method => https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
    case TOOL_ITEMS.BRUSH: {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      return context.isPointInPath(element.path, pointX, pointY);
    }
    
    case TOOL_ITEMS.TEXT: {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      context.font = `${element.size}px Caveat`;
      context.fillStyle = element.stroke;
      const textWidth = context.measureText(element.text).width;
      const textHeight = parseInt(element.size); // parseInt bcoz it returns string
      context.restore();
      return (
        isPointCloseToLine(x1, y1, x1 + textWidth, y1, pointX, pointY) ||
        isPointCloseToLine(x1, y1, x1, y1 + textHeight, pointX, pointY) ||
        isPointCloseToLine(
          x1,
          y1 + textHeight,
          x1 + textWidth,
          y1 + textHeight,
          pointX,
          pointY
        ) ||
        isPointCloseToLine(
          x1 + textWidth,
          y1,
          x1 + textWidth,
          y1 + textHeight,
          pointX,
          pointY
        )
      );
    }

    default:
      throw new Error("Type not recognized");
  }
};

export const isPointCloseToLine = (x1, y1, x2, y2, pointX, pointY) => {
  const distToStart = distanceBetweenPoints(x1, y1, pointX, pointY);
  const distToEnd = distanceBetweenPoints(x2, y2, pointX, pointY);
  const distLine = distanceBetweenPoints(x1, y1, x2, y2);

  return Math.abs(distToStart + distToEnd - distLine) < ELEMENT_ERASE_THRESHOLD;
};

export const distanceBetweenPoints = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;

  return Math.sqrt(dx * dx + dy * dy);
};
