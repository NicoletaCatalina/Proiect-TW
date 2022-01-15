const express = require('express');

module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define('project', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 45]
            }
        },

        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },

        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Project;
}