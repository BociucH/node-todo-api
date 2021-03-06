const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'Dummy 1'
}, {
    text: 'Dummy 2'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {

    it('should create a new Todo', (done) => {
        let text = 'Test todo';
        request(app).post('/todos')
                    .send({text})
                    .expect(200)
                    .expect((response) => {
                        expect(response.body.text).toBe(text);
                    })
                    .end((error, response) => {
                        if (error) {
                            return done(error);
                        }

                        Todo.find({text}).then((todos) => {
                            expect(todos.length).toBe(1);
                            expect(todos[0].text).toBe(text);
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                    });
    });

    it('should not create todo with invalid data', (done) => {
        request(app).post('/todos')
                    .send({})
                    .expect(400)
                    .end((error, response) => {
                        if (error) {
                            return done(error);
                        }

                        Todo.find().then((todos) => {
                            expect(todos.length).toBe(2);
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                    });
    });
    
});

describe('GET /todos', () => {

    it('should get all todos', (done) => {
        request(app).get('/todos')
                    .expect(200)
                    .expect((response) => {
                        expect(response.body.todos.length).toBe(2);
                    })
                    .end(done);
    });

});