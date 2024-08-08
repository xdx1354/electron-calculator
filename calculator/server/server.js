const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 4001;
const cors = require("cors");
const bodyParser = require('body-parser'); // Ensure this is required

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    optionsSuccessStatus: 200
    }
app.use(cors(corsOptions));

// Serwowanie pliku konfiguracyjnego JSON
app.get('/config/:filename', (req, res) => {

    const filename = req.params.filename;
    const configPath = path.join('server','data', filename);

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
    const dirPath = path.join('server','data'); // path to configuration files directory
    console.log('PATH:', dirPath);
    try {
        const files = fs.readdirSync(dirPath);
        res.json({files:files});
        // console.log(res);
    } catch (err) {
        res.status(500).json({message: "Unable to read dir", error: err});
    }
});

app.use(bodyParser.json());

app.post('/save/:filename', (req, res) => {
    const filename = req.params.filename + '.json';
    const data = req.body;
    const prettyJsonData = JSON.stringify(data, null, 2);
    const dirPath = path.join('server','data', filename);

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

app.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename + '.json';
    const dirPath = path.join('server','data', filename);

    fs.unlink(dirPath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).send('Error deleting file');
        }
        res.status(200).send('File deleted');
    });
})

// Startowanie serwera
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Obsługa zamykania serwera
const shutdown = () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);