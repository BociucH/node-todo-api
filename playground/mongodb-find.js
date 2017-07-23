const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('59739b84020ba70538f61320')
    // }).toArray().then((result) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(result, undefined, 2));
    //     // console.log(docs);
    // }, (error) => {
    //     console.log(error);
    // });

    // db.collection('Todos').find().count().then((result) => {
    //     console.log(`Todos count: ${result}`);
    // }, (error) => {
    //     console.log(error);
    // });

    db.collection('Users').find({
        name: 'Kox'
    }).toArray().then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (error) => {
        console.log(error);
    });

    // db.close();
});