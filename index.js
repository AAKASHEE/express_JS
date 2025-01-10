import express from 'express'



const app = express()
const port = 3000

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
    console.log('deleted')
    console.log(req.params.id)
    const index = chessBUzz.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("Teas not found")
        
    }
    chessBUzz.slice(index, 1)
    return res.status(204).send("deleted")
})





app.listen(port, () => {
    console.log(`server is running on ${port}...` )
})