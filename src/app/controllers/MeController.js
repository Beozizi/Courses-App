const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongose');

class MeController {
    
    // [GET] /stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => 
                res.render('me/stored-courses', {
                deleteCount,
                courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next)
    }
    // [GET] /trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted()
        .then(courses => res.render('me/trash-courses', {
            courses: mutipleMongooseToObject(courses)
        }))   
        .catch(next)
    }
}

module.exports = new MeController;

