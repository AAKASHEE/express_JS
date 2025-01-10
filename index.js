import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

let chessBUzz = [];
let nextId = 1;

// Add a new tea
app.post('/cheese', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    chessBUzz.push(newTea);
    res.status(201).send(newTea);
});

// Get all teas
app.get('/cheese', (req, res) => {
    res.status(200).send(chessBUzz);
});

// Get tea by ID
app.get('/cheese/:id', (req, res) => {
    const tea = chessBUzz.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Tea not found');
    }
    res.status(200).send(tea);
});

// Update tea
app.put('/cheese/:id', (req, res) => {
    const tea = chessBUzz.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Tea not found');
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
});

// Delete tea
app.delete('/cheese/:id', (req, res) => {
    const index = chessBUzz.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Tea not found');
    }

    const deletedTea = chessBUzz.splice(index, 1)[0]; // Remove element at index and return it

    // Reset nextId to 1 if the array is empty
    if (chessBUzz.length === 0) {
        nextId = 1;
    }

    return res.status(200).send(deletedTea);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
