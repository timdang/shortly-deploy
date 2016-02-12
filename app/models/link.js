var mongoose = require('mongoose');
var crypto = require('crypto');
// var db = require('../config');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/shortly');

// var db = mongoose.connection;
var LinkSchema = mongoose.Schema({
  url: String, //       link.string('url', 255);
  base_url: String, //       link.string('base_url', 255);
  code: String, //       link.string('code', 100);
  title: String, //       link.string('title', 255);
  visits: String, //       link.integer('visits');
  timestamps: Boolean, //       link.timestamps();
  link: String
});

var Link = mongoose.model('Link', LinkSchema);

var createShortLink = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

LinkSchema.pre('save', function(next) {
  var code = createShortLink(this.url);
  this.code = code;
  next();
});

module.exports = Link;
