const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 4001;
const cors = require("cors");


const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    optionsSuccessStatus: 200 // dla starszych przeglądarek
    }
app.use(cors(corsOptions));

// Serwowanie pliku konfiguracyjnego JSON
app.get('/config', (req, res) => {
    const configPath = path.join('data', 'config1.json');
    fs.readFile(configPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading config file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Downloading all the files names
app.get('/files', (req, res) => {
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

// Startowanie serwera
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
