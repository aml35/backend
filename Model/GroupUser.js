/**
 * Created by cesarsalazar on 3/30/16.
 */

//var Sequelize = require("sequelize");
//var sequelize = require("./index.js");


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('GroupUser', {
        GroupID: {
            type: DataTypes.INTEGER,
            field: 'GroupID', // Will result in an attribute that is firstName when user facing but first_name in the database
            allowNull: false,
            primaryKey: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            field: 'UserID', // Will result in an attribute that is firstName when user facing but first_name in the database
            allowNull: false,
        },
        Role: {
            type: DataTypes.INTEGER,
            field: 'Role',
            allowNull: false,
            validate: {
                isIn: [['Student', 'Instructor']]
            }
        },
        Status: {
            type: DataTypes.STRING,
            field: 'Status',
            allowNull: false,
            validate: {
                isIn: [['Active', 'Inactive']]
            }
        }
    }, {
        timestamps: false,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'GroupUser'
    });
};

///var User =

///module.exports = User;
