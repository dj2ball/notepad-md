const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

let mainWindow;

// Helper function to generate short UUID for filenames
function generateShortId() {
  return crypto.randomUUID().substring(0, 8);
}

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false, // Remove native frame and titlebar
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Allow local file access for images
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false,
    backgroundColor: '#fefefe' // Prevents white flash
  });

  // Load the app
  mainWindow.loadFile('src/index.html');

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Remove native menu for custom titlebar
  Menu.setApplicationMenu(null);
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Tab',
          accelerator: 'CmdOrCtrl+T',
          click: () => {
            mainWindow.webContents.send('menu-new-tab');
          }
        },
        {
          label: 'Save As',
          accelerator: 'CmdOrCtrl+Alt+S',
          click: () => {
            mainWindow.webContents.send('menu-save-as');
          }
        },
        {
          label: 'Open File',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [
                { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            });
            
            if (!result.canceled && result.filePaths.length > 0) {
              const filePath = result.filePaths[0];
              const content = fs.readFileSync(filePath, 'utf-8');
              const fileName = path.basename(filePath, path.extname(filePath));
              mainWindow.webContents.send('menu-open-file', { content, fileName });
            }
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('menu-save');
          }
        },
        {
          label: 'Open Session',
          accelerator: 'CmdOrCtrl+Shift+O',
          click: async () => {
            console.log('=== MAIN PROCESS: Open Session menu clicked');
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [
                { name: 'Notepad.md Session', extensions: ['npmd'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            });
            
            console.log('File dialog result:', result);
            
            if (!result.canceled && result.filePaths.length > 0) {
              const filePath = result.filePaths[0];
              console.log('Sending menu-load-session event with filePath:', filePath);
              mainWindow.webContents.send('menu-load-session', filePath);
              console.log('Event sent to renderer process');
            } else {
              console.log('File dialog was canceled or no file selected');
            }
          }
        },
        {
          label: 'Save All Tabs',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => {
            mainWindow.webContents.send('menu-save-all-tabs');
          }
        },
        { type: 'separator' },
        {
          label: 'Close Tab',
          accelerator: 'CmdOrCtrl+W',
          click: () => {
            mainWindow.webContents.send('menu-close-tab');
          }
        },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Preview',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            mainWindow.webContents.send('menu-toggle-preview');
          }
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forcereload' },
        { 
          label: 'Toggle Developer Tools',
          accelerator: 'F12',
          role: 'toggledevtools' 
        },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Notepad.md',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Notepad.md',
              message: 'Notepad.md',
              detail: 'A clean, minimal markdown editor with tabs.\nVersion 1.0.0'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Handle save dialog
ipcMain.handle('show-save-dialog', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: options.defaultPath || 'untitled.md',
    filters: [
      { name: 'Markdown Files', extensions: ['md'] },
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  return result;
});

// Handle file save
ipcMain.handle('save-file', async (event, filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Handle session save (all tabs)
ipcMain.handle('save-session', async (event, sessionData) => {
  try {
    const userDataPath = app.getPath('userData');
    const sessionPath = path.join(userDataPath, 'session.json');
    fs.writeFileSync(sessionPath, JSON.stringify(sessionData, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Handle session load
ipcMain.handle('load-session', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const sessionPath = path.join(userDataPath, 'session.json');
    
    if (fs.existsSync(sessionPath)) {
      const sessionData = fs.readFileSync(sessionPath, 'utf-8');
      return { success: true, data: JSON.parse(sessionData) };
    } else {
      return { success: false, error: 'No session file found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Handle save all tabs dialog
ipcMain.handle('show-save-all-dialog', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: options.defaultPath || 'notepad-session.npmd',
    filters: [
      { name: 'Notepad.md Session', extensions: ['npmd'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  return result;
});

// Handle save all tabs to file
ipcMain.handle('save-all-tabs', async (event, filePath, tabsData) => {
  try {
    const sessionData = {
      version: '1.0.0',
      created: new Date().toISOString(),
      tabs: tabsData
    };
    fs.writeFileSync(filePath, JSON.stringify(sessionData, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Handle load all tabs from file
ipcMain.handle('load-all-tabs', async (event, filePath) => {
  console.log('=== MAIN PROCESS: load-all-tabs called with filePath:', filePath);
  try {
    console.log('Reading file:', filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log('File content length:', fileContent.length);
    console.log('File content preview:', fileContent.substring(0, 200) + '...');
    
    const sessionData = JSON.parse(fileContent);
    console.log('Parsed session data:', sessionData);
    console.log('Number of tabs in session:', sessionData.tabs ? sessionData.tabs.length : 'no tabs property');
    
    const result = { success: true, data: sessionData };
    console.log('Returning result:', result);
    return result;
  } catch (error) {
    console.error('Error in load-all-tabs:', error);
    return { success: false, error: error.message };
  }
});

// App event handlers
app.whenReady().then(() => {
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Window control handlers for custom titlebar
ipcMain.handle('window-minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window-close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle('window-is-maximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

// Handle file operations triggered from custom menu
ipcMain.on('trigger-open-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, path.extname(filePath));
    mainWindow.webContents.send('menu-open-file', { content, fileName, filePath });
  }
});

ipcMain.on('trigger-open-session', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Notepad.md Session', extensions: ['npmd'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    mainWindow.webContents.send('menu-load-session', filePath);
  }
});

// Image management handlers
ipcMain.handle('create-asset-directory', async (event, documentPath) => {
  try {
    if (!documentPath) {
      return { success: false, error: 'Document path required' };
    }
    
    const docDir = path.dirname(documentPath);
    const docName = path.basename(documentPath, path.extname(documentPath));
    const assetDir = path.join(docDir, `${docName}-assets`);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(assetDir)) {
      fs.mkdirSync(assetDir, { recursive: true });
    }
    
    return { success: true, assetDir };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('save-image-from-clipboard', async (event, documentPath, imageData, extension = 'png') => {
  try {
    let assetDir, relativePath;
    
    // Generate unique filename with short UUID
    const shortId = generateShortId();
    const filename = `paste-${shortId}.${extension}`;
    
    if (documentPath) {
      // Document is saved - use document-adjacent folder
      const docDir = path.dirname(documentPath);
      const docName = path.basename(documentPath, path.extname(documentPath));
      assetDir = path.join(docDir, `${docName}-assets`);
      relativePath = `./${docName}-assets/${filename}`;
    } else {
      // Document is unsaved - use user data directory for assets
      const userDataPath = app.getPath('userData');
      assetDir = path.join(userDataPath, 'assets');
      // Use absolute path for images in user data directory since document location is unknown
      relativePath = path.join(assetDir, filename).replace(/\\/g, '/');
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(assetDir)) {
      fs.mkdirSync(assetDir, { recursive: true });
    }
    
    // Save image data
    const imagePath = path.join(assetDir, filename);
    const buffer = Buffer.from(imageData, 'base64');
    fs.writeFileSync(imagePath, buffer);
    
    return { success: true, imagePath, relativePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('copy-image-to-assets', async (event, documentPath, sourceImagePath) => {
  try {
    if (!documentPath) {
      return { success: false, error: 'Document must be saved first' };
    }
    
    if (!fs.existsSync(sourceImagePath)) {
      return { success: false, error: 'Source image not found' };
    }
    
    // Create asset directory
    const docDir = path.dirname(documentPath);
    const docName = path.basename(documentPath, path.extname(documentPath));
    const assetDir = path.join(docDir, `${docName}-assets`);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(assetDir)) {
      fs.mkdirSync(assetDir, { recursive: true });
    }
    
    // Generate filename with short UUID
    const ext = path.extname(sourceImagePath);
    const shortId = generateShortId();
    const filename = `image-${shortId}${ext}`;
    const targetPath = path.join(assetDir, filename);
    
    // Copy file
    fs.copyFileSync(sourceImagePath, targetPath);
    
    // Return relative path for markdown
    const relativePath = `./${docName}-assets/${filename}`;
    
    return { success: true, imagePath: targetPath, relativePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Get user assets directory path for frontend
ipcMain.handle('get-user-assets-dir', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const assetDir = path.join(userDataPath, 'assets');
    return { success: true, assetDir };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Handle certificate errors in development
app.commandLine.appendSwitch('ignore-certificate-errors');