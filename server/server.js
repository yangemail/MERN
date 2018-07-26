'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const Issue = require('./issue');

const app = express();
app.use(express.static(path.join(__dirname, '/../static')));
app.use(bodyParser.json());

const issues = [
    {
        id: 1,
        status: 'Open',
        owner: 'Ravan',
        created: new Date('2016-08-15'),
        effort: 5,
        completionDate: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        created: new Date('2016-08-16'),
        effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel',
    },
];

app.get('/api/issues', (req, res) => {
    const metadata = {total_count: issues.length};
    res.json({
        _metadata: metadata,
        records: issues
    });
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if (!newIssue.status) {
        newIssue.status = 'New';
    }
    issues.push(newIssue);
    res.json(newIssue);
})

app.listen(3000, function () {
    console.log('App started on port 3000');
});


// app.get('/api/issues', (req, res) => {
//     db.collection('issues').find().toArray().then(issues => {
//         const metadata = {total_count: issues.length};
//         res.json({_metadata: metadata, records: issues});
//     }).catch(error => {
//         console.log(error);
//         res.status(500).json({message: `Internal Server Error: ${error}`});
//     });
// });

// app.post('/api/issues', (req, res) => {
//     const newIssue = req.body;
//     newIssue.created = new Date();
//     if (!newIssue.status) {
//         newIssue.status = 'New';
//     }
//
//     const err = Issue.validateIssue(newIssue);
//     if (err) {
//         res.status(422).json({message: `Invalid request: ${err}`});
//         return;
//     }
//
//     db.collection('issues').insertOne(newIssue).then(result =>
//         db.collection('issues').find({_id: result.insertedId}).limit(1).next()
//     ).then(newIssue => {
//         res.json(newIssue);
//     }).catch(error => {
//         console.log(error);
//         res.status(500).json({message: `Internal Server Error: ${error}`});
//     });
// });

// let db;
// MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
//     db = connection;
//     app.listen(3000, () => {
//         console.log('App started on port 3000');
//     })
// }).catch(error => {
//     console.log('ERROR: ', error);
// });