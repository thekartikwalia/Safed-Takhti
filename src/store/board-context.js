import { createContext } from "react";

const boardContext = createContext({
    activeToolItem: "",
    handleToolItemClick: () => {},
})

export default boardContext;