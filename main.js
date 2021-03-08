// Modules to control application life and create native browser window
const { app, protocol, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nativeWindowOpen: true,
      nodeIntegration: false,
      webviewTag: true,
      webSecurity: true,
      nativeWindowOpen: true,
      nodeIntegrationInSubFrames: true,
      spellcheck: true,
      enableRemoteModule: false,
      backgroundThrottling: false,
      worldSafeExecuteJavaScript: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('file:///index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  protocol.interceptFileProtocol('file', function (request, callback) {
    const time = new Date().toISOString()

    const url = request.url.substr(7);
    console.log(url);
    const p = path.normalize(app.getAppPath() + url);
    console.log(time + '>' + p);
    callback(p);
  });

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
