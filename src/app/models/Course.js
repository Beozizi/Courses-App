const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String, maxLength: 600},
    image: {type: String, maxLength: 255},
    videoID: {type: String,required: true},
    category: {type: String,required: true},
    copyright: {type: String},
    slug: {type: String, slug: 'name', unique: true,},
  }, {
    timestamps: true,
  });

  // Add plugins delete
mongoose.plugin(slug);
Course.plugin(mongooseDelete,
    { deletedAt : true , 
    overrideMethods: 'all' }
  );

module.exports = mongoose.model('Course', Course)