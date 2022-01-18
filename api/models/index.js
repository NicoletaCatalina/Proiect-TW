'use strict'
const fs = require('fs');
const Sequelize = require('sequelize')

let sequelize = new Sequelize('app', 'root', 'pass', {
    dialect: 'mysql'
});

let db = {}
fs.readdirSync(__dirname).forEach(async (file) => {
  if (file !== 'index.js') {
    let keyName = file.split('.')[0].split('-')[0]
    keyName = keyName[0].toUpperCase() + keyName.slice(1, keyName.length)
    let moduleName = file.split('.')[0]
    db[keyName] = sequelize.import(moduleName)
  }

   // sync all models with database
   await sequelize.sync();
})

db.Group.hasMany(db.Student)
db.Professor.hasMany(db.Activity)
db.Student.hasMany(db.Feedback)


module.exports = db