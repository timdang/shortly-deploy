var mongoose = require('mongoose');
var db = require('../config');
var crypto = require('crypto');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/shortly');

// var db = mongoose.connection;
var LinkSchema = db.Schema({
  url: String,      //       link.string('url', 255);
  base_url: String, //       link.string('base_url', 255);
  code: String,     //       link.string('code', 100);
  title: String,    //       link.string('title', 255);
  visits: String,   //       link.integer('visits');
  timestamps: Boolean//       link.timestamps();
});

var Link = db.model("Link", LinkSchema){
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  timestamps(),
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = Link;
