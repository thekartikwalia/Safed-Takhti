import React, { useContext } from "react";
import classes from "./index.module.css";

import cx from "classnames";

import { FaSlash } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import { FaFont } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { TOOL_ITEMS } from "../../constants";
import boardContext from "../../store/board-context";

const Toolbar = () => {
  const { activeToolItem, changeToolHandler, undo, redo } = useContext(boardContext);

  // Standard way to download canvas => https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
  const handleDownloadClick = () => {
    const canvas = document.getElementById("canvas");
    const data = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = data;
    anchor.download = "board.png";
    anchor.click();
  }

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.BRUSH,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.BRUSH)}
      >
        <FaPaintBrush />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.LINE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.LINE)}
      >
        <FaSlash />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.RECTANGLE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.RECTANGLE)}
      >
        <LuRectangleHorizontal />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.CIRCLE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.CIRCLE)}
      >
        <FaRegCircle />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ARROW,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.ARROW)}
      >
        <FaArrowRight />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ERASER,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.ERASER)}
      >
        <FaEraser />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.TEXT,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.TEXT)}
      >
        <FaFont />
      </div>
      <div
        className={classes.toolItem}
        onClick={undo}
      >
        <FaUndoAlt />
      </div>
      <div
        className={classes.toolItem}
        onClick={redo}
      >
        <FaRedoAlt />
      </div>
      <div
        className={classes.toolItem}
        onClick={handleDownloadClick}
      >
        <FaDownload />
      </div>
    </div>
  );
};

export default Toolbar;
