const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('597429df0ea0d93b0e3f6933')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then(result => {
        console.log(result);
    });

    // db.close();
});