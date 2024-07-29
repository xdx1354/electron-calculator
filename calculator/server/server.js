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

// Startowanie serwera
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
