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
app.use(express.static(__dirname));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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

// Get products data
app.get('/api/products', (req, res) => {
    const products = [
        {
            id: 1,
            name: "Premium Gel Pens",
            description: "Smooth writing gel pens in multiple colors",
            price: 150,
            category: "stationery",
            image: "fas fa-pen-fancy"
        },
        {
            id: 2,
            name: "Spiral Notebooks",
            description: "High-quality paper notebooks for all purposes",
            price: 80,
            category: "stationery",
            image: "fas fa-book"
        },
        {
            id: 3,
            name: "Whiteboard Markers",
            description: "Vibrant markers for presentations",
            price: 200,
            category: "stationery",
            image: "fas fa-marker"
        },
        {
            id: 4,
            name: "Erasers & Correctors",
            description: "Perfect erasers and correction fluids",
            price: 45,
            category: "stationery",
            image: "fas fa-eraser"
        },
        {
            id: 5,
            name: "Cricket Bat",
            description: "Professional grade cricket bat for players",
            price: 2500,
            category: "sports",
            image: "fas fa-table-tennis-paddle-ball"
        },
        {
            id: 6,
            name: "Sports Balls",
            description: "Football, basketball, and volleyball",
            price: 800,
            category: "sports",
            image: "fas fa-volleyball-ball"
        },
        {
            id: 7,
            name: "Tennis Racquet",
            description: "Lightweight professional tennis racquet",
            price: 3200,
            category: "sports",
            image: "fas fa-dumbbell"
        },
        {
            id: 8,
            name: "Badminton Set",
            description: "Complete badminton racquet and shuttlecock set",
            price: 1800,
            category: "sports",
            image: "fas fa-skating"
        }
    ];
    
    res.json(products);
});

// Handle cart operations
app.post('/api/cart', (req, res) => {
    const { action, productId, quantity } = req.body;
    
    // In a real application, you would handle cart operations here
    // For now, we'll just return success
    res.json({ success: true, message: 'Cart operation completed' });
});

// Get statistics
app.get('/api/stats', (req, res) => {
    const stats = {
        totalCustomers: 500,
        productsSold: 1000,
        categories: 50,
        satisfaction: 99
    };
    
    res.json(stats);
});

// Admin authentication (simple check)
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    
    // Simple password check (in production, use proper authentication)
    if (password === 'admin123') {
        res.json({ success: true, token: 'admin-token' });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// Delete a query (admin only)
app.delete('/api/queries/:id', (req, res) => {
    const queryId = parseInt(req.params.id);
    
    try {
        if (fs.existsSync('data/queries.json')) {
            const data = fs.readFileSync('data/queries.json', 'utf8');
            let queries = JSON.parse(data);
            
            queries = queries.filter(query => query.id !== queryId);
            
            fs.writeFileSync('data/queries.json', JSON.stringify(queries, null, 2));
            res.json({ success: true, message: 'Query deleted successfully' });
        } else {
            res.status(404).json({ error: 'No queries found' });
        }
    } catch (error) {
        console.error('Error deleting query:', error);
        res.status(500).json({ error: 'Failed to delete query' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin panel available at http://localhost:${PORT}?admin=true`);
});