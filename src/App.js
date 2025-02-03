import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div>
      <BoardProvider>
        <ToolboxProvider>
          <Toolbar />
          <Board />
          <Toolbox />
        </ToolboxProvider>
      </BoardProvider>
      <Analytics />
    </div>
  );
}

export default App;
