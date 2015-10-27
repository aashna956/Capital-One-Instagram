var results;
var sentiment=require('./sentiment');


var secrets = require('../config/secrets');
var ig = require('instagram-node').instagram();

ig.use({ client_id: secrets.instagram.clientID,
         client_secret: secrets.instagram.clientSecret});
ig.tag_media_recent('capitalOne', function(err, medias, pagination, remaining, limit) {
    results=medias;
  });

exports.getImages = function(req,res){

  var sentiments = sentiment.analyze(results);
  res.render('api/test', {popularImages:results, positive: sentiments[0], negative: sentiments[1], neutral: sentiments[2]});
};

exports.getUser = function(req,res){

	console.log(req.params.id);
	ig.user(req.params.id, function(err, result, remaining, limit) {
		console.log(result);
		res.render('api/user', {user: result});
	});

};
