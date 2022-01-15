module.exports = function(sequelize, DataTypes) {
    var Student = sequelize.define('student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len : [3, 45]
            }
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            validate: {
                len : [3, 20]
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len : [3, 20]
            }
        }
    })
    return Student;
}