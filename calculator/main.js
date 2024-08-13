const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec, execSync } = require('child_process');
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs");

/// SERVER CONFIGURATION
const serverApp = express();
const port = 4001;
let serverInstance;

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    optionsSuccessStatus: 200
}
serverApp.use(cors(corsOptions));
serverApp.use(bodyParser.json());

// Start the Express server
function startServer() {
    serverInstance = serverApp.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

const shutdown = () => {
    if(serverInstance) {
        serverInstance.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);


// function startExpressServer() {
//     const serverPath = path.join('server', 'server.js');
//     serverProcess = exec(`node ${serverPath}`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error starting server: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.error(`Server stderr: ${stderr}`);
//             return;
//         }
//         console.log(`Server stdout: ${stdout}`);
//     });
// }

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

// ELECTRON CONFIGURATION
app.whenReady().then(() => {
    startServer();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        shutdown();
        app.quit();
    }
});



// SERVER ENDPOINTS
serverApp.get('/config/:filename', (req, res) => {

    const filename = req.params.filename;
    const configPath = path.join('data', filename);

    fs.readFile(configPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading config file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Downloading all the files names
serverApp.get('/files', (req, res) => {
    const dirPath = path.join('data'); // path to configuration files directory
    console.log('PATH:', dirPath);
    try {
        const files = fs.readdirSync(dirPath);
        res.json({files:files});
        // console.log(res);
    } catch (err) {
        res.status(500).json({message: "Unable to read dir", error: err});
    }
});


serverApp.post('/save/:filename', (req, res) => {
    const filename = req.params.filename + '.json';
    const data = req.body;
    const prettyJsonData = JSON.stringify(data, null, 2);
    const dirPath = path.join('data', filename);

    try {
        fs.writeFile(dirPath, prettyJsonData, function(err) {
            if(err) {
                return console.log(err);
            }
            res.status(200).send('File saved successfully.');
        });
    } catch (err) {
        res.status(500).send('Error creating file');
    }
});

serverApp.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename + '.json';
    const dirPath = path.join('data', filename);

    fs.unlink(dirPath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).send('Error deleting file');
        }
        res.status(200).send('File deleted');
    });
})

