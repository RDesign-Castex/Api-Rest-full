const express = require('express');
const path = require('path');

const app = express();
const port = 3000; //puerto 

app.use(express.json());

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Ruta raiz
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    
    if (user) {
    res.json(user);
    } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

app.post('/api/users', (req, res) => {
    const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
    };
    
    users.push(newUser);
    
    res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    
    if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    res.json(user);
    } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);
    
    if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
    } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
    }
});



app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(port, () => {
    console.log(`Servidor API REST en ejecución en http://localhost:${port}`);
});