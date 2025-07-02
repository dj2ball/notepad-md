# Technical Context - Notepad.md

## Technology Stack

### Core Technologies
- **Electron**: Desktop application framework
- **HTML/CSS/JavaScript**: Frontend implementation
- **Node.js**: Backend integration for file system access

### Frontend Stack
- **Pure HTML/CSS/JavaScript**: No frameworks for maximum simplicity
- **LocalStorage**: Session persistence for web version
- **CSS Grid/Flexbox**: Modern layout system
- **CSS Custom Properties**: Theming and consistent design

### Typography & Design
- **Inter Font**: Primary UI font for clean readability
- **JetBrains Mono**: Code blocks and monospace content
- **CSS Animations**: Smooth transitions and interactions
- **Modern Color Palette**: Sophisticated grays with blue accents

## File System Integration

### File Types
- **`.md` files**: Individual markdown documents
- **`.npmd` files**: Complete session files (custom format)
- **Auto-backup**: Invisible session restoration files

### Electron APIs Used
- **Dialog API**: Windows file dialogs for save/open
- **File System API**: Reading/writing files
- **Menu API**: Application menus and keyboard shortcuts
- **Window API**: Main window management

## Development Setup

### Prerequisites
- Node.js (latest LTS)
- npm or yarn package manager
- Windows development environment (primary target)

### Build Process
- Development: `npm start` for hot reload
- Production: `npm run build` for packaged executable
- Distribution: Windows installer (.exe) generation

### Project Structure
```
notepad-md/
├── main.js           # Electron main process
├── package.json      # Dependencies and scripts
├── src/
│   └── index.html    # Complete application UI
└── assets/
    └── icon.png      # Application icon
```

## Technical Constraints

### Performance
- Instant startup (< 2 seconds)
- Smooth scrolling and typing
- Minimal memory footprint
- Efficient file operations

### Compatibility
- Windows 10+ primary target
- Modern browsers for web version
- Electron latest stable version

### Security
- Local-only operation (no network requirements)
- Secure file system access through Electron
- No external dependencies for core functionality

## Architecture Principles
- **Simplicity**: Minimal dependencies and complexity
- **Performance**: Optimized for speed and responsiveness
- **Reliability**: Robust error handling and data persistence
- **Maintainability**: Clean, readable code structure 