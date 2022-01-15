const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../models')

// Handle get request to /projects => response: a json array with all the projects from the database
router.get('/projects', async(req, res, next) => {
   try {
       let projects = await models.Project.findAll();
       
       res.status(200).json(projects);
   } catch (err) {
       next(err);
   }
});

// Handle post request to /projects/add => add a new project to the db
router.post('/projects/add', async(req, res, next) => {
    try {
        if (req.body.start_date > req.body.end_date) {
            res.status(400).json({
                message : 'date not valid!'
            })
        } else {
            let project = await models.Project.create(req.body);
            res.status(200).json({
                message : 'created!'
            });
        }
    } catch (err) {
        next(err);
    }
});

// Handle get request to /project-api/:aid => get project by id
router.get('/projects/:aid', async(req, res, next) => {
    try {
        let project = await models.Project.findByPk(req.params.aid);
        if(project){
            res.status(200).json(project);
        }
        else{
            res.status(404).json({message : 'not found'})
        }


    } catch (err) {
        next(err);
    }
});

// Handle put request to /projects/:aid => update an existing project
router.put('/projects/:aid', async(req, res, next) => {
    try {
        let project = await models.Project.findByPk(req.params.aid);
        
        if (project) {
            await project.update(req.body);
            res.status(200).json({
                message : 'accepted - update succesful!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})

// Handle put request to /projects/:aid/update-count-emoji1 => update an existing activity count for emoji1
/*router.put('/activities/:aid/update-count-emoji1', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        
        if (activity) {
            
            let updated = {
                "id" : activity.id,
                "name" : activity.name,
                "start_date" : activity.start_date,
                "end_date" : activity.end_date,
                "count_emoji1" : activity.count_emoji1 + 1,
                "count_emoji2" : activity.count_emoji2,
                "count_emoji3" : activity.count_emoji3,
                "count_emoji4" : activity.count_emoji4,
                "professorId" : activity.professorId
            }
            
            await activity.update(updated);
            //res.status(200).json(activity)
            res.status(200).json({
                message : 'accepted - updated succesfully count_emoji1!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})*/

// Handle put request to /activities/:aid/update-count-emoji2 => update an existing activity count for emoji2
/*router.put('/activities/:aid/update-count-emoji2', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        
        if (activity) {
            
            let updated = {
                "id" : activity.id,
                "name" : activity.name,
                "start_date" : activity.start_date,
                "end_date" : activity.end_date,
                "count_emoji1" : activity.count_emoji1,
                "count_emoji2" : activity.count_emoji2 + 1,
                "count_emoji3" : activity.count_emoji3,
                "count_emoji4" : activity.count_emoji4,
                "professorId" : activity.professorId
            }
            
            await activity.update(updated);
            //res.status(200).json(activity)
            res.status(200).json({
                message : 'accepted - updated succesfully count_emoji2!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})*/

// Handle put request to /activities/:aid/update-count-emoji3 => update an existing activity count for emoji3
/*router.put('/activities/:aid/update-count-emoji3', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        
        if (activity) {
            
            let updated = {
                "id" : activity.id,
                "name" : activity.name,
                "start_date" : activity.start_date,
                "end_date" : activity.end_date,
                "count_emoji1" : activity.count_emoji1,
                "count_emoji2" : activity.count_emoji2,
                "count_emoji3" : activity.count_emoji3 + 1,
                "count_emoji4" : activity.count_emoji4,
                "professorId" : activity.professorId
            }
            
            await activity.update(updated);
            //res.status(200).json(activity)
            res.status(200).json({
                message : 'accepted - updated succesfully count_emoji3!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})*/

// Handle put request to /activities/:aid/update-count-emoji4 => update an existing activity count for emoji4
/*router.put('/activities/:aid/update-count-emoji4', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        
        if (activity) {
            
            let updated = {
                "id" : activity.id,
                "name" : activity.name,
                "start_date" : activity.start_date,
                "end_date" : activity.end_date,
                "count_emoji1" : activity.count_emoji1,
                "count_emoji2" : activity.count_emoji2,
                "count_emoji3" : activity.count_emoji3,
                "count_emoji4" : activity.count_emoji4 + 1,
                "professorId" : activity.professorId
            }
            
            await activity.update(updated);
            //res.status(200).json(activity)
            res.status(200).json({
                message : 'accepted - updated succesfully count_emoji4!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})*/

module.exports = router;