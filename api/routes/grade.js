const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../models')

// Handle get request to /grades => response: a json array with all the grades from the database
router.get('/grades', async(req, res, next) => {
    try {
        let grades = await models.Grade.findAll();
        res.status(200).json(grades);
    } catch (err) {
        next(err);
    }
})

// Handle post request to /grades/add => add a new grade to the db
router.post('/grades/add', async(req, res, next) => {
    try {
        await models.Grade.create(req.body);
        res.status(200).json({
            message : 'created!'
        })
        
    } catch (err) {
        next(err);
    }
})

// Handle get request to /grades/:aid => response: json array with grades for a specific project
router.get('/grades/:aid', async(req, res, next) => {
    try {
        let grades = await models.Grade.findAll()
        let specificGrades = []
        
        grades.forEach(fbd => {
            if (fbd.id_project == req.params.aid) {
                specificGrades.push(fbd)
            }
        })
        
        res.status(200).json(specificGrades)
    } catch (err) {
        next(err)
    }
})

module.exports = router;