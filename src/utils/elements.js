import { ARROW_LENGTH, TOOL_ITEMS } from "../constants";

import rough from "roughjs/bin/rough"; // different way of import
import { getArrowHeadsCoordinates, getSvgPathFromStroke } from "./math";
import getStroke from "perfect-freehand";

const gen = rough.generator();

// Utility function joki merko naya element bnake dega based on co-ordinates
export const createRoughElement = (
  id,
  x1,
  y1,
  x2,
  y2,
  { type, stroke, fill, size }
) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    stroke,
    fill,
    size,
  };

  // RoughJs baar baar nayi handwritten-style generate kar raha hai, decreases user experience
  // Isko bhi handle karne ka option hota hai RoughJs mei
  // At time of making element, you can give it options
  let options = {
    seed: id + 1, // +1 bcoz seed can't be 0 (but we're passing index also as id in case of RECTANGLE)
    fillStyle: "solid",
  };
  // On providing options, it won't generate new handwritten style, instead it'll take from seed

  if (stroke) {
    options.stroke = stroke;
  }
  if (fill) {
    options.fill = fill;
  }
  if (size) {
    options.strokeWidth = size;
  }

  switch (type) {
    case TOOL_ITEMS.LINE: {
      element.roughEle = gen.line(x1, y1, x2, y2, options);
      return element;
    }

    case TOOL_ITEMS.RECTANGLE: {
      const width = x2 - x1,
        height = y2 - y1;
      element.roughEle = gen.rectangle(x1, y1, width, height, options);
      return element;
    }

    case TOOL_ITEMS.CIRCLE: {
      const width = x2 - x1,
        height = y2 - y1;
      const mid_x = (x1 + x2) / 2,
        mid_y = (y1 + y2) / 2;
      element.roughEle = gen.ellipse(mid_x, mid_y, width, height, options);
      return element;
    }

    case TOOL_ITEMS.ARROW: {
      const { x3, y3, x4, y4 } = getArrowHeadsCoordinates(
        x1,
        y1,
        x2,
        y2,
        ARROW_LENGTH
      );

      const points_sequence = [
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x2, y2],
        [x4, y4],
      ];
      element.roughEle = gen.linearPath(points_sequence, options);
      return element;
    }

    case TOOL_ITEMS.BRUSH: {
      // Brush ke case mei elements mei points honge (as Array of Objects)
      const brushElement = {
        id,
        points: [{ x: x1, y: y1 }],
        path: new Path2D(getSvgPathFromStroke(getStroke([{ x: x1, y: y1 }]))),    // path bnane ka treka hota hai new Path2D()
        type,
        stroke,
      };
      return brushElement;
    }

    case TOOL_ITEMS.TEXT: {
      element.text = "";
      return element;
    }

    default:
      throw new Error("Type not recognised");
  }
};
