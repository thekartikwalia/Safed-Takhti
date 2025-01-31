import { TOOL_ITEMS } from "../constants";

import rough from "roughjs/bin/rough"; // different way of import

const gen = rough.generator();

// Utility function joki merko naya element bnake dega based on co-ordinates
export const createRoughElement = (id, x1, y1, x2, y2, { type }) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
  };

  // RoughJs baar baar nayi handwritten-style generate kar raha hai, decreases user experience
  // Isko bhi handle karne ka option hota hai RoughJs mei
  // At time of making element, you can give it options
  let options = {
    seed: id + 1, // +1 bcoz seed can't be 0 (but we're passing index also as id in case of RECTANGLE)
  };
  // On providing options, it won't generate new handwritten style, instead it'll take from seed

  switch (type) {
    case TOOL_ITEMS.LINE:
      element.roughEle = gen.line(x1, y1, x2, y2, options);
      return element;

    case TOOL_ITEMS.RECTANGLE:
      element.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
      return element;

    default:
      throw new Error("Type not recognised");
  }
};
