import React, { useState } from "react";

import boardContext from "./board-context";
import { TOOL_ITEMS } from "../constants";

const BoardProvider = ({ children }) => {
  const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);

  const handleToolItemClick = (tool) => {
    setActiveToolItem(tool);
  };

  const boardContextValue = {
    activeToolItem,
    handleToolItemClick,
  };

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
