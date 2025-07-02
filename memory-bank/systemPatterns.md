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
- **Live Preview**: Real-time markdown rendering
- **Toggle Functionality**: Show/hide preview panel
- **Synchronized Scrolling**: Preview follows editor position
- **Responsive Layout**: Adapts to window size

### 3. Persistence Patterns

#### Session Persistence
- **Auto-save**: Continuous background saving to localStorage
- **Session Restoration**: Automatic recovery on app restart
- **Cross-session Continuity**: Maintain exact state between launches

#### File Management
- **Individual Save**: Current tab to .md file
- **Bulk Export**: All tabs to .npmd session file
- **Import Sessions**: Restore complete work sessions

### 4. Event-Driven Architecture
- **Tab Events**: Switch, close, create, modify
- **Editor Events**: Content change, save, preview toggle
- **File Events**: Save, open, session management
- **Keyboard Events**: Shortcuts and navigation

## Component Relationships

### Tab Manager
- **Responsibilities**: Tab lifecycle, switching, state management
- **Interfaces**: Editor instances, file operations, UI updates
- **State**: Active tab, tab list, unsaved changes tracking

### Editor Component
- **Responsibilities**: Text editing, content management, auto-save
- **Interfaces**: Preview renderer, file operations, tab manager
- **State**: Content, cursor position, modification status

### Preview Renderer
- **Responsibilities**: Markdown parsing, HTML generation, styling
- **Interfaces**: Editor content, toggle controls
- **State**: Rendered content, visibility status

### File Manager
- **Responsibilities**: Save/load operations, session management
- **Interfaces**: Electron file APIs, tab manager, editor instances
- **State**: File paths, session data, backup status

## Data Flow Patterns

### Content Flow
```
User Input → Editor → Auto-save → LocalStorage
     ↓                    ↓
Tab Title Update → Preview Renderer → DOM Update
```

### File Operations Flow
```
User Action → File Dialog → File System → Tab Manager → Editor Update
```

### Session Management Flow
```
App Start → Session Restore → Tab Recreation → Content Load
App Close → Session Backup → State Persistence
```

## Error Handling Patterns
- **Graceful Degradation**: App continues functioning if features fail
- **Data Protection**: Multiple save mechanisms prevent data loss
- **User Feedback**: Clear indicators for save status and errors
- **Recovery Mechanisms**: Automatic session restoration on failure

## Performance Patterns
- **Lazy Loading**: Preview rendering only when visible
- **Debounced Auto-save**: Prevent excessive file system operations
- **Efficient DOM Updates**: Minimal re-rendering for smooth performance
- **Memory Management**: Proper cleanup of unused tab instances 