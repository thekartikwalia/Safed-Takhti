import React, { useContext } from "react";
import classes from "./index.module.css";

import cx from "classnames";
import { COLORS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";
import boardContext from "../../store/board-context";

const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext);
  const { toolboxState, changeStroke } = useContext(toolboxContext);

  const strokeColor = toolboxState[activeToolItem]?.stroke; // ? agar uska stroke nahi hai toh

  return (
    <div className={classes.container}>
      <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Stroke</div>
        <div className={classes.colorsContainer}>
          {Object.keys(COLORS).map((key) => {
            return (
              <div
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
    </div>
  );
};

export default Toolbox;
