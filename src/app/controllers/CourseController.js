const Course = require('../models/Course')
const {mongooseToObject} = require('../../util/mongose')

class CourseController {

    // [GET] /course/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show', {course: mongooseToObject(course)});
            })
            .catch(next)
    }
    // [GET] /course/create
    create(req, res, next) {
        res.render('courses/create')
    }
    // [POST] /course/store
    store(req, res, next) {
        req.body.image = `http://img.youtube.com/vi/${req.body.videoID}/maxresdefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/courses/create'))
            .catch(next);
    }

    // [GEt] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }
    // [PUT] /course/:id
    update(req, res, next) {
       Course.updateOne({ _id: req.params.id}, req.body)
       .then(() => res.redirect('/me/stored/courses'))
       .catch(next)
    }
    // [DELETE] /course/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [DELETE] /course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.params.action) {
            case 'delete':
                Course.delete({ _id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({message: 'Action not supported'});
        }
    }
}

module.exports = new CourseController;

