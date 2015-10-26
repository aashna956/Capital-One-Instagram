var sentiment=require('sentiment');
var positive=0, negative=0, neutral=0;
exports.analyze = function(data){
	var sentiments = [0,0,0];
	for(var i=0;i<data.length;i++){
		var r1 = sentiment(data[i].caption.text);
		if(r1.score>=1) sentiments[0]++;
		else if(r1.score<0) sentiments[1]++;
		else sentiments[2]++;
	}
	return sentiments;
};