var Sequelize = require("sequelize");

process.env.dbHost = 'localhost';
process.env.dbUser = 'root';
process.env.dbPass = '123';
process.env.database = 'CLASS/PLA';
process.env.serverPort = '4000';

var sequelize = new Sequelize(process.env.database, process.env.dbUser, process.env.dbPass, {
    host: process.env.dbHost,
    dialect: 'mysql',
    omitNull: true,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false
});

var models = ['Assignment','AssignmentInstance', 'Course', 'EmailNotification', 'Group',
    'GroupUser','Organization', 'ResetPasswordRequest', 'Section',
    'SectionUser', 'Semester', 'TaskActivity', 'TaskInstance', 'User',
    'UserContact', 'UserLogin', 'WorkflowActivity', 'WorkflowInstance'
];





models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});


// describe relationships
(function(m) {
    //Belongs To Relations
    //Sorted By Foreign Key

      m.User.belongsTo(m.ResetPasswordRequest, {foreignKey: 'UserID'});
      m.User.belongsTo(m.UserLogin, {foreignKey: 'UserID'});
      m.User.belongsTo(m.UserContact, {foreignKey: 'UserContactID'});

      m.Course.belongsTo(m.User,{foreignKey: 'CreatorID'});

      m.Section.belongsTo(m.Semester,{foreignKey: 'SemesterID'});
      m.Section.belongsTo(m.Course,{foreignKey: 'CourseID'});

      m.TaskInstance.belongsTo(m.TaskActivity,{foreignKey: 'TaskActivityID'});
      m.TaskInstance.belongsTo(m.WorkflowInstance,{foreignKey: 'WorkflowInstanceID'});
      m.TaskInstance.belongsTo(m.User,{foreignKey: 'UserID'});
      m.TaskInstance.belongsTo(m.AssignmentInstance,{foreignKey: 'AssignmentInstanceID'});



      m.TaskActivity.belongsTo(m.WorkflowActivity,{foreignKey: 'WorkflowActivityID'});
      m.TaskActivity.belongsTo(m.AssignmentInstance,{foreignKey: 'AssignmentInstanceID'});
      m.TaskActivity.belongsTo(m.Assignment, {foreignKey: 'AssignmentID'});

      m.WorkflowInstance.belongsTo(m.WorkflowActivity,{foreignKey: 'WorkflowActivityID'});
      m.WorkflowInstance.belongsTo(m.AssignmentInstance,{foreignKey: 'AssignmentInstanceID'});

      m.WorkflowActivity.belongsTo(m.Assignment,{foreignKey: 'AssignmentID'});


      m.SectionUser.belongsTo(m.User,{foreignKey: 'UserID'});
      m.SectionUser.belongsTo(m.Section,{foreignKey: 'SectionID'});

      m.GroupUser.belongsTo(m.User, {foreignKey : 'UserID'});
      //m.GroupUser.belongsTo(m.Group,{foreignKey : 'GroupID'});

      m.AssignmentInstance.belongsTo(m.Section, {foreignKey: 'SectionID'});
      m.AssignmentInstance.belongsTo(m.Assignment,{foreignKey: 'AssignmentID'});



      //has Many Relations

      m.Assignment.hasMany(m.AssignmentInstance,{as:'AssignmentInstances', foreignKey: 'AssignmentID'});
      m.Assignment.hasMany(m.WorkflowActivity, {as: 'WorkflowActivities', foreignKey: 'AssignmentID'});
      m.Assignment.hasMany(m.TaskActivity, {as: 'TaskActivities', foreignKey: 'AssignmentID'});

      m.AssignmentInstance.hasMany(m.TaskInstance,{as:'TaskInstances', foreignKey: 'AssignmentInstanceID'});
      m.AssignmentInstance.hasMany(m.WorkflowInstance,{as : 'WorkflowInstances', foreignKey: 'AssignmentInstanceID'});

      m.Course.hasMany(m.Section,{as : 'Sections', foreignKey: 'CourseID'});

      m.Section.hasMany(m.AssignmentInstance,{as : 'AssignmentInstances',foreignKey: 'SectionID'});
      m.Semester.hasMany(m.Section,{as : 'Sections', foreignKey: 'SemesterID'});

      m.Section.hasMany(m.SectionUser,{as : 'SectionUsers',foreignKey: 'SectionID'});

      m.TaskActivity.hasMany(m.TaskInstance,{as :'TaskInstances' ,foreignKey: 'TaskActivityID'});

      m.WorkflowInstance.hasMany(m.TaskInstance,{as : 'TaskInstances', foreignKey: 'WorkflowInstanceID'});

      m.WorkflowActivity.hasMany(m.WorkflowInstance,{as : 'WorkflowInstances', foreignKey: 'WorkflowActivityID'});

      m.User.hasMany(m.SectionUser,{as : 'Users',foreignKey: 'UserID'});
      m.User.hasMany(m.GroupUser, {as :'GroupUsers' ,foreignKey : 'UserID'});
      m.User.hasMany(m.TaskInstance,{as :'TaskInstances' ,foreignKey: 'UserID'});

      // m.Group.hasMany(m.GroupUser,{as :' GroupUsers' ,foreignKey : 'GroupID'})



})(module.exports);


module.exports.sequelize = sequelize;
