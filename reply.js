module.exports = Reply;

// default replies
const REPLY_ERROR = "An error has occured. Please try again.";
const REPLY_DID_NOT_UNDERSTAND = "I didn't understand that. Can you rephrase?";
const REPLY_SUCCESSFUL = "I understood your message. You can tailor my responses to your messages by analysing the metadata attached with this message.";
var globalEntity = "";
lst_intents = []
//ret_lst = []

function Reply(message, intent, entities) {
	console.log('Reply: entities - ',entities[0]);
	console.log('Reply: intent - ', intent);
	globalEntity = entities
    this.message = message;
    this.reply = this.getReply(intent);
    this.intent = intent;
    this.entities = entities;
    this.context = "global";
}

Reply.prototype.toJson = function() {
    var json = {};
    json['intent'] = this.intent;
    json['entities'] = this.entities;
    json['reply'] = this.reply;
    json['message'] = this.message;

	console.log('json: entities - ', this.entities);
    return json;
};

 Reply.prototype.getReply = function(intent ){
    if(!intent){
      return REPLY_DID_NOT_UNDERSTAND;
    }
    else{
		var fs = require('fs');
		var parse = require('csv-parse');
		let intent_name = ''
		intent_name = intent.name ;
		if (intent_name === null) intent_name = 'null';
		let ret = '';
		//ret_lst.length = 0 ;
		ret_lst = [] ;
		var inputFile ='intents_answer.csv';
		console.log("Processing intents file");
		//console.log("intent Name : ",intent.name)
		var parser = parse({delimiter: ','}, function (err, data) {
      data.forEach(function(line) {
        var row = { "intent" : line[0]
                  , "return" : line[1]
                  };
                  lst_intents.push(row);
		              //console.log(JSON.stringify(row));
		              //console.log(row);
                  });
            });
		// read the inputFile, feed the contents to the parser
			fs.createReadStream(inputFile).pipe(parser);
			//console.log("lst_intents  => ",lst_intents);
			for (i=0 ; i<lst_intents.length ; i++){
				if(intent_name === lst_intents[i]["intent"]){
					//console.log("return element .. : = > ",lst_intents[i]["return"]);
					if (ret_lst.includes(lst_intents[i]["return"])){

					}
					else{
					ret_lst.push(lst_intents[i]["return"]);
					//console.log("lst_intents  => ",lst_intents);
					}
				}
			}
			//console.log("ret_lst length : ",ret_lst.length,ret_lst)
			range = Math.random() * ret_lst.length;
			range = Math.trunc(range);
			return(ret_lst[range])
		}
  };
