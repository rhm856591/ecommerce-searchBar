const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const dataFilePath = path.join(__dirname, 'clothes.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/clothes', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read data' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
