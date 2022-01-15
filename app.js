const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const Sequelize = require('sequelize')
const routes = require('.api/routes')
const models = require('.api/models')

let sequelize = new Sequelize('Data-Base.db', 'nico', 'pass', {
    dialect: 'mysql'
})

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Content-Type, Accept, Origin, X-Requested-With, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE');
    }
    next();
})

//Routes that should handle requests
app.use('/student-api', routes.student)
app.use('/professor-api', routes.professor)
app.use('/project-api', routes.project)
app.use('/group-api', routes.group)
app.use('/grade-api', routes.grade)

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
})

//Handle error that are thrown
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});

module.exports = app;