const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString()
    };

    // Read existing queries
    let queries = [];
    try {
        if (fs.existsSync('data/queries.json')) {
            const data = fs.readFileSync('data/queries.json', 'utf8');
            queries = JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading queries file:', error);
    }

    // Add new query
    queries.push(query);

    // Ensure data directory exists
    if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
    }

    // Save queries
    try {
        fs.writeFileSync('data/queries.json', JSON.stringify(queries, null, 2));
        res.json({ success: true, message: 'Query submitted successfully!' });
    } catch (error) {
        console.error('Error saving query:', error);
        res.status(500).json({ error: 'Failed to save query' });
    }
});

// Get all queries (for admin purposes)
app.get('/api/queries', (req, res) => {
    try {
        if (fs.existsSync('data/queries.json')) {
            const data = fs.readFileSync('data/queries.json', 'utf8');
            const queries = JSON.parse(data);
            res.json(queries);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Error reading queries:', error);
        res.status(500).json({ error: 'Failed to read queries' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});