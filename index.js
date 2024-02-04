const express = require('express');
const bodyParser = require('body-parser');
const { PrivateBinClient } = require('@agc93/privatebin');

const app = express();
const client = new PrivateBinClient("https://privatebin.net/");

app.use(bodyParser.json());
app.post('/upload', async (req, res) => {
    try {
        const content = req.body.data; 
        const result = await client.uploadContent(content, { uploadFormat: 'markdown', expiry: '5min' });
        const id = result.response.id;
        const urlKey = result.urlKey;
        const baseUrl = "https://privatebin.net/?";
        const url = `${baseUrl}${id}#${urlKey}`;
        res.send(`${url}`); 
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        res.status(500).send("Internal Server Error"); 
    }
});

app.listen(80)