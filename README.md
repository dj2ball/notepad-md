# Notepad.md

A simple, elegant markdown editor built with Electron. "Obsidian but with less" - focusing on simplicity and essential functionality.

## Features

- **Clean Interface**: Distraction-free writing environment with split-screen preview
- **Tab Management**: Multiple tabs with auto-save functionality
- **Markdown Support**: Real-time preview with essential markdown features
- **Session Management**: Save and restore entire sessions with multiple tabs
- **Dark Mode**: Toggle between light and dark themes
- **File Operations**: Save individual files (.md) or entire sessions (.npmd)
- **Keyboard Shortcuts**: Full keyboard navigation support

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notepad-md.git
   cd notepad-md
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

## Building for Production

To build the application for distribution:

```bash
npm run build
```

This will create platform-specific packages in the `dist` folder.

## Keyboard Shortcuts

- `Ctrl+T` - New tab
- `Ctrl+S` - Save current tab
- `Ctrl+Alt+S` - Save current tab as...
- `Ctrl+Shift+S` - Save session (all tabs)
- `Ctrl+O` - Open file
- `Ctrl+Shift+O` - Open session
- `Ctrl+W` - Close current tab
- `Ctrl+P` - Toggle preview mode

## File Formats

- **`.md` files**: Individual markdown documents
- **`.npmd` files**: Session files containing multiple tabs and their content

## Architecture

- **Single HTML File**: All UI components in one cohesive document
- **Pure JavaScript**: No frameworks - vanilla JS for maximum control
- **CSS-First Design**: Heavy use of CSS for animations and interactions
- **Electron Integration**: Minimal main process focused on file system operations

## Development

The project follows these principles:
- **Simplicity First**: Every feature must justify its existence
- **No Feature Creep**: Resist adding complexity that compromises the core vision
- **Performance**: Startup time <2 seconds, no lag during typing
- **Data Safety**: Multiple mechanisms prevent content loss

## Contributing

This project follows the "notepad heritage" philosophy - maintaining the beloved simplicity of basic text editors while adding essential markdown capabilities.

## License

MIT License - see LICENSE file for details. 