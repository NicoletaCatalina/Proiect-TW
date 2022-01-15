const express = require('express');

module.exports = function(sequelize, DataTypes) {
    var Professor = sequelize.define('professor', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 45]
            }
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 20]
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len : [3, 20]
            }
        }
    }, {
        timestamps: false
    });
    return Professor;
}