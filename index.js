import 'dotenv/config'
import express from 'express'



const app = express()
const port = process.env.PORT || 4000 

app.use(express.json())
let chessBUzz = []
let nextId = 1


//add a new tea
app.post('/cheese', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price }
    chessBUzz.push(newTea);
    res.status(201).send(newTea)
    

    
})
//get all tea
app.get('/cheese', (req, res) => {
    res.status(200).send(chessBUzz)
    
})
//get tea with id
app.get('/cheese/:id', (req, res) => {
    const tea = chessBUzz.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})
//update tea
app.put('/cheese/:id', (req, res) => {
    const tea = chessBUzz.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    const { name, price } = req.body
    tea.name = name;
    tea.price = price;
    res.send(200).send(tea)
    
})

// delete tea
app.delete('/cheese/:id', (req, res) => {
    const index = chessBUzz.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("Teas not found")
        
    }
    const deletedTea = chessBUzz.splice(index, 1)[0];  // Remove element at index and return it
    return res.status(200).send(deletedTea); // Send the deleted tea object in the response
})





app.listen(port, () => {
    console.log(`server is running on ${port}...` )
})