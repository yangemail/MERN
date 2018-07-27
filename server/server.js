'use strict';

const path = require('path')
    , express = require('express')
    , bodyParser = require('body-parser')
    , MongoClient = require('mongodb').MongoClient
    , Issue = require('./issue');

const app = express();
app.use(express.static(path.join(__dirname, '/../static')));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, {noInfo: true}));
    app.use(webpackHotMiddleware(bundler, {log: console.log}));
}

let db;
MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
    db = connection;
}).catch(error => {
    console.log('ERROR: ', error);
});

app.get('/api/issues', (req, res) => {
    db.collection('issues').find().toArray().then(issues => {
        const metadata = {total_count: issues.length}
        res.json({
            _metadata: metadata,
            records: issues
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: `Internal Server Error: ${error}`
        })
    })
});



app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    if (!newIssue.status) {
        newIssue.status = 'New';
    }

    const err = Issue.validateIssue(newIssue);
    if (err) {
        res.status(422).json({message: `Invalid request: ${err}`});
        return;
    }

    db.collection('issues').insertOne(newIssue).then(result => {
        db.collection('issues').find({_id: result.insertedId}).limit(1).next()
    }).then(newIssue => {
        res.json(newIssue);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: `Internal Server Error: ${error}`
        })
    })
});

app.listen(3000, function () {
    console.log('App started on port 3000');
});