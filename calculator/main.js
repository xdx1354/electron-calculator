const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

// Uruchom serwer Express jako osobny proces
function startExpressServer() {
    const serverPath = path.join('server', 'server.js');
    exec(`node ${serverPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting server: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Server stderr: ${stderr}`);
            return;
        }
        console.log(`Server stdout: ${stdout}`);
    });
}

function createWindow () {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadURL('http://localhost:3000')
}

// startExpressServer();   // start serwera Express

app.whenReady().then(createWindow)