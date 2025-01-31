import React, { useReducer, useState } from "react";
import rough from "roughjs/bin/rough"; // different way of import

import boardContext from "./board-context";
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from "../constants";

const gen = rough.generator();

const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_ACTIONS.CHANGE_TOOL: {
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    }

    case BOARD_ACTIONS.DRAW_DOWN: {
      const prevElements = state.elements;
      const { clientX, clientY } = action.payload;
      const newElement = {
        id: state.elements.length,
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        roughEle: gen.line(clientX, clientY, clientX, clientY),
      };

      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.DRAWING,    // On CLICK, change it to "DRAWING"
        elements: [...prevElements, newElement],
      };
    }

    // Jo element maine bna na start kardiya hai
    // Ussi ka jake sirf (x2, y2) change krunga, (x1, y1) vohi rakhunga
    // Toh instead of pushing something to the elements state
    // I'll update elements state (update the element at the last index)

    // Jab yeh click hua hai, toh isko pata nhi chal raha ki draw kar raha hai ya nahi kar raha
    // Toh merko CLICK hone ke baad he move jo hai, usko handle karna hai
    // For that, i'm gonna create a global state (toolActionType) ki mai abhi kya kar raha hun apne board pe
    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      newElements[index].x2 = clientX;
      newElements[index].y2 = clientY;
      newElements[index].roughEle = gen.line(
        newElements[index].x1,
        newElements[index].y1,
        clientX,
        clientY
      );

      return {
        ...state,
        elements: newElements,
      };
    }

    case BOARD_ACTIONS.DRAW_UP: {
      return {
        ...state, 
        toolActionType: TOOL_ACTION_TYPES.NONE,    // On releasing mouse button, change back to "NONE" 
      };
    }

    default:
      return state;
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  toolActionType: TOOL_ACTION_TYPES.NONE,    // Initialise with "NONE" (not drawing, mouse hasn't been CLICKED yet)
  elements: [],
};

const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );

  // const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);
  // const [elements, setElements] = useState([]);
  // Instead of directly changing state, i'll dispatch an Action

  const changeToolHandler = (tool) => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_TOOL,
      payload: {
        tool,
      },
    });
  };

  const boardMouseDownHandler = (event) => {
    const { clientX, clientY } = event;

    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  // Mekro move tabhi karna hai jab mera toolActionType DRAWING ho (mtlb CLICK ho chuka ho)
  const boardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;

    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_MOVE,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const boardMouseUpHandler = () => {

    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_UP,
    });
  }

  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    toolActionType: boardState.toolActionType,
    elements: boardState.elements,
    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  };

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
