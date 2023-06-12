const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000; // You can use any port number you prefer

app.post('/createFile', (req, res) => {
  const timestamp = new Date().toISOString();
  const fileName = `${timestamp}.txt`;
  const filePath = 'path/to/folder/' + fileName; // Replace 'path/to/folder/' with the actual path to the folder

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating file');
    } else {
      res.status(200).send('File created successfully');
    }
  });
});

app.get('/getTextFiles', (req, res) => {
  const folderPath = 'path/to/folder/'; // Replace 'path/to/folder/' with the actual path to the folder

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving files');
    } else {
      const textFiles = files.filter((file) => file.endsWith('.txt'));
      res.status(200).json(textFiles);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

//node server.js
