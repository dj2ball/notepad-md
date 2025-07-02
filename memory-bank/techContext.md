# Technical Context - Notepad.md

## Technology Stack

### Core Technologies
- **Electron**: Desktop application framework with **file system integration for images**
- **HTML/CSS/JavaScript**: Frontend implementation with **enhanced image processing**
- **Node.js**: Backend integration for file system access and **local image loading**

### Frontend Stack
- **Pure HTML/CSS/JavaScript**: No frameworks for maximum simplicity (maintained with image features)
- **LocalStorage**: Session persistence for web version **including image references**
- **CSS Grid/Flexbox**: Modern layout system with **responsive image presentation**
- **CSS Custom Properties**: Theming and consistent design **including image styling**

### Typography & Design
- **Inter Font**: Primary UI font for clean readability
- **JetBrains Mono**: Code blocks and monospace content
- **CSS Animations**: Smooth transitions and interactions **including image hover effects**
- **Modern Color Palette**: Sophisticated grays with blue accents, **image theming for dark mode**

## 🆕 Image Support Implementation

### Technical Architecture
- **Markdown Processing Pipeline**: Image detection and processing before link processing
- **Path Resolution System**: Multi-source support (web, local, data URLs, relative paths)
- **HTML Generation**: Safe HTML creation with proper attribute escaping
- **Error Handling**: Graceful fallback with user-friendly error messages
- **Performance Optimization**: Smart preview updates to prevent image flicker

### Core Image Functions
```javascript
// Main image processing functions in src/index.html
generateImageHTML(alt, src, documentPath)    // Creates safe HTML with error handling
resolveImagePath(src, documentPath)          // Multi-source path resolution  
getCurrentDocumentPath()                     // Context awareness for relative paths
smartUpdatePreview()                         // Optimized preview updates
```

### Image Source Support
- **Web Images**: `http://` and `https://` URLs (direct display)
- **Data URLs**: `data:` base64 embedded images (direct support)
- **Absolute Paths**: Local file system paths converted to `file://` protocol
- **Relative Paths**: Resolution relative to document location with CWD fallback

### Security Configuration
```javascript
// Electron main.js security settings for local image access
webPreferences: {
    webSecurity: false,  // Required for local file:// image access
    nodeIntegration: true,
    contextIsolation: false
}
```

## File System Integration

### File Types
- **`.md` files**: Individual markdown documents **with image references**
- **`.npmd` files**: Complete session files (custom format) **preserving image paths**
- **Auto-backup**: Invisible session restoration files **maintaining image contexts**

### 🆕 Image Path Management
- **Document-Adjacent Storage**: Images resolved relative to markdown file location
- **Session Persistence**: Image paths preserved across app restarts
- **Cross-Platform Paths**: Windows path handling with proper normalization
- **Path Validation**: Robust error handling for missing or inaccessible images

### Electron APIs Used
- **Dialog API**: Windows file dialogs for save/open
- **File System API**: Reading/writing files **and accessing local images**
- **Menu API**: Application menus and keyboard shortcuts
- **Window API**: Main window management
- **Path API**: **Cross-platform path resolution for images**

## Development Setup

### Prerequisites
- Node.js (latest LTS)
- npm or yarn package manager
- Windows development environment (primary target)
- **Image testing assets**: Various formats for development testing

### Build Process
- Development: `npm start` for hot reload **with image testing**
- Production: `npm run build` for packaged executable
- Distribution: Windows installer (.exe) generation
- **Testing**: Image compatibility across web and local sources

### Project Structure
```
notepad-md/
├── main.js              # Electron main process with image security config
├── package.json         # Dependencies and scripts
├── src/
│   └── index.html       # Complete application UI with image system (2087 lines)
├── assets/              # Application icons
├── image-test-assets/   # Development image testing files
└── *.md files          # Test documents with image examples
```

## Technical Constraints

### Performance Requirements
- Instant startup (< 2 seconds) **maintained with image features**
- **Image loading**: Fast for local files, instant for web images
- **No flicker**: Smart preview updates prevent image flickering during typing
- Smooth scrolling and typing **with image-heavy documents**
- Minimal memory footprint **including image resources**

### 🆕 Image-Specific Constraints
- **File Access**: Requires Electron's file system permissions for local images
- **Path Resolution**: Must handle Windows, relative, and absolute paths correctly
- **Error Handling**: Must gracefully handle missing, corrupted, or inaccessible images
- **Performance**: No degradation in typing/editing speed with images present
- **Memory**: Efficient image resource management to prevent memory leaks

### Compatibility
- Windows 10+ primary target **with local image file access**
- Modern browsers for web version **limited to web images only**
- Electron latest stable version **with security configuration for file access**
- **Image formats**: Standard web formats (PNG, JPG, GIF, WebP, SVG)

### Security Considerations
- **Local-only operation**: No network requirements for core functionality
- **Controlled file access**: Electron security configured specifically for image file access
- **Path validation**: Secure handling of user-provided image paths
- **No external dependencies**: Image processing handled by browser engines

## Architecture Principles

### Maintained Design Principles
- **Simplicity**: Image features added without complexity to user experience
- **Performance**: Optimized for speed and responsiveness **including image loading**
- **Reliability**: Robust error handling and data persistence **including image references**
- **Maintainability**: Clean, readable code structure **with modular image processing**

### 🆕 Image System Principles
- **Invisible Complexity**: Advanced path resolution hidden behind simple markdown syntax
- **Graceful Degradation**: Missing images don't break document flow or functionality
- **Performance First**: Smart updates prevent UI flicker during editing
- **User-Friendly**: Clear error messages and visual feedback for image issues
- **Context Awareness**: Intelligent path resolution based on document location

## Technical Debt and Maintenance

### Code Quality
- **Single File Architecture**: All functionality in `src/index.html` (maintained)
- **Modular Functions**: Image processing cleanly separated into helper functions
- **No External Dependencies**: Image system uses browser native capabilities
- **Clean Integration**: Image features integrated without affecting existing code paths

### Maintenance Considerations
- **Electron Updates**: Monitor security updates especially for file system access
- **Image Format Support**: Track browser image format evolution (WebP, AVIF)
- **Path Handling**: Test across different Windows versions for file system compatibility
- **Performance Monitoring**: Ensure image features don't degrade overall app performance

### Known Technical Limitations
- **Web Version**: Limited to web images only (no local file access in browsers)
- **File Permissions**: Requires appropriate file system permissions for local images
- **Large Images**: No built-in image compression or optimization (relies on browser)
- **Bandwidth**: Web images subject to network performance (cached appropriately)

## Future Technical Considerations

### Potential Enhancements
- **Image Optimization**: Automatic resizing or compression for large images
- **Advanced Formats**: Support for newer image formats as browser support improves
- **Caching System**: Enhanced caching for frequently accessed images
- **Drag & Drop**: Direct image insertion via drag and drop

### Technical Evolution
- **Electron Updates**: Stay current with Electron security and performance improvements
- **Browser Features**: Leverage new browser APIs for enhanced image handling
- **Performance Optimization**: Continue optimizing for large documents with many images
- **Cross-Platform**: Consider macOS/Linux support with appropriate path handling 