module.exports = Reply;

// default replies
const REPLY_ERROR = "An error has occured. Please try again.";
const REPLY_DID_NOT_UNDERSTAND = "I didn't understand that. Can you rephrase?";
const REPLY_SUCCESSFUL = "I understood your message. You can tailor my responses to your messages by analysing the metadata attached with this message.";
var globalEntity = "";

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

      switch(intent.name){
        case "init1": return "Hello there!";
        case "init2": return "I am Jussy! , I am still in development and I don't know much... But feel free to ask me something (please don't insult me!)";
        case "affirm": return "Ook :)";
        case "greet":  return  "Hello there!";
        case "restaurant_search":  return  "There are some nice restaurants around here! may i get your location ?";

        case "goodbye": return "Pleasure talking to you. Goodbye!";
				case "giving_location":{
          if(entities["location"] === "London"){
            return "Here is the list of best restaurants in London :)  ........ ).";
          }
					else if(entities["location"] === "Rome"){
            return "Here is the list of best restaurants in Rome :)  ........ ).";
          }
					else if(entities["location"] === "Paris"){
            return "Here is the list of best restaurants in Paris :)  ........ ).";
          	}

          }
        default: return "Sorry, I did not understand your input. Please try again.";
      }
    }
  };
