const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const sudo = require('sudo-prompt');
// const fs = require('fs');
const path = require('path');

require('@electron/remote/main').initialize()

function createWindow() {
    // Create the browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    })

    // Load the index.html of the app
    win.loadURL(
        isDev 
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    )

    // Open the DevTools
    // win.webContents.openDevTools()
}

app.on('ready', createWindow)

// Quit when all windows are closed
app.on('window-all-closed', function (_e) {
    // On MacOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    } else {
        // do nothing
    }
})

app.on('activate', function () {
    // On MacOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// Function to add to hosts file
function addToHostsWithElevation(ip, hostname) {
    const hostsPath = process.platform === 'win32' 
      ? 'C:\\Windows\\System32\\drivers\\etc\\hosts' 
      : '/etc/hosts';
    
    const entry = `${ip}\t${hostname}`;
    const command = process.platform === 'win32'
      ? `powershell -Command "Add-Content -Path '${hostsPath}' -Value '${entry}'"`
      : `echo '${entry}' | sudo tee -a ${hostsPath}`;
  
    const options = {
      name: 'Your Electron App'
    };
  
    return new Promise((resolve, reject) => {
      sudo.exec(command, options, (error) => {
        if (error) {
          console.error('Error:', error);
          reject(error);
        } else {
          console.log('Added to hosts file');
          resolve();
        }
      });
    });
}

// Function to remove host from file
function removeFromHostsWithElevation(ip, hostname) {
    const hostsPath = process.platform === 'win32' 
      ? 'C:\\Windows\\System32\\drivers\\etc\\hosts' 
      : '/etc/hosts';
  
    // Escape regex special characters
    const escapedHostname = hostname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const entryPattern = `${ip}\\s+${escapedHostname}(?:\\s|$)`;
  
    const command = process.platform === 'win32'
      ? `powershell -Command "$content = Get-Content '${hostsPath}' -Raw; $content -replace '${entryPattern}[^\\r\\n]*', '' | Set-Content '${hostsPath}' -Encoding UTF8 -NoNewline"`
      : `sudo sed -i.bak '/${ip}[[:space:]]\\+${escapedHostname}\\b/d' ${hostsPath}`;
  
    const options = { name: 'Your Electron App' };
  
    return new Promise((resolve, reject) => {
      sudo.exec(command, options, (error) => {
        if (error) {
          console.error("Full error:", error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }  

// Usage
addToHostsWithElevation('127.0.0.1', 'www.dropbox.com')
  .then(() => console.log('Success'))
  .catch(err => console.error('Failed:', err));
removeFromHostsWithElevation('127.0.0.1', "www.boredbutton.com");
