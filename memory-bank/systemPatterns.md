# System Patterns - Notepad.md

## Architecture Overview

### Application Structure
```
┌─────────────────────────────────────┐
│             Electron Main           │
│  ┌─────────────────────────────────┐ │
│  │         Renderer Process        │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │         Tab Manager         │ │ │
│  │  │  ┌─────────────────────────┐ │ │ │
│  │  │  │   Editor + Preview      │ │ │ │
│  │  │  │     + Image System      │ │ │ │
│  │  │  └─────────────────────────┘ │ │ │
│  │  └─────────────────────────────┘ │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Core Design Patterns

### 1. Tab Management Pattern
- **Single Page Application**: All tabs managed within one HTML document
- **State Management**: Each tab maintains its own editor state
- **Auto-titling**: First line of content becomes tab title
- **Visual Indicators**: Blue dot for unsaved changes

### 2. Editor/Preview Split Pattern
- **Live Preview**: Real-time markdown rendering with **image support**
- **Toggle Functionality**: Three-state system (Split → Source → Preview)
- **Synchronized Scrolling**: Preview follows editor position
- **Smart Updates**: Debounced rendering with immediate image completion detection

### 3. 🆕 Image Processing Pattern

#### Image Pipeline Architecture
```
Markdown Input → Image Detection → Path Resolution → HTML Generation → Error Handling
     ↓                ↓               ↓                ↓                ↓
![alt](src)    → Regex Match   → Multi-source     → Escaped HTML   → Graceful Fallback
                                  Resolution        Generation       with User Feedback
```

#### Image Source Resolution Strategy
- **Web Images**: Direct passthrough for http/https URLs
- **Data URLs**: Direct support for base64 embedded images  
- **Absolute Paths**: Conversion to file:// protocol for local access
- **Relative Paths**: Resolution relative to document location with CWD fallback
- **Error Handling**: Clear user feedback for missing/broken images

#### Performance Optimization Pattern
- **Smart Preview Updates**: Immediate updates for completed image syntax `![...]()`
- **Debounced Rendering**: 150ms delay for text-only changes to prevent flicker
- **Efficient DOM Updates**: Minimal re-rendering during typing
- **Memory Management**: Proper cleanup of image resources

### 4. Persistence Patterns

#### Session Persistence
- **Auto-save**: Continuous background saving to localStorage
- **Session Restoration**: Automatic recovery on app restart including image references
- **Cross-session Continuity**: Maintain exact state between launches
- **Image Path Integrity**: Relative paths preserved across sessions

#### File Management
- **Individual Save**: Current tab to .md file with image path preservation
- **Bulk Export**: All tabs to .npmd session file
- **Import Sessions**: Restore complete work sessions with image references
- **Document-Adjacent Storage**: Image resolution relative to document location

## Component Relationships

### Tab Manager
- **Responsibilities**: Tab lifecycle, switching, state management, image context tracking
- **Interfaces**: Editor instances, file operations, UI updates, image path resolution
- **State**: Active tab, tab list, unsaved changes tracking, current document paths

### Editor Component
- **Responsibilities**: Text editing, content management, auto-save, markdown processing
- **Interfaces**: Preview renderer, image processor, file operations, tab manager
- **State**: Content, cursor position, modification status, document file path

### 🆕 Image Processing System
- **Responsibilities**: Image detection, path resolution, HTML generation, error handling
- **Core Functions**:
  - `generateImageHTML(alt, src, documentPath)`: Creates safe HTML with error handling
  - `resolveImagePath(src, documentPath)`: Multi-source path resolution
  - `getCurrentDocumentPath()`: Context awareness for relative paths
- **Integration**: Seamless processing within markdown parser pipeline
- **Performance**: Smart update detection to prevent flicker

### Preview Renderer
- **Responsibilities**: Markdown parsing, HTML generation, styling, **image integration**
- **Interfaces**: Editor content, image processor, toggle controls
- **State**: Rendered content, visibility status, image loading states
- **Enhanced Features**: Image processing before link processing to prevent conflicts

### File Manager
- **Responsibilities**: Save/load operations, session management, **file path tracking**
- **Interfaces**: Electron file APIs, tab manager, editor instances, image system
- **State**: File paths, session data, backup status, document contexts for images

## Data Flow Patterns

### Content Flow with Images
```
User Input → Editor → Image Detection → Path Resolution → Preview Renderer → DOM Update
     ↓           ↓          ↓               ↓                ↓                ↓
Text/Images → Auto-save → HTML Generation → Error Handling → Visual Feedback → User Experience
```

### Image Processing Flow
```
![alt](src) → Regex Detection → Source Type Analysis → Path Resolution → HTML Generation
                                        ↓                    ↓                ↓
                               Web/Data/Local/Relative → Context-Aware   → Safe HTML with
                                                         Resolution        Error Handling
```

### Smart Update Flow
```
Content Change → Syntax Analysis → Update Strategy Decision
                       ↓                    ↓
                Image Syntax?        Immediate Update
                       ↓                    ↓
                Regular Text?        Debounced Update (150ms)
```

### File Operations Flow
```
User Action → File Dialog → File System → Path Context Update → Tab Manager → Editor Update
                                                ↓
                                        Image Path Resolution Context
```

## Error Handling Patterns

### Image-Specific Error Handling
- **Missing Files**: Clear error messages with file path information
- **Network Issues**: Graceful degradation for web images
- **Permission Errors**: Informative feedback for file system access
- **Path Resolution Failures**: Fallback strategies with user guidance

### General Error Handling
- **Graceful Degradation**: App continues functioning if features fail
- **Data Protection**: Multiple save mechanisms prevent data loss
- **User Feedback**: Clear indicators for save status and errors
- **Recovery Mechanisms**: Automatic session restoration on failure

## Performance Patterns

### Image-Optimized Performance
- **Smart Preview Updates**: Context-aware rendering to prevent image flicker
- **Efficient Image Loading**: Optimized for various image sources
- **Memory Management**: Proper cleanup of image resources and event handlers
- **DOM Optimization**: Minimal re-rendering during image-heavy editing

### General Performance
- **Lazy Loading**: Preview rendering only when visible
- **Debounced Auto-save**: Prevent excessive file system operations
- **Efficient DOM Updates**: Minimal re-rendering for smooth performance
- **Resource Management**: Proper cleanup of unused tab instances

## Integration Patterns

### Electron Integration
- **Security Configuration**: `webSecurity: false` for local image access
- **File System Access**: Native file dialogs and path resolution
- **Window Management**: Custom titlebar with integrated controls
- **Menu Integration**: Keyboard shortcuts and file operations

### CSS Integration
- **Image Styling**: Professional presentation with hover effects
- **Dark Mode Support**: Theme-aware image presentation
- **Loading States**: Visual feedback during image loading
- **Error States**: Clear styling for broken/missing images

## Architectural Principles Maintained

### Simplicity Through Complexity Management
- **Hidden Complexity**: Advanced image features work automatically
- **Clean API**: Simple markdown syntax for complex functionality
- **Modular Design**: Image system integrates without affecting core architecture
- **Performance Transparency**: Smart optimizations invisible to users

### Reliability Patterns
- **Defensive Programming**: Robust error handling throughout image pipeline
- **Fallback Strategies**: Multiple resolution paths for image sources
- **State Consistency**: Image context maintained across sessions
- **User Trust**: Clear feedback and graceful degradation build confidence 