const express = require('express');

module.exports = function(sequelize, DataTypes) {
    var Grade = sequelize.define('grade', {
        time_stamp: {
            type: DataTypes.STRING,
            allowNull: false
        },

        id_project: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Grade;
}