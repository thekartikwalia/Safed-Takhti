import React, { useContext } from "react";
import classes from "./index.module.css";

import cx from "classnames";
import {
  COLORS,
  FILL_TOOL_TYPES,
  SIZE_TOOL_TYPES,
  STROKE_TOOL_TYPES,
} from "../../constants";
import toolboxContext from "../../store/toolbox-context";
import boardContext from "../../store/board-context";

const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext);
  const { toolboxState, changeStroke, changeFill, changeSize } =
    useContext(toolboxContext);

  const strokeColor = toolboxState[activeToolItem]?.stroke; // ? agar uska stroke nahi hai toh
  const fillColor = toolboxState[activeToolItem]?.fill;
  const size = toolboxState[activeToolItem]?.size;

  return (
    <div className={classes.container}>
      {STROKE_TOOL_TYPES.includes(activeToolItem) && (
        <>
          <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Stroke Color</div>
            <div className={classes.colorsContainer}>
              {Object.keys(COLORS).map((key) => {
                return (
                  <div
                    key={key}
                    className={cx(classes.colorBox, {
                      [classes.activeColorBox]: strokeColor === COLORS[key],
                    })}
                    style={{ backgroundColor: COLORS[key] }}
                    onClick={() => changeStroke(activeToolItem, COLORS[key])}
                  ></div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {FILL_TOOL_TYPES.includes(activeToolItem) && (
        <>
          <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Fill Color</div>
            <div className={classes.colorsContainer}>
              {Object.keys(COLORS).map((key) => {
                return (
                  <div
                    key={key}
                    className={cx(classes.colorBox, {
                      [classes.activeColorBox]: fillColor === COLORS[key],
                    })}
                    style={{ backgroundColor: COLORS[key] }}
                    onClick={() => changeFill(activeToolItem, COLORS[key])}
                  ></div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {SIZE_TOOL_TYPES.includes(activeToolItem) && (
        <>
          <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Brush Size</div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={size}
              onChange={(event) =>
                changeSize(activeToolItem, event.target.value)
              }
            ></input>
          </div>
        </>
      )}
    </div>
  );
};

export default Toolbox;
