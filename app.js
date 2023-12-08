const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'googleDB';

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'Images')));
app.use(express.static(path.join(__dirname, 'CssFile')));
app.use(express.static(path.join(__dirname, 'Javascript')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/results.html'));
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, '/form.html'));
});

app.post('/api/store', async (req, res) => {
  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(dbName);
    const formData = req.body;
    const searchRecord = {
      keyword: formData.keyword,
      name: formData.name,
      title: formData.title,
      link: formData.link,
      description: formData.description
    };

    await db.collection('SearchRecord').insertOne(searchRecord);
    client.close();

    res.status(201).json({ message: 'Data stored successfully' });
  } 
  catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/search/:query', async (req, res) => {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const query = req.params.query;
    const results = await db.collection('SearchRecord').find({ $text: { $search: query } }).toArray();

    client.close();
    res.json(results);
  } catch (error) {
    console.error('Error retrieving search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Server is running on http://localhost:${PORT}`);
});
