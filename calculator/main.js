const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec, execSync } = require('child_process');

let serverProcess;

function startExpressServer() {
    const serverPath = path.join('server', 'server.js');
    serverProcess = exec(`node ${serverPath}`, (error, stdout, stderr) => {
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
    });

    win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    startExpressServer();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    if (serverProcess) {
        serverProcess.kill('SIGTERM'); // Zamyka serwer Express
        console.log('Server process killed');
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
