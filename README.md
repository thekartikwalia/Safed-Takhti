# Safed-Takhti ✏️

A dynamic, feature-rich whiteboard application built with React and HTML5 Canvas that enables real-time drawing, sketching, and collaborative design work.

## Features 🎨

- **Multiple Drawing Tools**
  - Line tool with customizable stroke
  - Rectangle and ellipse shapes
  - Arrow tool for annotations
  - Freehand brush for natural drawing
  - Text tool with adjustable positioning

- **Advanced Editing Capabilities**
  - Eraser tool with precision control
  - Undo/Redo functionality
  - Color picker for unlimited creativity
  - Adjustable stroke width

- **User-Friendly Interface**
  - Clean, intuitive toolbar
  - Responsive canvas design
  - Download functionality for saving work
  - Smooth drawing experience

## Tech Stack 💻

- **Frontend Framework:** React.js
- **Styling:** Tailwind CSS
- **Drawing Libraries:**
  - Perfect Freehand - Provides smooth, natural brush strokes
  - Rough.js - Creates hand-drawn, sketchy style graphics
- **State Management:** React Context API
- **Deployment:** Vercel

## Installation 🚀

1. Clone the repository:
    ```bash
    git clone https://github.com/thekartikwalia/sketch-it.git
    ```

2. Navigate to the project directory:
    ```bash
    cd sketch-it
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage 🖱️

1. Select a tool from the toolbar (line, rectangle, ellipse, arrow, brush, or text)
2. Choose your preferred color using the color picker
3. Click and drag on the canvas to draw
4. Use the eraser tool to remove unwanted elements
5. Utilize undo/redo buttons to manage your changes
6. Download your creation when finished

## Implementation Details 🛠️

- Implemented custom state management using React's Context API and useReducer for optimal performance
- Utilized useLayoutEffect for synchronous DOM mutations in shape rendering
- Handled complex mouse events for smooth drawing experience
- Integrated RoughJS for creating hand-drawn style elements
- Used Perfect Freehand for natural-looking brush strokes
- Managed tool states using a dedicated ToolActionType system
- Implemented history management for undo/redo functionality

## Recent Updates 🆕

- Added download functionality for saving work
- Implemented color picker with enhanced UI
- Fixed text erasing functionality using measureText
- Added undo/redo system with history state management
- Improved brush tool with multiple stroke options

## Future Scope 🔮

- **Real-time Collaboration**
  - Implement WebSocket integration for live multi-user drawing sessions
  - Add user cursors and presence indicators
  - Enable real-time chat between collaborators
  - Implement room-based collaboration system

- **Enhanced Features**
  - Add shape manipulation (resize, rotate, move)
  - Implement layers system for better organization
  - Add custom templates and stickers
  - Enable cloud storage for saving boards
  - Add export options in multiple formats (PNG, SVG, PDF)

- **User Management**
  - Implement user authentication
  - Add personal dashboard for saved boards
  - Enable board sharing and permissions management
  - Add feature to create teams and organize boards

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is open source and available under the [MIT License](LICENSE).

## Contact 📧

Kartik Walia - [GitHub](https://github.com/thekartikwalia)

Project Link: [https://github.com/thekartikwalia/sketch-it](https://github.com/thekartikwalia/sketch-it)