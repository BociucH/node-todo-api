const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    let todo = new Todo({
        text: request.body.text
    });

    todo.save().then((data) => {
        response.send(data);
    }, (error) => {
        response.status(400).send(error);
    });
});

app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({todos});
    }, (error) => {
        response.status(400).send(error);
    });
});

app.get('/todos/:id', (request, response) => {
    let id = request.params.id;

    if (!ObjectId.isValid(id)) {
        return response.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }

        response.send({todo});
    }).catch((error) => {
        response.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
}