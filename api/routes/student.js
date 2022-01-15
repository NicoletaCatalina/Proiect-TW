const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../models')

// Handle get request => response: a json array with all the students
router.get('/students', async(req, res, next) => {
    try {
        let students = await models.Student.findAll();
        res.status(200).json(students);
        
    } catch (err) {
        next(err);
    }
})

// Handle get request to /students/:sid => response: a json with a student by its id
router.get('/students/:sid', async(req, res, next) => {
    try {
        let student = await models.Student.findByPk(req.params.sid);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(400).json({
                message : 'not found!'
            })
        }
    } catch (err) {
        next(err);
    }
})

// Handle post requests to /students/add => add a student to the database
router.post('/students/add', async(req, res, next) => {
    try {
        let student = await models.Student.create(req.body);
        res.status(200).json({
           message : 'created!',
        });
        
    } catch (err) {
        next(err);
    }
})

// Handle get request to /students/:sid/:aid/grades => response: a json array with all the grades that a student has on a specific project
router.get('/students/:sid/:aid/grades', async(req, res, next) => {
    try {
       let student = await models.Student.findByPk(req.params.sid, {
           include : [models.Grades]
       });
       
       let GradesOnProject = [];
       if (student) {
           student.grades.forEach(fdb => {
               if (fdb.id_project == req.params.aid) {
                    GradesOnProject.push(fdb)
               }
           })
           res.status(200).json(GradesOnProject)
       } else {
           res.status(404).json({
               message : 'not found!'
           });
       }
   } catch (err) {
       next(err);
   }
})

// Handle get request to /students/:sid/grades => response: a json array with all the grades that a student has
router.get('/students/:sid/grades', async(req, res, next) => {
    try {
        let student = await models.Student.findByPk(req.params.sid, {
            include : [models.Grades]
        });
        
        if (student) {
            res.status(200).json(student.grades);
            
        } else {
            res.status(404).json({
                message : 'not found!'
            });
        }
    } catch (err) {
        next(err);
    }
 });

 // Handle delete request to /students/:id => delete a student by its id
router.delete('/students/:id', async(req, res, next) => {
    try {
       let student = await models.Student.findByPk(req.params.id);
       
       if (student) {
           await student.destroy();
           res.status(200).json({
              message : 'accepted' 
           });
           
       } else {
           res.status(404).json({
               message : 'not found :('
           });
       }
   } catch(err) {
       next(err);
   }
});

module.exports = router

